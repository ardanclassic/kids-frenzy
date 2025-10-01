/* ===== FILE: AgeCategoryFilter.tsx ===== */

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "./AgeCategoryFilter.scss";

interface AgeCategory {
  id: string;
  name: string;
  emoji: string;
  color: string;
  minAge?: number;
}

interface AgeCategoryFilterProps {
  categories: AgeCategory[];
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

const AgeCategoryFilter: React.FC<AgeCategoryFilterProps> = ({ categories, selectedCategory, onCategoryChange }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [isScrollable, setIsScrollable] = useState(false);
  const [totalDots, setTotalDots] = useState(0);

  // Update scroll indicators and calculate dots
  const updateScrollIndicators = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const canScroll = scrollWidth > clientWidth;

      setIsScrollable(canScroll);
      setCanScrollLeft(canScroll && scrollLeft > 10);
      setCanScrollRight(canScroll && scrollLeft < scrollWidth - clientWidth - 10);

      // Calculate number of dots based on scrollable content
      if (canScroll) {
        const scrollableWidth = scrollWidth - clientWidth;
        const dotsCount = Math.min(Math.ceil(scrollableWidth / clientWidth) + 1, categories.length);
        setTotalDots(Math.max(2, dotsCount)); // Minimum 2 dots if scrollable
      } else {
        setTotalDots(0); // No dots if not scrollable
      }
    }
  };

  // Update active dot based on scroll position
  const updateActiveDot = () => {
    if (scrollRef.current && totalDots > 0) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const maxScroll = scrollWidth - clientWidth;

      if (maxScroll <= 0) {
        setActiveIndex(0);
        return;
      }

      const scrollPercentage = scrollLeft / maxScroll;
      const index = Math.round(scrollPercentage * (totalDots - 1));
      setActiveIndex(Math.min(Math.max(0, index), totalDots - 1));
    }
  };

  // Scroll left button handler
  const handleScrollLeft = () => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth * 0.8;
      scrollRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    }
  };

  // Scroll right button handler
  const handleScrollRight = () => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth * 0.8;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  // Scroll to specific dot position
  const scrollToDot = (dotIndex: number) => {
    if (scrollRef.current && totalDots > 0) {
      const scrollElement = scrollRef.current;
      const maxScroll = scrollElement.scrollWidth - scrollElement.clientWidth;
      const scrollPercentage = dotIndex / (totalDots - 1);
      const scrollPosition = scrollPercentage * maxScroll;
      scrollElement.scrollTo({ left: scrollPosition, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      updateScrollIndicators();
      updateActiveDot();

      const handleScroll = () => {
        updateScrollIndicators();
        updateActiveDot();
      };

      const handleResize = () => {
        updateScrollIndicators();
        updateActiveDot();
      };

      scrollElement.addEventListener("scroll", handleScroll);
      window.addEventListener("resize", handleResize);

      return () => {
        scrollElement.removeEventListener("scroll", handleScroll);
        window.removeEventListener("resize", handleResize);
      };
    }
  }, [categories.length, totalDots]);

  return (
    <div className="age-category-filter">
      <h3 className="filter-title">Filter berdasarkan Usia</h3>

      {/* Desktop: Wrapped buttons */}
      <div className="desktop-filters">
        {categories.map((category) => (
          <motion.button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`filter-btn ${selectedCategory === category.id ? "active" : ""}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="filter-btn-content">
              <span className="emoji">{category.emoji}</span>
              <span>{category.name}</span>
            </span>
          </motion.button>
        ))}
      </div>

      {/* Mobile: Horizontal scroll */}
      <div className="mobile-filters">
        <div className="scroll-container">
          {/* Clickable scroll indicator - Left */}
          {canScrollLeft && (
            <button onClick={handleScrollLeft} className="scroll-indicator left" aria-label="Scroll left">
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="indicator-badge"
              >
                <ChevronLeft className="icon" />
              </motion.div>
            </button>
          )}

          {/* Clickable scroll indicator - Right */}
          {canScrollRight && (
            <button onClick={handleScrollRight} className="scroll-indicator right" aria-label="Scroll right">
              <motion.div
                animate={{ x: [0, -5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="indicator-badge"
              >
                <ChevronRight className="icon" />
              </motion.div>
            </button>
          )}

          {/* Scrollable content */}
          <div ref={scrollRef} className="scroll-content">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => onCategoryChange(category.id)}
                className={`scroll-btn ${selectedCategory === category.id ? "active" : ""}`}
                whileTap={{ scale: 0.95 }}
              >
                <span className="scroll-btn-content">
                  <span className="emoji">{category.emoji}</span>
                  <span>{category.name}</span>
                </span>
              </motion.button>
            ))}
          </div>

          {/* Interactive dot indicators - only show if scrollable */}
          {isScrollable && totalDots > 0 && (
            <div className="dot-indicators">
              {[...Array(totalDots)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollToDot(index)}
                  className={`dot ${index === activeIndex ? "active" : ""}`}
                  aria-label={`Scroll to position ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AgeCategoryFilter;

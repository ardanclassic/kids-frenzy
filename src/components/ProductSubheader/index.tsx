import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, ArrowUpDown } from "lucide-react";
import { useSortStore } from "@/store/sortStore";
import type { SortOption } from "@/store/sortStore";
import { motion, AnimatePresence } from "framer-motion";

interface ProductSubheaderProps {
  currentCount: number;
  totalCount: number;
}

const ProductSubheader: React.FC<ProductSubheaderProps> = ({ currentCount, totalCount }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedSort = useSortStore((state) => state.selectedSort);
  const sortOptions = useSortStore((state) => state.sortOptions);
  const setSelectedSort = useSortStore((state) => state.setSelectedSort);

  // Get current sort label
  const currentSortLabel = sortOptions.find((opt) => opt.id === selectedSort)?.label || "Default";

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleSortChange = (sortOption: SortOption) => {
    setSelectedSort(sortOption);
    setIsDropdownOpen(false);
  };

  return (
    <div className="mb-4 md:mb-6">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Product Count Info */}
        <div className="flex items-center gap-2">
          {/* Mobile: Ringkas */}
          <div className="text-sm text-gray-700 md:hidden">
            <span className="font-semibold text-teal-600">{currentCount}</span> dari{" "}
            <span className="font-semibold text-gray-900">{totalCount}</span> produk
          </div>

          {/* Desktop: Deskriptif */}
          <div className="hidden md:block text-base text-gray-700">
            Menampilkan <span className="font-semibold text-teal-600">{currentCount}</span> dari total{" "}
            <span className="font-semibold text-gray-900">{totalCount}</span> produk
          </div>
        </div>

        {/* Right: Sort Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 px-3 py-2 md:px-4 md:py-2.5 bg-white border border-gray-200 rounded-lg hover:border-teal-300 hover:bg-teal-50/50 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <ArrowUpDown className="w-4 h-4 text-gray-600" />
            <span className="text-sm md:text-base text-gray-700 font-medium">{currentSortLabel}</span>
            <ChevronDown
              className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Dropdown Menu */}
          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden z-50"
              >
                <div className="py-1">
                  {sortOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => handleSortChange(option.id)}
                      className={`w-full text-left px-4 py-2.5 hover:bg-teal-50 transition-colors duration-150 ${
                        selectedSort === option.id ? "bg-teal-50 text-teal-700 font-medium" : "text-gray-700"
                      }`}
                    >
                      <div className="text-sm">{option.label}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{option.description}</div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ProductSubheader;

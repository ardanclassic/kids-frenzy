import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ChevronDown,
  X,
  Sparkles,
  Filter,
  Palette,
  PenTool,
  Scissors,
  Users,
  BookMarked,
  MoreHorizontal,
  Shuffle,
  Target,
  Brain,
} from "lucide-react";
import "./sidebar.scss";

interface AgeCategory {
  id: string;
  name: string;
  emoji: string;
  color: string;
  minAge?: number;
}

interface Subcategory {
  id: string;
  name: string;
  icon: string;
  emoji: string;
  description: string;
}

interface SidebarFilterProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  ageCategories: AgeCategory[];
  selectedAgeCategory: string;
  onAgeCategoryChange: (categoryId: string) => void;
  subcategories: Subcategory[];
  selectedSubcategory: string;
  onSubcategoryChange: (subcategoryId: string) => void;
  totalResults: number;
  totalProducts: number;
  onResetFilters: () => void;
}

const iconMap: Record<string, any> = {
  Sparkles,
  BookMarked,
  Target,
  Shuffle,
  Palette,
  Brain,
  Scissors,
  PenTool,
  Users,
  MoreHorizontal,
};

const SidebarFilter: React.FC<SidebarFilterProps> = ({
  searchTerm,
  onSearchChange,
  ageCategories,
  selectedAgeCategory,
  onAgeCategoryChange,
  subcategories,
  selectedSubcategory,
  onSubcategoryChange,
  totalResults,
  totalProducts,
  onResetFilters,
}) => {
  const [isAgeCategoryOpen, setIsAgeCategoryOpen] = useState(true);
  const [isSubcategoryOpen, setIsSubcategoryOpen] = useState(true);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const hasActiveFilters =
    selectedAgeCategory !== "semua" || selectedSubcategory !== "all-activities" || searchTerm !== "";

  const activeFilterCount = [
    selectedAgeCategory !== "semua",
    selectedSubcategory !== "all-activities",
    searchTerm !== "",
  ].filter(Boolean).length;

  const FilterContent = () => (
    <>
      {/* Search Bar */}
      <div className="filter-section">
        <div className="search-wrapper">
          <Search className="search-icon" />
          <input
            type="text"
            placeholder="Cari..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="search-input"
          />
          {searchTerm && (
            <button onClick={() => onSearchChange("")} className="clear-btn" aria-label="Clear search">
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Age Category Filter */}
      <div className="filter-section">
        <button onClick={() => setIsAgeCategoryOpen(!isAgeCategoryOpen)} className="section-header">
          <h3 className="section-title">Usia</h3>
          <ChevronDown className={`chevron-icon ${isAgeCategoryOpen ? "rotate" : ""}`} />
        </button>

        <AnimatePresence initial={false}>
          {isAgeCategoryOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.15, ease: "easeInOut" }}
              className="section-content"
            >
              <div className="filter-options">
                {ageCategories.map((category) => (
                  <motion.button
                    key={category.id}
                    onClick={() => onAgeCategoryChange(category.id)}
                    className={`filter-option ${selectedAgeCategory === category.id ? "active" : ""}`}
                    whileHover={{ scale: 1.015 }}
                    whileTap={{ scale: 0.985 }}
                  >
                    <span className="emoji">{category.emoji}</span>
                    <span className="name">{category.name}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Subcategory Filter */}
      <div className="filter-section">
        <button onClick={() => setIsSubcategoryOpen(!isSubcategoryOpen)} className="section-header">
          <h3 className="section-title">Aktivitas</h3>
          <ChevronDown className={`chevron-icon ${isSubcategoryOpen ? "rotate" : ""}`} />
        </button>

        <AnimatePresence initial={false}>
          {isSubcategoryOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.15, ease: "easeInOut" }}
              className="section-content"
            >
              <div className="filter-options">
                {subcategories.map((subcategory) => {
                  const IconComponent = iconMap[subcategory.icon] || Sparkles;
                  return (
                    <motion.button
                      key={subcategory.id}
                      onClick={() => onSubcategoryChange(subcategory.id)}
                      className={`filter-option ${selectedSubcategory === subcategory.id ? "active" : ""}`}
                      whileHover={{ scale: 1.015 }}
                      whileTap={{ scale: 0.985 }}
                      title={subcategory.description}
                    >
                      <IconComponent className="icon" />
                      <span className="name">{subcategory.name}</span>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Results & Reset */}
      <div className="bottom-section">
        <div className="results-chip">
          <span className="results-count">{totalResults}</span>
          <span className="results-separator">/</span>
          <span className="results-total">{totalProducts}</span>
        </div>

        {hasActiveFilters && (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={onResetFilters}
            className="reset-btn"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <X className="w-3.5 h-3.5" />
            Reset
          </motion.button>
        )}
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Filter Toggle Button */}
      <motion.button
        onClick={() => setIsMobileFilterOpen(true)}
        className="mobile-filter-toggle"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open filters"
      >
        <Filter className="w-4 h-4" />
        {hasActiveFilters && <span className="filter-badge">{activeFilterCount}</span>}
      </motion.button>

      {/* Desktop Sidebar */}
      <div className="sidebar-filter desktop-sidebar">
        <div className="sidebar-header">
          <Filter className="header-icon" />
          <h2 className="sidebar-title">Filter</h2>
        </div>
        <div className="sidebar-content">
          <FilterContent />
        </div>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileFilterOpen(false)}
              className="mobile-overlay"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="sidebar-filter mobile-sidebar"
            >
              <div className="sidebar-header">
                <Filter className="header-icon" />
                <h2 className="sidebar-title">Filter</h2>
                <button onClick={() => setIsMobileFilterOpen(false)} className="close-btn" aria-label="Close filters">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="sidebar-content">
                <FilterContent />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default SidebarFilter;

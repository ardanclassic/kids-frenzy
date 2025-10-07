// SidebarFilter.tsx
import React, { useCallback, useMemo } from "react";
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
import { useFilterStore } from "@/store/filterStore";
import "./sidebar.scss";

// ========================================
// TYPES & INTERFACES
// ========================================

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

// ========================================
// CONSTANTS - ICON MAPPING
// ========================================

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
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

// ========================================
// HELPER: GET ICON COMPONENT
// ========================================

const getIconComponent = (iconName: string) => {
  return ICON_MAP[iconName] || Sparkles;
};

// ========================================
// SHARED COMPONENT: Filter Content (Pure & Memoized)
// ========================================

interface FilterContentProps {
  searchTerm: string;
  selectedAgeCategory: string;
  selectedSubcategory: string;
  ageCategories: AgeCategory[];
  subcategories: Subcategory[];
  totalResults: number;
  totalProducts: number;
  isAgeCategoryOpen: boolean;
  isSubcategoryOpen: boolean;
  onSearchChange: (value: string) => void;
  onAgeCategoryClick: (categoryId: string) => void;
  onSubcategoryClick: (subcategoryId: string) => void;
  onToggleAgeCategory: () => void;
  onToggleSubcategory: () => void;
  onReset: () => void;
  hasActiveFilters: boolean;
}

const FilterContent: React.FC<FilterContentProps> = React.memo((props) => {
  const {
    searchTerm,
    selectedAgeCategory,
    selectedSubcategory,
    ageCategories,
    subcategories,
    totalResults,
    totalProducts,
    isAgeCategoryOpen,
    isSubcategoryOpen,
    onSearchChange,
    onAgeCategoryClick,
    onSubcategoryClick,
    onToggleAgeCategory,
    onToggleSubcategory,
    onReset,
    hasActiveFilters,
  } = props;

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onSearchChange(e.target.value);
    },
    [onSearchChange]
  );

  const handleClearSearch = useCallback(() => {
    onSearchChange("");
  }, [onSearchChange]);

  return (
    <>
      {/* Search Section */}
      <div className="filter-section">
        <div className="search-wrapper">
          <Search className="search-icon" />
          <input
            type="text"
            placeholder="Cari..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
            aria-label="Search products"
          />
          {searchTerm && (
            <button onClick={handleClearSearch} className="clear-btn" aria-label="Clear search" type="button">
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Age Category Section */}
      <div className="filter-section">
        <button
          onClick={onToggleAgeCategory}
          className="section-header"
          aria-expanded={isAgeCategoryOpen}
          type="button"
        >
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
                {ageCategories.map((category) => {
                  const isSelected = selectedAgeCategory === category.id;

                  return (
                    <motion.button
                      key={category.id}
                      onClick={() => onAgeCategoryClick(category.id)}
                      className={`filter-option ${isSelected ? "active" : ""}`}
                      whileHover={{ scale: 1.015 }}
                      whileTap={{ scale: 0.985 }}
                      aria-pressed={isSelected}
                      type="button"
                    >
                      <span className="emoji" aria-hidden="true">
                        {category.emoji}
                      </span>
                      <span className="name">{category.name}</span>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Subcategory Section */}
      <div className="filter-section">
        <button
          onClick={onToggleSubcategory}
          className="section-header"
          aria-expanded={isSubcategoryOpen}
          type="button"
        >
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
                  const IconComponent = getIconComponent(subcategory.icon);
                  const isSelected = selectedSubcategory === subcategory.id;

                  return (
                    <motion.button
                      key={subcategory.id}
                      onClick={() => onSubcategoryClick(subcategory.id)}
                      className={`filter-option ${isSelected ? "active" : ""}`}
                      whileHover={{ scale: 1.015 }}
                      whileTap={{ scale: 0.985 }}
                      title={subcategory.description}
                      aria-pressed={isSelected}
                      aria-label={`${subcategory.name} - ${subcategory.description}`}
                      type="button"
                    >
                      <IconComponent className="icon" aria-hidden="true" />
                      <span className="name">{subcategory.name}</span>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Section */}
      <div className="bottom-section">
        <div className="results-chip" role="status" aria-live="polite">
          <span className="results-count" aria-label={`${totalResults} results found`}>
            {totalResults}
          </span>
          <span className="results-separator" aria-hidden="true">
            /
          </span>
          <span className="results-total" aria-label={`out of ${totalProducts} total products`}>
            {totalProducts}
          </span>
        </div>

        {hasActiveFilters && (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onClick={onReset}
            className="reset-btn"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            aria-label="Reset all filters"
            type="button"
          >
            <X className="w-3.5 h-3.5" aria-hidden="true" />
            Reset
          </motion.button>
        )}
      </div>
    </>
  );
});

FilterContent.displayName = "FilterContent";

// ========================================
// COMPONENT: Mobile Sidebar Wrapper (Simplified)
// ========================================

const MobileSidebarWrapper: React.FC = () => {
  const isMobileFilterOpen = useFilterStore((state) => state.isMobileFilterOpen);
  const setIsMobileFilterOpen = useFilterStore((state) => state.setIsMobileFilterOpen);

  const handleClose = useCallback(() => {
    setIsMobileFilterOpen(false);
  }, [setIsMobileFilterOpen]);

  return (
    <AnimatePresence mode="wait">
      {isMobileFilterOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            key="mobile-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleClose}
            className="mobile-overlay"
            aria-hidden="true"
          />

          {/* Drawer Sidebar */}
          <motion.aside
            key="mobile-sidebar"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{
              type: "spring",
              damping: 30,
              stiffness: 300,
            }}
            className="sidebar-filter mobile-sidebar"
            aria-label="Mobile product filters"
            role="dialog"
            aria-modal="true"
          >
            {/* Mobile Header */}
            <div className="sidebar-header">
              <Filter className="header-icon" aria-hidden="true" />
              <h2 className="sidebar-title" id="mobile-filter-title">
                Filter
              </h2>
              <button onClick={handleClose} className="close-btn" aria-label="Close filter menu" type="button">
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            {/* Mobile Content */}
            <div className="sidebar-content">
              <MobileFilterContentConnector />
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

// ========================================
// CONNECTOR: Mobile Filter Content (Bridge to Store)
// ========================================

const MobileFilterContentConnector: React.FC = () => {
  // Get all data from store
  const searchTerm = useFilterStore((state) => state.searchTerm);
  const selectedAgeCategory = useFilterStore((state) => state.selectedAgeCategory);
  const selectedSubcategory = useFilterStore((state) => state.selectedSubcategory);
  const ageCategories = useFilterStore((state) => state.ageCategories);
  const subcategories = useFilterStore((state) => state.subcategories);
  const totalResults = useFilterStore((state) => state.totalResults);
  const totalProducts = useFilterStore((state) => state.totalProducts);
  const isAgeCategoryOpen = useFilterStore((state) => state.isAgeCategoryOpen);
  const isSubcategoryOpen = useFilterStore((state) => state.isSubcategoryOpen);

  // Get actions
  const setSearchTerm = useFilterStore((state) => state.setSearchTerm);
  const setSelectedAgeCategory = useFilterStore((state) => state.setSelectedAgeCategory);
  const setSelectedSubcategory = useFilterStore((state) => state.setSelectedSubcategory);
  const toggleAgeCategoryOpen = useFilterStore((state) => state.toggleAgeCategoryOpen);
  const toggleSubcategoryOpen = useFilterStore((state) => state.toggleSubcategoryOpen);
  const resetFilters = useFilterStore((state) => state.resetFilters);
  const hasActiveFilters = useFilterStore((state) => state.hasActiveFilters); // Now a boolean value, not function // Now a boolean value, not function

  // Stable callbacks
  const handleSearchChange = useCallback((value: string) => setSearchTerm(value), [setSearchTerm]);
  const handleAgeCategoryClick = useCallback((id: string) => setSelectedAgeCategory(id), [setSelectedAgeCategory]);
  const handleSubcategoryClick = useCallback((id: string) => setSelectedSubcategory(id), [setSelectedSubcategory]);

  // Memoize props to prevent unnecessary re-renders
  const filterProps = useMemo(
    () => ({
      searchTerm,
      selectedAgeCategory,
      selectedSubcategory,
      ageCategories,
      subcategories,
      totalResults,
      totalProducts,
      isAgeCategoryOpen,
      isSubcategoryOpen,
      onSearchChange: handleSearchChange,
      onAgeCategoryClick: handleAgeCategoryClick,
      onSubcategoryClick: handleSubcategoryClick,
      onToggleAgeCategory: toggleAgeCategoryOpen,
      onToggleSubcategory: toggleSubcategoryOpen,
      onReset: resetFilters,
      hasActiveFilters: hasActiveFilters, // Direct boolean value
    }),
    [
      searchTerm,
      selectedAgeCategory,
      selectedSubcategory,
      ageCategories,
      subcategories,
      totalResults,
      totalProducts,
      isAgeCategoryOpen,
      isSubcategoryOpen,
      handleSearchChange,
      handleAgeCategoryClick,
      handleSubcategoryClick,
      toggleAgeCategoryOpen,
      toggleSubcategoryOpen,
      resetFilters,
      hasActiveFilters,
    ]
  );

  return <FilterContent {...filterProps} />;
};

// ========================================
// MAIN COMPONENT
// ========================================

const SidebarFilter: React.FC = () => {
  // Get all data from store
  const searchTerm = useFilterStore((state) => state.searchTerm);
  const selectedAgeCategory = useFilterStore((state) => state.selectedAgeCategory);
  const selectedSubcategory = useFilterStore((state) => state.selectedSubcategory);
  const ageCategories = useFilterStore((state) => state.ageCategories);
  const subcategories = useFilterStore((state) => state.subcategories);
  const totalResults = useFilterStore((state) => state.totalResults);
  const totalProducts = useFilterStore((state) => state.totalProducts);
  const isAgeCategoryOpen = useFilterStore((state) => state.isAgeCategoryOpen);
  const isSubcategoryOpen = useFilterStore((state) => state.isSubcategoryOpen);

  // Get actions
  const setSearchTerm = useFilterStore((state) => state.setSearchTerm);
  const setSelectedAgeCategory = useFilterStore((state) => state.setSelectedAgeCategory);
  const setSelectedSubcategory = useFilterStore((state) => state.setSelectedSubcategory);
  const toggleAgeCategoryOpen = useFilterStore((state) => state.toggleAgeCategoryOpen);
  const toggleSubcategoryOpen = useFilterStore((state) => state.toggleSubcategoryOpen);
  const resetFilters = useFilterStore((state) => state.resetFilters);
  const hasActiveFilters = useFilterStore((state) => state.hasActiveFilters);

  // Stable callbacks for desktop
  const handleSearchChange = useCallback((value: string) => setSearchTerm(value), [setSearchTerm]);
  const handleAgeCategoryClick = useCallback((id: string) => setSelectedAgeCategory(id), [setSelectedAgeCategory]);
  const handleSubcategoryClick = useCallback((id: string) => setSelectedSubcategory(id), [setSelectedSubcategory]);

  // Memoize props for desktop
  const filterProps = useMemo(
    () => ({
      searchTerm,
      selectedAgeCategory,
      selectedSubcategory,
      ageCategories,
      subcategories,
      totalResults,
      totalProducts,
      isAgeCategoryOpen,
      isSubcategoryOpen,
      onSearchChange: handleSearchChange,
      onAgeCategoryClick: handleAgeCategoryClick,
      onSubcategoryClick: handleSubcategoryClick,
      onToggleAgeCategory: toggleAgeCategoryOpen,
      onToggleSubcategory: toggleSubcategoryOpen,
      onReset: resetFilters,
      hasActiveFilters: hasActiveFilters, // Direct boolean value
    }),
    [
      searchTerm,
      selectedAgeCategory,
      selectedSubcategory,
      ageCategories,
      subcategories,
      totalResults,
      totalProducts,
      isAgeCategoryOpen,
      isSubcategoryOpen,
      handleSearchChange,
      handleAgeCategoryClick,
      handleSubcategoryClick,
      toggleAgeCategoryOpen,
      toggleSubcategoryOpen,
      resetFilters,
      hasActiveFilters,
    ]
  );

  // ========================================
  // COMPONENT: Desktop Sidebar
  // ========================================

  const DesktopSidebar = useMemo(
    () => (
      <aside className="sidebar-filter desktop-sidebar" aria-label="Product filters">
        <div className="sidebar-header">
          <Filter className="header-icon" aria-hidden="true" />
          <h2 className="sidebar-title">Filter</h2>
        </div>
        <div className="sidebar-content">
          <FilterContent {...filterProps} />
        </div>
      </aside>
    ),
    [filterProps]
  );

  // ========================================
  // MAIN RENDER
  // ========================================

  return (
    <>
      {DesktopSidebar}
      <MobileSidebarWrapper />
    </>
  );
};

SidebarFilter.displayName = "SidebarFilter";

export default SidebarFilter;

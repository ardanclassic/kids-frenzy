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
  BookOpen,
  Globe,
  Languages,
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

interface ActivityCategory {
  id: string;
  name: string;
  icon: string;
  emoji: string;
  description: string;
}

interface LanguageCategory {
  id: string;
  name: string;
  emoji: string;
  icon: string;
  description: string;
  color: string;
}

interface BundlingCategory {
  id: string;
  name: string;
  emoji: string;
  icon: string;
  description: string;
  color: string;
}

// ========================================
// CONSTANTS - ICON MAPPING
// ========================================

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Sparkles,
  BookMarked,
  BookOpen,
  Target,
  Shuffle,
  Palette,
  Brain,
  Scissors,
  PenTool,
  Users,
  MoreHorizontal,
  Globe,
  Languages,
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
  selectedActivityCategory: string;
  selectedLanguageCategory: string;
  selectedBundlingCategory: string;
  ageCategories: AgeCategory[];
  activityCategories: ActivityCategory[];
  languageCategories: LanguageCategory[];
  bundlingCategories: BundlingCategory[];
  totalResults: number;
  totalProducts: number;
  isAgeCategoryOpen: boolean;
  isActivityCategoryOpen: boolean;
  isLanguageCategoryOpen: boolean;
  isBundlingCategoryOpen: boolean;
  isBundlingMode: boolean;
  onSearchChange: (value: string) => void;
  onAgeCategoryClick: (categoryId: string) => void;
  onActivityCategoryClick: (activityCategoryId: string) => void;
  onLanguageCategoryClick: (languageCategoryId: string) => void;
  onBundlingCategoryClick: (bundlingCategoryId: string) => void;
  onToggleAgeCategory: () => void;
  onToggleActivityCategory: () => void;
  onToggleLanguageCategory: () => void;
  onToggleBundlingCategory: () => void;
  onReset: () => void;
  hasActiveFilters: boolean;
}

const FilterContent: React.FC<FilterContentProps> = React.memo((props) => {
  const {
    searchTerm,
    selectedAgeCategory,
    selectedActivityCategory,
    selectedLanguageCategory,
    selectedBundlingCategory,
    ageCategories,
    activityCategories,
    languageCategories,
    bundlingCategories,
    totalResults,
    totalProducts,
    isAgeCategoryOpen,
    isActivityCategoryOpen,
    isLanguageCategoryOpen,
    isBundlingCategoryOpen,
    isBundlingMode,
    onSearchChange,
    onAgeCategoryClick,
    onActivityCategoryClick,
    onLanguageCategoryClick,
    onBundlingCategoryClick,
    onToggleAgeCategory,
    onToggleActivityCategory,
    onToggleLanguageCategory,
    onToggleBundlingCategory,
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

  // Check if bundling section should be shown
  const shouldShowBundling = selectedAgeCategory === "all-age" && selectedActivityCategory === "all-activities";

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
          disabled={isBundlingMode}
          style={{ opacity: isBundlingMode ? 0.5 : 1, cursor: isBundlingMode ? "not-allowed" : "pointer" }}
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
                      whileHover={{ scale: isBundlingMode ? 1 : 1.015 }}
                      whileTap={{ scale: isBundlingMode ? 1 : 0.985 }}
                      aria-pressed={isSelected}
                      type="button"
                      disabled={isBundlingMode}
                      style={{ opacity: isBundlingMode ? 0.5 : 1, cursor: isBundlingMode ? "not-allowed" : "pointer" }}
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

      {/* Activity Category Section */}
      <div className="filter-section">
        <button
          onClick={onToggleActivityCategory}
          className="section-header"
          aria-expanded={isActivityCategoryOpen}
          type="button"
          disabled={isBundlingMode}
          style={{ opacity: isBundlingMode ? 0.5 : 1, cursor: isBundlingMode ? "not-allowed" : "pointer" }}
        >
          <h3 className="section-title">Aktivitas</h3>
          <ChevronDown className={`chevron-icon ${isActivityCategoryOpen ? "rotate" : ""}`} />
        </button>

        <AnimatePresence initial={false}>
          {isActivityCategoryOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.15, ease: "easeInOut" }}
              className="section-content"
            >
              <div className="filter-options">
                {activityCategories.map((activityCategory) => {
                  const IconComponent = getIconComponent(activityCategory.icon);
                  const isSelected = selectedActivityCategory === activityCategory.id;

                  return (
                    <motion.button
                      key={activityCategory.id}
                      onClick={() => onActivityCategoryClick(activityCategory.id)}
                      className={`filter-option ${isSelected ? "active" : ""}`}
                      whileHover={{ scale: isBundlingMode ? 1 : 1.015 }}
                      whileTap={{ scale: isBundlingMode ? 1 : 0.985 }}
                      title={activityCategory.description}
                      aria-pressed={isSelected}
                      aria-label={`${activityCategory.name} - ${activityCategory.description}`}
                      type="button"
                      disabled={isBundlingMode}
                      style={{ opacity: isBundlingMode ? 0.5 : 1, cursor: isBundlingMode ? "not-allowed" : "pointer" }}
                    >
                      <IconComponent className="icon" aria-hidden="true" />
                      <span className="name">{activityCategory.name}</span>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Language Category Section */}
      <div className="filter-section">
        <button
          onClick={onToggleLanguageCategory}
          className="section-header"
          aria-expanded={isLanguageCategoryOpen}
          type="button"
        >
          <h3 className="section-title">Bahasa</h3>
          <ChevronDown className={`chevron-icon ${isLanguageCategoryOpen ? "rotate" : ""}`} />
        </button>

        <AnimatePresence initial={false}>
          {isLanguageCategoryOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.15, ease: "easeInOut" }}
              className="section-content"
            >
              <div className="filter-options">
                {languageCategories.map((languageCategory) => {
                  const IconComponent = getIconComponent(languageCategory.icon);
                  const isSelected = selectedLanguageCategory === languageCategory.id;

                  return (
                    <motion.button
                      key={languageCategory.id}
                      onClick={() => onLanguageCategoryClick(languageCategory.id)}
                      className={`filter-option ${isSelected ? "active" : ""}`}
                      whileHover={{ scale: 1.015 }}
                      whileTap={{ scale: 0.985 }}
                      title={languageCategory.description}
                      aria-pressed={isSelected}
                      aria-label={`${languageCategory.name} - ${languageCategory.description}`}
                      type="button"
                    >
                      <IconComponent className="icon" aria-hidden="true" />
                      <span className="name">{languageCategory.name}</span>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bundling Category Section - Only show when age = "all-age" */}
      {shouldShowBundling && (
        <div className="filter-section">
          <button
            onClick={onToggleBundlingCategory}
            className="section-header"
            aria-expanded={isBundlingCategoryOpen}
            type="button"
          >
            <h3 className="section-title">Bundling</h3>
            <ChevronDown className={`chevron-icon ${isBundlingCategoryOpen ? "rotate" : ""}`} />
          </button>

          <AnimatePresence initial={false}>
            {isBundlingCategoryOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.15, ease: "easeInOut" }}
                className="section-content"
              >
                <div className="filter-options">
                  {bundlingCategories.map((bundlingCategory) => {
                    const IconComponent = getIconComponent(bundlingCategory.icon);
                    const isSelected = selectedBundlingCategory === bundlingCategory.id;

                    return (
                      <motion.button
                        key={bundlingCategory.id}
                        onClick={() => onBundlingCategoryClick(bundlingCategory.id)}
                        className={`filter-option ${isSelected ? "active" : ""}`}
                        whileHover={{ scale: 1.015 }}
                        whileTap={{ scale: 0.985 }}
                        title={bundlingCategory.description}
                        aria-pressed={isSelected}
                        aria-label={`${bundlingCategory.name} - ${bundlingCategory.description}`}
                        type="button"
                      >
                        <IconComponent className="icon" aria-hidden="true" />
                        <span className="name">{bundlingCategory.name}</span>
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

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
// COMPONENT: Mobile Sidebar Wrapper
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
              <FilterContentConnector />
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

// ========================================
// CONNECTOR: Filter Content (Bridge to Store)
// ========================================

const FilterContentConnector: React.FC = () => {
  // Get all data from store
  const searchTerm = useFilterStore((state) => state.searchTerm);
  const selectedAgeCategory = useFilterStore((state) => state.selectedAgeCategory);
  const selectedActivityCategory = useFilterStore((state) => state.selectedActivityCategory);
  const selectedLanguageCategory = useFilterStore((state) => state.selectedLanguageCategory);
  const selectedBundlingCategory = useFilterStore((state) => state.selectedBundlingCategory);
  const ageCategories = useFilterStore((state) => state.ageCategories);
  const activityCategories = useFilterStore((state) => state.activityCategories);
  const languageCategories = useFilterStore((state) => state.languageCategories);
  const bundlingCategories = useFilterStore((state) => state.bundlingCategories);
  const totalResults = useFilterStore((state) => state.totalResults);
  const totalProducts = useFilterStore((state) => state.totalProducts);
  const isAgeCategoryOpen = useFilterStore((state) => state.isAgeCategoryOpen);
  const isActivityCategoryOpen = useFilterStore((state) => state.isActivityCategoryOpen);
  const isLanguageCategoryOpen = useFilterStore((state) => state.isLanguageCategoryOpen);
  const isBundlingCategoryOpen = useFilterStore((state) => state.isBundlingCategoryOpen);
  const isBundlingMode = useFilterStore((state) => state.isBundlingMode);

  // Get actions
  const setSearchTerm = useFilterStore((state) => state.setSearchTerm);
  const setSelectedAgeCategory = useFilterStore((state) => state.setSelectedAgeCategory);
  const setSelectedActivityCategory = useFilterStore((state) => state.setSelectedActivityCategory);
  const setSelectedLanguageCategory = useFilterStore((state) => state.setSelectedLanguageCategory);
  const setSelectedBundlingCategory = useFilterStore((state) => state.setSelectedBundlingCategory);
  const toggleAgeCategoryOpen = useFilterStore((state) => state.toggleAgeCategoryOpen);
  const toggleActivityCategoryOpen = useFilterStore((state) => state.toggleActivityCategoryOpen);
  const toggleLanguageCategoryOpen = useFilterStore((state) => state.toggleLanguageCategoryOpen);
  const toggleBundlingCategoryOpen = useFilterStore((state) => state.toggleBundlingCategoryOpen);
  const resetFilters = useFilterStore((state) => state.resetFilters);
  const hasActiveFilters = useFilterStore((state) => state.hasActiveFilters);

  // Stable callbacks
  const handleSearchChange = useCallback((value: string) => setSearchTerm(value), [setSearchTerm]);
  const handleAgeCategoryClick = useCallback((id: string) => setSelectedAgeCategory(id), [setSelectedAgeCategory]);
  const handleActivityCategoryClick = useCallback(
    (id: string) => setSelectedActivityCategory(id),
    [setSelectedActivityCategory]
  );
  const handleLanguageCategoryClick = useCallback(
    (id: string) => setSelectedLanguageCategory(id),
    [setSelectedLanguageCategory]
  );
  const handleBundlingCategoryClick = useCallback(
    (id: string) => setSelectedBundlingCategory(id),
    [setSelectedBundlingCategory]
  );

  // Memoize props to prevent unnecessary re-renders
  const filterProps = useMemo(
    () => ({
      searchTerm,
      selectedAgeCategory,
      selectedActivityCategory,
      selectedLanguageCategory,
      selectedBundlingCategory,
      ageCategories,
      activityCategories,
      languageCategories,
      bundlingCategories,
      totalResults,
      totalProducts,
      isAgeCategoryOpen,
      isActivityCategoryOpen,
      isLanguageCategoryOpen,
      isBundlingCategoryOpen,
      isBundlingMode,
      onSearchChange: handleSearchChange,
      onAgeCategoryClick: handleAgeCategoryClick,
      onActivityCategoryClick: handleActivityCategoryClick,
      onLanguageCategoryClick: handleLanguageCategoryClick,
      onBundlingCategoryClick: handleBundlingCategoryClick,
      onToggleAgeCategory: toggleAgeCategoryOpen,
      onToggleActivityCategory: toggleActivityCategoryOpen,
      onToggleLanguageCategory: toggleLanguageCategoryOpen,
      onToggleBundlingCategory: toggleBundlingCategoryOpen,
      onReset: resetFilters,
      hasActiveFilters,
    }),
    [
      searchTerm,
      selectedAgeCategory,
      selectedActivityCategory,
      selectedLanguageCategory,
      selectedBundlingCategory,
      ageCategories,
      activityCategories,
      languageCategories,
      bundlingCategories,
      totalResults,
      totalProducts,
      isAgeCategoryOpen,
      isActivityCategoryOpen,
      isLanguageCategoryOpen,
      isBundlingCategoryOpen,
      isBundlingMode,
      handleSearchChange,
      handleAgeCategoryClick,
      handleActivityCategoryClick,
      handleLanguageCategoryClick,
      handleBundlingCategoryClick,
      toggleAgeCategoryOpen,
      toggleActivityCategoryOpen,
      toggleLanguageCategoryOpen,
      toggleBundlingCategoryOpen,
      resetFilters,
      hasActiveFilters,
    ]
  );

  return <FilterContent {...filterProps} />;
};

// ========================================
// MAIN COMPONENT: SidebarFilter
// ========================================

const SidebarFilter: React.FC = () => {
  // Get all data from store
  const searchTerm = useFilterStore((state) => state.searchTerm);
  const selectedAgeCategory = useFilterStore((state) => state.selectedAgeCategory);
  const selectedActivityCategory = useFilterStore((state) => state.selectedActivityCategory);
  const selectedLanguageCategory = useFilterStore((state) => state.selectedLanguageCategory);
  const selectedBundlingCategory = useFilterStore((state) => state.selectedBundlingCategory);
  const ageCategories = useFilterStore((state) => state.ageCategories);
  const activityCategories = useFilterStore((state) => state.activityCategories);
  const languageCategories = useFilterStore((state) => state.languageCategories);
  const bundlingCategories = useFilterStore((state) => state.bundlingCategories);
  const totalResults = useFilterStore((state) => state.totalResults);
  const totalProducts = useFilterStore((state) => state.totalProducts);
  const isAgeCategoryOpen = useFilterStore((state) => state.isAgeCategoryOpen);
  const isActivityCategoryOpen = useFilterStore((state) => state.isActivityCategoryOpen);
  const isLanguageCategoryOpen = useFilterStore((state) => state.isLanguageCategoryOpen);
  const isBundlingCategoryOpen = useFilterStore((state) => state.isBundlingCategoryOpen);
  const isBundlingMode = useFilterStore((state) => state.isBundlingMode);

  // Get actions
  const setSearchTerm = useFilterStore((state) => state.setSearchTerm);
  const setSelectedAgeCategory = useFilterStore((state) => state.setSelectedAgeCategory);
  const setSelectedActivityCategory = useFilterStore((state) => state.setSelectedActivityCategory);
  const setSelectedLanguageCategory = useFilterStore((state) => state.setSelectedLanguageCategory);
  const setSelectedBundlingCategory = useFilterStore((state) => state.setSelectedBundlingCategory);
  const toggleAgeCategoryOpen = useFilterStore((state) => state.toggleAgeCategoryOpen);
  const toggleActivityCategoryOpen = useFilterStore((state) => state.toggleActivityCategoryOpen);
  const toggleLanguageCategoryOpen = useFilterStore((state) => state.toggleLanguageCategoryOpen);
  const toggleBundlingCategoryOpen = useFilterStore((state) => state.toggleBundlingCategoryOpen);
  const resetFilters = useFilterStore((state) => state.resetFilters);
  const hasActiveFilters = useFilterStore((state) => state.hasActiveFilters);

  // Stable callbacks for desktop
  const handleSearchChange = useCallback((value: string) => setSearchTerm(value), [setSearchTerm]);
  const handleAgeCategoryClick = useCallback((id: string) => setSelectedAgeCategory(id), [setSelectedAgeCategory]);
  const handleActivityCategoryClick = useCallback(
    (id: string) => setSelectedActivityCategory(id),
    [setSelectedActivityCategory]
  );
  const handleLanguageCategoryClick = useCallback(
    (id: string) => setSelectedLanguageCategory(id),
    [setSelectedLanguageCategory]
  );
  const handleBundlingCategoryClick = useCallback(
    (id: string) => setSelectedBundlingCategory(id),
    [setSelectedBundlingCategory]
  );

  // Memoize props for desktop
  const filterProps = useMemo(
    () => ({
      searchTerm,
      selectedAgeCategory,
      selectedActivityCategory,
      selectedLanguageCategory,
      selectedBundlingCategory,
      ageCategories,
      activityCategories,
      languageCategories,
      bundlingCategories,
      totalResults,
      totalProducts,
      isAgeCategoryOpen,
      isActivityCategoryOpen,
      isLanguageCategoryOpen,
      isBundlingCategoryOpen,
      isBundlingMode,
      onSearchChange: handleSearchChange,
      onAgeCategoryClick: handleAgeCategoryClick,
      onActivityCategoryClick: handleActivityCategoryClick,
      onLanguageCategoryClick: handleLanguageCategoryClick,
      onBundlingCategoryClick: handleBundlingCategoryClick,
      onToggleAgeCategory: toggleAgeCategoryOpen,
      onToggleActivityCategory: toggleActivityCategoryOpen,
      onToggleLanguageCategory: toggleLanguageCategoryOpen,
      onToggleBundlingCategory: toggleBundlingCategoryOpen,
      onReset: resetFilters,
      hasActiveFilters,
    }),
    [
      searchTerm,
      selectedAgeCategory,
      selectedActivityCategory,
      selectedLanguageCategory,
      selectedBundlingCategory,
      ageCategories,
      activityCategories,
      languageCategories,
      bundlingCategories,
      totalResults,
      totalProducts,
      isAgeCategoryOpen,
      isActivityCategoryOpen,
      isLanguageCategoryOpen,
      isBundlingCategoryOpen,
      isBundlingMode,
      handleSearchChange,
      handleAgeCategoryClick,
      handleActivityCategoryClick,
      handleLanguageCategoryClick,
      handleBundlingCategoryClick,
      toggleAgeCategoryOpen,
      toggleActivityCategoryOpen,
      toggleLanguageCategoryOpen,
      toggleBundlingCategoryOpen,
      resetFilters,
      hasActiveFilters,
    ]
  );

  // Memoize Desktop Sidebar
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

  return (
    <>
      {DesktopSidebar}
      <MobileSidebarWrapper />
    </>
  );
};

SidebarFilter.displayName = "SidebarFilter";

export default SidebarFilter;

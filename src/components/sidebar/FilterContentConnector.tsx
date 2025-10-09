// sidebar/FilterContentConnector.tsx
import React, { useCallback, useMemo } from "react";
import { useFilterStore } from "@/store/filterStore";
import { FilterContent } from "./FilterContent";

// ========================================
// FILTER CONTENT CONNECTOR (Bridge to Store)
// ========================================

export const FilterContentConnector: React.FC = () => {
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

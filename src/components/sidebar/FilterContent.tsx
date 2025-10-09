// sidebar/FilterContent.tsx
import React from "react";
import { SearchSection } from "./SearchSection";
import { FilterSection } from "./FilterSection";
import { BottomSection } from "./BottomSection";
import {
  AgeCategoryButton,
  ActivityCategoryButton,
  LanguageCategoryButton,
  BundlingCategoryButton,
} from "./CategoryButtons";
import type { FilterContentProps } from "./types";

// ========================================
// FILTER CONTENT COMPONENT
// ========================================

export const FilterContent: React.FC<FilterContentProps> = React.memo((props) => {
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

  // Check if bundling section should be shown
  const shouldShowBundling = selectedAgeCategory === "all-age" && selectedActivityCategory === "all-activities";

  return (
    <>
      {/* Search Section */}
      <SearchSection searchTerm={searchTerm} onSearchChange={onSearchChange} />

      {/* Age Category Section */}
      {!isBundlingMode && (
        <FilterSection title="Usia" isOpen={isAgeCategoryOpen} onToggle={onToggleAgeCategory} disabled={isBundlingMode}>
          {ageCategories.map((category) => (
            <AgeCategoryButton
              key={category.id}
              category={category}
              isSelected={selectedAgeCategory === category.id}
              onClick={onAgeCategoryClick}
              // disabled={isBundlingMode}
            />
          ))}
        </FilterSection>
      )}

      {/* Activity Category Section */}
      {!isBundlingMode && (
        <FilterSection
          title="Aktivitas"
          isOpen={isActivityCategoryOpen}
          onToggle={onToggleActivityCategory}
          disabled={isBundlingMode}
        >
          {activityCategories.map((category) => (
            <ActivityCategoryButton
              key={category.id}
              category={category}
              isSelected={selectedActivityCategory === category.id}
              onClick={onActivityCategoryClick}
              // disabled={isBundlingMode}
            />
          ))}
        </FilterSection>
      )}

      {/* Language Category Section */}
      <FilterSection title="Bahasa" isOpen={isLanguageCategoryOpen} onToggle={onToggleLanguageCategory}>
        {languageCategories.map((category) => (
          <LanguageCategoryButton
            key={category.id}
            category={category}
            isSelected={selectedLanguageCategory === category.id}
            onClick={onLanguageCategoryClick}
          />
        ))}
      </FilterSection>

      {/* Bundling Category Section - Only show when age = "all-age" */}
      {shouldShowBundling && (
        <FilterSection title="Bundling" isOpen={isBundlingCategoryOpen} onToggle={onToggleBundlingCategory}>
          {bundlingCategories.map((category) => (
            <BundlingCategoryButton
              key={category.id}
              category={category}
              isSelected={selectedBundlingCategory === category.id}
              onClick={onBundlingCategoryClick}
            />
          ))}
        </FilterSection>
      )}

      {/* Bottom Section */}
      <BottomSection
        totalResults={totalResults}
        totalProducts={totalProducts}
        hasActiveFilters={hasActiveFilters}
        onReset={onReset}
      />
    </>
  );
});

FilterContent.displayName = "FilterContent";

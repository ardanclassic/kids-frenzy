// sidebar/types.ts

// ========================================
// CATEGORY TYPES
// ========================================

export interface AgeCategory {
  id: string;
  name: string;
  emoji: string;
  color: string;
  minAge?: number;
}

export interface ActivityCategory {
  id: string;
  name: string;
  icon: string;
  emoji: string;
  description: string;
}

export interface LanguageCategory {
  id: string;
  name: string;
  emoji: string;
  icon: string;
  description: string;
  color: string;
}

export interface BundlingCategory {
  id: string;
  name: string;
  emoji: string;
  icon: string;
  description: string;
  color: string;
}

// ========================================
// COMPONENT PROPS
// ========================================

export interface FilterContentProps {
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

export interface FilterSectionProps<T> {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  categories: T[];
  selectedCategory: string;
  onCategoryClick: (categoryId: string) => void;
  disabled?: boolean;
  renderCategory: (category: T, isSelected: boolean) => React.ReactNode;
}

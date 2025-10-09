// filterStore.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

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

interface FilterState {
  // Filter Values (PERSISTED)
  searchTerm: string;
  selectedAgeCategory: string;
  selectedActivityCategory: string;
  selectedLanguageCategory: string;
  selectedBundlingCategory: string;

  // Data Arrays (NOT persisted - will be set by components)
  ageCategories: AgeCategory[];
  activityCategories: ActivityCategory[];
  languageCategories: LanguageCategory[];
  bundlingCategories: BundlingCategory[];

  // Statistics (NOT persisted)
  totalResults: number;
  totalProducts: number;

  // UI State (NOT persisted)
  isMobileFilterOpen: boolean;
  isAgeCategoryOpen: boolean;
  isActivityCategoryOpen: boolean;
  isLanguageCategoryOpen: boolean;
  isBundlingCategoryOpen: boolean;

  // Setters - hanya untuk filter values dan UI state
  setSearchTerm: (term: string) => void;
  setSelectedAgeCategory: (categoryId: string) => void;
  setSelectedActivityCategory: (activityCategoryId: string) => void;
  setSelectedLanguageCategory: (languageCategoryId: string) => void;
  setSelectedBundlingCategory: (bundlingCategoryId: string) => void;
  setIsMobileFilterOpen: (isOpen: boolean) => void;
  toggleAgeCategoryOpen: () => void;
  toggleActivityCategoryOpen: () => void;
  toggleLanguageCategoryOpen: () => void;
  toggleBundlingCategoryOpen: () => void;
  resetFilters: () => void;

  // Computed Values
  hasActiveFilters: boolean;
  activeFilterCount: number;
  isBundlingMode: boolean; // NEW: untuk cek apakah sedang dalam mode bundling
}

// ========================================
// HELPER: Calculate Active Filter Count
// ========================================

const calculateActiveFilterCount = (state: FilterState): number => {
  const filters = [
    state.selectedAgeCategory !== "all-age",
    state.selectedActivityCategory !== "all-activities",
    state.selectedLanguageCategory !== "all-languages",
    state.selectedBundlingCategory !== "no-bundles",
    state.searchTerm !== "",
  ];
  return filters.filter(Boolean).length;
};

const calculateHasActiveFilters = (state: FilterState): boolean => {
  return (
    state.selectedAgeCategory !== "all-age" ||
    state.selectedActivityCategory !== "all-activities" ||
    state.selectedLanguageCategory !== "all-languages" ||
    state.selectedBundlingCategory !== "no-bundle" ||
    state.searchTerm !== ""
  );
};

const calculateIsBundlingMode = (state: FilterState): boolean => {
  return state.selectedBundlingCategory !== "no-bundle";
};

// ========================================
// ZUSTAND STORE WITH PERSISTENCE
// ========================================

export const useFilterStore = create<FilterState>()(
  persist(
    (set) => ({
      // Initial State
      searchTerm: "",
      selectedAgeCategory: "all-age",
      selectedActivityCategory: "all-activities",
      selectedLanguageCategory: "all-languages",
      selectedBundlingCategory: "no-bundle",
      ageCategories: [],
      activityCategories: [],
      languageCategories: [],
      bundlingCategories: [],
      totalResults: 0,
      totalProducts: 0,
      isMobileFilterOpen: false,
      isAgeCategoryOpen: true,
      isActivityCategoryOpen: true,
      isLanguageCategoryOpen: true,
      isBundlingCategoryOpen: true,

      // Computed Values - Initial
      hasActiveFilters: false,
      activeFilterCount: 0,
      isBundlingMode: false,

      // ========================================
      // ACTIONS - Filter Values
      // ========================================

      setSearchTerm: (term) => {
        set((state) => {
          const newState = { ...state, searchTerm: term };
          return {
            searchTerm: term,
            hasActiveFilters: calculateHasActiveFilters(newState),
            activeFilterCount: calculateActiveFilterCount(newState),
          };
        });
      },

      setSelectedAgeCategory: (categoryId) => {
        set((state) => {
          const newState = {
            ...state,
            selectedAgeCategory: categoryId,
            selectedActivityCategory: "all-activities", // Reset activity saat usia berubah
            // Reset bundling jika bukan "all-age"
            selectedBundlingCategory: categoryId !== "all-age" ? "no-bundle" : state.selectedBundlingCategory,
          };
          return {
            selectedAgeCategory: categoryId,
            selectedActivityCategory: "all-activities",
            selectedBundlingCategory: newState.selectedBundlingCategory,
            hasActiveFilters: calculateHasActiveFilters(newState),
            activeFilterCount: calculateActiveFilterCount(newState),
            isBundlingMode: calculateIsBundlingMode(newState),
          };
        });
      },

      setSelectedActivityCategory: (activityCategoryId) => {
        set((state) => {
          const newState = { ...state, selectedActivityCategory: activityCategoryId };
          return {
            selectedActivityCategory: activityCategoryId,
            hasActiveFilters: calculateHasActiveFilters(newState),
            activeFilterCount: calculateActiveFilterCount(newState),
          };
        });
      },

      setSelectedLanguageCategory: (languageCategoryId) => {
        set((state) => {
          const newState = { ...state, selectedLanguageCategory: languageCategoryId };
          return {
            selectedLanguageCategory: languageCategoryId,
            hasActiveFilters: calculateHasActiveFilters(newState),
            activeFilterCount: calculateActiveFilterCount(newState),
          };
        });
      },

      setSelectedBundlingCategory: (bundlingCategoryId) => {
        set((state) => {
          const newState = {
            ...state,
            selectedBundlingCategory: bundlingCategoryId,
            // Jika bundling dipilih (bukan no-bundle), reset age dan activity
            selectedAgeCategory: bundlingCategoryId !== "no-bundle" ? "all-age" : state.selectedAgeCategory,
            selectedActivityCategory:
              bundlingCategoryId !== "no-bundle" ? "all-activities" : state.selectedActivityCategory,
          };
          return {
            selectedBundlingCategory: bundlingCategoryId,
            selectedAgeCategory: newState.selectedAgeCategory,
            selectedActivityCategory: newState.selectedActivityCategory,
            hasActiveFilters: calculateHasActiveFilters(newState),
            activeFilterCount: calculateActiveFilterCount(newState),
            isBundlingMode: calculateIsBundlingMode(newState),
          };
        });
      },

      // ========================================
      // ACTIONS - UI State
      // ========================================

      setIsMobileFilterOpen: (isOpen) => {
        set({ isMobileFilterOpen: isOpen });
      },

      toggleAgeCategoryOpen: () => {
        set((state) => ({ isAgeCategoryOpen: !state.isAgeCategoryOpen }));
      },

      toggleActivityCategoryOpen: () => {
        set((state) => ({ isActivityCategoryOpen: !state.isActivityCategoryOpen }));
      },

      toggleLanguageCategoryOpen: () => {
        set((state) => ({ isLanguageCategoryOpen: !state.isLanguageCategoryOpen }));
      },

      toggleBundlingCategoryOpen: () => {
        set((state) => ({ isBundlingCategoryOpen: !state.isBundlingCategoryOpen }));
      },

      // ========================================
      // ACTIONS - Reset
      // ========================================

      resetFilters: () => {
        set({
          searchTerm: "",
          selectedAgeCategory: "all-age",
          selectedActivityCategory: "all-activities",
          selectedLanguageCategory: "all-languages",
          selectedBundlingCategory: "no-bundle",
          hasActiveFilters: false,
          activeFilterCount: 0,
          isBundlingMode: false,
        });
      },
    }),
    {
      name: "kids-frenzy-filters", // localStorage key
      storage: createJSONStorage(() => localStorage),
      // Only persist filter values, not UI state or data arrays
      partialize: (state) => ({
        searchTerm: state.searchTerm,
        selectedAgeCategory: state.selectedAgeCategory,
        selectedActivityCategory: state.selectedActivityCategory,
        selectedLanguageCategory: state.selectedLanguageCategory,
        selectedBundlingCategory: state.selectedBundlingCategory,
      }),
      // Rehydrate computed values after loading from localStorage
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.hasActiveFilters = calculateHasActiveFilters(state);
          state.activeFilterCount = calculateActiveFilterCount(state);
          state.isBundlingMode = calculateIsBundlingMode(state);
        }
      },
    }
  )
);

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

interface FilterState {
  // Filter Values (PERSISTED)
  searchTerm: string;
  selectedAgeCategory: string;
  selectedActivityCategory: string;

  // Data Arrays (NOT persisted - will be set by components)
  ageCategories: AgeCategory[];
  activityCategories: ActivityCategory[];

  // Statistics (NOT persisted)
  totalResults: number;
  totalProducts: number;

  // UI State (NOT persisted)
  isMobileFilterOpen: boolean;
  isAgeCategoryOpen: boolean;
  isActivityCategoryOpen: boolean;

  // Setters - hanya untuk filter values dan UI state
  setSearchTerm: (term: string) => void;
  setSelectedAgeCategory: (categoryId: string) => void;
  setSelectedActivityCategory: (activityCategoryId: string) => void;
  setIsMobileFilterOpen: (isOpen: boolean) => void;
  toggleAgeCategoryOpen: () => void;
  toggleActivityCategoryOpen: () => void;
  resetFilters: () => void;

  // Computed Values
  hasActiveFilters: boolean;
  activeFilterCount: number;
}

// ========================================
// HELPER: Calculate Active Filter Count
// ========================================

const calculateActiveFilterCount = (state: FilterState): number => {
  const filters = [
    state.selectedAgeCategory !== "semua",
    state.selectedActivityCategory !== "all-activities",
    state.searchTerm !== "",
  ];
  return filters.filter(Boolean).length;
};

const calculateHasActiveFilters = (state: FilterState): boolean => {
  return (
    state.selectedAgeCategory !== "semua" ||
    state.selectedActivityCategory !== "all-activities" ||
    state.searchTerm !== ""
  );
};

// ========================================
// ZUSTAND STORE WITH PERSISTENCE
// ========================================

export const useFilterStore = create<FilterState>()(
  persist(
    (set) => ({
      // Initial State
      searchTerm: "",
      selectedAgeCategory: "semua",
      selectedActivityCategory: "all-activities",
      ageCategories: [],
      activityCategories: [],
      totalResults: 0,
      totalProducts: 0,
      isMobileFilterOpen: false,
      isAgeCategoryOpen: true,
      isActivityCategoryOpen: true,

      // Computed Values - Initial
      hasActiveFilters: false,
      activeFilterCount: 0,

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
            selectedActivityCategory: "all-activities", // Reset kategori saat usia berubah
          };
          return {
            selectedAgeCategory: categoryId,
            selectedActivityCategory: "all-activities",
            hasActiveFilters: calculateHasActiveFilters(newState),
            activeFilterCount: calculateActiveFilterCount(newState),
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

      // ========================================
      // ACTIONS - Reset
      // ========================================

      resetFilters: () => {
        set({
          searchTerm: "",
          selectedAgeCategory: "semua",
          selectedActivityCategory: "all-activities",
          hasActiveFilters: false,
          activeFilterCount: 0,
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
      }),
      // Rehydrate computed values after loading from localStorage
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.hasActiveFilters = calculateHasActiveFilters(state);
          state.activeFilterCount = calculateActiveFilterCount(state);
        }
      },
    }
  )
);

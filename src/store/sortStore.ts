// sortStore.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// ========================================
// TYPES & INTERFACES
// ========================================

export type SortOption = "default" | "name-asc" | "name-desc" | "price-asc" | "price-desc" | "age-asc" | "age-desc";

export interface SortOptionInfo {
  id: SortOption;
  label: string;
  description: string;
}

interface SortState {
  // Sort Value (PERSISTED)
  selectedSort: SortOption;

  // Available sort options
  sortOptions: SortOptionInfo[];

  // Setter
  setSelectedSort: (sortOption: SortOption) => void;
  resetSort: () => void;
}

// ========================================
// SORT OPTIONS DATA
// ========================================

const SORT_OPTIONS: SortOptionInfo[] = [
  {
    id: "default",
    label: "Relevan",
    description: "Urutkan berdasarkan relevansi",
  },
  {
    id: "name-asc",
    label: "Nama (A-Z)",
    description: "Urutkan nama dari A ke Z",
  },
  {
    id: "name-desc",
    label: "Nama (Z-A)",
    description: "Urutkan nama dari Z ke A",
  },
  {
    id: "price-asc",
    label: "Harga Terendah",
    description: "Urutkan dari harga terrendah",
  },
  {
    id: "price-desc",
    label: "Harga Tertinggi",
    description: "Urutkan dari harga tertinggi",
  },
  {
    id: "age-asc",
    label: "Usia Termuda",
    description: "Urutkan dari usia termuda",
  },
  {
    id: "age-desc",
    label: "Usia Tertua",
    description: "Urutkan dari usia tertua",
  },
];

// ========================================
// ZUSTAND STORE WITH PERSISTENCE
// ========================================

export const useSortStore = create<SortState>()(
  persist(
    (set) => ({
      // Initial State
      selectedSort: "default",
      sortOptions: SORT_OPTIONS,

      // ========================================
      // ACTIONS
      // ========================================

      setSelectedSort: (sortOption) => {
        set({ selectedSort: sortOption });
      },

      resetSort: () => {
        set({ selectedSort: "default" });
      },
    }),
    {
      name: "kids-frenzy-sort", // localStorage key
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        selectedSort: state.selectedSort,
      }),
    }
  )
);

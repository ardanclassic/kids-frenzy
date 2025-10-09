// sidebar/SearchSection.tsx
import React, { useCallback } from "react";
import { Search, X } from "lucide-react";

// ========================================
// SEARCH SECTION COMPONENT
// ========================================

interface SearchSectionProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export const SearchSection: React.FC<SearchSectionProps> = React.memo(({ searchTerm, onSearchChange }) => {
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
  );
});

SearchSection.displayName = "SearchSection";

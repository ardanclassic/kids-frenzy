// sidebar/BottomSection.tsx
import React from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

// ========================================
// BOTTOM SECTION COMPONENT
// ========================================

interface BottomSectionProps {
  totalResults: number;
  totalProducts: number;
  hasActiveFilters: boolean;
  onReset: () => void;
}

export const BottomSection: React.FC<BottomSectionProps> = React.memo(({
  totalResults,
  totalProducts,
  hasActiveFilters,
  onReset,
}) => {
  return (
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
  );
});

BottomSection.displayName = "BottomSection";
// sidebar/FilterSection.tsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

// ========================================
// GENERIC FILTER SECTION COMPONENT
// ========================================

interface FilterSectionProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

export const FilterSection: React.FC<FilterSectionProps> = React.memo(({
  title,
  isOpen,
  onToggle,
  disabled = false,
  children,
}) => {
  return (
    <div className="filter-section">
      <button
        onClick={onToggle}
        className="section-header"
        aria-expanded={isOpen}
        type="button"
        disabled={disabled}
        style={{ 
          opacity: disabled ? 0.5 : 1, 
          cursor: disabled ? "not-allowed" : "pointer" 
        }}
      >
        <h3 className="section-title">{title}</h3>
        <ChevronDown className={`chevron-icon ${isOpen ? "rotate" : ""}`} />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.15, ease: "easeInOut" }}
            className="section-content"
          >
            <div className="filter-options">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

FilterSection.displayName = "FilterSection";
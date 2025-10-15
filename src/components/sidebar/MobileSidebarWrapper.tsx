// sidebar/MobileSidebarWrapper.tsx
import React, { useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, X } from "lucide-react";
import { useFilterStore } from "@/store/filterStore";
import { FilterContentConnector } from "./FilterContentConnector";

// ========================================
// MOBILE SIDEBAR WRAPPER COMPONENT
// ========================================

export const MobileSidebarWrapper: React.FC = () => {
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
              <SlidersHorizontal className="header-icon" aria-hidden="true" />
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

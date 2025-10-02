import React from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  // Generate page numbers for pagination - optimized for mobile
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 3; // Reduced for mobile

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 2) {
        for (let i = 1; i <= 3; i++) pages.push(i);
        if (totalPages > 3) {
          pages.push("...");
          pages.push(totalPages);
        }
      } else if (currentPage >= totalPages - 1) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 2; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push("...");
        pages.push(currentPage);
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <motion.div
      className="flex justify-center items-center mt-6 sm:mt-8 lg:mt-12 px-2"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* Previous Button */}
        <button
          onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
          className="p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-white/90 backdrop-blur-sm border border-teal-200/50 text-teal-600 hover:bg-teal-500 hover:text-white hover:border-teal-500 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow-md"
          aria-label="Previous page"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Page Numbers */}
        <div className="flex gap-1 sm:gap-1.5">
          {getPageNumbers().map((page, index) =>
            page === "..." ? (
              <span
                key={`ellipsis-${index}`}
                className="w-7 h-7 sm:w-9 sm:h-9 flex items-center justify-center text-gray-400 text-sm"
              >
                ···
              </span>
            ) : (
              <button
                key={page}
                onClick={() => onPageChange(page as number)}
                className={`w-7 h-7 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  currentPage === page
                    ? "bg-gradient-to-br from-teal-500 to-blue-500 text-white shadow-lg shadow-teal-500/30 scale-105"
                    : "bg-white/90 backdrop-blur-sm text-teal-600 hover:bg-teal-50 border border-gray-200/50 hover:border-teal-300 shadow-sm"
                }`}
              >
                {page}
              </button>
            )
          )}
        </div>

        {/* Next Button */}
        <button
          onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-white/90 backdrop-blur-sm border border-teal-200/50 text-teal-600 hover:bg-teal-500 hover:text-white hover:border-teal-500 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow-md"
          aria-label="Next page"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>
    </motion.div>
  );
};

export default Pagination;

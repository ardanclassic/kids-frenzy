import React from "react";
import { motion } from "framer-motion";
import { Star, Download, Heart, Eye, Search, X, ChevronLeft, ChevronRight } from "lucide-react";

// Product interface
export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  ageRange: string;
  price: number;
  rating: number;
  downloads: number;
  image: string;
  features: string[];
  skills: string[];
  duration: string;
  preview: string[];
}

// Product Card Component
interface ProductCardProps {
  product: Product;
  isFavorite: boolean;
  onToggleFavorite: (productId: number) => void;
  onProductClick: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, isFavorite, onToggleFavorite, onProductClick }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <motion.div
      className="card-product group cursor-pointer"
      onClick={() => onProductClick(product)}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      {/* Product Image */}
      <div className="relative mb-4 overflow-hidden rounded-xl">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-kid-blue">
            {product.category.toUpperCase()}
          </span>
        </div>

        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(product.id);
          }}
          className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-all duration-200 hover:scale-110"
        >
          <Heart
            className={`w-5 h-5 transition-colors ${
              isFavorite ? "text-red-500 fill-red-500" : "text-gray-600 hover:text-red-400"
            }`}
          />
        </button>

        {/* Preview Button */}
        <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <button
            onClick={(e) => e.stopPropagation()}
            className="flex items-center space-x-2 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-full text-sm font-medium text-kid-blue hover:bg-white transition-all duration-200 hover:scale-105"
          >
            <Eye className="w-4 h-4" />
            <span>Preview</span>
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-3">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-kid-blue transition-colors duration-200 line-clamp-2 leading-tight">
            {product.title}
          </h3>
          <span className="bg-kid-yellow/20 text-kid-yellow px-3 py-1 rounded-full text-sm font-bold whitespace-nowrap ml-2">
            {product.ageRange}
          </span>
        </div>

        <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">{product.description}</p>

        {/* Skills Tags */}
        <div className="flex flex-wrap gap-2">
          {product.skills.slice(0, 3).map((skill, index) => (
            <span
              key={index}
              className="bg-kid-purple/10 text-kid-purple px-2 py-1 rounded-lg text-xs font-medium border border-kid-purple/20"
            >
              {skill}
            </span>
          ))}
          {product.skills.length > 3 && (
            <span className="bg-gray-100 text-gray-500 px-2 py-1 rounded-lg text-xs font-medium">
              +{product.skills.length - 3} lagi
            </span>
          )}
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <span className="font-medium">{product.rating}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Download className="w-4 h-4" />
              <span>{product.downloads.toLocaleString()}</span>
            </div>
          </div>
          <div className="text-xl font-bold text-kid-pink">{formatPrice(product.price)}</div>
        </div>
      </div>
    </motion.div>
  );
};

// Loading Skeleton Component
export const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="card-product animate-pulse">
      {/* Image Skeleton */}
      <div className="w-full h-48 bg-gray-200 rounded-xl mb-4"></div>

      {/* Content Skeleton */}
      <div className="space-y-3">
        <div className="flex justify-between items-start">
          <div className="h-6 bg-gray-200 rounded w-3/4"></div>
          <div className="h-6 bg-gray-200 rounded w-16"></div>
        </div>

        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>

        <div className="flex space-x-2">
          <div className="h-6 bg-gray-200 rounded w-16"></div>
          <div className="h-6 bg-gray-200 rounded w-20"></div>
          <div className="h-6 bg-gray-200 rounded w-14"></div>
        </div>

        <div className="flex justify-between items-center pt-3 border-t border-gray-100">
          <div className="flex space-x-4">
            <div className="h-4 bg-gray-200 rounded w-12"></div>
            <div className="h-4 bg-gray-200 rounded w-16"></div>
          </div>
          <div className="h-6 bg-gray-200 rounded w-20"></div>
        </div>
      </div>
    </div>
  );
};

// Category Filter Component
interface CategoryFilterProps {
  categories: Array<{
    id: string;
    name: string;
    emoji: string;
    color: string;
  }>;
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({ categories, selectedCategory, onCategoryChange }) => {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {categories.map((category) => (
        <motion.button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={`filter-button ${selectedCategory === category.id ? "active" : ""}`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="flex items-center space-x-2">
            <span className="text-lg">{category.emoji}</span>
            <span>{category.name}</span>
          </span>
        </motion.button>
      ))}
    </div>
  );
};

// Search Bar Component
interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  onSearchChange,
  placeholder = "Cari produk edukatif...",
}) => {
  return (
    <div className="relative max-w-2xl mx-auto">
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
        <Search className="w-5 h-5 text-gray-400" />
      </div>
      <input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full pl-12 pr-4 py-4 bg-white/90 backdrop-blur-sm rounded-full border-2 border-gray-100 focus:border-kid-blue focus:outline-none text-lg font-medium shadow-lg transition-all duration-200 focus:shadow-xl"
      />
      {searchTerm && (
        <button
          onClick={() => onSearchChange("")}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-4 h-4 text-gray-400" />
        </button>
      )}
    </div>
  );
};

// Pagination Component
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    const showPages = 5;

    if (totalPages <= showPages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= showPages - 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - showPages + 2; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <motion.div
      className="flex justify-center items-center space-x-2 md:space-x-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <button
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        className="p-3 rounded-full bg-white/80 backdrop-blur-sm border-2 border-kid-blue/20 text-kid-blue hover:bg-kid-blue hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <div className="flex space-x-1 md:space-x-2">
        {getPageNumbers().map((page, index) =>
          page === "..." ? (
            <span key={`ellipsis-${index}`} className="px-3 py-2 text-gray-400">
              ...
            </span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page as number)}
              className={`w-10 h-10 md:w-12 md:h-12 rounded-full font-bold transition-all duration-200 ${
                currentPage === page
                  ? "bg-kid-blue text-white shadow-lg scale-110"
                  : "bg-white/80 backdrop-blur-sm text-kid-blue hover:bg-kid-blue/10 hover:scale-105"
              }`}
            >
              {page}
            </button>
          )
        )}
      </div>

      <button
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="p-3 rounded-full bg-white/80 backdrop-blur-sm border-2 border-kid-blue/20 text-kid-blue hover:bg-kid-blue hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </motion.div>
  );
};

// Empty State Component
interface EmptyStateProps {
  title: string;
  description: string;
  onReset?: () => void;
  resetLabel?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ title, description, onReset, resetLabel = "Reset" }) => {
  return (
    <motion.div
      className="text-center py-20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="w-24 h-24 bg-gradient-to-br from-kid-blue/20 to-kid-purple/20 rounded-full flex items-center justify-center mx-auto mb-6">
        <Search className="w-12 h-12 text-kid-blue" />
      </div>
      <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">{title}</h3>
      <p className="text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">{description}</p>
      {onReset && (
        <button onClick={onReset} className="btn-primary">
          {resetLabel}
        </button>
      )}
    </motion.div>
  );
};

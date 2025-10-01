import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Palette,
  PenTool,
  Scissors,
  Users,
  BookMarked,
  MoreHorizontal,
  Shuffle,
  Target,
  Brain,
  type LucideIcon,
} from "lucide-react";
import mock from "./mock.json";
import { categories } from "./categories.json";
import ProductDetailModal from "@/components/ProductDetailModal/ProductDetailModal";
import AgeCategoryFilter from "@/components/AgeCategoryFilter/AgeCategoryFilter";
import SubcategoryFilter from "@/components/SubCategoryFilter/SubCategoryFilter";
import ProductsGrid from "@/components/ProductsGrid";

interface Product {
  id: number;
  title: string;
  description: string;
  ageCategory: string;
  subcategory: string;
  ageRange: string;
  minAge: number;
  price: number;
  image: string;
  features: string[];
  skills: string[];
  preview: string[];
}

// Icon mapping object
const iconMap: Record<string, LucideIcon> = {
  Sparkles,
  BookMarked,
  Target,
  Shuffle,
  Palette,
  Brain,
  Scissors,
  PenTool,
  Users,
  MoreHorizontal,
};

const ProductsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAgeCategory, setSelectedAgeCategory] = useState("semua");
  const [selectedSubcategory, setSelectedSubcategory] = useState("all-activities");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const productsPerPage = 6;

  const ageCategories = [
    { id: "semua", name: "Semua Usia", emoji: "🎯", color: "teal" },
    { id: "1+", name: "1+ Tahun", emoji: "👶", color: "coral", minAge: 1 },
    { id: "2+", name: "2+ Tahun", emoji: "🧸", color: "lavender", minAge: 2 },
    { id: "3+", name: "3+ Tahun", emoji: "🎨", color: "sage", minAge: 3 },
    { id: "5+", name: "5+ Tahun", emoji: "🚀", color: "purple", minAge: 5 },
  ];

  const allSubcategories = categories;

  // Get available subcategories based on selected age
  const availableSubcategories = useMemo(() => {
    if (selectedAgeCategory === "semua") {
      return allSubcategories;
    }

    const productsForAge = (mock.mockdata as Product[]).filter(
      (product) => product.ageCategory === selectedAgeCategory
    );

    const subcategoriesWithProducts = new Set(productsForAge.map((p) => p.subcategory));

    return allSubcategories.filter((sub) => sub.id === "all-activities" || subcategoriesWithProducts.has(sub.id));
  }, [selectedAgeCategory]);

  // Filter and search products
  const filteredProducts = useMemo(() => {
    let filtered = mock.mockdata as Product[];

    if (selectedAgeCategory !== "semua") {
      filtered = filtered.filter((product) => product.ageCategory === selectedAgeCategory);
    }

    if (selectedSubcategory !== "all-activities") {
      filtered = filtered.filter((product) => product.subcategory === selectedSubcategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  }, [searchTerm, selectedAgeCategory, selectedSubcategory]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getSubcategoryInfo = (subcategoryId: string) => {
    return allSubcategories.find((sub) => sub.id === subcategoryId) || allSubcategories[0];
  };

  const getAgeCategoryName = (ageCategoryId: string) => {
    const category = ageCategories.find((cat) => cat.id === ageCategoryId);
    return category ? category.name : ageCategoryId;
  };

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedAgeCategory("semua");
    setSelectedSubcategory("all-activities");
    setCurrentPage(1);
  };

  const handleAgeChange = (ageId: string) => {
    setSelectedAgeCategory(ageId);
    setSelectedSubcategory("all-activities");
    setCurrentPage(1);
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push("...");
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="pt-40 pb-12 px-4">
      <div className="container mx-auto">
        {/* Header Section */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-6xl mb-6">
            <span className="text-gradient">Produk Digital Edukatif</span>
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Koleksi lengkap produk pembelajaran digital untuk tumbuh kembang optimal si kecil
          </p>
        </motion.div>

        {/* Search and Filter Section */}
        <motion.div
          className="mb-12 space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
              <Search className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Cari produk edukatif..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white/90 backdrop-blur-sm rounded-full border-2 border-gray-100 focus:border-teal-500 focus:outline-none text-lg font-medium shadow-lg transition-all duration-200"
            />
          </div>

          {/* Age Category Filter */}
          <AgeCategoryFilter
            categories={ageCategories}
            selectedCategory={selectedAgeCategory}
            onCategoryChange={handleAgeChange}
          />

          {/* Subcategory Filter */}
          <SubcategoryFilter
            subcategories={availableSubcategories}
            selectedSubcategory={selectedSubcategory}
            onSubcategoryChange={(id) => {
              setSelectedSubcategory(id);
              setCurrentPage(1);
            }}
            iconMap={iconMap}
            ageNote={
              selectedAgeCategory !== "semua"
                ? `(tersedia untuk ${getAgeCategoryName(selectedAgeCategory)})`
                : undefined
            }
          />
        </motion.div>

        {/* Active Filters Display */}
        {(selectedAgeCategory !== "semua" || selectedSubcategory !== "all-activities" || searchTerm) && (
          <motion.div
            className="mb-6 flex flex-wrap items-center gap-3"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="text-gray-600 font-medium">Filter aktif:</span>
            {selectedAgeCategory !== "semua" && (
              <span className="px-3 py-1 bg-coral-100 text-coral-600 rounded-full text-sm font-medium">
                Usia: {getAgeCategoryName(selectedAgeCategory)}
              </span>
            )}
            {selectedSubcategory !== "all-activities" && (
              <span className="px-3 py-1 bg-teal-100 text-teal-600 rounded-full text-sm font-medium">
                {getSubcategoryInfo(selectedSubcategory).name}
              </span>
            )}
            {searchTerm && (
              <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm font-medium">
                "{searchTerm}"
              </span>
            )}
            <button
              onClick={resetFilters}
              className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors"
            >
              Reset semua
            </button>
          </motion.div>
        )}

        {/* Results Count */}
        <motion.div
          className="mb-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-gray-600">
            Menampilkan <span className="text-teal-600">{filteredProducts.length}</span>
            {filteredProducts.length !== (mock.mockdata as Product[]).length && (
              <span> dari {(mock.mockdata as Product[]).length} total produk</span>
            )}
          </p>
        </motion.div>

        {/* Products Grid */}
        <ProductsGrid
          products={currentProducts}
          selectedAgeCategory={selectedAgeCategory}
          selectedSubcategory={selectedSubcategory}
          searchTerm={searchTerm}
          onProductClick={setSelectedProduct}
          getSubcategoryInfo={getSubcategoryInfo}
          formatPrice={formatPrice}
        />

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div
            className="flex justify-center items-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex items-center gap-2">
              {/* Previous Button */}
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 md:p-3 rounded-lg bg-white/80 backdrop-blur-sm border border-teal-200 text-teal-500 hover:bg-teal-500 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
              >
                <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
              </button>

              {/* Page Numbers */}
              <div className="flex gap-1 md:gap-2">
                {getPageNumbers().map((page, index) =>
                  page === "..." ? (
                    <span key={`ellipsis-${index}`} className="px-2 py-2 text-gray-400">
                      ...
                    </span>
                  ) : (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page as number)}
                      className={`w-8 h-8 md:w-10 md:h-10 rounded-lg text-sm md:text-base font-medium transition-all duration-200 ${
                        currentPage === page
                          ? "bg-teal-500 text-white shadow-lg"
                          : "bg-white/80 backdrop-blur-sm text-teal-500 hover:bg-teal-50 border border-gray-200"
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}
              </div>

              {/* Next Button */}
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-2 md:p-3 rounded-lg bg-white/80 backdrop-blur-sm border border-teal-200 text-teal-500 hover:bg-teal-500 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
              >
                <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
              </button>
            </div>
          </motion.div>
        )}

        {/* No Results */}
        {filteredProducts.length === 0 && (
          <motion.div className="text-center py-20" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl text-gray-800 mb-4">Tidak ada produk ditemukan</h3>
            <p className="text-gray-600 mb-8">Coba ubah kata kunci pencarian atau filter kategori</p>
            <button
              onClick={resetFilters}
              className="px-6 py-3 bg-teal-500 text-white rounded-full font-medium hover:bg-teal-600 transition-colors"
            >
              Reset Pencarian
            </button>
          </motion.div>
        )}
      </div>

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        getSubcategoryInfo={getSubcategoryInfo}
        formatPrice={formatPrice}
      />
    </div>
  );
};

export default ProductsPage;

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Eye,
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
import ProductDetailModal from "./ProductDetailModal";

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

  const containerVariants: any = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
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

          {/* Age Category Filters */}
          <div>
            <h3 className="text-lg text-gray-800 text-center mb-4">Filter berdasarkan Usia</h3>
            {/* Desktop: Wrapped buttons */}
            <div className="hidden md:flex flex-wrap justify-center gap-4 mb-6">
              {ageCategories.map((category) => (
                <motion.button
                  key={category.id}
                  onClick={() => handleAgeChange(category.id)}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-200 cursor-pointer ${
                    selectedAgeCategory === category.id
                      ? "bg-teal-500 text-white shadow-lg scale-105"
                      : "bg-white/80 text-gray-700 hover:bg-gray-50 border-2 border-gray-200"
                  }`}
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

            {/* Mobile: Horizontal scroll */}
            <div className="md:hidden relative">
              <style>{`
                .age-scroll {
                  scrollbar-width: thin;
                  scrollbar-color: #14b8a6 #f1f5f9;
                }
                .age-scroll::-webkit-scrollbar {
                  height: 6px;
                }
                .age-scroll::-webkit-scrollbar-track {
                  background: #f1f5f9;
                  border-radius: 10px;
                }
                .age-scroll::-webkit-scrollbar-thumb {
                  background: #14b8a6;
                  border-radius: 10px;
                }
                .age-scroll::-webkit-scrollbar-thumb:hover {
                  background: #0d9488;
                }
              `}</style>
              <div className="age-scroll flex gap-3 overflow-x-auto pb-4 px-2">
                {ageCategories.map((category) => (
                  <motion.button
                    key={category.id}
                    onClick={() => handleAgeChange(category.id)}
                    className={`flex-shrink-0 px-6 py-3 rounded-full font-medium transition-all duration-200 cursor-pointer ${
                      selectedAgeCategory === category.id
                        ? "bg-teal-500 text-white shadow-lg"
                        : "bg-white/80 text-gray-700 hover:bg-gray-50 border-2 border-gray-200"
                    }`}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="flex items-center space-x-2 whitespace-nowrap">
                      <span className="text-lg">{category.emoji}</span>
                      <span>{category.name}</span>
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          {/* Subcategory Filters - Horizontal Scrollable */}
          <div>
            <h3 className="text-lg text-gray-800 text-center mb-4">
              Filter berdasarkan Jenis Aktivitas
              {selectedAgeCategory !== "semua" && (
                <span className="text-sm font-normal text-gray-500 ml-2">
                  (tersedia untuk {getAgeCategoryName(selectedAgeCategory)})
                </span>
              )}
            </h3>
            <div className="relative">
              <style>{`
                .subcategory-scroll {
                  scrollbar-width: thin;
                  scrollbar-color: #14b8a6 #f1f5f9;
                }
                .subcategory-scroll::-webkit-scrollbar {
                  height: 6px;
                }
                .subcategory-scroll::-webkit-scrollbar-track {
                  background: #f1f5f9;
                  border-radius: 10px;
                }
                .subcategory-scroll::-webkit-scrollbar-thumb {
                  background: #14b8a6;
                  border-radius: 10px;
                }
                .subcategory-scroll::-webkit-scrollbar-thumb:hover {
                  background: #0d9488;
                }
              `}</style>
              <div className="subcategory-scroll flex gap-3 overflow-x-auto pb-4 px-2">
                {availableSubcategories.map((subcategory: any) => {
                  const IconComponent = iconMap[subcategory.icon] || Sparkles;
                  return (
                    <motion.button
                      key={subcategory.id}
                      onClick={() => {
                        setSelectedSubcategory(subcategory.id);
                        setCurrentPage(1);
                      }}
                      className={`flex-shrink-0 p-4 rounded-xl border-2 transition-all duration-200 text-center group cursor-pointer ${
                        selectedSubcategory === subcategory.id
                          ? "bg-teal-500 text-white border-teal-500 shadow-lg"
                          : "bg-white/80 text-gray-700 border-gray-200 hover:border-teal-500 hover:shadow-md"
                      }`}
                      style={{ minWidth: "140px" }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      title={subcategory.description}
                    >
                      <div className="flex flex-col items-center space-y-2">
                        <IconComponent
                          className={`w-6 h-6 ${
                            selectedSubcategory === subcategory.id ? "text-white" : "text-teal-500"
                          }`}
                        />
                        <span className="text-sm font-medium leading-tight whitespace-nowrap">{subcategory.name}</span>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </div>
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
            Menampilkan <span className="text-teal-600">{filteredProducts.length}</span> produk
            {filteredProducts.length !== (mock.mockdata as Product[]).length && (
              <span> dari {(mock.mockdata as Product[]).length} total produk</span>
            )}
          </p>
        </motion.div>

        {/* Products Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${selectedAgeCategory}-${selectedSubcategory}-${searchTerm}`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
          >
            {currentProducts.map((product) => {
              const subcategoryInfo = getSubcategoryInfo(product.subcategory);
              return (
                <motion.div
                  key={product.id}
                  variants={itemVariants}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer"
                  onClick={() => setSelectedProduct(product)}
                >
                  <div className="relative mb-4 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-white/90 backdrop-blur-sm text-gray-700">
                        {subcategoryInfo.emoji} {subcategoryInfo.name}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button className="flex items-center space-x-2 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-full text-sm font-medium text-teal-600 hover:bg-white transition-colors">
                        <Eye className="w-4 h-4" />
                        <span>Preview</span>
                      </button>
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl text-gray-900 group-hover:text-teal-600 transition-colors duration-200">
                        {product.title}
                      </h3>
                    </div>

                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">{product.description}</p>

                    <div className="flex flex-wrap gap-2">
                      {product.skills.slice(0, 3).map((skill, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 rounded-lg text-xs font-medium bg-purple-50 text-purple-600"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <div className="text-xl text-pink-500">{formatPrice(product.price)}</div>
                      <div className="px-3 py-1 rounded-full text-sm font-medium bg-amber-100 text-amber-600">
                        {product.ageRange}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Improved Pagination */}
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

      {/* Product Detail Modal - Using Component */}
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

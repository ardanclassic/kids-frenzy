import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, Sparkles } from "lucide-react";
import { product_list } from "./product-list.json";
import { categories } from "./categories.json";
import ProductDetailModal from "@/components/ProductDetailModal/ProductDetailModal";
import ProductsGrid from "@/components/ProductsGrid";
import SidebarFilter from "@/components/sidebar";
import Pagination from "@/components/pagination";
import { useFilterStore } from "@/store/filterStore";

interface Product {
  id: string;
  title: string;
  description: string;
  ageCategory: string;
  subcategory: string;
  ageRange: string;
  minAge: number;
  price: number;
  priceCategory: number;
  slug: string;
  image: string;
  features: string[];
  skills: string[];
  preview: string[];
  totalPages?: number;
  checkout_link?: string;
  bundle_checkout_link?: string;
}

const productsPerPage = 12;

// Define age categories outside component to prevent re-creation
const AGE_CATEGORIES = [
  { id: "semua", name: "Semua Usia", emoji: "🎯", color: "teal" },
  { id: "1+", name: "1+ Tahun", emoji: "👶", color: "coral", minAge: 1 },
  { id: "2+", name: "2+ Tahun", emoji: "🧸", color: "lavender", minAge: 2 },
  { id: "3+", name: "3+ Tahun", emoji: "🎨", color: "sage", minAge: 3 },
  { id: "5+", name: "5+ Tahun", emoji: "🚀", color: "purple", minAge: 5 },
];

const ProductsPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Get filter values from Zustand store - use separate selectors to prevent unnecessary re-renders
  const searchTerm = useFilterStore((state) => state.searchTerm);
  const selectedAgeCategory = useFilterStore((state) => state.selectedAgeCategory);
  const selectedSubcategory = useFilterStore((state) => state.selectedSubcategory);

  const allSubcategories = categories;

  // Get available subcategories based on selected age
  const availableSubcategories = useMemo(() => {
    if (selectedAgeCategory === "semua") {
      return allSubcategories;
    }

    const productsForAge = (product_list as Product[]).filter((product) => product.ageCategory === selectedAgeCategory);
    const subcategoriesWithProducts = new Set(productsForAge.map((p) => p.subcategory));

    return allSubcategories.filter((sub) => sub.id === "all-activities" || subcategoriesWithProducts.has(sub.id));
  }, [selectedAgeCategory, allSubcategories]);

  // Filter and search products
  const filteredProducts = useMemo(() => {
    let filtered = product_list as Product[];

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

  // Sync data to store whenever they change
  React.useEffect(() => {
    useFilterStore.setState({
      ageCategories: AGE_CATEGORIES,
      subcategories: availableSubcategories,
      totalResults: filteredProducts.length,
      totalProducts: (product_list as Product[]).length,
    });
  }, [availableSubcategories, filteredProducts.length]);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50/50 via-blue-50/30 to-purple-50/50">
      {/* Header */}
      <div className="pt-20 sm:pt-24 lg:pt-32 pb-4 sm:pb-6 lg:pb-8 px-4">
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-4 sm:mb-6 lg:mb-10"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Badge - Hidden on small mobile */}
            <div className="hidden sm:inline-flex items-center gap-1.5 mb-2 lg:mb-3 px-3 py-1 bg-white/70 backdrop-blur-sm rounded-full border border-teal-200/50 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-teal-500" />
              <span className="text-xs font-medium text-teal-700">Produk Digital Terbaik</span>
            </div>

            {/* Title - Compact */}
            <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold mb-1.5 sm:mb-2 lg:mb-3 leading-tight">
              <span className="text-gradient">Edukatif & Interaktif</span>
            </h1>

            {/* Description - More compact */}
            <p className="text-xs sm:text-sm lg:text-lg text-gray-600 max-w-2xl mx-auto px-2">
              Koleksi pembelajaran digital untuk tumbuh kembang optimal
            </p>
          </motion.div>

          {/* Main Content with Sidebar Layout */}
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
            {/* Sidebar Filter - Only pass data props, not state setters */}
            <div className="lg:w-80 flex-shrink-0">
              <SidebarFilter />
            </div>

            {/* Products Content */}
            <div className="flex-1 min-w-0">
              <ProductsGrid
                products={currentProducts}
                selectedAgeCategory={selectedAgeCategory}
                selectedSubcategory={selectedSubcategory}
                searchTerm={searchTerm}
                onProductClick={setSelectedProduct}
                getSubcategoryInfo={getSubcategoryInfo}
                formatPrice={formatPrice}
              />

              {/* Pagination - Mobile Optimized */}
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />

              {/* No Results - Compact */}
              {filteredProducts.length === 0 && (
                <motion.div
                  className="text-center py-12 sm:py-16 lg:py-20 px-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-5 lg:mb-6 shadow-inner">
                    <Search className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-gray-400" />
                  </div>
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 mb-2 sm:mb-3 lg:mb-4">
                    Tidak ada produk ditemukan
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 mb-5 sm:mb-6 lg:mb-8 max-w-md mx-auto">
                    Coba ubah kata kunci pencarian atau filter kategori
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </div>
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

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { product_list } from "@/assets/json/product-list.json";
import {
  age_categories,
  activity_categories,
  language_categories,
  bundling_categories,
} from "@/assets/json/categories.json";
import ProductDetailModal from "@/components/ProductDetailModal/ProductDetailModal";
import ProductsGrid from "@/components/ProductsGrid";
import ProductSubheader from "@/components/ProductSubheader";
import SidebarFilter from "@/components/sidebar";
import Pagination from "@/components/pagination";
import { useFilterStore } from "@/store/filterStore";
import { useSortStore } from "@/store/sortStore";

interface Product {
  id: string;
  title: string;
  description: string;
  ageCategory: string;
  activityCategory: string;
  minAge: number;
  price: number;
  priceCategory: number;
  slug: string;
  image: string;
  features: string[];
  skills: string[];
  preview: string[];
  totalPages?: number;
  language?: string;
  bundlingCategory?: string;
  checkout_link?: string;
  bundle_checkout_link?: string;
}

const productsPerPage = 12;

const ProductsPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Get filter values from Zustand store
  const searchTerm = useFilterStore((state) => state.searchTerm);
  const selectedAgeCategory = useFilterStore((state) => state.selectedAgeCategory);
  const selectedActivityCategory = useFilterStore((state) => state.selectedActivityCategory);
  const selectedLanguageCategory = useFilterStore((state) => state.selectedLanguageCategory);
  const selectedBundlingCategory = useFilterStore((state) => state.selectedBundlingCategory);
  const isBundlingMode = useFilterStore((state) => state.isBundlingMode);

  // Get sort value from Zustand store
  const selectedSort = useSortStore((state) => state.selectedSort);

  // Get available activity categories based on selected age
  const availableActivityCategories = useMemo(() => {
    if (selectedAgeCategory === "all-age") {
      return activity_categories;
    }

    const productsForAge = (product_list as Product[]).filter((product) => product.ageCategory === selectedAgeCategory);
    const activityCategoriesWithProducts = new Set(productsForAge.map((p) => p.activityCategory));

    return activity_categories.filter(
      (activity) => activity.id === "all-activities" || activityCategoriesWithProducts.has(activity.id)
    );
  }, [selectedAgeCategory]);

  // Filter and search products
  const filteredProducts = useMemo(() => {
    let filtered = product_list as Product[];

    // BUNDLING MODE: Filter by bundling category
    if (isBundlingMode) {
      filtered = filtered.filter((product) => product.bundlingCategory === selectedBundlingCategory);
    } else {
      // NORMAL MODE: Filter by age and activity
      filtered = filtered.filter((product) => !product.bundlingCategory);

      if (selectedAgeCategory !== "all-age") {
        filtered = filtered.filter((product) => product.ageCategory === selectedAgeCategory);
      }

      if (selectedActivityCategory !== "all-activities") {
        filtered = filtered.filter((product) => product.activityCategory === selectedActivityCategory);
      }
    }

    // Language filter (always active, independent)
    if (selectedLanguageCategory !== "all-languages") {
      filtered = filtered.filter((product) => product.language === selectedLanguageCategory);
    }

    // Search filter (always active)
    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  }, [
    searchTerm,
    selectedAgeCategory,
    selectedActivityCategory,
    selectedLanguageCategory,
    selectedBundlingCategory,
    isBundlingMode,
  ]);

  // Sort products
  const sortedProducts = useMemo(() => {
    const products = [...filteredProducts];

    switch (selectedSort) {
      case "name-asc":
        return products.sort((a, b) => a.title.localeCompare(b.title));

      case "name-desc":
        return products.sort((a, b) => b.title.localeCompare(a.title));

      case "price-asc":
        return products.sort((a, b) => a.price - b.price);

      case "price-desc":
        return products.sort((a, b) => b.price - a.price);

      case "age-asc":
        return products.sort((a, b) => a.minAge - b.minAge);

      case "age-desc":
        return products.sort((a, b) => b.minAge - a.minAge);

      case "default":
      default:
        return products; // Keep original order
    }
  }, [filteredProducts, selectedSort]);

  // Sync data to store whenever they change
  React.useEffect(() => {
    useFilterStore.setState({
      ageCategories: age_categories,
      activityCategories: availableActivityCategories,
      languageCategories: language_categories,
      bundlingCategories: bundling_categories,
      totalResults: sortedProducts.length,
      totalProducts: (product_list as Product[]).length,
    });
  }, [availableActivityCategories, sortedProducts.length]);

  // Reset to page 1 when filters or sort change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [
    searchTerm,
    selectedAgeCategory,
    selectedActivityCategory,
    selectedLanguageCategory,
    selectedBundlingCategory,
    selectedSort,
  ]);

  // Pagination
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = sortedProducts.slice(startIndex, startIndex + productsPerPage);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getActivityCategoryInfo = (activityCategoryId: string) => {
    return activity_categories.find((activity) => activity.id === activityCategoryId) || activity_categories[0];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50/50 via-blue-50/30 to-purple-50/50">
      <div className="pt-20 sm:pt-24 lg:pt-32 pb-4 sm:pb-6 lg:pb-8 px-4">
        <div className="container mx-auto">
          {/* Main Content with Sidebar Layout */}
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
            {/* Sidebar Filter */}
            <div className="lg:w-80 flex-shrink-0">
              <SidebarFilter />
            </div>

            {/* Products Content */}
            <div className="flex-1 min-w-0">
              {/* Product Subheader - Info & Sort */}
              {sortedProducts.length > 0 && (
                <ProductSubheader currentCount={currentProducts.length} totalCount={sortedProducts.length} />
              )}

              {/* Products Grid */}
              <ProductsGrid
                products={currentProducts}
                selectedAgeCategory={selectedAgeCategory}
                selectedActivityCategory={selectedActivityCategory}
                searchTerm={searchTerm}
                onProductClick={setSelectedProduct}
                getActivityCategoryInfo={getActivityCategoryInfo}
                formatPrice={formatPrice}
              />

              {/* Pagination */}
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />

              {/* No Results */}
              {sortedProducts.length === 0 && (
                <motion.div
                  className="text-center py-12 sm:py-16 lg:py-20 px-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-5 lg:mb-6 shadow-inner">
                    <Search className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-gray-400" />
                  </div>
                  <h3 className="text-lg sm:text-xl lg:text-2xl text-gray-800 mb-2 sm:mb-3 lg:mb-4">
                    Tidak ada produk yang ditemukan
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 mb-5 sm:mb-6 lg:mb-8 max-w-md mx-auto">
                    Coba ubah kata kunci pencarian atau filter lainnya untuk menemukan produk yang Anda cari.
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
        getActivityCategoryInfo={getActivityCategoryInfo}
        formatPrice={formatPrice}
      />
    </div>
  );
};

export default ProductsPage;

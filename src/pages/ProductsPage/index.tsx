import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Eye,
  BookOpen,
  Award,
  ChevronLeft,
  ChevronRight,
  X,
  Play,
  FileImage,
  Brain,
  Target,
  Clock,
  ShoppingCart,
  Sparkles,
} from "lucide-react";
import mock from "./mock.json";

interface Product {
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

const ProductsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("semua");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const productsPerPage = 6;

  const categories = [
    { id: "semua", name: "Semua Produk", emoji: "🎯", color: "teal" },
    { id: "balita", name: "Balita (1-3)", emoji: "👶", color: "coral" },
    { id: "paud", name: "PAUD (3-5)", emoji: "🎨", color: "lavender" },
    { id: "sd", name: "SD (6-12)", emoji: "📚", color: "sage" },
  ];

  // Filter and search products
  const filteredProducts = useMemo(() => {
    let filtered = mock.mockdata as Product[];

    if (selectedCategory !== "semua") {
      filtered = filtered.filter((product) => product.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  }, [searchTerm, selectedCategory]);

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

  return (
    <div className="pt-24 pb-12 px-4">
      <div className="container mx-auto">
        {/* Header Section */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-6xl  mb-6">
            <span className="text-gradient">Produk Digital Edukatif</span> 🎨
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Koleksi lengkap produk pembelajaran digital untuk tumbuh kembang optimal si kecil
          </p>
        </motion.div>

        {/* Search and Filter Section */}
        <motion.div
          className="mb-12 space-y-6"
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
              className="w-full pl-12 pr-4 py-4 bg-white/90 backdrop-blur-sm rounded-full border-2 border-gray-100 focus:border-kid-teal focus:outline-none text-lg font-medium shadow-lg transition-all duration-200"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => {
                  setSelectedCategory(category.id);
                  setCurrentPage(1);
                }}
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
        </motion.div>

        {/* Products Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${selectedCategory}-${searchTerm}`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
          >
            {currentProducts.map((product) => (
              <motion.div
                key={product.id}
                variants={itemVariants}
                className="card-product group cursor-pointer"
                onClick={() => setSelectedProduct(product)}
              >
                {/* Product Image */}
                <div className="relative mb-4 overflow-hidden rounded-xl">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Preview Button */}
                  <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      className="flex items-center space-x-2 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-full text-sm font-medium hover:bg-white transition-colors"
                      style={{ color: "var(--color-kid-teal)" }}
                    >
                      <Eye className="w-4 h-4" />
                      <span>Preview</span>
                    </button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl  text-gray-900 group-hover:text-kid-teal transition-colors duration-200">
                      {product.title}
                    </h3>
                    <span
                      className="px-3 py-1 rounded-full text-sm "
                      style={{
                        backgroundColor: "color-mix(in srgb, var(--color-kid-amber) 20%, white)",
                        color: "var(--color-kid-amber)",
                      }}
                    >
                      {product.ageRange}
                    </span>
                  </div>

                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">{product.description}</p>

                  {/* Skills Tags */}
                  <div className="flex flex-wrap gap-2">
                    {product.skills.slice(0, 3).map((skill, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 rounded-lg text-xs font-medium"
                        style={{
                          backgroundColor: "color-mix(in srgb, var(--color-kid-lavender) 10%, white)",
                          color: "var(--color-kid-lavender)",
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div className="text-xl " style={{ color: "var(--color-kid-coral)" }}>
                      {formatPrice(product.price)}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div
            className="flex justify-center items-center space-x-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-3 rounded-full bg-white/80 backdrop-blur-sm border-2 border-kid-teal/20 text-kid-teal hover:bg-kid-teal hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex space-x-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-12 h-12 rounded-full  transition-all duration-200 ${
                    currentPage === page
                      ? "bg-kid-teal text-white shadow-lg"
                      : "bg-white/80 backdrop-blur-sm text-kid-teal hover:bg-kid-teal/10"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-3 rounded-full bg-white/80 backdrop-blur-sm border-2 border-kid-teal/20 text-kid-teal hover:bg-kid-teal hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </motion.div>
        )}

        {/* No Results */}
        {filteredProducts.length === 0 && (
          <motion.div className="text-center py-20" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl  text-gray-800 mb-4">Tidak ada produk ditemukan</h3>
            <p className="text-gray-600 mb-8">Coba ubah kata kunci pencarian atau filter kategori</p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("semua");
              }}
              className="btn-primary"
            >
              Reset Pencarian
            </button>
          </motion.div>
        )}
      </div>

      {/* Product Detail Modal - Mobile Responsive */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedProduct(null)}
          >
            {/* Mobile: Fullscreen Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="bg-white rounded-none md:rounded-3xl w-full h-full md:max-w-4xl md:w-auto md:h-auto md:max-h-[90vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="relative">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.title}
                  className="w-full h-48 md:h-64 lg:h-80 object-cover rounded-none md:rounded-t-3xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-none md:rounded-t-3xl" />

                {/* Close Button */}
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="absolute top-4 right-4 p-3 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors z-10"
                >
                  <X className="w-6 h-6 text-gray-700" />
                </button>

                {/* Product Title Overlay */}
                <div className="absolute bottom-4 md:bottom-6 left-4 md:left-6 right-4 md:right-6">
                  <span
                    className="px-3 md:px-4 py-1 md:py-2 rounded-full text-xs md:text-sm mb-2 md:mb-4 inline-block"
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                      color: "#FF6B6B",
                    }}
                  >
                    {selectedProduct.ageRange}
                  </span>
                  <h2 className="text-2xl md:text-3xl lg:text-4xl text-white mb-2">
                    {selectedProduct.title}
                  </h2>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-4 md:p-6 lg:p-8 space-y-6 md:space-y-8">
                {/* Description */}
                <div>
                  <h3 className="text-lg md:text-xl text-gray-900 mb-3 md:mb-4 flex items-center">
                    <BookOpen className="w-5 md:w-6 h-5 md:h-6 mr-2 md:mr-3 text-teal-500" />
                    Deskripsi Produk
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-base md:text-lg">{selectedProduct.description}</p>
                </div>

                {/* Key Features */}
                <div>
                  <h3 className="text-lg md:text-xl text-gray-900 mb-3 md:mb-4 flex items-center">
                    <Sparkles className="w-5 md:w-6 h-5 md:h-6 mr-2 md:mr-3 text-purple-500" />
                    Fitur Utama
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                    {selectedProduct.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 md:p-4 rounded-xl bg-teal-50">
                        <div className="w-6 md:w-8 h-6 md:h-8 rounded-full flex items-center justify-center bg-teal-100">
                          <Target className="w-3 md:w-4 h-3 md:h-4 text-teal-600" />
                        </div>
                        <span className="font-medium text-gray-800 text-sm md:text-base">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Skills Development */}
                <div>
                  <h3 className="text-lg md:text-xl text-gray-900 mb-3 md:mb-4 flex items-center">
                    <Brain className="w-5 md:w-6 h-5 md:h-6 mr-2 md:mr-3 text-pink-500" />
                    Keterampilan yang Dikembangkan
                  </h3>
                  <div className="flex flex-wrap gap-2 md:gap-3">
                    {selectedProduct.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 md:px-4 py-1 md:py-2 rounded-xl font-medium border text-xs md:text-sm bg-gradient-to-r from-pink-50 to-purple-50 text-pink-600 border-pink-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Duration & Preview */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  <div>
                    <h4 className="text-base md:text-lg text-gray-900 mb-3 md:mb-4 flex items-center">
                      <Clock className="w-4 md:w-5 h-4 md:h-5 mr-2 md:mr-3 text-green-500" />
                      Durasi Aktivitas
                    </h4>
                    <div className="p-3 md:p-4 rounded-xl bg-green-50">
                      <span className="text-xl md:text-2xl text-green-600">{selectedProduct.duration}</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-base md:text-lg text-gray-900 mb-3 md:mb-4 flex items-center">
                      <Eye className="w-4 md:w-5 h-4 md:h-5 mr-2 md:mr-3 text-orange-500" />
                      Preview Konten
                    </h4>
                    <div className="space-y-2">
                      {selectedProduct.preview.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2 md:space-x-3 p-2 rounded-lg bg-orange-50"
                        >
                          <FileImage className="w-3 md:w-4 h-3 md:h-4 text-orange-500" />
                          <span className="text-gray-700 text-xs md:text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Price & Actions */}
                <div className="p-4 md:p-6 rounded-2xl bg-gradient-to-r from-teal-50 to-purple-50 sticky bottom-0 md:static">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="text-center md:text-left">
                      <p className="text-gray-600 mb-1 md:mb-2 text-sm md:text-base">Harga Produk Digital</p>
                      <div className="text-2xl md:text-3xl lg:text-4xl text-pink-500">
                        {formatPrice(selectedProduct.price)}
                      </div>
                      <p className="text-xs md:text-sm text-gray-500 mt-1">💎 Download sekali, gunakan selamanya!</p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                      <button className="btn-outline flex items-center justify-center space-x-2 py-3 px-6 rounded-xl border-2 border-teal-500 text-teal-600 hover:bg-teal-500 hover:text-white transition-all duration-200">
                        <Play className="w-4 md:w-5 h-4 md:h-5" />
                        <span className="text-sm md:text-base font-medium">Preview Gratis</span>
                      </button>
                      <button className="btn-primary flex items-center justify-center space-x-2 py-3 px-6 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-600 hover:to-purple-600 transition-all duration-200 shadow-lg">
                        <ShoppingCart className="w-4 md:w-5 h-4 md:h-5" />
                        <span className="text-sm md:text-base font-medium">Beli Sekarang</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="p-4 md:p-6 rounded-2xl bg-yellow-50 mb-4 md:mb-0">
                  <h4 className="mb-3 flex items-center text-yellow-700">
                    <Award className="w-4 md:w-5 h-4 md:h-5 mr-2" />
                    Yang Akan Anda Dapatkan:
                  </h4>
                  <ul className="space-y-2 text-gray-700">
                    {[
                      "File PDF berkualitas tinggi, siap cetak",
                      "Panduan penggunaan untuk orang tua",
                      "Akses download selamanya",
                      "Update gratis jika ada revisi",
                    ].map((item, index) => (
                      <li key={index} className="flex items-center space-x-3">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        <span className="text-sm md:text-base">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductsPage;

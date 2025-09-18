import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Star,
  Download,
  Eye,
  Heart,
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
  const [favorites, setFavorites] = useState<number[]>([]);

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

  const toggleFavorite = (productId: number) => {
    setFavorites((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]));
  };

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
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gradient">Produk Digital Edukatif 🎨</h1>
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

                  {/* Favorite Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(product.id);
                    }}
                    className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors duration-200"
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        favorites.includes(product.id) ? "text-red-500 fill-red-500" : "text-gray-600"
                      }`}
                    />
                  </button>

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
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-kid-teal transition-colors duration-200">
                      {product.title}
                    </h3>
                    <span
                      className="px-3 py-1 rounded-full text-sm font-bold"
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
                    <div className="text-xl font-bold" style={{ color: "var(--color-kid-coral)" }}>
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
                  className={`w-12 h-12 rounded-full font-bold transition-all duration-200 ${
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
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Tidak ada produk ditemukan</h3>
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

      {/* Product Detail Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="relative">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.title}
                  className="w-full h-64 md:h-80 object-cover rounded-t-3xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-t-3xl" />

                {/* Close Button */}
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="absolute top-4 right-4 p-3 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                >
                  <X className="w-6 h-6 text-gray-700" />
                </button>

                {/* Favorite Button */}
                <button
                  onClick={() => toggleFavorite(selectedProduct.id)}
                  className="absolute top-4 left-4 p-3 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                >
                  <Heart
                    className={`w-6 h-6 ${
                      favorites.includes(selectedProduct.id) ? "text-red-500 fill-red-500" : "text-gray-700"
                    }`}
                  />
                </button>

                {/* Product Title Overlay */}
                <div className="absolute bottom-6 left-6 right-6">
                  <span
                    className="px-4 py-2 rounded-full text-sm font-bold mb-4 inline-block"
                    style={{
                      backgroundColor: "color-mix(in srgb, var(--color-kid-amber) 90%, white)",
                      color: "var(--color-kid-amber)",
                    }}
                  >
                    {selectedProduct.ageRange}
                  </span>
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">{selectedProduct.title}</h2>
                  <div className="flex items-center space-x-4 text-white/90">
                    <div className="flex items-center space-x-1">
                      <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                      <span className="font-bold">{selectedProduct.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Download className="w-5 h-5" />
                      <span>{selectedProduct.downloads.toLocaleString()} downloads</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-8 space-y-8">
                {/* Description */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <BookOpen className="w-6 h-6 mr-3" style={{ color: "var(--color-kid-teal)" }} />
                    Deskripsi Produk
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-lg">{selectedProduct.description}</p>
                </div>

                {/* Key Features */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <Sparkles className="w-6 h-6 mr-3" style={{ color: "var(--color-kid-lavender)" }} />
                    Fitur Utama
                  </h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    {selectedProduct.features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-3 p-4 rounded-xl"
                        style={{ backgroundColor: "color-mix(in srgb, var(--color-kid-teal) 5%, white)" }}
                      >
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: "color-mix(in srgb, var(--color-kid-teal) 20%, white)" }}
                        >
                          <Target className="w-4 h-4" style={{ color: "var(--color-kid-teal)" }} />
                        </div>
                        <span className="font-medium text-gray-800">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Skills Development */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <Brain className="w-6 h-6 mr-3" style={{ color: "var(--color-kid-coral)" }} />
                    Keterampilan yang Dikembangkan
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {selectedProduct.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 rounded-xl font-medium border"
                        style={{
                          background: `linear-gradient(to right, color-mix(in srgb, var(--color-kid-coral) 10%, white), color-mix(in srgb, var(--color-kid-lavender) 10%, white))`,
                          color: "var(--color-kid-coral)",
                          borderColor: "color-mix(in srgb, var(--color-kid-coral) 20%, white)",
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Duration & Preview */}
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                      <Clock className="w-5 h-5 mr-3" style={{ color: "var(--color-kid-sage)" }} />
                      Durasi Aktivitas
                    </h4>
                    <div
                      className="p-4 rounded-xl"
                      style={{ backgroundColor: "color-mix(in srgb, var(--color-kid-sage) 5%, white)" }}
                    >
                      <span className="text-2xl font-bold" style={{ color: "var(--color-kid-sage)" }}>
                        {selectedProduct.duration}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                      <Eye className="w-5 h-5 mr-3" style={{ color: "var(--color-kid-peach)" }} />
                      Preview Konten
                    </h4>
                    <div className="space-y-2">
                      {selectedProduct.preview.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-3 p-2 rounded-lg"
                          style={{ backgroundColor: "color-mix(in srgb, var(--color-kid-peach) 5%, white)" }}
                        >
                          <FileImage className="w-4 h-4" style={{ color: "var(--color-kid-peach)" }} />
                          <span className="text-gray-700">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Price & Actions */}
                <div
                  className="flex flex-col md:flex-row items-center justify-between p-6 rounded-2xl"
                  style={{
                    background:
                      "linear-gradient(to right, color-mix(in srgb, var(--color-kid-teal) 5%, white), color-mix(in srgb, var(--color-kid-lavender) 5%, white))",
                  }}
                >
                  <div className="text-center md:text-left mb-4 md:mb-0">
                    <p className="text-gray-600 mb-2">Harga Produk Digital</p>
                    <div className="text-4xl font-bold" style={{ color: "var(--color-kid-coral)" }}>
                      {formatPrice(selectedProduct.price)}
                    </div>
                    <p className="text-sm text-gray-500 mt-1">💎 Download sekali, gunakan selamanya!</p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <button className="btn-outline flex items-center space-x-2">
                      <Play className="w-5 h-5" />
                      <span>Preview Gratis</span>
                    </button>
                    <button className="btn-primary flex items-center space-x-2">
                      <ShoppingCart className="w-5 h-5" />
                      <span>Beli Sekarang</span>
                    </button>
                  </div>
                </div>

                {/* Additional Info */}
                <div
                  className="p-6 rounded-2xl"
                  style={{ backgroundColor: "color-mix(in srgb, var(--color-kid-amber) 10%, white)" }}
                >
                  <h4 className="font-bold mb-3 flex items-center" style={{ color: "var(--color-kid-amber)" }}>
                    <Award className="w-5 h-5 mr-2" />
                    Yang Akan Anda Dapatkan:
                  </h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center space-x-3">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "var(--color-kid-sage)" }}></div>
                      <span>File PDF berkualitas tinggi, siap cetak</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "var(--color-kid-sage)" }}></div>
                      <span>Panduan penggunaan untuk orang tua</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "var(--color-kid-sage)" }}></div>
                      <span>Akses download selamanya</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "var(--color-kid-sage)" }}></div>
                      <span>Update gratis jika ada revisi</span>
                    </li>
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

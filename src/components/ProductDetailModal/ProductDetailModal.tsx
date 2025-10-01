import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, BookOpen, Sparkles, Brain, ShoppingCart, Award, Check } from "lucide-react";
import PreviewGallery from "../PreviewGallery/PreviewGallery";

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

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  getSubcategoryInfo: (subcategoryId: string) => { emoji: string; name: string; description: string };
  formatPrice: (price: number) => string;
}

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  getSubcategoryInfo,
  formatPrice,
}) => {
  if (!product) return null;

  const subcategoryInfo = getSubcategoryInfo(product.subcategory);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-0 md:p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="bg-white w-full h-full md:h-auto md:rounded-2xl md:max-w-5xl md:max-h-[95vh] overflow-y-auto shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Hero Section - Clean with Image & Title Only */}
          <div className="relative h-48 md:h-64 overflow-hidden md:rounded-t-2xl">
            <motion.img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6 }}
            />
            {/* Strong gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/70" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="fixed top-3 right-3 md:top-4 md:right-4 p-2 md:p-2.5 bg-white/95 backdrop-blur-sm rounded-full hover:bg-white hover:scale-110 transition-all shadow-lg z-[60]"
            >
              <X className="w-5 h-5 md:w-6 md:h-6 text-gray-800" />
            </button>

            {/* Title - Bottom with strong contrast */}
            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
              {/* Text shadow box for extra contrast */}
              <div className="inline-block">
                <h2 className="text-xl md:text-3xl lg:text-4xl font-bold text-white mb-0 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] leading-tight">
                  {product.title}
                </h2>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-4 md:p-6 lg:p-8 space-y-6">
            {/* Info Badges - Right after hero */}
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-teal-50 to-cyan-50 text-teal-700 border border-teal-200">
                {subcategoryInfo.emoji} {subcategoryInfo.name}
              </span>
              <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-sm">
                {product.ageRange}
              </span>
              <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 border border-green-200">
                {formatPrice(product.price)}
              </span>
            </div>

            {/* Description */}
            <div className="p-4 md:p-5 rounded-xl bg-gradient-to-br from-blue-50 via-teal-50 to-cyan-50 border border-teal-100">
              <div className="flex items-start gap-3 mb-2">
                <div className="p-2 rounded-lg bg-teal-100">
                  <BookOpen className="w-4 h-4 md:w-5 md:h-5 text-teal-600" />
                </div>
                <h3 className="text-base md:text-lg font-bold text-gray-900">Tentang Produk Ini</h3>
              </div>
              <p className="text-sm md:text-base text-gray-700 leading-relaxed ml-0 md:ml-11">{product.description}</p>
              <p className="text-xs md:text-sm text-gray-600 mt-3 ml-0 md:ml-11 italic">
                {subcategoryInfo.description}
              </p>
            </div>

            {/* Features Grid - Compact */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="p-2 rounded-lg bg-purple-100">
                  <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-purple-600" />
                </div>
                <h3 className="text-base md:text-lg font-bold text-gray-900">Fitur Unggulan</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-3">
                {product.features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-3 rounded-lg bg-gradient-to-br from-teal-50 to-cyan-50 border border-teal-100"
                  >
                    <div className="w-6 h-6 rounded-full flex items-center justify-center bg-teal-500 flex-shrink-0">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-sm font-medium text-gray-800">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills - Compact Pills */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="p-2 rounded-lg bg-pink-100">
                  <Brain className="w-4 h-4 md:w-5 md:h-5 text-pink-600" />
                </div>
                <h3 className="text-base md:text-lg font-bold text-gray-900">Keterampilan</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 rounded-full text-xs md:text-sm font-semibold bg-gradient-to-r from-pink-100 to-purple-100 text-pink-700 border border-pink-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Preview Gallery */}
            <PreviewGallery preview={product.preview} />

            {/* What You Get - Compact */}
            <div className="p-4 md:p-5 rounded-xl bg-gradient-to-br from-yellow-50 to-amber-50 border border-yellow-200">
              <div className="flex items-center gap-2 mb-3">
                <Award className="w-5 h-5 text-yellow-600" />
                <h4 className="text-sm md:text-base font-bold text-yellow-900">Yang Anda Dapatkan</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                {["File PDF siap cetak", "Akses download selamanya", "Update gratis jika ada revisi"].map(
                  (item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-xs md:text-sm text-gray-700 font-medium">{item}</span>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* CTA Button - Sticky on Mobile */}
            <div className="sticky bottom-0 -mx-4 md:mx-0 -mb-4 md:mb-0 p-4 md:p-0 bg-white md:bg-transparent border-t md:border-t-0 border-gray-200">
              <button className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl md:rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 text-white hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 font-bold text-base md:text-lg shadow-lg">
                <ShoppingCart className="w-5 h-5 md:w-6 md:h-6" />
                <span>Beli Sekarang - {formatPrice(product.price)}</span>
              </button>
              <p className="text-center text-xs text-gray-500 mt-2">Download instan setelah pembayaran</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProductDetailModal;

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
  priceCategory: number;
  image: string;
  features: string[];
  skills: string[];
  preview: string[];
  totalPages?: number;
  checkout_link?: string;
  bundle_checkout_link?: string;
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
        className="fixed inset-0 z-50 flex items-center justify-center bg-indigo-500/20 backdrop-blur-sm p-0 md:p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          className="relative w-full h-full md:h-auto md:rounded-xl md:max-w-4xl md:max-h-[90vh] overflow-y-auto bg-gradient-to-br from-slate-50 via-blue-50/50 to-purple-50/20 shadow-xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            onClick={onClose}
            className="fixed top-3 right-3 md:absolute md:top-4 md:right-4 p-2 bg-white/95 rounded-full hover:bg-white shadow-lg hover:shadow-xl transition-shadow z-10"
          >
            <X className="w-5 h-5 text-slate-700" />
          </motion.button>

          {/* Hero Image - Compact */}
          <div className="relative h-48 md:h-56 overflow-hidden md:rounded-t-xl">
            <motion.img
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6 }}
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/40 via-purple-900/30 to-slate-900/70" />

            {/* Title Overlay */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="absolute bottom-0 left-0 right-0 p-4 md:p-6"
            >
              <h2 className="text-xl md:text-3xl text-white mb-2 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                {product.title}
              </h2>
              <div className="flex flex-wrap gap-2">
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="px-3 py-1 rounded-full text-xs bg-white/95 text-indigo-700 shadow-md"
                >
                  {subcategoryInfo.emoji} {subcategoryInfo.name}
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="px-3 py-1 rounded-full text-xs bg-gradient-to-r from-rose-400 to-pink-500 text-white shadow-md"
                >
                  {product.ageRange}
                </motion.span>
              </div>
            </motion.div>
          </div>

          {/* Content Section */}
          <div className="p-4 md:p-6 space-y-5">
            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="p-4 rounded-xl bg-gradient-to-br from-white to-indigo-50/50 border border-indigo-100 shadow-sm"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1.5 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600">
                  <BookOpen className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-base md:text-lg text-slate-800">Tentang Produk</h3>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed mb-2">{product.description}</p>
              <p className="text-xs text-slate-600 italic pl-3 border-l-2 border-indigo-300">
                {subcategoryInfo.description}
              </p>
            </motion.div>

            {/* Features - Compact Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="p-1.5 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-base md:text-lg text-slate-800">Fitur Unggulan</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {product.features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.05, duration: 0.3 }}
                    className="flex items-center gap-2 p-3 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="w-5 h-5 rounded-full flex items-center justify-center bg-gradient-to-br from-blue-400 to-cyan-500 flex-shrink-0 shadow-sm">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-sm text-slate-700 font-medium">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Skills - Compact Pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="p-1.5 rounded-lg bg-gradient-to-br from-pink-400 to-rose-500">
                  <Brain className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-base md:text-lg text-slate-800">Keterampilan yang Dikembangkan</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.skills.map((skill, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + index * 0.05, duration: 0.3 }}
                    className="px-3 py-1.5 rounded-full text-xs bg-gradient-to-r from-pink-50 via-purple-50 to-indigo-50 text-purple-700 border border-purple-200 shadow-sm"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Preview Gallery */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.4 }}
            >
              {/* PreviewGallery component would go here */}
              <PreviewGallery preview={product.preview} />
            </motion.div>

            {/* What You Get */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.4 }}
              className="p-4 rounded-xl bg-gradient-to-br from-amber-50/20 to-orange-50/30 border border-amber-200 shadow-sm"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="p-1.5 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600">
                  <Award className="w-4 h-4 text-white" />
                </div>
                <h4 className="text-base text-amber-900">Yang Anda Dapatkan</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                {[
                  product.totalPages ? `${product.totalPages} halaman seru & edukatif` : "File PDF siap cetak",
                  "Akses download selamanya",
                  "Update gratis jika ada revisi",
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 + index * 0.1, duration: 0.3 }}
                    className="flex items-center gap-2 p-2.5 rounded-lg bg-green-400/20 border border-amber-100"
                  >
                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center flex-shrink-0 shadow-sm">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-xs text-slate-700 font-medium">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.4 }}
              className="sticky bottom-0 -mx-4 md:-mx-6 -mb-4 md:-mb-6 pt-4 pb-4 md:pb-6 px-4 md:px-6 bg-gradient-to-t from-white via-white/95 to-transparent backdrop-blur-sm border-t border-indigo-100/50 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]"
            >
              <div className="flex flex-col md:flex-row gap-2.5">
                {/* Single Product Button */}
                <a
                  href={product.checkout_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full md:flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white hover:shadow-xl hover:scale-[1.02] shadow-lg transition-all duration-200"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span className="font-semibold">Beli Produk Ini - {formatPrice(product.price)}</span>
                </a>

                {/* Category Bundle Button */}
                <a
                  // href={product.bundle_checkout_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full md:flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 text-amber-900 border-2 border-amber-300 hover:border-amber-400 hover:shadow-lg transition-all duration-200 group"
                >
                  <Award className="w-4 h-4 text-amber-600 group-hover:scale-110 transition-transform" />
                  <span className="font-semibold">Paket Kategori {formatPrice(product.priceCategory)}</span>
                </a>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProductDetailModal;

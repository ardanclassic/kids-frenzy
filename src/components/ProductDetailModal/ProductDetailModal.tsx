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
  const [scrollY, setScrollY] = React.useState(0);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  if (!product) return null;

  const subcategoryInfo = getSubcategoryInfo(product.subcategory);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollY(e.currentTarget.scrollTop);
  };

  // Calculate smooth gradient opacity based on scroll
  const gradientOpacity = Math.min(scrollY / 300, 1);
  const imageOpacity = Math.max(1 - scrollY / 400, 0);
  const contentBgOpacity = Math.min(scrollY / 600, 1); // Extended range for longer gradient effect

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-white/100 backdrop-blur-md p-0 md:p-4"
        onClick={onClose}
      >
        <motion.div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full h-full md:h-auto md:rounded-2xl md:max-w-5xl md:max-h-[95vh] overflow-y-auto shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Fixed Background Image with Smooth Fade */}
          <div
            className="fixed top-0 left-0 right-0 h-[100vh] md:h-[100vh] overflow-hidden pointer-events-none"
            style={{ opacity: imageOpacity }}
          >
            <motion.img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6 }}
            />
            <div
              className="absolute inset-0 bg-gradient-to-b from-black/50 via-purple-900/30 to-white"
              style={{ opacity: 0.6 + gradientOpacity * 0.4 }}
            />
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="fixed top-3 right-3 md:top-4 md:right-4 p-2 md:p-2.5 bg-white/95 backdrop-blur-sm rounded-full hover:bg-white hover:scale-110 transition-all shadow-lg z-[60]"
          >
            <X className="w-5 h-5 md:w-6 md:h-6 text-gray-800" />
          </button>

          {/* Unified Hero + Content Section */}
          <div className="relative">
            {/* Hero Title Section */}
            <div className="relative h-48 md:h-72 flex items-end">
              <div className="w-full p-4 md:p-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-block"
                >
                  <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-3 drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] leading-tight">
                    {product.title}
                  </h2>
                </motion.div>
              </div>
            </div>

            {/* Content Section with Smooth Gradient Background */}
            <div
              className="relative"
              style={{
                background: `linear-gradient(to bottom, 
                  rgba(255, 255, 255, ${contentBgOpacity * 0.85}) 0%, 
                  rgba(255, 255, 255, ${contentBgOpacity * 0.9}) 15%, 
                  rgba(255, 255, 255, ${contentBgOpacity * 0.95}) 30%,
                  rgba(255, 255, 255, 0.98) 50%, 
                  rgba(255, 255, 255, 1) 70%
                )`,
              }}
            >
              <div className="p-4 md:p-8 lg:p-10 space-y-8">
                {/* Info Badges - In Hero */}
                <div className="flex flex-wrap gap-2">
                  <span className="px-4 py-2 rounded-full text-xs md:text-sm font-bold bg-white/95 backdrop-blur-sm text-indigo-600 shadow-lg hover:scale-105 transition-transform">
                    {subcategoryInfo.emoji} {subcategoryInfo.name}
                  </span>
                  <span className="px-4 py-2 rounded-full text-xs md:text-sm font-bold bg-gradient-to-r from-rose-400 to-pink-500 text-white shadow-lg hover:scale-105 transition-transform">
                    {product.ageRange}
                  </span>
                </div>
                {/* Description Card - Enhanced */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="relative p-5 md:p-6 rounded-2xl bg-gradient-to-br from-purple-50 via-white to-indigo-50 border-2 border-purple-200 shadow-lg hover:shadow-xl transition-shadow overflow-hidden group"
                >
                  {/* Decorative gradient orb */}
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-purple-300/30 to-indigo-300/30 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />

                  <div className="relative">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="p-2.5 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-500 shadow-md">
                        <BookOpen className="w-5 h-5 md:w-6 md:h-6 text-white" />
                      </div>
                      <h3 className="text-lg md:text-xl font-bold text-gray-900">Tentang Produk Ini</h3>
                    </div>
                    <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-3">{product.description}</p>
                    <div className="pl-4 border-l-4 border-purple-300">
                      <p className="text-xs md:text-sm text-gray-600 italic leading-relaxed">
                        {subcategoryInfo.description}
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Features Grid - Enhanced */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2.5 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 shadow-md">
                      <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-white" />
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-gray-900">Fitur Unggulan</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
                    {product.features.map((feature, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        className="group relative flex items-center gap-3 p-4 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 hover:border-blue-400 shadow-sm hover:shadow-lg transition-all overflow-hidden"
                      >
                        {/* Shine effect on hover */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

                        <div className="relative w-7 h-7 rounded-full flex items-center justify-center bg-gradient-to-br from-blue-400 to-blue-600 shadow-md flex-shrink-0">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                        <span className="relative text-sm font-semibold text-gray-800">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Skills - Enhanced Pills */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2.5 rounded-xl bg-gradient-to-br from-pink-400 to-rose-500 shadow-md">
                      <Brain className="w-5 h-5 md:w-6 md:h-6 text-white" />
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-gray-900">Keterampilan yang Dikembangkan</h3>
                  </div>
                  <div className="flex flex-wrap gap-2 md:gap-3">
                    {product.skills.map((skill, index) => (
                      <motion.span
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6 + index * 0.05 }}
                        whileHover={{ scale: 1.05 }}
                        className="px-4 py-2 rounded-full text-xs md:text-sm font-bold bg-gradient-to-r from-pink-100 via-purple-100 to-indigo-100 text-pink-700 border-2 border-pink-300 shadow-sm hover:shadow-md transition-all cursor-default"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>

                {/* Preview Gallery */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
                  <PreviewGallery preview={product.preview} />
                </motion.div>

                {/* What You Get - Enhanced */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="relative p-5 md:p-6 rounded-2xl bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 border-2 border-amber-300 shadow-lg overflow-hidden group"
                >
                  {/* Decorative elements */}
                  <div className="absolute -top-8 -left-8 w-32 h-32 bg-gradient-to-br from-amber-300/20 to-yellow-300/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
                  <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-gradient-to-br from-orange-300/20 to-amber-300/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />

                  <div className="relative">
                    <div className="flex items-center gap-3 mb-4">
                      <Award className="w-6 h-6 text-amber-600" />
                      <h4 className="text-base md:text-lg font-bold text-amber-900">Yang Anda Dapatkan</h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {["File PDF siap cetak", "Akses download selamanya", "Update gratis jika ada revisi"].map(
                        (item, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.8 + index * 0.1 }}
                            className="flex items-center gap-3 p-3 rounded-xl bg-white/60 backdrop-blur-sm border border-amber-200"
                          >
                            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center flex-shrink-0 shadow-md">
                              <Check className="w-3.5 h-3.5 text-white" />
                            </div>
                            <span className="text-xs md:text-sm text-gray-800 font-semibold">{item}</span>
                          </motion.div>
                        )
                      )}
                    </div>
                  </div>
                </motion.div>

                {/* CTA Button - Sticky on Mobile */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="sticky bottom-0 -mx-4 md:mx-0 -mb-10 md:mb-0 p-4 md:p-0 bg-gradient-to-t from-white via-white to-transparent md:bg-transparent border-t md:border-t-0 border-gray-200"
                >
                  <button className="relative w-full group overflow-hidden flex items-center justify-center gap-3 px-6 py-4 md:py-5 rounded-xl md:rounded-2xl bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 text-white hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 text-base md:text-lg font-bold shadow-xl">
                    {/* Animated gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

                    <ShoppingCart className="relative w-5 h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform" />
                    <span className="relative">Beli Sekarang - {formatPrice(product.price)}</span>
                  </button>
                  <p className="text-center text-xs md:text-sm text-gray-600 mt-2 font-medium">
                    ⚡ Download instan setelah pembayaran
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProductDetailModal;

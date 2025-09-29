import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, BookOpen, Sparkles, Brain, Target, ShoppingCart, Award } from "lucide-react";
import PreviewGallery from "./PreviewGallery";

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
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative">
            <img src={product.image} alt={product.title} className="w-full h-64 lg:h-80 object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-3 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
            >
              <X className="w-6 h-6 text-gray-700" />
            </button>

            <div className="absolute bottom-6 left-6 right-6">
              <div className="flex items-center space-x-2 mb-2">
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/90 backdrop-blur-sm text-gray-700">
                  {subcategoryInfo.emoji} {subcategoryInfo.name}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/90 backdrop-blur-sm text-pink-600">
                  {product.ageRange}
                </span>
              </div>
              <h2 className="text-3xl lg:text-4xl text-white mb-2">{product.title}</h2>
            </div>
          </div>

          <div className="p-8 space-y-8">
            <div>
              <h3 className="text-xl text-gray-900 mb-4 flex items-center">
                <BookOpen className="w-6 h-6 mr-3 text-teal-500" />
                Deskripsi Produk
              </h3>
              <p className="text-gray-700 leading-relaxed text-lg">{product.description}</p>
            </div>

            <div className="p-6 rounded-xl bg-gradient-to-r from-blue-50 to-teal-50">
              <h4 className="text-gray-800 mb-2">Kategori Aktivitas</h4>
              <p className="text-gray-600 text-sm leading-relaxed">{subcategoryInfo.description}</p>
            </div>

            <div>
              <h3 className="text-xl text-gray-900 mb-4 flex items-center">
                <Sparkles className="w-6 h-6 mr-3 text-purple-500" />
                Fitur Utama
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                {product.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3 p-4 rounded-xl bg-teal-50">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-teal-100">
                      <Target className="w-4 h-4 text-teal-600" />
                    </div>
                    <span className="font-medium text-gray-800">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl text-gray-900 mb-4 flex items-center">
                <Brain className="w-6 h-6 mr-3 text-pink-500" />
                Keterampilan yang Dikembangkan
              </h3>
              <div className="flex flex-wrap gap-3">
                {product.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 rounded-xl font-medium border bg-gradient-to-r from-pink-50 to-purple-50 text-pink-600 border-pink-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Enhanced Preview Gallery */}
            <PreviewGallery preview={product.preview} />

            <div className="p-6 rounded-2xl bg-gradient-to-r from-teal-50 to-purple-50">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <p className="text-gray-600 mb-2">Harga Produk Digital</p>
                  <div className="text-4xl text-pink-500">{formatPrice(product.price)}</div>
                  <p className="text-sm text-gray-500 mt-1">Download sekali, gunakan selamanya!</p>
                </div>

                <button className="flex items-center space-x-2 px-6 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-600 hover:to-purple-600 transition-all duration-200 shadow-lg font-medium">
                  <ShoppingCart className="w-5 h-5" />
                  <span>Beli Sekarang</span>
                </button>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-yellow-50">
              <h4 className="mb-3 flex items-center text-yellow-700">
                <Award className="w-5 h-5 mr-2" />
                Yang Akan Anda Dapatkan:
              </h4>
              <ul className="space-y-2 text-gray-700">
                {["File PDF siap cetak", "Akses download selamanya", "Update gratis jika ada revisi"].map(
                  (item, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <span>{item}</span>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProductDetailModal;

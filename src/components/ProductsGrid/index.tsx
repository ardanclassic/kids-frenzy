import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye } from "lucide-react";

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

interface SubcategoryInfo {
  id: string;
  name: string;
  emoji: string;
}

interface ProductsGridProps {
  products: Product[];
  selectedAgeCategory: string;
  selectedSubcategory: string;
  searchTerm: string;
  onProductClick: (product: Product) => void;
  getSubcategoryInfo: (subcategoryId: string) => SubcategoryInfo;
  formatPrice: (price: number) => string;
}

const ProductsGrid: React.FC<ProductsGridProps> = ({
  products,
  selectedAgeCategory,
  selectedSubcategory,
  searchTerm,
  onProductClick,
  getSubcategoryInfo,
  formatPrice,
}) => {
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
    <AnimatePresence mode="wait">
      <motion.div
        key={`${selectedAgeCategory}-${selectedSubcategory}-${searchTerm}`}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-5 mb-12"
      >
        {products.map((product) => {
          const subcategoryInfo = getSubcategoryInfo(product.subcategory);
          return (
            <motion.div
              key={product.id}
              variants={itemVariants}
              className="group cursor-pointer"
              onClick={() => onProductClick(product)}
            >
              {/* Card Container */}
              <div className="relative overflow-hidden rounded-lg md:rounded-2xl shadow-md hover:shadow-xl transition-all duration-500">
                <div className="relative aspect-[3/4]">
                  {/* Main Image */}
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                  />

                  {/* Base Gradient - Always visible */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />

                  {/* Hover Dark Overlay */}
                  <div className="absolute inset-0 bg-slate-900/75 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* MOBILE VIEW - Compact Layout */}
                  <div className="md:hidden">
                    {/* Top Badge - Mobile */}
                    <div className="absolute top-2 right-2 opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                      <span className="px-2 py-0.5 rounded-md text-xs bg-amber-100/90 backdrop-blur-sm text-amber-700">
                        {product.ageRange}
                      </span>
                    </div>

                    {/* Bottom Info - Mobile Default */}
                    <div className="absolute bottom-0 left-0 right-0 p-2.5 opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                      <div className="space-y-1.5">
                        <h3 className="text-white text-xs leading-snug line-clamp-2 drop-shadow">{product.title}</h3>
                        <div className="inline-flex items-center px-2 py-1 bg-emerald-100/90 backdrop-blur-sm rounded-md">
                          <span className="text-emerald-700 text-xs">{formatPrice(product.price)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Hover Content - Mobile Simplified */}
                    <div className="absolute inset-0 flex flex-col justify-between p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="px-2 py-0.5 rounded-md text-xs bg-slate-100/90 backdrop-blur-sm text-slate-700">
                            {subcategoryInfo.emoji} {subcategoryInfo.name}
                          </span>
                          <span className="px-2 py-0.5 rounded-md text-xs bg-amber-100/90 backdrop-blur-sm text-amber-700">
                            {product.ageRange}
                          </span>
                        </div>

                        <h3 className="text-white text-xs leading-snug line-clamp-2">{product.title}</h3>

                        <p className="text-white/80 text-xs leading-relaxed line-clamp-3">{product.description}</p>
                      </div>

                      <div className="space-y-2">
                        <div className="text-emerald-300 text-sm">{formatPrice(product.price)}</div>
                        <div className="bg-teal-100/90 backdrop-blur-sm rounded-lg px-3 py-1.5 flex items-center justify-center gap-1.5">
                          <Eye className="w-3.5 h-3.5 text-teal-700" />
                          <span className="text-xs text-teal-700">Lihat</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* DESKTOP VIEW - Full Details */}
                  <div className="hidden md:block">
                    {/* Top Badges - Desktop */}
                    <div className="absolute top-3 left-3 right-3 flex items-start justify-between opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                      <span className="px-3 py-1.5 rounded-xl text-xs bg-white/90 backdrop-blur-sm text-slate-700 flex items-center gap-1.5 shadow-sm">
                        <span className="text-sm">{subcategoryInfo.emoji}</span>
                        <span>{subcategoryInfo.name}</span>
                      </span>
                      <span className="px-3 py-1.5 rounded-xl text-xs bg-amber-100/90 backdrop-blur-sm text-amber-700 shadow-sm">
                        {product.ageRange}
                      </span>
                    </div>

                    {/* Bottom Info - Desktop Default */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                      <div className="space-y-2">
                        <h3 className="text-white text-sm leading-snug line-clamp-2 drop-shadow-lg">{product.title}</h3>
                        <div className="inline-flex items-center px-3 py-1.5 bg-emerald-100/90 backdrop-blur-sm rounded-lg">
                          <span className="text-emerald-700 text-sm">{formatPrice(product.price)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Hover Content - Desktop Full */}
                    <div className="absolute inset-0 flex flex-col p-5 space-y-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-y-auto">
                      {/* Header */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="px-2.5 py-1 rounded-lg text-xs bg-slate-100/90 backdrop-blur-sm text-slate-700 flex items-center gap-1">
                            <span>{subcategoryInfo.emoji}</span>
                            <span>{subcategoryInfo.name}</span>
                          </span>
                          <span className="px-2.5 py-1 rounded-lg text-xs bg-amber-100/90 backdrop-blur-sm text-amber-700">
                            {product.ageRange}
                          </span>
                        </div>

                        <h3 className="text-white text-base leading-snug">{product.title}</h3>
                      </div>

                      {/* Content */}
                      <div className="flex-1 space-y-3">
                        <p className="text-white/90 text-sm leading-relaxed line-clamp-4">{product.description}</p>

                        <div className="flex flex-wrap gap-1.5">
                          {product.skills.slice(0, 4).map((skill, index) => (
                            <span
                              key={index}
                              className="px-2.5 py-1 rounded-lg text-xs bg-purple-100/90 backdrop-blur-sm text-purple-700"
                            >
                              {skill}
                            </span>
                          ))}
                          {product.skills.length > 4 && (
                            <span className="px-2.5 py-1 rounded-lg text-xs bg-slate-100/90 backdrop-blur-sm text-slate-600">
                              +{product.skills.length - 4}
                            </span>
                          )}
                        </div>

                        <div className="space-y-1.5">
                          {product.features.slice(0, 3).map((feature, index) => (
                            <div key={index} className="flex items-start gap-2 text-white/80 text-xs">
                              <span className="text-teal-400 mt-0.5">✓</span>
                              <span className="line-clamp-2">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="space-y-2 pt-2">
                        <div className="text-emerald-300 text-lg">{formatPrice(product.price)}</div>
                        <div className="bg-teal-100/90 backdrop-blur-sm hover:bg-teal-200/90 transition-colors rounded-xl px-4 py-2 flex items-center justify-center gap-2">
                          <Eye className="w-4 h-4 text-teal-700" />
                          <span className="text-sm text-teal-700">Lihat Detail</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </AnimatePresence>
  );
};

export default ProductsGrid;

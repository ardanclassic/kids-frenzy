import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";

interface PreviewGalleryProps {
  preview: string[];
}

const PreviewGallery: React.FC<PreviewGalleryProps> = ({ preview }) => {
  const [currentPreviewIndex, setCurrentPreviewIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const nextPreview = () => {
    setCurrentPreviewIndex((prev) => (prev + 1) % preview.length);
  };

  const prevPreview = () => {
    setCurrentPreviewIndex((prev) => (prev - 1 + preview.length) % preview.length);
  };

  return (
    <>
      <div>
        <h3 className="text-xl text-gray-900 mb-6 flex items-center">
          <Sparkles className="w-6 h-6 mr-3 text-orange-500" />
          Preview Konten
        </h3>

        {/* Main Preview Image with Enhanced Interaction */}
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 mb-4 shadow-2xl group">
          <div className="relative w-full" style={{ paddingBottom: "66.67%" }}>
            <AnimatePresence mode="wait">
              <motion.img
                key={currentPreviewIndex}
                src={preview[currentPreviewIndex]}
                alt={`Preview ${currentPreviewIndex + 1}`}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 w-full h-full object-contain"
              />
            </AnimatePresence>

            {/* Fullscreen Button */}
            <button
              onClick={() => setIsFullscreen(true)}
              className="absolute top-4 right-4 p-2.5 bg-black/60 backdrop-blur-md rounded-lg hover:bg-black/80 transition-all opacity-0 group-hover:opacity-100 z-20"
              aria-label="Fullscreen"
            >
              <Maximize2 className="w-5 h-5 text-white" />
            </button>

            {/* Navigation Buttons - Enhanced */}
            {preview.length > 1 && (
              <>
                <button
                  onClick={prevPreview}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-3 bg-white/95 backdrop-blur-md rounded-full hover:bg-white hover:scale-110 transition-all shadow-2xl active:scale-95 z-10 opacity-0 group-hover:opacity-100"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6 text-gray-700" />
                </button>
                <button
                  onClick={nextPreview}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-3 bg-white/95 backdrop-blur-md rounded-full hover:bg-white hover:scale-110 transition-all shadow-2xl active:scale-95 z-10 opacity-0 group-hover:opacity-100"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-6 h-6 text-gray-700" />
                </button>

                {/* Image Counter - Enhanced */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/80 backdrop-blur-md rounded-full text-white text-sm font-semibold shadow-lg">
                  {currentPreviewIndex + 1} / {preview.length}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Thumbnail Navigation - Enhanced with Smooth Scrolling */}
        {preview.length > 1 && (
          <div className="flex justify-center mb-4">
            <div className="inline-flex gap-3 p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl shadow-inner max-w-full overflow-x-auto">
              {preview.map((previewUrl, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentPreviewIndex(index)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative rounded-xl overflow-hidden transition-all duration-300 flex-shrink-0 ${
                    currentPreviewIndex === index
                      ? "ring-4 ring-teal-500 shadow-xl"
                      : "ring-2 ring-gray-300 hover:ring-teal-400 opacity-60 hover:opacity-100"
                  }`}
                  style={{ width: "80px", height: "80px" }}
                  aria-label={`View image ${index + 1}`}
                >
                  <img src={previewUrl} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                  {currentPreviewIndex === index && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute inset-0 bg-teal-500/20 border-2 border-teal-500 rounded-xl"
                      transition={{ type: "spring", damping: 20, stiffness: 300 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </div>
        )}

        {/* Progress Bar Indicator */}
        {preview.length > 1 && (
          <div className="flex justify-center gap-2">
            {preview.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentPreviewIndex(index)}
                className={`rounded-full transition-all duration-300 ${
                  currentPreviewIndex === index
                    ? "w-10 h-2 bg-gradient-to-r from-teal-500 to-purple-500"
                    : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
                }`}
                whileHover={{ scale: 1.2 }}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Helper Text */}
        <p className="text-center text-gray-500 text-sm mt-4 flex items-center justify-center gap-2">
          <Sparkles className="w-4 h-4" />
          Klik thumbnail atau gunakan tombol navigasi untuk melihat lebih banyak preview
        </p>
      </div>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setIsFullscreen(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsFullscreen(false)}
                className="absolute top-4 right-4 p-3 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors z-10"
              >
                <X className="w-6 h-6 text-gray-700" />
              </button>

              <img
                src={preview[currentPreviewIndex]}
                alt={`Preview ${currentPreviewIndex + 1}`}
                className="max-w-full max-h-full object-contain"
              />

              {preview.length > 1 && (
                <>
                  <button
                    onClick={prevPreview}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-4 bg-white/95 backdrop-blur-md rounded-full hover:bg-white hover:scale-110 transition-all shadow-2xl"
                  >
                    <ChevronLeft className="w-8 h-8 text-gray-700" />
                  </button>
                  <button
                    onClick={nextPreview}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-4 bg-white/95 backdrop-blur-md rounded-full hover:bg-white hover:scale-110 transition-all shadow-2xl"
                  >
                    <ChevronRight className="w-8 h-8 text-gray-700" />
                  </button>

                  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 px-6 py-3 bg-white/90 backdrop-blur-md rounded-full text-gray-900 text-lg font-semibold shadow-2xl">
                    {currentPreviewIndex + 1} / {preview.length}
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PreviewGallery;

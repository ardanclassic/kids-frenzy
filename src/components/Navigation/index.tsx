import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, BookOpen, Star, Users, HelpCircle, MessageCircle } from "lucide-react";

const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { name: "Beranda", path: "/", icon: Star },
    { name: "Produk Digital", path: "/products", icon: BookOpen },
    { name: "Tentang Kami", path: "/about", icon: Users },
    { name: "FAQ", path: "/faq", icon: HelpCircle },
    { name: "Kontak", path: "/contact", icon: MessageCircle },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Fixed Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200/50 shadow-lg">
        <div className="container mx-auto px-3 lg:px-4 py-2.5 lg:py-4 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <motion.div
              className="w-9 h-9 lg:w-12 lg:h-12 rounded-full flex items-center justify-center shadow-lg"
              style={{ background: `linear-gradient(135deg, #FF6B6B, #4ECDC4)` }}
              whileHover={{ rotate: 360, scale: 1.05 }}
              transition={{ duration: 0.5 }}
            >
              <BookOpen className="text-white w-4 h-4 lg:w-6 lg:h-6" />
            </motion.div>
            <div className="text-left">
              <h1 className="text-lg lg:text-2xl font-bold text-gradient text-transparent">Kids Frenzy</h1>
              <p className="text-xs lg:text-sm font-medium text-gray-400 hidden sm:block">Digital Learning</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-2">
            {navigationItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <motion.div key={item.name} className="relative">
                  <Link
                    to={item.path}
                    className={`relative px-6 py-3 rounded-full transition-all duration-300 font-medium flex items-center space-x-2 ${
                      isActive ? "text-white shadow-lg" : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                    style={
                      isActive
                        ? {
                            background: `linear-gradient(135deg, #FF6B6B, #4ECDC4)`,
                          }
                        : {}
                    }
                  >
                    {/* Active background animation */}
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 rounded-full"
                        style={{
                          background: `linear-gradient(135deg, #FF6B6B, #4ECDC4)`,
                        }}
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}

                    {/* Hover background for non-active items */}
                    {!isActive && (
                      <motion.div
                        className="absolute inset-0 rounded-full bg-gradient-to-r from-gray-100 to-gray-50 opacity-0"
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}

                    <span className="relative z-10 flex items-center space-x-2">
                      <item.icon className="w-4 h-4" />
                      <span>{item.name}</span>
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={toggleMenu}
            className="lg:hidden p-2 rounded-full text-white shadow-lg relative overflow-hidden"
            style={{ background: `linear-gradient(135deg, #FF6B6B, #4ECDC4)` }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div animate={{ rotate: isMenuOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.div>
          </motion.button>
        </div>
      </nav>

      {/* Fullscreen Overlay Menu - Mobile Optimized */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-50 bg-gradient-to-br from-pink-400/95 via-purple-400/95 to-blue-400/95 backdrop-blur-xl"
          >
            {/* Animated background shapes */}
            <div className="absolute inset-0 overflow-hidden">
              <motion.div
                animate={{
                  x: [-100, 100, -100],
                  y: [-100, 100, -100],
                  rotate: [0, 360],
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/10 rounded-full blur-xl"
              />
              <motion.div
                animate={{
                  x: [100, -100, 100],
                  y: [100, -100, 100],
                  rotate: [360, 0],
                }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-white/10 rounded-full blur-xl"
              />
            </div>

            {/* Close Button - Compact */}
            <motion.button
              onClick={closeMenu}
              className="absolute top-4 right-4 p-3 rounded-full bg-white/20 text-white hover:bg-white/30 transition-all duration-200 backdrop-blur-sm"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              <X size={24} />
            </motion.button>

            {/* Logo in Menu - Compact */}
            <div className="absolute top-4 left-4 flex items-center space-x-2">
              <motion.div
                className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                <BookOpen className="text-white w-5 h-5" />
              </motion.div>
              <div>
                <h1 className="text-lg font-bold text-white">Kids Frenzy</h1>
                <p className="text-white/80 text-xs">Digital Learning</p>
              </div>
            </div>

            {/* Menu Items - Mobile Optimized */}
            <div className="flex flex-col items-center justify-center h-full space-y-3 px-6 py-20">
              {navigationItems.map((item, index) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 50, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 50, scale: 0.8 }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.1,
                      ease: "easeOut",
                    }}
                    className="w-full max-w-xs"
                  >
                    <Link
                      to={item.path}
                      onClick={closeMenu}
                      className={`group flex items-center space-x-3 w-full py-3 px-5 rounded-xl backdrop-blur-sm transition-all duration-300 hover:scale-105 ${
                        isActive ? "bg-white/30 shadow-lg" : "bg-white/10 hover:bg-white/25"
                      }`}
                    >
                      <motion.div
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                        className={`p-2.5 rounded-lg transition-all duration-300 ${
                          isActive ? "bg-white/40 shadow-lg" : "bg-white/20 group-hover:bg-white/35"
                        }`}
                      >
                        <Icon className="text-white w-5 h-5" />
                      </motion.div>
                      <span className="text-white text-base font-semibold group-hover:text-yellow-200 transition-colors">
                        {item.name}
                      </span>
                    </Link>
                  </motion.div>
                );
              })}

              {/* Fun decorative elements - Smaller */}
              <motion.div
                animate={{
                  y: [0, -15, 0],
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute bottom-16 left-6 w-10 h-10 bg-yellow-400/30 rounded-full flex items-center justify-center backdrop-blur-sm"
              >
                <Star className="text-white w-5 h-5" />
              </motion.div>

              <motion.div
                animate={{
                  y: [0, 12, 0],
                  rotate: [0, -15, 15, 0],
                  scale: [1, 0.95, 1],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
                className="absolute bottom-24 right-8 w-8 h-8 bg-white/25 rounded-full flex items-center justify-center backdrop-blur-sm"
              >
                <BookOpen className="text-white w-4 h-4" />
              </motion.div>
            </div>

            {/* Bottom decorative text - Compact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center px-4"
            >
              <motion.p
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="text-white/80 text-xs font-medium"
              >
                Belajar Seru, Masa Depan Cerah! ✨
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;

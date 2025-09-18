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
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-kid-teal/20 shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <motion.div
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ background: `linear-gradient(135deg, var(--color-kid-coral), var(--color-kid-teal))` }}
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <BookOpen className="text-white w-6 h-6" />
            </motion.div>
            <div>
              <h1 className="text-2xl font-bold text-gradient">Kids Frenzy</h1>
              <p className="text-xs font-medium" style={{ color: `var(--color-kid-teal)` }}>
                Digital Learning
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`relative px-4 py-2 rounded-full transition-all duration-200 font-medium ${
                    isActive ? "text-white" : "text-gray-700 hover:text-white"
                  }`}
                  style={
                    isActive
                      ? {
                          color: `var(--color-kid-coral)`,
                          background: `color-mix(in srgb, var(--color-kid-coral) 10%, transparent)`,
                        }
                      : {}
                  }
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: `linear-gradient(to right, color-mix(in srgb, var(--color-kid-coral) 20%, transparent), color-mix(in srgb, var(--color-kid-teal) 20%, transparent))`,
                      }}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={toggleMenu}
            className="lg:hidden p-2 rounded-full text-white shadow-lg"
            style={{ background: `linear-gradient(to right, var(--color-kid-coral), var(--color-kid-teal))` }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </nav>

      {/* Fullscreen Overlay Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-50 bg-gradient-to-br from-kid-coral/95 via-kid-teal/95 to-kid-sage/95 backdrop-blur-xl"
          >
            {/* Close Button */}
            <motion.button
              onClick={closeMenu}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
              whileHover={{ scale: 1.05, rotate: 90 }}
              whileTap={{ scale: 0.95 }}
            >
              <X size={28} />
            </motion.button>

            {/* Logo in Menu */}
            <div className="absolute top-6 left-6 flex items-center space-x-3">
              <motion.div
                className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                <BookOpen className="text-white w-8 h-8" />
              </motion.div>
              <div>
                <h1 className="text-2xl font-bold text-white">Kids Frenzy</h1>
                <p className="text-white/80 text-sm">Digital Learning</p>
              </div>
            </div>

            {/* Menu Items */}
            <div className="flex flex-col items-center justify-center h-full space-y-8 px-6">
              {navigationItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.1,
                      ease: "easeOut",
                    }}
                    className="w-full max-w-md"
                  >
                    <Link
                      to={item.path}
                      onClick={closeMenu}
                      className="group flex items-center justify-center space-x-4 w-full py-4 px-8 bg-white/10 hover:bg-white/20 rounded-2xl backdrop-blur-sm transition-all duration-300 hover:scale-105"
                    >
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                        className="p-3 bg-white/20 rounded-full group-hover:bg-white/30 transition-colors"
                      >
                        <Icon className="text-white w-6 h-6" />
                      </motion.div>
                      <span className="text-white text-xl font-semibold group-hover:text-kid-amber transition-colors">
                        {item.name}
                      </span>
                    </Link>
                  </motion.div>
                );
              })}

              {/* Fun decorative elements */}
              <motion.div
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute bottom-20 left-10 w-16 h-16 bg-kid-amber/30 rounded-full flex items-center justify-center"
              >
                <Star className="text-white w-8 h-8" />
              </motion.div>

              <motion.div
                animate={{
                  y: [0, 15, 0],
                  rotate: [0, -10, 10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
                className="absolute bottom-32 right-16 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center"
              >
                <BookOpen className="text-white w-6 h-6" />
              </motion.div>
            </div>

            {/* Bottom decorative text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center"
            >
              <p className="text-white/60 text-sm">Belajar Seru, Masa Depan Cerah! ✨</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
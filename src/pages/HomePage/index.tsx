import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  BookOpen,
  Star,
  Award,
  Heart,
  Sparkles,
  ArrowRight,
  Play,
  CheckCircle,
  Gift,
  Target,
  Zap,
  Lightbulb,
} from "lucide-react";

const HomePage: React.FC = () => {
  const containerVariants: any = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: ["easeOut"],
      },
    },
  };

  const floatingVariants: any = {
    animate: {
      y: [0, -15, 0],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="pt-16 md:pt-20 overflow-hidden">
      {/* Hero Section */}
      <motion.section
        className="relative min-h-[85vh] md:min-h-screen flex items-center justify-center px-4 py-12 md:py-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Background decorative elements - optimized for mobile */}
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className="absolute top-20 left-4 md:top-82 md:left-10 w-10 h-10 md:w-20 md:h-20 bg-kid-amber/40 rounded-full flex items-center justify-center"
        >
          <Star className="text-kid-amber w-5 h-5 md:w-10 md:h-10" />
        </motion.div>

        <motion.div
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: "1s" }}
          className="absolute top-24 right-4 md:top-190 md:right-16 w-8 h-8 md:w-16 md:h-16 bg-kid-coral/40 rounded-full flex items-center justify-center"
        >
          <BookOpen className="text-kid-coral w-4 h-4 md:w-8 md:h-8" />
        </motion.div>

        <motion.div
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: "2s" }}
          className="absolute bottom-16 left-6 md:bottom-32 md:left-20 w-7 h-7 md:w-12 md:h-12 bg-kid-teal/40 rounded-full flex items-center justify-center"
        >
          <Heart className="text-kid-teal w-3.5 h-3.5 md:w-6 md:h-6" />
        </motion.div>

        <div className="container mx-auto text-center relative z-10">
          <motion.div variants={itemVariants} className="mb-5 md:mb-8">
            <motion.h1
              className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl mb-3 md:mb-6 leading-tight px-2"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 3, repeat: Infinity }}
              style={{
                background: "linear-gradient(45deg, #ff8a7a, #9cb891, #5fb3b3, #f5c26b)",
                backgroundSize: "300% 300%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Belajar Jadi
              <br />
              <span className="inline-block">
                Seru & Menyenangkan!
                <motion.div
                  className="absolute -top-2 -right-6 md:-top-4 md:-right-8"
                  animate={{ rotate: [0, 20, -20, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Sparkles className="text-kid-amber w-5 h-5 md:w-8 md:h-8 lg:w-12 lg:h-12" />
                </motion.div>
              </span>
            </motion.h1>
          </motion.div>

          <motion.div variants={itemVariants} className="mb-6 md:mb-8">
            <p className="text-sm sm:text-base md:text-xl lg:text-2xl text-gray-700 max-w-3xl mx-auto font-medium leading-snug md:leading-tight px-4">
              🎯 <span className="text-kid-coral">Produk digital terbaru</span> yang dirancang khusus untuk membuat
              anak-anak <span className="text-kid-teal">belajar dengan gembira</span> sambil mengembangkan kreativitas
              dan kecerdasan mereka.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="mb-10 md:mb-16">
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center px-4">
              <Link to="/products">
                <motion.button
                  className="btn-primary text-sm md:text-lg px-6 py-3 md:px-8 md:py-4 shadow-2xl group relative overflow-hidden w-full sm:w-auto"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10 flex items-center justify-center">
                    🚀 Jelajahi Koleksi Kami
                    <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-kid-sage to-kid-mint"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "0%" }}
                    transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
                  />
                </motion.button>
              </Link>

              <motion.button
                className="bg-white/90 backdrop-blur-sm text-kid-coral py-3 px-6 md:py-4 md:px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 group border-2 border-kid-coral/20 text-sm md:text-base w-full sm:w-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="flex items-center justify-center">
                  <Play className="mr-2 w-4 h-4 md:w-5 md:h-5 group-hover:scale-110 transition-transform" />
                  Preview Gratis
                </span>
              </motion.button>
            </div>
          </motion.div>

          {/* Innovation Stats - Compact on mobile */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 max-w-4xl mx-auto px-4"
          >
            <div className="card-playful text-center group hover:bg-kid-coral/10 p-3 md:p-6">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="w-10 h-10 md:w-16 md:h-16 bg-gradient-to-br from-kid-coral to-kid-peach rounded-full flex items-center justify-center mx-auto mb-2 md:mb-4"
              >
                <Lightbulb className="text-white w-5 h-5 md:w-8 md:h-8" />
              </motion.div>
              <h3 className="text-lg md:text-2xl lg:text-3xl text-kid-coral mb-1 md:mb-2">Fresh</h3>
              <p className="text-gray-400 font-medium text-xs md:text-base lg:text-xl">Konsep Baru</p>
            </div>

            <div className="card-playful text-center group hover:bg-kid-teal/10 p-3 md:p-6">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="w-10 h-10 md:w-16 md:h-16 bg-gradient-to-br from-kid-teal to-kid-mint rounded-full flex items-center justify-center mx-auto mb-2 md:mb-4"
              >
                <Target className="text-white w-5 h-5 md:w-8 md:h-8" />
              </motion.div>
              <h3 className="text-lg md:text-2xl lg:text-3xl text-kid-teal mb-1 md:mb-2">100%</h3>
              <p className="text-gray-400 font-medium text-xs md:text-base lg:text-xl">Fokus Anak</p>
            </div>

            <div className="card-playful text-center group hover:bg-kid-amber/10 p-3 md:p-6">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="w-10 h-10 md:w-16 md:h-16 bg-gradient-to-br from-kid-amber to-kid-peach rounded-full flex items-center justify-center mx-auto mb-2 md:mb-4"
              >
                <Zap className="text-white w-5 h-5 md:w-8 md:h-8" />
              </motion.div>
              <h3 className="text-lg md:text-2xl lg:text-3xl text-kid-amber mb-1 md:mb-2">Instant</h3>
              <p className="text-gray-400 font-medium text-xs md:text-base lg:text-xl">Download</p>
            </div>

            <div className="card-playful text-center group hover:bg-kid-lavender/10 p-3 md:p-6">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="w-10 h-10 md:w-16 md:h-16 bg-gradient-to-br from-kid-lavender to-kid-sage rounded-full flex items-center justify-center mx-auto mb-2 md:mb-4"
              >
                <Award className="text-white w-5 h-5 md:w-8 md:h-8" />
              </motion.div>
              <h3 className="text-lg md:text-2xl lg:text-3xl text-kid-lavender mb-1 md:mb-2">Premium</h3>
              <p className="text-gray-400 font-medium text-xs md:text-base lg:text-xl">Quality</p>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Why Choose Us Section */}
      <motion.section
        className="py-12 md:py-20 px-4 bg-white/50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-10 md:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl md:text-4xl lg:text-5xl mb-4 md:mb-6">
              <span className="text-gradient">Mengapa Kids Frenzy?</span> 🤔
            </h2>
            <p className="text-base md:text-xl text-gray-700 max-w-2xl mx-auto px-4">
              Kami memahami kebutuhan belajar modern untuk tumbuh kembang optimal si kecil
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            <motion.div
              className="card-playful group hover:bg-gradient-to-br hover:from-kid-coral/10 hover:to-kid-peach/10 p-5 md:p-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="text-center">
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  className="w-14 h-14 md:w-20 md:h-20 bg-gradient-to-br from-kid-coral to-kid-peach rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6"
                >
                  <Heart className="text-white w-7 h-7 md:w-10 md:h-10" />
                </motion.div>
                <h3 className="text-lg md:text-xl text-kid-coral mb-3 md:mb-4">Dibuat dengan ❤️</h3>
                <p className="text-gray-600 text-sm md:text-base lg:text-lg">
                  Setiap produk dirancang khusus dengan pendekatan terbaru dalam pendidikan anak yang menyenangkan dan
                  efektif
                </p>
              </div>
            </motion.div>

            <motion.div
              className="card-playful group hover:bg-gradient-to-br hover:from-kid-teal/10 hover:to-kid-mint/10 p-5 md:p-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="text-center">
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  className="w-14 h-14 md:w-20 md:h-20 bg-gradient-to-br from-kid-teal to-kid-mint rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6"
                >
                  <Sparkles className="text-white w-7 h-7 md:w-10 md:h-10" />
                </motion.div>
                <h3 className="text-lg md:text-xl text-kid-teal mb-3 md:mb-4">Interaktif & Menarik ✨</h3>
                <p className="text-gray-600 text-sm md:text-base lg:text-lg">
                  Bukan sekedar PDF biasa! Produk kami penuh warna, ilustrasi menarik, dan aktivitas yang membuat anak
                  excited belajar
                </p>
              </div>
            </motion.div>

            <motion.div
              className="card-playful group hover:bg-gradient-to-br hover:from-kid-amber/10 hover:to-kid-sage/10 p-5 md:p-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="text-center">
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  className="w-14 h-14 md:w-20 md:h-20 bg-gradient-to-br from-kid-amber to-kid-sage rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6"
                >
                  <CheckCircle className="text-white w-7 h-7 md:w-10 md:h-10" />
                </motion.div>
                <h3 className="text-lg md:text-xl text-kid-amber mb-3 md:mb-4">Praktis & Hemat 💰</h3>
                <p className="text-gray-600 text-sm md:text-base lg:text-lg">
                  Download sekali, gunakan selamanya! Bisa dicetak kapan saja, tidak perlu koneksi internet untuk
                  menggunakan
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="py-12 md:py-20 px-4 bg-gradient-to-r from-kid-coral via-kid-teal to-kid-sage relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* Background decorations - smaller on mobile */}
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-6 left-6 md:top-10 md:left-10 w-20 h-20 md:w-32 md:h-32 bg-white/10 rounded-full"
        />
        <motion.div
          animate={{
            rotate: [360, 0],
            scale: [1.1, 1, 1.1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-6 right-6 md:bottom-10 md:right-10 w-16 h-16 md:w-24 md:h-24 bg-white/10 rounded-full"
        />

        <div className="container mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white mb-4 md:mb-6 px-4">
              Siap Memberikan yang Terbaik untuk Buah Hati? 🌟
            </h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 mb-6 md:mb-8 max-w-2xl mx-auto px-4">
              Mulai petualangan belajar yang menyenangkan dengan produk digital edukatif terdepan untuk anak Indonesia!
            </p>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center px-4">
              <Link to="/products">
                <motion.button
                  className="bg-white text-kid-coral font-semibold py-3 px-6 md:py-4 md:px-8 rounded-full shadow-xl hover:shadow-2xl transition-all duration-200 text-base md:text-lg group w-full sm:w-auto"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="flex items-center justify-center">
                    <Gift className="mr-2 w-5 h-5 md:w-6 md:h-6 group-hover:rotate-12 transition-transform" />
                    Mulai Sekarang!
                  </span>
                </motion.button>
              </Link>
            </div>

            <motion.p
              className="text-white/80 mt-4 md:mt-6 text-xs sm:text-sm md:text-base lg:text-lg px-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              💎 Dapatkan akses instan setelah download • 🎁 Bonus panduan untuk orang tua
            </motion.p>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default HomePage;

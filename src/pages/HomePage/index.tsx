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
      y: [0, -20, 0],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="pt-20 overflow-hidden">
      {/* Hero Section */}
      <motion.section
        className="relative min-h-screen flex items-center justify-center px-4 py-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Background decorative elements */}
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className="absolute top-32 left-10 w-20 h-20 bg-kid-amber/40 rounded-full flex items-center justify-center"
        >
          <Star className="text-kid-amber w-10 h-10" />
        </motion.div>

        <motion.div
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: "1s" }}
          className="absolute top-40 right-16 w-16 h-16 bg-kid-coral/40 rounded-full flex items-center justify-center"
        >
          <BookOpen className="text-kid-coral w-8 h-8" />
        </motion.div>

        <motion.div
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: "2s" }}
          className="absolute bottom-32 left-20 w-12 h-12 bg-kid-teal/40 rounded-full flex items-center justify-center"
        >
          <Heart className="text-kid-teal w-6 h-6" />
        </motion.div>

        <div className="container mx-auto text-center relative z-10">
          <motion.div variants={itemVariants} className="mb-8">
            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl mb-6 leading-tight"
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
                  className="absolute -top-4 -right-8"
                  animate={{ rotate: [0, 20, -20, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Sparkles className="text-kid-amber w-8 h-8 md:w-12 md:h-12" />
                </motion.div>
              </span>
            </motion.h1>
          </motion.div>

          <motion.div variants={itemVariants} className="mb-8">
            <p className="text-lg md:text-[28px] text-gray-700 max-w-3xl mx-auto font-medium leading-tight">
              🎯 <span className="text-kid-coral">Produk digital terbaru</span> yang dirancang khusus untuk
              membuat anak-anak <span className="text-kid-teal">belajar dengan gembira </span>
              sambil mengembangkan kreativitas dan kecerdasan mereka.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="mb-16">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/products">
                <motion.button
                  className="btn-primary text-lg px-8 py-4 shadow-2xl group relative overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10 flex items-center">
                    🚀 Jelajahi Koleksi Kami
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
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
                className="bg-white/90 backdrop-blur-sm text-kid-coral py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 group border-2 border-kid-coral/20"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="flex items-center">
                  <Play className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                  Preview Gratis
                </span>
              </motion.button>
            </div>
          </motion.div>

          {/* Innovation Stats */}
          <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="card-playful text-center group hover:bg-kid-coral/10">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="w-16 h-16 bg-gradient-to-br from-kid-coral to-kid-peach rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <Lightbulb className="text-white w-8 h-8" />
              </motion.div>
              <h3 className="text-2xl md:text-3xl text-kid-coral mb-2">Fresh</h3>
              <p className="text-gray-400 font-medium text-2xl">Konsep Baru</p>
            </div>

            <div className="card-playful text-center group hover:bg-kid-teal/10">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="w-16 h-16 bg-gradient-to-br from-kid-teal to-kid-mint rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <Target className="text-white w-8 h-8" />
              </motion.div>
              <h3 className="text-2xl md:text-3xl text-kid-teal mb-2">100%</h3>
              <p className="text-gray-400 font-medium text-2xl">Fokus Anak</p>
            </div>

            <div className="card-playful text-center group hover:bg-kid-amber/10">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="w-16 h-16 bg-gradient-to-br from-kid-amber to-kid-peach rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <Zap className="text-white w-8 h-8" />
              </motion.div>
              <h3 className="text-2xl md:text-3xl text-kid-amber mb-2">Instant</h3>
              <p className="text-gray-400 font-medium text-2xl">Download</p>
            </div>

            <div className="card-playful text-center group hover:bg-kid-lavender/10">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="w-16 h-16 bg-gradient-to-br from-kid-lavender to-kid-sage rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <Award className="text-white w-8 h-8" />
              </motion.div>
              <h3 className="text-2xl md:text-3xl text-kid-lavender mb-2">Premium</h3>
              <p className="text-gray-400 font-medium text-2xl">Quality</p>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Why Choose Us Section */}
      <motion.section
        className="py-20 px-4 bg-white/50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl mb-6 ">
              <span className="text-gradient">Mengapa Kids Frenzy?</span> 🤔
            </h2>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Kami memahami kebutuhan belajar modern untuk tumbuh kembang optimal si kecil
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              className="card-playful group hover:bg-gradient-to-br hover:from-kid-coral/10 hover:to-kid-peach/10"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="text-center">
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  className="w-20 h-20 bg-gradient-to-br from-kid-coral to-kid-peach rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <Heart className="text-white w-10 h-10" />
                </motion.div>
                <h3 className="text-xl text-kid-coral mb-4">Dibuat dengan ❤️</h3>
                <p className="text-gray-600 text-lg">
                  Setiap produk dirancang khusus dengan pendekatan terbaru dalam pendidikan anak yang menyenangkan dan
                  efektif
                </p>
              </div>
            </motion.div>

            <motion.div
              className="card-playful group hover:bg-gradient-to-br hover:from-kid-teal/10 hover:to-kid-mint/10"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="text-center">
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  className="w-20 h-20 bg-gradient-to-br from-kid-teal to-kid-mint rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <Sparkles className="text-white w-10 h-10" />
                </motion.div>
                <h3 className="text-xl text-kid-teal mb-4">Interaktif & Menarik ✨</h3>
                <p className="text-gray-600 text-lg">
                  Bukan sekedar PDF biasa! Produk kami penuh warna, ilustrasi menarik, dan aktivitas yang membuat anak
                  excited belajar
                </p>
              </div>
            </motion.div>

            <motion.div
              className="card-playful group hover:bg-gradient-to-br hover:from-kid-amber/10 hover:to-kid-sage/10"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="text-center">
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  className="w-20 h-20 bg-gradient-to-br from-kid-amber to-kid-sage rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <CheckCircle className="text-white w-10 h-10" />
                </motion.div>
                <h3 className="text-xl text-kid-amber mb-4">Praktis & Hemat 👍</h3>
                <p className="text-gray-600 text-lg">
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
        className="py-20 px-4 bg-gradient-to-r from-kid-coral via-kid-teal to-kid-sage relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* Background decorations */}
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
          className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full"
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
          className="absolute bottom-10 right-10 w-24 h-24 bg-white/10 rounded-full"
        />

        <div className="container mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl text-white mb-6">
              Siap Memberikan yang Terbaik untuk Buah Hati? 🌟
            </h2>
            <p className="text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
              Mulai petualangan belajar yang menyenangkan dengan produk digital edukatif terdepan untuk anak Indonesia!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/products">
                <motion.button
                  className="bg-white text-kid-coral font-semibold py-4 px-8 rounded-full shadow-xl hover:shadow-2xl transition-all duration-200 text-lg group"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="flex items-center">
                    <Gift className="mr-2 w-6 h-6 group-hover:rotate-12 transition-transform" />
                    Mulai Sekarang!
                  </span>
                </motion.button>
              </Link>
            </div>

            <motion.p
              className="text-white/80 mt-6 text-lg"
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

import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Users, ArrowLeft, Target, Heart, Zap, Star } from "lucide-react";
import { Link } from "react-router-dom";

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
      ease: "easeOut",
    },
  },
};

const AboutPage: React.FC = () => {
  return (
    <div className="pt-24 pb-20 px-4 min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-pink-50/30">
      <motion.div
        className="container mx-auto max-w-5xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="text-center mb-16">
          <div className="w-28 h-28 bg-gradient-to-br from-blue-300/70 to-purple-300/70 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
            <Users className="text-white w-14 h-14" />
          </div>
          <h1 className="text-5xl md:text-7xl mb-8 text-gradient">Tentang Kami</h1>
          <motion.p
            className="text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed"
            animate={{
              scale: [1, 1.02, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            Revolusi pembelajaran anak di era digital! 🚀✨
          </motion.p>
        </motion.div>

        {/* Problem Statement */}
        <motion.div
          variants={itemVariants}
          className="card-playful mb-12 bg-gradient-to-r from-red-50/60 to-orange-50/60 border-l-4 border-red-300/60"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl text-red-400 mb-4">⚠️ Tantangan Pembelajaran Anak Masa Kini</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="bg-white/80 p-4 rounded-lg shadow-sm">
                <h3 className="text-red-400 mb-2">📱 Ketergantungan Gadget</h3>
                <p className="text-gray-600 text-sm">
                  Anak-anak menghabiskan berjam-jam di layar, namun hanya sedikit untuk konten edukatif berkualitas
                </p>
              </div>
              <div className="bg-white/80 p-4 rounded-lg shadow-sm">
                <h3 className="text-orange-400 mb-2">😴 Metode Pembelajaran Monoton</h3>
                <p className="text-gray-600 text-sm">
                  Banyak anak merasa bosan dengan metode belajar konvensional yang kurang interaktif
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-white/80 p-4 rounded-lg shadow-sm">
                <h3 className="text-red-400 mb-2">📚 Kurangnya Konten Lokal</h3>
                <p className="text-gray-600 text-sm">
                  Sebagian besar materi edukatif anak berbahasa asing, sehingga sulit dipahami anak Indonesia
                </p>
              </div>
              <div className="bg-white/80 p-4 rounded-lg shadow-sm">
                <h3 className="text-orange-400 mb-2">💸 Biaya Pendidikan Tinggi</h3>
                <p className="text-gray-600 text-sm">
                  Orang tua mengeluarkan banyak biaya untuk les privat yang belum tentu efektif
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Our Solution */}
        <motion.div
          variants={itemVariants}
          className="card-playful mb-12 bg-gradient-to-r from-green-50/60 to-blue-50/60 border-l-4 border-green-300/60"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl text-green-500 mb-6">🌟 Solusi Kami</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Zap className="text-yellow-400 w-6 h-6 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-gray-700">Pembelajaran Interaktif & Gamifikasi</h3>
                    <p className="text-gray-600 text-sm">
                      Mengubah belajar jadi petualangan seru dengan pendekatan yang menyenangkan
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Heart className="text-pink-400 w-6 h-6 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-gray-700">Konten Berkualitas Bahasa Indonesia</h3>
                    <p className="text-gray-600 text-sm">
                      Materi edukatif yang sesuai dengan budaya dan kebutuhan anak Indonesia
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Target className="text-blue-400 w-6 h-6 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-gray-700">Terjangkau & Mudah Diakses</h3>
                    <p className="text-gray-600 text-sm">
                      Kualitas premium dengan harga yang ramah kantong keluarga Indonesia
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center">
              <motion.div
                animate={{
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-56 h-56 bg-gradient-to-br from-yellow-200/40 to-pink-200/40 rounded-full flex items-center justify-center mx-auto shadow-lg"
              >
                <BookOpen className="text-pink-400 w-28 h-28" />
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Our Vision */}
        <motion.div variants={itemVariants} className="card-playful mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl text-purple-400 mb-4">💫 Visi Kami untuk Masa Depan</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="text-center p-6 bg-gradient-to-br from-blue-50/60 to-purple-50/60 rounded-xl">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-300/70 to-purple-300/70 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="text-white w-8 h-8" />
                </div>
                <h3 className="text-blue-400 mb-2">Pembelajaran yang Menyenangkan</h3>
                <p className="text-gray-600 text-sm">
                  Menciptakan pengalaman belajar yang tidak hanya edukatif tapi juga menghibur untuk anak-anak Indonesia
                </p>
              </div>

              <div className="text-center p-6 bg-gradient-to-br from-pink-50/60 to-red-50/60 rounded-xl">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-300/70 to-red-300/70 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="text-white w-8 h-8" />
                </div>
                <h3 className="text-pink-400 mb-2">Membangun Karakter</h3>
                <p className="text-gray-600 text-sm">
                  Tidak hanya fokus pada akademik, tapi juga pengembangan karakter dan nilai-nilai positif
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="text-center p-6 bg-gradient-to-br from-green-50/60 to-blue-50/60 rounded-xl">
                <div className="w-16 h-16 bg-gradient-to-br from-green-300/70 to-blue-300/70 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="text-white w-8 h-8" />
                </div>
                <h3 className="text-green-400 mb-2">Akses Merata</h3>
                <p className="text-gray-600 text-sm">
                  Memberikan akses pendidikan berkualitas untuk semua lapisan masyarakat Indonesia
                </p>
              </div>

              <div className="text-center p-6 bg-gradient-to-br from-yellow-50/60 to-orange-50/60 rounded-xl">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-300/70 to-orange-300/70 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="text-white w-8 h-8" />
                </div>
                <h3 className="text-yellow-500 mb-2">Inovasi Berkelanjutan</h3>
                <p className="text-gray-600 text-sm">
                  Terus berinovasi menghadirkan metode pembelajaran terbaru yang sesuai perkembangan zaman
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* What Makes Us Different */}
        <motion.div
          variants={itemVariants}
          className="card-playful mb-12 bg-gradient-to-r from-purple-50/60 to-pink-50/60"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl text-purple-400 mb-4">✨ Yang Membuat Kami Berbeda</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-4">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-200/60 to-purple-200/60 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🎨</span>
              </div>
              <h3 className="text-purple-400 mb-2">Desain Menarik</h3>
              <p className="text-gray-600 text-sm">
                Setiap produk dirancang dengan visual yang eye-catching dan ramah anak
              </p>
            </div>

            <div className="text-center p-4">
              <div className="w-20 h-20 bg-gradient-to-br from-green-200/60 to-blue-200/60 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🧠</span>
              </div>
              <h3 className="text-green-400 mb-2">Pendekatan Holistik</h3>
              <p className="text-gray-600 text-sm">
                Mengembangkan kognitif, motorik, dan emosional anak secara seimbang
              </p>
            </div>

            <div className="text-center p-4">
              <div className="w-20 h-20 bg-gradient-to-br from-pink-200/60 to-red-200/60 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🏠</span>
              </div>
              <h3 className="text-pink-400 mb-2">Family Friendly</h3>
              <p className="text-gray-600 text-sm">Mudah digunakan orang tua dan menciptakan quality time keluarga</p>
            </div>
          </div>
        </motion.div>

        {/* Mission Statement */}
        <motion.div variants={itemVariants} className="text-center mb-12">
          <div className="card-playful bg-gradient-to-r from-blue-50/60 to-purple-50/60">
            <Star className="w-16 h-16 text-yellow-400 mx-auto mb-6" />
            <h2 className="text-3xl text-gray-700 mb-6">Komitmen Kami</h2>
            <blockquote className="text-xl italic text-gray-600 max-w-4xl mx-auto leading-relaxed">
              "Menciptakan generasi Indonesia yang cerdas, kreatif, dan berkarakter melalui pembelajaran yang
              menyenangkan, mudah diakses, dan sesuai dengan nilai-nilai budaya Indonesia."
            </blockquote>
            <div className="mt-8 text-lg text-gray-500">
              <p className="font-medium">🎨 Kreativitas • 🧠 Kecerdasan • ❤️ Karakter • 🎯 Kualitas</p>
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="text-center">
          <Link to="/">
            <motion.button
              className="btn-secondary inline-flex items-center text-lg px-8 py-4"
              whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(0,0,0,0.2)" }}
              whileTap={{ scale: 0.98 }}
            >
              <ArrowLeft className="mr-3 w-6 h-6" />
              Kembali ke Beranda
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AboutPage;

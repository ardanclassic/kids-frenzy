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
    <div className="pt-24 md:pt-32 lg:pt-40 pb-12 md:pb-20 px-4 min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-pink-50/30">
      <motion.div
        className="container mx-auto max-w-5xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="text-center mb-10 md:mb-16">
          <div className="w-20 h-20 md:w-28 md:h-28 bg-gradient-to-br from-blue-300/70 to-purple-300/70 rounded-full flex items-center justify-center mx-auto mb-5 md:mb-8 shadow-lg">
            <Users className="text-white w-10 h-10 md:w-14 md:h-14" />
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-7xl mb-4 md:mb-8 text-gradient px-4">Tentang Kami</h1>
          <motion.p
            className="text-lg md:text-xl lg:text-2xl text-gray-700 max-w-3xl mx-auto leading-snug md:leading-relaxed px-4"
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
          className="card-playful mb-8 md:mb-12 bg-gradient-to-r from-red-50/60 to-orange-50/60 border-l-4 border-red-300/60 p-4 md:p-6"
        >
          <div className="text-center mb-6 md:mb-8">
            <h2 className="text-2xl md:text-3xl lg:text-4xl text-red-400 mb-3 md:mb-4 px-2">
              ⚠️ Tantangan Pembelajaran Anak Masa Kini
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4 md:gap-8">
            <div className="space-y-3 md:space-y-4">
              <div className="bg-white/80 p-3 md:p-4 rounded-lg shadow-sm">
                <h3 className="text-red-400 mb-2 text-base md:text-lg lg:text-xl">📱 Ketergantungan Gadget</h3>
                <p className="text-gray-600 text-sm md:text-base lg:text-lg">
                  Anak-anak menghabiskan berjam-jam di layar, namun hanya sedikit untuk konten edukatif berkualitas
                </p>
              </div>
              <div className="bg-white/80 p-3 md:p-4 rounded-lg shadow-sm">
                <h3 className="text-orange-400 mb-2 text-base md:text-lg lg:text-xl">😴 Metode Pembelajaran Monoton</h3>
                <p className="text-gray-600 text-sm md:text-base lg:text-lg">
                  Banyak anak merasa bosan dengan metode belajar konvensional yang kurang interaktif
                </p>
              </div>
            </div>
            <div className="space-y-3 md:space-y-4">
              <div className="bg-white/80 p-3 md:p-4 rounded-lg shadow-sm">
                <h3 className="text-red-400 mb-2 text-base md:text-lg lg:text-xl">📚 Kurangnya Konten Lokal</h3>
                <p className="text-gray-600 text-sm md:text-base lg:text-lg">
                  Sebagian besar materi edukatif anak berbahasa asing, sehingga sulit dipahami anak Indonesia
                </p>
              </div>
              <div className="bg-white/80 p-3 md:p-4 rounded-lg shadow-sm">
                <h3 className="text-orange-400 mb-2 text-base md:text-lg lg:text-xl">💸 Biaya Pendidikan Tinggi</h3>
                <p className="text-gray-600 text-sm md:text-base lg:text-lg">
                  Orang tua mengeluarkan banyak biaya untuk les privat yang belum tentu efektif
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Our Solution */}
        <motion.div
          variants={itemVariants}
          className="card-playful mb-8 md:mb-12 bg-gradient-to-r from-green-50/60 to-blue-50/60 border-l-4 border-green-300/60 p-4 md:p-6"
        >
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl text-green-500 mb-4 md:mb-6">🌟 Solusi Kami</h2>
              <div className="space-y-3 md:space-y-4">
                <div className="flex items-start space-x-3">
                  <Zap className="text-yellow-400 w-5 h-5 md:w-6 md:h-6 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-gray-700 text-base md:text-lg lg:text-xl mb-1">
                      Pembelajaran Interaktif & Komunikatif
                    </h3>
                    <p className="text-gray-600 text-sm md:text-base lg:text-lg">
                      Mengubah belajar jadi petualangan seru dengan pendekatan yang menyenangkan
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Heart className="text-pink-400 w-5 h-5 md:w-6 md:h-6 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-gray-700 text-base md:text-lg lg:text-xl mb-1">
                      Konten Berkualitas Bahasa Indonesia
                    </h3>
                    <p className="text-gray-600 text-sm md:text-base lg:text-lg">
                      Materi edukatif yang sesuai dengan budaya dan kebutuhan anak Indonesia
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Target className="text-blue-400 w-5 h-5 md:w-6 md:h-6 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-gray-700 text-base md:text-lg lg:text-xl mb-1">Terjangkau & Mudah Diakses</h3>
                    <p className="text-gray-600 text-sm md:text-base lg:text-lg">
                      Kualitas premium dengan harga yang ramah kantong keluarga Indonesia
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center mt-4 md:mt-0">
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
                className="w-40 h-40 md:w-56 md:h-56 bg-gradient-to-br from-yellow-200/40 to-pink-200/40 rounded-full flex items-center justify-center mx-auto shadow-lg"
              >
                <BookOpen className="text-pink-400 w-20 h-20 md:w-28 md:h-28" />
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Our Vision */}
        <motion.div variants={itemVariants} className="card-playful mb-8 md:mb-12 p-4 md:p-6">
          <div className="text-center mb-6 md:mb-8">
            <h2 className="text-2xl md:text-3xl lg:text-4xl text-purple-400 mb-3 md:mb-4 px-2">
              💫 Visi Kami untuk Masa Depan
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4 md:gap-8">
            <div className="space-y-4 md:space-y-6">
              <div className="text-center p-4 md:p-6 bg-gradient-to-br from-blue-50/60 to-purple-50/60 rounded-xl">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-blue-300/70 to-purple-300/70 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                  <BookOpen className="text-white w-6 h-6 md:w-8 md:h-8" />
                </div>
                <h3 className="text-blue-400 mb-2 text-base md:text-lg lg:text-xl">Pembelajaran yang Menyenangkan</h3>
                <p className="text-gray-600 text-sm md:text-base lg:text-lg">
                  Menciptakan pengalaman belajar yang tidak hanya edukatif tapi juga menghibur untuk anak-anak Indonesia
                </p>
              </div>

              <div className="text-center p-4 md:p-6 bg-gradient-to-br from-pink-50/60 to-red-50/60 rounded-xl">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-pink-300/70 to-red-300/70 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                  <Heart className="text-white w-6 h-6 md:w-8 md:h-8" />
                </div>
                <h3 className="text-pink-400 mb-2 text-base md:text-lg lg:text-xl">Membangun Karakter</h3>
                <p className="text-gray-600 text-sm md:text-base lg:text-lg">
                  Tidak hanya fokus pada akademik, tapi juga pengembangan karakter dan nilai-nilai positif
                </p>
              </div>
            </div>

            <div className="space-y-4 md:space-y-6">
              <div className="text-center p-4 md:p-6 bg-gradient-to-br from-green-50/60 to-blue-50/60 rounded-xl">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-green-300/70 to-blue-300/70 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                  <Target className="text-white w-6 h-6 md:w-8 md:h-8" />
                </div>
                <h3 className="text-green-400 mb-2 text-base md:text-lg lg:text-xl">Akses Merata</h3>
                <p className="text-gray-600 text-sm md:text-base lg:text-lg">
                  Memberikan akses pendidikan berkualitas untuk semua lapisan masyarakat Indonesia
                </p>
              </div>

              <div className="text-center p-4 md:p-6 bg-gradient-to-br from-yellow-50/60 to-orange-50/60 rounded-xl">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-yellow-300/70 to-orange-300/70 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                  <Zap className="text-white w-6 h-6 md:w-8 md:h-8" />
                </div>
                <h3 className="text-yellow-500 mb-2 text-base md:text-lg lg:text-xl">Inovasi Berkelanjutan</h3>
                <p className="text-gray-600 text-sm md:text-base lg:text-lg">
                  Terus berinovasi menghadirkan metode pembelajaran terbaru yang sesuai perkembangan zaman
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* What Makes Us Different */}
        <motion.div
          variants={itemVariants}
          className="card-playful mb-8 md:mb-12 bg-gradient-to-r from-purple-50/60 to-pink-50/60 p-4 md:p-6"
        >
          <div className="text-center mb-6 md:mb-8">
            <h2 className="text-2xl md:text-3xl lg:text-4xl text-purple-400 mb-3 md:mb-4 px-2">
              ✨ Yang Membuat Kami Berbeda
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-4 md:gap-6">
            <div className="text-center p-3 md:p-4">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-blue-200/60 to-purple-200/60 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <span className="text-2xl md:text-3xl">🎨</span>
              </div>
              <h3 className="text-purple-400 mb-2 text-base md:text-lg lg:text-xl">Desain Menarik</h3>
              <p className="text-gray-600 text-sm md:text-base lg:text-lg">
                Setiap produk dirancang dengan visual yang eye-catching dan ramah anak
              </p>
            </div>

            <div className="text-center p-3 md:p-4">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-green-200/60 to-blue-200/60 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <span className="text-2xl md:text-3xl">🧠</span>
              </div>
              <h3 className="text-green-400 mb-2 text-base md:text-lg lg:text-xl">Pendekatan Holistik</h3>
              <p className="text-gray-600 text-sm md:text-base lg:text-lg">
                Mengembangkan kognitif, motorik, dan emosional anak secara seimbang
              </p>
            </div>

            <div className="text-center p-3 md:p-4">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-pink-200/60 to-red-200/60 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <span className="text-2xl md:text-3xl">👨‍👩‍👧</span>
              </div>
              <h3 className="text-pink-400 mb-2 text-base md:text-lg lg:text-xl">Family Friendly</h3>
              <p className="text-gray-600 text-sm md:text-base lg:text-lg">
                Mudah digunakan orang tua dan menciptakan quality time keluarga
              </p>
            </div>
          </div>
        </motion.div>

        {/* Mission Statement */}
        <motion.div variants={itemVariants} className="text-center mb-8 md:mb-12">
          <div className="card-playful bg-gradient-to-r from-blue-50/60 to-purple-50/60 p-5 md:p-6">
            <Star className="w-12 h-12 md:w-16 md:h-16 text-yellow-400 mx-auto mb-4 md:mb-6" />
            <h2 className="text-2xl md:text-3xl text-gray-700 mb-4 md:mb-6 px-2">Komitmen Kami</h2>
            <blockquote className="text-base md:text-lg lg:text-xl italic text-gray-600 max-w-4xl mx-auto leading-relaxed px-4">
              "Menciptakan generasi Indonesia yang cerdas, kreatif, dan berkarakter melalui pembelajaran yang
              menyenangkan, mudah diakses, dan sesuai dengan nilai-nilai budaya Indonesia."
            </blockquote>
            <div className="mt-6 md:mt-8 text-sm md:text-base lg:text-lg text-gray-500">
              <p className="font-medium px-4">🎨 Kreativitas • 🧠 Kecerdasan • ❤️ Karakter • 🎯 Kualitas</p>
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="text-center">
          <Link to="/">
            <motion.button
              className="btn-secondary inline-flex items-center text-sm md:text-base lg:text-lg px-6 py-3 md:px-8 md:py-4"
              whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(0,0,0,0.2)" }}
              whileTap={{ scale: 0.98 }}
            >
              <ArrowLeft className="mr-2 md:mr-3 w-5 h-5 md:w-6 md:h-6" />
              Kembali ke Beranda
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AboutPage;

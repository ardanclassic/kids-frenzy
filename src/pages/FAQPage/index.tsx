import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Users,
  HelpCircle,
  MessageCircle,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Download,
  CreditCard,
  FileText,
  Clock,
  Shield,
  RefreshCw,
} from "lucide-react";
import { Link } from "react-router-dom";

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

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  icon: any;
  category: string;
  highlight?: boolean;
}

const FAQPage: React.FC = () => {
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("semua");

  const faqData: FAQItem[] = [
    // Pembelian & Pembayaran
    {
      id: 1,
      question: "Bagaimana cara melakukan pembelian di Kids Frenzy?",
      answer:
        "Sangat mudah! Pilih produk yang diinginkan, klik 'Beli Sekarang', isi form pemesanan, lakukan pembayaran, dan tunggu link download dikirim ke email Anda maksimal 1x24 jam setelah pembayaran dikonfirmasi.",
      icon: CreditCard,
      category: "pembelian",
    },
    {
      id: 2,
      question: "Metode pembayaran apa saja yang tersedia?",
      answer:
        "Kami menyediakan berbagai metode pembayaran: Transfer Bank (BCA, Mandiri, BRI, BNI), E-wallet (GoPay, OVO, DANA, ShopeePay), Virtual Account, dan QRIS. Semua metode pembayaran aman dan terenkripsi.",
      icon: CreditCard,
      category: "pembelian",
    },
    {
      id: 3,
      question: "Apakah ada diskon untuk pembelian dalam jumlah banyak?",
      answer:
        "Ya! Kami sering memberikan promo bundle dan diskon khusus. Follow media sosial kami atau subscribe newsletter untuk mendapatkan info promo terbaru dan early bird discount hingga 50%!",
      icon: CreditCard,
      category: "pembelian",
    },

    // Download & Akses Produk
    {
      id: 4,
      question: "Bagaimana cara download produk setelah pembelian?",
      answer:
        "Setelah konfirmasi pembayaran, link download akan dikirimkan ke email Anda dalam waktu maksimal 1x24 jam. Link download berlaku selamanya dan bisa diunduh berulang kali. Pastikan cek folder spam jika tidak ada di inbox.",
      icon: Download,
      category: "download",
      highlight: true,
    },
    {
      id: 5,
      question: "Berapa lama link download berlaku?",
      answer:
        "Link download berlaku SELAMANYA! Anda bisa download kapan saja, bahkan bertahun-tahun kemudian. Kami juga menyimpan riwayat pembelian Anda untuk kemudahan akses di masa mendatang.",
      icon: Clock,
      category: "download",
    },
    {
      id: 6,
      question: "Bagaimana jika email dengan link download tidak masuk?",
      answer:
        "Pertama, cek folder spam/junk email Anda. Jika masih tidak ada, langsung hubungi customer service kami via WhatsApp dengan menyertakan bukti pembayaran. Kami akan kirim ulang dalam 1 jam.",
      icon: MessageCircle,
      category: "download",
    },
    {
      id: 7,
      question: "Bisakah produk didownload di beberapa device?",
      answer:
        "Tentu saja! Produk yang sudah dibeli bisa didownload dan digunakan di smartphone, tablet, laptop, atau komputer tanpa batasan device. Cocok untuk keluarga dengan multiple gadget.",
      icon: Download,
      category: "download",
    },

    // Format & Kualitas Produk
    {
      id: 8,
      question: "Format file apa yang akan saya terima?",
      answer:
        "Semua produk dalam format PDF berkualitas tinggi (300 DPI) yang kompatibel dengan semua device. Beberapa produk bonus juga tersedia dalam format JPG atau PNG untuk fleksibilitas maksimal.",
      icon: FileText,
      category: "produk",
    },
    {
      id: 9,
      question: "Apakah produk bisa dicetak?",
      answer:
        "Absolutely! Semua produk didesain khusus untuk print quality dengan resolusi tinggi. Anda bisa mencetak di rumah dengan printer biasa atau di percetakan profesional. Hemat biaya, cetak sesuai kebutuhan!",
      icon: FileText,
      category: "produk",
      highlight: true,
    },
    {
      id: 10,
      question: "Berapa ukuran kertas yang digunakan?",
      answer:
        "Mayoritas produk menggunakan ukuran A4 (21 x 29.7 cm) yang mudah dicetak. Beberapa produk khusus tersedia dalam ukuran A3 atau custom size. Informasi detail ukuran selalu tercantum di deskripsi produk.",
      icon: FileText,
      category: "produk",
    },
    {
      id: 11,
      question: "Apakah produk sudah sesuai kurikulum Indonesia?",
      answer:
        "Yes! Semua materi edukatif kami disesuaikan dengan kurikulum terbaru Indonesia dan dikembangkan bersama tim ahli pendidikan anak. Cocok untuk anak usia 2-12 tahun dengan tahapan pembelajaran yang tepat.",
      icon: BookOpen,
      category: "produk",
    },

    // Kebijakan & Garansi
    {
      id: 12,
      question: "Apakah ada garansi atau jaminan kualitas?",
      answer:
        "Kami memberikan 100% jaminan kualitas! Jika ada file yang corrupt, rusak, atau tidak bisa didownload, kami akan segera mengganti dengan file baru atau memberikan solusi alternatif dalam 24 jam.",
      icon: Shield,
      category: "kebijakan",
      highlight: true,
    },
    {
      id: 13,
      question: "Bagaimana jika produk tidak sesuai harapan?",
      answer:
        "Kepuasan Anda adalah prioritas utama! Jika produk tidak sesuai deskripsi atau ada masalah teknis, hubungi kami dalam 7 hari untuk mendapatkan bantuan penuh dari tim customer service yang responsif.",
      icon: HelpCircle,
      category: "kebijakan",
    },
    {
      id: 14,
      question: "Apakah bisa refund atau pengembalian uang?",
      answer:
        "Mengingat ini adalah produk digital yang dapat langsung didownload dan digunakan, kami menerapkan kebijakan NO REFUND. Namun, kami berkomitmen memberikan kualitas terbaik dan support penuh untuk setiap pembelian.",
      icon: RefreshCw,
      category: "kebijakan",
      highlight: true,
    },
    {
      id: 15,
      question: "Apakah boleh membagikan atau menjual kembali produk?",
      answer:
        "Produk hanya untuk penggunaan personal/keluarga. Dilarang keras membagikan, menjual kembali, atau mendistribusikan produk kami. Hal ini melindungi hak cipta dan memastikan keberlangsungan inovasi produk berkualitas.",
      icon: Shield,
      category: "kebijakan",
    },

    // Dukungan & Bantuan
    {
      id: 16,
      question: "Bagaimana cara menghubungi customer service?",
      answer:
        "Tim support kami siap membantu 24/7 melalui WhatsApp di nomor yang tertera. Kami juga tersedia via email dengan response time maksimal 2 jam di hari kerja. Fast response guaranteed!",
      icon: MessageCircle,
      category: "bantuan",
    },
    {
      id: 17,
      question: "Apakah ada panduan penggunaan produk?",
      answer:
        "Setiap produk dilengkapi dengan panduan lengkap dan tips optimalisasi. Kami juga menyediakan video tutorial di channel YouTube Kids Frenzy dan artikel blog untuk memaksimalkan manfaat produk.",
      icon: BookOpen,
      category: "bantuan",
    },
    {
      id: 18,
      question: "Apakah ada komunitas pengguna Kids Frenzy?",
      answer:
        "Yes! Join grup Facebook 'Kids Frenzy Community' dengan 5000+ parents untuk sharing pengalaman, tips parenting, dan mendapatkan konten eksklusif. Tempat saling support sesama orang tua!",
      icon: Users,
      category: "bantuan",
    },
  ];

  const categories = [
    { key: "semua", label: "Semua Pertanyaan", count: faqData.length },
    {
      key: "pembelian",
      label: "Pembelian & Pembayaran",
      count: faqData.filter((faq) => faq.category === "pembelian").length,
    },
    { key: "download", label: "Download & Akses", count: faqData.filter((faq) => faq.category === "download").length },
    { key: "produk", label: "Format & Kualitas", count: faqData.filter((faq) => faq.category === "produk").length },
    {
      key: "kebijakan",
      label: "Kebijakan & Garansi",
      count: faqData.filter((faq) => faq.category === "kebijakan").length,
    },
    { key: "bantuan", label: "Dukungan & Bantuan", count: faqData.filter((faq) => faq.category === "bantuan").length },
  ];

  const filteredFAQ =
    selectedCategory === "semua" ? faqData : faqData.filter((faq) => faq.category === selectedCategory);

  const toggleFAQ = (id: number) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  return (
    <div className="pt-24 pb-20 px-4 min-h-screen bg-gradient-to-br from-white via-kid-amber/5 to-kid-peach/5">
      <motion.div
        className="container mx-auto max-w-6xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="text-center mb-16">
          <div className="w-28 h-28 bg-gradient-to-br from-kid-amber to-kid-peach rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
            <HelpCircle className="text-white w-14 h-14" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-8 text-gradient">Pertanyaan Umum</h1>
          <motion.p
            className="text-2xl text-gray-700 max-w-3xl mx-auto"
            animate={{
              scale: [1, 1.02, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            Semua yang perlu Anda ketahui tentang Kids Frenzy! 🤝✨
          </motion.p>
        </motion.div>

        {/* Category Filter */}
        <motion.div variants={itemVariants} className="mb-12">
          <div className="card-playful">
            <h3 className="text-xl font-bold text-center mb-6 text-gray-800">Pilih Kategori Pertanyaan</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {categories.map((category) => (
                <motion.button
                  key={category.key}
                  onClick={() => setSelectedCategory(category.key)}
                  className={`p-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    selectedCategory === category.key
                      ? "bg-gradient-to-r from-kid-coral to-kid-peach text-white shadow-lg scale-105"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="font-bold">{category.label}</div>
                  <div className="text-xs opacity-75">({category.count})</div>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* FAQ Items */}
        <motion.div variants={itemVariants} className="space-y-4 mb-12">
          <AnimatePresence>
            {filteredFAQ.map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.05 }}
                className={`card-playful cursor-pointer transition-all duration-200 hover:shadow-xl ${
                  faq.highlight ? "ring-2 ring-kid-coral/30 bg-gradient-to-r from-kid-coral/5 to-kid-peach/5" : ""
                } ${expandedFAQ === faq.id ? "shadow-xl border-kid-coral/20" : ""}`}
                onClick={() => toggleFAQ(faq.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                        faq.highlight
                          ? "bg-gradient-to-br from-kid-coral to-kid-peach"
                          : "bg-gradient-to-br from-kid-teal to-kid-mint"
                      }`}
                    >
                      <faq.icon className="text-white w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className={`text-lg font-bold mb-2 ${faq.highlight ? "text-kid-coral" : "text-gray-800"}`}>
                        {faq.question}
                        {faq.highlight && (
                          <span className="ml-2 text-sm bg-kid-coral text-white px-2 py-1 rounded-full">Popular</span>
                        )}
                      </h3>
                      <AnimatePresence>
                        {expandedFAQ === faq.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <p className="text-gray-700 leading-relaxed mt-3 pr-8">{faq.answer}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: expandedFAQ === faq.id ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0 ml-4"
                  >
                    {expandedFAQ === faq.id ? (
                      <ChevronUp className="w-6 h-6 text-kid-coral" />
                    ) : (
                      <ChevronDown className="w-6 h-6 text-gray-400" />
                    )}
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Quick Info Highlights */}
        <motion.div variants={itemVariants} className="mb-12">
          <div className="grid md:grid-cols-3 gap-6">
            <motion.div
              className="card-playful text-center bg-gradient-to-br from-green-50 to-blue-50 border-l-4 border-green-400"
              whileHover={{ scale: 1.02 }}
            >
              <Download className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h3 className="font-bold text-green-600 mb-2">Download Instan</h3>
              <p className="text-gray-600 text-sm">
                Link download dikirim maksimal 1x24 jam setelah pembayaran dikonfirmasi
              </p>
            </motion.div>

            <motion.div
              className="card-playful text-center bg-gradient-to-br from-red-50 to-pink-50 border-l-4 border-red-400"
              whileHover={{ scale: 1.02 }}
            >
              <RefreshCw className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h3 className="font-bold text-red-600 mb-2">No Refund Policy</h3>
              <p className="text-gray-600 text-sm">
                Produk digital instant download. Tidak ada pengembalian uang setelah pembelian
              </p>
            </motion.div>

            <motion.div
              className="card-playful text-center bg-gradient-to-br from-purple-50 to-indigo-50 border-l-4 border-purple-400"
              whileHover={{ scale: 1.02 }}
            >
              <MessageCircle className="w-12 h-12 text-purple-500 mx-auto mb-4" />
              <h3 className="font-bold text-purple-600 mb-2">Support 24/7</h3>
              <p className="text-gray-600 text-sm">Tim customer service siap membantu Anda kapan saja via WhatsApp</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Contact CTA */}
        <motion.div variants={itemVariants} className="mb-12">
          <div className="card-playful text-center bg-gradient-to-r from-kid-coral/10 to-kid-teal/10">
            <MessageCircle className="w-16 h-16 text-kid-coral mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Masih Ada Pertanyaan?</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Tim customer service kami siap membantu Anda 24/7! Jangan ragu untuk menghubungi kami via WhatsApp untuk
              mendapatkan jawaban cepat dan akurat.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.button
                className="btn-primary inline-flex items-center px-8 py-4"
                whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(0,0,0,0.2)" }}
                whileTap={{ scale: 0.98 }}
              >
                <MessageCircle className="mr-3 w-6 h-6" />
                Chat WhatsApp
              </motion.button>
              <motion.button
                className="btn-secondary inline-flex items-center px-8 py-4"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Users className="mr-3 w-6 h-6" />
                Join Komunitas
              </motion.button>
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

export default FAQPage;

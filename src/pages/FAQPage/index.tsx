import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HelpCircle,
  MessageCircle,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Download,
  CreditCard,
  FileText,
  Shield,
  RefreshCw,
} from "lucide-react";
import { Link } from "react-router-dom";
import faq from "./faq.json";

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

  const iconMap: Record<string, any> = {
    pembelian: CreditCard,
    download: Download,
    produk: FileText,
    kebijakan: Shield,
    bantuan: MessageCircle,
    default: HelpCircle,
  };

  const faqData: FAQItem[] = faq.data.map((item: any) => ({
    ...item,
    icon: iconMap[item.category] || iconMap.default,
  }));

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
  ];

  const filteredFAQ =
    selectedCategory === "semua" ? faqData : faqData.filter((faq) => faq.category === selectedCategory);

  const toggleFAQ = (id: number) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  return (
    <div className="pt-24 md:pt-32 lg:pt-40 pb-12 md:pb-20 px-4 min-h-screen bg-gradient-to-br from-white via-kid-amber/5 to-kid-peach/5">
      <motion.div
        className="container mx-auto max-w-6xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="text-center mb-10 md:mb-16">
          <div className="w-20 h-20 md:w-28 md:h-28 bg-gradient-to-br from-kid-amber to-kid-peach rounded-full flex items-center justify-center mx-auto mb-5 md:mb-8 shadow-2xl">
            <HelpCircle className="text-white w-10 h-10 md:w-14 md:h-14" />
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-7xl mb-4 md:mb-8 text-gradient px-4">Pertanyaan Umum</h1>
          <motion.p
            className="text-lg md:text-xl lg:text-2xl text-gray-700 max-w-3xl mx-auto px-4"
            animate={{
              scale: [1, 1.02, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            Semua yang perlu Anda ketahui tentang kami! 🤔✨
          </motion.p>
        </motion.div>

        {/* Category Filter */}
        <motion.div variants={itemVariants} className="mb-8 md:mb-12">
          <div className="card-playful p-4 md:p-6">
            <h3 className="text-base md:text-lg lg:text-xl text-center mb-4 md:mb-6 text-gray-800">
              Pilih Kategori Pertanyaan
            </h3>
            <div className="flex flex-col md:flex-row justify-center gap-3 md:gap-5">
              {categories.map((category) => (
                <motion.button
                  key={category.key}
                  onClick={() => setSelectedCategory(category.key)}
                  className={`p-2.5 md:p-3 rounded-lg text-xs md:text-sm font-medium transition-all duration-200 ${
                    selectedCategory === category.key
                      ? "bg-gradient-to-r from-kid-coral to-kid-peach text-white shadow-lg scale-105"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="text-sm md:text-base">{category.label}</div>
                  <div className="text-xs md:text-sm opacity-75">({category.count})</div>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* FAQ Items */}
        <motion.div variants={itemVariants} className="space-y-3 md:space-y-4 mb-8 md:mb-12">
          <AnimatePresence>
            {filteredFAQ.map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.05 }}
                className={`card-playful cursor-pointer transition-all duration-200 hover:shadow-xl p-4 md:p-6 ${
                  faq.highlight ? "ring-2 ring-kid-coral/30 bg-gradient-to-r from-kid-coral/5 to-kid-peach/5" : ""
                } ${expandedFAQ === faq.id ? "shadow-xl border-kid-coral/20" : ""}`}
                onClick={() => toggleFAQ(faq.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 md:space-x-4 flex-1">
                    <div
                      className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                        faq.highlight
                          ? "bg-gradient-to-br from-kid-coral to-kid-peach"
                          : "bg-gradient-to-br from-kid-teal to-kid-mint"
                      }`}
                    >
                      <faq.icon className="text-white w-5 h-5 md:w-6 md:h-6" />
                    </div>
                    <div className="flex-1">
                      <h3
                        className={`text-sm md:text-base lg:text-lg mb-2 ${
                          faq.highlight ? "text-kid-coral" : "text-gray-800"
                        }`}
                      >
                        {faq.question}
                        {faq.highlight && (
                          <span className="ml-2 text-xs bg-kid-coral text-white px-2 py-0.5 rounded-full">Popular</span>
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
                            <p className="text-gray-700 leading-relaxed mt-3 pr-4 md:pr-8 text-sm md:text-base">
                              {faq.answer}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: expandedFAQ === faq.id ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0 ml-2 md:ml-4"
                  >
                    {expandedFAQ === faq.id ? (
                      <ChevronUp className="w-5 h-5 md:w-6 md:h-6 text-kid-coral" />
                    ) : (
                      <ChevronDown className="w-5 h-5 md:w-6 md:h-6 text-gray-400" />
                    )}
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Quick Info Highlights */}
        <motion.div variants={itemVariants} className="mb-8 md:mb-12">
          <div className="grid md:grid-cols-3 gap-4 md:gap-6">
            <motion.div
              className="card-playful text-center bg-gradient-to-br from-green-50 to-blue-50 border-l-4 border-green-400 p-4 md:p-6"
              whileHover={{ scale: 1.02 }}
            >
              <Download className="w-10 h-10 md:w-12 md:h-12 text-green-500 mx-auto mb-3 md:mb-4" />
              <h3 className="text-green-600 mb-2 text-base md:text-lg">Download Instan</h3>
              <p className="text-gray-600 text-xs md:text-sm">
                Link download dikirim maksimal 1x24 jam setelah pembayaran dikonfirmasi
              </p>
            </motion.div>

            <motion.div
              className="card-playful text-center bg-gradient-to-br from-red-50 to-pink-50 border-l-4 border-red-400 p-4 md:p-6"
              whileHover={{ scale: 1.02 }}
            >
              <RefreshCw className="w-10 h-10 md:w-12 md:h-12 text-red-500 mx-auto mb-3 md:mb-4" />
              <h3 className="text-red-600 mb-2 text-base md:text-lg">No Refund Policy</h3>
              <p className="text-gray-600 text-xs md:text-sm">
                Produk digital instant download. Tidak ada pengembalian uang setelah pembelian
              </p>
            </motion.div>

            <motion.div
              className="card-playful text-center bg-gradient-to-br from-purple-50 to-indigo-50 border-l-4 border-purple-400 p-4 md:p-6"
              whileHover={{ scale: 1.02 }}
            >
              <MessageCircle className="w-10 h-10 md:w-12 md:h-12 text-purple-500 mx-auto mb-3 md:mb-4" />
              <h3 className="text-purple-600 mb-2 text-base md:text-lg">Support 24/7</h3>
              <p className="text-gray-600 text-xs md:text-sm">
                Tim customer service siap membantu Anda kapan saja via WhatsApp
              </p>
            </motion.div>
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

export default FAQPage;

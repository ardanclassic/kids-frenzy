import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  MessageCircle,
  Mail,
  Send,
  ArrowLeft,
  Heart,
  Star,
  CheckCircle,
  AlertCircle,
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  Gift,
} from "lucide-react";

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

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  contactMethod: string;
}

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
    contactMethod: "whatsapp",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");

      // Reset form after success
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
          contactMethod: "whatsapp",
        });
        setSubmitStatus("idle");
      }, 3000);
    }, 1500);
  };

  const contactMethods = [
    {
      icon: MessageCircle,
      title: "WhatsApp Chat",
      description: "Chat langsung dengan tim support kami",
      value: "+62 812-3456-7890",
      action: "Chat Sekarang",
      color: "from-green-400 to-emerald-500",
      bgColor: "from-green-50/60 to-emerald-50/60",
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Kirim pertanyaan detail via email",
      value: "kids.frenzy.lab@gmail.com",
      action: "Kirim Email",
      color: "from-blue-400 to-cyan-500",
      bgColor: "from-blue-50/60 to-cyan-50/60",
    },
  ];

  const socialMedia = [
    { icon: Instagram, name: "Instagram", handle: "@kidsfrenzy.id", color: "from-pink-400 to-rose-500" },
    { icon: Facebook, name: "Facebook", handle: "Kids Frenzy Indonesia", color: "from-blue-500 to-blue-600" },
    { icon: Youtube, name: "YouTube", handle: "Kids Frenzy Channel", color: "from-red-500 to-red-600" },
    { icon: Twitter, name: "Twitter", handle: "@kidsfrenzy_id", color: "from-sky-400 to-blue-500" },
  ];

  const quickTopics = [
    "Pertanyaan tentang produk",
    "Bantuan download",
    "Masalah pembayaran",
    "Request produk baru",
    "Kerjasama & partnership",
    "Feedback & saran",
  ];

  return (
    <div className="pt-40 pb-20 px-4 min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-pink-50/30">
      <motion.div
        className="container mx-auto max-w-6xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <div className="w-28 h-28 bg-gradient-to-br from-kid-coral to-kid-peach rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
            <MessageCircle className="text-white w-14 h-14" />
          </div>
          <h1 className="text-5xl md:text-7xl mb-8 text-gradient">Hubungi Kami</h1>
        </motion.div>

        {/* Quick Contact Methods */}
        <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-6 mb-12">
          {contactMethods.map((method) => (
            <motion.div
              key={method.title}
              className={`card-playful bg-gradient-to-br ${method.bgColor} hover:shadow-xl cursor-pointer group`}
              whileHover={{ scale: 1.02, y: -5 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="text-center">
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${method.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}
                >
                  <method.icon className="text-white w-8 h-8" />
                </div>
                <h3 className="text-xl text-gray-600 mb-2">{method.title}</h3>
                <p className="text-gray-600 mb-3">{method.description}</p>
                <p className="text-gray-800 mb-4">{method.value}</p>
                <motion.button
                  className={`bg-gradient-to-r ${method.color} text-white px-6 py-2 rounded-full text-sm font-medium hover:shadow-lg transition-all`}
                  whileHover={{ scale: 1.05 }}
                >
                  {method.action}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Contact Form & Info Grid */}
        <div className="grid lg:grid-cols-2 gap-12 mb-12">
          {/* Contact Form */}
          <motion.div variants={itemVariants} className="card-playful">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-kid-teal to-kid-mint rounded-full flex items-center justify-center mr-4">
                <Send className="text-white w-6 h-6" />
              </div>
              <h2 className="text-3xl text-kid-teal">Kirim Pesan</h2>
            </div>

            {submitStatus === "success" && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-center"
              >
                <CheckCircle className="text-green-500 w-5 h-5 mr-3" />
                <span className="text-green-700">Pesan berhasil dikirim! Kami akan segera merespons.</span>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">Nama Lengkap</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-kid-teal focus:ring-2 focus:ring-kid-teal/20 transition-all"
                    placeholder="Masukkan nama Anda"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-kid-teal focus:ring-2 focus:ring-kid-teal/20 transition-all"
                    placeholder="email@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">Subjek</label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-kid-teal focus:ring-2 focus:ring-kid-teal/20 transition-all"
                >
                  <option value="">Pilih topik pertanyaan</option>
                  {quickTopics.map((topic) => (
                    <option key={topic} value={topic}>
                      {topic}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">Metode Kontak Preferensi</label>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="contactMethod"
                      value="whatsapp"
                      checked={formData.contactMethod === "whatsapp"}
                      onChange={handleInputChange}
                      className="mr-2 text-kid-teal"
                    />
                    WhatsApp
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="contactMethod"
                      value="email"
                      checked={formData.contactMethod === "email"}
                      onChange={handleInputChange}
                      className="mr-2 text-kid-teal"
                    />
                    Email
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">Pesan</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-kid-teal focus:ring-2 focus:ring-kid-teal/20 transition-all resize-none"
                  placeholder="Tuliskan pertanyaan atau pesan Anda di sini..."
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-kid-teal to-kid-mint text-white py-4 px-8 rounded-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-3" />
                    Mengirim...
                  </>
                ) : (
                  <>
                    <Send className="mr-3 w-5 h-5" />
                    Kirim Pesan
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Info & Social Media */}
          <motion.div variants={itemVariants} className="space-y-8">
            {/* Social Media */}
            <div className="card-playful bg-gradient-to-br from-orange-50/60 to-yellow-50/60">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-yellow-500 rounded-full flex items-center justify-center mr-4">
                  <Heart className="text-white w-6 h-6" />
                </div>
                <h3 className="text-2xl text-orange-500">Follow Kami</h3>
              </div>

              <p className="text-gray-600 mb-6">
                Ikuti media sosial kami untuk update terbaru, tips parenting, dan konten edukatif menarik!
              </p>

              <div className="grid grid-cols-2 gap-4">
                {socialMedia.map((social) => (
                  <motion.button
                    key={social.name}
                    className={`p-4 rounded-lg bg-gradient-to-r ${social.color} text-white hover:shadow-lg transition-all group`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center justify-between">
                      <social.icon className="w-6 h-6" />
                      <div className="text-right">
                        <p className="text-sm">{social.name}</p>
                        <p className="text-xs opacity-90">{social.handle}</p>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Special Offer */}
            <motion.div
              className="card-playful bg-gradient-to-br from-kid-coral/10 to-kid-peach/10 border-2 border-kid-coral/20"
              animate={{
                boxShadow: [
                  "0 4px 20px rgba(255, 138, 122, 0.1)",
                  "0 8px 30px rgba(255, 138, 122, 0.2)",
                  "0 4px 20px rgba(255, 138, 122, 0.1)",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <div className="text-center">
                <Gift className="w-16 h-16 text-kid-coral mx-auto mb-4" />
                <h3 className="text-xl text-kid-coral mb-3">Promo Khusus!</h3>
                <p className="text-gray-600 mb-4">
                  Dapatkan diskon 15% untuk pembelian pertama dengan kode:{" "}
                  <span className="text-kid-coral">HELLO15</span>
                </p>
                <motion.button
                  className="bg-gradient-to-r from-kid-coral to-kid-peach text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Claim Promo!
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* FAQ Quick Access */}
        <motion.div variants={itemVariants} className="mb-12">
          <div className="card-playful text-center bg-gradient-to-r from-kid-teal/10 to-kid-mint/10">
            <Star className="w-16 h-16 text-kid-teal mx-auto mb-6" />
            <h2 className="text-3xl text-gray-800 mb-4">Pertanyaan Umum</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Mungkin pertanyaan Anda sudah terjawab di halaman FAQ kami. Cek dulu yuk sebelum menghubungi kami!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/faq">
                <motion.button
                  className="btn-primary inline-flex items-center px-8 py-4"
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(0,0,0,0.2)" }}
                  whileTap={{ scale: 0.98 }}
                >
                  <AlertCircle className="mr-3 w-6 h-6" />
                  Lihat FAQ
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Back to Home */}
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

export default ContactPage;

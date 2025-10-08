import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MessageCircle, Mail, ArrowLeft, Heart, Star, AlertCircle } from "lucide-react";

// Animation variants
const containerVariants: any = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants: any = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

// TikTok Icon Component
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

// Instagram Icon Component
const InstagramIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const ContactPage: React.FC = () => {
  // Handle WhatsApp click
  const handleWhatsAppClick = () => {
    const phoneNumber = "6285930343476";
    const message = encodeURIComponent("Halo, saya ingin bertanya tentang produk dari Kids Frenzy");
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  // Handle Email click
  const handleEmailClick = () => {
    const email = "kids.frenzy.lab@gmail.com";
    const subject = encodeURIComponent("Pertanyaan tentang Kids Frenzy Lab");
    window.location.href = `mailto:${email}?subject=${subject}`;
  };

  // Handle Social Media click
  const handleSocialClick = (url: string) => {
    window.open(url, "_blank");
  };

  // Contact methods data
  const contactMethods = [
    {
      icon: MessageCircle,
      title: "WhatsApp Chat",
      description: "Chat langsung dengan admin",
      value: "+62 859-3034-3476",
      action: "Chat Sekarang",
      color: "from-green-400 to-emerald-500",
      bgColor: "from-green-50/60 to-emerald-50/60",
      onClick: handleWhatsAppClick,
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Kirim pertanyaan detail via email",
      value: "kids.frenzy.lab@gmail.com",
      action: "Kirim Email",
      color: "from-blue-400 to-cyan-500",
      bgColor: "from-blue-50/60 to-cyan-50/60",
      onClick: handleEmailClick,
    },
  ];

  // Social media data
  const socialMedia = [
    {
      icon: InstagramIcon,
      name: "Instagram",
      handle: "@kidsfrenzy.id",
      color: "from-pink-400 to-rose-500",
      url: "https://instagram.com/kidsfrenzy.id",
    },
    {
      icon: TikTokIcon,
      name: "TikTok",
      handle: "@kidsfrenzy.id",
      color: "from-gray-700 to-gray-900",
      url: "https://tiktok.com/@kidsfrenzy.id",
    },
  ];

  return (
    <div className="pt-24 md:pt-32 pb-12 md:pb-20 px-4 min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-pink-50/30">
      <motion.div
        className="container mx-auto max-w-6xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-8 md:mb-16">
          <div className="w-16 h-16 md:w-24 md:h-24 bg-gradient-to-br from-kid-coral to-kid-peach rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 shadow-xl">
            <MessageCircle className="text-white w-8 h-8 md:w-12 md:h-12" />
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl mb-3 md:mb-4 text-gradient">Hubungi Kami</h1>
          <p className="text-sm md:text-lg text-gray-600 max-w-2xl mx-auto">
            Kami siap membantu Anda! Pilih cara terbaik untuk menghubungi kami
          </p>
        </motion.div>

        {/* Quick Contact Methods */}
        <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-4 md:gap-8 mb-8 md:mb-16">
          {contactMethods.map((method) => (
            <motion.div
              key={method.title}
              className={`p-6 md:p-8 lg:p-10 rounded-3xl bg-gradient-to-br ${method.bgColor} hover:shadow-2xl cursor-pointer group transition-all border border-white/50`}
              whileHover={{ scale: 1.02, y: -8 }}
              whileTap={{ scale: 0.98 }}
              onClick={method.onClick}
            >
              <div className="text-center">
                <div
                  className={`w-14 h-14 md:w-20 md:h-20 bg-gradient-to-br ${method.color} rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform shadow-lg`}
                >
                  <method.icon className="text-white w-7 h-7 md:w-10 md:h-10" />
                </div>
                <h3 className="text-lg md:text-xl lg:text-2xl text-gray-800 mb-2 md:mb-3">
                  {method.title}
                </h3>
                <p className="text-xs md:text-sm lg:text-base text-gray-600 mb-3 md:mb-4">{method.description}</p>
                <p className="text-sm md:text-base lg:text-lg font-medium text-gray-800 mb-4 md:mb-6">{method.value}</p>
                <motion.button
                  className={`bg-gradient-to-r ${method.color} text-white px-6 py-2.5 md:px-8 md:py-3 rounded-full text-sm md:text-base font-medium hover:shadow-lg transition-all`}
                  whileHover={{ scale: 1.05 }}
                >
                  {method.action}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Social Media Section */}
        <motion.div variants={itemVariants} className="mb-8 md:mb-16">
          <div className="p-6 md:p-8 lg:p-10 rounded-3xl bg-gradient-to-br from-orange-50/60 to-yellow-50/60 shadow-xl border border-white/50">
            <div className="flex items-center justify-center md:justify-start mb-6 md:mb-8">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-orange-400 to-yellow-500 rounded-full flex items-center justify-center mr-3 md:mr-4 shadow-lg">
                <Heart className="text-white w-6 h-6 md:w-7 md:h-7" />
              </div>
              <h3 className="text-2xl md:text-3xl lg:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500">
                Follow Kami
              </h3>
            </div>

            <p className="text-sm md:text-base lg:text-lg text-gray-600 mb-6 md:mb-8 text-center md:text-left">
              Ikuti media sosial kami untuk update terbaru, tips parenting, dan konten edukatif menarik!
            </p>

            <div className="grid grid-cols-2 gap-4 md:gap-6">
              {socialMedia.map((social) => (
                <motion.button
                  key={social.name}
                  className={`p-4 md:p-6 rounded-2xl bg-gradient-to-r ${social.color} text-white hover:shadow-xl transition-all`}
                  whileHover={{ scale: 1.05, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSocialClick(social.url)}
                >
                  <div className="flex flex-col md:flex-row items-center justify-center md:justify-between gap-3 md:gap-0">
                    <social.icon className="w-8 h-8 md:w-10 md:h-10" />
                    <div className="text-center md:text-right">
                      <p className="text-sm md:text-base lg:text-lg">{social.name}</p>
                      <p className="text-xs md:text-sm opacity-90">{social.handle}</p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* FAQ Quick Access */}
        <motion.div variants={itemVariants} className="mb-8 md:mb-16">
          <div className="p-6 md:p-10 lg:p-12 rounded-3xl text-center bg-gradient-to-r from-kid-teal/10 to-kid-mint/10 shadow-xl border border-white/50">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-kid-teal to-kid-mint rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 shadow-lg">
              <Star className="w-8 h-8 md:w-10 md:h-10 text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl text-gray-800 mb-3 md:mb-4">Pertanyaan Umum</h2>
            <p className="text-sm md:text-base lg:text-lg text-gray-600 mb-6 md:mb-8 max-w-2xl mx-auto">
              Mungkin pertanyaan Anda sudah terjawab di halaman FAQ kami. Cek dulu yuk sebelum menghubungi kami!
            </p>
            <Link to="/faq">
              <motion.button
                className="inline-flex items-center px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r from-kid-teal to-kid-mint text-white rounded-full font-medium text-sm md:text-base lg:text-lg shadow-lg hover:shadow-xl transition-all"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <AlertCircle className="mr-2 md:mr-3 w-5 h-5 md:w-6 md:h-6" />
                Lihat FAQ
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* Back to Home */}
        <motion.div variants={itemVariants} className="text-center">
          <Link to="/">
            <motion.button
              className="inline-flex items-center px-6 py-3 md:px-8 md:py-4 bg-white text-gray-700 rounded-full font-medium text-sm md:text-base lg:text-lg shadow-lg hover:shadow-xl transition-all border border-gray-200"
              whileHover={{ scale: 1.05, y: -2 }}
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

export default ContactPage;

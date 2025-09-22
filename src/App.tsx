import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ProductsPage from "./pages/ProductsPage";
import FAQPage from "./pages/FAQPage";
import ContactPage from "./pages/ContactPage";
import Navigation from "./components/Navigation";
import PageTransition from "./components/PageTransition";
import ScrollToTop from "./components/scrollToTop";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-kid-yellow/20 via-white to-kid-blue/20">
        <ScrollToTop />
        <Navigation />
        <AnimatePresence mode="wait">
          <Routes>
            <Route
              path="/"
              element={
                <PageTransition>
                  <HomePage />
                </PageTransition>
              }
            />
            <Route
              path="/about"
              element={
                <PageTransition>
                  <AboutPage />
                </PageTransition>
              }
            />
            <Route
              path="/products"
              element={
                <PageTransition>
                  <ProductsPage />
                </PageTransition>
              }
            />
            <Route
              path="/faq"
              element={
                <PageTransition>
                  <FAQPage />
                </PageTransition>
              }
            />
            <Route
              path="/contact"
              element={
                <PageTransition>
                  <ContactPage />
                </PageTransition>
              }
            />
          </Routes>
        </AnimatePresence>
      </div>
    </Router>
  );
}

export default App;

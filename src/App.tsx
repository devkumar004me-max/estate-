import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Suspense, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LenisProvider } from './components/LenisProvider';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

// Pages
import { HomePage } from './pages/HomePage';
import { PropertiesPage } from './pages/PropertiesPage';
import { ServicesPage } from './pages/ServicesPage';
import { AboutPage } from './pages/AboutPage';
import { BlogPage } from './pages/BlogPage';
import { ContactPage } from './pages/ContactPage';
import { DemoTourPage } from './pages/DemoTourPage';

gsap.registerPlugin(ScrollTrigger);

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/properties" element={<PropertiesPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/demo-tour" element={<DemoTourPage />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  useEffect(() => {
    // Refresh ScrollTrigger and ScrollFloat/Reveal components on mount
    window.scrollTo(0, 0);
    ScrollTrigger.refresh();
  }, []);

  return (
    <BrowserRouter>
      <LenisProvider>
        <div className="bg-primary text-white min-h-screen font-authentic selection:bg-accent selection:text-primary relative">
          <Navbar />
          <main className="relative z-1">
            <Suspense fallback={<div className="p-10 text-white">Loading routes...</div>}>
              <AnimatedRoutes />
            </Suspense>
          </main>
          <Footer />
        </div>
      </LenisProvider>
    </BrowserRouter>
  );
}

export default App;

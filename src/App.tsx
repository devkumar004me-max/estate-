import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Suspense, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LenisProvider } from './components/LenisProvider';
import { Preloader } from './components/Preloader';
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
  const [isPreloaderComplete, setIsPreloaderComplete] = useState(false);

  useEffect(() => {
    if (isPreloaderComplete) {
      // Refresh ScrollTrigger and ScrollFloat/Reveal components
      window.scrollTo(0, 0);
      ScrollTrigger.refresh();
    }
  }, [isPreloaderComplete]);

  return (
    <BrowserRouter>
      <LenisProvider>
        <div className="bg-primary text-white min-h-screen font-authentic selection:bg-accent selection:text-primary relative">
          <Preloader onComplete={() => setIsPreloaderComplete(true)} />
          <Navbar />
          <main className="relative z-1">
            <Suspense fallback={null}>
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

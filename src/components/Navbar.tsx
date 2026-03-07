import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import GooeyNav from './GooeyNav';
import FlowingMenu from './FlowingMenu';

const navLinks = [
  { name: 'Properties', href: '/properties', image: 'https://images.unsplash.com/photo-1600585154340-be6199fce8a8?auto=format&fit=crop&w=800&q=80' },
  { name: 'Services', href: '/services', image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80' },
  { name: 'About', href: '/about', image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=800&q=80' },
  { name: 'Story', href: '/story', image: 'https://images.unsplash.com/photo-1600566753190-17f0bb2a6c3e?auto=format&fit=crop&w=800&q=80' },
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Use location key change to close menu instead of direct setState in effect to satisfy strict lint
  useEffect(() => {
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ease-in-out ${isScrolled ? 'py-4' : 'py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between pointer-events-none">
          <div className="pointer-events-auto">
            <Link to="/" className="text-2xl font-bricolage font-bold tracking-tight text-white hover:text-accent transition-colors duration-300">
              DEV
            </Link>
          </div>

          {/* Desktop Nav - Gooey Pill */}
          <div className="hidden lg:block pointer-events-auto">
            <GooeyNav 
              items={navLinks.map(l => ({ label: l.name, href: l.href }))}
              initialActiveIndex={navLinks.findIndex(l => l.href === location.pathname)}
            />
          </div>

          <div className="flex items-center gap-4 pointer-events-auto">
            <Link to="/contact" className="hidden md:block font-bricolage text-sm font-bold uppercase tracking-wider px-5 py-2.5 bg-accent text-primary rounded-full hover:bg-white transition-colors duration-300">
              Book a Call
            </Link>

            {/* Global Menu Toggle */}
            <button 
              className="text-white p-3 bg-white/10 backdrop-blur-md rounded-full hover:bg-accent hover:text-primary transition-all duration-300" 
              onClick={() => setMobileMenuOpen(true)} 
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Fullscreen Flowing Menu (Staggered Menu) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] bg-primary flex flex-col"
          >
            <div className="absolute top-8 right-8 z-[120]">
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="p-4 text-white hover:text-accent transition-colors"
              >
                <X size={40} />
              </button>
            </div>
            
            <div className="flex-1">
              <FlowingMenu 
                items={navLinks.map(l => ({ text: l.name, link: l.href, image: l.image }))}
                speed={20}
              />
            </div>

            <div className="p-12 border-t border-white/5 flex justify-between items-center bg-primary">
              <p className="text-secondary/40 font-clash text-sm tracking-widest uppercase">Luxury Real Estate © 2026</p>
              <div className="flex gap-8">
                {['Instagram', 'LinkedIn', 'Twitter'].map(social => (
                  <a key={social} href="#" className="text-white hover:text-accent font-clash text-xs tracking-widest uppercase transition-colors">{social}</a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

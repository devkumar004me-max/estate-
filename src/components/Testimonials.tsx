import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    quote: "This team found us our dream home. The level of service, discretion, and expertise was truly unmatched.",
    name: "Eleanor Sterling",
    role: "Private Client",
  },
  {
    quote: "Their network gave us access to properties that weren't even on the market yet. Incredible experience.",
    name: "James Harrington",
    role: "Investor",
  },
  {
    quote: "Selling our estate was complex, but DEV handled every detail with seamless precision.",
    name: "Sophia Laurent",
    role: "Seller",
  }
];

export function Testimonials() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextTestimonial = () => setIndex((prev) => (prev + 1) % testimonials.length);
  const prevTestimonial = () => setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-24 bg-primary text-secondary overflow-hidden relative">
      <div className="container mx-auto px-6 max-w-4xl relative z-10 text-center">
        
        {/* Animated Stars */}
        <div className="flex justify-center gap-2 mb-12">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Star className="text-accent fill-accent" size={24} />
            </motion.div>
          ))}
        </div>

        {/* Carousel */}
        <div className="relative h-64 md:h-48 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute w-full px-12"
            >
              <h3 className="font-sansita italic text-2xl md:text-4xl text-accent mb-8 leading-relaxed">
                "{testimonials[index].quote}"
              </h3>
              <div>
                <p className="font-bricolage text-lg text-white font-bold tracking-wider uppercase">
                  {testimonials[index].name}
                </p>
                <p className="font-authentic text-sm text-secondary/60 uppercase tracking-widest mt-1">
                  {testimonials[index].role}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-4 mt-8">
          <button 
            onClick={prevTestimonial}
            className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-primary transition-colors duration-300"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={nextTestimonial}
            className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-primary transition-colors duration-300"
          >
            <ChevronRight size={20} />
          </button>
        </div>

      </div>

      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-black/40 to-transparent pointer-events-none" />
      <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-black/40 to-transparent pointer-events-none" />
    </section>
  );
}

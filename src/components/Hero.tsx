import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowDown } from 'lucide-react';

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Parallax background effect
    gsap.to(bgRef.current, {
      yPercent: 30,
      ease: 'none',
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });

    // CTA buttons fade in
    gsap.fromTo(ctaRef.current?.children ?? [],
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: 'power3.out' }
    );
  }, []);

  const titleText = "Find Your Forever Home";

  return (
    <section ref={heroRef} className="relative w-full h-screen overflow-hidden bg-primary flex items-center justify-center pt-24">
      {/* Background Image & Parallax Layer */}
      <div 
        ref={bgRef}
        className="absolute inset-x-0 -top-[20%] h-[140%] w-full bg-cover bg-center"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80")' }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-primary/40 to-primary"></div>
      </div>

      {/* Grain Texture Overlay */}
      <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay bg-[url('https://upload.wikimedia.org/wikipedia/commons/7/76/1k_Dissolve_Noise_Texture.png')] bg-repeat" />

      <div className="relative z-10 container mx-auto px-6 text-center text-white max-w-5xl">
        <div className="mb-6">
          <h1 className="font-tanklager text-5xl sm:text-7xl md:text-8xl lg:text-[110px] leading-[0.9] tracking-tight uppercase text-white flex flex-wrap justify-center text-center">
            {titleText}
          </h1>
        </div>

        <div className="max-w-2xl mx-auto">
          <p className="text-lg md:text-xl text-secondary/80 font-clash">
            Experience architectural excellence and curated living spaces that redefine modern luxury. Every detail is a testament to sophisticated design.
          </p>
        </div>

        <div ref={ctaRef} className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
          <button className="font-bricolage px-8 py-4 bg-accent text-primary font-bold tracking-wider uppercase rounded hover:bg-white transition-colors duration-300 transform hover:scale-105 active:scale-95">
            Explore Properties
          </button>
          <button className="font-bricolage px-8 py-4 bg-transparent border border-white text-white font-bold tracking-wider uppercase rounded hover:bg-white hover:text-primary transition-all duration-300 transform hover:scale-105 active:scale-95">
            Book a Valuation
          </button>
        </div>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce text-white/50">
        <ArrowDown size={32} />
      </div>
    </section>
  );
}

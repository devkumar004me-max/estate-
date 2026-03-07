import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowDown } from 'lucide-react';

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
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

    const tl = gsap.timeline({ delay: 1.8 }); // wait for preloader

    // Headline word by word reveal
    if (headlineRef.current) {
      const words = headlineRef.current.querySelectorAll('.word');
      tl.fromTo(words, 
        { y: 100, opacity: 0, rotate: 5 },
        { y: 0, opacity: 1, rotate: 0, duration: 1, stagger: 0.1, ease: 'power4.out' }
      );
    }

    // Subheadline fade in
    tl.fromTo(subheadRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      "-=0.5"
    )
    // CTA buttons fade in
    .fromTo(ctaRef.current?.children ?? [],
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: 'power3.out' },
      "-=0.6"
    );

  }, []);

  const titleWords = "Find Your Forever Home".split(" ");

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
        <h1 
          ref={headlineRef} 
          className="font-tanklager text-5xl sm:text-7xl md:text-8xl lg:text-[120px] leading-[0.9] tracking-tight uppercase flex flex-wrap justify-center overflow-hidden"
        >
          {titleWords.map((word, i) => (
            <span key={i} className="word inline-block mr-[2vw] transform">
              {word}
            </span>
          ))}
        </h1>

        <p 
          ref={subheadRef}
          className="mt-8 font-sansita italic text-2xl md:text-3xl text-secondary max-w-2xl mx-auto opacity-0"
        >
          Exclusive properties for the modern visionary. Experience architecture redefined.
        </p>

        <div ref={ctaRef} className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
          <button className="font-bricolage px-8 py-4 bg-accent text-primary font-bold tracking-wider uppercase rounded hover:bg-white transition-colors duration-300 transform hover:scale-105 active:scale-95 opacity-0">
            Explore Properties
          </button>
          <button className="font-bricolage px-8 py-4 bg-transparent border border-white text-white font-bold tracking-wider uppercase rounded hover:bg-white hover:text-primary transition-all duration-300 transform hover:scale-105 active:scale-95 opacity-0">
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

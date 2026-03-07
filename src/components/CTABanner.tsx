import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function CTABanner() {
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(ctaRef.current,
      { scale: 0.95, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ctaRef.current,
          start: 'top 80%',
        }
      }
    );
  }, []);

  return (
    <section className="py-24 bg-primary relative overflow-hidden">
      
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 z-0 opacity-40">
        <div className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,_var(--color-accent)_0%,_transparent_50%)] animate-[spin_30s_linear_infinite]" />
      </div>

      <div className="container mx-auto px-6 max-w-5xl relative z-10 text-center text-white pb-32 pt-24">
        <div 
          ref={ctaRef}
          className="glass p-16 md:p-24 rounded-3xl border border-white/10 shadow-3xl"
        >
          <h2 className="font-tanklager text-5xl md:text-7xl lg:text-8xl tracking-tighter mb-8 bg-gradient-to-r from-accent via-white to-accent bg-clip-text text-transparent bg-[length:200%_auto] animate-[gradient_8s_linear_infinite]">
            Ready to find home?
          </h2>
          <p className="font-authentic text-xl text-secondary/80 max-w-2xl mx-auto mb-12">
            Connect with our exclusive partners to access the world's most luxurious private listings. Let us guide you to the extraordinary.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button className="group font-bricolage px-8 py-5 bg-accent hover:bg-white text-primary font-bold tracking-wider uppercase rounded flex items-center justify-center gap-3 transition-all duration-300 transform hover:-translate-y-1">
              Start your search
              <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
            <button className="font-bricolage px-8 py-5 bg-primary/50 backdrop-blur-md border border-white/20 hover:bg-white/10 text-white font-bold tracking-wider uppercase rounded transition-all duration-300 transform hover:-translate-y-1">
              Schedule Consultation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

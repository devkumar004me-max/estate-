import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const locations = [
  { id: 1, name: 'Mayfair', top: '40%', left: '45%' },
  { id: 2, name: 'Belgravia', top: '55%', left: '40%' },
  { id: 3, name: 'Chelsea', top: '65%', left: '35%' },
  { id: 4, name: 'Kensington', top: '45%', left: '30%' },
  { id: 5, name: 'Knightsbridge', top: '50%', left: '42%' },
];

export function MapSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapOverlayRef = useRef<HTMLDivElement>(null);
  const pinRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 60%',
      }
    });

    tl.to(mapOverlayRef.current, {
      opacity: 0,
      duration: 1.5,
      ease: 'power2.inOut'
    });

    pinRefs.current.forEach((pin, i) => {
      if (pin) {
        tl.fromTo(pin, 
          { scale: 0, opacity: 0, y: -20 },
          { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: 'back.out(1.7)' },
          `-=${i === 0 ? 0.5 : 0.4}`
        );
      }
    });

  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-[80vh] bg-primary overflow-hidden">
      
      {/* Map Background Wrapper */}
      <div className="absolute inset-0 grayscale contrast-125 opacity-80 mix-blend-luminosity">
        <img 
          src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80" 
          alt="London Map"
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Overlay to fade out */}
      <div 
        ref={mapOverlayRef}
        className="absolute inset-0 bg-primary/90 pointer-events-none" 
      />

      <div className="absolute top-12 left-6 md:left-12 z-20">
        <h2 className="font-getai text-4xl mb-4 text-white">Global Reach.<br/>Local Expertise.</h2>
        <div className="flex gap-4">
          {['London', 'New York', 'Dubai', 'Monaco'].map((city, i) => (
            <button key={city} className={`font-bricolage text-sm uppercase tracking-wider font-bold px-4 py-2 border rounded-full transition-colors ${i === 0 ? 'bg-accent text-primary border-accent' : 'border-white/20 text-white hover:border-white'}`}>
              {city}
            </button>
          ))}
        </div>
      </div>

      {/* Pins */}
      <div className="absolute inset-0 z-10 hidden md:block max-w-7xl mx-auto">
        {locations.map((loc, i) => (
          <div 
            key={loc.id}
            ref={(el) => { pinRefs.current[i] = el; }}
            className="absolute flex flex-col items-center transform -translate-x-1/2 -translate-y-full cursor-pointer group"
            style={{ top: loc.top, left: loc.left }}
          >
            <div className="bg-primary/90 backdrop-blur-sm text-white font-authentic text-xs px-3 py-1 rounded mb-2 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
              {loc.name}
            </div>
            <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center text-primary shadow-lg shadow-accent/20 group-hover:scale-110 transition-transform">
              <MapPin size={16} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const properties = [
  {
    id: 1,
    title: 'The Glass Pavilion',
    price: '£4,500,000',
    details: '5 Beds • 6 Baths • 8,200 sqft',
    tag: 'New Listing',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80',
  },
  {
    id: 2,
    title: 'Modernist Retreat',
    price: '£3,200,000',
    details: '4 Beds • 4.5 Baths • 6,500 sqft',
    tag: 'Featured',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80',
  },
  {
    id: 3,
    title: 'Cliffside Estate',
    price: '£7,800,000',
    details: '7 Beds • 8 Baths • 12,000 sqft',
    tag: 'Under Offer',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80',
  },
];

export function FeaturedProperties() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const pin = gsap.to(scrollRef.current, {
      x: () => -(scrollRef.current?.scrollWidth ?? 0) + window.innerWidth,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: () => `+=${scrollRef.current?.scrollWidth}`,
        pin: true,
        scrub: 1,
      },
    });

    return () => {
      pin.kill();
    };
  }, []);

  return (
    <section ref={containerRef} className="bg-primary pt-24 pb-12 overflow-hidden h-screen flex flex-col justify-center">
      <div className="container mx-auto px-6 mb-12 flex justify-between items-end">
        <h2 className="font-getai text-4xl md:text-6xl text-white">
          Curated <br/> <span className="text-secondary/50">Collection</span>
        </h2>
        <div className="hidden md:flex items-center gap-4 text-accent hover:text-white transition-colors cursor-pointer group">
          <span className="font-bricolage uppercase tracking-wider text-sm font-bold">View all properties</span>
          <ArrowRight className="transform group-hover:translate-x-2 transition-transform" />
        </div>
      </div>

      <div className="relative w-full">
        <div ref={scrollRef} className="flex gap-8 px-6 md:px-[10vw] w-max">
          {properties.map((prop) => (
            <div 
              key={prop.id} 
              className="w-[85vw] md:w-[45vw] lg:w-[35vw] shrink-0 group cursor-pointer"
            >
              <div className="relative overflow-hidden aspect-[4/5] md:aspect-[3/4] rounded-sm mb-6">
                <img 
                  src={prop.image} 
                  alt={prop.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)]"
                  loading="lazy"
                />
                <div className="absolute top-6 left-6 bg-primary text-white font-bricolage text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full">
                  {prop.tag}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                  <div className="w-12 h-12 rounded-full bg-accent text-primary flex items-center justify-center transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                    <ArrowRight />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-getai text-2xl md:text-3xl text-white mb-2">{prop.title}</h3>
                  <p className="font-clash text-secondary/60 text-sm md:text-base">{prop.details}</p>
                </div>
                <p className="font-bricolage font-bold text-accent text-xl md:text-2xl tracking-wide">{prop.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

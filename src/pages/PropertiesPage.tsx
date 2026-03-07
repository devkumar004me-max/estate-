import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { PageTransition } from '../components/PageTransition';
import { CTABanner } from '../components/CTABanner';
import { ArrowRight, Bed, Bath, Square } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const allProperties = [
  { id: 1, title: 'The Glass Pavilion', price: '£4,500,000', beds: 5, baths: 6, sqft: '8,200', tag: 'New Listing', area: 'Mayfair', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80' },
  { id: 2, title: 'Modernist Retreat', price: '£3,200,000', beds: 4, baths: 4, sqft: '6,500', tag: 'Featured', area: 'Chelsea', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80' },
  { id: 3, title: 'Cliffside Estate', price: '£7,800,000', beds: 7, baths: 8, sqft: '12,000', tag: 'Under Offer', area: 'Richmond', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80' },
  { id: 4, title: 'The Penthouse', price: '£9,200,000', beds: 6, baths: 7, sqft: '10,400', tag: 'New Listing', area: 'Kensington', image: 'https://images.unsplash.com/photo-1613490908578-8bea16b677a2?auto=format&fit=crop&q=80' },
  { id: 5, title: 'Lakeside Manor', price: '£5,100,000', beds: 6, baths: 5, sqft: '9,000', tag: 'Featured', area: 'Belgravia', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80' },
  { id: 6, title: 'Knightsbridge Court', price: '£6,400,000', beds: 5, baths: 5, sqft: '7,800', tag: 'Available', area: 'Knightsbridge', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80' },
];

const filters = ['All', 'Mayfair', 'Chelsea', 'Kensington', 'Belgravia', 'Richmond'];

export function PropertiesPage() {
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(headingRef.current,
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.3 }
    );
    const cards = gridRef.current?.querySelectorAll('.prop-card');
    if (cards) {
      gsap.fromTo(cards,
        { opacity: 0, y: 80 },
        {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: gridRef.current, start: 'top 80%' }
        }
      );
    }
  }, []);

  return (
    <PageTransition>
      <div className="min-h-screen bg-primary text-white pt-32 pb-0">
        {/* Page Header */}
        <div ref={headingRef} className="container mx-auto px-6 max-w-7xl mb-16">
          <p className="font-bricolage uppercase tracking-widest text-accent text-sm mb-4">Curated Collection</p>
          <h1 className="font-tanklager text-6xl md:text-8xl tracking-tighter mb-6">All Properties</h1>
          <p className="font-authentic text-secondary/70 text-xl max-w-2xl">
            Discover our hand-selected portfolio of the world's most extraordinary residential properties.
          </p>
        </div>

        {/* Filters */}
        <div className="container mx-auto px-6 max-w-7xl mb-16">
          <div className="flex flex-wrap gap-3">
            {filters.map((f, i) => (
              <button key={f} className={`font-bricolage text-sm uppercase tracking-wider font-bold px-5 py-2 rounded-full border transition-colors ${i === 0 ? 'bg-accent text-primary border-accent' : 'border-white/15 text-secondary/70 hover:border-white hover:text-white'}`}>
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Properties Grid */}
        <div ref={gridRef} className="container mx-auto px-6 max-w-7xl pb-24">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allProperties.map((prop) => (
              <div key={prop.id} className="prop-card group cursor-pointer opacity-0">
                <div className="relative overflow-hidden aspect-4/3 rounded-sm mb-5 bg-card">
                  <img src={prop.image} alt={prop.title} loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />
                  <div className="absolute top-4 left-4 bg-primary/90 backdrop-blur-sm font-bricolage text-xs font-bold uppercase tracking-widest text-white px-3 py-1.5 rounded-full">
                    {prop.tag}
                  </div>
                  <div className="absolute top-4 right-4 bg-primary/90 backdrop-blur-sm font-bricolage text-xs text-secondary/70 px-3 py-1.5 rounded-full">
                    {prop.area}
                  </div>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-getai text-2xl text-white mb-2 group-hover:text-accent transition-colors">{prop.title}</h3>
                    <div className="flex gap-4 text-secondary/50 font-clash text-sm">
                      <span className="flex items-center gap-1"><Bed size={13} /> {prop.beds}</span>
                      <span className="flex items-center gap-1"><Bath size={13} /> {prop.baths}</span>
                      <span className="flex items-center gap-1"><Square size={13} /> {prop.sqft} sqft</span>
                    </div>
                  </div>
                  <p className="font-bricolage font-bold text-accent text-xl">{prop.price}</p>
                </div>
                <button className="mt-4 w-full flex items-center justify-between group/btn font-bricolage text-sm uppercase tracking-wider text-secondary/50 hover:text-white border-b border-white/10 hover:border-accent pb-3 transition-all">
                  View Details <ArrowRight size={16} className="group-hover/btn:translate-x-2 transition-transform" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <CTABanner />
      </div>
    </PageTransition>
  );
}

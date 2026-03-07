import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { Mail, Linkedin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const team = [
  {
    id: 1,
    name: 'Alexander Vane',
    role: 'Founder & Principal Broker',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80',
  },
  {
    id: 2,
    name: 'Isabella Rossi',
    role: 'Head of Global Acquisitions',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80',
  },
  {
    id: 3,
    name: 'Marcus Chen',
    role: 'Senior Portfolio Manager',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80',
  },
  {
    id: 4,
    name: 'Sarah Jenkins',
    role: 'Director of Marketing',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80',
  },
];

export function Team() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.fromTo(cardRefs.current,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        }
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-secondary text-primary" id="about">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="font-getai text-5xl md:text-6xl mb-4">The Visionaries</h2>
          <p className="font-authentic text-lg text-primary/70 max-w-2xl mx-auto">
            Our distinguished team of experts brings decades of experience in the ultra-luxury market.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, i) => (
            <div
              key={member.id}
              ref={(el) => { cardRefs.current[i] = el; }}
              className="group cursor-pointer opacity-0"
            >
              <div className="relative overflow-hidden aspect-[3/4] mb-6 rounded-sm bg-primary/5">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                {/* Contact Overlay */}
                <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-primary/90 to-transparent p-6 translate-y-full group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out flex gap-4">
                  <button className="flex-1 bg-accent text-primary font-bricolage text-sm font-bold uppercase py-3 rounded flex items-center justify-center gap-2 hover:bg-white transition-colors">
                    <Mail size={16} /> Contact
                  </button>
                  <button className="w-12 h-12 bg-white/20 backdrop-blur-md rounded flex items-center justify-center text-white hover:bg-white hover:text-primary transition-colors">
                    <Linkedin size={18} />
                  </button>
                </div>
              </div>
              <div className="text-center md:text-left">
                <h3 className="font-getai text-2xl mb-1">{member.name}</h3>
                <p className="font-authentic text-primary/60 text-sm">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

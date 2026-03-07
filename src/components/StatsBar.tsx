import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 500, suffix: '+', label: 'Properties Sold' },
  { value: 2, suffix: 'B+', label: 'Volume (£)' },
  { value: 98, suffix: '%', label: 'Client Satisfaction' },
  { value: 12, suffix: '', label: 'Years Experience' },
];

export function StatsBar() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const numberRefs = useRef<(HTMLHeadingElement | null)[]>([]);

  useEffect(() => {
    const el = sectionRef.current;
    
    numberRefs.current.forEach((node, index) => {
      if (!node) return;
      
      const targetValue = stats[index].value;
      const counter = { val: 0 };
      
      gsap.to(counter, {
        val: targetValue,
        duration: 2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
        },
        onUpdate: () => {
          node.innerText = `${Math.ceil(counter.val)}${stats[index].suffix}`;
        }
      });
    });
    
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-primary text-white border-b border-white/5 relative z-10 mt-12 md:mt-24">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8 justify-items-center md:justify-items-start">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center md:items-start group">
              <h2 
                ref={(el) => { numberRefs.current[i] = el; }}
                className="font-tanklager text-5xl md:text-7xl lg:text-[80px] tracking-tighter text-accent transition-transform duration-500 group-hover:-translate-y-2"
              >
                0{stat.suffix}
              </h2>
              <p className="font-authentic uppercase tracking-widest text-sm md:text-md text-secondary/80 mt-4 md:mt-2 transition-colors duration-300 group-hover:text-white">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

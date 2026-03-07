import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  { id: '01', title: 'Search', text: 'Discover hand-picked properties that align with your vision and lifestyle requirements.', img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80' },
  { id: '02', title: 'View', text: 'Experience private, curated tours of the finest estates, guided by our senior partners.', img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80' },
  { id: '03', title: 'Offer', text: 'Benefit from our expert negotiation strategies to secure your property at the best possible terms.', img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80' },
  { id: '04', title: 'Move In', text: 'Enjoy a seamless transition with our comprehensive concierge and moving services.', img: 'https://images.unsplash.com/photo-1613490908578-8bea16b677a2?auto=format&fit=crop&q=80' },
];

export function Story() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imgRefs = useRef<(HTMLImageElement | null)[]>([]);

  useEffect(() => {
    // Pin the container
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: `+=${steps.length * 100}%`,
      pin: true,
    });

    // Crossfade effects for each step
    steps.forEach((_, i) => {
      // Images fading in
      if (i > 0) {
        gsap.fromTo(imgRefs.current[i],
          { opacity: 0 },
          {
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: `top+=${i * 100}% top`,
              end: `top+=${(i + 1) * 100}% top`,
              scrub: true,
            }
          }
        );
      }

      // Text fading in and out (except last text out)
      gsap.fromTo(textRefs.current[i],
        { opacity: i === 0 ? 1 : 0, y: i === 0 ? 0 : 50 },
        {
          opacity: 1,
          y: 0,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: `top+=${(i - 0.5) * 100}% top`,
            end: `top+=${i * 100}% top`,
            scrub: true,
          }
        }
      );

      if (i < steps.length - 1) {
        gsap.to(textRefs.current[i], {
          opacity: 0,
          y: -50,
          ease: 'power2.in',
          scrollTrigger: {
            trigger: containerRef.current,
            start: `top+=${i * 100}% top`,
            end: `top+=${(i + 0.5) * 100}% top`,
            scrub: true,
          }
        });
      }
    });
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen overflow-hidden bg-primary text-white">
      {/* Background Images */}
      {steps.map((step, i) => (
        <img
          key={`img-${i}`}
          ref={(el) => { imgRefs.current[i] = el; }}
          src={step.img}
          alt={step.title}
          className={`absolute inset-0 w-full h-full object-cover ${i === 0 ? 'opacity-30' : 'opacity-0'}`}
        />
      ))}
      
      {/* Dark Overlay for Text readability */}
      <div className="absolute inset-0 bg-primary/70 pointer-events-none" />

      {/* Foreground Text Content */}
      <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
        {steps.map((step, i) => (
          <div 
            key={`text-${i}`} 
            ref={(el) => { textRefs.current[i] = el; }}
            className={`absolute flex flex-col items-center text-center max-w-3xl px-6 ${i === 0 ? '' : 'opacity-0 translate-y-12'}`}
          >
            <div className="relative w-full flex justify-center items-center mb-8">
              <span className="font-tanklager text-[150px] md:text-[250px] leading-none text-white/5 absolute -z-10 select-none">
                {step.id}
              </span>
              <h2 className="font-getai text-5xl md:text-7xl pt-12 text-accent">
                {step.title}
              </h2>
            </div>
            <p className="font-authentic text-xl md:text-2xl text-secondary/90 leading-relaxed max-w-2xl">
              {step.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function WhyChooseUs() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    gsap.to(imageRef.current, {
      yPercent: 20,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-secondary text-primary overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-24 items-center">
          
          <div className="space-y-12">
            <div>
              <h2 className="font-getai text-5xl md:text-6xl mb-6">Redefining Excellence</h2>
              <p className="font-authentic text-lg text-primary/70 max-w-md leading-relaxed">
                We believe finding a home is more than a transaction. It's an experience tailored to your unique lifestyle.
              </p>
            </div>

            <div className="space-y-8">
              {[
                { title: 'Exclusive Network', text: 'Access to off-market properties and elite clientele worldwide.' },
                { title: 'Tailored Approach', text: 'Personalized service designed around your specific requirements.' },
                { title: 'Unrivaled Expertise', text: 'Decades of experience in the luxury real estate market.' }
              ].map((item, i) => (
                <div key={i} className="flex gap-6 items-start group">
                  <div className="font-tanklager text-4xl text-accent opacity-50 group-hover:opacity-100 transition-opacity">0{i + 1}</div>
                  <div>
                    <h3 className="font-getai text-2xl mb-2">{item.title}</h3>
                    <p className="font-authentic text-primary/70">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative h-[80vh] w-full overflow-hidden rounded-sm">
            <img 
              ref={imageRef}
              src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80" 
              alt="Luxury Living"
              className="absolute inset-0 w-full h-[120%] object-cover -top-[10%]"
            />
          </div>

        </div>
      </div>
    </section>
  );
}

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { PageTransition } from '../components/PageTransition';
import { CTABanner } from '../components/CTABanner';
import { Team } from '../components/Team';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const values = [
  { title: 'Discretion', text: 'Every client relationship is handled with the utmost confidentiality. You can trust us to protect your privacy at every stage.' },
  { title: 'Integrity', text: 'We give you honest advice — even when it\'s not what you want to hear. Your best interests always come first.' },
  { title: 'Expertise', text: 'With decades of combined experience, our team offers unparalleled insight into the world\'s most prestigious real estate markets.' },
  { title: 'Excellence', text: 'We are relentlessly focused on quality — in our properties, our service, and the experiences we create for our clients.' },
];

const milestones = [
  { year: '2012', event: 'DEV founded in Mayfair, London' },
  { year: '2015', event: 'Opened international desk in Dubai' },
  { year: '2018', event: '£1 billion in transactions completed' },
  { year: '2021', event: 'Launched New York and Monaco offices' },
  { year: '2024', event: 'Recognised as #1 Luxury Real Estate Firm in Europe' },
];

export function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    gsap.fromTo(heroRef.current,
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.3 }
    );
    gsap.to(imgRef.current, {
      yPercent: 20,
      ease: 'none',
      scrollTrigger: { trigger: imgRef.current, start: 'top top', end: 'bottom top', scrub: true }
    });
  }, []);

  return (
    <PageTransition>
      <div className="min-h-screen bg-primary text-white pt-32 pb-0">
        {/* Hero */}
        <div ref={heroRef} className="container mx-auto px-6 max-w-7xl mb-24">
          <p className="font-bricolage uppercase tracking-widest text-accent text-sm mb-4">Our Story</p>
          <h1 className="font-tanklager text-6xl md:text-8xl tracking-tighter mb-8">Built on Legacy.<br/>Driven by Vision.</h1>
          <p className="font-authentic text-secondary/70 text-xl max-w-3xl leading-relaxed">
            DEV was founded in 2012 with a singular purpose: to redefine what it means to acquire, sell, and invest in extraordinary property. We don't just list homes — we curate legacies.
          </p>
        </div>

        {/* Full-width Image */}
        <div className="w-full h-[70vh] overflow-hidden relative mb-24">
          <img
            ref={imgRef}
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80"
            alt="Luxury interior"
            className="w-full h-[120%] object-cover -mt-[10%]"
          />
          <div className="absolute inset-0 bg-linear-to-t from-primary/80 to-transparent" />
        </div>

        {/* Values */}
        <div className="container mx-auto px-6 max-w-7xl mb-24">
          <h2 className="font-getai text-4xl md:text-6xl mb-16">What We Stand For</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="border-t border-white/10 pt-8"
              >
                <h3 className="font-getai text-2xl text-accent mb-4">{v.title}</h3>
                <p className="font-authentic text-secondary/60 text-sm leading-relaxed">{v.text}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-[#111111] py-24 mb-0">
          <div className="container mx-auto px-6 max-w-7xl">
            <h2 className="font-getai text-4xl md:text-6xl mb-16 text-white">Our Journey</h2>
            <div className="relative pl-8 border-l border-white/10">
              {milestones.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.12 }}
                  viewport={{ once: true }}
                  className="mb-12 relative"
                >
                  <div className="absolute -left-[2.35rem] top-1.5 w-3 h-3 rounded-full bg-accent ring-4 ring-accent/20" />
                  <p className="font-tanklager text-5xl text-accent/30 leading-none mb-1">{m.year}</p>
                  <p className="font-getai text-xl text-white">{m.event}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Team Section */}
        <Team />
        <CTABanner />
      </div>
    </PageTransition>
  );
}

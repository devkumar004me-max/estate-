import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { PageTransition } from '../components/PageTransition';
import { CTABanner } from '../components/CTABanner';
import { Home, Key, ShieldCheck, TrendingUp, Globe, Users } from 'lucide-react';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const services = [
  { icon: Home, title: 'Property Sales', text: 'Access an unparalleled network of buyers and off-market opportunities globally. We carefully qualify every purchaser to ensure the right fit for every property.', color: '#C9A96E' },
  { icon: Key, title: 'Acquisitions', text: 'Expert guidance through complex negotiations and the purchase process. Our senior advisors have decades of experience securing exceptional properties at the right price.', color: '#C9A96E' },
  { icon: ShieldCheck, title: 'Asset Management', text: 'Comprehensive care for your luxury assets, ensuring total peace of mind. From lettings management to long-term investment strategy, we handle it all.', color: '#C9A96E' },
  { icon: TrendingUp, title: 'Investment Advisory', text: 'Strategic counsel to maximise returns on your real estate portfolio. Our analysts deliver deep-dive market intelligence and bespoke investment frameworks.', color: '#C9A96E' },
  { icon: Globe, title: 'International Desk', text: 'A dedicated team to assist cross-border buyers and vendors navigating tax, legal, and cultural complexities across multiple jurisdictions.', color: '#C9A96E' },
  { icon: Users, title: 'Private Clientele', text: 'Our white-glove service division caters exclusively to ultra-high-net-worth individuals requiring absolute discretion and a deeply personalised service.', color: '#C9A96E' },
];

const process = [
  { step: '01', title: 'Initial Consultation', desc: 'A private briefing to understand your requirements, lifestyle, and investment goals.' },
  { step: '02', title: 'Curated Selection', desc: 'Our team handpicks properties from public and off-market sources that meet your criteria.' },
  { step: '03', title: 'Guided Viewings', desc: 'Exclusive, private tours managed by senior partners, at times that suit you.' },
  { step: '04', title: 'Expert Negotiation', desc: 'Strategic negotiation delivered by our senior advisors to secure optimal terms.' },
  { step: '05', title: 'Seamless Completion', desc: 'We coordinate all parties — legal, financial, and logistical — for a frictionless close.' },
];

export function ServicesPage() {
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(headerRef.current,
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.3 }
    );
    const cards = gridRef.current?.querySelectorAll('.svc-card');
    if (cards) {
      gsap.fromTo(cards,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out', scrollTrigger: { trigger: gridRef.current, start: 'top 78%' } }
      );
    }
  }, []);

  return (
    <PageTransition>
      <div className="min-h-screen bg-secondary text-primary pt-32 pb-0">
        {/* Header */}
        <div ref={headerRef} className="container mx-auto px-6 max-w-7xl mb-20">
          <p className="font-bricolage uppercase tracking-widest text-accent text-sm mb-4">Our Expertise</p>
          <h1 className="font-tanklager text-6xl md:text-8xl tracking-tighter mb-6 text-primary">Bespoke Services</h1>
          <p className="font-authentic text-primary/70 text-xl max-w-2xl">
            Every client relationship begins with listening. We shape our services around your world, not the other way around.
          </p>
        </div>

        {/* Services Grid */}
        <div ref={gridRef} className="bg-[#E8E6E1] py-24">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((svc, i) => (
                <div key={i} className="svc-card group bg-secondary p-10 hover:-translate-y-3 hover:shadow-2xl transition-all duration-500 rounded-sm cursor-pointer opacity-0">
                  <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center mb-8 shadow-sm">
                    <svc.icon size={24} className="text-primary group-hover:text-accent transition-colors duration-500" />
                  </div>
                  <h3 className="font-getai text-2xl mb-4 group-hover:text-accent transition-colors duration-300">{svc.title}</h3>
                  <p className="font-authentic text-primary/70 leading-relaxed text-sm">{svc.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Process Section */}
        <div className="py-24 bg-primary text-white">
          <div className="container mx-auto px-6 max-w-7xl">
            <h2 className="font-getai text-4xl md:text-6xl mb-16">How We Work</h2>
            <div className="space-y-0 divide-y divide-white/10">
              {process.map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="flex gap-8 md:gap-16 py-8 group"
                >
                  <span className="font-tanklager text-5xl text-accent/30 group-hover:text-accent transition-colors w-16 shrink-0">{p.step}</span>
                  <div>
                    <h3 className="font-getai text-2xl mb-2 group-hover:text-accent transition-colors">{p.title}</h3>
                    <p className="font-authentic text-secondary/60 text-sm leading-relaxed">{p.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <CTABanner />
      </div>
    </PageTransition>
  );
}

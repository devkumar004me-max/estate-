import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { PageTransition } from '../components/PageTransition';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export function ContactPage() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(heroRef.current,
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.3 }
    );
  }, []);

  return (
    <PageTransition>
      <div className="min-h-screen bg-primary text-white pt-32 pb-24">
        {/* Header */}
        <div ref={heroRef} className="container mx-auto px-6 max-w-7xl mb-20">
          <p className="font-bricolage uppercase tracking-widest text-accent text-sm mb-4">Get In Touch</p>
          <h1 className="font-tanklager text-6xl md:text-8xl tracking-tighter mb-6">Let's Talk.</h1>
          <p className="font-authentic text-secondary/70 text-xl max-w-2xl">
            Whether you're buying, selling, or simply exploring — our team is ready to guide you.
          </p>
        </div>

        <div className="container mx-auto px-6 max-w-7xl grid md:grid-cols-2 gap-16 items-start">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <div className="grid sm:grid-cols-2 gap-6">
              {['First Name', 'Last Name'].map((label) => (
                <div key={label}>
                  <label className="font-bricolage text-xs uppercase tracking-widest text-white/40 block mb-2">{label}</label>
                  <input type="text" placeholder={label}
                    className="w-full bg-white/5 border border-white/10 rounded px-5 py-4 font-authentic text-white placeholder-white/20 focus:outline-none focus:border-accent transition-colors" />
                </div>
              ))}
            </div>
            <div>
              <label className="font-bricolage text-xs uppercase tracking-widest text-white/40 block mb-2">Email Address</label>
              <input type="email" placeholder="you@example.com"
                className="w-full bg-white/5 border border-white/10 rounded px-5 py-4 font-authentic text-white placeholder-white/20 focus:outline-none focus:border-accent transition-colors" />
            </div>
            <div>
              <label className="font-bricolage text-xs uppercase tracking-widest text-white/40 block mb-2">I'm Interested In</label>
              <select className="w-full bg-white/5 border border-white/10 rounded px-5 py-4 font-authentic text-white/70 focus:outline-none focus:border-accent transition-colors appearance-none">
                <option value="" className="bg-primary">Select a service...</option>
                <option value="buy" className="bg-primary">Buying a property</option>
                <option value="sell" className="bg-primary">Selling a property</option>
                <option value="invest" className="bg-primary">Investment advisory</option>
                <option value="manage" className="bg-primary">Asset management</option>
              </select>
            </div>
            <div>
              <label className="font-bricolage text-xs uppercase tracking-widest text-white/40 block mb-2">Your Message</label>
              <textarea rows={5} placeholder="Tell us about your requirements..."
                className="w-full bg-white/5 border border-white/10 rounded px-5 py-4 font-authentic text-white placeholder-white/20 focus:outline-none focus:border-accent transition-colors resize-none" />
            </div>
            <button className="w-full font-bricolage px-8 py-5 bg-accent hover:bg-white text-primary font-bold tracking-wider uppercase rounded transition-all duration-300 transform hover:-translate-y-1">
              Send Message
            </button>
          </motion.div>

          {/* Info Panel */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="space-y-10"
          >
            {/* Office Image */}
            <div className="aspect-4/3 rounded-sm overflow-hidden">
              <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80"
                alt="Our Office" className="w-full h-full object-cover" />
            </div>

            {/* Contact Details */}
            <div className="grid sm:grid-cols-2 gap-8">
              {[
                { icon: MapPin, label: 'Address', value: '14 Berkeley Square\nMayfair, London W1J 6BS' },
                { icon: Phone, label: 'Phone', value: '+44 (0)20 7123 4567' },
                { icon: Mail, label: 'Email', value: 'hello@dev-estate.com' },
                { icon: Clock, label: 'Hours', value: 'Mon–Sat: 9:00–19:00\nSun: By appointment' },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="w-10 h-10 bg-white/5 rounded flex items-center justify-center shrink-0">
                    <item.icon size={18} className="text-accent" />
                  </div>
                  <div>
                    <p className="font-bricolage text-xs uppercase tracking-widest text-white/40 mb-1">{item.label}</p>
                    <p className="font-authentic text-white/80 text-sm whitespace-pre-line">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Office Locations */}
            <div>
              <p className="font-bricolage text-xs uppercase tracking-widest text-white/40 mb-4">Global Offices</p>
              <div className="grid grid-cols-2 gap-2">
                {['London', 'New York', 'Dubai', 'Monaco'].map((city) => (
                  <div key={city} className="bg-white/5 border border-white/10 rounded px-4 py-3 font-authentic text-sm text-white/70">{city}</div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { Instagram, Twitter, Linkedin, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const footerLinks = {
  Company: ['About Us', 'Careers', 'Press', 'Contact'],
  Services: ['Property Sales', 'Acquisitions', 'Lettings', 'Management'],
  Locations: ['London', 'New York', 'Dubai', 'Monaco'],
};

export function Footer() {
  const dividerRef = useRef<SVGLineElement>(null);

  useEffect(() => {
    // Animated divider line drawing across
    gsap.fromTo(dividerRef.current,
      { strokeDashoffset: 2000, strokeDasharray: 2000 },
      {
        strokeDashoffset: 0,
        duration: 1.5,
        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: dividerRef.current,
          start: 'top 90%',
        }
      }
    );
  }, []);

  return (
    <footer className="bg-[#0A0A0A] text-secondary py-24">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Top Row: Logo + Social */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8">
          <div>
            <div className="font-bricolage text-4xl font-bold text-white mb-2">DEV</div>
            <p className="font-sansita italic text-secondary/60 text-lg max-w-xs">
              Where luxury meets legacy — finding your forever home.
            </p>
          </div>
          <div className="flex gap-4">
            {[Instagram, Twitter, Linkedin].map((Icon, i) => (
              <a 
                key={i}
                href="#" 
                className="w-12 h-12 border border-white/10 rounded-full flex items-center justify-center text-secondary/60 hover:text-white hover:border-white hover:-translate-y-1 transition-all duration-300"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* Animated Divider */}
        <div className="w-full h-px mb-16 overflow-hidden">
          <svg className="w-full h-full" preserveAspectRatio="none">
            <line
              ref={dividerRef}
              x1="0" y1="0.5" x2="100%" y2="0.5"
              stroke="rgba(255,255,255,0.15)"
              strokeWidth="1"
            />
          </svg>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="font-bricolage font-bold uppercase tracking-widest text-xs text-secondary/40 mb-6">{section}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="font-authentic text-secondary/70 hover:text-white transition-colors duration-300">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          
          {/* Newsletter Column */}
          <div>
            <h4 className="font-bricolage font-bold uppercase tracking-widest text-xs text-secondary/40 mb-6">Newsletter</h4>
            <p className="font-authentic text-sm text-secondary/60 mb-4">Exclusive market insights delivered monthly.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="you@example.com"
                className="bg-white/5 border border-white/10 rounded px-4 py-3 text-sm font-authentic text-white placeholder-white/30 flex-1 focus:outline-none focus:border-accent"
              />
              <button className="w-12 h-12 bg-accent text-primary rounded flex items-center justify-center hover:bg-white transition-colors">
                <ArrowUpRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-secondary/40">
          <p className="font-authentic text-xs">© 2025 DEV Real Estate. All rights reserved.</p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Use', 'Cookie Notice'].map((item) => (
              <a key={item} href="#" className="font-authentic text-xs hover:text-white transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}

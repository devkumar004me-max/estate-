import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { PageTransition } from '../components/PageTransition';
import { CTABanner } from '../components/CTABanner';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const posts = [
  { id: 1, title: 'The Rise of Branded Residences', category: 'Market Insights', date: 'Oct 12, 2024', readTime: '6 min read', excerpt: 'Exploring why ultra-high-net-worth individuals are shifting towards fully serviced, hospitality-branded estates.', image: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&q=80', featured: true },
  { id: 2, title: 'Sustainable Luxury: Architecture Reimagined', category: 'Design', date: 'Sep 28, 2024', readTime: '5 min read', excerpt: 'How architects are blending high-end design with zero-emission technologies without compromising aesthetics.', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80', featured: false },
  { id: 3, title: 'Investing in Mayfair: 2025 Outlook', category: 'Investment', date: 'Sep 15, 2024', readTime: '8 min read', excerpt: 'A comprehensive analysis of property yields and development opportunities in London\'s most exclusive quarter.', image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80', featured: false },
  { id: 4, title: 'The Art of the Private Sale', category: 'Advisory', date: 'Aug 30, 2024', readTime: '4 min read', excerpt: 'Why discretion and off-market strategy consistently outperform traditional listing methods for ultra-luxury homes.', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80', featured: false },
  { id: 5, title: 'Global UHNWI Migration Trends', category: 'Market Insights', date: 'Aug 15, 2024', readTime: '7 min read', excerpt: 'Where are the world\'s wealthiest individuals relocating and what does it mean for prime property markets?', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80', featured: false },
];

const categories = ['All', 'Market Insights', 'Design', 'Investment', 'Advisory'];

export function BlogPage() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(heroRef.current,
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.3 }
    );
  }, []);

  const featured = posts.find(p => p.featured);
  const rest = posts.filter(p => !p.featured);

  return (
    <PageTransition>
      <div className="min-h-screen bg-primary text-white pt-32 pb-0">
        {/* Header */}
        <div ref={heroRef} className="container mx-auto px-6 max-w-7xl mb-16">
          <p className="font-bricolage uppercase tracking-widest text-accent text-sm mb-4">Curated Perspectives</p>
          <h1 className="font-tanklager text-6xl md:text-8xl tracking-tighter mb-6">Intelligence</h1>
          <p className="font-authentic text-secondary/70 text-xl max-w-2xl">
            Expert analysis on global real estate markets, design trends, and investment strategies.
          </p>
        </div>

        {/* Category Filter */}
        <div className="container mx-auto px-6 max-w-7xl mb-12">
          <div className="flex flex-wrap gap-3">
            {categories.map((c, i) => (
              <button key={c} className={`font-bricolage text-sm uppercase tracking-wider font-bold px-5 py-2 rounded-full border transition-all ${i === 0 ? 'bg-accent text-primary border-accent' : 'border-white/15 text-secondary/70 hover:border-white hover:text-white'}`}>{c}</button>
            ))}
          </div>
        </div>

        {/* Featured Post */}
        {featured && (
          <div className="container mx-auto px-6 max-w-7xl mb-16">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="group cursor-pointer grid md:grid-cols-2 gap-8 items-center bg-card rounded-sm overflow-hidden"
            >
              <div className="relative aspect-4/3 md:aspect-auto md:h-full min-h-[300px] overflow-hidden">
                <img src={featured.image} alt={featured.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="p-8 md:p-12">
                <div className="flex gap-4 font-bricolage text-xs font-bold uppercase tracking-widest text-accent mb-6">
                  <span>{featured.category}</span><span>•</span><span>{featured.readTime}</span>
                </div>
                <h2 className="font-getai text-3xl md:text-4xl mb-4 group-hover:text-accent transition-colors">{featured.title}</h2>
                <p className="font-authentic text-secondary/60 leading-relaxed mb-8">{featured.excerpt}</p>
                <button className="flex items-center gap-3 font-bricolage text-sm uppercase tracking-wider font-bold text-accent group/btn">
                  Read Article <ArrowRight size={16} className="group-hover/btn:translate-x-2 transition-transform" />
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Post Grid */}
        <div className="container mx-auto px-6 max-w-7xl pb-24">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {rest.map((post, i) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden aspect-4/3 rounded-sm mb-5 bg-card">
                  <img src={post.image} alt={post.title} loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="flex gap-3 font-bricolage text-xs font-bold uppercase tracking-widest text-secondary/40 mb-3">
                  <span>{post.category}</span><span>•</span><span>{post.readTime}</span>
                </div>
                <h3 className="font-getai text-xl leading-tight group-hover:text-accent transition-colors">{post.title}</h3>
              </motion.article>
            ))}
          </div>
        </div>

        <CTABanner />
      </div>
    </PageTransition>
  );
}

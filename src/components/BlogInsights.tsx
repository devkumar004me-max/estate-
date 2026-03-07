import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const posts = [
  {
    id: 1,
    title: 'The Rise of Branded Residences in London',
    category: 'Market Insights',
    date: 'Oct 12, 2024',
    excerpt: 'Exploring why ultra-high-net-worth individuals are shifting towards fully serviced, hospitality-branded estates.',
    image: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&q=80',
  },
  {
    id: 2,
    title: 'Architectural Digest: Sustainable Luxury',
    category: 'Design & Architecture',
    date: 'Sep 28, 2024',
    excerpt: 'How modern architects are blending high-end design with zero-emission technologies without compromising aesthetics.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80',
  },
  {
    id: 3,
    title: 'Investing in Mayfair: 2025 Outlook',
    category: 'Investment Strategy',
    date: 'Sep 15, 2024',
    excerpt: "A comprehensive analysis of property yields and development opportunities in London's most exclusive neighborhood.",
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80',
  },
];

export function BlogInsights() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const articleRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    gsap.fromTo(articleRefs.current,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
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
    <section ref={sectionRef} className="py-24 bg-[#E8E6E1] text-primary" id="insights">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div>
            <h2 className="font-getai text-5xl md:text-6xl mb-4 text-primary">Intelligence</h2>
            <p className="font-authentic text-lg text-primary/70 max-w-xl">
              Curated perspectives on global real estate trends, architectural innovations, and market forecasts.
            </p>
          </div>
          <button className="hidden md:flex items-center gap-3 font-bricolage font-bold tracking-wider uppercase text-sm border-b-2 border-primary pb-1 hover:text-accent hover:border-accent transition-colors">
            Read all articles <ArrowRight size={16} />
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((post, i) => (
            <article
              key={post.id}
              ref={(el) => { articleRefs.current[i] = el; }}
              className="group cursor-pointer opacity-0"
            >
              <div className="relative overflow-hidden aspect-4/3 rounded-sm mb-6 bg-white/50">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                  loading="lazy"
                />
              </div>
              <div className="flex gap-4 font-bricolage text-xs font-bold uppercase tracking-widest text-primary/50 mb-4">
                <span>{post.category}</span>
                <span>•</span>
                <span>{post.date}</span>
              </div>
              <h3 className="font-getai text-2xl leading-tight mb-3 group-hover:text-accent transition-colors">
                {post.title}
              </h3>
              <p className="font-authentic text-primary/70 text-sm leading-relaxed">
                {post.excerpt}
              </p>
            </article>
          ))}
        </div>

        <button className="md:hidden mt-12 w-full flex items-center justify-center gap-3 font-bricolage px-6 py-4 border border-primary text-primary font-bold tracking-wider uppercase rounded hover:bg-primary hover:text-secondary transition-colors">
          Read all articles
        </button>
      </div>
    </section>
  );
}

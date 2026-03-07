import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lenis from '@studio-freight/lenis';

interface Annotation {
  percent: number;
  label: string;
  sub: string;
  pos: React.CSSProperties;
}

interface Chapter {
  id: number;
  title: string;
  framesPath: string;
  framesCount: number;
  annotations: Annotation[];
}

const chapters: Chapter[] = [
  {
    id: 1,
    title: "CHAPTER 01 — ARRIVAL",
    framesPath: "/videos/tour1/frame",
    framesCount: 150,
    annotations: [
      { percent: 10, label: "PRIVATE POOL", sub: "Heated, 10×4m infinity edge", pos: { bottom: '20%', left: '10%' } },
      { percent: 25, label: "GLASS SLIDING DOORS", sub: "Triple-glazed, seamless threshold", pos: { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' } },
      { percent: 40, label: "OPEN PLAN LIVING", sub: "Double-height ceilings, oak floors", pos: { top: '40%', right: '10%' } },
      { percent: 55, label: "DINING TABLE", sub: "Solid walnut, seats twelve", pos: { top: '60%', left: '15%' } },
      { percent: 70, label: "SOFA & LOUNGE AREA", sub: "Italian linen, custom sectional", pos: { bottom: '30%', left: '50%', transform: 'translateX(-50%)' } },
      { percent: 85, label: "KITCHEN BEYOND", sub: "Marble islands, Gaggenau appliances", pos: { top: '30%', right: '15%' } }
    ]
  },
  {
    id: 2,
    title: "CHAPTER 02 — RETREAT",
    framesPath: "/videos/tour2/frame",
    framesCount: 180,
    annotations: [
      { percent: 10, label: "HALLWAY", sub: "Gallery lighting, minimal art", pos: { top: '50%', left: '10%' } },
      { percent: 30, label: "MASTER SUITE ENTRANCE", sub: "Oak pivot door, brushed brass handle", pos: { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' } },
      { percent: 50, label: "BED & HEADBOARD", sub: "Custom velvet, integrated lighting", pos: { top: '40%', right: '10%' } },
      { percent: 65, label: "FLOOR-TO-CEILING WARDROBE", sub: "Leather-lined drawers, soft-close", pos: { top: '60%', left: '10%' } },
      { percent: 80, label: "ENSUITE BATHROOM", sub: "Freestanding tub, rain shower", pos: { bottom: '30%', right: '10%' } }
    ]
  }
];

export const DemoTourPage: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);
  
  const imagesRef = useRef<HTMLImageElement[][]>([[], []]);

  const drawImageProp = useCallback((ctx: CanvasRenderingContext2D, img: HTMLImageElement, x: number, y: number, w: number, h: number) => {
    const iw = img.width;
    const ih = img.height;
    const r = Math.min(w / iw, h / ih);
    let nw = iw * r;
    let nh = ih * r;
    let ar = 1;

    if (nw < w) ar = w / nw;
    if (Math.abs(ar - 1) < 1e-14 && nh < h) ar = h / nh;
    nw *= ar;
    nh *= ar;

    const cw = iw / (nw / w);
    const ch = ih / (nh / h);
    const cx = (iw - cw) * 0.5;
    const cy = (ih - ch) * 0.5;

    ctx.drawImage(img, cx, cy, cw, ch, x, y, w, h);
  }, []);

  const renderFrame = useCallback(() => {
    if (!canvasRef.current || !isLoaded) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const currentChapter = chapters[currentChapterIndex];
    const frameIndex = Math.min(
      currentChapter.framesCount - 1,
      Math.floor(scrollProgress * currentChapter.framesCount)
    );

    const img = imagesRef.current[currentChapterIndex][frameIndex];
    if (img && img.complete) {
      drawImageProp(ctx, img, 0, 0, canvas.width, canvas.height);
    }
  }, [currentChapterIndex, scrollProgress, isLoaded, drawImageProp]);

  useEffect(() => {
    let loadedCount = 0;
    const totalFrames = chapters.reduce((acc, c) => acc + c.framesCount, 0);

    chapters.forEach((chapter, idx) => {
      for (let i = 1; i <= chapter.framesCount; i++) {
        const img = new Image();
        img.src = `${chapter.framesPath}${i.toString().padStart(3, '0')}.jpg`;
        img.onload = () => {
          loadedCount++;
          setLoadingProgress((loadedCount / totalFrames) * 100);
          if (loadedCount === totalFrames) {
            setIsLoaded(true);
          }
        };
        imagesRef.current[idx].push(img);
      }
    });
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    const lenis = new Lenis();
    const handleScroll = () => {
      const sectionId = `section-${currentChapterIndex + 1}`;
      const section = document.getElementById(sectionId);
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const scrollHeight = rect.height - window.innerHeight;
      const progress = Math.max(0, Math.min(1, -rect.top / scrollHeight));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      lenis.destroy();
    };
  }, [isLoaded, currentChapterIndex]);

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    renderFrame();
  }, [renderFrame]);

  const handleNext = () => {
    setIsFading(true);
    setTimeout(() => {
      setCurrentChapterIndex(1);
      setScrollProgress(0);
      window.scrollTo(0, 0);
      setIsFading(false);
    }, 800);
  };

  const handleBack = () => {
    setIsFading(true);
    setTimeout(() => {
      setCurrentChapterIndex(0);
      setScrollProgress(0);
      window.scrollTo(0, 0);
      setIsFading(false);
    }, 800);
  };

  return (
    <div className="relative bg-primary min-h-screen text-white overflow-x-hidden font-guess selection:bg-accent selection:text-primary">
      {/* Custom Crosshair */}
      <div 
        className="fixed w-5 h-5 border border-accent rounded-full pointer-events-none z-10000 mix-blend-difference hidden md:block"
        style={{ left: 'var(--cursor-x, 0px)', top: 'var(--cursor-y, 0px)', transform: 'translate(-50%, -50%)' }}
      />
      <script dangerouslySetInnerHTML={{ __html: `
        document.addEventListener('mousemove', (e) => {
          document.documentElement.style.setProperty('--cursor-x', e.clientX + 'px');
          document.documentElement.style.setProperty('--cursor-y', e.clientY + 'px');
        });
      `}} />

      {/* Loading Overlay */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-1000 bg-primary flex flex-col items-center justify-center"
          >
            <h1 className="font-guess text-2xl tracking-[0.2em] uppercase mb-5">Loading Tour</h1>
            <div className="w-48 h-px bg-white/10 relative">
              <motion.div 
                className="absolute left-0 top-0 h-full bg-accent"
                initial={{ width: 0 }}
                animate={{ width: `${loadingProgress}%` }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="md:hidden fixed top-0 left-0 w-full bg-accent text-primary text-center py-2 text-xs font-bold z-900">
        Best experienced on desktop
      </div>

      {/* Fade Overlay */}
      <div className={`fixed inset-0 bg-black z-500 pointer-events-none transition-opacity duration-800 ${isFading ? 'opacity-100' : 'opacity-0'}`} />

      {/* Canvas */}
      <div className="fixed inset-0 w-screen h-screen z-1 pointer-events-none">
        <canvas ref={canvasRef} className="w-full h-full object-cover" />
      </div>

      {/* UI Layer */}
      <div className="fixed inset-0 z-10 pointer-events-none">
        <motion.h2 
          key={currentChapterIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute top-24 left-10 md:left-24 font-guess text-lg md:text-xl tracking-[0.15em] uppercase"
        >
          {chapters[currentChapterIndex].title}
        </motion.h2>

        <div className="absolute inset-0">
          {chapters[currentChapterIndex].annotations.map((ann, idx) => {
            const isActive = Math.abs(scrollProgress - ann.percent / 100) < 0.05;
            return (
              <motion.div
                key={`${currentChapterIndex}-${idx}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 12 }}
                transition={{ duration: 0.6 }}
                style={ann.pos}
                className="absolute px-6 py-4 glass rounded-full border border-white/10"
              >
                <span className="block font-clash font-bold uppercase tracking-[0.25em] text-[10px] md:text-xs mb-1">{ann.label}</span>
                <span className="block font-clash italic text-[9px] md:text-[11px] text-secondary opacity-80">{ann.sub}</span>
              </motion.div>
            );
          })}
        </div>

        {/* Navigation Buttons */}
        {currentChapterIndex === 0 && scrollProgress > 0.6 && (
          <button 
            onClick={handleNext}
            className="absolute right-10 top-1/2 -translate-y-1/2 rotate-90 origin-right px-8 py-4 border border-accent text-accent uppercase tracking-widest text-xs hover:bg-accent hover:text-primary transition-all duration-400 pointer-events-auto"
          >
            Next &rarr; Bedroom
          </button>
        )}

        {currentChapterIndex === 1 && (
          <button 
            onClick={handleBack}
            className="absolute left-10 top-1/2 -translate-y-1/2 -rotate-90 origin-left px-8 py-4 border border-accent text-accent uppercase tracking-widest text-xs hover:bg-accent hover:text-primary transition-all duration-400 pointer-events-auto"
          >
            &larr; Back to Arrival
          </button>
        )}

        <div className="absolute bottom-10 left-10 right-10 md:left-24 md:right-24 h-px bg-white/10">
          <div 
            className="h-full bg-accent transition-all duration-100"
            style={{ width: `${scrollProgress * 100}%` }}
          />
        </div>
      </div>

      <main ref={containerRef}>
        <div id="section-1" className={`w-full ${currentChapterIndex === 0 ? 'h-[600vh]' : 'h-0 overflow-hidden'}`} />
        <div id="section-2" className={`w-full ${currentChapterIndex === 1 ? 'h-[600vh]' : 'h-0 overflow-hidden'}`} />
      </main>
    </div>
  );
};

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

import preloaderBg from '../assets/preloader-bg.jpg';

export function Preloader({ onComplete }: { onComplete?: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLHeadingElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setComplete(true);
      }
    });

    // Animate progress bar across screen
    tl.to(progressRef.current, {
      scaleX: 1,
      transformOrigin: 'left',
      duration: 1.5,
      ease: 'power3.inOut'
    })
    // Logo reveal upward
    .fromTo(logoRef.current, 
      { y: 50, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
      "-=0.5"
    )
    // Hold briefly
    .to({}, { duration: 0.5 })
    // Fade out preloader container
    .to(containerRef.current, {
      opacity: 0,
      duration: 0.8,
      ease: 'power2.inOut',
      onComplete: () => {
        setComplete(true);
        onComplete?.();
      }
    });

  }, []);

  if (complete) return null;

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[999] flex items-center justify-center text-white overflow-hidden bg-primary"
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat scale-110"
        style={{ backgroundImage: `url(${preloaderBg})` }}
      />
      {/* Dark Overlay */}
      <div className="absolute inset-0 z-1 bg-black/40 backdrop-blur-[2px]" />

      <div className="absolute top-0 left-0 w-full h-1 z-2">
        <div 
          ref={progressRef} 
          className="h-full bg-accent w-full scale-x-0 origin-left"
        />
      </div>
      <div className="overflow-hidden relative z-2">
        <h1 
          ref={logoRef}
          className="font-bricolage font-bold text-4xl md:text-6xl tracking-[0.2em] text-white"
        >
          DEV
        </h1>
      </div>
    </div>
  );
}

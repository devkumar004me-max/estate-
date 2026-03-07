import { useEffect, useRef } from 'react';

interface PixelCardProps {
  variant?: 'default' | 'pink' | 'blue' | 'yellow';
  gap?: number;
  speed?: number;
  colors?: string;
  noFocus?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const colorPresets = {
  default: ["#f5f3ef", "#c9a96e", "#1a1a1a"],
  pink: ["#ff00ff", "#ff66ff", "#000000"],
  blue: ["#00ffff", "#66ffff", "#000000"],
  yellow: ["#ffff00", "#ffff66", "#000000"]
};

class Pixel {
  x: number;
  y: number;
  size: number;
  color: string;
  originalOpacity: number;
  opacity: number;
  targetOpacity: number;

  constructor(x: number, y: number, size: number, colors: string[]) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.originalOpacity = Math.random() * 0.5;
    this.opacity = this.originalOpacity;
    this.targetOpacity = this.originalOpacity;
  }

  update() {
    if (Math.random() < 0.01) {
      this.targetOpacity = Math.random() * 0.8;
    }
    this.opacity += (this.targetOpacity - this.opacity) * 0.1;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.size, this.size);
  }
}

export function PixelCard({
  variant = 'default',
  gap = 5,
  speed = 35,
  colors,
  noFocus = false,
  className = "",
  children
}: PixelCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let grid: Pixel[] = [];
    let w = 0;
    let h = 0;

    const activeColors = colors ? colors.split(",") : colorPresets[variant];

    const init = () => {
      w = container.offsetWidth;
      h = container.offsetHeight;
      canvas.width = w;
      canvas.height = h;

      grid = [];
      const cellSize = gap + 2;
      for (let x = 0; x < w; x += cellSize) {
        for (let y = 0; y < h; y += cellSize) {
          grid.push(new Pixel(x, y, gap, activeColors));
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      grid.forEach(p => {
        p.update();
        p.draw(ctx);
      });
      // speed adjustment could go here but using simple rAF for now
      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    const handleResize = () => {
      init();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [variant, gap, speed, colors, noFocus]);

  return (
    <div 
      ref={containerRef} 
      className={`relative overflow-hidden ${className}`}
    >
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 pointer-events-none"
      />
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
}

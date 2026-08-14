import React, { useEffect, useRef } from 'react';
import { ChevronDown, Sparkles } from 'lucide-react';

export const HeroScene: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const isMobileDevice = width < 768;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particles (pollen / sunlight dust) - optimized count for phone GPUs
    const particleCount = isMobileDevice ? 20 : 60;
    const particles = Array.from({ length: particleCount }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2 + 0.5,
      alpha: Math.random() * 0.6 + 0.2,
      vx: (Math.random() - 0.5) * 0.4,
      vy: -Math.random() * 0.5 - 0.1,
    }));

    // Crop stalks - optimized count for phone GPUs
    const stalkCount = isMobileDevice ? 45 : 120;
    const stalks = Array.from({ length: stalkCount }).map((_, i) => ({
      x: (i / stalkCount) * width + (Math.random() * 20 - 10),
      height: Math.random() * 90 + 60,
      bend: 0,
      speed: Math.random() * 0.02 + 0.01,
      phase: Math.random() * Math.PI * 2,
    }));

    let time = 0;

    const render = () => {
      time += 0.015;

      const skyGradient = ctx.createLinearGradient(0, 0, 0, height);
      skyGradient.addColorStop(0, '#0E1F17');
      skyGradient.addColorStop(0.4, '#1A3326');
      skyGradient.addColorStop(0.65, '#413A28');
      skyGradient.addColorStop(0.8, '#8C6C38');
      skyGradient.addColorStop(1, '#211B14');

      ctx.fillStyle = skyGradient;
      ctx.fillRect(0, 0, width, height);

      const sunGradient = ctx.createRadialGradient(
        width * 0.7,
        height * 0.6,
        10,
        width * 0.7,
        height * 0.6,
        width * 0.4
      );
      sunGradient.addColorStop(0, 'rgba(244, 212, 139, 0.45)');
      sunGradient.addColorStop(0.4, 'rgba(231, 199, 124, 0.18)');
      sunGradient.addColorStop(1, 'rgba(16, 44, 32, 0)');

      ctx.fillStyle = sunGradient;
      ctx.fillRect(0, 0, width, height);

      // Distant Mountain Silhouettes
      ctx.fillStyle = 'rgba(16, 44, 32, 0.75)';
      ctx.beginPath();
      ctx.moveTo(0, height * 0.65);
      for (let x = 0; x <= width; x += 50) {
        const y = height * 0.65 - Math.sin(x * 0.003 + 1) * 60 - Math.cos(x * 0.008) * 35;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();
      ctx.fill();

      // Secondary Mountain Layer
      ctx.fillStyle = 'rgba(26, 42, 33, 0.9)';
      ctx.beginPath();
      ctx.moveTo(0, height * 0.72);
      for (let x = 0; x <= width; x += 40) {
        const y = height * 0.72 - Math.sin(x * 0.005 + 2) * 40 - Math.cos(x * 0.01) * 20;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();
      ctx.fill();

      // Foreground Wheat Stalks
      ctx.strokeStyle = '#E7C77C';
      ctx.lineWidth = 1.8;
      stalks.forEach((stalk) => {
        const currentBend = Math.sin(time * 1.5 + stalk.phase) * 15;
        const startY = height;
        const endY = height - stalk.height;
        const endX = stalk.x + currentBend;

        const stalkGrad = ctx.createLinearGradient(stalk.x, startY, endX, endY);
        stalkGrad.addColorStop(0, '#211B14');
        stalkGrad.addColorStop(0.5, '#819B63');
        stalkGrad.addColorStop(1, '#E7C77C');

        ctx.strokeStyle = stalkGrad;
        ctx.beginPath();
        ctx.moveTo(stalk.x, startY);
        ctx.quadraticCurveTo(stalk.x, startY - stalk.height * 0.5, endX, endY);
        ctx.stroke();

        ctx.fillStyle = '#E7C77C';
        ctx.beginPath();
        ctx.arc(endX, endY, 2.5, 0, Math.PI * 2);
        ctx.fill();
      });

      // Floating Particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.y < 0) p.y = height;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        ctx.fillStyle = `rgba(231, 199, 124, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const scrollToNext = () => {
    const el = document.getElementById('story');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative w-full h-screen overflow-hidden flex flex-col justify-between px-4 sm:px-8 lg:px-20 pt-20 pb-8 bg-grain">
      {/* Background Canvas Film Scene */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover z-0" />

      {/* Dark Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#102C20] via-transparent to-[#102C20]/70 z-10 pointer-events-none" />

      {/* Main Hero Content */}
      <div className="relative z-20 max-w-4xl text-left my-auto">
        {/* Badge */}
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#102C20]/80 border border-[#819B63]/40 text-[#E7C77C] text-[10px] sm:text-xs font-mono tracking-widest uppercase mb-4 sm:mb-6 backdrop-blur-md">
          <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#A9C77B]" />
          <span>Next-Gen Farming Intelligence</span>
        </div>

        {/* Ultra Responsive Title for Phones */}
        <h1 className="font-serif text-[42px] xs:text-5xl sm:text-8xl lg:text-[110px] font-extrabold tracking-tight text-[#F3F0E5] leading-[0.95] uppercase select-none drop-shadow-2xl">
          FARMER'S
          <span className="block italic font-normal text-[#E7C77C] font-serif text-3xl xs:text-4xl sm:text-7xl lg:text-[95px] tracking-normal mt-1">
            Paradise
          </span>
        </h1>

        {/* Tagline */}
        <p className="mt-3 sm:mt-6 text-sm xs:text-base sm:text-2xl font-light text-[#F3F0E5]/90 max-w-xl leading-relaxed tracking-wide font-sans border-l-2 border-[#A9C77B] pl-3 sm:pl-4">
          "Where better decisions grow better farms."
        </p>

        {/* Phone Friendly Stats Grid */}
        <div className="mt-5 sm:mt-8 grid grid-cols-2 xs:grid-cols-3 gap-3 sm:flex sm:items-center sm:gap-8 text-[11px] sm:text-xs tracking-wider font-mono text-[#F3F0E5]/70">
          <div className="p-2 sm:p-0 rounded-xl bg-[#102C20]/40 sm:bg-transparent border sm:border-0 border-[#819B63]/20">
            <span className="block text-base sm:text-lg font-bold text-[#A9C77B]">3.2M+</span>
            <span className="uppercase text-[9px] sm:text-[10px] text-[#819B63]">Acres Modeled</span>
          </div>
          <div className="p-2 sm:p-0 rounded-xl bg-[#102C20]/40 sm:bg-transparent border sm:border-0 border-[#819B63]/20">
            <span className="block text-base sm:text-lg font-bold text-[#E7C77C]">99.4%</span>
            <span className="uppercase text-[9px] sm:text-[10px] text-[#819B63]">Soil Accuracy</span>
          </div>
          <div className="col-span-2 xs:col-span-1 p-2 sm:p-0 rounded-xl bg-[#102C20]/40 sm:bg-transparent border sm:border-0 border-[#819B63]/20">
            <span className="block text-base sm:text-lg font-bold text-[#F3F0E5]">Zero Guesswork</span>
            <span className="uppercase text-[9px] sm:text-[10px] text-[#819B63]">Data-Driven Harvest</span>
          </div>
        </div>
      </div>

      {/* Phone Friendly Scroll Touch Hint */}
      <div
        onClick={scrollToNext}
        data-cursor="Scroll"
        className="relative z-20 mx-auto flex flex-col items-center cursor-pointer group pointer-events-auto pb-2"
      >
        <span className="text-[10px] sm:text-xs uppercase tracking-widest text-[#F3F0E5]/70 font-sans group-hover:text-[#E7C77C] transition-colors mb-1.5">
          Scroll to enter field ↓
        </span>
        <div className="w-6 h-9 sm:w-8 sm:h-12 rounded-full border border-[#F3F0E5]/30 flex items-start justify-center p-1 sm:p-2 group-hover:border-[#E7C77C] transition-colors">
          <div className="w-1 h-2 sm:w-1.5 sm:h-3 bg-[#E7C77C] rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
};

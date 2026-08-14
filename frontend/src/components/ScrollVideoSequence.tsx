import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Layers, ChevronLeft, ChevronRight, Play, Sparkles } from 'lucide-react';
import { useIsMobile } from '../hooks/useMediaQuery';

gsap.registerPlugin(ScrollTrigger);

interface ScrollVideoSequenceProps {
  videoSrc?: string;
}

export const ScrollVideoSequence: React.FC<ScrollVideoSequenceProps> = ({ videoSrc }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);
  const isMobile = useIsMobile();

  const phases = [
    '01 / Sunrise Horizon',
    '02 / Field Approach',
    '03 / Leaf Micro-Structure',
    '04 / Soil Strata & Moisture',
    '05 / AI Agronomy Matrix',
    '06 / Canopy Expansion',
    '07 / Aerial Paradise Panorama',
  ];

  const updatePhaseState = (p: number) => {
    setScrollProgress(p);
    const idx = Math.min(phases.length - 1, Math.floor(p * phases.length));
    setCurrentPhaseIndex(idx);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = canvasRef.current?.getContext('2d');

    // Phone vs Desktop ScrollTrigger Configuration
    const pinDistance = isMobile ? '+=120%' : '+=300%'; // Swift 1.2x on mobile phones, 3x on desktop
    const scrubSmoothness = isMobile ? 0.1 : 0.6;       // Near-instant response on touch screens

    const st = ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: pinDistance,
      pin: true,
      pinSpacing: true,
      anticipatePin: 1,
      scrub: scrubSmoothness,
      onUpdate: (self) => {
        const p = self.progress;
        updatePhaseState(p);

        if (videoRef.current && videoRef.current.duration) {
          videoRef.current.currentTime = videoRef.current.duration * p;
        }

        if (canvasRef.current && ctx) {
          renderCanvasFrame(ctx, canvasRef.current.width, canvasRef.current.height, p);
        }
      },
    });

    if (canvasRef.current) {
      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;
      if (ctx) renderCanvasFrame(ctx, window.innerWidth, window.innerHeight, 0);
    }

    const handleResize = () => {
      if (canvasRef.current && ctx) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        renderCanvasFrame(ctx, window.innerWidth, window.innerHeight, scrollProgress);
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      st.kill();
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobile]);

  // Touch Slider manual override for phone users
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    updatePhaseState(val);
    const ctx = canvasRef.current?.getContext('2d');
    if (canvasRef.current && ctx) {
      renderCanvasFrame(ctx, canvasRef.current.width, canvasRef.current.height, val);
    }
  };

  // Step button navigation for mobile phones
  const jumpPhase = (direction: 'next' | 'prev') => {
    let nextIdx = direction === 'next' ? currentPhaseIndex + 1 : currentPhaseIndex - 1;
    if (nextIdx < 0) nextIdx = 0;
    if (nextIdx >= phases.length) nextIdx = phases.length - 1;

    const targetProgress = nextIdx / (phases.length - 1);
    updatePhaseState(targetProgress);

    const ctx = canvasRef.current?.getContext('2d');
    if (canvasRef.current && ctx) {
      renderCanvasFrame(ctx, canvasRef.current.width, canvasRef.current.height, targetProgress);
    }
  };

  // High-performance procedural frame scrub engine
  const renderCanvasFrame = (
    ctx: CanvasRenderingContext2D,
    w: number,
    h: number,
    progress: number
  ) => {
    ctx.clearRect(0, 0, w, h);

    const zoom = 1 + progress * 1.6;
    const translateY = (progress - 0.5) * h * 0.35;

    ctx.save();
    ctx.translate(w / 2, h / 2);
    ctx.scale(zoom, zoom);
    ctx.translate(-w / 2, -h / 2 + translateY * 0.5);

    const skyGradient = ctx.createLinearGradient(0, 0, 0, h);
    if (progress < 0.4) {
      skyGradient.addColorStop(0, '#0E1F17');
      skyGradient.addColorStop(0.5, '#2A3F31');
      skyGradient.addColorStop(1, '#8C6C38');
    } else if (progress < 0.75) {
      skyGradient.addColorStop(0, '#102C20');
      skyGradient.addColorStop(0.6, '#211B14');
      skyGradient.addColorStop(1, '#15110D');
    } else {
      skyGradient.addColorStop(0, '#163B2B');
      skyGradient.addColorStop(0.5, '#264B38');
      skyGradient.addColorStop(1, '#1A291F');
    }
    ctx.fillStyle = skyGradient;
    ctx.fillRect(0, 0, w, h);

    const horizonY = h * 0.45;
    ctx.strokeStyle = `rgba(169, 199, 123, ${0.08 + progress * 0.1})`;
    ctx.lineWidth = 1;

    const meshStep = isMobile ? 80 : 60;
    for (let x = -w; x < w * 2; x += meshStep) {
      ctx.beginPath();
      ctx.moveTo(w / 2, horizonY);
      ctx.lineTo(x, h + 200);
      ctx.stroke();
    }

    const cropRows = isMobile ? 8 : 12;
    for (let r = 0; r < cropRows; r++) {
      const rowY = horizonY + (r / cropRows) * (h - horizonY);
      const rowAlpha = (r / cropRows) * (1 - progress * 0.3);

      ctx.fillStyle = progress > 0.7 ? '#A9C77B' : '#819B63';
      ctx.globalAlpha = rowAlpha;

      const cropsPerRow = isMobile ? 15 : 25;
      for (let c = 0; c < cropsPerRow; c++) {
        const cx = (c / cropsPerRow) * w * 1.4 - w * 0.2;
        const cropHeight = (r + 1) * (isMobile ? 4.5 : 6) * (1 + progress * 0.8);

        ctx.beginPath();
        ctx.ellipse(cx, rowY, cropHeight * 0.8, cropHeight, 0, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.globalAlpha = 1.0;

    if (progress > 0.35) {
      const soilAlpha = Math.min(1, (progress - 0.35) * 3);
      const soilY = h * 0.65;

      ctx.save();
      ctx.globalAlpha = soilAlpha;

      const soilGrad = ctx.createLinearGradient(0, soilY, 0, h);
      soilGrad.addColorStop(0, '#211B14');
      soilGrad.addColorStop(0.5, '#18130E');
      soilGrad.addColorStop(1, '#0C0A07');
      ctx.fillStyle = soilGrad;
      ctx.fillRect(0, soilY, w, h - soilY);

      ctx.strokeStyle = 'rgba(231, 199, 124, 0.4)';
      ctx.lineWidth = 1.5;
      const rootCount = isMobile ? 8 : 15;
      for (let i = 0; i < rootCount; i++) {
        const rootX = (i / rootCount) * w;
        ctx.beginPath();
        ctx.moveTo(rootX, soilY);
        ctx.quadraticCurveTo(
          rootX + (i % 2 === 0 ? 30 : -30),
          soilY + 80,
          rootX + (i % 2 === 0 ? -10 : 20),
          soilY + 180
        );
        ctx.stroke();
      }

      ctx.restore();
    }

    if (progress > 0.6) {
      const aiAlpha = Math.min(0.6, (progress - 0.6) * 2.5);
      ctx.save();
      ctx.globalAlpha = aiAlpha;
      ctx.strokeStyle = '#E7C77C';
      ctx.lineWidth = 0.8;

      const baseRadius = isMobile ? 80 : 120;
      ctx.beginPath();
      ctx.arc(w * 0.5, h * 0.45, baseRadius + progress * 40, 0, Math.PI * 2);
      ctx.stroke();

      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.arc(w * 0.5, h * 0.45, baseRadius + 50 + progress * 50, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.restore();
    }

    ctx.restore();
  };

  return (
    <div ref={containerRef} id="story-sequence" className="relative w-full h-screen overflow-hidden bg-[#102C20]">
      {/* HTML5 Video Replacement */}
      {videoSrc ? (
        <video
          ref={videoRef}
          src={videoSrc}
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
      ) : (
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover z-0" />
      )}

      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#102C20]/40 via-transparent to-[#102C20]/90 pointer-events-none z-10" />

      {/* Phase Badge */}
      <div className="absolute top-20 sm:top-28 left-4 sm:left-16 z-20 flex items-center space-x-2.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full editorial-glass text-[#E7C77C] text-[10px] sm:text-xs font-mono tracking-widest uppercase">
        <div className="w-2 h-2 rounded-full bg-[#A9C77B] animate-ping" />
        <span>{phases[currentPhaseIndex]}</span>
      </div>

      {/* Live Travel Progress Gauge */}
      <div className="absolute top-20 sm:top-28 right-4 sm:right-16 z-20 flex items-center space-x-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full editorial-glass text-[10px] sm:text-xs font-mono text-[#F3F0E5]/80">
        <Layers className="w-3.5 h-3.5 text-[#A9C77B]" />
        <span>{(scrollProgress * 100).toFixed(0)}%</span>
      </div>

      {/* DEDICATED PHONE TOUCH CONTROLLER BAR (Bottom of Canvas) */}
      <div className="absolute bottom-6 left-4 right-4 sm:left-1/2 sm:-translate-x-1/2 sm:w-[480px] z-30 p-3 sm:p-4 rounded-2xl sm:rounded-full editorial-glass border-[#E7C77C]/40 backdrop-blur-xl flex flex-col space-y-2">
        <div className="flex items-center justify-between text-[10px] sm:text-xs font-mono text-[#F3F0E5]/80">
          <button
            onClick={() => jumpPhase('prev')}
            disabled={currentPhaseIndex === 0}
            className="p-1 rounded-lg bg-[#211B14]/80 border border-[#819B63]/30 text-[#E7C77C] disabled:opacity-40 flex items-center space-x-1"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">Prev</span>
          </button>

          <span className="text-[#E7C77C] font-bold">
            Phase {currentPhaseIndex + 1} of {phases.length}
          </span>

          <button
            onClick={() => jumpPhase('next')}
            disabled={currentPhaseIndex === phases.length - 1}
            className="p-1 rounded-lg bg-[#211B14]/80 border border-[#819B63]/30 text-[#E7C77C] disabled:opacity-40 flex items-center space-x-1"
          >
            <span className="hidden xs:inline">Next</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Touch Slider Track for Phone Users */}
        <div className="flex items-center space-x-3">
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={scrollProgress}
            onChange={handleSliderChange}
            className="w-full h-1.5 bg-[#211B14] rounded-lg appearance-none cursor-pointer accent-[#E7C77C]"
          />
        </div>
      </div>
    </div>
  );
};

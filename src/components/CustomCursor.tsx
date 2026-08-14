import React, { useEffect, useState } from 'react';
import { useIsMobile } from '../hooks/useMediaQuery';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isMobile) return;

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      
      const clickable = target.closest('a, button, [data-cursor], input, select');
      if (clickable) {
        setIsHovered(true);
        const customText = clickable.getAttribute('data-cursor');
        if (customText) {
          setCursorText(customText);
        } else {
          setCursorText('');
        }
      } else {
        setIsHovered(false);
        setCursorText('');
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <>
      {/* Outer Cursor Ring */}
      <div
        className={`fixed top-0 left-0 pointer-events-none z-50 transition-transform duration-300 ease-out -translate-x-1/2 -translate-y-1/2 rounded-full border ${
          isHovered
            ? 'w-14 h-14 border-[#E7C77C] bg-[#E7C77C]/10 scale-110 backdrop-blur-[2px]'
            : 'w-8 h-8 border-[#A9C77B]/50 bg-transparent'
        }`}
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%)`,
        }}
      >
        {cursorText && (
          <span className="absolute inset-0 flex items-center justify-center text-[9px] uppercase tracking-widest font-semibold text-[#E7C77C] whitespace-nowrap">
            {cursorText}
          </span>
        )}
      </div>

      {/* Inner Dot */}
      <div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-[#E7C77C] rounded-full pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%)`,
        }}
      />
    </>
  );
};

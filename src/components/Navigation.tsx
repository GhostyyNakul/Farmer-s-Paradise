import React, { useState } from 'react';
import { useScrollProgress, CHAPTERS } from '../hooks/useScrollProgress';
import { Sprout, Compass, Menu, X, ChevronRight } from 'lucide-react';

export const Navigation: React.FC = () => {
  const { progress, activeChapter } = useScrollProgress();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top Sticky Nav */}
      <header className="fixed top-0 left-0 w-full z-40 px-4 sm:px-6 lg:px-12 py-4 sm:py-6 flex items-center justify-between pointer-events-none">
        {/* Logo */}
        <div className="pointer-events-auto flex items-center space-x-2.5 sm:space-x-3 group cursor-pointer" onClick={() => scrollToSection('hero')}>
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#211B14] border border-[#819B63]/30 flex items-center justify-center transition-transform duration-500 group-hover:scale-105 group-hover:border-[#E7C77C]">
            <Sprout className="w-4 h-4 sm:w-5 sm:h-5 text-[#A9C77B] group-hover:text-[#E7C77C] transition-colors" />
          </div>
          <div>
            <span className="font-serif tracking-wider text-base sm:text-lg lg:text-xl font-bold text-[#F3F0E5] block leading-none">
              FARMER'S PARADISE
            </span>
            <span className="text-[9px] sm:text-[10px] tracking-widest text-[#819B63] uppercase font-sans block mt-0.5 sm:mt-1">
              Precision Agriculture
            </span>
          </div>
        </div>

        {/* Center Chapter Progress indicator (Desktop) */}
        <div className="hidden md:flex items-center space-x-6 pointer-events-auto px-6 py-2.5 rounded-full editorial-glass">
          {CHAPTERS.map((chap) => {
            const isActive = chap.id === activeChapter.id;
            return (
              <button
                key={chap.id}
                onClick={() => scrollToSection(chap.id)}
                data-cursor="Jump"
                className={`text-xs tracking-wider transition-all duration-300 flex items-center space-x-1.5 ${
                  isActive
                    ? 'text-[#E7C77C] font-semibold scale-105'
                    : 'text-[#F3F0E5]/50 hover:text-[#F3F0E5]'
                }`}
              >
                <span className="text-[10px] opacity-60 font-mono">{chap.number}</span>
                <span>{chap.title}</span>
              </button>
            );
          })}
        </div>

        {/* Right Actions (CTA + Mobile Menu Button) */}
        <div className="pointer-events-auto flex items-center space-x-3">
          <button
            onClick={() => scrollToSection('ai')}
            data-cursor="Scan"
            className="px-3.5 py-2 sm:px-5 sm:py-2.5 text-[11px] sm:text-xs tracking-widest uppercase font-semibold text-[#102C20] bg-[#E7C77C] hover:bg-[#F4D48B] rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg shadow-[#E7C77C]/20 flex items-center space-x-1.5"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Enter Field</span>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-9 h-9 rounded-full bg-[#102C20]/90 border border-[#819B63]/40 text-[#F3F0E5] flex items-center justify-center backdrop-blur-md"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-[#E7C77C]" /> : <Menu className="w-5 h-5 text-[#A9C77B]" />}
          </button>
        </div>
      </header>

      {/* Dedicated Mobile Chapter Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#102C20]/98 backdrop-blur-2xl flex flex-col justify-between p-6 md:hidden animate-in fade-in duration-300">
          <div className="flex items-center justify-between border-b border-[#F3F0E5]/10 pb-4">
            <div className="flex items-center space-x-2 text-xs font-mono text-[#E7C77C]">
              <Sprout className="w-4 h-4 text-[#A9C77B]" />
              <span>CHAPTER DIRECTORY</span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="w-8 h-8 rounded-full bg-[#211B14] border border-[#F3F0E5]/20 text-[#F3F0E5] flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Chapter Links List */}
          <div className="my-auto space-y-3">
            {CHAPTERS.map((chap) => {
              const isActive = chap.id === activeChapter.id;
              return (
                <div
                  key={chap.id}
                  onClick={() => scrollToSection(chap.id)}
                  className={`p-3.5 rounded-2xl border flex items-center justify-between transition-all ${
                    isActive
                      ? 'bg-[#211B14] border-[#E7C77C] text-[#E7C77C]'
                      : 'bg-[#102C20] border-[#819B63]/20 text-[#F3F0E5]/80'
                  }`}
                >
                  <div className="flex items-center space-x-3 text-sm font-sans">
                    <span className="font-mono text-xs opacity-60">{chap.number}</span>
                    <span className="font-bold">{chap.title}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#819B63]" />
                </div>
              );
            })}
          </div>

          <div className="pt-4 border-t border-[#F3F0E5]/10 text-center text-xs font-mono text-[#819B63]">
            FARMER'S PARADISE • MOBILE EXPERIENTIAL VIEW
          </div>
        </div>
      )}

      {/* Global Top Thin Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-[3px] bg-[#211B14] z-50 pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-[#819B63] via-[#A9C77B] to-[#E7C77C] transition-all duration-150 ease-out"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
    </>
  );
};

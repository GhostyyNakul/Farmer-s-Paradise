import React, { useState } from 'react';
import { ArrowRight, Sparkles, Sprout, Sun } from 'lucide-react';

export const FinalScene: React.FC = () => {
  const [journeyStarted, setJourneyStarted] = useState(false);

  const scrollToHero = () => {
    const el = document.getElementById('hero');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="final" className="relative w-full min-h-screen bg-[#102C20] py-20 sm:py-32 px-4 sm:px-6 lg:px-16 flex flex-col justify-center items-center text-center bg-grain overflow-hidden">
      {/* Sunburst Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#102C20] via-[#1A3A2B] to-[#423725] pointer-events-none" />

      {/* Glowing Warm Sunlight Disc */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[700px] h-[350px] sm:h-[700px] bg-gradient-to-tr from-[#E7C77C]/20 via-[#A9C77B]/25 to-transparent rounded-full blur-[100px] sm:blur-[160px] pointer-events-none animate-pulse-slow" />

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        {/* Badge */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#102C20]/80 border border-[#E7C77C]/40 text-[#E7C77C] text-[10px] sm:text-xs font-mono tracking-widest uppercase mb-6 sm:mb-10 backdrop-blur-md">
          <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#E7C77C] animate-spin" style={{ animationDuration: '12s' }} />
          <span>The Thriving Farm Experience</span>
        </div>

        {/* Sequential Typography Statements */}
        <div className="space-y-2 sm:space-y-4 mb-6 sm:mb-10">
          <h3 className="font-serif text-2xl xs:text-3xl sm:text-5xl font-medium text-[#F3F0E5]/70 tracking-wide">
            Better information.
          </h3>
          <h3 className="font-serif text-3xl xs:text-4xl sm:text-6xl font-semibold text-[#A9C77B] tracking-wide">
            Better decisions.
          </h3>
          <h3 className="font-serif text-4xl xs:text-5xl sm:text-7xl font-bold text-[#E7C77C] tracking-wide">
            Better harvests.
          </h3>
        </div>

        {/* Grand Title Phone Scaled */}
        <div className="my-4 sm:my-6">
          <h1 className="font-serif text-[40px] xs:text-6xl sm:text-8xl lg:text-[110px] font-extrabold tracking-tight text-[#F3F0E5] leading-none uppercase drop-shadow-2xl">
            FARMER'S
            <span className="block italic font-normal text-[#E7C77C] font-serif text-3xl xs:text-5xl sm:text-7xl lg:text-[95px] tracking-normal mt-1">
              Paradise
            </span>
          </h1>

          <p className="mt-4 sm:mt-6 text-sm xs:text-lg sm:text-2xl font-light text-[#F3F0E5]/90 max-w-xl mx-auto font-sans leading-relaxed tracking-wide">
            "Where better decisions grow better farms."
          </p>
        </div>

        {/* Call To Action Buttons (Full-Width Touch Targets on Phones) */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto">
          <button
            onClick={() => setJourneyStarted(true)}
            data-cursor="Begin"
            className="w-full sm:w-auto px-8 py-4 sm:px-10 sm:py-5 rounded-full bg-[#E7C77C] text-[#102C20] font-sans font-bold text-xs sm:text-sm tracking-wider uppercase hover:bg-[#F4D48B] transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-[#E7C77C]/30 flex items-center justify-center space-x-2.5"
          >
            <span>{journeyStarted ? 'Welcome to Paradise' : 'Start your journey →'}</span>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          <button
            onClick={scrollToHero}
            data-cursor="Top"
            className="w-full sm:w-auto px-6 py-4 sm:px-8 sm:py-5 rounded-full editorial-glass text-[#F3F0E5] font-sans text-xs sm:text-sm tracking-wider uppercase hover:border-[#E7C77C] transition-all duration-300"
          >
            Replay Experience
          </button>
        </div>

        {/* Toast Notification on CTA */}
        {journeyStarted && (
          <div className="mt-6 sm:mt-8 p-4 sm:p-6 rounded-2xl sm:rounded-3xl editorial-glass border-[#E7C77C] text-xs font-mono text-[#E7C77C] max-w-md animate-bounce">
            <div className="flex items-center justify-center space-x-2 mb-1.5 font-bold text-xs sm:text-sm">
              <Sparkles className="w-4 h-4 text-[#E7C77C]" />
              <span>YOUR FARM IS READY</span>
            </div>
            <p className="text-[#F3F0E5]/80 font-sans text-[11px] sm:text-xs">
              Telemetry connected to Plot #38A. Your specialized agronomy report is being synchronized.
            </p>
          </div>
        )}

        {/* Footer Credits */}
        <footer className="mt-16 sm:mt-24 pt-6 sm:pt-8 border-t border-[#F3F0E5]/10 w-full flex flex-col sm:flex-row items-center justify-between text-[10px] sm:text-xs font-mono text-[#F3F0E5]/50 gap-3">
          <div className="flex items-center space-x-2">
            <Sprout className="w-3.5 h-3.5 text-[#A9C77B]" />
            <span>© 2026 FARMER'S PARADISE INC.</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="hover:text-[#E7C77C] cursor-pointer">PRIVACY</span>
            <span className="hover:text-[#E7C77C] cursor-pointer">SOIL API</span>
            <span className="hover:text-[#E7C77C] cursor-pointer">LABS</span>
          </div>
        </footer>
      </div>
    </section>
  );
};

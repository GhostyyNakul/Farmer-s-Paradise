import React, { useState } from 'react';
import { TestTube, Microscope, Cpu, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

export const SoilTesting: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps = [
    {
      id: 'sample',
      number: '01',
      title: 'SAMPLE COLLECTION',
      icon: TestTube,
      sub: 'Field Core Extract',
      desc: 'GPS-tagged core sample extracted from representative 12-point grid across your plot.',
      action: 'GPS Sealed Core',
      metric: 'Depth: 20cm'
    },
    {
      id: 'lab',
      number: '02',
      title: 'LAB TESTING',
      icon: Microscope,
      sub: 'Spectrometric Scan',
      desc: 'Near-Infrared (NIR) spectrometry and wet-chemistry analysis in ISO-certified lab facility.',
      action: 'Assay Complete',
      metric: '24hr Turnaround'
    },
    {
      id: 'analysis',
      number: '03',
      title: 'AI ANALYSIS',
      icon: Cpu,
      sub: 'Agronomic Matrix',
      desc: 'Cross-referencing soil chemistry with historical yield models, micro-climate weather, and market demand.',
      action: 'Model Calculated',
      metric: '99.4% Precision'
    },
    {
      id: 'recommendation',
      number: '04',
      title: 'CROP RECOMMENDATION',
      icon: Sparkles,
      sub: 'Precision Prescription',
      desc: 'Tailored seed selection, fertilizer recipe, and irrigation schedule mapped specifically to your land.',
      action: 'Recipe Generated',
      metric: 'Optimal Yield'
    }
  ];

  return (
    <section id="testing" className="relative w-full min-h-screen bg-[#102C20] py-16 sm:py-28 px-4 sm:px-6 lg:px-16 flex flex-col justify-between bg-grain overflow-hidden">
      {/* Ambient Sun Rays Overlay */}
      <div className="absolute top-0 right-1/4 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-[#E7C77C]/10 rounded-full blur-[120px] sm:blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="max-w-3xl mb-8 sm:mb-16">
          <span className="text-[10px] sm:text-xs font-mono tracking-widest text-[#A9C77B] uppercase block mb-2 sm:mb-3">
            Chapter 05 — Diagnostic Flow
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-7xl font-bold text-[#F3F0E5] leading-tight">
            Know your soil <br />
            <span className="italic font-normal text-[#E7C77C]">before you choose your crop.</span>
          </h2>
          <p className="mt-3 sm:mt-4 text-xs sm:text-base text-[#F3F0E5]/80 font-sans font-light">
            A seamless telemetry pipeline tracking your soil sample from field extraction to personalized harvest recipe.
          </p>
        </div>

        {/* Animated Journey Tracker (Desktop Horizontal / Phone Vertical Timeline) */}
        <div className="relative my-4 sm:my-8">
          {/* Desktop Connecting Pipeline Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-[2px] bg-[#819B63]/30 -translate-y-1/2 z-0">
            <div
              className="h-full bg-gradient-to-r from-[#819B63] via-[#A9C77B] to-[#E7C77C] transition-all duration-700 ease-out"
              style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
            />
          </div>

          {/* Step Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 relative z-10">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isActive = activeStep === idx;
              const isPast = activeStep > idx;

              return (
                <div
                  key={step.id}
                  onClick={() => setActiveStep(idx)}
                  data-cursor="Journey"
                  className={`p-5 sm:p-6 rounded-2xl sm:rounded-3xl border cursor-pointer transition-all duration-500 flex flex-col justify-between min-h-[220px] sm:min-h-[340px] ${
                    isActive
                      ? 'editorial-glass border-[#E7C77C] glow-gold scale-[1.01] sm:scale-105'
                      : isPast
                      ? 'bg-[#102C20]/90 border-[#A9C77B]/50'
                      : 'bg-[#102C20]/60 border-[#819B63]/20 hover:border-[#E7C77C]/40 opacity-80'
                  }`}
                >
                  <div>
                    {/* Step Top Header */}
                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                      <span className={`text-[10px] sm:text-xs font-mono font-bold ${isActive ? 'text-[#E7C77C]' : 'text-[#819B63]'}`}>
                        {step.number} // STAGE
                      </span>
                      <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl flex items-center justify-center border ${
                        isActive
                          ? 'bg-[#E7C77C]/20 border-[#E7C77C] text-[#E7C77C]'
                          : 'bg-[#211B14] border-[#819B63]/30 text-[#A9C77B]'
                      }`}>
                        <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                    </div>

                    <h3 className="font-serif text-lg sm:text-xl font-bold text-[#F3F0E5] leading-tight">
                      {step.title}
                    </h3>
                    <span className="text-[10px] sm:text-[11px] font-mono text-[#A9C77B] block mt-0.5 sm:mt-1">
                      {step.sub}
                    </span>

                    <p className="mt-2 sm:mt-4 text-xs font-sans text-[#F3F0E5]/75 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>

                  {/* Step Bottom Status */}
                  <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-[#F3F0E5]/10 flex items-center justify-between text-[11px] sm:text-xs font-mono">
                    <span className="text-[#E7C77C] font-semibold">{step.metric}</span>
                    <span className="text-[9px] sm:text-[10px] text-[#A9C77B] uppercase">{step.action}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Phone Controller */}
        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-between border-t border-[#819B63]/20 pt-4 sm:pt-6 gap-3">
          <div className="flex items-center space-x-2 text-[11px] sm:text-xs font-mono text-[#F3F0E5]/70">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#A9C77B]" />
            <span>Sample ID: #FP-9942-SOIL • Lab Certified</span>
          </div>

          <button
            onClick={() => setActiveStep((prev) => (prev + 1) % steps.length)}
            data-cursor="Next"
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#E7C77C] text-[#102C20] font-mono text-xs font-bold hover:bg-[#F4D48B] transition-all flex items-center justify-center space-x-2"
          >
            <span>Advance Step</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

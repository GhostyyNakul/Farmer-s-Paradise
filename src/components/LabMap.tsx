import React, { useState } from 'react';
import { SOIL_LABS, SoilLab } from '../data/labs';
import { MapPin, Navigation, Phone, ShieldCheck, Clock, Star, ArrowUpRight } from 'lucide-react';

export const LabMap: React.FC = () => {
  const [selectedLab, setSelectedLab] = useState<SoilLab>(SOIL_LABS[0]);

  return (
    <section id="labs" className="relative w-full min-h-screen bg-[#211B14] py-16 sm:py-28 px-4 sm:px-6 lg:px-16 flex flex-col justify-between bg-grain overflow-hidden">
      {/* Dark Earth Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#102C20] via-[#211B14] to-[#102C20] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] bg-[#E7C77C]/10 rounded-full blur-[120px] sm:blur-[160px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="max-w-3xl mb-8 sm:mb-12">
          <span className="text-[10px] sm:text-xs font-mono tracking-widest text-[#A9C77B] uppercase block mb-2 sm:mb-3">
            Chapter 07 — Precision Logistics
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-7xl font-bold text-[#F3F0E5] leading-tight">
            Certified Laboratories <br />
            <span className="italic font-normal text-[#E7C77C]">in your micro-region.</span>
          </h2>
          <p className="mt-3 sm:mt-4 text-xs sm:text-base text-[#F3F0E5]/80 font-sans font-light">
            Directly connected to accredited Spectrometry and Microbiome laboratories for rapid core sample analysis.
          </p>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          
          {/* LEFT: Stylized Dark Vector Map Visualizer */}
          <div className="lg:col-span-7 editorial-glass-dark rounded-2xl sm:rounded-3xl p-4 sm:p-8 relative min-h-[360px] sm:min-h-[460px] overflow-hidden flex flex-col justify-between">
            
            {/* Custom Vector Map Canvas Mesh */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-40">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#819B63" strokeWidth="0.5" strokeOpacity="0.2" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />

              <path d="M -100 200 Q 200 100 500 300 T 1100 250" fill="none" stroke="#819B63" strokeWidth="1" strokeDasharray="3 3" opacity="0.3" />

              <path
                d="M 120 180 L 250 80"
                fill="none"
                stroke="#E7C77C"
                strokeWidth="2"
                strokeDasharray="6 6"
                className="animate-pulse"
              />
            </svg>

            {/* Map Header HUD */}
            <div className="relative z-10 flex items-center justify-between border-b border-[#F3F0E5]/10 pb-3">
              <div className="flex items-center space-x-1.5 text-[11px] sm:text-xs font-mono text-[#E7C77C]">
                <Navigation className="w-3.5 h-3.5 text-[#A9C77B]" />
                <span>SOIL LAB NETWORK</span>
              </div>
              <div className="px-2.5 py-0.5 rounded-full bg-[#102C20] border border-[#A9C77B]/40 text-[9px] sm:text-[10px] font-mono text-[#A9C77B]">
                3 Labs Active
              </div>
            </div>

            {/* Vector Map Points */}
            <div className="relative z-10 my-auto h-52 sm:h-72 w-full">
              {/* Point 0: User Farm Location Pin */}
              <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer">
                <div className="relative flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-[#A9C77B]/20 animate-ping absolute" />
                  <div className="w-7 h-7 rounded-full bg-[#A9C77B] text-[#102C20] flex items-center justify-center font-bold text-xs shadow-lg shadow-[#A9C77B]/30">
                    <MapPin className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div className="mt-1.5 px-2.5 py-0.5 rounded-full bg-[#102C20]/90 border border-[#A9C77B] text-[9px] sm:text-[10px] font-mono text-[#F3F0E5]">
                  Your Farm (Plot #38A)
                </div>
              </div>

              {/* Point 1: Lab 1 Pin */}
              <div
                onClick={() => setSelectedLab(SOIL_LABS[0])}
                data-cursor="Lab"
                className="absolute top-8 right-1/4 flex flex-col items-center group cursor-pointer"
              >
                <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center transition-all ${
                  selectedLab.id === SOIL_LABS[0].id ? 'bg-[#E7C77C] text-[#102C20] scale-125 glow-gold' : 'bg-[#211B14] border border-[#E7C77C] text-[#E7C77C]'
                }`}>
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
                <div className="mt-1 px-2 py-0.5 rounded bg-[#102C20]/90 text-[9px] font-mono text-[#E7C77C]">
                  {SOIL_LABS[0].name.split(' ')[0]} (4.2 km)
                </div>
              </div>
            </div>

            {/* Map Bottom Controls */}
            <div className="relative z-10 pt-3 border-t border-[#F3F0E5]/10 flex items-center justify-between text-[10px] sm:text-xs font-mono text-[#F3F0E5]/70">
              <span>LAT: 34.0522° N • LNG: -118.2437° W</span>
              <span className="text-[#E7C77C]">Courier Available</span>
            </div>
          </div>

          {/* RIGHT: Lab Information Cards */}
          <div className="lg:col-span-5 space-y-3 sm:space-y-4">
            {SOIL_LABS.map((lab) => {
              const isSelected = selectedLab.id === lab.id;
              return (
                <div
                  key={lab.id}
                  onClick={() => setSelectedLab(lab)}
                  data-cursor="Inspect"
                  className={`p-4 sm:p-6 rounded-2xl sm:rounded-3xl border cursor-pointer transition-all duration-500 ${
                    isSelected
                      ? 'editorial-glass border-[#E7C77C] glow-gold scale-[1.01]'
                      : 'bg-[#102C20]/60 border-[#819B63]/20 hover:border-[#E7C77C]/40 opacity-80'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span className="text-[9px] sm:text-[10px] font-mono text-[#A9C77B] block uppercase">
                        {lab.location}
                      </span>
                      <h3 className="font-serif text-lg sm:text-xl font-bold text-[#F3F0E5] mt-0.5">
                        {lab.name}
                      </h3>
                    </div>
                    <div className="flex items-center space-x-1 text-xs font-mono text-[#E7C77C]">
                      <Star className="w-3.5 h-3.5 fill-[#E7C77C]" />
                      <span>{lab.rating}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 text-[11px] sm:text-xs font-mono text-[#F3F0E5]/80 my-2.5">
                    <span className="flex items-center space-x-1">
                      <Navigation className="w-3.5 h-3.5 text-[#A9C77B]" />
                      <span>{lab.distanceKm} km away</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5 text-[#E7C77C]" />
                      <span>{lab.turnaroundTime}</span>
                    </span>
                  </div>

                  {/* Services Pill List */}
                  <div className="flex flex-wrap gap-1.5 mt-2.5">
                    {lab.services.map((srv) => (
                      <span
                        key={srv}
                        className="px-2 py-0.5 rounded-full bg-[#211B14] border border-[#819B63]/30 text-[9px] sm:text-[10px] font-mono text-[#F3F0E5]/70"
                      >
                        {srv}
                      </span>
                    ))}
                  </div>

                  {isSelected && (
                    <div className="mt-4 pt-3 border-t border-[#F3F0E5]/10 flex items-center justify-between">
                      <div className="flex items-center space-x-1.5 text-xs font-mono text-[#E7C77C]">
                        <Phone className="w-3.5 h-3.5" />
                        <span>{lab.phone}</span>
                      </div>
                      <button
                        data-cursor="Book"
                        className="px-3.5 py-1.5 rounded-full bg-[#E7C77C] text-[#102C20] font-mono text-[10px] font-bold hover:bg-[#F4D48B] transition-colors flex items-center space-x-1"
                      >
                        <span>Pickup</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};

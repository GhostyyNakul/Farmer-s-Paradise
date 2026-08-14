import React, { useState } from 'react';
import { CloudSun, Sprout, Layers, ArrowUpRight, Activity } from 'lucide-react';

export const EveryFieldStory: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'soil' | 'crop' | 'weather'>('crop');

  return (
    <section id="story" className="relative w-full min-h-screen bg-[#102C20] text-[#F3F0E5] py-16 sm:py-24 px-4 sm:px-6 lg:px-16 flex flex-col justify-between bg-grain overflow-hidden">
      {/* Ambient Glow Behind Section */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] bg-[#A9C77B]/10 rounded-full blur-[100px] sm:blur-[140px] pointer-events-none" />

      {/* Top Section Header */}
      <div className="relative z-10 max-w-3xl">
        <span className="text-[10px] sm:text-xs font-mono tracking-widest text-[#A9C77B] uppercase block mb-2 sm:mb-3">
          Chapter 02 — Environmental Decoding
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-[#F3F0E5] leading-tight">
          Every field <br />
          <span className="italic font-normal text-[#E7C77C]">tells a story.</span>
        </h2>
        <p className="mt-3 sm:mt-4 text-sm sm:text-base lg:text-lg text-[#F3F0E5]/80 max-w-xl font-sans font-light leading-relaxed">
          Technology doesn't replace nature — it reveals the complex dialogue occurring across your soil, crops, and atmosphere in real time.
        </p>
      </div>

      {/* DESKTOP Spatial Interactive Farm Node Visualization (Hidden on Mobile) */}
      <div className="hidden md:flex relative z-10 my-12 w-full h-[520px] rounded-3xl editorial-glass p-6 lg:p-10 flex-col justify-between overflow-hidden">
        {/* SVG Vector Connecting Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
          <defs>
            <linearGradient id="lineGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E7C77C" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#819B63" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          <path
            d="M 200 120 C 350 120, 400 280, 650 280"
            fill="none"
            stroke="url(#lineGrad1)"
            strokeWidth="1.5"
            strokeDasharray="6 6"
            className="animate-pulse"
          />
        </svg>

        {/* Spatial Node 1: WEATHER */}
        <div
          onClick={() => setActiveTab('weather')}
          data-cursor="Weather"
          className={`absolute top-10 left-8 lg:left-24 z-20 p-5 rounded-2xl cursor-pointer transition-all duration-500 border ${
            activeTab === 'weather'
              ? 'editorial-glass border-[#E7C77C] glow-gold scale-105'
              : 'bg-[#102C20]/80 border-[#819B63]/30 hover:border-[#E7C77C]/60'
          }`}
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-[#E7C77C]/20 border border-[#E7C77C]/40 flex items-center justify-center">
              <CloudSun className="w-5 h-5 text-[#E7C77C]" />
            </div>
            <div>
              <span className="text-[10px] font-mono tracking-widest text-[#E7C77C] uppercase block">
                ATMOSPHERE NODE
              </span>
              <h4 className="font-serif text-lg font-bold text-[#F3F0E5]">WEATHER & CLIMATE</h4>
            </div>
          </div>
          {activeTab === 'weather' && (
            <div className="mt-4 pt-3 border-t border-[#F3F0E5]/10 text-xs text-[#F3F0E5]/80 space-y-1 font-sans">
              <div className="flex justify-between">
                <span>Solar Radiation:</span>
                <span className="font-mono text-[#E7C77C]">850 W/m²</span>
              </div>
              <div className="flex justify-between">
                <span>Vapor Pressure Deficit:</span>
                <span className="font-mono text-[#A9C77B]">1.2 kPa</span>
              </div>
              <div className="flex justify-between">
                <span>Microclimate Temp:</span>
                <span className="font-mono text-[#F3F0E5]">24.5°C</span>
              </div>
            </div>
          )}
        </div>

        {/* Spatial Node 2: CROP */}
        <div
          onClick={() => setActiveTab('crop')}
          data-cursor="Crop"
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 p-5 rounded-2xl cursor-pointer transition-all duration-500 border ${
            activeTab === 'crop'
              ? 'editorial-glass border-[#A9C77B] glow-green scale-105'
              : 'bg-[#102C20]/80 border-[#819B63]/30 hover:border-[#A9C77B]/60'
          }`}
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-[#A9C77B]/20 border border-[#A9C77B]/40 flex items-center justify-center">
              <Sprout className="w-5 h-5 text-[#A9C77B]" />
            </div>
            <div>
              <span className="text-[10px] font-mono tracking-widest text-[#A9C77B] uppercase block">
                CANOPY NODE
              </span>
              <h4 className="font-serif text-lg font-bold text-[#F3F0E5]">CROP PHYSIOLOGY</h4>
            </div>
          </div>
          {activeTab === 'crop' && (
            <div className="mt-4 pt-3 border-t border-[#F3F0E5]/10 text-xs text-[#F3F0E5]/80 space-y-1 font-sans">
              <div className="flex justify-between">
                <span>NDVI Vegetation Index:</span>
                <span className="font-mono text-[#A9C77B]">0.84 (Healthy)</span>
              </div>
              <div className="flex justify-between">
                <span>Chlorophyll Density:</span>
                <span className="font-mono text-[#E7C77C]">48.2 μg/cm²</span>
              </div>
              <div className="flex justify-between">
                <span>Stomatal Conductance:</span>
                <span className="font-mono text-[#F3F0E5]">Optimal</span>
              </div>
            </div>
          )}
        </div>

        {/* Spatial Node 3: SOIL */}
        <div
          onClick={() => setActiveTab('soil')}
          data-cursor="Soil"
          className={`absolute bottom-8 right-8 lg:right-24 z-20 p-5 rounded-2xl cursor-pointer transition-all duration-500 border ${
            activeTab === 'soil'
              ? 'editorial-glass border-[#E7C77C] glow-gold scale-105'
              : 'bg-[#102C20]/80 border-[#819B63]/30 hover:border-[#E7C77C]/60'
          }`}
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-[#211B14] border border-[#819B63]/40 flex items-center justify-center">
              <Layers className="w-5 h-5 text-[#E7C77C]" />
            </div>
            <div>
              <span className="text-[10px] font-mono tracking-widest text-[#819B63] uppercase block">
                RHIZOSPHERE NODE
              </span>
              <h4 className="font-serif text-lg font-bold text-[#F3F0E5]">SOIL CHEMISTRY</h4>
            </div>
          </div>
          {activeTab === 'soil' && (
            <div className="mt-4 pt-3 border-t border-[#F3F0E5]/10 text-xs text-[#F3F0E5]/80 space-y-1 font-sans">
              <div className="flex justify-between">
                <span>Root Zone pH:</span>
                <span className="font-mono text-[#E7C77C]">6.6 (Balanced)</span>
              </div>
              <div className="flex justify-between">
                <span>Volumetric Water:</span>
                <span className="font-mono text-[#A9C77B]">27.8%</span>
              </div>
              <div className="flex justify-between">
                <span>Organic Carbon:</span>
                <span className="font-mono text-[#F3F0E5]">1.45%</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* MOBILE Dedicated Touch Stack (Shown on Mobile) */}
      <div className="md:hidden my-8 space-y-4 relative z-10">
        {/* Mobile Node Switchers */}
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => setActiveTab('weather')}
            className={`py-2 px-3 rounded-xl border text-xs font-mono transition-all ${
              activeTab === 'weather' ? 'bg-[#211B14] border-[#E7C77C] text-[#E7C77C]' : 'bg-[#102C20] border-[#819B63]/30 text-[#F3F0E5]/60'
            }`}
          >
            WEATHER
          </button>
          <button
            onClick={() => setActiveTab('crop')}
            className={`py-2 px-3 rounded-xl border text-xs font-mono transition-all ${
              activeTab === 'crop' ? 'bg-[#211B14] border-[#A9C77B] text-[#A9C77B]' : 'bg-[#102C20] border-[#819B63]/30 text-[#F3F0E5]/60'
            }`}
          >
            CROP
          </button>
          <button
            onClick={() => setActiveTab('soil')}
            className={`py-2 px-3 rounded-xl border text-xs font-mono transition-all ${
              activeTab === 'soil' ? 'bg-[#211B14] border-[#E7C77C] text-[#E7C77C]' : 'bg-[#102C20] border-[#819B63]/30 text-[#F3F0E5]/60'
            }`}
          >
            SOIL
          </button>
        </div>

        {/* Mobile Selected Node Display Card */}
        <div className="p-5 rounded-2xl editorial-glass border-[#E7C77C]">
          {activeTab === 'weather' && (
            <div>
              <div className="flex items-center space-x-3 mb-3">
                <CloudSun className="w-6 h-6 text-[#E7C77C]" />
                <h4 className="font-serif text-lg font-bold text-[#F3F0E5]">WEATHER & CLIMATE</h4>
              </div>
              <div className="space-y-2 text-xs font-sans text-[#F3F0E5]/80 pt-2 border-t border-[#F3F0E5]/10">
                <div className="flex justify-between"><span>Solar Radiation:</span><span className="font-mono text-[#E7C77C]">850 W/m²</span></div>
                <div className="flex justify-between"><span>Vapor Deficit:</span><span className="font-mono text-[#A9C77B]">1.2 kPa</span></div>
                <div className="flex justify-between"><span>Temp:</span><span className="font-mono text-[#F3F0E5]">24.5°C</span></div>
              </div>
            </div>
          )}

          {activeTab === 'crop' && (
            <div>
              <div className="flex items-center space-x-3 mb-3">
                <Sprout className="w-6 h-6 text-[#A9C77B]" />
                <h4 className="font-serif text-lg font-bold text-[#F3F0E5]">CROP PHYSIOLOGY</h4>
              </div>
              <div className="space-y-2 text-xs font-sans text-[#F3F0E5]/80 pt-2 border-t border-[#F3F0E5]/10">
                <div className="flex justify-between"><span>NDVI Index:</span><span className="font-mono text-[#A9C77B]">0.84 (Healthy)</span></div>
                <div className="flex justify-between"><span>Chlorophyll:</span><span className="font-mono text-[#E7C77C]">48.2 μg/cm²</span></div>
                <div className="flex justify-between"><span>Conductance:</span><span className="font-mono text-[#F3F0E5]">Optimal</span></div>
              </div>
            </div>
          )}

          {activeTab === 'soil' && (
            <div>
              <div className="flex items-center space-x-3 mb-3">
                <Layers className="w-6 h-6 text-[#E7C77C]" />
                <h4 className="font-serif text-lg font-bold text-[#F3F0E5]">SOIL CHEMISTRY</h4>
              </div>
              <div className="space-y-2 text-xs font-sans text-[#F3F0E5]/80 pt-2 border-t border-[#F3F0E5]/10">
                <div className="flex justify-between"><span>Root Zone pH:</span><span className="font-mono text-[#E7C77C]">6.6 (Balanced)</span></div>
                <div className="flex justify-between"><span>Volumetric Water:</span><span className="font-mono text-[#A9C77B]">27.8%</span></div>
                <div className="flex justify-between"><span>Organic Carbon:</span><span className="font-mono text-[#F3F0E5]">1.45%</span></div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Narrative Bar */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between border-t border-[#819B63]/20 pt-6 text-[11px] sm:text-xs text-[#F3F0E5]/70 font-mono">
        <div className="flex items-center space-x-2">
          <Activity className="w-4 h-4 text-[#A9C77B]" />
          <span>Real-time telemetry linked via satellite & field sensors</span>
        </div>
        <div className="mt-3 md:mt-0 flex items-center space-x-2 text-[#E7C77C]">
          <span>Explore AI Diagnostic System</span>
          <ArrowUpRight className="w-4 h-4" />
        </div>
      </div>
    </section>
  );
};

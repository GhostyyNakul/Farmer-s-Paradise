import React, { useState } from 'react';
import { CROPS, CropData } from '../data/crops';
import { Sprout, Droplets, Calendar, Award, ChevronRight } from 'lucide-react';

export const CropRecommendations: React.FC = () => {
  const [selectedCrop, setSelectedCrop] = useState<CropData>(CROPS[0]);

  return (
    <section id="crops" className="relative w-full min-h-screen bg-[#102C20] py-16 sm:py-28 px-4 sm:px-6 lg:px-16 flex flex-col justify-between bg-grain overflow-hidden">
      {/* Dark Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#211B14] via-[#102C20] to-[#102C20] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-72 sm:w-96 h-72 sm:h-96 bg-[#A9C77B]/10 rounded-full blur-[100px] sm:blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="max-w-3xl mb-8 sm:mb-12">
          <span className="text-[10px] sm:text-xs font-mono tracking-widest text-[#E7C77C] uppercase block mb-2 sm:mb-3">
            Chapter 06 — Algorithmic Match
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-7xl font-bold text-[#F3F0E5] leading-tight">
            Precision Crop <br />
            <span className="italic font-normal text-[#A9C77B]">Recommendation Engine.</span>
          </h2>
          <p className="mt-3 sm:mt-4 text-xs sm:text-base text-[#F3F0E5]/80 font-sans font-light">
            Formula: <span className="font-mono text-[#E7C77C]">Soil Chemistry</span> + <span className="font-mono text-[#A9C77B]">Microclimate</span> + <span className="font-mono text-[#F3F0E5]">Market Vector</span> = Optimal Crop Suitability.
          </p>
        </div>

        {/* Formula Banner (Mobile Phone Optimized) */}
        <div className="mb-6 sm:mb-12 p-4 sm:p-6 rounded-2xl editorial-glass flex flex-wrap items-center justify-between text-[11px] sm:text-xs font-mono gap-2 sm:gap-4">
          <div className="flex items-center space-x-1.5 text-[#E7C77C]">
            <span className="w-2 h-2 rounded-full bg-[#E7C77C]" />
            <span>SOIL: Clay Loam (pH 6.6)</span>
          </div>
          <span className="text-[#819B63] hidden xs:inline">+</span>
          <div className="flex items-center space-x-1.5 text-[#A9C77B]">
            <span className="w-2 h-2 rounded-full bg-[#A9C77B]" />
            <span>WEATHER: Autumn Dawn</span>
          </div>
          <span className="text-[#819B63] hidden sm:inline">+</span>
          <div className="px-3 py-1 rounded-full bg-[#E7C77C]/20 border border-[#E7C77C] text-[#E7C77C] font-bold">
            MATCH: {selectedCrop.name}
          </div>
        </div>

        {/* Main Cards & Hero Inspection View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          
          {/* LEFT: Crop Selector Cards */}
          <div className="lg:col-span-5 space-y-3 sm:space-y-4">
            {CROPS.map((crop) => {
              const isSelected = selectedCrop.id === crop.id;
              return (
                <div
                  key={crop.id}
                  onClick={() => setSelectedCrop(crop)}
                  data-cursor="Select"
                  className={`p-4 sm:p-6 rounded-2xl sm:rounded-3xl border cursor-pointer transition-all duration-500 relative overflow-hidden ${
                    isSelected
                      ? 'editorial-glass border-[#E7C77C] glow-gold scale-[1.01] sm:scale-[1.02]'
                      : 'bg-[#211B14]/60 border-[#819B63]/20 hover:border-[#E7C77C]/50 opacity-85'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2 sm:mb-3">
                    <div>
                      <span className="text-[9px] sm:text-[10px] font-mono text-[#819B63] uppercase block">
                        {crop.scientificName}
                      </span>
                      <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#F3F0E5] mt-0.5">
                        {crop.name}
                      </h3>
                    </div>
                    {/* Suitability % Badge */}
                    <div className="px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-[#E7C77C]/20 border border-[#E7C77C] text-[#E7C77C] font-mono font-bold text-xs sm:text-sm">
                      {crop.suitability}% Match
                    </div>
                  </div>

                  <p className="text-xs text-[#F3F0E5]/70 font-sans line-clamp-2">
                    {crop.description}
                  </p>

                  <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-[#F3F0E5]/10 flex items-center justify-between text-[11px] sm:text-xs font-mono text-[#A9C77B]">
                    <span>Yield: {crop.expectedYield}</span>
                    <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? 'rotate-90 text-[#E7C77C]' : ''}`} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* RIGHT: Selected Crop Spotlight */}
          <div className="lg:col-span-7 editorial-glass rounded-2xl sm:rounded-3xl p-5 sm:p-8 flex flex-col justify-between relative overflow-hidden">
            {/* Background Image Preview */}
            <div className="absolute inset-0 z-0">
              <img
                src={selectedCrop.imageUrl}
                alt={selectedCrop.name}
                className="w-full h-full object-cover opacity-25 transition-all duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#102C20] via-[#102C20]/80 to-[#102C20]/40" />
            </div>

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4 border-b border-[#F3F0E5]/10 pb-3">
                <div className="flex items-center space-x-1.5 text-[11px] sm:text-xs font-mono text-[#E7C77C]">
                  <Award className="w-4 h-4 text-[#E7C77C]" />
                  <span>HARVEST MATCH SPOTLIGHT</span>
                </div>
                <span className="text-[10px] sm:text-xs font-mono text-[#A9C77B]">IDEAL pH: {selectedCrop.idealPh}</span>
              </div>

              <h3 className="font-serif text-2xl sm:text-4xl font-bold text-[#F3F0E5] mb-1 sm:mb-2">
                {selectedCrop.name}
              </h3>
              <p className="text-[11px] sm:text-xs font-mono text-[#A9C77B] mb-3 sm:mb-4">{selectedCrop.scientificName}</p>

              <p className="text-xs sm:text-sm font-sans text-[#F3F0E5]/85 leading-relaxed mb-4 sm:mb-6">
                {selectedCrop.description}
              </p>

              {/* Spec Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono text-xs">
                <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-[#211B14]/80 border border-[#819B63]/30">
                  <div className="flex items-center space-x-1.5 text-[#819B63] mb-1">
                    <Droplets className="w-3.5 h-3.5" />
                    <span className="text-[9px] sm:text-[10px]">WATER NEED</span>
                  </div>
                  <span className="font-bold text-[#F3F0E5] text-xs sm:text-sm">{selectedCrop.waterRequirement}</span>
                </div>

                <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-[#211B14]/80 border border-[#819B63]/30">
                  <div className="flex items-center space-x-1.5 text-[#819B63] mb-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span className="text-[9px] sm:text-[10px]">GROWING CYCLE</span>
                  </div>
                  <span className="font-bold text-[#E7C77C] text-xs sm:text-sm">{selectedCrop.growingPeriod}</span>
                </div>

                <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-[#211B14]/80 border border-[#819B63]/30 col-span-2 sm:col-span-1">
                  <div className="flex items-center space-x-1.5 text-[#819B63] mb-1">
                    <Sprout className="w-3.5 h-3.5" />
                    <span className="text-[9px] sm:text-[10px]">ESTIMATED YIELD</span>
                  </div>
                  <span className="font-bold text-[#A9C77B] text-xs sm:text-sm">{selectedCrop.expectedYield}</span>
                </div>
              </div>
            </div>

            <div className="relative z-10 mt-6 sm:mt-8 border-t border-[#F3F0E5]/10 pt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-[11px] sm:text-xs font-mono text-[#F3F0E5]/70">
                Soil: {selectedCrop.soilCompatibility}
              </span>
              <button
                data-cursor="Plant"
                className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#A9C77B] text-[#102C20] font-mono text-xs font-bold hover:bg-[#BCE08A] transition-colors text-center"
              >
                Select Crop Plan
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { SOIL_METRICS, SoilMetric } from '../data/soilMetrics';
import { Dna, Sparkles } from 'lucide-react';

export const SoilWorld: React.FC = () => {
  const [selectedMetric, setSelectedMetric] = useState<SoilMetric>(SOIL_METRICS[0]);
  const [activeDepth, setActiveDepth] = useState<number>(2);

  const depthLevels = [
    { title: 'SURFACE HARVEST LAYER', depth: '0 - 5 cm', desc: 'Organic litter & light penetration' },
    { title: 'RHIZOSPHERE ROOT ZONE', depth: '5 - 30 cm', desc: 'Active nutrient absorption & roots' },
    { title: 'HUMUS & MINERAL STRATA', depth: '30 - 65 cm', desc: 'Balanced pH, clay & silt reserves' },
    { title: 'BIOLOGICAL MICROBIOME', depth: '65+ cm', desc: 'Mycorrhizal fungi & bacterial colonies' },
  ];

  return (
    <section id="soil" className="relative w-full min-h-screen bg-[#211B14] py-28 px-6 lg:px-16 flex flex-col justify-between overflow-hidden bg-grain">
      {/* Underground Earth Texture Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#102C20] via-[#211B14] to-[#14100C] opacity-95 pointer-events-none" />
      <div className="absolute top-1/2 left-10 w-96 h-96 bg-[#819B63]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Section Header Statement */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono tracking-widest text-[#E7C77C] uppercase block mb-3">
            Chapter 04 — Underground Ecosystem
          </span>
          <h2 className="font-serif text-5xl lg:text-7xl font-bold text-[#F3F0E5] leading-tight">
            Healthy soil is the beginning of <br />
            <span className="italic font-normal text-[#E7C77C]">every good harvest.</span>
          </h2>
          <p className="mt-4 text-base text-[#F3F0E5]/80 font-sans font-light max-w-xl mx-auto">
            Travel deep below the surface to inspect live soil chemistry, mineral reserves, moisture gradients, and microbial activity.
          </p>
        </div>

        {/* Underground Cross-Section Visualizer & Depth Navigator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* LEFT: Interactive Underground Depth Selector */}
          <div className="lg:col-span-4 editorial-glass-dark rounded-3xl p-6 lg:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-2 text-xs font-mono text-[#E7C77C] mb-6">
                <Dna className="w-4 h-4 text-[#A9C77B]" />
                <span>SOIL STRATA DEPTH SCAN</span>
              </div>

              <div className="space-y-4">
                {depthLevels.map((lvl, index) => {
                  const isActive = activeDepth === index;
                  return (
                    <div
                      key={lvl.title}
                      onClick={() => setActiveDepth(index)}
                      data-cursor="Depth"
                      className={`p-4 rounded-2xl border cursor-pointer transition-all duration-500 ${
                        isActive
                          ? 'bg-[#102C20] border-[#E7C77C] shadow-lg shadow-[#E7C77C]/10 scale-[1.02]'
                          : 'bg-[#14100C]/60 border-[#819B63]/20 hover:border-[#E7C77C]/40 text-[#F3F0E5]/70'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs font-mono mb-1">
                        <span className={isActive ? 'text-[#E7C77C]' : 'text-[#819B63]'}>
                          LEVEL 0{index + 1}
                        </span>
                        <span className="text-[10px] text-[#F3F0E5]/50">{lvl.depth}</span>
                      </div>
                      <h4 className="font-serif text-base font-bold text-[#F3F0E5]">{lvl.title}</h4>
                      <p className="text-xs text-[#F3F0E5]/70 font-sans mt-1">{lvl.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Soil Organic Carbon Badge */}
            <div className="mt-8 p-4 rounded-2xl bg-[#E7C77C]/10 border border-[#E7C77C]/30 flex items-center space-x-3 text-xs">
              <Sparkles className="w-5 h-5 text-[#E7C77C] flex-shrink-0" />
              <div className="text-[#F3F0E5]">
                <span className="font-mono text-[#E7C77C] block font-bold">MYCORRHIZAL BIOMASS: ACTIVE</span>
                <span className="text-[11px] text-[#F3F0E5]/80">Fungi network expanding nutrient bio-reach by 34%</span>
              </div>
            </div>
          </div>

          {/* RIGHT: Environmental Soil Telemetry Readouts */}
          <div className="lg:col-span-8 editorial-glass-dark rounded-3xl p-6 lg:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#F3F0E5]/10">
                <h3 className="font-serif text-2xl font-bold text-[#F3F0E5]">
                  ENVIRONMENTAL TELEMETRY READOUTS
                </h3>
                <span className="text-xs font-mono text-[#A9C77B]">LIVE STRATA: DEPTH {depthLevels[activeDepth].depth}</span>
              </div>

              {/* Metrics Floating Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {SOIL_METRICS.map((metric) => {
                  const isSelected = selectedMetric.id === metric.id;
                  return (
                    <div
                      key={metric.id}
                      onClick={() => setSelectedMetric(metric)}
                      data-cursor="Inspect"
                      className={`p-5 rounded-2xl border cursor-pointer transition-all duration-300 relative overflow-hidden ${
                        isSelected
                          ? 'bg-[#102C20] border-[#A9C77B] glow-green scale-105'
                          : 'bg-[#14100C]/70 border-[#819B63]/20 hover:border-[#A9C77B]/50'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-xs font-mono text-[#819B63] font-bold">{metric.symbol}</span>
                        <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-[#A9C77B]/20 text-[#A9C77B]">
                          {metric.status}
                        </span>
                      </div>
                      <div className="font-serif text-3xl font-bold text-[#F3F0E5]">
                        {metric.value} <span className="text-xs font-sans text-[#F3F0E5]/60 font-normal">{metric.unit}</span>
                      </div>
                      <span className="text-xs font-sans font-medium text-[#E7C77C] block mt-1">
                        {metric.name}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Selected Metric Deep Dive Panel */}
              {selectedMetric && (
                <div className="mt-6 p-6 rounded-2xl bg-[#102C20]/90 border border-[#E7C77C]/40 text-xs font-sans">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[#E7C77C] font-bold text-sm">
                      {selectedMetric.name} ({selectedMetric.symbol}) Detail Analysis
                    </span>
                    <span className="font-mono text-[#A9C77B]">Target Range: {selectedMetric.optimalRange}</span>
                  </div>
                  <p className="text-[#F3F0E5]/80 text-sm leading-relaxed">
                    {selectedMetric.description} Checked at root zone layer ({selectedMetric.depth}).
                  </p>
                </div>
              )}
            </div>

            {/* Underground Ecosystem Quote */}
            <div className="mt-8 border-t border-[#F3F0E5]/10 pt-4 flex items-center justify-between text-xs font-mono text-[#819B63]">
              <span>SOIL BIOME FREQUENCY: 432 Hz RESONANCE</span>
              <span className="text-[#E7C77C]">CARBON SEQUESTRATION: OPTIMAL</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

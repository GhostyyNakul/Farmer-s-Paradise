import React, { useState } from 'react';
import { Bot, Scan, Upload, AlertTriangle, CheckCircle2, ChevronRight, Sparkles, RefreshCw } from 'lucide-react';

export const CropAssistant: React.FC = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [selectedDiagnostic, setSelectedDiagnostic] = useState<string | null>('nitrogen');

  const triggerScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
    }, 2800);
  };

  return (
    <section id="ai" className="relative w-full min-h-screen bg-[#102C20] py-28 px-6 lg:px-16 flex flex-col justify-center bg-grain overflow-hidden">
      {/* Dark Vignette and Glow Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#102C20] via-[#102C20]/90 to-[#211B14] pointer-events-none" />
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-[#E7C77C]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <span className="text-xs font-mono tracking-widest text-[#E7C77C] uppercase block mb-3">
            Chapter 03 — Agricultural Intelligence
          </span>
          <h2 className="font-serif text-5xl lg:text-6xl font-bold text-[#F3F0E5] leading-tight">
            Your farm has questions. <br />
            <span className="italic font-normal text-[#A9C77B]">Now it has an assistant.</span>
          </h2>
          <p className="mt-4 text-base text-[#F3F0E5]/80 font-sans font-light">
            A specialized vision-language neural network trained on millions of agronomical field samples, spectral signatures, and soil chemistry matrices.
          </p>
        </div>

        {/* Split Interactive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Interactive Leaf & Crop Image Scanner */}
          <div className="lg:col-span-6 editorial-glass rounded-3xl p-6 lg:p-8 relative overflow-hidden group">
            <div className="flex items-center justify-between mb-4 border-b border-[#F3F0E5]/10 pb-4">
              <div className="flex items-center space-x-2 text-xs font-mono text-[#E7C77C]">
                <Scan className="w-4 h-4 text-[#A9C77B]" />
                <span>SPECTRAL LEAF DIAGNOSTIC SCANNER</span>
              </div>
              <button
                onClick={triggerScan}
                disabled={isScanning}
                data-cursor="Re-Scan"
                className="px-3 py-1.5 rounded-full bg-[#E7C77C]/20 border border-[#E7C77C]/40 text-[#E7C77C] text-[11px] font-mono hover:bg-[#E7C77C] hover:text-[#102C20] transition-colors flex items-center space-x-1.5"
              >
                <RefreshCw className={`w-3 h-3 ${isScanning ? 'animate-spin' : ''}`} />
                <span>{isScanning ? 'Scanning...' : 'Trigger Scan'}</span>
              </button>
            </div>

            {/* Crop Image Viewport with Scanning Laser Line */}
            <div
              onClick={triggerScan}
              data-cursor="Inspect"
              className="relative w-full h-[360px] rounded-2xl overflow-hidden cursor-pointer border border-[#819B63]/30 bg-[#211B14]"
            >
              <img
                src="https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=1000"
                alt="Tomato Crop Leaf Inspection"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Dark Contrast Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#102C20] via-transparent to-transparent opacity-60" />

              {/* Animated Laser Beam Scanner Line */}
              <div className={`absolute left-0 w-full h-[2px] bg-[#E7C77C] shadow-[0_0_15px_#E7C77C] z-20 ${isScanning ? 'animate-[bounce_2s_infinite]' : 'top-1/2'}`} />

              {/* Diagnostic Marker Pins over Leaf */}
              <div className="absolute top-1/3 left-1/3 z-20 flex items-center space-x-2">
                <div className="w-4 h-4 rounded-full bg-[#E7C77C] animate-ping opacity-75" />
                <div className="px-2.5 py-1 rounded bg-[#102C20]/90 border border-[#E7C77C] text-[10px] font-mono text-[#E7C77C]">
                  Chlorosis (Yellowing Margin)
                </div>
              </div>

              <div className="absolute bottom-1/4 right-1/3 z-20 flex items-center space-x-2">
                <div className="w-4 h-4 rounded-full bg-[#A9C77B] animate-pulse" />
                <div className="px-2.5 py-1 rounded bg-[#102C20]/90 border border-[#A9C77B] text-[10px] font-mono text-[#A9C77B]">
                  Stomatal Hydration: Normal
                </div>
              </div>

              {/* Upload Drag-Drop Hint overlay */}
              <div className="absolute bottom-4 left-4 z-20 flex items-center space-x-2 px-3 py-1.5 rounded-full bg-[#102C20]/80 border border-[#F3F0E5]/20 text-[11px] font-sans text-[#F3F0E5]/80">
                <Upload className="w-3.5 h-3.5 text-[#E7C77C]" />
                <span>Click image or drop photo of your crop</span>
              </div>
            </div>

            {/* Live Diagnostic Markers Data bar */}
            <div className="mt-4 grid grid-cols-3 gap-3 text-center text-xs font-mono">
              <div className="p-2.5 rounded-xl bg-[#211B14]/80 border border-[#819B63]/20">
                <span className="text-[10px] text-[#819B63] block">LESION SEVERITY</span>
                <span className="font-bold text-[#E7C77C] mt-0.5 block">12.4% (Early)</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#211B14]/80 border border-[#819B63]/20">
                <span className="text-[10px] text-[#819B63] block">CONFIDENCE</span>
                <span className="font-bold text-[#A9C77B] mt-0.5 block">98.7%</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#211B14]/80 border border-[#819B63]/20">
                <span className="text-[10px] text-[#819B63] block">DEFICIENCY</span>
                <span className="font-bold text-[#F3F0E5] mt-0.5 block">Nitrogen (N)</span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Agricultural AI Dialogue & Specialized Tree */}
          <div className="lg:col-span-6 editorial-glass rounded-3xl p-6 lg:p-8 flex flex-col justify-between min-h-[500px]">
            <div>
              {/* AI Header */}
              <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-[#F3F0E5]/10">
                <div className="w-9 h-9 rounded-xl bg-[#E7C77C]/20 border border-[#E7C77C]/50 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-[#E7C77C]" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#F3F0E5]">FARMER'S PARADISE AGRI-BOT</h3>
                  <span className="text-[10px] font-mono text-[#A9C77B]">Active Field Assistant • Telemetry Linked</span>
                </div>
              </div>

              {/* Dialogue Exchange */}
              <div className="space-y-4">
                {/* Farmer Message */}
                <div className="flex items-start justify-end space-x-3">
                  <div className="p-4 rounded-2xl bg-[#E7C77C]/15 border border-[#E7C77C]/30 text-xs font-sans text-[#F3F0E5] max-w-md">
                    <span className="text-[10px] font-mono text-[#E7C77C] block mb-1">FARMER QUERY</span>
                    "My tomato leaves are turning yellow around the edges."
                  </div>
                </div>

                {/* AI Response */}
                <div className="flex items-start space-x-3">
                  <div className="w-7 h-7 rounded-lg bg-[#A9C77B]/20 flex items-center justify-center mt-1">
                    <Sparkles className="w-4 h-4 text-[#A9C77B]" />
                  </div>
                  <div className="p-4 rounded-2xl bg-[#211B14]/90 border border-[#819B63]/30 text-xs font-sans text-[#F3F0E5] max-w-lg">
                    <span className="text-[10px] font-mono text-[#A9C77B] block mb-1">AI DIAGNOSIS</span>
                    "Let's investigate. Leaf vein chlorosis detected. Cross-referencing root moisture telemetry and soil pH level (6.6)..."
                  </div>
                </div>
              </div>

              {/* Animated Diagnostic Investigation Tree */}
              <div className="mt-6 pt-4 border-t border-[#F3F0E5]/10">
                <span className="text-[11px] font-mono text-[#819B63] uppercase tracking-wider block mb-3">
                  DIAGNOSTIC RESOLUTION PATHWAYS
                </span>

                <div className="space-y-2.5">
                  {/* Node 1: Nitrogen Deficiency */}
                  <div
                    onClick={() => setSelectedDiagnostic('nitrogen')}
                    className={`p-3 rounded-xl border cursor-pointer transition-all duration-300 flex items-center justify-between ${
                      selectedDiagnostic === 'nitrogen'
                        ? 'bg-[#102C20] border-[#E7C77C] text-[#E7C77C]'
                        : 'bg-[#211B14]/60 border-[#819B63]/20 hover:border-[#E7C77C]/50 text-[#F3F0E5]/80'
                    }`}
                  >
                    <div className="flex items-center space-x-3 text-xs">
                      <AlertTriangle className="w-4 h-4 text-[#E7C77C]" />
                      <div>
                        <span className="font-semibold block">1. Early Nitrogen Deficiency (Primary Cause)</span>
                        <span className="text-[10px] text-[#F3F0E5]/60 font-mono">Mobile N depletion from lower leaves to top canopy</span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4" />
                  </div>

                  {/* Node 2: Water Stress */}
                  <div
                    onClick={() => setSelectedDiagnostic('water')}
                    className={`p-3 rounded-xl border cursor-pointer transition-all duration-300 flex items-center justify-between ${
                      selectedDiagnostic === 'water'
                        ? 'bg-[#102C20] border-[#A9C77B] text-[#A9C77B]'
                        : 'bg-[#211B14]/60 border-[#819B63]/20 hover:border-[#A9C77B]/50 text-[#F3F0E5]/80'
                    }`}
                  >
                    <div className="flex items-center space-x-3 text-xs">
                      <CheckCircle2 className="w-4 h-4 text-[#A9C77B]" />
                      <div>
                        <span className="font-semibold block">2. Root Zone Moisture (Rule Out)</span>
                        <span className="text-[10px] text-[#F3F0E5]/60 font-mono">VWC is 27.8% — Hydration is healthy</span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>

            {/* Action Prescription Recommendation */}
            <div className="mt-6 p-4 rounded-2xl bg-[#E7C77C]/10 border border-[#E7C77C]/40 text-xs flex items-center justify-between">
              <div>
                <span className="font-mono text-[10px] text-[#E7C77C] block uppercase">RECOMMENDED ACTION</span>
                <span className="font-semibold text-[#F3F0E5]">Apply Foliar Organic Bio-Nutrient (N-15) within 48 Hours</span>
              </div>
              <button
                data-cursor="Apply"
                className="px-4 py-2 rounded-full bg-[#E7C77C] text-[#102C20] font-mono text-[11px] font-bold hover:bg-[#F4D48B] transition-colors"
              >
                Get Recipe
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

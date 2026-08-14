import React from 'react';
import { useLenis } from './hooks/useLenis';
import { CustomCursor } from './components/CustomCursor';
import { Navigation } from './components/Navigation';
import { HeroScene } from './components/HeroScene';
import { ScrollVideoSequence } from './components/ScrollVideoSequence';
import { EveryFieldStory } from './components/EveryFieldStory';
import { CropAssistant } from './components/CropAssistant';
import { SoilWorld } from './components/SoilWorld';
import { SoilTesting } from './components/SoilTesting';
import { CropRecommendations } from './components/CropRecommendations';
import { LabMap } from './components/LabMap';
import { FinalScene } from './components/FinalScene';

export function App() {
  useLenis();

  return (
    <div className="relative w-full min-h-screen bg-[#102C20] text-[#F3F0E5] font-sans selection:bg-[#A9C77B] selection:text-[#102C20]">
      {/* Custom Interactive Desktop Cursor */}
      <CustomCursor />

      {/* Editorial Sticky Navigation & Global Progress Gauge */}
      <Navigation />

      {/* Main Storytelling Sections */}
      <main>
        <HeroScene />
        <ScrollVideoSequence />
        <EveryFieldStory />
        <CropAssistant />
        <SoilWorld />
        <SoilTesting />
        <CropRecommendations />
        <LabMap />
        <FinalScene />
      </main>
    </div>
  );
}

export default App;

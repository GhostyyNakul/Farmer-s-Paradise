import { useState, useEffect } from 'react';

export interface Chapter {
  id: string;
  number: string;
  title: string;
}

export const CHAPTERS: Chapter[] = [
  { id: 'hero', number: '01', title: 'FIELD' },
  { id: 'story', number: '02', title: 'UNDERSTAND' },
  { id: 'ai', number: '03', title: 'ANALYZE' },
  { id: 'soil', number: '04', title: 'SOIL' },
  { id: 'testing', number: '05', title: 'TESTING' },
  { id: 'crops', number: '06', title: 'RECOMMEND' },
  { id: 'labs', number: '07', title: 'LABS' },
  { id: 'final', number: '08', title: 'HARVEST' },
];

export function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [activeChapter, setActiveChapter] = useState<Chapter>(CHAPTERS[0]);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight <= 0) return;
      const currentScroll = window.scrollY;
      const currentProgress = Math.min(1, Math.max(0, currentScroll / totalHeight));
      setProgress(currentProgress);

      const chapterIndex = Math.min(
        CHAPTERS.length - 1,
        Math.floor(currentProgress * CHAPTERS.length)
      );
      setActiveChapter(CHAPTERS[chapterIndex]);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { progress, activeChapter };
}

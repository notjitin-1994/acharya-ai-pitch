import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { slidesData } from '../constants/slides';
import { Slide } from '../components/Slide';
import { Navigation } from '../components/Navigation';
import { Notes } from '../components/Notes';
import { Logo } from '../components/Logo';
import { Link } from 'react-router-dom';
import { ScalingContainer } from '../components/ScalingContainer';
import { PresenterLayout } from '../components/PresenterLayout';
import { SlideStepProvider } from '../context/SlideStepContext';
import { cn } from '../lib/utils';
import { Home } from 'lucide-react';

export default function PitchDeck() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [subStep, setSubStep] = useState(0);
  const [[slideIndex, direction], setSlide] = useState([0, 0]);
  const [showNotes, setShowNotes] = useState(false);
  const [isPresentMode, setIsPresentMode] = useState(false);
  const [view, setView] = useState('audience');
  const fullscreenRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('view') === 'presenter') {
      setView('presenter');
    }
  }, []);
  
  useEffect(() => {
    const channel = new BroadcastChannel('presentation-sync');
    
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'SYNC_SLIDE') {
        if (event.data.index !== currentSlide) {
          setCurrentSlide(event.data.index);
          setSlide([event.data.index, event.data.index > currentSlide ? 1 : -1]);
        }
        if (event.data.subStep !== subStep) {
          setSubStep(event.data.subStep);
        }
      }
    };
    
    channel.addEventListener('message', handleMessage);
    channel.postMessage({ type: 'SYNC_SLIDE', index: currentSlide, subStep });

    return () => {
      channel.removeEventListener('message', handleMessage);
      channel.close();
    };
  }, [currentSlide, subStep]);

  const paginate = (newDirection: number) => {
    const slideConfig: Record<number, number> = {
      2: 3, 4: 4, 5: 4, 6: 3, 7: 3, 8: 3, 9: 1, 10: 3, 11: 2, 12: 1, 13: 3, 15: 2, 16: 2, 17: 2, 18: 3, 19: 1,
    };

    const maxSubStep = slideConfig[currentSlide];
    if (maxSubStep !== undefined) {
      if (newDirection === 1 && subStep < maxSubStep) {
        setSubStep(prev => prev + 1);
        return;
      }
      if (newDirection === -1 && subStep > 0) {
        setSubStep(prev => prev - 1);
        return;
      }
    }

    if (currentSlide === 19 && newDirection === 1 && subStep === 1) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      }
      setIsPresentMode(false);
    }

    const nextIndex = currentSlide + newDirection;
    if (nextIndex >= 0 && nextIndex < slidesData.length) {
      const nextMaxSubStep = slideConfig[nextIndex];
      const startSubStep = (newDirection === -1 && nextMaxSubStep !== undefined) ? nextMaxSubStep : 0;

      setCurrentSlide(nextIndex);
      setSubStep(startSubStep);
      setSlide([nextIndex, newDirection]);
    }
  };

  const toggleFullscreen = async () => {
    if (!document.fullscreenElement) {
      try {
        await fullscreenRef.current?.requestFullscreen();
        setIsPresentMode(true);
      } catch (err) {
        console.error(`Error attempting to enable fullscreen: ${err}`);
      }
    } else {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsPresentMode(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        paginate(1);
      } else if (e.key === 'ArrowLeft') {
        paginate(-1);
      } else if (e.key === 'n') {
        setShowNotes(prev => !prev);
      } else if (e.key === 'Escape') {
        if (document.fullscreenElement) {
          document.exitFullscreen();
        }
        setIsPresentMode(false);
      } else if (e.key === 'f' || e.key === 'p') {
        toggleFullscreen();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide, subStep]);

  const slide = slidesData[currentSlide];
  const progress = ((currentSlide + 1) / slidesData.length) * 100;

  if (view === 'presenter') {
    return (
      <SlideStepProvider subStep={subStep}>
        <PresenterLayout 
          currentSlide={currentSlide} 
          paginate={paginate} 
          notes={slide.notes} 
        />
      </SlideStepProvider>
    );
  }

  return (
    <SlideStepProvider subStep={subStep}>
      <div 
        ref={fullscreenRef}
        className={cn(
          "bg-[#020C1B] text-white font-body min-h-screen w-full flex flex-col selection:bg-[#A7DADB]/30",
          "h-[100dvh] overflow-hidden fixed inset-0",
          isPresentMode && "z-[100]"
        )}
      >
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,400;0,700;1,400&family=Quicksand:wght@400;500;700&display=swap');
          .font-display { font-family: 'Quicksand', sans-serif; }
          .font-body { font-family: 'Lato', sans-serif; }
          
          .custom-scrollbar::-webkit-scrollbar { width: 12px; }
          .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
          .custom-scrollbar::-webkit-scrollbar-thumb { background: #A7DADB; border-radius: 6px; }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #A7DADB; }

          #root { height: 100%; width: 100%; overflow: hidden; position: fixed; inset: 0; }
          div:fullscreen .hide-in-fullscreen { display: none; }
        `}</style>

        {!isPresentMode && (
          <div className="h-1.5 w-full bg-[#142433] absolute top-0 left-0 z-50 hide-in-fullscreen">
            <div 
              className="h-full bg-[#A7DADB] transition-all duration-500 ease-out shadow-[0_0_20px_#A7DADB]" 
              style={{ width: `${progress}%` }}
            />
          </div>
        )}

        {!isPresentMode && (
          <header className="h-20 flex justify-between items-center px-12 py-4 z-10 shrink-0 border-b border-[#142433] hide-in-fullscreen">
            <div className="flex items-center gap-8">
              <Logo />
              <Link 
                to="/" 
                className="p-2 rounded-lg bg-white/5 border border-white/10 text-[#b0c5c6] hover:text-[#A7DADB] hover:border-[#A7DADB]/30 transition-all group"
              >
                <Home size={20} className="group-hover:scale-110 transition-transform" />
              </Link>
            </div>
            <div className="text-[#b0c5c6] font-display text-lg tracking-widest uppercase bg-[#142433] px-6 py-2 rounded-full border border-[#A7DADB]/10">
              {slide.tag}
            </div>
          </header>
        )}

        <main className={`flex-grow flex items-center justify-center relative overflow-hidden ${isPresentMode ? 'h-full w-full' : ''}`}>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-[#A7DADB]/10 rounded-full blur-[180px] pointer-events-none"></div>
          
          <ScalingContainer>
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <Slide key={currentSlide} slide={slide} direction={direction} />
            </AnimatePresence>
          </ScalingContainer>

          <Notes 
            notes={slide.notes} 
            isVisible={showNotes} 
            onClose={() => setShowNotes(false)} 
          />
        </main>

        {!isPresentMode && (
          <div className="h-24 shrink-0 bg-[#020C1B] hide-in-fullscreen">
            <Navigation 
              currentSlide={currentSlide}
              totalSlides={slidesData.length}
              onPrev={() => paginate(-1)}
              onNext={() => paginate(1)}
              onToggleNotes={() => setShowNotes(!showNotes)}
              onTogglePresent={toggleFullscreen}
              showNotes={showNotes}
            />
          </div>
        )}
      </div>
    </SlideStepProvider>
  );
}

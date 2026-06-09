import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { slidesData } from '../constants/slides';
import { Slide } from './Slide';
import { Logo } from './Logo';
import { 
  Clock, 
  SkipForward, 
  SkipBack, 
  Layout, 
  Monitor, 
  MessageSquare,
  Timer,
  ChevronRight,
  ChevronLeft,
  Settings2,
  Maximize2
} from 'lucide-react';
import { cn } from '../lib/utils';
import { ShimmerButton } from './ui/shimmer-button';

import { BlurFade } from './ui/blur-fade';
import RetroGrid from './ui/retro-grid';

import { Ripple } from './ui/ripple';

import { ScalingContainer } from './ScalingContainer';
import { useSlideStep } from '../context/SlideStepContext';

interface PresenterLayoutProps {
  currentSlide: number;
  paginate: (direction: number) => void;
  notes: string;
}

const formatTime = (s: number) => {
  const mins = Math.floor(s / 60);
  const secs = s % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export const PresenterLayout: React.FC<PresenterLayoutProps> = ({ currentSlide, paginate, notes }) => {
  const [time, setTime] = useState(0);
  const [sessionTime, setSessionTime] = useState(0);
  const { subStep } = useSlideStep();
  const nextSlide = slidesData[currentSlide + 1];
  const prevSlide = slidesData[currentSlide - 1];

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(t => t + 1);
      setSessionTime(t => t + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-screen w-full bg-[#020C1B] text-white flex flex-col p-6 gap-6 overflow-hidden font-body selection:bg-[#A7DADB]/30">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <RetroGrid className="opacity-[0.03]" />
        <Ripple mainCircleOpacity={0.05} className="opacity-20" />
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#A7DADB]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#6366f1]/5 rounded-full blur-[120px]" />
      </div>

      {/* Header - Advanced HUD Style */}
      <header className="relative z-10 flex justify-between items-center bg-[#142433]/40 backdrop-blur-xl px-8 py-4 rounded-[32px] border border-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
        <div className="flex items-center gap-8">
          <Logo />
          <div className="h-10 w-px bg-white/10" />
          <div className="flex flex-col">
            <span className="text-[#A7DADB] font-display text-xs font-bold tracking-[0.3em] uppercase opacity-60">System Status</span>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#A7DADB] animate-pulse" />
              <span className="font-mono text-sm tracking-widest text-white/90">LIVE_PRESENTER_UPLINK</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-12">
          {/* Global Timers */}
          <div className="flex items-center gap-8">
            <div className="flex flex-col items-end">
              <span className="text-[10px] uppercase tracking-widest text-[#A7DADB]/50 font-bold">Slide Time</span>
              <span className="text-2xl font-mono font-medium">{formatTime(time)}</span>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div className="flex flex-col items-end">
              <span className="text-[10px] uppercase tracking-widest text-[#6366f1]/50 font-bold">Session</span>
              <span className="text-2xl font-mono font-medium text-[#6366f1]">{formatTime(sessionTime)}</span>
            </div>
          </div>

          <div className="h-10 w-px bg-white/10" />
          
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-end">
              <span className="text-[10px] uppercase tracking-widest text-white/30 font-bold">Progression</span>
              <div className="text-sm font-mono flex items-center gap-2">
                <span className="text-[#A7DADB] font-bold">{currentSlide + 1}</span>
                <span className="opacity-20">/</span>
                <span className="opacity-40">{slidesData.length}</span>
                {currentSlide === 2 && (
                  <>
                    <span className="h-4 w-px bg-white/10 mx-1" />
                    <span className="text-[10px] text-[#6366f1] font-bold">STEP {subStep}</span>
                  </>
                )}
              </div>
            </div>
            <div className="w-32 h-1.5 bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-[#A7DADB] shadow-[0_0_10px_#A7DADB]"
                initial={{ width: 0 }}
                animate={{ width: `${((currentSlide + 1) / slidesData.length) * 100}%` }}
                transition={{ type: "spring", stiffness: 50, damping: 20 }}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Layout Grid */}
      <main className="flex-grow grid grid-cols-12 gap-6 min-h-0 relative z-10">
        {/* Left Section: Visual Feedback - Swapped to Right later, but user said "slide preview on the right" */}
        {/* So: Col 4 Notes (Left), Col 8 Preview (Right) */}
        <div className="col-span-4 flex flex-col min-h-0">
          {/* Speaker Notes Area - Premium Typography */}
          <div className="flex-grow bg-[#142433]/20 backdrop-blur-sm rounded-[48px] border border-white/5 p-12 overflow-y-auto custom-scrollbar relative flex flex-col shadow-inner">
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-[#A7DADB]/10 rounded-2xl">
                  <MessageSquare size={20} className="text-[#A7DADB]" />
                </div>
                <div className="flex flex-col">
                  <h3 className="text-white/40 font-black uppercase tracking-[0.4em] text-[12px]">
                     Executive Briefing
                  </h3>
                  <span className="text-[10px] text-[#A7DADB]/40 font-mono tracking-widest uppercase mt-1">Live_Script_Uplink</span>
                </div>
              </div>
            </div>

            <div className="flex-grow overflow-y-auto pr-6 custom-scrollbar">
              <AnimatePresence mode="wait">
                <BlurFade
                  key={currentSlide}
                  duration={0.5}
                  delay={0.1}
                  className="space-y-4"
                >
                  {notes.split(/(\[.*?\]|\*.*?\*)/g).filter(s => s && s.trim().length > 0).map((segment: string, i: number) => {
                    const isInstruction = (segment.startsWith('[') && segment.endsWith(']')) || (segment.startsWith('*') && segment.endsWith('*'));
                    
                    if (isInstruction) {
                      return (
                        <div key={i} className="flex gap-4 items-start my-6 group/cue">
                          <div className="shrink-0 mt-1.5 flex flex-col items-center gap-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#A7DADB] shadow-[0_0_8px_rgba(167,218,219,0.5)]" />
                            <div className="w-px h-full min-h-[20px] bg-gradient-to-b from-[#A7DADB]/40 to-transparent" />
                          </div>
                          <div className="flex flex-col gap-1.5 flex-grow">
                            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#A7DADB] opacity-40">Stage Direction</span>
                            <div className="text-[11px] text-[#A7DADB] font-display italic leading-relaxed bg-[#A7DADB]/5 px-4 py-2.5 rounded-xl border border-[#A7DADB]/10 shadow-sm backdrop-blur-sm">
                              {segment.replace(/[\[\]\*]/g, '')}
                            </div>
                          </div>
                        </div>
                      );
                    }

                    const cleanText = segment.replace(/\\"/g, '"').trim();
                    if (cleanText.length === 0) return null;

                    return (
                      <div key={i} className="flex flex-col gap-2">
                         <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/20">Spoken Script</span>
                         <p className="text-[11px] text-white/80 leading-[1.6] font-light bg-white/[0.02] p-4 rounded-2xl border border-white/5">
                            {cleanText}
                         </p>
                      </div>
                    );
                  })}
                </BlurFade>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Right Section: Visual Feedback */}
        <div className="col-span-8 flex flex-col gap-6 min-h-0">
          {/* Current Slide Display */}
          <div className="flex-grow bg-[#020C1B] rounded-[48px] border border-white/10 overflow-hidden relative shadow-2xl group">
            <div className="absolute top-8 left-8 z-30 flex items-center gap-3 pointer-events-none">
              <div className="bg-[#A7DADB] text-[#020C1B] px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-[#A7DADB]/20">
                Live Preview
              </div>
              <div className="bg-white/5 backdrop-blur-md text-white/60 px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] border border-white/10">
                Interactive Linked
              </div>
            </div>
            
            {/* The Actual Slide Preview - Fully Scaled & Interactive */}
            <div className="absolute inset-0 flex items-center justify-center bg-black overflow-hidden">
              <ScalingContainer>
                 <Slide slide={slidesData[currentSlide]} direction={0} />
              </ScalingContainer>
            </div>

            {/* View Controls Overlay */}
            <div className="absolute bottom-8 left-8 right-8 z-30 flex justify-end items-end pointer-events-none">
              <div className="pointer-events-auto flex items-center gap-1 bg-[#142433]/80 backdrop-blur-xl p-2 rounded-2xl border border-white/10">
                <button 
                  onClick={() => paginate(-1)}
                  disabled={currentSlide === 0}
                  className="p-3 hover:bg-white/5 disabled:opacity-20 rounded-xl transition-all"
                >
                  <ChevronLeft size={24} />
                </button>
                <div className="w-px h-6 bg-white/10" />
                <button 
                  onClick={() => paginate(1)}
                  disabled={currentSlide === slidesData.length - 1}
                  className="p-3 hover:bg-white/5 disabled:opacity-20 rounded-xl transition-all"
                >
                  <ChevronRight size={24} />
                </button>
              </div>
            </div>
          </div>
        </div>


      </main>

      {/* Dynamic Font Injection & Overrides */}
      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(167, 218, 219, 0.2); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(167, 218, 219, 0.4); }
      `}} />
    </div>
  );
};

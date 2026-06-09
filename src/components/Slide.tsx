import React from 'react';
import { m } from 'framer-motion';
import { Slide as SlideType } from '../constants/slides';

interface SlideProps {
  slide: SlideType;
  direction: number;
}

export const Slide: React.FC<SlideProps> = ({ slide, direction }) => {
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
      filter: "blur(10px)",
      scale: 0.95
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      filter: "blur(0px)",
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
      filter: "blur(10px)",
      scale: 0.95,
      transition: {
        opacity: { duration: 0.3 }
      }
    }),
  };

  const slideTransition = {
    x: { type: "spring", stiffness: 260, damping: 20 },
    opacity: { duration: 0.4 },
    filter: { duration: 0.4 },
    scale: { duration: 0.5, ease: "easeOut" }
  };

  return (
    <div className="w-full h-full flex flex-col relative overflow-hidden bg-[#020C1B] rounded-[60px] shadow-2xl border border-[#A7DADB]/10 group">
      {/* 1. Cinematic Background Image Layer - True Full Bleed (Behind Everything) */}
      {slide.bgImage && (
        <div className="absolute inset-0 z-0 overflow-hidden">
          <m.img 
            initial={{ scale: 1.15 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
            src={slide.bgImage} 
            className="w-full h-full object-cover brightness-[0.4] contrast-110" 
            style={{ willChange: "transform" }}
            alt=""
          />
          {/* Overlay Color with Blur */}
          {slide.overlayColor && (
            <div 
              className="absolute inset-0 z-10 backdrop-blur-[2px]" 
              style={{ backgroundColor: slide.overlayColor }}
            />
          )}
          {/* Permanent Master Gradient for Legibility */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#020C1B]/90 via-[#020C1B]/40 to-[#020C1B]/90 z-20" />
        </div>
      )}

      {/* 2. Atmospheric Lighting Leaks (Global Consistency) */}
      <div className="absolute top-1/4 -right-20 w-[800px] h-[800px] bg-[#A7DADB]/15 blur-[150px] rounded-full pointer-events-none z-10" />
      <div className="absolute bottom-1/4 -left-20 w-[600px] h-[600px] bg-[#A7DADB]/10 blur-[120px] rounded-full pointer-events-none z-10" />

      {/* 3. Content Layer */}
      <m.div
        key={slide.id}
        custom={direction}
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={slideTransition}
        className={`relative z-30 flex flex-col h-full ${slide.fullBleed ? 'p-0' : 'p-24'}`}
        style={{ willChange: "transform, opacity" }}
      >
        {/* Slide Metadata/Tag */}
        {!slide.hideTitle && (
          <div className="mb-12 shrink-0">
            <m.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="flex items-center gap-4 mb-4"
              style={{ color: slide.tagColor || '#A7DADB' }}
            >
              <div className="h-px w-12 bg-current opacity-40" />
              <span className="font-display font-medium tracking-[0.4em] text-sm uppercase">{slide.tag}</span>
            </m.div>
            
            <m.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-[100px] font-display font-bold tracking-tighter leading-none"
              style={{ color: slide.titleColor || '#FFFFFF' }}
            >
              {slide.title}
            </m.h2>
          </div>
        )}
        
        {/* Dynamic Slide Content */}
        <div className={`flex-grow relative ${slide.fullBleed ? '' : 'overflow-hidden'}`}>
           {slide.content}
        </div>
      </m.div>

      {/* Subtle UI Accents */}
      <div className="absolute top-12 right-12 text-[#b0c5c6]/30 text-[10px] font-mono tracking-[0.3em] uppercase pointer-events-none">
        Smartslate Intelligence v2.04
      </div>
    </div>
  );
};

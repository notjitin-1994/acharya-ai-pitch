"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Play, X as XIcon } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "../../lib/utils";

const easeOut = [0.16, 1, 0.3, 1] as const;

interface HeroVideoProps {
  videoSrc: string;
  thumbnailSrc: string;
  thumbnailAlt?: string;
  className?: string;
  durationLabel?: string;
  externallyOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function HeroVideoDialog({
  videoSrc,
  thumbnailSrc,
  thumbnailAlt = "Video thumbnail",
  className,
  durationLabel,
  externallyOpen,
  onOpenChange,
}: HeroVideoProps) {
  const [internallyOpen, setInternallyOpen] = useState(false);
  const isOpen = externallyOpen ?? internallyOpen;

  const setOpen = (v: boolean) => {
    setInternallyOpen(v);
    onOpenChange?.(v);
  };

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <div className={cn("relative", className)}>
      {/* Thumbnail card — invisible when open so the layoutId morph has a measured source */}
      <motion.div
        layoutId="video-hero"
        className={cn(
          "relative w-full overflow-hidden border border-white/10 bg-white/[0.03] aspect-video",
          isOpen ? "invisible" : "visible"
        )}
        style={{
          borderRadius: 24,
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08), 0 30px 60px -20px rgba(0,0,0,0.7)",
        }}
        transition={{ layout: { duration: 0.55, ease: easeOut } }}
      >
        <button
          type="button"
          aria-label="Play film"
          className="group absolute inset-0 w-full h-full cursor-pointer press-scale focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A7DADB]/60 focus-visible:ring-offset-4 focus-visible:ring-offset-[#020C1B]"
          onClick={() => setOpen(true)}
        >
          <img
            src={thumbnailSrc}
            alt={thumbnailAlt}
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              filter: "contrast(1.1) saturate(0.9) brightness(0.85)",
              transition: "filter 500ms var(--ease-out-expo)",
            }}
          />

          {/* Cinematic gradient */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background: "linear-gradient(180deg, rgba(2,12,27,0.05) 0%, rgba(2,12,27,0.55) 100%)",
            }}
          />

          {/* Letterbox bars */}
          <div aria-hidden className="absolute top-0 inset-x-0 h-[6%] bg-black/70" />
          <div aria-hidden className="absolute bottom-0 inset-x-0 h-[6%] bg-black/70" />

          {/* Play button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative flex items-center justify-center">
              <span
                aria-hidden
                className="absolute inline-flex h-24 w-24 rounded-full bg-[#A7DADB]/20 backdrop-blur-md border border-[#A7DADB]/30 group-hover:scale-110"
                style={{ transition: "transform 350ms var(--ease-out-expo)" }}
              />
              <span
                aria-hidden
                className="absolute inline-flex h-32 w-32 rounded-full border border-[#A7DADB]/20 animate-soft-pulse"
              />
              <div
                className="relative flex h-16 w-16 items-center justify-center rounded-full bg-[#A7DADB] group-hover:scale-105"
                style={{
                  boxShadow: "0 8px 30px rgba(167,218,219,0.45)",
                  transition: "transform 350ms var(--ease-out-expo)",
                }}
              >
                <Play className="h-5 w-5 fill-[#020C1B] text-[#020C1B] translate-x-[1px]" strokeWidth={0} />
              </div>
            </div>
          </div>

          {durationLabel && (
            <div className="absolute bottom-5 right-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/55 px-3 py-1.5 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-[#A7DADB] animate-soft-pulse" />
              <span className="font-display text-[11px] tracking-[0.3em] uppercase text-white/85 tabular-nums">
                {durationLabel}
              </span>
            </div>
          )}

          <div className="absolute top-5 left-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3 py-1.5 backdrop-blur-md">
            <span className="font-display text-[10px] tracking-[0.4em] uppercase text-[#A7DADB]/90 font-bold">
              Film · Project Institutional Intelligence
            </span>
          </div>
        </button>
      </motion.div>

      {createPortal(
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Backdrop fades independently from the card morph */}
              <motion.div
                key="backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: easeOut }}
                className="fixed inset-0 z-[199] bg-black/92 backdrop-blur-2xl"
                onClick={() => setOpen(false)}
              />

              {/* Video container morphs from thumbnail card via shared layoutId */}
              <motion.div
                key="video-fullscreen"
                layoutId="video-hero"
                className="fixed inset-0 z-[200] overflow-hidden"
                style={{ borderRadius: 0 }}
                transition={{ layout: { duration: 0.55, ease: easeOut } }}
              >
                <video
                  src={videoSrc}
                  className="w-full h-full object-contain bg-black"
                  controls
                  playsInline
                />

                {/* Close — delayed so it appears after morph finishes */}
                <motion.button
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.28, delay: 0.45, ease: easeOut }}
                  onClick={() => setOpen(false)}
                  aria-label="Close video"
                  className="absolute top-6 right-6 z-10 inline-flex items-center gap-2.5 rounded-full bg-black/50 px-5 py-2.5 text-white border border-white/20 hover:bg-black/75 backdrop-blur-xl press-scale"
                  style={{ transition: "background-color 200ms var(--ease-out-expo), transform 160ms var(--ease-out-expo)" }}
                >
                  <XIcon className="h-4 w-4" strokeWidth={1.75} />
                  <span className="font-display text-[10px] tracking-[0.35em] uppercase font-bold">
                    Close
                  </span>
                </motion.button>

                {/* ESC hint auto-fades */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.55, 0.55, 0] }}
                  transition={{ duration: 3, delay: 0.55, times: [0, 0.1, 0.7, 1] }}
                  className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-none"
                >
                  <span className="font-display text-[10px] tracking-[0.4em] uppercase text-white/50 font-bold">
                    Press ESC to close
                  </span>
                </motion.div>
              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
}

import React, { useRef, useState } from 'react';
import { Play, Pause } from 'lucide-react';
import { useNarration } from './NarrationContext';

function formatTime(seconds: number): string {
  if (!isFinite(seconds) || seconds < 0) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export const PlayNarrationButton: React.FC = () => {
  const { isPlaying, currentTime, duration, toggle, seek } = useNarration();

  // Scrub state — local preview percentage (0-100) overrides context during drag
  // so the fill snaps to the pointer immediately without waiting for timeupdate.
  const [scrubPct, setScrubPct] = useState<number | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const isDragging = useRef(false);
  const trackRef = useRef<HTMLDivElement>(null);

  const contextPct = duration > 0 ? (currentTime / duration) * 100 : 0;
  const displayPct = scrubPct !== null ? scrubPct : contextPct;

  const ratioFromPointer = (clientX: number): number => {
    const el = trackRef.current;
    if (!el) return 0;
    const rect = el.getBoundingClientRect();
    return Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    isDragging.current = true;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    const ratio = ratioFromPointer(e.clientX);
    setScrubPct(ratio * 100);
    seek(ratio * duration);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;
    const ratio = ratioFromPointer(e.clientX);
    setScrubPct(ratio * 100);
    seek(ratio * duration);
  };

  const handlePointerUp = () => {
    isDragging.current = false;
    setScrubPct(null);
  };

  const showThumb = isHovering || isDragging.current || scrubPct !== null;

  return (
    <div className="inline-flex max-w-full items-center gap-3 sm:gap-4 rounded-full border border-white/[0.08] bg-white/[0.04] backdrop-blur-md px-2 py-2 pr-4 sm:pr-5">
      <button
        type="button"
        onClick={toggle}
        aria-label={isPlaying ? 'Pause narration' : 'Play narration'}
        className="press-scale group flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#A7DADB] text-[#020C1B]"
        style={{
          boxShadow:
            '0 8px 22px -8px rgba(167,218,219,0.55), inset 0 1px 0 rgba(255,255,255,0.4)',
          transition:
            'transform 160ms var(--ease-out-expo), box-shadow 220ms var(--ease-out-expo)',
        }}
      >
        {isPlaying ? (
          <Pause className="h-4 w-4" strokeWidth={2.5} fill="currentColor" />
        ) : (
          <Play
            className="h-4 w-4 translate-x-[1px]"
            strokeWidth={2.5}
            fill="currentColor"
          />
        )}
      </button>

      <div className="flex flex-col gap-1.5 min-w-0 flex-1 sm:min-w-[150px] sm:flex-initial">
        <div className="flex items-center justify-between gap-2 sm:gap-3">
          <span className="font-display text-[9.5px] sm:text-[10px] tracking-[0.28em] sm:tracking-[0.35em] uppercase text-[#b0c5c6]/85 font-bold truncate">
            {isPlaying ? 'Narrating' : 'Listen to the brief'}
          </span>
          <span className="font-mono text-[9.5px] sm:text-[10px] tabular-nums text-[#b0c5c6]/65 shrink-0">
            {formatTime(scrubPct !== null ? (scrubPct / 100) * duration : currentTime)} / {formatTime(duration)}
          </span>
        </div>

        {/* Scrubber — tall hit area wraps the 2px visual track */}
        <div
          ref={trackRef}
          role="slider"
          aria-label="Narration position"
          aria-valuemin={0}
          aria-valuemax={Math.round(duration)}
          aria-valuenow={Math.round(currentTime)}
          tabIndex={0}
          className="relative flex items-center w-full cursor-pointer select-none"
          style={{ height: 20 }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => { setIsHovering(false); }}
          onKeyDown={(e) => {
            if (duration <= 0) return;
            const step = duration * 0.02; // 2% per keypress
            if (e.key === 'ArrowRight') { e.preventDefault(); seek(currentTime + step); }
            if (e.key === 'ArrowLeft')  { e.preventDefault(); seek(currentTime - step); }
          }}
        >
          {/* Visual track */}
          <div className="absolute inset-x-0 h-[2px] rounded-full bg-white/[0.10]"
               style={{ top: '50%', transform: 'translateY(-50%)' }}>
            {/* Fill */}
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-[#A7DADB]"
              style={{ width: `${displayPct}%` }}
            />
          </div>

          {/* Thumb — visible on hover / drag */}
          <div
            className="absolute top-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-[#A7DADB] border-2 border-[#020C1B] pointer-events-none"
            style={{
              left: `${displayPct}%`,
              transform: 'translate(-50%, -50%)',
              opacity: showThumb ? 1 : 0,
              transition: 'opacity 140ms ease',
              boxShadow: '0 0 6px rgba(167,218,219,0.6)',
            }}
          />
        </div>
      </div>
    </div>
  );
};

import React, { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { cn } from '../../lib/utils';

/**
 * Contextual stock footage library — Indian / Bangalore-focused, royalty-free.
 * Source: Pexels (free for commercial + personal use, no attribution required).
 * All URLs verified as direct .mp4 assets on the Pexels CDN.
 */
export const FOOTAGE = {
  // Bangalore
  bangaloreAerial:
    'https://videos.pexels.com/video-files/31017109/13258153_2730_1440_50fps.mp4',
  // Campuses (filmed in India)
  campusTimelapse:
    'https://videos.pexels.com/video-files/36802721/15594722_2560_1440_60fps.mp4',
  campusInteriorTimelapse:
    'https://videos.pexels.com/video-files/18685370/18685370-uhd_2560_1440_30fps.mp4',
  campusBustling:
    'https://videos.pexels.com/video-files/36878016/15622406_2560_1440_60fps.mp4',
  campusWalkway:
    'https://videos.pexels.com/video-files/36878014/15622412_2560_1440_60fps.mp4',
  campusVibrantLife:
    'https://videos.pexels.com/video-files/36879537/15622867_2560_1440_60fps.mp4',
  // Students (Indian context)
  studentsOutdoorMNIT:
    'https://videos.pexels.com/video-files/19969193/19969193-uhd_2560_1440_24fps.mp4',
  studentsLab:
    'https://videos.pexels.com/video-files/31474684/13420548_2560_1440_30fps.mp4',
  // Faculty
  professorSmartboard:
    'https://videos.pexels.com/video-files/1422633/1422633-hd_1920_810_24fps.mp4',
  // Partnership
  partnershipMeeting:
    'https://videos.pexels.com/video-files/3252063/3252063-uhd_2560_1440_25fps.mp4',
} as const;

export type FootageKey = keyof typeof FOOTAGE;

interface BackgroundVideoProps {
  src: string;
  /** Poster image shown before video loads, also fallback for reduced motion. */
  poster?: string;
  className?: string;
  /** Inline style — typically used to set object-fit filters (brightness, saturation). */
  style?: React.CSSProperties;
  /** Distance (CSS margin string) at which to start loading the video. */
  rootMargin?: string;
  /** Object position, e.g. "50% 50%", defaults to "center". */
  objectPosition?: string;
  ariaHidden?: boolean;
}

/**
 * Decorative background video that:
 *  - Mounts <video> only when scrolled near the viewport (IntersectionObserver).
 *  - Falls back to <img> poster for prefers-reduced-motion users.
 *  - Falls back to poster if the video element errors.
 *  - Autoplays muted/looped/inline (browser-policy compliant).
 */
export const BackgroundVideo: React.FC<BackgroundVideoProps> = ({
  src,
  poster,
  className,
  style,
  rootMargin = '200px',
  objectPosition = 'center',
  ariaHidden = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return; // never load for reduced-motion users
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShouldLoad(true);
            io.disconnect();
            break;
          }
        }
      },
      { rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduce, rootMargin]);

  const showVideo = shouldLoad && !reduce && !videoFailed;

  return (
    <div
      ref={containerRef}
      className={cn('absolute inset-0 overflow-hidden', className)}
      aria-hidden={ariaHidden}
    >
      {/* Poster — always painted underneath, instant render, fallback for reduced motion / errors */}
      {poster && (
        <img
          src={poster}
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition, ...style }}
          loading="lazy"
          decoding="async"
        />
      )}
      {showVideo && (
        <video
          ref={videoRef}
          src={src}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          // Once decoded the video paints over the poster.
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition, ...style }}
          onError={() => setVideoFailed(true)}
          // Some browsers need an explicit play() call after src is set.
          onLoadedData={(e) => {
            const v = e.currentTarget;
            const p = v.play();
            if (p && typeof p.catch === 'function') {
              p.catch(() => {
                // Silent — poster remains visible.
              });
            }
          }}
        />
      )}
    </div>
  );
};

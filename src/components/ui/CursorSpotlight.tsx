import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface CursorSpotlightProps {
  color?: string;
  showDot?: boolean;
}

/**
 * Emil Kowalski-style cursor — large radial spotlight + small spring dot.
 * The dot follows with spring physics so it has a satisfying natural lag.
 */
export const CursorSpotlight: React.FC<CursorSpotlightProps> = ({
  color = 'rgba(167, 218, 219, 0.055)',
  showDot = true,
}) => {
  const spotlightRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);
  const springX = useSpring(dotX, { stiffness: 350, damping: 28, mass: 0.4 });
  const springY = useSpring(dotY, { stiffness: 350, damping: 28, mass: 0.4 });

  useEffect(() => {
    const el = spotlightRef.current;
    if (!el) return;

    const move = (e: MouseEvent) => {
      el.style.setProperty('--cx', `${e.clientX}px`);
      el.style.setProperty('--cy', `${e.clientY}px`);
      dotX.set(e.clientX - 5);
      dotY.set(e.clientY - 5);
      setIsVisible(true);
    };

    const leave = () => setIsVisible(false);

    window.addEventListener('mousemove', move, { passive: true });
    document.documentElement.addEventListener('mouseleave', leave);
    return () => {
      window.removeEventListener('mousemove', move);
      document.documentElement.removeEventListener('mouseleave', leave);
    };
  }, [dotX, dotY]);

  return (
    <>
      <div
        ref={spotlightRef}
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[40]"
        style={{
          background: `radial-gradient(520px circle at var(--cx, -999px) var(--cy, -999px), ${color}, transparent 40%)`,
        }}
      />
      {showDot && (
        <motion.div
          aria-hidden
          className="pointer-events-none fixed z-[41] rounded-full"
          style={{
            x: springX,
            y: springY,
            width: 10,
            height: 10,
            backgroundColor: 'rgba(167, 218, 219, 0.75)',
            mixBlendMode: 'screen',
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 200ms',
          }}
        />
      )}
    </>
  );
};

import React, { useEffect, useRef } from 'react';
import { useInView, useMotionValue, animate } from 'framer-motion';

interface SpringCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  className?: string;
  duration?: number;
}

/**
 * Emil-style spring number counter. Counts up when scrolled into view.
 * Uses framer-motion spring physics for a satisfying deceleration.
 */
export const SpringCounter: React.FC<SpringCounterProps> = ({
  value,
  suffix = '',
  prefix = '',
  decimals = 0,
  className = '',
  duration = 1.4,
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const motionVal = useMotionValue(0);
  const inView = useInView(ref, { once: true, margin: '-20px' });

  useEffect(() => {
    if (!inView) return;
    const controls = animate(motionVal, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        if (ref.current) {
          ref.current.textContent = prefix + v.toFixed(decimals) + suffix;
        }
      },
    });
    return () => controls.stop();
  }, [inView, value, prefix, suffix, decimals, duration, motionVal]);

  return (
    <span ref={ref} className={className}>
      {prefix}0{suffix}
    </span>
  );
};

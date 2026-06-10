import React, { useRef, useState, useCallback } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  href?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
  as?: 'a' | 'button';
  [key: string]: unknown;
}

/**
 * Emil Kowalski magnetic button — the cursor attracts the element
 * with spring physics, creating a satisfying organic pull.
 */
export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = '',
  strength = 0.35,
  href,
  style,
  onClick,
  as,
  ...rest
}) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 18, mass: 0.6 });
  const springY = useSpring(y, { stiffness: 200, damping: 18, mass: 0.6 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = wrapRef.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  }, [x, y, strength]);

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
    setHovered(false);
  }, [x, y]);

  const inner = (
    <motion.span
      style={{ display: 'inline-flex', alignItems: 'center', gap: 'inherit' }}
      animate={{ scale: hovered ? 1.015 : 1 }}
      transition={{ type: 'spring', stiffness: 280, damping: 20 }}
    >
      {children}
    </motion.span>
  );

  const sharedMotionStyle = { x: springX, y: springY, display: 'inline-flex' as const, ...style };

  return (
    <div
      ref={wrapRef}
      style={{ display: 'inline-flex' }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      {href ? (
        <motion.a href={href} className={className} style={sharedMotionStyle} {...(rest as object)}>
          {inner}
        </motion.a>
      ) : (
        <motion.button onClick={onClick} className={className} style={sharedMotionStyle} {...(rest as object)}>
          {inner}
        </motion.button>
      )}
    </div>
  );
};

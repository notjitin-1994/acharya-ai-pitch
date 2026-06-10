import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedBorderCardProps {
  children: React.ReactNode;
  className?: string;
  borderColor?: string;
  glowColor?: string;
  animated?: boolean;
}

/**
 * Wraps children in a card with an animated rotating gradient border.
 * Emil Kowalski-inspired — subtle, not gaudy.
 */
export const AnimatedBorderCard: React.FC<AnimatedBorderCardProps> = ({
  children,
  className = '',
  borderColor = 'rgba(167,218,219,0.5)',
  glowColor = 'rgba(167,218,219,0.12)',
  animated = true,
}) => {
  return (
    <div className={`relative group ${className}`}>
      <div
        aria-hidden
        className="absolute -inset-[1px] rounded-[inherit] overflow-hidden"
        style={{ zIndex: 0 }}
      >
        <motion.div
          className="absolute inset-[-100%]"
          style={{
            background: `conic-gradient(from 0deg, transparent 0deg, ${borderColor} 60deg, transparent 120deg, transparent 360deg)`,
          }}
          animate={animated ? { rotate: 360 } : {}}
          transition={{ duration: 6, ease: 'linear', repeat: Infinity }}
        />
      </div>
      <div
        aria-hidden
        className="absolute -inset-[1px] rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(ellipse at 50% 0%, ${glowColor} 0%, transparent 70%)`,
          zIndex: 0,
        }}
      />
      <div className="relative rounded-[inherit] bg-[#020C1B]" style={{ zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
};

export const BorderCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  hoverGlow?: boolean;
}> = ({ children, className = '', hoverGlow = true }) => (
  <div className={`relative group ${className}`}>
    <div
      aria-hidden
      className={`absolute -inset-[1px] rounded-[inherit] bg-gradient-to-br from-[#A7DADB]/30 via-[#A7DADB]/5 to-transparent opacity-40 ${
        hoverGlow ? 'group-hover:opacity-100' : ''
      } transition-opacity duration-400`}
      style={{ zIndex: 0 }}
    />
    <div className="relative rounded-[inherit] bg-[#0a1929]" style={{ zIndex: 1 }}>
      {children}
    </div>
  </div>
);

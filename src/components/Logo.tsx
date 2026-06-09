import React from 'react';

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = '' }) => {
  return (
    <div className={`flex items-center press-scale ${className}`}>
      <img
        src="/logo.png"
        alt="Smartslate"
        className="h-9 w-auto object-contain"
        style={{ filter: 'drop-shadow(0 2px 12px rgba(167,218,219,0.35))' }}
      />
    </div>
  );
};

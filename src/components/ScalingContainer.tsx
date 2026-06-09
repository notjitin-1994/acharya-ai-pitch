import React, { useState, useEffect, useRef } from 'react';

interface ScalingContainerProps {
  children: React.ReactNode;
}

export const ScalingContainer: React.FC<ScalingContainerProps> = ({ children }) => {
  const [scale, setScale] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      if (!wrapperRef.current) return;
      
      const { width, height } = wrapperRef.current.getBoundingClientRect();
      
      // Target resolution: 1920x1080 (16:9)
      const targetWidth = 1920;
      const targetHeight = 1080;
      
      // Add a small safety margin (98% of available space)
      const availableWidth = width * 0.98;
      const availableHeight = height * 0.98;
      
      const scaleX = availableWidth / targetWidth;
      const scaleY = availableHeight / targetHeight;
      
      // We want to fit everything inside, so we take the smaller scale
      // Also limit max scale to 1.5 to prevent pixelation on very large screens
      setScale(Math.min(scaleX, scaleY, 1.5));
    };

    window.addEventListener('resize', handleResize);
    // Initial call
    setTimeout(handleResize, 100);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div ref={wrapperRef} className="w-full h-full flex items-center justify-center overflow-hidden">
      <div 
        ref={containerRef}
        style={{
          width: '1920px',
          height: '1080px',
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
          transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
        className="shrink-0 flex items-center justify-center shadow-2xl rounded-[60px]"
      >
        {children}
      </div>
    </div>
  );
};

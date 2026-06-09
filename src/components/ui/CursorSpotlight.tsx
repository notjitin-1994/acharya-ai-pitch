import React, { useEffect, useRef } from 'react';

export const CursorSpotlight: React.FC<{ color?: string }> = ({
  color = 'rgba(167, 218, 219, 0.055)',
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const move = (e: MouseEvent) => {
      el.style.setProperty('--cx', `${e.clientX}px`);
      el.style.setProperty('--cy', `${e.clientY}px`);
    };
    window.addEventListener('mousemove', move, { passive: true });
    return () => window.removeEventListener('mousemove', move);
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[40]"
      style={{
        background: `radial-gradient(500px circle at var(--cx, -999px) var(--cy, -999px), ${color}, transparent 40%)`,
      }}
    />
  );
};

import React from "react";

/**
 * GrainOverlay — fixed pointer-none noise layer at top of stacking order.
 * Place once at the page root, not inside scroll containers (perf).
 */
export const GrainOverlay: React.FC<{ opacity?: number }> = ({ opacity = 0.06 }) => (
  <div
    aria-hidden
    className="grain-overlay fixed inset-0 z-[80] pointer-events-none"
    style={{ opacity }}
  />
);

/**
 * MeshGradient — slow drifting blobs creating atmospheric depth.
 * Wrap inside a section's relative container (not at page root).
 */
export const MeshGradient: React.FC<{
  className?: string;
  intensity?: "low" | "med" | "high";
}> = ({ className = "", intensity = "med" }) => {
  const opacityMap = { low: 0.08, med: 0.14, high: 0.22 };
  const o = opacityMap[intensity];
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} aria-hidden>
      <div
        className="absolute -top-1/3 -left-1/4 w-[1100px] h-[1100px] rounded-full blur-[140px] animate-mesh-drift"
        style={{ background: `radial-gradient(circle, rgba(167,218,219,${o}) 0%, transparent 65%)` }}
      />
      <div
        className="absolute -bottom-1/3 -right-1/4 w-[900px] h-[900px] rounded-full blur-[140px] animate-mesh-drift-2"
        style={{ background: `radial-gradient(circle, rgba(232,199,137,${o * 0.6}) 0%, transparent 65%)` }}
      />
    </div>
  );
};

/**
 * Vignette — soft radial darkening on edges. Use inside cinematic sections.
 */
export const Vignette: React.FC<{ strength?: number }> = ({ strength = 0.55 }) => (
  <div
    aria-hidden
    className="absolute inset-0 pointer-events-none"
    style={{
      background: `radial-gradient(ellipse at center, transparent 35%, rgba(2,12,27,${strength}) 100%)`,
    }}
  />
);

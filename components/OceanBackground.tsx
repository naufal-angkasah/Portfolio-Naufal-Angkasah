"use client";

export default function OceanBackground() {
  return (
    <div className="ocean-background">
      {/* Deep ocean gradient */}
      <div className="ocean-gradient" />

      {/* Light rays from surface */}
      <div className="ocean-rays" />

      {/* Animated waves at bottom */}
      <div className="wave-container">
        <svg
          className="wave-svg"
          viewBox="0 0 2400 80"
          preserveAspectRatio="none"
        >
          <path d="M0,40 C200,80 400,0 600,40 C800,80 1000,0 1200,40 C1400,80 1600,0 1800,40 C2000,80 2200,0 2400,40 L2400,80 L0,80 Z" />
        </svg>
        <svg
          className="wave-svg-2"
          viewBox="0 0 2400 60"
          preserveAspectRatio="none"
        >
          <path d="M0,30 C300,60 600,0 900,30 C1200,60 1500,0 1800,30 C2100,60 2400,0 2400,30 L2400,60 L0,60 Z" />
        </svg>
      </div>
    </div>
  );
}

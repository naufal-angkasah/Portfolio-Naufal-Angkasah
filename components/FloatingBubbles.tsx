"use client";

import { useMemo } from "react";

export default function FloatingBubbles() {
  const bubbles = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        left: `${(i * 17) % 100}%`,
        size: `${8 + ((i * 11) % 28)}px`,
        delay: `${(i * 0.55) % 6}s`,
        duration: `${7 + (i % 6)}s`,
      })),
    []
  );

  return (
    <div className="fixed inset-0 -z-10 opacity-70 pointer-events-none">
      {bubbles.map((b) => (
        <span
          key={b.id}
          className="bubble"
          style={{
            left: b.left,
            width: b.size,
            height: b.size,
            animationDelay: b.delay,
            animationDuration: b.duration,
          }}
        />
      ))}
    </div>
  );
}

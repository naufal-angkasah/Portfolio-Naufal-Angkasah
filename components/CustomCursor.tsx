"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { motion, useSpring } from "framer-motion";

type CursorBubble = {
  id: number;
  x: number;
  y: number;
  size: number;
  rise: number;
  drift: number;
  duration: number;
};

type InkSplash = {
  id: number;
  x: number;
  y: number;
  angle: number;
  spread: number;
  size: number;
};

const isInteractiveElement = (el: Element | null) =>
  Boolean(el?.closest('button, a, [role="button"], input, textarea, select, summary'));

export default function CustomCursor() {
  const [cursor, setCursor] = useState({ x: -120, y: -120, active: false, angle: -8, swimming: false, interactive: false });
  
  const [cursorBubbles, setCursorBubbles] = useState<CursorBubble[]>([]);
  const [inkSplashes, setInkSplashes] = useState<InkSplash[]>([]);
  const cursorBubbleId = useRef(0);
  const inkSplashId = useRef(0);
  const lastCursorBubbleAt = useRef(0);
  const previousCursor = useRef({ x: -120, y: -120 });
  const swimTimer = useRef<number | null>(null);
  const cursorAngle = useRef(-8);

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      const dx = e.clientX - previousCursor.current.x;
      const dy = e.clientY - previousCursor.current.y;
      const dist = Math.hypot(dx, dy);
      const angle = dist > 2 ? Math.atan2(dy, dx) * (180 / Math.PI) - 92 : cursorAngle.current;
      cursorAngle.current = angle;
      const target = document.elementFromPoint(e.clientX, e.clientY);
      const interactive = isInteractiveElement(target);
      document.body.classList.toggle("cursor-interactive", interactive);
      
      previousCursor.current = { x: e.clientX, y: e.clientY };
      setCursor({ x: e.clientX, y: e.clientY, active: true, angle, swimming: dist > 4, interactive });

      if (swimTimer.current) window.clearTimeout(swimTimer.current);
      swimTimer.current = window.setTimeout(() => {
        setCursor((c) => ({ ...c, swimming: false }));
      }, 130);

      const now = performance.now();
      if (now - lastCursorBubbleAt.current > 28) {
        lastCursorBubbleAt.current = now;
        const id = cursorBubbleId.current++;
        const bubble: CursorBubble = {
          id,
          x: e.clientX + (Math.random() * 22 - 11),
          y: e.clientY + (Math.random() * 24 - 12),
          size: 8 + Math.random() * 16,
          rise: window.innerHeight + e.clientY + 120,
          drift: Math.random() * 120 - 60,
          duration: 3.8 + Math.random() * 1.2,
        };
        setCursorBubbles((c) => [...c.slice(-42), bubble]);
        window.setTimeout(() => {
          setCursorBubbles((c) => c.filter((b) => b.id !== id));
        }, 5200);
      }
    };

    const handlePointerLeave = () => {
      document.body.classList.remove("cursor-interactive");
      setCursor((c) => ({ ...c, active: false, interactive: false }));
    };
    const handlePointerEnter = () => setCursor((c) => ({ ...c, active: true }));
    const handlePointerOver = (e: PointerEvent) => {
      const interactive = isInteractiveElement(e.target as Element | null);
      document.body.classList.toggle("cursor-interactive", interactive);
      setCursor((c) => ({ ...c, interactive }));
    };
    const handlePointerDown = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      const baseAngle = cursorAngle.current - 88;
      const splashes = Array.from({ length: 12 }, (_, i) => ({
        id: inkSplashId.current++,
        x: e.clientX + Math.sin(i * 1.7) * 8,
        y: e.clientY + Math.cos(i * 1.3) * 8,
        angle: baseAngle + (i - 5.5) * 7,
        spread: 92 + i * 14,
        size: 0.62 + (i % 5) * 0.13,
      }));
      setInkSplashes((c) => [...c.slice(-24), ...splashes]);
      window.setTimeout(() => {
        const ids = new Set(splashes.map((s) => s.id));
        setInkSplashes((c) => c.filter((item) => !ids.has(item.id)));
      }, 1000);
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("pointerover", handlePointerOver, true);
    document.documentElement.addEventListener("pointerleave", handlePointerLeave);
    document.documentElement.addEventListener("pointerenter", handlePointerEnter);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("pointerover", handlePointerOver, true);
      document.documentElement.removeEventListener("pointerleave", handlePointerLeave);
      document.documentElement.removeEventListener("pointerenter", handlePointerEnter);
      if (swimTimer.current) window.clearTimeout(swimTimer.current);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[120] hidden lg:block" aria-hidden="true">
      {cursorBubbles.map((b) => (
        <motion.span
          key={b.id}
          className="cursor-trail-bubble"
          style={{ left: b.x, top: b.y, width: b.size, height: b.size }}
          initial={{ opacity: 0.96, scale: 0.55, x: "-50%", y: "-50%" }}
          animate={{ opacity: [0.96, 0.82, 0], scale: [0.55, 1.06, 1.38], x: `calc(-50% + ${b.drift}px)`, y: `calc(-50% - ${b.rise}px)` }}
          transition={{ duration: b.duration, ease: [0.16, 0.84, 0.24, 1] }}
        />
      ))}
      {inkSplashes.map((ink) => (
        <span
          key={ink.id}
          className="ink-splash"
          style={{ left: ink.x, top: ink.y, "--ink-angle": `${ink.angle}deg`, "--ink-spread": `${ink.spread}px`, "--ink-size": ink.size } as CSSProperties}
        />
      ))}
      <motion.div
        className={`octopus-cursor ${cursor.active ? "is-active" : ""} ${cursor.swimming ? "is-swimming" : ""} ${cursor.interactive ? "is-interactive" : ""}`}
        style={{ left: cursor.x, top: cursor.y }}
      >
        <motion.div
          className="octopus-rotator"
          animate={{ rotate: cursor.angle, scale: cursor.swimming ? [1.06, 0.94, 1.12] : [1, 1.03, 1] }}
          transition={{ rotate: { type: "spring", stiffness: 260, damping: 20 }, scale: { duration: cursor.swimming ? 0.36 : 1.4, repeat: Infinity, ease: "easeInOut" } }}
        >
          <div className="octopus-body flex items-center justify-center">
            <div className="octopus-glow" />
            <img src="/creatures/octopus-cursor.png" alt="" className="octopus-sprite" draggable="false" />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

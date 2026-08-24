"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface FlowFieldBackgroundProps {
  className?: string;
  color?: string;
  particleCount?: number;
  speed?: number;
  bgColor?: string;
}

export default function FlowFieldBackground({
  className,
  color = "#22d3ee",
  particleCount = 260,
  speed = 0.5,
  bgColor = "#031226",
}: FlowFieldBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let animId: number;
    let tick = 0;

    // Absolute scroll — zero lag
    let currentScrollY = window.scrollY;

    // Mouse in viewport coords
    let mouseX = -9999;
    let mouseY = -9999;

    const setup = () => {
      const dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    const parseColor = (hex: string): [number, number, number] => {
      const c = hex.replace("#", "");
      const n = parseInt(c.length === 3 ? c.split("").map(x => x + x).join("") : c, 16);
      return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
    };
    const [cr, cg, cb] = parseColor(color);
    const [br, bg_, bb] = parseColor(bgColor);

    class Particle {
      // World-space base position
      worldX!: number;
      worldY!: number;

      // Accumulated velocity from cursor interaction only
      // (organic drift handled by sine, not physics)
      velX!: number;
      velY!: number;

      // Sinusoidal wander parameters
      freqX!: number;
      freqY!: number;
      phaseX!: number;
      phaseY!: number;
      ampX!: number;
      ampY!: number;

      driftSpeed!: number;
      depth!: number;
      radius!: number;

      alpha!: number;
      targetAlpha!: number;
      fadeDir!: number;
      age!: number;
      life!: number;

      constructor() { this.reset(true); }

      reset(scatter = false) {
        this.worldX = Math.random() * width;
        this.worldY = scatter
          ? Math.random() * height * 4
          : currentScrollY + height + Math.random() * 100;

        // Very slow sine frequencies → ultra-smooth sway
        this.freqX = 0.00035 + Math.random() * 0.00055;
        this.freqY = 0.00025 + Math.random() * 0.00045;
        this.phaseX = Math.random() * Math.PI * 2;
        this.phaseY = Math.random() * Math.PI * 2;
        // Wider amplitude for more visible, graceful motion
        this.ampX = 40 + Math.random() * 80;
        this.ampY = 20 + Math.random() * 50;

        this.radius = 3 + Math.random() * 10;
        this.driftSpeed = (0.05 + Math.random() * 0.14) * speed;
        this.depth = 0.06 + (this.radius / 13) * 0.25;

        // Start velocity at 0
        this.velX = 0;
        this.velY = 0;

        this.age  = scatter ? Math.floor(Math.random() * 500) : 0;
        this.life = 500 + Math.random() * 600;
        this.alpha = scatter ? Math.random() * 0.5 : 0;
        this.targetAlpha = 0.25 + Math.random() * 0.55;
        this.fadeDir = 1;
      }

      update() {
        this.age++;

        // ── Smooth upward drift ─────────────────────────────────────────
        this.worldY -= this.driftSpeed;

        // Accumulate cursor velocity directly into world position each frame
        // so the displacement is permanent (particle never snaps back)
        this.worldX += this.velX;
        this.worldY += this.velY;

        // ── Compute current screen position ─────────────────────────────
        const parallax = currentScrollY * this.depth;
        const swayX = Math.sin(tick * this.freqX + this.phaseX) * this.ampX;
        const swayY = Math.cos(tick * this.freqY + this.phaseY) * this.ampY;
        const sx = this.worldX + swayX;
        const sy = this.worldY - parallax + swayY;

        // ── Cursor: strong burst, very low friction → keeps drifting away ──
        const dx = mouseX - sx;
        const dy = mouseY - sy;
        const dist = Math.hypot(dx, dy);
        const repelR = 150;

        if (dist < repelR && dist > 1) {
          const t = 1 - dist / repelR;
          const burst = t * t * 14 * speed;
          this.velX -= (dx / dist) * burst;
          this.velY -= (dy / dist) * burst;
        }

        // Very light friction → particle keeps drifting away, never returns
        this.velX *= 0.97;
        this.velY *= 0.97;

        // ── Fade: also fade out when moving fast (fleeing from cursor) ──
        const spd = Math.hypot(this.velX, this.velY);
        if (this.fadeDir === 1) {
          this.alpha = Math.min(this.alpha + 0.006, this.targetAlpha);
          if (this.alpha >= this.targetAlpha) this.fadeDir = -1;
        } else if (this.age > this.life * 0.70 || spd > 3.5) {
          // Speed threshold: fade out quickly when fleeing fast
          const fadeRate = spd > 3.5 ? 0.022 : 0.004;
          this.alpha = Math.max(this.alpha - fadeRate, 0);
        }

        // ── Off-screen on any edge → recycle ────────────────────────────
        const offScreen =
          sy < -this.radius * 6 ||
          sy > height + this.radius * 6 ||
          sx < -this.radius * 6 ||
          sx > width + this.radius * 6;

        if (offScreen || (this.age > this.life && this.alpha <= 0)) {
          this.reset(false);
        }
      }

      draw(c: CanvasRenderingContext2D) {
        if (this.alpha <= 0.01) return;

        const parallax = currentScrollY * this.depth;
        const swayX = Math.sin(tick * this.freqX + this.phaseX) * this.ampX;
        const swayY = Math.cos(tick * this.freqY + this.phaseY) * this.ampY;
        const sx = this.worldX + swayX;
        const sy = this.worldY - parallax + swayY;

        const r = this.radius * 2.8;
        const g = c.createRadialGradient(sx, sy, 0, sx, sy, r);
        g.addColorStop(0,    `rgba(${cr},${cg},${cb},${this.alpha})`);
        g.addColorStop(0.42, `rgba(${cr},${cg},${cb},${(this.alpha * 0.4).toFixed(3)})`);
        g.addColorStop(1,    `rgba(${cr},${cg},${cb},0)`);

        c.beginPath();
        c.arc(sx, sy, r, 0, Math.PI * 2);
        c.fillStyle = g;
        c.fill();
      }
    }

    setup();

    // Spread initial particles across 6× viewport height so all sections are covered
    const particles: Particle[] = Array.from({ length: particleCount }, () => new Particle());

    const loop = () => {
      tick++;
      currentScrollY = window.scrollY;

      // Full clear each frame (no trail artifacts)
      ctx.fillStyle = `rgb(${br},${bg_},${bb})`;
      ctx.fillRect(0, 0, width, height);

      // Vignette
      const vig = ctx.createRadialGradient(
        width / 2, height / 2, height * 0.20,
        width / 2, height / 2, height * 0.88,
      );
      vig.addColorStop(0, "rgba(0,0,0,0)");
      vig.addColorStop(1, "rgba(0,0,0,0.38)");
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, width, height);

      for (const p of particles) {
        p.update();
        p.draw(ctx);
      }

      animId = requestAnimationFrame(loop);
    };

    loop();

    const onMove  = (e: MouseEvent) => { mouseX = e.clientX; mouseY = e.clientY; };
    const onLeave = () => { mouseX = -9999; mouseY = -9999; };
    const onResize = () => { setup(); };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("resize", onResize);
    };
  }, [color, particleCount, speed, bgColor]);

  return (
    <div ref={containerRef} className={cn("absolute inset-0 overflow-hidden", className)}>
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}

"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface FlowFieldBackgroundProps {
  className?: string;
  color?: string;
  trailOpacity?: number;
  particleCount?: number;
  speed?: number;
  bgColor?: string;
}

// ── Lightweight pseudo-noise (no external lib needed) ──────────────────────
// Multiple sine waves at different frequencies + phases → organic, non-repeating
function noiseAngle(x: number, y: number, t: number, seed: number): number {
  const s = seed;
  return (
    Math.sin(x * 0.0031 * (1 + s * 0.3) + y * 0.0019 + t * 0.00018) * Math.PI +
    Math.cos(x * 0.0017 - y * 0.0041 * (1 + s * 0.2) + t * 0.00023 + s) * Math.PI * 0.7 +
    Math.sin((x + y) * 0.0013 + t * 0.00011 + s * 2.1) * Math.PI * 0.4
  );
}

export default function FlowFieldBackground({
  className,
  color = "#22d3ee",
  trailOpacity = 0.042,
  particleCount = 580,
  speed = 0.48,
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
    let tick = 0; // global time counter for animated noise

    // ── Scroll tracking ────────────────────────────────────────────────────
    let lastScrollY = window.scrollY;
    let scrollVelocity = 0; // smoothed scroll speed

    // ── Mouse tracking (window-level so pointer-events-none is fine) ───────
    let mouseX = -9999;
    let mouseY = -9999;

    const hexRgb = (hex: string) => {
      const c = hex.replace("#", "");
      const n = parseInt(c.length === 3 ? c.split("").map(x => x + x).join("") : c, 16);
      return `${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}`;
    };

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

    // ── Particle ───────────────────────────────────────────────────────────
    class Particle {
      x!: number;
      y!: number;
      vx!: number;
      vy!: number;
      age!: number;
      life!: number;
      size!: number;
      // Unique noise seed per particle → each one follows a DIFFERENT path
      seed!: number;
      // Random speed multiplier so they don't all move the same pace
      speedMul!: number;

      constructor(scattered = true) {
        this.init(scattered);
      }

      init(scattered = true) {
        this.seed = Math.random() * 100;
        this.speedMul = 0.5 + Math.random() * 1.2; // 0.5× to 1.7× speed

        if (scattered) {
          // Fill the whole screen on startup
          this.x = Math.random() * width;
          this.y = Math.random() * height;
          this.age = Math.floor(Math.random() * 300);
        } else {
          // Respawn: random position anywhere (not just edges)
          // 70% chance → random position across full canvas
          // 30% chance → spawn near bottom so they drift upward naturally
          if (Math.random() < 0.7) {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
          } else {
            this.x = Math.random() * width;
            this.y = height + Math.random() * 40;
          }
          this.age = 0;
        }

        // Small random initial velocity
        this.vx = (Math.random() - 0.5) * 0.6;
        this.vy = (Math.random() - 0.5) * 0.6;
        this.life = Math.random() * 280 + 150;
        this.size = 0.8 + Math.random() * 1.4;
      }

      update(scrollShift: number) {
        // ── 1. Animated flow field using per-particle seed ─────────────────
        //   Each particle has its own noise "lane" → no two particles look the same
        const angle = noiseAngle(this.x, this.y, tick, this.seed);
        const f = speed * this.speedMul;

        // Flow-field force
        const flowVX = Math.cos(angle) * 0.38 * f;
        const flowVY = Math.sin(angle) * 0.38 * f;

        // Small random Brownian kick each frame → breaks any lingering regularity
        const randKickX = (Math.random() - 0.5) * 0.25 * f;
        const randKickY = (Math.random() - 0.5) * 0.25 * f;

        // Gentle upward drift (bioluminescent particles float)
        const driftVY = -0.04 * f;

        // ── 2. Scroll parallax ──────────────────────────────────────────────
        //   Different particles scroll at slightly different rates (depth illusion)
        const depth = 0.3 + this.seed * 0.004; // 0.3 – 0.7 based on seed
        const parallaxVY = scrollShift * depth;

        // ── 3. Mouse repulsion ──────────────────────────────────────────────
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const dist = Math.hypot(dx, dy);
        const radius = 130;
        let repX = 0, repY = 0;
        if (dist < radius && dist > 0.5) {
          const power = Math.pow(1 - dist / radius, 2.2) * 7;
          repX = -(dx / dist) * power;
          repY = -(dy / dist) * power;
        }

        // ── 4. Accumulate & dampen ──────────────────────────────────────────
        this.vx = (this.vx + flowVX + randKickX + repX) * 0.88;
        this.vy = (this.vy + flowVY + randKickY + driftVY - parallaxVY + repY) * 0.88;

        this.x += this.vx;
        this.y += this.vy;
        this.age++;

        // ── 5. Lifetime / boundary ──────────────────────────────────────────
        const expired = this.age > this.life;
        const offTop = this.y < -40;
        const offBottom = this.y > height + 40;
        const offSide = this.x < -40 || this.x > width + 40;

        if (expired || offTop || offBottom || offSide) {
          this.init(false);
        }
      }

      draw(c: CanvasRenderingContext2D) {
        const progress = this.age / this.life;
        const alpha =
          progress < 0.1 ? (progress / 0.1) * 0.65
          : progress > 0.8 ? ((1 - progress) / 0.2) * 0.65
          : 0.65;

        c.globalAlpha = alpha;
        c.fillStyle = color;
        c.beginPath();
        c.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        c.fill();
      }
    }

    // ── Bootstrap ──────────────────────────────────────────────────────────
    setup();
    const particles: Particle[] = Array.from({ length: particleCount }, () => new Particle(true));

    // ── Render loop ────────────────────────────────────────────────────────
    const loop = () => {
      tick++;

      // Smooth scroll velocity (exponential decay so it doesn't snap)
      const curScroll = window.scrollY;
      const rawDelta = curScroll - lastScrollY;
      lastScrollY = curScroll;
      // Blend toward raw delta, then decay — gives natural ease-in/out feel
      scrollVelocity = scrollVelocity * 0.7 + rawDelta * 0.3;

      // Trail: very translucent fill → long ghostly smears
      ctx.globalAlpha = 1;
      ctx.fillStyle = `rgba(${hexRgb(bgColor)}, ${trailOpacity})`;
      ctx.fillRect(0, 0, width, height);

      for (const p of particles) {
        p.update(scrollVelocity);
        p.draw(ctx);
      }
      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(loop);
    };

    loop();

    // ── Event listeners ────────────────────────────────────────────────────
    const onMove = (e: MouseEvent) => { mouseX = e.clientX; mouseY = e.clientY; };
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
  }, [color, trailOpacity, particleCount, speed, bgColor]);

  return (
    <div ref={containerRef} className={cn("absolute inset-0 overflow-hidden", className)}>
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}

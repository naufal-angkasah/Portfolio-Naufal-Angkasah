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
  particleCount = 130,
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

    // ── Scroll: track absolute position, NOT delta/velocity ──────────────
    // This eliminates lag — particles are always computed from current scrollY
    let currentScrollY = window.scrollY;

    // ── Mouse ─────────────────────────────────────────────────────────────
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
      // "World" Y — the particle's position as if page doesn't scroll
      // Rendered Y = worldY - scrollY * depth  (instant, no lag)
      worldX!: number;
      worldY!: number;

      // Sinusoidal wander (applied on top of world position)
      freqX!: number;
      freqY!: number;
      phaseX!: number;
      phaseY!: number;
      ampX!: number;
      ampY!: number;

      // Drift (world Y decreases = drifts upward in world space)
      driftSpeed!: number;

      // Parallax depth: 0 = no parallax, 1 = 1:1 with scroll
      // Deeper particles (larger) move more with scroll
      depth!: number;

      radius!: number;
      alpha!: number;
      targetAlpha!: number;
      fadeDir!: number;
      age!: number;
      life!: number;

      constructor() {
        this.reset(true);
      }

      reset(scatter = false) {
        this.worldX = Math.random() * width;

        if (scatter) {
          // Spread across the entire scrollable area on init
          // Use a virtual "world height" several times taller than viewport
          this.worldY = Math.random() * height * 4;
        } else {
          // Respawn: place near the current bottom of viewport in world coords
          // so it will drift upward into view naturally
          this.worldY = currentScrollY + height + Math.random() * 80;
        }

        this.freqX = 0.0007 + Math.random() * 0.0010;
        this.freqY = 0.0005 + Math.random() * 0.0009;
        this.phaseX = Math.random() * Math.PI * 2;
        this.phaseY = Math.random() * Math.PI * 2;
        this.ampX   = 25 + Math.random() * 55;
        this.ampY   = 15 + Math.random() * 35;

        this.radius     = 3 + Math.random() * 9;
        this.driftSpeed = (0.07 + Math.random() * 0.16) * speed;

        // Depth based on radius: bigger = "closer" = more parallax offset
        this.depth = 0.08 + (this.radius / 12) * 0.22;

        this.age  = scatter ? Math.floor(Math.random() * 400) : 0;
        this.life = 450 + Math.random() * 500;

        this.alpha       = scatter ? Math.random() * 0.45 : 0;
        this.targetAlpha = 0.28 + Math.random() * 0.52;
        this.fadeDir     = 1;
      }

      update() {
        this.age++;

        // ── Drift upward in world space ──────────────────────────────────
        this.worldY -= this.driftSpeed;

        // ── Compute screen position: instant, lag-free ───────────────────
        // parallaxOffset = how much this particle shifts due to scroll
        // Positive scrollY (scrolled down) → particle appears higher → subtract
        const parallaxOffset = currentScrollY * this.depth;

        const swayX = Math.sin(tick * this.freqX + this.phaseX) * this.ampX;
        const swayY = Math.cos(tick * this.freqY + this.phaseY) * this.ampY;

        const screenX = this.worldX + swayX;
        const screenY = this.worldY - parallaxOffset + swayY;

        // ── Mouse repulsion (in screen space) ────────────────────────────
        const dx = mouseX - screenX;
        const dy = mouseY - screenY;
        const dist = Math.hypot(dx, dy);
        const repelR = 130;
        if (dist < repelR && dist > 1) {
          const strength = Math.pow(1 - dist / repelR, 2) * 4;
          this.worldX -= (dx / dist) * strength;
          this.worldY -= (dy / dist) * strength;
        }

        // ── Fade in/out ──────────────────────────────────────────────────
        if (this.fadeDir === 1) {
          this.alpha = Math.min(this.alpha + 0.007, this.targetAlpha);
          if (this.alpha >= this.targetAlpha) this.fadeDir = -1;
        } else if (this.age > this.life * 0.72) {
          this.alpha = Math.max(this.alpha - 0.005, 0);
        }

        // ── Wrap X ───────────────────────────────────────────────────────
        if (this.worldX < -80) this.worldX = width + 60;
        if (this.worldX > width + 80) this.worldX = -60;

        // ── Recycle when gone above viewport or fully faded ──────────────
        if (screenY < -this.radius * 4 || (this.age > this.life && this.alpha <= 0)) {
          this.reset(false);
        }
      }

      draw(c: CanvasRenderingContext2D) {
        if (this.alpha <= 0.01) return;

        const parallaxOffset = currentScrollY * this.depth;
        const swayX = Math.sin(tick * this.freqX + this.phaseX) * this.ampX;
        const swayY = Math.cos(tick * this.freqY + this.phaseY) * this.ampY;
        const sx = this.worldX + swayX;
        const sy = this.worldY - parallaxOffset + swayY;

        const r = this.radius * 2.5;
        const grad = c.createRadialGradient(sx, sy, 0, sx, sy, r);
        grad.addColorStop(0,   `rgba(${cr},${cg},${cb},${this.alpha})`);
        grad.addColorStop(0.45,`rgba(${cr},${cg},${cb},${this.alpha * 0.45})`);
        grad.addColorStop(1,   `rgba(${cr},${cg},${cb},0)`);

        c.beginPath();
        c.arc(sx, sy, r, 0, Math.PI * 2);
        c.fillStyle = grad;
        c.fill();
      }
    }

    setup();
    const particles: Particle[] = Array.from({ length: particleCount }, () => new Particle());

    const loop = () => {
      tick++;
      // Read scroll position fresh every frame — no smoothing, no lag
      currentScrollY = window.scrollY;

      // Clear canvas fully each frame
      ctx.fillStyle = `rgb(${br},${bg_},${bb})`;
      ctx.fillRect(0, 0, width, height);

      // Subtle vignette
      const vig = ctx.createRadialGradient(
        width / 2, height / 2, height * 0.22,
        width / 2, height / 2, height * 0.9,
      );
      vig.addColorStop(0, "rgba(0,0,0,0)");
      vig.addColorStop(1, "rgba(0,0,0,0.4)");
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

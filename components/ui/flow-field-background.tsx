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
  particleCount = 140,
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

    // Scroll
    let lastScrollY = window.scrollY;
    let scrollVel = 0;

    // Mouse
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

    // Parse hex color to [r,g,b]
    const parseColor = (hex: string): [number, number, number] => {
      const c = hex.replace("#", "");
      const n = parseInt(c.length === 3 ? c.split("").map(x => x + x).join("") : c, 16);
      return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
    };
    const [cr, cg, cb] = parseColor(color);
    const [br, bg_, bb] = parseColor(bgColor);

    class Particle {
      x!: number;
      y!: number;
      // Base position for sinusoidal wander
      baseX!: number;
      baseY!: number;
      // Each particle wanders along its own sin/cos path
      freqX!: number;
      freqY!: number;
      phaseX!: number;
      phaseY!: number;
      ampX!: number;
      ampY!: number;
      // Glow size
      radius!: number;
      // Drift speed upward
      driftSpeed!: number;
      // Opacity / life
      alpha!: number;
      targetAlpha!: number;
      fadeDir!: number;     // 1 = fading in, -1 = fading out
      age!: number;
      life!: number;

      constructor() {
        this.reset(true);
      }

      reset(scatter = false) {
        // Scatter across whole screen on init, otherwise appear anywhere
        this.baseX = Math.random() * width;
        this.baseY = scatter ? Math.random() * height : Math.random() * height;

        this.x = this.baseX;
        this.y = this.baseY;

        // Unique sinusoidal wobble per particle
        this.freqX = 0.0008 + Math.random() * 0.0012;
        this.freqY = 0.0006 + Math.random() * 0.0010;
        this.phaseX = Math.random() * Math.PI * 2;
        this.phaseY = Math.random() * Math.PI * 2;
        this.ampX = 30 + Math.random() * 60;   // horizontal sway width
        this.ampY = 20 + Math.random() * 40;   // vertical bob amplitude

        this.radius = 3 + Math.random() * 9;
        this.driftSpeed = (0.08 + Math.random() * 0.18) * speed;

        this.age = scatter ? Math.floor(Math.random() * 400) : 0;
        this.life = 400 + Math.random() * 500;
        this.alpha = scatter ? Math.random() * 0.5 : 0;
        this.targetAlpha = 0.3 + Math.random() * 0.55;
        this.fadeDir = 1;
      }

      update(scrollShift: number) {
        this.age++;

        // Sine/cosine-based wandering — smooth, natural, no jitter
        const t = tick;
        const swayX = Math.sin(t * this.freqX + this.phaseX) * this.ampX;
        const swayY = Math.cos(t * this.freqY + this.phaseY) * this.ampY;

        this.x = this.baseX + swayX;
        this.y = this.baseY + swayY;

        // Drift upward slowly
        this.baseY -= this.driftSpeed;

        // Scroll parallax — deeper particles (smaller radius) scroll slower
        const depth = 0.2 + (this.radius / 12) * 0.6;
        this.baseY -= scrollShift * depth;

        // Mouse repulsion — smooth push away
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const dist = Math.hypot(dx, dy);
        const repelRadius = 140;
        if (dist < repelRadius && dist > 1) {
          const strength = Math.pow(1 - dist / repelRadius, 2) * 5;
          this.baseX -= (dx / dist) * strength;
          this.baseY -= (dy / dist) * strength;
        }

        // Fade in / out
        if (this.fadeDir === 1) {
          this.alpha = Math.min(this.alpha + 0.008, this.targetAlpha);
          if (this.alpha >= this.targetAlpha) this.fadeDir = -1;
        } else if (this.age > this.life * 0.7) {
          this.alpha = Math.max(this.alpha - 0.006, 0);
        }

        // Recycle when it drifts off top or fully fades out
        if (this.baseY < -this.radius * 3 || (this.age > this.life && this.alpha <= 0)) {
          this.reset(false);
        }

        // Constrain base X to stay roughly on screen
        if (this.baseX < -100) this.baseX = width + 80;
        if (this.baseX > width + 100) this.baseX = -80;
      }

      draw(c: CanvasRenderingContext2D) {
        if (this.alpha <= 0.01) return;

        // Soft glowing orb via radial gradient
        const grad = c.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.radius * 2.5,
        );
        grad.addColorStop(0,   `rgba(${cr},${cg},${cb},${this.alpha})`);
        grad.addColorStop(0.4, `rgba(${cr},${cg},${cb},${this.alpha * 0.5})`);
        grad.addColorStop(1,   `rgba(${cr},${cg},${cb},0)`);

        c.beginPath();
        c.arc(this.x, this.y, this.radius * 2.5, 0, Math.PI * 2);
        c.fillStyle = grad;
        c.fill();
      }
    }

    setup();
    const particles: Particle[] = Array.from({ length: particleCount }, () => new Particle());

    const loop = () => {
      tick++;

      // Smooth scroll velocity
      const curY = window.scrollY;
      const raw = curY - lastScrollY;
      lastScrollY = curY;
      scrollVel = scrollVel * 0.75 + raw * 0.25;

      // Clear canvas cleanly each frame — no trails, just crisp glowing dots
      ctx.fillStyle = `rgb(${br},${bg_},${bb})`;
      ctx.fillRect(0, 0, width, height);

      // Draw a subtle vignette once per frame so it feels immersive
      const vig = ctx.createRadialGradient(
        width / 2, height / 2, height * 0.25,
        width / 2, height / 2, height * 0.85,
      );
      vig.addColorStop(0, "rgba(0,0,0,0)");
      vig.addColorStop(1, "rgba(0,0,0,0.45)");
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, width, height);

      for (const p of particles) {
        p.update(scrollVel);
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

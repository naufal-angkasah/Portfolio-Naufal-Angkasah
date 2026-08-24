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

export default function FlowFieldBackground({
  className,
  color = "#22d3ee",
  trailOpacity = 0.04,
  particleCount = 550,
  speed = 0.22,
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

    // ── Scroll tracking ─────────────────────────────────────────
    let lastScrollY = window.scrollY;
    let scrollDelta = 0; // pixels scrolled this frame

    // ── Mouse tracking ──────────────────────────────────────────
    // Use document-level coords, converted to canvas coords each frame
    let mouseX = -9999;
    let mouseY = -9999;

    // ── DPR setup ───────────────────────────────────────────────
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

    // ── Hex → rgb ─────────────────────────────────────────────
    const hexRgb = (hex: string) => {
      const c = hex.replace("#", "");
      const n = parseInt(c.length === 3 ? c.split("").map(x => x + x).join("") : c, 16);
      return `${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}`;
    };

    // ── Particle ──────────────────────────────────────────────
    class Particle {
      x!: number;
      y!: number;
      vx!: number;
      vy!: number;
      age!: number;
      life!: number;
      size!: number;
      // base flow-field velocity (independent of scroll/mouse)
      bvx!: number;
      bvy!: number;

      constructor(randomAge = true) {
        this.spawn(randomAge);
      }

      spawn(randomAge = false) {
        this.x = Math.random() * width;
        // When randomAge=true (initial fill), spread across whole screen
        // When false (respawn), start from bottom or edges
        this.y = randomAge
          ? Math.random() * height
          : height + Math.random() * 20;
        this.bvx = (Math.random() - 0.5) * 0.4;
        this.bvy = -(Math.random() * 0.15 + 0.05); // slight upward drift
        this.vx = this.bvx;
        this.vy = this.bvy;
        this.age = randomAge ? Math.floor(Math.random() * 300) : 0;
        this.life = Math.random() * 350 + 200;
        this.size = 0.9 + Math.random() * 1.1;
      }

      update(scrollShift: number) {
        // ── 1. Flow field angle (slow, organic) ─────────────
        const nx = this.x * 0.0025;
        const ny = this.y * 0.0025;
        const angle =
          Math.cos(nx + ny * 0.6) * Math.PI +
          Math.sin(nx * 1.1 - ny * 0.5) * Math.PI * 0.4;

        this.bvx += Math.cos(angle) * 0.025 * speed;
        this.bvy += Math.sin(angle) * 0.025 * speed;

        // slight upward drift — bioluminescent particles float up
        this.bvy -= 0.008 * speed;

        // friction on base velocity
        this.bvx *= 0.94;
        this.bvy *= 0.94;

        // ── 2. Scroll parallax shift ─────────────────────────
        // scrollShift > 0 when scrolling down → push particles up
        // parallax factor 0.55: particles move slightly slower than scroll
        const parallaxVY = scrollShift * 0.55;

        // ── 3. Mouse repulsion ───────────────────────────────
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const dist = Math.hypot(dx, dy);
        const repelRadius = 110;
        let repelVX = 0;
        let repelVY = 0;

        if (dist < repelRadius && dist > 0.5) {
          // Strong repulsion — falls off with distance
          const strength = Math.pow(1 - dist / repelRadius, 2) * 6.5;
          repelVX = -(dx / dist) * strength;
          repelVY = -(dy / dist) * strength;
        }

        // ── 4. Combine velocities ────────────────────────────
        this.vx = this.bvx + repelVX;
        this.vy = this.bvy - parallaxVY + repelVY;

        this.x += this.vx;
        this.y += this.vy;
        this.age++;

        // ── 5. Boundary handling ─────────────────────────────
        if (this.x < -15) this.x = width + 15;
        if (this.x > width + 15) this.x = -15;

        // If particle exits top or has lived its life → respawn from bottom
        if (this.y < -30 || this.age > this.life) {
          this.spawn(false);
        }

        // If particle exits bottom (e.g. scroll up) → respawn from top
        if (this.y > height + 30) {
          this.x = Math.random() * width;
          this.y = -10;
          this.bvx = (Math.random() - 0.5) * 0.4;
          this.bvy = Math.random() * 0.2 + 0.05;
          this.vx = this.bvx;
          this.vy = this.bvy;
          this.age = 0;
          this.life = Math.random() * 350 + 200;
        }
      }

      draw(c: CanvasRenderingContext2D) {
        const progress = this.age / this.life;
        const alpha =
          progress < 0.12
            ? (progress / 0.12) * 0.6
            : progress > 0.82
            ? ((1 - progress) / 0.18) * 0.6
            : 0.6;

        c.globalAlpha = alpha;
        c.fillStyle = color;
        c.beginPath();
        c.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        c.fill();
      }
    }

    // ── Init ────────────────────────────────────────────────────
    setup();
    const particles = Array.from({ length: particleCount }, () => new Particle(true));

    // ── Animate loop ────────────────────────────────────────────
    const loop = () => {
      // Compute scroll delta this frame
      const curScroll = window.scrollY;
      scrollDelta = curScroll - lastScrollY;
      lastScrollY = curScroll;

      // Trail fill — very low opacity → long ghostly trails
      ctx.globalAlpha = 1;
      ctx.fillStyle = `rgba(${hexRgb(bgColor)}, ${trailOpacity})`;
      ctx.fillRect(0, 0, width, height);

      for (const p of particles) {
        p.update(scrollDelta);
        p.draw(ctx);
      }

      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(loop);
    };

    loop();

    // ── Mouse tracking ───────────────────────────────────────────
    // We track viewport-relative coords — same as canvas coords since it's fixed
    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    const onLeave = () => {
      mouseX = -9999;
      mouseY = -9999;
    };

    const onResize = () => {
      setup();
    };

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
    <div
      ref={containerRef}
      className={cn("absolute inset-0 overflow-hidden", className)}
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}

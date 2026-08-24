"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface NeuralBackgroundProps {
  className?: string;
  /**
   * Color of the particles.
   * Defaults to deep-ocean cyan.
   */
  color?: string;
  /**
   * The opacity of the trails (0.0 to 1.0).
   * Lower = longer, ghostlier trails — ideal for deep ocean effect.
   * Default: 0.04
   */
  trailOpacity?: number;
  /**
   * Number of particles. Default: 600
   */
  particleCount?: number;
  /**
   * Speed multiplier. Keep ≤ 0.4 for deep-ocean feel. Default: 0.25
   */
  speed?: number;
  /**
   * Background fill color under trails. Should match the page bg.
   * Default: #031226 (deep ocean dark)
   */
  bgColor?: string;
}

export default function NeuralBackground({
  className,
  color = "#22d3ee",
  trailOpacity = 0.04,
  particleCount = 600,
  speed = 0.25,
  bgColor = "#031226",
}: NeuralBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = container.clientWidth;
    let height = container.clientHeight;
    let particles: Particle[] = [];
    let animationFrameId: number;
    // Keep mouse far off-screen by default — only react when user hovers
    let mouse = { x: -9999, y: -9999 };

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      age: number;
      life: number;
      // Each particle gets a slight random size for organic variation
      size: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.age = Math.floor(Math.random() * 200); // stagger start ages
        this.life = Math.random() * 400 + 250; // longer life for slow ocean feel
        this.size = 1 + Math.random() * 1.2;
      }

      update() {
        // Ocean-like flow: gentle, layered sine/cosine waves
        // Multiple overlapping frequencies simulate deep-water turbulence
        const nx = this.x * 0.003;
        const ny = this.y * 0.003;
        const angle =
          Math.cos(nx + ny * 0.7) * Math.PI +
          Math.sin(nx * 1.3 - ny * 0.4) * Math.PI * 0.5;

        // Very gentle force — deep ocean, not a river
        this.vx += Math.cos(angle) * 0.04 * speed;
        this.vy += Math.sin(angle) * 0.04 * speed;

        // Slow upward drift (tiny bubbles rising)
        this.vy -= 0.005 * speed;

        // Subtle mouse repulsion — like disturbing still water
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.hypot(dx, dy);
        const interactionRadius = 120;
        if (dist < interactionRadius && dist > 0) {
          const force = ((interactionRadius - dist) / interactionRadius) * 0.04;
          this.vx -= dx * force;
          this.vy -= dy * force;
        }

        // Heavy friction — keeps everything slow
        this.vx *= 0.92;
        this.vy *= 0.92;

        this.x += this.vx;
        this.y += this.vy;
        this.age++;

        if (this.age > this.life) {
          this.reset();
        }

        // Wrap
        if (this.x < -10) this.x = width + 10;
        if (this.x > width + 10) this.x = -10;
        if (this.y < -10) this.y = height + 10;
        if (this.y > height + 10) this.y = -10;
      }

      reset() {
        // Respawn at edges to simulate particles drifting in from the abyss
        const edge = Math.floor(Math.random() * 4);
        if (edge === 0) { this.x = Math.random() * width; this.y = -5; }
        else if (edge === 1) { this.x = width + 5; this.y = Math.random() * height; }
        else if (edge === 2) { this.x = Math.random() * width; this.y = height + 5; }
        else { this.x = -5; this.y = Math.random() * height; }

        this.vx = (Math.random() - 0.5) * 0.2;
        this.vy = (Math.random() - 0.5) * 0.2;
        this.age = 0;
        this.life = Math.random() * 400 + 250;
        this.size = 1 + Math.random() * 1.2;
      }

      draw(context: CanvasRenderingContext2D) {
        // Smooth fade in / fade out based on age progress
        const progress = this.age / this.life;
        const alpha =
          progress < 0.15
            ? progress / 0.15            // fade in
            : progress > 0.8
            ? (1 - progress) / 0.2       // fade out
            : 1;                          // full opacity

        context.globalAlpha = alpha * 0.55; // Keep subtle — this is ambience, not UI
        context.fillStyle = color;
        context.beginPath();
        context.arc(this.x, this.y, this.size * 0.6, 0, Math.PI * 2);
        context.fill();
      }
    }

    const init = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      // Trailing fill matches deep-ocean bg — very low opacity = long ghostly trails
      ctx.fillStyle = `rgba(${hexToRgb(bgColor)}, ${trailOpacity})`;
      ctx.fillRect(0, 0, width, height);

      ctx.globalAlpha = 1;
      particles.forEach((p) => {
        p.update();
        p.draw(ctx);
      });

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      width = container.clientWidth;
      height = container.clientHeight;
      init();
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    init();
    animate();

    window.addEventListener("resize", handleResize);
    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [color, trailOpacity, particleCount, speed, bgColor]);

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full h-full overflow-hidden", className)}
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}

/** Convert hex color to "r, g, b" string for rgba() trail fill */
function hexToRgb(hex: string): string {
  const clean = hex.replace("#", "");
  const num = parseInt(clean.length === 3
    ? clean.split("").map((c) => c + c).join("")
    : clean, 16);
  return `${(num >> 16) & 255}, ${(num >> 8) & 255}, ${num & 255}`;
}

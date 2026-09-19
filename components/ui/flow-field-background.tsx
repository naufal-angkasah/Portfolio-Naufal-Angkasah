"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { useReady } from "@/context/ReadyContext";
import { READY_IDS } from "@/components/LoadingScreen";

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
  particleCount,
  speed = 0.5,
  bgColor = "#031226",
}: FlowFieldBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { reportReady } = useReady();

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let animId: number;
    let tick = 0;
    let isPaused = false;

    // Adaptive particle count based on device screen / capability
    const isMobile = width < 768;
    const count = particleCount ?? (isMobile ? 80 : 150);

    // Absolute scroll — zero lag
    let currentScrollY = window.scrollY;

    // Mouse in viewport coords
    let mouseX = -9999;
    let mouseY = -9999;

    const parseColor = (hex: string): [number, number, number] => {
      const c = hex.replace("#", "");
      const n = parseInt(c.length === 3 ? c.split("").map((x) => x + x).join("") : c, 16);
      return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
    };
    const [cr, cg, cb] = parseColor(color);
    const [br, bg_, bb] = parseColor(bgColor);

    // ── High Performance Offscreen Sprite Caching ────────────────────────────
    // Create 1 pre-rendered glow texture so we don't call createRadialGradient 15,000x / sec!
    const SPRITE_SIZE = 64;
    const spriteCanvas = document.createElement("canvas");
    spriteCanvas.width = SPRITE_SIZE;
    spriteCanvas.height = SPRITE_SIZE;
    const sCtx = spriteCanvas.getContext("2d");
    if (sCtx) {
      const half = SPRITE_SIZE / 2;
      const grad = sCtx.createRadialGradient(half, half, 0, half, half, half);
      grad.addColorStop(0, `rgba(${cr},${cg},${cb},1)`);
      grad.addColorStop(0.35, `rgba(${cr},${cg},${cb},0.55)`);
      grad.addColorStop(0.7, `rgba(${cr},${cg},${cb},0.15)`);
      grad.addColorStop(1, `rgba(${cr},${cg},${cb},0)`);
      sCtx.fillStyle = grad;
      sCtx.fillRect(0, 0, SPRITE_SIZE, SPRITE_SIZE);
    }

    // ── Cached Vignette Gradient ─────────────────────────────────────────────
    let vigCanvas: HTMLCanvasElement | null = null;
    const createVignette = (w: number, h: number) => {
      vigCanvas = document.createElement("canvas");
      vigCanvas.width = Math.min(w, 512);
      vigCanvas.height = Math.min(h, 512);
      const vCtx = vigCanvas.getContext("2d");
      if (vCtx) {
        const vw = vigCanvas.width;
        const vh = vigCanvas.height;
        const vig = vCtx.createRadialGradient(vw / 2, vh / 2, vh * 0.2, vw / 2, vh / 2, vh * 0.9);
        vig.addColorStop(0, "rgba(0,0,0,0)");
        vig.addColorStop(1, "rgba(0,0,0,0.38)");
        vCtx.fillStyle = vig;
        vCtx.fillRect(0, 0, vw, vh);
      }
    };

    const setup = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2); // Cap at 2x DPR to save mobile GPU
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
      createVignette(width, height);
    };

    class Particle {
      worldX!: number;
      worldY!: number;
      velX!: number;
      velY!: number;
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

      constructor() {
        this.reset(true);
      }

      reset(scatter = false) {
        this.worldX = Math.random() * width;
        const targetScreenY = Math.random() * height;
        const tempDepth = 0.1 + Math.random() * 0.15;
        this.worldY = targetScreenY + currentScrollY * tempDepth;

        this.freqX = 0.00035 + Math.random() * 0.00055;
        this.freqY = 0.00025 + Math.random() * 0.00045;
        this.phaseX = Math.random() * Math.PI * 2;
        this.phaseY = Math.random() * Math.PI * 2;
        this.ampX = 35 + Math.random() * 70;
        this.ampY = 18 + Math.random() * 45;

        this.radius = 3 + Math.random() * 9;
        this.driftSpeed = (0.16 + Math.random() * 0.28) * speed;
        this.depth = tempDepth;
        this.velX = 0;
        this.velY = 0;

        this.age = scatter ? Math.floor(Math.random() * 400) : 0;
        this.life = 380 + Math.random() * 450;
        this.alpha = scatter ? Math.random() * 0.45 : 0;
        this.targetAlpha = 0.25 + Math.random() * 0.55;
        this.fadeDir = 1;
      }

      update() {
        this.age++;
        this.worldY -= this.driftSpeed;
        this.worldX += this.velX;
        this.worldY += this.velY;

        const parallax = currentScrollY * this.depth;
        const swayX = Math.sin(tick * this.freqX + this.phaseX) * this.ampX;
        const swayY = Math.cos(tick * this.freqY + this.phaseY) * this.ampY;
        const sx = this.worldX + swayX;
        const sy = this.worldY - parallax + swayY;

        // Cursor repulsion
        const dx = mouseX - sx;
        const dy = mouseY - sy;
        const dist = Math.hypot(dx, dy);
        const repelR = 140;

        if (dist < repelR && dist > 1) {
          const t = 1 - dist / repelR;
          const burst = t * t * 12 * speed;
          this.velX -= (dx / dist) * burst;
          this.velY -= (dy / dist) * burst;
        }

        this.velX *= 0.96;
        this.velY *= 0.96;

        const spd = Math.hypot(this.velX, this.velY);
        if (this.fadeDir === 1) {
          this.alpha = Math.min(this.alpha + 0.008, this.targetAlpha);
          if (this.alpha >= this.targetAlpha) this.fadeDir = -1;
        } else if (this.age > this.life * 0.7 || spd > 3.5) {
          const fadeRate = spd > 3.5 ? 0.024 : 0.004;
          this.alpha = Math.max(this.alpha - fadeRate, 0);
        }

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

        const diameter = this.radius * 5.2;
        c.globalAlpha = this.alpha;
        // Superfast GPU texture blit
        c.drawImage(spriteCanvas, sx - diameter / 2, sy - diameter / 2, diameter, diameter);
      }
    }

    setup();
    const particles: Particle[] = Array.from({ length: count }, () => new Particle());

    reportReady(READY_IDS.PARTICLES);

    const loop = () => {
      if (isPaused) {
        animId = requestAnimationFrame(loop);
        return;
      }

      tick++;
      currentScrollY = window.scrollY;

      // Fast background clear
      ctx.globalAlpha = 1;
      ctx.fillStyle = `rgb(${br},${bg_},${bb})`;
      ctx.fillRect(0, 0, width, height);

      // Blit cached vignette
      if (vigCanvas) {
        ctx.drawImage(vigCanvas, 0, 0, width, height);
      }

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw(ctx);
      }

      animId = requestAnimationFrame(loop);
    };

    loop();

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
    const onVisibilityChange = () => {
      isPaused = document.hidden;
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    window.addEventListener("resize", onResize, { passive: true });
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [color, particleCount, speed, bgColor, reportReady]);

  return (
    <div ref={containerRef} className={cn("absolute inset-0 overflow-hidden", className)}>
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}

"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Waves, Shield, Cpu, Terminal } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useReady } from "@/context/ReadyContext";

// Tracked IDs — every component that calls reportReady() must match one of these
export const READY_IDS = {
  DOM:        "dom",        // window load (all imgs, stylesheets)
  FONTS:      "fonts",      // document.fonts.ready
  HERO:       "hero",       // HeroSection mounted
  PARTICLES:  "particles",  // FlowFieldBackground canvas initialized
  SEA:        "sea",        // SeaCreatures mounted
} as const;

// Human-readable milestone labels used for progress display
const MILESTONES: { id: string; weight: number }[] = [
  { id: READY_IDS.FONTS,     weight: 15 },
  { id: READY_IDS.DOM,       weight: 30 },
  { id: READY_IDS.PARTICLES, weight: 20 },
  { id: READY_IDS.SEA,       weight: 15 },
  { id: READY_IDS.HERO,      weight: 20 },
];
const TOTAL_WEIGHT = MILESTONES.reduce((s, m) => s + m.weight, 0);

export default function LoadingScreen() {
  const { language } = useLanguage();
  const { onAllReady, reportReady } = useReady();

  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const completedWeight = useRef(0);
  const dismissed = useRef(false);

  // ── Dismiss once fully ready ────────────────────────────────────────────
  const dismiss = () => {
    if (dismissed.current) return;
    dismissed.current = true;
    setProgress(100);
    // Small pause at 100% so user sees the "complete" state
    setTimeout(() => setVisible(false), 600);
  };

  // ── Track each milestone independently ────────────────────────────────
  useEffect(() => {
    const advance = (id: string) => {
      const m = MILESTONES.find((x) => x.id === id);
      if (!m) return;
      completedWeight.current = Math.min(
        completedWeight.current + m.weight,
        TOTAL_WEIGHT,
      );
      setProgress(Math.round((completedWeight.current / TOTAL_WEIGHT) * 99));
    };

    // ── 1. Fonts ready ────────────────────────────────────────────────────
    document.fonts.ready.then(() => {
      advance(READY_IDS.FONTS);
      reportReady(READY_IDS.FONTS);
    });

    // ── 2. Window fully loaded (imgs, stylesheets, scripts) ───────────────
    const onLoad = () => {
      advance(READY_IDS.DOM);
      reportReady(READY_IDS.DOM);
    };
    if (document.readyState === "complete") {
      onLoad();
    } else {
      window.addEventListener("load", onLoad, { once: true });
    }

    // ── 3. Wait for all component ready signals ───────────────────────────
    const allIds = Object.values(READY_IDS);
    const unsub = onAllReady(allIds, dismiss);

    // ── 4. Safety net: dismiss after 8s even if something stalls ──────────
    const safety = setTimeout(() => {
      if (!dismissed.current) dismiss();
    }, 8000);

    return () => {
      unsub();
      clearTimeout(safety);
      window.removeEventListener("load", onLoad);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const statusText = () => {
    if (progress < 20)
      return language === "id"
        ? "Menyelam ke zona abyssal & inisialisasi jaringan..."
        : "Diving into the abyssal zone & initializing network grid...";
    if (progress < 50)
      return language === "id"
        ? "Memuat font, aset visual & latar belakang partikel..."
        : "Loading fonts, visual assets & particle background...";
    if (progress < 80)
      return language === "id"
        ? "Menyinkronkan makhluk laut, hero & portofolio..."
        : "Syncing sea creatures, hero section & portfolio data...";
    if (progress < 100)
      return language === "id"
        ? "Kalibrasi akhir — hampir siap..."
        : "Final calibration — almost ready...";
    return language === "id"
      ? "Kalibrasi selesai. Selamat datang di ABYSS Lab."
      : "Calibration complete. Welcome to ABYSS Lab.";
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[120] grid place-items-center bg-[#020b17] overflow-hidden select-none"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Sonar rings */}
          <div className="absolute inset-0 grid place-items-center pointer-events-none opacity-25">
            <div className="absolute h-[300px] w-[300px] rounded-full border border-cyan-400/30 animate-ping duration-1000" />
            <div className="absolute h-[500px] w-[500px] rounded-full border border-sky-400/20 animate-ping duration-1000 [animation-delay:400ms]" />
            <div className="absolute h-[700px] w-[700px] rounded-full border border-emerald-400/10 animate-ping duration-1000 [animation-delay:800ms]" />
          </div>

          {/* Glow backdrop */}
          <div className="absolute h-[420px] w-[420px] rounded-full bg-cyan-500/15 blur-[120px] pointer-events-none" />

          {/* Card */}
          <motion.div
            initial={{ opacity: 0, y: 25, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="loader-panel relative mx-4 max-w-md w-full overflow-hidden rounded-[3rem] border border-cyan-300/20 bg-slate-950/70 p-7 text-center shadow-[0_25px_80px_rgba(0,0,0,0.65)] backdrop-blur-2xl md:p-9"
          >
            {/* Badge */}
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-950/60 px-4 py-1 text-[11px] font-black uppercase tracking-[0.25em] text-cyan-200 shadow-inner">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>PORTFOLIO • NAUFAL ANGKASAH</span>
            </div>

            {/* Icon core */}
            <div className="relative mx-auto my-3 flex items-center justify-center">
              <div className="relative grid h-24 w-24 place-items-center rounded-3xl bg-gradient-to-br from-cyan-400 to-sky-700 p-1 shadow-[0_0_35px_rgba(34,211,238,0.4),inset_4px_4px_10px_rgba(255,255,255,0.6)]">
                <div className="relative h-full w-full overflow-hidden rounded-[1.3rem] bg-[#05182d] grid place-items-center">
                  <Waves size={36} className="text-cyan-300 animate-pulse" />
                  <span className="absolute inset-0 bg-gradient-to-t from-cyan-500/20 to-transparent" />
                </div>
                <span className="absolute -bottom-2 -left-2 grid h-7 w-7 place-items-center rounded-xl bg-slate-900 border border-cyan-400/40 text-cyan-200 shadow-md">
                  <Shield size={13} />
                </span>
                <span className="absolute -top-2 -right-2 grid h-7 w-7 place-items-center rounded-xl bg-slate-900 border border-cyan-400/40 text-cyan-200 shadow-md">
                  <Cpu size={13} />
                </span>
              </div>
            </div>

            <h2 className="mt-4 text-2xl font-black tracking-tight text-white md:text-3xl">
              Deep Ocean IT Lab
            </h2>
            <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-cyan-200/70">
              Data Science • Web Dev • Network Security
            </p>

            {/* Progress */}
            <div className="mt-7">
              <div className="mb-2 flex items-center justify-between text-xs font-bold">
                <span className="inline-flex items-center gap-1.5 text-sky-200/80">
                  <Terminal size={12} className="text-cyan-300" />
                  <span>Telemetry</span>
                </span>
                <span className="font-mono text-sm font-black text-cyan-300">
                  {progress}%
                </span>
              </div>
              <div className="h-3 w-full overflow-hidden rounded-full bg-slate-900/90 border border-white/10 p-0.5">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-sky-300 to-emerald-400 shadow-[0_0_15px_rgba(34,211,238,0.6)]"
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: "easeOut", duration: 0.4 }}
                />
              </div>
            </div>

            <div className="mt-4 min-h-[40px] flex items-center justify-center">
              <p className="text-xs font-medium text-sky-100/75 leading-relaxed">
                {statusText()}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

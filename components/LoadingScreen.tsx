"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Waves, Shield, Cpu, Terminal } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function LoadingScreen() {
  const { language } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Smooth progress simulation from 0% to 100%
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 350);
          return 100;
        }
        // Accelerate smoothly
        const diff = Math.max(2, Math.floor((100 - prev) / 7));
        return Math.min(100, prev + diff);
      });
    }, 45);

    return () => clearInterval(interval);
  }, []);

  const getStatusText = () => {
    if (progress < 28) {
      return language === "id"
        ? "Menyelam ke zona abyssal & inisialisasi jaringan..."
        : "Diving into the abyssal zone & initializing network grid...";
    }
    if (progress < 58) {
      return language === "id"
        ? "Memuat modul Data Science, AI & Full Stack stack..."
        : "Loading Data Science modules, AI & Full Stack stack...";
    }
    if (progress < 88) {
      return language === "id"
        ? "Sinkronisasi portofolio, keamanan SOC & sertifikasi..."
        : "Syncing project telemetry, SOC security & credentials...";
    }
    return language === "id"
      ? "Kalibrasi selesai. Selamat datang di ABYSS Lab."
      : "Calibration complete. Welcome to ABYSS Lab.";
  };

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[120] grid place-items-center bg-[#020b17] overflow-hidden select-none"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Ambient Sonar Pulse Waves Background */}
          <div className="absolute inset-0 grid place-items-center pointer-events-none opacity-25">
            <div className="absolute h-[300px] w-[300px] rounded-full border border-cyan-400/30 animate-ping duration-1000" />
            <div className="absolute h-[500px] w-[500px] rounded-full border border-sky-400/20 animate-ping duration-1000 [animation-delay:400ms]" />
            <div className="absolute h-[700px] w-[700px] rounded-full border border-emerald-400/10 animate-ping duration-1000 [animation-delay:800ms]" />
          </div>

          {/* Glowing Radial Backdrop */}
          <div className="absolute h-[420px] w-[420px] rounded-full bg-cyan-500/15 blur-[120px] pointer-events-none" />

          {/* Loader Card */}
          <motion.div
            initial={{ opacity: 0, y: 25, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="loader-panel relative mx-4 max-w-md w-full overflow-hidden rounded-[3rem] border border-cyan-300/20 bg-slate-950/70 p-7 text-center shadow-[0_25px_80px_rgba(0,0,0,0.65)] backdrop-blur-2xl md:p-9"
          >
            {/* Top Badge */}
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-950/60 px-4 py-1 text-[11px] font-black uppercase tracking-[0.25em] text-cyan-200 shadow-inner">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>PORTFOLIO PROTOCOL • NAUFAL ANGKASAH</span>
            </div>

            {/* Central Hologram Core / Avatar with Sonar Rings */}
            <div className="relative mx-auto my-3 flex items-center justify-center">
              <div className="relative grid h-24 w-24 place-items-center rounded-3xl bg-gradient-to-br from-cyan-400 to-sky-700 p-1 shadow-[0_0_35px_rgba(34,211,238,0.4),inset_4px_4px_10px_rgba(255,255,255,0.6)]">
                <div className="relative h-full w-full overflow-hidden rounded-[1.3rem] bg-[#05182d] grid place-items-center">
                  <Waves size={36} className="text-cyan-300 animate-pulse" />
                  <span className="absolute inset-0 bg-gradient-to-t from-cyan-500/20 to-transparent" />
                </div>

                {/* Micro tech indicators around core */}
                <span className="absolute -bottom-2 -left-2 grid h-7 w-7 place-items-center rounded-xl bg-slate-900 border border-cyan-400/40 text-cyan-200 shadow-md">
                  <Shield size={13} />
                </span>
                <span className="absolute -top-2 -right-2 grid h-7 w-7 place-items-center rounded-xl bg-slate-900 border border-cyan-400/40 text-cyan-200 shadow-md">
                  <Cpu size={13} />
                </span>
              </div>
            </div>

            {/* Title & Tagline */}
            <h2 className="mt-4 text-2xl font-black tracking-tight text-white md:text-3xl">
              Deep Ocean IT Lab
            </h2>
            <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-cyan-200/70">
              Data Science • Web Dev • Network Security
            </p>

            {/* Progress Bar & Percentage */}
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

              {/* Progress Bar Container */}
              <div className="h-3 w-full overflow-hidden rounded-full bg-slate-900/90 border border-white/10 p-0.5">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-sky-300 to-emerald-400 shadow-[0_0_15px_rgba(34,211,238,0.6)]"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: "easeOut", duration: 0.1 }}
                />
              </div>
            </div>

            {/* Dynamic Status Text */}
            <div className="mt-4 min-h-[40px] flex items-center justify-center">
              <p className="text-xs font-medium text-sky-100/75 leading-relaxed transition-all">
                {getStatusText()}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}


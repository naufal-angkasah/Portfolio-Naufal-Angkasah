"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 1900);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[100] grid place-items-center bg-[#031226]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.55, ease: "easeInOut" }}
        >
          <div className="loader-panel relative overflow-hidden rounded-[3rem] border border-cyan-100/20 bg-white/10 p-8 text-center shadow-[24px_30px_90px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
            <div className="mx-auto mb-6 grid h-28 w-28 place-items-center rounded-[2.2rem] bg-gradient-to-br from-cyan-100 to-sky-500 p-2 shadow-[inset_8px_8px_20px_rgba(255,255,255,0.65),inset_-10px_-10px_24px_rgba(3,105,161,0.55)]">
              <img
                src="/creatures/sunken-ship-loading-small.webp"
                alt="Sunken ship underwater"
                className="h-full w-full rounded-[1.7rem] object-cover"
                loading="eager"
              />
            </div>
            <p className="text-xs font-black uppercase tracking-[0.45em] text-cyan-200">Initializing Portfolio</p>
            <h2 className="mt-3 text-3xl font-black text-white">Diving into the deep web lab</h2>
            <div className="mt-7 h-3 overflow-hidden rounded-full bg-slate-950/45">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-cyan-300 via-sky-300 to-emerald-300"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.55, ease: "easeInOut" }}
              />
            </div>
            <p className="mt-4 text-sm font-semibold text-sky-100/70">Loading profile, security grid, and ocean interface...</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

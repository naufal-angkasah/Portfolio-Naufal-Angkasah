"use client";

import { useState } from "react";
import { Waves, Menu, X } from "lucide-react";

const navItems = ["Home", "About", "Skills", "Projects", "Certificates", "Experience", "Contact"];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-50 px-4 py-4">
      <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-[2rem] border border-white/20 bg-sky-100/10 px-5 py-3 shadow-[0_18px_60px_rgba(0,0,0,0.28)] backdrop-blur-2xl">
        <button onClick={() => scrollTo("home")} className="flex items-center gap-3" aria-label="Back to home">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-sky-300 to-cyan-600 text-slate-950 shadow-[inset_5px_5px_12px_rgba(255,255,255,0.45),inset_-6px_-6px_14px_rgba(0,44,90,0.55)]">
            <Waves size={24} />
          </span>
          <span className="text-left">
            <span className="block text-sm font-black tracking-[0.28em] text-cyan-100">ABYSS</span>
            <span className="block text-xs text-sky-200/80">Naufal Angkasah</span>
          </span>
        </button>

        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => scrollTo(item)}
              className="rounded-full px-4 py-2 text-sm font-semibold text-sky-100/80 transition hover:bg-white/12 hover:text-white"
            >
              {item}
            </button>
          ))}
        </div>

        <a
          href="#contact"
          onClick={(e) => { e.preventDefault(); scrollTo("contact"); }}
          className="hidden rounded-full bg-cyan-300 px-5 py-2.5 text-sm font-black text-slate-950 shadow-[8px_8px_22px_rgba(0,0,0,0.26),inset_4px_4px_9px_rgba(255,255,255,0.65)] transition hover:scale-105 md:inline-flex"
        >
          Hire Me
        </a>

        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="grid h-11 w-11 place-items-center rounded-2xl bg-white/12 text-cyan-100 lg:hidden"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {menuOpen && (
        <div className="mx-auto mt-3 grid max-w-7xl gap-2 rounded-[1.7rem] border border-white/15 bg-[#082544]/90 p-3 shadow-2xl backdrop-blur-2xl lg:hidden">
          {navItems.map((item) => (
            <button key={item} onClick={() => scrollTo(item)} className="rounded-2xl px-4 py-3 text-left font-semibold text-cyan-50 hover:bg-white/10">
              {item}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}

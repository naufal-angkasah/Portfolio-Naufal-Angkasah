"use client";

import { useState, useEffect, useCallback } from "react";
import { Waves, Menu, X, Globe } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const navLabels = {
  id: [
    { label: "Home", id: "home" },
    { label: "Tentang", id: "about" },
    { label: "Keahlian", id: "skills" },
    { label: "Cara Kerja", id: "how-i-work" },
    { label: "Proyek", id: "projects" },
    { label: "Sertifikat", id: "certificates" },
    { label: "Pengalaman", id: "experience" },
    { label: "Kontak", id: "contact" },
  ],
  en: [
    { label: "Home", id: "home" },
    { label: "About", id: "about" },
    { label: "Skills", id: "skills" },
    { label: "How I Work", id: "how-i-work" },
    { label: "Projects", id: "projects" },
    { label: "Certificates", id: "certificates" },
    { label: "Experience", id: "experience" },
    { label: "Contact", id: "contact" },
  ],
};

export default function Navbar() {
  const { language, toggleLanguage } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const currentNavItems = navLabels[language];

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  }, []);

  // Scroll spy
  useEffect(() => {
    const ids = ["home", "about", "skills", "how-i-work", "projects", "certificates", "experience", "contact"];

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

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
          {currentNavItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition hover:bg-white/12 hover:text-white ${
                  isActive ? "nav-link-active" : "text-sky-100/80"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          {/* Language Switcher Toggle */}
          <button
            onClick={toggleLanguage}
            className="inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-cyan-950/70 px-3.5 py-1.5 text-xs font-extrabold text-cyan-200 shadow-[0_4px_15px_rgba(0,0,0,0.3)] backdrop-blur-md transition hover:scale-105 hover:bg-cyan-500/20 active:scale-95"
            title="Switch Language / Ganti Bahasa"
          >
            <Globe size={14} className="text-cyan-300 animate-pulse" />
            <span>{language === "id" ? "ID 🇮🇩" : "EN 🇬🇧"}</span>
          </button>

          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); scrollTo("contact"); }}
            className="hidden rounded-full bg-cyan-300 px-5 py-2.5 text-sm font-black text-slate-950 shadow-[8px_8px_22px_rgba(0,0,0,0.26),inset_4px_4px_9px_rgba(255,255,255,0.65)] transition hover:scale-105 md:inline-flex"
          >
            {language === "id" ? "Hubungi Saya" : "Hire Me"}
          </a>
        </div>

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
          {currentNavItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`rounded-2xl px-4 py-3 text-left font-semibold hover:bg-white/10 ${
                  isActive ? "bg-white/10 text-cyan-200" : "text-cyan-50"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
}

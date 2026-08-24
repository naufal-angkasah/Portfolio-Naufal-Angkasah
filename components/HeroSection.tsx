"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, LockKeyhole, Mail } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useReady } from "@/context/ReadyContext";
import { READY_IDS } from "@/components/LoadingScreen";
import GlassmorphismProfileCard from "@/components/ui/glassmorphism-profile-card";

const roles = [
  "Web Developer",
  "Full Stack Developer",
  "AI Agent Developer",
  "Network Security",
  "Cyber Security Enthusiast",
  "Data & AI Analyst",
  "IT Support",
];

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 1800;
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="stat-counter-number">
      {count}{suffix}
    </div>
  );
}

export default function HeroSection() {
  const { language } = useLanguage();
  const { reportReady } = useReady();

  // Signal loading screen that hero is mounted and rendered
  useEffect(() => {
    reportReady(READY_IDS.HERO);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const t = {
    badge: language === "id" ? "Terbuka untuk Peran Web Dev, AI Agent & Security" : "Open to Web Dev, AI Agent & Security Roles",
    titleSub: language === "id" ? "Portfolio IT" : "IT Portfolio",
    subtitle:
      language === "id"
        ? "Saya profesional IT yang fokus pada pengembangan web modern, integrasi AI Agent cerdas, dan fondasi network security. Siap membantu membuat produk digital yang rapi, aman, cepat, dan mudah dirawat."
        : "I am an IT professional focusing on modern web development, smart AI Agent integration, and network security foundations. Ready to help build clean, secure, fast, and easily maintainable digital products.",
    viewProjects: language === "id" ? "Lihat Proyek" : "View Projects",
    contactBtn: language === "id" ? "Kontak" : "Contact",
    statusText: language === "id" ? "Tersedia untuk Pekerjaan" : "Available for work",
    glowText: language === "id" ? "Kreativitas & IT Security Siap Pakai" : "High on Creativity & IT Security",
    stats: [
      { value: 16, suffix: "+", label: language === "id" ? "Proyek Selesai" : "Projects Built" },
      { value: 25, suffix: "+", label: language === "id" ? "Sertifikat Diraih" : "Certificates Earned" },
      { value: 280, suffix: "+", label: language === "id" ? "Siswa Diajar" : "Students Taught" },
      { value: 5, suffix: "+", label: language === "id" ? "Tahun di Tech" : "Years in Tech" },
    ],
  };

  return (
    <section id="home" className="relative mx-auto grid min-h-screen max-w-7xl items-center gap-8 px-5 pb-16 pt-24 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:px-8 lg:pt-28">
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
        {/* Badge */}
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-200/25 bg-white/10 px-3.5 py-1.5 text-xs font-bold text-cyan-100 shadow-[inset_4px_4px_10px_rgba(255,255,255,0.12)] backdrop-blur-xl md:text-sm">
          <LockKeyhole size={15} /> {t.badge}
        </div>

        {/* Title */}
        <h1 className="max-w-4xl text-3xl font-black leading-[1.05] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
          Naufal Angkasah —<span className="text-gradient">{t.titleSub}</span>.
        </h1>

        {/* Subtitle */}
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-sky-100/78 md:text-lg">
          {t.subtitle}
        </p>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col gap-3.5 sm:flex-row">
          <button
            onClick={() => scrollTo("projects")}
            className="clay-button group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-black text-slate-950 md:text-base cursor-pointer"
          >
            {t.viewProjects} <ArrowRight className="transition group-hover:translate-x-1" size={18} />
          </button>
          <button
            onClick={() => scrollTo("contact")}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-cyan-200/25 bg-white/10 px-6 py-3.5 text-sm font-black text-cyan-50 backdrop-blur-xl transition hover:bg-white/16 md:text-base cursor-pointer"
          >
            <Mail size={18} /> {t.contactBtn}
          </button>
        </div>

        {/* Roles Pills */}
        <div className="mt-6 flex flex-wrap gap-2">
          {roles.map((role) => (
            <span key={role} className="rounded-full bg-sky-200/10 px-3.5 py-1.5 text-xs font-bold text-sky-100 shadow-[inset_3px_3px_8px_rgba(255,255,255,0.1)] border border-cyan-200/15">
              {role}
            </span>
          ))}
        </div>

        {/* Animated Stats Counter */}
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {t.stats.map((stat) => (
            <div key={stat.label} className="stat-counter-card">
              <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              <p className="mt-1 text-[0.65rem] font-black uppercase tracking-[0.16em] text-cyan-200/70 md:text-xs">{stat.label}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Glassmorphism Profile Card */}
      <div className="flex justify-center items-center py-6 lg:py-0">
        <GlassmorphismProfileCard
          name="Naufal Angkasah"
          role="Web Developer & Network Security"
          email="naufalangkasah@gmail.com"
          avatarSrc="/uploads/naufal-profile.jpg"
          statusText={t.statusText}
          glowText={t.glowText}
          onHireClick={() => scrollTo("contact")}
        />
      </div>
    </section>
  );
}

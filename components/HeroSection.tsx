"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, LockKeyhole, Mail, Network } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const roles = [
  "Web Developer",
  "Frontend Developer",
  "Full Stack Developer",
  "IT Support",
  "Network Security Junior",
  "Cyber Security Enthusiast",
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

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const t = {
    badge: language === "id" ? "Terbuka untuk Peran Web Dev & Network Security" : "Open to Web Dev & Network Security Roles",
    titleSub: language === "id" ? "Portfolio IT" : "IT Portfolio",
    subtitle:
      language === "id"
        ? "Saya profesional IT yang fokus pada pengembangan web modern, UI responsive, dan fondasi network security. Siap membantu membuat produk digital yang rapi, aman, cepat, dan mudah dirawat."
        : "I am an IT professional focusing on modern web development, responsive UI, and network security foundations. Ready to help build clean, secure, fast, and easily maintainable digital products.",
    viewProjects: language === "id" ? "Lihat Proyek" : "View Projects",
    contactBtn: language === "id" ? "Kontak" : "Contact",
    stats: [
      { value: 280, suffix: "+", label: language === "id" ? "Siswa Diajar" : "Students Taught" },
      { value: 6, suffix: "+", label: language === "id" ? "Proyek Diselesaikan" : "Projects Delivered" },
      { value: 4, suffix: "+", label: language === "id" ? "Tahun Pengalaman Tech" : "Years in Tech" },
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
            className="clay-button group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-black text-slate-950 md:text-base"
          >
            {t.viewProjects} <ArrowRight className="transition group-hover:translate-x-1" size={18} />
          </button>
          <button
            onClick={() => scrollTo("contact")}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-cyan-200/25 bg-white/10 px-6 py-3.5 text-sm font-black text-cyan-50 backdrop-blur-xl transition hover:bg-white/16 md:text-base"
          >
            <Mail size={18} /> {t.contactBtn}
          </button>
        </div>

        {/* Roles Pills */}
        <div className="mt-6 flex flex-wrap gap-2">
          {roles.map((role) => (
            <span key={role} className="rounded-full bg-sky-200/10 px-3.5 py-1.5 text-xs font-bold text-sky-100 shadow-[inset_3px_3px_8px_rgba(255,255,255,0.1)]">
              {role}
            </span>
          ))}
        </div>

        {/* Animated Stats Counter */}
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {t.stats.map((stat) => (
            <div key={stat.label} className="stat-counter-card">
              <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              <p className="mt-1 text-[0.65rem] font-black uppercase tracking-[0.18em] text-cyan-200/70 md:text-xs">{stat.label}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* 3D Console Graphic */}
      <motion.div initial={{ opacity: 0, scale: 0.86 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, delay: 0.1 }} className="perspective-3d">
        <div className="relative mx-auto aspect-square max-w-[480px] preserve-3d lg:max-w-[540px]">
          <div className="absolute inset-10 rounded-[4rem] bg-cyan-300/15 blur-3xl" />
          <div className="submarine-card absolute inset-0 rounded-[3rem] border border-white/22 bg-gradient-to-br from-sky-100/18 to-cyan-900/18 p-6 shadow-[25px_35px_80px_rgba(0,0,0,0.42)] backdrop-blur-2xl preserve-3d md:p-8">
            <div className="absolute left-6 top-6 rounded-full bg-white/12 px-3.5 py-1.5 text-xs font-black text-cyan-100 md:left-8 md:top-8 md:text-sm">3D Clay Console</div>
            <div className="scene-3d absolute inset-0 grid place-items-center">
              <div className="orb-3d">
                <div className="ring ring-one" />
                <div className="ring ring-two" />
                <div className="ring ring-three" />
                <div className="core">
                  <img src="/uploads/foto_akun1.jpg" alt="Foto profil Naufal Angkasah" className="profile-orb-img" />
                  <span className="absolute -bottom-2 -right-2 grid h-12 w-12 place-items-center rounded-2xl bg-slate-950/80 text-cyan-200 shadow-xl backdrop-blur-xl md:h-14 md:w-14">
                    <Network size={24} />
                  </span>
                </div>
              </div>
            </div>
            <div className="absolute bottom-6 left-6 right-6 grid gap-2.5 rounded-[1.8rem] bg-slate-950/35 p-4 backdrop-blur-xl md:bottom-8 md:left-8 md:right-8 md:p-5">
              <div className="flex items-center justify-between text-xs text-sky-100/75 md:text-sm">
                <span>Naufal&apos;s IT profile</span>
                <span className="font-black text-emerald-300">Healthy</span>
              </div>
              <div className="h-2.5 overflow-hidden rounded-full bg-white/10 md:h-3">
                <div className="h-full w-[86%] rounded-full bg-gradient-to-r from-cyan-300 to-emerald-300" />
              </div>
              <div className="grid grid-cols-3 gap-2.5 pt-1 text-center text-[0.7rem] font-bold text-cyan-50 md:text-xs">
                <span className="rounded-xl bg-white/10 py-2 md:rounded-2xl md:py-3">HTTPS</span>
                <span className="rounded-xl bg-white/10 py-2 md:rounded-2xl md:py-3">Firewall</span>
                <span className="rounded-xl bg-white/10 py-2 md:rounded-2xl md:py-3">API</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

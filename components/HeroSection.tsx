"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, LockKeyhole, Mail, Network } from "lucide-react";

const roles = [
  "Web Developer",
  "Frontend Developer",
  "Full Stack Developer",
  "IT Support",
  "Network Security Junior",
  "Cyber Security Enthusiast",
];

const stats = [
  { value: 280, suffix: "+", label: "Students Taught" },
  { value: 6, suffix: "+", label: "Projects Delivered" },
  { value: 4, suffix: "+", label: "Years in Tech" },
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
            // Ease-out cubic
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
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="relative mx-auto grid min-h-screen max-w-7xl items-center gap-12 px-5 pb-20 pt-36 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-200/25 bg-white/10 px-4 py-2 text-sm font-bold text-cyan-100 shadow-[inset_4px_4px_10px_rgba(255,255,255,0.12)] backdrop-blur-xl">
          <LockKeyhole size={17} /> Open to Web Dev & Network Security Roles
        </div>

        <h1 className="max-w-4xl text-5xl font-black leading-[0.95] tracking-tight text-white md:text-7xl lg:text-8xl">
          Naufal Angkasah —<span className="text-gradient">Portfolio IT</span>.
        </h1>

        <p className="mt-7 max-w-2xl text-lg leading-8 text-sky-100/78 md:text-xl">
          Saya profesional IT yang fokus pada pengembangan web modern, UI responsive, dan fondasi network security. Siap membantu membuat produk digital yang rapi, aman, cepat, dan mudah dirawat.
        </p>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <button
            onClick={() => scrollTo("projects")}
            className="clay-button group inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 font-black text-slate-950"
          >
            Lihat Projects <ArrowRight className="transition group-hover:translate-x-1" size={19} />
          </button>
          <button
            onClick={() => scrollTo("contact")}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-cyan-200/25 bg-white/10 px-7 py-4 font-black text-cyan-50 backdrop-blur-xl transition hover:bg-white/16"
          >
            <Mail size={19} /> Contact
          </button>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          {roles.map((role) => (
            <span key={role} className="rounded-full bg-sky-200/10 px-4 py-2 text-sm font-bold text-sky-100 shadow-[inset_3px_3px_8px_rgba(255,255,255,0.1)]">
              {role}
            </span>
          ))}
        </div>

        {/* Animated Stats Counter */}
        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label} className="stat-counter-card">
              <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              <p className="mt-2 text-xs font-black uppercase tracking-[0.18em] text-cyan-200/70">{stat.label}</p>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, scale: 0.86 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, delay: 0.1 }} className="perspective-3d">
        <div className="relative mx-auto aspect-square max-w-[560px] preserve-3d">
          <div className="absolute inset-10 rounded-[4rem] bg-cyan-300/15 blur-3xl" />
          <div className="submarine-card absolute inset-0 rounded-[3.5rem] border border-white/22 bg-gradient-to-br from-sky-100/18 to-cyan-900/18 p-8 shadow-[25px_35px_80px_rgba(0,0,0,0.42)] backdrop-blur-2xl preserve-3d">
            <div className="absolute left-8 top-8 rounded-full bg-white/12 px-4 py-2 text-sm font-black text-cyan-100">3D Clay Console</div>
            <div className="scene-3d absolute inset-0 grid place-items-center">
              <div className="orb-3d">
                <div className="ring ring-one" />
                <div className="ring ring-two" />
                <div className="ring ring-three" />
                <div className="core">
                  <img src="/uploads/foto_akun1.jpg" alt="Foto profil Naufal Angkasah" className="profile-orb-img" />
                  <span className="absolute -bottom-2 -right-2 grid h-14 w-14 place-items-center rounded-2xl bg-slate-950/80 text-cyan-200 shadow-xl backdrop-blur-xl">
                    <Network size={28} />
                  </span>
                </div>
              </div>
            </div>
            <div className="absolute bottom-8 left-8 right-8 grid gap-3 rounded-[2rem] bg-slate-950/35 p-5 backdrop-blur-xl">
              <div className="flex items-center justify-between text-sm text-sky-100/75">
                <span>Naufal&apos;s IT profile</span>
                <span className="font-black text-emerald-300">Healthy</span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-[86%] rounded-full bg-gradient-to-r from-cyan-300 to-emerald-300" />
              </div>
              <div className="grid grid-cols-3 gap-3 pt-2 text-center text-xs font-bold text-cyan-50">
                <span className="rounded-2xl bg-white/10 py-3">HTTPS</span>
                <span className="rounded-2xl bg-white/10 py-3">Firewall</span>
                <span className="rounded-2xl bg-white/10 py-3">API</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

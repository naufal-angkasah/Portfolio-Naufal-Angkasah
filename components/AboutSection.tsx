"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Code2, ShieldCheck, ServerCog } from "lucide-react";

const services = [
  {
    icon: Code2,
    title: "Web Development",
    desc: "Membangun website dan aplikasi web modern yang responsive, rapi, cepat, serta siap dikembangkan dengan React, Next.js, Vue, dan integrasi API.",
  },
  {
    icon: ShieldCheck,
    title: "Network Security",
    desc: "Memahami dasar hardening jaringan, firewall rules, vulnerability assessment, secure configuration, dan monitoring keamanan dengan Wazuh & Splunk.",
  },
  {
    icon: ServerCog,
    title: "IT & System Support",
    desc: "Siap membantu troubleshooting sistem, deployment, dokumentasi teknis, Linux administration, server configuration, dan operasional IT harian.",
  },
];

export default function AboutSection() {
  const marqueeRef = useRef<HTMLDivElement | null>(null);
  const marqueePaused = useRef(false);
  const marqueeOffset = useRef(0);

  useEffect(() => {
    let frameId = 0;
    let lastTime = performance.now();
    const speed = 1.35;

    const tick = (time: number) => {
      const delta = (time - lastTime) / 1000;
      lastTime = time;
      if (!marqueePaused.current && marqueeRef.current) {
        marqueeOffset.current = (marqueeOffset.current - speed * delta) % 50;
        marqueeRef.current.style.transform = `translate3d(${marqueeOffset.current}%, 0, 0)`;
      }
      frameId = window.requestAnimationFrame(tick);
    };
    frameId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frameId);
  }, []);

  return (
    <section id="about" className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        {/* Profile Card */}
        <div className="clay-panel rounded-[2.5rem] p-8 md:p-10">
          <div className="profile-badge mb-8 flex items-center gap-5 rounded-[2rem] bg-slate-950/25 p-4">
            <div className="relative h-24 w-24 shrink-0 rounded-[1.8rem] bg-cyan-300 p-1 shadow-[0_0_40px_rgba(34,211,238,0.35)]">
              <img src="/uploads/foto_akun1.jpg" alt="Foto profile" className="h-full w-full rounded-[1.45rem] object-cover" />
              <span className="absolute -right-2 -top-2 h-5 w-5 rounded-full border-4 border-[#082544] bg-emerald-300" />
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-[0.28em] text-emerald-300">Available</p>
              <p className="mt-1 text-xl font-black text-white">Future IT Professional</p>
              <p className="text-sm text-sky-100/68">Web Dev • Network Security • IT Ops</p>
            </div>
          </div>
          <p className="text-sm font-black uppercase tracking-[0.35em] text-cyan-200">About Me</p>
          <h2 className="mt-4 text-4xl font-black text-white md:text-5xl">Web developer yang juga peduli keamanan.</h2>
          <p className="mt-5 leading-8 text-sky-100/75">
            Saya Naufal Angkasah, fokus mendalami Web Development (Front-end & Full-stack) dan Network Security.
            Dengan pengalaman di Telkom Indonesia, Swiss German University SOC Lab, dan mengajar 280+ siswa coding,
            saya menggabungkan UI yang nyaman, kode yang maintainable, serta kebiasaan security-first.
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid gap-5 md:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <motion.article key={service.title} whileHover={{ y: -8, rotateX: 4 }} className="clay-panel rounded-[2.2rem] p-7">
                <div className="mb-6 grid h-14 w-14 place-items-center rounded-2xl bg-cyan-300 text-slate-950 shadow-[inset_5px_5px_10px_rgba(255,255,255,0.65),inset_-5px_-5px_12px_rgba(0,84,120,0.45)]">
                  <Icon size={28} />
                </div>
                <h3 className="text-xl font-black text-white">{service.title}</h3>
                <p className="mt-3 text-sm leading-7 text-sky-100/72">{service.desc}</p>
              </motion.article>
            );
          })}
        </div>
      </div>

      {/* Terminal Console */}
      <div className="mt-8 grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <motion.div whileHover={{ rotateY: -6, rotateX: 4 }} className="clay-panel rounded-[3rem] p-6 perspective-3d md:p-8">
          <div className="terminal-window overflow-hidden rounded-[2.2rem] border border-cyan-100/15 bg-slate-950/55">
            <div className="flex gap-2 border-b border-white/10 p-4">
              <span className="h-3 w-3 rounded-full bg-red-300" />
              <span className="h-3 w-3 rounded-full bg-yellow-300" />
              <span className="h-3 w-3 rounded-full bg-emerald-300" />
            </div>
            <div className="space-y-4 p-6 font-mono text-sm text-cyan-100/85">
              <p><span className="text-emerald-300">visitor@portfolio</span>:~$ scan-profile --role webdev-security</p>
              <p className="typing-line">status: creative, responsive, security-aware</p>
              <p>result: recommended for interview ✦</p>
            </div>
          </div>
        </motion.div>

        <div className="clay-panel rounded-[3rem] p-8 md:p-10">
          <p className="text-sm font-black uppercase tracking-[0.35em] text-cyan-200">Deep Lab Notes</p>
          <h2 className="mt-4 text-4xl font-black text-white md:text-5xl">Arah pengembangan di bidang IT.</h2>
          <div className="mt-6 space-y-4">
            {[
              "Membuat UI yang smooth, modern, responsive, dan nyaman dibaca recruiter.",
              "Menjaga struktur komponen rapi agar mudah dikembangkan ke production.",
              "Menggabungkan mindset web development dan security: HTTPS, API safety, auth flow, firewall basic.",
            ].map((note, i) => (
              <p key={i} className="flex gap-3 leading-7 text-sky-100/72">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-cyan-300" />
                {note}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Marquee */}
      <div
        className="marquee-shell mt-8 overflow-hidden rounded-[2rem] border border-cyan-100/15 bg-white/10 py-4 backdrop-blur-xl"
        onMouseEnter={() => { marqueePaused.current = true; }}
        onMouseLeave={() => { marqueePaused.current = false; }}
      >
        <div ref={marqueeRef} className="scan-marquee text-sm font-black uppercase tracking-[0.28em] text-cyan-100/80">
          {[0, 1].map((group) => (
            <div key={group} className="marquee-set" aria-hidden={group === 1}>
              <span>Next.js Ready</span><span>•</span><span>Secure Coding Mindset</span><span>•</span><span>Responsive UI</span><span>•</span><span>Network Fundamentals</span><span>•</span><span>Clean Documentation</span><span>•</span><span>Fast Deployment</span><span>•</span>
              <span>Next.js Ready</span><span>•</span><span>Secure Coding Mindset</span><span>•</span><span>Responsive UI</span><span>•</span><span>Network Fundamentals</span><span>•</span><span>Clean Documentation</span><span>•</span><span>Fast Deployment</span><span>•</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";

const skills = [
  "Next.js",
  "React",
  "Vue.js",
  "TypeScript",
  "JavaScript",
  "Tailwind CSS",
  "Node.js",
  "REST API",
  "Linux",
  "Git & GitHub",
  "Docker Basic",
  "WordPress",
  "TCP/IP",
  "Firewall",
  "OWASP Basic",
  "Network Monitoring",
  "Wazuh",
  "Splunk",
  "Honeypots",
  "Redis",
  "MikroTik",
  "GNS-3",
  "Cloud Deployment",
  "Database Management",
];

export default function SkillsSection() {
  return (
    <section id="skills" className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
      <div className="clay-panel rounded-[3rem] p-8 md:p-12">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.35em] text-cyan-200">Tech Arsenal</p>
            <h2 className="mt-3 text-4xl font-black text-white md:text-5xl">Skills & Tools</h2>
          </div>
          <p className="max-w-lg text-sm leading-7 text-sky-100/70">
            Teknologi dan tools yang saya gunakan dalam web development, network security, dan IT operations.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          {skills.map((skill, i) => (
            <motion.span
              key={skill}
              className="skill-chip"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              whileHover={{ y: -4, scale: 1.05 }}
            >
              {skill}
            </motion.span>
          ))}
        </div>

        {/* Education & Certifications Summary */}
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
            <p className="text-xs font-black uppercase tracking-[0.28em] text-emerald-300">Pendidikan</p>
            <h3 className="mt-2 text-xl font-black text-white">Universitas Syiah Kuala</h3>
            <p className="mt-1 text-sm text-sky-100/70">Gelar Sarjana, Informatika</p>
            <p className="mt-1 text-xs font-semibold text-cyan-200/60">August 2020 - July 2025</p>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
            <p className="text-xs font-black uppercase tracking-[0.28em] text-emerald-300">Bahasa</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold text-cyan-100">Indonesian (Native)</span>
              <span className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold text-cyan-100">English (Limited Working)</span>
              <span className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold text-cyan-100">Japanese (Elementary)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

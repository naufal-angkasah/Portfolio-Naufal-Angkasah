"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

type SkillCategory = "All" | "Full Stack" | "Security" | "Data & Tools";

type SkillItem = {
  name: string;
  category: "Full Stack" | "Security" | "Data & Tools";
  icon: string;
};

const skills: SkillItem[] = [
  // ═══ FULL STACK & WEB DEV ═══
  { name: "Next.js 16", category: "Full Stack", icon: "⚡" },
  { name: "React.js", category: "Full Stack", icon: "⚛️" },
  { name: "Vue.js 3", category: "Full Stack", icon: "🟢" },
  { name: "Angular", category: "Full Stack", icon: "🅰️" },
  { name: "TypeScript", category: "Full Stack", icon: "📘" },
  { name: "JavaScript (ES6+)", category: "Full Stack", icon: "🟨" },
  { name: "Tailwind CSS", category: "Full Stack", icon: "🎨" },
  { name: "Framer Motion", category: "Full Stack", icon: "✨" },
  { name: "Node.js", category: "Full Stack", icon: "🟩" },
  { name: "Express.js", category: "Full Stack", icon: "🚂" },
  { name: "PHP 8.3 & Laravel", category: "Full Stack", icon: "🐘" },
  { name: "RESTful API", category: "Full Stack", icon: "🔌" },
  { name: "GraphQL", category: "Full Stack", icon: "🕸️" },
  { name: "Python", category: "Full Stack", icon: "🐍" },
  { name: "HTML5 & CSS3", category: "Full Stack", icon: "🌐" },

  // ═══ DATA, CLOUD & INTEGRATION ═══
  { name: "Langflow & AI Agents", category: "Data & Tools", icon: "🤖" },
  { name: "IBM Granite & IBM Bob", category: "Data & Tools", icon: "⚡" },
  { name: "Vibe Coding & Prompt Eng.", category: "Data & Tools", icon: "💡" },
  { name: "Data Classification & Analytics", category: "Data & Tools", icon: "📊" },
  { name: "Tableau Data Visualization", category: "Data & Tools", icon: "📈" },
  { name: "Data Science & Gemini AI", category: "Data & Tools", icon: "🧠" },
  { name: "PostgreSQL & MySQL", category: "Data & Tools", icon: "🐬" },
  { name: "Redis Cache", category: "Data & Tools", icon: "🔴" },
  { name: "Firebase Firestore", category: "Data & Tools", icon: "🔥" },
  { name: "Midtrans QRIS Gateway", category: "Data & Tools", icon: "💳" },
  { name: "Google Sheets API Pipeline", category: "Data & Tools", icon: "📑" },
  { name: "Leaflet & GeoJSON Maps", category: "Data & Tools", icon: "🗺️" },
  { name: "Web Audio & Speech API", category: "Data & Tools", icon: "🔔" },
  { name: "POS Engine & Receipt Print", category: "Data & Tools", icon: "🧾" },

  // ═══ SECURITY, NETWORKING & DEVOPS ═══
  { name: "Web Penetration Testing", category: "Security", icon: "🔍" },
  { name: "Vulnerability Patching", category: "Security", icon: "🛡️" },
  { name: "OWASP Top 10 Security", category: "Security", icon: "🔐" },
  { name: "Wazuh SIEM", category: "Security", icon: "🚨" },
  { name: "Splunk Log Analytics", category: "Security", icon: "📈" },
  { name: "Zabbix Monitoring", category: "Security", icon: "🖥️" },
  { name: "Honeypots Threat Intel", category: "Security", icon: "🍯" },
  { name: "Linux Server (Ubuntu/Debian)", category: "Security", icon: "🐧" },
  { name: "Docker & Docker Compose", category: "Security", icon: "🐳" },
  { name: "Git & GitHub CI/CD", category: "Security", icon: "🐙" },
  { name: "Vercel & Render Deploy", category: "Security", icon: "☁️" },
  { name: "MikroTik & GNS-3", category: "Security", icon: "🌐" },
  { name: "TCP/IP & Firewall", category: "Security", icon: "🔒" },
];

const categoryTabs: SkillCategory[] = ["All", "Full Stack", "Security", "Data & Tools"];

export default function SkillsSection() {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<SkillCategory>("All");

  const filteredSkills =
    activeTab === "All" ? skills : skills.filter((s) => s.category === activeTab);

  return (
    <section id="skills" className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
      <div className="clay-panel rounded-[3rem] p-8 md:p-12">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.35em] text-cyan-200">
              Tech Arsenal
            </p>
            <h2 className="mt-3 text-4xl font-black text-white md:text-5xl">
              Skills & Tools
            </h2>
          </div>
          <p className="max-w-lg text-sm leading-7 text-sky-100/70">
            {language === "id"
              ? "Teknologi dan tools yang saya kuasai dan gunakan secara aktif dalam proyek Web Development, Network Security, dan Systems Engineering."
              : "Technologies and tools I master and actively use in Web Development, Network Security, and Systems Engineering projects."}
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="mb-8 flex flex-wrap gap-2.5">
          {categoryTabs.map((tab) => {
            const displayLabel =
              tab === "All"
                ? language === "id"
                  ? `Semua Skill (${skills.length})`
                  : `All Skills (${skills.length})`
                : tab;

            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`rounded-full px-4 py-2 text-xs font-black uppercase tracking-wider transition-all duration-300 ${
                  activeTab === tab
                    ? "bg-cyan-500/25 text-cyan-200 border border-cyan-400/60 shadow-[0_0_15px_rgba(34,211,238,0.3)]"
                    : "bg-white/5 text-sky-100/60 border border-white/10 hover:bg-white/10 hover:text-white"
                }`}
              >
                {displayLabel}
              </button>
            );
          })}
        </div>

        {/* Floating Glassmorphism Skill Bubbles Cloud */}
        <motion.div layout className="flex flex-wrap gap-3.5">
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill, i) => (
              <motion.span
                key={skill.name}
                layout
                initial={{ opacity: 0, scale: 0.8, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -10 }}
                transition={{ duration: 0.3, delay: i * 0.02 }}
                className="skill-bubble"
                style={{
                  animationDelay: `${(i % 6) * 0.45}s`,
                }}
              >
                <span>{skill.icon}</span>
                <span>{skill.name}</span>
              </motion.span>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Education & Language Summary */}
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-md">
            <p className="text-xs font-black uppercase tracking-[0.28em] text-emerald-300">
              {language === "id" ? "Pendidikan" : "Education"}
            </p>
            <h3 className="mt-2 text-xl font-black text-white">Universitas Syiah Kuala</h3>
            <p className="mt-1 text-sm text-sky-100/70">
              {language === "id" ? "Gelar Sarjana (S.Kom), Informatika" : "Bachelor's Degree (S.Kom), Informatics"}
            </p>
            <p className="mt-1 text-xs font-semibold text-cyan-200/60">August 2020 - July 2025</p>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-md">
            <p className="text-xs font-black uppercase tracking-[0.28em] text-emerald-300">
              {language === "id" ? "Kemampuan Bahasa" : "Language Proficiency"}
            </p>
            <div className="mt-4 flex flex-wrap gap-2.5">
              <span className="skill-bubble !py-1.5 !px-3.5 !text-xs" style={{ animationDelay: "0s" }}>
                🇮🇩 Indonesian ({language === "id" ? "Penutur Asli" : "Native"})
              </span>
              <span className="skill-bubble !py-1.5 !px-3.5 !text-xs" style={{ animationDelay: "0.5s" }}>
                🇬🇧 English ({language === "id" ? "Tingkat Kerja Terbatas" : "Limited Working"})
              </span>
              <span className="skill-bubble !py-1.5 !px-3.5 !text-xs" style={{ animationDelay: "1s" }}>
                🇯🇵 Japanese ({language === "id" ? "Tingkat Dasar" : "Elementary"})
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


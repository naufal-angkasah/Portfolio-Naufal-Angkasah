"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, ChevronDown, ChevronUp } from "lucide-react";

const experiences = [
  {
    role: "Research Assistant (Cybersecurity SOC)",
    company: "Swiss German University",
    period: "June 2026 - July 2026",
    location: "Tangerang",
    desc: "Cybersecurity researcher in the Security Operations Center (SOC). Threat monitoring, data processing, web development assistance, SOC lab server configuration. Tools: Linux, Wazuh, Zabbix, Redis, Iris, Honeypot, Splunk, Tguard.",
  },
  {
    role: "Coding Teacher",
    company: "MAN 1 Banda Aceh",
    period: "January 2026 - June 2026",
    location: "Banda Aceh",
    desc: "Taught 280+ students about website development, basic to advanced front-end, back-end, database management, and deployment.",
  },
  {
    role: "Web Developer",
    company: "Point Center",
    period: "December 2025 - June 2026",
    location: "Semarang",
    desc: "Built websites for headquarter companies using WordPress and integrations, assisted corporate partners in building and managing their websites.",
  },
  {
    role: "Frontend & Full-stack Web Developer",
    company: "Freelance",
    period: "January 2024 - August 2025",
    location: "Banda Aceh",
    desc: "Developed thesis writing services, Hydrological Cycle project (interface rework, API integration), and full-stack website with auth and database.",
  },
  {
    role: "Laboratory Assistant",
    company: "Universitas Syiah Kuala",
    period: "February 2022 - December 2025",
    location: "Banda Aceh",
    desc: "Lab Assistant across Advanced Network Protocol, Wireless Networking, Network Security, Digital Marketing, Operating System, and Computer Network. Taught 30-40 students per class.",
  },
  {
    role: "Mentor (Batch 6) & MSIB 4 Participant",
    company: "Dicoding Indonesia",
    period: "February 2023 - June 2024",
    location: "Bandung (Online)",
    desc: "Guided 25 participants in Web Front-End & Back-End development through weekly consultation sessions and feedback.",
  },
  {
    role: "Full Stack Engineer Intern",
    company: "Telkom Indonesia",
    period: "July 2023 - December 2023",
    location: "Bandung",
    desc: "Kampus Merdeka batch 5. Upgraded DTP Telkom website to v3 using Vue3, JavaScript, CSS. Landing pages, API integration, database optimization, testing.",
  },
  {
    role: "Cyber Security & Network Admin Participant",
    company: "Digital Talent Scholarship & Kominfo",
    period: "July 2022 - March 2024",
    location: "Indonesia",
    desc: "Junior Cyber Security, Junior Network Administrator, FGA Datacom x Huawei ICT. SQL injection, brute force, OSI layers, routers, network simulations.",
  },
];

const INITIAL_COUNT = 4;

export default function ExperienceSection() {
  const [showAll, setShowAll] = useState(false);
  const visibleExperiences = showAll ? experiences : experiences.slice(0, INITIAL_COUNT);
  const hiddenCount = experiences.length - INITIAL_COUNT;

  return (
    <section id="experience" className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
      <div className="mb-10">
        <p className="text-sm font-black uppercase tracking-[0.35em] text-cyan-200">Career Journey</p>
        <h2 className="mt-3 text-4xl font-black text-white md:text-5xl">Pengalaman Kerja</h2>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-sky-100/70">
          Perjalanan karir profesional dan kontribusi di dunia teknologi.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {visibleExperiences.map((exp, i) => (
            <motion.div
              key={exp.role + exp.company}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ delay: i * 0.06, duration: 0.3 }}
              className="clay-panel rounded-[2rem] p-6"
            >
              <div className="mb-3 flex items-start gap-3">
                <CheckCircle2 className="mt-1 shrink-0 text-emerald-300" size={20} />
                <div>
                  <h3 className="text-lg font-black text-white">{exp.role}</h3>
                  <p className="text-sm font-semibold text-cyan-200">{exp.company} — <span className="text-sky-100/60">{exp.location}</span></p>
                  <p className="mt-1 text-xs font-bold text-sky-100/50">{exp.period}</p>
                </div>
              </div>
              <p className="ml-8 text-sm leading-7 text-sky-100/68">{exp.desc}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Show More / Show Less */}
      {hiddenCount > 0 && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => setShowAll((v) => !v)}
            className="experience-show-more-btn"
          >
            {showAll ? (
              <>
                <ChevronUp size={18} /> Sembunyikan
              </>
            ) : (
              <>
                <ChevronDown size={18} /> Lihat {hiddenCount} lainnya
              </>
            )}
          </button>
        </div>
      )}
    </section>
  );
}

"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, ChevronDown, ChevronUp } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function ExperienceSection() {
  const { language } = useLanguage();
  const [showAll, setShowAll] = useState(false);

  const experiences = [
    {
      role: "Research Assistant (Cybersecurity SOC)",
      company: "Swiss German University",
      period: language === "id" ? "Juni 2026 - Juli 2026" : "June 2026 - July 2026",
      location: "Tangerang",
      desc:
        language === "id"
          ? "Peneliti cybersecurity di Security Operations Center (SOC). Threat monitoring, pemrosesan data, bantuan pengembangan web, konfigurasi server lab SOC. Tools: Linux, Wazuh, Zabbix, Redis, Iris, Honeypot, Splunk, Tguard."
          : "Cybersecurity researcher in the Security Operations Center (SOC). Threat monitoring, data processing, web development assistance, SOC lab server configuration. Tools: Linux, Wazuh, Zabbix, Redis, Iris, Honeypot, Splunk, Tguard.",
    },
    {
      role: "Coding Teacher",
      company: "MAN 1 Banda Aceh",
      period: language === "id" ? "Januari 2026 - Juni 2026" : "January 2026 - June 2026",
      location: "Banda Aceh",
      desc:
        language === "id"
          ? "Mengajar 280+ siswa tentang pengembangan website, front-end dasar hingga mahir, back-end, manajemen database, dan deployment."
          : "Taught 280+ students about website development, basic to advanced front-end, back-end, database management, and deployment.",
    },
    {
      role: "Web Developer",
      company: "Point Center",
      period: language === "id" ? "Desember 2025 - Juni 2026" : "December 2025 - June 2026",
      location: "Semarang",
      desc:
        language === "id"
          ? "Membangun website untuk kantor pusat menggunakan WordPress dan integrasi, membantu mitra korporat dalam membangun dan mengelola website mereka."
          : "Built websites for headquarter companies using WordPress and integrations, assisted corporate partners in building and managing their websites.",
    },
    {
      role: "Frontend & Full-stack Web Developer",
      company: "Freelance",
      period: language === "id" ? "Januari 2024 - Agustus 2025" : "January 2024 - August 2025",
      location: "Banda Aceh",
      desc:
        language === "id"
          ? "Mengembangkan layanan penulisan skripsi, proyek Siklus Hidrologi (rework antarmuka, integrasi API), dan website full-stack dengan autentikasi serta database."
          : "Developed thesis writing services, Hydrological Cycle project (interface rework, API integration), and full-stack website with auth and database.",
    },
    {
      role: "Laboratory Assistant",
      company: "Universitas Syiah Kuala",
      period: language === "id" ? "Februari 2022 - Desember 2025" : "February 2022 - December 2025",
      location: "Banda Aceh",
      desc:
        language === "id"
          ? "Asisten Lab Protokol Jaringan Lanjutan, Jaringan Nirkabel, Keamanan Jaringan, Digital Marketing, Sistem Operasi, dan Jaringan Komputer. Mengajar 30-40 mahasiswa per kelas."
          : "Lab Assistant across Advanced Network Protocol, Wireless Networking, Network Security, Digital Marketing, Operating System, and Computer Network. Taught 30-40 students per class.",
    },
    {
      role: "Mentor (Batch 6) & MSIB 4 Participant",
      company: "Dicoding Indonesia",
      period: language === "id" ? "Februari 2023 - Juni 2024" : "February 2023 - June 2024",
      location: "Bandung (Online)",
      desc:
        language === "id"
          ? "Membimbing 25 peserta dalam pengembangan Web Front-End & Back-End melalui sesi konsultasi mingguan dan feedback proyek."
          : "Guided 25 participants in Web Front-End & Back-End development through weekly consultation sessions and feedback.",
    },
    {
      role: "Full Stack Engineer Intern",
      company: "Telkom Indonesia",
      period: language === "id" ? "Juli 2023 - Desember 2023" : "July 2023 - December 2023",
      location: "Bandung",
      desc:
        language === "id"
          ? "Kampus Merdeka batch 5. Mengupgrade website DTP Telkom ke v3 menggunakan Vue3, JavaScript, CSS. Pembuatan landing page, integrasi API, optimasi database, dan testing."
          : "Kampus Merdeka batch 5. Upgraded DTP Telkom website to v3 using Vue3, JavaScript, CSS. Landing pages, API integration, database optimization, testing.",
    },
    {
      role: "Cyber Security & Network Admin Participant",
      company: "Digital Talent Scholarship & Kominfo",
      period: language === "id" ? "Juli 2022 - Maret 2024" : "July 2022 - March 2024",
      location: "Indonesia",
      desc:
        language === "id"
          ? "Junior Cyber Security, Junior Network Administrator, FGA Datacom x Huawei ICT. SQL injection, brute force, layer OSI, router, dan simulasi jaringan."
          : "Junior Cyber Security, Junior Network Administrator, FGA Datacom x Huawei ICT. SQL injection, brute force, OSI layers, routers, network simulations.",
    },
  ];

  const INITIAL_COUNT = 4;
  const visibleExperiences = showAll ? experiences : experiences.slice(0, INITIAL_COUNT);
  const hiddenCount = experiences.length - INITIAL_COUNT;

  return (
    <section id="experience" className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
      <div className="mb-10">
        <p className="text-sm font-black uppercase tracking-[0.35em] text-cyan-200">Career Journey</p>
        <h2 className="mt-3 text-4xl font-black text-white md:text-5xl">
          {language === "id" ? "Pengalaman Kerja" : "Work Experience"}
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-sky-100/70">
          {language === "id"
            ? "Perjalanan karir profesional dan kontribusi di dunia teknologi."
            : "Professional career journey and contributions in technology."}
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
                  <p className="text-sm font-semibold text-cyan-200">
                    {exp.company} — <span className="text-sky-100/60">{exp.location}</span>
                  </p>
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
                <ChevronUp size={18} /> {language === "id" ? "Sembunyikan" : "Show Less"}
              </>
            ) : (
              <>
                <ChevronDown size={18} /> {language === "id" ? `Lihat ${hiddenCount} lainnya` : `View ${hiddenCount} more`}
              </>
            )}
          </button>
        </div>
      )}
    </section>
  );
}


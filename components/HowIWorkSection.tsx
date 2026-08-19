"use client";

import { motion } from "framer-motion";
import { Clock, FileText, Zap, CheckCircle2, XCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function HowIWorkSection() {
  const { language } = useLanguage();

  const workStyles = [
    {
      icon: Clock,
      title: language === "id" ? "Responsive & Cepat" : "Responsive & Fast",
      desc: language === "id"
        ? "Respon cepat terhadap kebutuhan project, revisi, atau komunikasi tim. Bisa bekerja async maupun real-time."
        : "Quick response to project needs, revisions, or team communication. Can work async or real-time.",
    },
    {
      icon: FileText,
      title: language === "id" ? "Dokumentasi Rapi" : "Clean Documentation",
      desc: language === "id"
        ? "Setiap pekerjaan didokumentasikan dengan baik — dari komentar kode hingga README dan technical docs."
        : "Every task is well-documented — from code comments to README files and technical docs.",
    },
    {
      icon: Zap,
      title: language === "id" ? "Proaktif & Problem Solver" : "Proactive & Problem Solver",
      desc: language === "id"
        ? "Tidak hanya mengerjakan tugas, tapi juga mengidentifikasi potensi masalah dan mengusulkan solusi lebih awal."
        : "Not just executing tasks, but also identifying potential problems and proposing solutions proactively.",
    },
  ];

  const goodFit = language === "id"
    ? [
        "Mencari fresh graduate yang siap belajar dan berkembang cepat",
        "Butuh orang yang bisa mengerjakan frontend + memahami security",
        "Menghargai kode bersih, terstruktur, dan terdokumentasi",
        "Tim yang menggunakan modern tech stack (React, Next.js, Vue, Angular, PHP, Laravel, Python)",
        "Open terhadap remote/hybrid work arrangement",
      ]
    : [
        "Looking for a fresh graduate ready to learn and grow fast",
        "Need someone who can handle frontend + understand security",
        "Values clean, structured, and well-documented code",
        "Teams using modern tech stack (React, Next.js, Vue, Angular, PHP, Laravel, Python)",
        "Open to remote/hybrid work arrangements",
      ];

  const notFit = language === "id"
    ? [
        "Hanya membutuhkan admin data entry sederhana",
        "Tidak tertarik dengan code quality atau dokumentasi",
        "Membutuhkan senior lead dengan 10+ tahun pengalaman",
        "Tidak menggunakan version control atau modern workflow",
      ]
    : [
        "Only need simple data entry admin work",
        "Not interested in code quality or documentation",
        "Require a senior lead with 10+ years of experience",
        "Do not use version control or modern workflows",
      ];

  return (
    <section id="how-i-work" className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
      <div className="mb-10">
        <p className="text-sm font-black uppercase tracking-[0.35em] text-cyan-200">Work Style</p>
        <h2 className="mt-3 text-4xl font-black text-white md:text-5xl">
          {language === "id" ? "Cara Saya Bekerja" : "How I Work"}
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-sky-100/70">
          {language === "id"
            ? "Cara saya bekerja dan berkolaborasi — kualitas, kecepatan, dan transparansi."
            : "How I work and collaborate — quality, speed, and transparency."}
        </p>
      </div>

      {/* Work Style Cards */}
      <div className="grid gap-5 md:grid-cols-3">
        {workStyles.map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="work-style-card"
            >
              <div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-cyan-300/15 text-cyan-200">
                <Icon size={24} />
              </div>
              <h3 className="text-lg font-black text-white">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-sky-100/70">{item.desc}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Fit / Not Fit */}
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="fit-card good-fit"
        >
          <div className="mb-5 flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-300/15 text-emerald-300">
              <CheckCircle2 size={22} />
            </span>
            <h3 className="text-xl font-black text-white">
              {language === "id" ? "Cocok untuk" : "Good Fit"}
            </h3>
          </div>
          <ul className="space-y-3">
            {goodFit.map((item, idx) => (
              <li key={idx} className="flex gap-3 text-sm leading-7 text-sky-100/72">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-300" />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="fit-card not-fit"
        >
          <div className="mb-5 flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-red-300/15 text-red-300">
              <XCircle size={22} />
            </span>
            <h3 className="text-xl font-black text-white">
              {language === "id" ? "Mungkin kurang cocok" : "Not a Good Fit"}
            </h3>
          </div>
          <ul className="space-y-3">
            {notFit.map((item, idx) => (
              <li key={idx} className="flex gap-3 text-sm leading-7 text-sky-100/72">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-red-300/70" />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}



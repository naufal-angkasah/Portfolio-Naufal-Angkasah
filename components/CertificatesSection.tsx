"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Award, Maximize2, X } from "lucide-react";

type Certificate = {
  title: string;
  issuer: string;
  date: string;
  desc: string;
  icon: string;
};

const certificates: Certificate[] = [
  {
    title: "SIB Dicoding Cycle 4",
    issuer: "Dicoding Indonesia",
    date: "2023",
    icon: "🌐",
    desc: "Web Front-End dan Back-End development melalui program Studi Independen Bersertifikat.",
  },
  {
    title: "Junior Cyber Security",
    issuer: "Digital Talent Scholarship & Kominfo",
    date: "2022",
    icon: "🛡️",
    desc: "Pemahaman cyber-attacks (SQL injection, brute force), defence strategies, dan security awareness.",
  },
  {
    title: "Junior Network Administrator",
    issuer: "Digital Talent Scholarship & Kominfo",
    date: "2022",
    icon: "🌐",
    desc: "Network structure, OSI layers, routers configuration, dan network simulations.",
  },
  {
    title: "FGA Datacom x Huawei ICT",
    issuer: "Digital Talent Scholarship",
    date: "2024",
    icon: "📡",
    desc: "Huawei ICT Academy training untuk networking dan data communication fundamentals.",
  },
  {
    title: "Kampus Merdeka Batch 5",
    issuer: "Telkom Indonesia",
    date: "2023",
    icon: "🏢",
    desc: "Full Stack Engineer internship — Vue3, JavaScript, CSS, API integration, database optimization.",
  },
  {
    title: "Laboratory Assistant",
    issuer: "Universitas Syiah Kuala",
    date: "2022-2025",
    icon: "🔬",
    desc: "Lab Assistant across Network Protocol, Wireless Networking, Network Security, Web Content Management, dan lainnya.",
  },
];

export default function CertificatesSection() {
  const [selected, setSelected] = useState<Certificate | null>(null);

  return (
    <section id="certificates" className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
      <div className="mb-10">
        <p className="text-sm font-black uppercase tracking-[0.35em] text-cyan-200">Achievements</p>
        <h2 className="mt-3 text-4xl font-black text-white md:text-5xl">Sertifikat & Pencapaian</h2>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-sky-100/70">
          Kumpulan sertifikat dan bukti belajar yang mendukung profil di bidang Web Development dan IT Security.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {certificates.map((cert) => (
          <motion.article key={cert.title} whileHover={{ y: -8 }} className="clay-panel group overflow-hidden rounded-[2.5rem] p-4">
            <button
              onClick={() => setSelected(cert)}
              className="relative block w-full overflow-hidden rounded-[2rem] text-left"
              aria-label={`Open certificate ${cert.title}`}
            >
              <div className="cert-placeholder">
                <span>{cert.icon}</span>
              </div>
              <span className="absolute inset-0 bg-gradient-to-t from-slate-950/55 via-transparent to-transparent" />
              <span className="cert-preview-badge">
                <Maximize2 size={16} /> Preview
              </span>
            </button>
            <div className="p-4">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-black uppercase tracking-widest text-cyan-100">
                <Award size={15} /> {cert.issuer}
              </div>
              <h3 className="text-2xl font-black text-white">{cert.title}</h3>
              <p className="mt-3 leading-7 text-sky-100/72">{cert.desc}</p>
              <p className="mt-4 text-sm font-black text-emerald-300">Issued {cert.date}</p>
            </div>
          </motion.article>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-[130] grid place-items-center bg-slate-950/82 px-4 py-8 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="relative w-full max-w-2xl rounded-[2.4rem] border border-cyan-100/25 bg-[#061b35]/95 p-8 shadow-[0_30px_120px_rgba(0,0,0,0.65)]"
              initial={{ opacity: 0, y: 28, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.94 }}
              transition={{ type: "spring", stiffness: 180, damping: 22 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute -right-3 -top-3 z-10 grid h-12 w-12 place-items-center rounded-2xl bg-cyan-300 text-slate-950 shadow-2xl transition hover:scale-105"
                aria-label="Close"
              >
                <X />
              </button>
              <div className="mb-6 text-center text-6xl">{selected.icon}</div>
              <h3 className="text-center text-3xl font-black text-white">{selected.title}</h3>
              <p className="mt-2 text-center text-sm font-semibold text-cyan-100/70">{selected.issuer} • {selected.date}</p>
              <p className="mt-6 text-center leading-7 text-sky-100/72">{selected.desc}</p>
              <p className="mt-6 text-center text-sm text-sky-100/50">Klik area gelap atau tombol X untuk menutup.</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

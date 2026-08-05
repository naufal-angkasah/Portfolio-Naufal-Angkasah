"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  Award,
  ExternalLink,
  FileText,
  Filter,
  Maximize2,
  X,
  Shield,
  Globe,
  Code,
  Database,
  Brain,
  Users,
  Briefcase,
} from "lucide-react";

/* ─────────────────── Types ─────────────────── */
type CertificateTag =
  | "All"
  | "Web Development"
  | "Network & Security"
  | "Data & AI"
  | "Programming"
  | "Organization"
  | "Career";

type Certificate = {
  title: string;
  issuer: string;
  date: string;
  desc: string;
  tags: CertificateTag[];
  /** file path relative to /certificates/ */
  file: string;
  /** "image" for png/jpg, "pdf" for pdf */
  type: "image" | "pdf";
  icon: React.ReactNode;
};

/* ─────────────── Tag config ─────────────── */
const TAG_CONFIG: Record<
  CertificateTag,
  { icon: React.ReactNode; color: string }
> = {
  All: { icon: <Filter size={14} />, color: "bg-white/15 text-white" },
  "Web Development": {
    icon: <Code size={14} />,
    color: "bg-cyan-500/20 text-cyan-200",
  },
  "Network & Security": {
    icon: <Shield size={14} />,
    color: "bg-rose-500/20 text-rose-200",
  },
  "Data & AI": {
    icon: <Database size={14} />,
    color: "bg-violet-500/20 text-violet-200",
  },
  Programming: {
    icon: <Brain size={14} />,
    color: "bg-amber-500/20 text-amber-200",
  },
  Organization: {
    icon: <Users size={14} />,
    color: "bg-emerald-500/20 text-emerald-200",
  },
  Career: {
    icon: <Briefcase size={14} />,
    color: "bg-sky-500/20 text-sky-200",
  },
};

/* ─────────────── Helper to get preview image path ─────────────── */
function getPreviewImage(cert: Certificate): string {
  if (cert.type === "image") {
    return `/certificates/${cert.file}`;
  }
  const previewFilename = cert.file.replace(/\.pdf$/i, ".jpg");
  return `/certificates/previews/${previewFilename}`;
}

/* ─────────────── Certificates data ─────────────── */
const certificates: Certificate[] = [
  // ═══ WEB DEVELOPMENT ═══
  {
    title: "SIB Dicoding Cycle 4 — Front-End & Back-End",
    issuer: "Dicoding Indonesia",
    date: "2023",
    tags: ["Web Development", "Programming", "Career"],
    file: "F063XB451_serti_dicoding_batch_4.pdf",
    type: "pdf",
    icon: <Code size={28} />,
    desc: "Sertifikat program Studi Independen Bersertifikat (SIB) Batch 4 dari Dicoding, mendalami Web Front-End dan Back-End Development secara intensif.",
  },
  {
    title: "Mentor Dicoding Batch 6",
    issuer: "Dicoding Indonesia",
    date: "2024",
    tags: ["Web Development", "Career"],
    file: "Sertifikat_Mentor_dicoding_batch_6_Naufal_Angkasah.jpg",
    type: "image",
    icon: <Users size={28} />,
    desc: "Sertifikat sebagai mentor resmi di Dicoding Batch 6, membimbing peserta dalam Web Development dan pemrograman dasar.",
  },
  {
    title: "Menjadi Front-End Web Developer Expert",
    issuer: "Dicoding Indonesia",
    date: "2023",
    tags: ["Web Development"],
    file: "sertifikat_Menjadi_Front-End_Web_Developer_Expert.pdf",
    type: "pdf",
    icon: <Code size={28} />,
    desc: "Kelas expert Dicoding — PWA, accessibility, web performance optimization, testing, dan deployment strategi profesional.",
  },
  {
    title: "Belajar Fundamental Front-End Web Development",
    issuer: "Dicoding Indonesia",
    date: "2023",
    tags: ["Web Development"],
    file: "sertifikat_Belajar_Fundamental_Front-End_Web_Development.pdf",
    type: "pdf",
    icon: <Code size={28} />,
    desc: "Fundamental Front-End — DOM manipulation, Web Components, NPM, module bundler, dan clean architecture.",
  },
  {
    title: "Belajar Dasar Pemrograman Web",
    issuer: "Dicoding Indonesia",
    date: "2023",
    tags: ["Web Development", "Programming"],
    file: "sertifikat_Belajar_dasar_Pemograman_Web.pdf",
    type: "pdf",
    icon: <Globe size={28} />,
    desc: "Dasar-dasar HTML, CSS, dan JavaScript untuk membangun halaman web yang responsif dan interaktif.",
  },
  {
    title: "Dicoding Certificate Collection",
    issuer: "Dicoding Indonesia",
    date: "2023",
    tags: ["Web Development", "Programming"],
    file: "serti_dicoding.pdf",
    type: "pdf",
    icon: <Award size={28} />,
    desc: "Kompilasi sertifikat penyelesaian berbagai kelas di Dicoding Academy terkait web development.",
  },

  // ═══ NETWORK & SECURITY ═══
  {
    title: "Junior Cyber Security",
    issuer: "Digital Talent Scholarship & Kominfo",
    date: "2022",
    tags: ["Network & Security"],
    file: "Sertifikat_NAUFAL_ANGKASAH_Junior_Cyber_Security.pdf",
    type: "pdf",
    icon: <Shield size={28} />,
    desc: "Pemahaman cyber-attacks (SQL injection, brute force, phishing), defence strategies, ethical hacking basics, dan security awareness.",
  },
  {
    title: "Junior Network Administrator",
    issuer: "Digital Talent Scholarship & Kominfo",
    date: "2022",
    tags: ["Network & Security"],
    file: "Sertifikat_NAUFAL_ANGKASAH_Junior_Network_Administrator.pdf",
    type: "pdf",
    icon: <Globe size={28} />,
    desc: "Network structure, OSI model, TCP/IP, routing & switching, firewall configuration, dan network simulations menggunakan Cisco Packet Tracer.",
  },
  {
    title: "FGA Datacom x Huawei ICT",
    issuer: "Digital Talent Scholarship",
    date: "2024",
    tags: ["Network & Security"],
    file: "datacom.pdf",
    type: "pdf",
    icon: <Globe size={28} />,
    desc: "Huawei ICT Academy — networking fundamentals, data communication, VLAN, routing protocols, dan Huawei enterprise equipment.",
  },
  {
    title: "Datacom November Training",
    issuer: "Digital Talent Scholarship",
    date: "2024",
    tags: ["Network & Security"],
    file: "datacom_november.pdf",
    type: "pdf",
    icon: <Globe size={28} />,
    desc: "Pelatihan lanjutan Datacom November — advanced networking, troubleshooting, dan konfigurasi perangkat enterprise Huawei.",
  },
  {
    title: "Huawei Certified Network Associate",
    issuer: "Huawei ICT Academy",
    date: "2024",
    tags: ["Network & Security"],
    file: "sertifikat_huawei_Naufal_Angkasah.pdf",
    type: "pdf",
    icon: <Globe size={28} />,
    desc: "Sertifikasi resmi Huawei — kemampuan networking enterprise, konfigurasi switch & router, dan manajemen jaringan skala besar.",
  },
  {
    title: "Network Security — Informatika USK",
    issuer: "Universitas Syiah Kuala",
    date: "2024",
    tags: ["Network & Security"],
    file: "Naufal_Angkasah_Informatika_security.pdf",
    type: "pdf",
    icon: <Shield size={28} />,
    desc: "Sertifikat keahlian Network Security dari Program Studi Informatika Universitas Syiah Kuala.",
  },
  {
    title: "Belajar Jaringan Komputer untuk Pemula",
    issuer: "Dicoding Indonesia",
    date: "2023",
    tags: ["Network & Security"],
    file: "sertifikat_Belajar_Jaringan_Komputer_untuk_pemula.pdf",
    type: "pdf",
    icon: <Globe size={28} />,
    desc: "Topologi jaringan, IP addressing, subnetting, DNS, DHCP, dan konsep dasar administrasi jaringan.",
  },

  // ═══ DATA & AI ═══
  {
    title: "Classifying Data Using IBM Granite",
    issuer: "IBM SkillsBuild",
    date: "2025",
    tags: ["Data & AI"],
    file: "Classifying_Data_Using_IBM_Granite.png",
    type: "image",
    icon: <Database size={28} />,
    desc: "Penggunaan model AI IBM Granite untuk klasifikasi data — machine learning concepts, data labeling, dan model evaluation.",
  },
  {
    title: "Data Science Landscape",
    issuer: "IBM SkillsBuild",
    date: "2025",
    tags: ["Data & AI"],
    file: "Data_Science_Landscape_ibm.png",
    type: "image",
    icon: <Database size={28} />,
    desc: "Overview ekosistem Data Science — tools, methodologies, career paths, dan real-world use cases di industri.",
  },
  {
    title: "Getting Started with Data",
    issuer: "IBM SkillsBuild",
    date: "2025",
    tags: ["Data & AI"],
    file: "Getting_Started_with_Data_Earn_a_credential_.png",
    type: "image",
    icon: <Database size={28} />,
    desc: "Credential IBM untuk data fundamentals — data types, data collection, data cleaning, dan basic analytics.",
  },
  {
    title: "Introduction to Data Concepts",
    issuer: "IBM SkillsBuild",
    date: "2025",
    tags: ["Data & AI"],
    file: "Introduction_to_Data_Concepts_ibm.png",
    type: "image",
    icon: <Database size={28} />,
    desc: "Pengenalan konsep data — structured vs unstructured data, databases, data governance, dan data-driven decision making.",
  },
  {
    title: "Introduction to Tableau Desktop",
    issuer: "IBM SkillsBuild",
    date: "2025",
    tags: ["Data & AI"],
    file: "Introduction_to_Tableau_Desktop.png",
    type: "image",
    icon: <Database size={28} />,
    desc: "Data visualization menggunakan Tableau Desktop — dashboard design, chart types, data connections, dan interactive reporting.",
  },
  {
    title: "Unleashing the Power of AI Agents",
    issuer: "IBM SkillsBuild",
    date: "2025",
    tags: ["Data & AI"],
    file: "Unleashing_the_Power_of_AI_Agents.png",
    type: "image",
    icon: <Brain size={28} />,
    desc: "Eksplorasi AI Agents — autonomous systems, prompt engineering, LLM integration, dan AI use cases di enterprise.",
  },
  {
    title: "IBM SkillsBuild Achievement",
    issuer: "IBM SkillsBuild",
    date: "2025",
    tags: ["Data & AI"],
    file: "Earn_it_Accept_it_Share_it_IBM_SkillsBuild.png",
    type: "image",
    icon: <Award size={28} />,
    desc: "Badge pencapaian IBM SkillsBuild — menyelesaikan rangkaian kursus data science dan AI fundamentals.",
  },
  {
    title: "Getting Started with Data — Credly Badge",
    issuer: "IBM via Credly",
    date: "2025",
    tags: ["Data & AI"],
    file: "Getting_Started_with_Data_ibm_creadly_bedge.pdf",
    type: "pdf",
    icon: <Database size={28} />,
    desc: "Verified digital badge dari Credly untuk kompetensi data fundamentals dari IBM SkillsBuild program.",
  },

  // ═══ PROGRAMMING ═══
  {
    title: "Pengenalan ke Logika Pemrograman",
    issuer: "Dicoding Indonesia",
    date: "2023",
    tags: ["Programming"],
    file: "sertifikat_Pengenalan_ke_Logika_Pemograman_Programing_Logic_101_Naufal_Angkasah.pdf",
    type: "pdf",
    icon: <Brain size={28} />,
    desc: "Programming Logic 101 — flowchart, pseudocode, variabel, percabangan, perulangan, dan pemecahan masalah algoritmik.",
  },
  {
    title: "Memulai Dasar Pemrograman untuk Menjadi Pengembang Software",
    issuer: "Dicoding Indonesia",
    date: "2023",
    tags: ["Programming"],
    file: "sertifikat_Memulai_Dasar_Pemograman_untuk_Menjadi_Pengembang_Software_Naufal_Angkasah.pdf",
    type: "pdf",
    icon: <Code size={28} />,
    desc: "Fondasi pemrograman — paradigma OOP, version control, software development lifecycle, dan clean code principles.",
  },
  {
    title: "Memulai Pemrograman dengan Java",
    issuer: "Dicoding Indonesia",
    date: "2023",
    tags: ["Programming"],
    file: "sertifikat_Memulai_Pemograman_dengan_Java.pdf",
    type: "pdf",
    icon: <Code size={28} />,
    desc: "Java programming — syntax fundamentals, OOP concepts, collections, exception handling, dan project implementation.",
  },
  {
    title: "Belajar Dasar Git dengan GitHub",
    issuer: "Dicoding Indonesia",
    date: "2023",
    tags: ["Programming"],
    file: "sertifikat_Belajar_Dasar_Git_dengan_Girhub_Naufal_Angkasah.pdf",
    type: "pdf",
    icon: <Code size={28} />,
    desc: "Version control dengan Git & GitHub — branching, merging, pull requests, collaboration workflow, dan CI/CD dasar.",
  },
  {
    title: "Belajar Dasar-dasar DevOps",
    issuer: "Dicoding Indonesia",
    date: "2023",
    tags: ["Programming"],
    file: "sertifikat_Belajar_Dasar-dasar_DevOps.pdf",
    type: "pdf",
    icon: <Code size={28} />,
    desc: "DevOps fundamentals — CI/CD pipelines, containerization, cloud deployment, monitoring, dan infrastructure as code.",
  },

  // ═══ CAREER ═══
  {
    title: "Kampus Merdeka — Telkom Indonesia",
    issuer: "Telkom Indonesia",
    date: "2023",
    tags: ["Career", "Web Development"],
    file: "1706521420_NAUFAL_ANGKASAH.pdf",
    type: "pdf",
    icon: <Briefcase size={28} />,
    desc: "Sertifikat magang Kampus Merdeka Batch 5 di Telkom Indonesia — Full Stack Engineer menggunakan Vue3, JavaScript, API integration.",
  },
  {
    title: "Mengoptimalkan LinkedIn untuk Personal Branding",
    issuer: "Pijar Mahir",
    date: "2023",
    tags: ["Career"],
    file: "Pijar_Mahir-Belajar_Mengoptimalkan_Linkedin_Untuk_Meningkatkan_Personal_Branding_Kamu-ahmad.naufalangkasahgmail.com.pdf",
    type: "pdf",
    icon: <Briefcase size={28} />,
    desc: "Strategi optimasi profil LinkedIn — personal branding, networking profesional, content creation, dan career development tips.",
  },

  // ═══ ORGANIZATION ═══
  {
    title: "HMIF Kabinet Infinity 2024",
    issuer: "HMIF — Universitas Syiah Kuala",
    date: "2024",
    tags: ["Organization"],
    file: "serti_hmif_kabinet_infinity_2024.pdf",
    type: "pdf",
    icon: <Users size={28} />,
    desc: "Sertifikat kepengurusan HMIF (Himpunan Mahasiswa Informatika) Kabinet Infinity 2024 di Universitas Syiah Kuala.",
  },
];

/* ─────────────── Component ─────────────── */
export default function CertificatesSection() {
  const [activeTag, setActiveTag] = useState<CertificateTag>("All");
  const [selected, setSelected] = useState<Certificate | null>(null);

  const tags = Object.keys(TAG_CONFIG) as CertificateTag[];

  const filtered = useMemo(
    () =>
      activeTag === "All"
        ? certificates
        : certificates.filter((c) => c.tags.includes(activeTag)),
    [activeTag]
  );

  const rawFilePath = (file: string) => `/certificates/${file}`;

  return (
    <section
      id="certificates"
      className="cert-section mx-auto max-w-7xl px-5 py-24 lg:px-8"
    >
      {/* ── Header ── */}
      <div className="mb-12">
        <p className="text-sm font-black uppercase tracking-[0.35em] text-cyan-200">
          Achievements
        </p>
        <h2 className="mt-3 text-4xl font-black text-white md:text-5xl">
          Sertifikat & Pencapaian
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-sky-100/70">
          Koleksi {certificates.length} sertifikat profesional dengan preview visual halaman pertama.
        </p>
      </div>

      {/* ── Filter Tags ── */}
      <div className="cert-tags-wrapper mb-10">
        <div className="cert-tags-scroll">
          {tags.map((tag) => {
            const cfg = TAG_CONFIG[tag];
            const isActive = activeTag === tag;
            return (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`cert-tag ${isActive ? "cert-tag--active" : ""} ${cfg.color}`}
              >
                {cfg.icon}
                <span>{tag}</span>
                {tag !== "All" && (
                  <span className="cert-tag-count">
                    {certificates.filter((c) => c.tags.includes(tag)).length}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Count ── */}
      <p className="mb-6 text-sm text-sky-100/50">
        Menampilkan{" "}
        <span className="font-bold text-cyan-200">{filtered.length}</span> dari{" "}
        {certificates.length} sertifikat
      </p>

      {/* ── Grid ── */}
      <motion.div
        layout
        className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((cert) => {
            const previewUrl = getPreviewImage(cert);
            return (
              <motion.article
                key={cert.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -6 }}
                className="cert-card clay-panel group overflow-hidden rounded-[2.5rem] p-4"
              >
                {/* Thumbnail area with page 1 image preview for all */}
                <button
                  onClick={() => setSelected(cert)}
                  className="relative block w-full overflow-hidden rounded-[2rem] text-left"
                  aria-label={`Lihat sertifikat ${cert.title}`}
                >
                  <div className="cert-img-wrapper">
                    <Image
                      src={previewUrl}
                      alt={cert.title}
                      width={600}
                      height={450}
                      className="cert-img"
                      loading="lazy"
                    />
                  </div>

                  {/* PDF Indicator badge */}
                  {cert.type === "pdf" && (
                    <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-lg bg-rose-950/80 px-2.5 py-1 text-[0.65rem] font-bold text-rose-200 backdrop-blur-md border border-rose-500/30 shadow-lg">
                      <FileText size={12} /> PDF (Halaman 1)
                    </span>
                  )}

                  {/* Gradient overlay */}
                  <span className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

                  {/* Preview badge */}
                  <span className="cert-preview-badge">
                    <Maximize2 size={14} /> Preview Full
                  </span>
                </button>

                {/* Info area */}
                <div className="p-4">
                  {/* Tags */}
                  <div className="mb-3 flex flex-wrap gap-2">
                    {cert.tags.map((t) => (
                      <span
                        key={t}
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wider ${TAG_CONFIG[t].color}`}
                      >
                        {TAG_CONFIG[t].icon} {t}
                      </span>
                    ))}
                  </div>

                  {/* Issuer */}
                  <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-white/8 px-3 py-1 text-[0.7rem] font-bold uppercase tracking-widest text-cyan-100/80">
                    <Award size={13} /> {cert.issuer}
                  </div>

                  {/* Title */}
                  <h3 className="mt-2 text-lg font-extrabold leading-snug text-white">
                    {cert.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-2 text-[0.82rem] leading-relaxed text-sky-100/65">
                    {cert.desc}
                  </p>

                  {/* Footer */}
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs font-black text-emerald-300">
                      📅 {cert.date}
                    </span>
                    <a
                      href={rawFilePath(cert.file)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cert-open-link"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink size={13} />
                      <span>{cert.type === "pdf" ? "Buka PDF" : "Lihat File"}</span>
                    </a>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* ── Lightbox Modal ── */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-[130] grid place-items-center bg-slate-950/85 px-4 py-8 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="cert-lightbox"
              initial={{ opacity: 0, y: 32, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.94 }}
              transition={{ type: "spring", stiffness: 180, damping: 22 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setSelected(null)}
                className="cert-lightbox-close"
                aria-label="Tutup"
              >
                <X size={20} />
              </button>

              {/* Full page 1 preview image for all */}
              <div className="cert-lightbox-img-wrapper relative">
                <Image
                  src={getPreviewImage(selected)}
                  alt={selected.title}
                  width={900}
                  height={675}
                  className="cert-lightbox-img"
                  priority
                />
                {selected.type === "pdf" && (
                  <span className="absolute left-4 top-4 rounded-xl bg-slate-950/85 px-3 py-1.5 text-xs font-bold text-cyan-200 border border-cyan-500/30 backdrop-blur-md">
                    📄 Document Preview — Halaman 1
                  </span>
                )}
              </div>

              {/* Tags */}
              <div className="mt-5 flex flex-wrap justify-center gap-2">
                {selected.tags.map((t) => (
                  <span
                    key={t}
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[0.7rem] font-bold uppercase tracking-wider ${TAG_CONFIG[t].color}`}
                  >
                    {TAG_CONFIG[t].icon} {t}
                  </span>
                ))}
              </div>

              {/* Title */}
              <h3 className="mt-4 text-center text-2xl font-black text-white md:text-3xl">
                {selected.title}
              </h3>

              {/* Issuer & Date */}
              <p className="mt-2 text-center text-sm font-semibold text-cyan-100/70">
                {selected.issuer} • {selected.date}
              </p>

              {/* Description */}
              <p className="mt-5 text-center leading-7 text-sky-100/72">
                {selected.desc}
              </p>

              {/* Action Button */}
              <div className="mt-6 flex justify-center gap-3">
                <a
                  href={rawFilePath(selected.file)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cert-lightbox-btn"
                >
                  <ExternalLink size={16} />
                  {selected.type === "pdf"
                    ? "Buka File PDF Asli"
                    : "Lihat Gambar Asli"}
                </a>
              </div>

              <p className="mt-4 text-center text-xs text-sky-100/40">
                Klik area gelap atau tombol X untuk menutup.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

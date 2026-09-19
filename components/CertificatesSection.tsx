"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import {
  Award,
  ExternalLink,
  FileText,
  Filter,
  Eye,
  Shield,
  Code,
  Database,
  Brain,
  Users,
  Briefcase,
  ChevronDown,
  ChevronUp,
  Calendar,
  ArrowRight,
} from "lucide-react";
import {
  certificates,
  getPreviewImage,
  type Certificate,
  type CertificateTag,
} from "@/data/certificates";

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

/* ─────────────── Component ─────────────── */
export default function CertificatesSection() {
  const { language } = useLanguage();
  const [activeTag, setActiveTag] = useState<CertificateTag>("All");
  const [activeYear, setActiveYear] = useState<string>("All");
  const [showAll, setShowAll] = useState(false);

  const tags = Object.keys(TAG_CONFIG) as CertificateTag[];

  /* Extract unique years sorted descending */
  const years = useMemo(() => {
    const uniqueYears = [...new Set(certificates.map((c) => c.date))];
    return uniqueYears.sort((a, b) => Number(b) - Number(a));
  }, []);

  const getTagLabel = (tag: CertificateTag) => {
    if (tag === "All") return language === "id" ? "Semua" : "All";
    if (tag === "Organization") return language === "id" ? "Organisasi" : "Organization";
    if (tag === "Career") return language === "id" ? "Karir" : "Career";
    if (tag === "Programming") return language === "id" ? "Pemrograman" : "Programming";
    return tag;
  };

  const filtered = useMemo(() => {
    let result = certificates;
    if (activeTag !== "All") {
      result = result.filter((c) => c.tags.includes(activeTag));
    }
    if (activeYear !== "All") {
      result = result.filter((c) => c.date === activeYear);
    }
    // Sort newest first
    return [...result].sort((a, b) => Number(b.date) - Number(a.date));
  }, [activeTag, activeYear]);

  const visibleCertificates = showAll ? filtered : filtered.slice(0, 6);
  const hiddenCount = filtered.length - 6;

  const rawFilePath = (file: string) => `/certificates/${file}`;

  const handleTagChange = (tag: CertificateTag) => {
    setActiveTag(tag);
    setShowAll(false);
  };
  const handleYearChange = (year: string) => {
    setActiveYear(year);
    setShowAll(false);
  };

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
          {language === "id" ? "Sertifikat & Pencapaian" : "Certificates & Achievements"}
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-sky-100/70">
          {language === "id"
            ? `Koleksi ${certificates.length} sertifikat profesional dengan halaman detail mandiri untuk verifikasi kredensial.`
            : `Collection of ${certificates.length} professional certificates with dedicated detail pages for credential verification.`}
        </p>
      </div>

      {/* ── Filter Tags ── */}
      <div className="cert-tags-wrapper mb-4">
        <div className="cert-tags-scroll">
          {tags.map((tag) => {
            const cfg = TAG_CONFIG[tag];
            const isActive = activeTag === tag;
            return (
              <button
                key={tag}
                onClick={() => handleTagChange(tag)}
                className={`cert-tag ${isActive ? "cert-tag--active" : ""} ${cfg.color}`}
              >
                {cfg.icon}
                <span>{getTagLabel(tag)}</span>
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

      {/* ── Year Filter ── */}
      <div className="mb-10 flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-sky-100/50">
          <Calendar size={13} />
          {language === "id" ? "Tahun:" : "Year:"}
        </span>
        <button
          onClick={() => handleYearChange("All")}
          className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold transition-all ${
            activeYear === "All"
              ? "bg-cyan-500/30 text-cyan-200 ring-1 ring-cyan-400/50"
              : "bg-white/8 text-sky-100/60 hover:bg-white/15 hover:text-white"
          }`}
        >
          {language === "id" ? "Semua" : "All"}
        </button>
        {years.map((year) => (
          <button
            key={year}
            onClick={() => handleYearChange(year)}
            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold transition-all ${
              activeYear === year
                ? "bg-emerald-500/30 text-emerald-200 ring-1 ring-emerald-400/50"
                : "bg-white/8 text-sky-100/60 hover:bg-white/15 hover:text-white"
            }`}
          >
            {year}
          </button>
        ))}
      </div>

      {/* ── Count ── */}
      <p className="mb-6 text-sm text-sky-100/50">
        {language === "id" ? "Menampilkan " : "Showing "}
        <span className="font-bold text-cyan-200">{filtered.length}</span>{" "}
        {language === "id" ? `dari ${certificates.length} sertifikat` : `of ${certificates.length} certificates`}
      </p>

      {/* ── Grid ── */}
      <motion.div
        layout
        className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {visibleCertificates.map((cert) => {
            const previewUrl = getPreviewImage(cert);
            return (
              <motion.article
                key={cert.slug}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -6 }}
                className="cert-card clay-panel group overflow-hidden rounded-[2.5rem] p-4"
              >
                {/* Thumbnail area with link to dedicated certificate page */}
                <Link
                  href={`/certificates/${cert.slug}`}
                  className="relative block w-full overflow-hidden rounded-[2rem] text-left"
                  aria-label={`Lihat sertifikat ${cert.title}`}
                >
                  <div className="cert-img-wrapper">
                    <Image
                      src={previewUrl}
                      alt={cert.title}
                      width={600}
                      height={450}
                      className="cert-img transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>

                  {/* PDF Indicator badge */}
                  {cert.type === "pdf" && (
                    <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-lg bg-rose-950/85 px-2.5 py-1 text-[0.65rem] font-bold text-rose-200 backdrop-blur-md border border-rose-500/30 shadow-lg">
                      <FileText size={12} /> {language === "id" ? "PDF (Halaman 1)" : "PDF (Page 1)"}
                    </span>
                  )}

                  {/* Gradient overlay */}
                  <span className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

                  {/* Preview badge */}
                  <span className="cert-preview-badge">
                    <Eye size={14} /> {language === "id" ? "Detail Sertifikat" : "View Certificate"}
                  </span>
                </Link>

                {/* Info area */}
                <div className="p-4">
                  {/* Tags */}
                  <div className="mb-3 flex flex-wrap gap-2">
                    {cert.tags.map((t) => (
                      <span
                        key={t}
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wider ${TAG_CONFIG[t].color}`}
                      >
                        {TAG_CONFIG[t].icon} {getTagLabel(t)}
                      </span>
                    ))}
                  </div>

                  {/* Issuer */}
                  <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-white/8 px-3 py-1 text-[0.7rem] font-bold uppercase tracking-widest text-cyan-100/80">
                    <Award size={13} /> {cert.issuer}
                  </div>

                  {/* Title */}
                  <Link href={`/certificates/${cert.slug}`}>
                    <h3 className="mt-2 text-lg font-extrabold leading-snug text-white transition-colors hover:text-cyan-300">
                      {cert.title}
                    </h3>
                  </Link>

                  {/* Description */}
                  <p className="mt-2 line-clamp-3 text-[0.82rem] leading-relaxed text-sky-100/65">
                    {cert.desc}
                  </p>

                  {/* Footer */}
                  <div className="mt-4 flex items-center justify-between gap-2 border-t border-white/10 pt-3">
                    <span className="text-xs font-black text-emerald-300">
                      📅 {cert.date}
                    </span>
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/certificates/${cert.slug}`}
                        className="inline-flex items-center gap-1 rounded-full border border-cyan-400/40 bg-cyan-500/15 px-2.5 py-1 text-[0.7rem] font-bold text-cyan-200 transition hover:bg-cyan-500/30"
                      >
                        <span>Detail</span>
                        <ArrowRight size={11} />
                      </Link>
                      <a
                        href={rawFilePath(cert.file)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cert-open-link"
                        onClick={(e) => e.stopPropagation()}
                        title={cert.type === "pdf" ? "Buka file PDF asli" : "Buka gambar asli"}
                      >
                        <ExternalLink size={12} />
                        <span>{cert.type === "pdf" ? "PDF" : "File"}</span>
                      </a>
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Show More / Show Less Button */}
      {filtered.length > 6 && (
        <div className="mt-10 flex justify-center">
          <button
            onClick={() => setShowAll((v) => !v)}
            className="experience-show-more-btn"
          >
            {showAll ? (
              <>
                <ChevronUp size={18} /> {language === "id" ? "Tampilkan Lebih Sedikit" : "Show Less"}
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
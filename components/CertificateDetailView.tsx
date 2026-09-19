"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ExternalLink,
  Award,
  Calendar,
  FileText,
  ShieldCheck,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import type { Certificate } from "@/data/certificates";
import { getPreviewImage } from "@/data/certificates";

type Props = {
  cert: Certificate;
  prevCert?: Certificate;
  nextCert?: Certificate;
};

export default function CertificateDetailView({ cert, prevCert, nextCert }: Props) {
  const previewUrl = getPreviewImage(cert);
  const rawFileUrl = `/certificates/${cert.file}`;

  return (
    <div className="relative isolate min-h-screen overflow-hidden text-slate-100 selection:bg-cyan-500/30">
      {/* Fixed Deep Ocean Background */}
      <div className="fixed inset-0 -z-20 deep-ocean" />
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(34,211,238,0.12),rgba(255,255,255,0))]" />

      {/* Top Floating Header */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/75 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 lg:px-8">
          <Link
            href="/#certificates"
            className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-sky-200 transition-all hover:border-cyan-400/50 hover:bg-cyan-500/15 hover:text-white"
          >
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
            <span>Kembali ke Sertifikat</span>
          </Link>

          <div className="flex items-center gap-2.5">
            {cert.verifyUrl && (
              <a
                href={cert.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden items-center gap-2 rounded-full border border-cyan-400/40 bg-cyan-500/20 px-4 py-2 text-xs font-bold text-cyan-200 shadow-[0_0_20px_rgba(34,211,238,0.2)] transition-all hover:bg-cyan-500/30 hover:text-white sm:inline-flex"
              >
                <ShieldCheck size={14} />
                <span>Verifikasi Online</span>
              </a>
            )}
            <a
              href={rawFileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold text-white transition-all hover:bg-white/20"
            >
              <FileText size={14} />
              <span>{cert.type === "pdf" ? "Buka PDF" : "Lihat Gambar"}</span>
              <ExternalLink size={12} />
            </a>
          </div>
        </div>
      </header>

      {/* Main Certificate Content */}
      <main className="mx-auto max-w-5xl px-5 py-10 lg:px-8">
        {/* Certificate Meta Header */}
        <div className="mb-8">
          <div className="mb-3 flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-400/30 bg-cyan-500/15 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-cyan-200">
              <Award size={13} />
              {cert.issuer}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-500/15 px-3.5 py-1 text-xs font-bold text-emerald-200">
              <Calendar size={13} />
              Tahun {cert.date}
            </span>
            {cert.type === "pdf" && (
              <span className="inline-flex items-center gap-1 rounded-full border border-rose-500/30 bg-rose-500/15 px-3 py-1 text-xs font-bold text-rose-200">
                <FileText size={12} />
                Dokumen PDF Resmi
              </span>
            )}
          </div>

          <h1 className="text-3xl font-black leading-tight text-white md:text-5xl">
            {cert.title}
          </h1>
        </div>

        {/* High-Resolution Document Display */}
        <div className="clay-panel mb-10 overflow-hidden rounded-[2.5rem] border border-white/15 p-3 md:p-6">
          <div className="relative aspect-[16/11] w-full overflow-hidden rounded-[2rem] bg-slate-950/90 shadow-2xl">
            <Image
              src={previewUrl}
              alt={cert.title}
              fill
              priority
              className="object-contain p-2 md:p-4"
              sizes="(max-width: 1200px) 100vw, 1200px"
            />
          </div>

          {/* Bottom Bar on Document */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 px-2">
            <p className="text-xs text-sky-100/60">
              Pratinjau dokumen resolusi tinggi • Sumber resmi terverifikasi
            </p>
            <a
              href={rawFileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-300 hover:text-cyan-200"
            >
              <span>Unduh / Buka Dokumen Asli</span>
              <ExternalLink size={13} />
            </a>
          </div>
        </div>

        {/* Credential Details & Competencies */}
        <div className="clay-panel mb-12 rounded-[2.5rem] border border-white/10 p-6 md:p-10">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.25em] text-cyan-300">
            <Sparkles size={16} />
            <span>Keterangan & Kompetensi</span>
          </div>

          <h2 className="mt-3 text-2xl font-black text-white">
            Deskripsi Pencapaian
          </h2>

          <p className="mt-4 text-base leading-relaxed text-sky-100/80 md:text-lg">
            {cert.desc}
          </p>

          {/* Tags */}
          <div className="mt-8 border-t border-white/10 pt-6">
            <span className="block text-xs font-bold uppercase tracking-wider text-sky-100/50">
              Kategori & Bidang Keahlian
            </span>
            <div className="mt-3 flex flex-wrap gap-2">
              {cert.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-bold text-sky-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Verification CTA Box */}
          {cert.verifyUrl && (
            <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl border border-cyan-500/30 bg-cyan-950/30 p-5 sm:flex-row">
              <div className="flex items-center gap-3">
                <ShieldCheck size={28} className="text-cyan-300 flex-shrink-0" />
                <div>
                  <p className="text-sm font-bold text-white">Kredensial Digital Terverifikasi</p>
                  <p className="text-xs text-sky-100/60">
                    Sertifikat ini memiliki verifikasi online resmi dari lembaga penerbit.
                  </p>
                </div>
              </div>
              <a
                href={cert.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-cyan-400/50 bg-cyan-500/25 px-5 py-2.5 text-xs font-black text-white shadow-[0_0_20px_rgba(34,211,238,0.25)] transition-all hover:bg-cyan-500/40 flex-shrink-0"
              >
                <span>Periksa Keaslian</span>
                <ExternalLink size={13} />
              </a>
            </div>
          )}
        </div>

        {/* Next / Previous Certificate Navigation */}
        <nav className="flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          {prevCert ? (
            <Link
              href={`/certificates/${prevCert.slug}`}
              className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 transition-all hover:border-cyan-400/40 hover:bg-white/10"
            >
              <ArrowLeft size={20} className="text-cyan-300 transition-transform group-hover:-translate-x-1" />
              <div>
                <span className="block text-[0.7rem] uppercase tracking-wider text-sky-100/50">Sertifikat Sebelumnya</span>
                <span className="text-sm font-bold text-white">{prevCert.title}</span>
              </div>
            </Link>
          ) : <div />}

          {nextCert ? (
            <Link
              href={`/certificates/${nextCert.slug}`}
              className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-right transition-all hover:border-cyan-400/40 hover:bg-white/10 sm:ml-auto"
            >
              <div>
                <span className="block text-[0.7rem] uppercase tracking-wider text-sky-100/50">Sertifikat Selanjutnya</span>
                <span className="text-sm font-bold text-white">{nextCert.title}</span>
              </div>
              <ArrowRight size={20} className="text-cyan-300 transition-transform group-hover:translate-x-1" />
            </Link>
          ) : <div />}
        </nav>
      </main>
    </div>
  );
}
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ExternalLink,
  Layers,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Sparkles,
  Laptop,
  ArrowRight,
} from "lucide-react";
import type { Project } from "@/data/projects";

type Props = {
  project: Project;
  prevProject?: Project;
  nextProject?: Project;
};

export default function ProjectDetailView({ project, prevProject, nextProject }: Props) {
  const images =
    project.screenshots && project.screenshots.length > 0
      ? project.screenshots
      : project.screenshot
      ? [project.screenshot]
      : [];

  const [activeImageIdx, setActiveImageIdx] = useState(0);

  const hasMultipleImages = images.length > 1;

  const nextImage = () => {
    setActiveImageIdx((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setActiveImageIdx((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative isolate min-h-screen overflow-hidden text-slate-100 selection:bg-cyan-500/30">
      {/* Fixed Deep Ocean Background */}
      <div className="fixed inset-0 -z-20 deep-ocean" />
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(34,211,238,0.12),rgba(255,255,255,0))]" />

      {/* Top Floating Navigation */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/75 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 lg:px-8">
          <Link
            href="/#projects"
            className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-sky-200 transition-all hover:border-cyan-400/50 hover:bg-cyan-500/15 hover:text-white"
          >
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
            <span>Kembali ke Portfolio</span>
          </Link>

          <div className="flex items-center gap-3">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-cyan-500/20 px-4 py-2 text-sm font-bold text-cyan-200 shadow-[0_0_20px_rgba(34,211,238,0.2)] transition-all hover:bg-cyan-500/30 hover:text-white"
              >
                <span>Live Demo</span>
                <ExternalLink size={14} />
              </a>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-6xl px-5 py-10 lg:px-8">
        {/* Project Header Info */}
        <div className="mb-8">
          <div className="mb-3 flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-cyan-400/30 bg-cyan-500/15 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-cyan-200">
              {project.category}
            </span>
            <span className="rounded-full border border-emerald-400/30 bg-emerald-500/15 px-3.5 py-1 text-xs font-bold text-emerald-200">
              {project.type}
            </span>
          </div>

          <h1 className="text-3xl font-black leading-tight text-white md:text-5xl">
            {project.title}
          </h1>

          <p className="mt-4 max-w-3xl text-base leading-relaxed text-sky-100/75 md:text-lg">
            {project.desc}
          </p>
        </div>

        {/* Gallery / Visual Showcase */}
        <section className="mb-12">
          {images.length > 0 ? (
            <div className="clay-panel overflow-hidden rounded-[2.5rem] border border-white/10 p-3 md:p-6">
              {/* Main Image Display */}
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[2rem] bg-slate-950/80">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeImageIdx}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="relative h-full w-full"
                  >
                    <Image
                      src={images[activeImageIdx]}
                      alt={`${project.title} screenshot ${activeImageIdx + 1}`}
                      fill
                      priority
                      className="object-contain p-2"
                      sizes="(max-width: 1200px) 100vw, 1200px"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Arrow Controls */}
                {hasMultipleImages && (
                  <>
                    <button
                      onClick={prevImage}
                      aria-label="Previous screenshot"
                      className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-slate-950/70 p-2.5 text-white backdrop-blur-md transition-all hover:bg-cyan-500/30 hover:border-cyan-400/50"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={nextImage}
                      aria-label="Next screenshot"
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-slate-950/70 p-2.5 text-white backdrop-blur-md transition-all hover:bg-cyan-500/30 hover:border-cyan-400/50"
                    >
                      <ChevronRight size={20} />
                    </button>

                    {/* Counter Badge */}
                    <div className="absolute bottom-4 right-4 rounded-full border border-white/15 bg-slate-950/80 px-3 py-1 text-xs font-bold text-cyan-200 backdrop-blur-md">
                      {activeImageIdx + 1} / {images.length}
                    </div>
                  </>
                )}
              </div>

              {/* Thumbnails Row */}
              {hasMultipleImages && (
                <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIdx(idx)}
                      className={`relative aspect-[16/10] h-16 flex-shrink-0 overflow-hidden rounded-xl border-2 transition-all ${
                        activeImageIdx === idx
                          ? "border-cyan-400 ring-2 ring-cyan-400/40"
                          : "border-white/15 opacity-60 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`Thumbnail ${idx + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            /* Visual Cards Fallback */
            <div className="grid gap-4 md:grid-cols-3">
              {project.visuals.map((vis, idx) => (
                <div
                  key={idx}
                  className="clay-panel flex h-48 flex-col items-center justify-center rounded-[2rem] p-6 text-center"
                  style={{ background: vis.gradient }}
                >
                  <span className="text-5xl">{vis.icon}</span>
                  <span className="mt-3 text-xs font-bold uppercase tracking-wider text-white/80">
                    Visual Showcase #{idx + 1}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Tech Stack */}
        <section className="mb-12">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.25em] text-cyan-300">
            <Layers size={16} />
            <span>Teknologi & Stack</span>
          </div>
          <div className="mt-4 flex flex-wrap gap-2.5">
            {project.stack.map((item) => (
              <span
                key={item}
                className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-xs font-bold text-cyan-200 shadow-sm"
              >
                {item}
              </span>
            ))}
          </div>
        </section>

        {/* Overview & Description */}
        <section className="mb-12">
          <div className="clay-panel rounded-[2.5rem] border border-white/10 p-6 md:p-10">
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.25em] text-cyan-300">
              <Laptop size={16} />
              <span>Ringkasan & Detail Arsitektur</span>
            </div>
            <h2 className="mt-3 text-2xl font-black text-white md:text-3xl">
              Tentang Projek
            </h2>
            <p className="mt-5 text-base leading-relaxed text-sky-100/80 md:text-lg">
              {project.longDesc}
            </p>
          </div>
        </section>

        {/* Feature Modules */}
        {project.featureModules && project.featureModules.length > 0 && (
          <section className="mb-16">
            <div className="mb-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.25em] text-emerald-300">
                <Sparkles size={16} />
                <span>Fitur & Modul Sistem</span>
              </div>
              <h2 className="mt-2 text-2xl font-black text-white md:text-3xl">
                Fitur Utama yang Dibangun
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {project.featureModules.map((mod, idx) => (
                <div
                  key={idx}
                  className="clay-panel rounded-[2rem] border border-white/10 p-6"
                >
                  <div className="mb-4 flex items-center gap-3">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-2xl shadow-inner">
                      {mod.icon}
                    </span>
                    <h3 className="text-lg font-black text-white">{mod.module}</h3>
                  </div>

                  <ul className="space-y-3">
                    {mod.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5">
                        <CheckCircle2
                          size={16}
                          className="mt-1 flex-shrink-0 text-emerald-400"
                        />
                        <div>
                          <p className="text-sm font-bold text-white">{feat.name}</p>
                          <p className="mt-0.5 text-xs leading-relaxed text-sky-100/65">
                            {feat.desc}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Live Demo Callout */}
        {project.demoUrl && (
          <div className="clay-panel mb-16 flex flex-col items-center justify-between gap-6 rounded-[2.5rem] border border-cyan-500/30 bg-gradient-to-r from-cyan-950/40 to-slate-900/60 p-8 text-center md:flex-row md:text-left">
            <div>
              <h3 className="text-xl font-black text-white">
                Tertarik mencoba aplikasi ini secara langsung?
              </h3>
              <p className="mt-1 text-sm text-sky-100/70">
                Akses demo interaktif atau kunjungi deployment produksi publik.
              </p>
            </div>
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-cyan-400/50 bg-cyan-500/25 px-6 py-3.5 text-sm font-black text-white shadow-[0_0_25px_rgba(34,211,238,0.3)] transition-all hover:bg-cyan-500/40"
            >
              <span>Kunjungi Live Demo</span>
              <ExternalLink size={16} />
            </a>
          </div>
        )}

        {/* Next / Previous Project Navigation */}
        <nav className="flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          {prevProject ? (
            <Link
              href={`/projects/${prevProject.slug}`}
              className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 transition-all hover:border-cyan-400/40 hover:bg-white/10"
            >
              <ArrowLeft size={20} className="text-cyan-300 transition-transform group-hover:-translate-x-1" />
              <div>
                <span className="block text-[0.7rem] uppercase tracking-wider text-sky-100/50">Projek Sebelumnya</span>
                <span className="text-sm font-bold text-white">{prevProject.title}</span>
              </div>
            </Link>
          ) : <div />}

          {nextProject ? (
            <Link
              href={`/projects/${nextProject.slug}`}
              className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-right transition-all hover:border-cyan-400/40 hover:bg-white/10 sm:ml-auto"
            >
              <div>
                <span className="block text-[0.7rem] uppercase tracking-wider text-sky-100/50">Projek Selanjutnya</span>
                <span className="text-sm font-bold text-white">{nextProject.title}</span>
              </div>
              <ArrowRight size={20} className="text-cyan-300 transition-transform group-hover:translate-x-1" />
            </Link>
          ) : <div />}
        </nav>
      </main>
    </div>
  );
}
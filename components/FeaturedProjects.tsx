"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, Eye, ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import { projects, categories, type Project } from "@/data/projects";

// ════ Project Card Component with Hover-Paused 3s Auto-Slideshow ════
function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Resolve array of images (or fallback to visuals)
  const images =
    project.screenshots && project.screenshots.length > 0
      ? project.screenshots
      : project.screenshot
        ? [project.screenshot]
        : null;

  const totalSlides = images ? images.length : project.visuals.length;

  useEffect(() => {
    if (totalSlides <= 1 || isHovered) return;

    const interval = setInterval(() => {
      setCurrentImgIndex((prev) => (prev + 1) % totalSlides);
    }, 3000);

    return () => clearInterval(interval);
  }, [totalSlides, isHovered]);

  const activeIdx = currentImgIndex % totalSlides;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: -10 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      className="portfolio-card group block cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/projects/${project.slug}`} className="block">
        {/* Image Area with Auto-Slide */}
        <div className="portfolio-card-image relative overflow-hidden">
          {images ? (
            <div
              className="portfolio-card-image-bg relative h-full w-full"
              style={{ background: project.visuals[0].gradient, padding: 0 }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIdx}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 h-full w-full"
                >
                  <Image
                    src={images[activeIdx]}
                    alt={`${project.title} — Slide ${activeIdx + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-contain p-1.5 transition-transform duration-500 group-hover:scale-105"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Gallery Indicator Dots */}
              {images.length > 1 && (
                <div className="absolute bottom-2.5 left-1/2 z-10 flex -translate-x-1/2 gap-1.5 rounded-full bg-black/50 px-2.5 py-1 backdrop-blur-md">
                  {images.map((_, dotIdx) => (
                    <div
                      key={dotIdx}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        dotIdx === activeIdx ? "w-4 bg-cyan-400" : "w-1.5 bg-white/40"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div
              className="portfolio-card-image-bg transition-colors duration-500"
              style={{
                background:
                  project.visuals[activeIdx % project.visuals.length].gradient,
              }}
            >
              <span>{project.visuals[activeIdx % project.visuals.length].icon}</span>
            </div>
          )}

          <div className="portfolio-card-overlay">
            <span className="portfolio-card-overlay-btn">
              <Eye size={14} /> Detail Projek
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="portfolio-card-body">
          <div className="mb-4 flex items-center justify-between">
            <span className="portfolio-card-category">{project.type}</span>
            {project.demoUrl ? (
              <span
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  window.open(project.demoUrl, "_blank", "noopener,noreferrer");
                }}
                className="live-demo-bubble cursor-pointer"
                title="Buka Live Demo di Tab Baru"
              >
                <span>Live Demo</span>
                <ExternalLink size={13} />
              </span>
            ) : (
              <ExternalLink className="text-cyan-200/50" size={16} />
            )}
          </div>

          <h3 className="text-xl font-black text-white transition-colors group-hover:text-cyan-200">
            {project.title}
          </h3>

          <p className="mt-3 min-h-14 text-sm leading-7 text-sky-100/68">
            {project.desc}
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {project.stack.slice(0, 3).map((item) => (
              <span
                key={item}
                className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold text-cyan-100"
              >
                {item}
              </span>
            ))}
            {project.stack.length > 3 && (
              <span className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold text-cyan-100/50">
                +{project.stack.length - 3}
              </span>
            )}
          </div>

          {/* Action Link Footer */}
          <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-3 text-xs font-bold text-cyan-300">
            <span className="inline-flex items-center gap-1 group-hover:underline">
              Lihat Detail Halaman <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
            </span>
            <span className="text-[0.7rem] text-sky-100/40">Dedicated Page</span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

export default function FeaturedProjects() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [showAll, setShowAll] = useState(false);

  // Count projects per category
  const projectCounts: Record<string, number> = {
    All: projects.length,
    ...Object.fromEntries(
      categories.slice(1).map((cat) => [
        cat,
        projects.filter((p) => p.category === cat).length,
      ])
    ),
  };

  const filtered =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  const visibleProjects = showAll ? filtered : filtered.slice(0, 6);
  const hiddenCount = filtered.length - 6;

  const handleFilterChange = (cat: string) => {
    setActiveFilter(cat);
    setShowAll(false);
  };

  return (
    <section id="projects" className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
      {/* Header */}
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.35em] text-cyan-200">
            Portfolio Showcase
          </p>
          <h2 className="mt-3 text-4xl font-black text-white md:text-5xl">
            Featured Projects
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-sky-100/70">
            Koleksi {projects.length} projek unggulan dari Full Stack Web
            Development hingga Network Security. Setiap projek dilengkapi halaman detail mandiri untuk informasi menyeluruh.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-2xl border border-cyan-400/20 bg-cyan-950/40 px-4 py-2.5 backdrop-blur-md">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-bold text-cyan-200">
            {projects.length} Total Projek Aktif
          </span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="mt-10 flex flex-wrap gap-2.5">
        {categories.map((cat) => {
          const isActive = activeFilter === cat;
          const count = projectCounts[cat] || 0;
          return (
            <button
              key={cat}
              onClick={() => handleFilterChange(cat)}
              className={`portfolio-filter-btn ${isActive ? "active" : ""}`}
            >
              <span>{cat}</span>
              <span
                className={`ml-1.5 rounded-full px-2 py-0.5 text-[0.65rem] font-black transition-colors ${
                  isActive
                    ? "bg-slate-950 text-cyan-300"
                    : "bg-white/10 text-sky-100/60"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Projects Grid */}
      <motion.div
        layout
        className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {visibleProjects.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={index}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Show More / Show Less Button */}
      {filtered.length > 6 && (
        <div className="mt-12 flex justify-center">
          <button
            onClick={() => setShowAll((prev) => !prev)}
            className="experience-show-more-btn"
          >
            {showAll ? (
              <>
                <ChevronUp size={18} /> Tampilkan Lebih Sedikit
              </>
            ) : (
              <>
                <ChevronDown size={18} /> Lihat {hiddenCount} Projek Lainnya
              </>
            )}
          </button>
        </div>
      )}
    </section>
  );
}
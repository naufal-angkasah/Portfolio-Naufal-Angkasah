"use client";

import { useState, useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, Eye, X, ChevronLeft, ChevronRight } from "lucide-react";

type ProjectVisual = {
  icon: string;
  gradient: string;
};

type Project = {
  title: string;
  type: string;
  category: string;
  desc: string;
  longDesc: string;
  stack: string[];
  visuals: ProjectVisual[];
};

const projects: Project[] = [
  {
    title: "DTP Telkom Landing Page v3",
    type: "Web Dev",
    category: "Web Dev",
    desc: "Upgraded DTP Telkom website to version 3 using Vue3, JavaScript, and CSS.",
    longDesc:
      "Full upgrade dari website DTP Telkom ke versi 3. Menggunakan Vue3, JavaScript, dan CSS. Mengerjakan landing pages, integrasi Telkom DTP API, optimalisasi database, dan testing. Proyek ini merupakan bagian dari Kampus Merdeka Batch 5 di Telkom Indonesia.",
    stack: ["Vue3", "JavaScript", "CSS", "REST API", "Database"],
    visuals: [
      { icon: "🌐", gradient: "linear-gradient(135deg, #0c4a6e 0%, #164e63 50%, #0e7490 100%)" },
      { icon: "💻", gradient: "linear-gradient(135deg, #083344 0%, #155e75 50%, #0e7490 100%)" },
      { icon: "📱", gradient: "linear-gradient(135deg, #164e63 0%, #0c4a6e 50%, #155e75 100%)" }
    ],
  },
  {
    title: "Hydrological Cycle Web App",
    type: "Full Stack",
    category: "Full Stack",
    desc: "Full-stack web application with authentication and database integration.",
    longDesc:
      "Aplikasi web full-stack untuk manajemen data Siklus Hidrologi. Mencakup rework interface, integrasi API, penyelarasan back-end, autentikasi client, admin front-end, dan integrasi database lengkap. Dibangun dengan pendekatan modular dan clean architecture.",
    stack: ["React", "Node.js", "Auth", "Database", "REST API"],
    visuals: [
      { icon: "💧", gradient: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0d4f72 100%)" },
      { icon: "📊", gradient: "linear-gradient(135deg, #020617 0%, #0f172a 50%, #1e3a5f 100%)" },
      { icon: "⚙️", gradient: "linear-gradient(135deg, #1e3a5f 0%, #0d4f72 50%, #0f172a 100%)" }
    ],
  },
  {
    title: "SOC Lab Server Configuration",
    type: "Network Security",
    category: "Network Security",
    desc: "Configured VMs and network allocation for Security Operations Center Lab.",
    longDesc:
      "Konfigurasi lengkap server SOC Lab di Swiss German University. Meliputi setup Virtual Machines, alokasi jaringan, dan integrasi tools keamanan: Wazuh untuk threat detection, Zabbix untuk monitoring, Splunk untuk log analysis, Iris untuk incident response, dan Honeypots untuk threat intelligence. Semua berjalan di environment Linux.",
    stack: ["Wazuh", "Splunk", "Zabbix", "Honeypots", "Linux", "Redis"],
    visuals: [
      { icon: "🛡️", gradient: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)" },
      { icon: "🖥️", gradient: "linear-gradient(135deg, #0f3460 0%, #1a1a2e 50%, #16213e 100%)" },
      { icon: "🚨", gradient: "linear-gradient(135deg, #16213e 0%, #0f3460 50%, #1a1a2e 100%)" }
    ],
  },
  {
    title: "Vulnerability Scanner Tool",
    type: "Cybersecurity",
    category: "Network Security",
    desc: "Custom tool untuk mendeteksi kerentanan web seperti SQL injection dan XSS.",
    longDesc:
      "Script dan tool kustom untuk melakukan vulnerability assessment pada aplikasi web. Mendeteksi kerentanan umum seperti SQL injection, Cross-Site Scripting (XSS), dan konfigurasi keamanan yang lemah. Dibangun mengikuti standar OWASP Top 10 dan best practices penetration testing.",
    stack: ["Python", "PenTest", "OWASP", "Security Scanning"],
    visuals: [
      { icon: "🔍", gradient: "linear-gradient(135deg, #1a0a2e 0%, #2d1b4e 50%, #1a1a3e 100%)" },
      { icon: "🐞", gradient: "linear-gradient(135deg, #2d1b4e 0%, #1a1a3e 50%, #1a0a2e 100%)" },
      { icon: "🔐", gradient: "linear-gradient(135deg, #1a1a3e 0%, #1a0a2e 50%, #2d1b4e 100%)" }
    ],
  },
  {
    title: "Abyss IT Portfolio",
    type: "Web Dev",
    category: "Web Dev",
    desc: "Website portfolio bertema deep ocean claymorphism untuk personal branding.",
    longDesc:
      "Website portfolio pribadi dengan tema deep ocean claymorphism yang unik. Menggunakan Next.js, TypeScript, dan Framer Motion untuk animasi yang smooth. Fitur termasuk 3D orb, custom cursor gurita, makhluk laut interaktif, floating bubbles, dan desain yang sepenuhnya responsive.",
    stack: ["Next.js", "TypeScript", "Framer Motion", "Three.js", "Tailwind CSS"],
    visuals: [
      { icon: "🌊", gradient: "linear-gradient(135deg, #031226 0%, #08284d 50%, #0c4a6e 100%)" },
      { icon: "🐙", gradient: "linear-gradient(135deg, #08284d 0%, #0c4a6e 50%, #031226 100%)" },
      { icon: "✨", gradient: "linear-gradient(135deg, #0c4a6e 0%, #031226 50%, #08284d 100%)" }
    ],
  },
  {
    title: "Coding Education Platform",
    type: "Education",
    category: "Education",
    desc: "Kurikulum mengajar 280+ siswa tentang web development dan deployment.",
    longDesc:
      "Merancang dan menyampaikan kurikulum pengajaran coding kepada 280+ siswa di MAN 1 Banda Aceh. Materi mencakup web development flow, penggunaan repository (Git/GitHub), front-end development (HTML, CSS, JavaScript), back-end development, database management, dan proses deployment. Pendekatan hands-on dengan proyek nyata.",
    stack: ["Teaching", "Web Dev", "Curriculum Design", "Git", "Deployment"],
    visuals: [
      { icon: "📚", gradient: "linear-gradient(135deg, #1a2332 0%, #2d3748 50%, #1a365d 100%)" },
      { icon: "👨‍🏫", gradient: "linear-gradient(135deg, #2d3748 0%, #1a365d 50%, #1a2332 100%)" },
      { icon: "🎓", gradient: "linear-gradient(135deg, #1a365d 0%, #1a2332 50%, #2d3748 100%)" }
    ],
  },
];

const categories = ["All", "Web Dev", "Network Security", "Full Stack", "Education"];

export default function FeaturedProjects() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const filtered = activeFilter === "All"
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  const openModal = useCallback((projectIndex: number) => {
    const project = filtered[projectIndex];
    const globalIndex = projects.indexOf(project);
    setSelectedIndex(globalIndex);
    setActiveImageIndex(0);
  }, [filtered]);

  const closeModal = useCallback(() => {
    setSelectedIndex(null);
    setActiveImageIndex(0);
  }, []);

  const selected = selectedIndex !== null ? projects[selectedIndex] : null;

  const goNextImage = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selected) {
      setActiveImageIndex((prev) => (prev + 1) % selected.visuals.length);
    }
  }, [selected]);

  const goPrevImage = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selected) {
      setActiveImageIndex((prev) => (prev - 1 + selected.visuals.length) % selected.visuals.length);
    }
  }, [selected]);

  // Autoplay functionality for images within a project
  useEffect(() => {
    if (!selected) return;
    const interval = setInterval(() => {
      setActiveImageIndex((prev) => (prev + 1) % selected.visuals.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [selected]);

  return (
    <section id="projects" className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
      {/* Header */}
      <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.35em] text-cyan-200">Portfolio</p>
          <h2 className="mt-3 text-4xl font-black text-white md:text-5xl">Featured Projects</h2>
        </div>
        <p className="max-w-lg text-sm leading-7 text-sky-100/70">
          Beberapa hasil karya terbaik di bidang Web Development, Cybersecurity, dan IT Operations.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="portfolio-filters">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`portfolio-filter-btn ${activeFilter === cat ? "active" : ""}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Project Grid */}
      <motion.div layout className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((project, i) => (
            <motion.article
              key={project.title}
              layout
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -10 }}
              transition={{ duration: 0.35, delay: i * 0.06 }}
              className="portfolio-card"
              onClick={() => openModal(i)}
            >
              {/* Image Area */}
              <div className="portfolio-card-image">
                <div
                  className="portfolio-card-image-bg transition-colors duration-500"
                  style={{ background: project.visuals[0].gradient }}
                >
                  <span>{project.visuals[0].icon}</span>
                </div>
                <div className="portfolio-card-overlay">
                  <span className="portfolio-card-overlay-btn">
                    <Eye size={14} /> View Details
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="portfolio-card-body">
                <div className="mb-4 flex items-center justify-between">
                  <span className="portfolio-card-category">{project.type}</span>
                  <ExternalLink className="text-cyan-200/50" size={16} />
                </div>
                <h3 className="text-xl font-black text-white">{project.title}</h3>
                <p className="mt-3 min-h-14 text-sm leading-7 text-sky-100/68">{project.desc}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.stack.slice(0, 3).map((item) => (
                    <span key={item} className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold text-cyan-100">
                      {item}
                    </span>
                  ))}
                  {project.stack.length > 3 && (
                    <span className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold text-cyan-100/50">
                      +{project.stack.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selected && selectedIndex !== null && (
          <motion.div
            className="portfolio-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="portfolio-modal"
              initial={{ opacity: 0, y: 40, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.94 }}
              transition={{ type: "spring", stiffness: 180, damping: 22 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Image Gallery */}
              <div
                className="portfolio-modal-image overflow-hidden"
                style={{ background: selected.visuals[activeImageIndex].gradient, transition: "background 0.5s ease" }}
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    key={activeImageIndex}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.2 }}
                    transition={{ duration: 0.3 }}
                    className="absolute"
                  >
                    {selected.visuals[activeImageIndex].icon}
                  </motion.span>
                </AnimatePresence>

                {/* Close */}
                <button onClick={closeModal} className="portfolio-modal-close" aria-label="Close">
                  <X size={20} />
                </button>

                {/* Prev / Next Image */}
                <button onClick={goPrevImage} className="portfolio-modal-nav prev" aria-label="Previous image">
                  <ChevronLeft size={22} />
                </button>
                <button onClick={goNextImage} className="portfolio-modal-nav next" aria-label="Next image">
                  <ChevronRight size={22} />
                </button>
                
                {/* Image Dots */}
                <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
                  {selected.visuals.map((_, i) => (
                    <div 
                      key={i} 
                      onClick={() => setActiveImageIndex(i)}
                      className={`h-2 cursor-pointer rounded-full transition-all duration-300 ${i === activeImageIndex ? "bg-white w-6" : "bg-white/30 w-2"}`} 
                    />
                  ))}
                </div>
              </div>

              {/* Modal Content */}
              <div className="portfolio-modal-content">
                <div className="mb-4 flex flex-wrap items-center gap-3">
                  <span className="portfolio-card-category">{selected.type}</span>
                  <span className="text-xs text-sky-100/40">
                    Gambar {activeImageIndex + 1} / {selected.visuals.length}
                  </span>
                </div>

                <h3 className="text-3xl font-black text-white">{selected.title}</h3>
                <p className="mt-5 leading-8 text-sky-100/72">{selected.longDesc}</p>

                {/* Tech Stack */}
                <div className="mt-8">
                  <p className="mb-3 text-xs font-black uppercase tracking-[0.28em] text-cyan-200/70">Tech Stack</p>
                  <div className="flex flex-wrap gap-2">
                    {selected.stack.map((item) => (
                      <span key={item} className="rounded-full bg-white/10 px-4 py-2 text-sm font-bold text-cyan-100">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Navigation hint */}
                <p className="mt-8 text-center text-xs text-sky-100/40">
                  Gunakan tombol ← → untuk melihat gambar lain, atau klik area gelap untuk menutup.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

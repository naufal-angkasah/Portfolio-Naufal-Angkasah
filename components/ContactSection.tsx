"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Globe2, Maximize2, X, Sparkles, MapPin, Bot } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { useLanguage } from "@/context/LanguageContext";

type PhotoItem = {
  id: string;
  src: string;
  title: string;
  location: string;
  tag: string;
  icon: typeof MapPin | typeof Bot;
  tagColor: string;
};

const photos: PhotoItem[] = [
  {
    id: "prambanan",
    src: "/gallery/prambanan.jpg",
    title: "Candi Prambanan Heritage",
    location: "Yogyakarta, Indonesia",
    tag: "Travel & Culture",
    icon: MapPin,
    tagColor: "bg-emerald-400/20 text-emerald-300 border-emerald-400/30",
  },
  {
    id: "transformers",
    src: "/gallery/optimus-prime.jpg",
    title: "Optimus Prime Exhibition",
    location: "Robotics & Tech Exhibit",
    tag: "AI & Tech Enthusiast",
    icon: Bot,
    tagColor: "bg-cyan-400/20 text-cyan-300 border-cyan-400/30",
  },
];

export default function ContactSection() {
  const { language } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText("ahmad.naufalangkasah@gmail.com");
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      const textArea = document.createElement("textarea");
      textArea.value = "ahmad.naufalangkasah@gmail.com";
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    }
  };

  return (
    <section id="contact" className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
      {/* Section Header */}
      <div className="mb-10">
        <p className="text-sm font-black uppercase tracking-[0.35em] text-cyan-200">
          Get in Touch
        </p>
        <h2 className="mt-3 text-4xl font-black text-white md:text-5xl">
          {language === "id" ? "Hubungi Saya" : "Contact Me"}
        </h2>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.1fr_1.4fr] items-stretch">
        {/* Contact Info Card */}
        <div className="clay-panel flex flex-col justify-between rounded-[2.5rem] p-8 md:p-10">
          <div>
            <h3 className="text-2xl font-black text-white">
              {language === "id" ? "Mari Berkolaborasi! 🚀" : "Let's Collaborate! 🚀"}
            </h3>
            <p className="mt-4 leading-7 text-sky-100/70">
              {language === "id"
                ? "Terbuka untuk peluang karir, proyek freelance, kolaborasi Web Development, AI Agent & Data Analysis, maupun Network Security."
                : "Open to career opportunities, freelance projects, collaborations in Web Development, AI Agent & Data Analysis, or Network Security."}
            </p>

            <div className="mt-8 space-y-3.5">
              <button
                onClick={handleCopyEmail}
                className="contact-link-card w-full text-left cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-cyan-400/20 text-cyan-200">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">ahmad.naufalangkasah@gmail.com</p>
                  <p className="text-xs font-medium text-cyan-200/70">
                    {copied
                      ? language === "id"
                        ? "Tersalin ke clipboard! ✓"
                        : "Copied to clipboard! ✓"
                      : language === "id"
                      ? "Klik untuk salin email"
                      : "Click to copy email"}
                  </p>
                </div>
              </button>

              <a
                href="https://github.com/naufal-angkasah"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link-card transition-all hover:scale-[1.02]"
              >
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-cyan-400/20 text-cyan-200">
                  <FaGithub size={20} />
                </div>
                <div>
                  <span className="text-sm font-bold text-white">GitHub Profile</span>
                  <p className="text-xs text-sky-100/50">github.com/naufal-angkasah</p>
                </div>
              </a>

              <a
                href="https://www.linkedin.com/in/naufal-angkasah/"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link-card transition-all hover:scale-[1.02]"
              >
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-cyan-400/20 text-cyan-200">
                  <FaLinkedin size={20} />
                </div>
                <div>
                  <span className="text-sm font-bold text-white">LinkedIn Profile</span>
                  <p className="text-xs text-sky-100/50">linkedin.com/in/naufal-angkasah</p>
                </div>
              </a>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between flex-wrap gap-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-300/15 border border-emerald-400/30 px-4 py-2 text-xs font-black text-emerald-300">
              <Globe2 size={15} /> {language === "id" ? "Tersedia untuk Peluang Kerja" : "Available for Opportunities"}
            </div>
            <span className="text-xs font-semibold text-sky-100/50">Banda Aceh, Indonesia 🇮🇩</span>
          </div>
        </div>

        {/* Dynamic Interactive Photo Gallery Showcase */}
        <div className="clay-panel flex flex-col justify-between rounded-[2.5rem] p-6 sm:p-8">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="grid h-7 w-7 place-items-center rounded-lg bg-cyan-400/20 text-cyan-300">
                <Sparkles size={16} />
              </span>
              <h4 className="text-base font-black text-white">
                {language === "id" ? "Aktivitas & Eksplorasi" : "Activities & Moments"}
              </h4>
            </div>
            <span className="text-xs font-medium text-cyan-200/60">
              {language === "id" ? "Klik untuk memperbesar" : "Click to view full"}
            </span>
          </div>

          {/* Dual Photo Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-auto">
            {photos.map((photo, index) => {
              const IconComp = photo.icon;
              return (
                <motion.div
                  key={photo.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  whileHover={{ y: -6, scale: 1.02 }}
                  onClick={() => setSelectedPhoto(photo)}
                  className="group relative cursor-pointer overflow-hidden rounded-[2rem] border border-cyan-200/20 bg-slate-950/40 p-2.5 shadow-[0_15px_35px_rgba(0,0,0,0.4)] backdrop-blur-xl transition-all duration-300 hover:border-cyan-300/50 hover:shadow-[0_20px_45px_rgba(6,182,212,0.25)]"
                >
                  {/* Photo Container */}
                  <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[1.6rem] bg-slate-900">
                    <Image
                      src={photo.src}
                      alt={photo.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 30vw"
                      className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />

                    {/* Top Tag Badge */}
                    <div className="absolute top-3 left-3">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[0.68rem] font-bold backdrop-blur-md shadow-md ${photo.tagColor}`}
                      >
                        <IconComp size={11} /> {photo.tag}
                      </span>
                    </div>

                    {/* Hover Zoom Button */}
                    <div className="absolute top-3 right-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <span className="grid h-8 w-8 place-items-center rounded-full bg-slate-950/80 text-cyan-200 backdrop-blur-md border border-cyan-200/30 shadow-lg">
                        <Maximize2 size={13} />
                      </span>
                    </div>

                    {/* Bottom Caption */}
                    <div className="absolute bottom-3 inset-x-3 text-left">
                      <h5 className="text-sm font-black text-white leading-tight drop-shadow-md">
                        {photo.title}
                      </h5>
                      <p className="mt-0.5 text-xs text-sky-100/75 flex items-center gap-1">
                        <MapPin size={11} className="text-cyan-300 shrink-0" />
                        <span className="truncate">{photo.location}</span>
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <p className="mt-4 text-center text-xs text-sky-100/50">
            {language === "id"
              ? "📸 Dokumentasi kegiatan & minat di dunia teknologi, AI, dan eksplorasi budaya."
              : "📸 Moments & interests in technology, AI exploration, and cultural journeys."}
          </p>
        </div>
      </div>

      {/* Fullscreen Photo Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-xl p-4 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-2xl w-full overflow-hidden rounded-[2.5rem] border border-cyan-200/30 bg-slate-950/90 p-4 shadow-[0_25px_70px_rgba(0,0,0,0.8)] backdrop-blur-2xl"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-6 right-6 z-20 grid h-10 w-10 place-items-center rounded-full bg-slate-900/80 text-cyan-200 border border-cyan-200/30 backdrop-blur-md transition hover:bg-rose-500/20 hover:text-rose-300 hover:border-rose-400/50 cursor-pointer"
                aria-label="Tutup preview"
              >
                <X size={18} />
              </button>

              {/* Modal Image */}
              <div className="relative aspect-[3/4] max-h-[75vh] w-full overflow-hidden rounded-[2rem] bg-slate-900">
                <Image
                  src={selectedPhoto.src}
                  alt={selectedPhoto.title}
                  fill
                  priority
                  sizes="(max-width: 768px) 95vw, 650px"
                  className="object-contain"
                />
              </div>

              {/* Modal Info Footer */}
              <div className="mt-4 px-2 flex items-center justify-between flex-wrap gap-2">
                <div>
                  <h4 className="text-lg font-black text-white">{selectedPhoto.title}</h4>
                  <p className="text-xs text-sky-100/70 flex items-center gap-1.5 mt-0.5">
                    <MapPin size={13} className="text-cyan-300" />
                    {selectedPhoto.location}
                  </p>
                </div>
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold ${selectedPhoto.tagColor}`}
                >
                  {selectedPhoto.tag}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

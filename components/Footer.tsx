"use client";

import { Mail, Waves } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-white/8 bg-slate-950/30 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-sky-300 to-cyan-600 text-slate-950">
              <Waves size={20} />
            </span>
            <div>
              <p className="text-sm font-black tracking-[0.2em] text-cyan-100">ABYSS</p>
              <p className="text-xs text-sky-100/50">Naufal Angkasah</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a href="https://github.com/naufal-angkasah" target="_blank" rel="noopener noreferrer" className="grid h-10 w-10 place-items-center rounded-xl bg-white/8 text-sky-100/60 transition hover:bg-white/15 hover:text-white" aria-label="GitHub">
              <FaGithub size={18} />
            </a>
            <a href="https://www.linkedin.com/in/naufal-angkasah/" target="_blank" rel="noopener noreferrer" className="grid h-10 w-10 place-items-center rounded-xl bg-white/8 text-sky-100/60 transition hover:bg-white/15 hover:text-white" aria-label="LinkedIn">
              <FaLinkedin size={18} />
            </a>
            <a href="mailto:ahmad.naufalangkasah@gmail.com" className="grid h-10 w-10 place-items-center rounded-xl bg-white/8 text-sky-100/60 transition hover:bg-white/15 hover:text-white" aria-label="Email">
              <Mail size={18} />
            </a>
          </div>

          <p className="text-xs text-sky-100/40">
            © {currentYear} Naufal Angkasah. Dibuat dengan passion untuk keamanan & web development.
          </p>
        </div>
      </div>
    </footer>
  );
}

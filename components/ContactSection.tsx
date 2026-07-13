"use client";

import { useState } from "react";
import { Mail, Globe2 } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [popup, setPopup] = useState({ show: false, type: "success", message: "" });

  const showPopup = (type: "success" | "error", message: string) => {
    setPopup({ show: true, type, message });
    setTimeout(() => setPopup({ show: false, type: "success", message: "" }), 5000);
  };

  const handleCopyEmail = async () => {
    await navigator.clipboard.writeText("ahmad.naufalangkasah@gmail.com");
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("https://formsubmit.co/ajax/ahmad.naufalangkasah@gmail.com", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        showPopup("success", "Pesan berhasil terkirim! Saya akan segera membalasnya.");
        form.reset();
      } else {
        throw new Error("Server error");
      }
    } catch {
      showPopup("error", "Gagal mengirim pesan. Silakan kirim manual via email.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
      {/* Toast Popup */}
      <div className={`contact-popup ${popup.show ? "show" : ""} ${popup.type}`}>
        <span className="text-xl">{popup.type === "success" ? "✅" : "⚠️"}</span>
        <p className="text-sm font-semibold text-sky-100">{popup.message}</p>
      </div>

      <div className="mb-10">
        <p className="text-sm font-black uppercase tracking-[0.35em] text-cyan-200">Get in Touch</p>
        <h2 className="mt-3 text-4xl font-black text-white md:text-5xl">Hubungi Saya</h2>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_1.5fr]">
        {/* Contact Info */}
        <div className="clay-panel rounded-[2.5rem] p-8">
          <h3 className="text-2xl font-black text-white">Mari Berkolaborasi!</h3>
          <p className="mt-4 leading-7 text-sky-100/70">
            Terbuka untuk mendiskusikan peluang di bidang Web Development maupun Cyber Security.
          </p>

          <div className="mt-6 space-y-3">
            <button onClick={handleCopyEmail} className="contact-link-card w-full text-left">
              <Mail className="text-cyan-200" size={20} />
              <div>
                <p className="text-sm font-bold text-white">ahmad.naufalangkasah@gmail.com</p>
                <p className="text-xs text-sky-100/50">{copied ? "Copied! ✓" : "Click to copy"}</p>
              </div>
            </button>
            <a href="https://github.com/naufal-angkasah" target="_blank" rel="noopener noreferrer" className="contact-link-card">
              <FaGithub className="text-cyan-200" size={20} />
              <span className="text-sm font-bold text-white">GitHub Profile</span>
            </a>
            <a href="https://www.linkedin.com/in/naufal-angkasah/" target="_blank" rel="noopener noreferrer" className="contact-link-card">
              <FaLinkedin className="text-cyan-200" size={20} />
              <span className="text-sm font-bold text-white">LinkedIn Profile</span>
            </a>
          </div>

          <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-emerald-300/15 px-4 py-2 text-xs font-black text-emerald-300">
            <Globe2 size={15} /> Available for opportunities
          </div>
        </div>

        {/* Contact Form */}
        <div className="clay-panel rounded-[2.5rem] p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <input type="text" name="_honey" style={{ display: "none" }} />
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_template" value="box" />

            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-semibold text-sky-100/80">Nama Lengkap</label>
              <input
                type="text" id="name" name="name" required placeholder="Masukkan nama Anda"
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none backdrop-blur-sm transition focus:border-cyan-300/50 focus:shadow-[0_0_12px_rgba(34,211,238,0.15)]"
              />
            </div>
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-semibold text-sky-100/80">Email</label>
              <input
                type="email" id="email" name="email" required placeholder="Masukkan email aktif"
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none backdrop-blur-sm transition focus:border-cyan-300/50 focus:shadow-[0_0_12px_rgba(34,211,238,0.15)]"
              />
            </div>
            <div>
              <label htmlFor="subject" className="mb-2 block text-sm font-semibold text-sky-100/80">Subjek</label>
              <input
                type="text" id="subject" name="_subject" required placeholder="Tujuan pesan ini"
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none backdrop-blur-sm transition focus:border-cyan-300/50 focus:shadow-[0_0_12px_rgba(34,211,238,0.15)]"
              />
            </div>
            <div>
              <label htmlFor="message" className="mb-2 block text-sm font-semibold text-sky-100/80">Pesan Anda</label>
              <textarea
                id="message" name="message" required rows={5} placeholder="Apa yang ingin Anda bicarakan?"
                className="w-full resize-none rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none backdrop-blur-sm transition focus:border-cyan-300/50 focus:shadow-[0_0_12px_rgba(34,211,238,0.15)]"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="clay-button w-full rounded-full px-6 py-4 font-black text-slate-950 disabled:opacity-60"
            >
              {isSubmitting ? "Mengirim..." : "Kirim Pesan 🚀"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

"use client";

import Navbar from "@/components/Navbar";
import OceanBackground from "@/components/OceanBackground";
import FloatingBubbles from "@/components/FloatingBubbles";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function NetworkSecurityPage() {
  return (
    <>
      <OceanBackground />
      <FloatingBubbles />

      <div className="page-wrapper page-enter">
        <Navbar />

        <div className="projects-page">
          <Link href="/" className="back-link" id="back-to-home-ns">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16 10H4M4 10L9 5M4 10L9 15"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Kembali ke Home
          </Link>

          <header className="projects-header">
            <div className="projects-header-icon network">🛡️</div>
            <h1>Network Security</h1>
            <p>
              Proyek-proyek di bidang keamanan jaringan, penetration testing,
              analisis kerentanan, dan cybersecurity tools.
            </p>
          </header>

          <div className="projects-grid">
            {/* Empty state - ready for projects */}
            <div className="projects-empty">
              <div className="projects-empty-icon">🔒</div>
              <h3>Proyek Segera Hadir</h3>
              <p>
                Proyek-proyek Network Security akan ditambahkan di sini.
                <br />
                Gunakan komponen ProjectCard untuk menambahkan proyek baru.
              </p>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}

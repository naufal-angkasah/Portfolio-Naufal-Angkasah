"use client";

import Link from "next/link";

export default function MenuCards() {
  return (
    <section className="menu-section" id="explore">
      <h2 className="menu-section-title">Pilih Bidang Keahlian</h2>
      <p className="menu-section-subtitle">
        Jelajahi proyek-proyek di dua bidang spesialisasi saya
      </p>

      <div className="menu-cards">
        {/* Network Security Card */}
        <Link
          href="/network-security"
          className="menu-card card-network"
          id="menu-card-network"
        >
          <div className="menu-card-particles">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className="card-particle"
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${30 + i * 10}%`,
                  animationDelay: `${i * 0.8}s`,
                }}
              />
            ))}
          </div>

          <div className="menu-card-icon">🛡️</div>
          <h3 className="menu-card-title">Network Security</h3>
          <p className="menu-card-description">
            Proyek-proyek di bidang keamanan jaringan, penetration testing,
            analisis kerentanan, firewall configuration, dan cybersecurity
            tools. Melindungi infrastruktur digital dari ancaman.
          </p>
          <span className="menu-card-arrow">
            Lihat Proyek
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 10H16M16 10L11 5M16 10L11 15"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </Link>

        {/* Web Development Card */}
        <Link
          href="/web-development"
          className="menu-card card-webdev"
          id="menu-card-webdev"
        >
          <div className="menu-card-particles">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className="card-particle"
                style={{
                  left: `${15 + i * 16}%`,
                  top: `${25 + i * 12}%`,
                  animationDelay: `${i * 0.6}s`,
                }}
              />
            ))}
          </div>

          <div className="menu-card-icon">💻</div>
          <h3 className="menu-card-title">Web Development</h3>
          <p className="menu-card-description">
            Proyek-proyek pengembangan web modern menggunakan framework terkini,
            responsive design, REST API, database integration, dan full-stack
            applications.
          </p>
          <span className="menu-card-arrow">
            Lihat Proyek
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 10H16M16 10L11 5M16 10L11 15"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </Link>
      </div>
    </section>
  );
}

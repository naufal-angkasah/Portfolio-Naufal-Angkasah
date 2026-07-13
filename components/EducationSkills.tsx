"use client";

import React from "react";

export default function EducationSkills() {
  return (
    <section className="edu-skills-section" id="education">
      <div className="edu-skills-container">
        
        {/* Education Column */}
        <div className="edu-column">
          <div className="section-header left-align">
            <h2>🎓 Pendidikan</h2>
          </div>
          <div className="edu-card">
            <h3>Universitas Syiah Kuala</h3>
            <p className="edu-degree">Gelar Sarjana, Informatika</p>
            <p className="edu-period">August 2020 - July 2025</p>
            <div className="edu-decoration"></div>
          </div>
        </div>

        {/* Skills & Certs Column */}
        <div className="skills-column">
          <div className="section-header left-align">
            <h2>🏆 Keahlian & Sertifikasi</h2>
          </div>
          
          <div className="skills-card">
            <h4>Top Skills</h4>
            <div className="skills-tags">
              <span className="skill-tag">Software Industry</span>
              <span className="skill-tag">Redis</span>
              <span className="skill-tag">Honeypots</span>
              <span className="skill-tag">Network Security</span>
              <span className="skill-tag">Web Development</span>
            </div>

            <h4 style={{ marginTop: "1.5rem" }}>Sertifikasi Utama</h4>
            <ul className="cert-list">
              <li>
                <span className="cert-icon">📜</span>
                <div>
                  <strong>Sertifikat - SIB Dicoding Cycle 4</strong>
                  <p>Tahun 2023</p>
                </div>
              </li>
              <li>
                <span className="cert-icon">📜</span>
                <div>
                  <strong>Junior Cyber Security</strong>
                  <p>Vocational School Graduate Academy</p>
                </div>
              </li>
            </ul>

            <h4 style={{ marginTop: "1.5rem" }}>Bahasa</h4>
            <div className="skills-tags">
              <span className="skill-tag">Indonesian (Native)</span>
              <span className="skill-tag">English (Limited Working)</span>
              <span className="skill-tag">Japanese (Elementary)</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

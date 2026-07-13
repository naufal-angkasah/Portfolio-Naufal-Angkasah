"use client";

import React from "react";

const experiences = [
  {
    company: "Swiss German University",
    role: "Research Assistant (Cybersecurity SOC)",
    period: "June 2026 - July 2026",
    location: "Tangerang",
    description: "I work as a cybersecurity researcher in the Security Operations Center (SOC). Duties include threat monitoring, data processing, reporting improvements, web development assistance, and SOC lab server configuration (VMs, network allocation). Tools: Linux, Wazuh, Zabbix, Redis, Iris, Honeypot, Splunk, Tguard.",
  },
  {
    company: "MAN 1 Banda Aceh",
    role: "Coding Teacher",
    period: "January 2026 - June 2026",
    location: "Banda Aceh, Indonesia",
    description: "Taught more than 280 students about website development flow and basic coding fundamentals. Instructed on using repositories, basic to advanced front-end, back-end, database management, and deployment processes.",
  },
  {
    company: "Point Center",
    role: "Web Developer",
    period: "December 2025 - June 2026",
    location: "Semarang, Central Java",
    description: "Built websites for headquarter companies using WordPress and its integrations, and assisted corporate partners in building and managing their websites.",
  },
  {
    company: "Pekerja Lepas (Freelance)",
    role: "Frontend & Full-stack Web Developer",
    period: "January 2024 - August 2025",
    location: "Banda Aceh, Indonesia",
    description: "Developed various projects including thesis writing/typing services, Hydrological Cycle project (reworking interface, API integration, back-end alignment), and a full-stack foundation website with client authentication, admin front-end, and database integration.",
  },
  {
    company: "Universitas Syiah Kuala",
    role: "Laboratory Assistant",
    period: "February 2022 - December 2025",
    location: "Banda Aceh, Indonesia",
    description: "Served as a Lab Assistant across multiple subjects including Advanced Network Protocol, Wireless Networking, Data Communication, Web Content Management, Network Security System, Digital Marketing, Operating System, and Computer Network. Organized materials, taught classes of 30-40 students, and guided simulations using tools like NS-3, NetAnim, ENSP, GNS-3, Kali Linux, and MikroTik.",
  },
  {
    company: "Dicoding Indonesia",
    role: "Mentor (Batch 6) & MSIB 4 Participant",
    period: "February 2023 - June 2024",
    location: "Bandung, Indonesia (Online)",
    description: "Guided 25 participants through weekly consultation sessions, provided constructive feedback, and checked logbooks. Previously participated in MSIB batch 4 for Web Front-End and Back-End development.",
  },
  {
    company: "Telkom Indonesia",
    role: "Full Stack Engineer Intern",
    period: "July 2023 - December 2023",
    location: "Bandung, Indonesia",
    description: "Sponsored by Kampus Merdeka batch 5. Upgraded DTP Telkom website to version 3 using Vue3, JavaScript, and CSS. Worked on landing pages, integrated Telkom DTP API, optimized databases, and performed testing.",
  },
  {
    company: "Digital Talent Scholarship & Kominfo",
    role: "Cyber Security, Network Admin & FGA Participant",
    period: "July 2022 - March 2024",
    location: "Indonesia",
    description: "Participated in Junior Cyber Security, Junior Network Administrator, and FGA Datacom x Huawei ICT academy trainings. Learned about cyber-attacks (SQL injection, brute force), network structure (OSI layers, routers), and network simulations.",
  },
];

export default function ExperienceTimeline() {
  return (
    <section className="timeline-section" id="experience">
      <div className="section-header">
        <h2>💼 Pengalaman Kerja</h2>
        <p>Perjalanan karir profesional dan kontribusi saya di dunia teknologi.</p>
      </div>
      <div className="timeline-container">
        {experiences.map((exp, index) => (
          <div className="timeline-item" key={index}>
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <span className="timeline-period">{exp.period}</span>
              <h3 className="timeline-role">{exp.role}</h3>
              <h4 className="timeline-company">{exp.company} - <i>{exp.location}</i></h4>
              <p className="timeline-description">{exp.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

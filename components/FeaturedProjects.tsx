"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const projects = [
  {
    title: "DTP Telkom Landing Page v3",
    type: "Web Dev",
    desc: "Upgraded DTP Telkom website to version 3 using Vue3, JavaScript, and CSS. Worked on landing pages, integrated Telkom DTP API, optimized databases, and performed testing.",
    stack: ["Vue3", "JavaScript", "CSS", "API"],
  },
  {
    title: "Hydrological Cycle Web App",
    type: "Full Stack",
    desc: "Full-stack web application with client authentication, admin front-end, and database integration for Hydrological data management.",
    stack: ["React", "Auth", "Database", "Full Stack"],
  },
  {
    title: "SOC Lab Server Configuration",
    type: "Network Security",
    desc: "Configured VMs and network allocation for Security Operations Center Lab. Integrated Wazuh, Zabbix, Splunk, Iris, and Honeypots for threat monitoring.",
    stack: ["Wazuh", "Splunk", "Honeypots", "Linux"],
  },
  {
    title: "Vulnerability Scanner Tool",
    type: "Cybersecurity",
    desc: "Custom script untuk mendeteksi kerentanan web umum seperti SQL injection dan cross-site scripting (XSS) pada aplikasi web.",
    stack: ["Python", "PenTest", "OWASP"],
  },
  {
    title: "Abyss IT Portfolio",
    type: "Web Dev",
    desc: "Website personal bertema deep ocean claymorphism untuk personal branding sebagai Web Developer dan Network Security enthusiast.",
    stack: ["Next.js", "TypeScript", "Framer Motion"],
  },
  {
    title: "Coding Education Platform",
    type: "Education",
    desc: "Materi dan kurikulum mengajar 280+ siswa tentang web development flow, repository, front-end, back-end, database, dan deployment.",
    stack: ["Teaching", "Web Dev", "Curriculum"],
  },
];

export default function FeaturedProjects() {
  return (
    <section id="projects" className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
      <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.35em] text-cyan-200">Portfolio</p>
          <h2 className="mt-3 text-4xl font-black text-white md:text-5xl">Featured Projects</h2>
        </div>
        <p className="max-w-lg text-sm leading-7 text-sky-100/70">
          Beberapa hasil karya terbaik di bidang Web Development, Cybersecurity, dan IT Operations.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => (
          <motion.article
            key={project.title}
            whileHover={{ y: -8 }}
            className="clay-panel rounded-[2.5rem] p-7"
          >
            <div className="mb-8 flex items-center justify-between">
              <span className="rounded-full bg-cyan-300/18 px-4 py-2 text-xs font-black uppercase tracking-widest text-cyan-100">
                {project.type}
              </span>
              <ExternalLink className="text-cyan-200" size={20} />
            </div>
            <h3 className="text-2xl font-black text-white">{project.title}</h3>
            <p className="mt-4 min-h-28 leading-7 text-sky-100/72">{project.desc}</p>
            <div className="mt-7 flex flex-wrap gap-2">
              {project.stack.map((item) => (
                <span key={item} className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold text-cyan-100">
                  {item}
                </span>
              ))}
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

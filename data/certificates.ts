// Centralized Certificates Data
export type CertificateTag =
  | "All"
  | "Web Development"
  | "Network & Security"
  | "Data & AI"
  | "Programming"
  | "Organization"
  | "Career";

export type Certificate = {
  slug: string;
  title: string;
  issuer: string;
  date: string;
  desc: string;
  tags: CertificateTag[];
  /** file path relative to /certificates/ */
  file: string;
  /** explicit preview path override for cache busting */
  preview?: string;
  /** "image" for png/jpg, "pdf" for pdf */
  type: "image" | "pdf";
  /** optional credential verification link */
  verifyUrl?: string;
};

export function getPreviewImage(cert: Certificate): string {
  if (cert.preview) {
    return cert.preview;
  }
  if (cert.type === "image") {
    return `/certificates/${cert.file}`;
  }
  const previewFilename = cert.file.replace(/\.pdf$/i, ".jpg");
  return `/certificates/previews/${previewFilename}`;
}

export const certificates: Certificate[] = [
  // ═══ WEB DEVELOPMENT ═══
  {
    slug: "sib-dicoding-cycle-4-front-end-back-end",
    title: "SIB Dicoding Cycle 4 — Front-End & Back-End",
    issuer: "Dicoding Indonesia",
    date: "2023",
    tags: ["Web Development", "Programming", "Career"],
    file: "F063XB451_serti_dicoding_batch_4.pdf",
    type: "pdf",
    desc: "Sertifikat program Studi Independen Bersertifikat (SIB) Batch 4 dari Dicoding, mendalami Web Front-End dan Back-End Development secara intensif.",
  },
  {
    slug: "mentor-dicoding-batch-6",
    title: "Mentor Dicoding Batch 6",
    issuer: "Dicoding Indonesia",
    date: "2024",
    tags: ["Web Development", "Career"],
    file: "Sertifikat_Mentor_dicoding_batch_6_Naufal_Angkasah.jpg",
    type: "image",
    desc: "Sertifikat sebagai mentor resmi di Dicoding Batch 6, membimbing peserta dalam Web Development dan pemrograman dasar.",
  },
  {
    slug: "menjadi-front-end-web-developer-expert",
    title: "Menjadi Front-End Web Developer Expert",
    issuer: "Dicoding Indonesia",
    date: "2023",
    tags: ["Web Development"],
    file: "sertifikat_Menjadi_Front-End_Web_Developer_Expert.pdf",
    type: "pdf",
    desc: "Kelas expert Dicoding — PWA, accessibility, web performance optimization, testing, dan deployment strategi profesional.",
  },
  {
    slug: "belajar-fundamental-front-end-web-development",
    title: "Belajar Fundamental Front-End Web Development",
    issuer: "Dicoding Indonesia",
    date: "2023",
    tags: ["Web Development"],
    file: "sertifikat_Belajar_Fundamental_Front-End_Web_Development.pdf",
    type: "pdf",
    desc: "Fundamental Front-End — DOM manipulation, Web Components, NPM, module bundler, dan clean architecture.",
  },
  {
    slug: "belajar-dasar-pemrograman-web",
    title: "Belajar Dasar Pemrograman Web",
    issuer: "Dicoding Indonesia",
    date: "2023",
    tags: ["Web Development", "Programming"],
    file: "sertifikat_Belajar_dasar_Pemograman_Web.pdf",
    type: "pdf",
    desc: "Dasar-dasar HTML, CSS, dan JavaScript untuk membangun halaman web yang responsif dan interaktif.",
  },
  {
    slug: "dicoding-certificate-collection",
    title: "Dicoding Certificate Collection",
    issuer: "Dicoding Indonesia",
    date: "2023",
    tags: ["Web Development", "Programming"],
    file: "serti_dicoding.pdf",
    type: "pdf",
    desc: "Kompilasi sertifikat penyelesaian berbagai kelas di Dicoding Academy terkait web development.",
  },

  // ═══ NETWORK & SECURITY ═══
  {
    slug: "junior-cyber-security",
    title: "Junior Cyber Security",
    issuer: "Digital Talent Scholarship & Kominfo",
    date: "2022",
    tags: ["Network & Security"],
    file: "Sertifikat_NAUFAL_ANGKASAH_Junior_Cyber_Security.pdf",
    type: "pdf",
    desc: "Pemahaman cyber-attacks (SQL injection, brute force, phishing), defence strategies, ethical hacking basics, dan security awareness.",
  },
  {
    slug: "junior-network-administrator",
    title: "Junior Network Administrator",
    issuer: "Digital Talent Scholarship & Kominfo",
    date: "2022",
    tags: ["Network & Security"],
    file: "Sertifikat_NAUFAL_ANGKASAH_Junior_Network_Administrator.pdf",
    type: "pdf",
    desc: "Network structure, OSI model, TCP/IP, routing & switching, firewall configuration, dan network simulations menggunakan Cisco Packet Tracer.",
  },
  {
    slug: "fga-datacom-x-huawei-ict",
    title: "FGA Datacom x Huawei ICT",
    issuer: "Digital Talent Scholarship",
    date: "2024",
    tags: ["Network & Security"],
    file: "datacom.pdf",
    type: "pdf",
    desc: "Huawei ICT Academy — networking fundamentals, data communication, VLAN, routing protocols, dan Huawei enterprise equipment.",
  },
  {
    slug: "datacom-november-training",
    title: "Datacom November Training",
    issuer: "Digital Talent Scholarship",
    date: "2024",
    tags: ["Network & Security"],
    file: "datacom_november.pdf",
    type: "pdf",
    desc: "Pelatihan lanjutan Datacom November — advanced networking, troubleshooting, dan konfigurasi perangkat enterprise Huawei.",
  },
  {
    slug: "huawei-certified-network-associate",
    title: "Huawei Certified Network Associate",
    issuer: "Huawei ICT Academy",
    date: "2024",
    tags: ["Network & Security"],
    file: "sertifikat_huawei_Naufal_Angkasah.pdf",
    type: "pdf",
    desc: "Sertifikasi resmi Huawei — kemampuan networking enterprise, konfigurasi switch & router, dan manajemen jaringan skala besar.",
  },
  {
    slug: "network-security-informatika-usk",
    title: "Network Security — Informatika USK",
    issuer: "Universitas Syiah Kuala",
    date: "2024",
    tags: ["Network & Security"],
    file: "Naufal_Angkasah_Informatika_security.pdf",
    type: "pdf",
    desc: "Sertifikat keahlian Network Security dari Program Studi Informatika Universitas Syiah Kuala.",
  },
  {
    slug: "belajar-jaringan-komputer-untuk-pemula",
    title: "Belajar Jaringan Komputer untuk Pemula",
    issuer: "Dicoding Indonesia",
    date: "2023",
    tags: ["Network & Security"],
    file: "sertifikat_Belajar_Jaringan_Komputer_untuk_pemula.pdf",
    type: "pdf",
    desc: "Topologi jaringan, IP addressing, subnetting, DNS, DHCP, dan konsep dasar administrasi jaringan.",
  },

  // ═══ DATA & AI ═══
  {
    slug: "prompt-engineering-untuk-software-developer",
    title: "Prompt Engineering untuk Software Developer",
    issuer: "Dicoding Indonesia (Google Developers ATP)",
    date: "2026",
    tags: ["Data & AI", "Programming", "Web Development"],
    file: "sertifikat_Prompt_Engineering_untuk_Software_Developer.pdf",
    type: "pdf",
    desc: "Sertifikat kompetensi Prompt Engineering untuk Software Developer (16 jam). Menguasai pola-pola prompt adaptif, best practices integrasi AI pada aktivitas development, serta limitasi dan etika AI (ID: 2VX3VY5YQPYQ).",
    verifyUrl: "https://www.dicoding.com/certificates/2VX3VY5YQPYQ",
  },
  {
    slug: "belajar-machine-learning-untuk-pemula",
    title: "Belajar Machine Learning untuk Pemula",
    issuer: "Dicoding Indonesia (Google Developers ATP)",
    date: "2026",
    tags: ["Data & AI", "Programming"],
    file: "sertifikat_Belajar_Machine_Learning_untuk_Pemula.pdf",
    type: "pdf",
    desc: "Sertifikat kompetensi Machine Learning untuk Pemula (90 jam). Alur kerja ML, Supervised Learning (Klasifikasi KNN & Decision Tree, Regresi Linear), Unsupervised Clustering (K-Means), Feature Engineering, Hyperparameter Tuning, dan proyek tabular (ID: JMZVL90QQXN9).",
    verifyUrl: "https://www.dicoding.com/certificates/JMZVL90QQXN9",
  },
  {
    slug: "belajar-dasar-ai",
    title: "Belajar Dasar AI",
    issuer: "Dicoding Indonesia (Google Cloud Partner)",
    date: "2026",
    tags: ["Data & AI"],
    file: "sertifikat_Belajar_Dasar_AI.pdf",
    type: "pdf",
    desc: "Sertifikat kelulusan Belajar Dasar AI (10 jam). Konsep dasar Artificial Intelligence, pemanfaatan data dalam pengembangan AI, pengantar Machine Learning, dan implementasi Deep Learning (ID: GRX509302Z0M).",
    verifyUrl: "https://www.dicoding.com/certificates/GRX509302Z0M",
  },
  {
    slug: "data-ai-agent-for-data-analysis",
    title: "Data - AI Agent for Data Analysis",
    issuer: "IBM SkillsBuild x Hacktiv8",
    date: "2026",
    tags: ["Data & AI", "Career"],
    file: "IBM_SkillsBuild_AI_Agent_for_Data_Analysis_Naufal_Angkasah.pdf",
    preview: "/certificates/previews/ibm-skillsbuild-ai-agent-cert-2026.jpg",
    type: "pdf",
    desc: "Sertifikat kelulusan program IBM SkillsBuild University Education: Data - AI Agent for Data Analysis & penyelesaian final project AI workflow (ID: 02055/H8/CSR/ISUE/V/2026).",
  },
  {
    slug: "transcript-score-ai-agent-for-data-analysis-8715100",
    title: "Transcript & Score: AI Agent for Data Analysis (87.15/100)",
    issuer: "IBM SkillsBuild x Hacktiv8",
    date: "2026",
    tags: ["Data & AI"],
    file: "IBM_SkillsBuild_AI_Agent_Transcript_Naufal_Angkasah.pdf",
    preview: "/certificates/previews/ibm-skillsbuild-ai-agent-transcript-2026.jpg",
    type: "pdf",
    desc: "Transkrip nilai & skor project building (87.15/100) mencakup Foundation & AI Intro (IBM Granite, Vibe Coding), AI Agent Development (IBM Bob), & Langflow (ID: 03560/H8/CSR/ISUE/V/2026).",
  },
  {
    slug: "classifying-data-using-ibm-granite",
    title: "Classifying Data Using IBM Granite",
    issuer: "IBM SkillsBuild",
    date: "2025",
    tags: ["Data & AI"],
    file: "Classifying_Data_Using_IBM_Granite.png",
    type: "image",
    desc: "Penggunaan model AI IBM Granite untuk klasifikasi data — machine learning concepts, data labeling, dan model evaluation.",
  },
  {
    slug: "data-science-landscape",
    title: "Data Science Landscape",
    issuer: "IBM SkillsBuild",
    date: "2025",
    tags: ["Data & AI"],
    file: "Data_Science_Landscape_ibm.png",
    type: "image",
    desc: "Overview ekosistem Data Science — tools, methodologies, career paths, dan real-world use cases di industri.",
  },
  {
    slug: "getting-started-with-data",
    title: "Getting Started with Data",
    issuer: "IBM SkillsBuild",
    date: "2025",
    tags: ["Data & AI"],
    file: "Getting_Started_with_Data_Earn_a_credential_.png",
    type: "image",
    desc: "Credential IBM untuk data fundamentals — data types, data collection, data cleaning, dan basic analytics.",
  },
  {
    slug: "introduction-to-data-concepts",
    title: "Introduction to Data Concepts",
    issuer: "IBM SkillsBuild",
    date: "2025",
    tags: ["Data & AI"],
    file: "Introduction_to_Data_Concepts_ibm.png",
    type: "image",
    desc: "Pengenalan konsep data — structured vs unstructured data, databases, data governance, dan data-driven decision making.",
  },
  {
    slug: "introduction-to-tableau-desktop",
    title: "Introduction to Tableau Desktop",
    issuer: "IBM SkillsBuild",
    date: "2025",
    tags: ["Data & AI"],
    file: "Introduction_to_Tableau_Desktop.png",
    type: "image",
    desc: "Data visualization menggunakan Tableau Desktop — dashboard design, chart types, data connections, dan interactive reporting.",
  },
  {
    slug: "unleashing-the-power-of-ai-agents",
    title: "Unleashing the Power of AI Agents",
    issuer: "IBM SkillsBuild",
    date: "2025",
    tags: ["Data & AI"],
    file: "Unleashing_the_Power_of_AI_Agents.png",
    type: "image",
    desc: "Eksplorasi AI Agents — autonomous systems, prompt engineering, LLM integration, dan AI use cases di enterprise.",
  },
  {
    slug: "ibm-skillsbuild-achievement",
    title: "IBM SkillsBuild Achievement",
    issuer: "IBM SkillsBuild",
    date: "2025",
    tags: ["Data & AI"],
    file: "Earn_it_Accept_it_Share_it_IBM_SkillsBuild.png",
    type: "image",
    desc: "Badge pencapaian IBM SkillsBuild — menyelesaikan rangkaian kursus data science dan AI fundamentals.",
  },
  {
    slug: "getting-started-with-data-credly-badge",
    title: "Getting Started with Data — Credly Badge",
    issuer: "IBM via Credly",
    date: "2025",
    tags: ["Data & AI"],
    file: "Getting_Started_with_Data_ibm_creadly_bedge.pdf",
    type: "pdf",
    desc: "Verified digital badge dari Credly untuk kompetensi data fundamentals dari IBM SkillsBuild program.",
  },

  // ═══ PROGRAMMING ═══
  {
    slug: "memulai-pemrograman-dengan-python",
    title: "Memulai Pemrograman dengan Python",
    issuer: "Dicoding Indonesia (Google Developers ATP)",
    date: "2026",
    tags: ["Programming", "Data & AI"],
    file: "sertifikat_Memulai_Pemrograman_dengan_Python.pdf",
    type: "pdf",
    desc: "Sertifikat kompetensi Pemrograman Python standar industri (60 jam). Menguasai alur kontrol, array & matriks, subprogram/fungsi, OOP Python, PEP8, unit testing, dan pemanfaatan library populer (ID: 0LZ0JGJ80X65).",
    verifyUrl: "https://www.dicoding.com/certificates/0LZ0JGJ80X65",
  },
  {
    slug: "pengenalan-ke-logika-pemrograman",
    title: "Pengenalan ke Logika Pemrograman",
    issuer: "Dicoding Indonesia",
    date: "2023",
    tags: ["Programming"],
    file: "sertifikat_Pengenalan_ke_Logika_Pemograman_Programing_Logic_101_Naufal_Angkasah.pdf",
    type: "pdf",
    desc: "Programming Logic 101 — flowchart, pseudocode, variabel, percabangan, perulangan, dan pemecahan masalah algoritmik.",
  },
  {
    slug: "memulai-dasar-pemrograman-untuk-menjadi-pengembang-software",
    title: "Memulai Dasar Pemrograman untuk Menjadi Pengembang Software",
    issuer: "Dicoding Indonesia",
    date: "2023",
    tags: ["Programming"],
    file: "sertifikat_Memulai_Dasar_Pemograman_untuk_Menjadi_Pengembang_Software_Naufal_Angkasah.pdf",
    type: "pdf",
    desc: "Fondasi pemrograman — paradigma OOP, version control, software development lifecycle, dan clean code principles.",
  },
  {
    slug: "memulai-pemrograman-dengan-java",
    title: "Memulai Pemrograman dengan Java",
    issuer: "Dicoding Indonesia",
    date: "2023",
    tags: ["Programming"],
    file: "sertifikat_Memulai_Pemograman_dengan_Java.pdf",
    type: "pdf",
    desc: "Java programming — syntax fundamentals, OOP concepts, collections, exception handling, dan project implementation.",
  },
  {
    slug: "belajar-dasar-git-dengan-github",
    title: "Belajar Dasar Git dengan GitHub",
    issuer: "Dicoding Indonesia",
    date: "2023",
    tags: ["Programming"],
    file: "sertifikat_Belajar_Dasar_Git_dengan_Girhub_Naufal_Angkasah.pdf",
    type: "pdf",
    desc: "Version control dengan Git & GitHub — branching, merging, pull requests, collaboration workflow, dan CI/CD dasar.",
  },
  {
    slug: "belajar-dasar-dasar-devops",
    title: "Belajar Dasar-dasar DevOps",
    issuer: "Dicoding Indonesia",
    date: "2023",
    tags: ["Programming"],
    file: "sertifikat_Belajar_Dasar-dasar_DevOps.pdf",
    type: "pdf",
    desc: "DevOps fundamentals — CI/CD pipelines, containerization, cloud deployment, monitoring, dan infrastructure as code.",
  },

  // ═══ CAREER ═══
  {
    slug: "belajar-strategi-pengembangan-diri",
    title: "Belajar Strategi Pengembangan Diri",
    issuer: "Dicoding Indonesia",
    date: "2026",
    tags: ["Career"],
    file: "sertifikat_Belajar_Strategi_Pengembangan_Diri.pdf",
    type: "pdf",
    desc: "Sertifikat strategi pengembangan diri profesional melalui pengelolaan pola pikir (growth mindset), manajemen waktu, adaptabilitas, serta perancangan Personal Development Plan (ID: NVP7WO3G4ZR0).",
    verifyUrl: "https://www.dicoding.com/certificates/NVP7WO3G4ZR0",
  },
  {
    slug: "introduction-to-financial-literacy",
    title: "Introduction to Financial Literacy",
    issuer: "Dicoding x DBS Foundation",
    date: "2026",
    tags: ["Career"],
    file: "sertifikat_Introduction_to_Financial_Literacy.pdf",
    type: "pdf",
    desc: "Sertifikat literasi finansial program Coding Camp powered by DBS Foundation 2026 (6 jam). Pemahaman prinsip dasar keuangan harian, strategi investasi masa depan, dan smart borrowing (ID: 53XEMJD40PRN).",
    verifyUrl: "https://www.dicoding.com/certificates/53XEMJD40PRN",
  },
  {
    slug: "kampus-merdeka-telkom-indonesia",
    title: "Kampus Merdeka — Telkom Indonesia",
    issuer: "Telkom Indonesia",
    date: "2023",
    tags: ["Career", "Web Development"],
    file: "1706521420_NAUFAL_ANGKASAH.pdf",
    type: "pdf",
    desc: "Sertifikat magang Kampus Merdeka Batch 5 di Telkom Indonesia — Full Stack Engineer menggunakan Vue3, JavaScript, API integration.",
  },
  {
    slug: "mengoptimalkan-linkedin-untuk-personal-branding",
    title: "Mengoptimalkan LinkedIn untuk Personal Branding",
    issuer: "Pijar Mahir",
    date: "2023",
    tags: ["Career"],
    file: "Pijar_Mahir-Belajar_Mengoptimalkan_Linkedin_Untuk_Meningkatkan_Personal_Branding_Kamu-ahmad.naufalangkasahgmail.com.pdf",
    type: "pdf",
    desc: "Strategi optimasi profil LinkedIn — personal branding, networking profesional, content creation, dan career development tips.",
  },

  // ═══ ORGANIZATION ═══
  {
    slug: "hmif-kabinet-infinity-2024",
    title: "HMIF Kabinet Infinity 2024",
    issuer: "HMIF — Universitas Syiah Kuala",
    date: "2024",
    tags: ["Organization"],
    file: "serti_hmif_kabinet_infinity_2024.pdf",
    type: "pdf",
    desc: "Sertifikat kepengurusan HMIF (Himpunan Mahasiswa Informatika) Kabinet Infinity 2024 di Universitas Syiah Kuala.",
  },
];

export function getCertificateBySlug(slug: string): Certificate | undefined {
  return certificates.find((c) => c.slug === slug);
}

export function getAllCertificateSlugs(): string[] {
  return certificates.map((c) => c.slug);
}

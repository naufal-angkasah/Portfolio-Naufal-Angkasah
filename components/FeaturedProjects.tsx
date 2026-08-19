"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, Eye, X, ChevronLeft, ChevronRight, Globe, ChevronDown, ChevronUp } from "lucide-react";

type ProjectVisual = {
  icon: string;
  gradient: string;
};

type FeatureModule = {
  icon: string;
  module: string;
  features: { name: string; desc: string }[];
};

type Project = {
  title: string;
  type: string;
  category: string;
  desc: string;
  longDesc: string;
  stack: string[];
  visuals: ProjectVisual[];
  screenshot?: string;
  screenshots?: string[];
  featureModules?: FeatureModule[];
  demoUrl?: string;
};

const projects: Project[] = [
  // ═══ FULL STACK & WEB DEV PROJECTS WITH SCREENSHOT GALLERIES ═══
  {
    title: "Automation Sentiment",
    type: "Data Science",
    category: "Full Stack",
    desc: "Automation untuk analisis sentiment berita menggunakan Langflow & Gemini AI.",
    longDesc:
      "Sistem otomasi analisis sentimen berita dan ulasan produk e-commerce menggunakan Langflow sebagai visual workflow builder. Memanfaatkan Gemini AI (gemini-3.5-flash) untuk memproses data review CSV, menghasilkan ringkasan sentimen (Positive/Neutral/Negative), action item bisnis berbasis data, serta rekomendasi teknis dan pemasaran yang terstruktur.",
    stack: ["Langflow", "API Key", "Data Science", "Data Automation", "Gemini AI"],
    demoUrl: "https://github.com/naufal-angkasah/automation-sentiment-analyst.git",
    screenshot: "/projects/screenshots/automation-sentiment-1.jpg",
    screenshots: [
      "/projects/screenshots/automation-sentiment-1.jpg",
      "/projects/screenshots/automation-sentiment-2.jpg",
      "/projects/screenshots/automation-sentiment-3.jpg",
      "/projects/screenshots/automation-sentiment-4.jpg",
      "/projects/screenshots/automation-sentiment-5.jpg",
    ],
    visuals: [
      { icon: "🤖", gradient: "linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)" },
      { icon: "📊", gradient: "linear-gradient(135deg, #203a43 0%, #2c5364 50%, #0f2027 100%)" },
      { icon: "💡", gradient: "linear-gradient(135deg, #2c5364 0%, #0f2027 50%, #203a43 100%)" },
    ],
    featureModules: [
      {
        icon: "🤖",
        module: "AI Sentiment Analysis Pipeline",
        features: [
          { name: "Visual Workflow Langflow", desc: "Membangun pipeline otomasi dengan drag-and-drop komponen: Read File → Prompt Template → Language Model → Chat Output" },
          { name: "Gemini AI Integration", desc: "Menggunakan model gemini-3.5-flash untuk memproses review CSV dan menghasilkan analisis sentimen akurat" },
        ],
      },
      {
        icon: "📊",
        module: "Analisis Sentimen & Ringkasan",
        features: [
          { name: "Klasifikasi Sentimen 3 Kategori", desc: "Positive (pujian/kepuasan), Neutral (seimbang/informatif), Negative (keluhan/kekecewaan)" },
          { name: "Ringkasan Naratif Terstruktur", desc: "Menghasilkan ringkasan kohesif dalam Bahasa Indonesia formal berdasarkan isi review produk e-commerce" },
        ],
      },
      {
        icon: "💡",
        module: "Business Action Items & Rekomendasi",
        features: [
          { name: "Action Item Berbasis Data", desc: "Rekomendasi teknis & bisnis spesifik (Software/Produk) yang dapat langsung diimplementasikan tim terkait" },
          { name: "Strategi Pemasaran & Logistik", desc: "Analisis tren review untuk rekomendasi kampanye pemasaran & optimalisasi kemitraan vendor logistik" },
        ],
      },
    ],
  },
  {
    title: "Kawaii Animal Sticker Studio",
    type: "Full Stack",
    category: "Full Stack",
    desc: "Studio pembuat stiker hewan kawaii otomatis bertenaga AI Gemini.",
    longDesc:
      "Aplikasi web full-stack pembuat stiker hewan lucu (Kawaii Animal Sticker Studio) bertenaga AI Google Gemini. Dilengkapi generator multi-model, fallback vektor SVG otomatis, pilihan palet warna estetis, tema kustom, manajemen riwayat lokal, serta ekspor tunggal & paket ZIP.",
    stack: ["Next.js", "TypeScript", "Gemini AI Engine", "Node.js Proxy", "Tailwind CSS", "Vercel"],
    demoUrl: "https://kawaii-animal-sticker-studio.ai.studio",
    screenshot: "/projects/screenshots/kawaii-sticker-1.jpg",
    screenshots: [
      "/projects/screenshots/kawaii-sticker-1.jpg",
      "/projects/screenshots/kawaii-sticker-2.jpg",
      "/projects/screenshots/kawaii-sticker-3.jpg",
      "/projects/screenshots/kawaii-sticker-4.jpg",
      "/projects/screenshots/kawaii-sticker-5.jpg",
    ],
    visuals: [
      { icon: "🎨", gradient: "linear-gradient(135deg, #831843 0%, #be185d 50%, #db2777 100%)" },
      { icon: "🐾", gradient: "linear-gradient(135deg, #be185d 0%, #db2777 50%, #831843 100%)" },
      { icon: "✨", gradient: "linear-gradient(135deg, #db2777 0%, #831843 50%, #be185d 100%)" },
    ],
    featureModules: [
      {
        icon: "🎨",
        module: "AI Generator & Vector Fallback",
        features: [
          { name: "Multi-Model Gemini AI", desc: "Menggunakan AI Gemini (gemini-2.5-flash-image & 3.1-flash-image) untuk pemrosesan instruksi visual rasio 1:1" },
          { name: "Automatic Vector Fallback", desc: "Sistem pencadangan cerdas yang menggambar stiker Kawaii SVG jika API AI mencapai batas kuota" },
        ],
      },
      {
        icon: "🐾",
        module: "Pilihan Hewan & Gaya Visual",
        features: [
          { name: "Koleksi Hewan Lengkap", desc: "Mendukung Panda, Kucing, Kelinci, Rubah, Katak, Axolotl, Burung Hantu, Hamster, Meerkat (batch 3 hewan)" },
          { name: "Preset Tema & Custom Prompt", desc: "Pilihan tema siap pakai (Tea Party, French Patisserie, Cosmic Wizard) & input tema kustom bebas" },
          { name: "Aesthetic Color Palette", desc: "Pilihan 5 palet warna estetis (Sakura Pink, Ocean Breeze, Matcha Mint, Lavender Dream, Sunset Peach)" },
        ],
      },
      {
        icon: "📂",
        module: "Manajemen Koleksi & Riwayat",
        features: [
          { name: "Sesi & Riwayat Penyimpanan", desc: "Setiap set stiker tersimpan otomatis di Local Storage browser untuk diakses kembali kapan saja" },
          { name: "Katalog Stiker Interaktif", desc: "Tampilan antarmuka katalog kartu dengan efek bayangan dan border die-cut putih khas stiker fisik" },
        ],
      },
      {
        icon: "💾",
        module: "Ekspor & Keamanan API Proxy",
        features: [
          { name: "Ekspor PNG, ZIP & Clipboard", desc: "Unduh stiker individu PNG transparan, batch download paket .ZIP, dan copy langsung ke clipboard" },
          { name: "Server-Side API Proxy & Anti-Limit", desc: "API key Gemini tersimpan aman di server backend Node.js/Express + retry delay otomatis" },
        ],
      },
    ],
  },
  {
    title: "Kokorof Reviewer CV v2",
    type: "Full Stack",
    category: "Full Stack",
    desc: "ATS Resume Scanner & AI Career Co-Pilot bertenaga AI untuk analisis CV kandidat.",
    longDesc:
      "Aplikasi web full-stack ATS Resume Scanner & AI Career Co-Pilot. Mampu menganalisis kesesuaian CV dengan kualifikasi pekerjaan, mendeteksi kata kunci ATS, memberikan saran perbaikan format, serta rekomendasi jalur belajar interaktif. (Link Utama: AI Studio, Link Alternatif: Vercel).",
    stack: ["Next.js", "TypeScript", "AI Engine", "Tailwind CSS", "Vercel"],
    demoUrl: "https://kokorof-reviewer-cv.ai.studio",
    screenshot: "/projects/screenshots/koko-reviewer-cv-v2-1.jpg",
    screenshots: [
      "/projects/screenshots/koko-reviewer-cv-v2-1.jpg",
      "/projects/screenshots/koko-reviewer-cv-v2-2.jpg",
      "/projects/screenshots/koko-reviewer-cv-v2-3.jpg",
    ],
    visuals: [
      { icon: "📄", gradient: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0369a1 100%)" },
      { icon: "🤖", gradient: "linear-gradient(135deg, #0284c7 0%, #0369a1 50%, #0f172a 100%)" },
      { icon: "✨", gradient: "linear-gradient(135deg, #0f172a 0%, #0284c7 50%, #1e293b 100%)" },
    ],
    featureModules: [
      {
        icon: "🔐",
        module: "Auth, Workspace & Multi-Language",
        features: [
          { name: "Sistem Otentikasi Multi-User", desc: "Login akun lokal & integrasi Google OAuth 2.0 dengan ruang kerja terisolasi" },
          { name: "Impor & Ekspor Workspace JSON", desc: "Backup & restore data CV, riwayat pindaian, & pelacak lamaran file JSON" },
          { name: "Dukungan Multi-Bahasa (ID & EN)", desc: "Sakelar instan Bahasa Indonesia & Inggris untuk UI & respon AI" },
        ],
      },
      {
        icon: "🤖",
        module: "AI ATS Scanner & Translation",
        features: [
          { name: "Multimodal ATS Scanner v2", desc: "Pemindaian PDF/DOCX base64 tingkat tinggi menggunakan Gemini 2.5 Flash" },
          { name: "CV Auto-Translation (ID ↔ EN)", desc: "Penerjemah otomatis seluruh isi CV ke bahasa target mempertahankan struktur" },
          { name: "Dual Score Indicators", desc: "Skor Keterbacaan ATS (0-100%) & Skor Kecocokan Kualifikasi (0-100%)" },
          { name: "Formatter & Layout Auditor", desc: "Deteksi otomatis masalah layout, tabel rumit & karakter pemisah" },
        ],
      },
      {
        icon: "💼",
        module: "Career Co-Pilot & Tools",
        features: [
          { name: "Job Roadmap & Salary Tracker", desc: "Pelacak lamaran kerja + kalkulator perbandingan gaji vs offering" },
          { name: "ATS Parsing Sandbox", desc: "Visualisasi penguraian teks mentah robot ATS (single vs multi-column)" },
          { name: "AI Cover Letter & STAR Prep", desc: "Generator surat lamaran & simulasi wawancara teknis STAR multi-bahasa" },
          { name: "LinkedIn Bio Strategist", desc: "Generator headline profesional, storytelling profil & skill endorsement" },
        ],
      },
    ],
  },
  {
    title: "Essensia Koffie App",
    type: "Full Stack",
    category: "Full Stack",
    desc: "Sistem aplikasi web manajemen pesanan & inventaris Essensia Koffie.",
    longDesc:
      "Aplikasi web Full-Stack untuk pengelolaan kedai kopi Essensia Koffie. Mencakup sistem autentikasi pengguna/kasir, antarmuka pemesanan menu interaktif, pelacakan pesanan, serta manajemen inventaris bahan dan transaksi.",
    stack: ["Node.js", "React", "Express", "Authentication", "Render"],
    demoUrl: "https://essensia-koffie.onrender.com/login",
    screenshot: "/projects/screenshots/essensia-koffie-1.jpg",
    screenshots: [
      "/projects/screenshots/essensia-koffie-1.jpg",
      "/projects/screenshots/essensia-koffie-2.jpg",
      "/projects/screenshots/essensia-koffie-3.jpg",
      "/projects/screenshots/essensia-koffie-4.jpg",
      "/projects/screenshots/essensia-koffie-5.jpg",
    ],
    featureModules: [
      {
        icon: "🛒",
        module: "Customer Ordering",
        features: [
          { name: "QR Code Table Order", desc: "Pemesanan via scan QR Code unik per meja (`/order/{token}`)" },
          { name: "Katalog & Filter Menu", desc: "Filter kategori, pencarian cepat, badge rekomendasi & stok" },
          { name: "Keranjang Belanja", desc: "Tambah/kurang item, hapus, proteksi stok habis" },
          { name: "Checkout & Metode Bayar", desc: "Dine-in/Takeaway, Tunai atau QRIS Midtrans" },
          { name: "Live Order Tracking", desc: "Pelacakan status pesanan real-time setelah checkout" },
        ],
      },
      {
        icon: "🖥️",
        module: "Kasir / POS",
        features: [
          { name: "Antarmuka POS Kasir", desc: "Layar cepat khusus kasir untuk pelanggan takeaway (/cashier)" },
          { name: "Pembayaran QRIS & Tunai", desc: "Integrasi gateway QRIS Midtrans + konfirmasi tunai" },
          { name: "Cetak Struk", desc: "Format cetak struk fisik/termal transaksi (/cashier/receipt)" },
        ],
      },
      {
        icon: "📋",
        module: "Manajemen Pesanan",
        features: [
          { name: "Tabel Pesanan Terpusat", desc: "Ringkasan seluruh pesanan meja & kasir + filter & paginasi" },
          { name: "Order Lifecycle Buttons", desc: "Tombol Proses, Sampai, Batal Proses, Batal, & Bayar" },
          { name: "Occupancy Auto-Reset", desc: "Otomatis ubah status meja occupied→available saat selesai" },
        ],
      },
      {
        icon: "🔔",
        module: "Notifikasi & Suara",
        features: [
          { name: "Voice Alert Bahasa Indonesia", desc: "Ucapan otomatis: \"Pesanan dari meja nomor X telah masuk\"" },
          { name: "Audio Chime (Ding-Dong)", desc: "Nada bel kafe via Web Audio API sebelum ucapan suara" },
          { name: "Polling 2s & Tab Wake-Up", desc: "Cek pesanan baru setiap 2 detik + pemicu saat tab dibuka" },
          { name: "Floating Toast Banner", desc: "Pop-up melayang dengan info meja, nama, total & tombol detail" },
          { name: "Sakelar Suara ON/OFF", desc: "Kontrol audio di Navbar Topbar Admin" },
        ],
      },
      {
        icon: "⚙️",
        module: "Pengaturan Operasional",
        features: [
          { name: "Real-time Clock & Timer", desc: "Jam digital & countdown tutup kafe di topbar" },
          { name: "Peringatan Otomatis", desc: "Pop-up ganti shift, kafe akan tutup, & batas order" },
          { name: "Pengaturan Kafe (/settings)", desc: "Atur jam buka/tutup, durasi shift, & menit peringatan" },
        ],
      },
      {
        icon: "📦",
        module: "Katalog & Data",
        features: [
          { name: "Manajemen Kategori", desc: "CRUD kategori + toggle aktif/non-aktif" },
          { name: "Manajemen Menu", desc: "CRUD menu, harga, deskripsi, foto, & toggle rekomendasi" },
          { name: "Manajemen Meja & QR", desc: "CRUD meja, generator token QR, download PNG/SVG, cetak massal" },
        ],
      },
      {
        icon: "📊",
        module: "Laporan & System",
        features: [
          { name: "Dashboard Analytics", desc: "Grafik tren penjualan, omzet harian/bulanan, status meja" },
          { name: "Ekspor CSV/Excel", desc: "Download laporan transaksi untuk pembukuan keuangan" },
          { name: "Auth & Security", desc: "Login Admin/Kasir, proteksi rute, CSRF, & HTTPS paksa" },
          { name: "Docker Production Ready", desc: "Dockerfile PHP 8.3 Apache + docker-entrypoint.sh otomatis" },
        ],
      },
    ],
    visuals: [
      { icon: "☕", gradient: "linear-gradient(135deg, #3b0764 0%, #581c87 50%, #7e22ce 100%)" },
      { icon: "🔐", gradient: "linear-gradient(135deg, #581c87 0%, #7e22ce 50%, #3b0764 100%)" },
      { icon: "📋", gradient: "linear-gradient(135deg, #7e22ce 0%, #3b0764 50%, #581c87 100%)" },
    ],
  },
  {
    title: "Kasir Cafe POS System",
    type: "Full Stack",
    category: "Full Stack",
    desc: "Sistem Kasir & Point of Sale (POS) Cafe interaktif berbasis web.",
    longDesc:
      "Aplikasi web Point of Sale (POS) interaktif untuk pengelolaan transaksi cafe dan restoran. Dilengkapi fitur manajemen menu, kalkulasi transaksi real-time, cetak struk digital, serta pencatatan stok dan laporan penjualan.",
    stack: ["React", "TypeScript", "POS Engine", "Tailwind CSS", "Vercel"],
    demoUrl: "https://kasir-cafe-iota.vercel.app/",
    screenshot: "/projects/screenshots/kasir-cafe.jpg",
    screenshots: [
      "/projects/screenshots/kasir-cafe.jpg",
      "/projects/screenshots/kasir-cafe-2.jpg",
      "/projects/screenshots/kasir-cafe-3.jpg",
      "/projects/screenshots/kasir-cafe-4.jpg",
    ],
    visuals: [
      { icon: "☕", gradient: "linear-gradient(135deg, #451a03 0%, #78350f 50%, #9a3412 100%)" },
      { icon: "🛒", gradient: "linear-gradient(135deg, #78350f 0%, #9a3412 50%, #451a03 100%)" },
      { icon: "💳", gradient: "linear-gradient(135deg, #9a3412 0%, #451a03 50%, #78350f 100%)" },
    ],
    featureModules: [
      {
        icon: "🖥️",
        module: "Point of Sale (POS) & Denah Meja",
        features: [
          { name: "Point of Sale (POS) Kasir", desc: "Transaksi cepat, kalkulasi diskon & pajak, cetak struk, Tunai / QRIS" },
          { name: "Denah Meja Visual (Interactive)", desc: "Tata letak meja drag & drop, status terisi/kosong/reservasi & order langsung" },
          { name: "Rekap Shift Kasir (Cash Reconciliation)", desc: "Buka/tutup shift kasir, pencatatan kas awal vs akhir & selisih kas" },
        ],
      },
      {
        icon: "🍳",
        module: "Dapur & Inventaris Bahan Baku",
        features: [
          { name: "Kitchen Display System (KDS)", desc: "Layar dapur real-time (Preparing, Ready, Served) & order timer" },
          { name: "Manajemen Menu & Stok Bahan", desc: "Pengelolaan HPP menu & pemotongan otomatis stok bahan saat terjual" },
        ],
      },
      {
        icon: "📊",
        module: "Analytics, AI Consult & Audit",
        features: [
          { name: "Konsultan Bisnis AI Gemini", desc: "Analisis omset, menu terlaris, bahan kritis & rekomendasi bundling promo" },
          { name: "Dashboard & Laporan Keuangan", desc: "Grafik omset harian/mingguan, statistik metode bayar & rekap audit" },
          { name: "Audit Trail & Offline Sync", desc: "Log histori aktivitas pengguna, mode offline & sinkronisasi Cloud SQL" },
        ],
      },
    ],
  },
  {
    title: "Monitoring Terpadu Dapil Jatim VII",
    type: "Full Stack",
    category: "Full Stack",
    desc: "Dashboard monitoring terpadu perolehan suara & kegiatan Senayan.",
    longDesc:
      "Dashboard analytics dan sistem pemantauan data terpadu untuk Daerah Pemilihan Jatim VII serta koordinasi kegiatan Senayan. Menyajikan visualisasi data real-time, peta persebaran lokasi program, grafik tren giat, dan rekapitulasi data aspirasi.",
    stack: ["Next.js", "React", "Data Analytics", "Interactive Map", "Vercel"],
    demoUrl: "https://dashboard-monitor-dapil-dan-giat-se.vercel.app/",
    screenshot: "/projects/screenshots/dapil-giat-senayan-1.jpg",
    screenshots: [
      "/projects/screenshots/dapil-giat-senayan-1.jpg",
      "/projects/screenshots/dapil-giat-senayan-2.jpg",
      "/projects/screenshots/dapil-giat-senayan-3.jpg",
      "/projects/screenshots/dapil-giat-senayan-4.jpg",
      "/projects/screenshots/dapil-giat-senayan-5.jpg",
    ],
    visuals: [
      { icon: "📊", gradient: "linear-gradient(135deg, #064e3b 0%, #047857 50%, #065f46 100%)" },
      { icon: "🏛️", gradient: "linear-gradient(135deg, #047857 0%, #065f46 50%, #064e3b 100%)" },
      { icon: "📈", gradient: "linear-gradient(135deg, #065f46 0%, #064e3b 50%, #047857 100%)" },
    ],
    featureModules: [
      {
        icon: "🗺️",
        module: "Modul Monitoring Dapil Jatim VII",
        features: [
          { name: "Overview & Peta Sebaran", desc: "KPI summary, peta sebaran polygon 5 kabupaten (Leaflet), filter komisi/tahun/lokasi & tabel detail" },
          { name: "Analytic Distribution", desc: "Visualisasi grafik statistik alokasi anggaran, status program, & distribusi kabupaten" },
          { name: "Daftar Program (Card Directory)", desc: "Direktori kartu seluruh program dapil dengan status, komisi, anggaran & tooltip" },
        ],
      },
      {
        icon: "🏛️",
        module: "Modul Giat Senayan & EBY Connect",
        features: [
          { name: "Overview Giat Senayan", desc: "Ringkasan eksekutif kegiatan nasional (MPR & DPR), grafik komparasi & tabel direktori" },
          { name: "Giat MPR RI & DPR RI", desc: "Filter khusus Sosialisasi 4 Pilar, Temu Tokoh, RDP, Kunker, Serapan Aspirasi & Bimtek" },
          { name: "EBY Connect", desc: "Monitoring 7.293 penerima manfaat (KIP-K, LPDP, Bus Mudik, Alsintan, Santri)" },
          { name: "Daftar Hadir Real-Time", desc: "Rekapitulasi 1.895+ presensi digital peserta terhubung Firebase Firestore cloud" },
        ],
      },
      {
        icon: "🛡️",
        module: "Hak Akses (Role Management)",
        features: [
          { name: "Akses Admin", desc: "Akses penuh: Tambah/Edit/Hapus program, Master Data, Upload Excel, QR Generator, Ekspor" },
          { name: "Akses Pimpinan", desc: "View dashboard, filter, QR generator, & ekspor data (tanpa tombol edit/hapus/upload)" },
          { name: "Akses Publik", desc: "Mode ringkasan publik, pencarian, & filter data" },
        ],
      },
      {
        icon: "🛠️",
        module: "Otomatisasi, Modals & Ekspor/Impor",
        features: [
          { name: "Custom Tooltip Viewport", desc: "Teks melayang utuh saat hover, otomatis membalik posisi di tepi layar" },
          { name: "Generator Link & QR Presensi", desc: "Generate QR & link presensi otomatis + Live Search Bar 1.895 kegiatan (`qrcode` engine)" },
          { name: "Database & Cloud Sync", desc: "Firebase Firestore Cloud DB + Auto-Sync Google Spreadsheet API eksternal" },
          { name: "Ekspor & Cetak Laporan", desc: "Unduh Excel (`.xlsx`) & cetak PDF ber-kop resmi (`jspdf` & `jspdf-autotable`)" },
          { name: "Impor Massal & Keamanan Sesi", desc: "Impor file Excel data baru + Proteksi timeout sesi 30 menit otomatis" },
        ],
      },
    ],
  },
  {
    title: "Portal Monitoring Dapil Jatim",
    type: "Full Stack",
    category: "Full Stack",
    desc: "Portal geo-intelligence & monitoring aspirasi Dapil Jawa Timur.",
    longDesc:
      "Sistem portal monitoring berbasis geo-intelligence untuk agregasi data aspirasi masyarakat, presensi digital kegiatan Senayan, sinkronisasi otomatis Google Sheets API (cron 15 menit), generator link & QR absen, serta overlay demografis peta Jawa Timur.",
    stack: ["Next.js", "TypeScript", "Google Sheets API", "Geo-Intelligence", "Vercel"],
    demoUrl: "https://portal-monitoring-dapil-jatim.vercel.app/",
    screenshot: "/projects/screenshots/portal-dapil-jatim-1.jpg",
    screenshots: [
      "/projects/screenshots/portal-dapil-jatim-1.jpg",
      "/projects/screenshots/portal-dapil-jatim-2.jpg",
      "/projects/screenshots/portal-dapil-jatim-3.jpg",
      "/projects/screenshots/portal-dapil-jatim-4.jpg",
    ],
    visuals: [
      { icon: "🗺️", gradient: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0369a1 100%)" },
      { icon: "⚡", gradient: "linear-gradient(135deg, #0284c7 0%, #0369a1 50%, #0f172a 100%)" },
      { icon: "📱", gradient: "linear-gradient(135deg, #0f172a 0%, #0284c7 50%, #1e293b 100%)" },
    ],
  },
  {
    title: "Sistem Informasi Program Aspirasi",
    type: "Full Stack",
    category: "Full Stack",
    desc: "Sistem informasi pemantauan program bantuan & aspirasi Dapil Jatim VII.",
    longDesc:
      "Aplikasi web manajemen & pemantauan program bantuan aspirasi masyarakat (Pacitan, Ponorogo, Trenggalek, Magetan, Ngawi). Dilengkapi autentikasi multi-role (Admin/Pimpinan), pemetaan titik koordinat program, analisis statistik, serta filter komisi.",
    stack: ["Next.js", "TypeScript", "Analytics", "Leaflet Map", "Vercel"],
    demoUrl: "https://dashboard-monitoring-program-dapil.vercel.app/",
    screenshot: "/projects/screenshots/monitoring-program-dapil-1.jpg",
    screenshots: [
      "/projects/screenshots/monitoring-program-dapil-1.jpg",
      "/projects/screenshots/monitoring-program-dapil-2.jpg",
      "/projects/screenshots/monitoring-program-dapil-3.jpg",
      "/projects/screenshots/monitoring-program-dapil-4.jpg",
    ],
    visuals: [
      { icon: "🏛️", gradient: "linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 50%, #2563eb 100%)" },
      { icon: "📍", gradient: "linear-gradient(135deg, #1d4ed8 0%, #2563eb 50%, #1e3a8a 100%)" },
      { icon: "📈", gradient: "linear-gradient(135deg, #2563eb 0%, #1e3a8a 50%, #1d4ed8 100%)" },
    ],
  },
  {
    title: "Monitoring Giat Nasional Senayan",
    type: "Full Stack",
    category: "Full Stack",
    desc: "Dashboard monitoring nasional pemantauan kegiatan anggota Senayan.",
    longDesc:
      "Sistem dashboard monitoring nasional skala besar untuk tracking laporan dan presensi digital kegiatan Senayan. Dilengkapi generator QR/Link presensi otomatis ke Firestore & Google Sheets, audit presensi konstituen, dan filter kategori kegiatan.",
    stack: ["Next.js", "TypeScript", "Firebase Firestore", "Google Sheets", "Vercel"],
    demoUrl: "https://dashboard-monitoring-giat-nasional.vercel.app/",
    screenshot: "/projects/screenshots/monitoring-giat-nasional-1.jpg",
    screenshots: [
      "/projects/screenshots/monitoring-giat-nasional-1.jpg",
      "/projects/screenshots/monitoring-giat-nasional-2.jpg",
      "/projects/screenshots/monitoring-giat-nasional-3.jpg",
      "/projects/screenshots/monitoring-giat-nasional-4.jpg",
    ],
    visuals: [
      { icon: "🇮🇩", gradient: "linear-gradient(135deg, #7f1d1d 0%, #991b1b 50%, #b91c1c 100%)" },
      { icon: "📋", gradient: "linear-gradient(135deg, #991b1b 0%, #b91c1c 50%, #7f1d1d 100%)" },
      { icon: "📡", gradient: "linear-gradient(135deg, #b91c1c 0%, #7f1d1d 50%, #991b1b 100%)" },
    ],
  },
  {
    title: "Esthetico Derma Institute Security",
    type: "Network Security",
    category: "Network Security",
    desc: "Testing keamanan web & perbaikan kerentanan platform medis estetika.",
    longDesc:
      "Pengujian keamanan web (Web Penetration Testing & Vulnerability Assessment) serta perbaikan kerentanan sistem pada platform Esthetico Derma Institute — institusi pelatihan kedokteran estetika terakreditasi Kemenkes RI & CIBTAC UK. Menjamin perlindungan data alumni, pendaftaran masterclass, dan katalog kursus medis.",
    stack: ["Web Security", "Penetration Testing", "Vulnerability Patching", "OWASP", "Security Audit"],
    demoUrl: "https://estheticodermainstitute.outlookuniverse.space/",
    screenshot: "/projects/screenshots/esthetico-derma-1.jpg",
    screenshots: [
      "/projects/screenshots/esthetico-derma-1.jpg",
      "/projects/screenshots/esthetico-derma-2.jpg",
      "/projects/screenshots/esthetico-derma-3.jpg",
      "/projects/screenshots/esthetico-derma-4.jpg",
      "/projects/screenshots/esthetico-derma-5.jpg",
    ],
    visuals: [
      { icon: "🛡️", gradient: "linear-gradient(135deg, #881337 0%, #9f1239 50%, #be123c 100%)" },
      { icon: "🔒", gradient: "linear-gradient(135deg, #9f1239 0%, #be123c 50%, #881337 100%)" },
      { icon: "⚕️", gradient: "linear-gradient(135deg, #be123c 0%, #881337 50%, #9f1239 100%)" },
    ],
  },
  {
    title: "Kokorof Reviewer CV v1",
    type: "Full Stack",
    category: "Full Stack",
    desc: "ATS Resume Scanner & AI Career Co-Pilot generasi pertama.",
    longDesc:
      "Aplikasi web versi awal dari Kokorof Reviewer CV. Membantu pelamar kerja menguji skor ATS resume mereka, memverifikasi ketersediaan elemen kunci CV, serta memberikan rekomendasi perbaikan sebelum melamar kerja.",
    stack: ["React", "JavaScript", "ATS Evaluator", "Vercel"],
    demoUrl: "https://reviewer-cv-v1.vercel.app/",
    screenshot: "/projects/screenshots/reviewer-cv-v1.jpg",
    visuals: [
      { icon: "📋", gradient: "linear-gradient(135deg, #312e81 0%, #3730a3 50%, #4338ca 100%)" },
      { icon: "🔍", gradient: "linear-gradient(135deg, #3730a3 0%, #4338ca 50%, #312e81 100%)" },
      { icon: "💡", gradient: "linear-gradient(135deg, #4338ca 0%, #312e81 50%, #3730a3 100%)" },
    ],
    featureModules: [
      {
        icon: "📋",
        module: "ATS Scanner & Evaluator",
        features: [
          { name: "ATS Resume Scanner", desc: "Pindai dokumen PDF, DOCX, atau teks mentah terhadap Job Description target" },
          { name: "Dual Score Indicators", desc: "Skor Keterbacaan ATS (0-100%) dan Skor Kecocokan Kualifikasi (0-100%)" },
          { name: "Formatter & Layout Auditor", desc: "Deteksi otomatis tabel rumit, karakter pemisah & struktur header" },
          { name: "Skill Gap & Learning Path", desc: "Rekomendasi kata kunci yang hilang & panduan belajar mengisi kesenjangan" },
        ],
      },
      {
        icon: "✍️",
        module: "Live Editor & AI Career Tools",
        features: [
          { name: "Live CV Editor & PDF", desc: "Editor teks interaktif real-time dengan tombol download PDF standar ATS" },
          { name: "AI Cover Letter Builder", desc: "Menghasilkan surat lamaran kustom Markdown dengan poin keunggulan" },
          { name: "AI Mock Interview STAR", desc: "5–7 pertanyaan wawancara teknis & perilaku dengan metode STAR" },
          { name: "LinkedIn Optimizer", desc: "3 opsi headline, ringkasan About storytelling & kalimat pengalaman" },
          { name: "Job Application Tracker", desc: "Pelacak status lamaran (Interested, Applied, Interview, Offered, Rejected)" },
          { name: "ATS Parsing Sandbox", desc: "Tampilan teks mentah hasil ekstraksi mesin ATS untuk verifikasi layout" },
        ],
      },
    ],
  },
  {
    title: "Tes Modul & UI Component Showcase",
    type: "Web Dev",
    category: "Web Dev",
    desc: "Showcase pengujian modul UI interaktif dan eksplorasi komponen web.",
    longDesc:
      "Environment laboratorium pengujian untuk eksperimen komponen UI modular, pengujian integrasi widget, serta pengujian logika antarmuka sebelum diimplementasikan pada aplikasi skala besar.",
    stack: ["React", "JavaScript", "Modular UI", "Vercel"],
    demoUrl: "https://tes-modul-aja.vercel.app/",
    screenshot: "/projects/screenshots/tes-modul.jpg",
    visuals: [
      { icon: "🧩", gradient: "linear-gradient(135deg, #581c87 0%, #6b21a8 50%, #7e22ce 100%)" },
      { icon: "⚡", gradient: "linear-gradient(135deg, #6b21a8 0%, #7e22ce 50%, #581c87 100%)" },
      { icon: "🛠️", gradient: "linear-gradient(135deg, #7e22ce 0%, #581c87 50%, #6b21a8 100%)" },
    ],
  },

  // ═══ EXISTING FEATURED PROJECTS ═══
  {
    title: "Ecoliteration — Hydrological Cycle App",
    type: "Full Stack",
    category: "Full Stack",
    desc: "Aplikasi web pembelajaran ekoliterasi & pemahaman spiritual siklus hidrologi.",
    longDesc:
      "Aplikasi web e-modul ECOLITERATION untuk pembelajaran pemahaman spiritual siklus hidrologi terintegrasi ayat Al-Qur'an (Tahun 2024). Bertujuan menyadarkan pentingnya konservasi air dan penerapannya dalam kehidupan sehari-hari. Dibangun menggunakan Vue.js, arsitektur REST API, dan pengelolaan data tidak terstruktur (unstructured data).",
    stack: ["Vue.js", "JavaScript", "REST API", "Full Stack", "Problem Solving"],
    screenshot: "/projects/screenshots/ecoliteration-1.jpg",
    screenshots: [

      "/projects/screenshots/ecoliteration-3.jpg",
      "/projects/screenshots/ecoliteration-1.jpg",
      "/projects/screenshots/ecoliteration-2.jpg",
      "/projects/screenshots/ecoliteration-4.jpg",
    ],
    visuals: [
      { icon: "💧", gradient: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0d4f72 100%)" },
      { icon: "📖", gradient: "linear-gradient(135deg, #020617 0%, #0f172a 50%, #1e3a5f 100%)" },
      { icon: "🌱", gradient: "linear-gradient(135deg, #1e3a5f 0%, #0d4f72 50%, #0f172a 100%)" },
    ],
    featureModules: [
      {
        icon: "💧",
        module: "Ekoliterasi & Pemahaman Spiritual",
        features: [
          { name: "E-Modul Siklus Hidrologi", desc: "Pembelajaran ilmiah siklus air terintegrasi dengan pemahaman spiritual & ayat Al-Qur'an" },
          { name: "Konservasi & Kepedulian Air", desc: "Penanaman kesadaran konservasi air dan penerapan sikap peduli lingkungan sehari-hari" },
        ],
      },
      {
        icon: "⚙️",
        module: "Arsitektur REST API & Data",
        features: [
          { name: "Integrasi RESTful API", desc: "Implementasi REST API untuk pertukaran data asynchronous yang cepat berbasis Vue.js" },
          { name: "Unstructured Data Management", desc: "Pengelolaan data materi tidak terstruktur, media video, artikel fenomena & modul interaktif" },
        ],
      },
      {
        icon: "📊",
        module: "Portal Admin & Rekap Evaluasi",
        features: [
          { name: "Halaman Administrator", desc: "Direktori data pengguna/siswa dari MAN 1, SMA, dan USK lengkap dengan tabel pencarian" },
          { name: "Tracking Pretest & Posttest", desc: "Pelacakan status penyelesaian ujian pretest & posttest peserta secara real-time" },
        ],
      },
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
      { icon: "🚨", gradient: "linear-gradient(135deg, #16213e 0%, #0f3460 50%, #1a1a2e 100%)" },
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
      { icon: "🔐", gradient: "linear-gradient(135deg, #1a1a3e 0%, #1a0a2e 50%, #2d1b4e 100%)" },
    ],
  },
  {
    title: "Naufal Angkasah — Portfolio",
    type: "Web Dev",
    category: "Web Dev",
    desc: "Website portfolio personal berdesain premium dengan tema deep ocean & glassmorphism.",
    longDesc:
      "Website portfolio pribadi yang dibangun dengan Next.js 16 & TypeScript. Menampilkan karya nyata di bidang Full Stack Web Development, Network Security, dan Systems Engineering. Dilengkapi animasi 3D Orb interaktif, custom cursor gurita, efek glassmorphism & claymorphism, section sertifikasi dengan lightbox PDF, featured projects dengan screenshot asli, dan dark mode premium yang fully responsive.",
    stack: ["Next.js", "TypeScript", "Framer Motion", "Tailwind CSS", "Vercel"],
    demoUrl: "https://portfolio-naufal-angkasah.vercel.app/",
    screenshot: "/projects/screenshots/portfolio-naufal.jpg",
    visuals: [
      { icon: "🌊", gradient: "linear-gradient(135deg, #031226 0%, #08284d 50%, #0c4a6e 100%)" },
      { icon: "🐙", gradient: "linear-gradient(135deg, #08284d 0%, #0c4a6e 50%, #031226 100%)" },
      { icon: "✨", gradient: "linear-gradient(135deg, #0c4a6e 0%, #031226 50%, #08284d 100%)" },
    ],
  },
  {
    title: "Coding Education Module",
    type: "Education",
    category: "Education",
    desc: "Kurikulum mengajar 280+ siswa tentang web development dan deployment.",
    longDesc:
      "Merancang dan menyampaikan kurikulum pengajaran coding kepada 280+ siswa di MAN 1 Banda Aceh. Materi mencakup web development flow, penggunaan repository (Git/GitHub), front-end development (HTML, CSS, JavaScript), back-end development, database management, dan proses deployment. Pendekatan hands-on dengan proyek nyata.",
    stack: ["Teaching", "Web Dev", "Curriculum Design", "Git", "Deployment"],
    demoUrl: "https://docs.google.com/document/d/1dZhV8GB3I2ND9uEE85hBc8B-G67IB5gSQmYzOE74VxA/edit?usp=sharing",
    screenshot: "/projects/edu-module-1.jpg",
    screenshots: [
      "/projects/edu-module-1.jpg",
      "/projects/edu-module-3.jpg",
    ],
    visuals: [
      { icon: "📚", gradient: "linear-gradient(135deg, #1a2332 0%, #2d3748 50%, #1a365d 100%)" },
      { icon: "👨‍🏫", gradient: "linear-gradient(135deg, #2d3748 0%, #1a365d 50%, #1a2332 100%)" },
      { icon: "🎓", gradient: "linear-gradient(135deg, #1a365d 0%, #1a2332 50%, #2d3748 100%)" },
    ],
  },
];

const categories = ["All", "Full Stack", "Web Dev", "Network Security", "Education"];

// ════ Project Card Component with Hover-Paused 3s Auto-Slideshow ════
function ProjectCard({
  project,
  index,
  openModal,
}: {
  project: Project;
  index: number;
  openModal: () => void;
}) {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Resolve array of images (or fallback to visuals)
  const images =
    project.screenshots && project.screenshots.length > 0
      ? project.screenshots
      : project.screenshot
        ? [project.screenshot]
        : null;

  const totalSlides = images ? images.length : project.visuals.length;

  useEffect(() => {
    if (totalSlides <= 1 || isHovered) return;

    const interval = setInterval(() => {
      setCurrentImgIndex((prev) => (prev + 1) % totalSlides);
    }, 3000);

    return () => clearInterval(interval);
  }, [totalSlides, isHovered]);

  const activeIdx = currentImgIndex % totalSlides;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: -10 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      className="portfolio-card group cursor-pointer"
      onClick={openModal}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Area with Auto-Slide */}
      <div className="portfolio-card-image relative overflow-hidden">
        {images ? (
          <div
            className="portfolio-card-image-bg relative h-full w-full"
            style={{ background: project.visuals[0].gradient, padding: 0 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIdx}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 h-full w-full"
              >
                <Image
                  src={images[activeIdx]}
                  alt={`${project.title} — Slide ${activeIdx + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain p-1.5 transition-transform duration-500 group-hover:scale-105"
                />
              </motion.div>
            </AnimatePresence>

            {/* Gallery Indicator Dots */}
            {images.length > 1 && (
              <div className="absolute bottom-2.5 left-1/2 z-10 flex -translate-x-1/2 gap-1.5 rounded-full bg-black/50 px-2.5 py-1 backdrop-blur-md">
                {images.map((_, dotIdx) => (
                  <div
                    key={dotIdx}
                    className={`h-1.5 rounded-full transition-all duration-300 ${dotIdx === activeIdx
                      ? "w-4 bg-cyan-400"
                      : "w-1.5 bg-white/40"
                      }`}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div
            className="portfolio-card-image-bg transition-colors duration-500"
            style={{
              background:
                project.visuals[activeIdx % project.visuals.length].gradient,
            }}
          >
            <span>{project.visuals[activeIdx % project.visuals.length].icon}</span>
          </div>
        )}

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
          {project.demoUrl ? (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="live-demo-bubble"
              onClick={(e) => e.stopPropagation()}
            >
              <span>Live Demo</span>
              <ExternalLink size={13} />
            </a>
          ) : (
            <ExternalLink className="text-cyan-200/50" size={16} />
          )}
        </div>
        <h3 className="text-xl font-black text-white">{project.title}</h3>
        <p className="mt-3 min-h-14 text-sm leading-7 text-sky-100/68">
          {project.desc}
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {project.stack.slice(0, 3).map((item) => (
            <span
              key={item}
              className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold text-cyan-100"
            >
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
  );
}

export default function FeaturedProjects() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showAll, setShowAll] = useState(false);

  // Count projects per category
  const projectCounts: Record<string, number> = {
    All: projects.length,
    ...Object.fromEntries(
      categories.slice(1).map((cat) => [
        cat,
        projects.filter((p) => p.category === cat).length,
      ])
    ),
  };

  const filtered =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  const visibleProjects = showAll ? filtered : filtered.slice(0, 6);
  const hiddenCount = filtered.length - 6;

  const openModal = useCallback(
    (project: Project) => {
      const globalIndex = projects.indexOf(project);
      setSelectedIndex(globalIndex);
      setActiveImageIndex(0);
    },
    []
  );

  const closeModal = useCallback(() => {
    setSelectedIndex(null);
    setActiveImageIndex(0);
  }, []);

  const selected = selectedIndex !== null ? projects[selectedIndex] : null;

  const goNextImage = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      if (selected) {
        const len = selected.screenshots
          ? selected.screenshots.length
          : selected.screenshot
            ? 1
            : selected.visuals.length;
        setActiveImageIndex((prev) => (prev + 1) % len);
      }
    },
    [selected]
  );

  const goPrevImage = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      if (selected) {
        const len = selected.screenshots
          ? selected.screenshots.length
          : selected.screenshot
            ? 1
            : selected.visuals.length;
        setActiveImageIndex((prev) => (prev - 1 + len) % len);
      }
    },
    [selected]
  );

  // Autoplay functionality for images within modal
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
          <p className="text-sm font-black uppercase tracking-[0.35em] text-cyan-200">
            Portfolio
          </p>
          <h2 className="mt-3 text-4xl font-black text-white md:text-5xl">
            Featured Projects
          </h2>
        </div>
        <p className="max-w-lg text-sm leading-7 text-sky-100/70">
          Koleksi proyek nyata di bidang Full Stack Web Development, Network Security, dan Systems Engineering.
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
            <span className={`portfolio-filter-count ${activeFilter === cat ? "active" : ""}`}>
              {projectCounts[cat]}
            </span>
          </button>
        ))}
      </div>

      {/* Project Grid */}
      <motion.div layout className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visibleProjects.map((project, i) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={i}
              openModal={() => openModal(project)}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Show More / Show Less Button */}
      {filtered.length > 6 && (
        <div className="mt-10 flex justify-center">
          <button
            onClick={() => setShowAll((v) => !v)}
            className="experience-show-more-btn"
          >
            {showAll ? (
              <>
                <ChevronUp size={18} /> Tampilkan Lebih Sedikit
              </>
            ) : (
              <>
                <ChevronDown size={18} /> Lihat {hiddenCount} lainnya
              </>
            )}
          </button>
        </div>
      )}

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
              {(() => {
                // Resolve image list: screenshots[] > single screenshot > emoji visuals
                const gallery = selected.screenshots
                  ? selected.screenshots
                  : selected.screenshot
                    ? [selected.screenshot]
                    : null;
                const galleryLen = gallery ? gallery.length : selected.visuals.length;
                const safeClamped = Math.min(activeImageIndex, galleryLen - 1);

                return (
                  <div
                    className="portfolio-modal-image overflow-hidden"
                    style={{
                      background: selected.visuals[
                        Math.min(safeClamped, selected.visuals.length - 1)
                      ].gradient,
                      transition: "background 0.5s ease",
                    }}
                  >
                    {gallery ? (
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={safeClamped}
                          initial={{ opacity: 0, x: 40 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -40 }}
                          transition={{ duration: 0.3 }}
                          className="absolute inset-0"
                        >
                          <Image
                            src={gallery[safeClamped]}
                            alt={`${selected.title} – image ${safeClamped + 1}`}
                            fill
                            sizes="100vw"
                            className="object-contain p-2.5"
                            priority
                          />
                        </motion.div>
                      </AnimatePresence>
                    ) : (
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={safeClamped}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 1.2 }}
                          transition={{ duration: 0.3 }}
                          className="absolute"
                        >
                          {selected.visuals[safeClamped].icon}
                        </motion.span>
                      </AnimatePresence>
                    )}

                    {/* Close */}
                    <button
                      onClick={closeModal}
                      className="portfolio-modal-close"
                      aria-label="Close"
                    >
                      <X size={20} />
                    </button>

                    {/* Prev / Next — only show if gallery has >1 image */}
                    {galleryLen > 1 && (
                      <>
                        <button
                          onClick={goPrevImage}
                          className="portfolio-modal-nav prev"
                          aria-label="Previous image"
                        >
                          <ChevronLeft size={22} />
                        </button>
                        <button
                          onClick={goNextImage}
                          className="portfolio-modal-nav next"
                          aria-label="Next image"
                        >
                          <ChevronRight size={22} />
                        </button>
                      </>
                    )}

                    {/* Image Dots */}
                    {galleryLen > 1 && (
                      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
                        {Array.from({ length: galleryLen }).map((_, i) => (
                          <div
                            key={i}
                            onClick={() => setActiveImageIndex(i)}
                            className={`h-2 cursor-pointer rounded-full transition-all duration-300 ${i === safeClamped ? "bg-white w-6" : "bg-white/30 w-2"
                              }`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                );
              })()}

              {/* Modal Content */}
              <div className="portfolio-modal-content">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="portfolio-card-category">{selected.type}</span>
                    <span className="text-xs text-sky-100/40">
                      Visual {activeImageIndex + 1} / {selected.visuals.length}
                    </span>
                  </div>
                  {selected.demoUrl && (
                    <a
                      href={selected.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full bg-cyan-500/20 px-3.5 py-1.5 text-xs font-bold text-cyan-200 transition hover:bg-cyan-500/30"
                    >
                      <Globe size={14} />
                      <span>Kunjungi Website</span>
                      <ExternalLink size={12} />
                    </a>
                  )}
                </div>

                <h3 className="text-3xl font-black text-white">{selected.title}</h3>
                <p className="mt-5 leading-8 text-sky-100/72">{selected.longDesc}</p>

                {/* Tech Stack */}
                <div className="mt-8">
                  <p className="mb-3 text-xs font-black uppercase tracking-[0.28em] text-cyan-200/70">
                    Tech Stack
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selected.stack.map((item) => (
                      <span
                        key={item}
                        className="rounded-full bg-white/10 px-4 py-2 text-sm font-bold text-cyan-100"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action button if demoUrl exists */}
                {selected.demoUrl && (
                  <div className="mt-8 flex justify-start">
                    <a
                      href={selected.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-sky-600 px-6 py-3 text-sm font-black text-white shadow-lg transition hover:scale-[1.02]"
                    >
                      <Globe size={16} />
                      <span>Buka Live Demo Application</span>
                      <ExternalLink size={14} />
                    </a>
                  </div>
                )}

                {/* Feature Modules Accordion */}
                {selected.featureModules && selected.featureModules.length > 0 && (
                  <div className="mt-8">
                    <p className="mb-4 text-xs font-black uppercase tracking-[0.28em] text-cyan-200/70">
                      Fitur Lengkap
                    </p>
                    <div className="flex flex-col gap-3">
                      {selected.featureModules.map((mod) => (
                        <details
                          key={mod.module}
                          className="group rounded-xl border border-white/10 bg-white/5 px-4 py-3 transition hover:border-cyan-400/30"
                        >
                          <summary className="flex cursor-pointer list-none items-center justify-between gap-3">
                            <span className="flex items-center gap-2 text-sm font-black text-white">
                              <span>{mod.icon}</span>
                              <span>{mod.module}</span>
                              <span className="rounded-full bg-cyan-500/20 px-2 py-0.5 text-[10px] font-bold text-cyan-300">
                                {mod.features.length} fitur
                              </span>
                            </span>
                            <span className="text-xs text-sky-100/40 transition-transform duration-200 group-open:rotate-180">
                              ▼
                            </span>
                          </summary>
                          <ul className="mt-3 flex flex-col gap-2 border-t border-white/10 pt-3">
                            {mod.features.map((f) => (
                              <li key={f.name} className="flex gap-2 text-xs">
                                <span className="mt-0.5 flex-shrink-0 text-cyan-400">✓</span>
                                <span>
                                  <span className="font-bold text-sky-100">{f.name}</span>
                                  {" — "}
                                  <span className="text-sky-100/60">{f.desc}</span>
                                </span>
                              </li>
                            ))}
                          </ul>
                        </details>
                      ))}
                    </div>
                  </div>
                )}

                {/* Navigation hint */}
                <p className="mt-8 text-center text-xs text-sky-100/40">
                  Gunakan tombol ← → untuk melihat visual lain, atau klik area gelap untuk menutup.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

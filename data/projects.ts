// Centralized Projects Data
export type ProjectVisual = {
  icon: string;
  gradient: string;
};

export type FeatureModule = {
  icon: string;
  module: string;
  features: { name: string; desc: string }[];
};

export type Project = {
  slug: string;
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

export const categories = ["All", "Full Stack", "Web Dev", "Network Security", "Education"];

export const projects: Project[] = [
  // ═══ FULL STACK & WEB DEV PROJECTS WITH SCREENSHOT GALLERIES ═══
  {
    slug: "grand-tamansari-wimala-land",
    title: "Grand Tamansari (Wimala-Land)",
    type: "Full Stack",
    category: "Full Stack",
    desc: "Sistem informasi pengelolaan kawasan perumahan, portal warga & siteplan digital interaktif.",
    longDesc:
      "Aplikasi web full-stack Sistem Pengelolaan Kawasan Perumahan Grand Tamansari (Wimala-Land) yang dibangun dengan Next.js 15.5 App Router, React 19, TypeScript, dan Tailwind CSS v4. Dilengkapi peta siteplan digital interaktif 65 kavling dengan color-coded pin status, portal warga (tagihan IPL, tagihan air meteran m³, upload bukti transfer, kuitansi digital, pengumuman & pengaduan), serta dashboard pengelola super admin (verifikasi bayar, rekapitulasi per cluster, chart Recharts, ekspor Excel .xlsx, dan log audit).",
    stack: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS v4", "Supabase PostgreSQL", "Recharts", "SheetJS (Excel)", "Vercel"],
    demoUrl: "https://wimala-land.vercel.app/",
    screenshot: "/projects/screenshots/wimala-land-1.png",
    screenshots: [
      "/projects/screenshots/wimala-land-1.png",
      "/projects/screenshots/wimala-land-2.png",
      "/projects/screenshots/wimala-land-3.png",
      "/projects/screenshots/wimala-land-4.png",
      "/projects/screenshots/wimala-land-5.png",
    ],
    visuals: [
      { icon: "🏡", gradient: "linear-gradient(135deg, #1e3a8a 0%, #2067A1 50%, #1F7D4E 100%)" },
      { icon: "🗺️", gradient: "linear-gradient(135deg, #2067A1 0%, #1F7D4E 50%, #047857 100%)" },
      { icon: "📊", gradient: "linear-gradient(135deg, #1F7D4E 0%, #1e3a8a 50%, #2067A1 100%)" },
    ],
    featureModules: [
      {
        icon: "🗺️",
        module: "Peta Siteplan Digital Interaktif & Kavling",
        features: [
          { name: "Peta Kawasan Visual 65 Kavling", desc: "Denah klaster interaktif (Kamala, Lily, Bougenvile) dengan pin indikator warna status unit (Lunas, Belum Lunas, Verifikasi, Booking)" },
          { name: "Modal Tooltip Detail & Editor Titik", desc: "Klik pin untuk info luas tanah/bangunan, penghuni & tagihan, serta editor koordinat marker visual untuk admin" },
        ],
      },
      {
        icon: "🔐",
        module: "Autentikasi Multi-Role & Akun Demo Instan",
        features: [
          { name: "Multi-Layer Role-Based Auth", desc: "Pemisahan hak akses Super Admin (Pengelola) & Warga (Penghuni) via secure HTTP-only cookies (gt_session)" },
          { name: "Box Akun Demo 1-Click Auto-Fill", desc: "Panel akun uji coba responsif dengan tombol instan 'Gunakan Akun Ini' + fitur copy kredensial cepat" },
          { name: "Dark Mode & Lupa Password", desc: "Theme toggle Dark/Light terintegrasi penuh + reset password mandiri via email maupun reset manual oleh admin" },
        ],
      },
      {
        icon: "🏠",
        module: "Portal Warga (Resident Portal)",
        features: [
          { name: "Dashboard Unit & Tagihan IPL", desc: "Ringkasan data unit kavling, rincian biaya pemeliharaan lingkungan/kebersihan/keamanan, status & jatuh tempo" },
          { name: "Tagihan Air Bersih (Meteran m³)", desc: "Pencatatan angka meter awal & akhir, total pemakaian air m³, serta kalkulasi biaya otomatis" },
          { name: "Upload Bukti Transfer & Kuitansi", desc: "Form kirim bukti bayar rekening bank pengelola + simulator payment gateway & download kuitansi digital" },
          { name: "Lonceng Notifikasi & Pengaduan Warga", desc: "Popover baca pengumuman resmi tanpa reload + form kirim pesan pengaduan fasilitas dengan pelacakan status" },
        ],
      },
      {
        icon: "📊",
        module: "Portal Pengelola (Executive Admin Dashboard)",
        features: [
          { name: "Executive Dashboard & Rekap Cluster", desc: "Metrik 65 unit kavling, persentase penagihan, total kas masuk Rp 14.300.000, & rekapitulasi status per cluster" },
          { name: "Verifikasi Pembayaran & Approval", desc: "Antrean verifikasi transaksi masuk, modal periksa screenshot bukti transfer, tombol Setujui/Tolak real-time" },
          { name: "Laporan Keuangan & Ekspor Excel", desc: "Grafik tren keuangan dengan Recharts + tombol ekspor rekapitulasi laporan kas ke file Microsoft Excel (.xlsx)" },
          { name: "Broadcast Pengumuman & Audit Trail", desc: "Publikasi pengumuman baru ke lonceng warga, manajemen data penghuni, reset password, & log riwayat aktivitas" },
        ],
      },
    ],
  },
  {
    slug: "roti-manis-bahagia",
    title: "Roti Manis Bahagia",
    type: "Full Stack",
    category: "Full Stack",
    desc: "Website toko roti artisan modern dengan pemesanan instan WhatsApp & Custom Cake Builder.",
    longDesc:
      "Website e-commerce & katalog toko roti modern 'Roti Manis Bahagia' (Artisan Bakery & Pastry) yang dibangun dengan Svelte 5 (Runes) dan SvelteKit 2. Dilengkapi sistem pemesanan otomatis via WhatsApp (One-Click Order), formulir kustom kue (Custom Cake Builder) dengan live order preview, pencarian & filter reaktif, integrasi Google Maps, jam buka toko real-time, serta antarmuka elegan berkinerja tinggi (0 error, 0 warning).",
    stack: ["Svelte 5 (Runes)", "SvelteKit 2", "TypeScript", "Tailwind CSS v4", "Vite 8", "WhatsApp API", "Vercel"],
    demoUrl: "https://tokoroti-rho.vercel.app/",
    screenshot: "/projects/screenshots/roti-manis-1.png",
    screenshots: [
      "/projects/screenshots/roti-manis-1.png",
      "/projects/screenshots/roti-manis-2.png",
      "/projects/screenshots/roti-manis-3.png",
      "/projects/screenshots/roti-manis-4.png",
      "/projects/screenshots/roti-manis-5.png",
    ],
    visuals: [
      { icon: "🍞", gradient: "linear-gradient(135deg, #451a03 0%, #78350f 50%, #b45309 100%)" },
      { icon: "🎂", gradient: "linear-gradient(135deg, #78350f 0%, #b45309 50%, #f59e0b 100%)" },
      { icon: "🥐", gradient: "linear-gradient(135deg, #b45309 0%, #f59e0b 50%, #451a03 100%)" },
    ],
    featureModules: [
      {
        icon: "🍞",
        module: "Pemesanan Otomatis WhatsApp (One-Click Order)",
        features: [
          { name: "Pesan Produk Sekali Klik", desc: "Setiap produk memiliki tombol direct-order WhatsApp dengan pesan terformat otomatis (Nama Produk, Kategori, Harga, Jumlah)" },
          { name: "Format Rupiah Otomatis", desc: "Format mata uang Rupiah standar perbankan Indonesia menggunakan JavaScript Intl.NumberFormat" },
        ],
      },
      {
        icon: "🎂",
        module: "Formulir Pemesanan Kue Custom (Custom Cake Builder)",
        features: [
          { name: "Input Pesanan & Validasi Lengkap", desc: "Input nama, WhatsApp, date picker validasi min H+1, pilihan rasa (6 varian), dan ukuran (16cm-2 tingkat)" },
          { name: "Live Order Preview Panel", desc: "Panel interaktif samping form yang menampilkan preview teks ringkasan pesanan WA secara real-time" },
          { name: "Catatan Khusus & Reset Form", desc: "Kolom instruksi tulisan kue/dekorasi lilin serta tombol reset form instan" },
        ],
      },
      {
        icon: "🔍",
        module: "Katalog Reaktif, Filter & Modal Quick-View",
        features: [
          { name: "Filter Kategori Dinamis", desc: "Pill filter kategori (Semua, Roti Manis, Roti Tawar, Pastry, Kue Ulang Tahun, Snack Box) dengan badge counter" },
          { name: "Pencarian Real-Time & Quick View", desc: "Pencarian instan tanpa reload + modal detail pop-up foto besar, masa simpan & info kehalalan 100%" },
        ],
      },
      {
        icon: "🧭",
        module: "Navbar Modern, Status Toko & Hero Banner",
        features: [
          { name: "Sticky Glassmorphic Header", desc: "Header dengan backdrop-blur, smooth scrolling, status aktif 'Buka: 07.00 - 21.00 WIB', & mobile drawer" },
          { name: "Hero Banner & Review Badge", desc: "Tagline 'Roti Segar Setiap Hari, Dibuat dengan Cinta', floating review badge 4.9/5.0, & tombol CTA cepat" },
        ],
      },
      {
        icon: "📖",
        module: "Story Toko, Galeri Lightbox & Testimoni Carousel",
        features: [
          { name: "Cerita Toko & 4 Pilar Kualitas", desc: "Sejarah berdiri sejak 2015 di Banda Aceh, bahan alami tanpa pengawet buatan, & dipanggang jam 05.00 WIB" },
          { name: "Galeri Interaktif & Carousel Ulasan", desc: "Grid foto dapur & produk dengan modal lightbox zoom, plus slider ulasan pelanggan dengan navigasi Prev/Next" },
        ],
      },
      {
        icon: "📍",
        module: "Lokasi Google Maps, Floating WA & Tech Excellence",
        features: [
          { name: "Google Maps Embed & Kontak CS", desc: "Embed peta interaktif Jl. Melati No. 12 Banda Aceh + tombol chat customer service" },
          { name: "Floating WhatsApp Button", desc: "Tombol melayang tetap di sudut kanan bawah dengan efek radar pulse dan tooltip interaktif" },
          { name: "Arsitektur Svelte 5 Runes & Vite 8", desc: "Performa ultra cepat, ukuran bundle sangat ringan, 100% strict TypeScript (0 error, 0 warning)" },
        ],
      },
    ],
  },
  {
    slug: "kawaii-animal-sticker-studio",
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
    slug: "kokorof-reviewer-cv-v2",
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
    slug: "essensia-koffie-app",
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
    slug: "kasir-cafe-pos-system",
    title: "Kasir Cafe POS System",
    type: "Full Stack",
    category: "Full Stack",
    desc: "Sistem Kasir & Point of Sale (POS) Cafe interaktif berbasis web.",
    longDesc:
      "Aplikasi web Point of Sale (POS) interaktif untuk pengelolaan transaksi cafe dan restoran. Dilengkapi fitur manajemen menu, kalkulasi transaksi real-time, cetak struk digital, serta pencatatan stok dan laporan penjualan.",
    stack: ["React", "TypeScript", "POS Engine", "Tailwind CSS", "Vercel"],
    demoUrl: "https://kasir-cafe-iota.vercel.app/",
    screenshot: "/projects/screenshots/kasir-cafe.jpg",
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
    slug: "monitoring-terpadu-dapil-jatim-vii",
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
    slug: "portal-monitoring-dapil-jatim",
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
    slug: "sistem-informasi-program-aspirasi",
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
    slug: "monitoring-giat-nasional-senayan",
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
    slug: "esthetico-derma-institute-security",
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
    slug: "kokorof-reviewer-cv-v1",
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
    slug: "tes-modul-ui-component-showcase",
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
    slug: "ecoliteration-hydrological-cycle-app",
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
    slug: "soc-lab-server-configuration",
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
    slug: "vulnerability-scanner-tool",
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
    slug: "naufal-angkasah-portfolio",
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
    slug: "coding-education-module",
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

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return projects.map((p) => p.slug);
}

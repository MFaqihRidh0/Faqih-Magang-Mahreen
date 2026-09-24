# Mahreen Indonesia — Landing Page "Berkarya Untuk Indonesia" (v2 · Nuansa Nusantara)

> **Proyek Seleksi Posisi Website Development — Mahreen Indonesia Internship Batch 2**  
> Dikerjakan oleh: **M Faqih Ridho**  
> Tema: **"BERKARYA UNTUK INDONESIA"** — *Satu Ide. Satu Karya. Satu Dampak.*

---

## 🏛️ Konsep Desain: "Pagelaran Karya"

Landing page ini dirancang menyerupai **pertunjukan wayang kulit semalam suntuk**, di mana pengunjung menjadi tokoh utama dalam menapaki perjalanan karya untuk Indonesia:

1. **Gunungan Dibuka (Intro Preloader):** Penanda dimulainya pertunjukan, gunungan wayang emas membelah layar menuju beranda (hanya tampil sekali per sesi, dilengkapi tombol lewati).
2. **Gunungan Ditancapkan (Transisi Pergantian Babak):** Setiap tautan menu navbar diklik, siluet gunungan megah menyapu layar sebagai transisi khas pagelaran tradisi.
3. **Candi Borobudur 3D (Three.js):** Representasi mahakarya arsitektur leluhur, dirender secara prosedural dengan material *Champagne Gold* berundak 6 teras, 3 teras melingkar, dan 72 stupa lonceng (`InstancedMesh`). Dilengkapi fallback statis untuk perangkat mobile/low-tier.
4. **Kelir & Blencong (Kuis Jalur Karyamu):** Layar kain kelir bercahaya blencong lembut, dipandu empat tokoh Punakawan (*Semar, Gareng, Petruk, Bagong*) dengan balon tutur khas jenaka & bijak.
5. **Batik Nusantara Prosedural (SVG):** Menghadirkan motif **Kawung** (kebijaksanaan), **Parang** (semangat pantang menyerah), dan **Mega Mendung** (keteduhan & lambang Jawa Barat, asal Mahreen Cimahi).
6. **Journey Undakan Candi:** Menapaki 4 tingkatan Borobudur: *01 Kenali → 02 Ikuti → 03 Berkarya → 04 Berdampak*.
7. **Dinding Karya:** Kanvas interaktif mini bermotif kain batik tempat generasi muda menyematkan ide karya untuk Indonesia (tersimpan di `localStorage`).

---

## 🎨 Sistem Warna (Aturan 60 / 30 / 10)

Sesuai spesifikasi brief:
- **Warm Charcoal (60%):** `#171412`, `#1F1B19`, `#2A2623` (Background utama, siluet wayang, kontras teks di atas gold).
- **Champagne Gold (30%):** `#E3CFA6`, `#D6BC8A`, `#C9A96E` (Aksen tombol, border, Candi Borobudur 3D, background section Kelir & Dampak).
- **Cream (10%):** `#FBF7EF`, `#F5EEDF` (Teks utama di atas charcoal, kartu hasil kuis, kartu dinding karya).
- **Kontras WCAG AA:** Memenuhi rasio kontras ketat (tidak ada teks putih/cream di atas gold; charcoal kontras tinggi di atas gold).

---

## 🚀 Tech Stack

- **Framework:** React 18 + Vite + TypeScript
- **Styling:** Tailwind CSS (Custom Color Tokens & Typography)
- **3D Engine:** Three.js + `@react-three/fiber` + `@react-three/drei`
- **Animasi:** Framer Motion (Transisi Gunungan, Preloader, Accordion)
- **Ikonografi:** Lucide React
- **Efek Spesial:** Canvas-Confetti (Hasil Kuis)

---

## 📂 Struktur Proyek

```
proggram/
├── public/
│   ├── wayang/
│   │   ├── gunungan.svg      # Vektor Kayon dengan tatahan pohon hayat
│   │   ├── semar.svg         # Vektor Kyai Semar
│   │   ├── gareng.svg        # Vektor Nala Gareng
│   │   ├── petruk.svg        # Vektor Petruk Kantong Bolong
│   │   └── bagong.svg        # Vektor Bagong
├── src/
│   ├── components/
│   │   ├── batik/
│   │   │   ├── BatikPattern.tsx   # Generator pola SVG Kawung, Parang, Mega Mendung
│   │   │   └── BatikDivider.tsx   # Garis pembatas emas dengan ornamen kawung
│   │   ├── three/
│   │   │   ├── BorobudurProcedural.tsx # 3D Borobudur prosedural (InstancedMesh)
│   │   │   ├── BorobudurScene.tsx      # Canvas, pencahayaan senja & parallax
│   │   │   └── BorobudurFallback.tsx   # Fallback vektor emas (mobile & low-tier)
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Chip.tsx
│   │   │   ├── SectionHeading.tsx
│   │   │   └── Toast.tsx
│   │   ├── wayang/
│   │   │   ├── Kelir.tsx           # Layar pertunjukan wayang dengan blencong
│   │   │   └── WayangSilhouette.tsx# Efek bayangan & goyangan wayang
│   │   ├── Ecosystem.tsx          # 6 unit ekosistem + modal detail
│   │   ├── EcosystemCard.tsx      # Kartu ekosistem dengan ornamen mega mendung
│   │   ├── FAQ.tsx                # Accordion 5 pertanyaan dengan ikon kawung
│   │   ├── Footer.tsx             # Kontak resmi Cimahi, sosmed & kredit aset
│   │   ├── GununganTransition.tsx # Transisi pergantian babak saat klik navbar
│   │   ├── Hero.tsx               # Hero 2 kolom + integrasi 3D Borobudur
│   │   ├── ImpactStats.tsx        # Counter angka dampak & progress bar
│   │   ├── IntroGunungan.tsx      # Preloader pembuka gunungan membelah
│   │   ├── Journey.tsx            # Undakan bertingkat Borobudur
│   │   ├── KaryaWall.tsx          # Dinding karya (form 140 karakter + localStorage)
│   │   ├── Navbar.tsx             # Navbar sticky + mobile drawer
│   │   ├── OpenCall.tsx           # Banner pendaftaran Internship Batch 2
│   │   ├── PathQuiz.tsx           # Kuis 4 pertanyaan panduan Punakawan
│   │   └── Ticker.tsx             # Marquee berjalan pemisah kawung
│   ├── data/
│   │   ├── content.ts             # Hero text, stats, FAQ, kontak, kredit
│   │   ├── ecosystem.ts           # 6 data unit ekosistem Mahreen
│   │   └── quiz.ts                # Pertanyaan, opsi, skor & metadata Punakawan
│   ├── hooks/
│   │   ├── useDeviceTier.ts       # Deteksi kapabilitas WebGL & hardware concurrency
│   │   └── useReducedMotion.ts    # Aksesibilitas preferensi gerakan pengguna
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── tailwind.config.js
├── vite.config.ts
├── package.json
└── README.md
```

---

## 🛠️ Cara Menjalankan Proyek Secara Lokal

1. **Pastikan Node.js terpasang** (disarankan Node.js v18 atau yang lebih baru).
2. **Pasang dependensi:**
   ```bash
   npm install
   ```
3. **Jalankan development server:**
   ```bash
   npm run dev
   ```
   Buka peramban di `http://localhost:3000/`.

4. **Uji build produksi:**
   ```bash
   npm run build
   npm run preview
   ```

---

## 🌐 Panduan Deploy ke Vercel

Proyek ini telah dikonfigurasi secara lengkap dengan file [`vercel.json`](./vercel.json) yang mencakup rewrites SPA dan optimasi caching.

### Cara 1: Deploy Otomatis via GitHub (Direkomendasikan)
1. Inisialisasi Git & Push repositori ke GitHub:
   ```bash
   git init
   git add .
   git commit -m "feat: landing page Mahreen Berkarya Untuk Indonesia"
   git branch -M main
   git remote add origin <URL_REPOSITORY_GITHUB_ANDA>
   git push -u origin main
   ```
2. Buka dashboard [Vercel](https://vercel.com/) dan pilih **Add New Project**.
3. Hubungkan ke repositori GitHub proyek ini.
4. Vercel akan otomatis mengenali preset **Vite**:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Klik **Deploy**. Website akan langsung aktif dengan URL publik HTTPS.

### Cara 2: Deploy Cepat via Vercel CLI
1. Jalankan Vercel CLI dari terminal:
   ```bash
   npx vercel
   ```
2. Ikuti instruksi login dan pilih pengaturan default (enter untuk setiap pertanyaan).
3. Untuk rilis produksi langsung:
   ```bash
   npx vercel --prod
   ```

---

## ✏️ Panduan Mengganti Konten & Aset

- **Konten Teks & Informasi Resmi:** Seluruh teks (Hero, Journey, Statistik Dampak, FAQ, Alamat Cimahi, Kontak WhatsApp/Email, dan Sosial Media) tersimpan terpusat di `src/data/content.ts`.
- **Unit Ekosistem Mahreen:** Tambah atau ubah program pada `src/data/ecosystem.ts`.
- **Pertanyaan Kuis & Karakter Punakawan:** Modifikasi alur kuis pada `src/data/quiz.ts`.
- **Aset Vektor Wayang:** File siluet tersimpan dalam format SVG di `public/wayang/`.

---

## 💡 Keputusan Desain & Optimalisasi

1. **Candi Borobudur Prosedural (Bukan File GLB Berat):** Menggunakan geometri primitif Three.js yang disusun bertingkat dan `InstancedMesh` untuk 72 stupa. Ini menghasilkan ukuran bundel yang sangat ringan (< 50 KB kode), tanpa risiko lisensi pihak ketiga, serta waktu muat instan (LCP optimal).
2. **Graceful Fallback:** Pada layar mobile (< 768px), perangkat low-tier, atau saat `prefers-reduced-motion` aktif, scene 3D secara otomatis digantikan oleh vektor siluet keemasan (`BorobudurFallback`) yang elegan dan bebas hambatan performa.
3. **Punakawan sebagai Pemandu Ramah Generasi Muda:** Mengambil kearifan lokal Nusantara, Punakawan (Semar, Gareng, Petruk, Bagong) menghadirkan tone of voice yang hangat, bijak, dan akrab bagi audiens muda tanpa terkesan kaku.
4. **Pemisah Kawung & Mega Mendung Responsif:** Menggunakan SVG procedural vector yang tajam pada semua kerapatan layar (Retina/High-DPI) tanpa membebani bandwidth.
5. **Aksesibilitas & Standar WCAG:** Memperhatikan kontras teks terhadap latar belakang, atribut ARIA semantik, dan navigasi ramah keyboard.

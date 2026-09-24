# BRIEF PROYEK — Landing Page "Berkarya Untuk Indonesia" (v2 · Nuansa Nusantara)
**Untuk:** Coding agent (Claude Code / Cursor / sejenisnya)
**Konteks:** Tugas seleksi posisi *Website Development*, Mahreen Indonesia Internship Batch 2
**Jenis:** Landing page single-page untuk memperkenalkan Mahreen Indonesia lebih luas ke generasi muda
**Batas waktu:** maksimal 24 jam sejak task diterima → prioritaskan yang rapi dan jalan. Elemen 3D & animasi dikerjakan bertahap dengan fallback (lihat §12).

> **Perubahan v2:** ditambahkan konsep budaya **Batik + Candi Borobudur (Three.js) + Wayang**, dirangkai dalam satu narasi "Pagelaran Karya". Lihat §5, §6, §7, §11.

---

## 1. Ringkasan Masalah, Tujuan & Konsep

**Masalah (dari brief resmi):** Mahreen Indonesia punya banyak program dan unit (Internship, Studio, CSR, Peduli Mahreen, Tanya Mahreen, Newsroom), tetapi informasinya belum mudah **dikenal, dipahami, dan diikuti** oleh generasi muda.

**Tujuan:** Landing page yang memperkenalkan Mahreen Indonesia dengan tema **"BERKARYA UNTUK INDONESIA"** — *Satu Ide. Satu Karya. Satu Dampak.* — secara **menarik, mudah dipahami, dan relevan**.

### Konsep besar: "Pagelaran Karya"
Website dibangun seperti **pertunjukan wayang kulit semalam suntuk**, dengan pengunjung sebagai tokoh utamanya:

| Unsur pertunjukan wayang | Wujud di website |
|---|---|
| **Gunungan dibuka** → tanda pertunjukan dimulai | Intro/preloader: gunungan membelah dan membuka halaman |
| **Gunungan ditancapkan** → pergantian babak | Transisi saat klik menu: gunungan menyapu layar |
| **Kelir** (layar putih yang disinari blencong) | Section berlatar champagne gold dengan bayangan wayang |
| **Punakawan** (Semar, Gareng, Petruk, Bagong) → pemandu yang dekat dengan rakyat | Pemandu di kuis "Temukan Jalur Karyamu" |
| **Candi Borobudur** → mahakarya leluhur yang dibangun bertingkat | Hero 3D + metafora "naik teras demi teras" pada Journey |
| **Batik** → karya yang dibuat titik demi titik | Tekstur latar, ornamen pembatas, bingkai kartu |

**Pesan yang ingin ditangkap juri:** *Leluhur kita sudah berkarya untuk Indonesia — Borobudur, wayang, batik. Sekarang giliran generasi muda, dan Mahreen Indonesia adalah panggungnya.*

**Fitur interaktif utama (tetap dari v1):** Kuis "Temukan Jalur Karyamu" dan "Dinding Karya".

**Kriteria penilaian:** Kreativitas 30%, Kesesuaian Brief 25%, Kualitas Hasil 25%, Komunikasi Ide 10%, Kerapihan 10%.

---

## 2. Tech Stack

- **Vite + React + TypeScript**
- **Tailwind CSS** (token warna kustom, §4)
- **three** + **@react-three/fiber** + **@react-three/drei** → scene Borobudur
- **framer-motion** → animasi, transisi gunungan, reveal
- **lucide-react** → ikon UI
- Tanpa backend. `localStorage` untuk Dinding Karya.
- Deploy: **Vercel** atau **Netlify** (link publik wajib bisa diakses tim seleksi).

```
src/
  main.tsx
  App.tsx
  index.css
  data/
    ecosystem.ts        // 6 unit ekosistem
    quiz.ts             // pertanyaan, skor, pemetaan Punakawan
    content.ts          // hero, ticker, journey, FAQ, kontak, kredit aset
  components/
    Navbar.tsx
    IntroGunungan.tsx       // preloader pembuka
    GununganTransition.tsx  // transisi antar-section
    Hero.tsx
    Ticker.tsx
    Problem.tsx
    Ecosystem.tsx / EcosystemCard.tsx
    PathQuiz.tsx
    Journey.tsx
    ImpactStats.tsx
    KaryaWall.tsx
    OpenCall.tsx
    FAQ.tsx
    Footer.tsx
    three/
      BorobudurScene.tsx    // Canvas + kamera + cahaya
      BorobudurProcedural.tsx
      BorobudurModel.tsx    // opsional, jika pakai file .glb
      BorobudurFallback.tsx // gambar/SVG statis
    batik/
      BatikPattern.tsx      // <pattern> SVG: kawung, parang, mega mendung
      BatikDivider.tsx
    wayang/
      WayangSilhouette.tsx  // render SVG siluet + efek bayangan kelir
      Kelir.tsx             // wrapper section "layar wayang"
    ui/ (Button, SectionHeading, Chip, Toast)
  hooks/
    useReducedMotion.ts
    useDeviceTier.ts        // deteksi perangkat lemah → matikan 3D
public/
  images/                 // logo & foto resmi (disediakan pemilik proyek)
  wayang/                 // gunungan.svg, semar.svg, gareng.svg, petruk.svg, bagong.svg
  batik/                  // opsional: tile batik .svg dari sumber berlisensi
  models/                 // opsional: borobudur.glb (terkompresi)
```

Semua teks di `src/data/`. Semua sumber aset & atribusi lisensi dicatat di `content.ts → credits` dan ditampilkan di footer.

---

## 3. Referensi Gaya dari Website Lama (mahreenindonesia.com)

Dari screenshot halaman Internship, Studio, CSR, Peduli Mahreen, Tanya Mahreen, Newsroom:

- Nuansa premium-editorial: latar nyaris hitam (≈ `#0C0C0C`), aksen emas (≈ `#E5C477`), headline serif tebal, body sans-serif.
- Pola dipertahankan: eyebrow kapital emas, headline dengan kata terakhir emas, tombol pill emas + outline, ticker emas (Newsroom), kartu ikon garis emas, progress bar (CSR), stepper bernomor (donasi Peduli Mahreen).
- Yang diperbaiki: pindah ke **warm charcoal** yang lebih hangat, porsi emas lebih besar, dan identitas **Nusantara** yang kuat agar lebih relevan dan berkesan bagi anak muda.

| Unit | Isi | Kategori |
|---|---|---|
| Mahreen Indonesia Internship | Magang berbasis proyek nyata | **Belajar** |
| Newsroom (Newsroom Lab) | Artikel, insight, event/webinar | **Belajar** |
| Tanya Mahreen | Jasa digital: website, branding, sosmed, marketing, ads, konten | **Berkarya** |
| Mahreen Studio | Merchandise & lifestyle | **Berkarya** |
| Peduli Mahreen | Program pendidikan "Kelas Inspirasi", donasi | **Berdampak** |
| Mahreen CSR | Reboisasi, Learning Center, kolaborasi sosial | **Berdampak** |

---

## 4. Sistem Warna — 60 / 30 / 10

**Aturan wajib:** Warm Charcoal **60%**, Champagne Gold **30%**, Cream **10%** — dihitung dari **luas area visual**.

```js
colors: {
  charcoal: {
    950: '#171412', // footer, siluet wayang
    900: '#1F1B19', // section alternatif
    800: '#2A2623', // BACKGROUND UTAMA
    700: '#36302C', // kartu
    600: '#4A423C', // border
  },
  gold: {
    300: '#E3CFA6', // highlight, cahaya blencong
    400: '#D6BC8A',
    500: '#C9A96E', // CHAMPAGNE GOLD UTAMA
    600: '#A8864F', // hover, motif batik di atas gold
    700: '#7E6337',
  },
  cream: {
    50:  '#FBF7EF',
    100: '#F5EEDF', // CREAM UTAMA — teks di atas charcoal
    200: '#EAE0CC',
  },
}
```

### Distribusi per section

| Section | Latar | Elemen budaya |
|---|---|---|
| Intro gunungan | charcoal-950 | Gunungan gold membelah |
| Navbar, Hero | charcoal-800 | Borobudur 3D gold + batik kawung samar |
| Ticker | **gold-500** | Pemisah motif kawung kecil |
| Problem, Ekosistem | charcoal-800/900 | Bingkai sudut batik pada kartu |
| Kuis (Kelir) | **gold-500** → gradient blencong | Siluet Punakawan charcoal-950 |
| Journey | charcoal-900 | Teras Borobudur bertingkat (SVG/3D ringan) |
| Dampak | **gold-500** | Motif parang gold-600 samar |
| Dinding Karya, Open Call, FAQ | charcoal-800 | Divider batik |
| Footer | charcoal-950 | Border mega mendung |

**Cream (10%):** teks utama, kartu hasil kuis, sticky note Dinding Karya, chip.

### Aturan warna elemen budaya
- Motif batik **hanya** memakai warna palet (gold di atas charcoal, gold-600 di atas gold). Tidak memakai warna batik asli (sogan cokelat/biru indigo) agar proporsi tetap terjaga.
- Opasitas motif latar: **6–12%**. Motif tidak boleh mengganggu keterbacaan teks. Di belakang paragraf, beri area polos atau overlay.
- Siluet wayang: charcoal-950 di atas gold (efek bayangan di kelir), atau gold-500 di atas charcoal (efek wayang emas/prada).

### Aturan kontras (WCAG AA)
- ✅ cream-100 di atas charcoal-800 · ✅ charcoal di atas gold-500 · ✅ gold-500 di atas charcoal-800
- ❌ teks cream/putih di atas gold · ❌ teks gold di atas cream (kecuali gold-700)
- Rasio ≥ 4.5:1 untuk teks normal, ≥ 3:1 untuk teks ≥ 24px.

---

## 5. Elemen Budaya — Spesifikasi Detail

### 5.1 Batik
Tiga motif, dipilih karena maknanya selaras dengan tema:

| Motif | Makna (untuk copy & penjelasan karya) | Dipakai di |
|---|---|---|
| **Kawung** | Kebijaksanaan dan niat yang tulus | Latar hero (samar), pemisah ticker |
| **Parang** | Semangat pantang menyerah, terus bergerak seperti ombak | Section Dampak, garis diagonal dekoratif |
| **Mega Mendung** (Cirebon, Jawa Barat) | Keteduhan, kesabaran; asal Jawa Barat seperti Mahreen (Cimahi) | Border footer, ornamen sudut kartu |

**Implementasi (utama, tanpa aset eksternal):**
- Buat komponen `BatikPattern` berisi `<svg><defs><pattern>` yang **digambar prosedural dengan SVG path**:
  - *Kawung:* empat elips yang saling bertemu di satu titik pusat, disusun grid, tile 48–64px.
  - *Parang:* rangkaian bentuk "S"/lidah api diagonal 45° berulang, tile 64–80px.
  - *Mega mendung:* awan berlapis 3–5 garis kontur konsentris, dipakai sebagai border horizontal yang berulang.
- Gunakan sebagai `background-image` via data-URI SVG atau `<svg>` absolut di belakang konten.
- Ekspor juga sebagai file `.svg` di `public/batik/` untuk dipakai ulang.
- **BatikDivider:** garis tipis gold + motif kawung kecil di tengah, pemisah antar-section.

**Animasi batik:** saat section masuk viewport, motif "tergambar" dengan `stroke-dashoffset` (seperti canting menorehkan malam), durasi 1,2–1,8 detik. Nonaktif bila `prefers-reduced-motion`.

### 5.2 Candi Borobudur (Three.js)

**Posisi:** Hero, sisi kanan (desktop) / di belakang teks dengan opasitas lebih rendah (tablet). **Mobile: tampilkan fallback statis** (lihat bawah).

**Gaya visual:** low-poly stylized, **bukan realistis**. Material gold-500 metalik lembut (`metalness 0.6`, `roughness 0.45`), rim light gold-300, latar charcoal-800. Kabut tipis (`fog` warna charcoal-800) agar menyatu dengan halaman. Suasana "senja/fajar keemasan".

**Opsi A (DEFAULT) — Procedural, tanpa file model:**
Bangun di `BorobudurProcedural.tsx` dari primitif Three.js:
- 6 teras bujur sangkar bertingkat (`BoxGeometry`) dengan tepi berundak, makin ke atas makin kecil.
- 3 teras melingkar (`CylinderGeometry`) di atasnya.
- Stupa berlubang di teras melingkar: **32, 24, 16** buah (total 72), masing-masing = bel (`LatheGeometry` profil lonceng) + puncak kecil. Gunakan **`InstancedMesh`** agar ringan.
- 1 stupa induk besar di puncak.
- Tangga di keempat sisi (box tipis) sebagai detail.
- Titik cahaya kecil (lampu kecil/`Points`) di sela stupa, berkedip lembut seperti pelita.

Keunggulan: ringan (< 50 KB kode), tanpa masalah lisensi, warna 100% sesuai palet.

**Opsi B — Model .glb dari Sketchfab** (jika ingin lebih detail): lihat §11. Konversi & kompresi dengan `gltf-transform` (Draco/Meshopt), target ≤ 1,5 MB, ganti semua material dengan material gold palet.

**Interaksi & animasi:**
- Rotasi pelan otomatis (±0,05 rad/detik).
- Parallax mengikuti posisi mouse (maks ±8° pada sumbu Y, ±3° pada X).
- **Scroll-driven:** saat pengguna scroll keluar dari hero, kamera naik perlahan dari kaki candi ke puncak stupa induk → lalu scene memudar. Menguatkan pesan "naik tingkat".
- Tanpa OrbitControls bebas (hindari pengguna "tersesat"); cukup parallax.

**Anggaran performa (wajib):**
- `import()` dinamis + `React.lazy` + `Suspense`; teks hero tampil lebih dulu, 3D menyusul.
- `dpr={[1, 1.5]}`, `frameloop="demand"` atau pause saat hero tidak terlihat (IntersectionObserver).
- Total triangle ≤ 80k.
- **Fallback** (`BorobudurFallback`) dipakai jika: lebar layar < 768px, `prefers-reduced-motion`, WebGL tidak tersedia, atau `navigator.hardwareConcurrency <= 4`. Fallback = gambar render statis dari scene yang sama (screenshot → WebP) atau siluet SVG Borobudur gold.

### 5.3 Wayang

**Tokoh yang dipakai:**
- **Gunungan/Kayon** → pembuka & transisi (fungsi aslinya memang penanda awal, pergantian babak, dan akhir pertunjukan).
- **Punakawan: Semar, Gareng, Petruk, Bagong** → pemandu kuis. Dipilih karena merupakan tokoh asli Jawa (bukan dari epos India), dikenal jenaka, bijak, dan dekat dengan rakyat → cocok sebagai "teman" generasi muda.

**Gaya:** siluet satu warna (seperti bayangan wayang kulit di kelir), dengan detail tatahan (lubang-lubang ukiran) dipertahankan agar tetap terasa wayang.

**a) IntroGunungan (preloader, 1,8–2,5 detik)**
1. Layar charcoal-950, gunungan gold muncul di tengah dengan efek cahaya blencong bergoyang (radial gradient gold-300 yang berdenyut halus).
2. Gunungan bergetar sedikit (seperti digerakkan dalang), lalu **terbelah/bergeser ke dua sisi** membuka halaman hero.
3. Tombol "Lewati" terlihat. Hanya tampil **sekali per sesi** (`sessionStorage`). Reduced motion → langsung tampil hero.

**b) GununganTransition (transisi "pergantian babak")**
- Saat pengguna klik menu navbar: gunungan besar menyapu layar dari kanan ke kiri (±600 ms) → halaman ter-scroll ke section tujuan di balik gunungan → gunungan keluar ke kiri.
- Dipakai **hanya** saat klik navigasi (bukan setiap scroll) agar tidak melelahkan.
- Reduced motion → smooth scroll biasa.

**c) Kelir (section Kuis)**
- Latar gold-500 dengan radial gradient gold-300 di tengah atas (efek lampu blencong).
- Siluet Punakawan di sisi bawah kiri/kanan, dengan `filter: blur(0.5px)` dan bayangan ganda tipis agar terasa seperti bayangan di layar.
- Setiap pertanyaan dipandu satu Punakawan yang "masuk" dari tepi layar dengan gerakan ayun khas wayang (rotasi ±4°, easing lembut), plus balon teks pendek:
  - Q1 Semar: "Ngger, apa yang ingin kamu raih?"
  - Q2 Gareng: "Bidang apa yang bikin semangatmu menyala?"
  - Q3 Petruk: "Kamu lebih suka kerja seperti apa?"
  - Q4 Bagong: "Berapa waktu yang bisa kamu luangkan?"
- Hasil kuis: keempat Punakawan tampil bersama, gunungan kecil di tengah.

**d) Aksen wayang lainnya (hemat, jangan berlebihan)**
- Siluet gunungan kecil sebagai favicon/ikon loader.
- Satu siluet wayang gold samar (opasitas 8%) di latar section Open Call.

**Batas jumlah:** maksimal 1 gunungan + 4 Punakawan. Jangan menambah tokoh lain agar fokus dan tidak ramai.

---

## 6. Tipografi

- **Headline:** `DM Serif Display` atau `Playfair Display` (selaras website lama).
- **Body & UI:** `Plus Jakarta Sans`.
- **Balon dialog Punakawan:** Plus Jakarta Sans italic, atau `Caveat` bila ingin kesan tulisan tangan.
- **Eyebrow:** 12–13px, uppercase, `tracking-[0.2em]`.
- Skala: H1 `clamp(2.5rem, 6vw, 5rem)`, H2 `clamp(2rem, 4vw, 3rem)`, body 16–18px, line-height 1.6.
- Fallback: `serif` / `system-ui, sans-serif`.

---

## 7. Struktur Halaman & Spesifikasi Section

Semua section punya `id`. Urutan:

### 7.0 IntroGunungan — §5.3a

### 7.1 Navbar (sticky)
- Kiri: logo resmi dari `/public/images/logo-mahreen.svg|png`. Jika belum ada → wordmark teks "Mahreen / INDONESIA". **Jangan menggambar ulang logo.**
- Menu: Ekosistem · Jalur Karyamu · Dampak · Dinding Karya · FAQ (klik → GununganTransition).
- CTA gold: "Mulai Berkarya" → `#kuis`.
- Transparan di atas hero → charcoal-900/90 + blur saat scroll. Garis bawah tipis motif mega mendung saat sticky.
- Mobile: hamburger → drawer charcoal-900 dengan motif kawung samar.

### 7.2 Hero
- Layout 2 kolom: teks kiri, **Borobudur 3D kanan** (§5.2).
- Latar: charcoal-800 + batik kawung 6% opasitas.
- Eyebrow: `#BERKARYAUNTUKINDONESIA`
- H1: "Satu Ide. Satu Karya. **Satu Dampak.**"
- Subjudul: "Leluhur kita berkarya lewat Borobudur, wayang, dan batik. Kini giliranmu. Mahreen Indonesia adalah ekosistem kreativitas, teknologi digital, pengembangan talenta, bisnis, komunitas, dan kontribusi sosial — tempatmu belajar, berkarya, dan berdampak."
- CTA: "Temukan Jalur Karyamu" (gold) · "Jelajahi Ekosistem" (outline cream)
- Indikator scroll kecil di bawah.

### 7.3 Ticker (gold-500, teks charcoal)
"MAHREEN INDONESIA INTERNSHIP BATCH 2 RESMI DIBUKA ✦ SATU IDE. SATU KARYA. SATU DAMPAK. ✦ FROM LEARNING TO REAL IMPACT ✦" — pemisah ✦ diganti ikon kawung kecil SVG. Berhenti saat hover; mati saat reduced motion.

### 7.4 Problem → Jawaban
Dua kolom: "Banyak peluang, bingung mulai dari mana?" + tiga poin **Kenali · Pilih · Mulai**. Diakhiri BatikDivider.

### 7.5 Ekosistem Mahreen (`#ekosistem`)
- Eyebrow "OUR ECOSYSTEM", H2 "Enam Pintu untuk Berkarya".
- Filter chip: Semua · Belajar · Berkarya · Berdampak.
- Grid 3/2/1 kolom, 6 kartu dari `data/ecosystem.ts`:

```ts
type EcosystemUnit = {
  id: 'internship' | 'newsroom' | 'tanya' | 'studio' | 'peduli' | 'csr';
  name: string;
  category: 'Belajar' | 'Berkarya' | 'Berdampak';
  tagline: string;
  forYouIf: string;
  whatYouCanDo: string[];
  icon: string;          // lucide
  ctaLabel: string;
  ctaHref: string;       // https://mahreenindonesia.com (+ halaman terkait jika diketahui)
};
```

- Kartu charcoal-700, **ornamen mega mendung di sudut kanan atas** (gold, 15% opasitas → 40% saat hover). Hover: border gold-500, naik 4px.
- Klik → modal detail.

### 7.6 Kuis "Temukan Jalur Karyamu" (`#kuis`) — dibungkus komponen `Kelir` (§5.3c)
- 4 pertanyaan (disimpan di `data/quiz.ts`), tiap opsi menambah skor ke 1–2 unit:
  1. "Saat ini kamu paling ingin…" → Belajar skill baru / Bikin karya nyata / Bantu sesama / Cari pengalaman kerja
  2. "Bidang yang paling bikin kamu semangat?" → Teknologi & digital / Desain & fashion / Pendidikan & sosial / Bisnis & marketing
  3. "Kamu lebih suka…" → Membaca & ikut webinar / Mengerjakan proyek tim / Terjun ke lapangan / Membangun brand
  4. "Waktu yang bisa kamu luangkan?" → Beberapa jam per minggu / Paruh waktu / Penuh
- Stepper 1–2–3–4 (gaya donasi Peduli Mahreen), tiap langkah diberi ikon kawung kecil.
- Hasil: kartu cream-100, unit teratas + alternatif, alasan singkat, tombol "Lihat Detail" & "Ulangi".
- Tombol salin: "Jalur karyaku: [Unit] ✦ #BerkaryaUntukIndonesia @mahreenindonesia" + toast.
- Opsi berupa `<button aria-pressed>`, bisa dioperasikan dengan keyboard.

### 7.7 Journey "Naik Teras demi Teras" (`#journey`)
- Metafora: seperti menapaki Borobudur dari kaki ke puncak.
- Visual: **4 teras bertingkat** (SVG isometrik gold outline, atau potongan scene 3D ringan). Tiap teras = 1 langkah: **01 Kenali → 02 Ikuti → 03 Berkarya → 04 Berdampak**.
- Saat scroll, teras menyala satu per satu dari bawah ke atas; di puncak muncul stupa kecil bercahaya.
- Mobile: tumpukan vertikal dari bawah ke atas.

### 7.8 Dampak (`#dampak`) — gold-500 + motif parang gold-600 (8%)
- 3–4 angka besar serif charcoal dengan count-up (data dari website lama: 10.000 pohon target reboisasi, 520 kontributor, 1.200 siswa Learning Center), di `data/content.ts`.
- Catatan kecil wajib: "Data ilustratif dari situs Mahreen Indonesia".
- Opsional: 2 kartu program dengan progress bar.

### 7.9 Dinding Karya (`#dinding-karya`)
- H2: "Apa satu karyamu untuk Indonesia?"
- Form: nama panggilan (opsional, ≤ 30 karakter), kategori, ide karya (wajib, ≤ 140 karakter, counter).
- Kartu baru muncul bergaya kain batik mini: latar cream-100, **tepi atas bermotif kawung** gold-600, teks charcoal, rotasi acak −2°..2°.
- `localStorage` dengan try/catch; 6 seed ide agar tidak kosong. Render teks biasa (tanpa `dangerouslySetInnerHTML`).
- Label: "Tersimpan di perangkatmu (prototype)".

### 7.10 Open Call
Banner charcoal-900, border gold, siluet wayang gold samar di belakang: "Mahreen Indonesia Internship Batch 2 — Periode 1 Oktober 2026 – 31 Januari 2027". CTA → `https://mahreenindonesia.com`.

### 7.11 FAQ
Accordion 5 pertanyaan, ikon plus diganti kawung kecil yang berputar 45° saat terbuka. Jawaban yang belum pasti ditulis umum dan diarahkan ke kanal resmi.

### 7.12 Footer (charcoal-950)
- Border atas **mega mendung** full-width.
- Logo + "Creative • Digital • Social Company"
- Alamat: Jl. Kebon Kopi No. 153, Kota Cimahi, Jawa Barat 40535
- Kontak: info@mahreenindonesia.com · WhatsApp +62 896-5264-7385 · www.mahreenindonesia.com
- Sosial: Instagram @mahreenindonesia · TikTok @mahreenindonesia · YouTube @officialmahreenindonesia · X & LinkedIn "Mahreen Indonesia"
- "#BerkaryaUntukIndonesia"
- **Kredit aset** (dari `content.ts → credits`), wajib untuk aset berlisensi CC BY / CC BY-SA.
- "Prototype oleh [Nama Peserta] untuk Creative Challenge Mahreen Indonesia Internship Batch 2."

---

## 8. Interaksi & Animasi (ringkas)
- Reveal on scroll (fade + translateY 16px, 400–600ms), stagger pada grid.
- Batik "tergambar" (stroke-dashoffset) saat masuk viewport.
- Wayang bergerak dengan gaya ayun (rotasi kecil dari titik pegangan bawah, seperti dipegang dalang), bukan gerak linear.
- Semua animasi **wajib** menghormati `prefers-reduced-motion`: intro dilewati, transisi gunungan diganti smooth scroll, 3D diganti fallback, marquee & count-up statis.
- Tanpa audio otomatis. (Opsional: tombol suara gamelan pendek *off* secara default — hanya jika ada file audio berlisensi jelas.)

## 9. Responsif
Breakpoint 360 / 768 / 1280. Tanpa scroll horizontal. Tap target ≥ 44px. Mobile: 3D → fallback, Punakawan diperkecil & hanya 1 tampil per pertanyaan, motif batik diperbesar tile-nya agar tidak "berisik".

## 10. Aksesibilitas & Kualitas
- HTML semantik, satu `h1`, `alt` untuk semua gambar bermakna, `aria-hidden` untuk ornamen batik/wayang dekoratif.
- Canvas 3D diberi `aria-label="Ilustrasi 3D Candi Borobudur"` dan `role="img"`.
- Focus ring gold-300. Intro & transisi tidak boleh menjebak fokus keyboard.
- Meta: title "Berkarya Untuk Indonesia — Mahreen Indonesia", description, Open Graph, favicon gunungan.
- Lighthouse: Performance ≥ 85 (ada 3D), Accessibility ≥ 95, Best Practices ≥ 95.
- LCP < 2,5 detik di desktop: teks hero harus tampil sebelum 3D selesai dimuat.
- Tidak ada console error.

---

## 11. Rekomendasi Sumber Aset

**Prinsip:** utamakan aset yang **dibuat sendiri/prosedural**; aset unduhan hanya dari sumber berlisensi jelas dan dicatat kreditnya. Agent **tidak** mengunduh aset sendiri — pemilik proyek yang mengunduh lalu menaruhnya di `public/`.

### Batik
| Opsi | Sumber | Catatan |
|---|---|---|
| ⭐ Prosedural SVG | Dibuat agent (§5.1) | Tanpa lisensi, warna sesuai palet, paling ringan. **Direkomendasikan.** |
| Vektor unduhan | Freepik / Vecteezy (cari "kawung seamless pattern", "mega mendung vector", "parang pattern svg") | Versi gratis umumnya wajib atribusi. Ubah warna ke palet. |
| Inspirasi referensi | Foto batik di Wikimedia Commons | Untuk acuan bentuk motif, bukan disalin mentah. |

### Candi Borobudur 3D
| Opsi | Sumber | Catatan |
|---|---|---|
| ⭐ Prosedural Three.js | Dibuat agent (§5.2 Opsi A) | Default. Ringan, bebas lisensi. |
| Low-poly .glb | Sketchfab — "Borobudur temple" oleh giga (@gits3d): https://sketchfab.com/3d-models/borobudur-temple-84525b2dc4094057ab33e026eb961371 | Low-poly, dibuat di Blender, unduhan ±2 MB, lisensi **CC BY** (wajib kredit). Paling cocok bila memilih Opsi B. |
| Model scan detail | Sketchfab — "Borobudur" oleh megalitharchive: https://sketchfab.com/3d-models/borobudur-7ee4b8b3ab794eec9ca26aa35e40cbbb | CC BY, tetapi ±659 ribu triangle → **terlalu berat** untuk web tanpa decimation besar. Tidak disarankan. |
| Hindari | Model berlisensi **NonCommercial/NoDerivs** atau berbayar tanpa lisensi jelas | NoDerivs tidak boleh dimodifikasi (padahal kita mengganti material). |

Daftar lengkap: https://sketchfab.com/tags/borobudur — selalu cek label lisensi di halaman model sebelum mengunduh.

### Wayang (Gunungan & Punakawan)
| Opsi | Sumber | Catatan |
|---|---|---|
| Foto gunungan CC0 | Wikimedia Commons — "Wayang Kulit; Kayonan (tree of life), Arjuna and Sumbadra from Java": https://commons.wikimedia.org/wiki/File:Wayang_Kulit;_Kayonan_(tree_of_life),_Arjuna_and_Sumbadra_from_Java.JPG | Lisensi **CC0** (domain publik) → aman untuk dijadikan siluet. |
| Koleksi gunungan | https://commons.wikimedia.org/wiki/Category:Gunungan_(wayang) | Berisi puluhan file, termasuk ilustrasi dari "Album wayang kulit banjar". Cek lisensi per file. |
| Koleksi wayang kulit (termasuk Punakawan) | https://commons.wikimedia.org/wiki/Category:Wayang_kulit | Cek lisensi per file. File **CC BY-SA** → hasil turunannya juga harus CC BY-SA + kredit. |
| Vektor siap pakai | Freepik / Vecteezy (cari "wayang silhouette", "gunungan vector", "punakawan vector") | Umumnya wajib atribusi pada versi gratis. |

**Cara mengubah foto wayang menjadi siluet SVG:**
1. Hapus latar (remove.bg atau Photoshop/GIMP).
2. Vektorisasi: **Inkscape → Path → Trace Bitmap** (mode *Brightness cutoff*, satu warna), atau vectorizer online.
3. Sederhanakan path (Inkscape *Simplify*, atau SVGOMG) → target ≤ 30 KB per file.
4. Isi warna `currentColor` agar bisa diwarnai lewat CSS (charcoal-950 / gold-500).
5. Simpan: `public/wayang/gunungan.svg`, `semar.svg`, `gareng.svg`, `petruk.svg`, `bagong.svg`.

**Fallback bila aset wayang belum siap:** agent membuat siluet gunungan sederhana dari SVG path (bentuk daun/gunung lancip dengan pola tatahan titik-titik) dan placeholder siluet untuk Punakawan, dengan komentar `TODO: ganti dengan aset final`.

### Kepekaan budaya (wajib dipatuhi)
- Borobudur adalah Situs Warisan Dunia UNESCO dan tempat ibadah umat Buddha: tampilkan dengan hormat — **tidak** dijadikan karakter lucu, tidak dipotong/dirusak dalam animasi, tidak ditempeli teks promosi di atas stupa.
- Wayang & batik ditampilkan sebagai warisan budaya bangsa secara netral, sesuai ketentuan lomba (bebas unsur SARA).
- Semua kredit aset tercantum di footer dan README.

---

## 12. Urutan Pengerjaan (prioritas atas → bawah)

1. Setup Vite + React + TS + Tailwind, token warna & font, layout dasar.
2. Navbar, Hero (teks dulu), Ticker, Footer.
3. **BatikPattern** (kawung, parang, mega mendung) + BatikDivider.
4. Ekosistem (data + filter + modal).
5. Kuis + komponen Kelir (dengan placeholder wayang dulu).
6. Journey, Dampak, Open Call, FAQ, Dinding Karya.
7. **Borobudur 3D prosedural** + fallback + lazy load.
8. **IntroGunungan** & **GununganTransition**.
9. Ganti placeholder wayang dengan aset SVG final.
10. Reduced motion, responsif, aksesibilitas, audit performa.
11. Audit proporsi warna 60/30/10 (screenshot full page).
12. Build & deploy; cek link publik tanpa login.

> Jika waktu mepet: langkah 1–7 wajib. Langkah 8–9 adalah nilai tambah kreativitas terbesar, kerjakan sebelum polish minor.

## 13. Definition of Done
- [ ] Semua section §7 tampil dan berfungsi di desktop & mobile.
- [ ] Batik tampil di hero, ticker, kartu, dampak, dan footer tanpa mengganggu keterbacaan.
- [ ] Borobudur 3D berjalan halus (≥ 50 fps di laptop biasa), fallback muncul di mobile/reduced motion/tanpa WebGL.
- [ ] Intro gunungan tampil sekali per sesi dan bisa dilewati; transisi gunungan aktif saat klik menu.
- [ ] Kuis dengan Punakawan menghasilkan rekomendasi konsisten.
- [ ] Dinding Karya tetap ada setelah reload.
- [ ] Proporsi warna ±60/30/10; tidak ada teks cream/putih di atas gold.
- [ ] Kredit semua aset berlisensi tercantum di footer & README.
- [ ] `npm run build` sukses; tidak ada console error; deploy publik berhasil.
- [ ] README: cara menjalankan, struktur folder, cara mengganti konten & aset, daftar "Keputusan Desain".

---

## 14. Prompt Pembuka untuk Agent

> Baca seluruh file `BRIEF_Website_Mahreen_BerkaryaUntukIndonesia.md`. Bangun landing page single-page sesuai spesifikasi, ikuti urutan §12. Buat motif batik dan Borobudur secara prosedural (SVG & Three.js) — jangan mengunduh aset dari internet. Untuk wayang, gunakan file di `public/wayang/` bila ada; jika belum, buat placeholder siluet dan tandai `TODO`. Setelah setiap tahap, jalankan dev server dan pastikan tidak ada error sebelum lanjut. Jangan menambah fitur di luar brief. Keputusan yang ambigu: pilih opsi paling sederhana dan catat di README bagian "Keputusan Desain".

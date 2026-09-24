export type EcosystemUnit = {
  id: 'internship' | 'newsroom' | 'tanya' | 'studio' | 'peduli' | 'csr';
  name: string;
  category: 'Belajar' | 'Berkarya' | 'Berdampak';
  tagline: string;
  forYouIf: string;
  whatYouCanDo: string[];
  icon: string; // lucide icon name
  ctaLabel: string;
  ctaHref: string;
  highlightText: string;
};

export const ECOSYSTEM_UNITS: EcosystemUnit[] = [
  {
    id: 'internship',
    name: 'Mahreen Indonesia Internship',
    category: 'Belajar',
    tagline: 'Program magang berbasis proyek nyata & mentorship intensif',
    forYouIf: 'Mahasiswa atau fresh graduate yang ingin mengasah skill industri, memperkaya portofolio, dan bekerja langsung dalam ekosistem profesional.',
    whatYouCanDo: [
      'Menangani proyek riil dari klien dan inisiatif internal',
      'Mentorship 1-on-1 bersama praktisi industri berpengalaman',
      'Networking bersama talenta muda berprestasi se-Indonesia',
      'Sertifikasi & rekomendasi karier profesional'
    ],
    icon: 'GraduationCap',
    ctaLabel: 'Daftar Internship Batch 2',
    ctaHref: 'https://mahreenindonesia.com/internship',
    highlightText: 'Batch 2 Resmi Dibuka'
  },
  {
    id: 'newsroom',
    name: 'Newsroom (Newsroom Lab)',
    category: 'Belajar',
    tagline: 'Kanal riset, insight industri, webinar & literasi digital',
    forYouIf: 'Generasi muda yang haus ilmu, suka menulis, mengamati tren industri kreatif, dan ingin wawasannya selalu terdepan.',
    whatYouCanDo: [
      'Membaca & menulis artikel analitis mendalam seputar tren teknologi',
      'Mengikuti webinar dan workshop bulanan bersama pembicara ahli',
      'Riset studi kasus inovasi sosial dan digital di Indonesia',
      'Bergabung dalam forum diskusi literasi anak muda'
    ],
    icon: 'Newspaper',
    ctaLabel: 'Baca Newsroom',
    ctaHref: 'https://mahreenindonesia.com/newsroom',
    highlightText: 'Riset & Insight Terkini'
  },
  {
    id: 'tanya',
    name: 'Tanya Mahreen',
    category: 'Berkarya',
    tagline: 'Agensi solusi digital: Website, Branding, Sosmed & Ads',
    forYouIf: 'Kamu yang memiliki keahlian coding, desain grafis, copywriting, atau digital ads untuk membangun solusi bisnis bernilai tinggi.',
    whatYouCanDo: [
      'Pengembangan website modern, responsif, dan SEO friendly',
      'Desain identitas brand, visual guidelines, dan packaging',
      'Manajemen media sosial & kampanye periklanan performa tinggi',
      'Produksi konten multimedia kreatif untuk brand terkemuka'
    ],
    icon: 'Sparkles',
    ctaLabel: 'Konsultasi Layanan',
    ctaHref: 'https://mahreenindonesia.com/tanya-mahreen',
    highlightText: 'Solusi Digital Terpadu'
  },
  {
    id: 'studio',
    name: 'Mahreen Studio',
    category: 'Berkarya',
    tagline: 'Eksplorasi merchandise, fashion & lifestyle anak muda',
    forYouIf: 'Kreator visual, desainer mode, dan penggiat lifestyle yang ingin mengekspresikan identitas generasi muda lewat produk fisik.',
    whatYouCanDo: [
      'Merancang desain merchandise eksklusif dan aparel tematik',
      'Eksplorasi material ramah lingkungan dan kearifan lokal Nusantara',
      'Distribusi produk kreatif ke komunitas nasional',
      'Kolaborasi kreatif lintas desainer muda berbakat'
    ],
    icon: 'Palette',
    ctaLabel: 'Koleksi Studio',
    ctaHref: 'https://mahreenindonesia.com/studio',
    highlightText: 'Karya Lifestyle & Desain'
  },
  {
    id: 'peduli',
    name: 'Peduli Mahreen',
    category: 'Berdampak',
    tagline: 'Pendidikan inklusif lewat program Kelas Inspirasi & Donasi',
    forYouIf: 'Kamu yang terpanggil mengajar, berbagi inspirasi ke pelosok, dan ingin berkontribusi langsung pada pemerataan pendidikan.',
    whatYouCanDo: [
      'Menjadi fasilitator relawan di Kelas Inspirasi sekolah dasar',
      'Penggalangan dan penyaluran beasiswa serta buku untuk anak daerah',
      'Pendampingan karakter dan keterampilan abad 21 untuk siswa',
      'Transparansi pelaporan penyaluran donasi sosial'
    ],
    icon: 'HeartHandshake',
    ctaLabel: 'Dukung Peduli Mahreen',
    ctaHref: 'https://mahreenindonesia.com/peduli',
    highlightText: 'Inspirasi untuk Negeri'
  },
  {
    id: 'csr',
    name: 'Mahreen CSR',
    category: 'Berdampak',
    tagline: 'Reboisasi, Learning Center & kolaborasi keberlanjutan',
    forYouIf: 'Pejuang keberlanjutan lingkungan dan pemberdayaan masyarakat yang ingin melihat aksi nyata berdampak panjang.',
    whatYouCanDo: [
      'Gerakan penanaman 10.000 bibit pohon di lahan kritis',
      'Pembangunan fasilitas Learning Center untuk warga komunitas',
      'Kolaborasi strategis ESG bersama mitra korporasi dan pemda',
      'Edukasi pengelolaan sampah dan energi terbarukan komunitas'
    ],
    icon: 'Trees',
    ctaLabel: 'Ikuti Program CSR',
    ctaHref: 'https://mahreenindonesia.com/csr',
    highlightText: 'Keberlanjutan Nyata'
  }
];

export type PunakawanId = 'semar' | 'gareng' | 'petruk' | 'bagong';

export interface PunakawanInfo {
  id: PunakawanId;
  name: string;
  trait: string;
  speech: string;
  avatarColor: string;
}

export const PUNAKAWAN: Record<PunakawanId, PunakawanInfo> = {
  semar: {
    id: 'semar',
    name: 'Kyai Semar',
    trait: 'Sang Pamomong Bijaksana',
    speech: 'Ngger, apa yang paling ingin kamu raih saat ini? Mulailah dari niat yang lurus.',
    avatarColor: '#C9A96E'
  },
  gareng: {
    id: 'gareng',
    name: 'Nala Gareng',
    trait: 'Kritis & Penuh Semangat',
    speech: 'Bidang apa yang bikin api semangatmu paling menyala berkobar?',
    avatarColor: '#D6BC8A'
  },
  petruk: {
    id: 'petruk',
    name: 'Petruk Kantong Bolong',
    trait: 'Cerdik & Suka Eksplorasi',
    speech: 'Kamu lebih suka gaya kerja dan petualangan yang seperti apa, kawan?',
    avatarColor: '#E3CFA6'
  },
  bagong: {
    id: 'bagong',
    name: 'Bagong',
    trait: 'Jujur & Tangkas',
    speech: 'Nah, jujur saja ya, berapa banyak waktu luang yang bisa kamu sediakan?',
    avatarColor: '#C9A96E'
  }
};

export interface QuizOption {
  id: string;
  label: string;
  desc?: string;
  unitScores: Record<string, number>;
}

export interface QuizQuestion {
  id: number;
  punakawanId: PunakawanId;
  question: string;
  balloon: string;
  options: QuizOption[];
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    punakawanId: 'semar',
    question: 'Saat ini kamu paling ingin…',
    balloon: 'Ngger, apa yang ingin kamu raih untuk langkah pertamamu?',
    options: [
      {
        id: 'q1-1',
        label: 'Belajar skill baru & wawasan industri terkini',
        desc: 'Fokus menimba ilmu dan mengasah kapabilitas diri',
        unitScores: { internship: 2, newsroom: 3 }
      },
      {
        id: 'q1-2',
        label: 'Bikin karya nyata & portofolio profesional',
        desc: 'Menciptakan produk digital atau desain bernilai tinggi',
        unitScores: { tanya: 3, studio: 2 }
      },
      {
        id: 'q1-3',
        label: 'Bantu sesama & berkontribusi sosial',
        desc: 'Berbagi manfaat langsung ke masyarakat dan lingkungan',
        unitScores: { peduli: 3, csr: 3 }
      },
      {
        id: 'q1-4',
        label: 'Cari pengalaman kerja & relasi tim profesional',
        desc: 'Siap menyelami dinamika kerja nyata di industri',
        unitScores: { internship: 3, tanya: 2 }
      }
    ]
  },
  {
    id: 2,
    punakawanId: 'gareng',
    question: 'Bidang apa yang paling bikin kamu semangat?',
    balloon: 'Ayo tentukan, bidang apa yang paling membuatmu berbinar?',
    options: [
      {
        id: 'q2-1',
        label: 'Teknologi & Digital (Web, Coding, AI)',
        desc: 'Mengolah logika dan teknologi untuk solusi masa depan',
        unitScores: { tanya: 3, internship: 2 }
      },
      {
        id: 'q2-2',
        label: 'Desain, Fashion & Seni Visual Kreatif',
        desc: 'Mengekspresikan estetika dan nilai lokal dalam produk',
        unitScores: { studio: 3, tanya: 2 }
      },
      {
        id: 'q2-3',
        label: 'Pendidikan, Kemanusiaan & Gerakan Sosial',
        desc: 'Mencerdaskan anak bangsa dan merawat kelestarian alam',
        unitScores: { peduli: 3, csr: 3 }
      },
      {
        id: 'q2-4',
        label: 'Bisnis, Riset, Marketing & Komunikasi',
        desc: 'Meneliti pasar, strategi kampanye, dan penulisan mendalam',
        unitScores: { newsroom: 3, tanya: 2 }
      }
    ]
  },
  {
    id: 3,
    punakawanId: 'petruk',
    question: 'Kamu lebih suka cara kerja yang bagaimana?',
    balloon: 'Setiap pendekar punya jurusnya masing-masing. Jurusmu apa?',
    options: [
      {
        id: 'q3-1',
        label: 'Membaca analitis, meriset, dan berdiskusi kritis',
        desc: 'Mendalami literatur, insight data, dan artikel bermutu',
        unitScores: { newsroom: 3, internship: 1 }
      },
      {
        id: 'q3-2',
        label: 'Mengerjakan proyek terstruktur dalam tim kolaboratif',
        desc: 'Saling bahu-membahu menuntaskan target bersama mentor',
        unitScores: { internship: 3, tanya: 2 }
      },
      {
        id: 'q3-3',
        label: 'Terjun langsung ke lapangan berinteraksi dengan warga',
        desc: 'Merasakan denyut kehidupan sosial dan mendidik siswa',
        unitScores: { peduli: 3, csr: 3 }
      },
      {
        id: 'q3-4',
        label: 'Membangun brand, meracik produk, dan memasarkannya',
        desc: 'Menghidupkan identitas visual dari konsep hingga tangan pembeli',
        unitScores: { studio: 3, tanya: 2 }
      }
    ]
  },
  {
    id: 4,
    punakawanId: 'bagong',
    question: 'Berapa banyak waktu yang bisa kamu luangkan?',
    balloon: 'Jangan ragu, kejujuran adalah bekal utama berkarya!',
    options: [
      {
        id: 'q4-1',
        label: 'Fleksibel beberapa jam per minggu (santai & berkala)',
        desc: 'Menyesuaikan jadwal kuliah sambil tetap menambah wawasan',
        unitScores: { newsroom: 3, peduli: 2 }
      },
      {
        id: 'q4-2',
        label: 'Paruh waktu teratur (10–20 jam per minggu)',
        desc: 'Fokus berkontribusi pada proyek desain atau agensi',
        unitScores: { studio: 3, tanya: 2 }
      },
      {
        id: 'q4-3',
        label: 'Penuh & intensif (Komitmen dedikasi total)',
        desc: 'Siap terjun penuh waktu untuk akselerasi karier pesat',
        unitScores: { internship: 3, csr: 2 }
      }
    ]
  }
];

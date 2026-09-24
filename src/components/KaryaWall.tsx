import React, { useState, useEffect } from 'react';
import { SEED_KARYA_POSTS } from '../data/content';
import { SectionHeading } from './ui/SectionHeading';
import { Button } from './ui/Button';
import { Toast } from './ui/Toast';
import { Sparkles, Send, Tag, User } from 'lucide-react';

export interface KaryaPost {
  id: string;
  author: string;
  category: string;
  idea: string;
  date: string;
  rotation: number;
}

export const KaryaWall: React.FC = () => {
  const [posts, setPosts] = useState<KaryaPost[]>([]);
  const [authorName, setAuthorName] = useState('');
  const [category, setCategory] = useState('Teknologi');
  const [ideaText, setIdeaText] = useState('');
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const categories = ['Teknologi', 'Desain', 'Pendidikan', 'Bisnis', 'Lingkungan', 'Sosial'];

  // Load from localStorage with fallback to seeds
  useEffect(() => {
    try {
      const stored = localStorage.getItem('mahreen_karya_wall');
      if (stored) {
        setPosts(JSON.parse(stored));
      } else {
        setPosts(SEED_KARYA_POSTS);
      }
    } catch (e) {
      setPosts(SEED_KARYA_POSTS);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!ideaText.trim()) return;

    const trimmedIdea = ideaText.trim().slice(0, 140);
    const trimmedAuthor = authorName.trim() ? authorName.trim().slice(0, 30) : 'Kreator Muda';
    // Random tilt between -2 and 2 degrees
    const randomTilt = parseFloat(((Math.random() * 4) - 2).toFixed(1));

    const todayStr = new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(new Date());

    const newPost: KaryaPost = {
      id: `karya-${Date.now()}`,
      author: trimmedAuthor,
      category,
      idea: trimmedIdea,
      date: todayStr,
      rotation: randomTilt,
    };

    const updated = [newPost, ...posts];
    setPosts(updated);

    try {
      localStorage.setItem('mahreen_karya_wall', JSON.stringify(updated));
    } catch (err) {
      // storage full or disabled
    }

    setIdeaText('');
    setAuthorName('');
    setToastMessage('Karyamu berhasil disematkan di Dinding Karya!');
    setToastOpen(true);
  };

  return (
    <section id="dinding-karya" className="relative w-full py-16 md:py-24 bg-charcoal-800">
      <Toast
        isOpen={toastOpen}
        message={toastMessage}
        onClose={() => setToastOpen(false)}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <SectionHeading
          eyebrow="DINDING KARYA GENERASI MUDA"
          title="Apa Satu Karyamu untuk Indonesia?"
          highlightWord="Satu Karyamu"
          description="Goreskan gagasan, inisiatif, atau impian karya yang ingin kamu persembahkan untuk tanah air. Setiap karya agung bermula dari satu torehan pertama."
          align="center"
        />

        {/* Input Form Card */}
        <div className="max-w-2xl mx-auto bg-charcoal-900 border border-gold-500/50 rounded-3xl p-6 sm:p-8 shadow-xl mb-14">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Name Input */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-cream-200/80 font-semibold mb-1.5 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-gold-400" />
                  <span>Nama Panggilan (Opsional)</span>
                </label>
                <input
                  type="text"
                  maxLength={30}
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="Contoh: Faqih"
                  className="w-full bg-charcoal-800 border border-charcoal-600 rounded-xl px-4 py-2.5 text-sm text-cream-100 placeholder:text-cream-200/40 focus:outline-none focus:border-gold-400 transition-colors"
                />
              </div>

              {/* Category Select */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-cream-200/80 font-semibold mb-1.5 flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-gold-400" />
                  <span>Bidang Karya</span>
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-charcoal-800 border border-charcoal-600 rounded-xl px-4 py-2.5 text-sm text-cream-100 focus:outline-none focus:border-gold-400 transition-colors cursor-pointer"
                >
                  {categories.map((c) => (
                    <option key={c} value={c} className="bg-charcoal-800 text-cream-100">
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Idea Textarea with 140 char counter */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs uppercase tracking-wider text-cream-200/80 font-semibold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                  <span>Gagasan / Ide Karyamu (Maks. 140 Karakter)</span>
                </label>
                <span
                  className={`text-xs font-mono font-medium ${
                    ideaText.length > 130 ? 'text-gold-400 font-bold' : 'text-cream-200/60'
                  }`}
                >
                  {ideaText.length}/140
                </span>
              </div>
              <textarea
                required
                maxLength={140}
                rows={3}
                value={ideaText}
                onChange={(e) => setIdeaText(e.target.value)}
                placeholder="Tuliskan ide karya nyata yang ingin kamu wujudkan untuk Indonesia..."
                className="w-full bg-charcoal-800 border border-charcoal-600 rounded-xl p-4 text-sm text-cream-100 placeholder:text-cream-200/40 focus:outline-none focus:border-gold-400 transition-colors resize-none leading-relaxed"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <span className="text-xs text-cream-200/60 italic">
                * Tersimpan di perangkatmu (prototype)
              </span>
              <Button
                type="submit"
                variant="gold"
                size="md"
                disabled={!ideaText.trim()}
                icon={<Send className="w-4 h-4" />}
              >
                Sematkan Karya
              </Button>
            </div>

          </form>
        </div>

        {/* Masonry / Grid of Mini Batik Fabric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {posts.map((post) => (
            <div
              key={post.id}
              style={{ transform: `rotate(${post.rotation}deg)` }}
              className="group relative bg-cream-100 border-2 border-charcoal-900 rounded-2xl p-6 text-charcoal-950 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex flex-col justify-between overflow-hidden"
            >
              {/* Top Mini Kawung Fabric Border Motif */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-gold-600 via-gold-400 to-gold-600 opacity-90 border-b border-charcoal-950/20" />

              <div>
                {/* Meta Header */}
                <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-charcoal-700 mb-3 pt-2">
                  <span className="px-2 py-0.5 rounded bg-charcoal-950 text-gold-400 font-mono text-[10px]">
                    {post.category}
                  </span>
                  <span className="text-[11px] text-charcoal-600">{post.date}</span>
                </div>

                {/* Pure text rendering for security */}
                <p className="font-serif text-lg font-bold text-charcoal-950 leading-snug">
                  "{post.idea}"
                </p>
              </div>

              {/* Author footer */}
              <div className="mt-6 pt-3 border-t border-charcoal-950/15 flex items-center justify-between text-xs text-charcoal-800">
                <span className="font-bold">— {post.author}</span>
                <span className="text-gold-700 text-[10px] tracking-wider uppercase font-semibold">
                  #BerkaryaUntukIndonesia
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

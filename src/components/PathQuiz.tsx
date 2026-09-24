import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Kelir } from './wayang/Kelir';
import { WayangSilhouette } from './wayang/WayangSilhouette';
import { QUIZ_QUESTIONS, PUNAKAWAN, PunakawanId } from '../data/quiz';
import { ECOSYSTEM_UNITS, EcosystemUnit } from '../data/ecosystem';
import { SectionHeading } from './ui/SectionHeading';
import { Button } from './ui/Button';
import { Toast } from './ui/Toast';
import { RotateCcw, Share2, Sparkles, Check, ArrowRight } from 'lucide-react';

export const PathQuiz: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [unitScores, setUnitScores] = useState<Record<string, number>>({
    internship: 0,
    newsroom: 0,
    tanya: 0,
    studio: 0,
    peduli: 0,
    csr: 0,
  });
  const [isFinished, setIsFinished] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isToastOpen, setIsToastOpen] = useState(false);

  const currentQ = QUIZ_QUESTIONS[currentStep];
  const activePunakawan = currentQ ? PUNAKAWAN[currentQ.punakawanId] : null;

  // Handle option select
  const handleSelectOption = (optionId: string, scores: Record<string, number>) => {
    setSelectedAnswers((prev) => ({ ...prev, [currentStep]: optionId }));

    // Accumulate scores
    const updatedScores = { ...unitScores };
    Object.entries(scores).forEach(([unit, pts]) => {
      updatedScores[unit] = (updatedScores[unit] || 0) + pts;
    });
    setUnitScores(updatedScores);

    // Advance or Finish
    if (currentStep < QUIZ_QUESTIONS.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setIsFinished(true);
      // Trigger festive confetti
      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#C9A96E', '#171412', '#F5EEDF', '#D6BC8A'],
        });
      } catch (e) {
        // ignore if canvas not supported
      }
    }
  };

  // Determine result units
  const sortedUnits = Object.entries(unitScores)
    .sort((a, b) => b[1] - a[1])
    .map(([id]) => ECOSYSTEM_UNITS.find((u) => u.id === id)!)
    .filter(Boolean);

  const topUnit: EcosystemUnit = sortedUnits[0] || ECOSYSTEM_UNITS[0];
  const secondaryUnit: EcosystemUnit = sortedUnits[1] || ECOSYSTEM_UNITS[1];

  const handleRestart = () => {
    setCurrentStep(0);
    setSelectedAnswers({});
    setUnitScores({
      internship: 0,
      newsroom: 0,
      tanya: 0,
      studio: 0,
      peduli: 0,
      csr: 0,
    });
    setIsFinished(false);
  };

  const handleCopyShare = () => {
    const text = `Jalur karyaku di Mahreen: ${topUnit.name} ✦ #BerkaryaUntukIndonesia @mahreenindonesia`;
    navigator.clipboard.writeText(text);
    setToastMessage('Teks hasil kuis berhasil disalin ke clipboard!');
    setIsToastOpen(true);
  };

  return (
    <Kelir id="kuis">
      {/* Toast Feedback */}
      <Toast
        isOpen={isToastOpen}
        message={toastMessage}
        onClose={() => setIsToastOpen(false)}
      />

      {/* Header with light theme since Kelir background is gold-500 */}
      <SectionHeading
        theme="light"
        eyebrow="PANDUAN PUNAKAWAN"
        title="Temukan Jalur Karyamu"
        highlightWord="Jalur Karyamu"
        description="Empat Punakawan bijak hadir mendampingi langkahmu. Jawab 4 pertanyaan singkat untuk menemukan gerbang karya yang paling pas dengan potensimu."
        align="center"
      />

      {!isFinished ? (
        <div className="relative mt-8">
          
          {/* Stepper with Kawung Emblem (1 - 2 - 3 - 4) */}
          <div className="flex items-center justify-center gap-2 sm:gap-4 mb-10">
            {QUIZ_QUESTIONS.map((q, idx) => {
              const isPast = idx < currentStep;
              const isCurrent = idx === currentStep;
              return (
                <div key={q.id} className="flex items-center">
                  <div
                    className={`flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 rounded-full font-bold text-xs sm:text-sm border-2 transition-all ${
                      isCurrent
                        ? 'bg-charcoal-950 text-gold-400 border-charcoal-950 shadow-md scale-110'
                        : isPast
                        ? 'bg-gold-600 text-charcoal-950 border-charcoal-950/60'
                        : 'bg-gold-400/40 text-charcoal-900/60 border-charcoal-950/20'
                    }`}
                  >
                    {isPast ? <Check className="w-4 h-4" /> : `0${idx + 1}`}
                  </div>
                  {idx < QUIZ_QUESTIONS.length - 1 && (
                    <div
                      className={`w-6 sm:w-12 h-0.5 mx-1 transition-all ${
                        isPast ? 'bg-charcoal-950' : 'bg-charcoal-950/20'
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* Main Quiz Interactive Box */}
          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-gold-400/30 border border-gold-600/40 rounded-3xl p-6 sm:p-10 backdrop-blur-sm shadow-xl">
            
            {/* Left: Active Punakawan Mascot & Speech Balloon (5 cols) */}
            <div className="lg:col-span-5 flex flex-col items-center text-center">
              
              {/* Dialogue Speech Balloon */}
              <div className="relative bg-cream-50 border-2 border-charcoal-950 text-charcoal-950 px-5 py-4 rounded-2xl shadow-md max-w-sm mb-6 animate-in zoom-in-95 duration-300">
                <span className="block text-[11px] font-bold uppercase tracking-wider text-gold-700">
                  {activePunakawan?.name} ({activePunakawan?.trait})
                </span>
                <p className="font-caveat text-xl sm:text-2xl mt-1 leading-snug font-bold">
                  "{currentQ.balloon}"
                </p>
                {/* Speech arrow */}
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[12px] border-t-cream-50" />
              </div>

              {/* Wayang Silhouette of current Punakawan */}
              <div className="h-56 sm:h-64 flex items-end justify-center">
                <WayangSilhouette
                  figure={currentQ.punakawanId as any}
                  color="charcoal"
                  height={220}
                  shadowEffect={true}
                />
              </div>
            </div>

            {/* Right: Question & Selectable Options (7 cols) */}
            <div className="lg:col-span-7 flex flex-col">
              <span className="text-xs uppercase tracking-widest font-bold text-charcoal-800 mb-2">
                Pertanyaan {currentStep + 1} dari 4
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal-950 mb-6">
                {currentQ.question}
              </h3>

              <div className="flex flex-col gap-3.5">
                {currentQ.options.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleSelectOption(option.id, option.unitScores)}
                    aria-pressed={selectedAnswers[currentStep] === option.id}
                    className="w-full text-left p-4 sm:p-5 rounded-2xl bg-cream-100 hover:bg-cream-50 border-2 border-charcoal-950/20 hover:border-charcoal-950 text-charcoal-950 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg active:scale-[0.99] cursor-pointer group flex items-center justify-between"
                  >
                    <div>
                      <span className="font-bold text-base sm:text-lg block group-hover:text-gold-700 transition-colors">
                        {option.label}
                      </span>
                      {option.desc && (
                        <span className="text-xs sm:text-sm text-charcoal-800/80 font-normal mt-0.5 block">
                          {option.desc}
                        </span>
                      )}
                    </div>
                    <div className="w-8 h-8 rounded-full border border-charcoal-950/30 flex items-center justify-center flex-shrink-0 ml-4 group-hover:bg-charcoal-950 group-hover:text-gold-400 transition-colors">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </button>
                ))}
              </div>
            </div>

          </div>

        </div>
      ) : (
        /* Result Screen: Cream-100 Card as specified in §4 & §7.6 */
        <div className="relative mt-8 max-w-3xl mx-auto">
          
          <div className="bg-cream-100 border-2 border-charcoal-950 rounded-3xl p-6 sm:p-10 shadow-2xl text-charcoal-950">
            
            {/* Top Badge */}
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500 text-charcoal-950 font-bold text-xs uppercase tracking-widest border border-charcoal-950">
                <Sparkles className="w-3.5 h-3.5" />
                Hasil Pemetaan Jalur Karyamu
              </span>
            </div>

            <h3 className="font-serif text-3xl sm:text-4xl font-bold text-center text-charcoal-950 leading-tight">
              Pintu Karyamu: <span className="text-gold-700 underline decoration-charcoal-950">{topUnit.name}</span>
            </h3>

            <p className="text-center text-sm sm:text-base text-charcoal-800 mt-3 max-w-xl mx-auto leading-relaxed">
              Berdasarkan jawabanmu, kamu memiliki potensi terbaik untuk berkembang di unit{' '}
              <strong>{topUnit.name}</strong> ({topUnit.category}).
            </p>

            {/* Why This Matches You Box */}
            <div className="mt-6 p-5 rounded-2xl bg-cream-50 border border-charcoal-950/20">
              <span className="text-xs uppercase font-bold tracking-wider text-charcoal-700 block mb-1">
                Alasan Rekomendasi:
              </span>
              <p className="text-sm text-charcoal-900 leading-relaxed">
                {topUnit.forYouIf}
              </p>
            </div>

            {/* Secondary Alternative Unit */}
            {secondaryUnit && (
              <div className="mt-4 p-4 rounded-xl bg-gold-400/20 border border-gold-600/30 flex items-center justify-between text-xs sm:text-sm">
                <div>
                  <span className="text-charcoal-700 font-medium">Jalur Alternatif Kedua:</span>
                  <span className="font-bold text-charcoal-950 ml-1.5">{secondaryUnit.name}</span>
                </div>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-charcoal-950 text-gold-400">
                  {secondaryUnit.category}
                </span>
              </div>
            )}

            {/* Punakawan Ensemble Assembly at Bottom of Result */}
            <div className="mt-8 pt-6 border-t border-charcoal-950/20 flex flex-col items-center">
              <span className="text-xs uppercase tracking-widest text-charcoal-700 font-semibold mb-4">
                Didukung Penuh oleh Empat Punakawan
              </span>
              <div className="flex items-end justify-center gap-3 sm:gap-6 h-28 sm:h-36">
                <WayangSilhouette figure="semar" color="charcoal" height={100} shadowEffect={false} />
                <WayangSilhouette figure="gareng" color="charcoal" height={85} shadowEffect={false} />
                <WayangSilhouette figure="gunungan" color="charcoal" height={130} shadowEffect={true} />
                <WayangSilhouette figure="petruk" color="charcoal" height={120} shadowEffect={false} />
                <WayangSilhouette figure="bagong" color="charcoal" height={95} shadowEffect={false} />
              </div>
            </div>

            {/* Action Buttons: Copy, Detail, Restart */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Button
                variant="charcoal"
                size="md"
                onClick={handleCopyShare}
                icon={<Share2 className="w-4 h-4 text-gold-400" />}
              >
                Salin & Bagikan Hasil
              </Button>
              <Button
                variant="gold"
                size="md"
                onClick={() => window.open(topUnit.ctaHref, '_blank')}
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Lihat Detail {topUnit.name}
              </Button>
              <Button
                variant="ghost"
                size="md"
                onClick={handleRestart}
                className="text-charcoal-950 hover:text-charcoal-800"
                icon={<RotateCcw className="w-4 h-4" />}
              >
                Ulangi Kuis
              </Button>
            </div>

          </div>

        </div>
      )}
    </Kelir>
  );
};

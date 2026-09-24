import React, { useState, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { IntroGunungan } from './components/IntroGunungan';
import { GununganTransition } from './components/GununganTransition';
import { Hero } from './components/Hero';
import { Ticker } from './components/Ticker';
import { Problem } from './components/Problem';
import { Ecosystem } from './components/Ecosystem';
import { PathQuiz } from './components/PathQuiz';
import { Journey } from './components/Journey';
import { ImpactStats } from './components/ImpactStats';
import { KaryaWall } from './components/KaryaWall';
import { OpenCall } from './components/OpenCall';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const [isIntroFinished, setIsIntroFinished] = useState(false);
  const [transitionActive, setTransitionActive] = useState(false);
  const [targetSection, setTargetSection] = useState<string | null>(null);

  // Navigate with Gunungan stage transition
  const handleNavigate = useCallback((targetId: string) => {
    setTargetSection(targetId);
    setTransitionActive(true);

    // Scroll halfway through the sweeping animation
    setTimeout(() => {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 280);
  }, []);

  return (
    <div className="min-h-screen bg-charcoal-800 text-cream-100 flex flex-col selection:bg-gold-500 selection:text-charcoal-950 font-sans">
      
      {/* Intro Preloader Gunungan (§5.3a) */}
      <IntroGunungan onComplete={() => setIsIntroFinished(true)} />

      {/* Gunungan Sweeping Nav Transition (§5.3b) */}
      <GununganTransition
        isActive={transitionActive}
        onAnimationComplete={() => {
          setTransitionActive(false);
          setTargetSection(null);
        }}
      />

      {/* Sticky Navbar */}
      <Navbar onNavigate={handleNavigate} />

      {/* Main Page Sections */}
      <main className="flex-1 w-full">
        {/* 7.2 Hero Section with 3D Borobudur */}
        <Hero onNavigate={handleNavigate} />

        {/* 7.3 Ticker Section */}
        <Ticker />

        {/* 7.4 Problem & Solution */}
        <Problem />

        {/* 7.5 Ecosystem Section */}
        <Ecosystem />

        {/* 7.6 Path Quiz in Kelir Screen */}
        <PathQuiz />

        {/* 7.7 Journey Step-by-Step Borobudur Terraces */}
        <Journey onNavigate={handleNavigate} />

        {/* 7.8 Impact Stats Section */}
        <ImpactStats />

        {/* 7.9 Dinding Karya (Karya Wall) */}
        <KaryaWall />

        {/* 7.10 Open Call Internship Batch 2 */}
        <OpenCall />

        {/* 7.11 FAQ Section */}
        <FAQ />
      </main>

      {/* 7.12 Footer Section */}
      <Footer />

    </div>
  );
};

export default App;

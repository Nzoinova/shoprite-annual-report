import React, { useState, useEffect } from 'react';
import { Cover } from './components/Cover';
import { Summary } from './components/Summary';
import { Timeline } from './components/Timeline';
import { Network } from './components/Network';
import { ServiceAnalysis } from './components/ServiceAnalysis';
import { TopVehicles } from './components/TopVehicles';
import { FleetInsights } from './components/FleetInsights';
import { History } from './components/History';
import { YoY } from './components/YoY';
import { Commitments } from './components/Commitments';
import { Methodology, Footer } from './components/Footer';
import { Onboarding } from './components/Onboarding';

function getInitialTourState(): boolean {
  try { return !window.sessionStorage.getItem('nors-tour-done'); }
  catch { return true; }
}

export default function App() {
  const [lang, setLang] = useState<'en' | 'pt'>('en');
  const [activeSection, setActiveSection] = useState(0);
  const [showTour, setShowTour] = useState(getInitialTourState);

  const completeTour = () => {
    setShowTour(false);
    try { window.sessionStorage.setItem('nors-tour-done', '1'); } catch {}
  };

  // Fade-in observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    const timer = setTimeout(() => {
      document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));
    }, 100);

    return () => { clearTimeout(timer); observer.disconnect(); };
  }, []);

  const sections = [
    'sec-cover', 'sec-summary', 'sec-timeline', 'sec-units',
    'sec-services', 'sec-top10', 'sec-insights', 'sec-history', 'sec-yoy', 'sec-commitments'
  ];

  useEffect(() => {
    const handleScroll = () => {
      let active = 0;
      sections.forEach((id, i) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.5) {
          active = i;
        }
      });
      setActiveSection(active);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="font-sans font-light text-off-black bg-white leading-relaxed antialiased">
      {/* Language Toggle */}
      <div className="fixed top-5 right-5 z-[1000] flex border border-dark-gray/50 rounded-sm overflow-hidden bg-black/60 backdrop-blur-md shadow-lg">
        <button
          className={`px-3.5 py-1.5 font-semibold text-[11px] tracking-wider transition-all duration-300 ${
            lang === 'en' ? 'bg-teal text-white' : 'bg-transparent text-med-light-gray hover:text-white'
          }`}
          onClick={() => setLang('en')}
        >
          EN
        </button>
        <button
          className={`px-3.5 py-1.5 font-semibold text-[11px] tracking-wider transition-all duration-300 ${
            lang === 'pt' ? 'bg-teal text-white' : 'bg-transparent text-med-light-gray hover:text-white'
          }`}
          onClick={() => setLang('pt')}
        >
          PT
        </button>
      </div>

      {/* Nav Dots */}
      <nav className="fixed right-5 top-1/2 -translate-y-1/2 z-[999] hidden md:flex flex-col gap-2.5">
        {sections.map((id, i) => (
          <button
            key={id}
            className={`w-2 h-2 rounded-full transition-all duration-300 hover:scale-150 ${
              activeSection === i ? 'bg-teal scale-150 shadow-md' : 'bg-med-light-gray/50 hover:bg-dark-gray'
            }`}
            onClick={() => scrollToSection(id)}
            aria-label={`Go to section ${i + 1}`}
          />
        ))}
      </nav>

      {/* Tour help button — bottom right */}
      {!showTour && (
        <button
          onClick={() => setShowTour(true)}
          className="fixed bottom-5 right-5 z-[997] w-10 h-10 rounded-full bg-[#415A67] text-white flex items-center justify-center shadow-lg hover:bg-[#344a56] transition-colors"
          title={lang === 'en' ? 'Restart guide' : 'Reiniciar guia'}
        >
          <span className="font-bold text-sm">?</span>
        </button>
      )}

      {/* Onboarding tour */}
      {showTour && <Onboarding lang={lang} onComplete={completeTour} />}

      <Cover lang={lang} />
      <Summary lang={lang} />
      <Timeline lang={lang} />
      <Network lang={lang} />
      <ServiceAnalysis lang={lang} />
      <TopVehicles lang={lang} />
      <FleetInsights lang={lang} />
      <History lang={lang} />
      <YoY lang={lang} />
      <Commitments lang={lang} />
      <Methodology lang={lang} />
      <Footer />
    </div>
  );
}

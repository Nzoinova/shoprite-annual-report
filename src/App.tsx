import React, { useState, useEffect } from 'react';
import { Cover } from './components/Cover';
import { Summary } from './components/Summary';
import { Timeline } from './components/Timeline';
import { Network } from './components/Network';
import { ServiceAnalysis } from './components/ServiceAnalysis';
import { TopVehicles } from './components/TopVehicles';
import { History } from './components/History';
import { YoY } from './components/YoY';
import { Commitments } from './components/Commitments';
import { Methodology, Footer } from './components/Footer';
import { useFadeIn } from './components/FadeIn';

export default function App() {
  const [lang, setLang] = useState<'en' | 'pt'>('pt');
  const [activeSection, setActiveSection] = useState(0);
  
  useFadeIn();

  const sections = [
    'sec-cover', 'sec-summary', 'sec-timeline', 'sec-units', 
    'sec-services', 'sec-top10', 'sec-history', 'sec-yoy', 'sec-commitments'
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

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="font-sans font-light text-off-black bg-white leading-relaxed antialiased">
      {/* Language Toggle */}
      <div className="fixed top-5 right-5 z-[1000] flex border border-med-dark-gray rounded overflow-hidden bg-white/10 backdrop-blur-sm">
        <button 
          className={`px-3.5 py-1.5 font-semibold text-xs tracking-wide transition-colors ${lang === 'en' ? 'bg-teal text-white' : 'bg-transparent text-med-light-gray hover:text-white'}`}
          onClick={() => setLang('en')}
        >
          EN
        </button>
        <button 
          className={`px-3.5 py-1.5 font-semibold text-xs tracking-wide transition-colors ${lang === 'pt' ? 'bg-teal text-white' : 'bg-transparent text-med-light-gray hover:text-white'}`}
          onClick={() => setLang('pt')}
        >
          PT
        </button>
      </div>

      {/* Nav Dots */}
      <div className="fixed right-5 top-1/2 -translate-y-1/2 z-[999] flex flex-col gap-2.5 hidden md:flex">
        {sections.map((id, i) => (
          <div 
            key={id}
            className={`w-2 h-2 rounded-full cursor-pointer transition-all duration-300 ${activeSection === i ? 'bg-teal scale-150' : 'bg-med-light-gray hover:bg-dark-gray'}`}
            onClick={() => scrollToSection(id)}
          />
        ))}
      </div>

      <Cover lang={lang} />
      <Summary lang={lang} />
      <Timeline lang={lang} />
      <Network lang={lang} />
      <ServiceAnalysis lang={lang} />
      <TopVehicles lang={lang} />
      <History lang={lang} />
      <YoY lang={lang} />
      <Commitments lang={lang} />
      <Methodology lang={lang} />
      <Footer />
    </div>
  );
}


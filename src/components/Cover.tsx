import React from 'react';

export function Cover({ lang }: { lang: 'en' | 'pt' }) {
  return (
    <div id="sec-cover" className="min-h-screen bg-black text-white flex flex-col justify-center px-6 py-10 md:px-20 md:py-16 relative overflow-hidden">
      <div 
        className="absolute -top-[20%] -right-[10%] w-[60vw] h-[60vw] opacity-60 text-[60vw] leading-none pointer-events-none"
        style={{ background: 'linear-gradient(25deg, var(--color-off-black) 0%, transparent 70%)' }}
      />
      <div className="absolute top-10 left-6 md:left-15 font-extrabold text-2xl tracking-tight text-white z-10">
        NORS
      </div>
      <div className="font-extrabold text-[clamp(80px,12vw,160px)] tracking-tighter leading-[0.9] text-white relative z-10">
        2025
      </div>
      <div className="font-extrabold text-[clamp(28px,4vw,52px)] tracking-tight leading-[1.1] mt-5 relative z-10">
        {lang === 'en' ? (
          <>Annual Service<br/>Report</>
        ) : (
          <>Relatório Anual<br/>de Serviços</>
        )}
      </div>
      <div className="font-light text-[clamp(14px,1.8vw,20px)] text-med-light-gray mt-4 relative z-10">
        NORS Trucks and Buses Angola VT &mdash; Shoprite
      </div>
      <div className="inline-block mt-8 px-5 py-2 border border-dark-gray text-sky font-semibold text-sm tracking-widest uppercase relative z-10 self-start">
        {lang === 'en' ? 'January 2025 — February 2026' : 'Janeiro 2025 — Fevereiro 2026'}
      </div>
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-med-dark-gray text-xs uppercase tracking-widest animate-bounce-custom">
        {lang === 'en' ? 'Scroll to explore ↓' : 'Deslize para explorar ↓'}
      </div>
    </div>
  );
}

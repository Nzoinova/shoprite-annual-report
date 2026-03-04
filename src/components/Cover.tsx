import React from 'react';
import { ChevronDown } from 'lucide-react';

export function Cover({ lang }: { lang: 'en' | 'pt' }) {
  return (
    <div id="sec-cover" className="min-h-screen bg-black text-white flex flex-col justify-between px-6 py-10 md:px-20 md:py-16 relative overflow-hidden">
      {/* Hero truck image — right side */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-full h-full">
          <img
            src={`${import.meta.env.BASE_URL}fmx-hero.png`}
            alt=""
            className="absolute top-1/2 right-0 -translate-y-1/2 w-[65%] md:w-[55%] h-auto object-contain opacity-40 md:opacity-50"
            style={{ maxHeight: '90vh' }}
          />
          {/* Gradient overlays to blend truck into black */}
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(to right, #000 25%, transparent 55%)'
          }} />
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(to top, #000 5%, transparent 40%)'
          }} />
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(to bottom, #000 2%, transparent 30%)'
          }} />
        </div>
      </div>

      {/* Subtle ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[70vw] h-[70vh] opacity-[0.06]"
          style={{ background: 'radial-gradient(ellipse at top right, #9CC7DE, transparent 70%)' }} />
        <div className="absolute bottom-0 left-0 w-[50vw] h-[40vh] opacity-[0.03]"
          style={{ background: 'radial-gradient(ellipse at bottom left, #415A67, transparent 60%)' }} />
      </div>

      {/* Top: Logo — bigger */}
      <div className="relative z-10 flex items-center justify-between">
        <img
          src={`${import.meta.env.BASE_URL}nors-logo-white.png`}
          alt="NORS"
          className="h-10 md:h-14 lg:h-16 object-contain brightness-0 invert"
        />
        <div className="text-[10px] md:text-xs font-light tracking-[3px] uppercase text-med-dark-gray">
          {lang === 'en' ? 'Annual Report' : 'Relatório Anual'}
        </div>
      </div>

      {/* Center: Main content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center">
        <div className="font-extrabold text-[clamp(90px,14vw,180px)] tracking-tighter leading-[0.85] text-white">
          2025
        </div>
        <div className="font-extrabold text-[clamp(30px,4.5vw,56px)] tracking-tight leading-[1.05] mt-4">
          {lang === 'en' ? (
            <>Annual Service<br/>Report</>
          ) : (
            <>Relatório Anual<br/>de Serviços</>
          )}
        </div>
        <div className="font-light text-[clamp(13px,1.6vw,18px)] text-med-light-gray mt-4 max-w-lg leading-relaxed">
          NORS Trucks and Buses Angola VT — Shoprite
        </div>
        <div className="flex items-center gap-4 mt-8">
          <div className="px-5 py-2.5 border border-dark-gray text-sky font-semibold text-xs tracking-[2px] uppercase">
            {lang === 'en' ? 'Jan 2025 — Feb 2026' : 'Jan 2025 — Fev 2026'}
          </div>
          <div className="flex items-center gap-2 text-med-dark-gray text-xs font-light">
            <div className="w-1.5 h-1.5 rounded-full bg-sky animate-pulse" />
            345 {lang === 'en' ? 'interventions' : 'intervenções'}
          </div>
        </div>
      </div>

      {/* Bottom: Tagline + scroll indicator */}
      <div className="relative z-10 flex items-end justify-between">
        <div className="text-med-dark-gray">
          <div className="font-extrabold text-lg md:text-xl tracking-tight">Making it work.</div>
          <div className="font-light text-xs tracking-wide mt-0.5">Fazer acontecer.</div>
        </div>
        <div className="flex flex-col items-center text-med-dark-gray">
          <span className="text-[10px] uppercase tracking-[2px] mb-1">
            {lang === 'en' ? 'Scroll' : 'Deslize'}
          </span>
          <ChevronDown size={18} className="animate-bounce" />
        </div>
      </div>
    </div>
  );
}

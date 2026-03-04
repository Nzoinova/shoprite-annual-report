import React from 'react';
import { Database, Calendar, Layers, FileText } from 'lucide-react';

export function Methodology({ lang }: { lang: 'en' | 'pt' }) {
  return (
    <section id="sec-method" className="py-12 px-6 md:px-15 max-w-6xl mx-auto fade-in">
      <div className="font-light text-[11px] tracking-[3px] uppercase text-teal mb-4">
        {lang === 'en' ? 'Methodological Note' : 'Nota Metodológica'}
      </div>
      <div className="grid md:grid-cols-2 gap-4 text-xs text-dark-gray font-light leading-relaxed">
        <div className="flex gap-2">
          <Database size={14} className="text-med-light-gray flex-shrink-0 mt-0.5" />
          <span>{lang === 'en'
            ? 'Data extracted from Microsoft Lists service management platform.'
            : 'Dados extraídos da plataforma Microsoft Lists de gestão de serviços.'}</span>
        </div>
        <div className="flex gap-2">
          <Calendar size={14} className="text-med-light-gray flex-shrink-0 mt-0.5" />
          <span>{lang === 'en'
            ? 'Period: January 2, 2025 — February 26, 2026 (14 months).'
            : 'Período: 2 de Janeiro de 2025 — 26 de Fevereiro de 2026 (14 meses).'}</span>
        </div>
        <div className="flex gap-2">
          <Layers size={14} className="text-med-light-gray flex-shrink-0 mt-0.5" />
          <span>{lang === 'en'
            ? 'Categories grouped from detailed service descriptions. Immobilization = entry to exit date.'
            : 'Categorias agrupadas a partir de descrições de serviço. Imobilização = data entrada até saída.'}</span>
        </div>
        <div className="flex gap-2">
          <FileText size={14} className="text-med-light-gray flex-shrink-0 mt-0.5" />
          <span>{lang === 'en'
            ? '2024 baseline from previous Annual Service Report (Feb–Dec 2024, 141 interventions). Monthly averages normalized.'
            : 'Baseline 2024 do Relatório Anual anterior (Fev–Dez 2024, 141 intervenções). Médias mensais normalizadas.'}</span>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="bg-black text-white py-10 px-6 md:px-15">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src={`${import.meta.env.BASE_URL}nors-logo-white.png`}
            alt="NORS"
            className="h-6 object-contain brightness-0 invert"
          />
          <div className="text-xs text-med-dark-gray">
            Trucks and Buses Angola VT
          </div>
        </div>
        <div className="text-center md:text-right">
          <div className="font-extrabold text-sm tracking-tight">Making it work.</div>
          <div className="font-light text-[11px] text-med-dark-gray mt-0.5">
            Fazer acontecer.
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-6 pt-4 border-t border-dark-gray text-center">
        <p className="text-[10px] text-med-dark-gray">
          &copy; 2026 NORS Trucks and Buses Angola VT. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

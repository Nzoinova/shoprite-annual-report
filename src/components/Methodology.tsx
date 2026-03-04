import React from 'react';

export function Methodology({ lang }: { lang: 'en' | 'pt' }) {
  return (
    <section id="sec-method" className="py-10 px-6 md:px-15 max-w-6xl mx-auto">
      <div className="fade-in max-w-2xl">
        <div className="font-light text-[11px] tracking-[3px] uppercase text-teal mb-2">
          {lang === 'en' ? 'Methodological Note' : 'Nota Metodológica'}
        </div>
        <p className="font-light text-sm text-dark-gray leading-[1.8]">
          {lang === 'en' 
            ? 'This report is based on data extracted from our Microsoft Lists service management platform, covering all interventions recorded between January 2, 2025 and February 26, 2026. Service categories are grouped from detailed descriptions for readability. Immobilization days are calculated from entry to exit dates. The 2024 comparison uses data from the previous Annual Service Report (February–December 2024, 141 interventions).'
            : 'Este relatório baseia-se em dados extraídos da plataforma de gestão Microsoft Lists, cobrindo todas as intervenções registadas entre 2 de Janeiro de 2025 e 26 de Fevereiro de 2026. As categorias de serviço são agrupadas a partir de descrições detalhadas. Os dias de imobilização são calculados entre datas de entrada e saída. A comparação com 2024 usa dados do relatório anterior (Fevereiro–Dezembro 2024, 141 intervenções).'}
        </p>
      </div>
    </section>
  );
}

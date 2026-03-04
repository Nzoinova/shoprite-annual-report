import React from 'react';

export function Commitments({ lang }: { lang: 'en' | 'pt' }) {
  return (
    <div id="sec-commitments" className="bg-off-white py-20 px-6 md:px-15">
      <div className="max-w-6xl mx-auto">
        <div className="fade-in">
          <div className="font-light text-[11px] tracking-[3px] uppercase text-teal mb-2">
            {lang === 'en' ? 'Looking Forward' : 'Olhar em Frente'}
          </div>
          <h2 className="font-extrabold text-[clamp(28px,3.5vw,44px)] tracking-tight leading-[1.1] mb-10">
            {lang === 'en' ? 'Commitments for 2026' : 'Compromissos para 2026'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-white p-7 border-l-4 border-teal transition-transform duration-300 hover:-translate-y-1">
              <h3 className="font-extrabold text-xl tracking-tight mb-2">
                {lang === 'en' ? 'Faster Response' : 'Resposta Mais Rápida'}
              </h3>
              <p className="font-light text-sm text-dark-gray mt-2">
                {lang === 'en' 
                  ? 'Target reduction in average immobilization time through improved parts availability and diagnostic efficiency.'
                  : 'Redução alvo no tempo médio de imobilização através de melhor disponibilidade de peças e eficiência de diagnóstico.'}
              </p>
            </div>
            
            <div className="bg-white p-7 border-l-4 border-teal transition-transform duration-300 hover:-translate-y-1">
              <h3 className="font-extrabold text-xl tracking-tight mb-2">
                {lang === 'en' ? 'Proactive Maintenance' : 'Manutenção Proactiva'}
              </h3>
              <p className="font-light text-sm text-dark-gray mt-2">
                {lang === 'en' 
                  ? 'Expand preventive service ratio through scheduled fleet maintenance planning and mileage-based alerts.'
                  : 'Expandir rácio de serviços preventivos através de planeamento de manutenção e alertas por quilometragem.'}
              </p>
            </div>
            
            <div className="bg-white p-7 border-l-4 border-teal transition-transform duration-300 hover:-translate-y-1">
              <h3 className="font-extrabold text-xl tracking-tight mb-2">
                {lang === 'en' ? 'Digital Transparency' : 'Transparência Digital'}
              </h3>
              <p className="font-light text-sm text-dark-gray mt-2">
                {lang === 'en' 
                  ? 'Continue evolving real-time service tracking and digital reporting, building on the Microsoft Lists platform.'
                  : 'Continuar a evolução do acompanhamento em tempo real e relatórios digitais, com base na plataforma Microsoft Lists.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

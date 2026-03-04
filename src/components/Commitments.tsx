import React from 'react';
import { Zap, BarChart3, Monitor } from 'lucide-react';

const commitments = [
  {
    icon: 'zap',
    titleEn: 'Faster Response',
    titlePt: 'Resposta Mais Rápida',
    descEn: 'Reduce immobilization through improved parts availability, predictive stock management, and faster diagnostic workflows across all service units.',
    descPt: 'Reduzir imobilização através de melhor disponibilidade de peças, gestão preditiva de stock, e processos de diagnóstico mais rápidos em todas as unidades.',
  },
  {
    icon: 'chart',
    titleEn: 'Proactive Maintenance',
    titlePt: 'Manutenção Proactiva',
    descEn: 'Expand the preventive ratio through scheduled fleet planning, mileage-based service alerts, and proactive customer engagement for upcoming maintenance windows.',
    descPt: 'Expandir o rácio preventivo através de planeamento de frota, alertas por quilometragem, e contacto proactivo com clientes para janelas de manutenção.',
  },
  {
    icon: 'monitor',
    titleEn: 'Digital Transparency',
    titlePt: 'Transparência Digital',
    descEn: 'Continue evolving real-time fleet tracking, automated reporting, and digital service records on the Microsoft Lists platform for full operational visibility.',
    descPt: 'Evoluir o acompanhamento de frota em tempo real, relatórios automáticos e registos digitais na plataforma Microsoft Lists para visibilidade operacional total.',
  },
];

const iconMap: Record<string, React.ReactNode> = {
  zap: <Zap size={24} />,
  chart: <BarChart3 size={24} />,
  monitor: <Monitor size={24} />,
};

export function Commitments({ lang }: { lang: 'en' | 'pt' }) {
  return (
    <section id="sec-commitments" className="bg-off-white py-20 px-6 md:px-15 fade-in">
      <div className="max-w-6xl mx-auto">
        <div className="font-light text-[11px] tracking-[3px] uppercase text-teal mb-2">
          {lang === 'en' ? 'Looking Forward' : 'Olhando em Frente'}
        </div>
        <h2 className="font-extrabold text-[clamp(28px,3.5vw,44px)] tracking-tight leading-[1.1] mb-8">
          {lang === 'en' ? 'Commitments for 2026' : 'Compromissos para 2026'}
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {commitments.map((c, i) => (
            <div key={i} className="bg-white p-6 border-t-[3px] border-teal hover:shadow-lg transition-all duration-300 group">
              <div className="text-teal mb-4 group-hover:scale-110 transition-transform duration-300 inline-block">
                {iconMap[c.icon]}
              </div>
              <h3 className="font-extrabold text-base tracking-tight mb-2">
                {lang === 'en' ? c.titleEn : c.titlePt}
              </h3>
              <p className="font-light text-sm text-dark-gray leading-relaxed">
                {lang === 'en' ? c.descEn : c.descPt}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

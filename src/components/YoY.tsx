import React from 'react';
import { TrendingUp, TrendingDown, Minus, ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface Metric {
  labelEn: string;
  labelPt: string;
  v2024: string;
  v2025: string;
  change: string;
  direction: 'up' | 'down';
  positive: boolean; // is the direction good?
}

const metrics: Metric[] = [
  { labelEn: 'Monthly Average', labelPt: 'Média Mensal', v2024: '12.8', v2025: '24.6', change: '+92%', direction: 'up', positive: true },
  { labelEn: 'Approval Rate', labelPt: 'Taxa Aprovação', v2024: '95.0%', v2025: '97.4%', change: '+2.4pp', direction: 'up', positive: true },
  { labelEn: 'Avg Working Days', labelPt: 'Média Dias Úteis', v2024: '3.1d', v2025: '2.8d', change: '-10%', direction: 'down', positive: true },
  { labelEn: 'Same-Day Completions', labelPt: 'Concluídos Mesmo Dia', v2024: '17.0%', v2025: '20.9%', change: '+3.9pp', direction: 'up', positive: true },
  { labelEn: 'Estimate Approval', labelPt: 'Aprovação Estimativa', v2024: '1.2d', v2025: '0.9d', change: '-25%', direction: 'down', positive: true },
];

export function YoY({ lang }: { lang: 'en' | 'pt' }) {
  return (
    <section id="sec-yoy" className="bg-off-black text-white py-20 px-6 md:px-15">
      <div className="max-w-6xl mx-auto fade-in">
        <div className="font-light text-[11px] tracking-[3px] uppercase text-sky mb-2">
          {lang === 'en' ? 'Year-over-Year' : 'Comparação Anual'}
        </div>
        <h2 className="font-extrabold text-[clamp(28px,3.5vw,44px)] tracking-tight leading-[1.1] mb-3">
          2024 vs 2025
        </h2>
        <p className="font-light text-[13px] text-med-light-gray max-w-2xl mb-10">
          {lang === 'en'
            ? '2024: Feb–Dec (11 months, 141 interventions). 2025: Jan 25–Feb 26 (14 months, 345). Monthly averages normalized for fair comparison.'
            : '2024: Fev–Dez (11 meses, 141 intervenções). 2025: Jan 25–Fev 26 (14 meses, 345). Médias mensais normalizadas.'}
        </p>

        <div className="space-y-3">
          {metrics.map((m, i) => (
            <div key={i} className="flex items-center gap-4 p-4 md:p-5 bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] transition-all duration-300 group">
              <div className="flex-1 min-w-0">
                <div className="font-light text-[11px] tracking-[1.5px] uppercase text-med-light-gray mb-1">
                  {lang === 'en' ? m.labelEn : m.labelPt}
                </div>
                <div className="flex items-baseline gap-4">
                  <div className="text-med-dark-gray text-sm tabular-nums line-through decoration-med-dark-gray/40">
                    {m.v2024}
                  </div>
                  <div className="font-extrabold text-2xl md:text-3xl tracking-tight text-white tabular-nums">
                    {m.v2025}
                  </div>
                </div>
              </div>
              <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-sm font-bold tabular-nums ${
                m.positive ? 'bg-sky/20 text-sky' : 'bg-red-500/20 text-red-400'
              }`}>
                {m.direction === 'up'
                  ? <ArrowUpRight size={16} />
                  : <ArrowDownRight size={16} />
                }
                {m.change}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom highlight */}
        <div className="mt-8 p-5 border border-sky/30 bg-sky/[0.05]">
          <div className="flex items-center gap-2 text-sky font-extrabold text-base tracking-tight mb-1">
            <TrendingUp size={18} />
            {lang === 'en' ? 'All key metrics improved' : 'Todos os indicadores melhoraram'}
          </div>
          <p className="font-light text-xs text-med-light-gray">
            {lang === 'en'
              ? 'Higher volume (+92%), faster turnaround (-12%), better approval (+2.4pp), more same-day completions (+3.9pp).'
              : 'Mais volume (+92%), resposta mais rápida (-12%), melhor aprovação (+2.4pp), mais conclusões no dia (+3.9pp).'}
          </p>
        </div>
      </div>
    </section>
  );
}

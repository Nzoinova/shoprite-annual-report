import React, { useEffect, useState, useRef } from 'react';

interface KPI {
  value: string;
  numericValue: number;
  suffix: string;
  labelEn: string;
  labelPt: string;
  detail: string;
}

const kpis: KPI[] = [
  { value: '345', numericValue: 345, suffix: '', labelEn: 'Interventions', labelPt: 'Intervenções', detail: 'Jan 25 – Feb 26' },
  { value: '57', numericValue: 57, suffix: '', labelEn: 'Vehicles Serviced', labelPt: 'Viaturas Atendidas', detail: 'Unique fleet units' },
  { value: '3', numericValue: 3, suffix: '', labelEn: 'Service Units', labelPt: 'Unidades de Serviço', detail: 'Icolo · Lobito · Lubango' },
  { value: '2.8', numericValue: 2.8, suffix: 'd', labelEn: 'Avg. Working Days', labelPt: 'Média Dias Úteis', detail: '954 total (excl. weekends)' },
  { value: '6.1', numericValue: 6.1, suffix: '', labelEn: 'Avg. Visits/Vehicle', labelPt: 'Média Visitas/Viatura', detail: '345 ÷ 57' },
  { value: '20.9', numericValue: 20.9, suffix: '%', labelEn: 'Same-Day', labelPt: 'Mesmo Dia', detail: '72 / 345' },
];

function AnimatedNumber({ target, suffix, duration = 1500 }: { target: number; suffix: string; duration?: number }) {
  const [current, setCurrent] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const steps = 60;
    const increment = target / steps;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      setCurrent(step >= steps ? target : Math.min(increment * step, target));
      if (step >= steps) clearInterval(timer);
    }, duration / steps);
    return () => clearInterval(timer);
  }, [started, target, duration]);

  const display = target >= 1 && target % 1 === 0
    ? Math.round(current).toString()
    : current.toFixed(1);

  return <div ref={ref} className="font-extrabold text-4xl md:text-5xl tracking-tighter leading-none text-teal">{display}{suffix}</div>;
}

export function Summary({ lang }: { lang: 'en' | 'pt' }) {
  return (
    <section id="sec-summary" className="py-20 px-6 md:px-15 max-w-6xl mx-auto fade-in">
      <div className="font-light text-xs tracking-[3px] uppercase text-teal mb-1">
        {lang === 'en' ? 'Executive Summary' : 'Resumo Executivo'}
      </div>
      <h2 className="font-extrabold text-[clamp(26px,3.5vw,42px)] tracking-tight leading-[1.1] mb-3">
        {lang === 'en' ? 'The year at a glance' : 'O ano num relance'}
      </h2>
      <p className="font-light text-sm text-dark-gray max-w-xl mb-10">
        {lang === 'en'
          ? '345 interventions across 57 vehicles, delivered through our integrated network. Working days calculated excluding weekends and Angola public holidays.'
          : '345 intervenções em 57 viaturas, através da nossa rede integrada. Dias úteis calculados excluindo fins-de-semana e feriados angolanos.'}
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {kpis.map((kpi, i) => (
          <div key={i} className="bg-off-white p-5 border-l-[3px] border-teal hover:shadow-md transition-shadow duration-300 group">
            <AnimatedNumber target={kpi.numericValue} suffix={kpi.suffix} />
            <div className="font-light text-[10px] text-dark-gray mt-1 uppercase tracking-[1px]">
              {lang === 'en' ? kpi.labelEn : kpi.labelPt}
            </div>
            <div className="font-light text-[10px] text-med-dark-gray mt-0.5">{kpi.detail}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

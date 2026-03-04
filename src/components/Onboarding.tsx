import React, { useState, useEffect } from 'react';
import { X, ChevronRight, ChevronLeft, Globe, Navigation, BarChart3, Search, MousePointerClick, Sparkles } from 'lucide-react';

interface Step {
  iconEl: React.ReactNode;
  titleEn: string;
  titlePt: string;
  descEn: string;
  descPt: string;
  targetSection?: string;
}

const steps: Step[] = [
  {
    iconEl: <Globe size={24} />,
    titleEn: 'Language',
    titlePt: 'Idioma',
    descEn: 'Switch between English and Portuguese at any time using the EN / PT toggle in the top-right corner.',
    descPt: 'Alterne entre Inglês e Português a qualquer momento com o botão EN / PT no canto superior direito.',
  },
  {
    iconEl: <Navigation size={24} />,
    titleEn: 'Navigation',
    titlePt: 'Navegação',
    descEn: 'Use the dots on the right side to jump directly to any section. Hover them to see section names.',
    descPt: 'Use os pontos no lado direito para saltar directamente para qualquer secção. Passe o rato para ver os nomes.',
  },
  {
    iconEl: <BarChart3 size={24} />,
    titleEn: 'Executive Summary',
    titlePt: 'Resumo Executivo',
    descEn: '6 key performance indicators with animated counters: fleet size, interventions, average immobilization, same-day completion rate, and more.',
    descPt: '6 indicadores-chave com contadores animados: dimensão da frota, intervenções, imobilização média, taxa de conclusão no dia, e mais.',
    targetSection: 'sec-summary',
  },
  {
    iconEl: <MousePointerClick size={24} />,
    titleEn: 'Interactive Charts',
    titlePt: 'Gráficos Interactivos',
    descEn: 'Hover over donut charts in Distribution for detailed breakdowns. All charts show tooltips with exact values and percentages.',
    descPt: 'Passe o rato sobre os gráficos em Distribuição para detalhes. Todos os gráficos mostram tooltips com valores exactos e percentagens.',
    targetSection: 'sec-units',
  },
  {
    iconEl: <Sparkles size={24} />,
    titleEn: 'Health Insights',
    titlePt: 'Análise de Saúde',
    descEn: 'Efficiency benchmarks per service unit, fleet age profile, high-immobilization alerts with odometer data, and preventive vs corrective maintenance ratios per vehicle.',
    descPt: 'Benchmarks de eficiência por unidade, perfil etário da frota, alertas de alta imobilização com dados de odómetro, e rácios de manutenção preventiva vs correctiva por viatura.',
    targetSection: 'sec-insights',
  },
  {
    iconEl: <Search size={24} />,
    titleEn: 'Vehicle History',
    titlePt: 'Historial de Viaturas',
    descEn: 'Search any plate number to see its complete service history. Each entry shows service date, description, unit, and working days. Use the pagination to browse all 54 vehicles.',
    descPt: 'Pesquise qualquer matrícula para ver o historial completo. Cada entrada mostra data, descrição, unidade e dias úteis. Use a paginação para navegar todas as 54 viaturas.',
    targetSection: 'sec-history',
  },
];

export function Onboarding({ lang, onComplete }: { lang: 'en' | 'pt'; onComplete: () => void }) {
  const en = lang === 'en';
  const [step, setStep] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const close = () => {
    setVisible(false);
    setTimeout(onComplete, 300);
  };

  const next = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      close();
    }
  };

  const prev = () => { if (step > 0) setStep(step - 1); };

  const goToSection = () => {
    const s = steps[step];
    if (s.targetSection) {
      const el = document.getElementById(s.targetSection);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const current = steps[step];

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[9998] transition-opacity duration-300"
        style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)', opacity: visible ? 1 : 0 }}
        onClick={close}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4 pointer-events-none">
        <div
          className="bg-white max-w-md w-full pointer-events-auto shadow-2xl overflow-hidden transition-all duration-300"
          style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(16px)' }}
        >
          {/* Progress bar */}
          <div className="h-1 bg-gray-100">
            <div className="h-full bg-[#415A67] transition-all duration-500 ease-out" style={{ width: `${((step + 1) / steps.length) * 100}%` }} />
          </div>

          {/* Header */}
          <div className="flex items-center justify-between px-6 pt-5">
            <div className="text-[10px] font-light tracking-[3px] uppercase text-[#415A67]">
              {en ? 'Quick Guide' : 'Guia Rápido'} — {step + 1}/{steps.length}
            </div>
            <button onClick={close} className="text-gray-400 hover:text-gray-600 transition-colors p-1" aria-label="Close">
              <X size={18} />
            </button>
          </div>

          {/* Content */}
          <div className="px-6 py-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 flex items-center justify-center bg-[#415A67]/10 text-[#415A67] flex-shrink-0 rounded-sm">
                {current.iconEl}
              </div>
              <div>
                <h3 className="font-extrabold text-xl tracking-tight mb-2">
                  {en ? current.titleEn : current.titlePt}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {en ? current.descEn : current.descPt}
                </p>
              </div>
            </div>

            {/* "Go to section" link */}
            {current.targetSection && (
              <button
                onClick={goToSection}
                className="mt-4 ml-16 text-xs text-[#415A67] font-semibold hover:underline flex items-center gap-1"
              >
                {en ? 'Go to section' : 'Ir para secção'} →
              </button>
            )}
          </div>

          {/* Step dots */}
          <div className="flex justify-center gap-1.5 pb-2">
            {steps.map((_, i) => (
              <button
                key={i}
                onClick={() => setStep(i)}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  i === step ? 'bg-[#415A67] scale-125' : i < step ? 'bg-[#9CC7DE]' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-6 pb-5">
            <button
              onClick={close}
              className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
            >
              {en ? 'Skip guide' : 'Saltar guia'}
            </button>
            <div className="flex gap-2">
              {step > 0 && (
                <button onClick={prev} className="flex items-center gap-1 px-4 py-2 border border-gray-200 text-sm hover:bg-gray-50 transition-colors">
                  <ChevronLeft size={14} />
                  {en ? 'Back' : 'Anterior'}
                </button>
              )}
              <button onClick={next} className="flex items-center gap-1 px-5 py-2 bg-[#415A67] text-white text-sm font-semibold hover:bg-[#344a56] transition-colors">
                {step < steps.length - 1
                  ? (en ? 'Next' : 'Seguinte')
                  : (en ? 'Start Exploring' : 'Começar a Explorar')
                }
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

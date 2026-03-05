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
    iconEl: <Globe size={28} />,
    titleEn: 'Language',
    titlePt: 'Idioma',
    descEn: 'Switch between English and Portuguese at any time using the EN / PT toggle in the top-right corner.',
    descPt: 'Alterne entre Inglês e Português a qualquer momento com o botão EN / PT no canto superior direito.',
  },
  {
    iconEl: <Navigation size={28} />,
    titleEn: 'Navigation',
    titlePt: 'Navegação',
    descEn: 'Use the dots on the right side to jump directly to any section. Hover to see section names.',
    descPt: 'Use os pontos no lado direito para saltar para qualquer secção. Passe o rato para ver os nomes.',
  },
  {
    iconEl: <BarChart3 size={28} />,
    titleEn: 'Executive Summary',
    titlePt: 'Resumo Executivo',
    descEn: '6 animated KPIs at a glance: fleet size, interventions, average immobilization, same-day rate, and more.',
    descPt: '6 indicadores animados: dimensão da frota, intervenções, imobilização média, taxa de conclusão no dia, e mais.',
    targetSection: 'sec-summary',
  },
  {
    iconEl: <MousePointerClick size={28} />,
    titleEn: 'Interactive Charts',
    titlePt: 'Gráficos Interactivos',
    descEn: 'Hover over charts for detailed breakdowns. All visualizations show tooltips with exact values and percentages.',
    descPt: 'Passe o rato sobre os gráficos para ver detalhes. Todas as visualizações mostram valores exactos.',
    targetSection: 'sec-units',
  },
  {
    iconEl: <Sparkles size={28} />,
    titleEn: 'Health Insights',
    titlePt: 'Análise de Saúde',
    descEn: 'Efficiency benchmarks per unit, fleet age profile, high-immobilization alerts, and preventive vs corrective ratios.',
    descPt: 'Benchmarks por unidade, perfil etário, alertas de imobilização, e rácios preventiva vs correctiva.',
    targetSection: 'sec-insights',
  },
  {
    iconEl: <Search size={28} />,
    titleEn: 'Vehicle History',
    titlePt: 'Historial de Viaturas',
    descEn: 'Search any plate number for its complete service timeline. Browse all 57 vehicles with pagination.',
    descPt: 'Pesquise qualquer matrícula para o historial completo. Navegue todas as 57 viaturas com paginação.',
    targetSection: 'sec-history',
  },
];

export function Onboarding({ lang, onComplete }: { lang: 'en' | 'pt'; onComplete: () => void }) {
  const en = lang === 'en';
  const [step, setStep] = useState(-1); // -1 = welcome screen
  const [visible, setVisible] = useState(false);
  const [slideDir, setSlideDir] = useState<'right'|'left'>('right');

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const close = () => {
    setVisible(false);
    setTimeout(onComplete, 300);
  };

  const next = () => {
    if (step < steps.length - 1) {
      setSlideDir('right');
      setStep(step + 1);
    } else {
      close();
    }
  };

  const prev = () => {
    if (step > -1) {
      setSlideDir('left');
      setStep(step - 1);
    }
  };

  const goToSection = () => {
    if (step >= 0 && steps[step].targetSection) {
      const el = document.getElementById(steps[step].targetSection!);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const totalSteps = steps.length + 1; // +1 for welcome
  const currentIndex = step + 1; // 0-based → welcome=0, step0=1, etc.

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[9998] transition-opacity duration-300"
        style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(6px)', opacity: visible ? 1 : 0 }}
        onClick={close}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4 pointer-events-none">
        <div
          className="bg-white max-w-[440px] w-full pointer-events-auto overflow-hidden transition-all duration-400"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.97)',
            boxShadow: '0 25px 60px -12px rgba(0,0,0,0.4)',
          }}
        >
          {/* Top accent gradient */}
          <div className="h-1.5" style={{ background: 'linear-gradient(90deg, #415A67 0%, #9CC7DE 100%)' }} />

          {step === -1 ? (
            /* ═══ WELCOME SCREEN ═══ */
            <div className="px-8 py-10 text-center">
              <div className="w-16 h-16 mx-auto mb-5 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #415A67, #9CC7DE)' }}>
                <span className="text-white text-2xl font-extrabold">N</span>
              </div>
              <h2 className="font-extrabold text-2xl tracking-tight mb-2">
                {en ? 'Welcome to Your Report' : 'Bem-vindo ao Relatório'}
              </h2>
              <p className="text-sm text-gray-500 leading-relaxed max-w-xs mx-auto mb-8">
                {en
                  ? 'A quick 6-step guide to help you navigate through your annual service report.'
                  : 'Um guia rápido de 6 passos para navegar pelo relatório anual de serviço.'}
              </p>
              <div className="flex justify-center gap-3">
                <button
                  onClick={close}
                  className="px-5 py-2.5 text-sm text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {en ? 'Skip' : 'Saltar'}
                </button>
                <button
                  onClick={next}
                  className="px-7 py-2.5 text-sm font-semibold text-white transition-all hover:shadow-lg flex items-center gap-2"
                  style={{ background: 'linear-gradient(135deg, #415A67, #4a6d7d)' }}
                >
                  {en ? "Let's go" : 'Começar'}
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          ) : (
            /* ═══ STEP CONTENT ═══ */
            <>
              {/* Header */}
              <div className="flex items-center justify-between px-7 pt-5 pb-0">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#415A67] text-white text-[10px] font-bold flex items-center justify-center">
                    {step + 1}
                  </span>
                  <span className="text-[10px] font-light tracking-[2px] uppercase text-gray-400">
                    {en ? 'of' : 'de'} {steps.length}
                  </span>
                </div>
                <button onClick={close} className="text-gray-300 hover:text-gray-500 transition-colors p-1" aria-label="Close">
                  <X size={18} />
                </button>
              </div>

              {/* Content */}
              <div className="px-7 py-6" key={step}>
                <div className="flex gap-5">
                  <div className="w-14 h-14 flex-shrink-0 rounded-xl flex items-center justify-center text-white" style={{ background: 'linear-gradient(135deg, #415A67, #5a7a8a)' }}>
                    {steps[step].iconEl}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-extrabold text-xl tracking-tight mb-1.5">
                      {en ? steps[step].titleEn : steps[step].titlePt}
                    </h3>
                    <p className="text-[13px] text-gray-500 leading-relaxed">
                      {en ? steps[step].descEn : steps[step].descPt}
                    </p>
                    {steps[step].targetSection && (
                      <button
                        onClick={goToSection}
                        className="mt-3 text-xs font-semibold hover:underline flex items-center gap-1 transition-colors"
                        style={{ color: '#415A67' }}
                      >
                        {en ? 'Jump to section' : 'Ir para secção'} →
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Progress dots */}
              <div className="flex justify-center gap-1.5 pb-3">
                {steps.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => { setSlideDir(i > step ? 'right' : 'left'); setStep(i); }}
                    className="transition-all duration-300 rounded-full"
                    style={{
                      width: i === step ? 20 : 6,
                      height: 6,
                      background: i === step ? '#415A67' : i < step ? '#9CC7DE' : '#e5e7eb',
                    }}
                  />
                ))}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between px-7 pb-5">
                <button
                  onClick={prev}
                  className="flex items-center gap-1 text-sm text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <ChevronLeft size={14} />
                  {en ? 'Back' : 'Voltar'}
                </button>
                <button
                  onClick={next}
                  className="flex items-center gap-2 px-5 py-2 text-sm font-semibold text-white transition-all hover:shadow-lg"
                  style={{ background: 'linear-gradient(135deg, #415A67, #4a6d7d)' }}
                >
                  {step < steps.length - 1
                    ? (en ? 'Next' : 'Seguinte')
                    : (en ? 'Start Exploring' : 'Explorar')
                  }
                  <ChevronRight size={14} />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

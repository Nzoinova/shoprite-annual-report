import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const categories = [
  { name: 'Revisao Basica', value: 134, avgDays: 2.2, type: 'preventive' },
  { name: 'Outros', value: 55, avgDays: 7.3, type: 'corrective' },
  { name: 'Revisao Completa', value: 45, avgDays: 4.2, type: 'preventive' },
  { name: 'Arrefecimento/Fugas', value: 23, avgDays: 3.4, type: 'corrective' },
  { name: 'Diagnostico', value: 22, avgDays: 4.7, type: 'corrective' },
  { name: 'Baterias', value: 20, avgDays: 0.6, type: 'preventive' },
  { name: 'Transmissao/Suspensao', value: 20, avgDays: 6.7, type: 'corrective' },
  { name: 'Pneumatico/Travoes', value: 10, avgDays: 3.1, type: 'corrective' },
  { name: 'Electrico', value: 7, avgDays: 0.6, type: 'corrective' },
  { name: 'Hidraulico', value: 6, avgDays: 3.5, type: 'corrective' },
  { name: 'Estrutura/Chassi', value: 3, avgDays: 3.7, type: 'corrective' },
];

const immobData = [
  { range: '0-1d', count: 162, pct: 47.1, color: '#415A67' },
  { range: '2-5d', count: 117, pct: 34.0, color: '#9CC7DE' },
  { range: '6-15d', count: 53, pct: 15.4, color: '#ABABAB' },
  { range: '>15d', count: 12, pct: 3.5, color: '#D6D6D6' },
];

const CatTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.[0]) return null;
  const d = payload[0].payload;
  return (
    <div className="bg-off-black text-white p-3 rounded shadow-lg text-xs">
      <p className="font-semibold">{d.name}</p>
      <p>{d.value} interventions ({((d.value/345)*100).toFixed(1)}%)</p>
      <p>Avg immobilization: {d.avgDays}d</p>
      <p className="mt-1 text-sky">{d.type === 'preventive' ? 'Preventive' : 'Corrective'}</p>
    </div>
  );
};

export function ServiceAnalysis({ lang }: { lang: 'en' | 'pt' }) {
  const [showAvgDays, setShowAvgDays] = useState(false);
  const preventive = categories.filter(c => c.type === 'preventive').reduce((s, c) => s + c.value, 0);
  const corrective = 345 - preventive;

  return (
    <section id="sec-services" className="py-20 px-6 md:px-15 fade-in">
      <div className="max-w-6xl mx-auto">
        <div className="font-light text-xs tracking-[3px] uppercase text-teal mb-1">
          {lang === 'en' ? 'Service Analysis' : 'Analise de Servicos'}
        </div>
        <h2 className="font-extrabold text-[clamp(26px,3.5vw,42px)] tracking-tight leading-[1.1] mb-3">
          {lang === 'en' ? 'What we did' : 'O que fizemos'}
        </h2>
        <div className="flex items-center gap-6 mb-8">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm bg-teal" />
            <span className="text-sm">{lang === 'en' ? 'Preventive' : 'Preventiva'} <b>{preventive}</b> (57.7%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm bg-sky" />
            <span className="text-sm">{lang === 'en' ? 'Corrective' : 'Correctiva'} <b>{corrective}</b> (42.3%)</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-extrabold text-base tracking-tight">
                {lang === 'en' ? 'By Category' : 'Por Categoria'}
              </h3>
              <button
                onClick={() => setShowAvgDays(!showAvgDays)}
                className="text-[10px] uppercase tracking-wider px-3 py-1 border border-light-gray rounded hover:bg-off-white transition-colors"
              >
                {showAvgDays ? (lang === 'en' ? 'Show Count' : 'Mostrar Qtd') : (lang === 'en' ? 'Show Avg Days' : 'Mostrar Dias Med')}
              </button>
            </div>
            <div className="h-[380px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categories} layout="vertical" barCategoryGap="6%">
                  <XAxis type="number" tick={{ fill: '#808080', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis type="category" dataKey="name" tick={{ fill: '#575757', fontSize: 11 }} axisLine={false} tickLine={false} width={140} />
                  <Tooltip content={<CatTooltip />} cursor={{ fill: 'rgba(65,90,103,0.05)' }} />
                  <Bar dataKey={showAvgDays ? 'avgDays' : 'value'} radius={[0,4,4,0]}>
                    {categories.map((c, i) => (
                      <Cell key={i} fill={c.type === 'preventive' ? '#415A67' : '#9CC7DE'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div>
            <h3 className="font-extrabold text-base tracking-tight mb-4">
              {lang === 'en' ? 'Immobilization Distribution' : 'Distribuicao de Imobilizacao'}
            </h3>
            <div className="flex items-end gap-5 h-[280px] pt-8">
              {immobData.map((d, i) => (
                <div key={i} className="flex-1 flex flex-col items-center justify-end h-full group">
                  <div className="font-extrabold text-sm mb-1 text-off-black group-hover:text-teal transition-colors">{d.count}</div>
                  <div
                    className="w-full rounded-t transition-all duration-500 group-hover:opacity-80"
                    style={{ height: (d.count / 162) * 100 + '%', background: d.color, minHeight: 8 }}
                  />
                  <div className="text-[10px] text-med-dark-gray mt-2 font-semibold">{d.range}</div>
                  <div className="text-[9px] text-med-light-gray">{d.pct}%</div>
                </div>
              ))}
            </div>
            <div className="mt-6 p-3 bg-teal-10 rounded">
              <p className="text-xs text-dark-gray">
                <b className="text-teal">81.1%</b> {lang === 'en' ? 'of vehicles returned within 5 days' : 'das viaturas devolvidas em 5 dias'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

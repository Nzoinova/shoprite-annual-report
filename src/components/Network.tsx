import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const unitData = [
  { name: 'Icolo e Bengo', value: 248, vehicles: 53, color: '#415A67' },
  { name: 'Lobito', value: 90, vehicles: 24, color: '#9CC7DE' },
  { name: 'Lubango', value: 7, vehicles: 6, color: '#D6D6D6' },
];

const modelData = [
  { name: 'FMX 440', value: 270, color: '#415A67' },
  { name: 'FH 520', value: 68, color: '#9CC7DE' },
  { name: 'FL 240', value: 5, color: '#ABABAB' },
  { name: 'Other', value: 2, color: '#D6D6D6' },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.[0]) return null;
  const d = payload[0].payload;
  const pct = ((d.value / 345) * 100).toFixed(1);
  return (
    <div className="bg-off-black text-white p-3 rounded shadow-lg text-xs">
      <p className="font-semibold">{d.name}</p>
      <p>{d.value} interventions ({pct}%)</p>
      {d.vehicles && <p>{d.vehicles} unique vehicles</p>}
    </div>
  );
};

function DonutChart({ data, title }: { data: any[]; title: string }) {
  return (
    <div>
      <h3 className="font-extrabold text-base tracking-tight mb-4">{title}</h3>
      <div className="flex items-center gap-6">
        <div className="w-[160px] h-[160px] flex-shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} cx="50%" cy="50%" innerRadius={45} outerRadius={72} paddingAngle={2} dataKey="value">
                {data.map((d, i) => <Cell key={i} fill={d.color} stroke="none" />)}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-col gap-2">
          {data.map((d, i) => (
            <div key={i} className="flex items-center gap-2 text-sm">
              <div className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ background: d.color }} />
              <span className="font-semibold">{d.name}</span>
              <span className="text-med-dark-gray text-xs">{d.value} ({((d.value / 345) * 100).toFixed(1)}%)</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Network({ lang }: { lang: 'en' | 'pt' }) {
  return (
    <section id="sec-units" className="bg-off-white py-20 px-6 md:px-15 fade-in">
      <div className="max-w-6xl mx-auto">
        <div className="font-light text-xs tracking-[3px] uppercase text-teal mb-1">
          {lang === 'en' ? 'Service Network' : 'Rede de Servicos'}
        </div>
        <h2 className="font-extrabold text-[clamp(26px,3.5vw,42px)] tracking-tight leading-[1.1] mb-8">
          {lang === 'en' ? 'Distribution' : 'Distribuicao'}
        </h2>
        <div className="grid md:grid-cols-2 gap-12">
          <DonutChart data={unitData} title={lang === 'en' ? 'By Service Unit' : 'Por Unidade'} />
          <DonutChart data={modelData} title={lang === 'en' ? 'By Vehicle Model' : 'Por Modelo'} />
        </div>
        <div className="mt-8 flex gap-3 h-6 rounded overflow-hidden max-w-2xl">
          {unitData.map((d, i) => (
            <div key={i} style={{ flex: d.value, background: d.color }} className="transition-all duration-500 hover:opacity-80" title={d.name + ': ' + d.value} />
          ))}
        </div>
      </div>
    </section>
  );
}

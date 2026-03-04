import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const monthlyData = [
  { month: 'Jan 25', ib: 17, lo: 7, lu: 0 },
  { month: 'Feb 25', ib: 20, lo: 7, lu: 0 },
  { month: 'Mar 25', ib: 14, lo: 8, lu: 0 },
  { month: 'Apr 25', ib: 17, lo: 5, lu: 0 },
  { month: 'May 25', ib: 27, lo: 8, lu: 0 },
  { month: 'Jun 25', ib: 18, lo: 8, lu: 0 },
  { month: 'Jul 25', ib: 16, lo: 9, lu: 0 },
  { month: 'Aug 25', ib: 20, lo: 1, lu: 0 },
  { month: 'Sep 25', ib: 16, lo: 5, lu: 1 },
  { month: 'Oct 25', ib: 20, lo: 8, lu: 3 },
  { month: 'Nov 25', ib: 14, lo: 3, lu: 3 },
  { month: 'Dec 25', ib: 18, lo: 11, lu: 0 },
  { month: 'Jan 26', ib: 17, lo: 7, lu: 0 },
  { month: 'Feb 26', ib: 14, lo: 3, lu: 0 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload) return null;
  const total = payload.reduce((s: number, p: any) => s + (p.value || 0), 0);
  return (
    <div className="bg-off-black text-white p-3 rounded shadow-lg text-xs">
      <p className="font-semibold mb-1">{label}</p>
      {payload.map((p: any, i: number) => (
        <p key={i} style={{ color: p.fill }} className="flex justify-between gap-4">
          <span>{p.name}</span><span className="font-bold">{p.value}</span>
        </p>
      ))}
      <p className="border-t border-dark-gray mt-1 pt-1 font-bold flex justify-between gap-4">
        <span>Total</span><span>{total}</span>
      </p>
    </div>
  );
};

export function Timeline({ lang }: { lang: 'en' | 'pt' }) {
  return (
    <section id="sec-timeline" className="bg-off-black text-white py-20 px-6 md:px-15 fade-in">
      <div className="max-w-6xl mx-auto">
        <div className="font-light text-xs tracking-[3px] uppercase text-sky mb-1">
          {lang === 'en' ? 'Monthly Timeline' : 'Linha Temporal Mensal'}
        </div>
        <h2 className="font-extrabold text-[clamp(26px,3.5vw,42px)] tracking-tight leading-[1.1] mb-3">
          {lang === 'en' ? 'Service volume through the year' : 'Volume ao longo do ano'}
        </h2>
        <p className="font-light text-sm text-med-light-gray max-w-xl mb-10">
          {lang === 'en'
            ? 'Consistent delivery with peaks in May (35) and October (31), reflecting seasonal maintenance cycles.'
            : 'Entrega consistente com picos em Maio (35) e Outubro (31), reflectindo ciclos sazonais.'}
        </p>
        <div className="w-full h-[350px] md:h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData} barCategoryGap="12%">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
              <XAxis dataKey="month" tick={{ fill: '#ABABAB', fontSize: 10 }} axisLine={{ stroke: 'rgba(255,255,255,0.1)' }} tickLine={false} />
              <YAxis tick={{ fill: '#ABABAB', fontSize: 10 }} axisLine={false} tickLine={false} width={30} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.04)' }} />
              <Legend wrapperStyle={{ fontSize: 11, paddingTop: 16 }} iconType="square" iconSize={10} />
              <Bar dataKey="ib" name="Icolo e Bengo" stackId="a" fill="#415A67" />
              <Bar dataKey="lo" name="Lobito" stackId="a" fill="#9CC7DE" />
              <Bar dataKey="lu" name="Lubango" stackId="a" fill="#D6D6D6" radius={[3,3,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-6 grid grid-cols-3 gap-4 max-w-md">
          <div className="text-center"><div className="font-extrabold text-2xl text-sky">24.6</div><div className="text-[10px] text-med-light-gray uppercase tracking-wide">{lang === 'en' ? 'Monthly Avg' : 'Media Mensal'}</div></div>
          <div className="text-center"><div className="font-extrabold text-2xl text-sky">35</div><div className="text-[10px] text-med-light-gray uppercase tracking-wide">{lang === 'en' ? 'Peak (May)' : 'Pico (Mai)'}</div></div>
          <div className="text-center"><div className="font-extrabold text-2xl text-sky">17</div><div className="text-[10px] text-med-light-gray uppercase tracking-wide">{lang === 'en' ? 'Min (Feb 26)' : 'Min (Fev 26)'}</div></div>
        </div>
      </div>
    </section>
  );
}

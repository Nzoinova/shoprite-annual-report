import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export function YoY({ lang }: { lang: 'en' | 'pt' }) {
  const data = [
    {
      name: lang === 'en' ? 'Monthly Avg\nInterventions' : 'Média Mensal\nIntervenções',
      '2024 (Feb-Dec)': 12.8,
      '2025 (Jan 25-Feb 26)': 24.6,
    },
    {
      name: lang === 'en' ? 'Approval\nRate (%)' : 'Taxa de\nAprovação (%)',
      '2024 (Feb-Dec)': 95,
      '2025 (Jan 25-Feb 26)': 97.4,
    },
    {
      name: lang === 'en' ? 'Avg Immob.\n(days)' : 'Imob. Média\n(dias)',
      '2024 (Feb-Dec)': 4.2,
      '2025 (Jan 25-Feb 26)': 3.7,
    },
    {
      name: lang === 'en' ? 'Same-Day\n(%)' : 'Mesmo Dia\n(%)',
      '2024 (Feb-Dec)': 17,
      '2025 (Jan 25-Feb 26)': 20.9,
    },
    {
      name: lang === 'en' ? 'Estimate\nApproval (days)' : 'Aprovação\nEstimativa (dias)',
      '2024 (Feb-Dec)': 1.2,
      '2025 (Jan 25-Feb 26)': 0.9,
    },
  ];

  return (
    <div id="sec-yoy" className="bg-off-black text-white py-20 px-6 md:px-15">
      <div className="max-w-6xl mx-auto">
        <div className="fade-in">
          <div className="font-light text-[11px] tracking-[3px] uppercase text-sky mb-2">
            {lang === 'en' ? 'Year-over-Year' : 'Comparação Anual'}
          </div>
          <h2 className="font-extrabold text-[clamp(28px,3.5vw,44px)] tracking-tight leading-[1.1] mb-3">
            {lang === 'en' ? '2024 vs 2025' : '2024 vs 2025'}
          </h2>
          <p className="font-light text-[13px] italic text-med-light-gray max-w-2xl mb-10">
            {lang === 'en' 
              ? 'Note: 2024 covers Feb–Dec (11 months), 2025 covers Jan 2025–Feb 2026 (14 months). Monthly averages are normalized for fair comparison.'
              : 'Nota: 2024 cobre Fev–Dez (11 meses), 2025 cobre Jan 2025–Fev 2026 (14 meses). Médias mensais normalizadas para comparação justa.'}
          </p>
        </div>
        
        <div className="h-[300px] w-full max-w-4xl mx-auto mt-8 fade-in">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#808080', fontSize: 11 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#808080' }} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#2B2B2B', border: 'none', borderRadius: '4px', color: '#fff' }}
                itemStyle={{ color: '#fff' }}
                cursor={{ fill: 'rgba(255,255,255,0.05)' }}
              />
              <Legend wrapperStyle={{ paddingTop: '20px', color: '#ABABAB' }} />
              <Bar dataKey="2024 (Feb-Dec)" fill="#808080" radius={[4, 4, 0, 0]} />
              <Bar dataKey="2025 (Jan 25-Feb 26)" fill="#9CC7DE" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

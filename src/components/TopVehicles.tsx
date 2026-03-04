import React from 'react';

export function TopVehicles({ lang }: { lang: 'en' | 'pt' }) {
  const top10 = [
    { rank: 1, plate: 'KEI0897', model: 'FMX 440', entries: 11, avg: 2.1, pct: 100 },
    { rank: 2, plate: 'KEI0818', model: 'FH 520', entries: 11, avg: 3.0, pct: 100 },
    { rank: 3, plate: 'KEI0809', model: 'FH 520', entries: 9, avg: 3.3, pct: 81.8 },
    { rank: 4, plate: 'KEI0880', model: 'FMX 440', entries: 9, avg: 4.9, pct: 81.8 },
    { rank: 5, plate: 'KEI0778', model: 'FMX 440', entries: 9, avg: 2.4, pct: 81.8 },
    { rank: 6, plate: 'KEI0908', model: 'FMX 440', entries: 9, avg: 6.1, pct: 81.8 },
    { rank: 7, plate: 'KEI0777', model: 'FMX 440', entries: 9, avg: 2.7, pct: 81.8 },
    { rank: 8, plate: 'KEI0901', model: 'FMX 440', entries: 9, avg: 3.4, pct: 81.8 },
    { rank: 9, plate: 'KEI0879', model: 'FMX 440', entries: 9, avg: 4.8, pct: 81.8 },
    { rank: 10, plate: 'KEI0779', model: 'FMX 440', entries: 9, avg: 4.6, pct: 81.8 },
  ];

  return (
    <div id="sec-top10" className="bg-off-black text-white py-20 px-6 md:px-15">
      <div className="max-w-6xl mx-auto">
        <div className="fade-in">
          <div className="font-light text-[11px] tracking-[3px] uppercase text-sky mb-2">
            {lang === 'en' ? 'Fleet Insights' : 'Insights da Frota'}
          </div>
          <h2 className="font-extrabold text-[clamp(28px,3.5vw,44px)] tracking-tight leading-[1.1] mb-10">
            {lang === 'en' ? 'Top 10 vehicles by service frequency' : 'Top 10 viaturas por frequência de serviço'}
          </h2>
        </div>
        
        <div className="overflow-x-auto fade-in">
          <table className="w-full border-collapse mt-6 min-w-[600px]">
            <thead>
              <tr>
                <th className="font-extrabold text-[11px] uppercase tracking-[1.5px] p-3 md:p-4 text-left border-b-2 border-teal text-teal">#</th>
                <th className="font-extrabold text-[11px] uppercase tracking-[1.5px] p-3 md:p-4 text-left border-b-2 border-teal text-teal">
                  {lang === 'en' ? 'Plate' : 'Matrícula'}
                </th>
                <th className="font-extrabold text-[11px] uppercase tracking-[1.5px] p-3 md:p-4 text-left border-b-2 border-teal text-teal">
                  {lang === 'en' ? 'Model' : 'Modelo'}
                </th>
                <th className="font-extrabold text-[11px] uppercase tracking-[1.5px] p-3 md:p-4 text-left border-b-2 border-teal text-teal">
                  {lang === 'en' ? 'Entries' : 'Entradas'}
                </th>
                <th className="font-extrabold text-[11px] uppercase tracking-[1.5px] p-3 md:p-4 text-left border-b-2 border-teal text-teal">
                  {lang === 'en' ? 'Avg. Days' : 'Dias Méd.'}
                </th>
                <th className="font-extrabold text-[11px] uppercase tracking-[1.5px] p-3 md:p-4 text-left border-b-2 border-teal text-teal min-w-[140px]">
                  {lang === 'en' ? 'Volume' : 'Volume'}
                </th>
              </tr>
            </thead>
            <tbody>
              {top10.map((v) => (
                <tr key={v.rank} className="hover:bg-teal-10 transition-colors">
                  <td className="p-3 md:p-4 font-light text-sm border-b border-white/10">
                    <span className="inline-flex items-center justify-center w-7 h-7 bg-teal text-white font-extrabold text-xs rounded">
                      {v.rank}
                    </span>
                  </td>
                  <td className="p-3 md:p-4 font-semibold text-sm border-b border-white/10">{v.plate}</td>
                  <td className="p-3 md:p-4 font-light text-sm border-b border-white/10">{v.model}</td>
                  <td className="p-3 md:p-4 font-extrabold text-lg text-sky border-b border-white/10">{v.entries}</td>
                  <td className="p-3 md:p-4 font-light text-sm border-b border-white/10">{v.avg}</td>
                  <td className="p-3 md:p-4 font-light text-sm border-b border-white/10 relative">
                    <div 
                      className="h-1.5 rounded-full mt-1" 
                      style={{ 
                        width: `${v.pct}%`, 
                        background: 'linear-gradient(90deg, var(--color-teal), var(--color-sky))' 
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

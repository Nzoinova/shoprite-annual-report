import React from 'react';
import { VEHICLES } from '../data';
import { Trophy, Clock, Wrench } from 'lucide-react';

export function TopVehicles({ lang }: { lang: 'en' | 'pt' }) {
  const sorted = Object.entries(VEHICLES)
    .map(([plate, info]) => ({ plate, ...info }))
    .sort((a, b) => b.n - a.n || a.awd - b.awd)
    .slice(0, 10);

  const maxEntries = sorted[0]?.n || 1;

  const rankColors = ['bg-teal', 'bg-sky', 'bg-med-dark-gray'];

  return (
    <section id="sec-top10" className="py-20 px-6 md:px-15 fade-in">
      <div className="max-w-6xl mx-auto">
        <div className="font-light text-[11px] tracking-[3px] uppercase text-teal mb-2">
          {lang === 'en' ? 'Fleet Insights' : 'Análise da Frota'}
        </div>
        <h2 className="font-extrabold text-[clamp(28px,3.5vw,44px)] tracking-tight leading-[1.1] mb-3">
          {lang === 'en' ? 'Most serviced vehicles' : 'Viaturas com mais intervenções'}
        </h2>
        <p className="font-light text-sm text-dark-gray max-w-2xl mb-8">
          {lang === 'en'
            ? 'Top 10 vehicles by number of service entries. Higher frequency may indicate heavy utilization or recurring issues requiring attention.'
            : 'Top 10 viaturas por entradas em oficina. Maior frequência pode indicar utilização intensiva ou problemas recorrentes.'}
        </p>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-[10px] font-bold uppercase tracking-[1.5px] text-teal border-b-2 border-teal">
                <th className="text-left py-3 w-12">#</th>
                <th className="text-left py-3">{lang === 'en' ? 'Plate' : 'Matrícula'}</th>
                <th className="text-left py-3">{lang === 'en' ? 'Model' : 'Modelo'}</th>
                <th className="text-center py-3 w-20"><Wrench size={12} className="inline mr-1" />{lang === 'en' ? 'Entries' : 'Entradas'}</th>
                <th className="text-center py-3 w-20"><Clock size={12} className="inline mr-1" />{lang === 'en' ? 'Avg Days' : 'Dias Méd'}</th>
                <th className="text-left py-3 w-32 hidden md:table-cell">{lang === 'en' ? 'Volume' : 'Volume'}</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((v, i) => (
                <tr key={v.plate} className="border-b border-light-gray hover:bg-off-white transition-colors group">
                  <td className="py-3">
                    <span className={`inline-flex items-center justify-center w-6 h-6 text-white text-[10px] font-bold rounded-sm ${i < 3 ? rankColors[i] : 'bg-light-gray text-dark-gray'}`}>
                      {i + 1}
                    </span>
                  </td>
                  <td className="py-3 font-extrabold text-sm tracking-tight group-hover:text-teal transition-colors">
                    {v.plate}
                  </td>
                  <td className="py-3 font-light text-sm text-dark-gray">{v.mod}</td>
                  <td className="py-3 text-center">
                    <span className="font-extrabold text-xl tabular-nums text-teal">{v.n}</span>
                  </td>
                  <td className="py-3 text-center">
                    <span className={`font-semibold text-sm tabular-nums ${v.awd <= 3 ? 'text-teal' : v.awd >= 6 ? 'text-dark-gray' : 'text-off-black'}`}>
                      {v.awd}d
                    </span>
                  </td>
                  <td className="py-3 hidden md:table-cell">
                    <div className="h-2.5 bg-off-white rounded-full overflow-hidden">
                      <div
                        className="h-full bg-sky rounded-full transition-all duration-500 group-hover:bg-teal"
                        style={{ width: `${(v.n / maxEntries) * 100}%` }}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Summary strip */}
        <div className="mt-6 flex flex-wrap gap-6 text-xs text-dark-gray">
          <div>
            <Trophy size={14} className="inline mr-1 text-teal" />
            {lang === 'en' ? 'Most active' : 'Mais activo'}: <b className="text-off-black">{sorted[0]?.plate}</b> ({sorted[0]?.n})
          </div>
          <div>
            <Clock size={14} className="inline mr-1 text-teal" />
            {lang === 'en' ? 'Fastest avg' : 'Mais rápido'}: <b className="text-off-black">{sorted.reduce((best, v) => v.awd < best.awd ? v : best).plate}</b> ({sorted.reduce((best, v) => v.awd < best.awd ? v : best).awd}d)
          </div>
        </div>
      </div>
    </section>
  );
}

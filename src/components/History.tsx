import React, { useState, useMemo } from 'react';
import { VEHICLES } from '../data';

export function History({ lang }: { lang: 'en' | 'pt' }) {
  const [search, setSearch] = useState('');
  const [openPlate, setOpenPlate] = useState<string | null>(null);

  const filteredVehicles = useMemo(() => {
    const entries = Object.entries(VEHICLES);
    if (!search) return entries;
    return entries.filter(([plate]) => plate.toLowerCase().includes(search.toLowerCase()));
  }, [search]);

  return (
    <section id="sec-history" className="py-20 px-6 md:px-15 max-w-6xl mx-auto">
      <div className="fade-in">
        <div className="font-light text-[11px] tracking-[3px] uppercase text-teal mb-2">
          {lang === 'en' ? 'Vehicle History' : 'Histórico por Viatura'}
        </div>
        <h2 className="font-extrabold text-[clamp(28px,3.5vw,44px)] tracking-tight leading-[1.1] mb-3">
          {lang === 'en' ? 'Complete service history per vehicle' : 'Histórico completo de serviços por viatura'}
        </h2>
        <p className="font-light text-base text-dark-gray max-w-2xl mb-6">
          {lang === 'en' 
            ? 'Search by plate number. Click a vehicle to expand its full service history.'
            : 'Pesquise por matrícula. Clique numa viatura para expandir o histórico completo.'}
        </p>
        
        <input 
          type="text" 
          className="w-full max-w-md px-4 py-3 border border-light-gray font-light text-sm outline-none mb-5 transition-colors focus:border-teal"
          placeholder={lang === 'en' ? 'Search plate...' : 'Pesquisar matrícula...'}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        
        <div className="mt-4">
          {filteredVehicles.length === 0 ? (
            <p className="text-med-dark-gray text-sm py-5">
              {lang === 'en' ? 'No vehicles found' : 'Nenhuma viatura encontrada'}
            </p>
          ) : (
            filteredVehicles.map(([plate, info]) => (
              <div key={plate} className="border border-light-gray mb-3 transition-all duration-300">
                <div 
                  className="flex justify-between items-center p-4 md:px-5 cursor-pointer bg-white hover:bg-off-white transition-colors"
                  onClick={() => setOpenPlate(openPlate === plate ? null : plate)}
                >
                  <div>
                    <span className="font-extrabold text-lg tracking-tight">{plate}</span>
                    <span className="font-light text-[13px] text-dark-gray ml-2">{info.mod}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="inline-block px-2.5 py-1 bg-teal text-white font-semibold text-xs rounded-sm">
                      {info.n} {lang === 'en' ? 'entries' : 'entradas'}
                    </span>
                    <span className="font-light text-[13px] text-dark-gray ml-3 hidden sm:inline">
                      {lang === 'en' ? 'Avg' : 'Méd'} {info.ad} {lang === 'en' ? 'days' : 'dias'}
                    </span>
                  </div>
                </div>
                
                {openPlate === plate && (
                  <div className="px-5 pb-4 bg-off-white block">
                    <div className="grid grid-cols-[80px_1fr_80px_60px] md:grid-cols-[100px_1fr_100px_80px] gap-3 py-2 border-b border-light-gray font-extrabold text-[11px] uppercase tracking-[1px] text-teal">
                      <div>{lang === 'en' ? 'Date' : 'Data'}</div>
                      <div>{lang === 'en' ? 'Service' : 'Serviço'}</div>
                      <div>{lang === 'en' ? 'Unit' : 'Unidade'}</div>
                      <div>{lang === 'en' ? 'Days' : 'Dias'}</div>
                    </div>
                    {info.e.map((entry: any, idx: number) => (
                      <div key={idx} className="grid grid-cols-[80px_1fr_80px_60px] md:grid-cols-[100px_1fr_100px_80px] gap-3 py-2 border-b border-light-gray font-light text-[13px] last:border-b-0">
                        <div>{entry.d}</div>
                        <div className="truncate" title={entry.s}>{entry.s}</div>
                        <div className="truncate" title={entry.u}>{entry.u}</div>
                        <div className="font-semibold">{entry.i}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

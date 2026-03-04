import React, { useState, useMemo } from 'react';
import { VEHICLES, SERVICE_TRANSLATIONS } from '../data';
import { ChevronDown, ChevronUp, Search, Truck, Clock, MapPin, CalendarDays } from 'lucide-react';

const PAGE_SIZE = 12;

function translateService(s: string, lang: 'en' | 'pt'): string {
  if (lang === 'pt') return s;
  // Try exact match
  const exact = SERVICE_TRANSLATIONS[s];
  if (exact) return exact;
  // Try trimmed
  const trimmed = SERVICE_TRANSLATIONS[s.trim()];
  if (trimmed) return trimmed;
  // Fallback: return original (PT)
  return s;
}

function StatusBadge({ status, lang }: { status: string; lang: string }) {
  const isCompleted = status === 'Concluído' || !status;
  return (
    <span className={`inline-block px-2 py-0.5 text-[10px] font-semibold rounded-sm uppercase tracking-wide ${
      isCompleted ? 'bg-teal-10 text-teal' : 'bg-sky-30 text-dark-gray'
    }`}>
      {isCompleted ? (lang === 'en' ? 'Done' : 'Concluído') : status}
    </span>
  );
}

export function History({ lang }: { lang: 'en' | 'pt' }) {
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const allVehicles = useMemo(() => {
    return Object.entries(VEHICLES).sort((a, b) => b[1].n - a[1].n);
  }, []);

  const filtered = useMemo(() => {
    if (!search.trim()) return allVehicles;
    const q = search.toLowerCase().trim();
    return allVehicles.filter(([plate, info]) =>
      plate.toLowerCase().includes(q) ||
      info.mod.toLowerCase().includes(q) ||
      info.e.some((e: any) => e.s.toLowerCase().includes(q) || e.u.toLowerCase().includes(q))
    );
  }, [search, allVehicles]);

  // Auto-expand when search returns single result
  const autoExpanded = filtered.length === 1 ? filtered[0][0] : null;
  const effectiveExpanded = autoExpanded || expanded;

  const visible = search.trim() ? filtered : filtered.slice(0, visibleCount);
  const hasMore = !search.trim() && visibleCount < filtered.length;

  return (
    <section id="sec-history" className="py-20 px-6 md:px-15 max-w-6xl mx-auto fade-in">
      <div className="font-light text-[11px] tracking-[3px] uppercase text-teal mb-2">
        {lang === 'en' ? 'Vehicle History' : 'Histórico por Viatura'}
      </div>
      <h2 className="font-extrabold text-[clamp(28px,3.5vw,44px)] tracking-tight leading-[1.1] mb-3">
        {lang === 'en' ? 'Complete service record' : 'Registo completo de serviços'}
      </h2>
      <p className="font-light text-sm text-dark-gray max-w-2xl mb-6">
        {lang === 'en'
          ? `${allVehicles.length} vehicles in the fleet. Search by plate, model, service type, or unit. Click to expand full history.`
          : `${allVehicles.length} viaturas na frota. Pesquise por matrícula, modelo, tipo de serviço ou unidade. Clique para expandir.`}
      </p>

      {/* Search bar */}
      <div className="relative max-w-md mb-6">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-med-light-gray" />
        <input
          type="text"
          className="w-full pl-11 pr-4 py-3 border border-light-gray font-light text-sm outline-none transition-all duration-300 focus:border-teal focus:shadow-[0_0_0_3px_rgba(65,90,103,0.08)]"
          placeholder={lang === 'en' ? 'Search plate, model, service...' : 'Pesquisar matrícula, modelo, serviço...'}
          value={search}
          onChange={(e) => { setSearch(e.target.value); setVisibleCount(PAGE_SIZE); }}
        />
        {search && (
          <button
            onClick={() => { setSearch(''); setExpanded(null); }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-med-light-gray hover:text-dark-gray text-xs"
          >
            ✕
          </button>
        )}
      </div>

      {/* Results count */}
      {search && (
        <div className="text-xs text-med-dark-gray mb-4">
          {filtered.length} {lang === 'en' ? 'result' : 'resultado'}{filtered.length !== 1 ? 's' : ''}
          {filtered.length === 0 && (
            <span className="ml-2">— {lang === 'en' ? 'try a different search' : 'tente outra pesquisa'}</span>
          )}
        </div>
      )}

      {/* Vehicle list */}
      <div className="space-y-2">
        {visible.map(([plate, info]) => {
          const isOpen = effectiveExpanded === plate;
          return (
            <div key={plate} className={`border transition-all duration-300 ${isOpen ? 'border-teal shadow-md' : 'border-light-gray hover:border-med-light-gray'}`}>
              <div
                className="flex justify-between items-center p-4 md:px-5 cursor-pointer bg-white hover:bg-off-white transition-colors group"
                onClick={() => setExpanded(isOpen && !autoExpanded ? null : plate)}
              >
                <div className="flex items-center gap-3">
                  <Truck size={16} className={`transition-colors ${isOpen ? 'text-teal' : 'text-med-light-gray group-hover:text-teal'}`} />
                  <div>
                    <span className="font-extrabold text-base tracking-tight">{plate}</span>
                    <span className="font-light text-xs text-dark-gray ml-2">{info.mod}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="inline-block px-2.5 py-1 bg-teal text-white font-bold text-[11px] rounded-sm tabular-nums">
                    {info.n}
                  </span>
                  <span className="font-light text-xs text-med-dark-gray hidden sm:inline">
                    <Clock size={12} className="inline mr-1 -mt-0.5" />
                    {lang === 'en' ? 'avg' : 'méd'} {info.ad}{lang === 'en' ? 'd' : 'd'}
                  </span>
                  {isOpen
                    ? <ChevronUp size={18} className="text-teal" />
                    : <ChevronDown size={18} className="text-med-light-gray group-hover:text-dark-gray transition-colors" />
                  }
                </div>
              </div>

              {isOpen && (
                <div className="bg-off-white border-t border-light-gray">
                  {/* Column headers */}
                  <div className="hidden md:grid grid-cols-[110px_1fr_120px_60px] gap-3 px-5 py-2 text-[10px] font-bold uppercase tracking-[1.5px] text-teal border-b border-light-gray">
                    <div className="flex items-center gap-1"><CalendarDays size={10} /> {lang === 'en' ? 'Date' : 'Data'}</div>
                    <div>{lang === 'en' ? 'Service' : 'Serviço'}</div>
                    <div className="flex items-center gap-1"><MapPin size={10} /> {lang === 'en' ? 'Unit' : 'Unidade'}</div>
                    <div className="flex items-center gap-1"><Clock size={10} /> {lang === 'en' ? 'Days' : 'Dias'}</div>
                  </div>
                  {/* Entries */}
                  {info.e.map((entry: any, i: number) => (
                    <div key={i} className="grid grid-cols-1 md:grid-cols-[110px_1fr_120px_60px] gap-1 md:gap-3 px-5 py-3 md:py-2 border-b border-light-gray/50 text-[13px] font-light last:border-0 hover:bg-white/50 transition-colors">
                      <div className="text-dark-gray tabular-nums flex items-center gap-1">
                        <span className="md:hidden text-[10px] text-teal font-bold uppercase">
                          {lang === 'en' ? 'Date: ' : 'Data: '}
                        </span>
                        {entry.d}
                      </div>
                      <div className="text-off-black" title={entry.s}>
                        {translateService(entry.s, lang)}
                      </div>
                      <div className="text-dark-gray flex items-center gap-1">
                        <MapPin size={11} className="text-med-light-gray flex-shrink-0 hidden md:inline" />
                        <span className="truncate">{entry.u}</span>
                      </div>
                      <div className="tabular-nums">
                        <span className={`font-semibold ${entry.wd < 0 ? 'text-med-dark-gray italic' : entry.wd === 0 ? 'text-teal' : entry.wd > 10 ? 'text-dark-gray' : 'text-off-black'}`}>
                          {entry.wd < 0 ? '—' : `${entry.wd}d`}
                        </span>
                      </div>
                    </div>
                  ))}
                  {/* Summary footer */}
                  <div className="flex items-center justify-between px-5 py-3 bg-teal-10 text-xs">
                    <span className="text-teal font-semibold">
                      {info.n} {lang === 'en' ? 'total interventions' : 'intervenções no total'}
                    </span>
                    <span className="text-dark-gray">
                      {lang === 'en' ? 'Total working days' : 'Total dias úteis'}: <b>{info.e.reduce((s: number, e: any) => s + Math.max(0, e.wd), 0)}d</b>
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Load more */}
      {hasMore && (
        <div className="text-center mt-8">
          <button
            onClick={() => setVisibleCount(v => v + PAGE_SIZE)}
            className="px-8 py-3 border border-teal text-teal font-semibold text-sm tracking-wide hover:bg-teal hover:text-white transition-all duration-300"
          >
            {lang === 'en'
              ? `Show more (${filtered.length - visibleCount} remaining)`
              : `Mostrar mais (${filtered.length - visibleCount} restantes)`}
          </button>
        </div>
      )}

      {/* Show all button when partially loaded */}
      {hasMore && filtered.length - visibleCount > PAGE_SIZE && (
        <div className="text-center mt-3">
          <button
            onClick={() => setVisibleCount(filtered.length)}
            className="text-xs text-med-dark-gray hover:text-teal transition-colors underline"
          >
            {lang === 'en' ? 'Show all vehicles' : 'Mostrar todas as viaturas'}
          </button>
        </div>
      )}
    </section>
  );
}

import React from 'react';
import { VEHICLES, FLEET_AGE, ODOMETER_SNAPSHOT, ODOMETER_DATE, UNIT_EFFICIENCY } from '../data';
import { AlertTriangle, MapPin, Calendar, Gauge, Shield } from 'lucide-react';

/* ── long-immobilisation alert trucks ── */
function getAlertTrucks() {
  return Object.entries(VEHICLES)
    .map(([plate, v]) => {
      const longCases = v.e.filter((e: any) => e.wd > 10);
      return { plate, mod: v.mod, n: v.n, twd: v.twd, awd: v.awd, longCases };
    })
    .filter(t => t.twd > 25 || t.longCases.length > 0)
    .sort((a, b) => b.twd - a.twd)
    .slice(0, 8);
}

/* ── preventive ratio per vehicle ── */
function getPreventiveRatio() {
  const prevKeywords = ['revisão básica', 'revisão completa', 'baterias', 'substituição de baterias', 'substituir baterias'];
  return Object.entries(VEHICLES)
    .filter(([_, v]) => v.n >= 4)
    .map(([plate, v]) => {
      const prev = v.e.filter((e: any) => prevKeywords.some(k => e.s.toLowerCase().includes(k))).length;
      return { plate, mod: v.mod, total: v.n, prev, corr: v.n - prev, ratio: Math.round((prev / v.n) * 100) };
    })
    .sort((a, b) => a.ratio - b.ratio);
}

/* ── age distribution ── */
function getAgeDistribution() {
  const bands: Record<string, number> = {};
  Object.values(FLEET_AGE).forEach((a: any) => {
    const key = String(a.yr);
    bands[key] = (bands[key] || 0) + 1;
  });
  return bands;
}

export function FleetInsights({ lang }: { lang: 'en' | 'pt' }) {
  const en = lang === 'en';
  const alerts = getAlertTrucks();
  const prevRatios = getPreventiveRatio();
  const ageDist = getAgeDistribution();
  const totalAge = Object.values(ageDist).reduce((a, b) => a + b, 0);

  return (
    <section id="sec-insights" className="py-20 px-6 md:px-15 fade-in">
      <div className="max-w-6xl mx-auto">
        {/* header */}
        <div className="font-light text-xs tracking-[3px] uppercase text-teal mb-1">
          {en ? 'Fleet Intelligence' : 'Inteligência da Frota'}
        </div>
        <h2 className="font-extrabold text-[clamp(26px,3.5vw,42px)] tracking-tight leading-[1.1] mb-3">
          {en ? 'Health Insights' : 'Análise de Saúde'}
        </h2>
        <p className="font-light text-sm text-dark-gray max-w-xl mb-12">
          {en
            ? 'Fleet health intelligence based on Jan 2025 – Feb 2026 service data: efficiency benchmarks, age profile, and maintenance patterns.'
            : 'Inteligência de saúde da frota baseada nos dados de serviço Jan 2025 – Fev 2026: benchmarks de eficiência, perfil etário e padrões de manutenção.'}
        </p>

        {/* ── ROW 1: Unit efficiency + Fleet age ── */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* Unit efficiency */}
          <div className="bg-off-white p-6">
            <div className="flex items-center gap-2 mb-4">
              <MapPin size={16} className="text-teal" />
              <h3 className="font-extrabold text-sm tracking-tight">
                {en ? 'Efficiency by Service Unit' : 'Eficiência por Unidade'}
              </h3>
            </div>
            <div className="space-y-4">
              {UNIT_EFFICIENCY.map((unit: any) => (
                <div key={unit.id} className="flex items-center gap-4">
                  <div className="w-[120px] flex-shrink-0">
                    <div className="font-semibold text-sm">{unit.en}</div>
                    <div className="text-[10px] text-med-dark-gray">{unit.interventions} {en ? 'interventions' : 'intervenções'}</div>
                  </div>
                  <div className="flex-1">
                    <div className="flex gap-3 items-baseline">
                      <div className="text-center">
                        <div className="font-extrabold text-2xl text-teal">{unit.avgWorkDays}d</div>
                        <div className="text-[9px] text-med-dark-gray uppercase tracking-wider">{en ? 'working' : 'úteis'}</div>
                      </div>
                      <div className="text-med-light-gray text-xs">vs</div>
                      <div className="text-center">
                        <div className="font-bold text-lg text-med-dark-gray line-through opacity-60">{unit.avgCalDays}d</div>
                        <div className="text-[9px] text-med-dark-gray uppercase tracking-wider">{en ? 'calendar' : 'calendário'}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-med-dark-gray mt-4">
              {en
                ? 'Working days exclude weekends and Angola public holidays.'
                : 'Dias úteis excluem fins-de-semana e feriados angolanos.'}
            </p>
          </div>

          {/* Fleet age profile */}
          <div className="bg-off-white p-6">
            <div className="flex items-center gap-2 mb-4">
              <Calendar size={16} className="text-teal" />
              <h3 className="font-extrabold text-sm tracking-tight">
                {en ? 'Fleet Age Profile' : 'Perfil Etário da Frota'}
              </h3>
            </div>
            <div className="space-y-3">
              {Object.entries(ageDist).reverse().map(([yr, count]) => {
                const age = 2026 - parseInt(yr);
                const pct = totalAge > 0 ? Math.round((count / totalAge) * 100) : 0;
                return (
                  <div key={yr}>
                    <div className="flex justify-between items-baseline mb-1">
                      <span className="text-sm">
                        <span className="font-semibold">{en ? 'Model Year' : 'Ano Modelo'} {yr}</span>
                        <span className="text-med-dark-gray text-xs ml-2">({age} {en ? 'years old' : 'anos'})</span>
                      </span>
                      <span className="font-extrabold text-sm">{count} <span className="font-normal text-xs text-med-dark-gray">({pct}%)</span></span>
                    </div>
                    <div className="h-3 bg-white rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-700 bg-teal" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="text-[10px] text-med-dark-gray mt-4">
              {en
                ? 'Fleet age data from NORS vehicle registry. 57 vehicles across the Shoprite fleet.'
                : 'Dados de idade do registo de viaturas NORS. 57 viaturas na frota Shoprite.'}
            </p>
          </div>
        </div>

        {/* ── ROW 2: Alert trucks ── */}
        <div className="bg-off-white p-6 mb-12">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle size={16} className="text-teal" />
            <h3 className="font-extrabold text-sm tracking-tight">
              {en ? 'Fleet Health Alerts — Highest Immobilization' : 'Alertas de Saúde — Maior Imobilização'}
            </h3>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {alerts.map((truck) => {
              const km = ODOMETER_SNAPSHOT[truck.plate as keyof typeof ODOMETER_SNAPSHOT];
              const age = FLEET_AGE[truck.plate as keyof typeof FLEET_AGE];
              return (
                <div key={truck.plate} className="bg-white p-4 border-t-[3px] border-teal hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-extrabold text-base tracking-tight">{truck.plate}</div>
                      <div className="text-[10px] text-med-dark-gray">{truck.mod}{age ? ` · ${(age as any).yr}` : ''}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-extrabold text-xl text-teal">{truck.twd}d</div>
                      <div className="text-[9px] text-med-dark-gray uppercase">{en ? 'work days' : 'dias úteis'}</div>
                    </div>
                  </div>
                  <div className="text-xs text-dark-gray space-y-0.5">
                    <div>{truck.n} {en ? 'interventions' : 'intervenções'} · {en ? 'avg' : 'média'} {truck.awd}d</div>
                    {km && (
                      <div className="flex items-center gap-1 text-med-dark-gray">
                        <Gauge size={10} />
                        <span>{(km/1000).toFixed(0)}k km</span>
                        <span className="text-[9px] italic">({en ? `rec. ${ODOMETER_DATE}` : `reg. ${ODOMETER_DATE}`})</span>
                      </div>
                    )}
                    {truck.longCases.length > 0 && (
                      <div className="text-[10px] mt-1 text-med-dark-gray">
                        {truck.longCases.length} {en ? 'case(s) >10 working days' : 'caso(s) >10 dias úteis'}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <p className="text-[10px] text-med-dark-gray mt-3">
            {en
              ? 'Odometer readings are last recorded values (Jun 2025) — current mileage will be significantly higher.'
              : 'Leituras de odómetro são últimos valores registados (Jun 2025) — quilometragem actual será significativamente superior.'}
          </p>
        </div>

        {/* ── ROW 3: Preventive ratios ── */}
        <div className="bg-off-white p-6">
          <div className="flex items-center gap-2 mb-4">
            <Shield size={16} className="text-teal" />
            <h3 className="font-extrabold text-sm tracking-tight">
              {en ? 'Preventive vs Corrective — By Vehicle' : 'Preventiva vs Correctiva — Por Viatura'}
            </h3>
          </div>
          <p className="text-xs text-dark-gray mb-4">
            {en
              ? 'Vehicles with 4+ interventions. Lower preventive ratios may indicate maintenance scheduling opportunities.'
              : 'Viaturas com 4+ intervenções. Rácios preventivos baixos podem indicar oportunidades de agendamento de manutenção.'}
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2">
            {prevRatios.slice(0, 12).map((v) => {
              const barColor = v.ratio < 35 ? '#415A67' : v.ratio < 50 ? '#7a8f9a' : '#9CC7DE';
              return (
                <div key={v.plate} className="bg-white px-3 py-2 flex items-center gap-3">
                  <div className="w-[70px] flex-shrink-0">
                    <div className="font-bold text-xs">{v.plate}</div>
                    <div className="text-[9px] text-med-dark-gray">{v.total} int.</div>
                  </div>
                  <div className="flex-1">
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden flex">
                      <div className="h-full rounded-l-full" style={{ width: `${v.ratio}%`, background: barColor }} />
                      <div className="h-full rounded-r-full" style={{ width: `${100 - v.ratio}%`, background: '#e5e7eb' }} />
                    </div>
                  </div>
                  <div className="w-[35px] text-right font-bold text-xs" style={{ color: barColor }}>
                    {v.ratio}%
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex gap-6 mt-3 text-[10px] text-med-dark-gray">
            <span><span className="inline-block w-2 h-2 rounded-sm mr-1" style={{background:'#415A67'}}/>{en ? 'Low (<35%)' : 'Baixo (<35%)'}</span>
            <span><span className="inline-block w-2 h-2 rounded-sm mr-1" style={{background:'#7a8f9a'}}/>{en ? 'Medium (35-50%)' : 'Médio (35-50%)'}</span>
            <span><span className="inline-block w-2 h-2 rounded-sm mr-1" style={{background:'#9CC7DE'}}/>{en ? 'Good (>50%)' : 'Bom (>50%)'}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

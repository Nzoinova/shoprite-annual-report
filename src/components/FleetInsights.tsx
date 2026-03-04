import React, { useState } from 'react';
import { VEHICLES, FLEET_AGE, ODOMETER_SNAPSHOT, ODOMETER_DATE, PROBLEM_CATEGORIES, UNIT_EFFICIENCY, DELAY_ROOT_CAUSES } from '../data';
import { AlertTriangle, Clock, MapPin, Wrench, TrendingDown, Calendar, Gauge, Shield } from 'lucide-react';

/* ── helpers ── */
function ageBand(yr: number): string {
  if (!yr) return '?';
  const age = 2026 - yr;
  if (age <= 7) return '5–7 yr';
  if (age <= 9) return '8–9 yr';
  return '10+ yr';
}

/* ── long-immobilisation alert trucks ── */
function getAlertTrucks() {
  return Object.entries(VEHICLES)
    .map(([plate, v]) => {
      const longCases = v.e.filter((e: any) => e.i > 15);
      return { plate, mod: v.mod, n: v.n, twd: v.twd, awd: v.awd, longCases };
    })
    .filter(t => t.twd > 30 || t.longCases.length > 0)
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
  const bands: Record<string, number> = { '2016': 0, '2017': 0, '2018': 0 };
  Object.values(FLEET_AGE).forEach(a => {
    const key = String(a.yr);
    if (bands[key] !== undefined) bands[key]++;
  });
  return bands;
}

/* ── component ── */
export function FleetInsights({ lang }: { lang: 'en' | 'pt' }) {
  const en = lang === 'en';
  const alerts = getAlertTrucks();
  const prevRatios = getPreventiveRatio();
  const ageDist = getAgeDistribution();
  const totalAge = Object.values(ageDist).reduce((a, b) => a + b, 0);

  const priColors: Record<string, string> = {
    critical: '#dc2626', high: '#ea580c', medium: '#d97706', routine: '#415A67', low: '#9CC7DE',
  };

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
            ? 'Actionable fleet intelligence: problem patterns, age profile, and efficiency benchmarks to support maintenance planning decisions.'
            : 'Inteligência accionável: padrões de problemas, perfil etário e benchmarks de eficiência para decisões de planeamento de manutenção.'}
        </p>

        {/* ── ROW 1: Problem categories + Delay causes ── */}
        <div className="grid md:grid-cols-5 gap-6 mb-12">
          {/* Problem categories (3 cols) */}
          <div className="md:col-span-3 bg-off-white p-6">
            <div className="flex items-center gap-2 mb-4">
              <Wrench size={16} className="text-teal" />
              <h3 className="font-extrabold text-sm tracking-tight">
                {en ? 'Problem Categories — Avg. Working Days' : 'Categorias de Problemas — Média Dias Úteis'}
              </h3>
            </div>
            <div className="space-y-2">
              {PROBLEM_CATEGORIES.sort((a: any, b: any) => b.avg - a.avg).slice(0, 8).map((cat: any) => {
                const maxAvg = 20.3;
                const pct = Math.min((cat.avg / maxAvg) * 100, 100);
                return (
                  <div key={cat.id} className="flex items-center gap-3 text-xs">
                    <div className="w-[130px] flex-shrink-0 font-medium text-off-black truncate">{en ? cat.en : cat.pt}</div>
                    <div className="flex-1 h-5 bg-white rounded-sm overflow-hidden relative">
                      <div
                        className="h-full rounded-sm transition-all duration-700"
                        style={{ width: `${pct}%`, background: priColors[cat.pri] || '#415A67' }}
                      />
                    </div>
                    <div className="w-[50px] text-right font-bold" style={{ color: priColors[cat.pri] }}>
                      {cat.avg}d
                    </div>
                    <div className="w-[40px] text-right text-med-dark-gray">{cat.count}×</div>
                  </div>
                );
              })}
            </div>
            <p className="text-[10px] text-med-dark-gray mt-3">
              {en ? 'Working days only (weekends & Angola public holidays excluded)' : 'Apenas dias úteis (excluídos fins-de-semana e feriados angolanos)'}
            </p>
          </div>

          {/* Delay root causes (2 cols) */}
          <div className="md:col-span-2 bg-off-white p-6">
            <div className="flex items-center gap-2 mb-4">
              <Clock size={16} className="text-teal" />
              <h3 className="font-extrabold text-sm tracking-tight">
                {en ? 'Extended Delay Causes' : 'Causas de Atraso Prolongado'}
              </h3>
            </div>
            <p className="text-xs text-dark-gray mb-5">
              {en ? 'Why immobilization exceeds 15 working days:' : 'Porquê imobilização superior a 15 dias úteis:'}
            </p>
            <div className="space-y-4">
              {DELAY_ROOT_CAUSES.map((cause: any, i: number) => (
                <div key={i}>
                  <div className="flex justify-between items-baseline mb-1">
                    <span className="font-semibold text-sm">{en ? cause.en : cause.pt}</span>
                    <span className="font-extrabold text-xl text-teal">{cause.pct}%</span>
                  </div>
                  <div className="h-2 bg-white rounded-full overflow-hidden">
                    <div className="h-full bg-teal rounded-full transition-all duration-700" style={{ width: `${cause.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-5 p-3 bg-white rounded border-l-[3px] border-teal">
              <p className="text-[10px] text-dark-gray leading-relaxed">
                {en
                  ? 'Parts import accounts for 60% of delays >15 days. International sourcing for specialized components (solenoid valves, clutch kits, APM modules) requires customs clearance adding 5–15 business days.'
                  : 'Importação de peças é responsável por 60% dos atrasos >15 dias. Sourcing internacional de componentes especializados (válvulas solenóides, kits de embraiagem, módulos APM) requer desalfandegamento que adiciona 5–15 dias úteis.'}
              </p>
            </div>
          </div>
        </div>

        {/* ── ROW 2: Unit efficiency + Fleet age ── */}
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
                const pct = Math.round((count / totalAge) * 100);
                const color = age <= 8 ? '#415A67' : age <= 9 ? '#d97706' : '#dc2626';
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
                      <div className="h-full rounded-full transition-all duration-700" style={{ width: `${pct}%`, background: color }} />
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="text-[10px] text-med-dark-gray mt-4">
              {en
                ? 'Fleet age data from NORS vehicle registry. 100% Volvo trucks, all operational.'
                : 'Dados de idade do registo de viaturas NORS. 100% camiões Volvo, todos operacionais.'}
            </p>
          </div>
        </div>

        {/* ── ROW 3: Alert trucks ── */}
        <div className="bg-off-white p-6 mb-12">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle size={16} className="text-teal" />
            <h3 className="font-extrabold text-sm tracking-tight">
              {en ? 'Fleet Health Alerts — Highest Immobilization' : 'Alertas de Saúde — Maior Imobilização'}
            </h3>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {alerts.map((truck, i) => {
              const km = ODOMETER_SNAPSHOT[truck.plate as keyof typeof ODOMETER_SNAPSHOT];
              const age = FLEET_AGE[truck.plate as keyof typeof FLEET_AGE];
              return (
                <div key={truck.plate} className="bg-white p-4 border-t-[3px] border-teal hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-extrabold text-base tracking-tight">{truck.plate}</div>
                      <div className="text-[10px] text-med-dark-gray">{truck.mod}{age ? ` · ${age.yr}` : ''}</div>
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
                      <div className="text-[10px] mt-1 text-amber-700">
                        {truck.longCases.length} {en ? 'case(s) >15 days' : 'caso(s) >15 dias'}
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

        {/* ── ROW 4: Preventive ratios ── */}
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
              const barColor = v.ratio < 35 ? '#dc2626' : v.ratio < 50 ? '#d97706' : '#415A67';
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
            <span><span className="inline-block w-2 h-2 rounded-full mr-1" style={{background:'#dc2626'}}/>{en ? 'Low (<35%)' : 'Baixo (<35%)'}</span>
            <span><span className="inline-block w-2 h-2 rounded-full mr-1" style={{background:'#d97706'}}/>{en ? 'Medium (35-50%)' : 'Médio (35-50%)'}</span>
            <span><span className="inline-block w-2 h-2 rounded-full mr-1" style={{background:'#415A67'}}/>{en ? 'Good (>50%)' : 'Bom (>50%)'}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

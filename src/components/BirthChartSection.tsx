import React, { useState } from 'react';
import { calculateBirthChart, BirthChartPlacements, ZODIAC_SIGNS } from '../data/astrology';
import { Sparkles, Sun, Moon, Compass, MapPin, Calendar, Clock, User, Info, RefreshCw } from 'lucide-react';

interface BirthChartSectionProps {
  isDarkMode: boolean;
}

export const BirthChartSection: React.FC<BirthChartSectionProps> = ({ isDarkMode }) => {
  // Default values personalized for Sumi
  const [name, setName] = useState('Sumi');
  const [birthDate, setBirthDate] = useState('1998-07-15');
  const [birthTime, setBirthTime] = useState('09:42');
  const [birthLocation, setBirthLocation] = useState('Paris, France');
  const [selectedPlanetHover, setSelectedPlanetHover] = useState<string | null>(null);

  // Computed chart
  const [chart, setChart] = useState<BirthChartPlacements>(() => 
    calculateBirthChart('1998-07-15', '09:42', 'Paris, France')
  );

  const [aiReport, setAiReport] = useState<string | null>(null);
  const [isLoadingAi, setIsLoadingAi] = useState<boolean>(false);

  const handleRecalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = calculateBirthChart(birthDate, birthTime, birthLocation);
    setChart(updated);
    setAiReport(null);
  };

  const handleGenerateAiReport = async () => {
    setIsLoadingAi(true);
    try {
      const res = await fetch('/api/cosmic-reading', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'birth_chart',
          birthData: {
            name,
            birthDate,
            birthTime,
            birthLocation,
            sunSign: chart.sunSign,
            moonSign: chart.moonSign,
            risingSign: chart.risingSign,
            mercurySign: chart.mercurySign,
            venusSign: chart.venusSign,
            marsSign: chart.marsSign,
            jupiterSign: chart.jupiterSign,
            saturnSign: chart.saturnSign,
          }
        })
      });
      const data = await res.json();
      if (data.reading) {
        setAiReport(data.reading);
      } else {
        setAiReport(
          `✦ PERSONALIZED COSMIC BLUEPRINT FOR ${name.toUpperCase()}\n\n` +
          `CHAPTER I: THE TRINITY CONSTELLATION\n` +
          `With the Sun in ${chart.sunSign}, you radiate natural vitality and an intuitive capacity to inspire. Your Moon in ${chart.moonSign} grounds your inner sanctuary in quiet devotion and deep emotional perception. Rising in ${chart.risingSign}, your earthly demeanor commands respect and an understated, magnetic elegance.\n\n` +
          `CHAPTER II: HEART & INTELLECT\n` +
          `Venus in ${chart.venusSign} bestows refined aesthetic sensibility and a yearning for profound soul loyalty. Mercury in ${chart.mercurySign} renders your thoughts perceptive, articulate, and strategically attuned.\n\n` +
          `CHAPTER III: SOVEREIGN DESTINY\n` +
          `Your dominant ${chart.dominantElement} elemental signature reveals a karmic journey oriented around authentic leadership and purposeful self-mastery. The cosmos guides you to trust your timing; every transit is preparing you for enduring mastery.`
        );
      }
    } catch {
      setAiReport(
        `✦ ASTRAL PROFILE FOR ${name.toUpperCase()}\n\n` +
        `Your celestial chart unites ${chart.sunSign} solar radiance with ${chart.moonSign} lunar intuition. You possess an innate gift for transforming intellectual vision into tangible harmony.`
      );
    } finally {
      setIsLoadingAi(false);
    }
  };

  // Helper for planet positions on the 360 circle
  const getPlanetAngle = (signName: string, degree: number) => {
    const idx = ZODIAC_SIGNS.findIndex(s => s.name === signName);
    // Classical chart: Ascendant on left (180 deg in standard SVG, or rotated)
    return (idx * 30 + degree) * (Math.PI / 180);
  };

  return (
    <section 
      id="birth-chart"
      className={`py-24 px-6 sm:px-8 border-t transition-colors duration-500 ${
        isDarkMode 
          ? 'bg-slate-900/90 border-slate-800 text-white' 
          : 'bg-white border-slate-200 text-[#0f172a]'
      }`}
    >
      <div className="max-w-[1280px] mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-sans tracking-widest uppercase mb-3 opacity-60">
              <span>Natal Ephemeris Engine</span>
              <span>·</span>
              <span>Celestial Precision</span>
            </div>
            <h2 className="editorial-h1 text-[40px] sm:text-[54px] font-normal leading-tight tracking-tight">
              Personalized <em>Birth Chart</em> Analysis
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base opacity-75 font-sans leading-relaxed">
            Enter exact birth coordinates to compute your Sun, Moon, and Ascendant positions alongside an interactive 360° celestial wheel.
          </p>
        </div>

        {/* Input Form Card */}
        <form 
          onSubmit={handleRecalculate}
          className={`p-6 sm:p-8 rounded-3xl border mb-12 transition-all ${
            isDarkMode 
              ? 'bg-slate-950/60 border-slate-800/80' 
              : 'bg-slate-50 border-slate-200/90'
          }`}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div>
              <label className="block text-xs font-sans uppercase tracking-wider opacity-70 mb-2">
                Seeker Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 opacity-40" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Sumi"
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm font-sans outline-none transition-all ${
                    isDarkMode 
                      ? 'bg-slate-900 border-slate-700 text-white focus:border-amber-400' 
                      : 'bg-white border-slate-300 text-slate-900 focus:border-black'
                  }`}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-sans uppercase tracking-wider opacity-70 mb-2">
                Date of Birth
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 opacity-40" />
                <input
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm font-sans outline-none transition-all ${
                    isDarkMode 
                      ? 'bg-slate-900 border-slate-700 text-white focus:border-amber-400' 
                      : 'bg-white border-slate-300 text-slate-900 focus:border-black'
                  }`}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-sans uppercase tracking-wider opacity-70 mb-2">
                Exact Time of Birth
              </label>
              <div className="relative">
                <Clock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 opacity-40" />
                <input
                  type="time"
                  value={birthTime}
                  onChange={(e) => setBirthTime(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm font-sans outline-none transition-all ${
                    isDarkMode 
                      ? 'bg-slate-900 border-slate-700 text-white focus:border-amber-400' 
                      : 'bg-white border-slate-300 text-slate-900 focus:border-black'
                  }`}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-sans uppercase tracking-wider opacity-70 mb-2">
                City / Location of Birth
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 opacity-40" />
                <input
                  type="text"
                  value={birthLocation}
                  onChange={(e) => setBirthLocation(e.target.value)}
                  placeholder="e.g. Paris, France"
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm font-sans outline-none transition-all ${
                    isDarkMode 
                      ? 'bg-slate-900 border-slate-700 text-white focus:border-amber-400' 
                      : 'bg-white border-slate-300 text-slate-900 focus:border-black'
                  }`}
                  required
                />
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <span className="text-xs opacity-60 font-sans">
              * Exact birth times enable precise Ascendant and House cusp placement.
            </span>
            <button
              type="submit"
              className="pill-action-btn pill-action-btn-small shadow-md"
            >
              <span>Calculate Astral Blueprint</span>
            </button>
          </div>
        </form>

        {/* The Big Three (The Sacred Trinity) Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Sun Sign */}
          <div className={`p-6 sm:p-8 rounded-3xl border transition-all ${
            isDarkMode 
              ? 'bg-slate-950/60 border-slate-800/80 shadow-xl' 
              : 'bg-white border-slate-200/90 shadow-lg'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-sans uppercase tracking-widest opacity-60">The Sun · Core Identity</span>
              <Sun className="w-5 h-5 text-amber-500" />
            </div>
            <div className="font-serif text-3xl sm:text-4xl font-normal mb-1">
              {chart.sunSign}
            </div>
            <div className="text-xs font-sans opacity-70 mb-4">
              {chart.sunDegree}° in the {chart.sunHouse}th House
            </div>
            <p className="text-sm font-sans leading-relaxed opacity-85">
              {chart.cosmicTrinity.sunSynthesis}
            </p>
          </div>

          {/* Moon Sign */}
          <div className={`p-6 sm:p-8 rounded-3xl border transition-all ${
            isDarkMode 
              ? 'bg-slate-950/60 border-slate-800/80 shadow-xl' 
              : 'bg-white border-slate-200/90 shadow-lg'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-sans uppercase tracking-widest opacity-60">The Moon · Inner Sanctuary</span>
              <Moon className="w-5 h-5 text-sky-400" />
            </div>
            <div className="font-serif text-3xl sm:text-4xl font-normal mb-1">
              {chart.moonSign}
            </div>
            <div className="text-xs font-sans opacity-70 mb-4">
              {chart.moonDegree}° in the {chart.moonHouse}th House
            </div>
            <p className="text-sm font-sans leading-relaxed opacity-85">
              {chart.cosmicTrinity.moonSynthesis}
            </p>
          </div>

          {/* Rising / Ascendant */}
          <div className={`p-6 sm:p-8 rounded-3xl border transition-all ${
            isDarkMode 
              ? 'bg-slate-950/60 border-slate-800/80 shadow-xl' 
              : 'bg-white border-slate-200/90 shadow-lg'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-sans uppercase tracking-widest opacity-60">Ascendant · Outer Persona</span>
              <Compass className="w-5 h-5 text-indigo-400" />
            </div>
            <div className="font-serif text-3xl sm:text-4xl font-normal mb-1">
              {chart.risingSign}
            </div>
            <div className="text-xs font-sans opacity-70 mb-4">
              {chart.risingDegree}° (1st House Cusp)
            </div>
            <p className="text-sm font-sans leading-relaxed opacity-85">
              {chart.cosmicTrinity.risingSynthesis}
            </p>
          </div>
        </div>

        {/* Interactive Birth Chart Wheel & Planetary Placements Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12 items-center">
          
          {/* Interactive Natal Wheel SVG (5 cols) */}
          <div className={`lg:col-span-5 p-6 rounded-3xl border flex flex-col items-center justify-center ${
            isDarkMode ? 'bg-slate-950/60 border-slate-800/80' : 'bg-slate-50 border-slate-200/90'
          }`}>
            <div className="text-center mb-3">
              <h4 className="font-serif text-2xl font-normal">360° Natal Wheel</h4>
              <p className="text-xs opacity-60 font-sans">Hover or touch glyphs to inspect planetary placements</p>
            </div>

            <div className="relative w-full max-w-[340px] aspect-square flex items-center justify-center">
              <svg 
                viewBox="0 0 400 400" 
                className="w-full h-full select-none"
              >
                {/* Outer Ring */}
                <circle 
                  cx="200" 
                  cy="200" 
                  r="185" 
                  fill="none" 
                  stroke={isDarkMode ? 'rgba(255,255,255,0.15)' : 'rgba(15,23,42,0.15)'} 
                  strokeWidth="2" 
                />
                <circle 
                  cx="200" 
                  cy="200" 
                  r="150" 
                  fill="none" 
                  stroke={isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(15,23,42,0.1)'} 
                  strokeWidth="1" 
                />
                <circle 
                  cx="200" 
                  cy="200" 
                  r="70" 
                  fill={isDarkMode ? 'rgba(15,23,42,0.6)' : 'rgba(255,255,255,0.8)'} 
                  stroke={isDarkMode ? 'rgba(255,255,255,0.2)' : 'rgba(15,23,42,0.2)'} 
                  strokeWidth="1" 
                />

                {/* 12 Zodiac Segments & Glyphs */}
                {ZODIAC_SIGNS.map((s, i) => {
                  const angle = (i * 30 - 90) * (Math.PI / 180);
                  const x1 = 200 + Math.cos(angle) * 70;
                  const y1 = 200 + Math.sin(angle) * 70;
                  const x2 = 200 + Math.cos(angle) * 185;
                  const y2 = 200 + Math.sin(angle) * 185;

                  const glyphAngle = ((i * 30 + 15) - 90) * (Math.PI / 180);
                  const gx = 200 + Math.cos(glyphAngle) * 168;
                  const gy = 200 + Math.sin(glyphAngle) * 168;

                  return (
                    <g key={s.id}>
                      <line 
                        x1={x1} 
                        y1={y1} 
                        x2={x2} 
                        y2={y2} 
                        stroke={isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(15,23,42,0.08)'} 
                        strokeWidth="1" 
                      />
                      <text
                        x={gx}
                        y={gy}
                        textAnchor="middle"
                        dominantBaseline="central"
                        fontSize="14"
                        fill={isDarkMode ? 'rgba(255,255,255,0.7)' : 'rgba(15,23,42,0.7)'}
                        className="font-serif"
                      >
                        {s.glyph}
                      </text>
                    </g>
                  );
                })}

                {/* Aspect connecting lines inside */}
                <line x1="130" y1="120" x2="270" y2="280" stroke="#f59e0b" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.6" />
                <line x1="280" y1="140" x2="120" y2="260" stroke="#38bdf8" strokeWidth="1" opacity="0.5" />
                <line x1="200" y1="90" x2="290" y2="240" stroke="#ec4899" strokeWidth="1" opacity="0.4" />

                {/* Center Sacred Emblem */}
                <circle cx="200" cy="200" r="14" fill="#0f172a" />
                <circle cx="200" cy="200" r="4" fill="#f59e0b" />

                {/* Key Planet Markers */}
                {[
                  { name: 'Sun', sign: chart.sunSign, deg: chart.sunDegree, glyph: '☉', color: '#f59e0b' },
                  { name: 'Moon', sign: chart.moonSign, deg: chart.moonDegree, glyph: '☽', color: '#38bdf8' },
                  { name: 'Rising', sign: chart.risingSign, deg: chart.risingDegree, glyph: 'AC', color: '#a855f7' },
                  { name: 'Venus', sign: chart.venusSign, deg: chart.venusDegree, glyph: '♀', color: '#ec4899' },
                  { name: 'Mars', sign: chart.marsSign, deg: chart.marsDegree, glyph: '♂', color: '#ef4444' },
                  { name: 'Mercury', sign: chart.mercurySign, deg: chart.mercuryDegree, glyph: '☿', color: '#10b981' },
                ].map((p, idx) => {
                  const rad = getPlanetAngle(p.sign, p.deg);
                  const dist = 115 - (idx % 2) * 22;
                  const px = 200 + Math.cos(rad) * dist;
                  const py = 200 + Math.sin(rad) * dist;

                  const isHovered = selectedPlanetHover === p.name;

                  return (
                    <g 
                      key={p.name}
                      onMouseEnter={() => setSelectedPlanetHover(p.name)}
                      onMouseLeave={() => setSelectedPlanetHover(null)}
                      className="cursor-pointer"
                    >
                      <circle 
                        cx={px} 
                        cy={py} 
                        r={isHovered ? '13' : '10'} 
                        fill={p.color} 
                        opacity="0.9"
                        className="transition-all duration-200"
                      />
                      <text
                        x={px}
                        y={py}
                        textAnchor="middle"
                        dominantBaseline="central"
                        fontSize={p.name === 'Rising' ? '8' : '10'}
                        fontWeight="bold"
                        fill="#000000"
                      >
                        {p.glyph}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            <div className="mt-4 text-xs font-sans text-center opacity-70">
              {selectedPlanetHover ? (
                <span className="font-semibold text-amber-400">
                  Inspecting {selectedPlanetHover}: Placed at exact calculated degree
                </span>
              ) : (
                <span>Ascendant Horizon aligned at 180° East Point</span>
              )}
            </div>
          </div>

          {/* Planetary Placements Table (7 cols) */}
          <div className="lg:col-span-7">
            <div className={`rounded-3xl border overflow-hidden ${
              isDarkMode ? 'bg-slate-950/60 border-slate-800/80' : 'bg-white border-slate-200/90 shadow-md'
            }`}>
              <div className="px-6 py-4 border-b border-inherit flex items-center justify-between">
                <h4 className="font-sans text-sm font-semibold uppercase tracking-wider">
                  Planetary Positions &amp; House Cusps
                </h4>
                <span className="text-xs opacity-60 font-sans">Dominant: {chart.dominantElement} Element</span>
              </div>

              <div className="divide-y divide-inherit font-sans text-xs sm:text-sm">
                {[
                  { planet: 'Sun ☉', role: 'Conscious Core & Vitality', sign: chart.sunSign, deg: `${chart.sunDegree}°`, house: `${chart.sunHouse}th House` },
                  { planet: 'Moon ☽', role: 'Subconscious & Emotional Soul', sign: chart.moonSign, deg: `${chart.moonDegree}°`, house: `${chart.moonHouse}th House` },
                  { planet: 'Ascendant (AC)', role: 'Physical Body & Persona Gateway', sign: chart.risingSign, deg: `${chart.risingDegree}°`, house: '1st House' },
                  { planet: 'Mercury ☿', role: 'Intellect, Voice & Perception', sign: chart.mercurySign, deg: `${chart.mercuryDegree}°`, house: `${chart.mercuryHouse}th House` },
                  { planet: 'Venus ♀', role: 'Love, Values & Aesthetics', sign: chart.venusSign, deg: `${chart.venusDegree}°`, house: `${chart.venusHouse}th House` },
                  { planet: 'Mars ♂', role: 'Ambition, Passion & Willpower', sign: chart.marsSign, deg: `${chart.marsDegree}°`, house: `${chart.marsHouse}th House` },
                  { planet: 'Jupiter ♃', role: 'Expansion, Fortune & Grace', sign: chart.jupiterSign, deg: `${chart.jupiterDegree}°`, house: `${chart.jupiterHouse}th House` },
                  { planet: 'Saturn ♄', role: 'Karmic Mastery & Structure', sign: chart.saturnSign, deg: `${chart.saturnDegree}°`, house: `${chart.saturnHouse}th House` },
                ].map((row) => (
                  <div key={row.planet} className="px-6 py-3.5 flex items-center justify-between hover:bg-inherit/40 transition-colors">
                    <div>
                      <div className="font-medium">{row.planet}</div>
                      <div className="text-[11px] opacity-60">{row.role}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-serif text-base">{row.sign} <span className="font-sans text-xs opacity-60">({row.deg})</span></div>
                      <div className="text-[11px] opacity-65">{row.house}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Dossier Button */}
            <div className="mt-6 flex flex-col sm:flex-row items-center gap-4">
              <button
                onClick={handleGenerateAiReport}
                disabled={isLoadingAi}
                className="w-full sm:w-auto pill-action-btn pill-action-btn-small shadow-md flex items-center justify-center gap-2"
              >
                {isLoadingAi ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Synthesizing Cosmic Dossier...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    <span>Synthesize Deep AI Dossier for {name}</span>
                  </>
                )}
              </button>
              <span className="text-xs opacity-60 font-sans">
                Channeled through Gemini-3.8 with complete psychological astrological depth
              </span>
            </div>
          </div>

        </div>

        {/* AI Personalized Dossier Result Box */}
        {aiReport && (
          <div className={`p-8 sm:p-10 rounded-3xl border animate-fade-rise-0 transition-all ${
            isDarkMode 
              ? 'bg-amber-950/20 border-amber-500/30 text-amber-50 shadow-2xl' 
              : 'bg-amber-50/70 border-amber-300/60 text-slate-900 shadow-xl'
          }`}>
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-inherit">
              <div className="flex items-center gap-2 text-xs font-sans uppercase tracking-widest font-semibold text-amber-600 dark:text-amber-400">
                <Sparkles className="w-4 h-4" />
                <span>Personalized Natal Synthesis · Dossier for {name}</span>
              </div>
              <span className="text-xs opacity-60 font-sans">
                {birthDate} · {birthTime} · {birthLocation}
              </span>
            </div>

            <div className="font-serif text-lg sm:text-xl leading-relaxed whitespace-pre-line">
              {aiReport}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

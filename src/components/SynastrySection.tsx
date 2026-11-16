import React, { useState } from 'react';
import { ZODIAC_SIGNS, ZodiacSignInfo } from '../data/astrology';
import { Heart, Sparkles, Flame, Droplets, Wind, Mountain } from 'lucide-react';

interface SynastrySectionProps {
  isDarkMode: boolean;
}

export const SynastrySection: React.FC<SynastrySectionProps> = ({ isDarkMode }) => {
  const [signA, setSignA] = useState<ZodiacSignInfo>(ZODIAC_SIGNS[3]); // Cancer
  const [signB, setSignB] = useState<ZodiacSignInfo>(ZODIAC_SIGNS[7]); // Scorpio

  // Compatibility calculation based on elemental chemistry
  const calculateChemistry = () => {
    const isSame = signA.id === signB.id;
    const sameElement = signA.element === signB.element;
    const complementary = 
      (signA.element === 'Fire' && signB.element === 'Air') ||
      (signA.element === 'Air' && signB.element === 'Fire') ||
      (signA.element === 'Earth' && signB.element === 'Water') ||
      (signA.element === 'Water' && signB.element === 'Earth');

    let overallScore = 78;
    let elementalSynthesis = 'A dynamic, magnetic contrast requiring conscious understanding.';

    if (sameElement) {
      overallScore = 95;
      elementalSynthesis = `Both resonate in the sacred realm of ${signA.element}. Intuitive telepathy and effortless understanding define this union.`;
    } else if (complementary) {
      overallScore = 92;
      elementalSynthesis = `${signA.element} feeds and enriches ${signB.element}. This is an alchemy of mutual elevation and inspiring growth.`;
    } else if (isSame) {
      overallScore = 88;
      elementalSynthesis = `Mirror souls of ${signA.name}. You see your own brilliance and shadow reflected in high-contrast clarity.`;
    } else {
      overallScore = 76;
      elementalSynthesis = `An intriguing polarity between ${signA.element} and ${signB.element}. Fascinating growth occurs when differences are honored as sacred art.`;
    }

    return {
      overallScore,
      loveScore: Math.min(99, overallScore + (signA.rulingPlanet === 'Venus' || signB.rulingPlanet === 'Venus' ? 4 : 0)),
      intellectScore: Math.min(98, overallScore - 2 + (signA.element === 'Air' || signB.element === 'Air' ? 5 : 0)),
      longevityScore: Math.min(96, overallScore + (signA.element === 'Earth' || signB.element === 'Earth' ? 6 : 0)),
      elementalSynthesis
    };
  };

  const chemistry = calculateChemistry();

  return (
    <section 
      id="compatibility"
      className={`py-24 px-6 sm:px-8 border-t transition-colors duration-500 ${
        isDarkMode 
          ? 'bg-slate-900/80 border-slate-800 text-white' 
          : 'bg-white border-slate-200 text-[#0f172a]'
      }`}
    >
      <div className="max-w-[1280px] mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-sans tracking-widest uppercase mb-3 opacity-60">
              <span>Synastry &amp; Cosmic Chemistry</span>
              <span>·</span>
              <span>Celestial Resonance</span>
            </div>
            <h2 className="editorial-h1 text-[40px] sm:text-[54px] font-normal leading-tight tracking-tight">
              Astrological <em>Compatibility</em> Explorer
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base opacity-75 font-sans leading-relaxed">
            Examine the elemental harmony and romantic frequency between two celestial archetypes.
          </p>
        </div>

        {/* Sign Comparison Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          {/* Sign A */}
          <div className={`p-6 rounded-3xl border ${
            isDarkMode ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}>
            <label className="block text-xs font-sans uppercase tracking-wider opacity-60 mb-3">
              First Celestial Archetype (You / Seeker)
            </label>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-4xl">{signA.glyph}</span>
              <div>
                <select
                  value={signA.id}
                  onChange={(e) => {
                    const found = ZODIAC_SIGNS.find(s => s.id === e.target.value);
                    if (found) setSignA(found);
                  }}
                  className={`text-xl font-serif font-normal bg-transparent outline-none cursor-pointer border-b pb-1 ${
                    isDarkMode ? 'border-slate-700 text-white' : 'border-slate-300 text-slate-900'
                  }`}
                >
                  {ZODIAC_SIGNS.map(s => (
                    <option key={s.id} value={s.id} className="text-slate-900 bg-white">
                      {s.name} ({s.dates})
                    </option>
                  ))}
                </select>
                <div className="text-xs font-sans opacity-60 mt-1">
                  {signA.element} · {signA.modality} · Ruled by {signA.rulingPlanet}
                </div>
              </div>
            </div>
          </div>

          {/* Sign B */}
          <div className={`p-6 rounded-3xl border ${
            isDarkMode ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}>
            <label className="block text-xs font-sans uppercase tracking-wider opacity-60 mb-3">
              Second Celestial Archetype (Partner / Kin)
            </label>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-4xl">{signB.glyph}</span>
              <div>
                <select
                  value={signB.id}
                  onChange={(e) => {
                    const found = ZODIAC_SIGNS.find(s => s.id === e.target.value);
                    if (found) setSignB(found);
                  }}
                  className={`text-xl font-serif font-normal bg-transparent outline-none cursor-pointer border-b pb-1 ${
                    isDarkMode ? 'border-slate-700 text-white' : 'border-slate-300 text-slate-900'
                  }`}
                >
                  {ZODIAC_SIGNS.map(s => (
                    <option key={s.id} value={s.id} className="text-slate-900 bg-white">
                      {s.name} ({s.dates})
                    </option>
                  ))}
                </select>
                <div className="text-xs font-sans opacity-60 mt-1">
                  {signB.element} · {signB.modality} · Ruled by {signB.rulingPlanet}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Compatibility Report Card */}
        <div className={`p-8 sm:p-10 rounded-3xl border ${
          isDarkMode ? 'bg-slate-950/80 border-slate-800 shadow-2xl' : 'bg-white border-slate-200 shadow-xl'
        }`}>
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-8 mb-8 border-b border-inherit gap-6">
            <div className="flex items-center gap-4">
              <div className="text-3xl sm:text-4xl">
                {signA.glyph} <span className="opacity-40 font-serif text-2xl font-light">meets</span> {signB.glyph}
              </div>
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl font-normal">
                  {signA.name} &amp; {signB.name} Synergy
                </h3>
                <span className="text-xs font-sans opacity-60">
                  {signA.element} &amp; {signB.element} Elemental Dance
                </span>
              </div>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="font-serif text-5xl sm:text-6xl font-normal text-amber-500">
                {chemistry.overallScore}%
              </span>
              <span className="text-xs font-sans uppercase tracking-widest opacity-60">Harmonic Match</span>
            </div>
          </div>

          <p className="font-serif text-xl sm:text-2xl leading-relaxed mb-8 opacity-90">
            "{chemistry.elementalSynthesis}"
          </p>

          {/* Metric gauges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-100'}`}>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-sans uppercase tracking-wider text-rose-500 flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5" />
                  Romantic Spark
                </span>
                <span className="text-xs font-semibold">{chemistry.loveScore}%</span>
              </div>
              <div className="w-full bg-inherit rounded-full h-1.5 overflow-hidden border border-inherit">
                <div className="bg-rose-500 h-1.5 rounded-full" style={{ width: `${chemistry.loveScore}%` }} />
              </div>
            </div>

            <div className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-100'}`}>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-sans uppercase tracking-wider text-sky-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Intellectual Affinity
                </span>
                <span className="text-xs font-semibold">{chemistry.intellectScore}%</span>
              </div>
              <div className="w-full bg-inherit rounded-full h-1.5 overflow-hidden border border-inherit">
                <div className="bg-sky-400 h-1.5 rounded-full" style={{ width: `${chemistry.intellectScore}%` }} />
              </div>
            </div>

            <div className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-100'}`}>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-sans uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                  <Mountain className="w-3.5 h-3.5" />
                  Karmic Longevity
                </span>
                <span className="text-xs font-semibold">{chemistry.longevityScore}%</span>
              </div>
              <div className="w-full bg-inherit rounded-full h-1.5 overflow-hidden border border-inherit">
                <div className="bg-emerald-400 h-1.5 rounded-full" style={{ width: `${chemistry.longevityScore}%` }} />
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

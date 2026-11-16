import React, { useState } from 'react';
import { ZODIAC_SIGNS, ZodiacSignInfo } from '../data/astrology';
import { Sparkles, Heart, Briefcase, Moon, Flame, Wind, Droplets, Mountain, RefreshCw, Copy, Check } from 'lucide-react';

interface DailyHoroscopeSectionProps {
  isDarkMode: boolean;
}

export const DailyHoroscopeSection: React.FC<DailyHoroscopeSectionProps> = ({ isDarkMode }) => {
  const [selectedSign, setSelectedSign] = useState<ZodiacSignInfo>(ZODIAC_SIGNS[0]); // default Aries
  const [aiReading, setAiReading] = useState<string | null>(null);
  const [isLoadingAi, setIsLoadingAi] = useState<boolean>(false);
  const [hasCopied, setHasCopied] = useState<boolean>(false);

  const fetchAiReading = async () => {
    setIsLoadingAi(true);
    setAiReading(null);
    try {
      const response = await fetch('/api/cosmic-reading', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'daily_horoscope',
          sign: selectedSign.name,
        }),
      });

      const data = await response.json();
      if (data.reading) {
        setAiReading(data.reading);
      } else {
        // Fallback elevated reading
        setAiReading(
          `✦ COSMIC CURRENTS FOR ${selectedSign.name.toUpperCase()}\n\n` +
          `The planetary matrix aligns favorably with ${selectedSign.rulingPlanet}. An electric current of clarity flows through your energetic field today. What seemed scattered yesterday now crystallizes into purposeful intent.\n\n` +
          `✦ LOVE & INTIMACY: Speak from the heart's quiet sanctuary. Vulnerability draws profound reciprocity.\n` +
          `✦ PURPOSE & CAREER: A daring initiative receives celestial endorsement. Trust your instincts.\n` +
          `✦ COSMIC MANTRA: "I align with the rhythm of the cosmos and trust my divine sovereign path."`
        );
      }
    } catch {
      setAiReading(
        `✦ CELESTIAL BLESSING FOR ${selectedSign.name.toUpperCase()}\n\n` +
        `The stars hover in harmonious resonance. Today promises an unexpected breakthrough in creative intuition. Remain steadfast in your sovereign dignity.`
      );
    } finally {
      setIsLoadingAi(false);
    }
  };

  const handleCopy = () => {
    const textToCopy = aiReading || selectedSign.dailyOverview;
    navigator.clipboard.writeText(textToCopy);
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 2000);
  };

  const getElementIcon = (element: string) => {
    switch (element) {
      case 'Fire': return <Flame className="w-3.5 h-3.5 text-amber-500" />;
      case 'Earth': return <Mountain className="w-3.5 h-3.5 text-emerald-500" />;
      case 'Air': return <Wind className="w-3.5 h-3.5 text-sky-400" />;
      case 'Water': return <Droplets className="w-3.5 h-3.5 text-cyan-400" />;
      default: return null;
    }
  };

  return (
    <section 
      id="daily-horoscope"
      className={`py-24 px-6 sm:px-8 border-t transition-colors duration-500 ${
        isDarkMode 
          ? 'bg-slate-950/80 border-slate-800/80 text-white' 
          : 'bg-[#f8fafc] border-slate-200 text-[#0f172a]'
      }`}
    >
      <div className="max-w-[1280px] mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-sans tracking-widest uppercase mb-3 opacity-60">
              <span>Constellation Ephemeris</span>
              <span>·</span>
              <span>Today's Astral Transit</span>
            </div>
            <h2 className="editorial-h1 text-[40px] sm:text-[54px] font-normal leading-tight tracking-tight">
              Daily Horoscope &amp; <em>Planetary</em> Readings
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base opacity-75 font-sans leading-relaxed">
            Select your celestial archetype to explore today's planetary influences, soul alignment, and channeled astrological forecasts.
          </p>
        </div>

        {/* 12 Zodiac Sign Selector Ribbon */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-2 mb-12">
          {ZODIAC_SIGNS.map((sign) => {
            const isSelected = selectedSign.id === sign.id;
            return (
              <button
                key={sign.id}
                onClick={() => {
                  setSelectedSign(sign);
                  setAiReading(null);
                }}
                className={`flex flex-col items-center justify-center py-3.5 px-2 rounded-xl border text-center transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? isDarkMode
                      ? 'bg-white text-slate-950 border-white shadow-lg scale-105'
                      : 'bg-[#0f172a] text-white border-[#0f172a] shadow-lg scale-105'
                    : isDarkMode
                      ? 'bg-slate-900/60 border-slate-800/80 text-slate-300 hover:bg-slate-800/60 hover:border-slate-700'
                      : 'bg-white border-slate-200/90 text-slate-700 hover:bg-slate-100/80'
                }`}
              >
                <span className="text-xl sm:text-2xl mb-1">{sign.glyph}</span>
                <span className="text-xs font-medium font-sans truncate w-full">{sign.name}</span>
                <span className="text-[10px] opacity-60 font-sans mt-0.5 truncate w-full">
                  {sign.dates.split('–')[0]?.trim()}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Sign Detailed Dashboard */}
        <div className={`rounded-3xl border p-6 sm:p-10 transition-all ${
          isDarkMode
            ? 'bg-slate-900/40 border-slate-800/90 shadow-2xl backdrop-blur-xl'
            : 'bg-white border-slate-200/80 shadow-xl'
        }`}>
          {/* Header of the Selected Sign */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-8 mb-8 border-b border-inherit gap-6">
            <div className="flex items-center gap-5">
              <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center text-3xl sm:text-4xl shadow-inner ${
                isDarkMode ? 'bg-slate-800/80 text-amber-300' : 'bg-slate-100 text-[#0f172a]'
              }`}>
                {selectedSign.glyph}
              </div>
              <div>
                <div className="flex items-center gap-2 text-xs font-sans tracking-wider uppercase opacity-65 mb-1">
                  <span>{selectedSign.symbol}</span>
                  <span>·</span>
                  <span>{selectedSign.dates}</span>
                </div>
                <h3 className="font-serif text-3xl sm:text-4xl font-normal tracking-tight">
                  {selectedSign.name}
                  <span className="ml-3 text-lg font-sans font-light opacity-60 italic">"{selectedSign.motto}"</span>
                </h3>
                <div className="flex flex-wrap items-center gap-3 mt-2 text-xs opacity-75 font-sans">
                  <span className="inline-flex items-center gap-1">
                    {getElementIcon(selectedSign.element)}
                    {selectedSign.element} Element
                  </span>
                  <span>·</span>
                  <span>{selectedSign.modality} Modality</span>
                  <span>·</span>
                  <span>Ruled by {selectedSign.rulingPlanet}</span>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={fetchAiReading}
                disabled={isLoadingAi}
                className="pill-action-btn pill-action-btn-small shadow-md flex items-center gap-2"
              >
                {isLoadingAi ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Channeling Stars...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    <span>Channel Live AI Transit</span>
                  </>
                )}
              </button>

              <button
                onClick={handleCopy}
                className={`p-2.5 rounded-full border transition-all text-xs flex items-center justify-center ${
                  isDarkMode
                    ? 'border-slate-800 hover:bg-slate-800 text-slate-300'
                    : 'border-slate-200 hover:bg-slate-100 text-slate-700'
                }`}
                title="Copy Horoscope Insights"
              >
                {hasCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* AI Live Transmitted Reading Box (if active) */}
          {aiReading && (
            <div className={`mb-8 p-6 sm:p-8 rounded-2xl border transition-all animate-fade-rise-0 ${
              isDarkMode 
                ? 'bg-amber-950/20 border-amber-500/30 text-amber-100' 
                : 'bg-amber-50/70 border-amber-200 text-slate-900'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-xs font-sans uppercase tracking-wider font-semibold text-amber-600 dark:text-amber-400">
                  <Sparkles className="w-4 h-4" />
                  <span>Channeled AI Cosmic Dossier (Live Gemini-3.8)</span>
                </div>
                <span className="text-xs opacity-60 font-sans">
                  {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
              </div>
              <div className="font-serif text-lg sm:text-xl leading-relaxed whitespace-pre-line">
                {aiReading}
              </div>
            </div>
          )}

          {/* Curated Daily Overview */}
          <div className="mb-8">
            <h4 className="text-xs font-sans uppercase tracking-wider opacity-60 mb-2">Today's Astral Weather</h4>
            <p className="font-serif text-xl sm:text-2xl leading-relaxed font-normal opacity-95">
              "{selectedSign.dailyOverview}"
            </p>
          </div>

          {/* 4 Pillars of Insight */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-inherit">
            {/* Love */}
            <div className={`p-5 rounded-2xl border ${
              isDarkMode ? 'bg-slate-900/50 border-slate-800/80' : 'bg-slate-50 border-slate-100'
            }`}>
              <div className="flex items-center gap-2 text-xs font-medium font-sans uppercase tracking-wider text-rose-500 mb-2">
                <Heart className="w-4 h-4" />
                <span>Love &amp; Intimacy</span>
              </div>
              <p className="text-sm font-sans leading-relaxed opacity-85">
                {selectedSign.loveInsight}
              </p>
            </div>

            {/* Career */}
            <div className={`p-5 rounded-2xl border ${
              isDarkMode ? 'bg-slate-900/50 border-slate-800/80' : 'bg-slate-50 border-slate-100'
            }`}>
              <div className="flex items-center gap-2 text-xs font-medium font-sans uppercase tracking-wider text-sky-500 mb-2">
                <Briefcase className="w-4 h-4" />
                <span>Purpose &amp; Career</span>
              </div>
              <p className="text-sm font-sans leading-relaxed opacity-85">
                {selectedSign.careerInsight}
              </p>
            </div>

            {/* Wellness & Sanctuary */}
            <div className={`p-5 rounded-2xl border ${
              isDarkMode ? 'bg-slate-900/50 border-slate-800/80' : 'bg-slate-50 border-slate-100'
            }`}>
              <div className="flex items-center gap-2 text-xs font-medium font-sans uppercase tracking-wider text-emerald-500 mb-2">
                <Moon className="w-4 h-4" />
                <span>Wellness &amp; Ritual</span>
              </div>
              <p className="text-sm font-sans leading-relaxed opacity-85">
                {selectedSign.wellnessInsight}
              </p>
            </div>
          </div>

          {/* Planetary Alignment Footer Tags */}
          <div className="mt-8 pt-6 border-t border-inherit flex flex-wrap items-center justify-between gap-4 text-xs font-sans">
            <div className="flex flex-wrap items-center gap-4">
              <div>
                <span className="opacity-50">Lucky Numbers: </span>
                <span className="font-semibold">{selectedSign.luckyNumbers.join(', ')}</span>
              </div>
              <span className="opacity-30">·</span>
              <div>
                <span className="opacity-50">Aura Color: </span>
                <span className="font-semibold">{selectedSign.luckyColor}</span>
              </div>
              <span className="opacity-30">·</span>
              <div>
                <span className="opacity-50">Harmonic Affinity: </span>
                <span className="font-semibold">{selectedSign.compatibleSigns.join(', ')}</span>
              </div>
            </div>

            <div className="italic opacity-70">
              "{selectedSign.cosmicAdvice}"
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

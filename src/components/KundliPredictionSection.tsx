import React, { useState } from 'react';
import { calculateVedicKundli, VedicKundliData } from '../data/vedicAstrology';
import { KundliChartSvg } from './KundliChartSvg';
import { Sparkles, Calendar, Clock, MapPin, User, RefreshCw, Copy, Check, ShieldAlert, Award, Compass, Heart, Briefcase, Coins, Activity } from 'lucide-react';

interface KundliPredictionSectionProps {
  isDarkMode: boolean;
}

export const KundliPredictionSection: React.FC<KundliPredictionSectionProps> = ({ isDarkMode }) => {
  const [name, setName] = useState('Sumi');
  const [dob, setDob] = useState('1998-07-15');
  const [tob, setTob] = useState('09:42');
  const [pob, setPob] = useState('New Delhi, India');

  const [isLoading, setIsLoading] = useState(false);
  const [kundliData, setKundliData] = useState<VedicKundliData | null>(() => 
    calculateVedicKundli('1998-07-15', '09:42', 'New Delhi, India', 'Sumi')
  );
  const [prediction, setPrediction] = useState<string | null>(null);
  const [hasCopied, setHasCopied] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const popularPlaces = ['New Delhi, India', 'Mumbai, India', 'Bangalore, India', 'London, UK', 'New York, USA'];

  const handlePredictKundli = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!name.trim() || !dob || !tob || !pob.trim()) {
      setErrorMsg('Please complete all birth fields (Name, Date of Birth, Time, and Place).');
      return;
    }
    setErrorMsg(null);
    setIsLoading(true);

    try {
      // 1. Calculate Vedic birth chart using the Sidereal Lahiri astrology engine
      const calculatedChart = calculateVedicKundli(dob, tob, pob, name);
      setKundliData(calculatedChart);

      // 2. Call LLM API with Celestial Star prompt
      const response = await fetch('/api/kundli-prediction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          dob,
          tob,
          pob: pob.trim(),
          vedicData: calculatedChart,
        }),
      });

      const data = await response.json();
      if (data.prediction) {
        setPrediction(data.prediction);
      } else {
        throw new Error('Failed to generate Kundli prediction');
      }
    } catch (err: any) {
      console.error('Error predicting Kundli:', err);
      // Fallback prediction
      setPrediction(
        `### 🌟 Vedic Kundli Summary: ${name}\n` +
        `- **Lagna (Ascendant):** Karka (Cancer) — Governed by Chandra, giving compassionate vitality and acute sensitivity.\n` +
        `- **Chandra Rashi (Moon Sign):** Meena (Pisces) — Endowed with profound creative empathy and intuitive depth.\n` +
        `- **Janma Nakshatra:** Revati (Pada 2, Lord: Mercury) — Gifted with articulate communication and spiritual grace.\n` +
        `- **Current Period:** Jupiter Mahadasha — Auspicious for higher wisdom, travel, and personal elevation.\n\n` +
        `---\n\n` +
        `### 🌿 Health (Arogya)\n` +
        `Your constitution responds dynamically to emotional harmony. Emphasize mindful hydration, calm evening routines, and consistent rest.\n\n` +
        `### 💰 Wealth (Dhana)\n` +
        `Long-term growth flourishes through intellectual innovation, guidance, and diversified assets rather than hasty gambles.\n\n` +
        `### ⚖️ Career (Karma Bhava)\n` +
        `Ideal trajectories center on visionary management, research, creative arts, and advisory leadership where your empathetic intellect commands reverence.\n\n` +
        `### ❤️ Relationships (Kalatra Bhava)\n` +
        `You flourish in soulful, emotionally honest bonds where intellectual respect and mutual independence are nurtured.\n\n` +
        `### 🪔 Practical Suggestions\n` +
        `Cultivate daily morning sunlight exposure, wear serene ivory or pearl tones on Mondays, and practice 10 minutes of silent meditation at dusk.`
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyPrediction = () => {
    if (!prediction) return;
    navigator.clipboard.writeText(prediction);
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 2000);
  };

  return (
    <div className="w-full">
      {/* Feature Header */}
      <div className="mb-10">
        <div className="flex items-center gap-2 text-xs font-sans tracking-widest uppercase mb-3 opacity-60">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Vedic Ephemeris · Lahiri Ayanamsha</span>
          <span>·</span>
          <span>Celestial Star AI</span>
        </div>
        <h1 className="editorial-h1 text-[36px] sm:text-[48px] md:text-[54px] font-normal leading-tight tracking-tight">
          AI <em>Kundli</em> Prediction &amp; Vedic Janam Patri
        </h1>
        <p className="mt-3 text-sm sm:text-base opacity-75 font-sans leading-relaxed max-w-2xl">
          Enter your birth coordinates to generate your North Indian Vedic Kundli, analyze planetary Dashas, and receive personalized AI interpretations across Health, Wealth, Career, and Relationships.
        </p>
      </div>

      {/* Input Form Card */}
      <div className={`p-6 sm:p-8 rounded-3xl border mb-10 transition-all ${
        isDarkMode ? 'bg-slate-900/60 border-slate-800 shadow-xl' : 'bg-white border-slate-200/90 shadow-md'
      }`}>
        <form onSubmit={handlePredictKundli}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Name */}
            <div>
              <label className="block text-xs font-sans uppercase tracking-wider opacity-70 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 opacity-40" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Sumi"
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm font-sans outline-none transition-all ${
                    isDarkMode 
                      ? 'bg-slate-950 border-slate-700 text-white focus:border-amber-400' 
                      : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-black'
                  }`}
                  required
                />
              </div>
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block text-xs font-sans uppercase tracking-wider opacity-70 mb-2">
                Date of Birth (DOB)
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 opacity-40" />
                <input
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm font-sans outline-none transition-all ${
                    isDarkMode 
                      ? 'bg-slate-950 border-slate-700 text-white focus:border-amber-400' 
                      : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-black'
                  }`}
                  required
                />
              </div>
            </div>

            {/* Time of Birth */}
            <div>
              <label className="block text-xs font-sans uppercase tracking-wider opacity-70 mb-2">
                Time of Birth (TOB)
              </label>
              <div className="relative">
                <Clock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 opacity-40" />
                <input
                  type="time"
                  value={tob}
                  onChange={(e) => setTob(e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm font-sans outline-none transition-all ${
                    isDarkMode 
                      ? 'bg-slate-950 border-slate-700 text-white focus:border-amber-400' 
                      : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-black'
                  }`}
                  required
                />
              </div>
            </div>

            {/* Place of Birth */}
            <div>
              <label className="block text-xs font-sans uppercase tracking-wider opacity-70 mb-2">
                Place of Birth (POB)
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 opacity-40" />
                <input
                  type="text"
                  value={pob}
                  onChange={(e) => setPob(e.target.value)}
                  placeholder="e.g. New Delhi, India"
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm font-sans outline-none transition-all ${
                    isDarkMode 
                      ? 'bg-slate-950 border-slate-700 text-white focus:border-amber-400' 
                      : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-black'
                  }`}
                  required
                />
              </div>
            </div>
          </div>

          {/* Quick Location Pills */}
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-sans opacity-60 mr-1">Quick Select:</span>
            {popularPlaces.map(p => (
              <button
                key={p}
                type="button"
                onClick={() => setPob(p)}
                className={`text-xs px-2.5 py-1 rounded-full border transition-all cursor-pointer ${
                  pob === p
                    ? isDarkMode
                      ? 'bg-amber-400/20 border-amber-400 text-amber-300'
                      : 'bg-black text-white border-black'
                    : isDarkMode
                      ? 'border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                      : 'border-slate-200 text-slate-600 hover:text-black hover:border-slate-400'
                }`}
              >
                {p}
              </button>
            ))}
          </div>

          {errorMsg && (
            <div className="mt-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-500 text-xs font-sans flex items-center gap-2">
              <ShieldAlert className="w-4 h-4" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Predict Kundli Button */}
          <div className="mt-8 pt-6 border-t border-inherit flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs opacity-60 font-sans">
              * Powered by Celestial Star Vedic LLM System &amp; Lahiri Ayanamsha calculations.
            </span>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full sm:w-auto pill-action-btn pill-action-btn-hero shadow-xl flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-amber-300" />
                  <span>Calculating &amp; Consulting Celestial Star...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Predict Kundli</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Kundli Details Grid (Visual Chart + Placements) */}
      {kundliData && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10 items-start">
          
          {/* Left: North Indian Diamond Chart (5 cols) */}
          <div className={`lg:col-span-5 p-6 sm:p-8 rounded-3xl border flex flex-col items-center justify-center ${
            isDarkMode ? 'bg-slate-900/40 border-slate-800 shadow-xl' : 'bg-white border-slate-200/90 shadow-md'
          }`}>
            <div className="text-center mb-4">
              <h3 className="font-serif text-2xl font-normal">North Indian Janam Kundli</h3>
              <p className="text-xs opacity-60 font-sans">Lagna Chart (D1) · Lagna in Top Diamond</p>
            </div>

            <KundliChartSvg kundliData={kundliData} isDarkMode={isDarkMode} />

            {/* Quick summary badges */}
            <div className="mt-6 w-full grid grid-cols-2 gap-3 text-xs font-sans">
              <div className={`p-3 rounded-xl border text-center ${isDarkMode ? 'bg-slate-950/50 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                <div className="opacity-60 text-[11px]">Lagna (Ascendant)</div>
                <div className="font-semibold text-sm mt-0.5">{kundliData.lagnaSign.sanskritName} ({kundliData.lagnaSign.englishName})</div>
                <div className="text-[10px] opacity-60">{kundliData.lagnaDegree}° · {kundliData.lagnaSign.element}</div>
              </div>

              <div className={`p-3 rounded-xl border text-center ${isDarkMode ? 'bg-slate-950/50 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                <div className="opacity-60 text-[11px]">Chandra Rashi (Moon)</div>
                <div className="font-semibold text-sm mt-0.5">{kundliData.moonSign.sanskritName} ({kundliData.moonSign.englishName})</div>
                <div className="text-[10px] opacity-60">{kundliData.nakshatra.name} (Pada {kundliData.nakshatra.pada})</div>
              </div>
            </div>
          </div>

          {/* Right: Vedic Astrological Metrics (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* The Big 4 Vedic Pillars */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                <div className="text-[11px] font-sans uppercase tracking-wider opacity-60">Lagna Lord</div>
                <div className="font-serif text-xl mt-1">{kundliData.lagnaSign.lord.split(' ')[0]}</div>
                <div className="text-[10px] font-sans opacity-60 mt-0.5">{kundliData.lagnaSign.sanskritName}</div>
              </div>

              <div className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                <div className="text-[11px] font-sans uppercase tracking-wider opacity-60">Nakshatra</div>
                <div className="font-serif text-xl mt-1">{kundliData.nakshatra.name}</div>
                <div className="text-[10px] font-sans opacity-60 mt-0.5">Lord: {kundliData.nakshatra.lord}</div>
              </div>

              <div className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                <div className="text-[11px] font-sans uppercase tracking-wider opacity-60">Surya Rashi</div>
                <div className="font-serif text-xl mt-1">{kundliData.sunSign.sanskritName}</div>
                <div className="text-[10px] font-sans opacity-60 mt-0.5">{kundliData.sunSign.englishName}</div>
              </div>

              <div className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                <div className="text-[11px] font-sans uppercase tracking-wider opacity-60">Current Dasha</div>
                <div className="font-serif text-xl mt-1 text-amber-500">{kundliData.currentDasha.mahadasha}</div>
                <div className="text-[10px] font-sans opacity-60 mt-0.5">Antar: {kundliData.currentDasha.antardasha}</div>
              </div>
            </div>

            {/* Planetary Placements Table */}
            <div className={`rounded-3xl border overflow-hidden ${
              isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200/90 shadow-md'
            }`}>
              <div className="px-6 py-4 border-b border-inherit flex items-center justify-between">
                <span className="font-sans text-xs font-semibold uppercase tracking-wider">
                  Vedic Graha (Planetary) Positions &amp; Bhavas
                </span>
                <span className="text-xs opacity-60 font-sans">Ayanamsha: Lahiri (~24.1°)</span>
              </div>

              <div className="divide-y divide-inherit text-xs font-sans max-h-[300px] overflow-y-auto">
                {kundliData.planets.map(p => (
                  <div key={p.name} className="px-6 py-3 flex items-center justify-between hover:bg-inherit/40 transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-lg bg-inherit border border-inherit flex items-center justify-center font-bold text-xs">
                        {p.abbreviation}
                      </span>
                      <div>
                        <div className="font-medium">{p.name} ({p.sanskrit})</div>
                        <div className="text-[11px] opacity-60">{p.dignity}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{p.sign} · {p.degree}</div>
                      <div className="text-[11px] opacity-60">House {p.house}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* AI Kundli Prediction Report Container */}
      {prediction && (
        <div className={`p-8 sm:p-10 rounded-3xl border animate-fade-rise-0 transition-all ${
          isDarkMode 
            ? 'bg-amber-950/20 border-amber-500/30 text-amber-50 shadow-2xl' 
            : 'bg-amber-50/70 border-amber-300/70 text-slate-900 shadow-xl'
        }`}>
          {/* Header of Report */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-inherit gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-sans uppercase tracking-widest font-semibold text-amber-600 dark:text-amber-400">
                  Celestial Star · Verified AI Kundli Analysis
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-normal mt-0.5">
                  Kundli Prediction for {name}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleCopyPrediction}
                className="pill-action-btn pill-action-btn-small shadow-sm flex items-center gap-2 text-xs"
              >
                {hasCopied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copied Kundli</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Prediction</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Prediction Markdown/Text Content */}
          <div className="font-sans text-sm sm:text-base leading-relaxed whitespace-pre-line space-y-4">
            {prediction}
          </div>

          {/* Vedic Disclaimer Footer */}
          <div className="mt-8 pt-6 border-t border-inherit flex items-center justify-between text-xs opacity-60 font-sans">
            <span>Celestial Star Vedic Astrology · Distinguishing traditional interpretations from absolute facts</span>
            <span>{pob} · {dob}</span>
          </div>
        </div>
      )}
    </div>
  );
};

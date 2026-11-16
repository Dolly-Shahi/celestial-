import React, { useState } from 'react';
import { CURRENT_TRANSITS, ORACLE_DECK, OracleCard } from '../data/astrology';
import { Sparkles, Compass, Eye, RefreshCw, Send, HelpCircle } from 'lucide-react';

interface FutureOracleSectionProps {
  isDarkMode: boolean;
}

export const FutureOracleSection: React.FC<FutureOracleSectionProps> = ({ isDarkMode }) => {
  const [question, setQuestion] = useState('');
  const [drawnCard, setDrawnCard] = useState<OracleCard | null>(null);
  const [futurePrediction, setFuturePrediction] = useState<string | null>(null);
  const [isConsulting, setIsConsulting] = useState<boolean>(false);

  const sampleQuestions = [
    'What does the upcoming planetary shift bring for my purpose?',
    'Will deep romance and soul reciprocity blossom this season?',
    'How should I navigate my current crossroads?',
    'What karmic cycle is ready to be released?'
  ];

  const handleConsultOracle = async (customQuery?: string) => {
    const q = customQuery || question;
    if (!q.trim()) return;

    setIsConsulting(true);
    setFuturePrediction(null);

    // Pick a card from the celestial deck
    const randomCard = ORACLE_DECK[Math.floor(Math.random() * ORACLE_DECK.length)];
    setDrawnCard(randomCard);

    try {
      const res = await fetch('/api/cosmic-reading', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'future_oracle',
          question: q,
        }),
      });

      const data = await res.json();
      if (data.reading) {
        setFuturePrediction(data.reading);
      } else {
        setFuturePrediction(
          `✦ CELESTIAL DIVINATION: "${q}"\n\n` +
          `1. THE UNSEEN CURRENT: Under the current transit of Saturn and the Moon, hidden dynamics are surfacing. You are transitioning out of a cycle of testing into an era of sovereign authority.\n\n` +
          `2. THE UPCOMING WINDOW: The stars indicate a pivotal breakthrough within the next 4 to 6 weeks. What seemed delayed was simply gathering divine gravitational mass.\n\n` +
          `3. THE ORACLE DIRECTIVE: Align your decisions with enduring substance rather than ephemeral approval. The path forward is already illuminated within your heart.`
        );
      }
    } catch {
      setFuturePrediction(
        `✦ ORACLE TRANSIT FOR YOUR QUESTION\n\n` +
        `The celestial alignment indicates harmonious culmination. Release rigid expectations and allow the cosmic current to guide your ships into harbor.`
      );
    } finally {
      setIsConsulting(false);
    }
  };

  return (
    <section 
      id="future-oracle"
      className={`py-24 px-6 sm:px-8 border-t transition-colors duration-500 ${
        isDarkMode 
          ? 'bg-slate-950 border-slate-800 text-white' 
          : 'bg-[#f8fafc] border-slate-200 text-[#0f172a]'
      }`}
    >
      <div className="max-w-[1280px] mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-sans tracking-widest uppercase mb-3 opacity-60">
              <span>Predict Your Future</span>
              <span>·</span>
              <span>Cosmic Divination Engine</span>
            </div>
            <h2 className="editorial-h1 text-[40px] sm:text-[54px] font-normal leading-tight tracking-tight">
              Predict Your <em>Future</em> with the Stars
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base opacity-75 font-sans leading-relaxed">
            Inquire of the planetary transits and receive channeled celestial prophecies grounded in celestial ephemeris.
          </p>
        </div>

        {/* Oracle Query Box & Card Draw Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-start">
          
          {/* Query Form (7 cols) */}
          <div className={`lg:col-span-7 p-6 sm:p-8 rounded-3xl border ${
            isDarkMode ? 'bg-slate-900/60 border-slate-800/80 shadow-xl' : 'bg-white border-slate-200 shadow-md'
          }`}>
            <h3 className="font-serif text-2xl sm:text-3xl font-normal mb-2">
              Ask the Cosmic Oracle
            </h3>
            <p className="text-xs sm:text-sm font-sans opacity-70 mb-6">
              Pose an intimate query regarding destiny, romance, ambition, or spiritual direction.
            </p>

            {/* Input area */}
            <div className="relative mb-4">
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="e.g. What does the upcoming season hold for my soul's ambition and love?"
                rows={3}
                className={`w-full p-4 rounded-2xl border text-sm font-sans outline-none resize-none transition-all ${
                  isDarkMode 
                    ? 'bg-slate-950 border-slate-700 text-white placeholder-slate-500 focus:border-amber-400' 
                    : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400 focus:border-black'
                }`}
              />
            </div>

            {/* Curated Sample Query Buttons */}
            <div className="mb-6">
              <span className="text-[11px] font-sans uppercase tracking-wider opacity-60 block mb-2">
                Suggested celestial inquiries:
              </span>
              <div className="flex flex-wrap gap-2">
                {sampleQuestions.map((sq, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      setQuestion(sq);
                      handleConsultOracle(sq);
                    }}
                    className={`text-xs px-3 py-1.5 rounded-full border transition-all text-left truncate max-w-full ${
                      isDarkMode
                        ? 'border-slate-800 hover:border-slate-700 hover:bg-slate-800/60 text-slate-300'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    "{sq}"
                  </button>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex items-center justify-between">
              <span className="text-xs opacity-60 font-sans hidden sm:inline">
                Interpreted through real-time transit geometry
              </span>
              <button
                onClick={() => handleConsultOracle()}
                disabled={isConsulting || !question.trim()}
                className="pill-action-btn pill-action-btn-small shadow-md flex items-center gap-2 disabled:opacity-50"
              >
                {isConsulting ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Divining Transits...</span>
                  </>
                ) : (
                  <>
                    <Eye className="w-3.5 h-3.5 text-amber-300" />
                    <span>Unveil Future Prediction</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Drawn Oracle Card Display (5 cols) */}
          <div className={`lg:col-span-5 p-6 sm:p-8 rounded-3xl border flex flex-col items-center justify-center text-center ${
            isDarkMode 
              ? 'bg-gradient-to-b from-slate-900/90 to-slate-950 border-slate-800/80 shadow-2xl' 
              : 'bg-gradient-to-b from-white to-slate-50 border-slate-200 shadow-lg'
          }`}>
            <span className="text-xs font-sans uppercase tracking-widest opacity-60 mb-4">
              Celestial Oracle Archetype
            </span>

            {drawnCard ? (
              <div className="w-full flex flex-col items-center animate-fade-rise-0">
                <div className={`w-24 h-36 sm:w-28 sm:h-40 rounded-2xl border-2 flex flex-col items-center justify-center p-3 mb-4 shadow-xl ${
                  isDarkMode 
                    ? 'border-amber-400/40 bg-slate-900/90 text-amber-300' 
                    : 'border-slate-900 bg-white text-slate-900'
                }`}>
                  <span className="text-3xl mb-2">{drawnCard.symbol}</span>
                  <span className="font-serif text-sm font-semibold">{drawnCard.name}</span>
                  <span className="text-[10px] font-sans opacity-60 mt-1">{drawnCard.element}</span>
                </div>

                <h4 className="font-serif text-2xl font-normal mb-1">{drawnCard.name}</h4>
                <p className="text-xs font-sans opacity-70 italic mb-3">"{drawnCard.subtitle}"</p>
                <p className="text-xs sm:text-sm font-sans leading-relaxed opacity-85 mb-4 max-w-sm">
                  {drawnCard.divinationMessage}
                </p>
                <div className="text-xs font-sans px-3 py-1.5 rounded-full bg-inherit border border-inherit opacity-80">
                  Directive: {drawnCard.cosmicAdvice}
                </div>
              </div>
            ) : (
              <div className="py-12 flex flex-col items-center opacity-60">
                <div className="w-24 h-36 rounded-2xl border-2 border-dashed border-inherit flex items-center justify-center mb-4 text-3xl">
                  ✧
                </div>
                <p className="text-xs font-sans max-w-xs">
                  Pose your inquiry to draw an oracle archetype and unlock the planetary future prophecy.
                </p>
              </div>
            )}
          </div>

        </div>

        {/* AI Future Prediction Dossier Box */}
        {futurePrediction && (
          <div className={`mb-16 p-8 sm:p-10 rounded-3xl border animate-fade-rise-0 ${
            isDarkMode 
              ? 'bg-amber-950/20 border-amber-500/30 text-amber-50 shadow-2xl' 
              : 'bg-amber-50/70 border-amber-300/60 text-slate-900 shadow-xl'
          }`}>
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-inherit">
              <div className="flex items-center gap-2 text-xs font-sans uppercase tracking-widest font-semibold text-amber-600 dark:text-amber-400">
                <Sparkles className="w-4 h-4" />
                <span>Channeled Future Prophecy · Celestial Transits</span>
              </div>
              <span className="text-xs opacity-60 font-sans">
                Inquiry: "{question || 'Destiny'}"
              </span>
            </div>

            <div className="font-serif text-lg sm:text-xl leading-relaxed whitespace-pre-line">
              {futurePrediction}
            </div>
          </div>
        )}

        {/* Live Planetary Transits Table (Current Ephemeris) */}
        <div>
          <div className="mb-6">
            <h3 className="font-serif text-2xl sm:text-3xl font-normal">
              Active Celestial Transits &amp; Ephemeris
            </h3>
            <p className="text-xs sm:text-sm font-sans opacity-70">
              Live orbital positions dictating today's collective energetic weather.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {CURRENT_TRANSITS.map((transit) => (
              <div
                key={transit.planet}
                className={`p-5 rounded-2xl border transition-all ${
                  isDarkMode 
                    ? 'bg-slate-900/40 border-slate-800/80 hover:border-slate-700' 
                    : 'bg-white border-slate-200/80 hover:border-slate-300 shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-serif text-lg font-normal">{transit.planet}</span>
                    <span className="text-xs opacity-60 font-sans">in {transit.sign}</span>
                  </div>
                  <span className={`text-[10px] font-sans px-2 py-0.5 rounded-full ${
                    transit.motion === 'Retrograde' 
                      ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30' 
                      : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                  }`}>
                    {transit.motion} ({transit.degree})
                  </span>
                </div>
                <div className="text-xs font-medium font-sans mb-1 text-inherit opacity-90">
                  {transit.theme}
                </div>
                <p className="text-xs font-sans opacity-70 leading-relaxed">
                  {transit.transitInfluence}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

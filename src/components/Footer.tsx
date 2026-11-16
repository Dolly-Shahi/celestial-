import React from 'react';

interface FooterProps {
  isDarkMode: boolean;
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ isDarkMode, onNavigate }) => {
  return (
    <footer className={`py-20 px-6 sm:px-8 border-t transition-colors duration-500 ${
      isDarkMode 
        ? 'bg-black border-slate-800 text-slate-400' 
        : 'bg-[#0f172a] border-slate-900 text-slate-300'
    }`}>
      <div className="max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          
          {/* Brand Col (6 cols) */}
          <div className="md:col-span-6">
            <div className="font-serif text-4xl text-white font-normal mb-3">
              Celestial<sup className="text-sm font-sans align-super ml-0.5 opacity-70">®</sup>
            </div>
            <p className="font-sans text-sm max-w-md text-slate-400 leading-relaxed mb-6">
              Predict your future and daily horoscope with personalised cosmic insights. High-end celestial guidance, natal chart calculation, and algorithmic ephemeris crafted for Sumi and seekers worldwide.
            </p>
            <div className="text-xs text-slate-500 font-sans">
              Orbital coordinates: 48°51'24" N, 2°21'07" E · Ephemeris 2026.4
            </div>
          </div>

          {/* Nav links (3 cols) */}
          <div className="md:col-span-3">
            <div className="text-xs font-sans uppercase tracking-widest text-slate-200 mb-4 font-semibold">
              Sanctuary Portals
            </div>
            <ul className="space-y-3 text-sm font-sans">
              <li>
                <button 
                  onClick={() => onNavigate('daily-horoscope')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Daily Horoscopes &amp; Transits
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('birth-chart')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Personalized Natal Wheel
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('future-oracle')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Predict Future Oracle
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('compatibility')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Synastry &amp; Compatibility
                </button>
              </li>
            </ul>
          </div>

          {/* Ephemeris & Philosophy (3 cols) */}
          <div className="md:col-span-3">
            <div className="text-xs font-sans uppercase tracking-widest text-slate-200 mb-4 font-semibold">
              Cosmic Principle
            </div>
            <p className="text-xs text-slate-400 font-serif leading-relaxed italic">
              "The stars do not compel us; they illuminate the sacred pathways through which sovereign souls author their destiny."
            </p>
            <div className="mt-4 text-[11px] text-slate-500 font-sans">
              Calculated using Swiss Ephemeris geometric approximations and Gemini AI synthesis.
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 font-sans gap-4">
          <div>
            © {new Date().getFullYear()} Celestial Inc. All rights reserved. Built for Sumi.
          </div>
          <div className="flex items-center gap-6">
            <span>Terms of Sovereignty</span>
            <span>·</span>
            <span>Cosmic Privacy</span>
            <span>·</span>
            <span>Astrological Integrity</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

import React, { useState } from 'react';
import { KundliPredictionSection } from './KundliPredictionSection';
import { DailyHoroscopeSection } from './DailyHoroscopeSection';
import { BirthChartSection } from './BirthChartSection';
import { FutureOracleSection } from './FutureOracleSection';
import { SynastrySection } from './SynastrySection';
import { celestialAudio } from '../utils/celestialAudio';
import { 
  Sparkles, 
  Compass, 
  Sun, 
  Moon, 
  Volume2, 
  VolumeX, 
  Heart, 
  Eye, 
  Menu, 
  X, 
  ArrowLeft,
  ChevronRight,
  Stars
} from 'lucide-react';

export type DashboardFeature = 'kundli' | 'horoscope' | 'birth-chart' | 'oracle' | 'compatibility';

interface DashboardLayoutProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
  onBackToHero: () => void;
  initialFeature?: DashboardFeature;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  isDarkMode,
  onToggleTheme,
  onBackToHero,
  initialFeature = 'kundli',
}) => {
  const [activeFeature, setActiveFeature] = useState<DashboardFeature>(initialFeature);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const handleAudioToggle = () => {
    const playing = celestialAudio.toggle();
    setIsPlayingAudio(playing);
  };

  const navItems = [
    {
      id: 'kundli' as DashboardFeature,
      name: 'Kundli Prediction',
      badge: 'Vedic AI',
      icon: <Stars className="w-4 h-4 text-amber-500" />,
      description: 'North Indian Janam Kundli & Planetary Dashas',
    },
    {
      id: 'horoscope' as DashboardFeature,
      name: 'Daily Horoscope',
      badge: 'Today',
      icon: <Sun className="w-4 h-4 text-orange-400" />,
      description: '12 Zodiac Archetypes & Astral Weather',
    },
    {
      id: 'birth-chart' as DashboardFeature,
      name: 'Western Birth Chart',
      badge: 'Natal',
      icon: <Compass className="w-4 h-4 text-indigo-400" />,
      description: '360° Natal Wheel & Big Three Synthesis',
    },
    {
      id: 'oracle' as DashboardFeature,
      name: 'Predict Future',
      badge: 'Transits',
      icon: <Eye className="w-4 h-4 text-purple-400" />,
      description: 'Cosmic Oracle & Planetary Divination',
    },
    {
      id: 'compatibility' as DashboardFeature,
      name: 'Compatibility',
      badge: 'Synastry',
      icon: <Heart className="w-4 h-4 text-rose-400" />,
      description: 'Elemental Chemistry & Relationship Resonance',
    },
  ];

  return (
    <div className={`min-h-screen flex flex-col md:flex-row transition-colors duration-500 ${
      isDarkMode ? 'bg-[#020617] text-slate-100' : 'bg-[#f8fafc] text-[#0f172a]'
    }`}>

      {/* Mobile Top App Bar */}
      <div className={`md:hidden flex items-center justify-between px-5 py-4 border-b z-40 sticky top-0 ${
        isDarkMode ? 'bg-slate-950/90 border-slate-800 backdrop-blur-md' : 'bg-white/90 border-slate-200 backdrop-blur-md'
      }`}>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2 rounded-lg border border-inherit"
            aria-label="Open Left Pane Menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          <span className="font-serif text-2xl font-normal tracking-tight">
            Celestial<sup className="text-xs font-sans align-super ml-0.5">®</sup>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onBackToHero}
            className="text-xs px-3 py-1.5 rounded-full border border-inherit opacity-80 hover:opacity-100 flex items-center gap-1 font-sans"
          >
            <ArrowLeft className="w-3 h-3" />
            Home
          </button>
        </div>
      </div>

      {/* Backdrop for mobile left pane */}
      {isMobileMenuOpen && (
        <div 
          onClick={() => setIsMobileMenuOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
        />
      )}

      {/* LEFT PANE (Sidebar) */}
      <aside 
        className={`fixed md:sticky top-0 left-0 bottom-0 z-50 md:z-30 w-[290px] lg:w-[320px] h-screen shrink-0 border-r flex flex-col transition-transform duration-300 ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        } ${
          isDarkMode 
            ? 'bg-slate-950 border-slate-800/90 text-white shadow-2xl md:shadow-none' 
            : 'bg-white border-slate-200 text-[#0f172a] shadow-xl md:shadow-none'
        }`}
      >
        {/* Left Pane Header */}
        <div className="p-6 border-b border-inherit flex items-center justify-between">
          <button 
            onClick={onBackToHero}
            className="flex items-center gap-2 group text-left"
            title="Return to Cinematic Landing"
          >
            <span className="font-serif text-[28px] font-normal tracking-tight">
              Celestial<sup className="text-xs font-sans align-super ml-0.5 opacity-70">®</sup>
            </span>
          </button>

          <button 
            onClick={() => setIsMobileMenuOpen(false)}
            className="md:hidden p-1.5 rounded-lg border border-inherit opacity-70 hover:opacity-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Celestial Transit Badge */}
        <div className="px-6 py-3.5 border-b border-inherit bg-inherit/50">
          <div className="flex items-center justify-between text-[11px] font-sans opacity-70">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Ephemeris Live
            </span>
            <span>Sun in Libra · Moon in Scorpio</span>
          </div>
        </div>

        {/* Feature List (First Feature: Kundli Prediction) */}
        <div className="flex-1 overflow-y-auto p-4 space-y-1.5">
          <div className="px-3 py-2 text-[11px] font-sans uppercase tracking-widest opacity-50 font-semibold">
            Cosmic Portals
          </div>

          {navItems.map((item, index) => {
            const isActive = activeFeature === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveFeature(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between p-3.5 rounded-2xl text-left transition-all group cursor-pointer ${
                  isActive
                    ? isDarkMode 
                      ? 'bg-slate-900 border border-slate-700/80 shadow-md text-white' 
                      : 'bg-slate-100 border border-slate-300/80 shadow-sm text-black'
                    : isDarkMode
                      ? 'hover:bg-slate-900/60 text-slate-300 hover:text-white border border-transparent'
                      : 'hover:bg-slate-50 text-slate-700 hover:text-black border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                    isActive 
                      ? isDarkMode ? 'bg-amber-400/20 text-amber-300' : 'bg-black text-white' 
                      : isDarkMode ? 'bg-slate-900 text-slate-400' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {item.icon}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-sans font-medium truncate ${isActive ? 'font-semibold' : ''}`}>
                        {item.name}
                      </span>
                      {index === 0 && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 font-sans font-semibold border border-amber-500/30">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] opacity-60 font-sans truncate">
                      {item.description}
                    </p>
                  </div>
                </div>

                <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${
                  isActive ? 'opacity-100 translate-x-0.5' : 'opacity-0 group-hover:opacity-40'
                }`} />
              </button>
            );
          })}
        </div>

        {/* Left Pane Footer Controls */}
        <div className="p-4 border-t border-inherit space-y-3">
          {/* Audio Chime and Theme switches */}
          <div className="flex items-center justify-between px-2">
            <span className="text-xs font-sans opacity-60">Celestial Ambiance</span>
            <div className="flex items-center gap-2">
              <button
                onClick={handleAudioToggle}
                className={`p-2 rounded-full border transition-all text-xs flex items-center justify-center ${
                  isPlayingAudio
                    ? 'bg-amber-400/20 border-amber-400 text-amber-300'
                    : 'border-inherit opacity-75 hover:opacity-100'
                }`}
                title="Toggle celestial ambient drone"
              >
                {isPlayingAudio ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
              </button>

              <button
                onClick={onToggleTheme}
                className="p-2 rounded-full border border-inherit opacity-75 hover:opacity-100 text-xs"
                title="Toggle theme"
              >
                {isDarkMode ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Return to Cinematic Landing */}
          <button
            onClick={onBackToHero}
            className={`w-full py-2.5 px-4 rounded-xl border text-xs font-sans font-medium flex items-center justify-center gap-2 transition-all ${
              isDarkMode 
                ? 'border-slate-800 hover:bg-slate-900 text-slate-300' 
                : 'border-slate-200 hover:bg-slate-100 text-slate-700'
            }`}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Cinematic Hero View</span>
          </button>
        </div>
      </aside>

      {/* MAIN PANE: Dynamic active feature rendering */}
      <main className="flex-1 min-w-0 p-6 sm:p-10 lg:p-12 overflow-x-hidden">
        <div className="max-w-[1080px] mx-auto">
          {activeFeature === 'kundli' && (
            <KundliPredictionSection isDarkMode={isDarkMode} />
          )}

          {activeFeature === 'horoscope' && (
            <DailyHoroscopeSection isDarkMode={isDarkMode} />
          )}

          {activeFeature === 'birth-chart' && (
            <BirthChartSection isDarkMode={isDarkMode} />
          )}

          {activeFeature === 'oracle' && (
            <FutureOracleSection isDarkMode={isDarkMode} />
          )}

          {activeFeature === 'compatibility' && (
            <SynastrySection isDarkMode={isDarkMode} />
          )}
        </div>
      </main>

    </div>
  );
};

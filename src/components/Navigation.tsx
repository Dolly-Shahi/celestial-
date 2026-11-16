import React from 'react';
import { Volume2, VolumeX, Moon, Sun, Sparkles } from 'lucide-react';
import { celestialAudio } from '../utils/celestialAudio';

interface NavigationProps {
  onNavigate: (sectionId: string) => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  onNavigate,
  isDarkMode,
  onToggleTheme,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = React.useState(false);

  const handleAudioToggle = () => {
    const playing = celestialAudio.toggle();
    setIsPlayingAudio(playing);
  };

  return (
    <header className="relative z-50 w-full">
      <nav 
        className="mx-auto grid grid-cols-2 md:grid-cols-3 items-center max-w-[1280px] px-6 sm:px-8 py-6"
        aria-label="Main Navigation"
      >
        {/* Left Col: Brand logo using 'Instrument Serif' at 30px size with a registered trademark symbol in superscript */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('hero')}
            className="flex items-center text-left group transition-opacity hover:opacity-90"
            title="Celestial Home"
          >
            <span 
              className={`font-serif text-[30px] font-normal tracking-tight leading-none ${
                isDarkMode ? 'text-white' : 'text-[#0f172a]'
              }`}
            >
              Celestial<sup className="text-[14px] align-super ml-0.5 font-sans font-normal opacity-75">®</sup>
            </span>
          </button>
        </div>

        {/* Center Col: Hidden on mobile. Horizontal flex list of 4 links using 'Inter' 14px Medium, spacing: 40px */}
        <div className="hidden md:flex items-center justify-center gap-10">
          <button
            onClick={() => onNavigate('daily-horoscope')}
            className={`font-sans text-[14px] font-medium transition-colors cursor-pointer hover:opacity-100 ${
              isDarkMode ? 'text-slate-300 hover:text-white' : 'text-[#0f172a]/80 hover:text-[#0f172a]'
            }`}
          >
            Daily Horoscope
          </button>
          <button
            onClick={() => onNavigate('birth-chart')}
            className={`font-sans text-[14px] font-medium transition-colors cursor-pointer hover:opacity-100 ${
              isDarkMode ? 'text-slate-300 hover:text-white' : 'text-[#0f172a]/80 hover:text-[#0f172a]'
            }`}
          >
            Birth Chart
          </button>
          <button
            onClick={() => onNavigate('future-oracle')}
            className={`font-sans text-[14px] font-medium transition-colors cursor-pointer hover:opacity-100 ${
              isDarkMode ? 'text-slate-300 hover:text-white' : 'text-[#0f172a]/80 hover:text-[#0f172a]'
            }`}
          >
            Predict Future
          </button>
          <button
            onClick={() => onNavigate('compatibility')}
            className={`font-sans text-[14px] font-medium transition-colors cursor-pointer hover:opacity-100 ${
              isDarkMode ? 'text-slate-300 hover:text-white' : 'text-[#0f172a]/80 hover:text-[#0f172a]'
            }`}
          >
            Compatibility
          </button>
        </div>

        {/* Right Col: Audio chime, theme toggle, and Pill-shaped CTA button in solid black with white text */}
        <div className="flex items-center justify-end gap-3 sm:gap-4">
          {/* Ambient sound toggle */}
          <button
            onClick={handleAudioToggle}
            className={`p-2 rounded-full transition-all text-xs flex items-center justify-center ${
              isPlayingAudio 
                ? 'bg-amber-400/20 text-amber-300 ring-1 ring-amber-400/40' 
                : isDarkMode 
                  ? 'bg-white/10 text-slate-300 hover:bg-white/20' 
                  : 'bg-black/5 text-slate-700 hover:bg-black/10'
            }`}
            title={isPlayingAudio ? 'Mute Celestial Sound' : 'Play Celestial Resonance'}
            aria-label="Toggle celestial ambient resonance"
          >
            {isPlayingAudio ? (
              <Volume2 className="w-4 h-4 text-amber-300 animate-pulse" />
            ) : (
              <VolumeX className="w-4 h-4 opacity-60" />
            )}
          </button>

          {/* Theme mode toggle */}
          <button
            onClick={onToggleTheme}
            className={`p-2 rounded-full transition-all text-xs flex items-center justify-center ${
              isDarkMode 
                ? 'bg-white/10 text-amber-300 hover:bg-white/20' 
                : 'bg-black/5 text-slate-700 hover:bg-black/10'
            }`}
            title={isDarkMode ? 'Switch to Editorial Mode' : 'Switch to Midnight Dark Mode'}
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Spec CTA: Pill-shaped CTA button in solid black with white text */}
          <button
            onClick={() => onNavigate('dashboard-kundli')}
            className="pill-action-btn pill-action-btn-small shadow-sm"
          >
            <span>Get Started</span>
          </button>
        </div>
      </nav>
    </header>
  );
};

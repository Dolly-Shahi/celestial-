import React from 'react';
import { Sparkles, Compass } from 'lucide-react';

interface HeroProps {
  onExplore: () => void;
  onOpenBirthChart: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExplore, onOpenBirthChart }) => {
  return (
    <section 
      className="relative flex flex-col justify-center items-center min-h-screen w-full overflow-hidden bg-celestial-basis"
      aria-label="Celestial Hero Presentation"
    >
      {/* Background Video Layer with subtle dark overlay */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover object-center scale-[1.02]"
          poster="https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=2000&auto=format&fit=crop"
        >
          <source 
            src="https://designerstephen.github.io/public-assets/videos/serene-art-hero.mp4" 
            type="video/mp4" 
          />
        </video>
        {/* Subtle dark overlay (alpha 0.2) as specified for legibility */}
        <div className="absolute inset-0 bg-slate-950/20 backdrop-contrast-[1.05]" />
        {/* Subtle vignette gradient towards edges */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/30 via-transparent to-slate-950/40" />
      </div>

      {/* Hero Content Area: Centered vertically and horizontally, Max-width: 1280px */}
      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 sm:px-8 py-20 flex flex-col items-center justify-center text-center">
        
        {/* Staggered Entrance Container: Sequence of H1 (0s), P (0.2s), Button (0.4s) */}
        
        {/* Heading: 'Instrument Serif' H1, 80px size (mobile 48px), line-height: 0.95, letter-spacing: -2.46px.
            Uses <em> tags for stylistic emphasis (non-italic variant) */}
        <h1 
          className="editorial-h1 text-[#0f172a] drop-shadow-sm max-w-[1020px] text-[48px] sm:text-[64px] md:text-[80px] animate-fade-rise-0"
          style={{
            lineHeight: 0.95,
            letterSpacing: '-2.46px',
            fontWeight: 400,
          }}
        >
          Predict your <em>future</em> & daily horoscope with personalized <em>cosmic</em> insights
        </h1>

        {/* Paragraph: Max-width 670px, centered. Line-height: 1.625. Color: HSL(215, 25%, 32%).
            Delay: 0.2s entrance */}
        <p 
          className="animate-fade-rise-200 mt-8 max-w-[670px] text-center text-[16px] sm:text-[18px] font-sans font-normal leading-[1.625]"
          style={{
            color: 'hsl(215, 25%, 32%)',
          }}
        >
          Predict your future and daily horoscope with personalised cosmic insights. Journey beyond the veil of time with precise planetary decans, real-time astral transits, and personalized birth chart analysis crafted for Sumi and seekers of truth.
        </p>

        {/* Main CTA: Large pill-shaped button (padding: 20px 56px) with 16px Medium font weight, placed 48px below text.
            Delay: 0.4s entrance */}
        <div className="animate-fade-rise-400 mt-[48px] flex flex-col sm:flex-row items-center gap-4">
          <button
            onClick={onExplore}
            className="pill-action-btn pill-action-btn-hero shadow-xl group"
          >
            <span className="flex items-center gap-2 tracking-normal">
              Get Started
              <Sparkles className="w-4 h-4 opacity-80 group-hover:rotate-12 transition-transform duration-300" />
            </span>
          </button>

          <button
            onClick={onOpenBirthChart}
            className="hidden sm:inline-flex items-center gap-2 px-8 py-[18px] rounded-full border border-[#0f172a]/20 bg-white/70 hover:bg-white text-[#0f172a] font-sans text-[16px] font-medium backdrop-blur-md transition-all duration-300 hover:scale-[1.02]"
          >
            <Compass className="w-4 h-4 text-[#0f172a]/70" />
            Analyze Birth Chart
          </button>
        </div>

        {/* Subtle quick jump indicator */}
        <div className="animate-fade-rise-400 mt-16 flex items-center gap-6 text-xs text-[#0f172a]/70 font-sans tracking-wider uppercase">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0f172a]"></span>
            Daily Transit
          </span>
          <span className="opacity-40">/</span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0f172a]"></span>
            Natal Wheel
          </span>
          <span className="opacity-40">/</span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0f172a]"></span>
            Cosmic Oracle
          </span>
        </div>

      </div>
    </section>
  );
};

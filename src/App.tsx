/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { DashboardLayout, DashboardFeature } from './components/DashboardLayout';
import { KundliPredictionSection } from './components/KundliPredictionSection';
import { DailyHoroscopeSection } from './components/DailyHoroscopeSection';
import { BirthChartSection } from './components/BirthChartSection';
import { FutureOracleSection } from './components/FutureOracleSection';
import { SynastrySection } from './components/SynastrySection';
import { Footer } from './components/Footer';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    // Default to dark mode for celestial atmosphere, but toggleable anytime
    const saved = localStorage.getItem('celestial_theme');
    return saved ? saved === 'dark' : true;
  });

  // View mode: 'landing' (cinematic full landing) or 'dashboard' (left pane layout)
  const [viewMode, setViewMode] = useState<'landing' | 'dashboard'>('landing');
  const [selectedDashboardFeature, setSelectedDashboardFeature] = useState<DashboardFeature>('kundli');

  useEffect(() => {
    localStorage.setItem('celestial_theme', isDarkMode ? 'dark' : 'light');
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleNavigate = (sectionId: string) => {
    if (sectionId === 'hero') {
      setViewMode('landing');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (sectionId === 'dashboard-kundli' || sectionId === 'get-started') {
      setSelectedDashboardFeature('kundli');
      setViewMode('dashboard');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (sectionId === 'kundli') {
      setSelectedDashboardFeature('kundli');
      setViewMode('dashboard');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (sectionId === 'daily-horoscope') {
      if (viewMode === 'dashboard') {
        setSelectedDashboardFeature('horoscope');
      } else {
        const el = document.getElementById('daily-horoscope');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      return;
    }

    if (sectionId === 'birth-chart') {
      if (viewMode === 'dashboard') {
        setSelectedDashboardFeature('birth-chart');
      } else {
        const el = document.getElementById('birth-chart');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      return;
    }

    if (sectionId === 'future-oracle') {
      if (viewMode === 'dashboard') {
        setSelectedDashboardFeature('oracle');
      } else {
        const el = document.getElementById('future-oracle');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      return;
    }

    if (sectionId === 'compatibility') {
      if (viewMode === 'dashboard') {
        setSelectedDashboardFeature('compatibility');
      } else {
        const el = document.getElementById('compatibility');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleGetStarted = () => {
    setSelectedDashboardFeature('kundli');
    setViewMode('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If in Left Pane Dashboard mode
  if (viewMode === 'dashboard') {
    return (
      <DashboardLayout
        isDarkMode={isDarkMode}
        onToggleTheme={() => setIsDarkMode(prev => !prev)}
        onBackToHero={() => setViewMode('landing')}
        initialFeature={selectedDashboardFeature}
      />
    );
  }

  // Cinematic Landing view
  return (
    <div className={`min-h-screen w-full transition-colors duration-500 font-sans selection:bg-amber-400/30 selection:text-amber-200 ${
      isDarkMode ? 'bg-[#020617] text-slate-100' : 'bg-[#f8fafc] text-[#0f172a]'
    }`}>
      
      {/* 3-Column Distributed Navigation Bar */}
      <Navigation
        onNavigate={handleNavigate}
        isDarkMode={isDarkMode}
        onToggleTheme={() => setIsDarkMode(prev => !prev)}
      />

      <main>
        {/* Editorial Cinematic Hero Section with full-bleed serene video */}
        <div id="hero">
          <Hero
            onExplore={handleGetStarted}
            onOpenBirthChart={() => {
              setSelectedDashboardFeature('kundli');
              setViewMode('dashboard');
            }}
          />
        </div>

        {/* Featured Vedic Kundli Prediction Teaser / Quick Access */}
        <section className={`py-20 px-6 sm:px-8 border-t transition-colors duration-500 ${
          isDarkMode ? 'bg-slate-950/90 border-slate-800' : 'bg-slate-50 border-slate-200'
        }`}>
          <div className="max-w-[1280px] mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between p-8 sm:p-12 rounded-3xl border border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-transparent to-purple-500/10 mb-12 gap-8 shadow-xl">
              <div className="max-w-2xl">
                <span className="text-xs font-sans uppercase tracking-widest text-amber-500 font-semibold mb-2 block">
                  Featured Vedic Astrology Engine
                </span>
                <h2 className="editorial-h1 text-[36px] sm:text-[46px] font-normal leading-tight">
                  Discover Your <em>Kundli</em> with Celestial Star AI
                </h2>
                <p className="mt-3 text-sm sm:text-base opacity-75 font-sans leading-relaxed">
                  Generate your authentic North Indian Janam Patri, calculate planetary Dashas, and unveil deep personalized insights on Health, Wealth, Career, and Relationships.
                </p>
              </div>

              <button
                onClick={handleGetStarted}
                className="pill-action-btn pill-action-btn-hero shrink-0 shadow-2xl"
              >
                <span>Launch Kundli Predictor</span>
              </button>
            </div>

            {/* Embedded Kundli Section */}
            <KundliPredictionSection isDarkMode={isDarkMode} />
          </div>
        </section>

        {/* Daily Horoscope & Astral Transits */}
        <DailyHoroscopeSection isDarkMode={isDarkMode} />

        {/* Personalized Birth Chart Analysis & Interactive Natal Wheel */}
        <BirthChartSection isDarkMode={isDarkMode} />

        {/* Predict Your Future & Cosmic Transits Oracle */}
        <FutureOracleSection isDarkMode={isDarkMode} />

        {/* Synastry & Astrological Compatibility */}
        <SynastrySection isDarkMode={isDarkMode} />
      </main>

      {/* Editorial Luxury Footer */}
      <Footer 
        isDarkMode={isDarkMode} 
        onNavigate={handleNavigate} 
      />

    </div>
  );
}

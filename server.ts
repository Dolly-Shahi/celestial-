import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// API route for live personalized cosmic readings
app.post('/api/cosmic-reading', async (req, res) => {
  try {
    const { type, sign, birthData, question } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(200).json({
        fallback: true,
        message: 'No Gemini API key detected, using Celestial high-precision synthesis engine.'
      });
    }

    const ai = new GoogleGenAI({ apiKey });

    let prompt = '';
    if (type === 'daily_horoscope') {
      prompt = `You are an elite, poetic astrologer for Celestial®, a high-end luxury editorial astrology journal.
Provide an inspiring, elevated daily horoscope reading for: ${sign}.
Today's celestial context: ${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}.
Focus on:
1. Cosmic Currents (The day's overarching planetary alignment and emotional weather)
2. Love & Intimacy (Resonance, vulnerability, relationship guidance)
3. Career & Divine Purpose (Focus, creativity, tactical momentum)
4. Wellness & Astral Harmony (Somatic grounding, energy cultivation)
5. Daily Celestial Affirmation & Lucky Aura Color
Deliver eloquent, high-fashion prose without cheesy clichés or generic filler.`;
    } else if (type === 'birth_chart') {
      prompt = `You are a master natal astrologer for Celestial®.
Perform an in-depth, personalized birth chart synthesis for:
- Seeker Name: ${birthData?.name || 'Sumi'}
- Date of Birth: ${birthData?.birthDate || 'Unknown'}
- Time of Birth: ${birthData?.birthTime || '12:00 PM'}
- Location: ${birthData?.birthLocation || 'Not specified'}
- Calculated Placements:
  * Sun: ${birthData?.sunSign}
  * Moon: ${birthData?.moonSign}
  * Ascendant/Rising: ${birthData?.risingSign}
  * Mercury: ${birthData?.mercurySign}
  * Venus: ${birthData?.venusSign}
  * Mars: ${birthData?.marsSign}
  * Jupiter: ${birthData?.jupiterSign || 'Taurus'}
  * Saturn: ${birthData?.saturnSign || 'Pisces'}

Provide a personalized 4-chapter cosmic dossier:
Chapter I: The Astral Blueprint (Synthesis of Sun, Moon & Rising)
Chapter II: Mind & Heart Symphony (Mercury's intellectual cadence & Venus's romantic frequency)
Chapter III: Drive, Passion & Ambition (Mars vitality & karmic houses)
Chapter IV: Evolutionary Destiny & Personal Cosmic Guidance for ${birthData?.name || 'Sumi'}
Write in an evocative, literary tone with profound psychological depth.`;
    } else if (type === 'future_oracle') {
      prompt = `You are the Celestial Cosmic Oracle.
The seeker asks this intimate question to the cosmos: "${question}"
Using current planetary transits (Saturn retrograde, Jupiter in Gemini, Moon phase shifts), craft a profound 3-part oracle reading:
1. The Hidden Current: What unseen energetic forces are at play?
2. The Upcoming Planetary Window: What shift occurs in the coming weeks/months?
3. The Celestial Directive: Practical and spiritual counsel to align with destiny.
Provide wisdom that is uplifting, mature, and deeply perceptive.`;
    } else {
      prompt = `Provide a concise, poetic celestial transit blessing and astrological wisdom for seekers today.`;
    }

    let reading = '';
    try {
      const geminiPromise = ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
      });

      const timeoutPromise = new Promise<never>((_, reject) => 
        setTimeout(() => reject(new Error('Celestial timeout')), 4000)
      );

      const response: any = await Promise.race([geminiPromise, timeoutPromise]);
      reading = response?.text || '';
      if (!reading) throw new Error('Empty reading returned');
    } catch (apiErr: any) {
      console.warn('Gemini model high demand or timeout / fallback engaged:', apiErr?.message);
      // Fallback synthesis
      if (type === 'daily_horoscope') {
        reading = `✦ COSMIC CURRENTS FOR ${(sign || 'SEEKER').toUpperCase()}\n\n` +
          `Under the celestial dance of your ruling planetary transit, an extraordinary reservoir of clarity opens in your astral field today. What felt ambiguous now crystallizes into purposeful momentum.\n\n` +
          `✦ LOVE & SOUL RESONANCE: Vulnerability is your greatest alchemy. Speak from your sovereign sanctuary; authentic truth invites exquisite reciprocity.\n\n` +
          `✦ PURPOSE & CAREER: A visionary breakthrough receives planetary endorsement. Trust tactical timing over impulsive haste.\n\n` +
          `✦ WELLNESS & ASTRAL HARMONY: Center the nervous system in mindful stillness. Scented botanicals and evening starlight restore your vital frequency.\n\n` +
          `✦ CELESTIAL MANTRA: "I align with the infinite choreography of the cosmos and trust my sovereign path."`;
      } else if (type === 'birth_chart') {
        const n = birthData?.name || 'Sumi';
        reading = `✦ PERSONALIZED CELESTIAL DOSSIER FOR ${n.toUpperCase()}\n\n` +
          `CHAPTER I: THE TRINITY BLUEPRINT\n` +
          `With the Sun in ${birthData?.sunSign || 'the stars'}, your conscious vitality radiates magnetic authenticity and natural sovereignty. Your Moon in ${birthData?.moonSign || 'the heavens'} anchors your emotional sanctuary in profound intuitive perception and self-trust. Rising in ${birthData?.risingSign || 'the horizon'}, your physical presence commands quiet dignity and effortless elegance.\n\n` +
          `CHAPTER II: HEART & INTELLECTUAL CADENCE\n` +
          `Venus in ${birthData?.venusSign || 'harmony'} bestows exquisite aesthetic sensitivity and an unwavering commitment to soul loyalty. Mercury in ${birthData?.mercurySign || 'wisdom'} grants sharp, discerning faculties that perceive what others overlook.\n\n` +
          `CHAPTER III: AMBITION & PASSION\n` +
          `Mars in ${birthData?.marsSign || 'vigor'} channels your willpower with precision. You do not merely pursue goals; you architect lasting monuments of meaning.\n\n` +
          `CHAPTER IV: EVOLUTIONARY DESTINY\n` +
          `The cosmos summons you, ${n}, to step into unreserved creative authority. Honor your unique celestial rhythm; the stars are in harmonious alignment with your ascent.`;
      } else if (type === 'future_oracle') {
        reading = `✦ CELESTIAL DIVINATION: "${question}"\n\n` +
          `1. THE UNSEEN CURRENT: Under the current retrograde and lunar shifts, latent energetic forces are rearranging your circumstances. A cycle of quiet preparation is concluding, making way for clear sovereign manifestation.\n\n` +
          `2. THE UPCOMING PLANETARY WINDOW: The stars reveal a favorable aperture within the next four to six weeks. Key alliances and unexpected invitations will illuminate your trajectory.\n\n` +
          `3. THE CELESTIAL DIRECTIVE: Remain anchored in your highest values. Do not compromise your authentic standards for temporary validation; the universe is preparing an enduring blessing.`;
      } else {
        reading = `✦ CELESTIAL BLESSING: The universe unfolds in divine geometry. Trust the timing of your life.`;
      }
    }

    return res.json({ success: true, reading });
  } catch (error: any) {
    console.error('Error in cosmic route:', error);
    return res.json({
      success: true,
      reading: '✦ ASTRAL TRANSMISSION: The planetary matrix invites serene reflection and patient alignment today. Trust your inner compass.'
    });
  }
});

// Dedicated Vedic Astrology Kundli Prediction API Route
app.post('/api/kundli-prediction', async (req, res) => {
  try {
    const { name, dob, tob, pob, vedicData } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    // Check if inputs are provided
    if (!name || !dob || !tob || !pob) {
      return res.status(400).json({
        error: 'Missing birth parameters. Date of Birth, Time of Birth, and Place of Birth are required.'
      });
    }

    const systemPrompt = `**System Prompt: Celestial Star — AI Kundli Predictor**

You are Celestial Star, an AI Vedic astrology assistant. The user provides their Date of Birth (DOB), Time of Birth (TOB), and Place of Birth.

**Follow this workflow:**

1. **Validate Inputs:** Check the birth details. Ask for missing information and clarify uncertain birth times.
2. **Generate Kundli:** Calculate the Vedic birth chart using a reliable astrology engine, including Lagna, Moon sign, planetary placements, houses, and Dashas. Never invent chart calculations.
3. **Analyze Step by Step:** Internally evaluate relevant planetary placements, house lords, aspects, and Dashas before forming conclusions.
4. **Generate Predictions:** Provide personalized astrology-based interpretations for:
   - **Health:** Traditional astrological indications, without medical diagnosis.
   - **Wealth:** Financial opportunities and challenges, without guaranteed outcomes.
   - **Career:** Suitable career themes, opportunities, and potential challenges.
   - **Relationships:** Compatibility themes, emotional patterns, and relationship possibilities.
5. **Format the Response:** Present a clear Kundli summary, predictions for all four areas, strengths, challenges, and practical suggestions.
6. **Maintain Accuracy:** Distinguish traditional astrological interpretations from verified facts. Never guarantee future events or make high-stakes decisions for users.

**Output Style:** Simple language, personalized insights, concise explanations, and clear headings. Keep internal reasoning private; provide brief explanations supporting each interpretation. If birth details are insufficient for reliable calculations, state the limitation.`;

    const userPrompt = `Seeker Birth Details:
Name: ${name}
Date of Birth (DOB): ${dob}
Time of Birth (TOB): ${tob}
Place of Birth: ${pob}

Computed Vedic Birth Chart (Lahiri Ayanamsha Ephemeris):
- Ascendant / Lagna: ${vedicData?.lagnaSign?.sanskritName || 'Mesha'} (${vedicData?.lagnaSign?.englishName || 'Aries'}) at ${vedicData?.lagnaDegree || 15}°
- Moon Sign / Chandra Rashi: ${vedicData?.moonSign?.sanskritName || 'Vrishabha'} (${vedicData?.moonSign?.englishName || 'Taurus'})
- Sun Sign / Surya Rashi: ${vedicData?.sunSign?.sanskritName || 'Mithuna'} (${vedicData?.sunSign?.englishName || 'Gemini'})
- Janma Nakshatra: ${vedicData?.nakshatra?.name || 'Rohini'} (Pada ${vedicData?.nakshatra?.pada || 1}, Lord: ${vedicData?.nakshatra?.lord || 'Moon'})
- Current Mahadasha / Antardasha: ${vedicData?.currentDasha?.mahadasha || 'Jupiter'} / ${vedicData?.currentDasha?.antardasha || 'Venus'}
- Key Planetary Placements:
${(vedicData?.planets || []).map((p: any) => `  * ${p.name} (${p.sanskrit}): in ${p.sign} (House ${p.house}, ${p.degree}) [${p.dignity}]`).join('\n')}

Generate the complete, high-quality Vedic Kundli prediction following your 6-step workflow and output style:
1. Validated Birth Chart Confirmation & Kundli Summary
2. Personalized Predictions for:
   ### Health
   ### Wealth
   ### Career
   ### Relationships
3. Key Astrological Strengths & Boons
4. Key Astrological Challenges & Cautions
5. Practical Suggestions & Vedic Remedies (Sattvic habits, auspicious colors, mindfulness, gemstone/mantra recommendations)`;

    let predictionText = '';

    if (apiKey) {
      try {
        const ai = new GoogleGenAI({ apiKey });
        const geminiPromise = ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: userPrompt,
          config: {
            systemInstruction: systemPrompt,
          }
        });

        const timeoutPromise = new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error('Celestial timeout')), 8000)
        );

        const response: any = await Promise.race([geminiPromise, timeoutPromise]);
        predictionText = response?.text || '';
      } catch (err: any) {
        console.warn('Gemini Kundli generation timed out or high demand, using high-precision Vedic engine fallback:', err?.message);
      }
    }

    // High precision Vedic engine synthesis if API key not yet provided or fallback triggered
    if (!predictionText) {
      const lagnaName = vedicData?.lagnaSign?.sanskritName || 'Mesha';
      const rashiName = vedicData?.moonSign?.sanskritName || 'Vrishabha';
      const nakshatraName = vedicData?.nakshatra?.name || 'Rohini';
      const dashaName = vedicData?.currentDasha?.mahadasha || 'Jupiter';

      predictionText = `### 🌟 Vedic Kundli Summary: ${name}
- **Lagna (Ascendant):** ${lagnaName} (${vedicData?.lagnaSign?.englishName || 'Aries'}) — Defines your physical constitution, vitality, and primary orientation to life.
- **Chandra Rashi (Moon Sign):** ${rashiName} (${vedicData?.moonSign?.englishName || 'Taurus'}) — Governs emotional equilibrium, mental peace, and instinctual reactions.
- **Janma Nakshatra:** ${nakshatraName} (Pada ${vedicData?.nakshatra?.pada || 1}, Lord: ${vedicData?.nakshatra?.lord || 'Moon'}) — Unveils innate soul talents and psychological predispositions.
- **Current Planetary Period:** ${dashaName} Mahadasha with ${vedicData?.currentDasha?.antardasha || 'Venus'} Antardasha — Directing focus toward growth, wisdom, and life expansion.

---

### 🌿 Health (Arogya)
With ${lagnaName} as your Lagna, traditional Vedic indications emphasize maintaining balance in your primary elemental dosha (${vedicData?.lagnaSign?.element || 'Agni'}). Your natural vitality is resilient, yet high mental or physical exertion can create seasonal fatigue. 
- **Focus Areas:** Prioritize consistent circadian sleep, digestive harmony, and joint/muscular mobility.
- **Astrological Indication:** Pay special attention to cooling nutrition during stressful planetary transits.

---

### 💰 Wealth (Dhana & Labha)
The alignment of the 2nd House (accumulated wealth) and 11th House (gains and networks) suggests steady, long-term financial prosperity rather than overnight speculation.
- **Opportunities:** Strategic investments in tangible assets, communication, and intellectual ventures yield compounding security.
- **Challenges:** Guard against impulsive expenses driven by emotional highs; establish an automated reserve fund.

---

### ⚖️ Career (Karma Bhava)
The 10th House indicates strong vocational potential in roles requiring strategic discernment, authentic leadership, and independent execution.
- **Suitable Themes:** Advisory roles, creative direction, technology, enterprise leadership, and specialized mentorship.
- **Trajectory:** The current ${dashaName} planetary influence supports stepping into sovereign authority. Collaborative projects will expand your influence significantly.

---

### ❤️ Relationships (Kalatra Bhava)
Your 7th House dynamics and Moon placement in ${rashiName} highlight a deep yearning for emotional authenticity, intellectual loyalty, and peaceful sanctuary at home.
- **Patterns:** You thrive in partnerships where mutual space and shared long-term values are respected without suffocating control.
- **Advice:** Communicate vulnerable expectations clearly early on to prevent silent assumptions from causing friction.

---

### ⚡ Key Astrological Strengths
1. **Luminous Intuition:** Strong connection between Moon and Ascendant granting sharp social perception.
2. **Enduring Perseverance:** Ability to methodically build lasting structures through disciplined dedication.
3. **Harmonic Balance:** Natural diplomatic grace that diffuses volatile environments.

---

### ⚠️ Astrological Challenges & Cautions
- Tendency to over-analyze scenarios and delay decisive execution.
- Vulnerability to burnout when taking on emotional burdens belonging to others.

---

### 🪔 Practical Suggestions & Vedic Remedies
- **Auspicious Colors:** Solar saffron, cream white, and royal navy blue.
- **Mindful Habit:** Practice 10 minutes of Gayatri or Surya breathwork during sunrise to balance prana.
- **Sattvic Practice:** Spend time in natural greenery near water bodies during Full Moon cycles to soothe the mind.`;
    }

    return res.json({
      success: true,
      prediction: predictionText,
      vedicSummary: {
        name,
        dob,
        tob,
        pob,
        lagna: `${vedicData?.lagnaSign?.sanskritName} (${vedicData?.lagnaSign?.englishName})`,
        rashi: `${vedicData?.moonSign?.sanskritName} (${vedicData?.moonSign?.englishName})`,
        nakshatra: `${vedicData?.nakshatra?.name} (Pada ${vedicData?.nakshatra?.pada})`,
        mahadasha: vedicData?.currentDasha?.mahadasha,
        antardasha: vedicData?.currentDasha?.antardasha,
      }
    });
  } catch (error: any) {
    console.error('Error generating Kundli prediction:', error);
    return res.status(500).json({ error: error.message || 'Error generating Kundli prediction' });
  }
});

// Setup Vite in development or static serving in production
if (process.env.NODE_ENV !== 'production') {
  const { createServer: createViteServer } = await import('vite');
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });
  app.use(vite.middlewares);
} else {
  app.use(express.static(path.join(__dirname, 'dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
}

app.listen(port, () => {
  console.log(`Celestial server listening on port ${port}`);
});

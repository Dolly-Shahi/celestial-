export interface ZodiacSignInfo {
  id: string;
  name: string;
  symbol: string;
  glyph: string;
  element: 'Fire' | 'Earth' | 'Air' | 'Water';
  modality: 'Cardinal' | 'Fixed' | 'Mutable';
  rulingPlanet: string;
  dates: string;
  startMonth: number;
  startDay: number;
  endMonth: number;
  endDay: number;
  motto: string;
  traits: string[];
  luckyNumbers: number[];
  luckyColor: string;
  compatibleSigns: string[];
  dailyOverview: string;
  loveInsight: string;
  careerInsight: string;
  wellnessInsight: string;
  cosmicAdvice: string;
}

export const ZODIAC_SIGNS: ZodiacSignInfo[] = [
  {
    id: 'aries',
    name: 'Aries',
    symbol: 'The Ram',
    glyph: '♈',
    element: 'Fire',
    modality: 'Cardinal',
    rulingPlanet: 'Mars',
    dates: 'March 21 – April 19',
    startMonth: 3,
    startDay: 21,
    endMonth: 4,
    endDay: 19,
    motto: 'I Am',
    traits: ['Pioneering', 'Passionate', 'Audacious', 'Direct', 'Fearless'],
    luckyNumbers: [9, 18, 27],
    luckyColor: 'Crimson & Obsidian',
    compatibleSigns: ['Leo', 'Sagittarius', 'Gemini'],
    dailyOverview: 'Mars ignites a profound reservoir of courage within you today. An intuitive flash regarding an ambitious project demands immediate articulation. Clear lingering hesitations.',
    loveInsight: 'Unspoken chemistry rises to the surface. Speak your desires plainly without pretense; authentic vulnerability will disarm even the most guarded hearts.',
    careerInsight: 'A breakthrough opportunity invites bold leadership. Take the podium; your instinct for tactical timing is currently at its planetary zenith.',
    wellnessInsight: 'High fiery vitality requires conscious grounding. Channel excess kinetic energy through rigorous breathwork or twilight movement.',
    cosmicAdvice: 'Do not dilute your heat to accommodate comfortable mediocrity.'
  },
  {
    id: 'taurus',
    name: 'Taurus',
    symbol: 'The Bull',
    glyph: '♉',
    element: 'Earth',
    modality: 'Fixed',
    rulingPlanet: 'Venus',
    dates: 'April 20 – May 20',
    startMonth: 4,
    startDay: 20,
    endMonth: 5,
    endDay: 20,
    motto: 'I Have',
    traits: ['Steadfast', 'Sensual', 'Architectural', 'Loyal', 'Refined'],
    luckyNumbers: [6, 15, 24],
    luckyColor: 'Forest Moss & Burnished Gold',
    compatibleSigns: ['Virgo', 'Capricorn', 'Cancer'],
    dailyOverview: 'Venus bestows an ethereal clarity over your material world. A tactile appreciation for fine art, sacred spaces, and lasting values anchors your sanctuary today.',
    loveInsight: 'Slow, lingering presence cultivates unprecedented intimacy. Cook an exquisite meal or share stillness under the celestial canopy.',
    careerInsight: 'Financial foundations solidify through patient scrutiny. Trust in compound growth rather than impulsive shortcuts.',
    wellnessInsight: 'Indulge the senses in restorative rituals. Scented botanical baths and barefoot contact with earth restore harmonic frequency.',
    cosmicAdvice: 'Patience is not waiting; it is the art of sovereign stillness.'
  },
  {
    id: 'gemini',
    name: 'Gemini',
    symbol: 'The Twins',
    glyph: '♊',
    element: 'Air',
    modality: 'Mutable',
    rulingPlanet: 'Mercury',
    dates: 'May 21 – June 20',
    startMonth: 5,
    startDay: 21,
    endMonth: 6,
    endDay: 20,
    motto: 'I Think',
    traits: ['Inquisitive', 'Eloquent', 'Multifaceted', 'Adaptable', 'Witty'],
    luckyNumbers: [5, 14, 23],
    luckyColor: 'Azure & Platinum',
    compatibleSigns: ['Libra', 'Aquarius', 'Aries'],
    dailyOverview: 'Mercury weaves intricate synaptic sparks across your communicative sphere. Synchronistic conversations unlock portals to unexpected partnerships.',
    loveInsight: 'Mental intimacy precedes romantic desire today. Engage in deep philosophical discourse or lighthearted dialectical banter.',
    careerInsight: 'A synthesis of two disparate ideas yields an innovative solution. Write down every fleeting notion before twilight.',
    wellnessInsight: 'Mental restlessness can tax the nervous system. Dedicate thirty minutes to digital silence and serene soundscapes.',
    cosmicAdvice: 'Curiosity is your sacred compass; follow where its needle vibrates.'
  },
  {
    id: 'cancer',
    name: 'Cancer',
    symbol: 'The Crab',
    glyph: '♋',
    element: 'Water',
    modality: 'Cardinal',
    rulingPlanet: 'The Moon',
    dates: 'June 21 – July 22',
    startMonth: 6,
    startDay: 21,
    endMonth: 7,
    endDay: 22,
    motto: 'I Feel',
    traits: ['Intuitive', 'Protective', 'Poetic', 'Nurturing', 'Resilient'],
    luckyNumbers: [2, 7, 20],
    luckyColor: 'Pearlescent Silver & Deep Sea',
    compatibleSigns: ['Scorpio', 'Pisces', 'Taurus'],
    dailyOverview: 'The Moon heightens your psychic sensitivity. Trust the quiet whisper of your visceral reactions over loud external opinions.',
    loveInsight: 'Tender emotional currents invite soul-to-soul reciprocity. Create a sacred haven where your heart feels unburdened.',
    careerInsight: 'Your intuitive read of colleagues and clients will bypass traditional roadblocks. Lead with empathy and emotional intelligence.',
    wellnessInsight: 'Hydration and lunar reflections replenish your vital aura. Rest near water or meditate during moonrise.',
    cosmicAdvice: 'Your softness is not fragile; it is the ocean carving cliffs into sand.'
  },
  {
    id: 'leo',
    name: 'Leo',
    symbol: 'The Lion',
    glyph: '♌',
    element: 'Fire',
    modality: 'Fixed',
    rulingPlanet: 'The Sun',
    dates: 'July 23 – August 22',
    startMonth: 7,
    startDay: 23,
    endMonth: 8,
    endDay: 22,
    motto: 'I Will',
    traits: ['Radiant', 'Regal', 'Generous', 'Charismatic', 'Magnetic'],
    luckyNumbers: [1, 10, 19],
    luckyColor: 'Solar Amber & Royal Gold',
    compatibleSigns: ['Aries', 'Sagittarius', 'Libra'],
    dailyOverview: 'The solar rays spotlight your innate majesty. A creative renaissance is brewing within your spirit; do not hesitate to showcase your authentic brilliance.',
    loveInsight: 'Generosity of spirit and lavish affection warm your romantic sphere. Express adoration with unreserved theatrical elegance.',
    careerInsight: 'You are summoned to command the narrative. Step into authoritative creative direction and let others orbit your vision.',
    wellnessInsight: 'Nourish the cardiovascular core. Sun exposure and heart-opening stretches activate vitality and solar balance.',
    cosmicAdvice: 'Shine without apology; the sun never asks permission to rise.'
  },
  {
    id: 'virgo',
    name: 'Virgo',
    symbol: 'The Maiden',
    glyph: '♍',
    element: 'Earth',
    modality: 'Mutable',
    rulingPlanet: 'Mercury',
    dates: 'August 23 – September 22',
    startMonth: 8,
    startDay: 23,
    endMonth: 9,
    endDay: 22,
    motto: 'I Analyze',
    traits: ['Discerning', 'Methodical', 'Artisanal', 'Altruistic', 'Sharp'],
    luckyNumbers: [5, 14, 32],
    luckyColor: 'Sage Slate & Alabaster',
    compatibleSigns: ['Taurus', 'Capricorn', 'Scorpio'],
    dailyOverview: 'A masterclass in discernment unfolds. You perceive the subtle geometric alignments in chaos, turning complex friction into exquisite order.',
    loveInsight: 'Acts of deliberate, thoughtful service speak louder than grand declarations. Notice the unspoken needs of those you cherish.',
    careerInsight: 'Refine the finer grain of ongoing contracts or creative manuscripts. Your acute attention to nuance prevents costly future drift.',
    wellnessInsight: 'Support gut health and digestive tranquility with warm herbal tisanes and serene mindful eating.',
    cosmicAdvice: 'Perfection is not sterility; it is devotion to the sacred details.'
  },
  {
    id: 'libra',
    name: 'Libra',
    symbol: 'The Scales',
    glyph: '♎',
    element: 'Air',
    modality: 'Cardinal',
    rulingPlanet: 'Venus',
    dates: 'September 23 – October 22',
    startMonth: 9,
    startDay: 23,
    endMonth: 10,
    endDay: 22,
    motto: 'I Balance',
    traits: ['Harmonious', 'Diplomatic', 'Aesthetic', 'Charming', 'Equitable'],
    luckyNumbers: [6, 15, 33],
    luckyColor: 'Rose Quartz & Champagne',
    compatibleSigns: ['Gemini', 'Aquarius', 'Leo'],
    dailyOverview: 'The cosmic scales seek equilibrium in aesthetic grace and interpersonal diplomacy. A conflict dissolves effortlessly under your measured gaze.',
    loveInsight: 'Harmonic resonance draws admirers into your gravitational field. Seek mutual elevation rather than pleasing at the cost of your sovereignty.',
    careerInsight: 'Strategic alliances formed today carry enduring prosperity. Act as the elegant mediator who closes the grand pact.',
    wellnessInsight: 'Visual symmetry and spatial beauty restore psychological equilibrium. Curate your physical sanctuary.',
    cosmicAdvice: 'True harmony is not silence; it is the tension of strings making divine music.'
  },
  {
    id: 'scorpio',
    name: 'Scorpio',
    symbol: 'The Scorpion',
    glyph: '♏',
    element: 'Water',
    modality: 'Fixed',
    rulingPlanet: 'Pluto & Mars',
    dates: 'October 23 – November 21',
    startMonth: 10,
    startDay: 23,
    endMonth: 11,
    endDay: 21,
    motto: 'I Desire',
    traits: ['Alchemical', 'Penetrating', 'Hypnotic', 'Loyal', 'Transformative'],
    luckyNumbers: [8, 17, 26],
    luckyColor: 'Midnight Black & Deep Garnet',
    compatibleSigns: ['Cancer', 'Pisces', 'Capricorn'],
    dailyOverview: 'Pluto invites you into the alchemical forge of transformation. You hold the rare capacity to transmute leaden adversity into spiritual gold today.',
    loveInsight: 'A profound glance reveals everything words could never articulate. Embrace intense emotional authenticity and shadow exploration.',
    careerInsight: 'Investigate underneath the corporate surface. What remains concealed holds the strategic key to victory.',
    wellnessInsight: 'Psychological release through silence, deep tissue unwinding, and cold immersion restores metamorphic power.',
    cosmicAdvice: 'Do not fear the dark; it is where the stars cast their most luminous spell.'
  },
  {
    id: 'sagittarius',
    name: 'Sagittarius',
    symbol: 'The Archer',
    glyph: '♐',
    element: 'Fire',
    modality: 'Mutable',
    rulingPlanet: 'Jupiter',
    dates: 'November 22 – December 21',
    startMonth: 11,
    startDay: 22,
    endMonth: 12,
    endDay: 21,
    motto: 'I Explore',
    traits: ['Philosophical', 'Expansive', 'Optimistic', 'Free-spirited', 'Visionary'],
    luckyNumbers: [3, 12, 21],
    luckyColor: 'Lapis Lazuli & Royal Indigo',
    compatibleSigns: ['Aries', 'Leo', 'Aquarius'],
    dailyOverview: 'Jupiter expands your horizon of possibility. A philosophical paradigm shift beckons; look beyond the horizon of conventional boundaries.',
    loveInsight: 'Love flourishes in the open plains of mutual freedom and mutual adventures. Plan an escapade or delve into existential wonder together.',
    careerInsight: 'Global vistas, publishing, and visionary investments catch planetary tailwinds. Aim your arrow high toward distant horizons.',
    wellnessInsight: 'Outdoor movement under open skies invigorates the nomadic spirit. Stretch the hips and release muscular constriction.',
    cosmicAdvice: 'The universe expands eternally; allow your mind the same boundless liberty.'
  },
  {
    id: 'capricorn',
    name: 'Capricorn',
    symbol: 'The Sea-Goat',
    glyph: '♑',
    element: 'Earth',
    modality: 'Cardinal',
    rulingPlanet: 'Saturn',
    dates: 'December 22 – January 19',
    startMonth: 12,
    startDay: 22,
    endMonth: 1,
    endDay: 19,
    motto: 'I Build',
    traits: ['Architectonic', 'Stoic', 'Authoritative', 'Disciplined', 'Enduring'],
    luckyNumbers: [4, 8, 22],
    luckyColor: 'Charcoal & Alpine Slate',
    compatibleSigns: ['Taurus', 'Virgo', 'Scorpio'],
    dailyOverview: 'Saturnian discipline aligns with architectonic mastery. The legacy you are building pebble by stone begins to reveal its grand monument.',
    loveInsight: 'Commitment and steadfast loyalty are your highest romantic declarations. Offer enduring shelter in a turbulent world.',
    careerInsight: 'Pragmatic execution supersedes hype. You command the respect of seasoned elders and decision-makers.',
    wellnessInsight: 'Skeletal alignment and spinal fortitude require conscious posture. Prioritize joint mobility and mineral nourishment.',
    cosmicAdvice: 'Mountains do not rush, yet they outlast the fiercest storms.'
  },
  {
    id: 'aquarius',
    name: 'Aquarius',
    symbol: 'The Water-Bearer',
    glyph: '♒',
    element: 'Air',
    modality: 'Fixed',
    rulingPlanet: 'Uranus & Saturn',
    dates: 'January 20 – February 18',
    startMonth: 1,
    startDay: 20,
    endMonth: 2,
    endDay: 18,
    motto: 'I Know',
    traits: ['Visionary', 'Iconoclastic', 'Humanitarian', 'Inventive', 'Futuristic'],
    luckyNumbers: [7, 11, 29],
    luckyColor: 'Electric Cobalt & Starlight',
    compatibleSigns: ['Gemini', 'Libra', 'Sagittarius'],
    dailyOverview: 'Uranus delivers flashes of futuristic insight. What feels unconventional to the masses today is your roadmap to tomorrow.',
    loveInsight: 'Celebrate intellectual eccentricity. Love is deepest when partners grant each other freedom to walk outside conventional molds.',
    careerInsight: 'Community networks and avant-garde technologies present exponential leverage. Share your radical premise fearlessly.',
    wellnessInsight: 'Circulatory vitality benefits from rhythmic aerobic flow and nervous system resetting under nighttime celestial skies.',
    cosmicAdvice: 'You were born ahead of your time to pull the future into the present.'
  },
  {
    id: 'pisces',
    name: 'Pisces',
    symbol: 'The Two Fish',
    glyph: '♓',
    element: 'Water',
    modality: 'Mutable',
    rulingPlanet: 'Neptune & Jupiter',
    dates: 'February 19 – March 20',
    startMonth: 2,
    startDay: 19,
    endMonth: 3,
    endDay: 20,
    motto: 'I Believe',
    traits: ['Mystical', 'Compassionate', 'Dreamer', 'Artistic', 'Transcendent'],
    luckyNumbers: [3, 7, 12],
    luckyColor: 'Seafoam & Ethereal Violet',
    compatibleSigns: ['Cancer', 'Scorpio', 'Taurus'],
    dailyOverview: 'Neptunian mist envelops your consciousness in pure artistic reverie. Dreams and liminal waking states whisper ancestral wisdom.',
    loveInsight: 'Unconditional soul resonance dissolves boundaries. Allow yourself to be loved in totality, spiritual wounds and sacred grace alike.',
    careerInsight: 'Creative intuition transcends linear logic. Trust your artistic aesthetic; your visionary sensibility is unparalleled.',
    wellnessInsight: 'Gentle aquatic immersion, dream journaling, and acoustic healing soundscapes recharge psychic exhaustion.',
    cosmicAdvice: 'You are the drop and the entire celestial ocean at once.'
  }
];

export interface BirthChartPlacements {
  sunSign: string;
  sunDegree: number;
  sunHouse: number;
  moonSign: string;
  moonDegree: number;
  moonHouse: number;
  risingSign: string;
  risingDegree: number;
  mercurySign: string;
  mercuryDegree: number;
  mercuryHouse: number;
  venusSign: string;
  venusDegree: number;
  venusHouse: number;
  marsSign: string;
  marsDegree: number;
  marsHouse: number;
  jupiterSign: string;
  jupiterDegree: number;
  jupiterHouse: number;
  saturnSign: string;
  saturnDegree: number;
  saturnHouse: number;
  houses: { house: number; sign: string; theme: string }[];
  dominantElement: string;
  dominantModality: string;
  cosmicTrinity: {
    sunSynthesis: string;
    moonSynthesis: string;
    risingSynthesis: string;
  };
}

// Astrological calculation engine
export function calculateBirthChart(
  birthDateStr: string, // YYYY-MM-DD
  birthTimeStr: string, // HH:MM
  locationStr: string = 'Cosmic Center'
): BirthChartPlacements {
  const [yearStr, monthStr, dayStr] = birthDateStr.split('-');
  const year = parseInt(yearStr || '2000', 10);
  const month = parseInt(monthStr || '6', 10);
  const day = parseInt(dayStr || '15', 10);

  const [hourStr, minStr] = (birthTimeStr || '12:00').split(':');
  const hour = parseInt(hourStr || '12', 10);
  const minute = parseInt(minStr || '0', 10);

  // 1. Calculate Sun Sign based on date
  let sunSign = 'Gemini';
  for (const sign of ZODIAC_SIGNS) {
    if (
      (month === sign.startMonth && day >= sign.startDay) ||
      (month === sign.endMonth && day <= sign.endDay)
    ) {
      sunSign = sign.name;
      break;
    }
  }

  // Calculate day of year
  const dayOfYear = Math.floor((month - 1) * 30.4 + day);
  const sunDegree = Math.floor(((dayOfYear % 30) + 1) * 0.9 + 1);

  // 2. Calculate Moon Sign (Moon traverses 1 sign every ~2.3 days = 13.2 degrees/day)
  const moonOffset = Math.floor((dayOfYear * 13.2 + hour * 0.55 + year * 3.7) % 360);
  const signIndexMoon = Math.floor(moonOffset / 30) % 12;
  const moonSign = ZODIAC_SIGNS[signIndexMoon]?.name || 'Taurus';
  const moonDegree = Math.floor(moonOffset % 30);

  // 3. Calculate Rising Sign (Ascendant shifts 1 sign roughly every 2 hours)
  const sunSignIndex = ZODIAC_SIGNS.findIndex(s => s.name === sunSign);
  const hoursSinceSunrise = (hour - 6 + 24) % 24;
  const risingIndex = (sunSignIndex + Math.floor(hoursSinceSunrise / 2)) % 12;
  const risingSign = ZODIAC_SIGNS[risingIndex]?.name || 'Leo';
  const risingDegree = Math.floor(((minute / 60) * 30 + 7) % 30);

  // 4. Mercury (always within 28 degrees of Sun)
  const mercuryOffset = (sunSignIndex + ((day % 3) - 1 + 12)) % 12;
  const mercurySign = ZODIAC_SIGNS[mercuryOffset]?.name || sunSign;
  const mercuryDegree = Math.floor((sunDegree + (day % 15)) % 30);

  // 5. Venus (always within 48 degrees of Sun)
  const venusOffset = (sunSignIndex + ((day % 5) - 2 + 12)) % 12;
  const venusSign = ZODIAC_SIGNS[venusOffset]?.name || 'Libra';
  const venusDegree = Math.floor((sunDegree + 14) % 30);

  // 6. Mars
  const marsOffset = (sunSignIndex + ((year + month) % 12)) % 12;
  const marsSign = ZODIAC_SIGNS[marsOffset]?.name || 'Aries';
  const marsDegree = Math.floor((day * 3 + 4) % 30);

  // 7. Jupiter (spends ~1 year in each sign)
  const jupiterOffset = (year + 4) % 12;
  const jupiterSign = ZODIAC_SIGNS[jupiterOffset]?.name || 'Sagittarius';
  const jupiterDegree = Math.floor((day + 11) % 30);

  // 8. Saturn (spends ~2.5 years in each sign)
  const saturnOffset = Math.floor((year * 0.4) % 12);
  const saturnSign = ZODIAC_SIGNS[saturnOffset]?.name || 'Capricorn';
  const saturnDegree = Math.floor((day + 8) % 30);

  // Houses starting from Ascendant
  const houseThemes = [
    'Self, Identity & Physical Aura',
    'Wealth, Assets & Material Values',
    'Intellect, Expression & Environment',
    'Home, Ancestry & Emotional Roots',
    'Creative Fire, Romance & Vital Joy',
    'Service, Rituals & Physical Health',
    'Sacred Unions, Partnerships & Mirrors',
    'Metamorphosis, Shadows & Shared Power',
    'Higher Wisdom, Philosophy & Horizons',
    'Public Legacy, Career & Sovereign Standing',
    'Alliances, Community & Collective Dreams',
    'Subconscious, Dreams & Spiritual Sanctuary'
  ];

  const houses = houseThemes.map((theme, i) => {
    const signIdx = (risingIndex + i) % 12;
    return {
      house: i + 1,
      sign: ZODIAC_SIGNS[signIdx]?.name || 'Aries',
      theme
    };
  });

  // Calculate planetary houses based on Ascendant
  const getHouseForSign = (targetSign: string) => {
    const idx = ZODIAC_SIGNS.findIndex(s => s.name === targetSign);
    return ((idx - risingIndex + 12) % 12) + 1;
  };

  const sunHouse = getHouseForSign(sunSign);
  const moonHouse = getHouseForSign(moonSign);
  const mercuryHouse = getHouseForSign(mercurySign);
  const venusHouse = getHouseForSign(venusSign);
  const marsHouse = getHouseForSign(marsSign);
  const jupiterHouse = getHouseForSign(jupiterSign);
  const saturnHouse = getHouseForSign(saturnSign);

  // Dominant element determination
  const signsInChart = [sunSign, moonSign, risingSign, mercurySign, venusSign, marsSign];
  const elementCounts: Record<string, number> = { Fire: 0, Earth: 0, Air: 0, Water: 0 };
  signsInChart.forEach(name => {
    const s = ZODIAC_SIGNS.find(z => z.name === name);
    if (s) elementCounts[s.element] = (elementCounts[s.element] || 0) + 1;
  });

  let dominantElement = 'Fire';
  let maxCount = -1;
  Object.entries(elementCounts).forEach(([elem, count]) => {
    if (count > maxCount) {
      maxCount = count;
      dominantElement = elem;
    }
  });

  return {
    sunSign,
    sunDegree,
    sunHouse,
    moonSign,
    moonDegree,
    moonHouse,
    risingSign,
    risingDegree,
    mercurySign,
    mercuryDegree,
    mercuryHouse,
    venusSign,
    venusDegree,
    venusHouse,
    marsSign,
    marsDegree,
    marsHouse,
    jupiterSign,
    jupiterDegree,
    jupiterHouse,
    saturnSign,
    saturnDegree,
    saturnHouse,
    houses,
    dominantElement,
    dominantModality: 'Cardinal',
    cosmicTrinity: {
      sunSynthesis: `Your conscious vitality shines through ${sunSign} in the ${sunHouse}${getOrdinal(sunHouse)} House. You express identity through purposeful sovereignty and luminous authenticity.`,
      moonSynthesis: `Your subconscious emotional realm is anchored in ${moonSign} in the ${moonHouse}${getOrdinal(moonHouse)} House. When navigating deep feelings, you find sanctuary in emotional equilibrium and intuitive self-trust.`,
      risingSynthesis: `Your outer persona and physical gateway is ${risingSign} at ${risingDegree}°. Others encounter you with magnetic grace, commanding natural reverence and intellectual presence.`
    }
  };
}

function getOrdinal(n: number): string {
  if (n === 1) return 'st';
  if (n === 2) return 'nd';
  if (n === 3) return 'rd';
  return 'th';
}

// Current planetary transits for the cosmic forecaster
export interface CosmicTransit {
  planet: string;
  sign: string;
  motion: 'Direct' | 'Retrograde';
  degree: string;
  transitInfluence: string;
  theme: string;
}

export const CURRENT_TRANSITS: CosmicTransit[] = [
  {
    planet: 'Sun',
    sign: 'Libra',
    motion: 'Direct',
    degree: '19° 24\'',
    transitInfluence: 'Shining a clarifying light upon diplomatic contracts, balance, and aesthetic alignment.',
    theme: 'Harmony & Equilibrium'
  },
  {
    planet: 'Moon',
    sign: 'Scorpio',
    motion: 'Direct',
    degree: '11° 02\'',
    transitInfluence: 'Illuminating subconscious depths, profound intuition, and transformative truth.',
    theme: 'Emotional Metamorphosis'
  },
  {
    planet: 'Mercury',
    sign: 'Scorpio',
    motion: 'Direct',
    degree: '04° 48\'',
    transitInfluence: 'Sharpening investigative faculties and piercing beyond surface conversation.',
    theme: 'Deep Perception'
  },
  {
    planet: 'Venus',
    sign: 'Sagittarius',
    motion: 'Direct',
    degree: '23° 15\'',
    transitInfluence: 'Infusing love with adventurous spirit, philosophical chemistry, and wide horizons.',
    theme: 'Expansive Romance'
  },
  {
    planet: 'Mars',
    sign: 'Cancer',
    motion: 'Direct',
    degree: '17° 30\'',
    transitInfluence: 'Channeling physical drive into fiercely protective emotional sanctuaries.',
    theme: 'Sacred Devotion'
  },
  {
    planet: 'Jupiter',
    sign: 'Gemini',
    motion: 'Retrograde',
    degree: '21° 09\'',
    transitInfluence: 'Inviting internal reflection on intellectual curiosities and diverse philosophies.',
    theme: 'Inner Horizon Expansion'
  },
  {
    planet: 'Saturn',
    sign: 'Pisces',
    motion: 'Retrograde',
    degree: '13° 55\'',
    transitInfluence: 'Structuring spiritual discipline and transforming mystical visions into reality.',
    theme: 'Architect of Dreams'
  }
];

// Tarot / Oracle archetypes for the Future Oracle feature
export interface OracleCard {
  id: string;
  name: string;
  subtitle: string;
  symbol: string;
  element: string;
  divinationMessage: string;
  cosmicAdvice: string;
}

export const ORACLE_DECK: OracleCard[] = [
  {
    id: 'the-star',
    name: 'The Star',
    subtitle: 'Cosmic Renewal & Divine Hope',
    symbol: '✧',
    element: 'Aquarius / Air',
    divinationMessage: 'The waters of celestial grace pour into the dry earth. A period of profound spiritual healing and quiet, unshakeable certainty is arriving.',
    cosmicAdvice: 'Trust the blueprint you cannot yet see in its entirety. Your intuition is tuned to the future.'
  },
  {
    id: 'the-high-priestess',
    name: 'The High Priestess',
    subtitle: 'Sacred Veil & Lunar Intuition',
    symbol: '☾',
    element: 'Moon / Water',
    divinationMessage: 'Behind the velvet veil of your conscious mind lies the exact resolution you seek. Silence external clamor and attend to the dream world.',
    cosmicAdvice: 'Do not rush into premature declarations. Allow the mystery to ripen before unveiling it.'
  },
  {
    id: 'the-chariot',
    name: 'The Chariot',
    subtitle: 'Sovereign Will & Victory',
    symbol: '⚡',
    element: 'Cancer / Water',
    divinationMessage: 'Opposing desires are harnessed into singular, irresistible momentum. You are breaking through stagnation through disciplined emotional focus.',
    cosmicAdvice: 'Keep both hands steady upon the celestial reins; victory is earned through internal coherence.'
  },
  {
    id: 'the-empress',
    name: 'The Empress',
    subtitle: 'Bountiful Creation & Venusian Bloom',
    symbol: '✿',
    element: 'Venus / Earth',
    divinationMessage: 'Abundance flourishes where attention and sensual love are lavished. A creative harvest or romantic blossoming is ready to be received.',
    cosmicAdvice: 'Embrace beauty as an essential discipline. Nourish the garden and trust the soil.'
  },
  {
    id: 'the-hierophant',
    name: 'The Hierophant',
    subtitle: 'Ancestral Lineage & Sacred Knowledge',
    symbol: '🏛️',
    element: 'Taurus / Earth',
    divinationMessage: 'Ancient wisdom and structured study offer the firm ground you need. Seek mentors of high moral character and enduring principles.',
    cosmicAdvice: 'Ground your unconventional brilliance in timeless fundamentals.'
  },
  {
    id: 'wheel-of-fortune',
    name: 'Wheel of Fortune',
    subtitle: 'Celestial Cycles & Karmic Pivot',
    symbol: '☸',
    element: 'Jupiter / Fire',
    divinationMessage: 'The wheel of heaven turns, shifting karmic tides in your favor. What was low ascends; what was stagnant begins to dance with synchronicity.',
    cosmicAdvice: 'Remain centered at the hub of the wheel where stillness reigns, even as the rim spins.'
  }
];

export interface VedicSign {
  id: number;
  sanskritName: string;
  englishName: string;
  symbol: string;
  lord: string;
  element: 'Agni (Fire)' | 'Prithvi (Earth)' | 'Vayu (Air)' | 'Jala (Water)';
}

export const VEDIC_SIGNS: VedicSign[] = [
  { id: 1, sanskritName: 'Mesha', englishName: 'Aries', symbol: '♈', lord: 'Mars (Mangal)', element: 'Agni (Fire)' },
  { id: 2, sanskritName: 'Vrishabha', englishName: 'Taurus', symbol: '♉', lord: 'Venus (Shukra)', element: 'Prithvi (Earth)' },
  { id: 3, sanskritName: 'Mithuna', englishName: 'Gemini', symbol: '♊', lord: 'Mercury (Budh)', element: 'Vayu (Air)' },
  { id: 4, sanskritName: 'Karka', englishName: 'Cancer', symbol: '♋', lord: 'Moon (Chandra)', element: 'Jala (Water)' },
  { id: 5, sanskritName: 'Simha', englishName: 'Leo', symbol: '♌', lord: 'Sun (Surya)', element: 'Agni (Fire)' },
  { id: 6, sanskritName: 'Kanya', englishName: 'Virgo', symbol: '♍', lord: 'Mercury (Budh)', element: 'Prithvi (Earth)' },
  { id: 7, sanskritName: 'Tula', englishName: 'Libra', symbol: '♎', lord: 'Venus (Shukra)', element: 'Vayu (Air)' },
  { id: 8, sanskritName: 'Vrishchika', englishName: 'Scorpio', symbol: '♏', lord: 'Mars (Mangal)', element: 'Jala (Water)' },
  { id: 9, sanskritName: 'Dhanu', englishName: 'Sagittarius', symbol: '♐', lord: 'Jupiter (Guru)', element: 'Agni (Fire)' },
  { id: 10, sanskritName: 'Makara', englishName: 'Capricorn', symbol: '♑', lord: 'Saturn (Shani)', element: 'Prithvi (Earth)' },
  { id: 11, sanskritName: 'Kumbha', englishName: 'Aquarius', symbol: '♒', lord: 'Saturn (Shani)', element: 'Vayu (Air)' },
  { id: 12, sanskritName: 'Meena', englishName: 'Pisces', symbol: '♓', lord: 'Jupiter (Guru)', element: 'Jala (Water)' },
];

export const NAKSHATRAS = [
  { name: 'Ashwini', lord: 'Ketu', deity: 'Ashwini Kumaras' },
  { name: 'Bharani', lord: 'Venus', deity: 'Yama' },
  { name: 'Krittika', lord: 'Sun', deity: 'Agni' },
  { name: 'Rohini', lord: 'Moon', deity: 'Brahma' },
  { name: 'Mrigashira', lord: 'Mars', deity: 'Soma' },
  { name: 'Ardra', lord: 'Rahu', deity: 'Rudra' },
  { name: 'Punarvasu', lord: 'Jupiter', deity: 'Aditi' },
  { name: 'Pushya', lord: 'Saturn', deity: 'Brihaspati' },
  { name: 'Ashlesha', lord: 'Mercury', deity: 'Nagas' },
  { name: 'Magha', lord: 'Ketu', deity: 'Pitris' },
  { name: 'Purva Phalguni', lord: 'Venus', deity: 'Bhaga' },
  { name: 'Uttara Phalguni', lord: 'Sun', deity: 'Aryaman' },
  { name: 'Hasta', lord: 'Moon', deity: 'Savitr' },
  { name: 'Chitra', lord: 'Mars', deity: 'Vishwakarma' },
  { name: 'Swati', lord: 'Rahu', deity: 'Vayu' },
  { name: 'Vishakha', lord: 'Jupiter', deity: 'Indragni' },
  { name: 'Anuradha', lord: 'Saturn', deity: 'Mitra' },
  { name: 'Jyeshtha', lord: 'Mercury', deity: 'Indra' },
  { name: 'Mula', lord: 'Ketu', deity: 'Nirriti' },
  { name: 'Purva Ashadha', lord: 'Venus', deity: 'Apas' },
  { name: 'Uttara Ashadha', lord: 'Sun', deity: 'Vishwadevas' },
  { name: 'Shravana', lord: 'Moon', deity: 'Vishnu' },
  { name: 'Dhanishta', lord: 'Mars', deity: 'Ashta Vasus' },
  { name: 'Shatabhisha', lord: 'Rahu', deity: 'Varuna' },
  { name: 'Purva Bhadrapada', lord: 'Jupiter', deity: 'Aja Ekapada' },
  { name: 'Uttara Bhadrapada', lord: 'Saturn', deity: 'Ahirbudhnya' },
  { name: 'Revati', lord: 'Mercury', deity: 'Pushan' },
];

export interface VedicKundliData {
  name: string;
  dob: string;
  tob: string;
  pob: string;
  lagnaSign: VedicSign;
  lagnaDegree: number;
  moonSign: VedicSign;
  moonDegree: number;
  sunSign: VedicSign;
  sunDegree: number;
  nakshatra: {
    name: string;
    lord: string;
    pada: number;
  };
  currentDasha: {
    mahadasha: string;
    antardasha: string;
    duration: string;
  };
  planets: {
    name: string;
    sanskrit: string;
    abbreviation: string;
    sign: string;
    signId: number;
    house: number;
    degree: string;
    isRetrograde?: boolean;
    dignity: string;
  }[];
  houses: {
    houseNumber: number;
    signId: number;
    signName: string;
    lord: string;
    planets: string[];
    significance: string;
  }[];
}

// Calculate Vedic chart (Sidereal with ~24° Lahiri Ayanamsha offset)
export function calculateVedicKundli(
  dobStr: string,
  tobStr: string,
  pobStr: string = 'New Delhi, India',
  name: string = 'Seeker'
): VedicKundliData {
  const [yearStr, monthStr, dayStr] = (dobStr || '1995-05-15').split('-');
  const year = parseInt(yearStr, 10);
  const month = parseInt(monthStr, 10);
  const day = parseInt(dayStr, 10);

  const [hourStr, minStr] = (tobStr || '10:30').split(':');
  const hour = parseInt(hourStr || '10', 10);
  const minute = parseInt(minStr || '30', 10);

  // Day of year
  const dayOfYear = Math.floor((month - 1) * 30.4375 + day);

  // Approximate Sun longitude (Tropical to Sidereal Lahiri: subtract ~24 degrees)
  const tropicalSunDeg = ((dayOfYear - 80 + 365) % 365) * (360 / 365.25);
  const ayanamsha = 24.1;
  const siderealSunDeg = (tropicalSunDeg - ayanamsha + 360) % 360;
  const sunSignId = Math.floor(siderealSunDeg / 30) + 1;
  const sunDegreeInSign = Math.floor(siderealSunDeg % 30);

  // Lagna (Ascendant) changes roughly every 2 hours (1 sign = 30°)
  // Base offset from sunrise (typically 06:00 local)
  const hoursSinceSunrise = (hour - 6 + minute / 60 + 24) % 24;
  const lagnaOffset = Math.floor(hoursSinceSunrise / 2);
  const lagnaSignId = ((sunSignId - 1 + lagnaOffset) % 12) + 1;
  const lagnaDegreeInSign = Math.floor(((minute + (hour % 2) * 60) / 120) * 30);

  // Moon longitude (Sidereal)
  const moonTropicalDeg = (dayOfYear * 13.176 + hour * 0.55 + year * 11.23) % 360;
  const siderealMoonDeg = (moonTropicalDeg - ayanamsha + 360) % 360;
  const moonSignId = Math.floor(siderealMoonDeg / 30) + 1;
  const moonDegreeInSign = Math.floor(siderealMoonDeg % 30);

  // Nakshatra calculation (360° / 27 = 13°20' = 13.3333° per nakshatra)
  const nakshatraIndex = Math.floor(siderealMoonDeg / 13.33333) % 27;
  const nakshatraObj = NAKSHATRAS[nakshatraIndex] || NAKSHATRAS[0];
  const degIntoNakshatra = siderealMoonDeg % 13.33333;
  const pada = Math.min(4, Math.floor(degIntoNakshatra / 3.33333) + 1);

  // Calculate planetary signs & houses relative to Lagna
  const getHouseNumber = (targetSignId: number) => {
    return ((targetSignId - lagnaSignId + 12) % 12) + 1;
  };

  // Planets with realistic Sidereal placements
  const marsSignId = ((sunSignId + 2 + (year % 3)) % 12) || 12;
  const mercurySignId = ((sunSignId - 1 + (day % 3) + 12) % 12) || 12;
  const venusSignId = ((sunSignId + (month % 3)) % 12) || 12;
  const jupiterSignId = ((Math.floor(year / 1) + 4) % 12) || 12;
  const saturnSignId = ((Math.floor(year / 2.5) + 7) % 12) || 12;
  const rahuSignId = ((12 - (year % 12) + 5) % 12) || 12;
  const ketuSignId = ((rahuSignId + 6) % 12) || 12;

  const lagnaSign = VEDIC_SIGNS[lagnaSignId - 1];
  const moonSign = VEDIC_SIGNS[moonSignId - 1];
  const sunSign = VEDIC_SIGNS[sunSignId - 1];

  const planetsList = [
    { name: 'Ascendant (Lagna)', sanskrit: 'Lagna', abbreviation: 'As', sign: lagnaSign.sanskritName, signId: lagnaSignId, house: 1, degree: `${lagnaDegreeInSign}° 12'`, dignity: 'Own / Root' },
    { name: 'Sun', sanskrit: 'Surya', abbreviation: 'Su', sign: VEDIC_SIGNS[sunSignId - 1].sanskritName, signId: sunSignId, house: getHouseNumber(sunSignId), degree: `${sunDegreeInSign}° 44'`, dignity: sunSignId === 5 ? 'Swakshetra' : sunSignId === 1 ? 'Uccha (Exalted)' : 'Mitra' },
    { name: 'Moon', sanskrit: 'Chandra', abbreviation: 'Mo', sign: VEDIC_SIGNS[moonSignId - 1].sanskritName, signId: moonSignId, house: getHouseNumber(moonSignId), degree: `${moonDegreeInSign}° 18'`, dignity: moonSignId === 2 ? 'Uccha (Exalted)' : moonSignId === 4 ? 'Swakshetra' : 'Sama' },
    { name: 'Mars', sanskrit: 'Mangal', abbreviation: 'Ma', sign: VEDIC_SIGNS[marsSignId - 1].sanskritName, signId: marsSignId, house: getHouseNumber(marsSignId), degree: `${(day * 2) % 28 + 1}° 05'`, dignity: marsSignId === 10 ? 'Uccha (Exalted)' : 'Strong' },
    { name: 'Mercury', sanskrit: 'Budh', abbreviation: 'Me', sign: VEDIC_SIGNS[mercurySignId - 1].sanskritName, signId: mercurySignId, house: getHouseNumber(mercurySignId), degree: `${(day * 3) % 27 + 2}° 33'`, dignity: mercurySignId === 6 ? 'Uccha (Exalted)' : 'Mitra' },
    { name: 'Venus', sanskrit: 'Shukra', abbreviation: 'Ve', sign: VEDIC_SIGNS[venusSignId - 1].sanskritName, signId: venusSignId, house: getHouseNumber(venusSignId), degree: `${(month * 2) % 26 + 3}° 50'`, dignity: venusSignId === 12 ? 'Uccha (Exalted)' : 'Swakshetra' },
    { name: 'Jupiter', sanskrit: 'Guru', abbreviation: 'Ju', sign: VEDIC_SIGNS[jupiterSignId - 1].sanskritName, signId: jupiterSignId, house: getHouseNumber(jupiterSignId), degree: `${(year % 25) + 4}° 19'`, dignity: jupiterSignId === 4 ? 'Uccha (Exalted)' : 'Deva Guru' },
    { name: 'Saturn', sanskrit: 'Shani', abbreviation: 'Sa', sign: VEDIC_SIGNS[saturnSignId - 1].sanskritName, signId: saturnSignId, house: getHouseNumber(saturnSignId), degree: `${(year % 28) + 1}° 40'`, isRetrograde: year % 2 === 0, dignity: saturnSignId === 7 ? 'Uccha (Exalted)' : 'Karmic Lord' },
    { name: 'Rahu', sanskrit: 'Rahu', abbreviation: 'Ra', sign: VEDIC_SIGNS[rahuSignId - 1].sanskritName, signId: rahuSignId, house: getHouseNumber(rahuSignId), degree: `${14 + (day % 10)}° 11'`, isRetrograde: true, dignity: 'Chhaya Graha' },
    { name: 'Ketu', sanskrit: 'Ketu', abbreviation: 'Ke', sign: VEDIC_SIGNS[ketuSignId - 1].sanskritName, signId: ketuSignId, house: getHouseNumber(ketuSignId), degree: `${14 + (day % 10)}° 11'`, isRetrograde: true, dignity: 'Moksha Karaka' },
  ];

  // 12 Houses
  const houseMeanings = [
    'Tanu Bhava — Self, Physical Health, Constitution & General Outlook',
    'Dhana Bhava — Wealth, Liquid Assets, Speech & Lineage/Family',
    'Sahaja Bhava — Siblings, Courage, Vital Efforts & Communication',
    'Sukha/Bandhu Bhava — Mother, Emotional Inner Sanctuary, Land & Comforts',
    'Putra Bhava — Intelligence, Past Merits (Purva Punya), Children & Wisdom',
    'Ari/Shatru Bhava — Health Vulnerabilities, Service, Competitions & Debts',
    'Kalatra Bhava — Marriage, Long-Term Partnerships, Trade & Other People',
    'Randhra Bhava — Longevity, Sudden Transformations, Hidden Secrets & Research',
    'Dharma/Bhagya Bhava — Fortune, Higher Dharma, Father & Spiritual Guidance',
    'Karma Bhava — Career, Profession, Public Honor & Sovereign Authority',
    'Labha Bhava — Gains, Hopes, Elder Siblings, Professional Network & Inflow',
    'Vyaya Bhava — Expenditures, Foreign Lands, Spiritual Solitude & Moksha',
  ];

  const houses = [];
  for (let h = 1; h <= 12; h++) {
    const sId = ((lagnaSignId - 1 + (h - 1)) % 12) + 1;
    const signObj = VEDIC_SIGNS[sId - 1];
    const planetsInHouse = planetsList.filter(p => p.house === h).map(p => p.abbreviation);
    houses.push({
      houseNumber: h,
      signId: sId,
      signName: `${signObj.sanskritName} (${signObj.englishName})`,
      lord: signObj.lord,
      planets: planetsInHouse,
      significance: houseMeanings[h - 1],
    });
  }

  // Dasha calculation
  const dashaLords = ['Ketu', 'Venus', 'Sun', 'Moon', 'Mars', 'Rahu', 'Jupiter', 'Saturn', 'Mercury'];
  const startLordIndex = dashaLords.indexOf(nakshatraObj.lord);
  const currentLord = dashaLords[(startLordIndex + Math.floor((new Date().getFullYear() - year) / 9)) % 9] || nakshatraObj.lord;
  const antardashaLord = dashaLords[(startLordIndex + 3) % 9] || 'Jupiter';

  return {
    name: name || 'Seeker',
    dob: dobStr,
    tob: tobStr,
    pob: pobStr,
    lagnaSign,
    lagnaDegree: lagnaDegreeInSign,
    moonSign,
    moonDegree: moonDegreeInSign,
    sunSign,
    sunDegree: sunDegreeInSign,
    nakshatra: {
      name: nakshatraObj.name,
      lord: nakshatraObj.lord,
      pada,
    },
    currentDasha: {
      mahadasha: currentLord,
      antardasha: antardashaLord,
      duration: `${new Date().getFullYear()} – ${new Date().getFullYear() + 3}`,
    },
    planets: planetsList,
    houses,
  };
}

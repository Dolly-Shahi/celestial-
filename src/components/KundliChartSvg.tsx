import React from 'react';
import { VedicKundliData } from '../data/vedicAstrology';

interface KundliChartSvgProps {
  kundliData: VedicKundliData;
  isDarkMode: boolean;
}

export const KundliChartSvg: React.FC<KundliChartSvgProps> = ({ kundliData, isDarkMode }) => {
  // Houses coordinates in a 400x400 North Indian Kundli Diamond Chart
  // House 1 is always the top central diamond
  const houseData = kundliData.houses;

  // Sign numbers and planets for each house
  const getHouseInfo = (hNum: number) => {
    const h = houseData.find(item => item.houseNumber === hNum);
    return {
      signId: h?.signId || hNum,
      planets: h?.planets || [],
    };
  };

  // Positions for House numbers and planet text in each of the 12 houses
  const housePositions: Record<number, { textX: number; textY: number; numX: number; numY: number }> = {
    1:  { textX: 200, textY: 105, numX: 200, numY: 55 },   // 1st House (Lagna diamond)
    2:  { textX: 100, textY: 50,  numX: 135, numY: 65 },   // 2nd House
    3:  { textX: 50,  textY: 100, numX: 65,  numY: 135 },  // 3rd House
    4:  { textX: 105, textY: 200, numX: 55,  numY: 200 },  // 4th House (Left diamond)
    5:  { textX: 50,  textY: 300, numX: 65,  numY: 265 },  // 5th House
    6:  { textX: 100, textY: 350, numX: 135, numY: 335 },  // 6th House
    7:  { textX: 200, textY: 295, numX: 200, numY: 345 },  // 7th House (Bottom diamond)
    8:  { textX: 300, textY: 350, numX: 265, numY: 335 },  // 8th House
    9:  { textX: 350, textY: 300, numX: 335, numY: 265 },  // 9th House
    10: { textX: 295, textY: 200, numX: 345, numY: 200 },  // 10th House (Right diamond)
    11: { textX: 350, textY: 100, numX: 335, numY: 135 },  // 11th House
    12: { textX: 300, textY: 50,  numX: 265, numY: 65 },   // 12th House
  };

  const borderColor = isDarkMode ? '#e2e8f0' : '#0f172a';
  const diamondBg = isDarkMode ? 'rgba(30, 41, 59, 0.65)' : 'rgba(255, 255, 255, 0.9)';
  const lagnaBg = isDarkMode ? 'rgba(245, 158, 11, 0.12)' : 'rgba(254, 243, 199, 0.6)';
  const numColor = isDarkMode ? '#94a3b8' : '#64748b';
  const planetColor = isDarkMode ? '#f8fafc' : '#0f172a';

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-full max-w-[380px] aspect-square">
        <svg 
          viewBox="0 0 400 400" 
          className="w-full h-full select-none drop-shadow-md"
        >
          {/* Outer square */}
          <rect 
            x="4" 
            y="4" 
            width="392" 
            height="392" 
            fill={diamondBg} 
            stroke={borderColor} 
            strokeWidth="2.5" 
          />

          {/* Diagonal Corner-to-Corner Lines */}
          <line x1="4" y1="4" x2="396" y2="396" stroke={borderColor} strokeWidth="1.8" />
          <line x1="396" y1="4" x2="4" y2="396" stroke={borderColor} strokeWidth="1.8" />

          {/* Central Diamond connecting midpoints: (200,4) to (4,200) to (200,396) to (396,200) */}
          <polygon 
            points="200,4 4,200 200,396 396,200" 
            fill="none" 
            stroke={borderColor} 
            strokeWidth="1.8" 
          />

          {/* Subtle highlight on Lagna House (House 1) */}
          <polygon 
            points="200,4 102,102 200,200 298,102" 
            fill={lagnaBg} 
            stroke={borderColor} 
            strokeWidth="1.5" 
          />

          {/* House 7 subtle tint */}
          <polygon 
            points="200,396 102,298 200,200 298,298" 
            fill={isDarkMode ? 'rgba(56, 189, 248, 0.06)' : 'rgba(224, 242, 254, 0.5)'} 
            stroke={borderColor} 
            strokeWidth="1.5" 
          />

          {/* Render 12 houses content */}
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(hNum => {
            const { signId, planets } = getHouseInfo(hNum);
            const pos = housePositions[hNum];
            const isLagna = hNum === 1;

            return (
              <g key={hNum}>
                {/* Sign number indicator */}
                <text
                  x={pos.numX}
                  y={pos.numY}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontSize="11"
                  fontWeight="600"
                  fontFamily="'Inter', sans-serif"
                  fill={isLagna ? '#f59e0b' : numColor}
                >
                  {signId}
                </text>

                {/* Planets text in this house */}
                {planets.length > 0 && (
                  <text
                    x={pos.textX}
                    y={pos.textY}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fontSize={planets.length > 2 ? '10' : '12'}
                    fontWeight="700"
                    fontFamily="'Inter', sans-serif"
                    fill={planetColor}
                    letterSpacing="1"
                  >
                    {planets.join(' ')}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      <div className="mt-3 flex items-center justify-center gap-4 text-[11px] font-sans opacity-70">
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-amber-500/40 border border-amber-500"></span>
          House 1 (Lagna / Tanu)
        </span>
        <span className="opacity-40">·</span>
        <span>Numbers = Sidereal Signs</span>
        <span className="opacity-40">·</span>
        <span>North Indian Diamond Style</span>
      </div>
    </div>
  );
};

/**
 * build-hidden-object-assets.cjs
 * Generates all 10 detailed SVG scene illustrations and the TypeScript data file.
 */

const fs = require('fs');
const path = require('path');
const { levelsData, OUTPUT_DIR, DATA_FILE } = require('./generate-hidden-object-levels.cjs');

// SVG Generator Functions for all 10 levels:
function getSvgHeader(id) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600" width="100%" height="100%" aria-label="Hidden Object Scene - ${id}">
  <defs>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="1" dy="3" stdDeviation="3" flood-opacity="0.3"/>
    </filter>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="4" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
  </defs>`;
}

function getSvgFooter() {
  return `</svg>`;
}

// LEVEL 1: Cozy Living Room
function generateLevel1Svg() {
  return `${getSvgHeader('Cozy Living Room')}
  <!-- Background Wall -->
  <defs>
    <linearGradient id="l1-wall" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#2a334a"/>
      <stop offset="100%" stop-color="#1e2436"/>
    </linearGradient>
    <linearGradient id="l1-floor" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#7c4a27"/>
      <stop offset="100%" stop-color="#542e13"/>
    </linearGradient>
    <linearGradient id="l1-fire" x1="0" y1="1" x2="0" y2="0">
      <stop offset="0%" stop-color="#ef4444"/>
      <stop offset="50%" stop-color="#f59e0b"/>
      <stop offset="100%" stop-color="#fef08a"/>
    </linearGradient>
  </defs>

  <!-- Wall & Wainscoting -->
  <rect x="0" y="0" width="900" height="420" fill="url(#l1-wall)"/>
  <rect x="0" y="360" width="900" height="60" fill="#2d2118"/>
  <line x1="0" y1="360" x2="900" y2="360" stroke="#4a3525" stroke-width="4"/>
  <line x1="0" y1="390" x2="900" y2="390" stroke="#3d2c1e" stroke-width="2"/>

  <!-- Hardwood Floor -->
  <rect x="0" y="420" width="900" height="180" fill="url(#l1-floor)"/>
  <!-- Floor Planks -->
  <line x1="0" y1="465" x2="900" y2="465" stroke="#45240c" stroke-width="2"/>
  <line x1="0" y1="510" x2="900" y2="510" stroke="#45240c" stroke-width="2"/>
  <line x1="0" y1="555" x2="900" y2="555" stroke="#45240c" stroke-width="2"/>

  <!-- Ornate Rug -->
  <ellipse cx="450" cy="500" rx="260" ry="85" fill="#881337"/>
  <ellipse cx="450" cy="500" rx="230" ry="70" fill="#9f1239" stroke="#fbbf24" stroke-width="3" stroke-dasharray="8 6"/>
  <ellipse cx="450" cy="500" rx="150" ry="40" fill="#be123c"/>

  <!-- Central Brick Fireplace -->
  <rect x="360" y="160" width="220" height="260" rx="6" fill="#854d0e" stroke="#542e13" stroke-width="4"/>
  <rect x="380" y="220" width="180" height="190" rx="20" fill="#1c1917"/>
  <!-- Mantel Shelf -->
  <rect x="340" y="150" width="260" height="24" rx="4" fill="#a16207" stroke="#713f12" stroke-width="3" filter="url(#shadow)"/>
  <!-- Hearth Fire -->
  <path d="M420 390 Q440 310 470 330 Q490 280 500 340 Q520 310 530 390 Z" fill="url(#l1-fire)" filter="url(#glow)"/>
  <circle cx="470" cy="360" r="15" fill="#fef08a" opacity="0.8"/>

  <!-- Painting Above Fireplace -->
  <rect x="410" y="40" width="120" height="85" rx="3" fill="#0284c7" stroke="#d97706" stroke-width="6" filter="url(#shadow)"/>
  <path d="M416 100 Q445 70 470 85 Q500 65 524 95 Z" fill="#15803d"/>
  <circle cx="495" cy="62" r="10" fill="#fef08a"/>

  <!-- Bookshelf on Left -->
  <rect x="50" y="80" width="190" height="400" rx="4" fill="#542e13" stroke="#3b1f09" stroke-width="4" filter="url(#shadow)"/>
  <!-- Shelves -->
  <rect x="50" y="160" width="190" height="14" fill="#713f12"/>
  <rect x="50" y="240" width="190" height="14" fill="#713f12"/>
  <rect x="50" y="320" width="190" height="14" fill="#713f12"/>
  <rect x="50" y="400" width="190" height="14" fill="#713f12"/>
  <!-- Decorative Books on Shelves -->
  <rect x="65" y="105" width="16" height="55" fill="#b91c1c" rx="2"/>
  <rect x="83" y="110" width="14" height="50" fill="#1d4ed8" rx="2"/>
  <rect x="99" y="100" width="18" height="60" fill="#047857" rx="2"/>
  <rect x="119" y="115" width="15" height="45" fill="#d97706" rx="2"/>
  <rect x="180" y="185" width="16" height="55" fill="#7c3aed" rx="2"/>
  <rect x="198" y="190" width="18" height="50" fill="#c026d3" rx="2"/>

  <!-- Cozy Armchair on Right -->
  <rect x="630" y="320" width="180" height="140" rx="25" fill="#15803d" stroke="#14532d" stroke-width="4" filter="url(#shadow)"/>
  <rect x="610" y="330" width="40" height="110" rx="15" fill="#166534"/>
  <rect x="770" y="330" width="40" height="110" rx="15" fill="#166534"/>
  <!-- Armchair Back -->
  <rect x="640" y="220" width="160" height="130" rx="30" fill="#16a34a"/>
  <!-- Cushion -->
  <ellipse cx="710" cy="380" rx="55" ry="25" fill="#bbf7d0"/>

  <!-- Round Coffee Table in Center -->
  <ellipse cx="450" cy="460" rx="110" ry="45" fill="#78350f" stroke="#451a03" stroke-width="4" filter="url(#shadow)"/>
  <!-- Table Legs -->
  <rect x="370" y="470" width="12" height="70" fill="#451a03" rx="3"/>
  <rect x="520" y="470" width="12" height="70" fill="#451a03" rx="3"/>
  <rect x="444" y="480" width="12" height="65" fill="#451a03" rx="3"/>

  <!-- Side Console Table on Far Right -->
  <rect x="800" y="340" width="90" height="120" rx="4" fill="#713f12" stroke="#451a03" stroke-width="3"/>
  <ellipse cx="845" cy="340" rx="35" ry="14" fill="#a16207"/>

  <!-- ==================== 8 TARGET OBJECTS ==================== -->
  <!-- 1. Brass Key (cx: 470, cy: 195) -->
  <g id="target-brass-key" transform="translate(470, 195)">
    <circle cx="0" cy="-14" r="9" fill="none" stroke="#f59e0b" stroke-width="4"/>
    <circle cx="0" cy="-14" r="4" fill="#fef3c7"/>
    <rect x="-3" y="-5" width="6" height="26" fill="#f59e0b" rx="2"/>
    <rect x="0" y="10" width="8" height="4" fill="#f59e0b" rx="1"/>
    <rect x="0" y="17" width="6" height="4" fill="#f59e0b" rx="1"/>
  </g>

  <!-- 2. Tea Cup (cx: 375, cy: 430) -->
  <g id="target-tea-cup" transform="translate(375, 430)">
    <ellipse cx="0" cy="12" rx="18" ry="6" fill="#cbd5e1" stroke="#94a3b8" stroke-width="2"/>
    <path d="M-14 0 C-14 12 14 12 14 0 Z" fill="#ffffff" stroke="#e2e8f0" stroke-width="2"/>
    <path d="M12 2 C18 2 18 10 12 10" fill="none" stroke="#e2e8f0" stroke-width="3"/>
    <ellipse cx="0" cy="0" rx="13" ry="4" fill="#d97706"/>
  </g>

  <!-- 3. Yarn Ball (cx: 780, cy: 490) -->
  <g id="target-yarn-ball" transform="translate(780, 490)">
    <circle cx="0" cy="0" r="18" fill="#e11d48"/>
    <path d="M-12 -6 Q0 12 12 -6" stroke="#fda4af" stroke-width="2.5" fill="none"/>
    <path d="M-14 4 Q0 -10 14 4" stroke="#fda4af" stroke-width="2.5" fill="none"/>
    <path d="M-6 -14 Q6 0 -6 14" stroke="#fda4af" stroke-width="2.5" fill="none"/>
    <path d="M12 12 Q20 20 28 16" stroke="#e11d48" stroke-width="2" fill="none"/>
  </g>

  <!-- 4. Magnifying Glass (cx: 140, cy: 260) -->
  <g id="target-magnifying-glass" transform="translate(140, 260) rotate(-35)">
    <circle cx="0" cy="-12" r="16" fill="#e0f2fe" opacity="0.8" stroke="#d97706" stroke-width="4"/>
    <circle cx="-4" cy="-16" r="4" fill="#ffffff" opacity="0.6"/>
    <rect x="-3" y="4" width="6" height="22" rx="2" fill="#78350f" stroke="#d97706" stroke-width="1.5"/>
  </g>

  <!-- 5. Pocket Watch (cx: 650, cy: 370) -->
  <g id="target-pocket-watch" transform="translate(650, 370)">
    <path d="M-4 -20 Q0 -26 4 -20" stroke="#f59e0b" stroke-width="3" fill="none"/>
    <circle cx="0" cy="0" r="16" fill="#fef3c7" stroke="#d97706" stroke-width="3"/>
    <circle cx="0" cy="0" r="13" fill="#ffffff"/>
    <line x1="0" y1="0" x2="0" y2="-7" stroke="#1e293b" stroke-width="2"/>
    <line x1="0" y1="0" x2="6" y2="4" stroke="#1e293b" stroke-width="2"/>
    <circle cx="0" cy="0" r="2" fill="#d97706"/>
  </g>

  <!-- 6. Spectacles (cx: 450, cy: 460) -->
  <g id="target-spectacles" transform="translate(450, 460)">
    <circle cx="-13" cy="0" r="10" fill="#e2e8f0" opacity="0.6" stroke="#0f172a" stroke-width="2.5"/>
    <circle cx="13" cy="0" r="10" fill="#e2e8f0" opacity="0.6" stroke="#0f172a" stroke-width="2.5"/>
    <path d="M-3 -2 Q0 -6 3 -2" stroke="#0f172a" stroke-width="2.5" fill="none"/>
    <line x1="-23" y1="-2" x2="-32" y2="6" stroke="#0f172a" stroke-width="2"/>
    <line x1="23" y1="-2" x2="32" y2="6" stroke="#0f172a" stroke-width="2"/>
  </g>

  <!-- 7. Green Apple (cx: 830, cy: 310) -->
  <g id="target-green-apple" transform="translate(830, 310)">
    <circle cx="0" cy="3" r="15" fill="#65a30d" stroke="#4d7c0f" stroke-width="2"/>
    <path d="M0 -12 Q4 -18 6 -17" stroke="#78350f" stroke-width="2.5" fill="none"/>
    <path d="M1 -14 Q10 -15 8 -10 Z" fill="#84cc16"/>
  </g>

  <!-- 8. Feather Quill (cx: 210, cy: 380) -->
  <g id="target-feather-quill" transform="translate(210, 380) rotate(25)">
    <!-- Inkpot -->
    <rect x="-8" y="6" width="16" height="14" rx="3" fill="#1e293b"/>
    <!-- Feather -->
    <path d="M0 6 C-12 -15 0 -45 0 -45 C0 -45 12 -15 0 6 Z" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
    <line x1="0" y1="6" x2="0" y2="-45" stroke="#94a3b8" stroke-width="1.5"/>
  </g>
  ${getSvgFooter()}`;
}

// LEVEL 2: Beautiful Garden
function generateLevel2Svg() {
  return `${getSvgHeader('Beautiful Garden')}
  <defs>
    <linearGradient id="l2-sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#bae6fd"/>
      <stop offset="100%" stop-color="#e0f2fe"/>
    </linearGradient>
    <linearGradient id="l2-grass" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#4ade80"/>
      <stop offset="100%" stop-color="#16a34a"/>
    </linearGradient>
  </defs>

  <!-- Sky -->
  <rect x="0" y="0" width="900" height="320" fill="url(#l2-sky)"/>
  <circle cx="820" cy="80" r="45" fill="#fde047" opacity="0.8"/>
  <path d="M150 90 Q170 70 200 80 Q230 60 260 85 Q280 110 250 115 Q170 120 150 90 Z" fill="#ffffff" opacity="0.85"/>

  <!-- Background Hedge & Trees -->
  <rect x="0" y="240" width="900" height="100" fill="#15803d"/>
  <circle cx="100" cy="220" r="60" fill="#166534"/>
  <circle cx="250" cy="210" r="75" fill="#14532d"/>
  <circle cx="780" cy="200" r="80" fill="#166534"/>
  <circle cx="880" cy="210" r="65" fill="#14532d"/>

  <!-- Lawn -->
  <rect x="0" y="320" width="900" height="280" fill="url(#l2-grass)"/>

  <!-- Trellis Arch in Center -->
  <path d="M430 320 V140 Q475 90 520 140 V320" fill="none" stroke="#f8fafc" stroke-width="12" filter="url(#shadow)"/>
  <line x1="430" y1="180" x2="520" y2="180" stroke="#cbd5e1" stroke-width="4"/>
  <line x1="430" y1="230" x2="520" y2="230" stroke="#cbd5e1" stroke-width="4"/>
  <line x1="430" y1="280" x2="520" y2="280" stroke="#cbd5e1" stroke-width="4"/>
  <!-- Climbing Roses -->
  <circle cx="435" cy="190" r="8" fill="#f43f5e"/>
  <circle cx="515" cy="170" r="9" fill="#f43f5e"/>
  <circle cx="470" cy="115" r="10" fill="#fb7185"/>

  <!-- Winding Cobblestone Path -->
  <path d="M460 320 Q500 420 540 600 L440 600 Q420 440 440 320 Z" fill="#cbd5e1"/>
  <!-- Stone Texture Lines -->
  <ellipse cx="480" cy="400" rx="14" ry="7" fill="#94a3b8"/>
  <ellipse cx="460" cy="470" rx="18" ry="9" fill="#94a3b8"/>
  <ellipse cx="505" cy="530" rx="20" ry="10" fill="#94a3b8"/>

  <!-- Flowerbeds Left and Right -->
  <ellipse cx="220" cy="400" rx="130" ry="40" fill="#713f12"/>
  <circle cx="160" cy="385" r="9" fill="#a855f7"/>
  <circle cx="190" cy="380" r="10" fill="#eab308"/>
  <circle cx="230" cy="390" r="9" fill="#ec4899"/>
  <circle cx="270" cy="385" r="11" fill="#ef4444"/>

  <!-- Stone Birdbath -->
  <ellipse cx="360" cy="340" rx="36" ry="12" fill="#94a3b8"/>
  <rect x="353" y="270" width="14" height="70" fill="#cbd5e1" stroke="#64748b" stroke-width="2"/>
  <ellipse cx="360" cy="270" rx="42" ry="15" fill="#cbd5e1" stroke="#64748b" stroke-width="2"/>
  <ellipse cx="360" cy="268" rx="35" ry="10" fill="#38bdf8"/>

  <!-- Wooden Garden Bench on Right -->
  <rect x="650" y="350" width="130" height="12" rx="3" fill="#b45309" stroke="#78350f" stroke-width="2"/>
  <rect x="650" y="320" width="130" height="24" rx="2" fill="#d97706" stroke="#78350f" stroke-width="2"/>
  <line x1="665" y1="362" x2="665" y2="400" stroke="#78350f" stroke-width="4"/>
  <line x1="765" y1="362" x2="765" y2="400" stroke="#78350f" stroke-width="4"/>

  <!-- Terracotta Clay Pots on Left -->
  <path d="M100 480 L115 480 L110 440 L105 440 Z" fill="#ea580c"/>
  <path d="M140 470 L160 470 L155 425 L145 425 Z" fill="#c2410c"/>

  <!-- ==================== 8 TARGET OBJECTS ==================== -->
  <!-- 1. Watering Can (cx: 180, cy: 460) -->
  <g id="target-watering-can" transform="translate(180, 460)">
    <rect x="-14" y="-8" width="28" height="26" rx="4" fill="#15803d" stroke="#166534" stroke-width="2"/>
    <path d="M-10 -8 C-10 -20 10 -20 10 -8" fill="none" stroke="#15803d" stroke-width="3"/>
    <line x1="14" y1="2" x2="28" y2="-10" stroke="#15803d" stroke-width="4"/>
    <ellipse cx="29" cy="-11" rx="4" ry="7" fill="#f59e0b"/>
  </g>

  <!-- 2. Garden Trowel (cx: 340, cy: 430) -->
  <g id="target-garden-trowel" transform="translate(340, 430) rotate(40)">
    <path d="M0 -15 C8 -10 8 5 0 10 C-8 5 -8 -10 0 -15 Z" fill="#94a3b8" stroke="#475569" stroke-width="1.5"/>
    <rect x="-2" y="10" width="4" height="15" rx="1.5" fill="#b45309"/>
  </g>

  <!-- 3. Butterfly (cx: 490, cy: 150) -->
  <g id="target-yellow-butterfly" transform="translate(490, 150)">
    <ellipse cx="-8" cy="-5" rx="9" ry="12" fill="#facc15" stroke="#ca8a04" stroke-width="1.5"/>
    <ellipse cx="8" cy="-5" rx="9" ry="12" fill="#facc15" stroke="#ca8a04" stroke-width="1.5"/>
    <ellipse cx="-6" cy="6" rx="6" ry="8" fill="#f59e0b"/>
    <ellipse cx="6" cy="6" rx="6" ry="8" fill="#f59e0b"/>
    <line x1="0" y1="-12" x2="0" y2="12" stroke="#451a03" stroke-width="2.5"/>
  </g>

  <!-- 4. Sun Hat (cx: 710, cy: 340) -->
  <g id="target-sun-hat" transform="translate(710, 340)">
    <ellipse cx="0" cy="5" rx="28" ry="10" fill="#fef08a" stroke="#ca8a04" stroke-width="2"/>
    <path d="M-14 4 C-14 -12 14 -12 14 4 Z" fill="#fde047" stroke="#ca8a04" stroke-width="2"/>
    <path d="M-14 2 H14" stroke="#1d4ed8" stroke-width="3"/>
  </g>

  <!-- 5. Birdhouse (cx: 820, cy: 130) -->
  <g id="target-birdhouse" transform="translate(820, 130)">
    <line x1="0" y1="-30" x2="0" y2="-15" stroke="#78350f" stroke-width="2"/>
    <polygon points="0,-15 -20,2 20,2" fill="#b91c1c" stroke="#7f1d1d" stroke-width="2"/>
    <rect x="-15" y="2" width="30" height="28" fill="#fef3c7" stroke="#78350f" stroke-width="2"/>
    <circle cx="0" cy="14" r="5" fill="#1e293b"/>
    <line x1="0" y1="21" x2="0" y2="25" stroke="#78350f" stroke-width="3"/>
  </g>

  <!-- 6. Pruning Shears (cx: 520, cy: 510) -->
  <g id="target-pruning-shears" transform="translate(520, 510) rotate(-20)">
    <circle cx="-10" cy="12" r="6" fill="none" stroke="#ef4444" stroke-width="3"/>
    <circle cx="10" cy="12" r="6" fill="none" stroke="#ef4444" stroke-width="3"/>
    <line x1="-7" y1="8" x2="8" y2="-12" stroke="#64748b" stroke-width="3.5"/>
    <line x1="7" y1="8" x2="-8" y2="-12" stroke="#64748b" stroke-width="3.5"/>
  </g>

  <!-- 7. Garden Snail (cx: 360, cy: 290) -->
  <g id="target-garden-snail" transform="translate(360, 290)">
    <circle cx="-3" cy="0" r="10" fill="#f59e0b" stroke="#b45309" stroke-width="2"/>
    <path d="M-3 0 A4 4 0 1 0 1 -2" fill="none" stroke="#b45309" stroke-width="1.8"/>
    <path d="M-12 8 C-2 8 8 8 12 4 C14 2 16 2 16 0" fill="none" stroke="#ca8a04" stroke-width="3.5" stroke-linecap="round"/>
    <circle cx="16" cy="-3" r="1.5" fill="#1e293b"/>
  </g>

  <!-- 8. Seed Packet (cx: 120, cy: 390) -->
  <g id="target-seed-packet" transform="translate(120, 390) rotate(15)">
    <rect x="-10" y="-14" width="20" height="28" rx="2" fill="#fef08a" stroke="#ca8a04" stroke-width="2"/>
    <circle cx="0" cy="-2" r="5" fill="#f97316"/>
    <line x1="-6" y1="7" x2="6" y2="7" stroke="#15803d" stroke-width="2"/>
  </g>
  ${getSvgFooter()}`;
}

// LEVEL 3: Busy Kitchen
function generateLevel3Svg() {
  return `${getSvgHeader('Busy Kitchen')}
  <defs>
    <linearGradient id="l3-wall" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#f1f5f9"/>
      <stop offset="100%" stop-color="#cbd5e1"/>
    </linearGradient>
    <linearGradient id="l3-counter" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#f8fafc"/>
      <stop offset="100%" stop-color="#e2e8f0"/>
    </linearGradient>
  </defs>

  <!-- Tiled Wall -->
  <rect x="0" y="0" width="900" height="420" fill="url(#l3-wall)"/>
  <!-- Tile Grid Lines -->
  <line x1="0" y1="70" x2="900" y2="70" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="0" y1="140" x2="900" y2="140" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="0" y1="210" x2="900" y2="210" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="0" y1="280" x2="900" y2="280" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="0" y1="350" x2="900" y2="350" stroke="#94a3b8" stroke-width="1.5"/>

  <!-- Upper Shelves -->
  <rect x="680" y="150" width="200" height="14" fill="#92400e" filter="url(#shadow)"/>
  <rect x="680" y="240" width="200" height="14" fill="#92400e" filter="url(#shadow)"/>
  <!-- Jars on Shelves -->
  <rect x="700" y="185" width="24" height="40" rx="3" fill="#f87171" opacity="0.8"/>
  <rect x="735" y="195" width="20" height="30" rx="3" fill="#fbbf24" opacity="0.8"/>
  <rect x="770" y="180" width="28" height="45" rx="3" fill="#34d399" opacity="0.8"/>

  <!-- Ceiling Pot Rack with Hanging Pans -->
  <rect x="340" y="70" width="220" height="8" fill="#475569"/>
  <circle cx="360" cy="140" r="22" fill="#78350f" stroke="#b45309" stroke-width="3"/>
  <circle cx="480" cy="135" r="26" fill="#334155" stroke="#64748b" stroke-width="3"/>

  <!-- Kitchen Countertop & Cabinets -->
  <rect x="0" y="420" width="900" height="180" fill="#475569"/>
  <rect x="0" y="405" width="900" height="24" rx="2" fill="url(#l3-counter)" stroke="#94a3b8" stroke-width="3" filter="url(#shadow)"/>
  <!-- Cabinet Doors -->
  <rect x="40" y="450" width="160" height="130" rx="4" fill="#1e293b"/>
  <rect x="230" y="450" width="160" height="130" rx="4" fill="#1e293b"/>
  <rect x="700" y="450" width="160" height="130" rx="4" fill="#1e293b"/>

  <!-- Gas Oven in Center -->
  <rect x="410" y="440" width="260" height="150" rx="6" fill="#0f172a" stroke="#64748b" stroke-width="4"/>
  <rect x="430" y="480" width="220" height="90" rx="4" fill="#334155"/>
  <rect x="450" y="460" width="180" height="8" rx="3" fill="#94a3b8"/>

  <!-- Utensil Crock -->
  <rect x="260" y="325" width="40" height="60" rx="4" fill="#e2e8f0" stroke="#cbd5e1" stroke-width="2"/>
  <!-- Cutting Board -->
  <rect x="580" y="405" width="120" height="18" rx="3" fill="#b45309"/>

  <!-- ==================== 8 TARGET OBJECTS ==================== -->
  <!-- 1. Wooden Spoon (cx: 280, cy: 310) -->
  <g id="target-wooden-spoon" transform="translate(280, 310) rotate(-15)">
    <ellipse cx="0" cy="-14" rx="9" ry="12" fill="#d97706" stroke="#92400e" stroke-width="2"/>
    <rect x="-2.5" y="-3" width="5" height="34" rx="2" fill="#d97706" stroke="#92400e" stroke-width="1.5"/>
  </g>

  <!-- 2. Rolling Pin (cx: 510, cy: 440) -->
  <g id="target-rolling-pin" transform="translate(510, 440)">
    <rect x="-24" y="-8" width="48" height="16" rx="4" fill="#fbbf24" stroke="#d97706" stroke-width="2"/>
    <rect x="-36" y="-3" width="12" height="6" rx="2" fill="#92400e"/>
    <rect x="24" y="-3" width="12" height="6" rx="2" fill="#92400e"/>
  </g>

  <!-- 3. Chef Hat (cx: 110, cy: 190) -->
  <g id="target-chef-hat" transform="translate(110, 190)">
    <path d="M-16 10 H16 V18 H-16 Z" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
    <path d="M-16 10 C-26 2 -20 -18 -8 -16 C-4 -26 12 -26 16 -16 C26 -16 26 2 16 10 Z" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
  </g>

  <!-- 4. Salt Shaker (cx: 750, cy: 230) -->
  <g id="target-salt-shaker" transform="translate(750, 230)">
    <path d="M-7 -4 L-9 16 L9 16 L7 -4 Z" fill="#f1f5f9" stroke="#94a3b8" stroke-width="2"/>
    <path d="M-6 -4 C-6 -10 6 -10 6 -4 Z" fill="#cbd5e1" stroke="#64748b" stroke-width="1.5"/>
  </g>

  <!-- 5. Wire Whisk (cx: 420, cy: 140) -->
  <g id="target-wire-whisk" transform="translate(420, 140)">
    <rect x="-2" y="-18" width="4" height="16" rx="1.5" fill="#1e293b"/>
    <path d="M-8 0 C-12 12 0 22 0 22 C0 22 12 12 8 0" fill="none" stroke="#94a3b8" stroke-width="2"/>
    <path d="M-4 0 C-6 10 0 18 0 18 C0 18 6 10 4 0" fill="none" stroke="#94a3b8" stroke-width="1.8"/>
  </g>

  <!-- 6. Fresh Lemon (cx: 620, cy: 410) -->
  <g id="target-fresh-lemon" transform="translate(620, 410)">
    <ellipse cx="0" cy="0" rx="15" ry="10" fill="#facc15" stroke="#eab308" stroke-width="2"/>
    <circle cx="-14" cy="0" r="2" fill="#ca8a04"/>
    <circle cx="14" cy="0" r="2" fill="#ca8a04"/>
  </g>

  <!-- 7. Oven Mitt (cx: 380, cy: 480) -->
  <g id="target-oven-mitt" transform="translate(380, 480) rotate(15)">
    <path d="M-10 18 V2 C-10 -10 10 -10 10 2 V4 H16 C18 4 18 10 14 12 L10 14 V18 Z" fill="#ef4444" stroke="#b91c1c" stroke-width="2"/>
    <path d="M-12 18 H12" stroke="#ffffff" stroke-width="4"/>
  </g>

  <!-- 8. Copper Teapot (cx: 830, cy: 140) -->
  <g id="target-copper-teapot" transform="translate(830, 140)">
    <ellipse cx="0" cy="4" rx="18" ry="14" fill="#ea580c" stroke="#9a3412" stroke-width="2"/>
    <path d="M-12 -6 C-12 -16 12 -16 12 -6" fill="none" stroke="#78350f" stroke-width="3"/>
    <path d="M14 0 Q22 -6 20 -14" fill="none" stroke="#ea580c" stroke-width="3.5" stroke-linecap="round"/>
  </g>
  ${getSvgFooter()}`;
}

// LEVEL 4: Pirate Treasure Island
function generateLevel4Svg() {
  return `${getSvgHeader('Pirate Treasure Island')}
  <defs>
    <linearGradient id="l4-sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0284c7"/>
      <stop offset="100%" stop-color="#38bdf8"/>
    </linearGradient>
    <linearGradient id="l4-sea" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0284c7"/>
      <stop offset="100%" stop-color="#0d9488"/>
    </linearGradient>
    <linearGradient id="l4-sand" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#fde047"/>
      <stop offset="100%" stop-color="#eab308"/>
    </linearGradient>
  </defs>

  <!-- Tropical Sky & Sun -->
  <rect x="0" y="0" width="900" height="260" fill="url(#l4-sky)"/>
  <circle cx="750" cy="70" r="40" fill="#fef08a" opacity="0.9"/>

  <!-- Turquoise Ocean -->
  <rect x="0" y="240" width="900" height="120" fill="url(#l4-sea)"/>
  <path d="M0 320 Q225 310 450 320 Q675 330 900 320 L900 360 L0 360 Z" fill="#2dd4bf" opacity="0.6"/>

  <!-- Golden Sand Beach -->
  <path d="M0 340 Q300 320 600 350 T900 360 L900 600 L0 600 Z" fill="url(#l4-sand)"/>

  <!-- Palm Tree on Right -->
  <path d="M820 450 Q800 280 770 170" fill="none" stroke="#78350f" stroke-width="22" stroke-linecap="round"/>
  <!-- Palm Fronds -->
  <path d="M770 170 Q690 140 640 180" fill="none" stroke="#15803d" stroke-width="12" stroke-linecap="round"/>
  <path d="M770 170 Q750 90 730 60" fill="none" stroke="#16a34a" stroke-width="12" stroke-linecap="round"/>
  <path d="M770 170 Q850 110 880 150" fill="none" stroke="#15803d" stroke-width="12" stroke-linecap="round"/>
  <path d="M770 170 Q820 220 850 240" fill="none" stroke="#16a34a" stroke-width="10" stroke-linecap="round"/>

  <!-- Pirate Shipwreck on Left -->
  <path d="M60 260 L240 290 L220 370 L40 350 Z" fill="#451a03" stroke="#291102" stroke-width="4"/>
  <line x1="160" y1="280" x2="160" y2="150" stroke="#78350f" stroke-width="8"/>
  <!-- Broken Mast & Ropes -->
  <line x1="160" y1="180" x2="220" y2="240" stroke="#a16207" stroke-width="3"/>

  <!-- Treasure Chest -->
  <rect x="530" y="450" width="90" height="55" rx="6" fill="#78350f" stroke="#451a03" stroke-width="4" filter="url(#shadow)"/>
  <rect x="525" y="440" width="100" height="18" rx="4" fill="#92400e" stroke="#f59e0b" stroke-width="3"/>
  <!-- Gold Coins inside chest -->
  <circle cx="560" cy="446" r="6" fill="#fbbf24"/>
  <circle cx="575" cy="444" r="7" fill="#facc15"/>
  <circle cx="590" cy="448" r="6" fill="#eab308"/>

  <!-- Driftwood Log -->
  <path d="M260 440 Q330 425 380 440 L375 455 Q325 440 255 455 Z" fill="#542e13"/>

  <!-- ==================== 8 TARGET OBJECTS ==================== -->
  <!-- 1. Brass Spyglass (cx: 310, cy: 430) -->
  <g id="target-brass-spyglass" transform="translate(310, 430) rotate(-15)">
    <rect x="-20" y="-5" width="16" height="10" fill="#f59e0b" stroke="#b45309" stroke-width="1.5"/>
    <rect x="-4" y="-4" width="14" height="8" fill="#fbbf24" stroke="#b45309" stroke-width="1.5"/>
    <rect x="10" y="-3" width="12" height="6" fill="#fef08a" stroke="#b45309" stroke-width="1.5"/>
  </g>

  <!-- 2. Skull Flag (cx: 180, cy: 180) -->
  <g id="target-skull-flag" transform="translate(180, 180)">
    <path d="M-15 -18 H18 L12 0 L18 18 H-15 Z" fill="#0f172a" stroke="#1e293b" stroke-width="2"/>
    <circle cx="-2" cy="-2" r="5" fill="#f8fafc"/>
    <circle cx="-4" cy="-3" r="1.5" fill="#0f172a"/>
    <circle cx="0" cy="-3" r="1.5" fill="#0f172a"/>
  </g>

  <!-- 3. Golden Chalice (cx: 580, cy: 470) -->
  <g id="target-golden-chalice" transform="translate(580, 470)">
    <path d="M-10 -14 H10 V-4 C10 4 -10 4 -10 -4 Z" fill="#fbbf24" stroke="#d97706" stroke-width="2"/>
    <circle cx="0" cy="-6" r="3" fill="#ef4444"/>
    <rect x="-2" y="2" width="4" height="12" fill="#d97706"/>
    <ellipse cx="0" cy="14" rx="8" ry="3" fill="#fbbf24"/>
  </g>

  <!-- 4. Pocket Compass (cx: 730, cy: 490) -->
  <g id="target-pocket-compass" transform="translate(730, 490)">
    <circle cx="0" cy="0" r="16" fill="#fef08a" stroke="#b45309" stroke-width="3"/>
    <polygon points="0,-12 4,0 0,2 -4,0" fill="#ef4444"/>
    <polygon points="0,12 4,0 0,-2 -4,0" fill="#3b82f6"/>
    <circle cx="0" cy="0" r="2" fill="#1e293b"/>
  </g>

  <!-- 5. Parrot (cx: 780, cy: 160) -->
  <g id="target-red-parrot" transform="translate(780, 160)">
    <path d="M-6 -10 C-6 -18 6 -18 8 -8 C10 0 4 14 -2 22 C-4 16 -6 4 -6 -10 Z" fill="#dc2626"/>
    <path d="M4 -6 C10 -6 14 4 10 14 Z" fill="#2563eb"/>
    <polygon points="8,-12 15,-8 8,-6" fill="#f59e0b"/>
    <circle cx="3" cy="-11" r="1.5" fill="#ffffff"/>
  </g>

  <!-- 6. Message Bottle (cx: 450, cy: 530) -->
  <g id="target-message-bottle" transform="translate(450, 530) rotate(35)">
    <rect x="-8" y="-12" width="16" height="26" rx="4" fill="#a5f3fc" opacity="0.8" stroke="#0891b2" stroke-width="2"/>
    <rect x="-4" y="-18" width="8" height="6" fill="#a5f3fc" stroke="#0891b2" stroke-width="2"/>
    <rect x="-3" y="-22" width="6" height="4" fill="#b45309"/>
    <!-- Scroll inside -->
    <rect x="-4" y="-6" width="8" height="14" rx="1" fill="#fde047"/>
  </g>

  <!-- 7. Pirate Cutlass (cx: 660, cy: 350) -->
  <g id="target-pirate-cutlass" transform="translate(660, 350) rotate(-45)">
    <path d="M0 -25 Q12 0 4 25 L-2 25 Q6 0 0 -25 Z" fill="#e2e8f0" stroke="#64748b" stroke-width="2"/>
    <circle cx="0" cy="28" r="7" fill="none" stroke="#d97706" stroke-width="3"/>
    <rect x="-2" y="25" width="4" height="12" fill="#78350f"/>
  </g>

  <!-- 8. Iron Anchor (cx: 120, cy: 360) -->
  <g id="target-iron-anchor" transform="translate(120, 360)">
    <circle cx="0" cy="-20" r="5" fill="none" stroke="#1e293b" stroke-width="3"/>
    <line x1="0" y1="-15" x2="0" y2="20" stroke="#1e293b" stroke-width="4"/>
    <line x1="-12" y1="-8" x2="12" y2="-8" stroke="#1e293b" stroke-width="3"/>
    <path d="M-18 12 C-18 24 18 24 18 12" fill="none" stroke="#1e293b" stroke-width="4"/>
  </g>
  ${getSvgFooter()}`;
}

// LEVEL 5: Magical Library
function generateLevel5Svg() {
  return `${getSvgHeader('Magical Library')}
  <defs>
    <linearGradient id="l5-bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#1e1b4b"/>
      <stop offset="100%" stop-color="#312e81"/>
    </linearGradient>
    <linearGradient id="l5-window" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#c084fc"/>
      <stop offset="100%" stop-color="#38bdf8"/>
    </linearGradient>
  </defs>

  <!-- Hall Background -->
  <rect x="0" y="0" width="900" height="600" fill="url(#l5-bg)"/>

  <!-- Gothic Stained Glass Window -->
  <path d="M400 300 V120 Q450 40 500 120 V300 Z" fill="url(#l5-window)" opacity="0.6" stroke="#fbbf24" stroke-width="4"/>
  <line x1="450" y1="50" x2="450" y2="300" stroke="#1e1b4b" stroke-width="3"/>
  <line x1="400" y1="180" x2="500" y2="180" stroke="#1e1b4b" stroke-width="3"/>

  <!-- Towering Bookshelves Left and Right -->
  <rect x="30" y="40" width="220" height="520" fill="#451a03" stroke="#291102" stroke-width="5"/>
  <rect x="650" y="40" width="220" height="520" fill="#451a03" stroke="#291102" stroke-width="5"/>
  <!-- Shelves -->
  <line x1="30" y1="140" x2="250" y2="140" stroke="#78350f" stroke-width="10"/>
  <line x1="30" y1="240" x2="250" y2="240" stroke="#78350f" stroke-width="10"/>
  <line x1="30" y1="340" x2="250" y2="340" stroke="#78350f" stroke-width="10"/>
  <line x1="30" y1="440" x2="250" y2="440" stroke="#78350f" stroke-width="10"/>
  <line x1="650" y1="140" x2="870" y2="140" stroke="#78350f" stroke-width="10"/>
  <line x1="650" y1="240" x2="870" y2="240" stroke="#78350f" stroke-width="10"/>
  <line x1="650" y1="340" x2="870" y2="340" stroke="#78350f" stroke-width="10"/>
  <line x1="650" y1="440" x2="870" y2="440" stroke="#78350f" stroke-width="10"/>

  <!-- Central Study Desk -->
  <rect x="330" y="380" width="260" height="160" rx="6" fill="#78350f" stroke="#451a03" stroke-width="4" filter="url(#shadow)"/>
  <rect x="340" y="410" width="240" height="20" rx="3" fill="#92400e"/>

  <!-- Rolling Ladder on Left -->
  <line x1="230" y1="60" x2="260" y2="520" stroke="#d97706" stroke-width="4"/>
  <line x1="250" y1="60" x2="280" y2="520" stroke="#d97706" stroke-width="4"/>
  <line x1="235" y1="180" x2="255" y2="180" stroke="#d97706" stroke-width="3"/>
  <line x1="241" y1="260" x2="261" y2="260" stroke="#d97706" stroke-width="3"/>
  <line x1="247" y1="340" x2="267" y2="340" stroke="#d97706" stroke-width="3"/>
  <line x1="253" y1="420" x2="273" y2="420" stroke="#d97706" stroke-width="3"/>

  <!-- ==================== 8 TARGET OBJECTS ==================== -->
  <!-- 1. Potion Vial (cx: 240, cy: 330) -->
  <g id="target-potion-vial" transform="translate(240, 330)">
    <rect x="-4" y="-16" width="8" height="6" rx="1" fill="#cbd5e1"/>
    <path d="M-4 -10 L-8 6 C-8 14 8 14 8 6 L4 -10 Z" fill="#38bdf8" stroke="#0284c7" stroke-width="2" filter="url(#glow)"/>
    <circle cx="0" cy="2" r="3" fill="#ffffff" opacity="0.7"/>
  </g>

  <!-- 2. Magic Wand (cx: 690, cy: 220) -->
  <g id="target-magic-wand" transform="translate(690, 220) rotate(-30)">
    <line x1="0" y1="-25" x2="0" y2="25" stroke="#78350f" stroke-width="4" stroke-linecap="round"/>
    <polygon points="0,-25 -6,-28 0,-34 6,-28" fill="#c084fc" filter="url(#glow)"/>
  </g>

  <!-- 3. Wise Owl (cx: 130, cy: 150) -->
  <g id="target-wise-owl" transform="translate(130, 150)">
    <ellipse cx="0" cy="4" rx="14" ry="18" fill="#e2e8f0" stroke="#94a3b8" stroke-width="2"/>
    <circle cx="-5" cy="-2" r="4.5" fill="#facc15" stroke="#78350f" stroke-width="1.5"/>
    <circle cx="5" cy="-2" r="4.5" fill="#facc15" stroke="#78350f" stroke-width="1.5"/>
    <circle cx="-5" cy="-2" r="2" fill="#0f172a"/>
    <circle cx="5" cy="-2" r="2" fill="#0f172a"/>
    <polygon points="-2,3 2,3 0,7" fill="#f97316"/>
  </g>

  <!-- 4. Antique Hourglass (cx: 520, cy: 430) -->
  <g id="target-antique-hourglass" transform="translate(520, 430)">
    <rect x="-14" y="-18" width="28" height="4" fill="#d97706"/>
    <rect x="-14" y="14" width="28" height="4" fill="#d97706"/>
    <path d="M-10 -14 L0 0 L-10 14 H10 L0 0 L10 -14 Z" fill="#fef08a" stroke="#b45309" stroke-width="2"/>
  </g>

  <!-- 5. Magic Crystal (cx: 370, cy: 260) -->
  <g id="target-magic-crystal" transform="translate(370, 260)">
    <polygon points="0,-20 12,-6 8,16 -8,16 -12,-6" fill="#a855f7" stroke="#7e22ce" stroke-width="2" filter="url(#glow)"/>
    <polygon points="0,-20 5,-6 3,16 -3,16 -5,-6" fill="#c084fc"/>
  </g>

  <!-- 6. Ribbon Bookmark (cx: 590, cy: 460) -->
  <g id="target-ribbon-bookmark" transform="translate(590, 460)">
    <path d="M-8 -15 H8 V18 L0 10 L-8 18 Z" fill="#ef4444" stroke="#b91c1c" stroke-width="1.5"/>
  </g>

  <!-- 7. Brass Lamp (cx: 810, cy: 280) -->
  <g id="target-brass-lamp" transform="translate(810, 280)">
    <ellipse cx="0" cy="12" rx="14" ry="6" fill="#f59e0b"/>
    <path d="M-10 12 L-6 -8 H6 L10 12 Z" fill="#fef08a" opacity="0.8" stroke="#d97706" stroke-width="2"/>
    <circle cx="0" cy="2" r="5" fill="#f59e0b" filter="url(#glow)"/>
  </g>

  <!-- 8. Ancient Scroll (cx: 430, cy: 470) -->
  <g id="target-wax-sealed-scroll" transform="translate(430, 470) rotate(-10)">
    <rect x="-18" y="-7" width="36" height="14" rx="3" fill="#fde047" stroke="#ca8a04" stroke-width="2"/>
    <circle cx="0" cy="0" r="5" fill="#dc2626"/>
  </g>
  ${getSvgFooter()}`;
}

// LEVEL 6: Camping Adventure
function generateLevel6Svg() {
  return `${getSvgHeader('Camping Adventure')}
  <defs>
    <linearGradient id="l6-sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#1e1b4b"/>
      <stop offset="60%" stop-color="#4338ca"/>
      <stop offset="100%" stop-color="#f97316"/>
    </linearGradient>
    <linearGradient id="l6-ground" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#14532d"/>
      <stop offset="100%" stop-color="#052e16"/>
    </linearGradient>
  </defs>

  <!-- Twilight Sky & Stars -->
  <rect x="0" y="0" width="900" height="340" fill="url(#l6-sky)"/>
  <circle cx="200" cy="60" r="2" fill="#ffffff"/>
  <circle cx="340" cy="40" r="1.5" fill="#ffffff"/>
  <circle cx="560" cy="70" r="2" fill="#ffffff"/>
  <circle cx="720" cy="50" r="2.5" fill="#ffffff"/>

  <!-- Mountain Silhouettes -->
  <polygon points="0,300 140,160 280,300" fill="#312e81"/>
  <polygon points="220,300 400,130 580,300" fill="#1e1b4b"/>
  <polygon points="500,300 680,150 860,300" fill="#312e81"/>

  <!-- Ground -->
  <rect x="0" y="300" width="900" height="300" fill="url(#l6-ground)"/>

  <!-- Pine Trees Background -->
  <polygon points="80,180 50,260 110,260" fill="#064e3b"/>
  <polygon points="80,220 40,310 120,310" fill="#064e3b"/>
  <polygon points="820,180 790,260 850,260" fill="#064e3b"/>
  <polygon points="820,220 780,310 860,310" fill="#064e3b"/>

  <!-- Green Canvas A-Frame Tent -->
  <polygon points="280,240 180,450 380,450" fill="#15803d" stroke="#166534" stroke-width="4" filter="url(#shadow)"/>
  <polygon points="280,240 380,450 440,430 340,240" fill="#16a34a" stroke="#166534" stroke-width="4"/>
  <!-- Tent Opening -->
  <polygon points="280,280 230,450 330,450" fill="#0f172a"/>

  <!-- Campfire with Stones & Flames -->
  <ellipse cx="530" cy="470" rx="45" ry="16" fill="#44403c"/>
  <circle cx="495" cy="468" r="8" fill="#78716c"/>
  <circle cx="515" cy="476" r="9" fill="#78716c"/>
  <circle cx="540" cy="477" r="9" fill="#78716c"/>
  <circle cx="560" cy="468" r="8" fill="#78716c"/>
  <!-- Flames -->
  <path d="M510 465 Q530 380 540 400 Q555 370 560 465 Z" fill="#f97316" filter="url(#glow)"/>
  <path d="M520 465 Q532 410 538 420 Q545 400 550 465 Z" fill="#fef08a"/>

  <!-- Log Bench -->
  <rect x="620" y="460" width="100" height="25" rx="10" fill="#78350f" stroke="#451a03" stroke-width="3"/>
  <!-- Tree Stump Table -->
  <ellipse cx="810" cy="445" rx="28" ry="12" fill="#b45309" stroke="#78350f" stroke-width="3"/>
  <rect x="782" y="445" width="56" height="40" fill="#78350f"/>

  <!-- ==================== 8 TARGET OBJECTS ==================== -->
  <!-- 1. Flashlight (cx: 660, cy: 470) -->
  <g id="target-torch-flashlight" transform="translate(660, 470)">
    <rect x="-16" y="-6" width="24" height="12" rx="2" fill="#eab308" stroke="#ca8a04" stroke-width="1.5"/>
    <path d="M8 -9 L16 -13 V13 L8 9 Z" fill="#ca8a04"/>
  </g>

  <!-- 2. Water Canteen (cx: 320, cy: 290) -->
  <g id="target-water-canteen" transform="translate(320, 290)">
    <circle cx="0" cy="4" r="14" fill="#0284c7" stroke="#0369a1" stroke-width="2"/>
    <rect x="-4" y="-14" width="8" height="6" fill="#cbd5e1" stroke="#64748b" stroke-width="1.5"/>
  </g>

  <!-- 3. Toasting Stick (cx: 530, cy: 440) -->
  <g id="target-marshmallow-stick" transform="translate(530, 440) rotate(-35)">
    <line x1="-25" y1="0" x2="25" y2="0" stroke="#b45309" stroke-width="2.5" stroke-linecap="round"/>
    <rect x="12" y="-6" width="10" height="12" rx="2" fill="#fef08a" stroke="#d97706" stroke-width="1.5"/>
  </g>

  <!-- 4. Trail Compass (cx: 810, cy: 430) -->
  <g id="target-pocket-compass" transform="translate(810, 430)">
    <circle cx="0" cy="0" r="14" fill="#f8fafc" stroke="#334155" stroke-width="3"/>
    <polygon points="0,-10 3,0 0,2 -3,0" fill="#ef4444"/>
    <polygon points="0,10 3,0 0,-2 -3,0" fill="#64748b"/>
  </g>

  <!-- 5. Pinecone (cx: 210, cy: 480) -->
  <g id="target-pine-cone" transform="translate(210, 480)">
    <ellipse cx="0" cy="0" rx="10" ry="14" fill="#78350f"/>
    <circle cx="-4" cy="-5" r="3" fill="#a16207"/>
    <circle cx="4" cy="-5" r="3" fill="#a16207"/>
    <circle cx="0" cy="2" r="3.5" fill="#a16207"/>
    <circle cx="-3" cy="8" r="3" fill="#a16207"/>
  </g>

  <!-- 6. Camp Guitar (cx: 160, cy: 340) -->
  <g id="target-acoustic-guitar" transform="translate(160, 340) rotate(20)">
    <ellipse cx="0" cy="18" rx="16" ry="20" fill="#d97706" stroke="#92400e" stroke-width="2"/>
    <circle cx="0" cy="14" r="6" fill="#1e293b"/>
    <rect x="-3" y="-35" width="6" height="35" fill="#92400e"/>
  </g>

  <!-- 7. Camp Lantern (cx: 450, cy: 180) -->
  <g id="target-camp-lantern" transform="translate(450, 180)">
    <path d="M-6 -18 C-6 -26 6 -26 6 -18" fill="none" stroke="#64748b" stroke-width="2.5"/>
    <rect x="-10" y="-12" width="20" height="24" rx="3" fill="#fef08a" stroke="#15803d" stroke-width="3" filter="url(#glow)"/>
    <circle cx="0" cy="0" r="5" fill="#f59e0b"/>
  </g>

  <!-- 8. Hiking Boots (cx: 370, cy: 470) -->
  <g id="target-hiking-boots" transform="translate(370, 470)">
    <path d="M-14 10 H12 V2 C12 -6 0 -6 -2 0 L-14 2 Z" fill="#78350f" stroke="#451a03" stroke-width="2"/>
    <rect x="-16" y="10" width="30" height="4" fill="#0f172a" rx="1"/>
  </g>
  ${getSvgFooter()}`;
}

// LEVEL 7: Old Town Market
function generateLevel7Svg() {
  return `${getSvgHeader('Old Town Market')}
  <defs>
    <linearGradient id="l7-sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#38bdf8"/>
      <stop offset="100%" stop-color="#bae6fd"/>
    </linearGradient>
  </defs>

  <!-- Sky -->
  <rect x="0" y="0" width="900" height="260" fill="url(#l7-sky)"/>

  <!-- Medieval Gable Houses in Background -->
  <polygon points="50,220 120,100 190,220" fill="#b91c1c"/>
  <rect x="50" y="220" width="140" height="120" fill="#fef3c7" stroke="#78350f" stroke-width="4"/>
  <polygon points="210,220 300,80 390,220" fill="#0369a1"/>
  <rect x="210" y="220" width="180" height="120" fill="#f8fafc" stroke="#78350f" stroke-width="4"/>

  <!-- Historic Clock Tower in Background -->
  <rect x="750" y="80" width="100" height="220" fill="#cbd5e1" stroke="#64748b" stroke-width="4"/>
  <polygon points="730,80 800,10 870,80" fill="#b91c1c"/>
  <circle cx="800" cy="130" r="22" fill="#ffffff" stroke="#334155" stroke-width="3"/>
  <line x1="800" y1="130" x2="800" y2="115" stroke="#334155" stroke-width="2.5"/>
  <line x1="800" y1="130" x2="810" y2="130" stroke="#334155" stroke-width="2.5"/>

  <!-- Cobblestone Ground -->
  <rect x="0" y="320" width="900" height="280" fill="#94a3b8"/>

  <!-- Market Stall 1 (Left) -->
  <rect x="60" y="380" width="180" height="90" fill="#78350f" stroke="#451a03" stroke-width="3"/>
  <path d="M40 320 L240 320 L220 380 L60 380 Z" fill="#ef4444"/>
  <path d="M80 320 L120 320 L100 380 L60 380 Z" fill="#ffffff"/>
  <path d="M160 320 L200 320 L180 380 L140 380 Z" fill="#ffffff"/>

  <!-- Market Stall 2 (Center) -->
  <rect x="360" y="360" width="220" height="100" fill="#78350f" stroke="#451a03" stroke-width="3"/>
  <path d="M340 290 L600 290 L580 360 L360 360 Z" fill="#2563eb"/>
  <path d="M400 290 L450 290 L430 360 L380 360 Z" fill="#ffffff"/>
  <path d="M510 290 L560 290 L540 360 L490 360 Z" fill="#ffffff"/>

  <!-- Market Stall 3 (Right) -->
  <rect x="670" y="360" width="180" height="100" fill="#78350f" stroke="#451a03" stroke-width="3"/>
  <path d="M650 290 L870 290 L850 360 L670 360 Z" fill="#16a34a"/>
  <path d="M700 290 L750 290 L730 360 L680 360 Z" fill="#ffffff"/>
  <path d="M800 290 L850 290 L830 360 L780 360 Z" fill="#ffffff"/>

  <!-- Barrels -->
  <ellipse cx="390" cy="470" rx="24" ry="10" fill="#92400e"/>
  <rect x="366" y="470" width="48" height="50" rx="4" fill="#78350f" stroke="#451a03" stroke-width="2"/>

  <!-- ==================== 8 TARGET OBJECTS ==================== -->
  <!-- 1. Woven Basket (cx: 150, cy: 470) -->
  <g id="target-market-basket" transform="translate(150, 470)">
    <path d="M-18 -6 H18 L14 18 H-14 Z" fill="#d97706" stroke="#92400e" stroke-width="2"/>
    <path d="M-12 -6 C-12 -20 12 -20 12 -6" fill="none" stroke="#92400e" stroke-width="2.5"/>
  </g>

  <!-- 2. Baguette (cx: 310, cy: 370) -->
  <g id="target-crusty-baguette" transform="translate(310, 370) rotate(-35)">
    <rect x="-8" y="-25" width="16" height="50" rx="8" fill="#d97706" stroke="#92400e" stroke-width="2"/>
    <line x1="-4" y1="-12" x2="4" y2="-10" stroke="#78350f" stroke-width="2"/>
    <line x1="-4" y1="0" x2="4" y2="2" stroke="#78350f" stroke-width="2"/>
    <line x1="-4" y1="12" x2="4" y2="14" stroke="#78350f" stroke-width="2"/>
  </g>

  <!-- 3. Merchant Scale (cx: 480, cy: 330) -->
  <g id="target-balance-scale" transform="translate(480, 330)">
    <line x1="0" y1="-20" x2="0" y2="15" stroke="#f59e0b" stroke-width="3"/>
    <line x1="-20" y1="-16" x2="20" y2="-16" stroke="#f59e0b" stroke-width="2.5"/>
    <path d="M-24 -4 H-16 L-20 -16 Z" fill="#fbbf24"/>
    <path d="M16 -4 H24 L20 -16 Z" fill="#fbbf24"/>
  </g>

  <!-- 4. Brass Handbell (cx: 820, cy: 240) -->
  <g id="target-brass-bell" transform="translate(820, 240)">
    <path d="M-10 12 C-10 0 10 0 10 12 Z" fill="#facc15" stroke="#ca8a04" stroke-width="2"/>
    <rect x="-2" y="-12" width="4" height="12" rx="1.5" fill="#78350f"/>
    <circle cx="0" cy="14" r="2.5" fill="#ca8a04"/>
  </g>

  <!-- 5. Pocket Watch (cx: 670, cy: 290) -->
  <g id="target-pocket-watch" transform="translate(670, 290)">
    <circle cx="0" cy="0" r="14" fill="#fef08a" stroke="#ca8a04" stroke-width="2.5"/>
    <circle cx="0" cy="0" r="11" fill="#ffffff"/>
    <line x1="0" y1="0" x2="0" y2="-6" stroke="#1e293b" stroke-width="1.8"/>
    <line x1="0" y1="0" x2="5" y2="3" stroke="#1e293b" stroke-width="1.8"/>
  </g>

  <!-- 6. Cheese Wheel (cx: 560, cy: 390) -->
  <g id="target-cheese-wheel" transform="translate(560, 390)">
    <ellipse cx="0" cy="-4" rx="18" ry="8" fill="#fef08a" stroke="#ca8a04" stroke-width="2"/>
    <path d="M-18 -4 V8 C-18 14 18 14 18 8 V-4" fill="#facc15" stroke="#ca8a04" stroke-width="2"/>
  </g>

  <!-- 7. Grape Cluster (cx: 390, cy: 460) -->
  <g id="target-purple-grapes" transform="translate(390, 460)">
    <circle cx="-6" cy="-8" r="6" fill="#7c3aed"/>
    <circle cx="6" cy="-8" r="6" fill="#7c3aed"/>
    <circle cx="0" cy="-2" r="6" fill="#6d28d9"/>
    <circle cx="-5" cy="5" r="5.5" fill="#5b21b6"/>
    <circle cx="5" cy="5" r="5.5" fill="#5b21b6"/>
    <circle cx="0" cy="11" r="5" fill="#4c1d95"/>
    <path d="M0 -14 Q4 -20 8 -18" stroke="#15803d" stroke-width="2.5" fill="none"/>
  </g>

  <!-- 8. Silk Fan (cx: 730, cy: 420) -->
  <g id="target-folding-fan" transform="translate(730, 420)">
    <path d="M0 12 L-22 -8 C-8 -20 8 -20 22 -8 Z" fill="#f43f5e" stroke="#be123c" stroke-width="2"/>
    <line x1="0" y1="12" x2="-11" y2="-12" stroke="#fbbf24" stroke-width="1.5"/>
    <line x1="0" y1="12" x2="0" y2="-16" stroke="#fbbf24" stroke-width="1.5"/>
    <line x1="0" y1="12" x2="11" y2="-12" stroke="#fbbf24" stroke-width="1.5"/>
  </g>
  ${getSvgFooter()}`;
}

// LEVEL 8: Underwater World
function generateLevel8Svg() {
  return `${getSvgHeader('Underwater World')}
  <defs>
    <linearGradient id="l8-water" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#38bdf8"/>
      <stop offset="40%" stop-color="#0284c7"/>
      <stop offset="100%" stop-color="#0f766e"/>
    </linearGradient>
    <linearGradient id="l8-sand" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#fde047"/>
      <stop offset="100%" stop-color="#d97706"/>
    </linearGradient>
  </defs>

  <!-- Ocean Water -->
  <rect x="0" y="0" width="900" height="600" fill="url(#l8-water)"/>

  <!-- Light Caustics from Sun -->
  <polygon points="150,0 220,0 350,600 240,600" fill="#ffffff" opacity="0.12"/>
  <polygon points="450,0 520,0 680,600 580,600" fill="#ffffff" opacity="0.12"/>

  <!-- Sea Floor -->
  <path d="M0 450 Q200 420 450 460 T900 450 L900 600 L0 600 Z" fill="url(#l8-sand)"/>

  <!-- Corals & Seaweed -->
  <!-- Purple Staghorn Coral -->
  <path d="M700 450 Q690 370 720 340 M720 380 Q760 350 780 320" stroke="#a855f7" stroke-width="12" stroke-linecap="round" fill="none"/>
  <!-- Orange Sea Fan -->
  <path d="M120 460 Q100 360 80 330 M110 400 Q150 360 170 330" stroke="#f97316" stroke-width="10" stroke-linecap="round" fill="none"/>
  <!-- Green Kelp -->
  <path d="M220 470 Q200 320 230 200" stroke="#15803d" stroke-width="14" stroke-linecap="round" fill="none"/>
  <path d="M850 480 Q870 340 840 220" stroke="#15803d" stroke-width="14" stroke-linecap="round" fill="none"/>

  <!-- Tropical Fish -->
  <polygon points="320,180 345,170 345,190" fill="#facc15"/>
  <polygon points="630,260 655,250 655,270" fill="#f43f5e"/>

  <!-- ==================== 8 TARGET OBJECTS ==================== -->
  <!-- 1. Pearl Oyster (cx: 380, cy: 520) -->
  <g id="target-pearl-oyster" transform="translate(380, 520)">
    <ellipse cx="0" cy="4" rx="20" ry="12" fill="#fed7aa" stroke="#ea580c" stroke-width="2"/>
    <ellipse cx="0" cy="-2" rx="18" ry="10" fill="#fff7ed" stroke="#ea580c" stroke-width="2"/>
    <circle cx="0" cy="2" r="6" fill="#ffffff" filter="url(#glow)"/>
  </g>

  <!-- 2. Starfish (cx: 730, cy: 410) -->
  <g id="target-orange-starfish" transform="translate(730, 410)">
    <polygon points="0,-16 4,-5 16,-4 7,4 10,16 0,8 -10,16 -7,4 -16,-4 -4,-5" fill="#f97316" stroke="#c2410c" stroke-width="2"/>
  </g>

  <!-- 3. Seahorse (cx: 170, cy: 320) -->
  <g id="target-yellow-seahorse" transform="translate(170, 320)">
    <path d="M0 -15 C6 -15 10 -10 6 -4 C12 4 4 12 0 16 C-4 20 -2 24 -6 24" fill="none" stroke="#facc15" stroke-width="4.5" stroke-linecap="round"/>
    <circle cx="2" cy="-12" r="1.5" fill="#1e293b"/>
  </g>

  <!-- 4. Sunken Amphora (cx: 270, cy: 430) -->
  <g id="target-sunken-amphora" transform="translate(270, 430) rotate(25)">
    <path d="M-10 -16 H10 V-10 C16 -4 16 12 0 18 C-16 12 -16 -4 -10 -10 Z" fill="#c2410c" stroke="#7c2d12" stroke-width="2"/>
    <path d="M-10 -8 C-16 -8 -16 2 -10 2" fill="none" stroke="#7c2d12" stroke-width="2"/>
    <path d="M10 -8 C16 -8 16 2 10 2" fill="none" stroke="#7c2d12" stroke-width="2"/>
  </g>

  <!-- 5. Sea Turtle (cx: 510, cy: 170) -->
  <g id="target-sea-turtle" transform="translate(510, 170) rotate(-15)">
    <ellipse cx="0" cy="0" rx="16" ry="20" fill="#15803d" stroke="#166534" stroke-width="2"/>
    <circle cx="0" cy="-24" r="6" fill="#16a34a"/>
    <path d="M-14 -10 Q-28 -20 -24 -6" stroke="#16a34a" stroke-width="4" fill="none" stroke-linecap="round"/>
    <path d="M14 -10 Q28 -20 24 -6" stroke="#16a34a" stroke-width="4" fill="none" stroke-linecap="round"/>
  </g>

  <!-- 6. Diving Helmet (cx: 820, cy: 480) -->
  <g id="target-diving-helmet" transform="translate(820, 480)">
    <circle cx="0" cy="-4" r="18" fill="#d97706" stroke="#92400e" stroke-width="3"/>
    <circle cx="0" cy="-4" r="8" fill="#38bdf8" stroke="#f59e0b" stroke-width="3"/>
    <rect x="-16" y="12" width="32" height="8" rx="3" fill="#78350f"/>
  </g>

  <!-- 7. Scallop Shell (cx: 610, cy: 530) -->
  <g id="target-pink-shell" transform="translate(610, 530)">
    <path d="M0 10 C-14 10 -18 -8 0 -12 C18 -8 14 10 0 10 Z" fill="#f472b6" stroke="#db2777" stroke-width="2"/>
    <line x1="0" y1="10" x2="-8" y2="-6" stroke="#db2777" stroke-width="1.5"/>
    <line x1="0" y1="10" x2="0" y2="-10" stroke="#db2777" stroke-width="1.5"/>
    <line x1="0" y1="10" x2="8" y2="-6" stroke="#db2777" stroke-width="1.5"/>
  </g>

  <!-- 8. Sunken Coin (cx: 460, cy: 490) -->
  <g id="target-gold-coin" transform="translate(460, 490)">
    <circle cx="0" cy="0" r="12" fill="#fbbf24" stroke="#d97706" stroke-width="2" filter="url(#glow)"/>
    <text x="0" y="4" font-size="11" text-anchor="middle" fill="#92400e" font-weight="bold">$</text>
  </g>
  ${getSvgFooter()}`;
}

// LEVEL 9: Enchanted Forest
function generateLevel9Svg() {
  return `${getSvgHeader('Enchanted Forest')}
  <defs>
    <linearGradient id="l9-bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#022c22"/>
      <stop offset="60%" stop-color="#064e3b"/>
      <stop offset="100%" stop-color="#065f46"/>
    </linearGradient>
  </defs>

  <!-- Twilight Forest Background -->
  <rect x="0" y="0" width="900" height="600" fill="url(#l9-bg)"/>

  <!-- Ancient Giant Oak Trunk on Left -->
  <path d="M120 600 C150 400 120 200 60 0 H260 C220 200 300 400 350 600 Z" fill="#1c1917" stroke="#0c0a09" stroke-width="4"/>
  <!-- Gnarled Roots -->
  <path d="M280 480 Q380 460 480 540" fill="none" stroke="#292524" stroke-width="24" stroke-linecap="round"/>
  <path d="M180 500 Q140 550 80 580" fill="none" stroke="#292524" stroke-width="20" stroke-linecap="round"/>

  <!-- Magic Stream in Center -->
  <path d="M500 600 Q540 460 620 400 T740 320 L790 320 Q680 420 600 600 Z" fill="#06b6d4" opacity="0.7" filter="url(#glow)"/>

  <!-- Stone Ruin Pillars on Right -->
  <rect x="760" y="160" width="70" height="280" fill="#334155" stroke="#1e293b" stroke-width="4"/>
  <rect x="740" y="140" width="110" height="24" fill="#475569"/>

  <!-- Glowing Fireflies -->
  <circle cx="320" cy="120" r="4" fill="#a7f3d0" filter="url(#glow)"/>
  <circle cx="580" cy="180" r="3.5" fill="#fef08a" filter="url(#glow)"/>
  <circle cx="480" cy="280" r="4" fill="#67e8f9" filter="url(#glow)"/>

  <!-- ==================== 8 TARGET OBJECTS ==================== -->
  <!-- 1. Magic Mushroom (cx: 280, cy: 250) -->
  <g id="target-glowing-mushroom" transform="translate(280, 250)">
    <path d="M0 6 V20" stroke="#e2e8f0" stroke-width="5" stroke-linecap="round"/>
    <path d="M-16 6 C-16 -12 16 -12 16 6 Z" fill="#06b6d4" stroke="#0891b2" stroke-width="2" filter="url(#glow)"/>
    <circle cx="-6" cy="-2" r="2.5" fill="#ffffff"/>
    <circle cx="6" cy="-2" r="2" fill="#ffffff"/>
  </g>

  <!-- 2. Golden Acorn (cx: 720, cy: 460) -->
  <g id="target-golden-acorn" transform="translate(720, 460)">
    <ellipse cx="0" cy="4" rx="10" ry="14" fill="#facc15" stroke="#ca8a04" stroke-width="2" filter="url(#glow)"/>
    <path d="M-11 -2 H11 V-8 C11 -12 -11 -12 -11 -8 Z" fill="#78350f"/>
    <line x1="0" y1="-12" x2="0" y2="-16" stroke="#78350f" stroke-width="2.5"/>
  </g>

  <!-- 3. Fairy Wings (cx: 180, cy: 190) -->
  <g id="target-fairy-wings" transform="translate(180, 190)">
    <ellipse cx="-8" cy="-6" rx="12" ry="18" fill="#e0e7ff" opacity="0.8" stroke="#818cf8" stroke-width="1.8" filter="url(#glow)"/>
    <ellipse cx="8" cy="-6" rx="12" ry="18" fill="#e0e7ff" opacity="0.8" stroke="#818cf8" stroke-width="1.8" filter="url(#glow)"/>
  </g>

  <!-- 4. Wooden Flute (cx: 410, cy: 480) -->
  <g id="target-wooden-flute" transform="translate(410, 480) rotate(-25)">
    <rect x="-24" y="-3" width="48" height="6" rx="3" fill="#b45309" stroke="#78350f" stroke-width="1.5"/>
    <circle cx="-10" cy="0" r="1.5" fill="#1c1917"/>
    <circle cx="0" cy="0" r="1.5" fill="#1c1917"/>
    <circle cx="10" cy="0" r="1.5" fill="#1c1917"/>
  </g>

  <!-- 5. Blue Feather (cx: 530, cy: 520) -->
  <g id="target-blue-feather" transform="translate(530, 520) rotate(45)">
    <path d="M0 -22 C-10 -8 0 16 0 16 C0 16 10 -8 0 -22 Z" fill="#3b82f6" stroke="#1d4ed8" stroke-width="1.5"/>
    <line x1="0" y1="-22" x2="0" y2="20" stroke="#bfdbfe" stroke-width="1.5"/>
  </g>

  <!-- 6. Dragonfly (cx: 630, cy: 370) -->
  <g id="target-emerald-dragonfly" transform="translate(630, 370)">
    <line x1="0" y1="-14" x2="0" y2="16" stroke="#10b981" stroke-width="3" stroke-linecap="round"/>
    <ellipse cx="-12" cy="-4" rx="12" ry="3" fill="#6ee7b7" opacity="0.8"/>
    <ellipse cx="12" cy="-4" rx="12" ry="3" fill="#6ee7b7" opacity="0.8"/>
  </g>

  <!-- 7. Enchanted Key (cx: 810, cy: 280) -->
  <g id="target-ivy-key" transform="translate(810, 280) rotate(15)">
    <circle cx="0" cy="-14" r="8" fill="none" stroke="#f59e0b" stroke-width="3.5" filter="url(#glow)"/>
    <rect x="-2" y="-6" width="4" height="24" rx="1" fill="#f59e0b"/>
    <rect x="0" y="8" width="6" height="4" fill="#f59e0b"/>
  </g>

  <!-- 8. Forest Elixir (cx: 340, cy: 390) -->
  <g id="target-magic-potion" transform="translate(340, 390)">
    <circle cx="0" cy="4" r="14" fill="#a855f7" stroke="#7e22ce" stroke-width="2" filter="url(#glow)"/>
    <rect x="-4" y="-12" width="8" height="6" fill="#cbd5e1"/>
    <rect x="-3" y="-16" width="6" height="4" fill="#78350f"/>
  </g>
  ${getSvgFooter()}`;
}

// LEVEL 10: Mysterious Castle
function generateLevel10Svg() {
  return `${getSvgHeader('Mysterious Castle')}
  <defs>
    <linearGradient id="l10-stone" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#1e293b"/>
      <stop offset="100%" stop-color="#0f172a"/>
    </linearGradient>
    <linearGradient id="l10-rose" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#dc2626"/>
      <stop offset="50%" stop-color="#f59e0b"/>
      <stop offset="100%" stop-color="#2563eb"/>
    </linearGradient>
  </defs>

  <!-- Gothic Stone Vaults -->
  <rect x="0" y="0" width="900" height="600" fill="url(#l10-stone)"/>

  <!-- Rose Window in Center -->
  <circle cx="450" cy="140" r="60" fill="url(#l10-rose)" stroke="#334155" stroke-width="6"/>
  <circle cx="450" cy="140" r="25" fill="#fef08a" stroke="#334155" stroke-width="3"/>

  <!-- Colossal Stone Columns -->
  <rect x="80" y="0" width="80" height="600" fill="#334155" stroke="#1e293b" stroke-width="4"/>
  <rect x="740" y="0" width="80" height="600" fill="#334155" stroke="#1e293b" stroke-width="4"/>

  <!-- Royal Dais & Throne in Center -->
  <rect x="420" y="300" width="160" height="200" fill="#991b1b" stroke="#7f1d1d" stroke-width="4" filter="url(#shadow)"/>
  <polygon points="420,300 500,240 580,300" fill="#b91c1c" stroke="#d97706" stroke-width="3"/>
  <!-- Gold Trimming -->
  <rect x="430" y="320" width="140" height="170" fill="#7f1d1d"/>

  <!-- Knight Suit of Armor on Left Plinth -->
  <rect x="180" y="440" width="70" height="80" fill="#475569" stroke="#334155" stroke-width="3"/>
  <rect x="195" y="320" width="40" height="90" rx="6" fill="#94a3b8" stroke="#475569" stroke-width="2"/>
  <rect x="180" y="410" width="70" height="30" fill="#64748b"/>

  <!-- Grand Fireplace on Right -->
  <rect x="270" y="480" width="360" height="80" fill="#020617"/>

  <!-- ==================== 8 TARGET OBJECTS ==================== -->
  <!-- 1. Knight Visor (cx: 210, cy: 280) -->
  <g id="target-knight-helmet" transform="translate(210, 280)">
    <path d="M-15 10 C-15 -14 15 -14 15 10 Z" fill="#cbd5e1" stroke="#475569" stroke-width="2"/>
    <rect x="-12" y="0" width="24" height="6" fill="#0f172a" rx="1"/>
    <path d="M0 -14 C0 -22 6 -24 8 -22" stroke="#dc2626" stroke-width="4" fill="none"/>
  </g>

  <!-- 2. Royal Crown (cx: 490, cy: 360) -->
  <g id="target-jeweled-crown" transform="translate(490, 360)">
    <polygon points="-16,12 16,12 14,-6 6,2 0,-12 -6,2 -14,-6" fill="#fbbf24" stroke="#d97706" stroke-width="2" filter="url(#glow)"/>
    <circle cx="0" cy="-12" r="2.5" fill="#dc2626"/>
    <circle cx="-14" cy="-6" r="2" fill="#2563eb"/>
    <circle cx="14" cy="-6" r="2" fill="#2563eb"/>
  </g>

  <!-- 3. Heraldic Shield (cx: 140, cy: 210) -->
  <g id="target-knight-shield" transform="translate(140, 210)">
    <path d="M-15 -18 H15 V2 C15 16 0 24 0 24 C0 24 -15 16 -15 2 Z" fill="#dc2626" stroke="#fbbf24" stroke-width="3"/>
    <path d="M0 -14 V18 M-12 0 H12" stroke="#fbbf24" stroke-width="2.5"/>
  </g>

  <!-- 4. Dungeon Key (cx: 770, cy: 220) -->
  <g id="target-iron-castle-key" transform="translate(770, 220)">
    <circle cx="-12" cy="0" r="8" fill="none" stroke="#64748b" stroke-width="3.5"/>
    <rect x="-4" y="-2" width="28" height="4" fill="#64748b"/>
    <rect x="14" y="2" width="4" height="8" fill="#64748b"/>
    <rect x="20" y="2" width="4" height="6" fill="#64748b"/>
  </g>

  <!-- 5. Candelabra (cx: 330, cy: 380) -->
  <g id="target-silver-candelabra" transform="translate(330, 380)">
    <line x1="0" y1="20" x2="0" y2="-12" stroke="#cbd5e1" stroke-width="3"/>
    <path d="M-14 -2 C-14 8 14 8 14 -2" fill="none" stroke="#cbd5e1" stroke-width="2.5"/>
    <circle cx="0" cy="-16" r="3" fill="#fef08a" filter="url(#glow)"/>
    <circle cx="-14" cy="-6" r="2.5" fill="#fef08a" filter="url(#glow)"/>
    <circle cx="14" cy="-6" r="2.5" fill="#fef08a" filter="url(#glow)"/>
  </g>

  <!-- 6. Crossbow (cx: 820, cy: 420) -->
  <g id="target-hunting-crossbow" transform="translate(820, 420) rotate(15)">
    <rect x="-3" y="-20" width="6" height="40" rx="2" fill="#78350f" stroke="#451a03" stroke-width="1.5"/>
    <path d="M-22 -14 Q0 -22 22 -14" fill="none" stroke="#94a3b8" stroke-width="3"/>
    <line x1="-22" y1="-14" x2="22" y2="-14" stroke="#f1f5f9" stroke-width="1.5"/>
  </g>

  <!-- 7. Royal Banner (cx: 520, cy: 170) -->
  <g id="target-heraldic-banner" transform="translate(520, 170)">
    <path d="M-14 -20 H14 V16 L0 8 L-14 16 Z" fill="#dc2626" stroke="#fbbf24" stroke-width="2"/>
    <polygon points="0,-12 -4,-4 4,-4" fill="#fbbf24"/>
  </g>

  <!-- 8. King Scepter (cx: 630, cy: 390) -->
  <g id="target-royal-scepter" transform="translate(630, 390) rotate(-15)">
    <line x1="0" y1="-26" x2="0" y2="26" stroke="#f59e0b" stroke-width="4" stroke-linecap="round"/>
    <circle cx="0" cy="-26" r="8" fill="#fbbf24" stroke="#d97706" stroke-width="2" filter="url(#glow)"/>
    <circle cx="0" cy="-26" r="3" fill="#dc2626"/>
  </g>
  ${getSvgFooter()}`;
}

const svgGenerators = [
  generateLevel1Svg,
  generateLevel2Svg,
  generateLevel3Svg,
  generateLevel4Svg,
  generateLevel5Svg,
  generateLevel6Svg,
  generateLevel7Svg,
  generateLevel8Svg,
  generateLevel9Svg,
  generateLevel10Svg
];

// Write all 10 SVGs
levelsData.forEach((lvl, idx) => {
  const filePath = path.join(OUTPUT_DIR, lvl.svgFileName);
  const svgContent = svgGenerators[idx]();
  fs.writeFileSync(filePath, svgContent, 'utf8');
  console.log(`Generated SVG: ${lvl.svgFileName}`);
});

// Generate TypeScript Data File
const tsContent = `/**
 * Master Levels Data for Free Hidden Object Online Game
 * PuzzleFeels.com
 */

export interface HiddenObjectItem {
  id: string;
  name: string;
  cx: number;
  cy: number;
  x: number; // percentage (0 - 100)
  y: number; // percentage (0 - 100)
  radius: number; // click tolerance radius as percentage
  iconSvg: string;
}

export interface HiddenObjectLevel {
  id: string;
  level: number;
  title: string;
  theme: string;
  description: string;
  image: string;
  imageWidth: number;
  imageHeight: number;
  objects: HiddenObjectItem[];
}

export const HIDDEN_OBJECT_LEVELS: HiddenObjectLevel[] = ${JSON.stringify(levelsData.map(lvl => ({
  id: lvl.id,
  level: lvl.level,
  title: lvl.title,
  theme: lvl.theme,
  description: lvl.description,
  image: `/images/hidden-object/${lvl.svgFileName}`,
  imageWidth: lvl.imageWidth,
  imageHeight: lvl.imageHeight,
  objects: lvl.objects.map(o => ({
    id: o.id,
    name: o.name,
    cx: o.cx,
    cy: o.cy,
    x: o.x,
    y: o.y,
    radius: o.radius,
    iconSvg: o.iconSvg
  }))
})), null, 2)};
`;

fs.writeFileSync(DATA_FILE, tsContent, 'utf8');
console.log(`Generated TypeScript Data: ${DATA_FILE}`);

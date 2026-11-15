const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'images', 'spot-the-difference');
const DATA_FILE = path.join(__dirname, '..', 'src', 'data', 'spotDifferenceData.ts');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// 9 Puzzles: 3 Easy (5 diffs), 3 Medium (7 diffs), 3 Hard (10 diffs)
// Dimensions: 800 x 520

const puzzles = [
  // ==========================================
  // PUZZLE 1 (Easy - 5 Differences)
  // Alpine Mountain Camp
  // ==========================================
  {
    id: 'alpine-mountain-camp',
    level: 1,
    difficulty: 'easy',
    title: 'Alpine Mountain Camp',
    category: 'Nature & Landscapes',
    description: 'A serene alpine mountain retreat with a cozy log cabin, glowing campfire, and tranquil lake.',
    imageWidth: 800,
    imageHeight: 520,
    differences: [
      {
        id: 1,
        x: 58.0, // cx=464, cy=146
        y: 28.1,
        radius: 5.5,
        label: 'Cabin Chimney Smoke',
        hint: 'Look above the cabin roof to see what is rising from the chimney.'
      },
      {
        id: 2,
        x: 23.0, // cx=184, cy=114
        y: 21.9,
        radius: 5.5,
        label: 'Left Mountain Snowcap',
        hint: 'Check the snowy peak of the far left mountain ridge.'
      },
      {
        id: 3,
        x: 74.5, // cx=596, cy=405
        y: 77.9,
        radius: 5.5,
        label: 'Canoe Paddle',
        hint: 'Examine the wooden canoe resting on the pebbled lake shore.'
      },
      {
        id: 4,
        x: 42.0, // cx=336, cy=421
        y: 81.0,
        radius: 5.5,
        label: 'Campfire Flame Color',
        hint: 'Inspect the glowing flames inside the campfire stone ring.'
      },
      {
        id: 5,
        x: 35.0, // cx=280, cy=78
        y: 15.0,
        radius: 5.5,
        label: 'Fluffy Sky Cloud',
        hint: 'Observe the drifting clouds high above the mountain range.'
      }
    ],
    renderSvg: (isB) => `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 520" width="800" height="520">
  <defs>
    <linearGradient id="skyGrad1" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#4a70b0"/>
      <stop offset="60%" stop-color="#8bb7e0"/>
      <stop offset="100%" stop-color="#e9c8a7"/>
    </linearGradient>
    <linearGradient id="sunGrad1" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#fff1a8"/>
      <stop offset="100%" stop-color="#ffb347"/>
    </linearGradient>
    <linearGradient id="mtnBack" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#55698a"/>
      <stop offset="100%" stop-color="#7e95b3"/>
    </linearGradient>
    <linearGradient id="mtnFore" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#3d4f6c"/>
      <stop offset="100%" stop-color="#536b8c"/>
    </linearGradient>
    <linearGradient id="lakeGrad1" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#4d82a3"/>
      <stop offset="50%" stop-color="#3b6e8f"/>
      <stop offset="100%" stop-color="#244d6b"/>
    </linearGradient>
    <linearGradient id="cabinWall" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#6e472a"/>
      <stop offset="100%" stop-color="#8a5b36"/>
    </linearGradient>
    <linearGradient id="cabinRoof" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#4a3222"/>
      <stop offset="100%" stop-color="#2f1e14"/>
    </linearGradient>
    <linearGradient id="grassGrad1" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#5a8c43"/>
      <stop offset="100%" stop-color="#3e662c"/>
    </linearGradient>
    <filter id="glow1" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="6" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
  </defs>

  <!-- Sky -->
  <rect width="800" height="520" fill="url(#skyGrad1)"/>

  <!-- Sun -->
  <circle cx="680" cy="90" r="42" fill="url(#sunGrad1)" filter="url(#glow1)" opacity="0.9"/>

  <!-- Clouds -->
  <!-- Cloud 1 -->
  <g fill="#ffffff" opacity="0.85">
    <circle cx="120" cy="80" r="24"/>
    <circle cx="145" cy="72" r="30"/>
    <circle cx="175" cy="78" r="26"/>
    <rect x="120" y="80" width="55" height="24" rx="10"/>
  </g>

  <!-- Cloud 2 / Difference 5: Extra cloud in B -->
  ${isB ? `
  <g fill="#ffffff" opacity="0.88">
    <circle cx="265" cy="80" r="20"/>
    <circle cx="285" cy="74" r="25"/>
    <circle cx="310" cy="80" r="21"/>
    <rect x="265" y="82" width="45" height="18" rx="8"/>
  </g>
  ` : ''}

  <!-- Cloud 3 Right -->
  <g fill="#ffffff" opacity="0.8">
    <circle cx="520" cy="70" r="22"/>
    <circle cx="545" cy="62" r="28"/>
    <circle cx="570" cy="69" r="24"/>
    <rect x="520" y="70" width="50" height="20" rx="9"/>
  </g>

  <!-- Distant Mountains -->
  <polygon points="60,300 184,114 310,300" fill="url(#mtnBack)"/>
  <polygon points="240,300 390,95 530,300" fill="url(#mtnBack)"/>
  <polygon points="460,300 580,140 720,300" fill="url(#mtnBack)"/>

  <!-- Snowcaps -->
  <!-- Middle Mountain Snow -->
  <polygon points="390,95 360,140 375,135 390,148 405,135 420,142" fill="#f0f5fc"/>
  <!-- Right Mountain Snow -->
  <polygon points="580,140 555,175 570,170 580,180 595,172 605,178" fill="#f0f5fc"/>

  <!-- Left Mountain Snowcap / Difference 2 -->
  ${!isB ? `
  <polygon points="184,114 158,155 172,150 184,162 198,152 210,158" fill="#f0f5fc"/>
  ` : `
  <!-- Snowcap melted in B -->
  <polygon points="184,114 158,155 172,150 184,162 198,152 210,158" fill="#5a7094" opacity="0.6"/>
  `}

  <!-- Foreground Mountains -->
  <polygon points="0,320 120,180 280,320" fill="url(#mtnFore)"/>
  <polygon points="340,320 480,165 640,320" fill="url(#mtnFore)"/>

  <!-- Pine Tree Ridge Behind Lake -->
  <g fill="#213d28">
    ${[40, 80, 120, 160, 200, 240, 280, 320, 360, 400, 600, 640, 680, 720, 760].map(x => `
      <polygon points="${x},290 ${x - 14},325 ${x + 14},325"/>
      <polygon points="${x},275 ${x - 12},305 ${x + 12},305"/>
      <polygon points="${x},260 ${x - 10},285 ${x + 10},285"/>
    `).join('')}
  </g>

  <!-- Lake -->
  <path d="M0,310 Q400,295 800,310 L800,430 Q400,450 0,430 Z" fill="url(#lakeGrad1)"/>
  <!-- Water Highlights -->
  <ellipse cx="260" cy="340" rx="80" ry="2" fill="#88c0db" opacity="0.6"/>
  <ellipse cx="560" cy="360" rx="110" ry="3" fill="#88c0db" opacity="0.5"/>
  <ellipse cx="380" cy="380" rx="95" ry="2" fill="#88c0db" opacity="0.4"/>

  <!-- Shoreline & Meadow -->
  <path d="M0,380 Q350,370 520,410 L800,390 L800,520 L0,520 Z" fill="url(#grassGrad1)"/>
  <!-- Pebbled Bank Near Water -->
  <path d="M480,410 Q600,395 800,405 L800,440 Q620,425 480,410 Z" fill="#998977" opacity="0.75"/>

  <!-- Wooden Log Cabin -->
  <g id="cabin">
    <!-- Cabin Shadow -->
    <ellipse cx="460" cy="370" rx="85" ry="15" fill="#1b2e15" opacity="0.5"/>
    <!-- Cabin Base Walls -->
    <rect x="400" y="270" width="120" height="95" rx="3" fill="url(#cabinWall)"/>
    <!-- Log Lines -->
    <line x1="400" y1="290" x2="520" y2="290" stroke="#4a301b" stroke-width="2"/>
    <line x1="400" y1="310" x2="520" y2="310" stroke="#4a301b" stroke-width="2"/>
    <line x1="400" y1="330" x2="520" y2="330" stroke="#4a301b" stroke-width="2"/>
    <line x1="400" y1="350" x2="520" y2="350" stroke="#4a301b" stroke-width="2"/>
    <!-- Door -->
    <rect x="445" y="305" width="28" height="60" rx="2" fill="#3a2211"/>
    <circle cx="468" cy="336" r="2.5" fill="#d4af37"/>
    <!-- Window Glowing -->
    <rect x="485" y="295" width="24" height="24" rx="2" fill="#ffe48f"/>
    <rect x="410" y="295" width="24" height="24" rx="2" fill="#ffe48f"/>
    <line x1="497" y1="295" x2="497" y2="319" stroke="#3a2211" stroke-width="1.5"/>
    <line x1="485" y1="307" x2="509" y2="307" stroke="#3a2211" stroke-width="1.5"/>
    <!-- Overhanging Roof -->
    <polygon points="380,270 460,205 540,270" fill="url(#cabinRoof)"/>
    <!-- Chimney -->
    <rect x="456" y="180" width="16" height="38" fill="#6e2d1d"/>
    <rect x="453" y="176" width="22" height="6" rx="1" fill="#4d1f14"/>

    <!-- Difference 1: Chimney Smoke (Present in A, missing in B) -->
    ${!isB ? `
    <g fill="#ffffff" opacity="0.7">
      <circle cx="464" cy="162" r="7"/>
      <circle cx="468" cy="146" r="11"/>
      <circle cx="461" cy="126" r="15"/>
      <circle cx="470" cy="102" r="19"/>
    </g>
    ` : ''}
  </g>

  <!-- Big Pine Trees Left Foreground -->
  <g fill="#1a3821">
    <!-- Tree 1 -->
    <polygon points="80,480 40,480 60,350"/>
    <polygon points="60,320 20,380 100,380"/>
    <polygon points="60,280 26,340 94,340"/>
    <polygon points="60,240 34,300 86,300"/>
    <!-- Tree 2 -->
    <polygon points="120,490 85,490 102,370"/>
    <polygon points="102,340 65,400 140,400"/>
    <polygon points="102,300 72,360 132,360"/>
    <polygon points="102,260 80,320 125,320"/>
  </g>

  <!-- Campfire with Stones / Difference 4 -->
  <g id="campfire">
    <!-- Stones -->
    <ellipse cx="336" cy="430" rx="36" ry="14" fill="#6b6b6b"/>
    <circle cx="312" cy="430" r="7" fill="#4a4a4a"/>
    <circle cx="326" cy="436" r="8" fill="#525252"/>
    <circle cx="344" cy="436" r="8" fill="#4f4f4f"/>
    <circle cx="358" cy="430" r="7" fill="#5e5e5e"/>
    <circle cx="336" cy="424" r="7" fill="#424242"/>
    <!-- Wooden Logs -->
    <line x1="318" y1="428" x2="354" y2="422" stroke="#543118" stroke-width="6" stroke-linecap="round"/>
    <line x1="322" y1="422" x2="350" y2="428" stroke="#3b210e" stroke-width="6" stroke-linecap="round"/>

    <!-- Flames -->
    ${!isB ? `
    <!-- Standard Golden Orange Flame in A -->
    <path d="M336,396 Q350,412 344,424 Q336,428 328,424 Q322,412 336,396 Z" fill="#ff7300"/>
    <path d="M336,406 Q344,416 340,424 Q336,426 332,424 Q328,416 336,406 Z" fill="#ffe600"/>
    ` : `
    <!-- Ruby Red / Purple Flame in B -->
    <path d="M336,396 Q350,412 344,424 Q336,428 328,424 Q322,412 336,396 Z" fill="#d1154a"/>
    <path d="M336,406 Q344,416 340,424 Q336,426 332,424 Q328,416 336,406 Z" fill="#ff789e"/>
    `}
  </g>

  <!-- Wooden Canoe on Beach / Difference 3 -->
  <g id="canoe">
    <!-- Canoe Shadow -->
    <ellipse cx="610" cy="420" rx="70" ry="10" fill="#1b2e15" opacity="0.4"/>
    <!-- Canoe Hull -->
    <path d="M540,410 Q610,432 680,405 Q610,418 540,410 Z" fill="#b84d28"/>
    <path d="M544,409 Q610,424 676,405 Q610,416 544,409 Z" fill="#782e14"/>
    <!-- Cross Braces -->
    <line x1="585" y1="413" x2="585" y2="418" stroke="#eed8c1" stroke-width="2"/>
    <line x1="635" y1="412" x2="635" y2="417" stroke="#eed8c1" stroke-width="2"/>

    <!-- Canoe Paddle / Difference 3 (Present in A, missing in B) -->
    ${!isB ? `
    <g id="paddle">
      <line x1="575" y1="428" x2="620" y2="385" stroke="#e8c07d" stroke-width="3" stroke-linecap="round"/>
      <polygon points="616,388 625,380 622,392" fill="#d49c4b"/>
    </g>
    ` : ''}
  </g>
</svg>
`
  },

  // ==========================================
  // PUZZLE 2 (Easy - 5 Differences)
  // Artisan Bakery Cafe
  // ==========================================
  {
    id: 'artisan-bakery-cafe',
    level: 2,
    difficulty: 'easy',
    title: 'Artisan Bakery & Cafe',
    category: 'Food & Kitchen',
    description: 'A cozy corner boulangerie filled with fresh croissants, steaming coffee, and sweet pastries.',
    imageWidth: 800,
    imageHeight: 520,
    differences: [
      {
        id: 1,
        x: 78.0, // cx=624, cy=125
        y: 24.0,
        radius: 5.5,
        label: 'Wall Clock Hands Time',
        hint: 'Check the face of the round wooden clock hanging high on the right wall.'
      },
      {
        id: 2,
        x: 38.0, // cx=304, cy=333
        y: 64.0,
        radius: 5.5,
        label: 'Coffee Mug Color',
        hint: 'Examine the ceramic coffee mug resting on the wooden pastry counter.'
      },
      {
        id: 3,
        x: 50.0, // cx=400, cy=73
        y: 14.0,
        radius: 5.5,
        label: 'Striped Canopy Awning',
        hint: 'Look at the colored fabric stripes of the decorative cafe awning.'
      },
      {
        id: 4,
        x: 62.0, // cx=496, cy=286
        y: 55.0,
        radius: 5.5,
        label: 'Croissant on Upper Glass Shelf',
        hint: 'Inspect the golden baked pastries displayed on the top glass shelf.'
      },
      {
        id: 5,
        x: 18.0, // cx=144, cy=182
        y: 35.0,
        radius: 5.5,
        label: 'Chalkboard Menu Illustration',
        hint: 'Read the specials drawn on the framed blackboard menu on the left wall.'
      }
    ],
    renderSvg: (isB) => `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 520" width="800" height="520">
  <defs>
    <linearGradient id="wallBakery" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#faebd7"/>
      <stop offset="100%" stop-color="#ebd3b7"/>
    </linearGradient>
    <linearGradient id="counterWood" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#82512d"/>
      <stop offset="100%" stop-color="#a3693d"/>
    </linearGradient>
    <linearGradient id="chalkboardGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#2a382c"/>
      <stop offset="100%" stop-color="#182419"/>
    </linearGradient>
    <linearGradient id="croissantGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#f5ba53"/>
      <stop offset="100%" stop-color="#bd721a"/>
    </linearGradient>
    <linearGradient id="breadGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#e3a759"/>
      <stop offset="100%" stop-color="#8a4d1a"/>
    </linearGradient>
  </defs>

  <!-- Bakery Background Wall -->
  <rect width="800" height="520" fill="url(#wallBakery)"/>

  <!-- Tiled Floor -->
  <g fill="#c9b295" stroke="#b0997e" stroke-width="2">
    <rect x="0" y="440" width="800" height="80"/>
    ${[0, 100, 200, 300, 400, 500, 600, 700].map(x => `<line x1="${x}" y1="440" x2="${x + 40}" y2="520"/>`).join('')}
  </g>

  <!-- Cafe Canopy / Difference 3: Awning Stripe -->
  <g id="awning">
    <polygon points="0,0 800,0 800,85 0,85" fill="#fcf6ec"/>
    <!-- Red & Cream Stripes -->
    ${[0, 80, 160, 240, 320, 480, 560, 640, 720].map(x => `
      <polygon points="${x},0 ${x + 40},0 ${x + 40},85 ${x},85" fill="#c43b2f"/>
    `).join('')}
    <!-- Center stripe difference at x=400 -->
    ${!isB ? `
    <polygon points="400,0 440,0 440,85 400,85" fill="#c43b2f"/>
    ` : `
    <polygon points="400,0 440,0 440,85 400,85" fill="#1e3b70"/>
    `}
    <!-- Scalloped Awning Edge -->
    ${[0, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750].map(x => `
      <circle cx="${x + 25}" cy="85" r="14" fill="#fcf6ec"/>
    `).join('')}
  </g>

  <!-- Chalkboard Menu / Difference 5 -->
  <g id="menuBoard">
    <rect x="90" y="120" width="110" height="150" rx="6" fill="#52361b"/>
    <rect x="98" y="128" width="94" height="134" rx="4" fill="url(#chalkboardGrad)"/>
    <!-- Menu text lines -->
    <text x="145" y="148" font-family="sans-serif" font-size="11" font-weight="bold" fill="#fff" text-anchor="middle">MENU</text>
    <line x1="108" y1="156" x2="182" y2="156" stroke="#9bb89c" stroke-dasharray="2,2"/>
    <text x="110" y="172" font-family="sans-serif" font-size="9" fill="#e0e8e0">Croissant $3</text>
    <text x="110" y="188" font-family="sans-serif" font-size="9" fill="#e0e8e0">Espresso $2</text>
    <text x="110" y="204" font-family="sans-serif" font-size="9" fill="#e0e8e0">Baguette $4</text>
    <!-- Doodle / Difference 5 -->
    ${!isB ? `
    <!-- Cupcake doodle in A -->
    <g transform="translate(144, 235)">
      <polygon points="-10,0 10,0 7,14 -7,14" fill="#e39191"/>
      <circle cx="0" cy="-4" r="9" fill="#ffffff"/>
      <circle cx="0" cy="-12" r="3" fill="#d62222"/>
    </g>
    ` : `
    <!-- Smiling Sun doodle in B -->
    <g transform="translate(144, 235)">
      <circle cx="0" cy="2" r="10" fill="#ffd700"/>
      <circle cx="-3" cy="0" r="1.5" fill="#4d3000"/>
      <circle cx="3" cy="0" r="1.5" fill="#4d3000"/>
      <path d="M-4,5 Q0,9 4,5" stroke="#4d3000" stroke-width="1.2" fill="none"/>
    </g>
    `}
  </g>

  <!-- Wall Clock / Difference 1 -->
  <g id="wallClock" transform="translate(624, 125)">
    <circle cx="0" cy="0" r="42" fill="#784724"/>
    <circle cx="0" cy="0" r="36" fill="#fffef5"/>
    <!-- Hour marks -->
    <circle cx="0" cy="-28" r="2.5" fill="#4a301b"/>
    <circle cx="28" cy="0" r="2.5" fill="#4a301b"/>
    <circle cx="0" cy="28" r="2.5" fill="#4a301b"/>
    <circle cx="-28" cy="0" r="2.5" fill="#4a301b"/>
    <circle cx="0" cy="0" r="4" fill="#c43b2f"/>
    ${!isB ? `
    <!-- 10:10 in A -->
    <line x1="0" y1="0" x2="-14" y2="-14" stroke="#222" stroke-width="3" stroke-linecap="round"/>
    <line x1="0" y1="0" x2="16" y2="-16" stroke="#222" stroke-width="2" stroke-linecap="round"/>
    ` : `
    <!-- 3:00 in B -->
    <line x1="0" y1="0" x2="0" y2="-20" stroke="#222" stroke-width="2" stroke-linecap="round"/>
    <line x1="0" y1="0" x2="18" y2="0" stroke="#222" stroke-width="3" stroke-linecap="round"/>
    `}
  </g>

  <!-- Bakery Counter -->
  <g id="mainCounter">
    <rect x="180" y="320" width="620" height="150" fill="url(#counterWood)" rx="4"/>
    <rect x="170" y="310" width="630" height="18" fill="#523118" rx="3"/>
  </g>

  <!-- Glass Pastry Display Case -->
  <g id="pastryCase">
    <rect x="380" y="190" width="370" height="120" rx="4" fill="#e8f4fc" opacity="0.6" stroke="#a0bed4" stroke-width="3"/>
    <!-- Glass shelves -->
    <line x1="380" y1="245" x2="750" y2="245" stroke="#a0bed4" stroke-width="3"/>
    
    <!-- Top Shelf: Croissants / Difference 4 -->
    <!-- Croissant 1 (Left) -->
    <path d="M410,238 Q425,220 445,238 Q430,230 410,238 Z" fill="url(#croissantGrad)"/>
    <!-- Croissant 2 (Center) / Difference 4 -->
    ${!isB ? `
    <path d="M485,238 Q500,220 520,238 Q505,230 485,238 Z" fill="url(#croissantGrad)"/>
    ` : ''}
    <!-- Croissant 3 (Right) -->
    <path d="M560,238 Q575,220 595,238 Q580,230 560,238 Z" fill="url(#croissantGrad)"/>
    <!-- Berry Tart (Far Right) -->
    <ellipse cx="670" cy="236" rx="20" ry="7" fill="#d97e29"/>
    <circle cx="664" cy="232" r="4" fill="#a81938"/>
    <circle cx="670" cy="230" r="4" fill="#a81938"/>
    <circle cx="676" cy="232" r="4" fill="#a81938"/>

    <!-- Bottom Shelf: Bread Loaves -->
    <ellipse cx="430" cy="290" rx="32" ry="14" fill="url(#breadGrad)"/>
    <ellipse cx="510" cy="290" rx="28" ry="14" fill="url(#breadGrad)"/>
    <ellipse cx="580" cy="290" rx="30" ry="14" fill="url(#breadGrad)"/>
    <!-- Chocolate Eclair -->
    <rect x="640" y="284" width="46" height="12" rx="6" fill="#401f0c"/>
    <line x1="646" y1="290" x2="680" y2="290" stroke="#fcead2" stroke-width="2"/>
  </g>

  <!-- Coffee Machine On Counter Left -->
  <g id="espressoMachine">
    <rect x="220" y="240" width="68" height="72" rx="4" fill="#bdc3c7" stroke="#7f8c8d" stroke-width="2"/>
    <rect x="230" y="250" width="48" height="20" fill="#2c3e50"/>
    <circle cx="240" cy="260" r="3" fill="#2ecc71"/>
    <circle cx="254" cy="260" r="3" fill="#e74c3c"/>
    <rect x="246" y="285" width="16" height="14" fill="#7f8c8d"/>
  </g>

  <!-- Coffee Mug / Difference 2 -->
  <g id="coffeeCup">
    ${!isB ? `
    <!-- Teal Mug in A -->
    <rect x="294" y="318" width="22" height="24" rx="3" fill="#1b8a82"/>
    <path d="M316,322 C324,322 324,334 316,334" stroke="#1b8a82" stroke-width="3" fill="none"/>
    ` : `
    <!-- Bright Orange Mug in B -->
    <rect x="294" y="318" width="22" height="24" rx="3" fill="#ff6b2b"/>
    <path d="M316,322 C324,322 324,334 316,334" stroke="#ff6b2b" stroke-width="3" fill="none"/>
    `}
    <!-- Steam rising -->
    <path d="M300,314 Q304,306 300,298" stroke="#ffffff" stroke-width="2" fill="none" opacity="0.6" stroke-linecap="round"/>
    <path d="M308,314 Q312,306 308,298" stroke="#ffffff" stroke-width="2" fill="none" opacity="0.6" stroke-linecap="round"/>
  </g>

  <!-- Flower Vase Left Floor -->
  <g id="flowerPot">
    <polygon points="50,490 85,490 78,410 57,410" fill="#cc6b49"/>
    <!-- Green Leaves -->
    <circle cx="60" cy="390" r="16" fill="#3b7a3b"/>
    <circle cx="76" cy="385" r="18" fill="#4d994d"/>
    <circle cx="68" cy="370" r="14" fill="#2c5c2c"/>
    <!-- Yellow Flower Bloom -->
    <circle cx="68" cy="360" r="8" fill="#ffd700"/>
    <circle cx="68" cy="360" r="4" fill="#d97706"/>
  </g>
</svg>
`
  },

  // ==========================================
  // PUZZLE 3 (Easy - 5 Differences)
  // Sunny Coral Reef
  // ==========================================
  {
    id: 'sunny-coral-reef',
    level: 3,
    difficulty: 'easy',
    title: 'Sunny Coral Reef',
    category: 'Animals & Sea Life',
    description: 'An enchanting underwater coral reef with a gentle sea turtle, clownfish, starfish, and ocean treasures.',
    imageWidth: 800,
    imageHeight: 520,
    differences: [
      {
        id: 1,
        x: 32.0, // cx=256, cy=182
        y: 35.0,
        radius: 5.5,
        label: 'Sea Turtle Shell Pattern',
        hint: 'Observe the decorative markings across the swimming sea turtle shell.'
      },
      {
        id: 2,
        x: 72.0, // cx=576, cy=436
        y: 84.0,
        radius: 5.5,
        label: 'Starfish Color on Sand',
        hint: 'Look down at the starfish resting peacefully on the seabed sand.'
      },
      {
        id: 3,
        x: 55.0, // cx=440, cy=114
        y: 22.0,
        radius: 5.5,
        label: 'Ascending Bubble Cluster',
        hint: 'Watch the trail of round bubbles floating up toward the ocean surface.'
      },
      {
        id: 4,
        x: 82.0, // cx=656, cy=322
        y: 62.0,
        radius: 5.5,
        label: 'Sea Anemone Color',
        hint: 'Examine the flowing soft tentacles of the sea anemone on the right reef.'
      },
      {
        id: 5,
        x: 20.0, // cx=160, cy=343
        y: 66.0,
        radius: 5.5,
        label: 'Clownfish White Stripes',
        hint: 'Count the bright white stripes on the orange clownfish swimming near the seabed.'
      }
    ],
    renderSvg: (isB) => `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 520" width="800" height="520">
  <defs>
    <linearGradient id="oceanGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#3cb9d6"/>
      <stop offset="40%" stop-color="#1f7ea1"/>
      <stop offset="100%" stop-color="#0e3a54"/>
    </linearGradient>
    <linearGradient id="sandGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#e8d4a7"/>
      <stop offset="100%" stop-color="#c4af81"/>
    </linearGradient>
    <linearGradient id="turtleShellA" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#69964e"/>
      <stop offset="100%" stop-color="#385426"/>
    </linearGradient>
    <linearGradient id="turtleShellB" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#2a7873"/>
      <stop offset="100%" stop-color="#134743"/>
    </linearGradient>
  </defs>

  <!-- Ocean Water Depth -->
  <rect width="800" height="520" fill="url(#oceanGrad)"/>

  <!-- Sunbeams / Caustics -->
  <g opacity="0.25" fill="#ffffff">
    <polygon points="120,0 180,0 260,520 180,520"/>
    <polygon points="340,0 420,0 520,520 400,520"/>
    <polygon points="560,0 640,0 720,520 620,520"/>
  </g>

  <!-- Sea Bed Sand -->
  <path d="M0,420 Q240,390 480,430 T800,410 L800,520 L0,520 Z" fill="url(#sandGrad)"/>

  <!-- Background Coral Silhouettes -->
  <g fill="#195573" opacity="0.6">
    <path d="M40,430 C40,320 100,320 100,430 Z"/>
    <path d="M90,430 C90,290 160,290 160,430 Z"/>
    <path d="M680,420 C680,280 770,280 770,420 Z"/>
  </g>

  <!-- Colorful Foreground Corals -->
  <!-- Left Purple Brain Coral -->
  <g fill="#9351a6">
    <ellipse cx="80" cy="450" rx="60" ry="45"/>
    <ellipse cx="60" cy="420" rx="40" ry="35"/>
    <ellipse cx="110" cy="430" rx="35" ry="30"/>
  </g>

  <!-- Center Orange Staghorn Coral -->
  <g fill="#d95d30" stroke="#b8451c" stroke-width="2">
    <path d="M440,430 C430,350 420,320 400,300 C415,320 440,370 450,430 Z"/>
    <path d="M440,360 C460,320 480,290 500,280 C485,310 460,350 450,430 Z"/>
    <path d="M450,330 C465,290 450,260 440,240 C455,270 470,310 460,430 Z"/>
  </g>

  <!-- Right Coral Mound & Anemone / Difference 4 -->
  <g id="reefRight">
    <ellipse cx="670" cy="440" rx="90" ry="50" fill="#d47997"/>
    <!-- Anemone / Difference 4 -->
    <g id="anemone" transform="translate(656, 322)">
      ${!isB ? `
      <!-- Soft Lavender Tentacles in A -->
      <g fill="#c084fc">
        <path d="M-30,50 Q-40,20 -35,0 Q-25,25 -20,50 Z"/>
        <path d="M-15,50 Q-20,10 -10,-10 Q-5,20 0,50 Z"/>
        <path d="M0,50 Q10,15 15,-15 Q15,20 15,50 Z"/>
        <path d="M15,50 Q25,20 35,5 Q25,30 25,50 Z"/>
      </g>
      ` : `
      <!-- Bright Turquoise Tentacles in B -->
      <g fill="#2dd4bf">
        <path d="M-30,50 Q-40,20 -35,0 Q-25,25 -20,50 Z"/>
        <path d="M-15,50 Q-20,10 -10,-10 Q-5,20 0,50 Z"/>
        <path d="M0,50 Q10,15 15,-15 Q15,20 15,50 Z"/>
        <path d="M15,50 Q25,20 35,5 Q25,30 25,50 Z"/>
      </g>
      `}
    </g>
  </g>

  <!-- Sea Turtle / Difference 1 -->
  <g id="seaTurtle" transform="translate(256, 182) rotate(-15)">
    <!-- Flippers -->
    <path d="M-10,-45 Q-20,-75 20,-65 Q10,-45 -5,-35 Z" fill="#4d7335"/>
    <path d="M-10,35 Q-20,70 25,55 Q10,35 -5,25 Z" fill="#4d7335"/>
    <!-- Back Flippers -->
    <path d="M-40,-25 Q-60,-35 -55,-15 Z" fill="#3b5928"/>
    <path d="M-40,20 Q-60,30 -55,10 Z" fill="#3b5928"/>
    <!-- Head -->
    <ellipse cx="50" cy="-5" rx="18" ry="12" fill="#5c8740"/>
    <circle cx="56" cy="-8" r="3" fill="#1c2b13"/>
    <!-- Shell -->
    ${!isB ? `
    <!-- Patterned Shell in A -->
    <ellipse cx="0" cy="0" rx="46" ry="34" fill="url(#turtleShellA)"/>
    <path d="M-20,-12 L-5,-20 L15,-18 L25,-4 L15,14 L-5,16 Z" stroke="#eab308" stroke-width="2.5" fill="none"/>
    <line x1="-5" y1="-20" x2="-25" y2="-28" stroke="#eab308" stroke-width="2"/>
    <line x1="15" y1="-18" x2="30" y2="-24" stroke="#eab308" stroke-width="2"/>
    <line x1="15" y1="14" x2="30" y2="22" stroke="#eab308" stroke-width="2"/>
    <line x1="-5" y1="16" x2="-22" y2="24" stroke="#eab308" stroke-width="2"/>
    ` : `
    <!-- Solid Plain Shell in B -->
    <ellipse cx="0" cy="0" rx="46" ry="34" fill="url(#turtleShellB)"/>
    `}
  </g>

  <!-- Clownfish Left / Difference 5 -->
  <g id="clownfish" transform="translate(160, 343)">
    <!-- Tail Fin -->
    <polygon points="-24,0 -40,-12 -36,0 -40,12" fill="#f97316"/>
    <!-- Body -->
    <ellipse cx="0" cy="0" rx="26" ry="16" fill="#ea580c"/>
    <!-- Eye -->
    <circle cx="15" cy="-4" r="3" fill="#ffffff"/>
    <circle cx="16" cy="-4" r="1.5" fill="#000000"/>
    <!-- White Stripes -->
    <path d="M8,-14 C12,-5 12,5 8,14" stroke="#ffffff" stroke-width="4" fill="none"/>
    <path d="M-6,-15 C-2,-5 -2,5 -6,15" stroke="#ffffff" stroke-width="4" fill="none"/>
    ${!isB ? `
    <!-- 3rd Tail Stripe in A -->
    <path d="M-18,-10 C-16,-3 -16,3 -18,10" stroke="#ffffff" stroke-width="3" fill="none"/>
    ` : ''}
  </g>

  <!-- Starfish on Seabed / Difference 2 -->
  <g id="starfish" transform="translate(576, 436)">
    ${!isB ? `
    <!-- Magenta Starfish in A -->
    <polygon points="0,-18 5,-5 18,-5 8,4 12,17 0,9 -12,17 -8,4 -18,-5 -5,-5" fill="#ec4899"/>
    ` : `
    <!-- Golden Starfish in B -->
    <polygon points="0,-18 5,-5 18,-5 8,4 12,17 0,9 -12,17 -8,4 -18,-5 -5,-5" fill="#facc15"/>
    `}
  </g>

  <!-- Sea Shell on Sand Left -->
  <g id="seashell" transform="translate(320, 445)">
    <path d="M0,0 C15,-20 35,-15 40,0 C25,-5 15,-5 0,0 Z" fill="#fed7aa"/>
    <line x1="20" y1="-14" x2="20" y2="-2" stroke="#ea580c" stroke-width="1.5"/>
  </g>

  <!-- Bubbles Floating / Difference 3 -->
  <g id="bubbles" fill="#ffffff" opacity="0.6">
    <circle cx="440" cy="190" r="7"/>
    <circle cx="448" cy="150" r="9"/>
    <circle cx="436" cy="130" r="6"/>
    ${!isB ? `
    <!-- Top Bubble in A -->
    <circle cx="440" cy="114" r="8"/>
    ` : ''}
  </g>
</svg>
`
  },

  // ==========================================
  // PUZZLE 4 (Medium - 7 Differences)
  // Autumn Park Promenade
  // ==========================================
  {
    id: 'autumn-park-promenade',
    level: 4,
    difficulty: 'medium',
    title: 'Autumn Park Promenade',
    category: 'City Scenes',
    description: 'A charming city park during peak autumn foliage with golden trees, a street lamp, park bench, and playful squirrel.',
    imageWidth: 800,
    imageHeight: 520,
    differences: [
      {
        id: 1,
        x: 22.0, // cx=176, cy=208
        y: 40.0,
        radius: 5.0,
        label: 'Street Lamp Glass Glow',
        hint: 'Check the glowing lantern glass of the vintage cast-iron streetlamp.'
      },
      {
        id: 2,
        x: 81.0, // cx=648, cy=353
        y: 68.0,
        radius: 5.0,
        label: 'Bicycle Basket Flower',
        hint: 'Examine what is resting inside the wicker basket on the bicycle handlebars.'
      },
      {
        id: 3,
        x: 38.0, // cx=304, cy=400
        y: 77.0,
        radius: 5.0,
        label: "Squirrel's Acorn",
        hint: 'Inspect the tiny acorn held in the paws of the squirrel on the lawn.'
      },
      {
        id: 4,
        x: 54.0, // cx=432, cy=348
        y: 67.0,
        radius: 5.0,
        label: 'Park Bench Item',
        hint: 'Notice what object is resting on the wooden slats of the park bench.'
      },
      {
        id: 5,
        x: 64.0, // cx=512, cy=171
        y: 33.0,
        radius: 5.0,
        label: 'Bridge Arch Hanging Pennant',
        hint: 'Look closely at the decorative pennant banner strung across the distant stone bridge.'
      },
      {
        id: 6,
        x: 44.0, // cx=352, cy=109
        y: 21.0,
        radius: 5.0,
        label: 'Songbird in Golden Canopy',
        hint: 'Search high in the golden branches of the central maple tree.'
      },
      {
        id: 7,
        x: 15.0, // cx=120, cy=442
        y: 85.0,
        radius: 5.0,
        label: 'Cobblestone Leaf Cluster',
        hint: 'Count the fallen red maple leaves lying on the lower left cobblestones.'
      }
    ],
    renderSvg: (isB) => `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 520" width="800" height="520">
  <defs>
    <linearGradient id="fallSky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#7097c2"/>
      <stop offset="70%" stop-color="#c2d5e8"/>
      <stop offset="100%" stop-color="#fae8cc"/>
    </linearGradient>
    <linearGradient id="treeGold" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#ffb703"/>
      <stop offset="100%" stop-color="#fb8500"/>
    </linearGradient>
    <linearGradient id="treeRed" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#d9381e"/>
      <stop offset="100%" stop-color="#8b1e0f"/>
    </linearGradient>
    <linearGradient id="pathGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#b8a99a"/>
      <stop offset="100%" stop-color="#8a7968"/>
    </linearGradient>
  </defs>

  <!-- Sky -->
  <rect width="800" height="520" fill="url(#fallSky)"/>

  <!-- Distant City Skyline Silhouettes -->
  <g fill="#9aaec4" opacity="0.5">
    <rect x="440" y="160" width="40" height="80"/>
    <polygon points="460,130 440,160 480,160"/>
    <rect x="490" y="180" width="50" height="60"/>
    <rect x="550" y="150" width="35" height="90"/>
  </g>

  <!-- Distant Stone Bridge Arch & Banner / Difference 5 -->
  <g id="distantBridge">
    <path d="M420,240 Q520,200 620,240 L620,260 L420,260 Z" fill="#7d7b7a"/>
    <path d="M460,260 Q520,225 580,260 Z" fill="#a4c2db"/>
    <!-- Hanging Banner / Difference 5 -->
    ${!isB ? `
    <g id="bridgePennant">
      <path d="M480,225 Q520,235 560,225" stroke="#333333" stroke-width="1.5" fill="none"/>
      <polygon points="495,229 505,229 500,242" fill="#d9381e"/>
      <polygon points="515,231 525,231 520,244" fill="#fb8500"/>
      <polygon points="535,229 545,229 540,242" fill="#2a9d8f"/>
    </g>
    ` : ''}
  </g>

  <!-- Park Lawn -->
  <path d="M0,260 Q400,250 800,260 L800,520 L0,520 Z" fill="#606c38"/>

  <!-- Cobblestone Promenade Pathway -->
  <path d="M0,400 Q200,320 400,280 L480,280 Q250,340 0,520 Z" fill="url(#pathGrad)"/>
  <path d="M400,280 Q600,310 800,420 L800,520 L480,280 Z" fill="url(#pathGrad)"/>

  <!-- Golden Autumn Trees -->
  <!-- Left Red Tree -->
  <g id="leftTree">
    <rect x="75" y="160" width="20" height="180" fill="#4a2e18"/>
    <ellipse cx="85" cy="150" rx="75" ry="90" fill="url(#treeRed)"/>
  </g>

  <!-- Center Golden Tree & Bird / Difference 6 -->
  <g id="centerTree">
    <rect x="340" y="140" width="26" height="190" fill="#54351c"/>
    <ellipse cx="355" cy="130" rx="90" ry="100" fill="url(#treeGold)"/>
    <!-- Songbird / Difference 6 -->
    ${!isB ? `
    <g id="songbird" transform="translate(352, 109)">
      <ellipse cx="0" cy="0" rx="9" ry="6" fill="#1d3557"/>
      <circle cx="6" cy="-3" r="4.5" fill="#e63946"/>
      <polygon points="10,-3 15,-1 10,0" fill="#f4a261"/>
    </g>
    ` : ''}
  </g>

  <!-- Right Orange Tree -->
  <g id="rightTree">
    <rect x="680" y="150" width="22" height="180" fill="#4a2e18"/>
    <ellipse cx="690" cy="140" rx="80" ry="95" fill="url(#treeGold)"/>
  </g>

  <!-- Street Lamp / Difference 1 -->
  <g id="lampPost" transform="translate(176, 208)">
    <rect x="-4" y="-30" width="8" height="180" fill="#2b2d42"/>
    <rect x="-14" y="140" width="28" height="12" fill="#2b2d42" rx="2"/>
    <!-- Lantern Fixture -->
    <polygon points="-16,-30 16,-30 10,-65 -10,-65" fill="#1b1c2b"/>
    <polygon points="-12,-32 12,-32 8,-60 -8,-60" fill="${!isB ? '#ffea75' : '#e0e7ee'}"/>
    ${!isB ? `
    <!-- Warm Glow in A -->
    <circle cx="0" cy="-45" r="18" fill="#ffe066" opacity="0.4"/>
    ` : ''}
    <polygon points="-20,-65 20,-65 0,-85" fill="#1b1c2b"/>
  </g>

  <!-- Park Bench & Item / Difference 4 -->
  <g id="bench" transform="translate(432, 348)">
    <!-- Bench Iron Legs -->
    <path d="M-55,20 L-50,45 M50,20 L55,45" stroke="#1b1c2b" stroke-width="4"/>
    <!-- Wooden Slats -->
    <rect x="-60" y="-15" width="120" height="8" rx="2" fill="#8c5835"/>
    <rect x="-60" y="-4" width="120" height="8" rx="2" fill="#8c5835"/>
    <rect x="-60" y="8" width="120" height="10" rx="2" fill="#a06840"/>
    <rect x="-60" y="20" width="120" height="10" rx="2" fill="#a06840"/>
    <!-- Item on Bench / Difference 4 -->
    ${!isB ? `
    <!-- Blue Book in A -->
    <rect x="-15" y="12" width="26" height="12" rx="2" fill="#2563eb"/>
    <line x1="-2" y1="12" x2="-2" y2="24" stroke="#ffffff" stroke-width="1.5"/>
    ` : `
    <!-- Red Coffee Tumbler in B -->
    <rect x="-8" y="4" width="14" height="22" rx="3" fill="#dc2626"/>
    <rect x="-9" y="2" width="16" height="4" rx="1" fill="#ffffff"/>
    `}
  </g>

  <!-- Squirrel on Lawn / Difference 3 -->
  <g id="squirrel" transform="translate(304, 400)">
    <!-- Bushy Tail -->
    <path d="M-15,10 C-35,0 -30,-30 -10,-25 C-5,-22 -10,-10 -5,5 Z" fill="#9c5123"/>
    <!-- Body -->
    <ellipse cx="0" cy="0" rx="12" ry="16" fill="#ba632b"/>
    <!-- Head & Ears -->
    <circle cx="6" cy="-14" r="8" fill="#ba632b"/>
    <polygon points="4,-24 8,-24 6,-18" fill="#9c5123"/>
    <circle cx="10" cy="-14" r="1.5" fill="#000000"/>
    <!-- Acorn / Difference 3 -->
    ${!isB ? `
    <!-- Holding Acorn in A -->
    <ellipse cx="14" cy="-5" rx="5" ry="6" fill="#78421a"/>
    <rect x="11" y="-12" width="6" height="4" rx="1" fill="#4d2a10"/>
    ` : ''}
  </g>

  <!-- Bicycle on Right / Difference 2 -->
  <g id="bicycle" transform="translate(648, 353)">
    <!-- Wheels -->
    <circle cx="-35" cy="30" r="22" fill="none" stroke="#333333" stroke-width="3"/>
    <circle cx="35" cy="30" r="22" fill="none" stroke="#333333" stroke-width="3"/>
    <!-- Frame -->
    <line x1="-35" y1="30" x2="0" y2="30" stroke="#0284c7" stroke-width="3"/>
    <line x1="0" y1="30" x2="-15" y2="0" stroke="#0284c7" stroke-width="3"/>
    <line x1="-15" y1="0" x2="35" y2="30" stroke="#0284c7" stroke-width="3"/>
    <line x1="0" y1="30" x2="25" y2="-5" stroke="#0284c7" stroke-width="3"/>
    <!-- Handlebars & Basket -->
    <line x1="25" y1="-5" x2="22" y2="-15" stroke="#333" stroke-width="3"/>
    <rect x="25" y="-15" width="18" height="14" rx="2" fill="#d4a373"/>
    <!-- Flower in basket / Difference 2 -->
    ${!isB ? `
    <!-- Red tulip in A -->
    <circle cx="34" cy="-18" r="5" fill="#e11d48"/>
    <line x1="34" y1="-13" x2="34" y2="-8" stroke="#16a34a" stroke-width="1.5"/>
    ` : ''}
  </g>

  <!-- Cobblestone Leaf Cluster / Difference 7 -->
  <g id="leavesGround" transform="translate(120, 442)">
    <polygon points="0,0 8,-8 14,-2 10,8 -2,6" fill="#dc2626"/>
    ${!isB ? `
    <!-- Extra leaves in A -->
    <polygon points="12,4 20,-4 25,2 20,12 8,10" fill="#ea580c"/>
    <polygon points="-8,6 -2,-2 4,4 0,14 -10,12" fill="#ca8a04"/>
    ` : ''}
  </g>
</svg>
`
  },

  // ==========================================
  // PUZZLE 5 (Medium - 7 Differences)
  // Artist's Loft Studio
  // ==========================================
  {
    id: 'artists-loft-studio',
    level: 5,
    difficulty: 'medium',
    title: "Artist's Loft Studio",
    category: 'Home & Living',
    description: 'A light-filled penthouse studio with a wooden easel, sleeping tabby cat, art supplies, and loft skylight.',
    imageWidth: 800,
    imageHeight: 520,
    differences: [
      {
        id: 1,
        x: 48.0, // cx=384, cy=218
        y: 42.0,
        radius: 5.0,
        label: 'Canvas Painting Celestial Motif',
        hint: 'Examine the landscape painted on the easel canvas (sun vs moon).'
      },
      {
        id: 2,
        x: 31.0, // cx=248, cy=426
        y: 82.0,
        radius: 5.0,
        label: 'Sleeping Cat Collar Color',
        hint: 'Check the tiny collar around the neck of the curled cat on the round rug.'
      },
      {
        id: 3,
        x: 88.0, // cx=704, cy=338
        y: 65.0,
        radius: 5.0,
        label: 'Acoustic Guitar Emblem',
        hint: 'Look closely at the lower soundboard body of the acoustic guitar.'
      },
      {
        id: 4,
        x: 16.0, // cx=128, cy=146
        y: 28.0,
        radius: 5.0,
        label: 'Macrame Plant Flower Blossom',
        hint: 'Inspect the foliage inside the hanging macrame woven plant holder.'
      },
      {
        id: 5,
        x: 68.0, // cx=544, cy=83
        y: 16.0,
        radius: 5.0,
        label: 'Bird on Skylight Window Frame',
        hint: 'Look up at the angled glass panes of the ceiling skylight.'
      },
      {
        id: 6,
        x: 61.0, // cx=488, cy=359
        y: 69.0,
        radius: 5.0,
        label: 'Tall Paintbrush Handle Color',
        hint: 'Check the brush handles standing in the ceramic jar on the stool.'
      },
      {
        id: 7,
        x: 85.0, // cx=680, cy=146
        y: 28.0,
        radius: 5.0,
        label: 'Bookshelf Top Shelf Sculpture',
        hint: 'See what ornamental sculpture is resting on the top wooden bookshelf.'
      }
    ],
    renderSvg: (isB) => `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 520" width="800" height="520">
  <defs>
    <linearGradient id="studioWall" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#f2ebe4"/>
      <stop offset="100%" stop-color="#ded3c7"/>
    </linearGradient>
    <linearGradient id="floorWood" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#b0865d"/>
      <stop offset="100%" stop-color="#7a5430"/>
    </linearGradient>
    <linearGradient id="skyLoft" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#60a5fa"/>
      <stop offset="100%" stop-color="#bfdbfe"/>
    </linearGradient>
  </defs>

  <!-- Studio Walls & Floor -->
  <rect width="800" height="520" fill="url(#studioWall)"/>
  <rect x="0" y="380" width="800" height="140" fill="url(#floorWood)"/>
  <!-- Floor Planks -->
  ${[0, 100, 200, 300, 400, 500, 600, 700].map(x => `
    <line x1="${x}" y1="380" x2="${x + 60}" y2="520" stroke="#5c3f24" stroke-width="1.5"/>
  `).join('')}

  <!-- Loft Skylight Window -->
  <g id="skylight" transform="translate(480, 20)">
    <polygon points="0,0 240,0 200,120 0,120" fill="url(#skyLoft)" stroke="#475569" stroke-width="4"/>
    <line x1="80" y1="0" x2="65" y2="120" stroke="#475569" stroke-width="3"/>
    <line x1="160" y1="0" x2="135" y2="120" stroke="#475569" stroke-width="3"/>
    <line x1="0" y1="60" x2="220" y2="60" stroke="#475569" stroke-width="3"/>

    <!-- Bird on Frame / Difference 5 -->
    ${!isB ? `
    <g id="skylightBird" transform="translate(64, 63)">
      <ellipse cx="0" cy="0" rx="6" ry="4" fill="#334155"/>
      <polygon points="5,-1 10,0 5,2" fill="#f59e0b"/>
    </g>
    ` : ''}
  </g>

  <!-- Hanging Macrame Plant / Difference 4 -->
  <g id="hangingPlant" transform="translate(128, 146)">
    <!-- Ropes -->
    <line x1="0" y1="-146" x2="-15" y2="-20" stroke="#d6c7b2" stroke-width="2"/>
    <line x1="0" y1="-146" x2="15" y2="-20" stroke="#d6c7b2" stroke-width="2"/>
    <!-- Clay Pot -->
    <polygon points="-22,-20 22,-20 16,15 -16,15" fill="#ea580c"/>
    <!-- Trailing Foliage -->
    <path d="M-15,10 Q-30,40 -20,70" stroke="#15803d" stroke-width="3" fill="none"/>
    <path d="M0,15 Q-5,50 5,80" stroke="#16a34a" stroke-width="3" fill="none"/>
    <path d="M15,10 Q30,45 22,75" stroke="#15803d" stroke-width="3" fill="none"/>
    <!-- Blossom / Difference 4 -->
    ${!isB ? `
    <!-- White Flower in A -->
    <circle cx="0" cy="30" r="6" fill="#ffffff"/>
    <circle cx="0" cy="30" r="2.5" fill="#facc15"/>
    ` : ''}
  </g>

  <!-- Bookshelf Right / Difference 7 -->
  <g id="bookshelf" transform="translate(680, 146)">
    <rect x="-40" y="-40" width="80" height="200" fill="#854d0e"/>
    <rect x="-35" y="-35" width="70" height="55" fill="#5c360b"/>
    <rect x="-35" y="25" width="70" height="60" fill="#5c360b"/>
    <rect x="-35" y="90" width="70" height="65" fill="#5c360b"/>
    <!-- Books Middle Shelf -->
    <rect x="-30" y="40" width="12" height="42" fill="#b91c1c"/>
    <rect x="-16" y="35" width="14" height="47" fill="#1d4ed8"/>
    <rect x="0" y="45" width="10" height="37" fill="#047857"/>
    <rect x="12" y="38" width="15" height="44" fill="#d97706"/>
    <!-- Top Shelf Item / Difference 7 -->
    ${!isB ? `
    <!-- Classical Bust Statue in A -->
    <circle cx="0" cy="-14" r="9" fill="#f8fafc"/>
    <polygon points="-8,-4 8,-4 12,12 -12,12" fill="#e2e8f0"/>
    ` : `
    <!-- Antique Vase in B -->
    <path d="M-8,14 C-16,0 -6,-15 -10,-20 L10,-20 C6,-15 16,0 8,14 Z" fill="#0284c7"/>
    `}
  </g>

  <!-- Wooden Stool & Brush Jar / Difference 6 -->
  <g id="brushStool" transform="translate(488, 359)">
    <ellipse cx="0" cy="20" rx="28" ry="8" fill="#a16207"/>
    <line x1="-16" y1="24" x2="-22" y2="80" stroke="#78350f" stroke-width="4"/>
    <line x1="16" y1="24" x2="22" y2="80" stroke="#78350f" stroke-width="4"/>
    <!-- Jar -->
    <rect x="-10" y="-8" width="20" height="26" rx="2" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
    <!-- Brushes -->
    <line x1="-4" y1="-6" x2="-10" y2="-28" stroke="#b45309" stroke-width="2.5"/>
    <!-- Tall Brush / Difference 6 -->
    <line x1="2" y1="-6" x2="4" y2="-36" stroke="${!isB ? '#eab308' : '#2563eb'}" stroke-width="3"/>
  </g>

  <!-- Easel with Painting / Difference 1 -->
  <g id="easel" transform="translate(384, 218)">
    <!-- Easel Legs -->
    <line x1="0" y1="-80" x2="-65" y2="200" stroke="#78350f" stroke-width="6"/>
    <line x1="0" y1="-80" x2="65" y2="200" stroke="#78350f" stroke-width="6"/>
    <line x1="0" y1="-80" x2="0" y2="200" stroke="#542407" stroke-width="5"/>
    <rect x="-70" y="55" width="140" height="10" fill="#92400e"/>
    <!-- Stretched Canvas -->
    <rect x="-60" y="-50" width="120" height="100" fill="#ffffff" stroke="#e2e8f0" stroke-width="2"/>
    <!-- Landscape Artwork on Canvas -->
    <rect x="-56" y="-46" width="112" height="92" fill="#bae6fd"/>
    <polygon points="-56,46 0,-10 56,46" fill="#15803d"/>
    <polygon points="-20,46 30,10 56,46" fill="#166534"/>
    <!-- Celestial Motif / Difference 1 -->
    ${!isB ? `
    <!-- Bright Sun in A -->
    <circle cx="30" cy="-24" r="10" fill="#f59e0b"/>
    ` : `
    <!-- Crescent Moon in B -->
    <path d="M26,-34 A10,10 0 0,0 36,-14 A8,8 0 0,1 26,-34 Z" fill="#64748b"/>
    `}
  </g>

  <!-- Sleeping Cat on Round Rug / Difference 2 -->
  <g id="sleepingCat" transform="translate(248, 426)">
    <!-- Braided Rug -->
    <ellipse cx="0" cy="15" rx="65" ry="30" fill="#fde68a" stroke="#f59e0b" stroke-width="3"/>
    <!-- Cat Body -->
    <ellipse cx="0" cy="10" rx="26" ry="18" fill="#ea580c"/>
    <!-- Cat Head -->
    <circle cx="-16" cy="4" r="12" fill="#ea580c"/>
    <polygon points="-24,-3 -18,-3 -22,-10" fill="#c2410c"/>
    <polygon points="-12,-3 -16,-3 -14,-10" fill="#c2410c"/>
    <!-- Sleeping Eyes -->
    <path d="M-22,6 Q-18,10 -14,6" stroke="#7c2d12" stroke-width="1.5" fill="none"/>
    <!-- Collar / Difference 2 -->
    <path d="M-12,12 C-8,14 -8,2 -12,4" stroke="${!isB ? '#dc2626' : '#06b6d4'}" stroke-width="3" fill="none"/>
    <circle cx="-9" cy="8" r="2.5" fill="#facc15"/>
  </g>

  <!-- Acoustic Guitar / Difference 3 -->
  <g id="guitar" transform="translate(704, 338) rotate(-15)">
    <!-- Guitar Body -->
    <ellipse cx="0" cy="45" rx="28" ry="34" fill="#d97706"/>
    <ellipse cx="0" cy="5" rx="22" ry="24" fill="#d97706"/>
    <circle cx="0" cy="15" r="9" fill="#451a03"/>
    <!-- Neck -->
    <rect x="-4" y="-70" width="8" height="75" fill="#78350f"/>
    <!-- Headstock -->
    <rect x="-6" y="-85" width="12" height="18" fill="#451a03"/>
    <!-- Emblem Sticker / Difference 3 -->
    ${isB ? `
    <!-- Star sticker on guitar in B -->
    <polygon points="8,52 11,46 16,46 12,42 14,37 9,40 5,37 6,42 2,46 8,46" fill="#e11d48"/>
    ` : ''}
  </g>
</svg>
`
  },

  // ==========================================
  // PUZZLE 6 (Medium - 7 Differences)
  // Tropical Island Haven
  // ==========================================
  {
    id: 'tropical-island-haven',
    level: 6,
    difficulty: 'medium',
    title: 'Tropical Island Haven',
    category: 'Beach & Vacation',
    description: 'A sun-drenched tropical oasis with white sand, coconut palm, striped umbrella, lounge chair, and turquoise waves.',
    imageWidth: 800,
    imageHeight: 520,
    differences: [
      {
        id: 1,
        x: 26.0, // cx=208, cy=130
        y: 25.0,
        radius: 5.0,
        label: 'Palm Tree Coconut Cluster',
        hint: 'Count the round brown coconuts clustered under the palm fronds.'
      },
      {
        id: 2,
        x: 58.0, // cx=464, cy=198
        y: 38.0,
        radius: 5.0,
        label: 'Beach Umbrella Stripe Color',
        hint: 'Observe the alternating colored wedges of the striped beach umbrella.'
      },
      {
        id: 3,
        x: 43.0, // cx=344, cy=374
        y: 72.0,
        radius: 5.0,
        label: 'Fruit Drink Garnish & Straw',
        hint: 'Inspect the garnish and straw in the tropical smoothie on the side table.'
      },
      {
        id: 4,
        x: 84.0, // cx=672, cy=203
        y: 39.0,
        radius: 5.0,
        label: 'Horizon Sailboat Sail Color',
        hint: 'Look far out across the ocean horizon at the passing sailboat.'
      },
      {
        id: 5,
        x: 66.0, // cx=528, cy=88
        y: 17.0,
        radius: 5.0,
        label: 'Soaring Seagull in Sky',
        hint: 'Count the white seagulls gliding high above the ocean water.'
      },
      {
        id: 6,
        x: 73.0, // cx=584, cy=421
        y: 81.0,
        radius: 5.0,
        label: 'Beach Towel Pattern',
        hint: 'Examine the decorative pattern printed on the beach towel.'
      },
      {
        id: 7,
        x: 14.0, // cx=112, cy=426
        y: 82.0,
        radius: 5.0,
        label: 'Seashell Shape on Tideline',
        hint: 'Notice the shape of the large seashell resting at the wet water line.'
      }
    ],
    renderSvg: (isB) => `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 520" width="800" height="520">
  <defs>
    <linearGradient id="tropSky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#38bdf8"/>
      <stop offset="65%" stop-color="#bae6fd"/>
      <stop offset="100%" stop-color="#fed7aa"/>
    </linearGradient>
    <linearGradient id="tropSea" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0284c7"/>
      <stop offset="45%" stop-color="#06b6d4"/>
      <stop offset="100%" stop-color="#2dd4bf"/>
    </linearGradient>
    <linearGradient id="beachSand" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#fef08a"/>
      <stop offset="100%" stop-color="#fde047"/>
    </linearGradient>
  </defs>

  <!-- Sky -->
  <rect width="800" height="520" fill="url(#tropSky)"/>
  <!-- Glowing Sun -->
  <circle cx="120" cy="90" r="45" fill="#fef08a" opacity="0.8"/>

  <!-- Seagulls / Difference 5 -->
  <g stroke="#ffffff" stroke-width="2" fill="none" stroke-linecap="round">
    <path d="M460,70 Q468,64 476,70 Q484,64 492,70"/>
    <path d="M590,80 Q598,74 606,80 Q614,74 622,80"/>
    ${!isB ? `
    <!-- 3rd Seagull in A -->
    <path d="M520,88 Q528,82 536,88 Q544,82 552,88"/>
    ` : ''}
  </g>

  <!-- Distant Island Silhouette -->
  <polygon points="620,220 680,195 760,220" fill="#0d9488" opacity="0.4"/>

  <!-- Sailboat on Horizon / Difference 4 -->
  <g id="sailboat" transform="translate(672, 203)">
    <polygon points="-14,8 14,8 10,14 -10,14" fill="#78350f"/>
    <line x1="0" y1="8" x2="0" y2="-18" stroke="#333333" stroke-width="1.5"/>
    <!-- Sail Color / Difference 4 -->
    <polygon points="0,-16 12,6 0,6" fill="${!isB ? '#ffffff' : '#facc15'}"/>
  </g>

  <!-- Turquoise Ocean Waves -->
  <path d="M0,210 Q400,200 800,210 L800,320 Q400,340 0,320 Z" fill="url(#tropSea)"/>
  <!-- Foamy Tide -->
  <path d="M0,315 Q400,335 800,315 L800,330 Q400,350 0,330 Z" fill="#ffffff" opacity="0.6"/>

  <!-- Sandy Beach -->
  <path d="M0,325 Q400,345 800,325 L800,520 L0,520 Z" fill="url(#beachSand)"/>

  <!-- Leaning Coconut Palm Tree / Difference 1 -->
  <g id="palmTree">
    <!-- Curved Trunk -->
    <path d="M80,520 Q120,320 208,130" stroke="#78350f" stroke-width="26" fill="none" stroke-linecap="round"/>
    <path d="M80,520 Q120,320 208,130" stroke="#9a3412" stroke-width="20" fill="none" stroke-linecap="round"/>
    <!-- Palm Fronds -->
    <g fill="#15803d">
      <path d="M208,130 Q160,80 80,100 Q150,115 208,130 Z"/>
      <path d="M208,130 Q190,50 140,40 Q180,80 208,130 Z"/>
      <path d="M208,130 Q240,40 290,50 Q245,85 208,130 Z"/>
      <path d="M208,130 Q270,90 330,120 Q260,125 208,130 Z"/>
      <path d="M208,130 Q230,160 270,210 Q225,170 208,130 Z"/>
      <path d="M208,130 Q160,170 120,200 Q165,160 208,130 Z"/>
    </g>
    <!-- Coconuts / Difference 1 -->
    <circle cx="204" cy="136" r="7" fill="#451a03"/>
    <circle cx="214" cy="138" r="7" fill="#451a03"/>
    ${!isB ? `
    <!-- 3rd Coconut in A -->
    <circle cx="208" cy="146" r="7" fill="#451a03"/>
    ` : ''}
  </g>

  <!-- Striped Beach Umbrella / Difference 2 -->
  <g id="umbrella" transform="translate(464, 198)">
    <line x1="0" y1="0" x2="-20" y2="170" stroke="#cbd5e1" stroke-width="5"/>
    <!-- Canopy Segments -->
    <path d="M-80,0 Q0,-70 80,0 Z" fill="#ffffff"/>
    <path d="M-50,-24 Q0,-70 50,-24 Q0,-45 -50,-24 Z" fill="#38bdf8"/>
    <!-- Center Stripe / Difference 2 -->
    <path d="M-20,-50 Q0,-70 20,-50 Q0,-58 -20,-50 Z" fill="${!isB ? '#f43f5e' : '#84cc16'}"/>
  </g>

  <!-- Wooden Lounge Chair -->
  <g id="loungeChair" transform="translate(560, 360)">
    <polygon points="-60,10 -20,15 60,-35 70,-30 -15,22 -60,16" fill="#854d0e"/>
    <line x1="-50" y1="14" x2="-55" y2="35" stroke="#78350f" stroke-width="4"/>
    <line x1="-15" y1="18" x2="-15" y2="35" stroke="#78350f" stroke-width="4"/>
    <line x1="45" y1="-20" x2="35" y2="25" stroke="#78350f" stroke-width="4"/>
  </g>

  <!-- Side Table & Tropical Drink / Difference 3 -->
  <g id="drinkTable" transform="translate(344, 374)">
    <ellipse cx="0" cy="15" rx="24" ry="8" fill="#a16207"/>
    <line x1="0" y1="15" x2="0" y2="45" stroke="#78350f" stroke-width="4"/>
    <!-- Glass with Juice -->
    <polygon points="-8,-6 8,-6 6,14 -6,14" fill="#fb923c"/>
    <!-- Straw / Garnish Difference 3 -->
    ${!isB ? `
    <!-- Spiral Straw in A -->
    <line x1="0" y1="6" x2="6" y2="-18" stroke="#ef4444" stroke-width="2.5" stroke-linecap="round"/>
    ` : `
    <!-- Cocktail Umbrella Pick in B -->
    <line x1="0" y1="6" x2="-8" y2="-16" stroke="#0ea5e9" stroke-width="2"/>
    <polygon points="-12,-18 -4,-18 -8,-24" fill="#f43f5e"/>
    `}
  </g>

  <!-- Beach Towel on Sand / Difference 6 -->
  <g id="towel" transform="translate(584, 421) rotate(10)">
    <rect x="-40" y="-18" width="80" height="36" rx="4" fill="#6366f1"/>
    <!-- Pattern / Difference 6 -->
    ${!isB ? `
    <!-- Zigzag stripes in A -->
    <path d="M-30,-10 L-20,0 L-10,-10 L0,0 L10,-10 L20,0 L30,-10" stroke="#ffffff" stroke-width="2" fill="none"/>
    <path d="M-30,0 L-20,10 L-10,0 L0,10 L10,0 L20,10 L30,0" stroke="#ffffff" stroke-width="2" fill="none"/>
    ` : `
    <!-- Polka dots in B -->
    <circle cx="-25" cy="-5" r="3" fill="#ffffff"/>
    <circle cx="-5" cy="-5" r="3" fill="#ffffff"/>
    <circle cx="15" cy="-5" r="3" fill="#ffffff"/>
    <circle cx="-15" cy="5" r="3" fill="#ffffff"/>
    <circle cx="5" cy="5" r="3" fill="#ffffff"/>
    <circle cx="25" cy="5" r="3" fill="#ffffff"/>
    `}
  </g>

  <!-- Seashell on Beach Tideline / Difference 7 -->
  <g id="beachShell" transform="translate(112, 426)">
    ${!isB ? `
    <!-- Spiral Conch Shell in A -->
    <path d="M0,0 Q16,-14 26,-4 Q16,8 0,0 Z" fill="#fed7aa"/>
    <path d="M4,-1 Q14,-10 20,-3" stroke="#f97316" stroke-width="1.5" fill="none"/>
    ` : `
    <!-- Smooth Clam Shell in B -->
    <path d="M0,6 C6,-12 20,-12 26,6 Z" fill="#fed7aa"/>
    <line x1="13" y1="-8" x2="13" y2="6" stroke="#f97316" stroke-width="1.5"/>
    `}
  </g>
</svg>
`
  },

  // ==========================================
  // PUZZLE 7 (Hard - 10 Differences)
  // Stargazer's Observatory
  // ==========================================
  {
    id: 'stargazers-observatory',
    level: 7,
    difficulty: 'hard',
    title: "Stargazer's Observatory",
    category: 'Travel & Space',
    description: 'A hilltop astronomical dome beneath a cosmic nebula with brass telescope, star charts, and computer console.',
    imageWidth: 800,
    imageHeight: 520,
    differences: [
      {
        id: 1,
        x: 18.0, // cx=144, cy=94
        y: 18.0,
        radius: 4.5,
        label: 'Crescent Moon Surface Crater',
        hint: 'Inspect the glowing crescent moon in the deep starry sky.'
      },
      {
        id: 2,
        x: 38.0, // cx=304, cy=62
        y: 12.0,
        radius: 4.5,
        label: 'Constellation Star Count',
        hint: 'Count the bright connected stars making up the constellation.'
      },
      {
        id: 3,
        x: 52.0, // cx=416, cy=166
        y: 32.0,
        radius: 4.5,
        label: 'Telescope Brass Trim Ring',
        hint: 'Examine the decorative brass bands around the great telescope barrel.'
      },
      {
        id: 4,
        x: 74.0, // cx=592, cy=333
        y: 64.0,
        radius: 4.5,
        label: 'Computer Monitor Display',
        hint: 'Check the graph shown on the glowing monitor screen.'
      },
      {
        id: 5,
        x: 62.0, // cx=496, cy=405
        y: 78.0,
        radius: 4.5,
        label: 'Brass Astrolabe Pointer Angle',
        hint: 'Notice the angle of the pointer needle on the brass astrolabe.'
      },
      {
        id: 6,
        x: 86.0, // cx=688, cy=177
        y: 34.0,
        radius: 4.5,
        label: 'Star Chart Pushpin Color',
        hint: 'Check the small pushpin tack holding the star map to the board.'
      },
      {
        id: 7,
        x: 45.0, // cx=360, cy=104
        y: 20.0,
        radius: 4.5,
        label: 'Dome Shutter Rivet Count',
        hint: 'Count the round silver rivets along the dome shutter seam.'
      },
      {
        id: 8,
        x: 12.0, // cx=96, cy=354
        y: 68.0,
        radius: 4.5,
        label: 'Observatory Cat Eye Gaze',
        hint: 'Look closely at the cat sitting by the stone sill.'
      },
      {
        id: 9,
        x: 81.0, // cx=648, cy=426
        y: 82.0,
        radius: 4.5,
        label: 'Coffee Mug Emblem',
        hint: 'Examine the emblem graphic printed on the astronomer coffee mug.'
      },
      {
        id: 10,
        x: 27.0, // cx=216, cy=291
        y: 56.0,
        radius: 4.5,
        label: 'Window Shutter Brass Latch',
        hint: 'Look for a small brass metal latch on the window frame.'
      }
    ],
    renderSvg: (isB) => `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 520" width="800" height="520">
  <defs>
    <linearGradient id="spaceSky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#050814"/>
      <stop offset="60%" stop-color="#0f172a"/>
      <stop offset="100%" stop-color="#1e1b4b"/>
    </linearGradient>
    <linearGradient id="nebulaGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#ec4899"/>
      <stop offset="50%" stop-color="#8b5cf6"/>
      <stop offset="100%" stop-color="#3b82f6"/>
    </linearGradient>
  </defs>

  <!-- Deep Night Sky -->
  <rect width="800" height="520" fill="url(#spaceSky)"/>

  <!-- Cosmic Nebula Glow -->
  <circle cx="280" cy="110" r="140" fill="url(#nebulaGrad)" opacity="0.25" filter="blur(30px)"/>

  <!-- Stars -->
  <g fill="#ffffff">
    <circle cx="60" cy="40" r="1.5"/>
    <circle cx="120" cy="80" r="1.2"/>
    <circle cx="210" cy="35" r="1.8"/>
    <circle cx="250" cy="90" r="1.0"/>
    <circle cx="480" cy="50" r="1.5"/>
    <circle cx="530" cy="95" r="1.2"/>
    <circle cx="650" cy="45" r="2.0"/>
    <circle cx="720" cy="70" r="1.4"/>
  </g>

  <!-- Crescent Moon / Difference 1 -->
  <g id="moon" transform="translate(144, 94)">
    <path d="M-20,-20 A30,30 0 0,0 20,20 A24,24 0 0,1 -20,-20 Z" fill="#fef08a"/>
    <!-- Crater / Difference 1 -->
    ${!isB ? `
    <circle cx="-2" cy="6" r="3.5" fill="#ca8a04" opacity="0.6"/>
    ` : ''}
  </g>

  <!-- Constellation / Difference 2 -->
  <g id="constellation" transform="translate(304, 62)">
    <circle cx="-30" cy="0" r="3" fill="#38bdf8"/>
    <circle cx="-10" cy="-14" r="3" fill="#38bdf8"/>
    <circle cx="10" cy="-6" r="3" fill="#38bdf8"/>
    <circle cx="28" cy="-18" r="3" fill="#38bdf8"/>
    <line x1="-30" y1="0" x2="-10" y2="-14" stroke="#38bdf8" stroke-width="1.2" opacity="0.6"/>
    <line x1="-10" y1="-14" x2="10" y2="-6" stroke="#38bdf8" stroke-width="1.2" opacity="0.6"/>
    <line x1="10" y1="-6" x2="28" y2="-18" stroke="#38bdf8" stroke-width="1.2" opacity="0.6"/>
    ${isB ? `
    <!-- Extra 5th star & line in B -->
    <circle cx="42" cy="-8" r="3" fill="#38bdf8"/>
    <line x1="28" y1="-18" x2="42" y2="-8" stroke="#38bdf8" stroke-width="1.2" opacity="0.6"/>
    ` : ''}
  </g>

  <!-- Observatory Dome Opening -->
  <g id="domeOpening">
    <!-- Left dome wall curve -->
    <path d="M0,0 L0,520 L260,520 L260,240 Q180,180 180,0 Z" fill="#1e293b"/>
    <!-- Dome Slit Shutter & Rivets / Difference 7 -->
    <rect x="340" y="0" width="30" height="200" fill="#334155"/>
    <line x1="355" y1="0" x2="355" y2="200" stroke="#0f172a" stroke-width="2"/>
    <!-- Rivets -->
    <circle cx="355" cy="40" r="3" fill="#94a3b8"/>
    <circle cx="355" cy="90" r="3" fill="#94a3b8"/>
    ${!isB ? `
    <!-- 3rd Rivet in A -->
    <circle cx="355" cy="140" r="3" fill="#94a3b8"/>
    ` : ''}
  </g>

  <!-- Great Telescope / Difference 3 -->
  <g id="telescope" transform="translate(416, 166) rotate(-35)">
    <!-- Tripod Mount -->
    <line x1="0" y1="0" x2="-40" y2="160" stroke="#475569" stroke-width="12"/>
    <line x1="0" y1="0" x2="40" y2="160" stroke="#475569" stroke-width="12"/>
    <!-- Barrel -->
    <rect x="-24" y="-120" width="48" height="200" rx="6" fill="#1e3a8a"/>
    <!-- Brass trim rings / Difference 3 -->
    <rect x="-26" y="-70" width="52" height="8" rx="2" fill="#d97706"/>
    ${!isB ? `
    <!-- Double brass ring in A -->
    <rect x="-26" y="-56" width="52" height="8" rx="2" fill="#d97706"/>
    ` : ''}
    <!-- Eyepiece -->
    <rect x="-10" y="80" width="20" height="30" fill="#0f172a"/>
  </g>

  <!-- Observatory Window Frame / Difference 10 -->
  <g id="windowFrame" transform="translate(216, 291)">
    <rect x="-20" y="-30" width="40" height="60" fill="none" stroke="#475569" stroke-width="4"/>
    <!-- Latch / Difference 10 -->
    ${!isB ? `
    <!-- Brass latch in A -->
    <rect x="14" y="-4" width="8" height="12" rx="1" fill="#f59e0b"/>
    ` : ''}
  </g>

  <!-- Observatory Cat / Difference 8 -->
  <g id="cat" transform="translate(96, 354)">
    <ellipse cx="0" cy="12" rx="18" ry="14" fill="#0f172a"/>
    <circle cx="2" cy="-4" r="10" fill="#0f172a"/>
    <polygon points="-4,-16 0,-16 -2,-10" fill="#0f172a"/>
    <polygon points="4,-16 8,-16 6,-10" fill="#0f172a"/>
    <!-- Cat Eyes Gaze / Difference 8 -->
    ${!isB ? `
    <!-- Looking up at stars in A -->
    <circle cx="0" cy="-6" r="2" fill="#22c55e"/>
    <circle cx="6" cy="-6" r="2" fill="#22c55e"/>
    ` : `
    <!-- Looking straight at viewer in B -->
    <circle cx="0" cy="-3" r="2" fill="#22c55e"/>
    <circle cx="6" cy="-3" r="2" fill="#22c55e"/>
    `}
  </g>

  <!-- Control Desk Console -->
  <rect x="420" y="360" width="380" height="160" fill="#0f172a"/>
  <rect x="400" y="350" width="400" height="16" fill="#334155"/>

  <!-- Computer Monitor / Difference 4 -->
  <g id="monitor" transform="translate(592, 333)">
    <rect x="-40" y="-35" width="80" height="50" rx="3" fill="#1e293b" stroke="#475569" stroke-width="2"/>
    <rect x="-35" y="-30" width="70" height="40" fill="#020617"/>
    <!-- Monitor graphic / Difference 4 -->
    ${!isB ? `
    <!-- Orbit Ellipse in A -->
    <ellipse cx="0" cy="-10" rx="24" ry="10" fill="none" stroke="#38bdf8" stroke-width="2"/>
    <circle cx="8" cy="-10" r="3" fill="#f43f5e"/>
    ` : `
    <!-- Bar Graph in B -->
    <rect x="-24" y="-4" width="8" height="12" fill="#22c55e"/>
    <rect x="-12" y="-12" width="8" height="20" fill="#22c55e"/>
    <rect x="0" y="-8" width="8" height="16" fill="#22c55e"/>
    <rect x="12" y="-18" width="8" height="26" fill="#22c55e"/>
    `}
    <rect x="-6" y="15" width="12" height="15" fill="#334155"/>
  </g>

  <!-- Astrolabe on Desk / Difference 5 -->
  <g id="astrolabe" transform="translate(496, 405)">
    <circle cx="0" cy="0" r="20" fill="#b45309" stroke="#f59e0b" stroke-width="2"/>
    <circle cx="0" cy="0" r="14" fill="#78350f"/>
    <!-- Pointer Needle Angle / Difference 5 -->
    ${!isB ? `
    <!-- 45 degrees in A -->
    <line x1="-12" y1="12" x2="12" y2="-12" stroke="#fde047" stroke-width="3" stroke-linecap="round"/>
    ` : `
    <!-- 90 degrees vertical in B -->
    <line x1="0" y1="16" x2="0" y2="-16" stroke="#fde047" stroke-width="3" stroke-linecap="round"/>
    `}
  </g>

  <!-- Astronomer Coffee Mug / Difference 9 -->
  <g id="astroMug" transform="translate(648, 426)">
    <rect x="-10" y="-14" width="20" height="24" rx="2" fill="#f8fafc"/>
    <path d="M10,-8 C16,-8 16,4 10,4" stroke="#f8fafc" stroke-width="3" fill="none"/>
    <!-- Mug graphic / Difference 9 -->
    ${!isB ? `
    <!-- Saturn Ring Logo in A -->
    <ellipse cx="0" cy="-2" rx="6" ry="2" fill="none" stroke="#6366f1" stroke-width="1.5"/>
    <circle cx="0" cy="-2" r="3" fill="#6366f1"/>
    ` : `
    <!-- Rocket Logo in B -->
    <polygon points="0,-8 3,-2 -3,-2" fill="#ef4444"/>
    <rect x="-2" y="-2" width="4" height="6" fill="#ef4444"/>
    `}
  </g>

  <!-- Star Chart on Wall & Pushpin / Difference 6 -->
  <g id="starChart" transform="translate(688, 177)">
    <rect x="-35" y="-45" width="70" height="90" fill="#0f172a" stroke="#475569" stroke-width="2"/>
    <ellipse cx="0" cy="0" rx="24" ry="24" fill="none" stroke="#38bdf8" stroke-dasharray="2,2"/>
    <!-- Pushpin / Difference 6 -->
    <circle cx="-28" cy="-38" r="4" fill="${!isB ? '#ef4444' : '#22c55e'}"/>
  </g>
</svg>
`
  },

  // ==========================================
  // PUZZLE 8 (Hard - 10 Differences)
  // Old Town Market Plaza
  // ==========================================
  {
    id: 'old-town-market-plaza',
    level: 8,
    difficulty: 'hard',
    title: 'Old Town Market Plaza',
    category: 'City Scenes',
    description: 'A vibrant European merchant square featuring half-timbered houses, stone fountain, fruit vendor, and clock tower.',
    imageWidth: 800,
    imageHeight: 520,
    differences: [
      {
        id: 1,
        x: 48.0, // cx=384, cy=52
        y: 10.0,
        radius: 4.5,
        label: 'Clock Tower Weather Vane',
        hint: 'Inspect the top spire tip of the distant clock tower.'
      },
      {
        id: 2,
        x: 32.0, // cx=256, cy=286
        y: 55.0,
        radius: 4.5,
        label: 'Fountain Water Spout Flow',
        hint: 'Check the water streaming from the carved fountain head.'
      },
      {
        id: 3,
        x: 72.0, // cx=576, cy=239
        y: 46.0,
        radius: 4.5,
        label: 'Fruit Cart Awning Fringe',
        hint: 'Examine the fabric edge of the market cart awning.'
      },
      {
        id: 4,
        x: 78.0, // cx=624, cy=353
        y: 68.0,
        radius: 4.5,
        label: 'Market Crate Fruit Color',
        hint: 'Check the color of the apples stored in the wooden crate.'
      },
      {
        id: 5,
        x: 61.0, // cx=488, cy=135
        y: 26.0,
        radius: 4.5,
        label: 'Dormer Window Shutter',
        hint: 'Look at the upper dormer window shutter on the right timber house.'
      },
      {
        id: 6,
        x: 21.0, // cx=168, cy=198
        y: 38.0,
        radius: 4.5,
        label: 'Hanging Flower Basket Petals',
        hint: 'Observe the floral color of the hanging flower planter.'
      },
      {
        id: 7,
        x: 44.0, // cx=352, cy=395
        y: 76.0,
        radius: 4.5,
        label: 'Cafe Table Cloth Napkin',
        hint: 'Notice what is placed on top of the outdoor bistro table.'
      },
      {
        id: 8,
        x: 56.0, // cx=448, cy=452
        y: 87.0,
        radius: 4.5,
        label: 'Street Drain Grate Shape',
        hint: 'Look down at the iron drainage grate on the cobblestones.'
      },
      {
        id: 9,
        x: 17.0, // cx=136, cy=78
        y: 15.0,
        radius: 4.5,
        label: 'Rooftop Chimney Cap',
        hint: 'Inspect the top chimney pot on the left brick roofline.'
      },
      {
        id: 10,
        x: 91.0, // cx=728, cy=301
        y: 58.0,
        radius: 4.5,
        label: 'Wrought Iron Gate Finial',
        hint: 'Check the decorative tip ornament on the iron gate pillar.'
      }
    ],
    renderSvg: (isB) => `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 520" width="800" height="520">
  <defs>
    <linearGradient id="townSky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#3b82f6"/>
      <stop offset="60%" stop-color="#93c5fd"/>
      <stop offset="100%" stop-color="#fef08a"/>
    </linearGradient>
    <linearGradient id="stoneGround" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#94a3b8"/>
      <stop offset="100%" stop-color="#64748b"/>
    </linearGradient>
  </defs>

  <!-- Sky -->
  <rect width="800" height="520" fill="url(#townSky)"/>

  <!-- Clock Tower Center & Weather Vane / Difference 1 -->
  <g id="clockTower" transform="translate(384, 120)">
    <rect x="-30" y="-70" width="60" height="180" fill="#cbd5e1" stroke="#94a3b8" stroke-width="2"/>
    <polygon points="-35,-70 35,-70 0,-140" fill="#334155"/>
    <!-- Clock face -->
    <circle cx="0" cy="-20" r="18" fill="#ffffff" stroke="#1e293b" stroke-width="2"/>
    <line x1="0" y1="-20" x2="0" y2="-30" stroke="#000" stroke-width="2"/>
    <line x1="0" y1="-20" x2="8" y2="-20" stroke="#000" stroke-width="2"/>
    <!-- Weather Vane / Difference 1 -->
    <line x1="0" y1="-140" x2="0" y2="-160" stroke="#d97706" stroke-width="2"/>
    ${!isB ? `
    <!-- Rooster vane in A -->
    <polygon points="0,-162 10,-165 4,-160 10,-156" fill="#d97706"/>
    ` : ''}
  </g>

  <!-- Left Merchant House & Chimney / Difference 9 -->
  <g id="leftHouse">
    <polygon points="0,220 220,160 220,400 0,400" fill="#f8fafc"/>
    <!-- Roof -->
    <polygon points="0,220 120,60 240,160" fill="#b91c1c"/>
    <!-- Chimney / Difference 9 -->
    <rect x="126" y="45" width="20" height="35" fill="#7f1d1d"/>
    ${!isB ? `
    <!-- Chimney Pot on top in A -->
    <ellipse cx="136" cy="45" rx="8" ry="4" fill="#991b1b"/>
    <rect x="132" y="35" width="8" height="10" fill="#b91c1c"/>
    ` : `
    <rect x="124" y="42" width="24" height="5" fill="#450a0a"/>
    `}
    <!-- Timber Beams -->
    <line x1="30" y1="210" x2="30" y2="400" stroke="#78350f" stroke-width="5"/>
    <line x1="100" y1="190" x2="100" y2="400" stroke="#78350f" stroke-width="5"/>
    <line x1="170" y1="170" x2="170" y2="400" stroke="#78350f" stroke-width="5"/>
    <!-- Hanging Flower Basket / Difference 6 -->
    <g id="hangingBasket" transform="translate(168, 198)">
      <line x1="0" y1="-15" x2="0" y2="0" stroke="#333" stroke-width="2"/>
      <ellipse cx="0" cy="5" rx="14" ry="7" fill="#78350f"/>
      <!-- Flower Petals / Difference 6 -->
      <circle cx="-6" cy="2" r="5" fill="${!isB ? '#a855f7' : '#ef4444'}"/>
      <circle cx="0" cy="-2" r="6" fill="${!isB ? '#a855f7' : '#ef4444'}"/>
      <circle cx="6" cy="2" r="5" fill="${!isB ? '#a855f7' : '#ef4444'}"/>
    </g>
  </g>

  <!-- Right Half-Timbered House & Dormer / Difference 5 -->
  <g id="rightHouse">
    <rect x="460" y="80" width="340" height="320" fill="#fef3c7"/>
    <polygon points="440,80 620,0 800,80" fill="#991b1b"/>
    <!-- Timber Cross Beams -->
    <line x1="460" y1="180" x2="800" y2="180" stroke="#542407" stroke-width="5"/>
    <line x1="460" y1="280" x2="800" y2="280" stroke="#542407" stroke-width="5"/>
    <!-- Dormer Window & Shutter / Difference 5 -->
    <g id="dormer" transform="translate(488, 135)">
      <rect x="-18" y="-18" width="36" height="36" fill="#1e293b"/>
      <!-- Shutter: Open in A, Closed in B -->
      ${!isB ? `
      <rect x="18" y="-18" width="16" height="36" fill="#15803d"/>
      ` : `
      <rect x="0" y="-18" width="18" height="36" fill="#15803d"/>
      `}
    </g>
  </g>

  <!-- Cobblestone Square Floor & Drain / Difference 8 -->
  <path d="M0,360 L800,360 L800,520 L0,520 Z" fill="url(#stoneGround)"/>
  <!-- Street Drain / Difference 8 -->
  <g id="drain" transform="translate(448, 452)">
    ${!isB ? `
    <!-- Square iron grate in A -->
    <rect x="-12" y="-8" width="24" height="16" fill="#1e293b"/>
    <line x1="-8" y1="-8" x2="-8" y2="8" stroke="#64748b" stroke-width="2"/>
    <line x1="0" y1="-8" x2="0" y2="8" stroke="#64748b" stroke-width="2"/>
    <line x1="8" y1="-8" x2="8" y2="8" stroke="#64748b" stroke-width="2"/>
    ` : `
    <!-- Round iron grate in B -->
    <circle cx="0" cy="0" r="10" fill="#1e293b"/>
    <line x1="-8" y1="0" x2="8" y2="0" stroke="#64748b" stroke-width="2"/>
    <line x1="0" y1="-8" x2="0" y2="8" stroke="#64748b" stroke-width="2"/>
    `}
  </g>

  <!-- Central Stone Fountain & Water Spout / Difference 2 -->
  <g id="fountain" transform="translate(256, 310)">
    <!-- Base Basin -->
    <ellipse cx="0" cy="50" rx="70" ry="22" fill="#64748b"/>
    <ellipse cx="0" cy="45" rx="60" ry="16" fill="#38bdf8"/>
    <!-- Pedestal & Spout -->
    <rect x="-15" y="-30" width="30" height="75" fill="#475569"/>
    <!-- Fish Spout Stream / Difference 2 -->
    ${!isB ? `
    <!-- Water flowing in A -->
    <path d="M-15,-20 Q-35,-10 -40,40" stroke="#bae6fd" stroke-width="3" fill="none"/>
    <path d="M15,-20 Q35,-10 40,40" stroke="#bae6fd" stroke-width="3" fill="none"/>
    ` : `
    <!-- Left spout dry in B -->
    <path d="M15,-20 Q35,-10 40,40" stroke="#bae6fd" stroke-width="3" fill="none"/>
    `}
  </g>

  <!-- Fruit Cart & Awning / Differences 3 & 4 -->
  <g id="fruitCart" transform="translate(600, 310)">
    <!-- Wooden cart frame & wheel -->
    <rect x="-40" y="30" width="90" height="50" fill="#854d0e"/>
    <circle cx="5" cy="80" r="22" fill="none" stroke="#451a03" stroke-width="4"/>
    <!-- Awning / Difference 3 -->
    <polygon points="-50,0 60,0 55,-35 -45,-35" fill="#eab308"/>
    <!-- Fringe: Scalloped in A, Straight in B -->
    ${!isB ? `
    <path d="M-50,0 Q-40,10 -30,0 Q-20,10 -10,0 Q0,10 10,0 Q20,10 30,0 Q40,10 50,0 Q55,10 60,0" stroke="#ca8a04" stroke-width="2" fill="none"/>
    ` : `
    <line x1="-50" y1="0" x2="60" y2="0" stroke="#ffffff" stroke-width="3"/>
    `}
    <!-- Fruit Crate / Difference 4 -->
    <rect x="10" y="32" width="28" height="18" fill="#a16207"/>
    <!-- Apples: Red in A, Green in B -->
    <circle cx="18" cy="38" r="4.5" fill="${!isB ? '#dc2626' : '#65a30d'}"/>
    <circle cx="28" cy="38" r="4.5" fill="${!isB ? '#dc2626' : '#65a30d'}"/>
  </g>

  <!-- Cafe Table & Napkin / Difference 7 -->
  <g id="cafeTable" transform="translate(352, 395)">
    <ellipse cx="0" cy="18" rx="28" ry="10" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
    <line x1="0" y1="20" x2="0" y2="55" stroke="#333" stroke-width="4"/>
    <!-- Napkin / Difference 7 -->
    ${!isB ? `
    <!-- Folded cloth napkin in A -->
    <polygon points="-8,14 4,14 0,8" fill="#ef4444"/>
    ` : ''}
  </g>

  <!-- Wrought Iron Gate Pillar & Finial / Difference 10 -->
  <g id="ironGate" transform="translate(728, 301)">
    <rect x="-10" y="0" width="20" height="120" fill="#1e293b"/>
    <!-- Finial / Difference 10 -->
    ${!isB ? `
    <!-- Fleur-de-lis tip in A -->
    <polygon points="0,-18 6,-8 0,-4 -6,-8" fill="#d97706"/>
    ` : `
    <!-- Round ball finial in B -->
    <circle cx="0" cy="-10" r="7" fill="#d97706"/>
    `}
  </g>
</svg>
`
  },

  // ==========================================
  // PUZZLE 9 (Hard - 10 Differences)
  // Enchanted Forest Grove
  // ==========================================
  {
    id: 'enchanted-forest-grove',
    level: 9,
    difficulty: 'hard',
    title: 'Enchanted Forest Grove',
    category: 'Fantasy & Nature',
    description: 'A magical woodland glade with a hollow ancient oak, fairy stone bridge, glowing fireflies, and gentle fawn.',
    imageWidth: 800,
    imageHeight: 520,
    differences: [
      {
        id: 1,
        x: 35.0, // cx=280, cy=177
        y: 34.0,
        radius: 4.5,
        label: 'Glowing Lantern Crystal Color',
        hint: 'Examine the glowing crystal lantern hanging from the high branch.'
      },
      {
        id: 2,
        x: 58.0, // cx=464, cy=135
        y: 26.0,
        radius: 4.5,
        label: 'Perched Barn Owl Winking Eye',
        hint: 'Look closely at the face of the barn owl perched on the bough.'
      },
      {
        id: 3,
        x: 24.0, // cx=192, cy=405
        y: 78.0,
        radius: 4.5,
        label: 'Mushroom Fairy Ring Cap Spots',
        hint: 'Inspect the spots on the red mushroom cap in the mossy grass.'
      },
      {
        id: 4,
        x: 65.0, // cx=520, cy=322
        y: 62.0,
        radius: 4.5,
        label: 'Fairy Stone Bridge Carved Rune',
        hint: 'Look for a carved spiral rune etched on the stone bridge arch.'
      },
      {
        id: 5,
        x: 46.0, // cx=368, cy=385
        y: 74.0,
        radius: 4.5,
        label: 'Sleeping Fawn Deer Spots',
        hint: 'Count the white dappled spots on the sleeping fawn deer.'
      },
      {
        id: 6,
        x: 76.0, // cx=608, cy=416
        y: 80.0,
        radius: 4.5,
        label: 'Creek Water Lily Blossom Color',
        hint: 'Check the flower petals of the floating water lily in the stream.'
      },
      {
        id: 7,
        x: 22.0, // cx=176, cy=166
        y: 32.0,
        radius: 4.5,
        label: 'Ancient Oak Twig Leaf Color',
        hint: 'Examine the leaf color on the small twig branching from the hollow oak.'
      },
      {
        id: 8,
        x: 42.0, // cx=336, cy=250
        y: 48.0,
        radius: 4.5,
        label: 'Floating Firefly Orb Count',
        hint: 'Count the glowing magic fireflies hovering near the hollow tree trunk.'
      },
      {
        id: 9,
        x: 30.0, // cx=240, cy=291
        y: 56.0,
        radius: 4.5,
        label: 'Tree Bark Grain Knot',
        hint: 'Look at the swirling bark grain texture on the lower tree trunk.'
      },
      {
        id: 10,
        x: 88.0, // cx=704, cy=364
        y: 70.0,
        radius: 4.5,
        label: 'Bluebell Flower Floret Count',
        hint: 'Count the delicate bell blossoms hanging on the wild bluebell stem.'
      }
    ],
    renderSvg: (isB) => `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 520" width="800" height="520">
  <defs>
    <linearGradient id="magicSky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#091e1d"/>
      <stop offset="50%" stop-color="#113833"/>
      <stop offset="100%" stop-color="#1f5445"/>
    </linearGradient>
    <linearGradient id="creekGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0284c7"/>
      <stop offset="50%" stop-color="#38bdf8"/>
      <stop offset="100%" stop-color="#818cf8"/>
    </linearGradient>
  </defs>

  <!-- Mystical Twilight Forest Background -->
  <rect width="800" height="520" fill="url(#magicSky)"/>

  <!-- Sun Dappled Beams -->
  <g opacity="0.15" fill="#fef08a">
    <polygon points="180,0 240,0 360,520 280,520"/>
    <polygon points="420,0 480,0 600,520 520,520"/>
  </g>

  <!-- Winding Crystal Creek -->
  <path d="M480,280 Q560,340 540,420 Q520,500 800,520 L800,280 Z" fill="url(#creekGrad)" opacity="0.75"/>

  <!-- Mossy Forest Floor -->
  <path d="M0,280 Q250,260 480,300 Q580,520 0,520 Z" fill="#143823"/>

  <!-- Ancient Hollow Oak Tree Trunk -->
  <g id="ancientOak">
    <path d="M120,520 Q180,240 240,160 L360,160 Q340,320 420,520 Z" fill="#3b2512"/>
    <!-- Hollow Opening -->
    <ellipse cx="280" cy="340" rx="35" ry="60" fill="#140a04"/>
    <!-- Bark Grain Knot / Difference 9 -->
    <g id="barkKnot" transform="translate(240, 291)">
      <ellipse cx="0" cy="0" rx="8" ry="14" fill="#29180a"/>
      ${!isB ? `
      <!-- Swirl inside in A -->
      <path d="M-4,-6 Q4,0 -2,6" stroke="#4a2e16" stroke-width="1.5" fill="none"/>
      ` : ''}
    </g>
    <!-- Heavy Branches -->
    <path d="M240,160 Q280,100 480,120" stroke="#3b2512" stroke-width="28" fill="none" stroke-linecap="round"/>
    <path d="M220,170 Q140,120 80,130" stroke="#3b2512" stroke-width="20" fill="none" stroke-linecap="round"/>
    <!-- Oak Leaf Foliage Canopy -->
    <g fill="#1b4d2e">
      <circle cx="160" cy="110" r="70"/>
      <circle cx="280" cy="80" r="90"/>
      <circle cx="440" cy="90" r="80"/>
      <circle cx="560" cy="120" r="60"/>
    </g>
    <!-- Twig Foliage / Difference 7 -->
    <g id="oakTwig" transform="translate(176, 166)">
      <line x1="0" y1="0" x2="-25" y2="15" stroke="#3b2512" stroke-width="3"/>
      <!-- Leaves: Golden in A, Green in B -->
      <circle cx="-28" cy="12" r="8" fill="${!isB ? '#eab308' : '#15803d'}"/>
      <circle cx="-35" cy="20" r="6" fill="${!isB ? '#eab308' : '#15803d'}"/>
    </g>
  </g>

  <!-- Glowing Crystal Lantern / Difference 1 -->
  <g id="magicLantern" transform="translate(280, 177)">
    <line x1="0" y1="-50" x2="0" y2="0" stroke="#d4af37" stroke-width="2"/>
    <rect x="-8" y="0" width="16" height="4" fill="#854d0e"/>
    <!-- Crystal Body & Glow / Difference 1 -->
    <polygon points="0,4 12,18 0,32 -12,18" fill="${!isB ? '#c084fc' : '#fbbf24'}"/>
    <circle cx="0" cy="18" r="14" fill="${!isB ? '#c084fc' : '#fbbf24'}" opacity="0.4" filter="blur(4px)"/>
  </g>

  <!-- Barn Owl on Branch / Difference 2 -->
  <g id="barnOwl" transform="translate(464, 135)">
    <!-- Body -->
    <ellipse cx="0" cy="6" rx="14" ry="20" fill="#a16207"/>
    <ellipse cx="0" cy="8" rx="10" ry="14" fill="#fef3c7"/>
    <!-- Head -->
    <circle cx="0" cy="-12" r="12" fill="#d97706"/>
    <!-- Eyes / Difference 2 -->
    ${!isB ? `
    <!-- Both Eyes Open in A -->
    <circle cx="-4" cy="-12" r="3.5" fill="#000000"/>
    <circle cx="4" cy="-12" r="3.5" fill="#000000"/>
    ` : `
    <!-- One Eye Winking in B -->
    <circle cx="-4" cy="-12" r="3.5" fill="#000000"/>
    <line x1="1" y1="-12" x2="7" y2="-12" stroke="#000" stroke-width="2"/>
    `}
    <polygon points="0,-8 -2,-5 2,-5" fill="#ea580c"/>
  </g>

  <!-- Fairy Stone Bridge & Rune / Difference 4 -->
  <g id="stoneBridge" transform="translate(520, 322)">
    <path d="M-60,40 Q0,-15 60,40 L60,55 Q0,5 -60,55 Z" fill="#64748b"/>
    <!-- Keystone Rune / Difference 4 -->
    ${!isB ? `
    <!-- Spiral rune in A -->
    <path d="M0,8 Q5,4 2,0 Q-2,-2 0,-5" stroke="#38bdf8" stroke-width="2" fill="none"/>
    ` : ''}
  </g>

  <!-- Sleeping Fawn Deer / Difference 5 -->
  <g id="fawn" transform="translate(368, 385)">
    <!-- Body -->
    <ellipse cx="0" cy="8" rx="28" ry="16" fill="#b45309"/>
    <!-- Head tucked -->
    <circle cx="-18" cy="2" r="10" fill="#b45309"/>
    <!-- Ears -->
    <polygon points="-24,-8 -18,-8 -20,-1" fill="#78350f"/>
    <!-- Dappled Spots / Difference 5 -->
    <circle cx="-4" cy="4" r="2" fill="#ffffff"/>
    <circle cx="4" cy="6" r="2" fill="#ffffff"/>
    <circle cx="12" cy="4" r="2" fill="#ffffff"/>
    ${!isB ? `
    <!-- 4th Spot in A -->
    <circle cx="18" cy="8" r="2" fill="#ffffff"/>
    ` : ''}
  </g>

  <!-- Red Fairy Mushroom / Difference 3 -->
  <g id="mushrooms" transform="translate(192, 405)">
    <rect x="-4" y="0" width="8" height="18" fill="#f8fafc"/>
    <path d="M-20,0 Q0,-22 20,0 Z" fill="#dc2626"/>
    <!-- White spots / Difference 3 -->
    ${!isB ? `
    <!-- Spots in A -->
    <circle cx="-8" cy="-8" r="2.5" fill="#ffffff"/>
    <circle cx="0" cy="-14" r="3" fill="#ffffff"/>
    <circle cx="8" cy="-8" r="2.5" fill="#ffffff"/>
    ` : ''}
  </g>

  <!-- Creek Water Lily / Difference 6 -->
  <g id="waterLily" transform="translate(608, 416)">
    <!-- Lily Pad -->
    <ellipse cx="0" cy="5" rx="18" ry="8" fill="#15803d"/>
    <!-- Blossom / Difference 6 -->
    <circle cx="0" cy="0" r="6" fill="${!isB ? '#ffffff' : '#f472b6'}"/>
    <circle cx="0" cy="0" r="2.5" fill="#facc15"/>
  </g>

  <!-- Floating Fireflies / Difference 8 -->
  <g id="fireflies" fill="#facc15">
    <circle cx="320" cy="240" r="3"/>
    <circle cx="340" cy="260" r="2.5"/>
    <circle cx="350" cy="235" r="3"/>
    ${!isB ? `
    <!-- 4th Firefly in A -->
    <circle cx="336" cy="250" r="3.5"/>
    ` : ''}
  </g>

  <!-- Wild Bluebell Flower Stem / Difference 10 -->
  <g id="bluebells" transform="translate(704, 364)">
    <path d="M0,35 Q-10,10 0,-15" stroke="#16a34a" stroke-width="2" fill="none"/>
    <ellipse cx="-4" cy="20" rx="4" ry="6" fill="#3b82f6"/>
    <ellipse cx="-7" cy="6" rx="4" ry="6" fill="#3b82f6"/>
    <ellipse cx="-4" cy="-8" rx="4" ry="6" fill="#3b82f6"/>
    <ellipse cx="2" cy="-14" rx="4" ry="6" fill="#3b82f6"/>
    ${isB ? `
    <!-- 5th Floret in B -->
    <ellipse cx="-1" cy="28" rx="4" ry="6" fill="#3b82f6"/>
    ` : ''}
  </g>
</svg>
`
  }
];

// Write all SVGs
puzzles.forEach(p => {
  const svgA = p.renderSvg(false).trim();
  const svgB = p.renderSvg(true).trim();
  const fileA = path.join(OUTPUT_DIR, `${p.id}-a.svg`);
  const fileB = path.join(OUTPUT_DIR, `${p.id}-b.svg`);
  fs.writeFileSync(fileA, svgA, 'utf8');
  fs.writeFileSync(fileB, svgB, 'utf8');
  console.log(`Wrote ${p.id}-a.svg and ${p.id}-b.svg`);
});

// Write src/data/spotDifferenceData.ts
const dataTsContent = `/**
 * Spot the Difference Game - Verified Puzzle Data
 * PuzzleFeels.com
 */

export interface DifferenceItem {
  id: number;
  x: number; // percentage (0 - 100)
  y: number; // percentage (0 - 100)
  radius: number; // click tolerance radius as percentage
  label: string;
  hint: string;
}

export interface SpotPuzzle {
  id: string;
  level: number;
  difficulty: 'easy' | 'medium' | 'hard';
  title: string;
  category: string;
  description: string;
  imageA: string;
  imageB: string;
  imageWidth: number;
  imageHeight: number;
  differences: DifferenceItem[];
}

export const SPOT_DIFFERENCE_PUZZLES: SpotPuzzle[] = ${JSON.stringify(
  puzzles.map(p => ({
    id: p.id,
    level: p.level,
    difficulty: p.difficulty,
    title: p.title,
    category: p.category,
    description: p.description,
    imageA: `/images/spot-the-difference/${p.id}-a.svg`,
    imageB: `/images/spot-the-difference/${p.id}-b.svg`,
    imageWidth: p.imageWidth,
    imageHeight: p.imageHeight,
    differences: p.differences
  })),
  null,
  2
)};
`;

fs.writeFileSync(DATA_FILE, dataTsContent, 'utf8');
console.log(`Wrote ${DATA_FILE}`);

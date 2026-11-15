/**
 * Mahjong Tile Definitions, Categorization, and Vector SVG Tile Artwork
 * Standard suits: Dots (筒), Bamboo (條), Characters (萬), Winds (風), Dragons (三元)
 */

export interface MahjongTileDef {
  id: string;
  name: string;
  suit: 'dots' | 'bamboo' | 'characters' | 'winds' | 'dragons' | 'flowers';
  value: number | string;
  label: string;
  svg: string;
}

// Crisp inline SVGs designed with Mahjong visual traditions
export const TILE_DEFINITIONS: Record<string, MahjongTileDef> = {
  // --- DOTS (筒) ---
  'dot-1': {
    id: 'dot-1',
    name: '1 Dot',
    suit: 'dots',
    value: 1,
    label: '1●',
    svg: `<svg viewBox="0 0 48 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="32" r="16" fill="#dc2626" stroke="#991b1b" stroke-width="1.5"/>
      <circle cx="24" cy="32" r="11" fill="#2563eb" stroke="#1d4ed8" stroke-width="1"/>
      <circle cx="24" cy="32" r="6" fill="#fef08a"/>
      <circle cx="24" cy="32" r="3" fill="#dc2626"/>
      <circle cx="24" cy="18" r="1.5" fill="#fef08a"/>
      <circle cx="24" cy="46" r="1.5" fill="#fef08a"/>
      <circle cx="10" cy="32" r="1.5" fill="#fef08a"/>
      <circle cx="38" cy="32" r="1.5" fill="#fef08a"/>
    </svg>`,
  },
  'dot-2': {
    id: 'dot-2',
    name: '2 Dots',
    suit: 'dots',
    value: 2,
    label: '2●',
    svg: `<svg viewBox="0 0 48 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="18" r="7.5" fill="#16a34a" stroke="#15803d" stroke-width="1.5"/>
      <circle cx="24" cy="18" r="2.5" fill="#fff"/>
      <circle cx="24" cy="46" r="7.5" fill="#2563eb" stroke="#1d4ed8" stroke-width="1.5"/>
      <circle cx="24" cy="46" r="2.5" fill="#fff"/>
    </svg>`,
  },
  'dot-3': {
    id: 'dot-3',
    name: '3 Dots',
    suit: 'dots',
    value: 3,
    label: '3●',
    svg: `<svg viewBox="0 0 48 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="15" cy="16" r="6" fill="#2563eb" stroke="#1d4ed8" stroke-width="1.2"/>
      <circle cx="15" cy="16" r="2" fill="#fff"/>
      <circle cx="24" cy="32" r="6" fill="#dc2626" stroke="#991b1b" stroke-width="1.2"/>
      <circle cx="24" cy="32" r="2" fill="#fff"/>
      <circle cx="33" cy="48" r="6" fill="#16a34a" stroke="#15803d" stroke-width="1.2"/>
      <circle cx="33" cy="48" r="2" fill="#fff"/>
    </svg>`,
  },
  'dot-4': {
    id: 'dot-4',
    name: '4 Dots',
    suit: 'dots',
    value: 4,
    label: '4●',
    svg: `<svg viewBox="0 0 48 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="18" r="6" fill="#2563eb" stroke="#1d4ed8" stroke-width="1.2"/>
      <circle cx="32" cy="18" r="6" fill="#16a34a" stroke="#15803d" stroke-width="1.2"/>
      <circle cx="16" cy="46" r="6" fill="#16a34a" stroke="#15803d" stroke-width="1.2"/>
      <circle cx="32" cy="46" r="6" fill="#2563eb" stroke="#1d4ed8" stroke-width="1.2"/>
      <circle cx="16" cy="18" r="2" fill="#fff"/><circle cx="32" cy="18" r="2" fill="#fff"/>
      <circle cx="16" cy="46" r="2" fill="#fff"/><circle cx="32" cy="46" r="2" fill="#fff"/>
    </svg>`,
  },
  'dot-5': {
    id: 'dot-5',
    name: '5 Dots',
    suit: 'dots',
    value: 5,
    label: '5●',
    svg: `<svg viewBox="0 0 48 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="15" cy="16" r="5.5" fill="#2563eb"/>
      <circle cx="33" cy="16" r="5.5" fill="#16a34a"/>
      <circle cx="24" cy="32" r="6.5" fill="#dc2626" stroke="#991b1b" stroke-width="1.2"/>
      <circle cx="24" cy="32" r="2.2" fill="#fff"/>
      <circle cx="15" cy="48" r="5.5" fill="#16a34a"/>
      <circle cx="33" cy="48" r="5.5" fill="#2563eb"/>
      <circle cx="15" cy="16" r="1.8" fill="#fff"/><circle cx="33" cy="16" r="1.8" fill="#fff"/>
      <circle cx="15" cy="48" r="1.8" fill="#fff"/><circle cx="33" cy="48" r="1.8" fill="#fff"/>
    </svg>`,
  },
  'dot-6': {
    id: 'dot-6',
    name: '6 Dots',
    suit: 'dots',
    value: 6,
    label: '6●',
    svg: `<svg viewBox="0 0 48 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="15" r="5" fill="#16a34a"/><circle cx="32" cy="15" r="5" fill="#16a34a"/>
      <circle cx="16" cy="32" r="5" fill="#dc2626"/><circle cx="32" cy="32" r="5" fill="#dc2626"/>
      <circle cx="16" cy="49" r="5" fill="#dc2626"/><circle cx="32" cy="49" r="5" fill="#dc2626"/>
      <circle cx="16" cy="15" r="1.8" fill="#fff"/><circle cx="32" cy="15" r="1.8" fill="#fff"/>
      <circle cx="16" cy="32" r="1.8" fill="#fff"/><circle cx="32" cy="32" r="1.8" fill="#fff"/>
      <circle cx="16" cy="49" r="1.8" fill="#fff"/><circle cx="32" cy="49" r="1.8" fill="#fff"/>
    </svg>`,
  },
  'dot-7': {
    id: 'dot-7',
    name: '7 Dots',
    suit: 'dots',
    value: 7,
    label: '7●',
    svg: `<svg viewBox="0 0 48 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="13" cy="12" r="4.5" fill="#16a34a"/>
      <circle cx="24" cy="18" r="4.5" fill="#16a34a"/>
      <circle cx="35" cy="24" r="4.5" fill="#16a34a"/>
      <circle cx="16" cy="37" r="5" fill="#dc2626"/><circle cx="32" cy="37" r="5" fill="#dc2626"/>
      <circle cx="16" cy="51" r="5" fill="#dc2626"/><circle cx="32" cy="51" r="5" fill="#dc2626"/>
    </svg>`,
  },
  'dot-8': {
    id: 'dot-8',
    name: '8 Dots',
    suit: 'dots',
    value: 8,
    label: '8●',
    svg: `<svg viewBox="0 0 48 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="12" r="4.5" fill="#2563eb"/><circle cx="32" cy="12" r="4.5" fill="#2563eb"/>
      <circle cx="16" cy="25" r="4.5" fill="#2563eb"/><circle cx="32" cy="25" r="4.5" fill="#2563eb"/>
      <circle cx="16" cy="39" r="4.5" fill="#2563eb"/><circle cx="32" cy="39" r="4.5" fill="#2563eb"/>
      <circle cx="16" cy="52" r="4.5" fill="#2563eb"/><circle cx="32" cy="52" r="4.5" fill="#2563eb"/>
    </svg>`,
  },
  'dot-9': {
    id: 'dot-9',
    name: '9 Dots',
    suit: 'dots',
    value: 9,
    label: '9●',
    svg: `<svg viewBox="0 0 48 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="14" cy="15" r="4.5" fill="#16a34a"/><circle cx="24" cy="15" r="4.5" fill="#2563eb"/><circle cx="34" cy="15" r="4.5" fill="#dc2626"/>
      <circle cx="14" cy="32" r="4.5" fill="#dc2626"/><circle cx="24" cy="32" r="4.5" fill="#16a34a"/><circle cx="34" cy="32" r="4.5" fill="#2563eb"/>
      <circle cx="14" cy="49" r="4.5" fill="#2563eb"/><circle cx="24" cy="49" r="4.5" fill="#dc2626"/><circle cx="34" cy="49" r="4.5" fill="#16a34a"/>
    </svg>`,
  },

  // --- BAMBOO (條) ---
  'bamboo-1': {
    id: 'bamboo-1',
    name: '1 Bamboo (Sparrow)',
    suit: 'bamboo',
    value: 1,
    label: '1🎋',
    svg: `<svg viewBox="0 0 48 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Ornate Mahjong Sparrow / Peacock Bird -->
      <path d="M24 10C21 10 18 13 18 16C18 19 21 21 24 21C27 21 30 19 30 16C30 13 27 10 24 10Z" fill="#16a34a"/>
      <path d="M21 15C21 14 22 13 23 13C24 13 25 14 25 15C25 16 24 17 23 17C22 17 21 16 21 15Z" fill="#dc2626"/>
      <path d="M24 21C17 21 13 28 13 36C13 46 20 54 24 54C28 54 35 46 35 36C35 28 31 21 24 21Z" fill="#15803d"/>
      <path d="M24 25C19 25 16 32 16 38C16 45 20 50 24 50C28 50 32 45 32 38C32 32 29 25 24 25Z" fill="#16a34a"/>
      <path d="M24 30C21.5 30 20 34 20 38C20 42 22 45 24 45C26 45 28 42 28 38C28 34 26.5 30 24 30Z" fill="#dc2626"/>
      <path d="M24 54L22 59M24 54L26 59" stroke="#991b1b" stroke-width="2" stroke-linecap="round"/>
    </svg>`,
  },
  'bamboo-2': {
    id: 'bamboo-2',
    name: '2 Bamboo',
    suit: 'bamboo',
    value: 2,
    label: '2🎋',
    svg: `<svg viewBox="0 0 48 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="22" y="10" width="4" height="19" rx="2" fill="#16a34a"/>
      <circle cx="24" cy="19" r="3" fill="#15803d"/>
      <rect x="22" y="35" width="4" height="19" rx="2" fill="#2563eb"/>
      <circle cx="24" cy="44" r="3" fill="#1d4ed8"/>
    </svg>`,
  },
  'bamboo-3': {
    id: 'bamboo-3',
    name: '3 Bamboo',
    suit: 'bamboo',
    value: 3,
    label: '3🎋',
    svg: `<svg viewBox="0 0 48 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="22" y="10" width="4" height="18" rx="2" fill="#2563eb"/>
      <rect x="14" y="36" width="4" height="18" rx="2" fill="#16a34a"/>
      <rect x="30" y="36" width="4" height="18" rx="2" fill="#16a34a"/>
    </svg>`,
  },
  'bamboo-4': {
    id: 'bamboo-4',
    name: '4 Bamboo',
    suit: 'bamboo',
    value: 4,
    label: '4🎋',
    svg: `<svg viewBox="0 0 48 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="15" y="12" width="4" height="18" rx="2" fill="#2563eb"/>
      <rect x="29" y="12" width="4" height="18" rx="2" fill="#16a34a"/>
      <rect x="15" y="34" width="4" height="18" rx="2" fill="#16a34a"/>
      <rect x="29" y="34" width="4" height="18" rx="2" fill="#2563eb"/>
    </svg>`,
  },
  'bamboo-5': {
    id: 'bamboo-5',
    name: '5 Bamboo',
    suit: 'bamboo',
    value: 5,
    label: '5🎋',
    svg: `<svg viewBox="0 0 48 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="13" y="12" width="3.5" height="17" rx="1.7" fill="#16a34a"/>
      <rect x="31.5" y="12" width="3.5" height="17" rx="1.7" fill="#2563eb"/>
      <rect x="22.2" y="23.5" width="3.5" height="17" rx="1.7" fill="#dc2626"/>
      <rect x="13" y="35" width="3.5" height="17" rx="1.7" fill="#2563eb"/>
      <rect x="31.5" y="35" width="3.5" height="17" rx="1.7" fill="#16a34a"/>
    </svg>`,
  },
  'bamboo-6': {
    id: 'bamboo-6',
    name: '6 Bamboo',
    suit: 'bamboo',
    value: 6,
    label: '6🎋',
    svg: `<svg viewBox="0 0 48 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="14" y="12" width="3.5" height="17" rx="1.7" fill="#16a34a"/>
      <rect x="22.2" y="12" width="3.5" height="17" rx="1.7" fill="#16a34a"/>
      <rect x="30.5" y="12" width="3.5" height="17" rx="1.7" fill="#16a34a"/>
      <rect x="14" y="35" width="3.5" height="17" rx="1.7" fill="#2563eb"/>
      <rect x="22.2" y="35" width="3.5" height="17" rx="1.7" fill="#2563eb"/>
      <rect x="30.5" y="35" width="3.5" height="17" rx="1.7" fill="#2563eb"/>
    </svg>`,
  },
  'bamboo-7': {
    id: 'bamboo-7',
    name: '7 Bamboo',
    suit: 'bamboo',
    value: 7,
    label: '7🎋',
    svg: `<svg viewBox="0 0 48 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="22.2" y="10" width="3.5" height="14" rx="1.7" fill="#dc2626"/>
      <rect x="14" y="27" width="3.5" height="14" rx="1.7" fill="#16a34a"/>
      <rect x="22.2" y="27" width="3.5" height="14" rx="1.7" fill="#2563eb"/>
      <rect x="30.5" y="27" width="3.5" height="14" rx="1.7" fill="#16a34a"/>
      <rect x="14" y="44" width="3.5" height="14" rx="1.7" fill="#2563eb"/>
      <rect x="22.2" y="44" width="3.5" height="14" rx="1.7" fill="#16a34a"/>
      <rect x="30.5" y="44" width="3.5" height="14" rx="1.7" fill="#2563eb"/>
    </svg>`,
  },
  'bamboo-8': {
    id: 'bamboo-8',
    name: '8 Bamboo',
    suit: 'bamboo',
    value: 8,
    label: '8🎋',
    svg: `<svg viewBox="0 0 48 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- 4 diagonal stalks top + 4 diagonal stalks bottom -->
      <path d="M14 11L18 25M22 11L18 25M26 11L30 25M34 11L30 25" stroke="#16a34a" stroke-width="3" stroke-linecap="round"/>
      <path d="M14 39L18 53M22 39L18 53M26 39L30 53M34 39L30 53" stroke="#2563eb" stroke-width="3" stroke-linecap="round"/>
    </svg>`,
  },
  'bamboo-9': {
    id: 'bamboo-9',
    name: '9 Bamboo',
    suit: 'bamboo',
    value: 9,
    label: '9🎋',
    svg: `<svg viewBox="0 0 48 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="14" y="10" width="3.5" height="12" rx="1.7" fill="#dc2626"/>
      <rect x="22.2" y="10" width="3.5" height="12" rx="1.7" fill="#2563eb"/>
      <rect x="30.5" y="10" width="3.5" height="12" rx="1.7" fill="#16a34a"/>
      <rect x="14" y="26" width="3.5" height="12" rx="1.7" fill="#dc2626"/>
      <rect x="22.2" y="26" width="3.5" height="12" rx="1.7" fill="#2563eb"/>
      <rect x="30.5" y="26" width="3.5" height="12" rx="1.7" fill="#16a34a"/>
      <rect x="14" y="42" width="3.5" height="12" rx="1.7" fill="#dc2626"/>
      <rect x="22.2" y="42" width="3.5" height="12" rx="1.7" fill="#2563eb"/>
      <rect x="30.5" y="42" width="3.5" height="12" rx="1.7" fill="#16a34a"/>
    </svg>`,
  },

  // --- CHARACTERS (萬) ---
  'char-1': {
    id: 'char-1',
    name: '1 Character',
    suit: 'characters',
    value: 1,
    label: '一萬',
    svg: `<svg viewBox="0 0 48 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- 一 -->
      <path d="M14 20H34" stroke="#1d4ed8" stroke-width="4" stroke-linecap="round"/>
      <!-- 萬 -->
      <text x="24" y="48" font-family="'Noto Serif SC', 'Songti SC', serif, sans-serif" font-weight="900" font-size="22" fill="#dc2626" text-anchor="middle">萬</text>
    </svg>`,
  },
  'char-2': {
    id: 'char-2',
    name: '2 Characters',
    suit: 'characters',
    value: 2,
    label: '二萬',
    svg: `<svg viewBox="0 0 48 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- 二 -->
      <path d="M16 16H32" stroke="#1d4ed8" stroke-width="3" stroke-linecap="round"/>
      <path d="M13 23H35" stroke="#1d4ed8" stroke-width="3.5" stroke-linecap="round"/>
      <!-- 萬 -->
      <text x="24" y="48" font-family="'Noto Serif SC', 'Songti SC', serif, sans-serif" font-weight="900" font-size="22" fill="#dc2626" text-anchor="middle">萬</text>
    </svg>`,
  },
  'char-3': {
    id: 'char-3',
    name: '3 Characters',
    suit: 'characters',
    value: 3,
    label: '三萬',
    svg: `<svg viewBox="0 0 48 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- 三 -->
      <path d="M16 14H32" stroke="#1d4ed8" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M18 19H30" stroke="#1d4ed8" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M13 24H35" stroke="#1d4ed8" stroke-width="3.2" stroke-linecap="round"/>
      <!-- 萬 -->
      <text x="24" y="48" font-family="'Noto Serif SC', 'Songti SC', serif, sans-serif" font-weight="900" font-size="22" fill="#dc2626" text-anchor="middle">萬</text>
    </svg>`,
  },
  'char-4': {
    id: 'char-4',
    name: '4 Characters',
    suit: 'characters',
    value: 4,
    label: '四萬',
    svg: `<svg viewBox="0 0 48 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- 四 -->
      <text x="24" y="24" font-family="'Noto Serif SC', 'Songti SC', serif, sans-serif" font-weight="900" font-size="18" fill="#1d4ed8" text-anchor="middle">四</text>
      <!-- 萬 -->
      <text x="24" y="48" font-family="'Noto Serif SC', 'Songti SC', serif, sans-serif" font-weight="900" font-size="22" fill="#dc2626" text-anchor="middle">萬</text>
    </svg>`,
  },
  'char-5': {
    id: 'char-5',
    name: '5 Characters',
    suit: 'characters',
    value: 5,
    label: '五萬',
    svg: `<svg viewBox="0 0 48 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- 五 -->
      <text x="24" y="24" font-family="'Noto Serif SC', 'Songti SC', serif, sans-serif" font-weight="900" font-size="18" fill="#1d4ed8" text-anchor="middle">五</text>
      <!-- 萬 -->
      <text x="24" y="48" font-family="'Noto Serif SC', 'Songti SC', serif, sans-serif" font-weight="900" font-size="22" fill="#dc2626" text-anchor="middle">萬</text>
    </svg>`,
  },
  'char-6': {
    id: 'char-6',
    name: '6 Characters',
    suit: 'characters',
    value: 6,
    label: '六萬',
    svg: `<svg viewBox="0 0 48 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- 六 -->
      <text x="24" y="24" font-family="'Noto Serif SC', 'Songti SC', serif, sans-serif" font-weight="900" font-size="18" fill="#1d4ed8" text-anchor="middle">六</text>
      <!-- 萬 -->
      <text x="24" y="48" font-family="'Noto Serif SC', 'Songti SC', serif, sans-serif" font-weight="900" font-size="22" fill="#dc2626" text-anchor="middle">萬</text>
    </svg>`,
  },
  'char-7': {
    id: 'char-7',
    name: '7 Characters',
    suit: 'characters',
    value: 7,
    label: '七萬',
    svg: `<svg viewBox="0 0 48 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- 七 -->
      <text x="24" y="24" font-family="'Noto Serif SC', 'Songti SC', serif, sans-serif" font-weight="900" font-size="18" fill="#1d4ed8" text-anchor="middle">七</text>
      <!-- 萬 -->
      <text x="24" y="48" font-family="'Noto Serif SC', 'Songti SC', serif, sans-serif" font-weight="900" font-size="22" fill="#dc2626" text-anchor="middle">萬</text>
    </svg>`,
  },
  'char-8': {
    id: 'char-8',
    name: '8 Characters',
    suit: 'characters',
    value: 8,
    label: '八萬',
    svg: `<svg viewBox="0 0 48 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- 八 -->
      <text x="24" y="24" font-family="'Noto Serif SC', 'Songti SC', serif, sans-serif" font-weight="900" font-size="18" fill="#1d4ed8" text-anchor="middle">八</text>
      <!-- 萬 -->
      <text x="24" y="48" font-family="'Noto Serif SC', 'Songti SC', serif, sans-serif" font-weight="900" font-size="22" fill="#dc2626" text-anchor="middle">萬</text>
    </svg>`,
  },
  'char-9': {
    id: 'char-9',
    name: '9 Characters',
    suit: 'characters',
    value: 9,
    label: '九萬',
    svg: `<svg viewBox="0 0 48 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- 九 -->
      <text x="24" y="24" font-family="'Noto Serif SC', 'Songti SC', serif, sans-serif" font-weight="900" font-size="18" fill="#1d4ed8" text-anchor="middle">九</text>
      <!-- 萬 -->
      <text x="24" y="48" font-family="'Noto Serif SC', 'Songti SC', serif, sans-serif" font-weight="900" font-size="22" fill="#dc2626" text-anchor="middle">萬</text>
    </svg>`,
  },

  // --- WINDS (風) ---
  'wind-east': {
    id: 'wind-east',
    name: 'East Wind (東)',
    suit: 'winds',
    value: 'E',
    label: '東',
    svg: `<svg viewBox="0 0 48 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text x="24" y="41" font-family="'Noto Serif SC', 'Songti SC', serif, sans-serif" font-weight="900" font-size="30" fill="#1d4ed8" text-anchor="middle">東</text>
    </svg>`,
  },
  'wind-south': {
    id: 'wind-south',
    name: 'South Wind (南)',
    suit: 'winds',
    value: 'S',
    label: '南',
    svg: `<svg viewBox="0 0 48 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text x="24" y="41" font-family="'Noto Serif SC', 'Songti SC', serif, sans-serif" font-weight="900" font-size="30" fill="#dc2626" text-anchor="middle">南</text>
    </svg>`,
  },
  'wind-west': {
    id: 'wind-west',
    name: 'West Wind (西)',
    suit: 'winds',
    value: 'W',
    label: '西',
    svg: `<svg viewBox="0 0 48 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text x="24" y="41" font-family="'Noto Serif SC', 'Songti SC', serif, sans-serif" font-weight="900" font-size="30" fill="#16a34a" text-anchor="middle">西</text>
    </svg>`,
  },
  'wind-north': {
    id: 'wind-north',
    name: 'North Wind (北)',
    suit: 'winds',
    value: 'N',
    label: '北',
    svg: `<svg viewBox="0 0 48 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text x="24" y="41" font-family="'Noto Serif SC', 'Songti SC', serif, sans-serif" font-weight="900" font-size="30" fill="#1e293b" text-anchor="middle">北</text>
    </svg>`,
  },

  // --- DRAGONS (三元) ---
  'dragon-red': {
    id: 'dragon-red',
    name: 'Red Dragon (中)',
    suit: 'dragons',
    value: 'Red',
    label: '中',
    svg: `<svg viewBox="0 0 48 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text x="24" y="43" font-family="'Noto Serif SC', 'Songti SC', serif, sans-serif" font-weight="900" font-size="33" fill="#dc2626" text-anchor="middle">中</text>
    </svg>`,
  },
  'dragon-green': {
    id: 'dragon-green',
    name: 'Green Dragon (發)',
    suit: 'dragons',
    value: 'Green',
    label: '發',
    svg: `<svg viewBox="0 0 48 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text x="24" y="43" font-family="'Noto Serif SC', 'Songti SC', serif, sans-serif" font-weight="900" font-size="31" fill="#15803d" text-anchor="middle">發</text>
    </svg>`,
  },
  'dragon-white': {
    id: 'dragon-white',
    name: 'White Dragon (白)',
    suit: 'dragons',
    value: 'White',
    label: '白',
    svg: `<svg viewBox="0 0 48 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Traditional ornate picture-frame representation of the White Dragon -->
      <rect x="11" y="11" width="26" height="42" rx="3" fill="none" stroke="#1d4ed8" stroke-width="3"/>
      <rect x="15" y="15" width="18" height="34" rx="2" fill="none" stroke="#60a5fa" stroke-width="1.2" stroke-dasharray="3 2"/>
    </svg>`,
  },

  // --- FLOWERS & SEASONS (花/季) ---
  'flower-plum': {
    id: 'flower-plum',
    name: 'Plum Blossom (梅)',
    suit: 'flowers',
    value: 'Plum',
    label: '梅',
    svg: `<svg viewBox="0 0 48 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="28" r="4.5" fill="#f43f5e"/>
      <circle cx="17" cy="24" r="4" fill="#f43f5e"/><circle cx="31" cy="24" r="4" fill="#f43f5e"/>
      <circle cx="19" cy="34" r="4" fill="#f43f5e"/><circle cx="29" cy="34" r="4" fill="#f43f5e"/>
      <circle cx="24" cy="28" r="2.2" fill="#fef08a"/>
      <text x="24" y="52" font-family="'Noto Serif SC', serif, sans-serif" font-weight="800" font-size="14" fill="#dc2626" text-anchor="middle">梅</text>
    </svg>`,
  },
  'flower-orchid': {
    id: 'flower-orchid',
    name: 'Orchid (蘭)',
    suit: 'flowers',
    value: 'Orchid',
    label: '蘭',
    svg: `<svg viewBox="0 0 48 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M24 16C21 21 16 26 16 32C16 36 19 39 24 39C29 39 32 36 32 32C32 26 27 21 24 16Z" fill="#8b5cf6"/>
      <circle cx="24" cy="29" r="2.5" fill="#fef08a"/>
      <text x="24" y="52" font-family="'Noto Serif SC', serif, sans-serif" font-weight="800" font-size="14" fill="#7c3aed" text-anchor="middle">蘭</text>
    </svg>`,
  },
  'flower-bamboo': {
    id: 'flower-bamboo',
    name: 'Bamboo Plant (竹)',
    suit: 'flowers',
    value: 'Bamboo',
    label: '竹',
    svg: `<svg viewBox="0 0 48 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22 14V38M26 14V38" stroke="#15803d" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M20 20L13 18M28 26L35 24" stroke="#16a34a" stroke-width="2" stroke-linecap="round"/>
      <text x="24" y="52" font-family="'Noto Serif SC', serif, sans-serif" font-weight="800" font-size="14" fill="#15803d" text-anchor="middle">竹</text>
    </svg>`,
  },
  'flower-chrysanthemum': {
    id: 'flower-chrysanthemum',
    name: 'Chrysanthemum (菊)',
    suit: 'flowers',
    value: 'Chrysanthemum',
    label: '菊',
    svg: `<svg viewBox="0 0 48 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="27" r="8" fill="#f59e0b" stroke="#d97706" stroke-width="1.2"/>
      <circle cx="24" cy="27" r="4" fill="#dc2626"/>
      <circle cx="24" cy="27" r="1.5" fill="#fef08a"/>
      <text x="24" y="52" font-family="'Noto Serif SC', serif, sans-serif" font-weight="800" font-size="14" fill="#d97706" text-anchor="middle">菊</text>
    </svg>`,
  },
};

export const ALL_TILE_IDS = Object.keys(TILE_DEFINITIONS);

/**
 * Returns a subset of tile definitions suitable for creating matching pairs/triplets
 */
export function getAvailableTileIds(count: number, rng: () => number = Math.random): string[] {
  const ids = [...ALL_TILE_IDS];
  // Shuffle array using Fisher-Yates
  for (let i = ids.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [ids[i], ids[j]] = [ids[j], ids[i]];
  }
  return ids.slice(0, Math.min(count, ids.length));
}

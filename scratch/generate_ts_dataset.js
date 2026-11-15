import fs from 'fs';

const data = JSON.parse(fs.readFileSync('scratch/norinori_verified_dataset.json', 'utf8'));

const tsContent = `// Norinori puzzle dataset - precomputed, 100% unique, verified solutions
export interface NorinoriPuzzle {
  id: string;
  originalId: string;
  size: number;
  difficulty: 'normal' | 'hard';
  hBorders: string;
  vBorders: string;
  regions: number[][];
  solution: number[];
}

export const NORINORI_PUZZLES: NorinoriPuzzle[] = ${JSON.stringify(data, null, 2)};

export function getNorinoriPuzzles(size: number, difficulty: 'normal' | 'hard'): NorinoriPuzzle[] {
  return NORINORI_PUZZLES.filter(p => p.size === size && p.difficulty === difficulty);
}

export function getNorinoriPuzzle(size: number, difficulty: 'normal' | 'hard', index = 0): NorinoriPuzzle {
  const list = getNorinoriPuzzles(size, difficulty);
  if (!list.length) return NORINORI_PUZZLES[0];
  return list[((index % list.length) + list.length) % list.length];
}

// Daily challenge: deterministic 8x8 or 10x10 based on UTC date
export function getDailyNorinoriPuzzle(dateStr?: string): { puzzle: NorinoriPuzzle; dateKey: string } {
  const d = dateStr ? new Date(dateStr) : new Date();
  const year = d.getUTCFullYear();
  const month = String(d.getUTCMonth() + 1).padStart(2, '0');
  const day = String(d.getUTCDate()).padStart(2, '0');
  const dateKey = \`\${year}-\${month}-\${day}\`;
  
  // Seed hash from dateKey
  let hash = 0;
  for (let i = 0; i < dateKey.length; i++) {
    hash = (hash * 31 + dateKey.charCodeAt(i)) >>> 0;
  }
  
  // Choose 8x8 or 10x10 normal or hard based on day of week
  const dayOfWeek = d.getUTCDay(); // 0 is Sunday
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
  const size = isWeekend ? 10 : 8;
  const difficulty: 'normal' | 'hard' = (dayOfWeek % 2 === 0) ? 'normal' : 'hard';
  const list = getNorinoriPuzzles(size, difficulty);
  const puzzle = list[hash % list.length];
  return { puzzle, dateKey };
}

// Weekly challenge: deterministic 15x15 based on ISO week
export function getWeeklyNorinoriPuzzle(weekStr?: string): { puzzle: NorinoriPuzzle; weekKey: string } {
  const d = weekStr ? new Date(weekStr) : new Date();
  const temp = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
  temp.setUTCDate(temp.getUTCDate() + 4 - (temp.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(temp.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil((((temp.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
  const weekKey = \`\${temp.getUTCFullYear()}-W\${String(weekNo).padStart(2, '0')}\`;

  let hash = 0;
  for (let i = 0; i < weekKey.length; i++) {
    hash = (hash * 31 + weekKey.charCodeAt(i)) >>> 0;
  }
  const difficulty: 'normal' | 'hard' = weekNo % 2 === 0 ? 'hard' : 'normal';
  const list = getNorinoriPuzzles(15, difficulty);
  const puzzle = list[hash % list.length];
  return { puzzle, weekKey };
}

// Monthly challenge: deterministic 20x20 based on year and month
export function getMonthlyNorinoriPuzzle(monthStr?: string): { puzzle: NorinoriPuzzle; monthKey: string } {
  const d = monthStr ? new Date(monthStr) : new Date();
  const monthKey = \`\${d.getUTCFullYear()}-\${String(d.getUTCMonth() + 1).padStart(2, '0')}\`;

  let hash = 0;
  for (let i = 0; i < monthKey.length; i++) {
    hash = (hash * 31 + monthKey.charCodeAt(i)) >>> 0;
  }
  const difficulty: 'normal' | 'hard' = d.getUTCMonth() % 2 === 0 ? 'normal' : 'hard';
  const list = getNorinoriPuzzles(20, difficulty);
  const puzzle = list[hash % list.length];
  return { puzzle, monthKey };
}
`;

fs.writeFileSync('src/data/norinoriPuzzles.ts', tsContent);
console.log('Successfully written src/data/norinoriPuzzles.ts');

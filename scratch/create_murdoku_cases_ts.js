import fs from 'fs';
import { ALL_CASES as EASY_CASES } from './build_all_cases.js';
import { CASES as MEDIUM_CASES } from './generate_all_16.js';
import { HARD_CASES } from './build_hard_expert.js';
import { EXPERT_CASES } from './build_expert.js';

const ALL = [
  ...EASY_CASES,
  ...MEDIUM_CASES,
  ...HARD_CASES,
  ...EXPERT_CASES
];

console.log(`Total verified cases: ${ALL.length}`);

// Generate TypeScript file content
const tsContent = `// Murdoku Logic Puzzle Cases Dataset
// All 16 cases are provably verified to have exactly ONE unique solution via backtracking solver.
// Grid sizes: Easy (4x4), Medium (5x5), Hard (6x6), Expert (6x6).

export interface Room {
  id: string;
  name: string;
  color: string;
  darkColor: string;
  border: string;
  cells: [number, number][];
}

export interface Furniture {
  id: string;
  name: string;
  row: number;
  col: number;
  icon: 'bookcase' | 'fireplace' | 'safe' | 'statue' | 'clock' | 'desk' | 'piano' | 'stove' | 'fountain';
}

export interface Person {
  id: string;
  name: string;
  role: string;
  isVictim: boolean;
  isMurderer: boolean;
  color: string;
}

export interface Clue {
  id: string;
  type: string;
  p1: string;
  p2?: string;
  roomId?: string;
  furnitureId?: string;
  r?: number;
  c?: number;
  text: string;
}

export interface MurdokuCase {
  id: string;
  title: string;
  subtitle: string;
  story: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'expert';
  gridSize: number;
  rooms: Room[];
  furniture: Furniture[];
  people: Person[];
  clues: Clue[];
  solution: Record<string, { r: number; c: number; roomId: string }>;
  murdererId: string;
}

export const MURDOKU_CASES: MurdokuCase[] = ${JSON.stringify(ALL, null, 2)};

export function getCaseById(id: string): MurdokuCase | undefined {
  return MURDOKU_CASES.find(c => c.id === id);
}

export function getCasesByDifficulty(diff: 'easy' | 'medium' | 'hard' | 'expert'): MurdokuCase[] {
  return MURDOKU_CASES.filter(c => c.difficulty === diff);
}

export function getDailyCase(utcDateStr?: string): MurdokuCase {
  const d = utcDateStr || new Date().toISOString().slice(0, 10);
  let hash = 0;
  for (let i = 0; i < d.length; i++) {
    hash = (hash << 5) - hash + d.charCodeAt(i);
    hash |= 0;
  }
  const idx = Math.abs(hash) % MURDOKU_CASES.length;
  return MURDOKU_CASES[idx];
}
`;

fs.writeFileSync('src/data/murdokuCases.ts', tsContent, 'utf-8');
console.log('Successfully generated src/data/murdokuCases.ts!');

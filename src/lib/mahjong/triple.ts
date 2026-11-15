/**
 * Triple Mahjong (Match 3 / Selection Tray) Rules, Layouts, and Mechanics
 */

import { ALL_TILE_IDS } from './tiles.ts';

export const TRIPLE_TRAY_CAPACITY = 7;

export interface TripleTile {
  id: string; // unique tile id e.g. "tr-0"
  tileId: string; // symbol id e.g. "bamboo-1"
  x: number;
  y: number;
  z: number;
}

export interface TripleLayoutPosition {
  x: number;
  y: number;
  z: number;
}

// Easy: 36 tiles = 12 triplets (2 layers)
export const EASY_TRIPLE_LAYOUT: TripleLayoutPosition[] = [
  // Layer 0: 24 tiles (6 columns x 4 rows)
  { x: 2, y: 0, z: 0 }, { x: 4, y: 0, z: 0 }, { x: 6, y: 0, z: 0 }, { x: 8, y: 0, z: 0 }, { x: 10, y: 0, z: 0 }, { x: 12, y: 0, z: 0 },
  { x: 2, y: 2, z: 0 }, { x: 4, y: 2, z: 0 }, { x: 6, y: 2, z: 0 }, { x: 8, y: 2, z: 0 }, { x: 10, y: 2, z: 0 }, { x: 12, y: 2, z: 0 },
  { x: 2, y: 4, z: 0 }, { x: 4, y: 4, z: 0 }, { x: 6, y: 4, z: 0 }, { x: 8, y: 4, z: 0 }, { x: 10, y: 4, z: 0 }, { x: 12, y: 4, z: 0 },
  { x: 2, y: 6, z: 0 }, { x: 4, y: 6, z: 0 }, { x: 6, y: 6, z: 0 }, { x: 8, y: 6, z: 0 }, { x: 10, y: 6, z: 0 }, { x: 12, y: 6, z: 0 },

  // Layer 1: 12 tiles (half-step offset: x=3,5,7,9 y=1,3,5)
  { x: 3, y: 1, z: 1 }, { x: 5, y: 1, z: 1 }, { x: 7, y: 1, z: 1 }, { x: 9, y: 1, z: 1 },
  { x: 3, y: 3, z: 1 }, { x: 5, y: 3, z: 1 }, { x: 7, y: 3, z: 1 }, { x: 9, y: 3, z: 1 },
  { x: 3, y: 5, z: 1 }, { x: 5, y: 5, z: 1 }, { x: 7, y: 5, z: 1 }, { x: 9, y: 5, z: 1 },
];

// Medium: 60 tiles = 20 triplets (3 layers)
export const MEDIUM_TRIPLE_LAYOUT: TripleLayoutPosition[] = [
  // Layer 0: 36 tiles (6x6)
  ...(() => {
    const list: TripleLayoutPosition[] = [];
    for (let r = 0; r < 6; r++) {
      for (let c = 0; c < 6; c++) {
        list.push({ x: 2 + c * 2, y: r * 2, z: 0 });
      }
    }
    return list;
  })(),

  // Layer 1: 16 tiles (4x4)
  ...(() => {
    const list: TripleLayoutPosition[] = [];
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        list.push({ x: 3 + c * 2, y: 1 + r * 2, z: 1 });
      }
    }
    return list;
  })(),

  // Layer 2: 8 tiles (2x4 center cross)
  { x: 5, y: 2, z: 2 }, { x: 7, y: 2, z: 2 },
  { x: 5, y: 4, z: 2 }, { x: 7, y: 4, z: 2 },
  { x: 5, y: 6, z: 2 }, { x: 7, y: 6, z: 2 },
  { x: 5, y: 8, z: 2 }, { x: 7, y: 8, z: 2 },
];

// Hard: 90 tiles = 30 triplets (4 layers)
export const HARD_TRIPLE_LAYOUT: TripleLayoutPosition[] = [
  // Layer 0: 54 tiles (9x6)
  ...(() => {
    const list: TripleLayoutPosition[] = [];
    for (let r = 0; r < 6; r++) {
      for (let c = 0; c < 9; c++) {
        list.push({ x: 1 + c * 2, y: r * 2, z: 0 });
      }
    }
    return list;
  })(),

  // Layer 1: 24 tiles (6x4 centered)
  ...(() => {
    const list: TripleLayoutPosition[] = [];
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 6; c++) {
        list.push({ x: 4 + c * 2, y: 2 + r * 2, z: 1 });
      }
    }
    return list;
  })(),

  // Layer 2: 8 tiles (4x2)
  ...(() => {
    const list: TripleLayoutPosition[] = [];
    for (let r = 0; r < 2; r++) {
      for (let c = 0; c < 4; c++) {
        list.push({ x: 6 + c * 2, y: 3 + r * 2, z: 2 });
      }
    }
    return list;
  })(),

  // Layer 3: 4 tiles top pinnacle
  { x: 7, y: 4, z: 3 }, { x: 9, y: 4, z: 3 },
  { x: 7, y: 6, z: 3 }, { x: 9, y: 6, z: 3 },
];

/**
 * In Triple Mahjong, a tile is available if no tile is covering it from above.
 */
export function isTripleTileFree(target: TripleTile, allTiles: TripleTile[]): boolean {
  for (const other of allTiles) {
    if (other.id === target.id) continue;
    if (other.z > target.z) {
      if (Math.abs(other.x - target.x) < 2 && Math.abs(other.y - target.y) < 2) {
        return true; // covered!
      }
    }
  }
  return false; // not covered -> free
}

export function getFreeTripleTiles(tiles: TripleTile[]): TripleTile[] {
  return tiles.filter((t) => !isTripleTileFree(t, tiles));
}

/**
 * Generates a valid Triple Mahjong puzzle where every symbol appears in triplets (multiples of 3).
 */
export function generateTripleBoard(
  difficulty: 'easy' | 'medium' | 'hard',
  rng: () => number = Math.random
): TripleTile[] {
  let layout: TripleLayoutPosition[];
  if (difficulty === 'easy') layout = EASY_TRIPLE_LAYOUT;
  else if (difficulty === 'medium') layout = MEDIUM_TRIPLE_LAYOUT;
  else layout = HARD_TRIPLE_LAYOUT;

  const totalTiles = layout.length;
  if (totalTiles % 3 !== 0) {
    throw new Error(`Triple Mahjong layout must be a multiple of 3, got ${totalTiles}`);
  }

  const tripletCount = totalTiles / 3;

  // Pick unique tile symbols
  const tilePool = [...ALL_TILE_IDS];
  for (let i = tilePool.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [tilePool[i], tilePool[j]] = [tilePool[j], tilePool[i]];
  }

  const tripletSymbols: string[] = [];
  for (let i = 0; i < tripletCount; i++) {
    const sym = tilePool[i % tilePool.length];
    tripletSymbols.push(sym, sym, sym);
  }

  // Shuffle tile assignments
  for (let i = tripletSymbols.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [tripletSymbols[i], tripletSymbols[j]] = [tripletSymbols[j], tripletSymbols[i]];
  }

  return layout.map((pos, idx) => ({
    id: `tr-${idx}`,
    tileId: tripletSymbols[idx],
    x: pos.x,
    y: pos.y,
    z: pos.z,
  }));
}

/**
 * Helper to insert a selected tile into the player's tray.
 * Tray tiles with identical symbols group together.
 * Returns { newTray, matched: boolean, matchedTileId: string | null, isFull: boolean }
 */
export function insertTileIntoTray(
  tray: TripleTile[],
  tile: TripleTile
): {
  newTray: TripleTile[];
  matched: boolean;
  matchedTileId: string | null;
  isFull: boolean;
} {
  const current = [...tray];

  // Find index of existing identical tile to group them next to each other
  let insertIdx = -1;
  for (let i = current.length - 1; i >= 0; i--) {
    if (current[i].tileId === tile.tileId) {
      insertIdx = i + 1;
      break;
    }
  }

  if (insertIdx !== -1) {
    current.splice(insertIdx, 0, tile);
  } else {
    current.push(tile);
  }

  // Check if there are 3 matching tiles in current tray
  const count = current.filter((t) => t.tileId === tile.tileId).length;
  if (count === 3) {
    // Matched! Remove all 3
    const newTray = current.filter((t) => t.tileId !== tile.tileId);
    return {
      newTray,
      matched: true,
      matchedTileId: tile.tileId,
      isFull: false,
    };
  }

  // If not matched, check if tray overflowed
  const isFull = current.length >= TRIPLE_TRAY_CAPACITY;
  return {
    newTray: current,
    matched: false,
    matchedTileId: null,
    isFull,
  };
}

/**
 * Finds a hint in Triple Mahjong:
 * 1. Checks if a board free tile matches 2 tiles currently in tray.
 * 2. Checks if a board free tile matches 1 tile currently in tray.
 * 3. Checks if 3 free board tiles share the same symbol.
 */
export function findTripleHint(
  boardTiles: TripleTile[],
  tray: TripleTile[]
): TripleTile | null {
  const freeBoard = getFreeTripleTiles(boardTiles);

  // 1. Look for completion of a pair in tray
  const trayCounts = new Map<string, number>();
  for (const t of tray) {
    trayCounts.set(t.tileId, (trayCounts.get(t.tileId) || 0) + 1);
  }

  // Priority 1: 2 in tray, need 1 more from board
  for (const t of freeBoard) {
    if (trayCounts.get(t.tileId) === 2) {
      return t;
    }
  }

  // Priority 2: 1 in tray, need from board
  for (const t of freeBoard) {
    if (trayCounts.get(t.tileId) === 1) {
      return t;
    }
  }

  // Priority 3: any 3 matching on board
  const boardCounts = new Map<string, TripleTile[]>();
  for (const t of freeBoard) {
    if (!boardCounts.has(t.tileId)) boardCounts.set(t.tileId, []);
    boardCounts.get(t.tileId)!.push(t);
  }
  for (const [_, tiles] of boardCounts.entries()) {
    if (tiles.length >= 2) return tiles[0];
  }

  // Otherwise return any free tile
  return freeBoard.length > 0 ? freeBoard[0] : null;
}

/**
 * Shuffles remaining Triple board tiles while preserving positions
 */
export function shuffleTripleTiles(
  tiles: TripleTile[],
  rng: () => number = Math.random
): TripleTile[] {
  if (tiles.length <= 3) return tiles;
  const symbols = tiles.map((t) => t.tileId);

  for (let i = symbols.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [symbols[i], symbols[j]] = [symbols[j], symbols[i]];
  }

  return tiles.map((t, idx) => ({ ...t, tileId: symbols[idx] }));
}

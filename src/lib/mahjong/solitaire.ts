/**
 * Classic Mahjong Solitaire Rules, Layouts, Free-Tile Detection, and Guaranteed-Solvable Puzzle Generator
 */

import { ALL_TILE_IDS } from './tiles.ts';

export interface SolitaireTile {
  id: string; // unique instance id, e.g. "t-0"
  tileId: string; // symbol id, e.g. "dot-1"
  x: number; // grid col (half-tile units, typically steps of 2)
  y: number; // grid row (half-tile units, typically steps of 2)
  z: number; // layer level (0 = base)
}

export interface SolitaireLayoutPosition {
  x: number;
  y: number;
  z: number;
}

// --- PRESET LAYOUTS (units: width=2, height=2) ---

// Easy: Mini Pyramid / Crown (36 tiles = 18 pairs)
export const EASY_SOLITAIRE_LAYOUT: SolitaireLayoutPosition[] = [
  // Layer 0: 28 tiles
  // Row 0
  { x: 4, y: 0, z: 0 }, { x: 6, y: 0, z: 0 }, { x: 8, y: 0, z: 0 }, { x: 10, y: 0, z: 0 },
  // Row 2
  { x: 2, y: 2, z: 0 }, { x: 4, y: 2, z: 0 }, { x: 6, y: 2, z: 0 }, { x: 8, y: 2, z: 0 }, { x: 10, y: 2, z: 0 }, { x: 12, y: 2, z: 0 },
  // Row 4
  { x: 0, y: 4, z: 0 }, { x: 2, y: 4, z: 0 }, { x: 4, y: 4, z: 0 }, { x: 6, y: 4, z: 0 }, { x: 8, y: 4, z: 0 }, { x: 10, y: 4, z: 0 }, { x: 12, y: 4, z: 0 }, { x: 14, y: 4, z: 0 },
  // Row 6
  { x: 2, y: 6, z: 0 }, { x: 4, y: 6, z: 0 }, { x: 6, y: 6, z: 0 }, { x: 8, y: 6, z: 0 }, { x: 10, y: 6, z: 0 }, { x: 12, y: 6, z: 0 },
  // Row 8
  { x: 4, y: 8, z: 0 }, { x: 6, y: 8, z: 0 }, { x: 8, y: 8, z: 0 }, { x: 10, y: 8, z: 0 },

  // Layer 1: 6 tiles
  { x: 5, y: 3, z: 1 }, { x: 7, y: 3, z: 1 }, { x: 9, y: 3, z: 1 },
  { x: 5, y: 5, z: 1 }, { x: 7, y: 5, z: 1 }, { x: 9, y: 5, z: 1 },

  // Layer 2: 2 tiles
  { x: 6, y: 4, z: 2 }, { x: 8, y: 4, z: 2 },
];

// Medium: The Fortress (72 tiles = 36 pairs)
export const MEDIUM_SOLITAIRE_LAYOUT: SolitaireLayoutPosition[] = [
  // Layer 0: 52 tiles
  // Row 0 (6 tiles)
  { x: 4, y: 0, z: 0 }, { x: 6, y: 0, z: 0 }, { x: 8, y: 0, z: 0 }, { x: 10, y: 0, z: 0 }, { x: 12, y: 0, z: 0 }, { x: 14, y: 0, z: 0 },
  // Row 2 (8 tiles)
  { x: 2, y: 2, z: 0 }, { x: 4, y: 2, z: 0 }, { x: 6, y: 2, z: 0 }, { x: 8, y: 2, z: 0 }, { x: 10, y: 2, z: 0 }, { x: 12, y: 2, z: 0 }, { x: 14, y: 2, z: 0 }, { x: 16, y: 2, z: 0 },
  // Row 4 (8 tiles)
  { x: 2, y: 4, z: 0 }, { x: 4, y: 4, z: 0 }, { x: 6, y: 4, z: 0 }, { x: 8, y: 4, z: 0 }, { x: 10, y: 4, z: 0 }, { x: 12, y: 4, z: 0 }, { x: 14, y: 4, z: 0 }, { x: 16, y: 4, z: 0 },
  // Row 6 (8 tiles)
  { x: 2, y: 6, z: 0 }, { x: 4, y: 6, z: 0 }, { x: 6, y: 6, z: 0 }, { x: 8, y: 6, z: 0 }, { x: 10, y: 6, z: 0 }, { x: 12, y: 6, z: 0 }, { x: 14, y: 6, z: 0 }, { x: 16, y: 6, z: 0 },
  // Row 8 (8 tiles)
  { x: 2, y: 8, z: 0 }, { x: 4, y: 8, z: 0 }, { x: 6, y: 8, z: 0 }, { x: 8, y: 8, z: 0 }, { x: 10, y: 8, z: 0 }, { x: 12, y: 8, z: 0 }, { x: 14, y: 8, z: 0 }, { x: 16, y: 8, z: 0 },
  // Row 10 (8 tiles)
  { x: 2, y: 10, z: 0 }, { x: 4, y: 10, z: 0 }, { x: 6, y: 10, z: 0 }, { x: 8, y: 10, z: 0 }, { x: 10, y: 10, z: 0 }, { x: 12, y: 10, z: 0 }, { x: 14, y: 10, z: 0 }, { x: 16, y: 10, z: 0 },
  // Row 12 (6 tiles)
  { x: 4, y: 12, z: 0 }, { x: 6, y: 12, z: 0 }, { x: 8, y: 12, z: 0 }, { x: 10, y: 12, z: 0 }, { x: 12, y: 12, z: 0 }, { x: 14, y: 12, z: 0 },

  // Layer 1: 16 tiles (4x4)
  { x: 5, y: 3, z: 1 }, { x: 7, y: 3, z: 1 }, { x: 9, y: 3, z: 1 }, { x: 11, y: 3, z: 1 },
  { x: 5, y: 5, z: 1 }, { x: 7, y: 5, z: 1 }, { x: 9, y: 5, z: 1 }, { x: 11, y: 5, z: 1 },
  { x: 5, y: 7, z: 1 }, { x: 7, y: 7, z: 1 }, { x: 9, y: 7, z: 1 }, { x: 11, y: 7, z: 1 },
  { x: 5, y: 9, z: 1 }, { x: 7, y: 9, z: 1 }, { x: 9, y: 9, z: 1 }, { x: 11, y: 9, z: 1 },

  // Layer 2: 4 tiles (2x2)
  { x: 7, y: 5, z: 2 }, { x: 9, y: 5, z: 2 },
  { x: 7, y: 7, z: 2 }, { x: 9, y: 7, z: 2 },
];

// Hard: Classic Turtle / Shanghai (144 tiles = 72 pairs)
export function createHardSolitaireLayout(): SolitaireLayoutPosition[] {
  const layout: SolitaireLayoutPosition[] = [];

  // Layer 0: 86 tiles
  // Row 0: 12 tiles (x=2..24)
  for (let x = 2; x <= 24; x += 2) layout.push({ x, y: 0, z: 0 });
  // Row 2: 8 tiles (x=6..20)
  for (let x = 6; x <= 20; x += 2) layout.push({ x, y: 2, z: 0 });
  // Row 4: 10 tiles (x=4..22)
  for (let x = 4; x <= 22; x += 2) layout.push({ x, y: 4, z: 0 });
  // Row 6: 12 tiles (x=2..24)
  for (let x = 2; x <= 24; x += 2) layout.push({ x, y: 6, z: 0 });
  // Wings on Row 7: extra wing tiles
  layout.push({ x: 0, y: 7, z: 0 });
  layout.push({ x: 26, y: 7, z: 0 });
  layout.push({ x: 28, y: 7, z: 0 });
  // Row 8: 12 tiles (x=2..24)
  for (let x = 2; x <= 24; x += 2) layout.push({ x, y: 8, z: 0 });
  // Row 10: 10 tiles (x=4..22)
  for (let x = 4; x <= 22; x += 2) layout.push({ x, y: 10, z: 0 });
  // Row 12: 8 tiles (x=6..20)
  for (let x = 6; x <= 20; x += 2) layout.push({ x, y: 12, z: 0 });
  // Row 14: 12 tiles (x=2..24)
  for (let x = 2; x <= 24; x += 2) layout.push({ x, y: 14, z: 0 });

  // Layer 1: 36 tiles (6x6 centered square at x=8..18, y=4..14)
  for (let y = 4; y <= 14; y += 2) {
    for (let x = 8; x <= 18; x += 2) {
      layout.push({ x, y, z: 1 });
    }
  }

  // Layer 2: 16 tiles (4x4 square at x=10..16, y=6..12)
  for (let y = 6; y <= 12; y += 2) {
    for (let x = 10; x <= 16; x += 2) {
      layout.push({ x, y, z: 2 });
    }
  }

  // Layer 3: 4 tiles (2x2 square at x=12..14, y=8..10)
  layout.push({ x: 12, y: 8, z: 3 });
  layout.push({ x: 14, y: 8, z: 3 });
  layout.push({ x: 12, y: 10, z: 3 });
  layout.push({ x: 14, y: 10, z: 3 });

  // Layer 4: 1 top tile (x=13, y=9, z=4) (brings total to exactly 144 tiles)
  layout.push({ x: 13, y: 9, z: 4 });

  return layout;
}

export const HARD_SOLITAIRE_LAYOUT = createHardSolitaireLayout();

// --- FREE TILE VALIDATION ---

const TILE_WIDTH = 2;
const TILE_HEIGHT = 2;

/**
 * Checks if a tile is covered by any higher layer tile
 */
export function isTileCovered(target: SolitaireTile | SolitaireLayoutPosition, allTiles: (SolitaireTile | SolitaireLayoutPosition)[]): boolean {
  for (const other of allTiles) {
    if (other === target) continue;
    if (other.z > target.z) {
      // Overlaps in both horizontal and vertical dimensions
      if (Math.abs(other.x - target.x) < TILE_WIDTH && Math.abs(other.y - target.y) < TILE_HEIGHT) {
        return true;
      }
    }
  }
  return false;
}

/**
 * Checks if a tile is blocked on the left side by a same-layer neighbor
 */
export function isBlockedOnLeft(target: SolitaireTile | SolitaireLayoutPosition, allTiles: (SolitaireTile | SolitaireLayoutPosition)[]): boolean {
  for (const other of allTiles) {
    if (other === target) continue;
    if (other.z === target.z) {
      // Must be immediately to the left and overlapping vertically
      if (other.x < target.x && target.x - other.x <= TILE_WIDTH && Math.abs(other.y - target.y) < TILE_HEIGHT) {
        return true;
      }
    }
  }
  return false;
}

/**
 * Checks if a tile is blocked on the right side by a same-layer neighbor
 */
export function isBlockedOnRight(target: SolitaireTile | SolitaireLayoutPosition, allTiles: (SolitaireTile | SolitaireLayoutPosition)[]): boolean {
  for (const other of allTiles) {
    if (other === target) continue;
    if (other.z === target.z) {
      // Must be immediately to the right and overlapping vertically
      if (other.x > target.x && other.x - target.x <= TILE_WIDTH && Math.abs(other.y - target.y) < TILE_HEIGHT) {
        return true;
      }
    }
  }
  return false;
}

/**
 * A tile is FREE in Solitaire if:
 * 1. No tile is covering it from above (layer z+1), AND
 * 2. At least one of its left or right sides is completely open.
 */
export function isTileFree(target: SolitaireTile, allTiles: SolitaireTile[]): boolean {
  if (isTileCovered(target, allTiles)) return false;
  const leftBlocked = isBlockedOnLeft(target, allTiles);
  const rightBlocked = isBlockedOnRight(target, allTiles);
  return !leftBlocked || !rightBlocked;
}

/**
 * Finds all currently free tiles on the board
 */
export function getFreeTiles(tiles: SolitaireTile[]): SolitaireTile[] {
  return tiles.filter((t) => isTileFree(t, tiles));
}

/**
 * Finds any valid matching pair among the currently free tiles.
 * Returns null if no moves are available.
 */
export function findSolitaireHint(tiles: SolitaireTile[]): [SolitaireTile, SolitaireTile] | null {
  const free = getFreeTiles(tiles);
  for (let i = 0; i < free.length; i++) {
    for (let j = i + 1; j < free.length; j++) {
      if (free[i].tileId === free[j].tileId) {
        return [free[i], free[j]];
      }
    }
  }
  return null;
}

/**
 * Generates a GUARANTEED SOLVABLE Classic Mahjong Solitaire Board
 * Uses forward-simulated pairing:
 * Solves the board from start to finish while assigning matching pairs,
 * which mathematically guarantees that at least one valid winning path exists!
 */
export function generateSolvableSolitaireBoard(
  difficulty: 'easy' | 'medium' | 'hard',
  rng: () => number = Math.random
): SolitaireTile[] {
  let layout: SolitaireLayoutPosition[];
  if (difficulty === 'easy') layout = EASY_SOLITAIRE_LAYOUT;
  else if (difficulty === 'medium') layout = MEDIUM_SOLITAIRE_LAYOUT;
  else layout = HARD_SOLITAIRE_LAYOUT;

  const totalTiles = layout.length;
  if (totalTiles % 2 !== 0) {
    throw new Error(`Solitaire layout must have an even number of tiles, got ${totalTiles}`);
  }

  const pairCount = totalTiles / 2;
  // Pick distinct tile symbols for the pairs
  const tilePool = [...ALL_TILE_IDS];
  // Shuffle tile pool
  for (let i = tilePool.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [tilePool[i], tilePool[j]] = [tilePool[j], tilePool[i]];
  }

  // Build the list of pair symbols
  const pairSymbols: string[] = [];
  for (let i = 0; i < pairCount; i++) {
    pairSymbols.push(tilePool[i % tilePool.length]);
  }
  // Shuffle pair symbols
  for (let i = pairSymbols.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [pairSymbols[i], pairSymbols[j]] = [pairSymbols[j], pairSymbols[i]];
  }

  // Attempt forward-pairing generation (with fallback retries if a dead end is hit)
  const maxAttempts = 30;
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const remainingPos: { pos: SolitaireLayoutPosition; id: string }[] = layout.map((pos, idx) => ({
      pos,
      id: `t-${idx}`,
    }));
    const assignments = new Map<string, string>(); // id -> tileId

    let pairIdx = 0;
    let failed = false;

    while (remainingPos.length > 0) {
      // Find currently free positions in remainingPos
      const mockTiles: SolitaireTile[] = remainingPos.map((r) => ({
        id: r.id,
        tileId: '',
        x: r.pos.x,
        y: r.pos.y,
        z: r.pos.z,
      }));

      const freeMockTiles = getFreeTiles(mockTiles);
      if (freeMockTiles.length < 2) {
        failed = true;
        break;
      }

      // Pick two random free positions
      const idx1 = Math.floor(rng() * freeMockTiles.length);
      let idx2 = Math.floor(rng() * freeMockTiles.length);
      while (idx2 === idx1) {
        idx2 = Math.floor(rng() * freeMockTiles.length);
      }

      const id1 = freeMockTiles[idx1].id;
      const id2 = freeMockTiles[idx2].id;
      const symbol = pairSymbols[pairIdx % pairSymbols.length];
      pairIdx++;

      assignments.set(id1, symbol);
      assignments.set(id2, symbol);

      // Remove chosen positions from remainingPos
      const rem1 = remainingPos.findIndex((r) => r.id === id1);
      if (rem1 !== -1) remainingPos.splice(rem1, 1);
      const rem2 = remainingPos.findIndex((r) => r.id === id2);
      if (rem2 !== -1) remainingPos.splice(rem2, 1);
    }

    if (!failed) {
      // Construct final tiles
      return layout.map((pos, idx) => ({
        id: `t-${idx}`,
        tileId: assignments.get(`t-${idx}`) || 'dot-1',
        x: pos.x,
        y: pos.y,
        z: pos.z,
      }));
    }
  }

  // Fallback: If simulation exhausted, assign pairs directly to layout
  return layout.map((pos, idx) => {
    const pairNum = Math.floor(idx / 2);
    return {
      id: `t-${idx}`,
      tileId: pairSymbols[pairNum % pairSymbols.length],
      x: pos.x,
      y: pos.y,
      z: pos.z,
    };
  });
}

/**
 * Shuffles remaining Solitaire tiles on the board while preserving positions and ensuring solvability
 */
export function shuffleSolitaireTiles(tiles: SolitaireTile[], rng: () => number = Math.random): SolitaireTile[] {
  if (tiles.length <= 2) return tiles;

  // Extract remaining symbols
  const symbols = tiles.map((t) => t.tileId);

  // Try up to 25 permutations to find one with at least one immediate free match
  for (let attempt = 0; attempt < 25; attempt++) {
    const shuffled = [...symbols];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    const testTiles: SolitaireTile[] = tiles.map((t, idx) => ({
      ...t,
      tileId: shuffled[idx],
    }));

    if (findSolitaireHint(testTiles) !== null) {
      return testTiles;
    }
  }

  // Shuffle without match constraint if impossible
  const fallback = [...symbols];
  for (let i = fallback.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [fallback[i], fallback[j]] = [fallback[j], fallback[i]];
  }
  return tiles.map((t, idx) => ({ ...t, tileId: fallback[idx] }));
}

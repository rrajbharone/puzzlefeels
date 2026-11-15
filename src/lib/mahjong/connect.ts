/**
 * Mahjong Connect (Shisen-Sho / 2-Turn Path Matching) Rules, Algorithms, and Solvers
 */

import { ALL_TILE_IDS } from './tiles.ts';

export interface ConnectPoint {
  r: number; // 0..rows+1 (including empty border)
  c: number; // 0..cols+1 (including empty border)
}

export interface ConnectBoardConfig {
  rows: number; // playable rows
  cols: number; // playable cols
}

export const CONNECT_DIFFICULTY_CONFIG: Record<'easy' | 'medium' | 'hard', ConnectBoardConfig> = {
  easy: { rows: 6, cols: 6 }, // 36 tiles (18 pairs)
  medium: { rows: 6, cols: 10 }, // 60 tiles (30 pairs)
  hard: { rows: 8, cols: 12 }, // 96 tiles (48 pairs)
};

export interface ConnectTile {
  id: string; // unique cell id e.g. "c-r-c"
  tileId: string; // symbol id, empty string '' if cleared
  r: number; // row index (1..rows)
  c: number; // col index (1..cols)
}

/**
 * Checks if a straight path (0 turns) between p1 and p2 is clear of obstacles.
 * Excludes endpoints p1 and p2.
 */
function isStraightPathClear(
  p1: ConnectPoint,
  p2: ConnectPoint,
  grid: (string | null)[][]
): boolean {
  if (p1.r === p2.r) {
    const minC = Math.min(p1.c, p2.c);
    const maxC = Math.max(p1.c, p2.c);
    for (let c = minC + 1; c < maxC; c++) {
      if (grid[p1.r][c] !== null) return false;
    }
    return true;
  }
  if (p1.c === p2.c) {
    const minR = Math.min(p1.r, p2.r);
    const maxR = Math.max(p1.r, p2.r);
    for (let r = minR + 1; r < maxR; r++) {
      if (grid[r][p1.c] !== null) return false;
    }
    return true;
  }
  return false;
}

/**
 * Finds a connecting path with AT MOST 2 90-degree turns (at most 3 segments).
 * Returns array of vertices [p1, ..., p2] if path exists, or null if unreachable.
 */
export function findConnectPath(
  p1: ConnectPoint,
  p2: ConnectPoint,
  grid: (string | null)[][],
  totalRows: number,
  totalCols: number
): ConnectPoint[] | null {
  if (p1.r === p2.r && p1.c === p2.c) return null;

  // 1. Direct Straight Line (0 turns / 1 segment)
  if (isStraightPathClear(p1, p2, grid)) {
    return [p1, p2];
  }

  // 2. One Turn (1 turn / 2 segments, L-shape)
  // Check corner 1: (p1.r, p2.c)
  const c1: ConnectPoint = { r: p1.r, c: p2.c };
  if (grid[c1.r][c1.c] === null && isStraightPathClear(p1, c1, grid) && isStraightPathClear(c1, p2, grid)) {
    return [p1, c1, p2];
  }

  // Check corner 2: (p2.r, p1.c)
  const c2: ConnectPoint = { r: p2.r, c: p1.c };
  if (grid[c2.r][c2.c] === null && isStraightPathClear(p1, c2, grid) && isStraightPathClear(c2, p2, grid)) {
    return [p1, c2, p2];
  }

  // 3. Two Turns (2 turns / 3 segments, Z-shape or U-shape)
  // Scan all empty cells reachable in a straight line from p1
  // Horizontal rays from p1
  for (let dc of [-1, 1]) {
    let c = p1.c + dc;
    while (c >= 0 && c < totalCols) {
      if (grid[p1.r][c] !== null) break; // blocked
      const intermediate: ConnectPoint = { r: p1.r, c };
      // Can intermediate connect to p2 with 1 turn?
      const subCorner: ConnectPoint = { r: p2.r, c };
      if (grid[subCorner.r][subCorner.c] === null &&
          isStraightPathClear(intermediate, subCorner, grid) &&
          isStraightPathClear(subCorner, p2, grid)) {
        return [p1, intermediate, subCorner, p2];
      }
      c += dc;
    }
  }

  // Vertical rays from p1
  for (let dr of [-1, 1]) {
    let r = p1.r + dr;
    while (r >= 0 && r < totalRows) {
      if (grid[r][p1.c] !== null) break; // blocked
      const intermediate: ConnectPoint = { r, c: p1.c };
      // Can intermediate connect to p2 with 1 turn?
      const subCorner: ConnectPoint = { r, c: p2.c };
      if (grid[subCorner.r][subCorner.c] === null &&
          isStraightPathClear(intermediate, subCorner, grid) &&
          isStraightPathClear(subCorner, p2, grid)) {
        return [p1, intermediate, subCorner, p2];
      }
      r += dr;
    }
  }

  return null;
}

/**
 * Builds a 2D grid matrix including the border padding:
 * Grid dimensions: (rows + 2) x (cols + 2)
 * Unoccupied or boundary cells contain `null`.
 */
export function buildConnectGridMatrix(
  tiles: ConnectTile[],
  rows: number,
  cols: number
): (string | null)[][] {
  const totalRows = rows + 2;
  const totalCols = cols + 2;
  const matrix: (string | null)[][] = Array.from({ length: totalRows }, () =>
    Array.from({ length: totalCols }, () => null)
  );

  for (const t of tiles) {
    if (t.tileId) {
      matrix[t.r][t.c] = t.tileId;
    }
  }
  return matrix;
}

/**
 * Finds a valid matching move in Mahjong Connect
 */
export function findConnectHint(
  tiles: ConnectTile[],
  rows: number,
  cols: number
): { tile1: ConnectTile; tile2: ConnectTile; path: ConnectPoint[] } | null {
  const activeTiles = tiles.filter((t) => t.tileId);
  const grid = buildConnectGridMatrix(tiles, rows, cols);
  const totalRows = rows + 2;
  const totalCols = cols + 2;

  for (let i = 0; i < activeTiles.length; i++) {
    for (let j = i + 1; j < activeTiles.length; j++) {
      const t1 = activeTiles[i];
      const t2 = activeTiles[j];
      if (t1.tileId === t2.tileId) {
        const p1: ConnectPoint = { r: t1.r, c: t1.c };
        const p2: ConnectPoint = { r: t2.r, c: t2.c };
        const path = findConnectPath(p1, p2, grid, totalRows, totalCols);
        if (path) {
          return { tile1: t1, tile2: t2, path };
        }
      }
    }
  }
  return null;
}

/**
 * Generates a valid Mahjong Connect board with matching pairs
 */
export function generateConnectBoard(
  difficulty: 'easy' | 'medium' | 'hard',
  rng: () => number = Math.random
): { tiles: ConnectTile[]; rows: number; cols: number } {
  const { rows, cols } = CONNECT_DIFFICULTY_CONFIG[difficulty];
  const totalTiles = rows * cols;
  const pairCount = totalTiles / 2;

  // Pick tile symbols
  const tilePool = [...ALL_TILE_IDS];
  for (let i = tilePool.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [tilePool[i], tilePool[j]] = [tilePool[j], tilePool[i]];
  }

  const pairSymbols: string[] = [];
  for (let i = 0; i < pairCount; i++) {
    pairSymbols.push(tilePool[i % tilePool.length]);
  }

  // Double each symbol to create pairs
  const tileSymbols: string[] = [];
  for (const sym of pairSymbols) {
    tileSymbols.push(sym, sym);
  }

  // Attempt up to 30 shuffles to ensure at least 2 valid initial moves
  for (let attempt = 0; attempt < 30; attempt++) {
    const shuffled = [...tileSymbols];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    const tiles: ConnectTile[] = [];
    let idx = 0;
    for (let r = 1; r <= rows; r++) {
      for (let c = 1; c <= cols; c++) {
        tiles.push({
          id: `c-${r}-${c}`,
          tileId: shuffled[idx++],
          r,
          c,
        });
      }
    }

    if (findConnectHint(tiles, rows, cols) !== null) {
      return { tiles, rows, cols };
    }
  }

  // Fallback
  const fallbackTiles: ConnectTile[] = [];
  let idx = 0;
  for (let r = 1; r <= rows; r++) {
    for (let c = 1; c <= cols; c++) {
      fallbackTiles.push({
        id: `c-${r}-${c}`,
        tileId: tileSymbols[idx++],
        r,
        c,
      });
    }
  }
  return { tiles: fallbackTiles, rows, cols };
}

/**
 * Shuffles remaining Connect tiles on the grid and ensures valid moves exist
 */
export function shuffleConnectTiles(
  tiles: ConnectTile[],
  rows: number,
  cols: number,
  rng: () => number = Math.random
): ConnectTile[] {
  const activeTiles = tiles.filter((t) => t.tileId);
  if (activeTiles.length <= 2) return tiles;

  const activeSymbols = activeTiles.map((t) => t.tileId);

  for (let attempt = 0; attempt < 30; attempt++) {
    const shuffled = [...activeSymbols];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    let aIdx = 0;
    const testTiles: ConnectTile[] = tiles.map((t) => ({
      ...t,
      tileId: t.tileId ? shuffled[aIdx++] : '',
    }));

    if (findConnectHint(testTiles, rows, cols) !== null) {
      return testTiles;
    }
  }

  return tiles;
}

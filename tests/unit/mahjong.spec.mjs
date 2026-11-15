import test from 'node:test';
import assert from 'node:assert/strict';

import { TILE_DEFINITIONS, ALL_TILE_IDS } from '../../src/lib/mahjong/tiles.ts';
import {
  isTileFree,
  isTileCovered,
  isBlockedOnLeft,
  isBlockedOnRight,
  findSolitaireHint,
  generateSolvableSolitaireBoard,
  shuffleSolitaireTiles,
} from '../../src/lib/mahjong/solitaire.ts';
import {
  findConnectPath,
  findConnectHint,
  generateConnectBoard,
  shuffleConnectTiles,
  buildConnectGridMatrix,
} from '../../src/lib/mahjong/connect.ts';
import {
  isTripleTileFree,
  findTripleHint,
  generateTripleBoard,
  insertTileIntoTray,
  TRIPLE_TRAY_CAPACITY,
} from '../../src/lib/mahjong/triple.ts';
import {
  createSeededRng,
  getUtcDateString,
} from '../../src/lib/mahjong/storage.ts';

// 1. Tile System Tests
test('Mahjong tile catalog contains all suits with valid SVG markup', () => {
  assert.ok(ALL_TILE_IDS.length >= 35, 'Catalog must contain standard Mahjong tile set');
  for (const id of ALL_TILE_IDS) {
    const tile = TILE_DEFINITIONS[id];
    assert.ok(tile, `Tile ${id} must exist in definitions`);
    assert.ok(tile.svg.includes('<svg'), `Tile ${id} must contain SVG markup`);
    assert.ok(tile.label, `Tile ${id} must have a text label`);
    assert.ok(['dots', 'bamboo', 'characters', 'winds', 'dragons', 'flowers'].includes(tile.suit));
  }
});

// 2. Classic Solitaire Tests
test('Classic Solitaire free tile detection honors covering and side blocking rules', () => {
  // Tile A at layer 0
  const tileA = { id: 'a', tileId: 'dot-1', x: 4, y: 4, z: 0 };

  // 1. Isolated tile is free
  assert.equal(isTileFree(tileA, [tileA]), true, 'Isolated tile with no neighbors is free');

  // 2. Tile with higher-layer tile directly above it is NOT free
  const coveringTile = { id: 'top', tileId: 'dot-2', x: 4, y: 4, z: 1 };
  assert.equal(isTileCovered(tileA, [tileA, coveringTile]), true);
  assert.equal(isTileFree(tileA, [tileA, coveringTile]), false, 'Covered tile must be blocked');

  // 3. Tile with neighbor on left only -> still free on right side!
  const leftNeighbor = { id: 'left', tileId: 'dot-3', x: 2, y: 4, z: 0 };
  assert.equal(isBlockedOnLeft(tileA, [tileA, leftNeighbor]), true);
  assert.equal(isBlockedOnRight(tileA, [tileA, leftNeighbor]), false);
  assert.equal(isTileFree(tileA, [tileA, leftNeighbor]), true, 'Tile with open right flank is free');

  // 4. Tile with neighbor on both left and right -> BLOCKED
  const rightNeighbor = { id: 'right', tileId: 'dot-4', x: 6, y: 4, z: 0 };
  assert.equal(isBlockedOnRight(tileA, [tileA, leftNeighbor, rightNeighbor]), true);
  assert.equal(isTileFree(tileA, [tileA, leftNeighbor, rightNeighbor]), false, 'Tile blocked on both flanks is blocked');
});

test('Classic Solitaire layout generation produces solvable boards with matching pairs', () => {
  for (const diff of ['easy', 'medium', 'hard']) {
    const board = generateSolvableSolitaireBoard(diff);
    assert.ok(board.length > 0, `Board for ${diff} must have tiles`);
    assert.equal(board.length % 2, 0, `Board for ${diff} must have an even number of tiles`);

    // Verify all tiles have matching pairs
    const counts = new Map();
    for (const t of board) {
      counts.set(t.tileId, (counts.get(t.tileId) || 0) + 1);
    }
    for (const [sym, count] of counts.entries()) {
      assert.equal(count % 2, 0, `Tile symbol ${sym} must exist in even pairs (count=${count})`);
    }

    // Verify hint finder can locate an initial free match
    const hint = findSolitaireHint(board);
    assert.ok(hint !== null, `Solvable board for ${diff} must contain at least one valid starting move`);
    assert.equal(hint[0].tileId, hint[1].tileId, 'Hint must be two identical tiles');
  }
});

// 3. Mahjong Connect Pathfinding Tests
test('Mahjong Connect pathfinding supports 0, 1, and 2 turns and rejects invalid connections', () => {
  const rows = 4;
  const cols = 4;
  // Matrix dimensions: (rows+2) x (cols+2) = 6x6. Border is index 0 and 5.
  const matrix = Array.from({ length: 6 }, () => Array.from({ length: 6 }, () => null));

  // Place two tiles on row 1 with empty cells between them (cols 1 and 3)
  const p1 = { r: 1, c: 1 };
  const p2 = { r: 1, c: 3 };
  matrix[p1.r][p1.c] = 'bamboo-1';
  matrix[p2.r][p2.c] = 'bamboo-1';

  // 0-turn straight line
  const straightPath = findConnectPath(p1, p2, matrix, 6, 6);
  assert.ok(straightPath !== null, 'Direct straight path should connect');
  assert.equal(straightPath.length, 2, '0-turn path has 2 vertices');

  // Place obstacle between p1 and p2 at (1, 2)
  matrix[1][2] = 'dot-9'; // obstacle
  const blockedStraight = findConnectPath(p1, p2, matrix, 6, 6);
  // Can still connect with 2 turns via row 0 (outer border)!
  assert.ok(blockedStraight !== null, 'Path should route around obstacle via border row 0');
  assert.ok(blockedStraight.length <= 4, 'Valid path must have at most 2 turns (4 vertices)');

  // Complete box obstacle: surround p2 on all 4 sides with obstacles
  matrix[0][3] = 'rock';
  matrix[2][3] = 'rock';
  matrix[1][4] = 'rock';
  const completelyBlocked = findConnectPath(p1, p2, matrix, 6, 6);
  assert.equal(completelyBlocked, null, 'Completely surrounded tile cannot connect');
});

test('Mahjong Connect board generator produces valid matching pairs and initial moves', () => {
  for (const diff of ['easy', 'medium']) {
    const res = generateConnectBoard(diff);
    assert.ok(res.tiles.length > 0);
    assert.equal(res.tiles.length % 2, 0);

    const hint = findConnectHint(res.tiles, res.rows, res.cols);
    assert.ok(hint !== null, `Connect board for ${diff} must contain valid initial move`);
    assert.equal(hint.tile1.tileId, hint.tile2.tileId);
    assert.ok(hint.path.length >= 2 && hint.path.length <= 4, 'Path must have at most 2 turns');
  }
});

// 4. Triple Mahjong Tests
test('Triple Mahjong tray matches triplets and prevents overflow beyond capacity', () => {
  let tray = [];

  // Insert tile 1
  const t1 = { id: 'tr-1', tileId: 'dragon-red', x: 0, y: 0, z: 0 };
  const res1 = insertTileIntoTray(tray, t1);
  tray = res1.newTray;
  assert.equal(tray.length, 1);
  assert.equal(res1.matched, false);

  // Insert tile 2 (same symbol)
  const t2 = { id: 'tr-2', tileId: 'dragon-red', x: 2, y: 0, z: 0 };
  const res2 = insertTileIntoTray(tray, t2);
  tray = res2.newTray;
  assert.equal(tray.length, 2);
  assert.equal(res2.matched, false);

  // Insert tile 3 (same symbol -> triggers 3-match elimination!)
  const t3 = { id: 'tr-3', tileId: 'dragon-red', x: 4, y: 0, z: 0 };
  const res3 = insertTileIntoTray(tray, t3);
  tray = res3.newTray;
  assert.equal(res3.matched, true, 'Triplets must match and be eliminated');
  assert.equal(tray.length, 0, 'Tray must be empty after 3-match elimination');

  // Fill tray with 7 distinct tiles to test tray overflow detection
  tray = [];
  for (let i = 0; i < TRIPLE_TRAY_CAPACITY; i++) {
    const t = { id: `tr-fill-${i}`, tileId: ALL_TILE_IDS[i], x: i, y: 0, z: 0 };
    const res = insertTileIntoTray(tray, t);
    tray = res.newTray;
    if (i < TRIPLE_TRAY_CAPACITY - 1) {
      assert.equal(res.isFull, false);
    } else {
      assert.equal(res.isFull, true, 'Tray reaching 7 items without match must report isFull');
    }
  }
  assert.equal(tray.length, 7);
});

// 5. Deterministic Daily Challenge PRNG Tests
test('Deterministic PRNG produces identical sequence for same UTC date seed', () => {
  const date = getUtcDateString();
  const seed = `${date}_solitaire_easy`;

  const rng1 = createSeededRng(seed);
  const rng2 = createSeededRng(seed);

  const seq1 = Array.from({ length: 10 }, () => rng1());
  const seq2 = Array.from({ length: 10 }, () => rng2());

  assert.deepEqual(seq1, seq2, 'Seeded PRNG must be 100% deterministic');

  // Verify daily boards match
  const board1 = generateSolvableSolitaireBoard('easy', createSeededRng(seed));
  const board2 = generateSolvableSolitaireBoard('easy', createSeededRng(seed));

  assert.deepEqual(board1, board2, 'Daily challenge board generation must be identical for all players on the same date');
});

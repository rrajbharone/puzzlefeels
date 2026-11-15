import test from 'node:test';
import assert from 'node:assert/strict';
import {
  countInversions,
  isSolvable,
  isGoal,
  getNeighbors,
  isMoveLegal,
  generateSolvablePuzzle,
  formatTime
} from '../../src/lib/sliding-puzzle.js';

test('Solved arrangements are detected as goal and solvable', () => {
  // 3x3
  const solved3 = [1, 2, 3, 4, 5, 6, 7, 8, 0];
  assert.equal(isGoal(solved3), true);
  assert.equal(isSolvable(solved3, 3), true);
  assert.equal(countInversions(solved3), 0);

  // 4x4
  const solved4 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0];
  assert.equal(isGoal(solved4), true);
  assert.equal(isSolvable(solved4, 4), true);
  assert.equal(countInversions(solved4), 0);

  // 5x5
  const solved5 = Array.from({ length: 24 }, (_, i) => i + 1).concat(0);
  assert.equal(isGoal(solved5), true);
  assert.equal(isSolvable(solved5, 5), true);
  assert.equal(countInversions(solved5), 0);
});

test('Odd-width board solvability parity (3x3 and 5x5)', () => {
  // 3x3: Solvable iff inversions is even
  // Solved state with 1 and 2 swapped -> 1 inversion -> odd -> unsolvable
  const unsolvable3 = [2, 1, 3, 4, 5, 6, 7, 8, 0];
  assert.equal(isGoal(unsolvable3), false);
  assert.equal(countInversions(unsolvable3), 1);
  assert.equal(isSolvable(unsolvable3, 3), false);

  // Swap 1 and 2, and 4 and 5 -> 2 inversions -> even -> solvable
  const solvable3 = [2, 1, 3, 5, 4, 6, 7, 8, 0];
  assert.equal(countInversions(solvable3), 2);
  assert.equal(isSolvable(solvable3, 3), true);

  // 5x5: Single swap of 1 and 2 -> 1 inversion -> unsolvable
  const unsolvable5 = [2, 1, ...Array.from({ length: 22 }, (_, i) => i + 3), 0];
  assert.equal(countInversions(unsolvable5), 1);
  assert.equal(isSolvable(unsolvable5, 5), false);
});

test('Even-width board solvability parity and blank row handling (4x4)', () => {
  // In a 4x4 grid:
  // Row 3 (bottom row, 1 from bottom): blankRowFromBottom = 1 (odd) -> inversions must be even
  // Row 2 (2 from bottom): blankRowFromBottom = 2 (even) -> inversions must be odd
  // Row 1 (3 from bottom): blankRowFromBottom = 3 (odd) -> inversions must be even
  // Row 0 (top row, 4 from bottom): blankRowFromBottom = 4 (even) -> inversions must be odd

  // Classic 14-15 puzzle: blank at bottom-right (row 3, rowFromBottom = 1), 14 and 15 swapped
  // Inversions = 1 (odd). (1 + 1) = 2 (even, not odd) -> mathematically unsolvable!
  const classic1415 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 15, 14, 0];
  assert.equal(countInversions(classic1415), 1);
  assert.equal(isSolvable(classic1415, 4), false);

  // If blank is moved up to row 2 (index 11 by moving tile 12 down), rowFromBottom is 2 (even)
  // Inversions = 3 (odd: 13>12, 14>12, 15>12). (3 + 2) = 5 (odd) -> solvable!
  const boardRow2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 0, 13, 14, 15, 12];
  assert.equal(boardRow2.indexOf(0), 11);
  assert.equal(countInversions(boardRow2), 3);
  assert.equal(isSolvable(boardRow2, 4), true);

  // If blank is at top row (index 0), rowFromBottom = 4 (even)
  // Tiles: 0, 1, 2, ..., 15 -> inversions = 0. (0 + 4) = 4 (even) -> unsolvable
  const topBlankEvenInv = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  assert.equal(countInversions(topBlankEvenInv), 0);
  assert.equal(isSolvable(topBlankEvenInv, 4), false);

  // Top row blank with 1 inversion -> (1 + 4) = 5 (odd) -> solvable
  const topBlankOddInv = [0, 2, 1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  assert.equal(countInversions(topBlankOddInv), 1);
  assert.equal(isSolvable(topBlankOddInv, 4), true);
});

test('Movement legality and diagonal rejection', () => {
  // In a 3x3 board:
  // 0 1 2
  // 3 4 5
  // 6 7 8
  // If blank is at center (index 4):
  const neighbors = getNeighbors(4, 3);
  assert.deepEqual(neighbors.sort((a, b) => a - b), [1, 3, 5, 7]);

  // Valid moves to blank at 4
  assert.equal(isMoveLegal(1, 4, 3), true); // top
  assert.equal(isMoveLegal(7, 4, 3), true); // bottom
  assert.equal(isMoveLegal(3, 4, 3), true); // left
  assert.equal(isMoveLegal(5, 4, 3), true); // right

  // Diagonal moves (strictly rejected)
  assert.equal(isMoveLegal(0, 4, 3), false); // top-left
  assert.equal(isMoveLegal(2, 4, 3), false); // top-right
  assert.equal(isMoveLegal(6, 4, 3), false); // bottom-left
  assert.equal(isMoveLegal(8, 4, 3), false); // bottom-right

  // Distant tiles
  assert.equal(isMoveLegal(0, 8, 3), false);
  assert.equal(isMoveLegal(4, 4, 3), false); // same cell
});

test('Corner and edge legal moves', () => {
  // Top-left corner (0) in 4x4
  assert.deepEqual(getNeighbors(0, 4).sort((a, b) => a - b), [1, 4]);
  // Bottom-right corner (15) in 4x4
  assert.deepEqual(getNeighbors(15, 4).sort((a, b) => a - b), [11, 14]);
  // Right edge (7) in 4x4
  assert.deepEqual(getNeighbors(7, 4).sort((a, b) => a - b), [3, 6, 11]);
});

test('Puzzle generator always produces valid, solvable, non-goal puzzles', () => {
  for (const width of [3, 4, 5]) {
    for (let i = 0; i < 50; i++) {
      const puzzle = generateSolvablePuzzle(width);
      assert.equal(puzzle.board.length, width * width);
      assert.equal(isSolvable(puzzle.board, width), true, `Board must be solvable for width ${width}`);
      assert.equal(isGoal(puzzle.board), false, 'Generated board must not be solved immediately');
      assert.deepEqual(puzzle.board, puzzle.initialBoard);
    }
  }
});

test('Time formatting helper', () => {
  assert.equal(formatTime(0), '00:00');
  assert.equal(formatTime(9), '00:09');
  assert.equal(formatTime(65), '01:05');
  assert.equal(formatTime(720), '12:00');
});

import test from 'node:test';
import assert from 'node:assert/strict';

import {
  SQUARE_JAM_PUZZLES,
  getDailySquareJamPuzzle,
  validateSquareJam,
  checkPartialSquareJam
} from '../../src/data/squareJamPuzzles.ts';

test('Square Jam Puzzle Catalog Completeness', () => {
  assert.equal(SQUARE_JAM_PUZZLES.length, 15, 'Must contain exactly 15 handcrafted puzzles');
  const easy = SQUARE_JAM_PUZZLES.filter(p => p.difficulty === 'easy');
  const medium = SQUARE_JAM_PUZZLES.filter(p => p.difficulty === 'medium');
  const hard = SQUARE_JAM_PUZZLES.filter(p => p.difficulty === 'hard');

  assert.equal(easy.length, 5, 'Must contain 5 easy puzzles');
  assert.equal(medium.length, 5, 'Must contain 5 medium puzzles');
  assert.equal(hard.length, 5, 'Must contain 5 hard puzzles');

  for (const p of SQUARE_JAM_PUZZLES) {
    assert.ok(p.id, 'Puzzle must have an id');
    assert.ok(p.title, 'Puzzle must have a title');
    assert.ok(p.rows >= 5 && p.rows <= 10, 'Puzzle rows must be between 5 and 10');
    assert.ok(p.cols >= 5 && p.cols <= 10, 'Puzzle cols must be between 5 and 10');
    assert.equal(p.clues.length, p.rows, 'Clues row count matches rows');
    assert.equal(p.clues[0].length, p.cols, 'Clues col count matches cols');
    assert.ok(Array.isArray(p.solution) && p.solution.length > 0, 'Puzzle must have solution squares');
    assert.ok(Array.isArray(p.hintSteps) && p.hintSteps.length > 0, 'Puzzle must have hint steps');
  }
});

test('All 15 Square Jam Puzzle Solutions Pass Strict Validation', () => {
  for (const p of SQUARE_JAM_PUZZLES) {
    const res = validateSquareJam(p.rows, p.cols, p.clues, p.solution);
    assert.equal(res.valid, true, `Puzzle ${p.id} solution must be 100% valid. Reason: ${res.reason}`);
  }
});

test('Validation Engine Detects Rule Violations', () => {
  const p = SQUARE_JAM_PUZZLES[0]; // 5x5 easy-1

  // 1. Uncovered cells (remove one square)
  const incompleteSol = p.solution.slice(1);
  const resIncomplete = validateSquareJam(p.rows, p.cols, p.clues, incompleteSol);
  assert.equal(resIncomplete.valid, false, 'Incomplete board must fail validation');

  // 2. Overlapping squares
  const overlappingSol = [...p.solution, { r0: 0, c0: 0, s: 2 }];
  const resOverlap = validateSquareJam(p.rows, p.cols, p.clues, overlappingSol);
  assert.equal(resOverlap.valid, false, 'Overlapping squares must fail validation');

  // 3. Clue side-length mismatch
  // Find a clue on the board
  let clueR = -1, clueC = -1, clueVal = -1;
  for (let r = 0; r < p.rows; r++) {
    for (let c = 0; c < p.cols; c++) {
      if (p.clues[r][c] !== null) {
        clueR = r;
        clueC = c;
        clueVal = p.clues[r][c];
        break;
      }
    }
    if (clueR !== -1) break;
  }
  assert.ok(clueR !== -1, 'Must find a clue');
  // Corrupt clue to a different number
  const corruptClues = p.clues.map(r => [...r]);
  corruptClues[clueR][clueC] = clueVal === 1 ? 2 : 1;
  const resClueMismatch = validateSquareJam(p.rows, p.cols, corruptClues, p.solution);
  assert.equal(resClueMismatch.valid, false, 'Clue side length mismatch must fail validation');

  // 4. Tatami Rule violation (four 1x1 squares meeting at a 4-way cross)
  const tatamiClues = [
    [null, null],
    [null, null]
  ];
  const fourCrossSquares = [
    { r0: 0, c0: 0, s: 1 },
    { r0: 0, c0: 1, s: 1 },
    { r0: 1, c0: 0, s: 1 },
    { r0: 1, c0: 1, s: 1 }
  ];
  const resTatami = validateSquareJam(2, 2, tatamiClues, fourCrossSquares);
  assert.equal(resTatami.valid, false, 'Four 1x1 squares meeting at center must fail Tatami rule');
  assert.match(resTatami.reason, /Tatami violation/, 'Reason must mention Tatami violation');
});

test('checkPartialSquareJam Handles Partial Boards Correctly', () => {
  const p = SQUARE_JAM_PUZZLES[0];
  // Empty board
  const emptyRes = checkPartialSquareJam(p.rows, p.cols, p.clues, []);
  assert.equal(emptyRes.valid, true);

  // Valid partial placement (just the first square)
  const partialRes = checkPartialSquareJam(p.rows, p.cols, p.clues, [p.solution[0]]);
  assert.equal(partialRes.valid, true);
  assert.equal(partialRes.type, 'success');

  // Overlap in partial
  const badPartial = [p.solution[0], p.solution[0]];
  const overlapRes = checkPartialSquareJam(p.rows, p.cols, p.clues, badPartial);
  assert.equal(overlapRes.valid, false);
  assert.equal(overlapRes.type, 'error');
});

test('Daily Challenge Selector Works Deterministically', () => {
  const d1 = getDailySquareJamPuzzle('2026-11-18');
  const d2 = getDailySquareJamPuzzle('2026-11-18');
  const d3 = getDailySquareJamPuzzle('2026-11-19');

  assert.equal(d1.puzzle.id, d2.puzzle.id, 'Same UTC date must return identical daily challenge');
  assert.ok(d1.puzzle.id, 'Daily puzzle must exist');
  assert.ok(d1.dateStr, 'Daily date string must exist');
});

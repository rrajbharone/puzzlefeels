import test from 'node:test';
import assert from 'node:assert/strict';

import {
  SHAKASHAKA_PUZZLES,
  getDailyShakashakaPuzzle,
  validateShakashaka,
  TRIANGLE
} from '../../src/data/shakashakaPuzzles.ts';

test('Shakashaka Puzzle Catalog Completeness', () => {
  assert.equal(SHAKASHAKA_PUZZLES.length, 15, 'Must contain exactly 15 handcrafted puzzles');
  const easy = SHAKASHAKA_PUZZLES.filter(p => p.difficulty === 'easy');
  const medium = SHAKASHAKA_PUZZLES.filter(p => p.difficulty === 'medium');
  const hard = SHAKASHAKA_PUZZLES.filter(p => p.difficulty === 'hard');

  assert.equal(easy.length, 5, 'Must contain 5 easy puzzles');
  assert.equal(medium.length, 5, 'Must contain 5 medium puzzles');
  assert.equal(hard.length, 5, 'Must contain 5 hard puzzles');

  for (const p of SHAKASHAKA_PUZZLES) {
    assert.ok(p.id, 'Puzzle must have an id');
    assert.ok(p.title, 'Puzzle must have a title');
    assert.ok(p.rows >= 5 && p.rows <= 10, 'Puzzle rows must be between 5 and 10');
    assert.ok(p.cols >= 5 && p.cols <= 10, 'Puzzle cols must be between 5 and 10');
    assert.equal(p.initialGrid.length, p.rows, 'Initial grid row count matches rows');
    assert.equal(p.initialGrid[0].length, p.cols, 'Initial grid col count matches cols');
    assert.equal(p.solution.length, p.rows, 'Solution row count matches rows');
    assert.equal(p.solution[0].length, p.cols, 'Solution col count matches cols');
    assert.ok(Array.isArray(p.hintSteps) && p.hintSteps.length > 0, 'Puzzle must have hint steps');
  }
});

test('All 15 Shakashaka Puzzle Solutions Satisfy Geometric Rules', () => {
  for (const p of SHAKASHAKA_PUZZLES) {
    const res = validateShakashaka(p.cols, p.rows, p.clues, p.solution);
    assert.equal(res.valid, true, `Puzzle ${p.id} solution must be 100% valid. Reason: ${res.reason}`);
  }
});

test('Geometric Engine Correctly Detects Violations', () => {
  const p = SHAKASHAKA_PUZZLES[0]; // easy-1
  // Corrupt a triangle orientation (flip TL to TR)
  const badSol1 = p.solution.map(r => [...r]);
  badSol1[1][1] = TRIANGLE.TR;
  const res1 = validateShakashaka(p.cols, p.rows, p.clues, badSol1);
  assert.equal(res1.valid, false, 'Corrupted triangle orientation must fail validation');

  // Corrupt clue requirement: remove a needed triangle
  const badSol2 = p.solution.map(r => [...r]);
  badSol2[1][1] = TRIANGLE.NONE;
  const res2 = validateShakashaka(p.cols, p.rows, p.clues, badSol2);
  assert.equal(res2.valid, false, 'Missing triangle must fail clue validation');
});

test('Daily Challenge Selector Works Deterministically', () => {
  const d1 = getDailyShakashakaPuzzle('2026-11-17');
  const d2 = getDailyShakashakaPuzzle('2026-11-17');
  const d3 = getDailyShakashakaPuzzle('2026-11-18');

  assert.equal(d1.puzzle.id, d2.puzzle.id, 'Same UTC date must return identical daily challenge');
  assert.ok(d1.puzzle.id, 'Daily puzzle must exist');
  assert.ok(d1.dateStr, 'Daily date string must exist');
});

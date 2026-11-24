import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  BINAIRO_PUZZLES,
  getDailyBinairoPuzzle,
  getBinairoLogicalHint,
  validateBinairoBoard,
  solveBinairo
} from '../../src/data/binairoPuzzles.ts';

test('Binairo Puzzle Catalog Completeness and Distribution', () => {
  assert.equal(BINAIRO_PUZZLES.length, 18, 'Expected exactly 18 puzzles');

  const easy = BINAIRO_PUZZLES.filter(p => p.difficulty === 'easy');
  const medium = BINAIRO_PUZZLES.filter(p => p.difficulty === 'medium');
  const hard = BINAIRO_PUZZLES.filter(p => p.difficulty === 'hard');

  assert.equal(easy.length, 6, 'Expected 6 Easy puzzles');
  assert.equal(medium.length, 6, 'Expected 6 Medium puzzles');
  assert.equal(hard.length, 6, 'Expected 6 Hard puzzles');

  easy.forEach(p => assert.equal(p.size, 6, 'Easy grid must be 6x6'));
  medium.forEach(p => assert.equal(p.size, 8, 'Medium grid must be 8x8'));
  hard.forEach(p => assert.equal(p.size, 10, 'Hard grid must be 10x10'));
});

test('All 18 Binairo Puzzles have strictly 1 unique mathematical solution', () => {
  for (const p of BINAIRO_PUZZLES) {
    const sols = solveBinairo(p.clues, 2);
    assert.equal(sols.length, 1, `Puzzle ${p.id} (${p.name}) must have exactly 1 solution, got ${sols.length}`);

    // Verify the solution matches the recorded solution
    for (let r = 0; r < p.size; r++) {
      for (let c = 0; c < p.size; c++) {
        assert.equal(
          sols[0][r][c],
          p.solution[r][c],
          `Mismatch in solution for ${p.id} at (${r}, ${c})`
        );
      }
    }
  }
});

test('validateBinairoBoard validates all 4 rules correctly', () => {
  const easy1 = BINAIRO_PUZZLES[0];

  // 1. Starting clues are valid (partial)
  const initialVal = validateBinairoBoard(easy1.clues);
  assert.equal(initialVal.isValid, true, 'Starting board must be valid');
  assert.equal(initialVal.isComplete, false, 'Starting board is not complete');

  // 2. Full solution is completely valid and complete
  const solVal = validateBinairoBoard(easy1.solution);
  assert.equal(solVal.isValid, true, 'Solution must be valid');
  assert.equal(solVal.isComplete, true, 'Solution must be complete');

  // 3. Violation: 3 consecutive digits
  const badGrid1 = easy1.solution.map(r => [...r]);
  badGrid1[0][0] = 1;
  badGrid1[0][1] = 1;
  badGrid1[0][2] = 1; // 1 1 1 trio
  const trioVal = validateBinairoBoard(badGrid1);
  assert.equal(trioVal.isValid, false, '3 consecutive identical digits must violate rules');

  // 4. Violation: Duplicate completed rows
  const badGrid2 = easy1.solution.map(r => [...r]);
  badGrid2[1] = [...badGrid2[0]]; // duplicate row 0 into row 1
  const dupVal = validateBinairoBoard(badGrid2);
  assert.equal(dupVal.isValid, false, 'Duplicate completed rows must violate rules');
});

test('Logical Hint System generates clear step-by-step reasoning', () => {
  // Test Pair Rule: 0 0 _ => 1
  const testGrid = [
    [0, 0, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
  ];
  const hint1 = getBinairoLogicalHint(testGrid, null);
  assert.ok(hint1);
  assert.equal(hint1.type, 'pair');
  assert.equal(hint1.r, 0);
  assert.equal(hint1.c, 2);
  assert.equal(hint1.val, 1);
  assert.ok(hint1.message.includes('avoid three in a row'));

  // Test Gap Rule: 1 _ 1 => 0
  const gapGrid = [
    [1, null, 1, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
  ];
  const hint2 = getBinairoLogicalHint(gapGrid, null);
  assert.ok(hint2);
  assert.equal(hint2.type, 'gap');
  assert.equal(hint2.r, 0);
  assert.equal(hint2.c, 1);
  assert.equal(hint2.val, 0);
  assert.ok(hint2.message.includes('prevent three in a row'));

  // Test Quota Rule: row has 3 ones, remaining must be 0
  const quotaGrid = [
    [1, 1, 1, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
  ];
  // Although 1 1 1 has an error, let's test valid separated 3 ones:
  const quotaGridValid = [
    [1, 0, 1, 0, 1, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
  ];
  const hint3 = getBinairoLogicalHint(quotaGridValid, null);
  assert.ok(hint3);
  assert.equal(hint3.type, 'quota');
  assert.equal(hint3.r, 0);
  assert.equal(hint3.c, 5);
  assert.equal(hint3.val, 0);
  assert.ok(hint3.message.includes('full quota'));
});

test('Daily Challenge Selector Works Deterministically by UTC Date', () => {
  const d1 = new Date('2026-11-22T08:00:00Z');
  const d2 = new Date('2026-11-22T23:59:59Z');
  const d3 = new Date('2026-11-23T01:00:00Z');

  const puzzle1 = getDailyBinairoPuzzle(d1);
  const puzzle2 = getDailyBinairoPuzzle(d2);
  const puzzle3 = getDailyBinairoPuzzle(d3);

  // Same day must produce identical puzzle
  assert.equal(puzzle1.id, puzzle2.id);
  assert.equal(puzzle1.name, puzzle2.name);
  assert.deepEqual(puzzle1.clues, puzzle2.clues);

  // Next day must have different id
  assert.notEqual(puzzle1.id, puzzle3.id);
});

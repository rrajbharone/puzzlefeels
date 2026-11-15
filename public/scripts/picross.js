const STORE_KEY = 'pf-picross-v1';
const GAME_VERSION = 'picross-v1';

export const PICROSS_LEVELS = Object.freeze({
  beginner: Object.freeze({ label: 'Easy', baseScore: 300, timeTarget: 300, hintPenalty: 60, sizeLabel: '5 × 5 and 5 × 10' }),
  medium: Object.freeze({ label: 'Medium', baseScore: 700, timeTarget: 900, hintPenalty: 120, sizeLabel: '10 × 10' }),
  hard: Object.freeze({ label: 'Hard', baseScore: 1400, timeTarget: 1800, hintPenalty: 220, sizeLabel: '15 × 15' }),
});

export function normalizePicrossDiff(diff) {
  if (diff === 'easy') return 'beginner';
  return diff;
}

const puzzleRows = [
  { id: 'heart-5', difficulty: 'beginner', name: 'Heart', rows: ['.###.','#####','#####','.###.','..#..'] },
  { id: 'star-5', difficulty: 'beginner', name: 'Star', rows: ['..#..','.###.','#####','.###.','..#..'] },
  { id: 'house-5', difficulty: 'beginner', name: 'House', rows: ['..#..','.###.','#####','##.##','##.##'] },
  { id: 'fish-5x10', difficulty: 'beginner', name: 'Little Fish', rows: ['....#.....','...###....','##########','...###....','....#.....'] },
  { id: 'cat-10', difficulty: 'medium', name: 'Cat Face', rows: ['#........#','##......##','###....###','##########','##.####.##','##########','.########.','..######..','...####...','...####...'] },
  { id: 'butterfly-10', difficulty: 'medium', name: 'Butterfly', rows: ['##......##','###....###','####..####','##########','##########','####..####','###....###','##......##','.#......#.','..........'] },
  { id: 'flower-10', difficulty: 'medium', name: 'Flower', rows: ['....##....','...####...','..##..##..','##########','##########','..##..##..','...####...','....##....','....##....','...####...'] },
  { id: 'cat-15', difficulty: 'hard', name: 'Curious Cat', rows: ['#.............#','##...........##','###.........###','####.......####','###############','###.#######.###','###.#######.###','###############','.#############.','..###########..','...#########...','....#######....','.....#####.....','....##...##....','...###...###...'] },
  { id: 'rocket-15', difficulty: 'hard', name: 'Rocket', rows: ['.......#.......','......###......','.....#####.....','....#######....','...#########...','..###########..','.#############.','###############','..###.....###..','..###.....###..','..###.....###..','.#############.','.#############.','....###.###....','...##.....##...'] },
  { id: 'tree-15', difficulty: 'hard', name: 'Pine Tree', rows: ['.......#.......','......###......','.....#####.....','....#######....','...#########...','..###########..','.#############.','###############','....########...','......#####....','........###....','........###....','........###....','........###....','........###....'] },
];

export const PICROSS_PUZZLES = Object.freeze(puzzleRows.map((puzzle) =>
  Object.freeze({ ...puzzle, rows: Object.freeze([...puzzle.rows]) }),
));
const puzzleById = new Map(PICROSS_PUZZLES.map((puzzle) => [puzzle.id, puzzle]));
const puzzlesByLevel = Object.fromEntries(Object.keys(PICROSS_LEVELS).map((difficulty) => [
  difficulty,
  PICROSS_PUZZLES.filter((puzzle) => puzzle.difficulty === difficulty),
]));

export const CELL_UNKNOWN = 0;
export const CELL_FILLED = 1;
export const CELL_EMPTY = 2;

export function lineClues(values) {
  const clues = [];
  let run = 0;
  for (const value of values) {
    if (value === true || value === 1 || value === '#') run += 1;
    else if (run) {
      clues.push(run);
      run = 0;
    }
  }
  if (run) clues.push(run);
  return clues;
}

export function deriveRowClues(rows) {
  return rows.map((row) => lineClues([...row]));
}

export function deriveColumnClues(rows) {
  const width = rows[0]?.length || 0;
  return Array.from({ length: width }, (_, column) =>
    lineClues(rows.map((row) => row[column])),
  );
}

export function generateLinePatterns(length, clues) {
  if (!Number.isInteger(length) || length < 1 || !Array.isArray(clues)) return [];
  if (clues.length === 0) return [0];
  if (clues.some((clue) => !Number.isInteger(clue) || clue < 1) ||
    clues.reduce((sum, clue) => sum + clue, 0) + clues.length - 1 > length) return [];
  const patterns = [];
  function place(groupIndex, earliestStart, mask) {
    if (groupIndex === clues.length) {
      patterns.push(mask);
      return;
    }
    const remaining = clues.slice(groupIndex).reduce((sum, clue) => sum + clue, 0) +
      clues.length - groupIndex - 1;
    const latestStart = length - remaining;
    for (let start = earliestStart; start <= latestStart; start += 1) {
      let nextMask = mask;
      for (let offset = 0; offset < clues[groupIndex]; offset += 1) nextMask |= 1 << (start + offset);
      place(groupIndex + 1, start + clues[groupIndex] + 1, nextMask);
    }
  }
  place(0, 0, 0);
  return patterns;
}

export function solveClues(rowClues, columnClues, solutionLimit = 2) {
  const height = rowClues.length;
  const width = columnClues.length;
  if (!height || !width || solutionLimit < 1) return { count: 0, firstSolution: null };
  const rowPatterns = rowClues.map((clues) => generateLinePatterns(width, clues));
  const columnPatterns = columnClues.map((clues) => generateLinePatterns(height, clues));
  if (rowPatterns.some((patterns) => !patterns.length) || columnPatterns.some((patterns) => !patterns.length)) {
    return { count: 0, firstSolution: null };
  }
  let count = 0;
  let firstSolution = null;
  const chosen = [];
  function visit(rowIndex) {
    if (count >= solutionLimit) return;
    if (rowIndex === height) {
      count += 1;
      if (!firstSolution) firstSolution = [...chosen];
      return;
    }
    const prefixMask = (1 << (rowIndex + 1)) - 1;
    for (const rowMask of rowPatterns[rowIndex]) {
      chosen.push(rowMask);
      let compatible = true;
      for (let column = 0; column < width && compatible; column += 1) {
        let selectedPrefix = 0;
        for (let previousRow = 0; previousRow <= rowIndex; previousRow += 1) {
          if ((chosen[previousRow] >> column) & 1) selectedPrefix |= 1 << previousRow;
        }
        if (!columnPatterns[column].some((pattern) => (pattern & prefixMask) === selectedPrefix)) compatible = false;
      }
      if (compatible) visit(rowIndex + 1);
      chosen.pop();
      if (count >= solutionLimit) return;
    }
  }
  visit(0);
  return { count, firstSolution };
}

export function validatePicrossPuzzle(puzzle) {
  if (!puzzle || !Array.isArray(puzzle.rows) || !puzzle.rows.length) {
    return { valid: false, unique: false, solutionCount: 0, reason: 'Missing solution rows.' };
  }
  const width = puzzle.rows[0].length;
  if (!width || puzzle.rows.some((row) => row.length !== width || /[^.#]/.test(row))) {
    return { valid: false, unique: false, solutionCount: 0, reason: 'Rows must be rectangular and use only filled or empty cells.' };
  }
  const rowClues = deriveRowClues(puzzle.rows);
  const columnClues = deriveColumnClues(puzzle.rows);
  const solved = solveClues(rowClues, columnClues, 2);
  return {
    valid: solved.count > 0,
    unique: solved.count === 1,
    solutionCount: solved.count,
    rowClues,
    columnClues,
    reason: solved.count === 0 ? 'The derived clues have no solution.' :
      solved.count > 1 ? 'The derived clues have multiple solutions.' : '',
  };
}

export function utcPicrossDate(date = new Date()) {
  return date.toISOString().slice(0, 10);
}

function hashSeed(value) {
  let hash = 2166136261;
  for (const character of String(value)) {
    hash ^= character.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

export function dailyPicrossPuzzle(date = new Date()) {
  const dateKey = utcPicrossDate(date);
  return { dateKey, puzzle: PICROSS_PUZZLES[hashSeed(GAME_VERSION + ':' + dateKey) % PICROSS_PUZZLES.length] };
}

export function getPicrossScore(difficulty, elapsedSeconds, hintsUsed) {
  const level = PICROSS_LEVELS[difficulty];
  if (!level || !Number.isFinite(elapsedSeconds) || !Number.isInteger(hintsUsed) || hintsUsed < 0) return 0;
  const timeBonus = Math.max(0, level.timeTarget - Math.floor(elapsedSeconds));
  return Math.max(100, level.baseScore + timeBonus - hintsUsed * level.hintPenalty);
}

function safeRead() {
  try {
    const value = JSON.parse(localStorage.getItem(STORE_KEY) || '{}');
    return value && typeof value === 'object' && !Array.isArray(value) ? value : {};
  } catch {
    return {};
  }
}

function safeWrite(value) {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(value));
  } catch {
    // The puzzle remains playable when storage is unavailable.
  }
}

function validSnapshot(snapshot, cellCount) {
  return snapshot && Array.isArray(snapshot.cells) && snapshot.cells.length === cellCount &&
    snapshot.cells.every((cell) => [CELL_UNKNOWN, CELL_FILLED, CELL_EMPTY].includes(cell)) &&
    Number.isInteger(snapshot.moves) && snapshot.moves >= 0 &&
    Number.isInteger(snapshot.hintsUsed) && snapshot.hintsUsed >= 0;
}

export function isValidPicrossSession(session, today = utcPicrossDate()) {
  if (!session || !['playing', 'paused'].includes(session.status)) return false;
  const puzzle = puzzleById.get(session.puzzleId);
  if (!puzzle || puzzle.difficulty !== session.difficulty || !['standard', 'daily'].includes(session.mode)) return false;
  const cellCount = puzzle.rows.length * puzzle.rows[0].length;
  if (!Array.isArray(session.cells) || session.cells.length !== cellCount ||
    !session.cells.every((cell) => [CELL_UNKNOWN, CELL_FILLED, CELL_EMPTY].includes(cell))) return false;
  if (!Number.isInteger(session.moves) || session.moves < 0 ||
    !Number.isFinite(session.elapsedSeconds) || session.elapsedSeconds < 0 ||
    !Number.isInteger(session.hintsUsed) || session.hintsUsed < 0 ||
    !['fill', 'empty'].includes(session.modeSelection) ||
    typeof session.checkMistakes !== 'boolean' ||
    !Array.isArray(session.undoStack) || !Array.isArray(session.redoStack) ||
    !session.undoStack.every((snapshot) => validSnapshot(snapshot, cellCount)) ||
    !session.redoStack.every((snapshot) => validSnapshot(snapshot, cellCount))) return false;
  if (session.mode === 'daily') {
    const daily = dailyPicrossPuzzle(new Date(today + 'T12:00:00.000Z'));
    if (session.dailyDate !== today || daily.puzzle.id !== session.puzzleId) return false;
  }
  return true;
}

function createSession(puzzle, mode, dailyDate) {
  const count = puzzle.rows.length * puzzle.rows[0].length;
  return {
    status: 'playing',
    difficulty: puzzle.difficulty,
    puzzleId: puzzle.id,
    mode: mode || 'standard',
    dailyDate: dailyDate || null,
    cells: Array(count).fill(CELL_UNKNOWN),
    moves: 0,
    elapsedSeconds: 0,
    hintsUsed: 0,
    modeSelection: 'fill',
    checkMistakes: false,
    undoStack: [],
    redoStack: [],
    focusIndex: 0,
  };
}

function clueKey(values) {
  return values.join(',');
}

function solutionGrid(puzzle) {
  return puzzle.rows.map((row) => [...row].map((cell) => cell === '#'));
}

function lineIsComplete(cells, clues) {
  return cells.every((cell) => cell !== CELL_UNKNOWN) &&
    clueKey(lineClues(cells.map((cell) => cell === CELL_FILLED))) === clueKey(clues);
}

function formatTime(seconds) {
  const value = Math.max(0, Math.floor(seconds));
  const hours = Math.floor(value / 3600);
  const minutes = Math.floor((value % 3600) / 60);
  const remaining = value % 60;
  if (hours) return String(hours).padStart(2, '0') + ':' + String(minutes).padStart(2, '0') + ':' + String(remaining).padStart(2, '0');
  return String(minutes).padStart(2, '0') + ':' + String(remaining).padStart(2, '0');
}

if (typeof document !== 'undefined') bootPicross();

function bootPicross() {
  const root = document.querySelector('[data-picross]');
  if (!root) return;
  const byId = (id) => root.querySelector('#' + id);
  const screenIds = ['picross-ready', 'picross-play', 'picross-paused', 'picross-result'];
  let selectedDifficulty = 'beginner';
  let session = null;
  let activePuzzle = null;
  let timer = null;
  let lastResult = null;
  const nextPuzzleIndex = Object.fromEntries(Object.keys(PICROSS_LEVELS).map((difficulty) => [difficulty, 0]));

  function switchScreen(activeId) {
    for (const id of screenIds) byId(id).hidden = id !== activeId;
  }

  function getStoredActive() {
    const saved = safeRead();
    return isValidPicrossSession(saved.active) ? saved.active : null;
  }

  function persist() {
    const saved = safeRead();
    if (!saved.best || typeof saved.best !== 'object' || Array.isArray(saved.best)) saved.best = {};
    if (!saved.dailyCompleted || typeof saved.dailyCompleted !== 'object' || Array.isArray(saved.dailyCompleted)) saved.dailyCompleted = {};
    saved.active = session && ['playing', 'paused'].includes(session.status) ? session : null;
    safeWrite(saved);
  }

  function snapshot() {
    return { cells: [...session.cells], moves: session.moves, hintsUsed: session.hintsUsed };
  }

  function restoreSnapshot(value) {
    session.cells = [...value.cells];
    session.moves = value.moves;
    session.hintsUsed = value.hintsUsed;
  }

  function pushUndoPoint() {
    session.undoStack.push(snapshot());
    if (session.undoStack.length > 100) session.undoStack.shift();
    session.redoStack = [];
  }

  function puzzleClues() {
    return { rows: deriveRowClues(activePuzzle.rows), columns: deriveColumnClues(activePuzzle.rows) };
  }

  function addClueText(element, numbers, fallback) {
    const text = document.createElement('span');
    text.className = 'picross-clue-numbers';
    text.textContent = numbers.length ? numbers.join(' ') : fallback;
    element.append(text);
  }

  function isMistake(index, solution) {
    if (!session.checkMistakes || session.cells[index] === CELL_UNKNOWN) return false;
    return (session.cells[index] === CELL_FILLED) !== solution;
  }

  function renderBoard() {
    if (!session || !activePuzzle) return;
    const height = activePuzzle.rows.length;
    const width = activePuzzle.rows[0].length;
    const solution = solutionGrid(activePuzzle);
    const clues = puzzleClues();
    const clueDepth = Math.max(1, ...clues.columns.map((line) => line.length));
    const board = byId('picross-board');
    board.style.setProperty('--picross-size', String(width));
    board.style.setProperty('--picross-clue-depth', String(clueDepth));
    board.setAttribute('aria-label', width + ' columns by ' + height + ' rows. Fill cells or mark them empty.');
    const fragment = document.createDocumentFragment();
    const corner = document.createElement('div');
    corner.className = 'picross-corner';
    corner.setAttribute('aria-hidden', 'true');
    fragment.append(corner);

    clues.columns.forEach((line, column) => {
      const columnCells = Array.from({ length: height }, (_, row) => session.cells[row * width + column]);
      const complete = lineIsComplete(columnCells, line);
      const clue = document.createElement('div');
      clue.className = 'picross-column-clue' + (complete ? ' is-complete' : '');
      clue.id = 'picross-column-' + column;
      clue.style.gridColumn = String(column + 2);
      clue.style.gridRow = '1';
      clue.setAttribute('aria-label', 'Column ' + (column + 1) + ' clue: ' + (line.join(', ') || 'no filled cells') + (complete ? ', complete' : ''));
      if (complete) clue.dataset.complete = 'true';
      addClueText(clue, [...line].reverse(), '—');
      if (complete) {
        const check = document.createElement('span');
        check.className = 'picross-clue-check';
        check.setAttribute('aria-hidden', 'true');
        check.textContent = '✓';
        clue.append(check);
      }
      fragment.append(clue);
    });

    for (let row = 0; row < height; row += 1) {
      const rowCells = session.cells.slice(row * width, (row + 1) * width);
      const rowComplete = lineIsComplete(rowCells, clues.rows[row]);
      const rowClue = document.createElement('div');
      rowClue.className = 'picross-row-clue' + (rowComplete ? ' is-complete' : '');
      rowClue.id = 'picross-row-' + row;
      rowClue.style.gridColumn = '1';
      rowClue.style.gridRow = String(row + 2);
      rowClue.setAttribute('aria-label', 'Row ' + (row + 1) + ' clue: ' + (clues.rows[row].join(', ') || 'no filled cells') + (rowComplete ? ', complete' : ''));
      if (rowComplete) rowClue.dataset.complete = 'true';
      addClueText(rowClue, clues.rows[row], '—');
      if (rowComplete) {
        const check = document.createElement('span');
        check.className = 'picross-clue-check';
        check.setAttribute('aria-hidden', 'true');
        check.textContent = '✓';
        rowClue.append(check);
      }
      fragment.append(rowClue);

      for (let column = 0; column < width; column += 1) {
        const index = row * width + column;
        const cell = document.createElement('button');
        const incorrect = isMistake(index, solution[row][column]);
        cell.type = 'button';
        cell.className = 'picross-cell' +
          (session.cells[index] === CELL_FILLED ? ' is-filled' : '') +
          (session.cells[index] === CELL_EMPTY ? ' is-empty' : '') +
          (incorrect ? ' is-mistake' : '') +
          (column < width - 1 && (column === 4 || column === 9) ? ' major-right' : '') +
          (row < height - 1 && (row === 4 || row === 9) ? ' major-bottom' : '');
        cell.style.gridColumn = String(column + 2);
        cell.style.gridRow = String(row + 2);
        cell.dataset.index = String(index);
        cell.setAttribute('role', 'gridcell');
        const stateLabel = session.cells[index] === CELL_FILLED ? 'filled' :
          session.cells[index] === CELL_EMPTY ? 'marked empty' : 'unknown';
        cell.setAttribute('aria-label', 'Row ' + (row + 1) + ', column ' + (column + 1) + ': ' + stateLabel + (incorrect ? ', marked incorrectly' : ''));
        cell.setAttribute('aria-describedby', 'picross-row-' + row + ' picross-column-' + column);
        cell.setAttribute('aria-pressed', String(session.cells[index] !== CELL_UNKNOWN));
        cell.tabIndex = index === (session.focusIndex || 0) ? 0 : -1;
        if (session.cells[index] === CELL_EMPTY) {
          const mark = document.createElement('span');
          mark.className = 'picross-empty-mark';
          mark.setAttribute('aria-hidden', 'true');
          mark.textContent = '×';
          cell.append(mark);
        }
        fragment.append(cell);
      }
    }
    board.replaceChildren(fragment);
    updateGameInfo();
  }

  function updateGameInfo() {
    const width = activePuzzle.rows[0].length;
    const height = activePuzzle.rows.length;
    const solution = solutionGrid(activePuzzle);
    const correct = session.cells.reduce((count, value, index) => {
      const expected = solution[Math.floor(index / width)][index % width];
      return count + (value !== CELL_UNKNOWN && (value === CELL_FILLED) === expected ? 1 : 0);
    }, 0);
    const percent = Math.round((correct / session.cells.length) * 100);
    byId('picross-puzzle-name').textContent = activePuzzle.name + ' · ' + width + ' × ' + height;
    byId('picross-difficulty-label').textContent = PICROSS_LEVELS[session.difficulty].label +
      (session.mode === 'daily' ? ' · Daily Challenge' : '');
    byId('picross-timer').textContent = formatTime(session.elapsedSeconds);
    byId('picross-moves').textContent = String(session.moves);
    byId('picross-progress-value').textContent = percent + '% correct';
    byId('picross-progress').setAttribute('aria-valuenow', String(percent));
    byId('picross-progress-fill').style.width = percent + '%';
    byId('picross-undo').disabled = !session.undoStack.length;
    byId('picross-redo').disabled = !session.redoStack.length;
    byId('picross-check-mistakes').checked = session.checkMistakes;
    byId('picross-mode-fill').setAttribute('aria-pressed', String(session.modeSelection === 'fill'));
    byId('picross-mode-empty').setAttribute('aria-pressed', String(session.modeSelection === 'empty'));
    byId('picross-mode-name').textContent = session.modeSelection === 'fill' ? 'Fill' : 'Mark empty';
    const restart = byId('picross-restart');
    restart.disabled = session.mode === 'daily' && session.moves > 0;
    restart.title = restart.disabled ? 'A Daily Challenge cannot be restarted after you begin.' : 'Restart this puzzle';
    const newPuzzle = byId('picross-new-puzzle');
    newPuzzle.disabled = session.mode === 'daily';
    newPuzzle.title = session.mode === 'daily' ? 'One shared Daily Challenge is available each UTC day.' : 'Start another puzzle at this difficulty.';
    byId('picross-status').textContent = session.mode === 'daily'
      ? 'Daily puzzle for ' + session.dailyDate + ' UTC. Your progress is saved on this device.'
      : activePuzzle.name + ': mark every cell as filled or empty to finish.';
  }

  function isSolved() {
    if (!session || !activePuzzle || session.cells.some((value) => value === CELL_UNKNOWN)) return false;
    const solution = solutionGrid(activePuzzle);
    const width = activePuzzle.rows[0].length;
    return session.cells.every((value, index) =>
      (value === CELL_FILLED) === solution[Math.floor(index / width)][index % width],
    );
  }

  function saveAndRender() {
    renderBoard();
    persist();
    if (session.cells.every((value) => value !== CELL_UNKNOWN) && isSolved()) finishPuzzle();
  }

  function updateCell(index, desiredState) {
    if (!session || session.status !== 'playing' || index < 0 || index >= session.cells.length) return;
    const next = session.cells[index] === desiredState ? CELL_UNKNOWN : desiredState;
    pushUndoPoint();
    session.cells[index] = next;
    session.moves += 1;
    saveAndRender();
  }

  function actionFromMode(index) {
    updateCell(index, session.modeSelection === 'fill' ? CELL_FILLED : CELL_EMPTY);
  }

  function undo() {
    if (!session || !session.undoStack.length) return;
    session.redoStack.push(snapshot());
    restoreSnapshot(session.undoStack.pop());
    saveAndRender();
  }

  function redo() {
    if (!session || !session.redoStack.length) return;
    session.undoStack.push(snapshot());
    restoreSnapshot(session.redoStack.pop());
    saveAndRender();
  }

  function filteredPatterns(clues, cells) {
    return generateLinePatterns(cells.length, clues).filter((pattern) =>
      cells.every((value, index) => value === CELL_UNKNOWN ||
        Boolean((pattern >> index) & 1) === (value === CELL_FILLED)),
    );
  }

  function findHint() {
    if (!session || !activePuzzle) return null;
    const width = activePuzzle.rows[0].length;
    const height = activePuzzle.rows.length;
    const clues = puzzleClues();
    const deductions = [];
    for (let row = 0; row < height; row += 1) {
      const line = session.cells.slice(row * width, (row + 1) * width);
      const candidates = filteredPatterns(clues.rows[row], line);
      if (!candidates.length) continue;
      for (let column = 0; column < width; column += 1) {
        if (line[column] !== CELL_UNKNOWN) continue;
        const filledCount = candidates.reduce((sum, pattern) => sum + ((pattern >> column) & 1), 0);
        if (filledCount === 0 || filledCount === candidates.length) {
          deductions.push({ index: row * width + column, row, column, filled: filledCount > 0, strength: candidates.length });
        }
      }
    }
    for (let column = 0; column < width; column += 1) {
      const line = Array.from({ length: height }, (_, row) => session.cells[row * width + column]);
      const candidates = filteredPatterns(clues.columns[column], line);
      if (!candidates.length) continue;
      for (let row = 0; row < height; row += 1) {
        if (line[row] !== CELL_UNKNOWN) continue;
        const filledCount = candidates.reduce((sum, pattern) => sum + ((pattern >> row) & 1), 0);
        if (filledCount === 0 || filledCount === candidates.length) {
          deductions.push({ index: row * width + column, row, column, filled: filledCount > 0, strength: candidates.length });
        }
      }
    }
    deductions.sort((first, second) => first.strength - second.strength);
    if (deductions.length) return deductions[0];
    const unknown = session.cells.findIndex((value) => value === CELL_UNKNOWN);
    if (unknown < 0) return null;
    const solution = solutionGrid(activePuzzle);
    const row = Math.floor(unknown / width);
    const column = unknown % width;
    return { index: unknown, row, column, filled: solution[row][column], strength: 0 };
  }

  function giveHint() {
    if (!session || session.status !== 'playing') return;
    const hint = findHint();
    if (!hint) {
      byId('picross-status').textContent = 'There are no unknown cells left to hint.';
      return;
    }
    pushUndoPoint();
    session.cells[hint.index] = hint.filled ? CELL_FILLED : CELL_EMPTY;
    session.moves += 1;
    session.hintsUsed += 1;
    saveAndRender();
    byId('picross-status').textContent = 'Hint: row ' + (hint.row + 1) + ', column ' + (hint.column + 1) +
      ' is ' + (hint.filled ? 'filled' : 'empty') + '. The clue pattern determines this cell.';
  }

  function startTimer() {
    stopTimer();
    timer = setInterval(() => {
      if (session?.status !== 'playing') return;
      session.elapsedSeconds += 1;
      byId('picross-timer').textContent = formatTime(session.elapsedSeconds);
      persist();
    }, 1000);
  }

  function stopTimer() {
    clearInterval(timer);
    timer = null;
  }

  function startSession(puzzle, mode, dailyDate) {
    session = createSession(puzzle, mode, dailyDate);
    activePuzzle = puzzle;
    lastResult = null;
    switchScreen('picross-play');
    renderBoard();
    persist();
    startTimer();
  }

  function updateDiffButtons(difficulty) {
    const normalized = normalizePicrossDiff(difficulty);
    selectedDifficulty = normalized;
    root.querySelectorAll('.picross-diff-btn, [data-picross-difficulty], [data-difficulty]').forEach((btn) => {
      const btnDiff = normalizePicrossDiff(btn.dataset.picrossDifficulty || btn.dataset.difficulty);
      const isMatch = btnDiff === normalized;
      btn.classList.toggle('is-active', isMatch);
      btn.classList.toggle('is-selected', isMatch);
      btn.setAttribute('aria-pressed', String(isMatch));
    });
    const summary = byId('picross-difficulty-summary');
    if (summary && PICROSS_LEVELS[normalized]) {
      summary.textContent = PICROSS_LEVELS[normalized].sizeLabel + ' · ' + (puzzlesByLevel[normalized]?.length || 0) + ' original puzzles';
    }
  }

  function startNewPuzzle(difficulty = selectedDifficulty, bypassConfirm = false) {
    const norm = normalizePicrossDiff(difficulty);
    const active = getStoredActive();
    if (!bypassConfirm && active && active.moves > 0 &&
      !window.confirm('Start a new puzzle? Your saved Picross progress will be replaced.')) return;
    const list = puzzlesByLevel[norm];
    if (!list?.length) return;
    const index = nextPuzzleIndex[norm] || 0;
    const puzzle = list[index % list.length];
    nextPuzzleIndex[norm] = (index + 1) % list.length;
    selectedDifficulty = norm;
    updateDiffButtons(norm);
    startSession(puzzle, 'standard', null);
  }

  function dailyCompletedToday() {
    const store = safeRead();
    return Boolean(store.dailyCompleted?.[utcPicrossDate()]);
  }

  function updateReady() {
    const active = getStoredActive();
    const continueButton = byId('picross-continue');
    if (continueButton) {
      continueButton.hidden = !active;
      if (active) {
        const puzzle = puzzleById.get(active.puzzleId);
        continueButton.textContent = 'Continue ' + PICROSS_LEVELS[active.difficulty].label + ' · ' + puzzle.name;
      }
    }
    const daily = dailyPicrossPuzzle();
    const activeDaily = active?.mode === 'daily' && active.dailyDate === daily.dateKey;
    const completed = dailyCompletedToday();
    const dailyButton = byId('picross-daily');
    if (dailyButton) {
      dailyButton.disabled = completed;
      dailyButton.textContent = completed ? 'Today’s Daily Challenge · Complete' :
        activeDaily ? 'Continue today’s Daily Challenge' : 'Play today’s Daily Challenge';
    }
    const dailyStatus = byId('picross-daily-status');
    if (dailyStatus) {
      dailyStatus.textContent = completed
        ? 'TODAY’S UTC CHALLENGE · COMPLETED'
        : 'TODAY’S UTC CHALLENGE · ' + daily.puzzle.name.toUpperCase();
    }
  }

  function resumeSession(saved) {
    if (!isValidPicrossSession(saved)) {
      updateReady();
      return;
    }
    session = {
      ...saved,
      cells: [...saved.cells],
      undoStack: saved.undoStack.map((value) => ({ ...value, cells: [...value.cells] })),
      redoStack: saved.redoStack.map((value) => ({ ...value, cells: [...value.cells] })),
      status: 'playing',
    };
    activePuzzle = puzzleById.get(session.puzzleId);
    selectedDifficulty = session.difficulty;
    updateDiffButtons(session.difficulty);
    const levelPuzzles = puzzlesByLevel[selectedDifficulty];
    nextPuzzleIndex[selectedDifficulty] = (levelPuzzles.findIndex((puzzle) => puzzle.id === activePuzzle.id) + 1) % levelPuzzles.length;
    switchScreen('picross-play');
    renderBoard();
    persist();
    startTimer();
    byId('picross-status').textContent = 'Resumed ' + activePuzzle.name + '. Your cells, timer, and undo history were restored.';
  }

  function startDaily(bypassConfirm = false) {
    const daily = dailyPicrossPuzzle();
    if (dailyCompletedToday()) {
      updateReady();
      return;
    }
    const active = getStoredActive();
    if (active?.mode === 'daily' && active.dailyDate === daily.dateKey) {
      resumeSession(active);
      return;
    }
    if (!bypassConfirm && active && active.moves > 0 &&
      !window.confirm('Start today’s Daily Challenge? Your saved Picross progress will be replaced.')) return;
    selectedDifficulty = daily.puzzle.difficulty;
    updateDiffButtons(selectedDifficulty);
    startSession(daily.puzzle, 'daily', daily.dateKey);
  }

  function restartPuzzle() {
    if (!session || (session.mode === 'daily' && session.moves > 0)) return;
    if (session.moves > 0 && !window.confirm('Restart this puzzle? Your marks, timer, and undo history will be cleared.')) return;
    const current = activePuzzle;
    const mode = session.mode;
    const date = session.dailyDate;
    startSession(current, mode, date);
  }

  function pauseGame() {
    if (!session || session.status !== 'playing') return;
    session.status = 'paused';
    persist();
    stopTimer();
    switchScreen('picross-paused');
  }

  function resumeGame() {
    if (!session || session.status !== 'paused') return;
    session.status = 'playing';
    switchScreen('picross-play');
    renderBoard();
    persist();
    startTimer();
  }

  function goToReady() {
    startNewPuzzle(selectedDifficulty || 'beginner', true);
  }

  function renderVictoryArt() {
    const art = byId('picross-victory-art');
    const fragment = document.createDocumentFragment();
    activePuzzle.rows.forEach((row) => {
      [...row].forEach((pixel) => {
        const cell = document.createElement('span');
        cell.className = 'picross-art-pixel' + (pixel === '#' ? ' is-art-filled' : '');
        cell.setAttribute('aria-hidden', 'true');
        fragment.append(cell);
      });
    });
    art.style.setProperty('--art-width', String(activePuzzle.rows[0].length));
    art.replaceChildren(fragment);
    art.setAttribute('aria-label', 'Completed ' + activePuzzle.name + ' pixel art.');
  }

  function finishPuzzle() {
    if (!session || !activePuzzle || session.status !== 'playing') return;
    stopTimer();
    session.status = 'won';
    const score = getPicrossScore(session.difficulty, session.elapsedSeconds, session.hintsUsed);
    const saved = safeRead();
    const best = saved.best && typeof saved.best === 'object' && !Array.isArray(saved.best) ? { ...saved.best } : {};
    best[session.difficulty] = Math.max(Number.isFinite(best[session.difficulty]) ? best[session.difficulty] : 0, score);
    saved.best = best;
    saved.active = null;
    if (session.mode === 'daily') {
      const completed = saved.dailyCompleted && typeof saved.dailyCompleted === 'object' && !Array.isArray(saved.dailyCompleted)
        ? { ...saved.dailyCompleted }
        : {};
      completed[session.dailyDate] = { puzzleId: session.puzzleId, score, elapsedSeconds: session.elapsedSeconds };
      saved.dailyCompleted = completed;
    }
    const results = Array.isArray(saved.results) ? saved.results : [];
    saved.results = [...results, { puzzleId: session.puzzleId, difficulty: session.difficulty, score, elapsedSeconds: session.elapsedSeconds, hintsUsed: session.hintsUsed }].slice(-20);
    safeWrite(saved);
    lastResult = { puzzleId: session.puzzleId, difficulty: session.difficulty, score, elapsedSeconds: session.elapsedSeconds, hintsUsed: session.hintsUsed, mode: session.mode };
    byId('picross-result-puzzle').textContent = activePuzzle.name;
    byId('picross-result-difficulty').textContent = PICROSS_LEVELS[session.difficulty].label +
      (session.mode === 'daily' ? ' · Daily Challenge' : '');
    byId('picross-result-time').textContent = formatTime(session.elapsedSeconds);
    byId('picross-result-hints').textContent = String(session.hintsUsed);
    byId('picross-result-score').textContent = String(score);
    byId('picross-result-best').textContent = String(best[session.difficulty]);
    byId('picross-result-message').textContent = 'Every cell now agrees with both clue sets. Here is the picture you uncovered.';
    byId('picross-share-status').textContent = '';
    renderVictoryArt();
    switchScreen('picross-result');
    updateReady();
  }

  function shareMessage() {
    if (!lastResult) return '';
    return 'I solved the ' + PICROSS_LEVELS[lastResult.difficulty].label + ' Picross Game Online on PuzzleFeels.com in ' +
      formatTime(lastResult.elapsedSeconds) + ' with ' + lastResult.hintsUsed + ' hints and scored ' +
      lastResult.score + ' points. Try it free: https://puzzlefeels.com/picross-game-online/';
  }

  async function copyText(value) {
    if (navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(value);
        return true;
      } catch { /* Use the local copy fallback. */ }
    }
    try {
      const field = document.createElement('textarea');
      field.value = value;
      field.readOnly = true;
      field.style.position = 'fixed';
      field.style.left = '-9999px';
      document.body.append(field);
      field.select();
      const copied = document.execCommand('copy');
      field.remove();
      return copied;
    } catch {
      return false;
    }
  }

  async function shareResult() {
    if (!lastResult) return;
    const message = shareMessage();
    const feedback = byId('picross-share-status');
    if (navigator.share) {
      try {
        await navigator.share({ title: 'My Picross result · PuzzleFeels', text: message });
        feedback.textContent = 'Thanks for sharing your result!';
        return;
      } catch (error) {
        if (error?.name === 'AbortError') return;
      }
    }
    feedback.textContent = await copyText(message)
      ? 'Result copied to your clipboard.'
      : 'Could not copy the result. Please try again.';
  }

  function setMode(mode) {
    if (!session || !['fill', 'empty'].includes(mode)) return;
    session.modeSelection = mode;
    byId('picross-mode-fill').setAttribute('aria-pressed', String(mode === 'fill'));
    byId('picross-mode-empty').setAttribute('aria-pressed', String(mode === 'empty'));
    byId('picross-mode-name').textContent = mode === 'fill' ? 'Fill' : 'Mark empty';
    persist();
  }

  function bindControls() {
    root.querySelectorAll('.picross-diff-btn, [data-picross-difficulty], [data-difficulty]').forEach((button) => {
      button.addEventListener('click', () => {
        const diff = normalizePicrossDiff(button.dataset.picrossDifficulty || button.dataset.difficulty);
        if (!diff) return;
        if (!session || session.difficulty !== diff || session.status !== 'playing') {
          startNewPuzzle(diff, true);
        } else if (session.moves > 0) {
          if (window.confirm('Start a new puzzle? Your current progress will be lost.')) {
            startNewPuzzle(diff, true);
          }
        }
      });
    });
    byId('picross-start')?.addEventListener('click', () => startNewPuzzle(selectedDifficulty, true));
    byId('picross-continue')?.addEventListener('click', () => resumeSession(getStoredActive()));
    byId('picross-daily')?.addEventListener('click', () => startDaily(false));
    byId('picross-mode-fill')?.addEventListener('click', () => setMode('fill'));
    byId('picross-mode-empty')?.addEventListener('click', () => setMode('empty'));
    byId('picross-undo')?.addEventListener('click', undo);
    byId('picross-redo')?.addEventListener('click', redo);
    byId('picross-hint')?.addEventListener('click', giveHint);
    byId('picross-check-mistakes')?.addEventListener('change', (event) => {
      if (!session) return;
      session.checkMistakes = event.currentTarget.checked;
      renderBoard();
      persist();
    });
    byId('picross-restart')?.addEventListener('click', restartPuzzle);
    byId('picross-new-puzzle')?.addEventListener('click', () => startNewPuzzle(session?.difficulty || selectedDifficulty, false));
    byId('picross-pause')?.addEventListener('click', pauseGame);
    byId('picross-resume')?.addEventListener('click', resumeGame);
    byId('picross-paused-new')?.addEventListener('click', goToReady);
    byId('picross-play-again')?.addEventListener('click', () => startNewPuzzle(lastResult?.difficulty || selectedDifficulty, true));
    byId('picross-result-new')?.addEventListener('click', goToReady);
    byId('picross-share')?.addEventListener('click', shareResult);

    const board = byId('picross-board');
    board.addEventListener('click', (event) => {
      const cell = event.target.closest('.picross-cell');
      if (cell && board.contains(cell)) actionFromMode(Number(cell.dataset.index));
    });
    board.addEventListener('contextmenu', (event) => {
      const cell = event.target.closest('.picross-cell');
      if (!cell || !board.contains(cell)) return;
      event.preventDefault();
      updateCell(Number(cell.dataset.index), CELL_EMPTY);
    });
    board.addEventListener('keydown', (event) => {
      const cell = event.target.closest('.picross-cell');
      if (!cell || !session) return;
      const index = Number(cell.dataset.index);
      const width = activePuzzle.rows[0].length;
      const height = activePuzzle.rows.length;
      const row = Math.floor(index / width);
      const column = index % width;
      let next = index;
      if (event.key === 'ArrowLeft') next = row * width + Math.max(0, column - 1);
      else if (event.key === 'ArrowRight') next = row * width + Math.min(width - 1, column + 1);
      else if (event.key === 'ArrowUp') next = Math.max(0, row - 1) * width + column;
      else if (event.key === 'ArrowDown') next = Math.min(height - 1, row + 1) * width + column;
      else if (event.key.toLowerCase() === 'f') {
        event.preventDefault();
        setMode('fill');
        actionFromMode(index);
        return;
      } else if (event.key.toLowerCase() === 'x') {
        event.preventDefault();
        setMode('empty');
        actionFromMode(index);
        return;
      } else return;
      event.preventDefault();
      session.focusIndex = next;
      renderBoard();
      board.querySelector('[data-index="' + next + '"]')?.focus();
    });
  }

  bindControls();
  const query = new URLSearchParams(window.location.search);
  const isDaily = query.has('daily');
  if (isDaily) {
    const readyLabel = byId('picross-ready-label');
    if (readyLabel) readyLabel.textContent = 'DAILY CHALLENGE · ' + utcPicrossDate() + ' UTC';
    byId('picross-daily')?.classList.add('picross-daily-highlight');
    startDaily(true);
  } else {
    const saved = getStoredActive();
    if (saved) {
      resumeSession(saved);
    } else {
      // Automatically start in Easy mode directly on page load
      startNewPuzzle('beginner', true);
    }
  }
  updateReady();
}

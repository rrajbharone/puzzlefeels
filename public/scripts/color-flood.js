const STORE_KEY = 'pf-color-flood-v1';
const GAME_VERSION = 'color-flood-v1';

export const FLOOD_LEVELS = Object.freeze({
  easy: Object.freeze({ size: 10, colorCount: 4, moveLimit: 18, baseScore: 300, moveBonus: 20, label: 'Easy' }),
  medium: Object.freeze({ size: 14, colorCount: 5, moveLimit: 30, baseScore: 600, moveBonus: 35, label: 'Medium' }),
  hard: Object.freeze({ size: 18, colorCount: 6, moveLimit: 44, baseScore: 1000, moveBonus: 50, label: 'Hard' }),
});

export const FLOOD_COLORS = Object.freeze([
  Object.freeze({ name: 'Coral', value: '#ef6b67' }),
  Object.freeze({ name: 'Tangerine', value: '#efa347' }),
  Object.freeze({ name: 'Sunflower', value: '#e8ce4f' }),
  Object.freeze({ name: 'Jade', value: '#48ad83' }),
  Object.freeze({ name: 'Blue', value: '#5187dc' }),
  Object.freeze({ name: 'Violet', value: '#916bd0' }),
]);

function hashSeed(seed) {
  let value = 2166136261;
  for (const char of String(seed)) {
    value ^= char.charCodeAt(0);
    value = Math.imul(value, 16777619);
  }
  return value >>> 0;
}

export function seededRandom(seed) {
  let value = hashSeed(seed) || 1;
  return () => {
    value = (Math.imul(value, 1664525) + 1013904223) >>> 0;
    return value / 4294967296;
  };
}

export function utcDateKey(date = new Date()) {
  return date.toISOString().slice(0, 10);
}

export function generateBoard(size, colorCount, seed) {
  const random = seededRandom(seed);
  return Array.from({ length: size * size }, () => Math.floor(random() * colorCount));
}

function neighbors(index, size) {
  const row = Math.floor(index / size);
  const column = index % size;
  const result = [];
  if (column > 0) result.push(index - 1);
  if (column < size - 1) result.push(index + 1);
  if (row > 0) result.push(index - size);
  if (row < size - 1) result.push(index + size);
  return result;
}

export function initialRegion(board, size) {
  if (!Array.isArray(board) || board.length !== size * size) return [];
  const color = board[0];
  const region = new Uint8Array(board.length);
  const queue = [0];
  region[0] = 1;
  for (let head = 0; head < queue.length; head += 1) {
    for (const next of neighbors(queue[head], size)) {
      if (!region[next] && board[next] === color) {
        region[next] = 1;
        queue.push(next);
      }
    }
  }
  return queue;
}

export function expandFlood(board, size, region, currentColor, nextColor) {
  if (nextColor === currentColor) return { board: [...board], region: [...region], changed: false };
  const flooded = new Uint8Array(board.length);
  const queue = [];
  for (const index of region) {
    if (Number.isInteger(index) && index >= 0 && index < board.length && !flooded[index]) {
      flooded[index] = 1;
      queue.push(index);
    }
  }
  const updated = [...board];
  for (const index of queue) updated[index] = nextColor;
  for (let head = 0; head < queue.length; head += 1) {
    for (const next of neighbors(queue[head], size)) {
      if (!flooded[next] && board[next] === nextColor) {
        flooded[next] = 1;
        updated[next] = nextColor;
        queue.push(next);
      }
    }
  }
  return { board: updated, region: queue, changed: true };
}

export function getFloodPercent(region, size) {
  return Math.round((region.length / (size * size)) * 100);
}

export function calculateFloodScore(difficulty, movesUsed) {
  const level = FLOOD_LEVELS[difficulty];
  if (!level || !Number.isInteger(movesUsed) || movesUsed < 0 || movesUsed > level.moveLimit) return 0;
  return level.baseScore + Math.max(0, level.moveLimit - movesUsed) * level.moveBonus;
}

export function dailyBoard(date = new Date()) {
  const dateKey = utcDateKey(date);
  const level = FLOOD_LEVELS.medium;
  return { dateKey, board: generateBoard(level.size, level.colorCount, GAME_VERSION + ':' + dateKey) };
}

function safeRead() {
  try {
    const value = JSON.parse(localStorage.getItem(STORE_KEY) || '{}');
    if (!value || typeof value !== 'object' || Array.isArray(value)) return {};
    return value;
  } catch {
    return {};
  }
}

function validBoard(board, level) {
  return Array.isArray(board) &&
    board.length === level.size * level.size &&
    board.every((value) => Number.isInteger(value) && value >= 0 && value < level.colorCount);
}

function sameNumbers(first, second) {
  return first.length === second.length && first.every((value, index) => value === second[index]);
}

function sameMembers(first, second) {
  if (!Array.isArray(first) || !Array.isArray(second) || first.length !== second.length) return false;
  const firstSet = new Set(first);
  const secondSet = new Set(second);
  return firstSet.size === first.length && secondSet.size === second.length &&
    first.every((value) => secondSet.has(value));
}

export function isValidFloodSession(session, today = utcDateKey()) {
  if (!session || typeof session !== 'object' || !['playing', 'paused'].includes(session.status)) return false;
  const level = FLOOD_LEVELS[session.difficulty];
  if (!level || !validBoard(session.initialBoard, level) || !validBoard(session.board, level)) return false;
  if (typeof session.seed !== 'string' || !['standard', 'daily'].includes(session.mode)) return false;
  if (!Number.isInteger(session.movesUsed) || session.movesUsed < 0 || session.movesUsed >= level.moveLimit) return false;
  if (session.mode === 'daily' && (session.dailyDate !== today ||
    !sameNumbers(session.initialBoard, dailyBoard(new Date(today + 'T12:00:00.000Z')).board))) return false;
  if (!Array.isArray(session.region)) return false;
  const region = initialRegion(session.board, level.size);
  return region.length > 0 && sameMembers(region, session.region) &&
    session.currentColor === session.board[0] &&
    session.currentColor >= 0 && session.currentColor < level.colorCount;
}

function safeWrite(store) {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(store));
  } catch {
    // Gameplay remains available when storage is blocked or full.
  }
}

export function createFloodSession(difficulty, mode, seed, board, dailyDate = null) {
  const level = FLOOD_LEVELS[difficulty];
  const copy = [...board];
  return {
    status: 'playing',
    difficulty,
    mode,
    seed,
    dailyDate,
    initialBoard: copy,
    board: [...copy],
    currentColor: copy[0],
    region: initialRegion(copy, level.size),
    movesUsed: 0,
  };
}

if (typeof document !== 'undefined') bootGame();

function bootGame() {
  const root = document.querySelector('[data-color-flood]');
  if (!root) return;

  const byId = (id) => root.querySelector('#' + id);
  const screens = ['flood-ready', 'flood-play', 'flood-pause', 'flood-result'];
  const colors = FLOOD_COLORS;
  let selectedDifficulty = 'easy';
  let session = null;
  let lastResult = null;

  const ready = byId('flood-ready');
  const play = byId('flood-play');
  const boardElement = byId('flood-board');
  const palette = byId('flood-palette');
  const status = byId('flood-feedback');
  const continueButton = byId('flood-continue');
  const startButton = byId('flood-start');
  const dailyButton = byId('flood-daily-start');
  const resultTitle = byId('flood-result-title');
  const shareStatus = byId('flood-share-status');

  function switchScreen(name) {
    for (const id of screens) byId(id).hidden = id !== name;
  }

  function updateContinueButton() {
    const saved = safeRead();
    const candidate = isValidFloodSession(saved.active) ? saved.active : null;
    if (continueButton) {
      continueButton.hidden = !candidate;
      if (candidate) {
        const level = FLOOD_LEVELS[candidate.difficulty];
        continueButton.textContent = 'Continue ' + level.label + ' game · ' + candidate.movesUsed + ' of ' + level.moveLimit + ' moves used';
      }
    }
  }

  function updateDiffButtons(difficulty) {
    selectedDifficulty = difficulty;
    root.querySelectorAll('.flood-diff-btn, [data-difficulty]').forEach((btn) => {
      const isMatch = btn.dataset.difficulty === difficulty;
      btn.classList.toggle('is-active', isMatch);
      btn.classList.toggle('is-selected', isMatch);
      btn.setAttribute('aria-pressed', String(isMatch));
    });
    const level = FLOOD_LEVELS[difficulty];
    const settings = byId('flood-selected-settings');
    if (settings && level) {
      settings.textContent = level.size + ' × ' + level.size + ' grid · ' + level.colorCount + ' colors · ' + level.moveLimit + ' moves';
    }
  }

  function updateDailyStatus() {
    const today = utcDateKey();
    const saved = safeRead();
    const done = saved.dailyCompleted && saved.dailyCompleted[today];
    byId('flood-daily-status').textContent = done ? 'TODAY’S UTC CHALLENGE · COMPLETED' : 'TODAY’S UTC CHALLENGE · READY TO PLAY';
  }

  function storeSession() {
    const saved = safeRead();
    saved.active = session && ['playing', 'paused'].includes(session.status) ? session : null;
    if (!saved.best || typeof saved.best !== 'object' || Array.isArray(saved.best)) saved.best = {};
    if (!saved.dailyCompleted || typeof saved.dailyCompleted !== 'object' || Array.isArray(saved.dailyCompleted)) saved.dailyCompleted = {};
    safeWrite(saved);
  }

  function drawBoard() {
    if (!session) return;
    const level = FLOOD_LEVELS[session.difficulty];
    boardElement.style.setProperty('--board-size', String(level.size));
    boardElement.setAttribute('aria-label', 'Game grid: ' + session.region.length + ' of ' + session.board.length + ' cells flooded; current color ' + colors[session.currentColor].name + '.');
    const fragment = document.createDocumentFragment();
    session.board.forEach((colorIndex, index) => {
      const cell = document.createElement('span');
      cell.className = 'flood-cell' + (session.region.includes(index) ? ' is-flooded' : '');
      cell.style.setProperty('--cell-color', colors[colorIndex].value);
      cell.setAttribute('aria-hidden', 'true');
      fragment.append(cell);
    });
    boardElement.replaceChildren(fragment);

    const percent = getFloodPercent(session.region, level.size);
    byId('flood-level-label').textContent = FLOOD_LEVELS[session.difficulty].label + (session.mode === 'daily' ? ' · Daily Challenge' : '');
    byId('flood-moves-used').textContent = String(session.movesUsed);
    byId('flood-moves-limit').textContent = String(level.moveLimit);
    byId('flood-moves-remaining').textContent = String(level.moveLimit - session.movesUsed);
    byId('flood-progress-value').textContent = percent + '% flooded';
    byId('flood-progress').setAttribute('aria-valuenow', String(percent));
    byId('flood-progress-fill').style.width = percent + '%';
    byId('flood-current-color').textContent = colors[session.currentColor].name;
    byId('flood-current-swatch').style.backgroundColor = colors[session.currentColor].value;
    drawPalette();
  }

  function drawPalette() {
    const fragment = document.createDocumentFragment();
    colors.slice(0, FLOOD_LEVELS[session.difficulty].colorCount).forEach((color, index) => {
      const button = document.createElement('button');
      const active = index === session.currentColor;
      button.type = 'button';
      button.className = 'flood-color-choice' + (active ? ' is-current' : '');
      button.disabled = active || session.status !== 'playing';
      button.setAttribute('aria-label', active ? color.name + ', current flood color' : 'Flood with ' + color.name);
      button.setAttribute('aria-pressed', String(active));
      button.title = active ? color.name + ' (current color)' : 'Flood with ' + color.name;
      const swatch = document.createElement('span');
      swatch.className = 'flood-swatch';
      swatch.style.backgroundColor = color.value;
      swatch.setAttribute('aria-hidden', 'true');
      const label = document.createElement('span');
      label.className = 'flood-color-name';
      label.textContent = color.name;
      button.append(swatch, label);
      button.addEventListener('click', () => chooseColor(index));
      fragment.append(button);
    });
    palette.replaceChildren(fragment);
  }

  function rollDailyIfDateChanged() {
    if (!session || session.mode !== 'daily' || session.dailyDate === utcDateKey()) return false;
    const daily = dailyBoard();
    session = createFloodSession('medium', 'daily', GAME_VERSION + ':' + daily.dateKey, daily.board, daily.dateKey);
    lastResult = null;
    status.textContent = 'A new Daily Challenge is ready for today (UTC).';
    storeSession();
    switchScreen('flood-play');
    drawBoard();
    return true;
  }

  function showFinish(won) {
    if (!session || !['playing', 'paused'].includes(session.status)) return;
    const level = FLOOD_LEVELS[session.difficulty];
    const remaining = level.moveLimit - session.movesUsed;
    const score = won ? calculateFloodScore(session.difficulty, session.movesUsed) : 0;
    session.status = won ? 'won' : 'lost';
    lastResult = {
      won,
      score,
      difficulty: session.difficulty,
      movesUsed: session.movesUsed,
      moveLimit: level.moveLimit,
      remaining,
      mode: session.mode,
      seed: session.seed,
      initialBoard: [...session.initialBoard],
      dailyDate: session.dailyDate,
    };
    const saved = safeRead();
    const best = saved.best && typeof saved.best === 'object' && !Array.isArray(saved.best) ? { ...saved.best } : {};
    if (won) {
      best[session.difficulty] = Math.max(Number.isFinite(best[session.difficulty]) ? best[session.difficulty] : 0, score);
      if (session.mode === 'daily') {
        const daily = saved.dailyCompleted && typeof saved.dailyCompleted === 'object' && !Array.isArray(saved.dailyCompleted) ? { ...saved.dailyCompleted } : {};
        daily[session.dailyDate] = { completed: true, score, movesUsed: session.movesUsed };
        for (const key of Object.keys(daily).sort().slice(0, Math.max(0, Object.keys(daily).length - 30))) delete daily[key];
        saved.dailyCompleted = daily;
      }
    }
    saved.best = best;
    saved.active = null;
    safeWrite(saved);
    resultTitle.textContent = won ? 'Board flooded. Nicely done!' : 'That was a close one.';
    byId('flood-result-message').textContent = won
      ? 'You connected every cell in ' + session.movesUsed + ' moves.'
      : 'You used all ' + level.moveLimit + ' moves. Try a new route through the colors.';
    byId('flood-result-difficulty').textContent = level.label + (session.mode === 'daily' ? ' · Daily Challenge' : '');
    byId('flood-result-moves').textContent = session.movesUsed + ' / ' + level.moveLimit;
    byId('flood-result-remaining').textContent = String(remaining);
    byId('flood-result-score').textContent = String(score);
    byId('flood-result-best').textContent = String(best[session.difficulty] || 0);
    byId('flood-result-score-wrap').hidden = !won;
    byId('flood-result-best-wrap').hidden = !won;
    byId('flood-score-note').hidden = !won;
    byId('flood-result-kicker').textContent = won ? 'BOARD COMPLETE' : 'ROUND COMPLETE';
    byId('flood-play-again').textContent = won ? 'Play again' : 'Retry this puzzle';
    byId('flood-share').hidden = !won;
    shareStatus.textContent = '';
    switchScreen('flood-result');
    updateDailyStatus();
  }

  function chooseColor(nextColor) {
    if (rollDailyIfDateChanged()) return;
    if (!session || session.status !== 'playing' || nextColor === session.currentColor) return;
    const level = FLOOD_LEVELS[session.difficulty];
    const result = expandFlood(session.board, level.size, session.region, session.currentColor, nextColor);
    if (!result.changed) return;
    session.board = result.board;
    session.region = result.region;
    session.currentColor = nextColor;
    session.movesUsed += 1;
    drawBoard();
    status.textContent = colors[nextColor].name + ' selected. ' + session.region.length + ' of ' + session.board.length + ' cells are flooded.';
    storeSession();
    if (session.region.length === session.board.length) {
      showFinish(true);
    } else if (session.movesUsed >= level.moveLimit) {
      showFinish(false);
    }
  }

  function beginStandard(difficulty = selectedDifficulty, bypassConfirm = false) {
    const saved = safeRead();
    if (!bypassConfirm && isValidFloodSession(saved.active) && saved.active.difficulty === difficulty && saved.active.movesUsed > 0 && !window.confirm('Start a new game? Your saved Color Flood progress will be replaced.')) return;
    const seed = 'random:' + Date.now().toString(36) + ':' + Math.random().toString(36).slice(2);
    const level = FLOOD_LEVELS[difficulty];
    selectedDifficulty = difficulty;
    updateDiffButtons(difficulty);
    session = createFloodSession(difficulty, 'standard', seed, generateBoard(level.size, level.colorCount, seed));
    status.textContent = '';
    storeSession();
    switchScreen('flood-play');
    drawBoard();
    if (session.region.length === session.board.length) showFinish(true);
  }

  function beginDaily() {
    const saved = safeRead();
    const daily = dailyBoard();
    if (isValidFloodSession(saved.active) && saved.active.mode === 'daily' && saved.active.dailyDate === daily.dateKey) {
      resumeSaved();
      return;
    }
    if (isValidFloodSession(saved.active) && saved.active.movesUsed > 0 && !window.confirm('Start today’s Daily Challenge? Your saved Color Flood progress will be replaced.')) return;
    session = createFloodSession('medium', 'daily', GAME_VERSION + ':' + daily.dateKey, daily.board, daily.dateKey);
    selectedDifficulty = 'medium';
    updateDiffButtons('medium');
    status.textContent = '';
    storeSession();
    switchScreen('flood-play');
    drawBoard();
    if (session.region.length === session.board.length) showFinish(true);
  }

  function restartCurrent() {
    if (!session || !window.confirm('Restart this board? Your moves so far will be cleared.')) return;
    if (rollDailyIfDateChanged()) return;
    session = createFloodSession(session.difficulty, session.mode, session.seed, session.initialBoard, session.dailyDate);
    lastResult = null;
    status.textContent = 'Board restarted. Take your time and plan a route.';
    storeSession();
    switchScreen('flood-play');
    drawBoard();
  }

  function resumeSaved() {
    const saved = safeRead();
    if (!isValidFloodSession(saved.active)) {
      updateContinueButton();
      return;
    }
    session = saved.active;
    session.status = 'playing';
    selectedDifficulty = session.difficulty;
    updateDiffButtons(session.difficulty);
    switchScreen('flood-play');
    status.textContent = 'Your saved game is ready to continue.';
    drawBoard();
    storeSession();
  }

  function newGame() {
    if (session && ['playing', 'paused'].includes(session.status) && session.movesUsed > 0 &&
      !window.confirm('Start a new game? Your current Color Flood progress will be lost.')) return;
    beginStandard(selectedDifficulty || 'easy', true);
  }

  function shareText() {
    if (!lastResult) return '';
    return 'I flooded a board in PuzzleFeels.com Color Flood Game! Difficulty: ' +
      lastResult.difficulty[0].toUpperCase() + lastResult.difficulty.slice(1) +
      ', moves: ' + lastResult.movesUsed + ', score: ' + lastResult.score +
      '. Can you beat my run? Play free: https://puzzlefeels.com/color-flood-game/';
  }

  async function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(text);
        return true;
      } catch { /* Fall through to the legacy copy path. */ }
    }
    try {
      const field = document.createElement('textarea');
      field.value = text;
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
    const text = shareText();
    if (!text) return;
    if (navigator.share) {
      try {
        await navigator.share({ title: 'My Color Flood score · PuzzleFeels', text });
        shareStatus.textContent = 'Thanks for sharing your score!';
        return;
      } catch (error) {
        if (error && error.name === 'AbortError') return;
      }
    }
    shareStatus.textContent = await copyText(text) ? 'Score copied to your clipboard.' : 'Could not copy the score. Please try again.';
  }

  root.querySelectorAll('.flood-diff-btn, [data-difficulty]').forEach((button) => {
    button.addEventListener('click', () => {
      const diff = button.dataset.difficulty;
      if (!diff) return;
      if (!session || session.difficulty !== diff || session.status !== 'playing') {
        beginStandard(diff, true);
      } else if (session.movesUsed > 0) {
        beginStandard(diff, false);
      }
    });
  });

  startButton?.addEventListener('click', () => beginStandard(selectedDifficulty, true));
  dailyButton?.addEventListener('click', beginDaily);
  continueButton?.addEventListener('click', resumeSaved);
  byId('flood-pause-button')?.addEventListener('click', () => {
    if (rollDailyIfDateChanged()) return;
    if (!session || session.status !== 'playing') return;
    session.status = 'paused';
    storeSession();
    switchScreen('flood-pause');
  });
  byId('flood-resume-button')?.addEventListener('click', () => {
    if (!session || session.status !== 'paused') return;
    session.status = 'playing';
    storeSession();
    switchScreen('flood-play');
    drawBoard();
  });
  byId('flood-restart-button')?.addEventListener('click', restartCurrent);
  byId('flood-new-game')?.addEventListener('click', newGame);
  byId('flood-pause-new-game')?.addEventListener('click', newGame);
  byId('flood-play-again')?.addEventListener('click', () => {
    if (!lastResult) return;
    if (!lastResult.won) {
      if (lastResult.mode === 'daily' && lastResult.dailyDate !== utcDateKey()) {
        beginDaily();
        return;
      }
      session = createFloodSession(lastResult.difficulty, lastResult.mode, lastResult.seed, lastResult.initialBoard, lastResult.dailyDate);
      status.textContent = 'Same board, fresh start. Try a different route through the colors.';
      storeSession();
      switchScreen('flood-play');
      drawBoard();
      return;
    }
    if (lastResult.mode === 'daily') beginDaily();
    else beginStandard(lastResult.difficulty, true);
  });
  byId('flood-result-new-game')?.addEventListener('click', newGame);
  byId('flood-share')?.addEventListener('click', shareResult);

  const query = new URLSearchParams(window.location.search);
  const isDaily = query.has('daily');
  if (isDaily) {
    dailyButton?.classList.add('daily-highlight');
    const label = byId('flood-ready-label');
    if (label) label.textContent = 'DAILY CHALLENGE · ' + utcDateKey() + ' UTC';
    beginDaily();
  } else {
    const stored = safeRead();
    if (isValidFloodSession(stored.active)) {
      session = stored.active;
      session.status = 'playing';
      selectedDifficulty = session.difficulty;
      updateDiffButtons(session.difficulty);
      switchScreen('flood-play');
      drawBoard();
      status.textContent = 'Your saved game is ready to continue.';
    } else {
      // Automatically start in Easy mode directly on page load
      beginStandard('easy', true);
    }
  }
  updateContinueButton();
  updateDailyStatus();
}

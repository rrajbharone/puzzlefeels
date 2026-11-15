import fs from 'fs';

const markup = fs.readFileSync('scratch/norinori_markup_part.astro', 'utf8');

const clientScriptAndStyles = `
<script>
  import { NORINORI_PUZZLES, getNorinoriPuzzles, getNorinoriPuzzle, getDailyNorinoriPuzzle, getWeeklyNorinoriPuzzle, getMonthlyNorinoriPuzzle } from '../data/norinoriPuzzles';

  (function() {
    // Sound FX engine via Web Audio API
    let audioCtx = null;
    let soundEnabled = true;

    function initAudio() {
      if (!audioCtx) {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (AudioContextClass) audioCtx = new AudioContextClass();
      }
      if (audioCtx && audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
    }

    function playTone(freq, type = 'sine', duration = 0.1, gainVal = 0.15) {
      if (!soundEnabled) return;
      try {
        initAudio();
        if (!audioCtx) return;
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
        gain.gain.setValueAtTime(gainVal, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + duration);
      } catch (e) {}
    }

    function playSound(name) {
      if (!soundEnabled) return;
      if (name === 'shade') playTone(520, 'sine', 0.08, 0.18);
      else if (name === 'dot') playTone(340, 'triangle', 0.05, 0.12);
      else if (name === 'clear') playTone(240, 'sine', 0.12, 0.12);
      else if (name === 'error') playTone(180, 'sawtooth', 0.18, 0.15);
      else if (name === 'hint') {
        playTone(440, 'sine', 0.1, 0.15);
        setTimeout(() => playTone(660, 'sine', 0.15, 0.15), 100);
      } else if (name === 'victory') {
        [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
          setTimeout(() => playTone(freq, 'triangle', 0.35, 0.22), i * 120);
        });
      }
    }

    // App State
    let currentMode = 'size'; // 'size' | 'daily' | 'weekly' | 'monthly'
    let currentSize = 6;
    let currentDifficulty = 'normal'; // 'normal' | 'hard'
    let currentPuzzleIndex = 0;
    let currentPuzzle = null;
    let boardState = []; // 0: empty, 1: shaded, 2: dot
    let cellRegionMap = [];
    let history = [];
    let redoStack = [];
    let toolMode = 'shade'; // 'shade' | 'dot'
    let activeCellIndex = 0;
    let isDragging = false;
    let dragTargetValue = 0;
    let hintsUsed = 0;
    let moveCount = 0;
    let timerSeconds = 0;
    let timerInterval = null;
    let isSolved = false;

    // Zoom state
    const zoomLevels = [70, 85, 100, 115, 130, 150];
    let zoomIndex = 2; // default 100%

    // User settings
    const settings = {
      highlightErrors: true,
      autocheck: true,
      highlightRegion: true,
      timer: true
    };

    // DOM Elements
    const gridEl = document.getElementById('norinori-grid');
    const gridContainerEl = document.getElementById('grid-container');
    const timerValEl = document.getElementById('timer-val');
    const shadedValEl = document.getElementById('shaded-val');
    const dominoValEl = document.getElementById('domino-val');
    const badgeEl = document.getElementById('norinori-difficulty-badge');
    const puzzleNumEl = document.getElementById('norinori-puzzle-number');
    const bannerTextEl = document.getElementById('banner-text');
    const toastEl = document.getElementById('norinori-toast');

    // Tool Buttons
    const toolShadeBtn = document.getElementById('tool-shade-btn');
    const toolDotBtn = document.getElementById('tool-dot-btn');
    const btnUndo = document.getElementById('btn-undo');
    const btnRedo = document.getElementById('btn-redo');
    const btnCheck = document.getElementById('btn-check');
    const btnHint = document.getElementById('btn-hint');
    const btnClear = document.getElementById('btn-clear');
    const btnNewPuzzle = document.getElementById('btn-new-puzzle');

    // Popover elements
    const btnZoomToggle = document.getElementById('btn-zoom-toggle');
    const zoomPopover = document.getElementById('zoom-popover');
    const zoomLevelLabel = document.getElementById('zoom-level-label');
    const btnZoomIn = document.getElementById('btn-zoom-in');
    const btnZoomOut = document.getElementById('btn-zoom-out');
    const btnZoomReset = document.getElementById('btn-zoom-reset');

    const btnSettingsToggle = document.getElementById('btn-settings-toggle');
    const settingsPopover = document.getElementById('settings-popover');
    const settingHighlightErrors = document.getElementById('setting-highlight-errors');
    const settingAutocheck = document.getElementById('setting-autocheck');
    const settingHighlightRegion = document.getElementById('setting-highlight-region');
    const settingTimer = document.getElementById('setting-timer');
    const btnShowKeyboardHelp = document.getElementById('btn-show-keyboard-help');
    const btnResetSettings = document.getElementById('btn-reset-settings');

    const soundToggleBtn = document.getElementById('norinori-sound-toggle');
    const keyboardModal = document.getElementById('keyboard-modal');
    const victoryModal = document.getElementById('victory-modal');

    // Load saved settings
    try {
      const savedSettings = JSON.parse(localStorage.getItem('puzzlefeels_norinori_settings') || '{}');
      Object.assign(settings, savedSettings);
      if (settingHighlightErrors) settingHighlightErrors.checked = settings.highlightErrors;
      if (settingAutocheck) settingAutocheck.checked = settings.autocheck;
      if (settingHighlightRegion) settingHighlightRegion.checked = settings.highlightRegion;
      if (settingTimer) settingTimer.checked = settings.timer;
      const savedSound = localStorage.getItem('puzzlefeels_norinori_sound');
      if (savedSound !== null) soundEnabled = savedSound === 'true';
      updateSoundUI();
    } catch (e) {}

    function updateSoundUI() {
      if (!soundToggleBtn) return;
      const soundOnIcon = soundToggleBtn.querySelector('.sound-on-icon');
      const soundOffIcon = soundToggleBtn.querySelector('.sound-off-icon');
      const soundLabel = soundToggleBtn.querySelector('.sound-label');
      if (soundOnIcon) soundOnIcon.hidden = !soundEnabled;
      if (soundOffIcon) soundOffIcon.hidden = soundEnabled;
      if (soundLabel) soundLabel.textContent = soundEnabled ? 'Sound On' : 'Sound Off';
      soundToggleBtn.setAttribute('aria-pressed', String(soundEnabled));
    }

    if (soundToggleBtn) {
      soundToggleBtn.addEventListener('click', () => {
        soundEnabled = !soundEnabled;
        try { localStorage.setItem('puzzlefeels_norinori_sound', String(soundEnabled)); } catch (e) {}
        updateSoundUI();
      });
    }

    // Timer functions
    function startTimer() {
      stopTimer();
      timerInterval = setInterval(() => {
        if (!isSolved) {
          timerSeconds++;
          renderTimer();
        }
      }, 1000);
    }

    function stopTimer() {
      if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
      }
    }

    function renderTimer() {
      if (!timerValEl) return;
      if (!settings.timer) {
        timerValEl.textContent = '--:--';
        return;
      }
      const mins = Math.floor(timerSeconds / 60);
      const secs = timerSeconds % 60;
      timerValEl.textContent = \`\${String(mins).padStart(2, '0')}:\${String(secs).padStart(2, '0')}\`;
    }

    function formatTime(totalSecs) {
      const mins = Math.floor(totalSecs / 60);
      const secs = totalSecs % 60;
      return \`\${String(mins).padStart(2, '0')}:\${String(secs).padStart(2, '0')}\`;
    }

    // Zoom management
    function applyZoom() {
      const pct = zoomLevels[zoomIndex];
      if (zoomLevelLabel) zoomLevelLabel.textContent = \`\${pct}%\`;
      let baseCell = 44;
      if (currentSize === 8) baseCell = 40;
      else if (currentSize === 10) baseCell = 36;
      else if (currentSize === 15) baseCell = 28;
      else if (currentSize === 20) baseCell = 24;

      const px = Math.round(baseCell * (pct / 100));
      if (gridContainerEl) {
        gridContainerEl.style.setProperty('--cell-size', \`\${px}px\`);
      }
    }

    if (btnZoomIn) {
      btnZoomIn.addEventListener('click', () => {
        if (zoomIndex < zoomLevels.length - 1) {
          zoomIndex++;
          applyZoom();
        }
      });
    }

    if (btnZoomOut) {
      btnZoomOut.addEventListener('click', () => {
        if (zoomIndex > 0) {
          zoomIndex--;
          applyZoom();
        }
      });
    }

    if (btnZoomReset) {
      btnZoomReset.addEventListener('click', () => {
        zoomIndex = 2; // 100%
        applyZoom();
        closeAllPopovers();
      });
    }

    // Popover Toggles
    function closeAllPopovers() {
      if (zoomPopover) zoomPopover.hidden = true;
      if (settingsPopover) settingsPopover.hidden = true;
      if (btnZoomToggle) btnZoomToggle.setAttribute('aria-expanded', 'false');
      if (btnSettingsToggle) btnSettingsToggle.setAttribute('aria-expanded', 'false');
    }

    if (btnZoomToggle && zoomPopover) {
      btnZoomToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        const willOpen = zoomPopover.hidden;
        closeAllPopovers();
        if (willOpen) {
          zoomPopover.hidden = false;
          btnZoomToggle.setAttribute('aria-expanded', 'true');
        }
      });
    }

    if (btnSettingsToggle && settingsPopover) {
      btnSettingsToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        const willOpen = settingsPopover.hidden;
        closeAllPopovers();
        if (willOpen) {
          settingsPopover.hidden = false;
          btnSettingsToggle.setAttribute('aria-expanded', 'true');
        }
      });
    }

    document.querySelectorAll('[data-close-popover]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        closeAllPopovers();
      });
    });

    document.addEventListener('click', (e) => {
      if (zoomPopover && !zoomPopover.contains(e.target) && e.target !== btnZoomToggle) {
        zoomPopover.hidden = true;
        if (btnZoomToggle) btnZoomToggle.setAttribute('aria-expanded', 'false');
      }
      if (settingsPopover && !settingsPopover.contains(e.target) && e.target !== btnSettingsToggle) {
        settingsPopover.hidden = true;
        if (btnSettingsToggle) btnSettingsToggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Settings change handlers
    if (settingHighlightErrors) {
      settingHighlightErrors.addEventListener('change', () => {
        settings.highlightErrors = settingHighlightErrors.checked;
        saveSettings();
        validateAndRenderErrors();
      });
    }

    if (settingAutocheck) {
      settingAutocheck.addEventListener('change', () => {
        settings.autocheck = settingAutocheck.checked;
        saveSettings();
      });
    }

    if (settingHighlightRegion) {
      settingHighlightRegion.addEventListener('change', () => {
        settings.highlightRegion = settingHighlightRegion.checked;
        saveSettings();
      });
    }

    if (settingTimer) {
      settingTimer.addEventListener('change', () => {
        settings.timer = settingTimer.checked;
        saveSettings();
        renderTimer();
      });
    }

    if (btnResetSettings) {
      btnResetSettings.addEventListener('click', () => {
        settings.highlightErrors = true;
        settings.autocheck = true;
        settings.highlightRegion = true;
        settings.timer = true;
        if (settingHighlightErrors) settingHighlightErrors.checked = true;
        if (settingAutocheck) settingAutocheck.checked = true;
        if (settingHighlightRegion) settingHighlightRegion.checked = true;
        if (settingTimer) settingTimer.checked = true;
        saveSettings();
        validateAndRenderErrors();
        renderTimer();
        showToast('Settings reset to default');
      });
    }

    function saveSettings() {
      try { localStorage.setItem('puzzlefeels_norinori_settings', JSON.stringify(settings)); } catch (e) {}
    }

    // Modal dialogs
    if (btnShowKeyboardHelp && keyboardModal) {
      btnShowKeyboardHelp.addEventListener('click', () => {
        closeAllPopovers();
        keyboardModal.hidden = false;
      });
    }

    document.querySelectorAll('[data-close-modal]').forEach(el => {
      el.addEventListener('click', () => {
        if (keyboardModal) keyboardModal.hidden = true;
        if (victoryModal) victoryModal.hidden = true;
      });
    });

    function showToast(msg) {
      if (!toastEl) return;
      toastEl.textContent = msg;
      toastEl.hidden = false;
      setTimeout(() => { toastEl.hidden = true; }, 2600);
    }

    // Tool Mode selection
    function setToolMode(mode) {
      toolMode = mode;
      if (toolShadeBtn) toolShadeBtn.classList.toggle('is-active', mode === 'shade');
      if (toolDotBtn) toolDotBtn.classList.toggle('is-active', mode === 'dot');
    }

    if (toolShadeBtn) toolShadeBtn.addEventListener('click', () => setToolMode('shade'));
    if (toolDotBtn) toolDotBtn.addEventListener('click', () => setToolMode('dot'));

    // Load Puzzle
    function loadCurrentPuzzle(restoreSaved = true) {
      if (currentMode === 'daily') {
        const { puzzle, dateKey } = getDailyNorinoriPuzzle();
        currentPuzzle = puzzle;
        currentSize = puzzle.size;
        currentDifficulty = puzzle.difficulty;
        if (badgeEl) badgeEl.textContent = \`DAILY · \${dateKey}\`;
        if (puzzleNumEl) puzzleNumEl.textContent = \`#\${puzzle.originalId}\`;
      } else if (currentMode === 'weekly') {
        const { puzzle, weekKey } = getWeeklyNorinoriPuzzle();
        currentPuzzle = puzzle;
        currentSize = puzzle.size;
        currentDifficulty = puzzle.difficulty;
        if (badgeEl) badgeEl.textContent = \`WEEKLY · \${weekKey}\`;
        if (puzzleNumEl) puzzleNumEl.textContent = \`#\${puzzle.originalId}\`;
      } else if (currentMode === 'monthly') {
        const { puzzle, monthKey } = getMonthlyNorinoriPuzzle();
        currentPuzzle = puzzle;
        currentSize = puzzle.size;
        currentDifficulty = puzzle.difficulty;
        if (badgeEl) badgeEl.textContent = \`MONTHLY · \${monthKey}\`;
        if (puzzleNumEl) puzzleNumEl.textContent = \`#\${puzzle.originalId}\`;
      } else {
        const list = getNorinoriPuzzles(currentSize, currentDifficulty);
        currentPuzzle = list[currentPuzzleIndex % list.length];
        if (badgeEl) badgeEl.textContent = \`\${currentDifficulty.toUpperCase()} · \${currentSize}×\${currentSize}\`;
        if (puzzleNumEl) puzzleNumEl.textContent = \`#\${currentPuzzle.originalId}\`;
      }

      const N = currentSize * currentSize;
      cellRegionMap = new Int32Array(N);
      for (let r = 0; r < currentPuzzle.regions.length; r++) {
        for (const idx of currentPuzzle.regions[r]) {
          cellRegionMap[idx] = r;
        }
      }

      let loaded = false;
      if (restoreSaved) {
        try {
          const saveRaw = localStorage.getItem(\`puzzlefeels_norinori_save_\${currentPuzzle.id}\`);
          if (saveRaw) {
            const data = JSON.parse(saveRaw);
            if (data && Array.isArray(data.board) && data.board.length === N) {
              boardState = data.board;
              timerSeconds = data.time || 0;
              hintsUsed = data.hints || 0;
              moveCount = data.moves || 0;
              loaded = true;
            }
          }
        } catch (e) {}
      }

      if (!loaded) {
        boardState = new Array(N).fill(0);
        timerSeconds = 0;
        hintsUsed = 0;
        moveCount = 0;
      }

      history = [];
      redoStack = [];
      isSolved = false;
      activeCellIndex = 0;

      applyZoom();
      renderBoard();
      updateCounters();
      validateAndRenderErrors();
      updateUndoRedoButtons();
      startTimer();
      renderTimer();

      if (bannerTextEl) {
        bannerTextEl.textContent = 'Left click or drag to shade cells. Right click to mark dots. Each region needs exactly two shaded cells.';
      }
    }

    function saveGameState() {
      if (!currentPuzzle) return;
      try {
        localStorage.setItem(\`puzzlefeels_norinori_save_\${currentPuzzle.id}\`, JSON.stringify({
          board: boardState,
          time: timerSeconds,
          hints: hintsUsed,
          moves: moveCount
        }));
      } catch (e) {}
    }

    // Render Grid Board
    function renderBoard() {
      if (!gridEl || !currentPuzzle) return;
      const size = currentSize;
      const N = size * size;
      gridEl.innerHTML = '';
      gridEl.style.setProperty('--grid-size', String(size));

      for (let idx = 0; idx < N; idx++) {
        const r = Math.floor(idx / size);
        const c = idx % size;
        const reg = cellRegionMap[idx];

        const cell = document.createElement('div');
        cell.className = 'norinori-cell';
        cell.dataset.index = String(idx);
        cell.dataset.row = String(r);
        cell.dataset.col = String(c);
        cell.dataset.region = String(reg);
        cell.setAttribute('role', 'gridcell');
        cell.setAttribute('tabindex', '-1');

        const borderTop = (r === 0 || cellRegionMap[(r - 1) * size + c] !== reg);
        const borderBottom = (r === size - 1 || cellRegionMap[(r + 1) * size + c] !== reg);
        const borderLeft = (c === 0 || cellRegionMap[r * size + (c - 1)] !== reg);
        const borderRight = (c === size - 1 || cellRegionMap[r * size + (c + 1)] !== reg);

        if (borderTop) cell.classList.add('reg-border-top');
        if (borderBottom) cell.classList.add('reg-border-bottom');
        if (borderLeft) cell.classList.add('reg-border-left');
        if (borderRight) cell.classList.add('reg-border-right');

        if (boardState[idx] === 1) cell.classList.add('is-shaded');
        else if (boardState[idx] === 2) cell.classList.add('is-dot');

        const dotSpan = document.createElement('span');
        dotSpan.className = 'dot-mark';
        cell.appendChild(dotSpan);

        gridEl.appendChild(cell);
      }

      updateActiveCellCursor();
    }

    function updateActiveCellCursor() {
      if (!gridEl) return;
      const cells = gridEl.querySelectorAll('.norinori-cell');
      cells.forEach((cell, idx) => {
        if (idx === activeCellIndex) cell.classList.add('is-focused');
        else cell.classList.remove('is-focused');
      });
    }

    // Cell Interaction: click & drag
    function setCellValue(idx, val, recordHistory = true) {
      if (idx < 0 || idx >= boardState.length) return;
      if (isSolved) return;
      const oldVal = boardState[idx];
      if (oldVal === val) return;

      if (recordHistory) {
        history.push({ idx, oldVal, newVal: val });
        redoStack = [];
        moveCount++;
      }

      boardState[idx] = val;
      const cell = gridEl.children[idx];
      if (cell) {
        cell.classList.remove('is-shaded', 'is-dot');
        if (val === 1) cell.classList.add('is-shaded');
        else if (val === 2) cell.classList.add('is-dot');
      }

      updateCounters();
      validateAndRenderErrors();
      updateUndoRedoButtons();
      saveGameState();

      if (val === 1) playSound('shade');
      else if (val === 2) playSound('dot');
      else playSound('clear');

      if (settings.autocheck) {
        checkVictoryCondition(false);
      }
    }

    if (gridEl) {
      gridEl.addEventListener('contextmenu', (e) => e.preventDefault());

      gridEl.addEventListener('pointerdown', (e) => {
        if (isSolved) return;
        const target = e.target.closest('.norinori-cell');
        if (!target) return;
        e.preventDefault();
        initAudio();

        const idx = parseInt(target.dataset.index, 10);
        activeCellIndex = idx;
        updateActiveCellCursor();

        const currentVal = boardState[idx];
        const isRightClick = e.button === 2;

        if (isRightClick) {
          dragTargetValue = (currentVal === 2) ? 0 : 2;
        } else {
          if (toolMode === 'dot') {
            dragTargetValue = (currentVal === 2) ? 0 : 2;
          } else {
            dragTargetValue = (currentVal === 1) ? 0 : 1;
          }
        }

        isDragging = true;
        setCellValue(idx, dragTargetValue);
      });

      window.addEventListener('pointermove', (e) => {
        if (!isDragging) return;
        const el = document.elementFromPoint(e.clientX, e.clientY);
        if (!el) return;
        const target = el.closest('.norinori-cell');
        if (!target) return;
        const idx = parseInt(target.dataset.index, 10);
        if (boardState[idx] !== dragTargetValue) {
          activeCellIndex = idx;
          updateActiveCellCursor();
          setCellValue(idx, dragTargetValue);
        }
      });

      window.addEventListener('pointerup', () => {
        isDragging = false;
      });

      window.addEventListener('pointercancel', () => {
        isDragging = false;
      });

      gridEl.addEventListener('pointerover', (e) => {
        if (!settings.highlightRegion) return;
        const target = e.target.closest('.norinori-cell');
        if (!target) return;
        const reg = target.dataset.region;
        const cells = gridEl.querySelectorAll('.norinori-cell');
        cells.forEach(c => {
          if (c.dataset.region === reg) c.classList.add('is-region-hover');
          else c.classList.remove('is-region-hover');
        });
      });

      gridEl.addEventListener('pointerleave', () => {
        const cells = gridEl.querySelectorAll('.norinori-cell');
        cells.forEach(c => c.classList.remove('is-region-hover'));
      });
    }

    // Keyboard navigation
    window.addEventListener('keydown', (e) => {
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;

      const size = currentSize;
      const r = Math.floor(activeCellIndex / size);
      const c = activeCellIndex % size;

      if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (r > 0) activeCellIndex = (r - 1) * size + c;
        updateActiveCellCursor();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (r < size - 1) activeCellIndex = (r + 1) * size + c;
        updateActiveCellCursor();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        if (c > 0) activeCellIndex = r * size + (c - 1);
        updateActiveCellCursor();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        if (c < size - 1) activeCellIndex = r * size + (c + 1);
        updateActiveCellCursor();
      } else if (e.key === ' ' || e.key.toLowerCase() === 'z') {
        e.preventDefault();
        const currentVal = boardState[activeCellIndex];
        setCellValue(activeCellIndex, currentVal === 1 ? 0 : 1);
      } else if (e.key.toLowerCase() === 'x' || e.key.toLowerCase() === 'c') {
        e.preventDefault();
        const currentVal = boardState[activeCellIndex];
        setCellValue(activeCellIndex, currentVal === 2 ? 0 : 2);
      } else if (e.key === 'Backspace' || e.key === 'Delete') {
        e.preventDefault();
        setCellValue(activeCellIndex, 0);
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
        e.preventDefault();
        undo();
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'y') {
        e.preventDefault();
        redo();
      } else if (e.key.toLowerCase() === 'u') {
        e.preventDefault();
        undo();
      } else if (e.key.toLowerCase() === 'r') {
        e.preventDefault();
        redo();
      }
    });

    // Undo / Redo
    function undo() {
      if (history.length === 0 || isSolved) return;
      const action = history.pop();
      redoStack.push(action);
      boardState[action.idx] = action.oldVal;

      const cell = gridEl.children[action.idx];
      if (cell) {
        cell.classList.remove('is-shaded', 'is-dot');
        if (action.oldVal === 1) cell.classList.add('is-shaded');
        else if (action.oldVal === 2) cell.classList.add('is-dot');
      }

      updateCounters();
      validateAndRenderErrors();
      updateUndoRedoButtons();
      saveGameState();
      playSound('clear');
    }

    function redo() {
      if (redoStack.length === 0 || isSolved) return;
      const action = redoStack.pop();
      history.push(action);
      boardState[action.idx] = action.newVal;

      const cell = gridEl.children[action.idx];
      if (cell) {
        cell.classList.remove('is-shaded', 'is-dot');
        if (action.newVal === 1) cell.classList.add('is-shaded');
        else if (action.newVal === 2) cell.classList.add('is-dot');
      }

      updateCounters();
      validateAndRenderErrors();
      updateUndoRedoButtons();
      saveGameState();
      playSound(action.newVal === 1 ? 'shade' : 'dot');
    }

    function updateUndoRedoButtons() {
      if (btnUndo) btnUndo.disabled = (history.length === 0);
      if (btnRedo) btnRedo.disabled = (redoStack.length === 0);
    }

    if (btnUndo) btnUndo.addEventListener('click', undo);
    if (btnRedo) btnRedo.addEventListener('click', redo);

    // Clear Board
    if (btnClear) {
      btnClear.addEventListener('click', () => {
        if (isSolved) return;
        if (boardState.every(v => v === 0)) return;
        if (!confirm('Clear all placed shaded cells and dots?')) return;

        const N = currentSize * currentSize;
        boardState = new Array(N).fill(0);
        history = [];
        redoStack = [];
        renderBoard();
        updateCounters();
        validateAndRenderErrors();
        updateUndoRedoButtons();
        saveGameState();
        playSound('clear');
        if (bannerTextEl) bannerTextEl.textContent = 'Board cleared.';
      });
    }

    // Check Board button
    if (btnCheck) {
      btnCheck.addEventListener('click', () => {
        const result = checkVictoryCondition(true);
        if (result.solved) return;

        if (result.errors.length > 0) {
          playSound('error');
          if (bannerTextEl) {
            bannerTextEl.textContent = \`Found \${result.errors.length} rule violation\${result.errors.length > 1 ? 's' : ''}. Check highlighted cells.\`;
          }
        } else {
          playSound('hint');
          const remaining = (currentPuzzle.regions.length * 2) - result.totalShaded;
          if (bannerTextEl) {
            bannerTextEl.textContent = \`Looking good! No errors found so far. \${remaining} shaded cell\${remaining > 1 ? 's' : ''} remaining.\`;
          }
        }
      });
    }

    // Hint Button
    if (btnHint) {
      btnHint.addEventListener('click', () => {
        if (isSolved || !currentPuzzle) return;
        hintsUsed++;
        initAudio();

        const sol = currentPuzzle.solution;
        const wrongShaded = [];
        for (let i = 0; i < boardState.length; i++) {
          if (boardState[i] === 1 && sol[i] !== 1) {
            wrongShaded.push(i);
          }
        }

        if (wrongShaded.length > 0) {
          const badIdx = wrongShaded[0];
          const r = Math.floor(badIdx / currentSize) + 1;
          const c = (badIdx % currentSize) + 1;
          setCellValue(badIdx, 0);
          activeCellIndex = badIdx;
          updateActiveCellCursor();
          playSound('hint');
          if (bannerTextEl) {
            bannerTextEl.textContent = \`Hint: Removed incorrect shaded cell at row \${r}, col \${c}.\`;
          }
          return;
        }

        const missingShaded = [];
        for (let i = 0; i < boardState.length; i++) {
          if (sol[i] === 1 && boardState[i] !== 1) {
            missingShaded.push(i);
          }
        }

        if (missingShaded.length > 0) {
          const pickIdx = missingShaded[0];
          const r = Math.floor(pickIdx / currentSize) + 1;
          const c = (pickIdx % currentSize) + 1;
          setCellValue(pickIdx, 1);
          activeCellIndex = pickIdx;
          updateActiveCellCursor();
          playSound('hint');
          if (bannerTextEl) {
            bannerTextEl.textContent = \`Hint: Shaded forced domino cell at row \${r}, col \${c}.\`;
          }
          return;
        }

        for (let i = 0; i < boardState.length; i++) {
          if (sol[i] === 0 && boardState[i] === 0) {
            setCellValue(i, 2);
            activeCellIndex = i;
            updateActiveCellCursor();
            playSound('hint');
            if (bannerTextEl) bannerTextEl.textContent = 'Hint: Marked empty cell with dot.';
            return;
          }
        }
      });
    }

    // New Puzzle Button
    if (btnNewPuzzle) {
      btnNewPuzzle.addEventListener('click', () => {
        currentPuzzleIndex++;
        loadCurrentPuzzle(false);
      });
    }

    // Validation & Error Highlighting
    function validateAndRenderErrors() {
      if (!gridEl || !currentPuzzle) return;
      const size = currentSize;
      const N = size * size;

      const cells = gridEl.querySelectorAll('.norinori-cell');
      cells.forEach(c => c.classList.remove('is-error'));

      if (!settings.highlightErrors) return;

      const errors = new Set();

      for (let r = 0; r < currentPuzzle.regions.length; r++) {
        const regCells = currentPuzzle.regions[r];
        let shadedInReg = 0;
        for (const idx of regCells) {
          if (boardState[idx] === 1) shadedInReg++;
        }
        if (shadedInReg > 2) {
          for (const idx of regCells) {
            if (boardState[idx] === 1) errors.add(idx);
          }
        }
      }

      const visited = new Uint8Array(N);
      for (let idx = 0; idx < N; idx++) {
        if (boardState[idx] === 1 && !visited[idx]) {
          const comp = [];
          const queue = [idx];
          visited[idx] = 1;

          while (queue.length > 0) {
            const curr = queue.shift();
            comp.push(curr);
            const cr = Math.floor(curr / size);
            const cc = curr % size;
            const nbs = [];
            if (cr > 0) nbs.push(curr - size);
            if (cr < size - 1) nbs.push(curr + size);
            if (cc > 0) nbs.push(curr - 1);
            if (cc < size - 1) nbs.push(curr + 1);

            for (const nb of nbs) {
              if (boardState[nb] === 1 && !visited[nb]) {
                visited[nb] = 1;
                queue.push(nb);
              }
            }
          }

          if (comp.length > 2) {
            for (const c of comp) errors.add(c);
          }
        }
      }

      for (const idx of errors) {
        if (gridEl.children[idx]) {
          gridEl.children[idx].classList.add('is-error');
        }
      }
    }

    function updateCounters() {
      if (!currentPuzzle) return;
      const totalRegions = currentPuzzle.regions.length;
      const requiredShaded = totalRegions * 2;
      const requiredDominoes = totalRegions;

      let shadedCount = 0;
      for (let i = 0; i < boardState.length; i++) {
        if (boardState[i] === 1) shadedCount++;
      }

      const size = currentSize;
      const N = size * size;
      const visited = new Uint8Array(N);
      let validDominoes = 0;

      for (let idx = 0; idx < N; idx++) {
        if (boardState[idx] === 1 && !visited[idx]) {
          const comp = [];
          const queue = [idx];
          visited[idx] = 1;

          while (queue.length > 0) {
            const curr = queue.shift();
            comp.push(curr);
            const cr = Math.floor(curr / size);
            const cc = curr % size;
            const nbs = [];
            if (cr > 0) nbs.push(curr - size);
            if (cr < size - 1) nbs.push(curr + size);
            if (cc > 0) nbs.push(curr - 1);
            if (cc < size - 1) nbs.push(curr + 1);

            for (const nb of nbs) {
              if (boardState[nb] === 1 && !visited[nb]) {
                visited[nb] = 1;
                queue.push(nb);
              }
            }
          }

          if (comp.length === 2) validDominoes++;
        }
      }

      if (shadedValEl) shadedValEl.textContent = \`\${shadedCount} / \${requiredShaded}\`;
      if (dominoValEl) dominoValEl.textContent = \`\${validDominoes} / \${requiredDominoes}\`;
    }

    function checkVictoryCondition(showBannerOnFail = false) {
      if (!currentPuzzle || isSolved) return { solved: false, errors: [], totalShaded: 0 };
      const size = currentSize;
      const N = size * size;
      const totalRegions = currentPuzzle.regions.length;
      const requiredShaded = totalRegions * 2;

      let totalShaded = 0;
      const errors = [];

      for (let r = 0; r < totalRegions; r++) {
        const regCells = currentPuzzle.regions[r];
        let count = 0;
        for (const idx of regCells) {
          if (boardState[idx] === 1) count++;
        }
        if (count !== 2) {
          errors.push({ type: 'region', region: r, count });
        }
      }

      const visited = new Uint8Array(N);
      for (let idx = 0; idx < N; idx++) {
        if (boardState[idx] === 1 && !visited[idx]) {
          const comp = [];
          const queue = [idx];
          visited[idx] = 1;

          while (queue.length > 0) {
            const curr = queue.shift();
            comp.push(curr);
            const cr = Math.floor(curr / size);
            const cc = curr % size;
            const nbs = [];
            if (cr > 0) nbs.push(curr - size);
            if (cr < size - 1) nbs.push(curr + size);
            if (cc > 0) nbs.push(curr - 1);
            if (cc < size - 1) nbs.push(curr + 1);

            for (const nb of nbs) {
              if (boardState[nb] === 1 && !visited[nb]) {
                visited[nb] = 1;
                queue.push(nb);
              }
            }
          }

          totalShaded += comp.length;
          if (comp.length !== 2) {
            errors.push({ type: 'domino', size: comp.length, cells: comp });
          }
        }
      }

      if (errors.length === 0 && totalShaded === requiredShaded) {
        isSolved = true;
        stopTimer();
        playSound('victory');

        if (victoryModal) {
          const timeVal = document.getElementById('victory-time-val');
          const sizeVal = document.getElementById('victory-size-val');
          const diffVal = document.getElementById('victory-diff-val');
          const hintsVal = document.getElementById('victory-hints-val');

          if (timeVal) timeVal.textContent = formatTime(timerSeconds);
          if (sizeVal) sizeVal.textContent = \`\${currentSize}×\${currentSize}\`;
          if (diffVal) diffVal.textContent = currentDifficulty.charAt(0).toUpperCase() + currentDifficulty.slice(1);
          if (hintsVal) hintsVal.textContent = String(hintsUsed);

          victoryModal.hidden = false;
        }

        try { localStorage.removeItem(\`puzzlefeels_norinori_save_\${currentPuzzle.id}\`); } catch (e) {}
        if (bannerTextEl) bannerTextEl.textContent = 'Congratulations! You solved the Norinori puzzle!';
        return { solved: true, errors: [], totalShaded };
      }

      return { solved: false, errors, totalShaded };
    }

    // Victory modal action buttons
    const modalNextBtn = document.getElementById('modal-btn-next');
    const modalShareBtn = document.getElementById('modal-btn-share');

    if (modalNextBtn) {
      modalNextBtn.addEventListener('click', () => {
        if (victoryModal) victoryModal.hidden = true;
        currentPuzzleIndex++;
        loadCurrentPuzzle(false);
      });
    }

    if (modalShareBtn) {
      modalShareBtn.addEventListener('click', () => {
        const text = \`I solved the Norinori \${currentSize}×\${currentSize} (\${currentDifficulty}) puzzle on PuzzleFeels in \${formatTime(timerSeconds)} with \${hintsUsed} hints!\\nPlay free: https://puzzlefeels.com/norinori-game/\`;
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(() => showToast('Result copied to clipboard!'));
        } else {
          showToast('Result copied to clipboard!');
        }
      });
    }

    // Tabs & Mode Switching
    document.querySelectorAll('.norinori-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.norinori-tab-btn').forEach(b => {
          b.classList.remove('is-active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('is-active');
        btn.setAttribute('aria-selected', 'true');

        const size = btn.dataset.size;
        const mode = btn.dataset.mode;
        const diffContainer = document.getElementById('diff-toggle-container');

        if (mode) {
          currentMode = mode;
          if (diffContainer) diffContainer.hidden = true;
        } else if (size) {
          currentMode = 'size';
          currentSize = parseInt(size, 10);
          if (diffContainer) diffContainer.hidden = false;
        }

        currentPuzzleIndex = 0;
        loadCurrentPuzzle(true);
      });
    });

    // Difficulty buttons (Normal vs Hard)
    document.querySelectorAll('.diff-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.diff-btn').forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        currentDifficulty = btn.dataset.diff;
        currentPuzzleIndex = 0;
        loadCurrentPuzzle(true);
      });
    });

    // Initialize game on load
    loadCurrentPuzzle(true);

  })();
</script>

<style is:global>
  /* -------------------------------------------------------------
     Norinori Online Game Styles
     Strict matching of PuzzleFeels typography, container widths,
     H2/H3 scales, and responsive design patterns.
     ------------------------------------------------------------- */

  .norinori-page {
    padding-bottom: 72px;
  }

  /* Breadcrumbs */
  .norinori-breadcrumbs {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    color: var(--muted);
    padding: 18px 0 10px;
    width: min(780px, calc(100% - 40px));
    margin: 0 auto;
  }
  .norinori-breadcrumbs a {
    color: var(--muted);
    text-decoration: none;
    transition: color 0.15s ease;
  }
  .norinori-breadcrumbs a:hover {
    color: var(--ink);
  }

  /* Intro Header (Centered H1 & Description) */
  .norinori-intro {
    text-align: center;
    margin-bottom: 24px;
    width: min(780px, calc(100% - 40px));
    margin-left: auto;
    margin-right: auto;
  }
  .norinori-intro .eyebrow {
    display: inline-block;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: .08em;
    text-transform: uppercase;
    color: var(--blue, #315ee8);
    margin-bottom: 6px;
  }
  .norinori-intro h1 {
    font-size: 32px;
    font-weight: 800;
    letter-spacing: -.03em;
    line-height: 1.2;
    margin: 0 0 10px;
  }
  .norinori-intro p {
    font-size: 15px;
    line-height: 1.6;
    max-width: 620px;
    margin: 0 auto;
    color: var(--muted);
  }

  /* Main Shell Card */
  .norinori-shell {
    width: min(780px, calc(100% - 40px));
    margin: 0 auto 36px;
    padding: 18px 20px 24px;
    background: var(--paper, #fff);
    border: 1px solid var(--line);
    border-radius: 16px;
    box-shadow: 0 12px 36px -12px rgba(15, 23, 42, 0.08);
  }

  /* Header Bar: Tabs & Sound */
  .norinori-header-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding-bottom: 14px;
    border-bottom: 1px solid var(--line);
  }

  .norinori-tabs {
    display: flex;
    align-items: center;
    gap: 6px;
    overflow-x: auto;
    scrollbar-width: none;
    -webkit-overflow-scrolling: touch;
  }
  .norinori-tabs::-webkit-scrollbar {
    display: none;
  }
  .norinori-tab-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 6px 12px;
    border-radius: 8px;
    border: 1px solid var(--line);
    background: var(--paper, #fff);
    color: var(--muted);
    font-size: 11px;
    line-height: 1.2;
    cursor: pointer;
    white-space: nowrap;
    transition: all 0.15s ease;
  }
  .norinori-tab-btn strong {
    font-size: 13px;
    font-weight: 700;
    color: var(--ink);
  }
  .norinori-tab-btn:hover {
    border-color: var(--blue, #315ee8);
    color: var(--ink);
  }
  .norinori-tab-btn.is-active {
    background: var(--blue, #315ee8) !important;
    border-color: var(--blue, #315ee8) !important;
    color: #ffffff !important;
  }
  .norinori-tab-btn.is-active strong {
    color: #ffffff !important;
  }
  .norinori-tab-btn.challenge-tab {
    background: rgba(49, 94, 232, 0.05);
  }

  .norinori-sound-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 7px 12px;
    border-radius: 8px;
    border: 1px solid var(--line);
    background: transparent;
    color: var(--muted);
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    white-space: nowrap;
    transition: all 0.15s ease;
  }
  .norinori-sound-btn:hover {
    color: var(--ink);
    border-color: var(--ink);
  }

  /* Status Bar */
  .norinori-status-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    padding: 12px 0;
    border-bottom: 1px solid var(--line);
    flex-wrap: wrap;
  }
  .status-meta {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
  }
  .meta-badge {
    font-size: 11px;
    font-weight: 800;
    letter-spacing: .06em;
    padding: 3px 8px;
    border-radius: 6px;
    background: var(--wash, #f1f4fb);
    color: var(--ink);
  }
  .puzzle-id-pill {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-size: 12px;
    color: var(--muted);
  }
  .diff-toggle-group {
    display: inline-flex;
    border: 1px solid var(--line);
    border-radius: 6px;
    overflow: hidden;
    background: var(--wash, #f1f4fb);
  }
  .diff-btn {
    padding: 4px 10px;
    border: none;
    background: transparent;
    font-size: 11px;
    font-weight: 700;
    color: var(--muted);
    cursor: pointer;
    transition: all 0.15s ease;
  }
  .diff-btn:hover {
    color: var(--ink);
  }
  .diff-btn.is-active {
    background: var(--blue, #315ee8);
    color: #ffffff !important;
  }

  .status-counters {
    display: flex;
    align-items: center;
    gap: 14px;
  }
  .counter-box {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    line-height: 1.1;
  }
  .counter-label {
    font-size: 9px;
    font-weight: 700;
    letter-spacing: .06em;
    color: var(--muted);
  }
  .counter-val {
    font-size: 15px;
    font-weight: 800;
    font-variant-numeric: tabular-nums;
    color: var(--ink);
  }

  /* Toolbar */
  .norinori-toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    padding: 12px 0;
    border-bottom: 1px solid var(--line);
    flex-wrap: wrap;
  }
  .toolbar-mode-group {
    order: 1;
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .toolbar-action-group {
    order: 2;
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .toolbar-utility-group {
    order: 3;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .tool-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 14px;
    border-radius: 8px;
    border: 1px solid var(--line);
    background: var(--paper, #fff);
    color: var(--ink);
    font-size: 12px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.15s ease;
  }
  .tool-btn:hover {
    border-color: var(--blue, #315ee8);
  }
  .tool-btn.is-active {
    background: var(--blue, #315ee8) !important;
    border-color: var(--blue, #315ee8) !important;
    color: #ffffff !important;
  }

  .tool-action-btn,
  .tool-utility-btn {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 6px 11px;
    border-radius: 8px;
    border: 1px solid var(--line);
    background: var(--paper, #fff);
    color: var(--ink);
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.15s ease;
  }
  .tool-action-btn:hover,
  .tool-utility-btn:hover {
    border-color: var(--blue, #315ee8);
    background: var(--wash, #f1f4fb);
  }
  .tool-action-btn:disabled {
    opacity: 0.35;
    cursor: not-allowed;
    border-color: var(--line);
  }
  .primary-action-btn {
    background: var(--blue, #315ee8);
    border-color: var(--blue, #315ee8);
    color: #ffffff !important;
  }
  .primary-action-btn:hover {
    background: #254edb;
    border-color: #254edb;
  }

  /* Popovers */
  .popover-wrapper {
    position: relative;
  }
  .norinori-popover {
    position: absolute;
    top: calc(100% + 8px);
    right: 0;
    z-index: 50;
    min-width: 250px;
    background: var(--paper, #fff);
    border: 1px solid var(--line);
    border-radius: 12px;
    padding: 14px;
    box-shadow: 0 16px 40px -10px rgba(0, 0, 0, 0.2);
  }
  .popover-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;
    padding-bottom: 8px;
    border-bottom: 1px solid var(--line);
    font-size: 13px;
    font-weight: 700;
    color: var(--ink);
  }
  .popover-close-btn {
    border: none;
    background: transparent;
    font-size: 20px;
    color: var(--muted);
    cursor: pointer;
    padding: 0 4px;
    line-height: 1;
  }

  /* Zoom Popover */
  .zoom-controls-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
  }
  .zoom-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    padding: 8px 10px;
    border-radius: 8px;
    border: 1px solid var(--line);
    background: var(--wash, #f1f4fb);
    color: var(--ink);
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
  }
  .zoom-btn:hover {
    border-color: var(--blue, #315ee8);
    background: var(--line);
  }
  .zoom-btn.full-width {
    grid-column: 1 / -1;
  }

  /* Settings Popover */
  .settings-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .setting-item {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 12px;
    cursor: pointer;
  }
  .setting-info {
    display: flex;
    flex-direction: column;
    gap: 2px;
    font-size: 12px;
  }
  .setting-info strong {
    color: var(--ink);
  }
  .setting-desc {
    font-size: 10px;
    color: var(--muted);
    line-height: 1.3;
  }
  .setting-item input[type="checkbox"] {
    margin-top: 3px;
    cursor: pointer;
    accent-color: var(--blue, #315ee8);
    width: 16px;
    height: 16px;
  }
  .setting-actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 10px;
    border-top: 1px solid var(--line);
    margin-top: 4px;
  }
  .popover-link-btn {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    border: none;
    background: transparent;
    color: var(--blue, #315ee8);
    font-size: 11px;
    font-weight: 600;
    cursor: pointer;
    padding: 4px 0;
  }
  .popover-link-btn.reset-link {
    color: var(--muted);
  }
  .popover-link-btn:hover {
    text-decoration: underline;
  }

  /* Live Feedback Banner */
  .norinori-banner {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 14px;
    margin: 12px 0 16px;
    border-radius: 8px;
    background: var(--wash, #f1f4fb);
    color: var(--ink);
    font-size: 12px;
    line-height: 1.4;
  }
  .banner-icon {
    display: flex;
    align-items: center;
    color: var(--blue, #315ee8);
    flex-shrink: 0;
  }

  /* Grid Board Area */
  .norinori-board-outer {
    position: relative;
    width: 100%;
    margin: 8px 0 16px;
    padding: 12px 0;
    background: var(--wash, #f1f4fb);
    border-radius: 12px;
    display: flex;
    justify-content: center;
  }
  .norinori-board-scroll-area {
    width: 100%;
    overflow: auto;
    padding: 10px;
    display: flex;
    justify-content: center;
    -webkit-overflow-scrolling: touch;
  }
  .norinori-grid-container {
    --cell-size: 42px;
    display: inline-block;
  }

  .norinori-grid {
    display: grid;
    grid-template-columns: repeat(var(--grid-size, 6), var(--cell-size));
    grid-template-rows: repeat(var(--grid-size, 6), var(--cell-size));
    width: fit-content;
    border: 3px solid #0f172a;
    background: #ffffff;
    box-shadow: 0 8px 24px -6px rgba(0, 0, 0, 0.12);
    user-select: none;
    -webkit-user-select: none;
    touch-action: none;
    outline: none;
  }

  /* Norinori Cell Styles */
  .norinori-cell {
    width: var(--cell-size);
    height: var(--cell-size);
    box-sizing: border-box;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #ffffff;
    border: 1px solid #e2e8f0;
    cursor: pointer;
    transition: background-color 0.1s ease;
  }

  /* Thick Region Borders (3px solid #0f172a in light mode) */
  .norinori-cell.reg-border-top {
    border-top: 3px solid #0f172a !important;
  }
  .norinori-cell.reg-border-bottom {
    border-bottom: 3px solid #0f172a !important;
  }
  .norinori-cell.reg-border-left {
    border-left: 3px solid #0f172a !important;
  }
  .norinori-cell.reg-border-right {
    border-right: 3px solid #0f172a !important;
  }

  /* Shaded State (Filled domino cell) */
  .norinori-cell.is-shaded {
    background: #1e293b !important;
  }

  /* Dot State */
  .norinori-cell .dot-mark {
    display: none;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--muted);
    pointer-events: none;
  }
  .norinori-cell.is-dot .dot-mark {
    display: block;
  }

  /* Focused Cell Outline */
  .norinori-cell.is-focused::after {
    content: '';
    position: absolute;
    inset: 2px;
    border: 2px solid var(--blue, #315ee8);
    pointer-events: none;
    border-radius: 2px;
  }

  /* Hovered Region Tint */
  .norinori-cell.is-region-hover {
    background-color: #eff6ff;
  }
  .norinori-cell.is-shaded.is-region-hover {
    background-color: #0f172a !important;
  }

  /* Error State (Crimson tint) */
  .norinori-cell.is-error {
    background-color: #fee2e2 !important;
  }
  .norinori-cell.is-shaded.is-error {
    background-color: #dc2626 !important;
  }

  /* Dark Theme Overrides for Grid */
  html[data-theme="dark"] .norinori-shell {
    background: #151f3d;
    border-color: #293858;
  }
  html[data-theme="dark"] .norinori-board-outer {
    background: #0b132b;
  }
  html[data-theme="dark"] .norinori-grid {
    border-color: #8ea8ff;
    background: #111b36;
  }
  html[data-theme="dark"] .norinori-cell {
    background: #111b36;
    border-color: #1e2c4f;
  }
  html[data-theme="dark"] .norinori-cell.reg-border-top {
    border-top: 3px solid #8ea8ff !important;
  }
  html[data-theme="dark"] .norinori-cell.reg-border-bottom {
    border-bottom: 3px solid #8ea8ff !important;
  }
  html[data-theme="dark"] .norinori-cell.reg-border-left {
    border-left: 3px solid #8ea8ff !important;
  }
  html[data-theme="dark"] .norinori-cell.reg-border-right {
    border-right: 3px solid #8ea8ff !important;
  }
  html[data-theme="dark"] .norinori-cell.is-shaded {
    background: #3b82f6 !important;
  }
  html[data-theme="dark"] .norinori-cell.is-region-hover {
    background-color: #1a2850;
  }
  html[data-theme="dark"] .norinori-cell.is-shaded.is-region-hover {
    background-color: #60a5fa !important;
  }
  html[data-theme="dark"] .norinori-cell.is-error {
    background-color: #450a0a !important;
  }
  html[data-theme="dark"] .norinori-cell.is-shaded.is-error {
    background-color: #ef4444 !important;
  }
  html[data-theme="dark"] .shaded-swatch {
    background: #3b82f6;
    border-color: #3b82f6;
  }
  html[data-theme="dark"] .thick-border-swatch {
    border-color: #8ea8ff;
  }
  html[data-theme="dark"] .norinori-popover {
    background: #151f3d;
    border-color: #293858;
  }
  html[data-theme="dark"] .modal-card {
    background: #151f3d;
    border-color: #293858;
  }

  /* Legend Bar */
  .norinori-legend-bar {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    padding-top: 10px;
    font-size: 12px;
    color: var(--muted);
    flex-wrap: wrap;
  }
  .legend-item {
    display: inline-flex;
    align-items: center;
    gap: 7px;
  }
  .legend-swatch {
    display: inline-block;
    width: 14px;
    height: 14px;
    border-radius: 3px;
    border: 1px solid var(--line);
  }
  .shaded-swatch {
    background: #1e293b;
    border-color: #1e293b;
  }
  .dot-swatch {
    position: relative;
    background: var(--paper, #fff);
  }
  .dot-swatch::after {
    content: '';
    position: absolute;
    inset: 4px;
    border-radius: 50%;
    background: var(--muted);
  }
  .thick-border-swatch {
    border: 2px solid #0f172a;
    background: transparent;
  }

  /* Modal Dialogs */
  .norinori-modal {
    position: fixed;
    inset: 0;
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
  }
  .norinori-modal[hidden] {
    display: none !important;
  }
  .modal-backdrop {
    position: absolute;
    inset: 0;
    background: rgba(11, 19, 43, 0.65);
    backdrop-filter: blur(4px);
  }
  .modal-card {
    position: relative;
    z-index: 10;
    width: min(440px, 100%);
    background: var(--paper, #ffffff);
    color: var(--ink);
    border: 1px solid var(--line);
    border-radius: 16px;
    padding: 24px;
    box-shadow: 0 24px 48px -12px rgba(0, 0, 0, 0.35);
  }
  .modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
    padding-bottom: 12px;
    border-bottom: 1px solid var(--line);
  }
  .modal-header h3 {
    margin: 0;
    font-size: 18px;
    color: var(--ink);
  }
  .modal-close-icon-btn {
    border: none;
    background: transparent;
    font-size: 22px;
    line-height: 1;
    color: var(--muted);
    cursor: pointer;
  }
  .shortcut-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 8px 0;
    border-bottom: 1px solid var(--line);
    font-size: 13px;
    color: var(--ink);
  }
  .shortcut-row kbd {
    display: inline-block;
    padding: 3px 7px;
    border-radius: 6px;
    border: 1px solid var(--line);
    background: var(--wash, #f1f4fb);
    color: var(--ink);
    font-size: 11px;
    font-family: inherit;
    font-weight: 700;
  }
  .modal-footer {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
  }

  /* Victory Modal */
  .victory-card {
    text-align: center;
  }
  .victory-icon-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 64px;
    height: 64px;
    border-radius: 50%;
    background: rgba(49, 94, 232, 0.1);
    color: var(--blue, #315ee8);
    margin: 0 auto 12px;
  }
  .victory-card h2 {
    font-size: 26px;
    line-height: 1.2;
    margin: 0 0 6px;
    color: var(--ink);
  }
  .victory-subtitle {
    font-size: 14px;
    margin: 0 0 20px;
    color: var(--muted);
  }
  .modal-stats-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    margin-bottom: 24px;
  }
  .modal-stat-box {
    display: flex;
    flex-direction: column;
    padding: 10px;
    border-radius: 8px;
    border: 1px solid var(--line);
    background: var(--wash, #f1f4fb);
  }
  .modal-stat-box .stat-label {
    font-size: 9px;
    font-weight: 700;
    letter-spacing: .06em;
    color: var(--muted);
  }
  .modal-stat-box .stat-val {
    font-size: 16px;
    font-weight: 800;
    color: var(--ink);
  }
  .modal-actions {
    display: flex;
    gap: 8px;
    justify-content: center;
    flex-wrap: wrap;
  }
  .modal-actions .btn {
    padding: 9px 18px;
    font-size: 13px;
    font-weight: 700;
    border-radius: 8px;
    border: 1px solid var(--line);
    background: var(--wash, #f1f4fb);
    color: var(--ink);
    cursor: pointer;
  }
  .modal-actions .btn:hover {
    border-color: var(--blue, #315ee8);
  }
  .modal-actions .btn-primary {
    background: var(--blue, #315ee8);
    border-color: var(--blue, #315ee8);
    color: #ffffff !important;
  }
  .modal-actions .btn-primary:hover {
    background: #254edb;
    border-color: #254edb;
  }

  /* Toast Notification */
  .norinori-toast {
    position: fixed;
    bottom: 24px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1000;
    padding: 10px 20px;
    background: var(--ink);
    color: var(--paper, #fff);
    font-size: 13px;
    font-weight: 700;
    border-radius: 999px;
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);
  }

  /* -------------------------------------------------------------
     SEO Educational Article (Strictly matching Sliding Number Puzzle)
     ------------------------------------------------------------- */
  .norinori-article {
    width: min(780px, calc(100% - 40px));
    margin-top: 68px;
    margin-bottom: 48px;
    margin-left: auto;
    margin-right: auto;
    font-size: 16px;
    line-height: 1.72;
    text-align: left;
  }
  .norinori-article h2 {
    font-size: 24px;
    line-height: 1.25;
    letter-spacing: -.025em;
    margin: 36px 0 12px;
    text-align: left;
  }
  .norinori-article h2:first-child {
    margin-top: 0;
  }
  .norinori-article h3 {
    font-size: 18px;
    line-height: 1.3;
    letter-spacing: -.02em;
    margin: 26px 0 10px;
    text-align: left;
  }
  .norinori-article p {
    margin: 0 0 16px;
  }

  /* -------------------------------------------------------------
     Related Games Section (Strictly matching Memory Matching Game)
     ------------------------------------------------------------- */
  .related-games-section {
    padding: 56px 0 36px;
    border-top: 1px solid var(--line);
    margin-top: 48px;
    width: min(780px, calc(100% - 40px));
    margin-left: auto;
    margin-right: auto;
  }
  .related-games-head {
    max-width: 620px;
    margin: 0 auto 36px;
    text-align: center;
  }
  .related-games-head .eyebrow {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: .08em;
    text-transform: uppercase;
    color: var(--blue, #315ee8);
    margin-bottom: 4px;
    display: block;
  }
  .related-games-head h2 {
    font-size: clamp(1.8rem, 3.2vw, 2.4rem);
    margin: 10px 0 12px;
    letter-spacing: -.03em;
  }
  .related-games-head p {
    font-size: 15px;
    line-height: 1.65;
    margin: 0 auto;
    color: var(--muted);
  }

  .related-games-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 20px;
    align-items: stretch;
  }
  .related-card {
    text-decoration: none;
    color: var(--ink);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    border-radius: 18px;
    border: 1px solid var(--line);
    background: var(--paper, #fff);
    transition: transform .18s ease, border-color .18s ease, box-shadow .18s ease;
  }
  .related-card:hover {
    transform: translateY(-3px);
    border-color: #cfd8ef;
    box-shadow: 0 14px 34px rgba(23, 35, 59, 0.08);
  }
  .related-visual {
    height: 170px;
    position: relative;
    display: grid;
    place-items: center;
    background: linear-gradient(145deg, #eaf0ff, #f6f3ff);
    overflow: hidden;
  }
  .related-orbit {
    position: absolute;
    width: 140px;
    height: 140px;
    border: 1px dashed #cad5fa;
    border-radius: 50%;
  }
  .related-icon {
    position: relative;
    z-index: 1;
    display: grid;
    gap: 6px;
    grid-template-columns: repeat(2, 42px);
  }
  .related-icon span {
    width: 42px;
    height: 42px;
    display: grid;
    place-items: center;
    border-radius: 12px;
    background: #ffffff;
    color: #315ee8;
    box-shadow: 0 4px 12px rgba(23, 35, 59, 0.08);
  }
  .slide-icon span {
    font-size: 16px;
    font-weight: 800;
  }
  .slide-icon .slide-empty {
    background: transparent;
    border: 2px dashed #b9c8f5;
    box-shadow: none;
  }
  .slide-icon span:nth-child(1) { background: #315ee8; color: #fff; }
  .slide-icon span:nth-child(2) { background: #edf2ff; color: #315ee8; }
  .slide-icon span:nth-child(3) { background: #eaf7f2; color: #16825d; }
  .reaction-icon span:nth-child(1) { background: #fef08a; color: #a16207; }
  .reaction-icon span:nth-child(2) { background: #315ee8; color: #fff; }
  .reaction-icon span:nth-child(3) { background: #dcfce7; color: #15803d; }
  .reaction-icon span:nth-child(4) { background: #fee2e2; color: #b91c1c; }
  .memory-icon span:nth-child(1) { background: #ede9fe; color: #7c3aed; }
  .memory-icon span:nth-child(2) { background: #315ee8; color: #fff; }
  .memory-icon span:nth-child(3) { background: #fef08a; color: #a16207; }
  .memory-icon span:nth-child(4) { background: #dcfce7; color: #15803d; }

  .related-card-body {
    padding: 18px;
    display: flex;
    flex-direction: column;
    flex: 1;
  }
  .related-labels {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 2px;
  }
  .related-labels .pill {
    font-size: 9px;
    letter-spacing: .04em;
    padding: 2px 7px;
    border-radius: 999px;
    font-weight: 700;
    text-transform: uppercase;
    background: var(--line);
    color: var(--ink);
  }
  .difficulty-label {
    font-size: 10px;
    color: var(--muted);
  }
  .related-card h3 {
    font-size: 17px;
    margin: 0 0 8px;
    letter-spacing: -.02em;
    color: var(--ink);
    font-weight: 700;
  }
  .related-card p {
    font-size: 13px;
    line-height: 1.6;
    margin: 0 0 14px;
    flex: 1;
    color: var(--muted);
  }
  .related-play {
    font-size: 13px;
    font-weight: 700;
    color: var(--blue, #315ee8);
    display: inline-flex;
    align-items: center;
    gap: 4px;
    margin-top: auto;
  }

  /* Dark Theme Support for Related Games */
  html[data-theme="dark"] .related-card {
    background: #151f3d;
    border-color: #293858;
    box-shadow: 0 10px 24px rgba(3, 8, 23, 0.35);
  }
  html[data-theme="dark"] .related-card:hover {
    border-color: #52678f;
    box-shadow: 0 16px 38px rgba(3, 8, 23, 0.6);
  }
  html[data-theme="dark"] .related-visual {
    background: linear-gradient(145deg, #1b294b, #222345);
  }
  html[data-theme="dark"] .related-orbit {
    border-color: #35466c;
  }
  html[data-theme="dark"] .related-icon span {
    background: #263553;
    color: #c2d0ff;
    box-shadow: 0 8px 20px rgba(3, 8, 23, 0.35);
  }
  html[data-theme="dark"] .slide-icon span:nth-child(1) { background: #8ea8ff; color: #0b132b; }
  html[data-theme="dark"] .slide-icon span:nth-child(2) { background: #1b294b; color: #c2d0ff; }
  html[data-theme="dark"] .slide-icon span:nth-child(3) { background: #173c43; color: #7be0ba; }
  html[data-theme="dark"] .slide-icon .slide-empty { border-color: #35466c; }
  html[data-theme="dark"] .reaction-icon span:nth-child(1) { background: #713f12; color: #fef08a; }
  html[data-theme="dark"] .reaction-icon span:nth-child(2) { background: #8ea8ff; color: #0b132b; }
  html[data-theme="dark"] .reaction-icon span:nth-child(3) { background: #14532d; color: #86efac; }
  html[data-theme="dark"] .reaction-icon span:nth-child(4) { background: #7f1d1d; color: #fca5a5; }
  html[data-theme="dark"] .memory-icon span:nth-child(1) { background: #3b1e75; color: #c4b5fd; }
  html[data-theme="dark"] .memory-icon span:nth-child(2) { background: #8ea8ff; color: #0b132b; }
  html[data-theme="dark"] .memory-icon span:nth-child(3) { background: #713f12; color: #fef08a; }
  html[data-theme="dark"] .memory-icon span:nth-child(4) { background: #14532d; color: #86efac; }

  /* Responsive Rules */
  @media (max-width: 900px) {
    .related-games-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 18px;
    }
  }

  @media (max-width: 560px) {
    .related-games-grid {
      grid-template-columns: 1fr;
      gap: 16px;
    }
    .related-card {
      display: grid;
      grid-template-columns: 110px minmax(0, 1fr);
      min-height: 150px;
    }
    .related-visual {
      height: auto;
      min-height: 150px;
    }
    .related-orbit {
      width: 96px;
      height: 96px;
    }
    .related-icon span {
      width: 32px;
      height: 32px;
      font-size: 14px;
    }
    .related-card-body {
      padding: 14px 12px;
    }
    .related-card h3 {
      font-size: 15px;
      margin: 6px 0 4px;
    }
    .related-card p {
      font-size: 12px;
      line-height: 1.5;
      margin-bottom: 8px;
    }
    .related-play {
      font-size: 12px;
    }
  }

  @media (max-width: 640px) {
    .norinori-shell {
      padding: 14px 14px 20px;
    }
    .norinori-intro h1 {
      font-size: 26px;
    }
    .norinori-article h2 {
      font-size: 21px;
      margin-top: 28px;
    }
    .norinori-article h3 {
      font-size: 17px;
    }
    .norinori-header-bar {
      flex-direction: column;
      align-items: stretch;
      gap: 10px;
    }
    .norinori-sound-btn {
      align-self: flex-start;
    }
    .toolbar-mode-group {
      order: 1;
    }
    .toolbar-utility-group {
      order: 2;
    }
    .toolbar-action-group {
      order: 3;
      overflow-x: auto;
      width: 100%;
      padding-bottom: 4px;
      margin-top: 4px;
      scrollbar-width: none;
    }
    .toolbar-action-group::-webkit-scrollbar {
      display: none;
    }
  }
</style>
`;

const fullPageCode = markup + clientScriptAndStyles;
fs.writeFileSync('src/pages/norinori-game.astro', fullPageCode);
console.log('Successfully updated src/pages/norinori-game.astro');

import fs from 'fs';

const scriptAndStyles = `
<script>
  import { MURDOKU_CASES, getDailyCase, type MurdokuCase, type Person } from '../data/murdokuCases';

  type Difficulty = 'easy' | 'medium' | 'hard' | 'expert' | 'daily';
  type Tool = 'place' | 'mark' | 'eraser';

  interface HistorySnapshot {
    placements: Record<string, { r: number; c: number } | null>;
    cellMarks: boolean[][]; // [r][c] true if 'X'
  }

  // State
  let currentDiff: Difficulty = 'easy';
  let currentCaseIndex = 0;
  let currentCase: MurdokuCase = MURDOKU_CASES[0];
  let selectedTool: Tool = 'place';
  let selectedPersonId: string | null = null;
  let soundEnabled = true;

  // Grid placements & mark state
  let placements: Record<string, { r: number; c: number } | null> = {};
  let cellMarks: boolean[][] = [];
  let solvedClues: Set<string> = new Set();

  // History for undo/redo
  let historyStack: HistorySnapshot[] = [];
  let redoStack: HistorySnapshot[] = [];

  // Timer & hints
  let timerInterval: number | null = null;
  let startTime = 0;
  let elapsedSeconds = 0;
  let hintsUsed = 0;
  let isSolved = false;

  // Audio Context
  let audioCtx: AudioContext | null = null;

  function initAudio() {
    if (!audioCtx) {
      const AudioClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioClass) audioCtx = new AudioClass();
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  function playSound(type: 'click' | 'place' | 'remove' | 'mark' | 'error' | 'win' | 'hint') {
    if (!soundEnabled) return;
    initAudio();
    if (!audioCtx) return;
    const now = audioCtx.currentTime;

    try {
      if (type === 'click') {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.05);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now);
        osc.stop(now + 0.05);
      } else if (type === 'place') {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.exponentialRampToValueAtTime(540, now + 0.09);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now);
        osc.stop(now + 0.09);
      } else if (type === 'remove' || type === 'mark') {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(260, now);
        osc.frequency.exponentialRampToValueAtTime(180, now + 0.06);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now);
        osc.stop(now + 0.06);
      } else if (type === 'error') {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(160, now);
        osc.frequency.linearRampToValueAtTime(110, now + 0.16);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now);
        osc.stop(now + 0.16);
      } else if (type === 'hint') {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(520, now);
        osc.frequency.exponentialRampToValueAtTime(780, now + 0.12);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now);
        osc.stop(now + 0.12);
      } else if (type === 'win') {
        const notes = [440, 554.37, 659.25, 880];
        notes.forEach((freq, idx) => {
          if (!audioCtx) return;
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + idx * 0.1);
          gain.gain.setValueAtTime(0.12, now + idx * 0.1);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.1 + 0.35);
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.start(now + idx * 0.1);
          osc.stop(now + idx * 0.1 + 0.35);
        });
      }
    } catch {
      // Audio fallback silent
    }
  }

  // DOM Elements
  const tabs = Array.from(document.querySelectorAll<HTMLButtonElement>('.murdoku-tab-btn'));
  const soundBtn = document.getElementById('murdoku-sound-toggle') as HTMLButtonElement;
  const soundLabel = soundBtn?.querySelector('.sound-label') as HTMLElement;
  const soundOnIcon = soundBtn?.querySelector('.sound-on-icon') as SVGElement;
  const soundOffIcon = soundBtn?.querySelector('.sound-off-icon') as SVGElement;

  const caseBadge = document.getElementById('case-difficulty-badge') as HTMLElement;
  const caseTitle = document.getElementById('case-title') as HTMLElement;
  const victimName = document.getElementById('case-victim-name') as HTMLElement;
  const storyText = document.getElementById('case-story-text') as HTMLElement;
  const timerVal = document.getElementById('timer-val') as HTMLElement;
  const placedVal = document.getElementById('placed-val') as HTMLElement;
  const hintsVal = document.getElementById('hints-val') as HTMLElement;
  const alertBox = document.getElementById('murdoku-alert') as HTMLElement;

  const boardContainer = document.getElementById('grid-board-container') as HTMLElement;
  const suspectsTray = document.getElementById('suspects-tray') as HTMLElement;
  const cluesList = document.getElementById('clues-list') as HTMLElement;
  const clueProgressText = document.getElementById('clue-progress-text') as HTMLElement;
  const roomsLegend = document.getElementById('rooms-legend') as HTMLElement;

  const toolPlaceBtn = document.getElementById('tool-place') as HTMLButtonElement;
  const toolMarkBtn = document.getElementById('tool-mark') as HTMLButtonElement;
  const toolEraserBtn = document.getElementById('tool-eraser') as HTMLButtonElement;

  const btnUndo = document.getElementById('btn-undo') as HTMLButtonElement;
  const btnRedo = document.getElementById('btn-redo') as HTMLButtonElement;
  const btnCheck = document.getElementById('btn-check') as HTMLButtonElement;
  const btnHint = document.getElementById('btn-hint') as HTMLButtonElement;
  const btnClear = document.getElementById('btn-clear') as HTMLButtonElement;
  const btnRestart = document.getElementById('btn-restart') as HTMLButtonElement;
  const btnNewCase = document.getElementById('btn-new-case') as HTMLButtonElement;

  const accuseSelect = document.getElementById('accuse-select') as HTMLSelectElement;
  const btnAccuse = document.getElementById('btn-accuse') as HTMLButtonElement;

  // Victory Modal elements
  const victoryModal = document.getElementById('victory-modal') as HTMLElement;
  const victoryTitle = document.getElementById('victory-title') as HTMLElement;
  const victorySubtitle = document.getElementById('victory-subtitle') as HTMLElement;
  const victoryKillerAvatar = document.getElementById('victory-killer-avatar') as HTMLElement;
  const victoryKillerName = document.getElementById('victory-killer-name') as HTMLElement;
  const victoryKillerRole = document.getElementById('victory-killer-role') as HTMLElement;
  const victoryKillerProof = document.getElementById('victory-killer-proof') as HTMLElement;
  const victoryTimeVal = document.getElementById('victory-time-val') as HTMLElement;
  const victoryStarsVal = document.getElementById('victory-stars-val') as HTMLElement;
  const victoryHintsVal = document.getElementById('victory-hints-val') as HTMLElement;
  const victoryPbVal = document.getElementById('victory-pb-val') as HTMLElement;
  const modalBtnNext = document.getElementById('modal-btn-next') as HTMLButtonElement;
  const modalBtnShare = document.getElementById('modal-btn-share') as HTMLButtonElement;
  const modalBtnClose = document.getElementById('modal-btn-close') as HTMLButtonElement;
  const murdokuToast = document.getElementById('murdoku-toast') as HTMLElement;

  // Furniture Icon SVGs
  function getFurnitureSvg(icon: string): string {
    switch (icon) {
      case 'bookcase':
        return '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5z"></path><path d="M6 6h10M6 10h10M6 14h10"></path></svg>';
      case 'fireplace':
        return '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18M5 21V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v15"></path><path d="M8 21v-7a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v7"></path><path d="M12 14c-1 1-1 2 0 3s2-1 0-3z"></path></svg>';
      case 'safe':
        return '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"></rect><circle cx="12" cy="12" r="3"></circle><line x1="12" y1="9" x2="12" y2="7"></line><line x1="12" y1="17" x2="12" y2="15"></line></svg>';
      case 'statue':
        return '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 22h6M12 18v4M7 18h10l-1-7a4 4 0 0 0-8 0l-1 7zM12 4a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"></path></svg>';
      case 'clock':
        return '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>';
      case 'desk':
        return '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8h18v4H3zM5 12v9M19 12v9M3 12h18"></path><line x1="9" y1="12" x2="9" y2="21"></line></svg>';
      case 'piano':
        return '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"></rect><line x1="6" y1="5" x2="6" y2="13"></line><line x1="10" y1="5" x2="10" y2="13"></line><line x1="14" y1="5" x2="14" y2="13"></line><line x1="18" y1="5" x2="18" y2="13"></line></svg>';
      case 'stove':
        return '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="3" width="16" height="18" rx="2"></rect><circle cx="8" cy="8" r="2"></circle><circle cx="16" cy="8" r="2"></circle><rect x="6" y="13" width="12" height="6" rx="1"></rect></svg>';
      case 'fountain':
      default:
        return '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v11M8 6a4 4 0 0 1 8 0M5 14h14M3 21h18M6 18h12"></path></svg>';
    }
  }

  // Person Avatar SVG
  function getPersonSvg(person: Person): string {
    if (person.isVictim) {
      return '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="7" r="4"></circle><path d="M5 21v-2a5 5 0 0 1 10 0v2"></path><line x1="17" y1="14" x2="21" y2="18"></line><line x1="21" y1="14" x2="17" y2="18"></line></svg>';
    }
    return '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>';
  }

  // Load Saved Sound
  try {
    const s = localStorage.getItem('murdoku_sound');
    if (s !== null) soundEnabled = s === 'true';
  } catch {}
  updateSoundUI();

  function updateSoundUI() {
    if (soundBtn) {
      soundBtn.setAttribute('aria-pressed', soundEnabled ? 'true' : 'false');
      if (soundLabel) soundLabel.textContent = soundEnabled ? 'Sound On' : 'Muted';
      if (soundOnIcon) soundOnIcon.hidden = !soundEnabled;
      if (soundOffIcon) soundOffIcon.hidden = soundEnabled;
    }
  }

  soundBtn?.addEventListener('click', () => {
    soundEnabled = !soundEnabled;
    try {
      localStorage.setItem('murdoku_sound', String(soundEnabled));
    } catch {}
    updateSoundUI();
    playSound('click');
  });

  // Load Case
  function loadCase(diff: Difficulty, index = 0) {
    currentDiff = diff;
    let pool: MurdokuCase[] = [];
    if (diff === 'daily') {
      currentCase = getDailyCase();
      currentCaseIndex = 0;
    } else {
      pool = MURDOKU_CASES.filter(c => c.difficulty === diff);
      currentCaseIndex = index % pool.length;
      currentCase = pool[currentCaseIndex];
    }

    // Reset game state
    placements = {};
    for (const p of currentCase.people) {
      placements[p.id] = null;
    }
    cellMarks = Array.from({ length: currentCase.gridSize }, () =>
      Array.from({ length: currentCase.gridSize }, () => false)
    );
    solvedClues.clear();
    historyStack = [];
    redoStack = [];
    hintsUsed = 0;
    isSolved = false;
    selectedPersonId = currentCase.people[0]?.id || null;

    // Reset timer
    stopTimer();
    elapsedSeconds = 0;
    startTimer();

    // Render components
    renderStatus();
    renderBoard();
    renderTray();
    renderClues();
    renderRoomsLegend();
    renderAccuseDropdown();
    updateUndoRedoButtons();
    hideAlert();
  }

  // Timer functions
  function startTimer() {
    stopTimer();
    startTime = Date.now() - elapsedSeconds * 1000;
    timerInterval = window.setInterval(() => {
      elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
      const m = Math.floor(elapsedSeconds / 60).toString().padStart(2, '0');
      const s = (elapsedSeconds % 60).toString().padStart(2, '0');
      if (timerVal) timerVal.textContent = \`\${m}:\${s}\`;
    }, 1000);
  }

  function stopTimer() {
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
  }

  // Update Status Banner
  function renderStatus() {
    if (caseBadge) caseBadge.textContent = currentDiff.toUpperCase();
    if (caseTitle) caseTitle.textContent = currentCase.title;
    const victim = currentCase.people.find(p => p.isVictim);
    if (victimName && victim) victimName.textContent = victim.name;
    if (storyText) storyText.textContent = currentCase.story;
    if (hintsVal) hintsVal.textContent = String(hintsUsed);
    updatePlacedCount();
  }

  function updatePlacedCount() {
    const placed = Object.values(placements).filter(Boolean).length;
    const total = currentCase.people.length;
    if (placedVal) placedVal.textContent = \`\${placed} / \${total}\`;
  }

  // Floor Plan Board Rendering
  function renderBoard() {
    if (!boardContainer) return;
    boardContainer.innerHTML = '';

    const N = currentCase.gridSize;
    const wrapper = document.createElement('div');
    wrapper.className = \`grid-board size-\${N}\`;
    wrapper.style.gridTemplateColumns = \`repeat(\${N}, minmax(0, 1fr))\`;

    // Map room colors
    const cellToRoom: Record<string, any> = {};
    for (const room of currentCase.rooms) {
      for (const [r, c] of room.cells) {
        cellToRoom[\`\${r},\${c}\`] = room;
      }
    }

    // Map furniture
    const furnitureMap: Record<string, any> = {};
    for (const f of currentCase.furniture) {
      furnitureMap[\`\${f.row},\${f.col}\`] = f;
    }

    // Check for row/col conflicts
    const rowOccupants: Record<number, string[]> = {};
    const colOccupants: Record<number, string[]> = {};
    for (const [pId, pos] of Object.entries(placements)) {
      if (!pos) continue;
      rowOccupants[pos.r] = rowOccupants[pos.r] || [];
      rowOccupants[pos.r].push(pId);
      colOccupants[pos.c] = colOccupants[pos.c] || [];
      colOccupants[pos.c].push(pId);
    }

    for (let r = 0; r < N; r++) {
      for (let c = 0; c < N; c++) {
        const key = \`\${r},\${c}\`;
        const room = cellToRoom[key];
        const furn = furnitureMap[key];
        const cellEl = document.createElement('div');
        cellEl.className = 'grid-cell';
        cellEl.dataset.row = String(r);
        cellEl.dataset.col = String(c);
        cellEl.setAttribute('role', 'gridcell');
        cellEl.tabIndex = 0;

        // Apply room background and border styling
        if (room) {
          cellEl.dataset.roomId = room.id;
          cellEl.style.backgroundColor = room.color;
          cellEl.style.borderColor = room.border + '66';
        }

        // Cell coordinate badge
        const coordSpan = document.createElement('span');
        coordSpan.className = 'cell-coord';
        coordSpan.textContent = \`R\${r + 1}C\${c + 1}\`;
        cellEl.appendChild(coordSpan);

        if (furn) {
          cellEl.classList.add('is-furniture');
          cellEl.title = \`\${furn.name} (Blocked)\`;
          cellEl.setAttribute('aria-label', \`\${furn.name} at Row \${r + 1}, Column \${c + 1}\`);
          const iconWrap = document.createElement('div');
          iconWrap.className = 'furniture-icon';
          iconWrap.innerHTML = getFurnitureSvg(furn.icon);
          const label = document.createElement('span');
          label.className = 'furniture-label';
          label.textContent = furn.name;
          cellEl.appendChild(iconWrap);
          cellEl.appendChild(label);
        } else {
          // Check if person placed here
          const personHereId = Object.keys(placements).find(
            pId => placements[pId]?.r === r && placements[pId]?.c === c
          );

          if (personHereId) {
            const person = currentCase.people.find(p => p.id === personHereId)!;
            cellEl.classList.add('has-person');
            if (person.isVictim) cellEl.classList.add('is-victim');

            // Conflict check
            const hasConflict =
              (rowOccupants[r] && rowOccupants[r].length > 1) ||
              (colOccupants[c] && colOccupants[c].length > 1);
            if (hasConflict) cellEl.classList.add('has-conflict');

            const token = document.createElement('div');
            token.className = 'person-token';
            token.style.borderColor = person.color;
            token.innerHTML = \`
              <div class="token-avatar" style="background-color: \${person.color}22; color: \${person.color}">
                \${getPersonSvg(person)}
              </div>
              <span class="token-name">\${person.name}</span>
            \`;

            // Remove button on hover
            const btnRemove = document.createElement('button');
            btnRemove.className = 'token-remove-btn';
            btnRemove.type = 'button';
            btnRemove.title = 'Remove ' + person.name;
            btnRemove.innerHTML = '<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';
            btnRemove.addEventListener('click', (e) => {
              e.stopPropagation();
              recordHistory();
              placements[personHereId] = null;
              playSound('remove');
              renderBoard();
              renderTray();
              updatePlacedCount();
            });
            token.appendChild(btnRemove);
            cellEl.appendChild(token);
          } else if (cellMarks[r][c]) {
            // Marked 'X'
            cellEl.classList.add('is-marked-x');
            const markSpan = document.createElement('span');
            markSpan.className = 'mark-x';
            markSpan.textContent = '✕';
            cellEl.appendChild(markSpan);
          }

          // Cell click / keyboard
          cellEl.addEventListener('click', () => handleCellAction(r, c));
          cellEl.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleCellAction(r, c);
            }
          });
        }

        wrapper.appendChild(cellEl);
      }
    }

    boardContainer.appendChild(wrapper);
  }

  // Handle cell click / interaction
  function handleCellAction(r: number, c: number) {
    if (isSolved) return;
    // Cannot interact with furniture cells
    const isFurn = currentCase.furniture.some(f => f.row === r && f.col === c);
    if (isFurn) return;

    recordHistory();

    const existingPersonId = Object.keys(placements).find(
      pId => placements[pId]?.r === r && placements[pId]?.c === c
    );

    if (selectedTool === 'eraser') {
      if (existingPersonId) {
        placements[existingPersonId] = null;
        playSound('remove');
      } else if (cellMarks[r][c]) {
        cellMarks[r][c] = false;
        playSound('remove');
      }
    } else if (selectedTool === 'mark') {
      if (existingPersonId) {
        placements[existingPersonId] = null;
      }
      cellMarks[r][c] = !cellMarks[r][c];
      playSound('mark');
    } else if (selectedTool === 'place') {
      if (!selectedPersonId) {
        // If clicking a cell that has a person, select that person
        if (existingPersonId) {
          selectedPersonId = existingPersonId;
          renderTray();
          playSound('click');
        }
        return;
      }

      // If cell already had 'X', unmark it
      cellMarks[r][c] = false;

      // If another person was here, unseat them
      if (existingPersonId && existingPersonId !== selectedPersonId) {
        placements[existingPersonId] = null;
      }

      // Move selected person to this cell
      placements[selectedPersonId] = { r, c };
      playSound('place');

      // Auto-advance to next unplaced person
      const unplaced = currentCase.people.find(p => !placements[p.id]);
      if (unplaced) {
        selectedPersonId = unplaced.id;
      }
    }

    renderBoard();
    renderTray();
    updatePlacedCount();
    checkAutoConflicts();
  }

  // Auto conflict notification
  function checkAutoConflicts() {
    const N = currentCase.gridSize;
    const rowMap: Record<number, string[]> = {};
    const colMap: Record<number, string[]> = {};
    for (const [pId, pos] of Object.entries(placements)) {
      if (!pos) continue;
      rowMap[pos.r] = rowMap[pos.r] || [];
      rowMap[pos.r].push(pId);
      colMap[pos.c] = colMap[pos.c] || [];
      colMap[pos.c].push(pId);
    }

    for (let r = 0; r < N; r++) {
      if (rowMap[r] && rowMap[r].length > 1) {
        showAlert(\`Conflict: Row \${r + 1} contains \${rowMap[r].length} people! Only one person allowed per row.\`, 'warning');
        return;
      }
    }
    for (let c = 0; c < N; c++) {
      if (colMap[c] && colMap[c].length > 1) {
        showAlert(\`Conflict: Column \${c + 1} contains \${colMap[c].length} people! Only one person allowed per column.\`, 'warning');
        return;
      }
    }
    hideAlert();
  }

  // Suspects Tray Rendering
  function renderTray() {
    if (!suspectsTray) return;
    suspectsTray.innerHTML = '';

    for (const person of currentCase.people) {
      const isSelected = selectedPersonId === person.id;
      const pos = placements[person.id];
      const card = document.createElement('div');
      card.className = \`tray-card \${isSelected ? 'is-selected' : ''} \${pos ? 'is-placed' : ''} \${person.isVictim ? 'is-victim' : ''}\`;
      card.setAttribute('role', 'radio');
      card.setAttribute('aria-checked', isSelected ? 'true' : 'false');
      card.tabIndex = 0;

      const avatar = document.createElement('div');
      avatar.className = 'tray-avatar';
      avatar.style.borderColor = person.color;
      avatar.style.backgroundColor = person.color + '22';
      avatar.style.color = person.color;
      avatar.innerHTML = getPersonSvg(person);

      const info = document.createElement('div');
      info.className = 'tray-info';

      const nameRow = document.createElement('div');
      nameRow.className = 'tray-name-row';
      const name = document.createElement('strong');
      name.className = 'tray-name';
      name.textContent = person.name;
      nameRow.appendChild(name);

      if (person.isVictim) {
        const victimTag = document.createElement('span');
        victimTag.className = 'victim-tag';
        victimTag.textContent = 'VICTIM';
        nameRow.appendChild(victimTag);
      }

      const role = document.createElement('span');
      role.className = 'tray-role';
      role.textContent = person.role;

      const posStatus = document.createElement('span');
      posStatus.className = 'tray-pos-status';
      if (pos) {
        posStatus.textContent = \`Placed: R\${pos.r + 1}, C\${pos.c + 1}\`;
      } else {
        posStatus.textContent = 'Unplaced';
      }

      info.appendChild(nameRow);
      info.appendChild(role);
      info.appendChild(posStatus);

      card.appendChild(avatar);
      card.appendChild(info);

      card.addEventListener('click', () => {
        selectedPersonId = person.id;
        selectedTool = 'place';
        updateToolButtons();
        renderTray();
        playSound('click');
      });

      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          selectedPersonId = person.id;
          selectedTool = 'place';
          updateToolButtons();
          renderTray();
          playSound('click');
        }
      });

      suspectsTray.appendChild(card);
    }
  }

  // Clues Notebook Rendering
  function renderClues() {
    if (!cluesList) return;
    cluesList.innerHTML = '';

    currentCase.clues.forEach((clue, idx) => {
      const isChecked = solvedClues.has(clue.id);
      const li = document.createElement('li');
      li.className = \`clue-item \${isChecked ? 'is-solved' : ''}\`;

      const checkbox = document.createElement('button');
      checkbox.className = 'clue-check-btn';
      checkbox.type = 'button';
      checkbox.setAttribute('aria-pressed', isChecked ? 'true' : 'false');
      checkbox.title = isChecked ? 'Mark clue as unsolved' : 'Mark clue as solved';
      checkbox.innerHTML = isChecked
        ? '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>'
        : '';

      const text = document.createElement('span');
      text.className = 'clue-text';
      text.textContent = clue.text;

      li.appendChild(checkbox);
      li.appendChild(text);

      li.addEventListener('click', () => {
        if (solvedClues.has(clue.id)) {
          solvedClues.delete(clue.id);
        } else {
          solvedClues.add(clue.id);
        }
        playSound('click');
        renderClues();
      });

      cluesList.appendChild(li);
    });

    if (clueProgressText) {
      clueProgressText.textContent = \`\${solvedClues.size} / \${currentCase.clues.length} Checked\`;
    }
  }

  // Estate Rooms Legend
  function renderRoomsLegend() {
    if (!roomsLegend) return;
    roomsLegend.innerHTML = '';
    for (const room of currentCase.rooms) {
      const chip = document.createElement('div');
      chip.className = 'room-chip';
      chip.style.backgroundColor = room.color;
      chip.style.borderColor = room.border;

      const dot = document.createElement('span');
      dot.className = 'room-color-dot';
      dot.style.backgroundColor = room.border;

      const name = document.createElement('span');
      name.className = 'room-chip-name';
      name.textContent = room.name;

      chip.appendChild(dot);
      chip.appendChild(name);
      roomsLegend.appendChild(chip);
    }
  }

  // Accusation Dropdown
  function renderAccuseDropdown() {
    if (!accuseSelect) return;
    accuseSelect.innerHTML = '<option value="">-- Select Accused Murderer --</option>';
    const suspects = currentCase.people.filter(p => !p.isVictim);
    for (const s of suspects) {
      const opt = document.createElement('option');
      opt.value = s.id;
      opt.textContent = \`\${s.name} (\${s.role})\`;
      accuseSelect.appendChild(opt);
    }
  }

  // Tool selection
  function updateToolButtons() {
    toolPlaceBtn?.classList.toggle('is-active', selectedTool === 'place');
    toolMarkBtn?.classList.toggle('is-active', selectedTool === 'mark');
    toolEraserBtn?.classList.toggle('is-active', selectedTool === 'eraser');
  }

  toolPlaceBtn?.addEventListener('click', () => {
    selectedTool = 'place';
    updateToolButtons();
    playSound('click');
  });

  toolMarkBtn?.addEventListener('click', () => {
    selectedTool = 'mark';
    updateToolButtons();
    playSound('click');
  });

  toolEraserBtn?.addEventListener('click', () => {
    selectedTool = 'eraser';
    updateToolButtons();
    playSound('click');
  });

  // Undo / Redo
  function recordHistory() {
    historyStack.push({
      placements: { ...placements },
      cellMarks: cellMarks.map(row => [...row])
    });
    if (historyStack.length > 30) historyStack.shift();
    redoStack = [];
    updateUndoRedoButtons();
  }

  function updateUndoRedoButtons() {
    if (btnUndo) btnUndo.disabled = historyStack.length === 0;
    if (btnRedo) btnRedo.disabled = redoStack.length === 0;
  }

  btnUndo?.addEventListener('click', () => {
    if (historyStack.length === 0) return;
    redoStack.push({
      placements: { ...placements },
      cellMarks: cellMarks.map(row => [...row])
    });
    const last = historyStack.pop()!;
    placements = last.placements;
    cellMarks = last.cellMarks;
    playSound('click');
    renderBoard();
    renderTray();
    updatePlacedCount();
    updateUndoRedoButtons();
    checkAutoConflicts();
  });

  btnRedo?.addEventListener('click', () => {
    if (redoStack.length === 0) return;
    historyStack.push({
      placements: { ...placements },
      cellMarks: cellMarks.map(row => [...row])
    });
    const next = redoStack.pop()!;
    placements = next.placements;
    cellMarks = next.cellMarks;
    playSound('click');
    renderBoard();
    renderTray();
    updatePlacedCount();
    updateUndoRedoButtons();
    checkAutoConflicts();
  });

  // Check Placements
  btnCheck?.addEventListener('click', () => {
    const placedCount = Object.values(placements).filter(Boolean).length;
    if (placedCount === 0) {
      showAlert('No suspects have been placed yet. Read the clues and place suspects onto the board.', 'info');
      playSound('error');
      return;
    }

    let correctCount = 0;
    let mistakes = 0;
    for (const [pId, pos] of Object.entries(placements)) {
      if (!pos) continue;
      const target = currentCase.solution[pId];
      if (target && target.r === pos.r && target.c === pos.c) {
        correctCount++;
      } else {
        mistakes++;
      }
    }

    if (mistakes === 0) {
      showAlert(\`Excellent! All \${correctCount} placed suspects are mathematically correct. Keep going!\`, 'success');
      playSound('win');
    } else {
      showAlert(\`Progress check: \${correctCount} correct, \${mistakes} misplaced. Review the clues carefully!\`, 'warning');
      playSound('error');
    }
  });

  // Hint tool
  btnHint?.addEventListener('click', () => {
    hintsUsed++;
    if (hintsVal) hintsVal.textContent = String(hintsUsed);
    playSound('hint');

    // 1. If any placed person is in the wrong cell, indicate them
    for (const [pId, pos] of Object.entries(placements)) {
      if (!pos) continue;
      const target = currentCase.solution[pId];
      if (target && (target.r !== pos.r || target.c !== pos.c)) {
        const person = currentCase.people.find(p => p.id === pId);
        showAlert(\`Hint: \${person?.name} is currently in an incorrect location. Try relocating them.\`, 'info');
        return;
      }
    }

    // 2. Otherwise find an unplaced person and place them
    const unplaced = currentCase.people.find(p => !placements[p.id]);
    if (unplaced) {
      const target = currentCase.solution[unplaced.id];
      recordHistory();
      placements[unplaced.id] = { r: target.r, c: target.c };
      cellMarks[target.r][target.c] = false;
      renderBoard();
      renderTray();
      updatePlacedCount();
      showAlert(\`Hint: \${unplaced.name} has been placed at Row \${target.r + 1}, Column \${target.c + 1}.\`, 'success');
      return;
    }

    // 3. If all placed, hint murderer
    const murderer = currentCase.people.find(p => p.id === currentCase.murdererId);
    showAlert(\`Hint: All suspects are placed! Check which suspect shares a room with the victim (\${murderer?.name}).\`, 'info');
  });

  // Clear & Restart
  btnClear?.addEventListener('click', () => {
    recordHistory();
    for (const p of currentCase.people) {
      placements[p.id] = null;
    }
    cellMarks = cellMarks.map(row => row.map(() => false));
    playSound('remove');
    renderBoard();
    renderTray();
    updatePlacedCount();
    hideAlert();
  });

  btnRestart?.addEventListener('click', () => {
    loadCase(currentDiff, currentCaseIndex);
    playSound('click');
  });

  btnNewCase?.addEventListener('click', () => {
    if (currentDiff === 'daily') {
      showAlert('The Daily Challenge is a synchronized single case for today.', 'info');
      return;
    }
    loadCase(currentDiff, currentCaseIndex + 1);
    playSound('click');
  });

  // Accuse Murderer Flow
  btnAccuse?.addEventListener('click', () => {
    const accusedId = accuseSelect?.value;
    if (!accusedId) {
      showAlert('Please select a suspect to accuse from the dropdown.', 'warning');
      playSound('error');
      return;
    }

    const unplaced = Object.values(placements).some(pos => !pos);
    if (unplaced) {
      showAlert('You must place all suspects and the victim on the grid before making an accusation.', 'warning');
      playSound('error');
      return;
    }

    // Check if placements match solution
    let allPositionsCorrect = true;
    for (const [pId, pos] of Object.entries(placements)) {
      const target = currentCase.solution[pId];
      if (!pos || target.r !== pos.r || target.c !== pos.c) {
        allPositionsCorrect = false;
        break;
      }
    }

    if (!allPositionsCorrect) {
      showAlert('Your suspect placements contain errors. Check your clue deductions before accusing!', 'error');
      playSound('error');
      return;
    }

    // Check murderer
    if (accusedId === currentCase.murdererId) {
      // Victory!
      handleVictory();
    } else {
      const accusedPerson = currentCase.people.find(p => p.id === accusedId);
      showAlert(\`False Accusation! \${accusedPerson?.name} did not share a room with the victim. Review room boundaries!\`, 'error');
      playSound('error');
    }
  });

  function handleVictory() {
    isSolved = true;
    stopTimer();
    playSound('win');

    const killer = currentCase.people.find(p => p.id === currentCase.murdererId)!;
    const victim = currentCase.people.find(p => p.isVictim)!;
    const killerPos = currentCase.solution[killer.id];
    const room = currentCase.rooms.find(r => r.id === killerPos.roomId);

    // Save Personal Best
    const m = Math.floor(elapsedSeconds / 60).toString().padStart(2, '0');
    const s = (elapsedSeconds % 60).toString().padStart(2, '0');
    const timeFormatted = \`\${m}:\${s}\`;

    let pb = timeFormatted;
    try {
      const key = \`murdoku_pb_\${currentCase.id}\`;
      const savedPb = localStorage.getItem(key);
      if (!savedPb || elapsedSeconds < parseTimeString(savedPb)) {
        localStorage.setItem(key, timeFormatted);
        pb = \`\${timeFormatted} (New!)\`;
      } else {
        pb = savedPb;
      }
    } catch {}

    // Stars rating: 3 stars (0 hints), 2 stars (1 hint), 1 star (2+ hints)
    let stars = '★★★';
    if (hintsUsed === 1) stars = '★★☆';
    if (hintsUsed >= 2) stars = '★☆☆';

    // Populate Victory Modal
    if (victoryTitle) victoryTitle.textContent = 'Case Solved! Killer Convicted!';
    if (victorySubtitle) victorySubtitle.textContent = \`\${victim.name}'s murder at \${currentCase.title} has been brought to justice.\`;
    if (victoryKillerAvatar) {
      victoryKillerAvatar.style.backgroundColor = killer.color + '22';
      victoryKillerAvatar.style.color = killer.color;
      victoryKillerAvatar.innerHTML = getPersonSvg(killer);
    }
    if (victoryKillerName) victoryKillerName.textContent = killer.name;
    if (victoryKillerRole) victoryKillerRole.textContent = killer.role;
    if (victoryKillerProof) victoryKillerProof.textContent = \`Shared \${room?.name || 'the murder room'} with \${victim.name} at Row \${killerPos.r + 1}, Column \${killerPos.c + 1}.\`;

    if (victoryTimeVal) victoryTimeVal.textContent = timeFormatted;
    if (victoryStarsVal) victoryStarsVal.textContent = stars;
    if (victoryHintsVal) victoryHintsVal.textContent = String(hintsUsed);
    if (victoryPbVal) victoryPbVal.textContent = pb;

    victoryModal?.removeAttribute('hidden');
  }

  function parseTimeString(t: string): number {
    const parts = t.split(':').map(Number);
    return parts[0] * 60 + parts[1];
  }

  modalBtnClose?.addEventListener('click', () => {
    victoryModal?.setAttribute('hidden', '');
  });

  modalBtnNext?.addEventListener('click', () => {
    victoryModal?.setAttribute('hidden', '');
    if (currentDiff === 'daily') {
      loadCase('easy', 0);
    } else {
      loadCase(currentDiff, currentCaseIndex + 1);
    }
    playSound('click');
  });

  modalBtnShare?.addEventListener('click', async () => {
    const stars = hintsUsed === 0 ? '★★★' : hintsUsed === 1 ? '★★☆' : '★☆☆';
    const m = Math.floor(elapsedSeconds / 60).toString().padStart(2, '0');
    const s = (elapsedSeconds % 60).toString().padStart(2, '0');
    const shareText = \`Murdoku Online - \${currentCase.title}\\nDifficulty: \${currentDiff.toUpperCase()} | Time: \${m}:\${s} | Rating: \${stars}\\nPlay free at: https://puzzlefeels.com/murdoku-online-game/\`;

    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareText);
        showToast('Result copied to clipboard!');
      }
    } catch {
      showToast('Copied result text!');
    }
  });

  function showToast(msg: string) {
    if (!murdokuToast) return;
    murdokuToast.textContent = msg;
    murdokuToast.removeAttribute('hidden');
    murdokuToast.classList.add('is-visible');
    setTimeout(() => {
      murdokuToast.classList.remove('is-visible');
      murdokuToast.setAttribute('hidden', '');
    }, 2800);
  }

  function showAlert(msg: string, type: 'info' | 'success' | 'warning' | 'error') {
    if (!alertBox) return;
    alertBox.textContent = msg;
    alertBox.className = \`murdoku-alert alert-\${type}\`;
    alertBox.removeAttribute('hidden');
  }

  function hideAlert() {
    if (alertBox) alertBox.setAttribute('hidden', '');
  }

  // Difficulty Tabs Switching
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => {
        t.classList.remove('is-active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('is-active');
      tab.setAttribute('aria-selected', 'true');
      const diff = tab.dataset.diff as Difficulty;
      loadCase(diff, 0);
      playSound('click');
    });
  });

  // Keyboard shortcut listener for Undo (Ctrl+Z) and Redo (Ctrl+Y)
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
      e.preventDefault();
      if (e.shiftKey) {
        btnRedo?.click();
      } else {
        btnUndo?.click();
      }
    } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'y') {
      e.preventDefault();
      btnRedo?.click();
    }
  });

  // Initial load
  loadCase('easy', 0);
</script>

<style>
  /* Base Murdoku Styling */
  .murdoku-page {
    padding-bottom: 70px;
  }
  .murdoku-breadcrumbs {
    padding: 18px 0 6px;
    font-size: 13px;
    color: var(--muted);
    display: flex;
    align-items: center;
    gap: 7px;
  }
  .murdoku-breadcrumbs a {
    color: var(--muted);
    transition: color 0.15s;
  }
  .murdoku-breadcrumbs a:hover {
    color: var(--blue);
  }

  .murdoku-intro {
    padding: 16px 0 24px;
    text-align: left;
  }
  .murdoku-intro h1 {
    font-size: clamp(1.9rem, 4vw, 2.7rem);
    margin: 8px 0 10px;
    letter-spacing: -0.035em;
  }
  .murdoku-intro p {
    max-width: 760px;
    line-height: 1.65;
    font-size: 15px;
  }

  /* Shell Container */
  .murdoku-shell {
    margin: 0 auto;
    padding: 24px;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    gap: 18px;
  }

  /* Top Header Bar */
  .murdoku-header-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 14px;
    padding-bottom: 16px;
    border-bottom: 1px solid var(--line);
  }
  .murdoku-diff-tabs {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
  .murdoku-tab-btn {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 8px 14px;
    border-radius: 12px;
    border: 1px solid var(--line);
    background: var(--paper);
    color: var(--ink);
    cursor: pointer;
    font-size: 12px;
    transition: all 0.16s ease;
  }
  .murdoku-tab-btn strong {
    font-size: 13px;
  }
  .murdoku-tab-btn span {
    font-size: 10px;
    color: var(--muted);
  }
  .murdoku-tab-btn:hover {
    border-color: var(--blue);
    background: var(--wash);
  }
  .murdoku-tab-btn.is-active {
    background: var(--blue);
    color: #fff;
    border-color: var(--blue);
    box-shadow: 0 4px 12px #315ee830;
  }
  .murdoku-tab-btn.is-active span {
    color: #ffffffcc;
  }

  .murdoku-sound-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 14px;
    border: 1px solid var(--line);
    border-radius: 12px;
    background: var(--paper);
    color: var(--ink);
    cursor: pointer;
    font-size: 13px;
    font-weight: 600;
    transition: all 0.15s ease;
  }
  .murdoku-sound-btn:hover {
    border-color: var(--blue);
    color: var(--blue);
  }

  /* Case Status Bar */
  .murdoku-status-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 14px;
    padding: 14px 18px;
    background: var(--wash);
    border-radius: 14px;
    border: 1px solid var(--line);
  }
  .case-meta {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
  }
  .case-badge {
    padding: 3px 8px;
    border-radius: 6px;
    font-size: 10px;
    font-weight: 800;
    letter-spacing: 0.05em;
    background: var(--blue);
    color: #fff;
  }
  .case-title {
    font-size: 17px;
    margin: 0;
    font-weight: 800;
    letter-spacing: -0.02em;
  }
  .case-victim-pill {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 3px 10px;
    border-radius: 20px;
    background: #fef2f2;
    border: 1px solid #fecaca;
    color: #dc2626;
    font-size: 11px;
  }
  .case-counters {
    display: flex;
    align-items: center;
    gap: 14px;
  }
  .counter-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 55px;
  }
  .counter-label {
    font-size: 9px;
    font-weight: 800;
    color: var(--muted);
    letter-spacing: 0.05em;
  }
  .counter-val {
    font-size: 16px;
    font-weight: 800;
    font-family: monospace;
    color: var(--ink);
  }

  /* Narrative Details */
  .murdoku-narrative-details {
    border: 1px solid var(--line);
    border-radius: 12px;
    background: var(--paper);
    padding: 10px 14px;
  }
  .narrative-summary {
    cursor: pointer;
    font-weight: 700;
    font-size: 13px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    user-select: none;
  }
  .summary-badge {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    color: var(--blue);
  }
  .narrative-body {
    padding-top: 8px;
    font-size: 13px;
    line-height: 1.6;
    color: var(--muted);
  }

  /* Workspace Split */
  .murdoku-workspace {
    display: grid;
    grid-template-columns: minmax(0, 1.45fr) minmax(0, 1fr);
    gap: 24px;
    align-items: start;
  }

  /* Toolbar */
  .murdoku-toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 14px;
    padding: 8px 12px;
    background: var(--wash);
    border: 1px solid var(--line);
    border-radius: 12px;
  }
  .tool-group {
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .tool-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 10px;
    border: 1px solid var(--line);
    border-radius: 8px;
    background: var(--paper);
    color: var(--ink);
    cursor: pointer;
    font-size: 11px;
    font-weight: 700;
    transition: all 0.14s ease;
  }
  .tool-btn:hover:not(:disabled) {
    border-color: var(--blue);
    color: var(--blue);
  }
  .tool-btn.is-active {
    background: var(--blue);
    border-color: var(--blue);
    color: #fff;
  }
  .tool-btn:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  /* Alert Banner */
  .murdoku-alert {
    padding: 10px 14px;
    margin-bottom: 12px;
    border-radius: 10px;
    font-size: 13px;
    font-weight: 600;
  }
  .alert-info { background: #eff6ff; color: #1e40af; border: 1px solid #bfdbfe; }
  .alert-success { background: #f0fdf4; color: #166534; border: 1px solid #bbf7d0; }
  .alert-warning { background: #fffbeb; color: #92400e; border: 1px solid #fde68a; }
  .alert-error { background: #fef2f2; color: #991b1b; border: 1px solid #fecaca; }

  /* Crime Scene Grid Board */
  .murdoku-grid-wrapper {
    display: flex;
    justify-content: center;
    margin-bottom: 16px;
  }
  .grid-board-container {
    width: 100%;
    max-width: 520px;
    aspect-ratio: 1 / 1;
    display: grid;
    place-items: stretch;
  }
  .grid-board {
    display: grid;
    gap: 4px;
    width: 100%;
    height: 100%;
    padding: 6px;
    background: var(--line);
    border-radius: 14px;
  }
  .grid-cell {
    position: relative;
    border-radius: 10px;
    border: 2px solid transparent;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    user-select: none;
    transition: transform 0.12s, box-shadow 0.12s, border-color 0.12s;
    overflow: hidden;
  }
  .grid-cell:hover:not(.is-furniture) {
    transform: scale(0.98);
    box-shadow: 0 4px 10px #00000015;
  }
  .grid-cell:focus-visible {
    outline: 3px solid var(--blue);
    outline-offset: 2px;
  }
  .cell-coord {
    position: absolute;
    top: 3px;
    left: 4px;
    font-size: 8px;
    font-weight: 800;
    opacity: 0.4;
    pointer-events: none;
  }

  /* Furniture item */
  .grid-cell.is-furniture {
    background: #e2e8f0 !important;
    border-color: #cbd5e1 !important;
    cursor: not-allowed;
    color: #475569;
  }
  .furniture-icon {
    display: grid;
    place-items: center;
    margin-bottom: 2px;
  }
  .furniture-label {
    font-size: 8px;
    font-weight: 700;
    text-align: center;
    line-height: 1.1;
    max-width: 90%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  /* Marked X */
  .grid-cell.is-marked-x .mark-x {
    font-size: 20px;
    font-weight: 800;
    color: #94a3b8;
  }

  /* Placed person token */
  .person-token {
    width: 90%;
    height: 90%;
    border-radius: 10px;
    background: var(--paper);
    border: 2px solid;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    box-shadow: 0 4px 12px #00000018;
  }
  .token-avatar {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    margin-bottom: 2px;
  }
  .token-name {
    font-size: 9px;
    font-weight: 800;
    line-height: 1.1;
    text-align: center;
    max-width: 85%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .token-remove-btn {
    position: absolute;
    top: -4px;
    right: -4px;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #ef4444;
    color: #fff;
    border: none;
    display: grid;
    place-items: center;
    cursor: pointer;
    box-shadow: 0 2px 5px #00000030;
    transition: transform 0.12s;
  }
  .token-remove-btn:hover {
    transform: scale(1.15);
  }

  /* Conflict highlighting */
  .grid-cell.has-conflict .person-token {
    border-color: #ef4444 !important;
    animation: pulse-conflict 1.5s infinite;
  }
  @keyframes pulse-conflict {
    0%, 100% { box-shadow: 0 0 0 0 #ef444460; }
    50% { box-shadow: 0 0 0 6px #ef444400; }
  }

  /* Suspects Tray */
  .murdoku-tray-card {
    padding: 14px;
    border-radius: 14px;
    border: 1px solid var(--line);
    background: var(--paper);
  }
  .tray-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
  }
  .tray-title {
    font-size: 13px;
    font-weight: 800;
  }
  .tray-hint {
    font-size: 11px;
    color: var(--muted);
  }
  .tray-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
    gap: 8px;
  }
  .tray-card {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 10px;
    border-radius: 10px;
    border: 1px solid var(--line);
    background: var(--wash);
    cursor: pointer;
    transition: all 0.15s ease;
  }
  .tray-card:hover {
    border-color: var(--blue);
  }
  .tray-card.is-selected {
    border-color: var(--blue);
    background: #eff6ff;
    box-shadow: 0 4px 12px #315ee820;
  }
  .tray-avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: 2px solid;
    display: grid;
    place-items: center;
    flex-shrink: 0;
  }
  .tray-info {
    display: flex;
    flex-direction: column;
    min-width: 0;
  }
  .tray-name-row {
    display: flex;
    align-items: center;
    gap: 4px;
  }
  .tray-name {
    font-size: 12px;
    line-height: 1.2;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .victim-tag {
    font-size: 7px;
    font-weight: 800;
    background: #dc2626;
    color: #fff;
    padding: 1px 4px;
    border-radius: 4px;
  }
  .tray-role {
    font-size: 10px;
    color: var(--muted);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .tray-pos-status {
    font-size: 9px;
    font-weight: 700;
    color: var(--blue);
  }
  .tray-card.is-placed .tray-pos-status {
    color: #16a34a;
  }

  /* Right Pane: Clue Notebook */
  .murdoku-notebook-pane {
    padding: 18px;
    border-radius: 16px;
    border: 1px solid var(--line);
    display: flex;
    flex-direction: column;
    gap: 14px;
  }
  .notebook-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 10px;
    border-bottom: 1px solid var(--line);
  }
  .notebook-title-wrap {
    display: flex;
    align-items: center;
    gap: 8px;
    color: var(--ink);
  }
  .notebook-title-wrap h3 {
    font-size: 16px;
    margin: 0;
    font-weight: 800;
    letter-spacing: -0.02em;
  }
  .notebook-progress {
    font-size: 11px;
    font-weight: 700;
    color: var(--muted);
  }
  .notebook-subtitle {
    font-size: 11px;
    color: var(--muted);
    margin: -6px 0 0;
  }

  /* Clues List */
  .clues-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
    max-height: 280px;
    overflow-y: auto;
  }
  .clue-item {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    padding: 8px 10px;
    border-radius: 8px;
    background: var(--wash);
    cursor: pointer;
    transition: background 0.12s;
  }
  .clue-item:hover {
    background: #e2e8f0;
  }
  .clue-check-btn {
    width: 18px;
    height: 18px;
    border-radius: 4px;
    border: 1.5px solid var(--muted);
    background: var(--paper);
    color: var(--blue);
    display: grid;
    place-items: center;
    cursor: pointer;
    flex-shrink: 0;
    margin-top: 1px;
    padding: 0;
  }
  .clue-item.is-solved .clue-check-btn {
    background: var(--blue);
    border-color: var(--blue);
    color: #fff;
  }
  .clue-text {
    font-size: 12px;
    line-height: 1.45;
  }
  .clue-item.is-solved .clue-text {
    text-decoration: line-through;
    opacity: 0.55;
  }

  /* Estate Rooms Legend */
  .estate-rooms-guide {
    padding: 10px 12px;
    background: var(--wash);
    border-radius: 10px;
  }
  .guide-title {
    font-size: 10px;
    font-weight: 800;
    color: var(--muted);
    letter-spacing: 0.05em;
    display: block;
    margin-bottom: 6px;
  }
  .rooms-legend {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }
  .room-chip {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 3px 8px;
    border-radius: 6px;
    border: 1px solid;
    font-size: 10px;
    font-weight: 700;
    color: var(--ink);
  }
  .room-color-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
  }

  /* Accusation Box */
  .murdoku-accusation-box {
    padding: 14px;
    background: #fef2f2;
    border: 1px solid #fecaca;
    border-radius: 12px;
  }
  .accusation-header {
    display: flex;
    align-items: center;
    gap: 7px;
    color: #dc2626;
    margin-bottom: 6px;
  }
  .accusation-header h4 {
    font-size: 14px;
    margin: 0;
    font-weight: 800;
  }
  .accusation-rule {
    font-size: 11px;
    color: #7f1d1d;
    line-height: 1.4;
    margin: 0 0 10px;
  }
  .accusation-controls {
    display: flex;
    gap: 8px;
  }
  .accuse-dropdown {
    flex: 1;
    min-width: 0;
    padding: 8px 10px;
    border-radius: 8px;
    border: 1px solid #fca5a5;
    background: #fff;
    color: #1e293b;
    font-size: 12px;
    font-weight: 600;
  }
  .accuse-submit-btn {
    padding: 8px 14px;
    font-size: 12px;
    font-weight: 700;
    background: #dc2626;
    border-color: #dc2626;
    color: #fff;
    white-space: nowrap;
  }
  .accuse-submit-btn:hover {
    background: #b91c1c;
  }

  /* Victory Modal Backdrop */
  .murdoku-modal-backdrop {
    position: fixed;
    inset: 0;
    z-index: 999;
    background: #00000075;
    backdrop-filter: blur(4px);
    display: grid;
    place-items: center;
    padding: 20px;
  }
  .murdoku-modal-backdrop[hidden] {
    display: none;
  }
  .murdoku-modal-card {
    max-width: 480px;
    width: 100%;
    padding: 28px 24px;
    border-radius: 20px;
    text-align: center;
    box-shadow: 0 20px 50px #00000040;
    animation: modal-pop 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  }
  @keyframes modal-pop {
    0% { transform: scale(0.92); opacity: 0; }
    100% { transform: scale(1); opacity: 1; }
  }
  .modal-badge-row {
    display: flex;
    justify-content: center;
    margin-bottom: 12px;
  }
  .victory-seal {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: #fef08a;
    color: #a16207;
    display: grid;
    place-items: center;
    box-shadow: 0 8px 20px #ca8a0430;
  }
  .modal-title {
    font-size: 22px;
    font-weight: 800;
    margin: 0 0 6px;
    letter-spacing: -0.025em;
  }
  .modal-subtitle {
    font-size: 13px;
    color: var(--muted);
    margin: 0 0 18px;
  }
  .modal-killer-card {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 12px 14px;
    background: #fef2f2;
    border: 1px solid #fecaca;
    border-radius: 12px;
    text-align: left;
    margin-bottom: 18px;
  }
  .killer-avatar {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    flex-shrink: 0;
  }
  .killer-info {
    display: flex;
    flex-direction: column;
    min-width: 0;
  }
  .killer-label {
    font-size: 9px;
    font-weight: 800;
    letter-spacing: 0.05em;
    color: #dc2626;
  }
  .killer-name {
    font-size: 15px;
    font-weight: 800;
    margin: 0;
    color: #991b1b;
  }
  .killer-role {
    font-size: 11px;
    color: #b91c1c;
    margin: 0 0 2px;
  }
  .killer-room-proof {
    font-size: 10px;
    color: #7f1d1d;
    margin: 0;
  }

  /* Modal Stats */
  .modal-stats-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 8px;
    margin-bottom: 20px;
  }
  .modal-stat-box {
    padding: 8px 4px;
    border-radius: 10px;
    background: var(--wash);
    border: 1px solid var(--line);
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .stat-label {
    font-size: 8px;
    font-weight: 800;
    color: var(--muted);
    letter-spacing: 0.04em;
    margin-bottom: 2px;
  }
  .stat-val {
    font-size: 14px;
    font-weight: 800;
  }
  .stars-val {
    color: #eab308;
    font-size: 15px;
  }

  /* Modal Actions */
  .modal-actions {
    display: flex;
    gap: 10px;
    justify-content: center;
    flex-wrap: wrap;
  }
  .modal-next-btn {
    flex: 1 1 100%;
    padding: 10px 18px;
    font-weight: 700;
  }
  .modal-share-btn, .modal-close-btn {
    flex: 1;
    padding: 8px 14px;
    font-size: 12px;
    font-weight: 600;
    border: 1px solid var(--line);
    background: var(--paper);
    color: var(--ink);
  }

  /* Share Toast */
  .murdoku-toast {
    position: fixed;
    bottom: 24px;
    left: 50%;
    transform: translateX(-50%) translateY(20px);
    background: #0f172a;
    color: #fff;
    padding: 10px 18px;
    border-radius: 24px;
    font-size: 13px;
    font-weight: 600;
    box-shadow: 0 8px 24px #00000030;
    z-index: 1000;
    opacity: 0;
    transition: all 0.2s ease;
  }
  .murdoku-toast.is-visible {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }

  /* Educational Content Strict Headings */
  .murdoku-content {
    padding: 50px 0 30px;
    line-height: 1.7;
    color: var(--ink);
  }
  article h2 {
    font-size: 24px;
    line-height: 1.25;
    letter-spacing: -0.025em;
    margin: 36px 0 12px;
    text-align: left;
  }
  article h2:first-child {
    margin-top: 0;
  }
  article h3 {
    font-size: 18px;
    line-height: 1.3;
    letter-spacing: -0.02em;
    margin: 26px 0 10px;
    text-align: left;
  }
  .murdoku-content p {
    font-size: 15px;
    color: var(--ink);
    margin: 0 0 16px;
    line-height: 1.7;
  }

  /* Related Games Section (Strict 3 Cards + Typography) */
  .related-games-section {
    padding: 40px 0 70px;
    border-top: 1px solid var(--line);
  }
  .related-games-header {
    text-align: center;
    margin-bottom: 30px;
  }
  .related-games-header h2 {
    font-size: 24px;
    margin: 8px 0;
    letter-spacing: -0.025em;
  }
  .related-games-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 24px;
  }
  .related-card {
    min-width: 0;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    border-radius: 20px;
    color: var(--ink);
    transition: transform 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease;
  }
  .related-card:hover {
    transform: translateY(-3px);
    border-color: #cfd8ef;
    box-shadow: 0 16px 38px #17233b12;
  }
  .related-visual {
    height: 170px;
    display: grid;
    place-items: center;
    position: relative;
    overflow: hidden;
    background: linear-gradient(145deg, #eaf0ff, #f6f3ff);
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
    grid-template-columns: repeat(2, 50px);
    gap: 8px;
    transform: rotate(-7deg);
  }
  .related-icon span {
    width: 50px;
    height: 50px;
    display: grid;
    place-items: center;
    border-radius: 14px;
    background: #fff;
    color: #315ee8;
    font-size: 18px;
    font-weight: 800;
    box-shadow: 0 8px 20px #293e8b14;
  }
  .slide-icon span:nth-child(1) { background: #315ee8; color: #fff; }
  .slide-icon span:nth-child(2) { background: #edf2ff; color: #315ee8; }
  .slide-icon span:nth-child(3) { background: #eaf7f2; color: #16825d; }
  .slide-icon .slide-empty { background: transparent; border: 2px dashed #b9c8f5; box-shadow: none; }
  .reaction-icon span:nth-child(1) { background: #fef08a; color: #a16207; }
  .reaction-icon span:nth-child(2) { background: #315ee8; color: #fff; }
  .reaction-icon span:nth-child(3) { background: #dcfce7; color: #15803d; }
  .reaction-icon span:nth-child(4) { background: #fee2e2; color: #b91c1c; }
  .memory-icon span:nth-child(1) { background: #ede9fe; color: #7c3aed; }
  .memory-icon span:nth-child(2) { background: #315ee8; color: #fff; }
  .memory-icon span:nth-child(3) { background: #fef08a; color: #a16207; }
  .memory-icon span:nth-child(4) { background: #dcfce7; color: #15803d; }

  .related-card-body {
    display: flex;
    flex: 1;
    flex-direction: column;
    padding: 20px 22px 22px;
  }
  .related-labels {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
  }
  .related-labels .pill {
    font-size: 9px;
    letter-spacing: 0.04em;
  }
  .difficulty-label {
    font-size: 10px;
    color: var(--muted);
  }
  .related-card h3 {
    font-size: 18px;
    line-height: 1.25;
    margin: 14px 0 8px;
    letter-spacing: -0.025em;
  }
  .related-card p {
    font-size: 12.5px;
    line-height: 1.6;
    margin: 0 0 16px;
  }
  .related-play {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    margin-top: auto;
    color: var(--blue);
    font-size: 12.5px;
    font-weight: 800;
  }

  /* Dark Mode Styling */
  :global(html[data-theme="dark"]) .grid-board {
    background: #1e293b;
  }
  :global(html[data-theme="dark"]) .grid-cell.is-furniture {
    background: #1e293b !important;
    border-color: #334155 !important;
    color: #94a3b8;
  }
  :global(html[data-theme="dark"]) .person-token {
    background: #0f172a;
    box-shadow: 0 4px 12px #00000045;
  }
  :global(html[data-theme="dark"]) .tray-card {
    background: #0f172a;
    border-color: #334155;
  }
  :global(html[data-theme="dark"]) .tray-card.is-selected {
    background: #1e3a8a35;
    border-color: #60a5fa;
  }
  :global(html[data-theme="dark"]) .murdoku-status-bar {
    background: #0f172a;
    border-color: #334155;
  }
  :global(html[data-theme="dark"]) .case-victim-pill {
    background: #450a0a;
    border-color: #7f1d1d;
    color: #fca5a5;
  }
  :global(html[data-theme="dark"]) .murdoku-accusation-box {
    background: #450a0a;
    border-color: #7f1d1d;
  }
  :global(html[data-theme="dark"]) .accusation-header {
    color: #fca5a5;
  }
  :global(html[data-theme="dark"]) .accusation-rule {
    color: #fecaca;
  }
  :global(html[data-theme="dark"]) .accuse-dropdown {
    background: #1e293b;
    border-color: #7f1d1d;
    color: #f8fafc;
  }
  :global(html[data-theme="dark"]) .modal-killer-card {
    background: #450a0a;
    border-color: #7f1d1d;
  }
  :global(html[data-theme="dark"]) .killer-name {
    color: #fca5a5;
  }
  :global(html[data-theme="dark"]) .killer-role {
    color: #fecaca;
  }
  :global(html[data-theme="dark"]) .killer-room-proof {
    color: #fee2e2;
  }
  :global(html[data-theme="dark"]) .victory-seal {
    background: #713f12;
    color: #fef08a;
  }
  :global(html[data-theme="dark"]) .related-visual {
    background: linear-gradient(145deg, #1b294b, #222345);
  }
  :global(html[data-theme="dark"]) .related-orbit {
    border-color: #35466c;
  }
  :global(html[data-theme="dark"]) .related-icon span {
    background: #263553;
    color: #c2d0ff;
  }
  :global(html[data-theme="dark"]) .slide-icon span:nth-child(1) { background: #8ea8ff; color: #0b132b; }
  :global(html[data-theme="dark"]) .slide-icon span:nth-child(2) { background: #1b294b; color: #c2d0ff; }
  :global(html[data-theme="dark"]) .slide-icon span:nth-child(3) { background: #173c43; color: #7be0ba; }
  :global(html[data-theme="dark"]) .reaction-icon span:nth-child(1) { background: #713f12; color: #fef08a; }
  :global(html[data-theme="dark"]) .reaction-icon span:nth-child(2) { background: #8ea8ff; color: #0b132b; }
  :global(html[data-theme="dark"]) .reaction-icon span:nth-child(3) { background: #14532d; color: #86efac; }
  :global(html[data-theme="dark"]) .reaction-icon span:nth-child(4) { background: #7f1d1d; color: #fca5a5; }
  :global(html[data-theme="dark"]) .memory-icon span:nth-child(1) { background: #3b1e75; color: #c4b5fd; }
  :global(html[data-theme="dark"]) .memory-icon span:nth-child(2) { background: #8ea8ff; color: #0b132b; }
  :global(html[data-theme="dark"]) .memory-icon span:nth-child(3) { background: #713f12; color: #fef08a; }
  :global(html[data-theme="dark"]) .memory-icon span:nth-child(4) { background: #14532d; color: #86efac; }

  /* Responsive Rules */
  @media (max-width: 960px) {
    .murdoku-workspace {
      grid-template-columns: 1fr;
    }
    .related-games-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @media (max-width: 640px) {
    .murdoku-shell {
      padding: 16px;
      gap: 14px;
    }
    .murdoku-header-bar {
      flex-direction: column;
      align-items: stretch;
    }
    .murdoku-diff-tabs {
      overflow-x: auto;
      flex-wrap: nowrap;
      padding-bottom: 4px;
    }
    .murdoku-tab-btn {
      flex-shrink: 0;
    }
    .murdoku-toolbar {
      flex-direction: column;
      align-items: stretch;
      gap: 8px;
    }
    .tool-group {
      justify-content: space-between;
    }
    .tool-btn {
      flex: 1;
      justify-content: center;
    }
    .tray-list {
      grid-template-columns: 1fr 1fr;
    }
    .modal-stats-grid {
      grid-template-columns: repeat(2, 1fr);
    }
    article h2 {
      font-size: 21px;
      margin-top: 28px;
    }
    article h3 {
      font-size: 17px;
    }
    .related-games-grid {
      grid-template-columns: 1fr;
    }
    .related-card {
      display: grid;
      grid-template-columns: 120px minmax(0, 1fr);
      min-height: 180px;
    }
    .related-visual {
      height: 100%;
    }
    .related-icon {
      grid-template-columns: repeat(2, 38px);
      gap: 6px;
    }
    .related-icon span {
      width: 38px;
      height: 38px;
      font-size: 14px;
    }
  }

  @media (max-width: 380px) {
    .tray-list {
      grid-template-columns: 1fr;
    }
    .accusation-controls {
      flex-direction: column;
    }
    .related-card {
      grid-template-columns: 100px minmax(0, 1fr);
    }
  }
</style>
`;

const existing = fs.readFileSync('src/pages/murdoku-online-game.astro', 'utf-8');
fs.writeFileSync('src/pages/murdoku-online-game.astro', existing + '\n' + scriptAndStyles, 'utf-8');
console.log('Successfully appended script and styles to src/pages/murdoku-online-game.astro');

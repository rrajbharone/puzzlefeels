(() => {
  const STORE = 'pf-number-sequence-v1';
  const patterns = {
    easy: [
      { seq: [2, 4, 6, 8], answer: 10, rule: 'Add 2 each time.' },
      { seq: [3, 6, 9, 12], answer: 15, rule: 'Add 3 each time.' },
      { seq: [5, 10, 15, 20], answer: 25, rule: 'Add 5 each time.' },
      { seq: [2, 4, 8, 16], answer: 32, rule: 'Multiply by 2 each time.' },
      { seq: [30, 25, 20, 15], answer: 10, rule: 'Subtract 5 each time.' },
      { seq: [1, 4, 9, 16], answer: 25, rule: 'These are square numbers: 1², 2², 3², 4², then 5².' },
      { seq: [4, 8, 12, 16], answer: 20, rule: 'Add 4 each time.' },
      { seq: [40, 35, 30, 25], answer: 20, rule: 'Subtract 5 each time.' },
      { seq: [1, 3, 6, 10], answer: 15, rule: 'The steps grow: add 2, then 3, then 4, then 5.' },
      { seq: [3, 9, 27, 81], answer: 243, rule: 'Multiply by 3 each time.' }
    ],
    medium: [
      { seq: [2, 5, 10, 17], answer: 26, rule: 'Add consecutive odd numbers: 3, 5, 7, then 9.' },
      { seq: [3, 6, 5, 10, 9], answer: 18, rule: 'Two patterns alternate: ×2, then −1.' },
      { seq: [1, 2, 4, 7, 11], answer: 16, rule: 'The steps grow by 1: add 1, 2, 3, 4, then 5.' },
      { seq: [2, 6, 18, 54], answer: 162, rule: 'Multiply by 3 each time.' },
      { seq: [64, 32, 16, 8], answer: 4, rule: 'Divide by 2 each time.' },
      { seq: [1, 4, 9, 16], answer: 25, rule: 'These are consecutive squares: 1², 2², 3², 4², 5².' },
      { seq: [5, 8, 14, 23], answer: 35, rule: 'The steps grow by 3: add 3, then 6, then 9, then 12.' },
      { seq: [2, 3, 5, 8, 12], answer: 17, rule: 'Add 1, 2, 3, 4, then 5.' },
      { seq: [81, 27, 9, 3], answer: 1, rule: 'Divide by 3 each time.' },
      { seq: [4, 7, 14, 17, 34], answer: 37, rule: 'Alternate +3 and ×2.' }
    ],
    hard: [
      { seq: [2, 6, 12, 20, 30], answer: 42, rule: 'The steps grow by 2: add 4, 6, 8, 10, then 12.' },
      { seq: [1, 2, 6, 24, 120], answer: 720, rule: 'Multiply by 2, 3, 4, 5, then 6.' },
      { seq: [2, 5, 4, 10, 6, 15], answer: 8, rule: 'Two patterns alternate: even numbers rise by 2; multiples of 5 rise by 5.' },
      { seq: [3, 4, 7, 11, 18], answer: 29, rule: 'Each number is the sum of the previous two.' },
      { seq: [1, 8, 27, 64], answer: 125, rule: 'These are cubes: 1³, 2³, 3³, 4³, then 5³.' },
      { seq: [100, 96, 88, 76, 60], answer: 40, rule: 'Subtract 4, 8, 12, 16, then 20.' },
      { seq: [2, 3, 5, 9, 17], answer: 33, rule: 'Add powers of 2: +1, +2, +4, +8, then +16.' },
      { seq: [1, 5, 14, 30, 55], answer: 91, rule: 'Add triangular numbers: +4, +9, +16, +25, then +36.' },
      { seq: [2, 4, 12, 48, 240], answer: 1440, rule: 'Multiply by 2, 3, 4, 5, then 6.' },
      { seq: [7, 10, 16, 28, 52], answer: 100, rule: 'The differences double: +3, +6, +12, +24, then +48.' }
    ]
  };

  let state = null, tick = null, sound = true, audio;
  const $ = id => document.getElementById(id);
  const screens = ['play-screen', 'result-screen'];

  function read() {
    try {
      const x = JSON.parse(localStorage.getItem(STORE) || '{}');
      return x && typeof x === 'object' && !Array.isArray(x) ? x : {};
    } catch {
      return {};
    }
  }

  function validSession(x) {
    return !!x &&
      ['active', 'paused'].includes(x.status) &&
      Object.hasOwn(patterns, x.difficulty) &&
      Array.isArray(x.order) &&
      x.order.length === 10 &&
      x.order.every(i => Number.isInteger(i) && i >= 0 && i < 10) &&
      Number.isInteger(x.index) &&
      x.index >= 0 &&
      x.index < 10 &&
      Number.isFinite(x.score) &&
      x.score >= 0 &&
      Number.isFinite(x.elapsed) &&
      x.elapsed >= 0 &&
      Array.isArray(x.answers) &&
      x.answers.length <= 10;
  }

  function write() {
    try {
      const old = read();
      const best = old.best && typeof old.best === 'object' && !Array.isArray(old.best) ? old.best : {};
      const results = Array.isArray(old.results) ? old.results : [];
      localStorage.setItem(STORE, JSON.stringify({
        ...old,
        active: ['active', 'paused'].includes(state?.status) ? state : null,
        best,
        results: results.slice(-20)
      }));
    } catch {}
  }

  function show(id) {
    screens.forEach(s => {
      const el = $(s);
      if (el) el.hidden = s !== id;
    });
  }

  function dailyId() {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }

  function updateDiffButtons(difficulty) {
    document.querySelectorAll('.seq-diff-btn, [data-difficulty]').forEach(btn => {
      const isMatch = btn.dataset.difficulty === difficulty;
      btn.classList.toggle('is-active', isMatch);
      btn.classList.toggle('selected', isMatch);
      btn.setAttribute('aria-pressed', String(isMatch));
    });
  }

  function start(difficulty = 'easy', daily = false) {
    const rng = daily ? seeded(dailyId()) : null;
    const order = patterns[difficulty].map((_, i) => i);
    if (rng) {
      for (let i = order.length - 1; i > 0; i--) {
        let j = Math.floor(rng() * (i + 1));
        [order[i], order[j]] = [order[j], order[i]];
      }
    } else {
      order.sort(() => Math.random() - .5);
    }
    state = {
      status: 'active',
      difficulty,
      order,
      index: 0,
      score: 0,
      correct: 0,
      answered: 0,
      elapsed: 0,
      daily,
      dailyId: daily ? dailyId() : null,
      answers: []
    };
    updateDiffButtons(difficulty);
    write();
    show('play-screen');
    render();
    startTimer();
  }

  function seeded(s) {
    let n = [...s].reduce((a, c) => ((a * 31 + c.charCodeAt(0)) >>> 0), 7);
    return () => {
      n = (n * 1664525 + 1013904223) >>> 0;
      return n / 4294967296;
    };
  }

  function startTimer() {
    clearInterval(tick);
    tick = setInterval(() => {
      if (state?.status === 'active') {
        state.elapsed++;
        const timerEl = $('timer');
        if (timerEl) timerEl.textContent = fmt(state.elapsed);
        if (state.elapsed % 5 === 0) write();
      }
    }, 1000);
  }

  function fmt(n) {
    return `${String(Math.floor(n / 60)).padStart(2, '0')}:${String(n % 60).padStart(2, '0')}`;
  }

  function render() {
    if (!state) return;
    const q = patterns[state.difficulty][state.order[state.index]];
    const savedAnswer = state.answers?.[state.index];

    const modeLabel = $('mode-label');
    if (modeLabel) modeLabel.textContent = state.difficulty.toUpperCase();
    const qLabel = $('question-label');
    if (qLabel) qLabel.textContent = `Question ${state.index + 1} of 10`;
    const scoreLabel = $('score-label');
    if (scoreLabel) scoreLabel.textContent = `${state.score} points`;
    const timerEl = $('timer');
    if (timerEl) timerEl.textContent = fmt(state.elapsed);

    const progressBar = $('progress-bar');
    if (progressBar) progressBar.style.width = `${(state.index + (savedAnswer != null ? 1 : 0)) / 10 * 100}%`;

    const seqEl = $('sequence');
    if (seqEl) {
      seqEl.innerHTML = q.seq.map(n => `<span class="sequence-number">${n}</span><span class="sequence-arrow" aria-hidden="true">→</span>`).join('') +
        '<span class="sequence-number missing">?</span>';
    }

    const feedbackEl = $('feedback');
    if (feedbackEl) {
      feedbackEl.textContent = '';
      feedbackEl.className = 'feedback';
    }
    const nextBtn = $('next-question');
    if (nextBtn) nextBtn.hidden = true;

    const answersEl = $('answers');
    if (answersEl) {
      answersEl.innerHTML = options(q).map(n => `<button class="answer-option" type="button" data-answer="${n}">${n}</button>`).join('');
      const answerButtons = answersEl.querySelectorAll('button');
      answerButtons.forEach(b => b.addEventListener('click', () => choose(+b.dataset.answer, q)));

      if (savedAnswer != null) {
        answerButtons.forEach(b => {
          const value = +b.dataset.answer;
          b.disabled = true;
          if (value === q.answer) b.classList.add('correct');
          else if (value === savedAnswer) b.classList.add('incorrect');
        });
        const correct = savedAnswer === q.answer;
        if (feedbackEl) {
          feedbackEl.textContent = `${correct ? 'Correct!' : 'Not quite.'} ${q.rule} The answer is ${q.answer}.`;
          feedbackEl.className = `feedback ${correct ? 'good' : 'bad'}`;
        }
        if (nextBtn) nextBtn.hidden = false;
      }
    }
    write();
  }

  function options(q) {
    const rng = seeded(`${q.answer}-${state.index}-${state.difficulty}`);
    const vals = new Set([q.answer]);
    while (vals.size < 4) {
      let offset = Math.floor(rng() * 11) - 5;
      if (!offset) offset = 6;
      let n = q.answer + offset;
      if (n >= 0) vals.add(n);
    }
    return [...vals].sort(() => rng() - .5);
  }

  function choose(n, q) {
    if (state.answers[state.index] != null) return;
    state.answered++;
    const ok = n === q.answer;
    if (ok) {
      state.correct++;
      const mult = { easy: 1, medium: 1.25, hard: 1.5 }[state.difficulty];
      state.score += Math.round(100 * mult);
      tone(true);
    } else {
      tone(false);
    }
    state.answers[state.index] = n;
    document.querySelectorAll('.answer-option').forEach(b => {
      const v = +b.dataset.answer;
      b.disabled = true;
      if (v === q.answer) b.classList.add('correct');
      else if (v === n) b.classList.add('incorrect');
    });
    const fb = $('feedback');
    if (fb) {
      fb.textContent = `${ok ? 'Correct!' : 'Not quite.'} ${q.rule} The answer is ${q.answer}.`;
      fb.className = `feedback ${ok ? 'good' : 'bad'}`;
    }
    const scoreLabel = $('score-label');
    if (scoreLabel) scoreLabel.textContent = `${state.score} points`;
    const progressBar = $('progress-bar');
    if (progressBar) progressBar.style.width = `${(state.index + 1) / 10 * 100}%`;
    const nextBtn = $('next-question');
    if (nextBtn) nextBtn.hidden = false;
    write();
  }

  function tone(ok) {
    if (!sound) return;
    try {
      audio ??= new AudioContext();
      const o = audio.createOscillator();
      const g = audio.createGain();
      o.connect(g);
      g.connect(audio.destination);
      o.frequency.value = ok ? 660 : 220;
      g.gain.value = .07;
      o.start();
      o.stop(audio.currentTime + .11);
    } catch {}
  }

  function next() {
    if (state.index === 9) {
      finish();
      return;
    }
    state.index++;
    render();
  }

  function finish() {
    clearInterval(tick);
    state.status = 'complete';
    const old = read();
    const best = old.best && typeof old.best === 'object' && !Array.isArray(old.best) ? { ...old.best } : {};
    const prior = Number.isFinite(best[state.difficulty]) ? best[state.difficulty] : 0;
    best[state.difficulty] = Math.max(prior, state.score);
    const results = Array.isArray(old.results) ? [...old.results] : [];
    results.push({
      score: state.score,
      difficulty: state.difficulty,
      accuracy: Math.round(state.correct / 10 * 100),
      elapsed: state.elapsed,
      at: new Date().toISOString()
    });
    try {
      localStorage.setItem(STORE, JSON.stringify({
        ...old,
        active: null,
        best,
        results: results.slice(-20),
        ...(state.daily ? { daily: { id: state.dailyId, completed: true, score: state.score } } : {})
      }));
    } catch {}

    const finalScore = $('final-score');
    if (finalScore) finalScore.textContent = state.score;
    const finalAccuracy = $('final-accuracy');
    if (finalAccuracy) finalAccuracy.textContent = `${Math.round(state.correct / 10 * 100)}%`;
    const finalTime = $('final-time');
    if (finalTime) finalTime.textContent = fmt(state.elapsed);
    const bestScore = $('best-score');
    if (bestScore) bestScore.textContent = best[state.difficulty];
    const finalMode = $('final-mode');
    if (finalMode) finalMode.textContent = cap(state.difficulty);
    show('result-screen');
  }

  function cap(s) {
    return s[0].toUpperCase() + s.slice(1);
  }

  function initial() {
    // Difficulty selector click bindings
    document.querySelectorAll('.seq-diff-btn, [data-difficulty]').forEach(btn => {
      btn.addEventListener('click', () => {
        const diff = btn.dataset.difficulty;
        if (diff && (!state || state.difficulty !== diff || state.status !== 'active')) {
          start(diff);
        }
      });
    });

    const shareBtn = $('share-score');
    if (shareBtn && !navigator.share) shareBtn.textContent = 'Copy result';

    const saved = read();
    sound = saved.sound !== false;
    updateSoundUI();

    const active = validSession(saved.active) ? saved.active : null;
    const isDaily = new URLSearchParams(location.search).has('daily');

    if (isDaily) {
      start('medium', true);
    } else if (active) {
      state = active;
      state.status = 'active';
      updateDiffButtons(state.difficulty);
      show('play-screen');
      render();
      startTimer();
    } else {
      // Automatic start in Easy mode directly on page load
      start('easy', false);
    }

    $('next-question')?.addEventListener('click', next);
    $('pause-button')?.addEventListener('click', () => {
      const overlay = $('pause-overlay');
      if (overlay) overlay.hidden = false;
      if (state) state.status = 'paused';
      write();
      clearInterval(tick);
    });
    $('resume-button')?.addEventListener('click', () => {
      const overlay = $('pause-overlay');
      if (overlay) overlay.hidden = true;
      if (state) state.status = 'active';
      startTimer();
      write();
    });
    $('restart-game')?.addEventListener('click', () => {
      if (confirm('Restart this game? Your current progress will be lost.')) {
        start(state?.difficulty || 'easy', state?.daily);
      }
    });

    $('sound-toggle')?.addEventListener('click', () => {
      sound = !sound;
      updateSoundUI();
      try {
        const old = read();
        localStorage.setItem(STORE, JSON.stringify({ ...old, sound }));
      } catch {}
    });

    $('play-again')?.addEventListener('click', () => {
      start(state?.difficulty || 'easy');
    });

    $('share-score')?.addEventListener('click', share);
    $('reset-stats')?.addEventListener('click', () => {
      if (confirm('Clear saved scores and game progress on this device?')) {
        try { localStorage.removeItem(STORE); } catch {}
        location.reload();
      }
    });
  }

  function updateSoundUI() {
    const toggle = $('sound-toggle');
    const label = $('sound-label');
    const icon = $('sound-icon');
    if (toggle) {
      toggle.setAttribute('aria-pressed', String(sound));
      toggle.setAttribute('aria-label', sound ? 'Mute sound' : 'Enable sound');
    }
    if (label) label.textContent = sound ? 'Sound: On' : 'Sound: Off';
    if (icon) icon.textContent = sound ? '♫' : '♪';
  }

  async function copyResult(msg) {
    if (navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(msg);
        return true;
      } catch {}
    }
    try {
      const t = document.createElement('textarea');
      t.value = msg;
      t.setAttribute('readonly', '');
      t.style.position = 'fixed';
      t.style.top = '0';
      t.style.left = '-9999px';
      document.body.append(t);
      t.select();
      const copied = document.execCommand('copy');
      t.remove();
      return copied;
    } catch {
      return false;
    }
  }

  async function share() {
    const msg = `I scored ${state?.score || $('final-score')?.textContent || 0} points in PuzzleFeels Number Sequence Game! Can you beat my score? Play free: https://puzzlefeels.com/number-sequence-game/`;
    if (navigator.share) {
      try {
        await navigator.share({ title: 'My PuzzleFeels score', text: msg });
        const shareStatus = $('share-status');
        if (shareStatus) shareStatus.textContent = 'Thanks for sharing!';
        return;
      } catch (e) {
        if (e.name === 'AbortError') return;
      }
    }
    const shareStatus = $('share-status');
    if (shareStatus) {
      shareStatus.textContent = (await copyResult(msg)) ? 'Result copied to clipboard.' : 'Could not share just now. Try again.';
    }
  }

  document.addEventListener('keydown', e => {
    const playScreen = $('play-screen');
    const pauseOverlay = $('pause-overlay');
    if (playScreen?.hidden || pauseOverlay?.hidden === false) return;
    if (['1', '2', '3', '4'].includes(e.key)) {
      const b = $('answers')?.querySelectorAll('button')[+e.key - 1];
      b?.click();
    }
    if (e.key === 'Enter' && !$('next-question')?.hidden) {
      $('next-question')?.click();
    }
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initial);
  } else {
    initial();
  }
})();

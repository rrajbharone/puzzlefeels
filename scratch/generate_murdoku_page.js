import fs from 'fs';

const pageCode = `---
import Base from '../layouts/Base.astro';
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
import FaqList from '../components/FaqList.astro';
import { MURDOKU_CASES, getDailyCase } from '../data/murdokuCases';

const title = 'Murdoku Online Game – Free Murder Mystery Logic Puzzle | PuzzleFeels';
const description = 'Play free Murdoku Online Game! Deduce clues, place suspects on the estate floor plan, and find the killer in this murder mystery logic puzzle. Free daily challenges.';

const faqs = [
  {
    question: 'What is Murdoku?',
    answer: 'Murdoku is a deductive murder mystery logic puzzle that combines Sudoku-style placement rules with crime-scene investigation. Players analyze witness statements and physical evidence to place suspects and the victim on an estate floor plan, then deduce the murderer using room-sharing rules.'
  },
  {
    question: 'How do you play Murdoku Online Game?',
    answer: 'Read the case background and clue notebook. Place the victim and each suspect into a valid cell on the grid following three strict rules: exactly one person per row, exactly one person per column, and no person may occupy a furniture tile. Use directional, room, and furniture landmark clues to deduce exact coordinates.'
  },
  {
    question: 'How do you determine who the murderer is?',
    answer: 'Under Murdoku rules, the murderer is the only suspect who shares an estate room with the victim at the time of the crime. Once all individuals are placed according to the clues, inspect the room containing the victim. The suspect standing in that exact same room is the killer.'
  },
  {
    question: 'What is the one-person-per-row and column rule?',
    answer: 'Just like classic Sudoku, every row and every column across the entire grid can hold at most one person. Because the victim counts as a person, neither the victim nor any suspect can share a horizontal row or vertical column with another person.'
  },
  {
    question: 'What does "beside" mean in Murdoku clues?',
    answer: 'In Murdoku, "beside" refers to direct orthogonal adjacency (horizontally or vertically adjacent with Manhattan distance equal to 1). Two people can never be directly adjacent to each other because they cannot share rows or columns. Therefore, adjacency clues apply to people relative to fixed furniture, walls, or landmarks.'
  },
  {
    question: 'Can suspects occupy furniture tiles?',
    answer: 'No. Fixed furniture items (such as desks, fireplaces, safes, statues, pianos, and clocks) occupy permanent floor space. Suspects and the victim cannot be placed on a cell that contains furniture.'
  },
  {
    question: 'What is the difference between Easy, Medium, Hard, and Expert levels?',
    answer: 'Easy features a 4×4 grid with 4 people (1 victim and 3 suspects). Medium expands to a 5×5 grid with 5 people and additional furniture obstacles. Hard presents a 6×6 estate with 6 people and complex intersecting clues. Expert features a 6×6 grid with minimal starting anchors where coordinates must be derived through multi-step deductive chains.'
  },
  {
    question: 'What is the Daily Challenge in Murdoku?',
    answer: 'The Daily Challenge presents a synchronized, unique murder mystery case generated deterministically for each calendar day at midnight UTC. All players worldwide solve the exact same case and can compare their completion times and star ratings.'
  },
  {
    question: 'What does marking a cell with an "X" do?',
    answer: 'Marking a cell with an "X" is an investigator note indicating that no person can possibly occupy that cell. It is equivalent to pencil marks in Sudoku or cross marks in Picross, helping you eliminate impossible options and isolate the true locations.'
  },
  {
    question: 'Does this game have a unique solution?',
    answer: 'Yes. Every single case in PuzzleFeels Murdoku is rigorously verified by an automated backtracking solver to ensure there is exactly one mathematically unique and logically sound solution.'
  },
  {
    question: 'Can I use hints if I get stuck?',
    answer: 'Yes. The Hint tool analyzes the remaining possibilities and highlights either a confirmed placement, an impossible cell elimination, or an unfulfilled clue to guide your deductive reasoning without spoiling the solution.'
  },
  {
    question: 'Is Murdoku free to play on mobile and desktop?',
    answer: 'Yes, 100% free. Murdoku runs directly in your web browser on mobile phones, tablets, and desktop computers with no downloads, subscriptions, or account registration required.'
  }
];

const gameSchema = {
  '@context': 'https://schema.org',
  '@type': 'VideoGame',
  name: 'Murdoku Online Game',
  url: 'https://puzzlefeels.com/murdoku-online-game/',
  description,
  gamePlatform: 'Web browser',
  applicationCategory: 'Game',
  genre: ['Logic Puzzle', 'Deduction Game', 'Murder Mystery'],
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  publisher: { '@type': 'Organization', name: 'PuzzleFeels', url: 'https://puzzlefeels.com/' }
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://puzzlefeels.com/' },
    { '@type': 'ListItem', position: 2, name: 'Games', item: 'https://puzzlefeels.com/games/' },
    { '@type': 'ListItem', position: 3, name: 'Murdoku Online Game', item: 'https://puzzlefeels.com/murdoku-online-game/' }
  ]
};
---

<Base {title} {description} path="/murdoku-online-game/">
  <Fragment slot="head">
    <script type="application/ld+json" set:html={JSON.stringify(gameSchema)} />
    <script type="application/ld+json" set:html={JSON.stringify(breadcrumbSchema)} />
  </Fragment>

  <Header />

  <main class="murdoku-page">
    <!-- Breadcrumbs -->
    <nav class="wrap murdoku-breadcrumbs" aria-label="Breadcrumbs">
      <a href="/">Home</a>
      <span aria-hidden="true">›</span>
      <a href="/games/">Games</a>
      <span aria-hidden="true">›</span>
      <span aria-current="page">Murdoku Online Game</span>
    </nav>

    <!-- Intro Header -->
    <section class="wrap murdoku-intro">
      <span class="eyebrow">Deduction & Murder Mystery Logic</span>
      <h1>Murdoku Online Game</h1>
      <p class="muted">Solve the clues, place the suspects on the estate floor plan, and find the killer. Follow the three ironclad laws of Murdoku: exactly one person per row, exactly one person per column, and the murderer is the sole suspect sharing a room with the victim.</p>
    </section>

    <!-- Game Shell Card -->
    <section class="wrap murdoku-shell card" data-murdoku-game aria-label="Murdoku Murder Mystery Logic Game">
      <!-- Top Bar: Difficulties & Audio -->
      <div class="murdoku-header-bar">
        <div class="murdoku-diff-tabs" role="tablist" aria-label="Difficulty selection">
          <button type="button" class="murdoku-tab-btn is-active" data-diff="easy" role="tab" aria-selected="true">
            <strong>Easy</strong>
            <span>4×4 · 4 People</span>
          </button>
          <button type="button" class="murdoku-tab-btn" data-diff="medium" role="tab" aria-selected="false">
            <strong>Medium</strong>
            <span>5×5 · 5 People</span>
          </button>
          <button type="button" class="murdoku-tab-btn" data-diff="hard" role="tab" aria-selected="false">
            <strong>Hard</strong>
            <span>6×6 · 6 People</span>
          </button>
          <button type="button" class="murdoku-tab-btn" data-diff="expert" role="tab" aria-selected="false">
            <strong>Expert</strong>
            <span>6×6 · Advanced</span>
          </button>
          <button type="button" class="murdoku-tab-btn" data-diff="daily" role="tab" aria-selected="false">
            <strong>Daily Case</strong>
            <span>UTC Challenge</span>
          </button>
        </div>

        <div class="murdoku-sound-wrap">
          <button id="murdoku-sound-toggle" class="murdoku-sound-btn" type="button" aria-label="Toggle sound effects" aria-pressed="true">
            <svg class="sound-on-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
            </svg>
            <svg class="sound-off-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" hidden>
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
              <line x1="23" y1="9" x2="17" y2="15"></line>
              <line x1="17" y1="9" x2="23" y2="15"></line>
            </svg>
            <span class="sound-label">Sound On</span>
          </button>
        </div>
      </div>

      <!-- Case Status Banner -->
      <div class="murdoku-status-bar">
        <div class="case-meta">
          <span class="case-badge" id="case-difficulty-badge">EASY</span>
          <h2 id="case-title" class="case-title">The Study at Midnight</h2>
          <span class="case-victim-pill" id="case-victim-pill">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
            Victim: <strong id="case-victim-name">Lord Sterling</strong>
          </span>
        </div>

        <div class="case-counters">
          <div class="counter-box">
            <span class="counter-label">TIME</span>
            <span class="counter-val" id="timer-val">00:00</span>
          </div>
          <div class="counter-box">
            <span class="counter-label">PLACED</span>
            <span class="counter-val" id="placed-val">0 / 4</span>
          </div>
          <div class="counter-box">
            <span class="counter-label">HINTS</span>
            <span class="counter-val" id="hints-val">0</span>
          </div>
        </div>
      </div>

      <!-- Case Narrative Accordion -->
      <details class="murdoku-narrative-details" id="case-narrative-wrap" open>
        <summary class="narrative-summary">
          <span class="summary-badge">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
            Case Brief & Background
          </span>
          <span class="summary-arrow" aria-hidden="true">▾</span>
        </summary>
        <div class="narrative-body" id="case-story-text">
          A thunderous storm rocked Sterling Manor as Lord Sterling was discovered lifeless in his private study. Three guests were on the grounds. Follow the clues, place everyone on the floor plan, and catch the killer.
        </div>
      </details>

      <!-- Main Layout: Grid Area (Left) + Clue Notebook (Right) -->
      <div class="murdoku-workspace">
        <!-- Left: Crime Scene Grid & Tray -->
        <div class="murdoku-investigation-pane">
          <!-- Action Toolbar -->
          <div class="murdoku-toolbar" role="toolbar" aria-label="Investigation tools">
            <div class="tool-group">
              <button type="button" class="tool-btn is-active" id="tool-place" data-tool="place" title="Place Suspect">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                <span>Place</span>
              </button>
              <button type="button" class="tool-btn" id="tool-mark" data-tool="mark" title="Mark Cell as Impossible (X)">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                <span>Mark X</span>
              </button>
              <button type="button" class="tool-btn" id="tool-eraser" data-tool="eraser" title="Eraser Tool">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21"></path><path d="M22 21H7"></path><path d="m5 11 9 9"></path></svg>
                <span>Eraser</span>
              </button>
            </div>

            <div class="tool-group">
              <button type="button" class="tool-btn" id="btn-undo" title="Undo Move (Ctrl+Z)" disabled>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7v6h6"></path><path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13"></path></svg>
                <span>Undo</span>
              </button>
              <button type="button" class="tool-btn" id="btn-redo" title="Redo Move (Ctrl+Y)" disabled>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 7v6h-6"></path><path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3L21 13"></path></svg>
                <span>Redo</span>
              </button>
              <button type="button" class="tool-btn" id="btn-check" title="Check Placements">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="m9 12 2 2 4-4"></path></svg>
                <span>Check</span>
              </button>
              <button type="button" class="tool-btn" id="btn-hint" title="Get a Deductive Hint">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="9" y1="18" x2="15" y2="18"></line><line x1="10" y1="22" x2="14" y2="22"></line><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"></path></svg>
                <span>Hint</span>
              </button>
            </div>

            <div class="tool-group">
              <button type="button" class="tool-btn" id="btn-clear" title="Clear Grid">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                <span>Clear</span>
              </button>
              <button type="button" class="tool-btn" id="btn-restart" title="Restart Case">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"></path><path d="M21 3v5h-5"></path></svg>
                <span>Reset</span>
              </button>
              <button type="button" class="tool-btn" id="btn-new-case" title="Load Another Case">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
                <span>New Case</span>
              </button>
            </div>
          </div>

          <!-- Alert / Feedback Banner -->
          <div class="murdoku-alert" id="murdoku-alert" role="status" aria-live="polite" hidden></div>

          <!-- Crime Scene Floor Plan Board -->
          <div class="murdoku-grid-wrapper">
            <!-- Coordinates and Floor Plan Grid -->
            <div class="grid-board-container" id="grid-board-container">
              <!-- Dynamically populated by JS -->
            </div>
          </div>

          <!-- Suspects Tray -->
          <div class="murdoku-tray-card card">
            <div class="tray-header">
              <span class="tray-title">Suspects & Victim</span>
              <span class="tray-hint">Select a person, then click an empty cell to place</span>
            </div>
            <div class="tray-list" id="suspects-tray" role="radiogroup" aria-label="Select person to place">
              <!-- Dynamically populated by JS -->
            </div>
          </div>
        </div>

        <!-- Right: Detective Notebook & Murderer Accusation -->
        <div class="murdoku-notebook-pane card">
          <div class="notebook-header">
            <div class="notebook-title-wrap">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
              <h3>Detective's Clue Notebook</h3>
            </div>
            <span class="notebook-progress" id="clue-progress-text">0 / 5 Solved</span>
          </div>

          <p class="notebook-subtitle">Click any clue to cross it off as you confirm placements:</p>

          <ul class="clues-list" id="clues-list" aria-label="Investigation clues">
            <!-- Dynamically populated by JS -->
          </ul>

          <!-- Room Guide -->
          <div class="estate-rooms-guide">
            <span class="guide-title">Estate Rooms & Colors</span>
            <div class="rooms-legend" id="rooms-legend">
              <!-- Dynamically populated by JS -->
            </div>
          </div>

          <!-- Accuse the Murderer Box -->
          <div class="murdoku-accusation-box" id="accusation-box">
            <div class="accusation-header">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polygon points="12 8 8 12 12 16 16 12 12 8"></polygon></svg>
              <h4>Solve the Murder</h4>
            </div>
            <p class="accusation-rule">
              <strong>The Golden Murder Rule:</strong> The murderer is the <em>only</em> suspect who was in the <strong>same room</strong> as the victim.
            </p>
            <div class="accusation-controls">
              <label for="accuse-select" class="sr-only">Select murderer to accuse</label>
              <select id="accuse-select" class="accuse-dropdown">
                <option value="">-- Select Accused Murderer --</option>
              </select>
              <button type="button" class="btn btn-primary accuse-submit-btn" id="btn-accuse">
                Accuse Killer
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Case Solved Victory Modal -->
    <div class="murdoku-modal-backdrop" id="victory-modal" role="dialog" aria-modal="true" aria-labelledby="victory-title" hidden>
      <div class="murdoku-modal-card card">
        <div class="modal-badge-row">
          <span class="victory-seal">
            <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
          </span>
        </div>

        <h2 id="victory-title" class="modal-title">Case Solved! Killer Convicted!</h2>
        <p class="modal-subtitle" id="victory-subtitle">Lord Sterling's murder has been brought to justice.</p>

        <!-- Murderer Profile Card -->
        <div class="modal-killer-card">
          <div class="killer-avatar" id="victory-killer-avatar">
            <!-- SVG Avatar -->
          </div>
          <div class="killer-info">
            <span class="killer-label">CONVICTED MURDERER</span>
            <h3 class="killer-name" id="victory-killer-name">Lady Cynthia</h3>
            <p class="killer-role" id="victory-killer-role">Greedy Heiress</p>
            <p class="killer-room-proof" id="victory-killer-proof">Shared the Study with the victim at Row 1, Column 1.</p>
          </div>
        </div>

        <!-- Performance Stats -->
        <div class="modal-stats-grid">
          <div class="modal-stat-box">
            <span class="stat-label">TIME</span>
            <span class="stat-val" id="victory-time-val">01:42</span>
          </div>
          <div class="modal-stat-box">
            <span class="stat-label">RATING</span>
            <span class="stat-val stars-val" id="victory-stars-val">★★★</span>
          </div>
          <div class="modal-stat-box">
            <span class="stat-label">HINTS USED</span>
            <span class="stat-val" id="victory-hints-val">0</span>
          </div>
          <div class="modal-stat-box">
            <span class="stat-label">PERSONAL BEST</span>
            <span class="stat-val" id="victory-pb-val">01:42</span>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="modal-actions">
          <button type="button" class="btn btn-primary modal-next-btn" id="modal-btn-next">Next Mystery Case →</button>
          <button type="button" class="btn modal-share-btn" id="modal-btn-share">Share Result</button>
          <button type="button" class="btn modal-close-btn" id="modal-btn-close">Inspect Board</button>
        </div>
      </div>
    </div>

    <!-- Share Toast Notification -->
    <div id="murdoku-toast" class="murdoku-toast" role="status" aria-live="polite" hidden>
      Result copied to clipboard!
    </div>

    <!-- Comprehensive SEO Educational Article (1,200 - 1,500 words) -->
    <article class="wrap murdoku-content">
      <h2>The Definitive Guide to Murdoku: Murder Mystery Logic Puzzles</h2>
      <p>Murdoku is an intellectual synthesis of two timeless puzzle traditions: classic Japanese number-placement logic (Sudoku) and English country-house murder mystery deduction (in the classic tradition of Agatha Christie, Arthur Conan Doyle, and John Dickson Carr). Rather than filling empty grids with abstract digits, Murdoku tasks the player with placing real suspects, witnesses, and victims across a compartmentalized architectural floor plan. Each clue operates as a sworn witness statement, architectural floor measurement, or forensic finding that restricts where individuals could have been at the exact moment a crime was committed.</p>
      
      <p>What elevates Murdoku into an exceptionally rewarding brain game is its strict mathematical elegance. Unlike generic narrative whodunits where the culprit is revealed through sudden intuition or authorial convenience, Murdoku is governed by provably sound mathematical axioms. Every puzzle has exactly one valid solution, obtainable entirely through pure deduction without ever needing to guess.</p>

      <h2>The Three Fundamental Axioms of Murdoku</h2>
      <p>To successfully solve any Murdoku mystery, whether an accessible 4×4 estate or an intricate 6×6 expert labyrinth, an investigator must internalize three non-negotiable rules:</p>

      <h3>1. The Sudoku Non-Overlap Constraint (One Person Per Row and Column)</h3>
      <p>Across the entire crime scene grid, each horizontal row and each vertical column can contain at most one individual. The victim counts as a person on the grid. Consequently, if Lord Sterling has been discovered in Row 2, Column 3, no other person could possibly occupy any cell in Row 2, nor could any person occupy any cell in Column 3. This single rule immediately generates powerful elimination lines that carve through the floor plan, cutting away invalid candidate positions.</p>

      <h3>2. Physical Furniture and Architectural Obstacles</h3>
      <p>Mansions, castles, and botanical observatories are filled with physical objects: vintage wine racks, marble fireplaces, grand pianos, heavy iron safes, brass telescopes, and statues. Furniture occupies permanent grid cells. Neither the victim nor any suspect can stand inside or on top of a furniture cell. Furthermore, furniture serves as reliable architectural anchors. When a witness states that they stood "directly north of the fireplace" or "beside the grand piano," the player can translate that statement into a precise Manhattan distance calculation relative to the furniture's fixed coordinate.</p>

      <h3>3. The Golden Murderer Axiom (The Room-Sharing Rule)</h3>
      <p>The climactic conclusion of every Murdoku case hinges on a single forensic reality: <strong>the murderer is the only suspect who was present inside the same room as the victim</strong>. While innocent guests were scattered across separate chambers—reading alone in the library, tending ferns in the conservatory, or preparing tea in the galley—the killer closed the door behind them and confronted the victim in private. Therefore, solving the spatial positions of all suspects and identifying which room contains both the victim and a second individual instantly exposes the true culprit beyond any reasonable doubt.</p>

      <h2>Step-by-Step Solving Strategy: From Clues to Conviction</h2>
      <p>Approaching a complex logic grid can feel daunting without a systematic investigation methodology. Expert solvers tackle Murdoku cases in five disciplined phases:</p>

      <h3>Phase 1: Pinning the Anchor Coordinates</h3>
      <p>Always begin by scanning the Detective's Clue Notebook for absolute position clues. Statements such as "Lord Sterling was found deceased in the Study at Row 2, Column 2" or "The victim fell directly west of the Ship Helm Wheel" provide immediate, confirmed starting anchors. Once placed, immediately mark the corresponding row and column as unavailable for all other suspects.</p>

      <h3>Phase 2: Translating Furniture Landmarks</h3>
      <p>Next, locate all clues that tie suspects to immovable furniture. If Butler Higgins was standing "directly north of the Vintage Wine Rack" and the wine rack sits at Row 4, Column 1, Higgins must be positioned at Row 3, Column 1. Verify that this coordinate belongs to the room Higgins claimed to be in (such as the Wine Cellar) to validate consistency.</p>

      <h3>Phase 3: Cross-Referencing Room Footprints</h3>
      <p>Each estate room spans a specific cluster of contiguous cells. Compare the list of suspects known to be inside a room against the unblocked cells in that room. If the Artisan Workshop only contains three cells, and two of those cells conflict with already occupied rows or columns, the remaining cell is forced to belong to the suspect assigned to that workshop. This technique—known in Sudoku as finding a "Naked Single"—frequently breaks open the middle game.</p>

      <h3>Phase 4: Chaining Relative Directional Clues</h3>
      <p>Directional clues ("east of", "north of", "situated in the same column as") provide relational vectors between people. For example, if Lady Cynthia is east of the victim, and the victim is at Column 2, Cynthia must be located in Column 3, 4, 5, or 6. When combined with Cynthia's room boundary (for instance, the Study having cells only in Columns 1 and 2), directional constraints dramatically restrict remaining candidates.</p>

      <h3>Phase 5: The Final Accusation</h3>
      <p>Once every individual has been logically placed on the floor plan and no row or column conflicts exist, examine the room housing the victim. Locate the solitary suspect sharing that room. Tap their name in the Accusation Panel to officially close the case and secure a conviction.</p>

      <h2>Advanced Deductive Techniques for Expert Puzzles</h2>
      <p>In Hard and Expert 6×6 mysteries, simple direct clues are deliberately omitted. Solvers must deploy advanced deductive techniques:</p>

      <h3>Pigeonhole Elimination Across Room Boundaries</h3>
      <p>Consider an estate where the Grand Library spans five cells across Columns 2, 3, and 4. If another suspect is confirmed in Column 2 and another in Column 4, the library suspect is mathematically forced into Column 3. Any other clues mentioning that suspect can then be resolved immediately.</p>

      <h3>Furniture Horizon Tracing</h3>
      <p>Clues stating that two people are "on the same horizontal row as the Stone Fireplace" allow you to align multiple individuals along an entire plane of the grid. By intersecting this row line with the distinct room partitions, candidates that appeared ambiguous suddenly collapse into unique coordinates.</p>

      <h3>Impossible Cell Notation ('X' Marking)</h3>
      <p>Utilize the "Mark X" tool generously. Just as a seasoned detective sketches diagrams on a notepad, marking impossible cells prevents mental fatigue and keeps your visual field uncluttered. Whenever a person is placed, immediately sweep their row and column to flag empty cells with an X.</p>

      <h2>The Cognitive Science Behind Logic Grid Puzzles</h2>
      <p>Engaging with structured spatial deduction games like Murdoku provides substantial neurocognitive benefits. Neuropsychological studies show that solving constraint-satisfaction logic problems exercises working memory, enhances spatial reasoning in the parietal cortex, and strengthens prefrontal executive function. Unlike passive entertainment, logic puzzles require sustained attention, hypothesis testing, and error-monitoring—qualities that build cognitive reserve and support lifelong mental sharpness.</p>

      <h2>Frequently Asked Questions</h2>
      <FaqList items={faqs} />
    </article>

    <!-- Explore More Puzzle Games (Strict 3 games with matching typography) -->
    <section class="wrap related-games-section" aria-label="Explore more puzzle games">
      <div class="related-games-header">
        <span class="eyebrow">Discover More Brain Games</span>
        <h2>Explore More Puzzle Games</h2>
        <p class="muted">Challenge your mind with our curated collection of free, high-focus browser puzzle games.</p>
      </div>

      <div class="related-games-grid">
        <a class="related-card card" href="/sliding-number-puzzle-game/">
          <div class="related-visual slide-visual" aria-hidden="true">
            <div class="related-orbit"></div>
            <div class="related-icon slide-icon"><span>1</span><span>2</span><span>3</span><span class="slide-empty"></span></div>
          </div>
          <div class="related-card-body">
            <div class="related-labels"><span class="pill">SLIDING PUZZLE</span><span class="difficulty-label">Easy · Medium · Hard</span></div>
            <h3>Sliding Number Puzzle Game</h3>
            <p class="muted">Slide numbered tiles into ascending order in classic 8, 15, and 24-tile sliding challenges.</p>
            <span class="related-play">Play Now <span aria-hidden="true">→</span></span>
          </div>
        </a>

        <a class="related-card card" href="/reaction-time-challenge/">
          <div class="related-visual reaction-visual" aria-hidden="true">
            <div class="related-orbit"></div>
            <div class="related-icon reaction-icon"><span><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg></span><span><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg></span><span><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg></span><span><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg></span></div>
          </div>
          <div class="related-card-body">
            <div class="related-labels"><span class="pill">REFLEX TEST</span><span class="difficulty-label">All Skill Levels</span></div>
            <h3>Reaction Time Challenge</h3>
            <p class="muted">Test your reflexes and measure your visual reaction speed in milliseconds across 4 game modes.</p>
            <span class="related-play">Play Now <span aria-hidden="true">→</span></span>
          </div>
        </a>

        <a class="related-card card" href="/memory-matching-game-online/">
          <div class="related-visual memory-visual" aria-hidden="true">
            <div class="related-orbit"></div>
            <div class="related-icon memory-icon">
              <span><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" fill="currentColor" fill-opacity="0.25"></polygon></svg></span>
              <span><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path></svg></span>
              <span><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg></span>
              <span><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="5" r="3"></circle><line x1="12" y1="8" x2="12" y2="21"></line><path d="M5 12H2a10 10 0 0 0 20 0h-3"></path></svg></span>
            </div>
          </div>
          <div class="related-card-body">
            <div class="related-labels"><span class="pill">MEMORY GAME</span><span class="difficulty-label">Easy · Medium · Hard</span></div>
            <h3>Memory Matching Game Online</h3>
            <p class="muted">Flip cards, match pairs across icon, number, color, and shape sets, and train your working memory.</p>
            <span class="related-play">Play Now <span aria-hidden="true">→</span></span>
          </div>
        </a>
      </div>
    </section>
  </main>

  <Footer />
</Base>
`;

fs.writeFileSync('src/pages/murdoku-online-game.astro', pageCode, 'utf-8');
console.log('Generated initial layout of src/pages/murdoku-online-game.astro');

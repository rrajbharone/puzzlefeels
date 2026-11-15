import fs from 'fs';

const pageCode = `---
import Base from '../layouts/Base.astro';
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
import FaqList from '../components/FaqList.astro';
import { NORINORI_PUZZLES, getDailyNorinoriPuzzle, getWeeklyNorinoriPuzzle, getMonthlyNorinoriPuzzle } from '../data/norinoriPuzzles';

const title = 'Norinori Game Online – Free Region Domino Logic Puzzle | PuzzleFeels';
const description = 'Play free Norinori Game online! Shade cells to form 1×2 and 2×1 dominoes across irregular regions. Enjoy 6×6 to 20×20 grids, Daily, Weekly, and Monthly challenges.';

const faqs = [
  {
    question: 'What is Norinori?',
    answer: 'Norinori is an original region-based shading logic puzzle invented by the renowned Japanese puzzle publisher Nikoli. The puzzle takes place on a rectangular grid partitioned into irregular outlined regions. The objective is to shade cells such that each region contains exactly two shaded cells, and all shaded cells across the board form non-touching 1×2 or 2×1 dominoes.'
  },
  {
    question: 'What are the core rules of Norinori?',
    answer: 'Norinori has three foundational rules: 1) Exactly two cells must be shaded in each outlined region. 2) Every shaded cell must belong to a 1×2 or 2×1 domino (meaning each shaded cell has exactly one orthogonally adjacent shaded partner). 3) Two separate dominoes can never touch orthogonally along their edges, though diagonal contact is fully permitted.'
  },
  {
    question: 'Can a domino cross region boundaries?',
    answer: 'Yes! Dominoes are free to cross outlined region boundaries. In fact, cross-border dominoes are a core strategic mechanic in Norinori. For example, a single 1×2 domino might have one cell in Region A and its adjacent cell in Region B, contributing one shaded cell toward each region\\'s required two-cell quota.'
  },
  {
    question: 'Why can dominoes never touch each other along edges?',
    answer: 'If two dominoes were to touch orthogonally along an edge, they would merge into a larger shaded polyomino consisting of 3, 4, or more connected cells, or form an L-tromino or square. Norinori strictly requires that shaded cells form isolated pairs of size 2. However, dominoes may touch diagonally at their corners.'
  },
  {
    question: 'How do you determine if a cell must be shaded or left empty?',
    answer: 'You can deduce cell states through several logical techniques: 1) Any region containing exactly two cells must have both cells shaded immediately. 2) If shading a cell would force an illegal 3-cell cluster or cause two dominoes to touch, that cell must be marked empty (dot). 3) If a region has only two remaining unblocked cells, both must be shaded. 4) If a shaded cell has only one legal orthogonal neighbor available, that neighbor must be shaded to complete the domino.'
  },
  {
    question: 'What do the dot and cross marks mean?',
    answer: 'Marking a cell with a dot or cross is a solver\\'s pencil mark indicating that the cell is definitely empty and cannot be shaded. Using dots helps you eliminate impossible spaces, isolate required domino directions, and visualize remaining options without cluttering the board.'
  },
  {
    question: 'What grid sizes and difficulty levels are available?',
    answer: 'PuzzleFeels Norinori offers five grid dimensions: 6×6 (quick starter), 8×8 (classic compact), 10×10 (standard tournament size), 15×15 (expert challenge), and 20×20 (master labyrinth). Each dimension features Normal and Hard difficulty modes, plus daily, weekly, and monthly global challenges.'
  },
  {
    question: 'What are the Daily, Weekly, and Monthly Challenges?',
    answer: 'The Daily Challenge presents a synchronized 8×8 or 10×10 puzzle that refreshes every midnight UTC. The Weekly Challenge features a deep 15×15 puzzle for weekend puzzle enthusiasts. The Monthly Challenge delivers a grand 20×20 master puzzle. All players worldwide receive the exact same challenge boards.'
  },
  {
    question: 'How does the Zoom feature work on large boards?',
    answer: 'The dedicated Zoom button opens an independent popover panel that allows you to scale the board from 75% up to 150%, or reset to Fit to Screen. The board is contained inside a smooth scroll container so you can pan comfortably across 15×15 and 20×20 grids on mobile screens and desktop monitors alike without any page-level horizontal overflow.'
  },
  {
    question: 'What do the Settings toggles do?',
    answer: 'The Settings menu provides customizable assistance: you can toggle live error highlighting (shows rule violations like overcrowded regions or illegal polyominoes), auto-check on completion, hovered region highlighting, and the game timer.'
  },
  {
    question: 'Can I use keyboard shortcuts to play?',
    answer: 'Yes! Use Arrow keys to navigate between cells. Press Space or Z to shade a cell, X or C to mark a dot/empty, and Backspace or Delete to clear. Press U to Undo and R to Redo.'
  },
  {
    question: 'Is this Norinori game completely free to play?',
    answer: 'Yes, 100% free with no downloads, subscriptions, paywalls, or account registration required. Your progress and best times are saved automatically in your web browser.'
  }
];

const gameSchema = {
  '@context': 'https://schema.org',
  '@type': 'VideoGame',
  name: 'Norinori Game Online',
  url: 'https://puzzlefeels.com/norinori-game/',
  description,
  gamePlatform: 'Web browser',
  applicationCategory: 'Game',
  genre: ['Logic Puzzle', 'Shading Puzzle', 'Domino Puzzle', 'Brain Game'],
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  publisher: { '@type': 'Organization', name: 'PuzzleFeels', url: 'https://puzzlefeels.com/' }
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://puzzlefeels.com/' },
    { '@type': 'ListItem', position: 2, name: 'Games', item: 'https://puzzlefeels.com/games/' },
    { '@type': 'ListItem', position: 3, name: 'Norinori Game', item: 'https://puzzlefeels.com/norinori-game/' }
  ]
};
---

<Base {title} {description} path="/norinori-game/">
  <Fragment slot="head">
    <script type="application/ld+json" set:html={JSON.stringify(gameSchema)} />
    <script type="application/ld+json" set:html={JSON.stringify(breadcrumbSchema)} />
  </Fragment>

  <Header />

  <main class="norinori-page">
    <!-- Breadcrumbs -->
    <nav class="wrap norinori-breadcrumbs" aria-label="Breadcrumbs">
      <a href="/">Home</a>
      <span aria-hidden="true">›</span>
      <a href="/games/">Games</a>
      <span aria-hidden="true">›</span>
      <span aria-current="page">Norinori Game</span>
    </nav>

    <!-- Intro Header: Centered H1 & Centered Description -->
    <section class="wrap norinori-intro">
      <span class="eyebrow">Nikoli Region Shading Puzzle</span>
      <h1>Norinori Game</h1>
      <p class="muted">Shade the cells. Form 1×2 and 2×1 dominoes. Every outlined region must contain exactly two shaded cells, and dominoes must never touch along edges.</p>
    </section>

    <!-- Game Card Shell -->
    <section class="wrap norinori-shell card" data-norinori-game aria-label="Norinori Shading Puzzle Game">
      <!-- Mode Selection Navigation Bar -->
      <div class="norinori-header-bar">
        <!-- Size & Special Challenge Tabs -->
        <div class="norinori-tabs" role="tablist" aria-label="Game size and challenges">
          <button type="button" class="norinori-tab-btn is-active" data-size="6" role="tab" aria-selected="true">
            <strong>6×6</strong>
            <span>Starter</span>
          </button>
          <button type="button" class="norinori-tab-btn" data-size="8" role="tab" aria-selected="false">
            <strong>8×8</strong>
            <span>Classic</span>
          </button>
          <button type="button" class="norinori-tab-btn" data-size="10" role="tab" aria-selected="false">
            <strong>10×10</strong>
            <span>Standard</span>
          </button>
          <button type="button" class="norinori-tab-btn" data-size="15" role="tab" aria-selected="false">
            <strong>15×15</strong>
            <span>Expert</span>
          </button>
          <button type="button" class="norinori-tab-btn" data-size="20" role="tab" aria-selected="false">
            <strong>20×20</strong>
            <span>Master</span>
          </button>
          <button type="button" class="norinori-tab-btn challenge-tab" data-mode="daily" role="tab" aria-selected="false">
            <strong>Daily</strong>
            <span>Challenge</span>
          </button>
          <button type="button" class="norinori-tab-btn challenge-tab" data-mode="weekly" role="tab" aria-selected="false">
            <strong>Weekly</strong>
            <span>15×15</span>
          </button>
          <button type="button" class="norinori-tab-btn challenge-tab" data-mode="monthly" role="tab" aria-selected="false">
            <strong>Monthly</strong>
            <span>20×20</span>
          </button>
        </div>

        <!-- Audio Toggle Button -->
        <div class="norinori-sound-wrap">
          <button id="norinori-sound-toggle" class="norinori-sound-btn" type="button" aria-label="Toggle sound effects" aria-pressed="true">
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

      <!-- Puzzle Status Bar -->
      <div class="norinori-status-bar">
        <div class="status-meta">
          <span class="meta-badge" id="norinori-difficulty-badge">NORMAL · 6×6</span>
          <span class="puzzle-id-pill" id="norinori-id-pill">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"></rect><line x1="9" y1="3" x2="9" y2="21"></line><line x1="15" y1="3" x2="15" y2="21"></line><line x1="3" y1="9" x2="21" y2="9"></line><line x1="3" y1="15" x2="21" y2="15"></line></svg>
            Puzzle <strong id="norinori-puzzle-number">#1</strong>
          </span>
          <div class="diff-toggle-group" id="diff-toggle-container">
            <button type="button" class="diff-btn is-active" data-diff="normal">Normal</button>
            <button type="button" class="diff-btn" data-diff="hard">Hard</button>
          </div>
        </div>

        <div class="status-counters">
          <div class="counter-box">
            <span class="counter-label">TIME</span>
            <span class="counter-val" id="timer-val">00:00</span>
          </div>
          <div class="counter-box">
            <span class="counter-label">SHADED</span>
            <span class="counter-val" id="shaded-val">0 / 0</span>
          </div>
          <div class="counter-box">
            <span class="counter-label">DOMINOES</span>
            <span class="counter-val" id="domino-val">0 / 0</span>
          </div>
        </div>
      </div>

      <!-- Main Game Toolbar with Separate Settings and Zoom Popovers -->
      <div class="norinori-toolbar" role="toolbar" aria-label="Puzzle tools and controls">
        <!-- Left Group: Paint Mode Selection -->
        <div class="toolbar-mode-group">
          <button type="button" class="tool-btn is-active" id="tool-shade-btn" title="Shade Cell (Left click or Space)">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><rect x="3" y="3" width="18" height="18" rx="3"></rect></svg>
            <span>Shade</span>
          </button>
          <button type="button" class="tool-btn" id="tool-dot-btn" title="Mark Empty Dot (Right click or X)">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><circle cx="12" cy="12" r="5"></circle></svg>
            <span>Dot</span>
          </button>
        </div>

        <!-- Middle Group: Game Action Buttons -->
        <div class="toolbar-action-group">
          <button type="button" class="tool-action-btn" id="btn-undo" title="Undo (U / Ctrl+Z)" disabled>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7v6h6"></path><path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13"></path></svg>
            <span>Undo</span>
          </button>
          <button type="button" class="tool-action-btn" id="btn-redo" title="Redo (R / Ctrl+Y)" disabled>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 7v6h-6"></path><path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3l3 2.7"></path></svg>
            <span>Redo</span>
          </button>
          <button type="button" class="tool-action-btn" id="btn-check" title="Check Current Board">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            <span>Check</span>
          </button>
          <button type="button" class="tool-action-btn" id="btn-hint" title="Get a Deductive Hint">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6"></path><path d="M10 22h4"></path><path d="M12 2a7 7 0 0 0-7 7c0 2.38 1.19 4.47 3 5.74V17a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-2.26c1.81-1.27 3-3.36 3-5.74a7 7 0 0 0-7-7z"></path></svg>
            <span>Hint</span>
          </button>
          <button type="button" class="tool-action-btn" id="btn-clear" title="Clear All Placed Marks">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
            <span>Clear</span>
          </button>
          <button type="button" class="tool-action-btn primary-action-btn" id="btn-new-puzzle" title="Load Next Puzzle">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.5 2v6h-6"></path><path d="M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"></path></svg>
            <span>New</span>
          </button>
        </div>

        <!-- Right Group: Independent Zoom and Settings Menus -->
        <div class="toolbar-utility-group">
          <!-- Zoom Popover Toggle Button -->
          <div class="popover-wrapper">
            <button type="button" class="tool-utility-btn" id="btn-zoom-toggle" aria-haspopup="true" aria-expanded="false" title="Zoom Controls">
              <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>
              <span class="utility-label" id="zoom-level-label">100%</span>
            </button>
            
            <!-- Dedicated Zoom Popover Panel -->
            <div class="norinori-popover zoom-popover" id="zoom-popover" role="dialog" aria-label="Grid Zoom Controls" hidden>
              <div class="popover-header">
                <strong>Grid Zoom</strong>
                <button type="button" class="popover-close-btn" data-close-popover="zoom" aria-label="Close zoom menu">×</button>
              </div>
              <div class="zoom-controls-grid">
                <button type="button" class="zoom-btn" id="btn-zoom-in" title="Zoom In">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                  <span>Zoom In</span>
                </button>
                <button type="button" class="zoom-btn" id="btn-zoom-out" title="Zoom Out">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                  <span>Zoom Out</span>
                </button>
                <button type="button" class="zoom-btn full-width" id="btn-zoom-reset" title="Fit to Screen / Reset Zoom">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"></rect><polyline points="9 3 9 9 3 9"></polyline><polyline points="15 3 15 9 21 9"></polyline><polyline points="9 21 9 15 3 15"></polyline><polyline points="15 21 15 15 21 15"></polyline></svg>
                  <span>Fit to Screen (100%)</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Settings Popover Toggle Button -->
          <div class="popover-wrapper">
            <button type="button" class="tool-utility-btn" id="btn-settings-toggle" aria-haspopup="true" aria-expanded="false" title="Game Settings">
              <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
            </button>

            <!-- Dedicated Settings Popover Panel -->
            <div class="norinori-popover settings-popover" id="settings-popover" role="dialog" aria-label="Game Settings" hidden>
              <div class="popover-header">
                <strong>Settings</strong>
                <button type="button" class="popover-close-btn" data-close-popover="settings" aria-label="Close settings">×</button>
              </div>
              <div class="settings-list">
                <label class="setting-item">
                  <span class="setting-info">
                    <strong>Highlight Errors</strong>
                    <span class="setting-desc">Flag regions with &gt;2 cells and touching dominoes</span>
                  </span>
                  <input type="checkbox" id="setting-highlight-errors" checked />
                </label>
                <label class="setting-item">
                  <span class="setting-info">
                    <strong>Auto-Check Progress</strong>
                    <span class="setting-desc">Automatically detect puzzle victory</span>
                  </span>
                  <input type="checkbox" id="setting-autocheck" checked />
                </label>
                <label class="setting-item">
                  <span class="setting-info">
                    <strong>Highlight Region</strong>
                    <span class="setting-desc">Subtly tint region of hovered cell</span>
                  </span>
                  <input type="checkbox" id="setting-highlight-region" checked />
                </label>
                <label class="setting-item">
                  <span class="setting-info">
                    <strong>Display Timer</strong>
                    <span class="setting-desc">Track solving time in status bar</span>
                  </span>
                  <input type="checkbox" id="setting-timer" checked />
                </label>
                <div class="setting-actions">
                  <button type="button" class="popover-link-btn" id="btn-show-keyboard-help">
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"></rect><line x1="6" y1="8" x2="6" y2="8"></line><line x1="10" y1="8" x2="10" y2="8"></line><line x1="14" y1="8" x2="14" y2="8"></line><line x1="18" y1="8" x2="18" y2="8"></line><line x1="6" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="18" y2="12"></line><line x1="8" y1="16" x2="16" y2="16"></line></svg>
                    <span>Keyboard Controls</span>
                  </button>
                  <button type="button" class="popover-link-btn reset-link" id="btn-reset-settings">
                    <span>Reset Settings</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Live Feedback Banner -->
      <div class="norinori-banner" id="norinori-banner" role="status" aria-live="polite">
        <span class="banner-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
        </span>
        <span class="banner-text" id="banner-text">Left click or drag to shade cells. Right click to mark dots. Each region needs exactly two shaded cells.</span>
      </div>

      <!-- Grid Board Scrollable Wrapper -->
      <div class="norinori-board-outer">
        <div class="norinori-board-scroll-area" id="board-scroll-area">
          <div class="norinori-grid-container" id="grid-container" style="--cell-size: 42px;">
            <div class="norinori-grid" id="norinori-grid" role="grid" aria-label="Norinori logic puzzle grid" tabindex="0">
              <!-- Dynamically populated cells via client JavaScript -->
            </div>
          </div>
        </div>
      </div>

      <!-- Quick How to Play Hint Bar -->
      <div class="norinori-legend-bar">
        <div class="legend-item"><span class="legend-swatch shaded-swatch"></span> Shaded (Dominoes)</div>
        <div class="legend-item"><span class="legend-swatch dot-swatch"></span> Empty (Dot)</div>
        <div class="legend-item"><span class="legend-swatch thick-border-swatch"></span> Outlined Region (2 cells each)</div>
      </div>
    </section>

    <!-- Keyboard Shortcuts Modal Dialog -->
    <div class="norinori-modal" id="keyboard-modal" role="dialog" aria-label="Keyboard Shortcuts" hidden>
      <div class="modal-backdrop" data-close-modal="keyboard"></div>
      <div class="modal-card card">
        <div class="modal-header">
          <h3>Keyboard Controls</h3>
          <button type="button" class="modal-close-icon-btn" data-close-modal="keyboard" aria-label="Close modal">×</button>
        </div>
        <div class="modal-content">
          <div class="shortcut-row"><kbd>Arrow Keys</kbd><span>Move active cell cursor</span></div>
          <div class="shortcut-row"><kbd>Space</kbd> or <kbd>Z</kbd><span>Shade / Unshade cell</span></div>
          <div class="shortcut-row"><kbd>X</kbd> or <kbd>C</kbd><span>Mark / Remove dot (empty)</span></div>
          <div class="shortcut-row"><kbd>Backspace</kbd> or <kbd>Delete</kbd><span>Clear active cell</span></div>
          <div class="shortcut-row"><kbd>U</kbd> or <kbd>Ctrl+Z</kbd><span>Undo move</span></div>
          <div class="shortcut-row"><kbd>R</kbd> or <kbd>Ctrl+Y</kbd><span>Redo move</span></div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-close-modal="keyboard">Got It</button>
        </div>
      </div>
    </div>

    <!-- Victory Modal (Preserves solved board in background) -->
    <div class="norinori-modal victory-modal" id="victory-modal" role="dialog" aria-label="Puzzle Solved!" hidden>
      <div class="modal-backdrop" data-close-modal="victory"></div>
      <div class="modal-card card victory-card">
        <div class="victory-icon-badge" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="8" r="7"></circle>
            <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
          </svg>
        </div>
        <h2>Puzzle Solved!</h2>
        <p class="muted victory-subtitle">Outstanding deduction! All regions and domino constraints are fully satisfied.</p>

        <!-- Stats Grid -->
        <div class="modal-stats-grid">
          <div class="modal-stat-box">
            <span class="stat-label">TIME</span>
            <span class="stat-val" id="victory-time-val">00:00</span>
          </div>
          <div class="modal-stat-box">
            <span class="stat-label">GRID SIZE</span>
            <span class="stat-val" id="victory-size-val">6×6</span>
          </div>
          <div class="modal-stat-box">
            <span class="stat-label">DIFFICULTY</span>
            <span class="stat-val" id="victory-diff-val">Normal</span>
          </div>
          <div class="modal-stat-box">
            <span class="stat-label">HINTS USED</span>
            <span class="stat-val" id="victory-hints-val">0</span>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="modal-actions">
          <button type="button" class="btn btn-primary" id="modal-btn-next">Next Puzzle →</button>
          <button type="button" class="btn" id="modal-btn-share">Share Result</button>
          <button type="button" class="btn" data-close-modal="victory">Inspect Board</button>
        </div>
      </div>
    </div>

    <!-- Toast Notification -->
    <div id="norinori-toast" class="norinori-toast" role="status" aria-live="polite" hidden>
      Result copied to clipboard!
    </div>

    <!-- Comprehensive SEO Educational Article (1,200 - 1,500 words) -->
    <article class="wrap game-article-content norinori-article">
      <h2>The Definitive Guide to Norinori: Region-Based Shading Logic Puzzles</h2>
      <p>Norinori is one of the most intellectually elegant and geometrically satisfying pencil-and-paper logic puzzles ever conceived. Created by the acclaimed Japanese puzzle publisher Nikoli—the visionary company that popularized Sudoku, Kakuro, Slitherlink, and Heyawake—Norinori challenges the solver to fill an outlined grid with 1×2 and 2×1 domino blocks. Beneath its minimalist aesthetic lies a rich deductive discipline where spatial topology, parity counting, and boundary interactions intersect.</p>
      
      <p>Unlike casual guessing games, every handcrafted Norinori puzzle on PuzzleFeels is governed by strict mathematical axioms and possesses exactly one unique, logically provable solution. Solvers never need to make speculative leaps. By understanding how dominoes bridge region frontiers and how empty spaces restrict possible orientations, you can unravel even the most daunting 20×20 master labyrinths with calm, step-by-step reasoning.</p>

      <h2>The Three Fundamental Axioms of Norinori</h2>
      <p>To master Norinori across every grid dimension, from quick 6×6 introductory exercises to expansive tournament boards, you must memorize and rigorously apply three non-negotiable rules:</p>

      <h3>1. The Two-Cell Region Quota</h3>
      <p>The entire puzzle board is subdivided into irregular outlined compartments called regions. Regardless of a region's size or shape—whether it is a tiny 2-cell pair, a sprawling 7-cell corridor, or an intricate hook—it must contain <strong>exactly two shaded cells</strong> upon completion. No region may contain fewer than two shaded cells, and no region may ever contain three or more.</p>

      <h3>2. The Domino Unit Constraint (1×2 and 2×1 Pairs)</h3>
      <p>All shaded cells across the entire grid must combine to form contiguous dominoes—blocks measuring exactly 1 cell by 2 cells horizontally or 2 cells by 1 cell vertically. In topological terms, every single shaded cell must be orthogonally adjacent (sharing a full edge) to <strong>exactly one other shaded cell</strong>. A shaded cell with zero orthogonal shaded neighbors is an illegal isolated cell, while a shaded cell with two or three orthogonal shaded neighbors creates an illegal oversized polyomino.</p>

      <h3>3. The Non-Touching Rule (Zero Edge Contact Between Dominoes)</h3>
      <p>Separate dominoes must <strong>never touch orthogonally along their edges</strong>. If two dominoes were to touch side-by-side or end-to-end, they would merge into a single connected group of 3, 4, or more shaded cells, violating the domino constraint. However, diagonal contact at corner vertices is completely permitted and is in fact a primary way dominoes nest alongside one another across dense puzzle layouts.</p>

      <h2>Fundamental Solving Techniques for Beginners</h2>
      <p>Every Norinori puzzle presents immediate starting clues if you know where to look. By applying these beginner techniques during the opening minutes, you can establish confirmed anchor dominoes and carve out initial progress:</p>

      <h3>Technique 1: Instant Fills on Two-Cell Regions</h3>
      <p>Always begin by scanning the entire grid for regions that consist of exactly two cells. Because Rule 1 dictates that every region must contain two shaded cells, any region with a total area of 2 cells must have <strong>both of its cells shaded immediately</strong>. Furthermore, because these two cells belong to the same 2-cell region and are contiguous, they instantly form a complete domino. Once placed, you can immediately mark all orthogonally adjacent neighbors outside this region with dots (empty marks) because no other domino is allowed to touch it along any edge.</p>

      <h3>Technique 2: Bottlenecks and Single-Exit Corridors</h3>
      <p>When an outlined region contains a single narrow projection or bottleneck, analyze how a domino can fit inside. If a cell within a region has no adjacent cell within that same region, any domino occupying that cell is forced to cross the border into an adjacent region. If the adjacent region already has its quota satisfied or has no compatible space, that bottleneck cell cannot be shaded and must be marked with a dot.</p>

      <h3>Technique 3: Orthogonal Exclusion Buffers</h3>
      <p>Whenever you confirm a complete 1×2 or 2×1 domino, immediately trace its perimeter. The six surrounding cells that share an orthogonal edge with the domino must all be unshaded. Marking these boundary cells with dots immediately shrinks neighboring regions, often reducing adjacent candidate cells down to the exact number needed to trigger further forced placements.</p>

      <h3>Technique 4: Corner and Edge Pinning</h3>
      <p>Cells positioned along the grid's outer boundary or tucked into 90-degree outer corners have only 2 or 3 orthogonal neighbors instead of 4. If an outer corner cell is shaded, its domino partner can only extend in one of two directions. If one of those directions is blocked by a border or an existing dot, the domino's orientation is 100% locked.</p>

      <h2>Advanced Deductive Strategies for Expert and Master Grids</h2>
      <p>On 10×10, 15×15, and 20×20 boards, simple direct placements quickly run dry. Advanced solvers utilize spatial parity and cross-border mechanics to crack open complex board states:</p>

      <h3>Strategy 1: The Cross-Border Domino Extension</h3>
      <p>One of the most fascinating aspects of Norinori is that dominoes can span across region boundaries. Consider two adjacent regions, Region A and Region B. If a domino is placed such that one of its halves sits in Region A and the other half sits in Region B, this single cross-border domino provides exactly 1 shaded cell to Region A and 1 shaded cell to Region B. Consequently, Region A requires exactly one more shaded cell (which must connect across a different boundary or form a domino internally), and Region B similarly requires exactly one more shaded cell. Tracking cross-border domino allocations allows you to calculate exact cell quotas across clusters of neighboring regions.</p>

      <h3>Strategy 2: The Global Parity Equation</h3>
      <p>In any valid Norinori puzzle, mathematics dictates a powerful global invariant: <strong>the total number of shaded cells on the board is always exactly equal to twice the number of regions</strong>, and <strong>the total number of dominoes is always exactly equal to the number of regions</strong>. For example, a puzzle containing 14 regions will have exactly 28 shaded cells and exactly 14 dominoes. If a subset of regions contains a known number of internal dominoes, you can compute with mathematical certainty how many cross-border dominoes must enter or leave that cluster.</p>

      <h3>Strategy 3: The 2×2 Checkerboard Trap Prevention</h3>
      <p>A frequent failure mode for novice solvers is accidentally creating a 2×2 square of four shaded cells. A 2×2 block contains four mutually touching shaded cells, which severely violates the domino rule. Whenever you observe three shaded cells forming an "L" shape, the fourth cell in that 2×2 corner must immediately be marked with a dot to prevent an illegal clump.</p>

      <h3>Strategy 4: Dead-End Tunnel Elimination</h3>
      <p>If shading a particular candidate cell would leave an adjacent shaded cell with no legal partner (for instance, by walling off its only available orthogonal space with dots), that placement is impossible. This lookahead deduction—identifying "stranded singles"—is essential for eliminating false leads on Hard and Master difficulties.</p>

      <h2>Step-by-Step Solving Walkthrough on a 6×6 Board</h2>
      <p>To see these principles in action, follow this walkthrough of a typical 6×6 Norinori puzzle containing 8 outlined regions:</p>
      
      <p><strong>Step 1 (Immediate Anchors):</strong> Scan the grid and locate two 2-cell regions situated along the perimeter. Shade both cells in both regions immediately. This accounts for 4 shaded cells and gives you 2 complete dominoes.</p>
      
      <p><strong>Step 2 (Exclusion Marking):</strong> Place dots on every cell sharing an edge with those two completed dominoes. In this example, marking these exclusion buffers cuts away 6 neighboring cells across the middle rows.</p>
      
      <p><strong>Step 3 (Shrinking Candidates):</strong> Inspect a 3-cell region in the center. Because one of its cells was just marked with a dot during Step 2, only two cells remain inside the region. Both remaining cells must now be shaded, creating your third domino.</p>
      
      <p><strong>Step 4 (Resolving the Cross-Border Pair):</strong> Two adjacent regions on the right each have one cell shaded, but neither cell has a partner inside its own region. The only mutual neighbor they share is an edge crossing the border between them. Shading this connection creates a cross-border domino that satisfies both regions simultaneously.</p>
      
      <p><strong>Step 5 (Final Sweep):</strong> With all 8 regions verified to contain exactly two shaded cells and all 8 dominoes isolated from each other along edges, the puzzle reaches full resolution without a single guess.</p>

      <h2>Comparing Norinori to Other Classic Japanese Shading Puzzles</h2>
      <p>Pencil puzzle enthusiasts often compare Norinori to other legendary Nikoli shading challenges:</p>

      <h3>Norinori versus Heyawake</h3>
      <p>In Heyawake, shaded cells cannot be orthogonally adjacent to each other at all (no two shaded cells may touch), and unshaded white cells must form a single connected network without spanning across straight line corridors beyond room counts. Norinori turns this dynamic on its head: shaded cells <em>must</em> touch in pairs to form dominoes, while unshaded cells have no connectivity restrictions.</p>

      <h3>Norinori versus LITS</h3>
      <p>LITS also partitions the board into regions, but each region must contain a 4-cell polyomino (L, I, T, or S shape), and all shaded polyominoes must connect together across the entire board. In Norinori, shaded cells must remain strictly disconnected from one another and are locked to size 2.</p>

      <h3>Norinori versus Nurikabe</h3>
      <p>Nurikabe requires all shaded cells to connect into a continuous "river" surrounding isolated numbered islands. Norinori has no continuous river; instead, it requires independent, localized domino islands that maintain strict separation along all edges.</p>

      <h2>Cognitive Benefits of Playing Norinori Online</h2>
      <p>Engaging with logic shading puzzles like Norinori offers profound neurocognitive benefits. Scientific research into visual logic games demonstrates that systematic spatial problem-solving activates the dorsolateral prefrontal cortex (responsible for executive planning and working memory) and the posterior parietal cortex (responsible for mental rotation and spatial coordinate mapping).</p>

      <p>By learning to hold multiple conditional constraints in mind simultaneously—balancing region quotas against domino adjacency rules—solvers cultivate sustained focus, mental stamina, and disciplined deductive reasoning. Playing a quick Norinori board each morning provides an invigorating, screen-positive cognitive workout that sharpens analytical thinking for the day ahead.</p>

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
              <span><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M12 2L2 7l10 5 10-5-10-5z"></path><path d="M2 17l10 5 10-5"></path><path d="M2 12l10 5 10-5"></path></svg></span>
              <span><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="M4.93 4.93l1.41 1.41"></path><path d="M17.66 17.66l1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="M6.34 17.66l-1.41 1.41"></path><path d="M19.07 4.93l-1.41 1.41"></path></svg></span>
              <span><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg></span>
            </div>
          </div>
          <div class="related-card-body">
            <div class="related-labels"><span class="pill">MEMORY GAME</span><span class="difficulty-label">Easy · Medium · Hard</span></div>
            <h3>Memory Matching Game Online</h3>
            <p class="muted">Flip and pair cards across 4 theme decks and test your short-term visual memory recall.</p>
            <span class="related-play">Play Now <span aria-hidden="true">→</span></span>
          </div>
        </a>
      </div>
    </section>
  </main>

  <Footer />
</Base>
`;

fs.writeFileSync('scratch/norinori_markup_part.astro', pageCode);
console.log('Successfully wrote norinori markup part');

/**
 * Master Games Catalog for PuzzleFeels.com
 *
 * FUTURE GAME INTEGRATION RULES:
 * 1. All newly developed and integrated games MUST be added to `ALL_GAMES` below.
 *    - This will automatically display the game on the All Games page (/games/)
 *    - This will make it immediately discoverable through the search filter on /games/
 * 2. Newly developed games MUST NOT be automatically added to the Homepage's
 *    "One good puzzle can change your day" featured section (`HOMEPAGE_FEATURED_GAME_IDS`).
 *    That section is a fixed, manually controlled collection limited to exactly 5 games.
 * 3. Newly developed games MUST NOT be automatically added to the Homepage's
 *    "Your Daily Moments of Focus" section (`HOMEPAGE_DAILY_GAME_IDS`).
 *    That section is a fixed, manually controlled collection limited to exactly 3 games.
 */

export interface GameCatalogItem {
  id: string;
  title: string;
  shortTitle: string;
  href: string;
  search: string;
  pill: string;
  difficulty: string;
  description: string;
  visualClass: string;
  iconClass: string;
  dailyHref?: string;
}

export const ALL_GAMES: GameCatalogItem[] = [
  {
    id: 'number-sequence',
    title: 'Number Sequence Game',
    shortTitle: 'Number Sequence',
    href: '/number-sequence-game/',
    search: 'number sequence game number pattern missing number math logic',
    pill: 'NUMBER PUZZLE',
    difficulty: 'Easy · Medium · Hard',
    description: 'Find the missing number by spotting the rule behind each sequence.',
    visualClass: 'sequence-visual',
    iconClass: 'sequence-icon',
    dailyHref: '/number-sequence-game/?daily=today',
  },
  {
    id: 'color-flood',
    title: 'Color Flood Game',
    shortTitle: 'Color Flood',
    href: '/color-flood-game/',
    search: 'color flood game flood fill color strategy daily challenge',
    pill: 'STRATEGY PUZZLE',
    difficulty: 'Easy · Medium · Hard',
    description: 'Grow the connected region by choosing colors and flood the board within the move limit.',
    visualClass: 'flood-visual',
    iconClass: 'flood-icon',
    dailyHref: '/color-flood-game/?daily=today',
  },
  {
    id: 'picross',
    title: 'Picross Game Online',
    shortTitle: 'Picross Game Online',
    href: '/picross-game-online/',
    search: 'picross game online nonogram griddlers japanese crossword picture logic',
    pill: 'LOGIC PUZZLE',
    difficulty: 'Beginner · Medium · Hard',
    description: 'Use row and column clues to reveal hidden pixel-art pictures in a Nonogram puzzle.',
    visualClass: 'picross-visual',
    iconClass: 'picross-icon',
    dailyHref: '/picross-game-online/?daily=today',
  },
  {
    id: 'sliding-puzzle',
    title: 'Sliding Number Puzzle Game',
    shortTitle: 'Sliding Number Puzzle Game',
    href: '/sliding-number-puzzle-game/',
    search: 'sliding number puzzle game sliding puzzle number puzzle 15 puzzle 8 puzzle sliding tile brain game logic',
    pill: 'SLIDING PUZZLE',
    difficulty: 'Easy · Medium · Hard',
    description: 'Slide numbered tiles into ascending order in classic 8, 15, and 24-tile sliding challenges.',
    visualClass: 'slide-visual',
    iconClass: 'slide-icon',
  },
  {
    id: 'word-ladder',
    title: 'Word Ladder Game Online',
    shortTitle: 'Word Ladder Game Online',
    href: '/word-ladder-game-online/',
    search: 'word ladder game online word transformation word puzzle lewis carroll doublets vocabulary brain game daily challenge',
    pill: 'WORD PUZZLE',
    difficulty: 'Easy · Medium · Hard',
    description: 'Transform words one letter at a time to bridge the gap from start to target in classic word ladders.',
    visualClass: 'ladder-visual',
    iconClass: 'ladder-icon',
    dailyHref: '/word-ladder-game-online/?daily=today',
  },
  {
    id: 'reaction-time',
    title: 'Reaction Time Challenge',
    shortTitle: 'Reaction Time',
    href: '/reaction-time-challenge/',
    search: 'reaction time challenge reaction time test reflex test human reaction speed speed test quick reflex endurance daily challenge',
    pill: 'REFLEX TEST',
    difficulty: 'All Skill Levels',
    description: 'Test your reflexes and measure your visual reaction speed in milliseconds with classic, quick, endurance, and daily challenges.',
    visualClass: 'reaction-visual',
    iconClass: 'reaction-icon',
    dailyHref: '/reaction-time-challenge/?daily=today',
  },
  {
    id: 'memory-matching',
    title: 'Memory Matching Game Online',
    shortTitle: 'Memory Matching',
    href: '/memory-matching-game-online/',
    search: 'memory matching game online memory game memory match memory card game concentration pairs brain training daily memory challenge',
    pill: 'MEMORY GAME',
    difficulty: 'Easy · Medium · Hard',
    description: 'Flip cards, match pairs across icon, number, color, and shape sets, and train your short-term visual memory.',
    visualClass: 'memory-visual',
    iconClass: 'memory-icon',
    dailyHref: '/memory-matching-game-online/?daily=today',
  },
  {
    id: 'murdoku',
    title: 'Murdoku Online Game',
    shortTitle: 'Murdoku Online',
    href: '/murdoku-online-game/',
    search: 'murdoku online game murdoku murder mystery logic puzzle crime scene sudoku deductive reasoning detective daily challenge',
    pill: 'DEDUCTION PUZZLE',
    difficulty: 'Easy · Medium · Hard · Expert',
    description: 'Solve crime-scene clues, place suspects on the estate grid, and deduce the killer in this murder mystery logic puzzle.',
    visualClass: 'murdoku-visual',
    iconClass: 'murdoku-icon',
    dailyHref: '/murdoku-online-game/?daily=today',
  },
  {
    id: 'norinori',
    title: 'Norinori Game',
    shortTitle: 'Norinori Game',
    href: '/norinori-game/',
    search: 'norinori game norinori puzzle nikoli shading domino logic brain game daily challenge',
    pill: 'SHADING PUZZLE',
    difficulty: 'Normal · Hard',
    description: 'Shade cells to form 1×2 and 2×1 dominoes. Each outlined region must contain exactly two shaded cells without touching along edges.',
    visualClass: 'norinori-visual',
    iconClass: 'norinori-icon',
    dailyHref: '/norinori-game/?daily=today',
  },
  {
    id: 'spot-the-difference',
    title: 'Spot the Difference Free Online Game',
    shortTitle: 'Spot the Difference',
    href: '/spot-the-difference-game/',
    search: 'spot the difference free online game find the difference photo puzzle picture difference visual puzzle brain game attention focus observation',
    pill: 'VISUAL PUZZLE',
    difficulty: 'Easy · Medium · Hard',
    description: 'Compare two pictures side by side, find hidden differences, use deductive hints, and sharpen your visual focus.',
    visualClass: 'spot-visual',
    iconClass: 'spot-icon',
  },
  {
    id: 'hidden-object',
    title: 'Free Hidden Object Online Game',
    shortTitle: 'Hidden Object',
    href: '/hidden-object-game/',
    search: 'free hidden object online game hidden object game hidden object puzzle find hidden objects visual search observation relaxing casual game',
    pill: 'HIDDEN OBJECT',
    difficulty: '10 Unique Levels',
    description: 'Inspect detailed illustrated scenes, find every hidden object from the list, and unlock all 10 relaxing levels.',
    visualClass: 'hidden-object-visual',
    iconClass: 'hidden-object-icon',
  },
];

/**
 * FIXED FEATURED HOMEPAGE GAMES COLLECTION
 * Strictly limited to these 5 games.
 * Future games MUST NOT be added automatically to this list.
 */
export const HOMEPAGE_FEATURED_GAME_IDS: readonly string[] = [
  'number-sequence',
  'color-flood',
  'picross',
  'sliding-puzzle',
  'word-ladder',
] as const;

/**
 * FIXED DAILY MOMENTS HOMEPAGE COLLECTION
 * Strictly limited to these 3 games (Picross was intentionally removed).
 * Future games MUST NOT be added automatically to this list.
 */
export const HOMEPAGE_DAILY_GAME_IDS: readonly string[] = [
  'number-sequence',
  'color-flood',
  'word-ladder',
] as const;

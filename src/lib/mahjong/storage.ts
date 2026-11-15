/**
 * LocalStorage Persistence and Deterministic Daily Challenge Utilities
 */

const STORAGE_KEY_PREFIX = 'puzzlefeels_mahjong_v1';

export type GameMode = 'solitaire' | 'connect' | 'triple';
export type GameDifficulty = 'easy' | 'medium' | 'hard';

export interface BestRecord {
  bestTime: number; // in seconds
  bestMoves: number;
  bestScore: number;
}

export interface StoredGameProgress {
  mode: GameMode;
  difficulty: GameDifficulty;
  isDaily: boolean;
  dailyDate: string; // YYYY-MM-DD
  moves: number;
  score: number;
  elapsedSeconds: number;
  boardState: any;
  trayState?: any;
  status: 'playing' | 'paused' | 'won' | 'lost';
  timestamp: number;
}

export interface DailyCompletion {
  date: string;
  mode: GameMode;
  time: number;
  moves: number;
  score: number;
}

/**
 * Returns current UTC date string YYYY-MM-DD
 */
export function getUtcDateString(): string {
  const now = new Date();
  const year = now.getUTCFullYear();
  const month = String(now.getUTCMonth() + 1).padStart(2, '0');
  const day = String(now.getUTCDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Creates a deterministic 32-bit PRNG from a string seed (e.g. "2026-11-15_solitaire")
 */
export function createSeededRng(seedString: string): () => number {
  let hash = 1779033703 ^ seedString.length;
  for (let i = 0; i < seedString.length; i++) {
    hash = Math.imul(hash ^ seedString.charCodeAt(i), 3432918353);
    hash = (hash << 13) | (hash >>> 19);
  }

  let seed = hash >>> 0;
  return function mulberry32(): number {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export const storage = {
  // Sound preference
  getSoundEnabled(): boolean {
    try {
      const val = localStorage.getItem(`${STORAGE_KEY_PREFIX}_sound`);
      return val === null ? true : val === 'true';
    } catch {
      return true;
    }
  },

  setSoundEnabled(enabled: boolean) {
    try {
      localStorage.setItem(`${STORAGE_KEY_PREFIX}_sound`, String(enabled));
    } catch {}
  },

  // Daily challenge active state
  getIsDailyActive(): boolean {
    try {
      return localStorage.getItem(`${STORAGE_KEY_PREFIX}_is_daily_active`) === 'true';
    } catch {
      return false;
    }
  },

  setIsDailyActive(val: boolean) {
    try {
      localStorage.setItem(`${STORAGE_KEY_PREFIX}_is_daily_active`, String(val));
    } catch {}
  },

  // Save current active game
  saveGame(progress: StoredGameProgress) {
    try {
      const key = progress.isDaily
        ? `${STORAGE_KEY_PREFIX}_daily_${progress.dailyDate}`
        : `${STORAGE_KEY_PREFIX}_active_${progress.mode}`;
      localStorage.setItem(key, JSON.stringify(progress));
    } catch {}
  },

  // Load active game for mode (or daily)
  loadGame(mode: GameMode, isDaily: boolean = false, date: string = getUtcDateString()): StoredGameProgress | null {
    try {
      const key = isDaily
        ? `${STORAGE_KEY_PREFIX}_daily_${date}`
        : `${STORAGE_KEY_PREFIX}_active_${mode}`;
      const data = localStorage.getItem(key);
      if (!data) return null;
      return JSON.parse(data) as StoredGameProgress;
    } catch {
      return null;
    }
  },

  clearSavedGame(mode: GameMode, isDaily: boolean = false, date: string = getUtcDateString()) {
    try {
      const key = isDaily
        ? `${STORAGE_KEY_PREFIX}_daily_${date}`
        : `${STORAGE_KEY_PREFIX}_active_${mode}`;
      localStorage.removeItem(key);
    } catch {}
  },

  // Best records per mode + difficulty
  getBestRecord(mode: GameMode, difficulty: GameDifficulty): BestRecord | null {
    try {
      const data = localStorage.getItem(`${STORAGE_KEY_PREFIX}_best_${mode}_${difficulty}`);
      if (!data) return null;
      return JSON.parse(data) as BestRecord;
    } catch {
      return null;
    }
  },

  updateBestRecord(mode: GameMode, difficulty: GameDifficulty, time: number, moves: number, score: number): boolean {
    try {
      const current = this.getBestRecord(mode, difficulty);
      let isNewRecord = false;
      let bestTime = current?.bestTime ?? Infinity;
      let bestMoves = current?.bestMoves ?? Infinity;
      let bestScore = current?.bestScore ?? 0;

      if (time < bestTime) {
        bestTime = time;
        isNewRecord = true;
      }
      if (moves < bestMoves) {
        bestMoves = moves;
      }
      if (score > bestScore) {
        bestScore = score;
        isNewRecord = true;
      }

      localStorage.setItem(
        `${STORAGE_KEY_PREFIX}_best_${mode}_${difficulty}`,
        JSON.stringify({ bestTime, bestMoves, bestScore })
      );
      return isNewRecord;
    } catch {
      return false;
    }
  },

  // Daily challenge completion tracking
  isDailyCompleted(date: string = getUtcDateString()): boolean {
    try {
      const data = localStorage.getItem(`${STORAGE_KEY_PREFIX}_daily_history`);
      if (!data) return false;
      const history: DailyCompletion[] = JSON.parse(data);
      return history.some((item) => item.date === date);
    } catch {
      return false;
    }
  },

  markDailyCompleted(completion: DailyCompletion) {
    try {
      const data = localStorage.getItem(`${STORAGE_KEY_PREFIX}_daily_history`);
      const history: DailyCompletion[] = data ? JSON.parse(data) : [];
      if (!history.some((item) => item.date === completion.date)) {
        history.push(completion);
        localStorage.setItem(`${STORAGE_KEY_PREFIX}_daily_history`, JSON.stringify(history));
      }
    } catch {}
  },
};

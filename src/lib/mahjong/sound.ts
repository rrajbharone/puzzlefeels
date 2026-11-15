/**
 * Zero-dependency Web Audio API Sound Synthesizer for Mahjong Game
 */

class MahjongSoundManager {
  private ctx: AudioContext | null = null;
  private enabled: boolean = true;

  constructor() {
    // Initialized on first user interaction
  }

  public setEnabled(val: boolean) {
    this.enabled = val;
  }

  public isEnabled(): boolean {
    return this.enabled;
  }

  private initContext() {
    if (typeof window === 'undefined') return;
    if (!this.ctx) {
      const AudioClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioClass) {
        this.ctx = new AudioClass();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  private playTone(freq: number, type: OscillatorType, duration: number, delay = 0, gainLevel = 0.12) {
    if (!this.enabled) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const startTime = this.ctx.currentTime + delay;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(gainLevel, startTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + duration);
    } catch {
      // Audio playback safely suppressed if blocked by autoplay policy
    }
  }

  /** Crisp wooden tile tap when selecting a tile */
  public playSelect() {
    this.playTone(880, 'sine', 0.04, 0, 0.08);
    this.playTone(440, 'triangle', 0.05, 0.01, 0.07);
  }

  /** Harmonic double-bell chime when matching tiles */
  public playMatch() {
    this.playTone(523.25, 'triangle', 0.18, 0, 0.12); // C5
    this.playTone(659.25, 'sine', 0.22, 0.06, 0.12); // E5
    this.playTone(783.99, 'sine', 0.25, 0.12, 0.10); // G5
  }

  /** Soft low buzz for invalid or blocked tile selection */
  public playInvalid() {
    this.playTone(180, 'sawtooth', 0.12, 0, 0.06);
    this.playTone(140, 'sawtooth', 0.15, 0.05, 0.06);
  }

  /** Sparkle arpeggio when Hint is used */
  public playHint() {
    this.playTone(587.33, 'sine', 0.1, 0, 0.08); // D5
    this.playTone(739.99, 'sine', 0.1, 0.07, 0.08); // F#5
    this.playTone(880.00, 'sine', 0.12, 0.14, 0.08); // A5
    this.playTone(1174.66, 'sine', 0.15, 0.21, 0.09); // D6
  }

  /** Rapid wooden swish when tiles are shuffled */
  public playShuffle() {
    for (let i = 0; i < 5; i++) {
      this.playTone(300 + i * 80, 'triangle', 0.05, i * 0.04, 0.05);
    }
  }

  /** Triumphant fanfare when winning */
  public playVictory() {
    this.playTone(523.25, 'triangle', 0.2, 0, 0.14); // C5
    this.playTone(659.25, 'triangle', 0.2, 0.12, 0.14); // E5
    this.playTone(783.99, 'triangle', 0.2, 0.24, 0.14); // G5
    this.playTone(1046.50, 'sine', 0.5, 0.36, 0.18); // C6
  }

  /** Gentle descending tone on game over */
  public playGameOver() {
    this.playTone(440, 'sine', 0.2, 0, 0.1);
    this.playTone(370, 'sine', 0.2, 0.15, 0.1);
    this.playTone(311.13, 'sine', 0.4, 0.3, 0.12);
  }
}

export const soundManager = new MahjongSoundManager();

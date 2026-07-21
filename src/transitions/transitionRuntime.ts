/**
 * transitionRuntime.ts
 * RAF-based playback engine for Transition Scenes.
 *
 * Uses requestAnimationFrame — NOT setTimeout — for frame-precise timing.
 * The scene swap fires exactly once at switchMarker ms via a one-shot guard flag.
 *
 * Callbacks are called from outside React — do not call setState directly
 * in onFrame. Use a ref-based forceUpdate pattern in the consuming component.
 */

import type { TransitionScene } from './types';

// ─── Runtime Class ────────────────────────────────────────────────────────────

export class TransitionRuntime {
  private _rafId: number | null = null;
  private _startTime: number = 0;
  private _pauseTime: number = 0;
  private _elapsed: number = 0;
  private _switched: boolean = false;
  private _complete: boolean = false;
  private _paused: boolean = false;
  private _transition: TransitionScene | null = null;
  private _audio: HTMLAudioElement | null = null;

  private _onSwitch: (() => void) | null = null;
  private _onComplete: (() => void) | null = null;
  private _onFrame: ((elapsed: number) => void) | null = null;

  // ─── Public API ──────────────────────────────────────────────────────────────

  get isComplete(): boolean { return this._complete; }
  get isPaused(): boolean { return this._paused; }
  get transition(): TransitionScene | null { return this._transition; }

  getElapsed(): number { return this._elapsed; }

  getProgress(): number {
    if (!this._transition || this._transition.duration <= 0) return 0;
    return Math.min(1, this._elapsed / this._transition.duration);
  }

  /**
   * Start playing a transition.
   * @param transition  The TransitionScene to play
   * @param onSwitch    Called ONCE at switchMarker ms — switch the live scene here
   * @param onComplete  Called at duration ms — unmount the overlay here
   * @param onFrame     Called every animation frame with current elapsed ms
   */
  start(
    transition: TransitionScene,
    onSwitch: () => void,
    onComplete: () => void,
    onFrame: (elapsed: number) => void
  ): void {
    this.cancel(); // Stop any existing playback

    this._transition = transition;
    this._onSwitch = onSwitch;
    this._onComplete = onComplete;
    this._onFrame = onFrame;
    this._elapsed = 0;
    this._switched = false;
    this._complete = false;
    this._paused = false;
    this._startTime = performance.now();

    // Start audio if configured
    if (transition.audioTrack) {
      this._audio = new Audio(transition.audioTrack);
      this._audio.play().catch(() => { /* Audio autoplay blocked — ignore */ });
    }

    this._rafId = requestAnimationFrame(this._frame);
  }

  /** Pause playback (pauses audio too) */
  pause(): void {
    if (this._paused || this._complete) return;
    this._paused = true;
    this._pauseTime = performance.now();
    if (this._rafId !== null) {
      cancelAnimationFrame(this._rafId);
      this._rafId = null;
    }
    this._audio?.pause();
  }

  /** Resume after pause */
  resume(): void {
    if (!this._paused || this._complete) return;
    this._paused = false;
    // Adjust start time to account for pause duration
    const pauseDuration = performance.now() - this._pauseTime;
    this._startTime += pauseDuration;
    this._audio?.play().catch(() => {});
    this._rafId = requestAnimationFrame(this._frame);
  }

  /** Stop and clean up immediately */
  cancel(): void {
    if (this._rafId !== null) {
      cancelAnimationFrame(this._rafId);
      this._rafId = null;
    }
    this._audio?.pause();
    this._audio = null;
    this._complete = true;
    this._transition = null;
    this._onSwitch = null;
    this._onComplete = null;
    this._onFrame = null;
  }

  // ─── Private Frame Loop ───────────────────────────────────────────────────────

  private _frame = (now: number): void => {
    if (!this._transition || this._complete) return;

    this._elapsed = now - this._startTime;

    // Fire scene switch exactly once at the switch marker
    if (this._elapsed >= this._transition.switchMarker && !this._switched) {
      this._switched = true;
      this._onSwitch?.();
    }

    // Notify frame consumer
    this._onFrame?.(this._elapsed);

    // Check completion
    if (this._elapsed >= this._transition.duration) {
      this._complete = true;
      this._audio?.pause();
      this._rafId = null;
      this._onComplete?.();
      return;
    }

    this._rafId = requestAnimationFrame(this._frame);
  };
}

// ─── Singleton ────────────────────────────────────────────────────────────────

/** Global singleton runtime instance — one active transition at a time */
export const transitionRuntime = new TransitionRuntime();

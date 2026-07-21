/**
 * transitions/types.ts
 * Core data model for the Transition Studio system.
 *
 * A TransitionScene is structurally identical to a Scene but adds:
 *   - duration     : total playback time in milliseconds
 *   - switchMarker : the exact ms timestamp at which the active scene swaps
 *
 * All 40+ existing widget types are reused without modification.
 * The TransitionOverlay renders using the same SceneRenderer.
 */

import type { SceneWidget } from '../store/editorStore';

// ─── Easing ──────────────────────────────────────────────────────────────────

export type EasingType =
  | 'linear'
  | 'ease'
  | 'ease-in'
  | 'ease-out'
  | 'ease-in-out'
  | 'bounce'
  | 'elastic'
  | 'back'
  | 'cubic';

// ─── Keyframe Animation ───────────────────────────────────────────────────────

export type KeyframeProp =
  | 'x' | 'y' | 'width' | 'height'
  | 'rotation' | 'opacity' | 'scale'
  | 'blur' | 'skewX' | 'skewY';

export interface TransitionKeyframe {
  /** Time in ms from transition start */
  time: number;
  /** ID of the widget this keyframe targets */
  widgetId: string;
  /** Which property to animate */
  property: KeyframeProp;
  /** Target value at this keyframe */
  value: number;
  /** Easing from the previous keyframe to this one */
  easing: EasingType;
}

// ─── Transition Category ─────────────────────────────────────────────────────

export type TransitionCategory =
  | 'Energetic' | 'Minimal' | 'Cinematic' | 'Anime'
  | 'Esports' | 'VTuber' | 'Logo' | 'Glitch' | 'Custom';

// ─── Transition Scene ─────────────────────────────────────────────────────────

export interface TransitionScene {
  id: string;
  name: string;
  description: string;
  category: TransitionCategory;

  /**
   * Total playback duration in milliseconds.
   * The transition overlay exists for this entire period.
   */
  duration: number;

  /**
   * The timestamp (ms) at which the actual scene swap fires.
   * Must satisfy: 0 < switchMarker < duration
   */
  switchMarker: number;

  /**
   * Widgets — identical SceneWidget type used throughout the rest of the app.
   * All 40+ existing widget types work without any modification.
   */
  widgets: SceneWidget[];

  /**
   * Optional per-widget keyframe overrides for precise timeline animation.
   * Basic usage: leave empty and use widget.animation fields instead.
   */
  keyframes: TransitionKeyframe[];

  /** Optional audio asset URL */
  audioTrack?: string;

  /** CSS background string for the transition canvas (default: 'transparent') */
  background?: string;

  /** Default easing for widget entry animations */
  easing: EasingType;

  /** Thumbnail data URL for library card preview */
  thumbnail?: string;

  /** Tags for search and filtering */
  tags: string[];

  /**
   * True for built-in library templates.
   * Templates cannot be mutated — users duplicate them first.
   */
  isTemplate: boolean;

  createdAt: number;
  updatedAt: number;
}

// ─── Scene Assignment ─────────────────────────────────────────────────────────

/** Maps a scene to its transition in/out. null = use project default. */
export interface SceneTransitionAssignment {
  sceneId: string;
  /** Transition that plays when switching TO this scene */
  transitionInId: string | null;
  /** Transition that plays when switching AWAY from this scene */
  transitionOutId: string | null;
}

// ─── Runtime ─────────────────────────────────────────────────────────────────

export type TransitionPhase = 'idle' | 'playing' | 'complete';

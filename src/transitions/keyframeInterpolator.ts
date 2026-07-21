/**
 * keyframeInterpolator.ts
 * Pure function for computing per-widget style overrides at a given elapsed time.
 * Called by TransitionOverlay on every RAF frame.
 *
 * No React dependencies — safe to use in the hot path.
 */

import type { SceneWidget } from '../store/editorStore';
import type { TransitionKeyframe, KeyframeProp } from './types';
import { applyEasing } from './easingFunctions';

// ─── Types ────────────────────────────────────────────────────────────────────

/** Partial overrides merged into a widget before rendering */
export type WidgetOverrides = Partial<Pick<SceneWidget, 'x' | 'y' | 'width' | 'height' | 'rotation' | 'opacity' | 'scale'>>;

// ─── Main Interpolator ────────────────────────────────────────────────────────

/**
 * Compute the interpolated widget overrides for a specific widget at elapsed ms.
 *
 * For each property, finds the surrounding keyframe pair (prev, next) and
 * interpolates linearly between them using the easing function of the next keyframe.
 *
 * Returns an empty object if no keyframes are defined for this widget.
 */
export function interpolateKeyframes(
  widgetId: string,
  keyframes: TransitionKeyframe[],
  elapsedMs: number
): WidgetOverrides {
  const widgetKeyframes = keyframes.filter(kf => kf.widgetId === widgetId);
  if (widgetKeyframes.length === 0) return {};

  // Group keyframes by property
  const byProp = new Map<KeyframeProp, TransitionKeyframe[]>();
  for (const kf of widgetKeyframes) {
    const existing = byProp.get(kf.property) ?? [];
    existing.push(kf);
    byProp.set(kf.property, existing);
  }

  const overrides: WidgetOverrides = {};

  for (const [prop, kfs] of byProp) {
    // Sort by time
    const sorted = [...kfs].sort((a, b) => a.time - b.time);

    const value = interpolateProp(sorted, elapsedMs);
    if (value !== undefined) {
      applyOverride(overrides, prop, value);
    }
  }

  return overrides;
}

// ─── Internal Helpers ─────────────────────────────────────────────────────────

function interpolateProp(
  sortedKfs: TransitionKeyframe[],
  elapsedMs: number
): number | undefined {
  if (sortedKfs.length === 0) return undefined;

  // Before first keyframe — hold first value
  if (elapsedMs <= sortedKfs[0].time) return sortedKfs[0].value;

  // After last keyframe — hold last value
  const last = sortedKfs[sortedKfs.length - 1];
  if (elapsedMs >= last.time) return last.value;

  // Find surrounding pair
  let prev = sortedKfs[0];
  let next = sortedKfs[1];
  for (let i = 0; i < sortedKfs.length - 1; i++) {
    if (elapsedMs >= sortedKfs[i].time && elapsedMs <= sortedKfs[i + 1].time) {
      prev = sortedKfs[i];
      next = sortedKfs[i + 1];
      break;
    }
  }

  const span = next.time - prev.time;
  if (span <= 0) return next.value;

  const rawT = (elapsedMs - prev.time) / span;
  const easedT = applyEasing(next.easing, rawT);
  return prev.value + (next.value - prev.value) * easedT;
}

function applyOverride(overrides: WidgetOverrides, prop: KeyframeProp, value: number): void {
  switch (prop) {
    case 'x': overrides.x = value; break;
    case 'y': overrides.y = value; break;
    case 'width': overrides.width = value; break;
    case 'height': overrides.height = value; break;
    case 'rotation': overrides.rotation = value; break;
    case 'opacity': overrides.opacity = value; break;
    case 'scale': overrides.scale = value; break;
    // skewX, skewY, blur — stored in style but not yet mapped to SceneWidget top-level
    // These will be extended in V0.8 when the full keyframe editor lands
    default: break;
  }
}

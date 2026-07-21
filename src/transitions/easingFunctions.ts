/**
 * easingFunctions.ts
 * Pure easing math functions for keyframe interpolation.
 * Each function takes t in [0,1] and returns a transformed t in [0,1].
 * No dependencies — safe to use in RAF hot loop.
 */

import type { EasingType } from './types';

// ─── Individual Easing Functions ─────────────────────────────────────────────

const linear = (t: number): number => t;

const ease = (t: number): number => cubicBezier(0.25, 0.1, 0.25, 1.0)(t);

const easeIn = (t: number): number => t * t * t;

const easeOut = (t: number): number => 1 - Math.pow(1 - t, 3);

const easeInOut = (t: number): number =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

const bounce = (t: number): number => {
  const n1 = 7.5625;
  const d1 = 2.75;
  if (t < 1 / d1) return n1 * t * t;
  if (t < 2 / d1) { t -= 1.5 / d1; return n1 * t * t + 0.75; }
  if (t < 2.5 / d1) { t -= 2.25 / d1; return n1 * t * t + 0.9375; }
  t -= 2.625 / d1;
  return n1 * t * t + 0.984375;
};

const elastic = (t: number): number => {
  if (t === 0 || t === 1) return t;
  const c4 = (2 * Math.PI) / 3;
  return -Math.pow(2, 10 * t - 10) * Math.sin((t * 10 - 10.75) * c4);
};

const back = (t: number): number => {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return c3 * t * t * t - c1 * t * t;
};

const cubic = (t: number): number => easeInOut(t);

// ─── Cubic Bezier Helper ──────────────────────────────────────────────────────

function cubicBezier(x1: number, y1: number, x2: number, y2: number) {
  return function (t: number): number {
    // Simplified approximation for CSS cubic-bezier
    const cx = 3 * x1;
    const bx = 3 * (x2 - x1) - cx;
    const ax = 1 - cx - bx;
    const cy = 3 * y1;
    const by = 3 * (y2 - y1) - cy;
    const ay = 1 - cy - by;

    // Find t via Newton-Raphson
    let x = t;
    for (let i = 0; i < 4; i++) {
      const currentX = ((ax * x + bx) * x + cx) * x - t;
      const currentSlope = (3 * ax * x + 2 * bx) * x + cx;
      if (Math.abs(currentSlope) < 1e-6) break;
      x -= currentX / currentSlope;
    }
    return ((ay * x + by) * x + cy) * x;
  };
}

// ─── Lookup Map ───────────────────────────────────────────────────────────────

const EASING_MAP: Record<EasingType, (t: number) => number> = {
  linear,
  ease,
  'ease-in': easeIn,
  'ease-out': easeOut,
  'ease-in-out': easeInOut,
  bounce,
  elastic,
  back,
  cubic,
};

/**
 * Apply an easing function to a normalized time t in [0,1].
 * Returns an eased value in [0,1].
 */
export function applyEasing(easing: EasingType, t: number): number {
  const fn = EASING_MAP[easing] ?? linear;
  return fn(Math.max(0, Math.min(1, t)));
}

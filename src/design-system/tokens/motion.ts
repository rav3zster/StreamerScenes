/**
 * PDS V1.0 Document 2 — Motion Language Tokens
 * Durations (100ms, 180ms, 250ms, 350ms) and easing curves.
 */

export const motion = {
  duration: {
    fast: '100ms',
    standard: '180ms',
    complex: '250ms',
    max: '350ms',
  },

  easing: {
    entrance: 'cubic-bezier(0.0, 0.0, 0.2, 1)',   // Ease Out
    exit: 'cubic-bezier(0.4, 0.0, 1, 1)',         // Ease In
    layout: 'cubic-bezier(0.4, 0.0, 0.2, 1)',     // Ease In Out
    spring: 'cubic-bezier(0.16, 1, 0.3, 1)',      // Smooth drag
  },
} as const;

export type MotionTokens = typeof motion;

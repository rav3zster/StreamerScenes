/**
 * PDS V1.0 Document 2 — Opacity Tokens
 */

export const opacity = {
  disabled: 0.4,
  muted: 0.6,
  secondary: 0.8,
  full: 1.0,
} as const;

export type OpacityTokens = typeof opacity;

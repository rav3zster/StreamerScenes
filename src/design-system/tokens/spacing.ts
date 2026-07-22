/**
 * PDS V1.0 Document 2 — Spacing System Tokens
 * Strict spacing scale: 4, 8, 12, 16, 24, 32, 48, 64, 96.
 */

export const spacing = {
  xs: 4,   // Labels & micro gaps
  sm: 8,   // Fields & inner item gaps
  md: 12,  // Groups & input padding
  lg: 16,  // Section spacing
  xl: 24,  // Panel padding & layout blocks
  xxl: 32, // Large component margins
  xxxl: 48,// Page header gaps
  huge: 64,
  max: 96,

  // Semantic layout rhythm
  rhythm: {
    label: 4,
    field: 8,
    group: 12,
    section: 16,
    panel: 24,
  },
} as const;

export type SpacingTokens = typeof spacing;

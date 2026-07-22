/**
 * PDS V1.0 Document 2 — Typography System Tokens
 * Single font family, strictly defined scale, font weights, line heights, letter-spacing.
 */

export const typography = {
  fontFamily: {
    sans: "'Inter', system-ui, -apple-system, sans-serif",
    display: "'Inter', system-ui, sans-serif",
    mono: "'JetBrains Mono', ui-monospace, monospace",
  },

  fontSize: {
    display: 24,
    pageTitle: 18,
    section: 14,
    panelHeader: 11,
    subsection: 12,
    body: 13,
    bodySmall: 12,
    metadata: 11,
    caption: 10,
    microLabel: 9,
  },

  fontWeight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },

  letterSpacing: {
    tight: '-0.02em',
    normal: '0em',
    wide: '0.04em',
    wider: '0.08em',
    uppercase: '0.1em',
  },

  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.6,
  },
} as const;

export type TypographyTokens = typeof typography;

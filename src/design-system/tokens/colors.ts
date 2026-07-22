/**
 * PDS V1.0 Document 2 — Color Architecture Tokens
 * Semantic tokens for monochromatic neutral palette, surfaces 0-5, and restrained accent state.
 */

export const colors = {
  // ── Surface Hierarchy (Surfaces 0 - 5) ──
  surface: {
    s0: '#060608', // App Shell (window frame)
    s1: '#0a090f', // Workspace & Canvas area
    s2: '#121118', // Docked Panels
    s3: '#1a1823', // Interactive Editing Cards
    s4: '#232030', // Floating Interface (Dropdowns, Context Menus)
    s5: '#2c283c', // Modal Layer & Dialogs
  },

  // ── Light Theme Surfaces ──
  surfaceLight: {
    s0: '#e8eafd',
    s1: '#f1f3f8',
    s2: '#ffffff',
    s3: '#eef0f6',
    s4: '#e1e4ed',
    s5: '#ffffff',
  },

  // ── Text Levels ──
  text: {
    primary: '#fafafa',
    secondary: '#d4d4d8',
    tertiary: '#a1a1aa',
    muted: '#71717a',
    disabled: '#52525b',
  },

  textLight: {
    primary: '#0f172a',
    secondary: '#334155',
    tertiary: '#475569',
    muted: '#64748b',
    disabled: '#94a3b8',
  },

  // ── Semantic State Colors ──
  accent: {
    primary: '#8b5cf6',
    hover: '#9333ea',
    active: '#7e22ce',
    subtle: 'rgba(139, 92, 246, 0.12)',
    muted: 'rgba(139, 92, 246, 0.22)',
  },

  status: {
    success: '#10b981',
    warning: '#f59e0b',
    danger: '#ef4444',
    info: '#3b82f6',
  },

  // ── Canvas Overlay Elements ──
  canvas: {
    grid: 'rgba(139, 92, 246, 0.25)',
    guide: '#5cffe2',
    selection: '#8b5cf6',
    rubberband: 'rgba(139, 92, 246, 0.08)',
  },
} as const;

export type ColorTokens = typeof colors;

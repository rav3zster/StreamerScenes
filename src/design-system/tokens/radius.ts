/**
 * PDS V1.0 Document 2 — Corner Radius System Tokens
 * Radius rules: 0, 4, 6, 8, 12 (capped at 12px maximum).
 */

export const radius = {
  none: 0,     // Application edges
  sm: 4,       // Inputs, Buttons
  md: 6,       // Panels, Menus
  lg: 8,       // Dialogs & Cards
  xl: 12,      // Floating utilities & Tooltips
  full: 9999,  // Circle pills
} as const;

export type RadiusTokens = typeof radius;

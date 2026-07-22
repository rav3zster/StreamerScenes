/**
 * PDS V1.0 Document 2 — Elevation & Shadow Tokens
 * Elevations 0 to 4 with soft, low-opacity blurs.
 */

export const shadows = {
  e0: 'none',
  e1: '0 2px 8px rgba(0, 0, 0, 0.25)',                    // Panels
  e2: '0 8px 24px rgba(0, 0, 0, 0.35)',                   // Floating interface
  e3: '0 16px 48px rgba(0, 0, 0, 0.45)',                  // Dialogs & Modals
  e4: '0 24px 64px rgba(0, 0, 0, 0.65)',                  // Temporary Overlays & Full Canvas
  stage: '0 20px 60px rgba(0, 0, 0, 0.65), 0 0 0 1px rgba(255, 255, 255, 0.08)',
  stageLight: '0 20px 60px rgba(15, 23, 42, 0.18), 0 0 0 1px rgba(0, 0, 0, 0.15)',
} as const;

export type ShadowTokens = typeof shadows;

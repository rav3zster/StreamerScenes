/**
 * PDS V1.0 Document 2 — Z-Index Tokens
 */

export const zIndex = {
  canvas: 1,
  panel: 20,
  toolbar: 30,
  floating: 40,
  modal: 50,
  tooltip: 100,
  overlay: 9999,
} as const;

export type ZIndexTokens = typeof zIndex;

/**
 * styleHelpers.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Pure utility functions for building CSS style strings from WidgetStyle data.
 * These are shared between the editor preview and the OBS output renderer,
 * ensuring pixel-identical results in both contexts.
 */

import type { SceneWidget } from '../store/editorStore';

type WidgetStyle = SceneWidget['style'];

// ─── Box Shadow ───────────────────────────────────────────────────────────────

export function buildBoxShadow(s: WidgetStyle): string | undefined {
  const parts: string[] = [];

  if (s.shadowBlur && s.shadowBlur > 0) {
    parts.push(
      `${s.shadowX ?? 0}px ${s.shadowY ?? 4}px ${s.shadowBlur}px ${s.shadowColor ?? 'rgba(0,0,0,0.5)'}`
    );
  }

  if (s.glowColor && s.glowBlur) {
    parts.push(`0 0 ${s.glowBlur}px ${s.glowColor}`);
    parts.push(`0 0 ${s.glowBlur * 2}px ${s.glowColor}40`);
  }

  return parts.length ? parts.join(', ') : undefined;
}

// ─── Text Shadow ──────────────────────────────────────────────────────────────

export function buildTextShadow(s: WidgetStyle): string | undefined {
  const parts: string[] = [];

  if (s.textShadowBlur && s.textShadowBlur > 0) {
    parts.push(
      `${s.textShadowX ?? 0}px ${s.textShadowY ?? 2}px ${s.textShadowBlur}px ${s.textShadowColor ?? 'rgba(0,0,0,0.5)'}`
    );
  }

  if (s.glowColor && s.glowBlur) {
    parts.push(`0 0 ${s.glowBlur}px ${s.glowColor}`);
  }

  return parts.length ? parts.join(', ') : undefined;
}

// ─── Base Container Style ─────────────────────────────────────────────────────

/**
 * Builds the shared base CSS properties that all widgets inherit.
 * Individual widget components may extend or override specific properties.
 */
export function buildBaseStyle(s: WidgetStyle): React.CSSProperties {
  return {
    width: '100%',
    height: '100%',
    background: s.background ?? 'transparent',
    borderRadius: s.borderRadius ? `${s.borderRadius}px` : undefined,
    border:
      s.borderSize && s.borderSize > 0
        ? `${s.borderSize}px ${s.borderStyle ?? 'solid'} ${s.borderColor ?? 'rgba(168,85,247,0.5)'}`
        : undefined,
    boxShadow: buildBoxShadow(s),
    padding: s.padding ? `${s.padding}px` : undefined,
    backdropFilter: s.glassEffect ? 'blur(12px) saturate(160%)' : undefined,
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxSizing: 'border-box',
  };
}

// ─── Text Style ───────────────────────────────────────────────────────────────

/**
 * Builds CSS properties for text content. Accepts `zoom` so that font sizes
 * scale correctly whether rendering in the editor (zoom < 1) or the OBS
 * output (zoom = 1).
 */
export function buildTextStyle(s: WidgetStyle, zoom: number): React.CSSProperties {
  return {
    fontFamily: s.fontFamily ?? 'Inter, sans-serif',
    fontSize: s.fontSize ? `${s.fontSize * zoom}px` : `${14 * zoom}px`,
    fontWeight: s.fontWeight ?? '400',
    fontStyle: s.fontStyle ?? 'normal',
    color: s.fontColor ?? '#ffffff',
    textAlign: s.textAlign ?? 'left',
    letterSpacing: s.letterSpacing ? `${s.letterSpacing}px` : undefined,
    lineHeight: s.lineHeight ?? 1.4,
    textTransform: s.textTransform ?? 'none',
    textShadow: buildTextShadow(s),
    WebkitTextStroke:
      s.strokeWidth && s.strokeWidth > 0
        ? `${s.strokeWidth * zoom}px ${s.strokeColor ?? '#000000'}`
        : undefined,
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
    width: '100%',
    overflow: 'hidden',
  };
}

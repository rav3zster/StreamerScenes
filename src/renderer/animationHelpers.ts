/**
 * animationHelpers.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Maps the WidgetAnimation model to actual CSS animation properties.
 * Used by SceneRenderer when `animated` prop is true (output mode).
 * The editor preview suppresses animations to keep the canvas quiet.
 */

import type { WidgetAnimation } from '../store/editorStore';

export interface AnimationStyle {
  animation?: string;
  animationFillMode?: string;
}

// ─── CSS Keyframe Definitions ─────────────────────────────────────────────────
// Injected once into the document head by SceneRenderer on mount.

export const ANIMATION_KEYFRAMES = `
@keyframes vibe-fade {
  from { opacity: 0; }
  to   { opacity: 1; }
}
@keyframes vibe-scale {
  from { transform: scale(0.85); opacity: 0; }
  to   { transform: scale(1);    opacity: 1; }
}
@keyframes vibe-slide-up {
  from { transform: translateY(24px); opacity: 0; }
  to   { transform: translateY(0);    opacity: 1; }
}
@keyframes vibe-slide-left {
  from { transform: translateX(24px); opacity: 0; }
  to   { transform: translateX(0);    opacity: 1; }
}
@keyframes vibe-bounce {
  0%, 100% { transform: translateY(0);     }
  25%       { transform: translateY(-10px); }
  75%       { transform: translateY(-5px);  }
}
@keyframes vibe-glow {
  0%, 100% { filter: brightness(1);   }
  50%       { filter: brightness(1.4); }
}
@keyframes vibe-pulse {
  0%, 100% { opacity: 1;   }
  50%       { opacity: 0.55; }
}
@keyframes vibe-float {
  0%, 100% { transform: translateY(0);   }
  50%       { transform: translateY(-8px);}
}
@keyframes vibe-shake {
  0%, 100%  { transform: translateX(0);  }
  20%, 60%  { transform: translateX(-4px); }
  40%, 80%  { transform: translateX(4px);  }
}
@keyframes vibe-spin {
  from { transform: rotate(0deg);   }
  to   { transform: rotate(360deg); }
}
@keyframes ticker-scroll {
  from { transform: translateX(100vw); }
  to   { transform: translateX(-100%); }
}
`;

// ─── Animation Name Map ───────────────────────────────────────────────────────

const ANIMATION_MAP: Record<string, string> = {
  fade:       'vibe-fade',
  scale:      'vibe-scale',
  'slide-up': 'vibe-slide-up',
  'slide-left':'vibe-slide-left',
  bounce:     'vibe-bounce',
  glow:       'vibe-glow',
  pulse:      'vibe-pulse',
  float:      'vibe-float',
  shake:      'vibe-shake',
  spin:       'vibe-spin',
};

// ─── Entry-point ──────────────────────────────────────────────────────────────

/**
 * Returns the React inline style for a widget's CSS animation.
 * Returns an empty object when animated=false or type='none'.
 */
export function buildAnimationStyle(
  animation: WidgetAnimation,
  animated: boolean
): AnimationStyle {
  if (!animated || animation.type === 'none') return {};

  const keyframeName = ANIMATION_MAP[animation.type];
  if (!keyframeName) return {};

  // One-shot entry animations vs. continuous loops
  const isEntryAnimation = ['fade', 'scale', 'slide-up', 'slide-left'].includes(animation.type);
  const iterationCount = animation.loop ? 'infinite' : isEntryAnimation ? '1' : 'infinite';
  const fillMode = isEntryAnimation && !animation.loop ? 'both' : 'none';

  return {
    animation: `${keyframeName} ${animation.duration}s ${animation.easing ?? 'ease'} ${animation.delay}s ${iterationCount}`,
    animationFillMode: fillMode,
  };
}

// ─── Keyframe Injection ───────────────────────────────────────────────────────

let injected = false;

/** Injects keyframe CSS once into the document head. Called by SceneRenderer. */
export function injectAnimationKeyframes(): void {
  if (injected || typeof document === 'undefined') return;
  injected = true;
  const style = document.createElement('style');
  style.id = 'vibe-keyframes';
  style.textContent = ANIMATION_KEYFRAMES;
  document.head.appendChild(style);
}

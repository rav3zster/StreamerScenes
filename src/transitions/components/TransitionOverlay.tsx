/**
 * TransitionOverlay.tsx
 * The live overlay component rendered during scene transitions.
 *
 * Sits at z-index 9999 above both source and destination scenes.
 * Both scenes remain mounted throughout — this is purely an overlay.
 *
 * Uses the existing SceneRenderer directly — no new renderer is written.
 * Keyframe interpolation is applied per-widget before passing to SceneRenderer.
 */

import React, { useEffect, useReducer, useRef, useMemo } from 'react';
import { SceneRenderer } from '../../renderer/SceneRenderer';
import { useTransitionStore } from '../../store/transitionStore';
import { TRANSITION_LIBRARY } from '../transitionLibrary';
import { transitionRuntime } from '../transitionRuntime';
import { interpolateKeyframes } from '../keyframeInterpolator';
import type { SceneWidget } from '../../store/editorStore';

interface TransitionOverlayProps {
  zoom: number;
}

// ─── Component ───────────────────────────────────────────────────────────────

export const TransitionOverlay: React.FC<TransitionOverlayProps> = React.memo(({ zoom }) => {
  const phase = useTransitionStore(s => s.phase);
  const activeTransitionId = useTransitionStore(s => s.activeTransitionId);
  const userTransitions = useTransitionStore(s => s.transitions);

  const activeTransition = useMemo(() => {
    if (!activeTransitionId) return null;
    return TRANSITION_LIBRARY.find(t => t.id === activeTransitionId) || userTransitions.find(t => t.id === activeTransitionId) || null;
  }, [activeTransitionId, userTransitions]);

  // RAF-based repaint — bypasses React reconciler in hot path
  const [, forceUpdate] = useReducer(x => x + 1, 0);
  const elapsedRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (phase !== 'playing' || !activeTransition) return;

    const tick = () => {
      elapsedRef.current = transitionRuntime.getElapsed();
      forceUpdate();
      if (!transitionRuntime.isComplete) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [phase, activeTransition]);

  if (phase !== 'playing' || !activeTransition) return null;

  const elapsed = elapsedRef.current;

  // Apply keyframe interpolation: merge overrides onto each widget
  const interpolatedWidgets: SceneWidget[] = activeTransition.widgets.map(w => {
    const overrides = interpolateKeyframes(w.id, activeTransition.keyframes, elapsed);
    return { ...w, ...overrides };
  });

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 9999,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        pointerEvents: 'none',
        // Apply optional background (transparent by default)
        background: activeTransition.background ?? 'transparent',
      }}
    >
      <SceneRenderer
        widgets={interpolatedWidgets}
        zoom={zoom}
        animated={true}
        timerSource="live"
      />
    </div>
  );
});

TransitionOverlay.displayName = 'TransitionOverlay';

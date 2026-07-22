/**
 * TransitionCanvas.tsx
 * Canvas area for the Transition Studio.
 * Renders the active transition widgets on a 1920x1080 canvas container with zoom fitting.
 */

import React, { useRef, useEffect, useState, useMemo } from 'react';
import { SceneRenderer } from '../../renderer/SceneRenderer';
import { useTransitionStore } from '../../store/transitionStore';
import { TRANSITION_LIBRARY } from '../transitionLibrary';
import { CANVAS_W, CANVAS_H } from '../../editor/canvas/EditorCanvas';
import { interpolateKeyframes } from '../keyframeInterpolator';

export const TransitionCanvas: React.FC = () => {
  const editingTransitionId = useTransitionStore(s => s.editingTransitionId);
  const userTransitions = useTransitionStore(s => s.transitions);
  const selectedWidgetIds = useTransitionStore(s => s.selectedWidgetIds);
  const selectWidget = useTransitionStore(s => s.selectWidget);
  const deselectAll = useTransitionStore(s => s.deselectAll);
  const playheadMs = useTransitionStore(s => s.playheadMs);

  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.5);

  const transition = useMemo(() => {
    if (!editingTransitionId) return null;
    return TRANSITION_LIBRARY.find(t => t.id === editingTransitionId) || userTransitions.find(t => t.id === editingTransitionId) || null;
  }, [editingTransitionId, userTransitions]);

  // Auto scale 1920x1080 canvas to fit container
  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const padding = 40;
      const availableW = rect.width - padding;
      const availableH = rect.height - padding;
      const s = Math.min(availableW / CANVAS_W, availableH / CANVAS_H, 1);
      setScale(Math.max(0.2, s));
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!transition) {
    return (
      <div
        ref={containerRef}
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'var(--color-bg)',
          color: 'rgba(255,255,255,0.2)',
          fontSize: 14,
        }}
      >
        Select or create a transition from the library on the left.
      </div>
    );
  }

  // Apply keyframe interpolator for previewing at playheadMs
  const renderedWidgets = transition.widgets.map(w => {
    const overrides = interpolateKeyframes(w.id, transition.keyframes, playheadMs);
    return { ...w, ...overrides };
  });

  return (
    <div
      ref={containerRef}
      style={{
        flex: 1,
        position: 'relative',
        background: '#090714',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        userSelect: 'none',
      }}
      onClick={deselectAll}
    >
      {/* 1920x1080 Stage */}
      <div
        style={{
          width: CANVAS_W,
          height: CANVAS_H,
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
          boxShadow: '0 20px 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.1)',
          background: transition.background || 'rgba(12,10,26,0.95)',
          position: 'relative',
          overflow: 'hidden',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <SceneRenderer
          widgets={renderedWidgets}
          zoom={1}
          animated={true}
          timerSource="live"
        />

        {/* Selection bounding box overlay */}
        {selectedWidgetIds.map(id => {
          const w = renderedWidgets.find(x => x.id === id);
          if (!w) return null;
          return (
            <div
              key={id}
              style={{
                position: 'absolute',
                left: w.x,
                top: w.y,
                width: w.width,
                height: w.height,
                border: '2px solid var(--color-accent)',
                boxShadow: '0 0 12px var(--color-accent-alpha-40)',
                pointerEvents: 'none',
                zIndex: 10000,
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

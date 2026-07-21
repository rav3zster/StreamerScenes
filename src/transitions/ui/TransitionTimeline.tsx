/**
 * TransitionTimeline.tsx
 * Bottom timeline bar for the Transition Studio.
 * Shows the duration ruler, playhead, and draggable switch marker.
 */

import React, { useRef, useCallback, useState, useMemo } from 'react';
import { Play, Pause, Square } from 'lucide-react';
import { useTransitionStore } from '../../store/transitionStore';
import { TRANSITION_LIBRARY } from '../transitionLibrary';

const TIMELINE_HEIGHT = 72;
const RULER_HEIGHT = 20;
const TRACK_HEIGHT = 36;
const ACCENT = '#a855f7';
const SWITCH_COLOR = '#ef4444';

interface TransitionTimelineProps {
  transitionId: string;
}

export const TransitionTimeline: React.FC<TransitionTimelineProps> = ({ transitionId }) => {
  const userTransitions = useTransitionStore(s => s.transitions);
  const transition = useMemo(() => {
    return TRANSITION_LIBRARY.find(t => t.id === transitionId) || userTransitions.find(t => t.id === transitionId) || null;
  }, [transitionId, userTransitions]);

  const setSwitchMarker = useTransitionStore(s => s.setSwitchMarker);
  const setPlayhead = useTransitionStore(s => s.setPlayhead);
  const playheadMs = useTransitionStore(s => s.playheadMs);
  const isPlaying = useTransitionStore(s => s.isPlaying);

  const barRef = useRef<HTMLDivElement>(null);
  const [draggingMarker, setDraggingMarker] = useState<'switch' | 'playhead' | null>(null);

  if (!transition) return null;

  const { duration, switchMarker } = transition;

  const msToPercent = (ms: number) => `${(ms / duration) * 100}%`;

  const getMs = useCallback((clientX: number): number => {
    const bar = barRef.current;
    if (!bar) return 0;
    const rect = bar.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    return Math.round(ratio * duration);
  }, [duration]);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!draggingMarker) return;
    const ms = getMs(e.clientX);
    if (draggingMarker === 'switch') setSwitchMarker(ms);
    else if (draggingMarker === 'playhead') setPlayhead(ms);
  }, [draggingMarker, getMs, setSwitchMarker, setPlayhead]);

  const onMouseUp = useCallback(() => setDraggingMarker(null), []);

  // Render ruler ticks
  const ticks: { ms: number; major: boolean }[] = [];
  const step = duration > 1000 ? 200 : 100;
  for (let t = 0; t <= duration; t += step) {
    ticks.push({ ms: t, major: t % (step * 5) === 0 });
  }

  return (
    <div style={{
      height: TIMELINE_HEIGHT,
      background: 'var(--color-surface)',
      borderTop: '1px solid var(--color-border)',
      display: 'flex',
      flexDirection: 'column',
      flexShrink: 0,
      userSelect: 'none',
    }}>
      {/* Controls row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 12px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <span style={{ fontSize: 9, fontWeight: 800, color: 'rgba(255,255,255,0.3)', letterSpacing: 0.5, textTransform: 'uppercase' }}>
          Timeline
        </span>
        <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-mono)' }}>
          {duration}ms total
        </span>
        <span style={{ fontSize: 8, color: SWITCH_COLOR, fontFamily: 'var(--font-mono)', marginLeft: 4 }}>
          ⊕ Switch @ {switchMarker}ms
        </span>
        {/* Duration input */}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)' }}>Duration:</span>
          <DurationInput
            value={duration}
            onChange={(v) => useTransitionStore.getState().setDuration(v)}
          />
          <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)' }}>ms</span>
        </div>
      </div>

      {/* Timeline bar */}
      <div
        ref={barRef}
        style={{ flex: 1, position: 'relative', cursor: draggingMarker ? 'grabbing' : 'crosshair' }}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onClick={(e) => {
          const ms = getMs(e.clientX);
          setPlayhead(ms);
        }}
      >
        {/* Ruler ticks */}
        {ticks.map(({ ms, major }) => (
          <div key={ms} style={{
            position: 'absolute',
            left: msToPercent(ms),
            top: 0,
            width: 1,
            height: major ? 10 : 5,
            background: major ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.08)',
          }}>
            {major && (
              <span style={{
                position: 'absolute',
                top: 10,
                left: '50%',
                transform: 'translateX(-50%)',
                fontSize: 8,
                color: 'rgba(255,255,255,0.3)',
                fontFamily: 'var(--font-mono)',
                whiteSpace: 'nowrap',
              }}>
                {ms}
              </span>
            )}
          </div>
        ))}

        {/* Background track */}
        <div style={{
          position: 'absolute',
          left: 0, right: 0,
          top: RULER_HEIGHT + 4,
          height: TRACK_HEIGHT - 8,
          background: 'rgba(255,255,255,0.03)',
          borderRadius: 4,
          margin: '0 8px',
        }}>
          {/* Pre-switch zone */}
          <div style={{
            position: 'absolute',
            left: 0,
            width: `${(switchMarker / duration) * 100}%`,
            top: 0, bottom: 0,
            background: `${ACCENT}18`,
            borderRadius: '4px 0 0 4px',
          }} />
          {/* Post-switch zone */}
          <div style={{
            position: 'absolute',
            left: `${(switchMarker / duration) * 100}%`,
            right: 0,
            top: 0, bottom: 0,
            background: 'rgba(92,255,226,0.08)',
            borderRadius: '0 4px 4px 0',
          }} />
        </div>

        {/* Switch marker vertical line */}
        <div
          style={{
            position: 'absolute',
            left: msToPercent(switchMarker),
            top: 0, bottom: 0,
            width: 2,
            background: SWITCH_COLOR,
            boxShadow: `0 0 8px ${SWITCH_COLOR}80`,
            cursor: 'col-resize',
            zIndex: 10,
          }}
          onMouseDown={(e) => {
            e.stopPropagation();
            setDraggingMarker('switch');
          }}
        >
          <div style={{
            position: 'absolute',
            top: 2,
            left: '50%',
            transform: 'translateX(-50%)',
            background: SWITCH_COLOR,
            borderRadius: 2,
            padding: '1px 4px',
            fontSize: 7,
            fontWeight: 800,
            color: '#fff',
            whiteSpace: 'nowrap',
            letterSpacing: 0.3,
          }}>
            SCENE SWITCH
          </div>
        </div>

        {/* Playhead */}
        <div
          style={{
            position: 'absolute',
            left: msToPercent(playheadMs),
            top: 0, bottom: 0,
            width: 2,
            background: '#fff',
            opacity: 0.7,
            cursor: 'col-resize',
            zIndex: 11,
          }}
          onMouseDown={(e) => {
            e.stopPropagation();
            setDraggingMarker('playhead');
          }}
        />
      </div>
    </div>
  );
};

// ─── Duration Input ───────────────────────────────────────────────────────────

const DurationInput: React.FC<{ value: number; onChange: (v: number) => void }> = ({ value, onChange }) => (
  <input
    type="number"
    value={value}
    min={100}
    max={10000}
    step={100}
    onChange={e => onChange(Math.max(100, parseInt(e.target.value) || 800))}
    style={{
      width: 60, padding: '2px 6px',
      background: 'var(--color-surface-2)',
      border: '1px solid var(--color-border)',
      borderRadius: 4, color: 'var(--color-text)',
      fontSize: 10, fontFamily: 'var(--font-mono)',
      outline: 'none', textAlign: 'center',
    }}
  />
);

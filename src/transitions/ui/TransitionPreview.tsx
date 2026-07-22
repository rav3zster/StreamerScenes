/**
 * TransitionPreview.tsx
 * Full end-to-end preview component: plays Scene A -> Transition Scene -> Scene B.
 */

import React, { useState, useMemo } from 'react';
import { Play, RotateCcw } from 'lucide-react';
import { useEditorStore } from '../../store/editorStore';
import { useTransitionStore } from '../../store/transitionStore';
import { TRANSITION_LIBRARY } from '../transitionLibrary';
import { SceneRenderer } from '../../renderer/SceneRenderer';
import { TransitionOverlay } from '../components/TransitionOverlay';

export const TransitionPreview: React.FC = () => {
  const scenes = useEditorStore(s => s.scenes);
  const startTransition = useTransitionStore(s => s.startTransition);
  const phase = useTransitionStore(s => s.phase);
  const editingTransitionId = useTransitionStore(s => s.editingTransitionId);
  const userTransitions = useTransitionStore(s => s.transitions);

  const [sourceIdx, setSourceIdx] = useState(0);
  const [targetIdx, setTargetIdx] = useState(scenes.length > 1 ? 1 : 0);
  const [activeSceneId, setActiveSceneId] = useState<string | null>(scenes[sourceIdx]?.id ?? null);

  const transition = useMemo(() => {
    if (!editingTransitionId) return null;
    return TRANSITION_LIBRARY.find(t => t.id === editingTransitionId) || userTransitions.find(t => t.id === editingTransitionId) || null;
  }, [editingTransitionId, userTransitions]);

  const handleTestSwitch = () => {
    if (!transition || scenes.length === 0) return;
    const fromScene = scenes[sourceIdx] || scenes[0];
    const toScene = scenes[targetIdx] || scenes[0];

    setActiveSceneId(fromScene.id);

    startTransition(
      transition.id,
      fromScene.id,
      toScene.id,
      () => {
        // Switch marker fired
        setActiveSceneId(toScene.id);
      }
    );
  };

  const currentScene = scenes.find(s => s.id === activeSceneId) || scenes[0];

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      padding: 10,
      background: 'var(--color-surface-2)',
      borderRadius: 8,
      border: '1px solid var(--color-border)',
    }}>
      <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--color-text)' }}>
        Scene Transition Simulator
      </div>

      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
        <select
          value={sourceIdx}
          onChange={e => setSourceIdx(parseInt(e.target.value))}
          style={{
            flex: 1,
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: 4,
            color: 'var(--color-text)',
            fontSize: 10,
            padding: '3px 6px',
          }}
        >
          {scenes.map((s, i) => (
            <option key={s.id} value={i}>From: {s.label}</option>
          ))}
        </select>

        <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>→</span>

        <select
          value={targetIdx}
          onChange={e => setTargetIdx(parseInt(e.target.value))}
          style={{
            flex: 1,
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: 4,
            color: 'var(--color-text)',
            fontSize: 10,
            padding: '3px 6px',
          }}
        >
          {scenes.map((s, i) => (
            <option key={s.id} value={i}>To: {s.label}</option>
          ))}
        </select>
      </div>

      <button
        onClick={handleTestSwitch}
        disabled={phase === 'playing' || !transition}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 6,
          background: 'linear-gradient(135deg, var(--color-accent), var(--color-accent-solid))',
          color: '#fff',
          border: 'none',
          borderRadius: 6,
          padding: '6px 12px',
          fontSize: 11,
          fontWeight: 700,
          cursor: 'pointer',
          opacity: phase === 'playing' ? 0.6 : 1,
        }}
      >
        <Play size={12} />
        Simulate Scene Switch
      </button>

      {/* Simulator canvas */}
      <div style={{
        width: '100%',
        height: 120,
        position: 'relative',
        background: '#000',
        borderRadius: 6,
        overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.1)',
      }}>
        {currentScene && (
          <SceneRenderer
            widgets={currentScene.widgets}
            zoom={120 / 1080}
            animated={true}
            timerSource="live"
          />
        )}
        <TransitionOverlay zoom={120 / 1080} />
      </div>
    </div>
  );
};

/**
 * SceneAssignmentPanel.tsx
 * Allows users to configure per-scene transitions (Transition In / Transition Out)
 * or choose a project default transition.
 */

import React from 'react';
import { Zap, Layers } from 'lucide-react';
import { useEditorStore } from '../../store/editorStore';
import { useTransitionStore } from '../../store/transitionStore';
import { TransitionPicker } from './TransitionPicker';

const ACCENT = '#a855f7';

export const SceneAssignmentPanel: React.FC = () => {
  const scenes = useEditorStore(s => s.scenes);
  const defaultTransitionId = useTransitionStore(s => s.defaultTransitionId);
  const setDefaultTransition = useTransitionStore(s => s.setDefaultTransition);
  const sceneAssignments = useTransitionStore(s => s.sceneAssignments);
  const setSceneAssignment = useTransitionStore(s => s.setSceneAssignment);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      padding: 12,
      background: 'var(--color-surface)',
      border: '1px solid var(--color-border)',
      borderRadius: 10,
      fontFamily: 'var(--font-sans)',
      color: 'var(--color-text)',
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 10, fontWeight: 800, color: 'var(--color-text-3)', letterSpacing: '0.05em' }}>
          SCENE TRANSITIONS
        </span>
        <Zap size={12} color={ACCENT} />
      </div>

      {/* Global Default Transition */}
      <div style={{
        background: 'var(--color-surface-2)',
        padding: 10,
        borderRadius: 8,
        border: '1px solid rgba(255,255,255,0.04)',
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
      }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--color-text)' }}>
          Project Default Transition
        </div>
        <p style={{ fontSize: 9, color: 'rgba(255,255,255,0.35)', margin: 0, lineHeight: 1.3 }}>
          Played whenever a scene switch occurs without a scene-specific override.
        </p>
        <TransitionPicker
          value={defaultTransitionId}
          onChange={(id) => setDefaultTransition(id)}
          noneLabel="None (Instant Switch)"
        />
      </div>

      <div style={{ height: 1, background: 'var(--color-border)' }} />

      {/* Per-Scene Overrides */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--color-text-muted)' }}>
          Per-Scene Overrides
        </div>

        {scenes.length === 0 ? (
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', textAlign: 'center', padding: '8px 0' }}>
            No scenes available in project.
          </div>
        ) : (
          scenes.map(scene => {
            const assignment = sceneAssignments.find(a => a.sceneId === scene.id) ?? {
              sceneId: scene.id,
              transitionInId: null,
              transitionOutId: null,
            };
            return (
              <div
                key={scene.id}
                style={{
                  background: 'var(--color-surface-2)',
                  padding: 8,
                  borderRadius: 6,
                  border: '1px solid rgba(255,255,255,0.03)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 6,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Layers size={10} color="var(--color-text-3)" />
                  <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--color-text)' }}>
                    {scene.label || scene.name}
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
                  <div>
                    <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.4)', marginBottom: 2 }}>
                      Transition In
                    </div>
                    <TransitionPicker
                      compact
                      value={assignment.transitionInId}
                      onChange={(id) => setSceneAssignment(scene.id, { transitionInId: id })}
                      noneLabel="Use Default"
                    />
                  </div>
                  <div>
                    <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.4)', marginBottom: 2 }}>
                      Transition Out
                    </div>
                    <TransitionPicker
                      compact
                      value={assignment.transitionOutId}
                      onChange={(id) => setSceneAssignment(scene.id, { transitionOutId: id })}
                      noneLabel="Use Default"
                    />
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

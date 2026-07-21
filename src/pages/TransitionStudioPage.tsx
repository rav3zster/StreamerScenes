/**
 * TransitionStudioPage.tsx
 * Standalone page for editing Scene Transitions in VibeOverlay Studio.
 * Mirrors the main EditorPage layout structure.
 */

import React, { useEffect } from 'react';
import { TransitionToolbar } from '../transitions/ui/TransitionToolbar';
import { TransitionLibraryPanel } from '../transitions/ui/TransitionLibraryPanel';
import { TransitionCanvas } from '../transitions/ui/TransitionCanvas';
import { TransitionInspector } from '../transitions/ui/TransitionInspector';
import { TransitionTimeline } from '../transitions/ui/TransitionTimeline';
import { useTransitionStore } from '../store/transitionStore';
import { TRANSITION_LIBRARY } from '../transitions/transitionLibrary';

export const TransitionStudioPage: React.FC = () => {
  const editingTransitionId = useTransitionStore(s => s.editingTransitionId);
  const setEditingTransition = useTransitionStore(s => s.setEditingTransition);

  // If no transition is being edited, select the first built-in template by default
  useEffect(() => {
    if (!editingTransitionId && TRANSITION_LIBRARY.length > 0) {
      setEditingTransition(TRANSITION_LIBRARY[0].id);
    }
  }, [editingTransitionId, setEditingTransition]);

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      background: 'var(--color-bg)',
      color: 'var(--color-text)',
      overflow: 'hidden',
      fontFamily: 'var(--font-sans)',
    }}>
      {/* Top Toolbar */}
      <TransitionToolbar />

      {/* Main Workspace (3 columns) */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden', position: 'relative' }}>
        {/* Left Panel — Library */}
        <div style={{
          width: 280,
          background: 'var(--color-surface)',
          borderRight: '1px solid var(--color-border)',
          display: 'flex',
          flexDirection: 'column',
          flexShrink: 0,
        }}>
          <TransitionLibraryPanel />
        </div>

        {/* Center — Canvas */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>
          <TransitionCanvas />
          {editingTransitionId && (
            <TransitionTimeline transitionId={editingTransitionId} />
          )}
        </div>

        {/* Right Panel — Inspector */}
        <div style={{
          width: 300,
          background: 'var(--color-surface)',
          borderLeft: '1px solid var(--color-border)',
          display: 'flex',
          flexDirection: 'column',
          flexShrink: 0,
        }}>
          <TransitionInspector />
        </div>
      </div>
    </div>
  );
};

export default TransitionStudioPage;

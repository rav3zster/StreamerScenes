/**
 * TransitionToolbar.tsx
 * Top toolbar for the Transition Studio page.
 * Includes back button, transition name/description, preview trigger, save, and duplicate.
 */

import React, { useState, useMemo } from 'react';
import { ArrowLeft, Play, Pause, Save, Copy, Zap, Check } from 'lucide-react';
import { useEditorStore } from '../../store/editorStore';
import { useTransitionStore } from '../../store/transitionStore';
import { TRANSITION_LIBRARY } from '../transitionLibrary';
import { transitionRuntime } from '../transitionRuntime';

const ACCENT = '#a855f7';

export const TransitionToolbar: React.FC = () => {
  const setAppView = useEditorStore(s => s.setAppView);
  const editingTransitionId = useTransitionStore(s => s.editingTransitionId);
  const userTransitions = useTransitionStore(s => s.transitions);
  const setName = useTransitionStore(s => s.setName);
  const duplicateTransition = useTransitionStore(s => s.duplicateTransition);
  const setEditingTransition = useTransitionStore(s => s.setEditingTransition);

  const [isPlaying, setIsPlaying] = useState(false);
  const [saveFlash, setSaveFlash] = useState(false);

  const transition = useMemo(() => {
    if (!editingTransitionId) return null;
    return TRANSITION_LIBRARY.find(t => t.id === editingTransitionId) || userTransitions.find(t => t.id === editingTransitionId) || null;
  }, [editingTransitionId, userTransitions]);

  const handleBack = () => {
    transitionRuntime.cancel();
    setAppView('editor');
  };

  const handlePreview = () => {
    if (!transition) return;
    if (isPlaying) {
      transitionRuntime.cancel();
      setIsPlaying(false);
      return;
    }

    setIsPlaying(true);
    transitionRuntime.start(
      transition,
      () => {
        // Scene switch marker point reached during preview
      },
      () => {
        setIsPlaying(false);
      },
      () => {}
    );
  };

  const handleSave = () => {
    setSaveFlash(true);
    setTimeout(() => setSaveFlash(false), 1200);
  };

  const handleDuplicate = () => {
    if (!transition) return;
    const newId = duplicateTransition(transition.id);
    setEditingTransition(newId);
  };

  return (
    <div style={{
      height: 48,
      background: 'var(--color-surface)',
      borderBottom: '1px solid var(--color-border)',
      display: 'flex',
      alignItems: 'center',
      padding: '0 16px',
      justifyContent: 'space-between',
      gap: 12,
      zIndex: 100,
      flexShrink: 0,
    }}>
      {/* Left section: Back & Name */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <button
          onClick={handleBack}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            background: 'var(--color-surface-2)',
            border: '1px solid var(--color-border)',
            borderRadius: 6,
            color: 'var(--color-text)',
            fontSize: 11,
            fontWeight: 600,
            padding: '5px 10px',
            cursor: 'pointer',
            transition: 'all 80ms ease',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-border-hover)'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--color-border)'; }}
        >
          <ArrowLeft size={13} /> Return to Editor
        </button>

        <div style={{ height: 16, width: 1, background: 'var(--color-border)' }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Zap size={14} color={ACCENT} />
          {transition ? (
            <input
              type="text"
              value={transition.name}
              disabled={transition.isTemplate}
              onChange={e => setName(e.target.value)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#fff',
                fontSize: 14,
                fontWeight: 700,
                outline: 'none',
                width: 220,
              }}
            />
          ) : (
            <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>No Transition Selected</span>
          )}
          {transition?.isTemplate && (
            <span style={{
              fontSize: 9,
              fontWeight: 800,
              color: '#f59e0b',
              background: 'rgba(245,158,11,0.15)',
              padding: '2px 6px',
              borderRadius: 4,
              letterSpacing: 0.5,
              textTransform: 'uppercase',
            }}>
              Template (Read Only)
            </span>
          )}
        </div>
      </div>

      {/* Right section: Play preview, duplicate, save */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <button
          onClick={handlePreview}
          disabled={!transition}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            background: isPlaying ? 'rgba(239,68,68,0.2)' : `${ACCENT}25`,
            border: `1px solid ${isPlaying ? '#ef4444' : ACCENT}`,
            borderRadius: 6,
            color: isPlaying ? '#ef4444' : '#fff',
            fontSize: 11,
            fontWeight: 700,
            padding: '6px 14px',
            cursor: 'pointer',
            transition: 'all 120ms ease',
          }}
        >
          {isPlaying ? <Pause size={13} /> : <Play size={13} />}
          {isPlaying ? 'Stop Preview' : 'Play Transition'}
        </button>

        {transition?.isTemplate ? (
          <button
            onClick={handleDuplicate}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              background: 'var(--color-surface-2)',
              border: '1px solid var(--color-border)',
              borderRadius: 6,
              color: 'var(--color-text)',
              fontSize: 11,
              fontWeight: 600,
              padding: '6px 12px',
              cursor: 'pointer',
            }}
          >
            <Copy size={13} /> Duplicate to Edit
          </button>
        ) : (
          <button
            onClick={handleSave}
            disabled={!transition}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              background: saveFlash ? 'rgba(16,185,129,0.2)' : 'var(--color-surface-2)',
              border: `1px solid ${saveFlash ? '#10b981' : 'var(--color-border)'}`,
              borderRadius: 6,
              color: saveFlash ? '#10b981' : 'var(--color-text)',
              fontSize: 11,
              fontWeight: 600,
              padding: '6px 12px',
              cursor: 'pointer',
              transition: 'all 120ms ease',
            }}
          >
            {saveFlash ? <Check size={13} /> : <Save size={13} />}
            {saveFlash ? 'Saved!' : 'Save'}
          </button>
        )}
      </div>
    </div>
  );
};

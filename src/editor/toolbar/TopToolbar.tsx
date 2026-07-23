import React, { useState, useRef, useEffect } from 'react';
import {
  Undo2, Redo2, Eye, Save, Radio, ChevronRight, Maximize2,
  ChevronDown, FolderOpen, FilePlus, Sun, Moon, Monitor as MonitorIcon,
  Download, Copy, Zap, ArrowLeft,
} from 'lucide-react';
import { useEditorStore } from '../../store/editorStore';
import { useTransitionStore } from '../../store/transitionStore';
import { SceneTransitioner } from '../../renderer/SceneTransitioner';
import { TransitionOverlay } from '../../transitions/components/TransitionOverlay';

import { persistenceService } from '../../persistence/persistenceService';
import { notify } from '../../components/ToastContainer';

export const TopToolbar: React.FC = () => {
  const {
    undo, redo,
    scenes, liveScenes, editingSceneId, liveSceneId, setLiveScene, switchDraftToLive,
    projectName, showPreviewMode, togglePreviewMode,
    startPreviewTimer, resetPreviewTimer,
    setAppView,
    editorTheme, setEditorTheme,
  } = useEditorStore();

  // Subscribe to history state so undo/redo enable state updates reactively.
  // canUndo/canRedo are store functions; recompute them against live history.
  const undoEnabled = useEditorStore(s => {
    const id = s.editingSceneId ?? '';
    return (s.historyIndex[id] ?? 0) > 0;
  });
  const redoEnabled = useEditorStore(s => {
    const id = s.editingSceneId ?? '';
    return (s.historyIndex[id] ?? 0) < (s.history[id]?.length ?? 1) - 1;
  });

  const isSynced = JSON.stringify(scenes) === JSON.stringify(liveScenes);

  const [saveFlash, setSaveFlash] = useState(false);
  const [fileMenuOpen, setFileMenuOpen] = useState(false);
  const fileMenuRef = useRef<HTMLDivElement>(null);

  const editingScene = scenes.find(s => s.id === editingSceneId);
  const isLive = editingSceneId === liveSceneId;

  const handleSave = () => {
    setSaveFlash(true);
    setTimeout(() => setSaveFlash(false), 1200);
    const ts = useTransitionStore.getState();
    persistenceService.saveProject({
      projectName: useEditorStore.getState().projectName,
      scenes: useEditorStore.getState().scenes,
      liveSceneId: useEditorStore.getState().liveSceneId,
      editingSceneId: useEditorStore.getState().editingSceneId,
      transitions: ts.transitions,
      defaultTransitionId: ts.defaultTransitionId,
      sceneTransitionAssignments: ts.sceneAssignments,
      updatedAt: Date.now(),
    });
    notify('Project saved successfully', 'success');
  };

  const handleGoLive = () => {
    if (editingSceneId) setLiveScene(editingSceneId);
  };

  const handleTogglePreview = React.useCallback(() => {
    const nextPreviewMode = !showPreviewMode;
    togglePreviewMode();

    if (nextPreviewMode) {
      // Find the countdown timer widget in the current editing scene
      const currentEditingScene = scenes.find(s => s.id === editingSceneId);
      const widget = currentEditingScene?.widgets.find(w => w.type === 'countdown-timer');

      if (widget) {
        const startDur = widget.content.settings?.duration ?? 600;
        const startBehavior = widget.content.settings?.finishBehavior ?? 'freeze';

        startPreviewTimer(startDur, startBehavior, {
          replaceText: widget.content.settings?.replaceText ?? '',
          replaceTransition: widget.content.settings?.replaceTransition ?? 'none',
          switchTargetSceneId: widget.content.settings?.switchTargetSceneId ?? null,
        });
      } else {
        // Reset preview timer to default
        resetPreviewTimer(600);
      }
    } else {
      // Pause/reset the preview timer when exiting preview mode
      resetPreviewTimer();
    }
  }, [showPreviewMode, togglePreviewMode, scenes, editingSceneId, startPreviewTimer, resetPreviewTimer]);

  const handleNewProject = () => {
    setFileMenuOpen(false);
    setAppView('welcome');
  };

  const handleBrowsePacks = () => {
    setFileMenuOpen(false);
    setAppView('pack-browser');
  };

  const handleExport = () => {
    setFileMenuOpen(false);
    const state = useEditorStore.getState();
    const data = JSON.stringify({
      projectName: state.projectName,
      scenes: state.scenes,
      liveSceneId: state.liveSceneId,
      editingSceneId: state.editingSceneId,
      exportedAt: new Date().toISOString(),
    }, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${state.projectName.replace(/\s+/g, '-')}.vibe.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopyOBS = () => {
    setFileMenuOpen(false);
    navigator.clipboard.writeText('http://localhost:5173/output');
  };

  const toggleEditorTheme = () => {
    const next = editorTheme === 'dark' ? 'light' : 'dark';
    setEditorTheme(next);
    const shell = document.querySelector('.app-shell');
    if (shell) {
      shell.classList.toggle('theme-editor-light', next === 'light');
    }
  };

  // Close file menu on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (fileMenuRef.current && !fileMenuRef.current.contains(e.target as Node)) {
        setFileMenuOpen(false);
      }
    };
    if (fileMenuOpen) document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [fileMenuOpen]);

  // Listen for Escape key on window to exit preview mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showPreviewMode) {
        handleTogglePreview();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showPreviewMode, handleTogglePreview]);

  return (
    <div className="top-toolbar">
      {/* ── File Menu ────────────────────────────────────────────── */}
      <div ref={fileMenuRef} style={{ position: 'relative', flexShrink: 0 }}>
        <button
          id="toolbar-file-menu"
          onClick={() => setFileMenuOpen(v => !v)}
          style={{
            display: 'flex', alignItems: 'center', gap: 5,
            background: fileMenuOpen ? 'var(--color-surface-2)' : 'transparent',
            border: '1px solid transparent',
            borderRadius: 7, padding: '5px 10px',
            color: fileMenuOpen ? 'var(--color-text)' : 'var(--color-text-2)',
            fontSize: 12, fontWeight: 600,
            cursor: 'pointer', transition: 'all 100ms ease',
            fontFamily: 'var(--font-sans)',
          }}
          onMouseEnter={e => { if (!fileMenuOpen) e.currentTarget.style.background = 'var(--color-surface-2)'; }}
          onMouseLeave={e => { if (!fileMenuOpen) e.currentTarget.style.background = 'transparent'; }}
        >
          File <ChevronDown size={11} />
        </button>

        {fileMenuOpen && (
          <div className="dropdown-menu" style={{ position: 'absolute', top: 'calc(100% + 6px)', left: 0, minWidth: 200, zIndex: 99999 }}>
            <FileMenuItem icon={<FilePlus size={13} />} label="New Project" shortcut="⌘N" onClick={handleNewProject} />
            <FileMenuItem icon={<FolderOpen size={13} />} label="Browse Broadcast Packs" onClick={handleBrowsePacks} />
            <div style={{ height: 1, background: 'var(--color-border)', margin: '4px 0' }} />
            <FileMenuItem icon={<Save size={13} />} label="Save" shortcut="⌘S" onClick={() => { handleSave(); setFileMenuOpen(false); }} />
            <FileMenuItem icon={<Download size={13} />} label="Export Project (.json)" onClick={handleExport} />
            <div style={{ height: 1, background: 'var(--color-border)', margin: '4px 0' }} />
            <FileMenuItem icon={<MonitorIcon size={13} />} label="OBS Setup Guide" onClick={() => { setFileMenuOpen(false); useEditorStore.getState().setAppView('obs-setup'); }} />
            <FileMenuItem icon={<Copy size={13} />} label="Copy OBS Endpoint URL" onClick={handleCopyOBS} />
            <FileMenuItem icon={<MonitorIcon size={13} />} label="Open OBS Output" onClick={() => { setFileMenuOpen(false); window.open('/output', '_blank'); }} />
          </div>
        )}
      </div>

      {/* ── Logo + Brand (Nothing Dot-Matrix Style) ──────────────── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginLeft: 4, flexShrink: 0 }}>
        {/* Nothing-style 4x4 Dot Matrix Icon */}
        <div style={{
          width: 26, height: 26,
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2,
          padding: 3,
        }} title="StreamScenes">
          {Array.from({ length: 16 }).map((_, i) => {
            const redDots = [5, 6, 9, 10]; // center 2x2
            return (
              <div key={i} style={{
                borderRadius: '50%',
                background: redDots.includes(i) ? '#FF3A30' : 'rgba(255,255,255,0.2)',
                boxShadow: redDots.includes(i) ? '0 0 4px rgba(255,58,48,0.7)' : 'none',
              }} />
            );
          })}
        </div>
        <span className="vibe-font-pixel" style={{ fontSize: 12, fontWeight: 700, color: '#e0e0e0', letterSpacing: '0.06em' }}>
          StreamScenes
        </span>
      </div>

      <div className="toolbar-spacer" />

      {/* ── Right Actions (Nothing brand) ──────────────────────────── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        {/* Theme toggle — Moon = currently dark, click to go light; Sun = currently light, click to go dark */}
        <button
          className="btn-icon"
          style={{ width: 32, height: 32 }}
          onClick={toggleEditorTheme}
          title={editorTheme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {editorTheme === 'dark' ? <Moon size={14} /> : <Sun size={14} />}
        </button>

        {/* Undo / Redo */}
        <div style={{ display: 'flex', gap: 2 }}>
          <button
            className="btn-icon"
            style={{ width: 32, height: 32, opacity: undoEnabled ? 1 : 0.35 }}
            onClick={() => undoEnabled && undo()}
            disabled={!undoEnabled}
            title="Undo (Ctrl+Z)"
          >
            <Undo2 size={14} />
          </button>
          <button
            className="btn-icon"
            style={{ width: 32, height: 32, opacity: redoEnabled ? 1 : 0.35 }}
            onClick={() => redoEnabled && redo()}
            disabled={!redoEnabled}
            title="Redo (Ctrl+Y)"
          >
            <Redo2 size={14} />
          </button>
        </div>

        {/* Preview pill */}
        <button
          className={`vibe-pill-btn${showPreviewMode ? ' active' : ''}`}
          onClick={handleTogglePreview}
          title="Preview Mode"
        >
          <Eye size={13} />
          <span>Preview</span>
        </button>

        {/* Save pill */}
        <button
          className="vibe-pill-btn"
          onClick={handleSave}
          title="Save Project"
        >
          <Save size={13} />
          <span>{saveFlash ? 'Saved!' : 'Save'}</span>
        </button>

        {/* Live Synced red pill */}
        <button
          id="toolbar-go-live"
          className="vibe-live-pill"
          onClick={switchDraftToLive}
          disabled={!editingSceneId}
          title="Live Synced"
        >
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#ff3b30', animation: 'live-pulse 2s ease-in-out infinite' }} />
          <span>((•)) LIVE (SYNCED)</span>
        </button>
      </div>

      {/* Preview Mode Overlay — works like OutputPage with back button */}
      {showPreviewMode && (
        <div
          onClick={handleTogglePreview}
          style={{
            position: 'fixed',
            inset: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 99999,
            background: '#000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
          title="Click background to exit preview"
        >
          {/* Top-right exit button */}
          <div style={{ position: 'absolute', top: 16, right: 16, zIndex: 100000, display: 'flex', gap: 8 }} onClick={e => e.stopPropagation()}>
            <button
              onClick={handleTogglePreview}
              style={{
                background: 'rgba(255,255,255,0.15)',
                border: '1px solid rgba(255,255,255,0.3)',
                color: '#fff',
                borderRadius: 8,
                padding: '8px 18px',
                cursor: 'pointer',
                fontSize: 12,
                fontWeight: 700,
                fontFamily: 'var(--font-sans)',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                transition: 'all var(--transition-fast)',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.25)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.15)'; }}
            >
              <Maximize2 size={13} /> Exit Preview (Esc)
            </button>
          </div>

          {/* Bottom-left back button matching OutputPage design */}
          <button
            onClick={e => {
              e.stopPropagation();
              handleTogglePreview();
            }}
            style={{
              position: 'absolute',
              bottom: 20,
              left: 20,
              zIndex: 100000,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              background: 'rgba(12,10,26,0.9)',
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: 8,
              padding: '8px 16px',
              color: '#fff',
              fontSize: 12,
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 4px 16px rgba(0,0,0,0.6)',
              transition: 'all 0.15s ease',
              opacity: 0.85,
            }}
            onMouseEnter={e => {
              e.currentTarget.style.opacity = '1';
              e.currentTarget.style.background = 'var(--color-accent)';
              e.currentTarget.style.borderColor = 'var(--color-accent)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.opacity = '0.85';
              e.currentTarget.style.background = 'rgba(12,10,26,0.9)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
            }}
          >
            <ArrowLeft size={13} /> Return to Studio
          </button>

          <div onClick={e => e.stopPropagation()} style={{ cursor: 'default' }}>
            <PreviewCanvas />
          </div>
        </div>
      )}
    </div>
  );
};

// ── File Menu Item ────────────────────────────────────────────────────────────

const FileMenuItem: React.FC<{ icon: React.ReactNode; label: string; shortcut?: string; onClick: () => void }> = ({ icon, label, shortcut, onClick }) => (
  <button className="dropdown-item focus-ring" onClick={onClick}>
    <span style={{ color: 'var(--color-text-muted)', flexShrink: 0, display: 'flex', alignItems: 'center' }}>{icon}</span>
    <span style={{ flex: 1 }}>{label}</span>
    {shortcut && <span style={{ fontSize: 10, color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}>{shortcut}</span>}
  </button>
);

// ── Preview Canvas ────────────────────────────────────────────────────────────
import { CANVAS_W, CANVAS_H } from '../canvas/EditorCanvas';

const PreviewCanvas: React.FC = () => {
  const { scenes, editingSceneId, liveTransitionType, liveTransitionDuration } = useEditorStore();
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      const s = Math.min(window.innerWidth / CANVAS_W, window.innerHeight / CANVAS_H);
      setScale(s);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div style={{
      width: `${CANVAS_W * scale}px`,
      height: `${CANVAS_H * scale}px`,
      position: 'relative',
      overflow: 'hidden',
    }}>
      <SceneTransitioner
        activeSceneId={editingSceneId}
        scenes={scenes}
        zoom={scale}
        animated={true}
        timerSource="preview"
        transitionType={liveTransitionType}
        transitionDuration={liveTransitionDuration}
      />
      <TransitionOverlay zoom={scale} />
    </div>
  );
};

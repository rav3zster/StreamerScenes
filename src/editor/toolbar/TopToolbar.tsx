import React, { useState, useRef, useEffect } from 'react';
import {
  Undo2, Redo2, ZoomIn, ZoomOut, Grid3x3, Magnet, Ruler,
  Eye, Save, Radio, ChevronRight, Layers, Maximize2,
  ChevronDown, FolderOpen, FilePlus, Sun, Moon, Monitor as MonitorIcon,
  Download, Copy,
} from 'lucide-react';
import { useEditorStore } from '../../store/editorStore';

import { persistenceService } from '../../persistence/persistenceService';

export const TopToolbar: React.FC = () => {
  const {
    zoom, setZoom, zoomIn, zoomOut, resetView,
    snapEnabled, gridMode, showGuides, toggleSnap, setGridMode, toggleGuides,
    canUndo, canRedo, undo, redo,
    scenes, editingSceneId, liveSceneId, setLiveScene,
    projectName, showPreviewMode, togglePreviewMode,
    setAppView,
  } = useEditorStore();

  const [saveFlash, setSaveFlash] = useState(false);
  const [fileMenuOpen, setFileMenuOpen] = useState(false);
  const [editorTheme, setEditorTheme] = useState<'dark' | 'light'>('dark');
  const fileMenuRef = useRef<HTMLDivElement>(null);

  const editingScene = scenes.find(s => s.id === editingSceneId);
  const isLive = editingSceneId === liveSceneId;
  const zoomPct = Math.round(zoom * 100);

  const showGrid = gridMode !== 'off';
  const toggleGrid = () => {
    setGridMode(gridMode === 'off' ? 'dots' : gridMode === 'dots' ? 'lines' : 'off');
  };

  const handleSave = () => {
    setSaveFlash(true);
    setTimeout(() => setSaveFlash(false), 1200);
    persistenceService.saveProject({
      projectName: useEditorStore.getState().projectName,
      scenes: useEditorStore.getState().scenes,
      liveSceneId: useEditorStore.getState().liveSceneId,
      editingSceneId: useEditorStore.getState().editingSceneId,
      updatedAt: Date.now(),
    });
  };

  const handleGoLive = () => {
    if (editingSceneId) setLiveScene(editingSceneId);
  };

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
          <div style={{
            position: 'absolute', top: 'calc(100% + 6px)', left: 0,
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: 10, padding: '5px',
            boxShadow: '0 16px 40px rgba(0,0,0,0.6)',
            minWidth: 200, zIndex: 99999,
            animation: 'slide-up 150ms ease',
          }}>
            <FileMenuItem icon={<FilePlus size={13} />} label="New Project" shortcut="⌘N" onClick={handleNewProject} />
            <FileMenuItem icon={<FolderOpen size={13} />} label="Browse Broadcast Packs" onClick={handleBrowsePacks} />
            <div style={{ height: 1, background: 'var(--color-border)', margin: '4px 0' }} />
            <FileMenuItem icon={<Save size={13} />} label="Save" shortcut="⌘S" onClick={() => { handleSave(); setFileMenuOpen(false); }} />
            <FileMenuItem icon={<Download size={13} />} label="Export Project (.json)" onClick={handleExport} />
            <div style={{ height: 1, background: 'var(--color-border)', margin: '4px 0' }} />
            <FileMenuItem icon={<Copy size={13} />} label="Copy OBS Endpoint URL" onClick={handleCopyOBS} />
            <FileMenuItem icon={<MonitorIcon size={13} />} label="Open OBS Output" onClick={() => { setFileMenuOpen(false); window.open('/output', '_blank'); }} />
          </div>
        )}
      </div>

      {/* ── Logo + Brand ─────────────────────────────────────────── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginLeft: 4, marginRight: 4, flexShrink: 0 }}>
        <div style={{
          width: 26, height: 26, borderRadius: 7,
          background: 'linear-gradient(135deg,#a855f7,#ec4899)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 0 10px rgba(168,85,247,0.4)',
          fontSize: 13, flexShrink: 0,
        }}>
          ⚡
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
          <span style={{ fontFamily: 'Outfit, sans-serif', fontSize: 11, fontWeight: 800, color: 'var(--color-text)', letterSpacing: -0.3 }}>VibeOverlay</span>
          <span style={{ fontSize: 8, color: 'var(--color-text-muted)', fontWeight: 600, letterSpacing: 0.5 }}>STUDIO</span>
        </div>
      </div>

      <div className="toolbar-divider" />

      {/* ── Breadcrumb ─────────────────────────────────────────── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: 'var(--color-text-muted)', flexShrink: 0 }}>
        <span style={{ color: 'var(--color-text-3)', fontWeight: 500 }}>{projectName}</span>
        <ChevronRight size={12} />
        <span style={{ color: 'var(--color-text-2)', fontWeight: 600 }}>
          {editingScene?.label ?? 'No Scene'}
        </span>
        {isLive && (
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 4,
            background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.3)',
            borderRadius: 99, padding: '1px 7px', fontSize: 9,
            color: '#ef4444', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', marginLeft: 4,
          }}>
            <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#ef4444', animation: 'live-pulse 2s ease-in-out infinite' }} />
            LIVE
          </span>
        )}
      </div>

      <div className="toolbar-spacer" />

      {/* ── History ────────────────────────────────────────────── */}
      <div style={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        <button className="btn-icon" onClick={undo} disabled={!canUndo()} data-tooltip="Undo (⌘Z)" title="Undo">
          <Undo2 size={14} />
        </button>
        <button className="btn-icon" onClick={redo} disabled={!canRedo()} data-tooltip="Redo (⌘Y)" title="Redo">
          <Redo2 size={14} />
        </button>
      </div>

      <div className="toolbar-divider" />

      {/* ── Zoom ───────────────────────────────────────────────── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <button className="btn-icon" onClick={zoomOut} title="Zoom Out">
          <ZoomOut size={14} />
        </button>
        <button
          onClick={resetView}
          title="Reset View (click to fit)"
          style={{
            background: 'var(--color-surface-2)',
            border: '1px solid var(--color-border)',
            borderRadius: 6, cursor: 'pointer',
            color: 'var(--color-text-3)', fontSize: 11,
            fontFamily: 'var(--font-mono)', padding: '3px 8px',
            minWidth: 52, textAlign: 'center',
            transition: 'all 80ms ease',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-border-hover)'; e.currentTarget.style.color = 'var(--color-text)'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.color = 'var(--color-text-3)'; }}
        >
          {zoomPct}%
        </button>
        <button className="btn-icon" onClick={zoomIn} title="Zoom In">
          <ZoomIn size={14} />
        </button>
      </div>

      <div className="toolbar-divider" />

      {/* ── Canvas toggles ─────────────────────────────────────── */}
      <div style={{ display: 'flex', gap: 2 }}>
        <button className={`btn-icon${showGrid ? ' active' : ''}`} onClick={toggleGrid} data-tooltip="Grid" title="Toggle Grid">
          <Grid3x3 size={14} />
        </button>
        <button className={`btn-icon${snapEnabled ? ' active' : ''}`} onClick={toggleSnap} data-tooltip="Snap" title="Toggle Snap">
          <Magnet size={14} />
        </button>
        <button className={`btn-icon${showGuides ? ' active' : ''}`} onClick={toggleGuides} data-tooltip="Guides" title="Toggle Guides">
          <Ruler size={14} />
        </button>
      </div>

      <div className="toolbar-divider" />

      {/* ── Layers toggle ──────────────────────────────────────── */}
      <button className="btn-icon" title="Layers" onClick={() => useEditorStore.getState().setLeftTab('layers')}>
        <Layers size={14} />
      </button>

      <div className="toolbar-spacer" />

      {/* ── Right actions ──────────────────────────────────────── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        {/* Editor theme toggle */}
        <button
          id="toolbar-theme-toggle"
          className="btn-icon"
          onClick={toggleEditorTheme}
          title={editorTheme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {editorTheme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
        </button>

        <div className="toolbar-divider" />

        {/* Preview */}
        <button
          className={`btn btn-secondary${showPreviewMode ? ' active' : ''}`}
          style={{ gap: 6, fontSize: 11 }}
          onClick={togglePreviewMode}
          title="Preview Mode"
        >
          <Eye size={13} />
          Preview
        </button>

        {/* Save */}
        <button
          className="btn btn-secondary"
          style={{ gap: 6, fontSize: 11, ...(saveFlash ? { borderColor: '#10b981', color: '#10b981' } : {}) }}
          onClick={handleSave}
          title="Save (auto-saved)"
        >
          <Save size={13} />
          {saveFlash ? 'Saved!' : 'Save'}
        </button>

        {/* Go Live */}
        <button
          id="toolbar-go-live"
          onClick={handleGoLive}
          disabled={!editingSceneId}
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '6px 14px', borderRadius: 8,
            border: 'none', cursor: 'pointer',
            background: isLive
              ? 'rgba(239,68,68,0.15)'
              : 'linear-gradient(135deg,#ef4444,#dc2626)',
            color: isLive ? '#ef4444' : '#fff',
            fontSize: 11, fontWeight: 800,
            letterSpacing: '0.06em', textTransform: 'uppercase',
            boxShadow: isLive ? 'none' : '0 4px 14px rgba(239,68,68,0.3)',
            transition: 'all 150ms ease',
            fontFamily: 'var(--font-sans)',
          }}
          onMouseEnter={e => { if (!isLive) e.currentTarget.style.filter = 'brightness(1.1)'; }}
          onMouseLeave={e => { e.currentTarget.style.filter = ''; }}
        >
          <Radio size={13} />
          {isLive ? 'Live Now' : 'Go Live'}
        </button>
      </div>

      {/* Preview Mode Overlay */}
      {showPreviewMode && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: '#000',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
          }}
          onKeyDown={e => { if (e.key === 'Escape') togglePreviewMode(); }}
          tabIndex={0}
        >
          <div style={{ position: 'absolute', top: 16, right: 16, zIndex: 10000, display: 'flex', gap: 8 }}>
            <button
              onClick={togglePreviewMode}
              style={{
                background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
                color: '#fff', borderRadius: 8, padding: '6px 16px', cursor: 'pointer',
                fontSize: 12, fontWeight: 600, fontFamily: 'var(--font-sans)',
                display: 'flex', alignItems: 'center', gap: 6,
              }}
            >
              <Maximize2 size={13} /> Exit Preview
            </button>
          </div>
          <PreviewCanvas />
        </div>
      )}
    </div>
  );
};

// ── File Menu Item ────────────────────────────────────────────────────────────

const FileMenuItem: React.FC<{ icon: React.ReactNode; label: string; shortcut?: string; onClick: () => void }> = ({ icon, label, shortcut, onClick }) => (
  <button
    onClick={onClick}
    style={{
      display: 'flex', alignItems: 'center', gap: 9,
      width: '100%', padding: '7px 10px', borderRadius: 6,
      background: 'transparent', border: 'none',
      color: 'var(--color-text-2)', fontSize: 12, fontWeight: 500,
      cursor: 'pointer', transition: 'all 100ms ease',
      fontFamily: 'var(--font-sans)', textAlign: 'left',
    }}
    onMouseEnter={e => {
      e.currentTarget.style.background = 'var(--color-surface-2)';
      e.currentTarget.style.color = 'var(--color-text)';
    }}
    onMouseLeave={e => {
      e.currentTarget.style.background = 'transparent';
      e.currentTarget.style.color = 'var(--color-text-2)';
    }}
  >
    <span style={{ color: 'var(--color-text-muted)', flexShrink: 0 }}>{icon}</span>
    <span style={{ flex: 1 }}>{label}</span>
    {shortcut && <span style={{ fontSize: 10, color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}>{shortcut}</span>}
  </button>
);

// ── Preview Canvas ────────────────────────────────────────────────────────────
import { CANVAS_W, CANVAS_H } from '../canvas/EditorCanvas';
import { SceneRenderer } from '../../renderer/SceneRenderer';

const PreviewCanvas: React.FC = () => {
  const { getDraftWidgets } = useEditorStore();
  const widgets = getDraftWidgets();
  const scale = Math.min(window.innerWidth / CANVAS_W, window.innerHeight / CANVAS_H);

  return (
    <div style={{
      width: CANVAS_W * scale, height: CANVAS_H * scale,
      position: 'relative', overflow: 'hidden',
      boxShadow: '0 0 0 1px rgba(255,255,255,0.1), 0 40px 100px rgba(0,0,0,0.8)',
    }}>
      <SceneRenderer
        widgets={widgets}
        zoom={scale}
        animated={true}
      />
    </div>
  );
};

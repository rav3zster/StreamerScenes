import React, { useState } from 'react';
import {
  Undo2, Redo2, ZoomIn, ZoomOut, Grid3x3, Magnet, Ruler,
  Eye, Save, Radio, ChevronRight, Layers, Maximize2,
} from 'lucide-react';
import { useEditorStore } from '../../store/editorStore';

export const TopToolbar: React.FC = () => {
  const {
    zoom, setZoom, zoomIn, zoomOut, resetView,
    snapEnabled, gridMode, showGuides, toggleSnap, setGridMode, toggleGuides,
    canUndo, canRedo, undo, redo,
    scenes, editingSceneId, liveSceneId, setLiveScene,
    projectName, showPreviewMode, togglePreviewMode,
  } = useEditorStore();

  const [saveFlash, setSaveFlash] = useState(false);
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
    // Project auto-saves via store — this is visual feedback only
  };

  const handleGoLive = () => {
    if (editingSceneId) setLiveScene(editingSceneId);
  };

  return (
    <div className="top-toolbar">
      {/* ── Logo + Brand ─────────────────────────────────────── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginRight: 4, flexShrink: 0 }}>
        <div style={{
          width: 30, height: 30, borderRadius: 8,
          background: 'linear-gradient(135deg,#a855f7,#ec4899)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 0 12px rgba(168,85,247,0.4)',
          fontSize: 14, flexShrink: 0,
        }}>
          ⚡
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
          <span style={{ fontFamily: 'Outfit, sans-serif', fontSize: 12, fontWeight: 800, color: 'var(--color-text)', letterSpacing: -0.3 }}>VibeOverlay</span>
          <span style={{ fontSize: 9, color: 'var(--color-text-muted)', fontWeight: 600, letterSpacing: 0.5 }}>STUDIO</span>
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
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
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

// ── Preview Canvas ────────────────────────────────────────────────────────────
import { CANVAS_W, CANVAS_H } from '../canvas/EditorCanvas';
import { WidgetRenderer } from '../canvas/WidgetRenderer';

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
      {[...widgets].sort((a, b) => a.zIndex - b.zIndex).map(w => (
        <div key={w.id} style={{
          position: 'absolute',
          left: w.x * scale, top: w.y * scale,
          width: w.width * scale, height: w.height * scale,
          transform: `rotate(${w.rotation}deg)`,
          opacity: w.visible ? w.opacity / 100 : 0,
          zIndex: w.zIndex,
          transformOrigin: 'top left',
          overflow: 'hidden',
          borderRadius: w.style?.borderRadius ? `${w.style.borderRadius * scale}px` : 0,
        }}>
          <WidgetRenderer widget={w} zoom={scale} />
        </div>
      ))}
    </div>
  );
};

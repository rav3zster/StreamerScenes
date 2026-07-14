import React, { useState, useRef, useEffect } from 'react';
import { ZoomIn, ZoomOut, Grid3x3, Magnet, Monitor, Eye } from 'lucide-react';
import { useEditorStore, type GridMode } from '../../store/editorStore';
import { CANVAS_W, CANVAS_H } from '../canvas/EditorCanvas';

export const BottomStatusBar: React.FC = () => {
  const {
    zoom, snapEnabled, gridMode, showGuides, showRulers,
    setZoom, zoomIn, zoomOut, zoomToFit, zoomToSelection,
    selectedIds, getDraftWidgets, setGridMode,
    toggleSnap, toggleGuides, toggleRulers
  } = useEditorStore();

  const [mouseCanvas, setMouseCanvas] = useState({ x: 0, y: 0 });
  const [isEditingZoom, setIsEditingZoom] = useState(false);
  const [zoomInput, setZoomInput] = useState('');
  const zoomInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const stage = document.querySelector('.canvas-stage') as HTMLElement;
      if (!stage) return;
      const rect = stage.getBoundingClientRect();
      const cx = Math.round((e.clientX - rect.left) / zoom);
      const cy = Math.round((e.clientY - rect.top) / zoom);
      if (cx >= 0 && cx <= CANVAS_W && cy >= 0 && cy <= CANVAS_H) {
        setMouseCanvas({ x: cx, y: cy });
      }
    };
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, [zoom]);

  const handleZoomClick = () => {
    setZoomInput(Math.round(zoom * 100).toString());
    setIsEditingZoom(true);
    setTimeout(() => zoomInputRef.current?.select(), 10);
  };

  const handleZoomCommit = () => {
    const v = parseInt(zoomInput);
    if (!isNaN(v) && v >= 10 && v <= 400) setZoom(v / 100);
    setIsEditingZoom(false);
  };

  const widgets = getDraftWidgets();
  const selectedWidgets = widgets.filter(w => selectedIds.includes(w.id));
  const sel = selectedWidgets[0];
  const zoomPct = Math.round(zoom * 100);

  return (
    <div className="bottom-status-bar">
      {/* Mouse coords */}
      <div className="status-bar-item">
        <span style={{ color: 'var(--color-text-muted)', fontSize: 9 }}>X</span>
        <span style={{ color: 'var(--color-text-3)', minWidth: 28, textAlign: 'right' }}>{mouseCanvas.x}</span>
        <span style={{ color: 'var(--color-text-muted)', fontSize: 9, marginLeft: 4 }}>Y</span>
        <span style={{ color: 'var(--color-text-3)', minWidth: 28, textAlign: 'right' }}>{mouseCanvas.y}</span>
      </div>

      <div className="status-bar-divider" />

      {/* Resolution */}
      <div className="status-bar-item">
        <Monitor size={10} />
        <span>{CANVAS_W}×{CANVAS_H}</span>
      </div>

      <div className="status-bar-divider" />

      {/* Zoom */}
      <div className="status-bar-item" style={{ gap: 4 }}>
        <button onClick={zoomOut} style={statusBtn} title="Zoom Out"><ZoomOut size={10}/></button>

        {isEditingZoom ? (
          <input
            ref={zoomInputRef}
            value={zoomInput}
            onChange={e => setZoomInput(e.target.value)}
            onBlur={handleZoomCommit}
            onKeyDown={e => { if (e.key === 'Enter') handleZoomCommit(); if (e.key === 'Escape') setIsEditingZoom(false); }}
            style={{ width: 38, background: 'var(--color-surface-2)', border: '1px solid var(--color-accent)', borderRadius: 3, color: 'var(--color-text)', fontSize: 10, textAlign: 'center', padding: '1px 4px', fontFamily: 'var(--font-mono)', outline: 'none' }}
          />
        ) : (
          <button onClick={handleZoomClick} style={{ ...statusBtn, minWidth: 36, textAlign: 'center' }} title="Set zoom">
            {zoomPct}%
          </button>
        )}

        <button onClick={zoomIn} style={statusBtn} title="Zoom In"><ZoomIn size={10}/></button>
      </div>

      {/* Quick zoom presets */}
      <div style={{ display: 'flex', gap: 2 }}>
        <button onClick={zoomToFit} style={{ ...statusBtn, border: '1px solid transparent' }} title="Fit to screen">Fit</button>
        {selectedWidgets.length > 0 && (
          <button onClick={zoomToSelection} style={{ ...statusBtn, border: '1px solid transparent' }} title="Zoom to selection">Selection</button>
        )}
      </div>

      <div className="status-bar-divider" />

      {/* Snap, Rulers & Guidelines toggle controls */}
      <div className="status-bar-item" style={{ gap: 6 }}>
        <button
          onClick={toggleSnap}
          style={{
            ...statusBtn,
            color: snapEnabled ? 'var(--color-accent)' : 'var(--color-text-muted)',
            background: snapEnabled ? 'rgba(168,85,247,0.06)' : 'none',
          }}
          title="Toggle Snap to Grid / Guides"
        >
          <Magnet size={10} /><span style={{ fontSize: 9 }}>Snap</span>
        </button>

        <button
          onClick={toggleRulers}
          style={{
            ...statusBtn,
            color: showRulers ? 'var(--color-accent)' : 'var(--color-text-muted)',
            background: showRulers ? 'rgba(168,85,247,0.06)' : 'none',
          }}
          title="Toggle Canvas Rulers"
        >
          <Monitor size={10} /><span style={{ fontSize: 9 }}>Rulers</span>
        </button>

        <button
          onClick={toggleGuides}
          style={{
            ...statusBtn,
            color: showGuides ? 'var(--color-accent)' : 'var(--color-text-muted)',
            background: showGuides ? 'rgba(168,85,247,0.06)' : 'none',
          }}
          title="Toggle Alignment Guides"
        >
          <Eye size={10} /><span style={{ fontSize: 9 }}>Guides</span>
        </button>
      </div>

      <div className="status-bar-divider" />

      {/* Grid Mode Dropdown */}
      <div className="status-bar-item" style={{ gap: 4 }}>
        <Grid3x3 size={10} style={{ color: gridMode !== 'off' ? 'var(--color-accent)' : 'var(--color-text-muted)' }} />
        <select
          className="select"
          value={gridMode}
          onChange={e => setGridMode(e.target.value as GridMode)}
          style={{
            fontSize: 9,
            background: 'transparent',
            border: 'none',
            color: 'var(--color-text-2)',
            padding: '1px 4px',
            fontFamily: 'var(--font-mono)',
            cursor: 'pointer',
            outline: 'none',
          }}
        >
          <option value="dots" style={{ background: 'var(--color-surface)' }}>Grid: Dots</option>
          <option value="lines" style={{ background: 'var(--color-surface)' }}>Grid: Lines</option>
          <option value="off" style={{ background: 'var(--color-surface)' }}>Grid: Off</option>
        </select>
      </div>

      <div className="status-bar-spacer" />

      {/* Selected element info */}
      {sel ? (
        <div className="status-bar-item" style={{ gap: 6 }}>
          <span className="type-chip">{sel.type}</span>
          <span style={{ color: 'var(--color-text-3)', maxWidth: 110, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: 10 }}>{sel.label}</span>
          <span style={{ color: 'var(--color-text-muted)', fontSize: 9 }}>{Math.round(sel.width)}×{Math.round(sel.height)}</span>
        </div>
      ) : selectedWidgets.length > 1 ? (
        <span className="type-chip">{selectedWidgets.length} selected</span>
      ) : (
        <span style={{ fontSize: 9, color: 'var(--color-text-muted)' }}>{widgets.length} element{widgets.length !== 1 ? 's' : ''}</span>
      )}

      <div className="status-bar-divider" />

      {/* OBS link */}
      <button
        onClick={() => window.open('/output', '_blank')}
        style={{ ...statusBtn, color: 'var(--color-cyan)', display: 'flex', alignItems: 'center', gap: 4, border: 'none', background: 'none' }}
        title="Open OBS Output"
      >
        <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--color-cyan)', display: 'inline-block', boxShadow: '0 0 4px var(--color-cyan)' }} />
        OBS Output
      </button>
    </div>
  );
};

const statusBtn: React.CSSProperties = {
  background: 'none',
  border: '1px solid transparent',
  borderRadius: 3,
  cursor: 'pointer',
  color: 'var(--color-text-muted)',
  fontSize: 9,
  fontFamily: 'var(--font-mono)',
  padding: '1px 5px',
  display: 'flex',
  alignItems: 'center',
  gap: 2,
  transition: 'all 80ms ease',
};

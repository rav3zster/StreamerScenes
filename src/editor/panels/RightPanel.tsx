import React, { useState, useRef, useEffect } from 'react';
import {
  ChevronDown, ChevronUp, MousePointer2, AlignCenter, AlignLeft, AlignRight, AlignStartVertical, AlignEndVertical, AlignJustify,
  Paintbrush, Type, Zap, Settings2, Sparkles,
  Copy, Trash2, Layers, RotateCcw, ClipboardPaste, CopyPlus,
  ArrowDownToLine, ArrowUpToLine, Monitor, Grid3x3, Magnet, Ruler, Eye, Globe, ExternalLink, Search,
} from 'lucide-react';
import { useEditorStore, type SceneWidget } from '../../store/editorStore';
import { LiveControlPanel } from './LiveControlPanel';
import { notify } from '../../components/ToastContainer';

const GOOGLE_FONTS = [
  'Inter', 'Space Grotesk', 'JetBrains Mono', 'Outfit',
  'Roboto', 'Playfair Display', 'Syne', 'Cinzel',
];

const RECENT_COLORS_KEY = 'vibe-recent-colors';

// ─── Canvas Properties Inspector (Empty Selection State) ──────────────────────

// ─── Canvas Properties Inspector (Matching Reference Image) ──────────────────────

const CanvasPropertiesInspector: React.FC = () => {
  const {
    scenes, editingSceneId, updateWidget, addWidget,
    snapEnabled, toggleSnap,
    showGuides, toggleGuides, showRulers, toggleRulers,
    setAppView,
  } = useEditorStore();

  const editingScene = scenes.find(s => s.id === editingSceneId);
  const [copiedUrl, setCopiedUrl] = useState(false);

  // Background fill is driven by the scene's `background`-type widget.
  const bgWidget = editingScene?.widgets.find(w => w.type === 'background');
  const bgValue = bgWidget?.style.background || '#06040d';

  // Detect fill mode from the stored background value.
  const detectMode = (val: string): 'solid' | 'gradient' | 'glass' =>
    /gradient/i.test(val) ? 'gradient' : /blur/i.test(val) ? 'glass' : 'solid';
  const fillMode = detectMode(bgValue);

  const setBackground = (val: string) => {
    if (!editingScene) return;
    if (bgWidget) {
      updateWidget(bgWidget.id, { style: { ...bgWidget.style, background: val } });
    } else {
      // Auto-create a full-canvas background widget if none exists yet.
      addWidget({
        id: `w-${crypto.randomUUID()}`,
        type: 'background',
        label: 'Background',
        x: 0, y: 0, width: 1920, height: 1080,
        rotation: 0, opacity: 100, scale: 1, zIndex: 0,
        visible: true, locked: false,
        style: { background: val },
        animation: { type: 'none', duration: 1, delay: 0, loop: false },
        content: { type: 'background', settings: {} },
      });
    }
  };

  // Keep a hex string in sync with the stored value for the text input.
  const hexInputValue = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(bgValue) ? bgValue : '';
  const swatchStyle = bgValue;

  // Cycle fill mode: selecting a mode swaps in a representative value.
  const setMode = (mode: 'solid' | 'gradient' | 'glass') => {
    if (mode === fillMode) return;
    if (mode === 'solid') setBackground('#06040d');
    else if (mode === 'gradient') setBackground('linear-gradient(135deg, #06040d 0%, #1a0535 100%)');
    else setBackground('rgba(12,10,22,0.6)'); // glass = translucent
  };

  const sceneIdChip = editingSceneId
    ? `#${editingSceneId.replace(/[^a-z0-9]/gi, '').slice(-6).toUpperCase()}`
    : '#NEW';

  const handleCopyUrl = () => {
    const url = `${window.location.origin}/output`;
    navigator.clipboard.writeText(url);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 0 }}>

      {/* ── Section 1: CANVAS & SCENE */}
      <div style={{ padding: '16px 16px 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span className="nothing-section-label">CANVAS &amp; SCENE</span>
        </div>

        {/* Scene title + ID chip */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span className="nothing-live-dot" style={{ width: 6, height: 6 }} />
            <span style={{ fontSize: 12, fontWeight: 600, color: '#d0d0d0' }}>
              {editingScene?.label ?? 'No Scene'}
            </span>
          </div>
          <span style={{
            background: 'rgba(255,255,255,0.05)', color: '#555',
            fontSize: 9, fontWeight: 700, letterSpacing: '0.08em',
            padding: '2px 8px', borderRadius: 999, fontFamily: 'var(--font-mono)'
          }}>
            {sceneIdChip}
          </span>
        </div>

        <div className="nothing-section-label" style={{ marginTop: 4 }}>BACKGROUND FILL</div>

        {/* Segmented control */}
        <div className="vibe-segmented">
          {(['solid', 'gradient', 'glass'] as const).map(mode => (
            <button
              key={mode}
              className={`vibe-segmented-btn${fillMode === mode ? ' active' : ''}`}
              onClick={() => setMode(mode)}
            >
              {mode}
            </button>
          ))}
        </div>

        {/* Color swatch + hex input */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <label style={{
            width: 28, height: 28, borderRadius: 8,
            background: swatchStyle, border: '1px solid rgba(255,255,255,0.1)',
            flexShrink: 0, cursor: 'pointer', position: 'relative',
          }} title="Pick background color">
            <input
              type="color"
              onChange={e => setBackground(e.target.value)}
              style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }}
            />
          </label>
          <input
            value={hexInputValue}
            onChange={e => setBackground(e.target.value)}
            placeholder="#000000 or rgba(...)"
            className="input"
            style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.04em' }}
          />
        </div>
      </div>

      <div className="vibe-red-divider" style={{ margin: '0 16px 14px' }} />

      {/* ── Section 2: DISPLAY & GRID */}
      <div style={{ padding: '0 16px 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span className="nothing-section-label">DISPLAY &amp; GRID</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 2 }}>
          {/* Toggle: Snap to Grid */}
          {[
            { label: 'Snap to Grid / Guides', value: snapEnabled, toggle: toggleSnap },
            { label: 'Safe Area Guides', value: showGuides, toggle: toggleGuides },
            { label: 'Canvas Rulers', value: showRulers, toggle: toggleRulers },
          ].map(({ label, value, toggle }) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 11, fontWeight: 400, color: '#777' }}>{label}</span>
              <button
                onClick={toggle}
                style={{
                  width: 32, height: 18, borderRadius: 999,
                  background: value ? 'rgba(255, 58, 48, 0.2)' : 'rgba(255,255,255,0.06)',
                  border: value ? '1px solid rgba(255, 58, 48, 0.4)' : '1px solid rgba(255,255,255,0.08)',
                  padding: 2, cursor: 'pointer',
                  display: 'flex', alignItems: 'center',
                  justifyContent: value ? 'flex-end' : 'flex-start',
                  transition: 'all 150ms ease',
                }}
              >
                <div style={{
                  width: 12, height: 12, borderRadius: '50%',
                  background: value ? '#FF3A30' : '#333',
                  boxShadow: value ? '0 0 6px rgba(255, 58, 48, 0.6)' : 'none',
                  transition: 'all 150ms ease',
                }} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="vibe-red-divider" style={{ margin: '0 16px 14px' }} />

      {/* ── Section 3: OBS BROADCAST SOURCE */}
      <div style={{ padding: '0 16px 14px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
          <span className="nothing-section-label">OBS BROADCAST SOURCE</span>
        </div>

        <button
          className="vibe-pill-btn"
          style={{ width: '100%', justifyContent: 'center', padding: '9px 0' }}
          onClick={handleCopyUrl}
        >
          <Copy size={12} />
          <span>{copiedUrl ? '✓ Copied!' : 'Copy OBS Source URL'}</span>
        </button>
        <button
          className="vibe-pill-btn"
          style={{ width: '100%', justifyContent: 'center', padding: '9px 0' }}
          onClick={() => setAppView('obs-setup')}
        >
          <Globe size={12} />
          <span>Open OBS Setup Guide</span>
        </button>
      </div>
    </div>
  );
};

// ─── Right Panel (Inspector Wrapper) ──────────────────────────────────────────

export const RightPanel: React.FC = () => {
  const { selectedIds, getSelectedWidgets, rightPanelWidth } = useEditorStore();
  const selected = getSelectedWidgets();

  if (selectedIds.length === 0) {
    return (
      <div className="right-panel" style={{ width: rightPanelWidth }}>
        <CanvasPropertiesInspector />
      </div>
    );
  }

  if (selectedIds.length > 1) {
    return (
      <div className="right-panel" style={{
        width: rightPanelWidth,
        background: '#f2f4f8',
        borderRadius: 18,
        margin: '8px 4px',
        border: '1px solid rgba(255,255,255,0.9)',
        boxShadow: '0 8px 24px rgba(166, 175, 195, 0.35)',
        overflow: 'hidden'
      }}>
        <div className="panel-header">
          <span className="panel-title">Multi-Selection ({selectedIds.length})</span>
        </div>
        <MultipleSelection widgets={selected} />
      </div>
    );
  }

  const widget = selected[0];
  if (!widget) return null;

  return (
    <div className="right-panel" style={{
      width: rightPanelWidth,
      background: '#f2f4f8',
      borderRadius: 18,
      margin: '8px 4px',
      border: '1px solid rgba(255,255,255,0.9)',
      boxShadow: '0 8px 24px rgba(166, 175, 195, 0.35)',
      overflow: 'hidden'
    }}>
      <SingleInspector widget={widget} />
    </div>
  );
};

// ─── Drag to Adjust Parameter Input ───────────────────────────────────────────

interface DragAdjustProps {
  label: string;
  value: number;
  onChange: (v: number) => void;
  step?: number;
  min?: number;
  max?: number;
}

const DragAdjustInput: React.FC<DragAdjustProps> = ({ label, value, onChange, step = 1, min, max }) => {
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const startVal = useRef(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    startX.current = e.clientX;
    startVal.current = value;
    document.body.style.cursor = 'ew-resize';
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - startX.current;
      let newVal = startVal.current + deltaX * step;
      if (step >= 1) newVal = Math.round(newVal);
      else newVal = parseFloat(newVal.toFixed(2));

      if (min !== undefined) newVal = Math.max(min, newVal);
      if (max !== undefined) newVal = Math.min(max, newVal);
      onChange(newVal);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.body.style.cursor = 'default';
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, onChange, step, min, max]);

  return (
    <div className="input-with-label" style={{ userSelect: 'none' }}>
      <input
        type="number"
        value={Number.isFinite(value) ? parseFloat(value.toFixed(2)) : 0}
        onChange={e => {
          const v = parseFloat(e.target.value);
          if (!isNaN(v)) onChange(v);
        }}
        className="input input-mono"
        style={{ fontSize: 11, padding: '4px 6px', textAlign: 'center' }}
      />
      <span
        style={{ cursor: 'ew-resize', fontSize: 9, color: 'var(--color-text-muted)', textAlign: 'center', fontWeight: 600 }}
        onMouseDown={handleMouseDown}
        title="Click & Drag horizontal to slide value"
      >
        {label} ↔
      </span>
    </div>
  );
};

// ─── Single Inspector ─────────────────────────────────────────────────────────

const SingleInspector: React.FC<{ widget: SceneWidget }> = ({ widget }) => {
  const { scenes, editingSceneId, updateWidget, duplicateWidget, removeWidget, bringToFront, sendToBack, bringForward, sendBackward } = useEditorStore();
  const [propertySearch, setPropertySearch] = useState('');
  const editingScene = scenes.find(s => s.id === editingSceneId);

  const u = (updates: Partial<SceneWidget>) => updateWidget(widget.id, updates);
  const us = (s: Partial<SceneWidget['style']>) => updateWidget(widget.id, { style: { ...widget.style, ...s } });

  // Parameter Copy/Paste states
  const handleCopyStyle = () => {
    localStorage.setItem('vibe-copied-style', JSON.stringify(widget.style));
    notify('Parameters copied to clipboard', 'info');
  };

  const handlePasteStyle = () => {
    const raw = localStorage.getItem('vibe-copied-style');
    if (raw) {
      try {
        us(JSON.parse(raw));
        notify('Parameters applied to selection', 'success');
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      {/* Breadcrumb Navigation */}
      <div style={{ padding: '6px 12px', background: 'var(--surface-3)', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', gap: 4, fontSize: 10, color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}>
        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{editingScene?.label || 'Scene'}</span>
        <span>›</span>
        <span style={{ color: 'var(--color-accent)' }}>{widget.type}</span>
        <span>›</span>
        <span style={{ color: 'var(--color-text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{widget.label}</span>
      </div>

      {/* Dynamic Header */}
      <div className="panel-header" style={{ flexDirection: 'column', alignItems: 'flex-start', height: 'auto', gap: 6, padding: '10px 14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <span className="type-chip">{widget.type}</span>
          <div style={{ display: 'flex', gap: 2 }}>
            <button className="btn-icon focus-ring" style={{ width: 24, height: 24 }} title="Copy styling parameters" onClick={handleCopyStyle}><Copy size={12} /></button>
            <button className="btn-icon focus-ring" style={{ width: 24, height: 24 }} title="Paste copied styles" onClick={handlePasteStyle}><ClipboardPaste size={12} /></button>
            <button className="btn-icon focus-ring" style={{ width: 24, height: 24 }} title="Duplicate element" onClick={() => duplicateWidget(widget.id)}><CopyPlus size={12} /></button>
            <button className="btn-icon focus-ring" style={{ width: 24, height: 24 }} title="Delete element" onClick={() => removeWidget(widget.id)}><Trash2 size={12} /></button>
          </div>
        </div>
        <input
          className="input"
          value={widget.label}
          onChange={e => u({ label: e.target.value })}
          style={{ fontSize: 12, padding: '4px 8px' }}
        />
        {/* Property Search Input */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'var(--surface-2)', borderRadius: 4, padding: '3px 8px', width: '100%', marginTop: 2 }}>
          <Search size={11} style={{ color: 'var(--color-text-muted)', flexShrink: 0 }} />
          <input
            className="input"
            value={propertySearch}
            onChange={e => setPropertySearch(e.target.value)}
            placeholder="Search properties..."
            style={{ border: 'none', background: 'transparent', padding: 0, fontSize: 10, width: '100%' }}
          />
        </div>
      </div>

      {/* Main sections */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '8px' }}>
        
        {/* Dynamic widget content settings */}
        <WidgetSettingsSection widget={widget} />

        {/* General options */}
        <InspectorSection title="General" icon={<Settings2 size={12} />} defaultOpen searchQuery={propertySearch}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
            <span style={{ fontSize: 10, color: 'var(--color-text-muted)', fontWeight: 600 }}>Visible</span>
            <ToggleRow value={widget.visible} onChange={v => u({ visible: v })} label={widget.visible ? 'Show' : 'Hide'} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
            <span style={{ fontSize: 10, color: 'var(--color-text-muted)', fontWeight: 600 }}>Locked</span>
            <ToggleRow value={widget.locked} onChange={v => u({ locked: v })} label={widget.locked ? 'Lock' : 'Editable'} />
          </div>
          <div className="input-group">
            <div className="input-group-label">Opacity</div>
            <input type="range" min={0} max={100} value={widget.opacity} onChange={e => u({ opacity: +e.target.value })} className="slider" />
            <div style={{ textAlign: 'right', fontSize: 10, color: 'var(--color-text-3)', fontFamily: 'var(--font-mono)' }}>{widget.opacity}%</div>
          </div>
          <div style={{ display: 'flex', gap: 3, marginTop: 6 }}>
            <button className="btn btn-secondary focus-ring" style={{ flex: 1, fontSize: 9, padding: '4px 0', gap: 3 }} title="Send to Back" onClick={() => sendToBack(widget.id)} data-tooltip="Send to Back"><ArrowDownToLine size={11} /></button>
            <button className="btn btn-secondary focus-ring" style={{ flex: 1, fontSize: 9, padding: '4px 0', gap: 3 }} title="Move Backward" onClick={() => sendBackward(widget.id)} data-tooltip="Move Back"><ChevronDown size={11} /></button>
            <button className="btn btn-secondary focus-ring" style={{ flex: 1, fontSize: 9, padding: '4px 0', gap: 3 }} title="Move Forward" onClick={() => bringForward(widget.id)} data-tooltip="Move Front"><ChevronUp size={11} /></button>
            <button className="btn btn-secondary focus-ring" style={{ flex: 1, fontSize: 9, padding: '4px 0', gap: 3 }} title="Bring to Front" onClick={() => bringToFront(widget.id)} data-tooltip="Bring to Front"><ArrowUpToLine size={11} /></button>
          </div>
        </InspectorSection>

        {/* Layout options with drag adjusting */}
        <InspectorSection title="Layout" icon={<AlignCenter size={12} />} defaultOpen searchQuery={propertySearch}>
          <div className="input-row">
            <DragAdjustInput label="X Pos" value={widget.x} onChange={v => u({ x: v })} />
            <DragAdjustInput label="Y Pos" value={widget.y} onChange={v => u({ y: v })} />
          </div>
          <div className="input-row">
            <DragAdjustInput label="Width" value={widget.width} min={5} onChange={v => u({ width: v })} />
            <DragAdjustInput label="Height" value={widget.height} min={5} onChange={v => u({ height: v })} />
          </div>
          <div className="input-row">
            <DragAdjustInput label="Rotate" value={widget.rotation} min={-360} max={360} onChange={v => u({ rotation: v })} />
          </div>
        </InspectorSection>

        {/* Custom Color picking panel */}
        <InspectorSection title="Appearance" icon={<Paintbrush size={12} />} searchQuery={propertySearch}>
          <ColorPickerPanel label="Background Fill" value={widget.style.background || 'transparent'} onChange={v => us({ background: v })} />

          <div className="input-row" style={{ marginTop: 8 }}>
            <DragAdjustInput label="Corner Radius" value={widget.style.borderRadius || 0} min={0} onChange={v => us({ borderRadius: v })} />
            <DragAdjustInput label="Padding" value={widget.style.padding || 0} min={0} onChange={v => us({ padding: v })} />
          </div>

          <div className="input-group" style={{ marginTop: 8 }}>
            <div className="input-group-label">Border Frame</div>
            <div className="input-row">
              <DragAdjustInput label="Size" value={widget.style.borderSize || 0} min={0} onChange={v => us({ borderSize: v })} />
              <div className="input-with-label">
                <select className="select" value={widget.style.borderStyle || 'solid'} onChange={e => us({ borderStyle: e.target.value as any })} style={{ fontSize: 11 }}>
                  {['solid', 'dashed', 'dotted', 'none'].map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                <span className="input-sub-label">Style</span>
              </div>
            </div>
            {(widget.style.borderSize || 0) > 0 && (
              <ColorPickerPanel label="Border Color" value={widget.style.borderColor || 'var(--color-accent)'} onChange={v => us({ borderColor: v })} />
            )}
          </div>
        </InspectorSection>

        {/* Text and Typography */}
        <InspectorSection title="Typography" icon={<Type size={12} />} searchQuery={propertySearch}>
          <ColorPickerPanel label="Text Color" value={widget.style.fontColor || '#ffffff'} onChange={v => us({ fontColor: v })} />

          <div className="input-with-label" style={{ marginTop: 6 }}>
            <select className="select" value={widget.style.fontFamily || 'Inter, sans-serif'} onChange={e => us({ fontFamily: e.target.value })} style={{ fontSize: 11 }}>
              {GOOGLE_FONTS.map(f => <option key={f} value={f}>{f}</option>)}
            </select>
            <span className="input-sub-label">Font Family</span>
          </div>

          <div className="input-row" style={{ marginTop: 6 }}>
            <DragAdjustInput label="Font Size" value={widget.style.fontSize || 14} min={6} onChange={v => us({ fontSize: v })} />
            <div className="input-with-label">
              <select className="select" value={widget.style.fontWeight || '400'} onChange={e => us({ fontWeight: e.target.value })} style={{ fontSize: 11 }}>
                {['300', '400', '500', '600', '700', '800', '900'].map(w => <option key={w} value={w}>{w}</option>)}
              </select>
              <span className="input-sub-label">Weight</span>
            </div>
          </div>

          <div className="input-with-label" style={{ marginTop: 6 }}>
            <select className="select" value={widget.style.textAlign || 'left'} onChange={e => us({ textAlign: e.target.value as any })} style={{ fontSize: 11 }}>
              {['left', 'center', 'right'].map(a => <option key={a} value={a}>{a}</option>)}
            </select>
            <span className="input-sub-label">Alignment</span>
          </div>

          <div className="input-row" style={{ marginTop: 6 }}>
            <DragAdjustInput label="Letter Spacing" value={widget.style.letterSpacing || 0} onChange={v => us({ letterSpacing: v })} />
            <DragAdjustInput label="Line Height" value={widget.style.lineHeight || 1.4} step={0.1} onChange={v => us({ lineHeight: v })} />
          </div>

          <div className="input-with-label" style={{ marginTop: 6 }}>
            <select className="select" value={widget.style.textTransform || 'none'} onChange={e => us({ textTransform: e.target.value as any })} style={{ fontSize: 11 }}>
              {['none', 'uppercase', 'lowercase', 'capitalize'].map(t => <option key={t} value={t}>{t}</option>)}
            </select>
            <span className="input-sub-label">Transform</span>
          </div>

          {/* Custom Stroke / Outline */}
          <div className="input-group" style={{ marginTop: 8 }}>
            <div className="input-group-label">Text Stroke (Outline)</div>
            <div className="input-row">
              <DragAdjustInput label="Stroke Width" value={widget.style.strokeWidth || 0} min={0} onChange={v => us({ strokeWidth: v })} />
              <ColorPickerPanel label="Stroke Color" value={widget.style.strokeColor || '#000000'} onChange={v => us({ strokeColor: v })} />
            </div>
          </div>
        </InspectorSection>

        {/* Advanced visual effects */}
        <InspectorSection title="Effects" icon={<Sparkles size={12} />} searchQuery={propertySearch}>
          {/* Drop shadow */}
          <div className="input-group">
            <div className="input-group-label">Drop Shadow</div>
            <div className="input-row">
              <DragAdjustInput label="X Offset" value={widget.style.shadowX || 0} onChange={v => us({ shadowX: v })} />
              <DragAdjustInput label="Y Offset" value={widget.style.shadowY || 4} onChange={v => us({ shadowY: v })} />
              <DragAdjustInput label="Blur Radius" value={widget.style.shadowBlur || 0} min={0} onChange={v => us({ shadowBlur: v })} />
            </div>
            {(widget.style.shadowBlur || 0) > 0 && (
              <ColorPickerPanel label="Shadow Color" value={widget.style.shadowColor || 'rgba(0,0,0,0.5)'} onChange={v => us({ shadowColor: v })} />
            )}
          </div>

          {/* Text Shadow */}
          <div className="input-group" style={{ marginTop: 8 }}>
            <div className="input-group-label">Text Shadow</div>
            <div className="input-row">
              <DragAdjustInput label="X Offset" value={widget.style.textShadowX || 0} onChange={v => us({ textShadowX: v })} />
              <DragAdjustInput label="Y Offset" value={widget.style.textShadowY || 2} onChange={v => us({ textShadowY: v })} />
              <DragAdjustInput label="Blur Radius" value={widget.style.textShadowBlur || 0} min={0} onChange={v => us({ textShadowBlur: v })} />
            </div>
            {(widget.style.textShadowBlur || 0) > 0 && (
              <ColorPickerPanel label="Shadow Color" value={widget.style.textShadowColor || 'rgba(0,0,0,0.5)'} onChange={v => us({ textShadowColor: v })} />
            )}
          </div>

          {/* Box glow */}
          <div className="input-group" style={{ marginTop: 8 }}>
            <div className="input-group-label">Glow Filter</div>
            <div className="input-row">
              <DragAdjustInput label="Radius Blur" value={widget.style.glowBlur || 0} min={0} onChange={v => us({ glowBlur: v })} />
              <ColorPickerPanel label="Glow Color" value={widget.style.glowColor || 'var(--color-accent)'} onChange={v => us({ glowColor: v })} />
            </div>
          </div>

          {/* Glass frosting */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 }}>
            <span style={{ fontSize: 10, color: 'var(--color-text-muted)', fontWeight: 600 }}>Glass Backdrop</span>
            <ToggleRow value={widget.style.glassEffect || false} onChange={v => us({ glassEffect: v })} label={widget.style.glassEffect ? 'On' : 'Off'} />
          </div>
          {widget.style.glassEffect && (
            <DragAdjustInput label="Blur Depth px" value={widget.style.blur || 12} min={1} onChange={v => us({ blur: v })} />
          )}
        </InspectorSection>

        {/* Animations */}
        <InspectorSection title="Animation" icon={<Zap size={12} />} searchQuery={propertySearch}>
          <div className="input-with-label">
            <select
              className="select"
              value={widget.animation.type}
              onChange={e => updateWidget(widget.id, { animation: { ...widget.animation, type: e.target.value as any } })}
              style={{ fontSize: 11 }}
            >
              {['none', 'fade', 'scale', 'slide-up', 'slide-left', 'bounce', 'glow', 'pulse', 'float', 'shake', 'spin'].map(a => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
            <span className="input-sub-label">Type</span>
          </div>
          {widget.animation.type !== 'none' && (
            <>
              <div className="input-row" style={{ marginTop: 6 }}>
                <DragAdjustInput label="Duration s" value={widget.animation.duration} step={0.1} onChange={v => updateWidget(widget.id, { animation: { ...widget.animation, duration: v } })} />
                <DragAdjustInput label="Delay s" value={widget.animation.delay} step={0.1} onChange={v => updateWidget(widget.id, { animation: { ...widget.animation, delay: v } })} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 6 }}>
                <span style={{ fontSize: 10, color: 'var(--color-text-muted)', fontWeight: 600 }}>Looping</span>
                <ToggleRow value={widget.animation.loop} onChange={v => updateWidget(widget.id, { animation: { ...widget.animation, loop: v } })} label={widget.animation.loop ? 'Infinite' : 'Once'} />
              </div>
            </>
          )}
        </InspectorSection>

      </div>
    </div>
  );
};

// ─── Multiple Selection Panel ────────────────────────────────────────────────

const MultipleSelection: React.FC<{ widgets: SceneWidget[] }> = ({ widgets }) => {
  const { removeSelectedWidgets, groupSelected, copySelected, updateWidget } = useEditorStore();

  const handleAlignLeft = () => {
    if (!widgets.length) return;
    const minX = Math.min(...widgets.map(w => w.x));
    widgets.forEach(w => updateWidget(w.id, { x: minX }));
  };

  const handleAlignCenter = () => {
    if (!widgets.length) return;
    const avgCenterX = Math.round(widgets.reduce((sum, w) => sum + (w.x + w.width / 2), 0) / widgets.length);
    widgets.forEach(w => updateWidget(w.id, { x: Math.round(avgCenterX - w.width / 2) }));
  };

  const handleAlignRight = () => {
    if (!widgets.length) return;
    const maxX = Math.max(...widgets.map(w => w.x + w.width));
    widgets.forEach(w => updateWidget(w.id, { x: maxX - w.width }));
  };

  const handleAlignTop = () => {
    if (!widgets.length) return;
    const minY = Math.min(...widgets.map(w => w.y));
    widgets.forEach(w => updateWidget(w.id, { y: minY }));
  };

  const handleAlignMiddle = () => {
    if (!widgets.length) return;
    const avgCenterY = Math.round(widgets.reduce((sum, w) => sum + (w.y + w.height / 2), 0) / widgets.length);
    widgets.forEach(w => updateWidget(w.id, { y: Math.round(avgCenterY - w.height / 2) }));
  };

  const handleAlignBottom = () => {
    if (!widgets.length) return;
    const maxY = Math.max(...widgets.map(w => w.y + w.height));
    widgets.forEach(w => updateWidget(w.id, { y: maxY - w.height }));
  };

  return (
    <div className="panel-body" style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: 12 }}>
      <div style={{ fontSize: 11, color: 'var(--color-text-3)', textAlign: 'center', fontFamily: 'var(--font-mono)', background: 'var(--surface-3)', padding: '6px', borderRadius: 6 }}>
        {widgets.length} elements selected
      </div>

      {/* Alignment Toolbar */}
      <InspectorSection title="Batch Alignment" icon={<AlignCenter size={12} />} defaultOpen>
        <div style={{ display: 'flex', gap: 4, justifyContent: 'space-between' }}>
          <button className="btn btn-secondary focus-ring" style={{ flex: 1, padding: 4 }} title="Align Left" onClick={handleAlignLeft}><AlignLeft size={13} /></button>
          <button className="btn btn-secondary focus-ring" style={{ flex: 1, padding: 4 }} title="Align Horizontal Center" onClick={handleAlignCenter}><AlignCenter size={13} /></button>
          <button className="btn btn-secondary focus-ring" style={{ flex: 1, padding: 4 }} title="Align Right" onClick={handleAlignRight}><AlignRight size={13} /></button>
          <button className="btn btn-secondary focus-ring" style={{ flex: 1, padding: 4 }} title="Align Top" onClick={handleAlignTop}><AlignStartVertical size={13} /></button>
          <button className="btn btn-secondary focus-ring" style={{ flex: 1, padding: 4 }} title="Align Vertical Middle" onClick={handleAlignMiddle}><AlignJustify size={13} /></button>
          <button className="btn btn-secondary focus-ring" style={{ flex: 1, padding: 4 }} title="Align Bottom" onClick={handleAlignBottom}><AlignEndVertical size={13} /></button>
        </div>
      </InspectorSection>

      {/* Batch Actions */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 4 }}>
        <button className="btn btn-secondary focus-ring" style={{ fontSize: 11, justifyContent: 'flex-start', gap: 8 }} onClick={groupSelected}>
          <Layers size={13} /> Group Elements (⌘G)
        </button>
        <button className="btn btn-secondary focus-ring" style={{ fontSize: 11, justifyContent: 'flex-start', gap: 8 }} onClick={copySelected}>
          <Copy size={13} /> Copy Layout Styles (⌘C)
        </button>
        <button className="btn btn-danger focus-ring" style={{ fontSize: 11, justifyContent: 'flex-start', gap: 8 }} onClick={removeSelectedWidgets}>
          <Trash2 size={13} /> Delete All Selected
        </button>
      </div>
    </div>
  );
};

// ─── Inspector Section Accordion ──────────────────────────────────────────────

interface SectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
  /** Active property-search query. When non-empty, sections whose title does
   * not match are hidden, and matching sections are forced open. */
  searchQuery?: string;
}

const InspectorSection: React.FC<SectionProps> = ({ title, icon, children, defaultOpen = false, searchQuery = '' }) => {
  const query = searchQuery.trim().toLowerCase();
  const matches = query === '' || title.toLowerCase().includes(query);
  // While searching, force matching sections open; otherwise honour user toggle.
  const [open, setOpen] = useState(defaultOpen);
  const isOpen = query !== '' ? true : open;

  if (!matches) return null;

  return (
    <div className="inspector-section">
      <div className="inspector-section-header" onClick={() => query === '' && setOpen(o => !o)}>
        <span style={{ opacity: 0.7 }}>{icon}</span>
        <span style={{ flex: 1 }}>{title}</span>
        {isOpen ? <ChevronUp size={11} /> : <ChevronDown size={11} />}
      </div>
      {isOpen && <div className="inspector-section-body">{children}</div>}
    </div>
  );
};

// ─── Toggle switches ─────────────────────────────────────────────────────────

interface ToggleRowProps {
  value: boolean;
  onChange: (v: boolean) => void;
  label: string;
}

const ToggleRow: React.FC<ToggleRowProps> = ({ value, onChange, label }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
    <span style={{ fontSize: 10, color: value ? 'var(--color-text-2)' : 'var(--color-text-muted)' }}>{label}</span>
    <label className="toggle">
      <input type="checkbox" checked={value} onChange={e => onChange(e.target.checked)} />
      <span className="toggle-track" />
    </label>
  </div>
);

// ─── Dynamic Advanced Color/Gradient/Glass Picker ────────────────────────────

interface ColorPickerPanelProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
}

const GRADIENT_PRESETS = [
  { name: 'Synth Purple', val: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)' },
  { name: 'Neon Glitch', val: 'linear-gradient(135deg, #5cffe2 0%, #a855f7 100%)' },
  { name: 'Warm Outro', val: 'linear-gradient(135deg, #f97316 0%, #ef4444 100%)' },
  { name: 'Gold Luxe', val: 'linear-gradient(135deg, #c9a227 0%, #f59e0b 100%)' },
  { name: 'Cosmo Radial', val: 'radial-gradient(circle, var(--color-accent-alpha-40) 0%, transparent 70%)' },
  { name: 'Cyan Glow', val: 'radial-gradient(circle, rgba(92,255,226,0.3) 0%, transparent 75%)' },
];

const GLASS_PRESETS = [
  { name: 'Frosted Light', val: 'rgba(255,255,255,0.05)' },
  { name: 'Frosted Dark', val: 'rgba(0,0,0,0.45)' },
  { name: 'Amethyst tint', val: 'var(--color-accent-alpha-08)' },
];

const ColorPickerPanel: React.FC<ColorPickerPanelProps> = ({ label, value, onChange }) => {
  const [activeTab, setActiveTab] = useState<'solid' | 'gradient' | 'glass'>('solid');
  const [recents, setRecents] = useState<string[]>([]);

  // Load recent swatches
  useEffect(() => {
    try {
      const stored = localStorage.getItem(RECENT_COLORS_KEY);
      if (stored) setRecents(JSON.parse(stored));
    } catch {}
  }, []);

  const saveRecent = (col: string) => {
    const list = recents.filter(x => x !== col);
    list.unshift(col);
    if (list.length > 10) list.pop();
    setRecents(list);
    localStorage.setItem(RECENT_COLORS_KEY, JSON.stringify(list));
  };

  const handleColorChange = (newVal: string) => {
    onChange(newVal);
    saveRecent(newVal);
  };

  // Determine picker state
  const isGradient = value.includes('gradient');
  const isRgba = value.startsWith('rgba');

  return (
    <div className="input-group" style={{ borderRadius: 8, padding: 8, background: 'var(--color-surface-2)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
        <span className="input-group-label">{label}</span>
        <div style={{ display: 'flex', gap: 2 }}>
          {['solid', 'gradient', 'glass'].map((t: any) => (
            <button
              key={t}
              className={`category-pill${activeTab === t ? ' active' : ''}`}
              style={{ fontSize: 8, padding: '2px 6px' }}
              onClick={() => setActiveTab(t)}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'solid' && (
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          <div className="color-swatch" style={{ background: value.includes('gradient') ? '#a855f7' : value, position: 'relative' }}>
            <input
              type="color"
              value={value.startsWith('#') && value.length === 7 ? value : '#a855f7'}
              onChange={e => handleColorChange(e.target.value)}
              style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }}
            />
          </div>
          <input
            className="input input-mono"
            value={value}
            onChange={e => onChange(e.target.value)}
            style={{ flex: 1, fontSize: 10, padding: '4px 6px' }}
            placeholder="#ffffff or rgba(...)"
          />
        </div>
      )}

      {activeTab === 'gradient' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 4 }}>
            {GRADIENT_PRESETS.map(g => (
              <button
                key={g.name}
                className="btn btn-secondary"
                style={{ fontSize: 9, padding: '4px', background: g.val, color: '#fff', textShadow: '0 1px 3px rgba(0,0,0,0.8)', border: 'none' }}
                onClick={() => handleColorChange(g.val)}
              >
                {g.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'glass' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 4 }}>
            {GLASS_PRESETS.map(gl => (
              <button
                key={gl.name}
                className="btn btn-secondary"
                style={{ fontSize: 9, padding: '6px 2px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}
                onClick={() => {
                  handleColorChange(gl.val);
                  // Ensure glassEffect is enabled alongside the color tint
                  useEditorStore.getState().getSelectedWidgets().forEach(w => {
                    useEditorStore.getState().updateWidget(w.id, { style: { ...w.style, glassEffect: true, blur: 12 } });
                  });
                }}
              >
                {gl.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Recents Swatches strip */}
      {recents.length > 0 && (
        <div style={{ marginTop: 6, paddingTop: 6, borderTop: '1px solid var(--color-border)' }}>
          <div style={{ fontSize: 8, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: 4 }}>Recent Colors</div>
          <div style={{ display: 'flex', gap: 4, overflowX: 'auto' }}>
            {recents.map((c, i) => (
              <div
                key={i}
                onClick={() => onChange(c)}
                style={{
                  width: 14, height: 14, borderRadius: '50%',
                  background: c, border: '1px solid rgba(255,255,255,0.15)',
                  cursor: 'pointer', flexShrink: 0
                }}
                title={c}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// ─── Widget-Specific Content Settings ──────────────────────────────────────────

const WidgetSettingsSection: React.FC<{ widget: SceneWidget }> = ({ widget }) => {
  const { updateWidget, scenes } = useEditorStore();
  const uc = (settings: Record<string, any>) => {
    updateWidget(widget.id, {
      content: {
        ...widget.content,
        settings: {
          ...(widget.content.settings || {}),
          ...settings,
        },
      },
    });
  };

  const settings = widget.content.settings || {};

  switch (widget.type) {
    case 'text':
    case 'animated-text':
    case 'typing-text':
    case 'now-playing-text':
      return (
        <InspectorSection title="Text Content" icon={<Type size={12} />} defaultOpen>
          <div className="input-group">
            <div className="input-group-label">Display Text</div>
            <textarea
              className="input"
              value={settings.text ?? ''}
              onChange={e => uc({ text: e.target.value })}
              style={{ width: '100%', minHeight: 60, padding: 8, fontSize: 12, fontFamily: 'inherit', resize: 'vertical' }}
              placeholder="Enter text..."
            />
          </div>
        </InspectorSection>
      );

    case 'scrolling-text':
      return (
        <InspectorSection title="Scrolling Text" icon={<Type size={12} />} defaultOpen>
          <div className="input-group">
            <div className="input-group-label">Display Text</div>
            <textarea
              className="input"
              value={settings.text ?? ''}
              onChange={e => uc({ text: e.target.value })}
              style={{ width: '100%', minHeight: 60, padding: 8, fontSize: 12, fontFamily: 'inherit', resize: 'vertical' }}
              placeholder="Enter text..."
            />
          </div>
          <div className="input-group" style={{ marginTop: 6 }}>
            <div className="input-group-label">Scroll Speed</div>
            <input
              type="number"
              className="input"
              value={settings.speed ?? 50}
              onChange={e => uc({ speed: parseInt(e.target.value) || 0 })}
              style={{ width: '100%', fontSize: 11, padding: '4px 6px' }}
            />
          </div>
        </InspectorSection>
      );

    case 'countdown-timer':
      return (
        <InspectorSection title="Countdown Settings" icon={<Settings2 size={12} />} defaultOpen>
          <div className="input-group">
            <div className="input-group-label">Duration (seconds)</div>
            <input
              type="number"
              className="input"
              value={settings.duration ?? 600}
              onChange={e => uc({ duration: parseInt(e.target.value) || 0 })}
              style={{ width: '100%', fontSize: 11, padding: '4px 6px' }}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 }}>
            <span style={{ fontSize: 10, color: 'var(--color-text-muted)', fontWeight: 600 }}>Paused</span>
            <ToggleRow value={!!settings.paused} onChange={v => uc({ paused: v })} label={settings.paused ? 'Paused' : 'Counting'} />
          </div>

          <div className="input-group" style={{ marginTop: 8 }}>
            <div className="input-group-label">Finish Behaviour</div>
            <select
              className="select"
              value={settings.finishBehavior ?? 'freeze'}
              onChange={e => uc({ finishBehavior: e.target.value })}
              style={{ width: '100%', fontSize: 11, padding: '4px 6px', background: 'var(--color-surface-2)', border: '1px solid var(--color-border)', borderRadius: 4, color: 'var(--color-text)' }}
            >
              <option value="freeze">Freeze (00:00)</option>
              <option value="replace-text">Replace with Text</option>
              <option value="hide">Hide Clock</option>
              <option value="switch-scene">Switch Scene</option>
            </select>
          </div>

          {settings.finishBehavior === 'replace-text' && (
            <>
              <div className="input-group" style={{ marginTop: 8 }}>
                <div className="input-group-label">Replacement Text</div>
                <input
                  type="text"
                  className="input"
                  value={settings.replaceText ?? ''}
                  onChange={e => uc({ replaceText: e.target.value })}
                  placeholder="STARTING NOW!"
                  style={{ width: '100%', fontSize: 11, padding: '4px 6px' }}
                />
              </div>
              <div className="input-group" style={{ marginTop: 8 }}>
                <div className="input-group-label">Transition Animation</div>
                <select
                  className="select"
                  value={settings.replaceTransition ?? 'none'}
                  onChange={e => uc({ replaceTransition: e.target.value })}
                  style={{ width: '100%', fontSize: 11, padding: '4px 6px', background: 'var(--color-surface-2)', border: '1px solid var(--color-border)', borderRadius: 4, color: 'var(--color-text)' }}
                >
                  <option value="none">None</option>
                  <option value="fade">Fade In</option>
                  <option value="zoom">Zoom In</option>
                  <option value="slide">Slide In (Up)</option>
                </select>
              </div>
            </>
          )}

          {settings.finishBehavior === 'switch-scene' && (
            <div className="input-group" style={{ marginTop: 8 }}>
              <div className="input-group-label">Target Scene</div>
              <select
                className="select"
                value={settings.switchTargetSceneId ?? ''}
                onChange={e => uc({ switchTargetSceneId: e.target.value || null })}
                style={{ width: '100%', fontSize: 11, padding: '4px 6px', background: 'var(--color-surface-2)', border: '1px solid var(--color-border)', borderRadius: 4, color: 'var(--color-text)' }}
              >
                <option value="">-- Select Scene --</option>
                {scenes.map(s => (
                  <option key={s.id} value={s.id}>{s.label}</option>
                ))}
              </select>
            </div>
          )}
        </InspectorSection>
      );

    case 'latest-follower':
    case 'latest-subscriber':
    case 'latest-donation':
      return (
        <InspectorSection title="Event Settings" icon={<Settings2 size={12} />} defaultOpen>
          <div className="input-group">
            <div className="input-group-label">Header Label</div>
            <input
              type="text"
              className="input"
              value={settings.label ?? ''}
              onChange={e => uc({ label: e.target.value })}
              style={{ width: '100%', fontSize: 11, padding: '4px 6px' }}
              placeholder="Latest Follower"
            />
          </div>
          <div className="input-group" style={{ marginTop: 6 }}>
            <div className="input-group-label">Username</div>
            <input
              type="text"
              className="input"
              value={settings.username ?? ''}
              onChange={e => uc({ username: e.target.value })}
              style={{ width: '100%', fontSize: 11, padding: '4px 6px' }}
              placeholder="Username"
            />
          </div>
        </InspectorSection>
      );

    case 'goal-counter':
    case 'goal-bar':
      return (
        <InspectorSection title="Goal Settings" icon={<Settings2 size={12} />} defaultOpen>
          <div className="input-group">
            <div className="input-group-label">Goal Label</div>
            <input
              type="text"
              className="input"
              value={settings.label ?? ''}
              onChange={e => uc({ label: e.target.value })}
              style={{ width: '100%', fontSize: 11, padding: '4px 6px' }}
              placeholder="Follower Goal"
            />
          </div>
          <div className="input-row" style={{ marginTop: 6 }}>
            <div className="input-with-label" style={{ flex: 1 }}>
              <input
                type="number"
                className="input"
                value={settings.current ?? 0}
                onChange={e => uc({ current: parseInt(e.target.value) || 0 })}
                style={{ width: '100%', fontSize: 11, padding: '4px 6px' }}
              />
              <span className="input-sub-label">Current</span>
            </div>
            <div className="input-with-label" style={{ flex: 1 }}>
              <input
                type="number"
                className="input"
                value={settings.target ?? 100}
                onChange={e => uc({ target: parseInt(e.target.value) || 0 })}
                style={{ width: '100%', fontSize: 11, padding: '4px 6px' }}
              />
              <span className="input-sub-label">Target Goal</span>
            </div>
          </div>
        </InspectorSection>
      );

    case 'chat-box':
      return (
        <InspectorSection title="Chat Settings" icon={<Settings2 size={12} />} defaultOpen>
          <div className="input-group">
            <div className="input-group-label">Max Messages Displayed</div>
            <input
              type="number"
              className="input"
              value={settings.maxMessages ?? 8}
              onChange={e => uc({ maxMessages: parseInt(e.target.value) || 0 })}
              style={{ width: '100%', fontSize: 11, padding: '4px 6px' }}
            />
          </div>
        </InspectorSection>
      );

    case 'spotify':
      return (
        <InspectorSection title="Now Playing Content" icon={<Settings2 size={12} />} defaultOpen>
          <div className="input-group">
            <div className="input-group-label">Track Title</div>
            <input
              type="text"
              className="input"
              value={settings.trackName ?? ''}
              onChange={e => uc({ trackName: e.target.value })}
              style={{ width: '100%', fontSize: 11, padding: '4px 6px' }}
              placeholder="Track Title"
            />
          </div>
          <div className="input-group" style={{ marginTop: 6 }}>
            <div className="input-group-label">Artist Name</div>
            <input
              type="text"
              className="input"
              value={settings.artistName ?? ''}
              onChange={e => uc({ artistName: e.target.value })}
              style={{ width: '100%', fontSize: 11, padding: '4px 6px' }}
              placeholder="Artist"
            />
          </div>
        </InspectorSection>
      );

    case 'badge':
      return (
        <InspectorSection title="Badge Content" icon={<Settings2 size={12} />} defaultOpen>
          <div className="input-group">
            <div className="input-group-label">Badge Text / Icon</div>
            <input
              type="text"
              className="input"
              value={settings.badgeText ?? settings.text ?? ''}
              onChange={e => uc({ badgeText: e.target.value, text: e.target.value })}
              style={{ width: '100%', fontSize: 11, padding: '4px 6px' }}
              placeholder="☕ or Label"
            />
          </div>
        </InspectorSection>
      );

    case 'camera-frame':
      return (
        <InspectorSection title="Camera Settings" icon={<Settings2 size={12} />} defaultOpen>
          <div className="input-group">
            <div className="input-group-label">Frame Label</div>
            <input
              type="text"
              className="input"
              value={settings.frameLabel ?? ''}
              onChange={e => uc({ frameLabel: e.target.value })}
              style={{ width: '100%', fontSize: 11, padding: '4px 6px' }}
              placeholder="e.g. CAMERA, LIVE"
            />
          </div>
        </InspectorSection>
      );

    case 'image':
    case 'gif':
      return (
        <InspectorSection title="Image/GIF Source" icon={<Settings2 size={12} />} defaultOpen>
          <div className="input-group">
            <div className="input-group-label">Image URL / Source</div>
            <input
              type="text"
              className="input"
              value={settings.src ?? settings.url ?? ''}
              onChange={e => uc({ src: e.target.value })}
              style={{ width: '100%', fontSize: 11, padding: '4px 6px' }}
              placeholder="https://example.com/image.png"
            />
          </div>
          {widget.type === 'gif' && (
            <div className="input-group" style={{ marginTop: 8 }}>
              <div className="input-group-label">Scene Switch Behavior</div>
              <select
                className="select"
                value={settings.playPolicy ?? 'restart'}
                onChange={e => uc({ playPolicy: e.target.value })}
                style={{ width: '100%', fontSize: 11, padding: '4px 6px', background: 'var(--color-surface-2)', border: '1px solid var(--color-border)', borderRadius: 4, color: 'var(--color-text)' }}
              >
                <option value="restart">Restart Animation</option>
                <option value="continue">Continue Loop</option>
              </select>
            </div>
          )}
        </InspectorSection>
      );

    case 'video':
      return (
        <InspectorSection title="Video Source" icon={<Settings2 size={12} />} defaultOpen>
          <div className="input-group">
            <div className="input-group-label">Video URL / MP4 Source</div>
            <input
              type="text"
              className="input"
              value={settings.src ?? settings.url ?? ''}
              onChange={e => uc({ src: e.target.value })}
              style={{ width: '100%', fontSize: 11, padding: '4px 6px' }}
              placeholder="https://example.com/video.mp4"
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 }}>
            <span style={{ fontSize: 10, color: 'var(--color-text-muted)', fontWeight: 600 }}>Looping</span>
            <ToggleRow value={settings.loop !== false} onChange={v => uc({ loop: v })} label={settings.loop !== false ? 'Loop' : 'Once'} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 6 }}>
            <span style={{ fontSize: 10, color: 'var(--color-text-muted)', fontWeight: 600 }}>Muted</span>
            <ToggleRow value={settings.muted !== false} onChange={v => uc({ muted: v })} label={settings.muted !== false ? 'Muted' : 'Audio On'} />
          </div>
          <div className="input-group" style={{ marginTop: 8 }}>
            <div className="input-group-label">Scene Switch Behavior</div>
            <select
              className="select"
              value={settings.playPolicy ?? 'restart'}
              onChange={e => uc({ playPolicy: e.target.value })}
              style={{ width: '100%', fontSize: 11, padding: '4px 6px', background: 'var(--color-surface-2)', border: '1px solid var(--color-border)', borderRadius: 4, color: 'var(--color-text)' }}
            >
              <option value="restart">Restart Video</option>
              <option value="resume">Resume Playback</option>
              <option value="pause">Pause Video</option>
            </select>
          </div>
        </InspectorSection>
      );

    case 'clock':
      return (
        <InspectorSection title="Clock Settings" icon={<Settings2 size={12} />} defaultOpen>
          <div className="input-group">
            <div className="input-group-label">Time Format</div>
            <select
              className="select"
              value={settings.format ?? '12h'}
              onChange={e => uc({ format: e.target.value })}
              style={{ width: '100%', fontSize: 11, padding: '4px 6px', background: 'var(--color-surface-2)', border: '1px solid var(--color-border)', borderRadius: 4, color: 'var(--color-text)' }}
            >
              <option value="12h">12-Hour (AM/PM)</option>
              <option value="24h">24-Hour</option>
            </select>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 }}>
            <span style={{ fontSize: 10, color: 'var(--color-text-muted)', fontWeight: 600 }}>Show Seconds</span>
            <ToggleRow value={settings.showSeconds !== false} onChange={v => uc({ showSeconds: v })} label={settings.showSeconds !== false ? 'Show' : 'Hide'} />
          </div>
        </InspectorSection>
      );

    case 'header':
    case 'footer':
      return (
        <InspectorSection title="Layout Text" icon={<Settings2 size={12} />} defaultOpen>
          <div className="input-group">
            <div className="input-group-label">Display Text</div>
            <input
              type="text"
              className="input"
              value={settings.titleText ?? ''}
              onChange={e => uc({ titleText: e.target.value })}
              style={{ width: '100%', fontSize: 11, padding: '4px 6px' }}
              placeholder={widget.type === 'header' ? 'Stream Title' : 'Footer Text'}
            />
          </div>
        </InspectorSection>
      );

    case 'glass-panel':
    case 'container':
      return (
        <InspectorSection title="Panel Label" icon={<Settings2 size={12} />} defaultOpen>
          <div className="input-group">
            <div className="input-group-label">Display Label (Optional)</div>
            <input
              type="text"
              className="input"
              value={settings.text ?? ''}
              onChange={e => uc({ text: e.target.value })}
              style={{ width: '100%', fontSize: 11, padding: '4px 6px' }}
              placeholder="Label..."
            />
          </div>
        </InspectorSection>
      );

    case 'svg':
      return (
        <InspectorSection title="SVG Settings" icon={<Settings2 size={12} />} defaultOpen>
          <div className="input-group">
            <div className="input-group-label">Source Type</div>
            <select
              className="select"
              value={settings.sourceType ?? 'url'}
              onChange={e => uc({ sourceType: e.target.value })}
              style={{ width: '100%', fontSize: 11, padding: '4px 6px', background: 'var(--color-surface-2)', border: '1px solid var(--color-border)', borderRadius: 4, color: 'var(--color-text)' }}
            >
              <option value="url">Remote URL</option>
              <option value="raw">Raw XML Code</option>
            </select>
          </div>
          {settings.sourceType === 'raw' ? (
            <div className="input-group" style={{ marginTop: 8 }}>
              <div className="input-group-label">SVG Raw XML Code</div>
              <textarea
                className="input input-mono"
                value={settings.rawSvg ?? ''}
                onChange={e => uc({ rawSvg: e.target.value })}
                style={{ width: '100%', minHeight: 120, padding: 8, fontSize: 10, fontFamily: 'inherit', resize: 'vertical' }}
                placeholder="<svg ...> ... </svg>"
              />
            </div>
          ) : (
            <div className="input-group" style={{ marginTop: 8 }}>
              <div className="input-group-label">SVG File URL</div>
              <input
                type="text"
                className="input"
                value={settings.src ?? settings.url ?? ''}
                onChange={e => uc({ src: e.target.value })}
                style={{ width: '100%', fontSize: 11, padding: '4px 6px' }}
                placeholder="https://example.com/vector.svg"
              />
            </div>
          )}
        </InspectorSection>
      );

    case 'lottie':
      return (
        <InspectorSection title="Lottie Animation" icon={<Settings2 size={12} />} defaultOpen>
          <div className="input-group">
            <div className="input-group-label">Lottie JSON URL</div>
            <input
              type="text"
              className="input"
              value={settings.src ?? settings.url ?? ''}
              onChange={e => uc({ src: e.target.value })}
              style={{ width: '100%', fontSize: 11, padding: '4px 6px' }}
              placeholder="https://assets.lottiefiles.com/...json"
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 }}>
            <span style={{ fontSize: 10, color: 'var(--color-text-muted)', fontWeight: 600 }}>Looping</span>
            <ToggleRow value={settings.loop !== false} onChange={v => uc({ loop: v })} label={settings.loop !== false ? 'Loop' : 'Once'} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 6 }}>
            <span style={{ fontSize: 10, color: 'var(--color-text-muted)', fontWeight: 600 }}>Autoplay</span>
            <ToggleRow value={settings.autoplay !== false} onChange={v => uc({ autoplay: v })} label={settings.autoplay !== false ? 'Autoplay' : 'Manual'} />
          </div>
          <div className="input-group" style={{ marginTop: 8 }}>
            <div className="input-group-label">Scene Switch Behavior</div>
            <select
              className="select"
              value={settings.playPolicy ?? 'restart'}
              onChange={e => uc({ playPolicy: e.target.value })}
              style={{ width: '100%', fontSize: 11, padding: '4px 6px', background: 'var(--color-surface-2)', border: '1px solid var(--color-border)', borderRadius: 4, color: 'var(--color-text)' }}
            >
              <option value="restart">Restart Animation</option>
              <option value="continue">Continue Loop</option>
            </select>
          </div>
        </InspectorSection>
      );

    case 'social-links': {
      const links = settings.links ?? [
        { platform: 'twitch', handle: '/yourchannel' },
        { platform: 'twitter', handle: '@yourhandle' },
        { platform: 'discord', handle: 'discord.gg/xyz' },
      ];
      const getHandle = (plat: string) => links.find((l: any) => l.platform === plat)?.handle ?? '';
      const setHandle = (plat: string, val: string) => {
        let newLinks = [...links];
        const idx = newLinks.findIndex((l: any) => l.platform === plat);
        if (idx >= 0) {
          if (val === '') {
            newLinks.splice(idx, 1);
          } else {
            newLinks[idx] = { ...newLinks[idx], handle: val };
          }
        } else if (val !== '') {
          newLinks.push({ platform: plat, handle: val });
        }
        uc({ links: newLinks });
      };

      return (
        <InspectorSection title="Social Handles" icon={<Settings2 size={12} />} defaultOpen>
          <div className="input-group">
            <div className="input-group-label">Twitch</div>
            <input
              type="text"
              className="input"
              value={getHandle('twitch')}
              onChange={e => setHandle('twitch', e.target.value)}
              style={{ width: '100%', fontSize: 11, padding: '4px 6px' }}
              placeholder="/yourchannel"
            />
          </div>
          <div className="input-group" style={{ marginTop: 6 }}>
            <div className="input-group-label">Twitter / X</div>
            <input
              type="text"
              className="input"
              value={getHandle('twitter')}
              onChange={e => setHandle('twitter', e.target.value)}
              style={{ width: '100%', fontSize: 11, padding: '4px 6px' }}
              placeholder="@yourhandle"
            />
          </div>
          <div className="input-group" style={{ marginTop: 6 }}>
            <div className="input-group-label">Discord Link</div>
            <input
              type="text"
              className="input"
              value={getHandle('discord')}
              onChange={e => setHandle('discord', e.target.value)}
              style={{ width: '100%', fontSize: 11, padding: '4px 6px' }}
              placeholder="discord.gg/xyz"
            />
          </div>
          <div className="input-group" style={{ marginTop: 6 }}>
            <div className="input-group-label">YouTube</div>
            <input
              type="text"
              className="input"
              value={getHandle('youtube')}
              onChange={e => setHandle('youtube', e.target.value)}
              style={{ width: '100%', fontSize: 11, padding: '4px 6px' }}
              placeholder="/c/yourchannel"
            />
          </div>
        </InspectorSection>
      );
    }

    default:
      return null;
  }
};

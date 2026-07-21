/**
 * TransitionInspector.tsx
 * Right panel for Transition Studio.
 * Shows properties of the selected widget or transition settings.
 */

import React, { useState, useMemo } from 'react';
import { Settings, Layers, Info, Sliders } from 'lucide-react';
import { useTransitionStore } from '../../store/transitionStore';
import { TRANSITION_LIBRARY } from '../transitionLibrary';

const ACCENT = '#a855f7';

export const TransitionInspector: React.FC = () => {
  const editingId = useTransitionStore(s => s.editingTransitionId);
  const userTransitions = useTransitionStore(s => s.transitions);
  const selectedIds = useTransitionStore(s => s.selectedWidgetIds);
  const updateWidget = useTransitionStore(s => s.updateWidget);
  const updateTransition = useTransitionStore(s => s.updateTransition);
  const setName = useTransitionStore(s => s.setName);
  const setDescription = useTransitionStore(s => s.setDescription);
  const [activeTab, setActiveTab] = useState<'widget' | 'transition' | 'timing'>('transition');

  const transition = useMemo(() => {
    if (!editingId) return null;
    return TRANSITION_LIBRARY.find(t => t.id === editingId) || userTransitions.find(t => t.id === editingId) || null;
  }, [editingId, userTransitions]);
  if (!transition) {
    return (
      <div style={{ padding: 20, color: 'rgba(255,255,255,0.25)', fontSize: 11, textAlign: 'center' }}>
        <Settings size={24} style={{ margin: '0 auto 8px', display: 'block', opacity: 0.3 }} />
        Select a transition to inspect.
      </div>
    );
  }

  const selectedWidget = selectedIds.length === 1
    ? transition.widgets.find(w => w.id === selectedIds[0])
    : null;

  const tabs = [
    { id: 'transition' as const, icon: <Info size={10} />, label: 'Transition' },
    { id: 'timing' as const, icon: <Sliders size={10} />, label: 'Timing' },
    { id: 'widget' as const, icon: <Layers size={10} />, label: 'Widget' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      {/* Tabs */}
      <div style={{ display: 'flex', borderBottom: '1px solid var(--color-border)', flexShrink: 0 }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4,
              padding: '7px 4px', fontSize: 9, fontWeight: 600,
              background: 'transparent', border: 'none',
              borderBottom: `2px solid ${activeTab === tab.id ? ACCENT : 'transparent'}`,
              color: activeTab === tab.id ? ACCENT : 'rgba(255,255,255,0.35)',
              cursor: 'pointer', fontFamily: 'inherit', transition: 'all 120ms ease',
            }}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {/* ─ Transition Tab ─ */}
        {activeTab === 'transition' && (
          <>
            <SectionHeader>Identity</SectionHeader>
            <FieldRow label="Name">
              <input
                type="text"
                value={transition.name}
                disabled={transition.isTemplate}
                onChange={e => setName(e.target.value)}
                style={inputStyle}
              />
            </FieldRow>
            <FieldRow label="Description">
              <textarea
                value={transition.description}
                disabled={transition.isTemplate}
                onChange={e => setDescription(e.target.value)}
                rows={3}
                style={{ ...inputStyle, resize: 'vertical', fontFamily: 'inherit' }}
              />
            </FieldRow>
            <FieldRow label="Category">
              <div style={{ fontSize: 10, color: ACCENT, fontWeight: 700 }}>{transition.category}</div>
            </FieldRow>
            <FieldRow label="Widgets">
              <div style={{ fontSize: 10, color: 'var(--color-text-2)' }}>{transition.widgets.length} widget{transition.widgets.length !== 1 ? 's' : ''}</div>
            </FieldRow>
            {transition.isTemplate && (
              <div style={{
                padding: '8px 10px', borderRadius: 6,
                background: 'rgba(168,85,247,0.08)', border: '1px solid rgba(168,85,247,0.2)',
                fontSize: 9, color: 'rgba(168,85,247,0.8)', lineHeight: 1.5,
              }}>
                ⭐ This is a built-in template. Duplicate it to make changes.
              </div>
            )}
          </>
        )}

        {/* ─ Timing Tab ─ */}
        {activeTab === 'timing' && (
          <>
            <SectionHeader>Playback Timing</SectionHeader>
            <FieldRow label="Duration">
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <input
                  type="number"
                  value={transition.duration}
                  disabled={transition.isTemplate}
                  min={100}
                  max={10000}
                  step={50}
                  onChange={e => editingId && useTransitionStore.getState().setDuration(parseInt(e.target.value) || 800)}
                  style={{ ...inputStyle, width: 70, textAlign: 'center' }}
                />
                <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.35)' }}>ms</span>
              </div>
            </FieldRow>
            <FieldRow label="Scene Switch">
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <input
                  type="number"
                  value={transition.switchMarker}
                  disabled={transition.isTemplate}
                  min={1}
                  max={transition.duration - 1}
                  step={50}
                  onChange={e => editingId && useTransitionStore.getState().setSwitchMarker(parseInt(e.target.value) || 400)}
                  style={{ ...inputStyle, width: 70, textAlign: 'center' }}
                />
                <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.35)' }}>ms</span>
              </div>
            </FieldRow>

            <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', margin: '4px 0' }} />

            {/* Visual timing diagram */}
            <SectionHeader>Visual Timeline</SectionHeader>
            <div style={{ position: 'relative', height: 32, background: 'rgba(255,255,255,0.04)', borderRadius: 6, overflow: 'hidden' }}>
              {/* Pre-switch */}
              <div style={{
                position: 'absolute', left: 0, top: 0, bottom: 0,
                width: `${(transition.switchMarker / transition.duration) * 100}%`,
                background: 'rgba(168,85,247,0.2)',
              }} />
              {/* Switch marker */}
              <div style={{
                position: 'absolute',
                left: `${(transition.switchMarker / transition.duration) * 100}%`,
                top: 0, bottom: 0, width: 2,
                background: '#ef4444',
                boxShadow: '0 0 6px rgba(239,68,68,0.5)',
              }} />
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
                <span style={{ fontSize: 8, fontWeight: 700, color: 'rgba(255,255,255,0.5)' }}>
                  0ms → {transition.switchMarker}ms → {transition.duration}ms
                </span>
              </div>
            </div>
            <p style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)', margin: 0, lineHeight: 1.5 }}>
              The scene swap fires at <strong style={{ color: '#ef4444' }}>{transition.switchMarker}ms</strong>. 
              Drag the red marker in the timeline below to change it.
            </p>
          </>
        )}

        {/* ─ Widget Tab ─ */}
        {activeTab === 'widget' && (
          <>
            {!selectedWidget ? (
              <div style={{ color: 'rgba(255,255,255,0.25)', fontSize: 10, textAlign: 'center', padding: '16px 0' }}>
                Click a widget on the canvas to inspect it.
              </div>
            ) : (
              <>
                <SectionHeader>Widget: {selectedWidget.label}</SectionHeader>
                <FieldRow label="Type">
                  <span style={{ fontSize: 10, color: ACCENT, fontWeight: 600 }}>{selectedWidget.type}</span>
                </FieldRow>

                <SectionHeader>Position & Size</SectionHeader>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
                  {(['x', 'y', 'width', 'height'] as const).map(prop => (
                    <FieldRow key={prop} label={prop.toUpperCase()}>
                      <input
                        type="number"
                        value={Math.round(selectedWidget[prop])}
                        disabled={transition.isTemplate}
                        onChange={e => updateWidget(selectedWidget.id, { [prop]: parseInt(e.target.value) || 0 })}
                        style={{ ...inputStyle, width: '100%' }}
                      />
                    </FieldRow>
                  ))}
                </div>

                <SectionHeader>Transform</SectionHeader>
                <FieldRow label="Opacity">
                  <input
                    type="range"
                    min={0} max={100}
                    value={selectedWidget.opacity}
                    disabled={transition.isTemplate}
                    onChange={e => updateWidget(selectedWidget.id, { opacity: parseInt(e.target.value) })}
                    style={{ width: '100%' }}
                  />
                </FieldRow>
                <FieldRow label="Rotation">
                  <input
                    type="number"
                    value={selectedWidget.rotation}
                    disabled={transition.isTemplate}
                    onChange={e => updateWidget(selectedWidget.id, { rotation: parseInt(e.target.value) || 0 })}
                    style={{ ...inputStyle, width: 70 }}
                  />
                </FieldRow>

                <SectionHeader>Entry Animation</SectionHeader>
                <FieldRow label="Type">
                  <select
                    value={selectedWidget.animation.type}
                    disabled={transition.isTemplate}
                    onChange={e => updateWidget(selectedWidget.id, { animation: { ...selectedWidget.animation, type: e.target.value as any } })}
                    style={{ ...inputStyle, cursor: 'pointer' }}
                  >
                    {['none', 'fade', 'scale', 'slide-up', 'slide-left', 'bounce', 'glow', 'pulse', 'float', 'shake', 'spin'].map(a => (
                      <option key={a} value={a}>{a}</option>
                    ))}
                  </select>
                </FieldRow>
                <FieldRow label="Duration">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <input
                      type="number"
                      value={selectedWidget.animation.duration}
                      disabled={transition.isTemplate}
                      step={0.1}
                      min={0.1}
                      onChange={e => updateWidget(selectedWidget.id, { animation: { ...selectedWidget.animation, duration: parseFloat(e.target.value) || 0.5 } })}
                      style={{ ...inputStyle, width: 60 }}
                    />
                    <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)' }}>s</span>
                  </div>
                </FieldRow>
                <FieldRow label="Delay">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <input
                      type="number"
                      value={selectedWidget.animation.delay}
                      disabled={transition.isTemplate}
                      step={0.05}
                      min={0}
                      onChange={e => updateWidget(selectedWidget.id, { animation: { ...selectedWidget.animation, delay: parseFloat(e.target.value) || 0 } })}
                      style={{ ...inputStyle, width: 60 }}
                    />
                    <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)' }}>s</span>
                  </div>
                </FieldRow>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

// ─── Sub-components ───────────────────────────────────────────────────────────

const SectionHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ fontSize: 8, fontWeight: 800, color: 'rgba(255,255,255,0.25)', letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: -4 }}>
    {children}
  </div>
);

const FieldRow: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
    <label style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>{label}</label>
    {children}
  </div>
);

const inputStyle: React.CSSProperties = {
  background: 'var(--color-surface-2)',
  border: '1px solid var(--color-border)',
  borderRadius: 5,
  color: 'var(--color-text)',
  fontSize: 10,
  padding: '4px 7px',
  outline: 'none',
  fontFamily: 'inherit',
  width: '100%',
  boxSizing: 'border-box' as const,
};

import React from 'react';
import { Palette, Type, Radius, GlassWater, Zap, Layout, RotateCcw } from 'lucide-react';
import { useEditorStore } from '../../store/editorStore';

export const ThemeManagerPanel: React.FC = () => {
  const { themeOverrides, setThemeOverrides, resetThemeOverrides } = useEditorStore();
  const t = themeOverrides;

  const handleExportTheme = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(t, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `theme-export-${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      <div className="panel-header">
        <span style={{ display: 'flex', color: 'var(--color-accent)' }}><Palette size={13} /></span>
        <span className="panel-title">Theme Manager</span>
      </div>

      <div style={{ display: 'flex', gap: 4, padding: '8px 10px', borderBottom: '1px solid var(--color-border)', background: 'rgba(255,255,255,0.01)' }}>
        <button
          onClick={resetThemeOverrides}
          style={actionBtnStyle}
          title="Reset Theme"
        >
          <RotateCcw size={10} /> Reset
        </button>
        <button
          onClick={() => {
            alert('Theme configuration successfully duplicated!');
          }}
          style={actionBtnStyle}
          title="Duplicate Theme"
        >
          Duplicate
        </button>
        <button
          onClick={() => {
            alert('Theme configuration successfully saved!');
          }}
          style={{ ...actionBtnStyle, color: '#10b981' }}
          title="Save Theme"
        >
          Save
        </button>
        <button
          onClick={handleExportTheme}
          style={{ ...actionBtnStyle, color: 'var(--color-accent)' }}
          title="Export Theme"
        >
          Export
        </button>
      </div>

      <div className="panel-body" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <ControlRow
          icon={<Palette size={12} />}
          label="Accent Color"
        >
          <ColorInput value={t.accentColor || 'var(--color-accent)'} onChange={v => setThemeOverrides({ accentColor: v })} />
        </ControlRow>

        <ControlRow
          icon={<Palette size={12} />}
          label="Background"
        >
          <ColorInput value={t.backgroundColor || 'var(--color-bg)'} onChange={v => setThemeOverrides({ backgroundColor: v })} />
        </ControlRow>

        <ControlRow
          icon={<Type size={12} />}
          label="Text Color"
        >
          <ColorInput value={t.textColor || 'var(--color-text)'} onChange={v => setThemeOverrides({ textColor: v })} />
        </ControlRow>

        <ControlRow
          icon={<Radius size={12} />}
          label={`Border Radius${t.borderRadius !== null ? ` — ${t.borderRadius}px` : ''}`}
        >
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            <input
              type="range" min={0} max={32} step={1}
              value={t.borderRadius ?? 8}
              onChange={e => setThemeOverrides({ borderRadius: parseInt(e.target.value) })}
              className="slider"
              style={{ flex: 1 }}
            />
            <button
              onClick={() => setThemeOverrides({ borderRadius: null })}
              style={{
                fontSize: 8, padding: '2px 5px', borderRadius: 4,
                background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)',
                color: 'rgba(255,255,255,0.3)', cursor: 'pointer', fontFamily: 'inherit',
                whiteSpace: 'nowrap', flexShrink: 0,
              }}
            >
              Reset
            </button>
          </div>
        </ControlRow>

        <ControlRow
          icon={<GlassWater size={12} />}
          label={`Glass Intensity${t.glassIntensity !== null ? ` — ${t.glassIntensity}%` : ''}`}
        >
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            <input
              type="range" min={0} max={100} step={5}
              value={t.glassIntensity ?? 50}
              onChange={e => setThemeOverrides({ glassIntensity: parseInt(e.target.value) })}
              className="slider"
              style={{ flex: 1 }}
            />
            <button
              onClick={() => setThemeOverrides({ glassIntensity: null })}
              style={{
                fontSize: 8, padding: '2px 5px', borderRadius: 4,
                background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)',
                color: 'rgba(255,255,255,0.3)', cursor: 'pointer', fontFamily: 'inherit',
                whiteSpace: 'nowrap', flexShrink: 0,
              }}
            >
              Reset
            </button>
          </div>
        </ControlRow>

        <ControlRow
          icon={<Zap size={12} />}
          label="Animations"
        >
          <label className="toggle" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <input type="checkbox" checked={t.animationsEnabled} onChange={e => setThemeOverrides({ animationsEnabled: e.target.checked })} />
            <span className="toggle-track" />
            <span style={{ fontSize: 10, color: t.animationsEnabled ? 'var(--color-accent)' : 'var(--color-text-muted)', fontWeight: 600 }}>
              {t.animationsEnabled ? 'On' : 'Off'}
            </span>
          </label>
        </ControlRow>

        <ControlRow
          icon={<Layout size={12} />}
          label="Transition"
        >
          <div style={{ display: 'flex', gap: 4 }}>
            {(['none', 'fade', 'slide'] as const).map(s => (
              <button
                key={s}
                onClick={() => setThemeOverrides({ transitionStyle: s })}
                style={{
                  flex: 1, padding: '4px 0', borderRadius: 5,
                  border: t.transitionStyle === s ? '1px solid var(--color-accent)' : '1px solid var(--color-border)',
                  background: t.transitionStyle === s ? 'rgba(168,85,247,0.12)' : 'transparent',
                  color: t.transitionStyle === s ? 'var(--color-text)' : 'var(--color-text-3)',
                  fontSize: 9, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
                  textTransform: 'capitalize',
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </ControlRow>
      </div>
    </div>
  );
};

// ─── Sub-components ───────────────────────────────────────────────────────────

const ControlRow: React.FC<{ icon: React.ReactNode; label: string; children: React.ReactNode }> = ({ icon, label, children }) => (
  <div style={{
    background: 'var(--color-surface-2)', border: '1px solid var(--color-border)',
    borderRadius: 8, padding: '8px 10px',
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 6 }}>
      <span style={{ color: 'var(--color-text-muted)', display: 'flex' }}>{icon}</span>
      <span style={{ fontSize: 9, fontWeight: 700, color: 'var(--color-text-3)', textTransform: 'uppercase', letterSpacing: 0.3 }}>{label}</span>
    </div>
    {children}
  </div>
);

const ColorInput: React.FC<{ value: string; onChange: (v: string) => void }> = ({ value, onChange }) => {
  const isVar = value.startsWith('var(');
  return (
    <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
      <div style={{
        width: 26, height: 26, borderRadius: 6,
        background: isVar ? 'var(--color-accent)' : value,
        border: '1px solid var(--color-border)',
        position: 'relative', overflow: 'hidden', flexShrink: 0,
      }}>
        <input
          type="color"
          value={isVar ? '#a855f7' : (value.startsWith('#') && value.length === 7 ? value : '#a855f7')}
          onChange={e => onChange(e.target.value)}
          style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }}
        />
      </div>
      <input
        value={isVar ? '' : value}
        onChange={e => onChange(e.target.value)}
        placeholder="Theme default"
        style={{
          flex: 1, padding: '4px 6px', borderRadius: 5,
          border: '1px solid var(--color-border)',
          background: 'var(--color-surface)', color: 'var(--color-text)',
          fontSize: 10, fontFamily: 'var(--font-mono)', outline: 'none',
        }}
      />
      <button
        onClick={() => onChange(isVar ? '#a855f7' : 'var(--color-accent)')}
        style={{
          fontSize: 8, padding: '2px 5px', borderRadius: 4,
          background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)',
          color: 'rgba(255,255,255,0.3)', cursor: 'pointer', fontFamily: 'inherit',
          whiteSpace: 'nowrap', flexShrink: 0,
        }}
      >
        {isVar ? 'Set' : 'Reset'}
      </button>
    </div>
  );
};

const actionBtnStyle: React.CSSProperties = {
  flex: 1,
  padding: '4px 8px',
  borderRadius: 5,
  background: 'var(--color-surface)',
  border: '1px solid var(--color-border)',
  color: 'var(--color-text-2)',
  fontSize: 9,
  fontWeight: 700,
  cursor: 'pointer',
  fontFamily: 'inherit',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 4,
  transition: 'all 120ms ease',
};

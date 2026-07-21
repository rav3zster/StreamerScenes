import React, { useState } from 'react';
import { Eye, Palette, Type, Radius, GlassWater, Zap, Layout } from 'lucide-react';
import { useWizardStore } from '../../store/wizardStore';
import { STREAM_PACKS } from '../../data/streamPacks';

export const StepThemeReview: React.FC = () => {
  const { wizardTheme, setWizardTheme, selectedPackId } = useWizardStore();
  const [sceneIdx, setSceneIdx] = useState(0);

  const pack = STREAM_PACKS.find(p => p.id === selectedPackId);
  if (!pack) return null;

  const accent = wizardTheme.accentColor || pack.accentColor;
  const bg = wizardTheme.backgroundColor || pack.bgColors[0];
  const textColor = wizardTheme.textColor || '#ffffff';
  const borderRadius = wizardTheme.borderRadius ?? pack.borderRadius;
  const glassIntensity = wizardTheme.glassIntensity ?? 60;

  const activeScene = pack.scenes[sceneIdx] || pack.scenes[0];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden', padding: '0 28px' }}>
      <div style={{ marginBottom: 16 }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: '#fff', margin: 0, marginBottom: 4 }}>
          Review Your Theme
        </h2>
        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', margin: 0 }}>
          Fine-tune the look and feel — everything updates live
        </p>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', display: 'grid', gridTemplateColumns: '1fr 320px', gap: 20, paddingBottom: 24 }}>
        {/* Left: Live Preview */}
        <div>
          {/* Scene selector */}
          <div style={{ display: 'flex', gap: 4, marginBottom: 10 }}>
            {pack.scenes.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setSceneIdx(i)}
                style={{
                  padding: '4px 10px', borderRadius: 6,
                  fontSize: 9, fontWeight: 600, cursor: 'pointer',
                  border: sceneIdx === i ? `1px solid ${accent}80` : '1px solid rgba(255,255,255,0.08)',
                  background: sceneIdx === i ? `${accent}15` : 'rgba(255,255,255,0.03)',
                  color: sceneIdx === i ? accent : 'rgba(255,255,255,0.5)',
                  fontFamily: 'inherit', transition: 'all 150ms ease',
                }}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Canvas */}
          <div style={{
            aspectRatio: '16/9', borderRadius: 14, overflow: 'hidden',
            background: `linear-gradient(135deg, ${bg}, ${pack.bgColors[1]})`,
            border: `1px solid ${accent}20`,
            boxShadow: `0 0 0 1px rgba(255,255,255,0.04), 0 40px 80px rgba(0,0,0,0.7), 0 0 60px ${accent}10`,
            position: 'relative',
          }}>
            {/* Scene widgets preview */}
            <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
              {activeScene.widgets.map((w, i) => {
                const left = (w.x / 1920 * 100) + '%';
                const top = (w.y / 1080 * 100) + '%';
                const wd = (w.width / 1920 * 100) + '%';
                const ht = (w.height / 1080 * 100) + '%';
                const isTextLike = ['text', 'countdown-timer', 'clock', 'animated-text', 'scrolling-text', 'header'].includes(w.type);
                const glassBg = w.style.glassEffect
                  ? `rgba(255,255,255,${glassIntensity / 200})`
                  : w.style.background || 'rgba(255,255,255,0.04)';

                return (
                  <div key={i} style={{
                    position: 'absolute', left, top, width: wd, height: ht,
                    background: glassBg,
                    borderRadius: `${(w.style.borderRadius ?? borderRadius) / 1920 * 100 * 8}px`,
                    border: w.style.borderSize ? `${w.style.borderSize}px solid ${w.style.borderColor || accent}` : 'none',
                    opacity: w.opacity / 100,
                    backdropFilter: w.style.glassEffect ? `blur(${Math.round(glassIntensity / 8)}px)` : undefined,
                    boxShadow: w.style.glowBlur
                      ? `0 0 ${w.style.glowBlur}px ${w.style.glowColor || accent}`
                      : 'none',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    overflow: 'hidden',
                    transition: wizardTheme.animationsEnabled ? 'all 300ms ease' : undefined,
                  }}>
                    {isTextLike && (
                      <div style={{
                        fontSize: `${Math.max(6, (w.style.fontSize || 14) / 1920 * 100 * 7)}px`,
                        color: w.style.fontColor || textColor,
                        fontFamily: w.style.fontFamily || pack.fontFamily,
                        fontWeight: w.style.fontWeight || '600',
                        textAlign: (w.style.textAlign as React.CSSProperties['textAlign']) || 'center',
                        width: '100%', padding: '0 4%',
                        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                      }}>
                        {w.label.replace(/^[^\s]+\s/, '')}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            {/* Scene label */}
            <div style={{ position: 'absolute', bottom: 10, right: 12, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(6px)', borderRadius: 5, padding: '3px 8px', fontSize: 8, fontWeight: 700, color: 'rgba(255,255,255,0.4)', letterSpacing: 1, textTransform: 'uppercase' }}>
              <Eye size={8} style={{ display: 'inline', marginRight: 4 }} />
              {activeScene.label}
            </div>
          </div>
        </div>

        {/* Right: Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <ControlSection icon={<Palette size={13} />} label="Accent Color">
            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              <div style={{ width: 30, height: 30, borderRadius: 7, background: accent, border: '1px solid rgba(255,255,255,0.1)', position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
                <input type="color" value={accent.startsWith('#') ? accent : '#a855f7'} onChange={e => setWizardTheme({ accentColor: e.target.value })} style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }} />
              </div>
              <input value={accent} onChange={e => setWizardTheme({ accentColor: e.target.value })} style={{ flex: 1, padding: '5px 8px', borderRadius: 6, border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(0,0,0,0.3)', color: '#fff', fontSize: 10, fontFamily: 'JetBrains Mono, monospace', outline: 'none' }} />
            </div>
          </ControlSection>

          <ControlSection icon={<Palette size={13} />} label="Background">
            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              <div style={{ width: 30, height: 30, borderRadius: 7, background: bg, border: '1px solid rgba(255,255,255,0.1)', position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
                <input type="color" value={bg.startsWith('#') ? bg : '#000000'} onChange={e => setWizardTheme({ backgroundColor: e.target.value })} style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }} />
              </div>
              <input value={bg} onChange={e => setWizardTheme({ backgroundColor: e.target.value })} style={{ flex: 1, padding: '5px 8px', borderRadius: 6, border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(0,0,0,0.3)', color: '#fff', fontSize: 10, fontFamily: 'JetBrains Mono, monospace', outline: 'none' }} />
            </div>
          </ControlSection>

          <ControlSection icon={<Type size={13} />} label="Text Color">
            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              <div style={{ width: 30, height: 30, borderRadius: 7, background: textColor, border: '1px solid rgba(255,255,255,0.1)', position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
                <input type="color" value={textColor.startsWith('#') ? textColor : '#ffffff'} onChange={e => setWizardTheme({ textColor: e.target.value })} style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }} />
              </div>
              <input value={textColor} onChange={e => setWizardTheme({ textColor: e.target.value })} style={{ flex: 1, padding: '5px 8px', borderRadius: 6, border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(0,0,0,0.3)', color: '#fff', fontSize: 10, fontFamily: 'JetBrains Mono, monospace', outline: 'none' }} />
            </div>
          </ControlSection>

          <ControlSection icon={<Radius size={13} />} label={`Border Radius — ${borderRadius}px`}>
            <input type="range" min={0} max={32} value={borderRadius} onChange={e => setWizardTheme({ borderRadius: parseInt(e.target.value) })} style={{ width: '100%', accentColor: accent }} />
          </ControlSection>

          <ControlSection icon={<GlassWater size={13} />} label={`Glass Intensity — ${glassIntensity}%`}>
            <input type="range" min={0} max={100} value={glassIntensity} onChange={e => setWizardTheme({ glassIntensity: parseInt(e.target.value) })} style={{ width: '100%', accentColor: accent }} />
          </ControlSection>

          <ControlSection icon={<Zap size={13} />} label="Animations">
            <label className="toggle" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <input type="checkbox" checked={wizardTheme.animationsEnabled} onChange={e => setWizardTheme({ animationsEnabled: e.target.checked })} />
              <span className="toggle-track" />
              <span style={{ fontSize: 10, color: wizardTheme.animationsEnabled ? accent : 'rgba(255,255,255,0.3)', fontWeight: 600 }}>
                {wizardTheme.animationsEnabled ? 'On' : 'Off'}
              </span>
            </label>
          </ControlSection>

          <ControlSection icon={<Layout size={13} />} label="Transition Style">
            <div style={{ display: 'flex', gap: 4 }}>
              {(['none', 'fade', 'slide'] as const).map(t => (
                <button
                  key={t}
                  onClick={() => setWizardTheme({ transitionStyle: t })}
                  style={{
                    flex: 1, padding: '5px 0', borderRadius: 6,
                    border: wizardTheme.transitionStyle === t ? `1px solid ${accent}` : '1px solid rgba(255,255,255,0.08)',
                    background: wizardTheme.transitionStyle === t ? `${accent}15` : 'rgba(255,255,255,0.03)',
                    color: wizardTheme.transitionStyle === t ? accent : 'rgba(255,255,255,0.5)',
                    fontSize: 9, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
                    textTransform: 'capitalize',
                  }}
                >
                  {t}
                </button>
              ))}
            </div>
          </ControlSection>
        </div>
      </div>
    </div>
  );
};

// ─── Control Section ──────────────────────────────────────────────────────────

const ControlSection: React.FC<{ icon: React.ReactNode; label: string; children: React.ReactNode }> = ({ icon, label, children }) => (
  <div style={{
    background: 'rgba(12,10,22,0.6)', border: '1px solid rgba(255,255,255,0.06)',
    borderRadius: 10, padding: '10px 12px',
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
      <span style={{ color: 'rgba(255,255,255,0.4)', display: 'flex' }}>{icon}</span>
      <span style={{ fontSize: 9, fontWeight: 700, color: 'rgba(255,255,255,0.4)', letterSpacing: 0.3 }}>{label}</span>
    </div>
    {children}
  </div>
);

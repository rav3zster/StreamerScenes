import React, { useState } from 'react';
import { useEditorStore } from '../store/editorStore';
import { STREAM_PACKS, type StreamPack } from '../data/streamPacks';
import { Sparkles, Check, Monitor, Layout, ArrowRight } from 'lucide-react';

export const WelcomeWizard: React.FC = () => {
  const { createProjectFromPack } = useEditorStore();
  const [projName, setProjName] = useState('My Stream Overlay');
  const [selectedPackId, setSelectedPackId] = useState(STREAM_PACKS[0].id);
  const [activePreviewSceneIdx, setActivePreviewSceneIdx] = useState(0);

  const currentPack = STREAM_PACKS.find(p => p.id === selectedPackId) || STREAM_PACKS[0];
  const previewScene = currentPack.scenes[activePreviewSceneIdx] || currentPack.scenes[0];

  const handleCreate = () => {
    createProjectFromPack(projName, selectedPackId);
  };

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 99999,
        background: '#05030a',
        backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.12) 0%, transparent 60%), radial-gradient(circle at 10% 10%, rgba(92, 255, 226, 0.05) 0%, transparent 40%)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 24, overflowY: 'auto',
      }}
    >
      <div
        style={{
          width: '100%', maxWidth: 1100,
          background: 'rgba(12, 10, 26, 0.8)',
          border: '1px solid rgba(139, 92, 246, 0.25)',
          borderRadius: 24, padding: 32,
          boxShadow: '0 20px 80px rgba(0,0,0,0.8), 0 0 40px rgba(139, 92, 246, 0.15)',
          backdropFilter: 'blur(20px)',
          display: 'flex', flexDirection: 'column', gap: 24,
          animation: 'slide-up 300ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
              <span style={{ fontSize: 24 }}>⚡</span>
              <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 24, fontWeight: 900, letterSpacing: -0.5, color: '#fff' }}>
                VibeOverlay <span style={{ color: 'var(--color-accent)' }}>Studio</span>
              </h1>
            </div>
            <p style={{ fontSize: 13, color: 'var(--color-text-3)' }}>
              Choose a flagship Stream Pack to generate a complete broadcast identity.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center', background: 'rgba(168, 85, 247, 0.08)', border: '1px solid rgba(168,85,247,0.2)', padding: '6px 12px', borderRadius: 99, fontSize: 11, fontWeight: 700, color: 'var(--color-accent)' }}>
            <Sparkles size={12} />
            Flagship Onboarding
          </div>
        </div>

        {/* Content columns */}
        <div style={{ display: 'grid', gridTemplateColumns: '400px 1fr', gap: 28, minHeight: 480 }}>
          {/* Left Column: Name & Pack Picker */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Project Name input */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <label style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1, color: 'var(--color-text-muted)' }}>Project Name</label>
              <input
                className="input"
                value={projName}
                onChange={e => setProjName(e.target.value)}
                placeholder="My Overlay Project"
                style={{ padding: '10px 14px', fontSize: 13, borderRadius: 10 }}
              />
            </div>

            {/* Pack List Selection */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1, overflowY: 'auto' }}>
              <label style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1, color: 'var(--color-text-muted)' }}>Select Stream Pack</label>
              {STREAM_PACKS.map(pack => {
                const isSelected = pack.id === selectedPackId;
                return (
                  <div
                    key={pack.id}
                    onClick={() => {
                      setSelectedPackId(pack.id);
                      setActivePreviewSceneIdx(0);
                    }}
                    style={{
                      padding: 14, borderRadius: 14,
                      background: isSelected ? 'rgba(168, 85, 247, 0.12)' : 'rgba(255,255,255,0.02)',
                      border: isSelected ? '1px solid var(--color-accent)' : '1px solid var(--color-border)',
                      cursor: 'pointer', transition: 'all 200ms ease',
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      position: 'relative', overflow: 'hidden',
                    }}
                  >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 3, flex: 1 }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: isSelected ? '#fff' : 'var(--color-text-2)' }}>{pack.name}</span>
                      <span style={{ fontSize: 10, color: 'var(--color-text-muted)', lineHeight: 1.3, paddingRight: 10 }}>{pack.desc}</span>
                    </div>

                    {/* Indicator dots color */}
                    <div style={{ display: 'flex', gap: 4, marginRight: 8 }}>
                      <div style={{ width: 10, height: 10, borderRadius: '50%', background: pack.accentColor, border: '1px solid rgba(255,255,255,0.1)' }} />
                      <div style={{ width: 10, height: 10, borderRadius: '50%', background: pack.bgColors[0] }} />
                    </div>

                    {isSelected && (
                      <div style={{ width: 16, height: 16, borderRadius: '50%', background: 'var(--color-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Check size={10} color="#fff" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Dynamic Scene & Widget Preview */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, border: '1px solid var(--color-border)', borderRadius: 16, background: 'var(--color-surface)', padding: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1, color: 'var(--color-text-muted)' }}>Pack Scene Preview</span>
              {/* Scene Tabs selector */}
              <div style={{ display: 'flex', gap: 4 }}>
                {currentPack.scenes.map((s, idx) => (
                  <button
                    key={s.id}
                    className={`category-pill${activePreviewSceneIdx === idx ? ' active' : ''}`}
                    onClick={() => setActivePreviewSceneIdx(idx)}
                    style={{ fontSize: 10, padding: '3px 8px' }}
                  >
                    {s.label.split(' ')[1] || s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Visual Mini Canvas Layout Mockup */}
            <div
              style={{
                flex: 1, aspectRatio: '16/9',
                background: `linear-gradient(135deg, ${currentPack.bgColors[0]}, ${currentPack.bgColors[1]})`,
                borderRadius: 12, position: 'relative', overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.05)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: 'inset 0 0 20px rgba(0,0,0,0.8)',
              }}
            >
              {/* Mini mockup elements */}
              {previewScene.widgets.map((w, idx) => {
                // Scale coordinates down to match preview aspect ratio (~300px scale instead of 1920px)
                const scale = 0.25;
                return (
                  <div
                    key={idx}
                    style={{
                      position: 'absolute',
                      left: `${w.x * scale}px`,
                      top: `${w.y * scale}px`,
                      width: `${w.width * scale}px`,
                      height: `${w.height * scale}px`,
                      transform: `rotate(${w.rotation}deg)`,
                      background: w.style.background || 'rgba(255,255,255,0.05)',
                      borderRadius: w.style.borderRadius ? `${w.style.borderRadius * scale}px` : undefined,
                      border: w.style.borderSize ? '1px solid var(--color-accent)' : 'none',
                      opacity: w.opacity / 100,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 8, color: w.style.fontColor || '#fff',
                      fontFamily: w.style.fontFamily || 'sans-serif',
                      padding: 2, overflow: 'hidden',
                      boxShadow: w.style.glowBlur ? `0 0 10px ${w.style.glowColor}` : undefined,
                    }}
                  >
                    <span style={{ fontSize: 8, whiteSpace: 'nowrap' }}>{w.label}</span>
                  </div>
                );
              })}
            </div>

            {/* Bottom details block */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, paddingTop: 12, borderTop: '1px solid var(--color-border)' }}>
              <div>
                <span style={{ fontSize: 9, fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 4, marginBottom: 4 }}>
                  <Layout size={10} /> Included Widgets
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                  {previewScene.widgets.map((w, idx) => (
                    <span key={idx} className="type-chip" style={{ fontSize: 8, padding: '1px 5px' }}>{w.type}</span>
                  ))}
                </div>
              </div>
              <div>
                <span style={{ fontSize: 9, fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 4, marginBottom: 4 }}>
                  <Monitor size={10} /> Included Stickers & PNGs
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                  {currentPack.decorations.map((d, idx) => (
                    <span key={idx} style={{ fontSize: 8, color: 'var(--color-text-2)', background: 'rgba(255,255,255,0.02)', padding: '2px 6px', borderRadius: 4, border: '1px solid var(--color-border)' }}>{d}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--color-border)', paddingTop: 20 }}>
          <div style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>
            Design System: <span style={{ color: 'var(--color-text-2)', fontWeight: 600 }}>{currentPack.fontFamily} Font</span> • <span style={{ color: 'var(--color-text-2)', fontWeight: 600 }}>{currentPack.borderRadius}px Corners</span>
          </div>
          <button
            className="btn btn-primary"
            style={{ fontSize: 13, padding: '10px 24px', borderRadius: 12, gap: 8, display: 'flex', alignItems: 'center' }}
            onClick={handleCreate}
          >
            Create Project & Import Pack
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

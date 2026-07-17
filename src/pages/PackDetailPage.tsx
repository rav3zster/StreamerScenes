import React, { useState } from 'react';
import {
  ArrowLeft, Sparkles, Film, Layout, Type, Image,
  Zap, ChevronRight, Check, Play,
} from 'lucide-react';
import { useEditorStore } from '../store/editorStore';
import { STREAM_PACKS } from '../data/streamPacks';

export const PackDetailPage: React.FC = () => {
  const { previewPackId, setAppView, createProjectFromPack } = useEditorStore();
  const [activeSceneIdx, setActiveSceneIdx] = useState(0);
  const [projectName, setProjectName] = useState('My Stream Overlay');
  const [creating, setCreating] = useState(false);

  const pack = STREAM_PACKS.find(p => p.id === previewPackId) || STREAM_PACKS[0];
  const activeScene = pack.scenes[activeSceneIdx] || pack.scenes[0];

  const handleCreate = () => {
    setCreating(true);
    setTimeout(() => {
      createProjectFromPack(projectName.trim() || 'My Stream Overlay', pack.id);
    }, 300);
  };

  // Collect all unique widget types in this pack
  const allWidgetTypes = Array.from(new Set(
    pack.scenes.flatMap(sc => sc.widgets.map(w => w.type))
  ));

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 99999,
      background: '#06040d',
      backgroundImage: `radial-gradient(ellipse 80% 50% at 50% -10%, ${pack.accentColor}18 0%, transparent 55%)`,
      display: 'flex', flexDirection: 'column',
      overflow: 'hidden',
      fontFamily: 'Outfit, Inter, sans-serif',
    }}>

      {/* Top navigation bar */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 14,
        padding: '14px 28px',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        background: 'rgba(0,0,0,0.3)',
        backdropFilter: 'blur(12px)',
        flexShrink: 0,
        zIndex: 10,
      }}>
        <button
          id="pack-detail-back"
          onClick={() => setAppView('pack-browser')}
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 8, padding: '7px 14px',
            color: 'rgba(255,255,255,0.6)', fontSize: 12, fontWeight: 600,
            cursor: 'pointer', transition: 'all 150ms ease',
            fontFamily: 'inherit',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.09)'; e.currentTarget.style.color = '#fff'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; }}
        >
          <ArrowLeft size={13} /> All Packs
        </button>

        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>
          <span>Broadcast Packs</span>
          <ChevronRight size={12} />
          <span style={{ color: '#fff', fontWeight: 600 }}>{pack.name}</span>
        </div>

        {/* Category chip */}
        <div style={{
          marginLeft: 'auto',
          background: `${pack.accentColor}15`, border: `1px solid ${pack.accentColor}40`,
          borderRadius: 99, padding: '4px 12px',
          fontSize: 10, fontWeight: 700, color: pack.accentColor, letterSpacing: 0.5, textTransform: 'uppercase',
        }}>
          {pack.category}
        </div>
      </div>

      {/* Main scrollable content */}
      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>

        {/* Hero section */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 380px',
          gap: 32,
          padding: '32px 28px',
          alignItems: 'start',
        }}>

          {/* Left: Preview */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

            {/* Scene tabs */}
            <div style={{ display: 'flex', gap: 6 }}>
              {pack.scenes.map((scene, idx) => (
                <button
                  key={scene.id}
                  id={`pack-detail-scene-${idx}`}
                  onClick={() => setActiveSceneIdx(idx)}
                  style={{
                    padding: '6px 14px', borderRadius: 8,
                    fontSize: 11, fontWeight: 600, cursor: 'pointer',
                    transition: 'all 150ms ease',
                    border: activeSceneIdx === idx
                      ? `1px solid ${pack.accentColor}80`
                      : '1px solid rgba(255,255,255,0.08)',
                    background: activeSceneIdx === idx
                      ? `${pack.accentColor}15`
                      : 'rgba(255,255,255,0.03)',
                    color: activeSceneIdx === idx ? pack.accentColor : 'rgba(255,255,255,0.5)',
                    fontFamily: 'inherit',
                  }}
                >
                  {scene.label}
                </button>
              ))}
            </div>

            {/* Main preview canvas */}
            <div style={{
              aspectRatio: '16/9',
              background: `linear-gradient(135deg, ${pack.bgColors[0]}, ${pack.bgColors[1]})`,
              borderRadius: 16,
              position: 'relative', overflow: 'hidden',
              border: `1px solid ${pack.accentColor}20`,
              boxShadow: `0 0 0 1px rgba(255,255,255,0.04), 0 40px 80px rgba(0,0,0,0.7), 0 0 60px ${pack.accentColor}10`,
            }}>
              {/* Render widget layout at scale */}
              <ScenePreviewCanvas
                scene={activeScene}
                pack={pack}
              />

              {/* "PREVIEW" watermark label */}
              <div style={{
                position: 'absolute', bottom: 12, right: 14,
                display: 'flex', alignItems: 'center', gap: 5,
                background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(6px)',
                borderRadius: 6, padding: '4px 8px',
                fontSize: 9, fontWeight: 700, color: 'rgba(255,255,255,0.4)',
                letterSpacing: 1, textTransform: 'uppercase',
              }}>
                <Play size={8} />
                {activeScene.label}
              </div>
            </div>

            {/* Widget type chips for active scene */}
            <div>
              <div style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: 'rgba(255,255,255,0.25)', marginBottom: 8 }}>
                Widgets in this scene
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                {activeScene.widgets.map((w, i) => (
                  <span key={i} style={{
                    fontSize: 10, padding: '3px 9px', borderRadius: 5,
                    background: `${pack.accentColor}10`,
                    border: `1px solid ${pack.accentColor}25`,
                    color: pack.accentColor,
                    fontWeight: 600,
                  }}>
                    {w.label}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Pack info + create */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, position: 'sticky', top: 0 }}>

            {/* Pack name & description */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <div style={{
                  width: 8, height: 8, borderRadius: '50%',
                  background: pack.accentColor,
                  boxShadow: `0 0 8px ${pack.accentColor}`,
                }} />
                <span style={{ fontSize: 10, fontWeight: 700, color: pack.accentColor, letterSpacing: 1, textTransform: 'uppercase' }}>
                  {pack.category} Pack
                </span>
              </div>
              <h1 style={{
                fontSize: 32, fontWeight: 900, color: '#fff',
                letterSpacing: -1, lineHeight: 1.1, margin: 0, marginBottom: 12,
              }}>
                {pack.name}
              </h1>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.65, margin: 0 }}>
                {pack.desc}
              </p>
            </div>

            {/* Included details */}
            <div style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 14, padding: 16,
              display: 'flex', flexDirection: 'column', gap: 14,
            }}>
              <PackDetailRow icon={<Film size={13} />} label="Included Scenes" value={`${pack.scenes.length} complete scenes`} accent={pack.accentColor} />
              <PackDetailRow icon={<Layout size={13} />} label="Total Widgets" value={`${pack.scenes.reduce((t, sc) => t + sc.widgets.length, 0)} widgets across all scenes`} accent={pack.accentColor} />
              <PackDetailRow icon={<Type size={13} />} label="Font" value={pack.fontFamily} accent={pack.accentColor} />
              <PackDetailRow icon={<Image size={13} />} label="Decorations" value={pack.decorations.join(', ')} accent={pack.accentColor} />
              <PackDetailRow icon={<Zap size={13} />} label="Widget Types" value={allWidgetTypes.slice(0, 4).join(', ') + (allWidgetTypes.length > 4 ? ` +${allWidgetTypes.length - 4} more` : '')} accent={pack.accentColor} />
            </div>

            {/* Scenes list */}
            <div>
              <div style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: 'rgba(255,255,255,0.25)', marginBottom: 8 }}>All Scenes</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {pack.scenes.map((scene, idx) => (
                  <div
                    key={scene.id}
                    onClick={() => setActiveSceneIdx(idx)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 10,
                      padding: '8px 12px', borderRadius: 9, cursor: 'pointer',
                      background: activeSceneIdx === idx ? `${pack.accentColor}12` : 'rgba(255,255,255,0.02)',
                      border: activeSceneIdx === idx ? `1px solid ${pack.accentColor}30` : '1px solid transparent',
                      transition: 'all 150ms ease',
                    }}
                  >
                    <div style={{
                      width: 24, height: 24, borderRadius: 6,
                      background: `linear-gradient(135deg, ${pack.bgColors[0]}, ${pack.bgColors[1]})`,
                      border: `1px solid ${pack.accentColor}30`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 11, flexShrink: 0,
                    }}>
                      {scene.label.split(' ')[0]}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 12, fontWeight: 600, color: activeSceneIdx === idx ? '#fff' : 'rgba(255,255,255,0.6)' }}>
                        {scene.label.replace(/^[^\s]+\s/, '')}
                      </div>
                      <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.25)' }}>
                        {scene.widgets.length} widgets
                      </div>
                    </div>
                    {activeSceneIdx === idx && (
                      <Check size={12} color={pack.accentColor} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Create project form */}
            <div style={{
              background: `linear-gradient(135deg, ${pack.accentColor}10, rgba(0,0,0,0.2))`,
              border: `1px solid ${pack.accentColor}25`,
              borderRadius: 16, padding: 18,
              display: 'flex', flexDirection: 'column', gap: 12,
            }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.6)' }}>
                Name your project
              </div>
              <input
                id="pack-detail-project-name"
                value={projectName}
                onChange={e => setProjectName(e.target.value)}
                placeholder="My Stream Overlay"
                style={{
                  background: 'rgba(0,0,0,0.4)', border: `1px solid ${pack.accentColor}30`,
                  borderRadius: 9, padding: '9px 12px',
                  color: '#fff', fontSize: 13, outline: 'none',
                  fontFamily: 'inherit', width: '100%', boxSizing: 'border-box',
                  transition: 'border-color 150ms ease',
                }}
                onFocus={e => { e.currentTarget.style.borderColor = pack.accentColor; }}
                onBlur={e => { e.currentTarget.style.borderColor = `${pack.accentColor}30`; }}
              />
              <button
                id="pack-detail-create"
                onClick={handleCreate}
                disabled={creating}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  padding: '12px 20px', borderRadius: 10, border: 'none',
                  background: creating ? 'rgba(255,255,255,0.1)' : pack.accentColor,
                  color: creating ? 'rgba(255,255,255,0.5)' : '#000',
                  fontSize: 13, fontWeight: 800, cursor: creating ? 'default' : 'pointer',
                  transition: 'all 200ms ease',
                  fontFamily: 'inherit', letterSpacing: 0.2,
                  boxShadow: creating ? 'none' : `0 6px 20px ${pack.accentColor}40`,
                }}
                onMouseEnter={e => { if (!creating) e.currentTarget.style.filter = 'brightness(1.12)'; }}
                onMouseLeave={e => { e.currentTarget.style.filter = ''; }}
              >
                {creating ? (
                  <>Building your project...</>
                ) : (
                  <>
                    <Sparkles size={14} />
                    Use This Pack
                  </>
                )}
              </button>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)', textAlign: 'center', lineHeight: 1.5 }}>
                Opens the editor with all {pack.scenes.length} scenes already built
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Scene Preview Canvas ─────────────────────────────────────────────────────

interface ScenePreviewProps {
  scene: { widgets: { x: number; y: number; width: number; height: number; rotation: number; opacity: number; style: { background?: string; borderRadius?: number; borderSize?: number; borderColor?: string; glowBlur?: number; glowColor?: string; fontColor?: string; fontFamily?: string; fontSize?: number; fontWeight?: string; textAlign?: string }; label: string; type: string }[] };
  pack: { bgColors: [string, string]; accentColor: string };
}

const ScenePreviewCanvas: React.FC<ScenePreviewProps> = ({ scene, pack }) => {
  const CANVAS_W = 1920;
  const CANVAS_H = 1080;

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      {scene.widgets.map((w, i) => {
        // Calculate percentage-based positioning
        const left = (w.x / CANVAS_W * 100) + '%';
        const top = (w.y / CANVAS_H * 100) + '%';
        const width = (w.width / CANVAS_W * 100) + '%';
        const height = (w.height / CANVAS_H * 100) + '%';

        const isText = ['text', 'countdown-timer', 'animated-text', 'scrolling-text', 'clock'].includes(w.type);

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left, top, width, height,
              transform: `rotate(${w.rotation}deg)`,
              background: w.style.background || (w.type === 'background' ? 'transparent' : 'rgba(255,255,255,0.04)'),
              borderRadius: w.style.borderRadius ? `${w.style.borderRadius / CANVAS_W * 100 * 8}px` : '2px',
              border: w.style.borderSize && w.style.borderSize > 0
                ? `1px solid ${w.style.borderColor || pack.accentColor}`
                : 'none',
              opacity: w.opacity / 100,
              boxShadow: w.style.glowBlur
                ? `0 0 ${Math.max(2, w.style.glowBlur / 10)}px ${w.style.glowColor || pack.accentColor}80`
                : undefined,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              overflow: 'hidden',
            }}
          >
            {isText && w.style.fontSize && w.style.fontSize > 30 && (
              <div style={{
                fontSize: `${Math.max(6, w.style.fontSize / 1920 * 100 * 7)}px`,
                color: w.style.fontColor || '#fff',
                fontFamily: w.style.fontFamily || 'sans-serif',
                fontWeight: w.style.fontWeight || '600',
                textAlign: (w.style.textAlign as React.CSSProperties['textAlign']) || 'center',
                width: '100%', padding: '0 4%',
                overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                textShadow: w.style.glowBlur ? `0 0 8px ${w.style.glowColor || pack.accentColor}` : undefined,
              }}>
                {w.label}
              </div>
            )}
          </div>
        );
      })}
      {/* Ambient glow overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `radial-gradient(ellipse 60% 50% at 50% 50%, ${pack.accentColor}08, transparent 70%)`,
        pointerEvents: 'none',
      }} />
    </div>
  );
};

// ─── Pack Detail Row ─────────────────────────────────────────────────────────

const PackDetailRow: React.FC<{ icon: React.ReactNode; label: string; value: string; accent: string }> = ({ icon, label, value, accent }) => (
  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
    <div style={{ color: accent, marginTop: 1, flexShrink: 0 }}>{icon}</div>
    <div>
      <div style={{ fontSize: 9, fontWeight: 700, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 2 }}>{label}</div>
      <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', lineHeight: 1.4 }}>{value}</div>
    </div>
  </div>
);

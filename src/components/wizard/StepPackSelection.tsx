import React, { useState } from 'react';
import { Search, X, Sparkles, Check } from 'lucide-react';
import { useWizardStore } from '../../store/wizardStore';
import { STREAM_PACKS } from '../../data/streamPacks';
import type { StreamPack } from '../../packs/types';

export const StepPackSelection: React.FC = () => {
  const { selectedPackId, selectPack, setWizardState } = useWizardStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [detailsPack, setDetailsPack] = useState<StreamPack | null>(null);

  const filtered = STREAM_PACKS.filter(pack => {
    const q = searchQuery.toLowerCase();
    return !q
      || pack.name.toLowerCase().includes(q)
      || pack.desc.toLowerCase().includes(q)
      || pack.category.toLowerCase().includes(q);
  });

  const handleSelect = (pack: StreamPack) => {
    selectPack(pack.id);
    setWizardState('PERSONALIZATION');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden', padding: '0 28px' }}>
      {/* Header */}
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: '#fff', margin: 0, marginBottom: 4 }}>
          Choose Your Style
        </h2>
        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', margin: 0 }}>
          Each pack includes 4–5 complete scenes with widgets, animations, and transitions
        </p>
      </div>

      {/* Search */}
      <div style={{ position: 'relative', marginBottom: 16 }}>
        <Search size={13} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)', pointerEvents: 'none' }} />
        <input
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Search packs..."
          style={{
            width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 10, padding: '9px 32px 9px 34px',
            color: '#fff', fontSize: 13, outline: 'none',
            fontFamily: 'inherit', boxSizing: 'border-box',
          }}
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.4)', display: 'flex' }}
          >
            <X size={13} />
          </button>
        )}
      </div>

      {/* Pack grid */}
      <div style={{ flex: 1, overflowY: 'auto', margin: '0 -28px', padding: '0 28px 24px' }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', paddingTop: 60, color: 'rgba(255,255,255,0.3)', fontSize: 13 }}>
            No packs found
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 14 }}>
            {filtered.map(pack => (
              <PackSelectCard
                key={pack.id}
                pack={pack}
                isSelected={selectedPackId === pack.id}
                onSelect={() => handleSelect(pack)}
                onPreview={() => setDetailsPack(pack)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {detailsPack && (
        <PackDetailModal pack={detailsPack} onClose={() => setDetailsPack(null)} onSelect={() => handleSelect(detailsPack)} />
      )}
    </div>
  );
};

// ─── Pack Card ────────────────────────────────────────────────────────────────

const PackSelectCard: React.FC<{
  pack: StreamPack;
  isSelected: boolean;
  onSelect: () => void;
  onPreview: () => void;
}> = ({ pack, isSelected, onSelect, onPreview }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: 14, overflow: 'hidden', cursor: 'pointer',
        border: isSelected
          ? `1.5px solid ${pack.accentColor}`
          : hovered
          ? `1px solid ${pack.accentColor}55`
          : '1px solid rgba(255,255,255,0.07)',
        background: 'rgba(12,10,22,0.7)',
        transition: 'all 220ms cubic-bezier(0.34, 1.56, 0.64, 1)',
        transform: hovered ? 'translateY(-3px)' : 'none',
        boxShadow: hovered ? `0 16px 40px ${pack.accentColor}12` : '0 4px 16px rgba(0,0,0,0.4)',
      }}
    >
      {/* Thumbnail */}
      <div style={{
        aspectRatio: '16/9',
        background: `linear-gradient(135deg, ${pack.bgColors[0]}, ${pack.bgColors[1]})`,
        position: 'relative', overflow: 'hidden',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <PackThumbnail pack={pack} />
        <div style={{ position: 'absolute', top: 8, left: 8, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)', border: `1px solid ${pack.accentColor}40`, borderRadius: 5, padding: '2px 7px', fontSize: 8, fontWeight: 700, letterSpacing: 0.5, color: pack.accentColor, textTransform: 'uppercase', fontFamily: 'Outfit, sans-serif' }}>
          {pack.category}
        </div>
        {isSelected && (
          <div style={{ position: 'absolute', top: 8, right: 8, width: 22, height: 22, borderRadius: '50%', background: pack.accentColor, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 0 12px ${pack.accentColor}80` }}>
            <Check size={13} color="#000" />
          </div>
        )}
      </div>

      {/* Info */}
      <div style={{ padding: '12px 14px 14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
          <div style={{ fontSize: 14, fontWeight: 800, color: '#fff', letterSpacing: -0.3 }}>{pack.name}</div>
          <div style={{ display: 'flex', gap: 3 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: pack.accentColor, border: '1px solid rgba(255,255,255,0.1)' }} />
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: pack.bgColors[0], border: '1px solid rgba(255,255,255,0.1)' }} />
          </div>
        </div>
        <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', marginBottom: 8 }}>
          {pack.desc}
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          <button
            onClick={(e) => { e.stopPropagation(); onPreview(); }}
            style={{
              flex: 1, padding: '6px 0', borderRadius: 7, border: '1px solid rgba(255,255,255,0.1)',
              background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.6)',
              fontSize: 10, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
              transition: 'all 150ms ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; }}
          >
            Preview
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onSelect(); }}
            style={{
              flex: 1, padding: '6px 0', borderRadius: 7, border: 'none',
              background: pack.accentColor, color: '#000',
              fontSize: 10, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
              transition: 'all 150ms ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.filter = 'brightness(1.1)'; }}
            onMouseLeave={e => { e.currentTarget.style.filter = ''; }}
          >
            Select
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Pack Thumbnail ───────────────────────────────────────────────────────────

const PackThumbnail: React.FC<{ pack: StreamPack }> = ({ pack }) => {
  const scene = pack.scenes[0];
  const scale = 0.18;
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      {scene.widgets.map((w, i) => (
        <div key={i} style={{
          position: 'absolute',
          left: `${w.x * scale}px`, top: `${w.y * scale}px`,
          width: `${w.width * scale}px`, height: `${w.height * scale}px`,
          background: w.style.background || 'rgba(255,255,255,0.04)',
          borderRadius: w.style.borderRadius ? `${w.style.borderRadius * scale}px` : '2px',
          border: w.style.borderSize && w.style.borderSize > 0 ? `1px solid ${w.style.borderColor || pack.accentColor}` : 'none',
          opacity: w.opacity / 100,
          boxShadow: w.style.glowBlur ? `0 0 ${w.style.glowBlur * scale * 2}px ${w.style.glowColor || pack.accentColor}60` : undefined,
        }} />
      ))}
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 60% 50% at 50% 50%, ${pack.accentColor}15, transparent 70%)`, pointerEvents: 'none' }} />
    </div>
  );
};

// ─── Detail Modal ─────────────────────────────────────────────────────────────

const PackDetailModal: React.FC<{ pack: StreamPack; onClose: () => void; onSelect: () => void }> = ({ pack, onClose, onSelect }) => {
  const [sceneIdx, setSceneIdx] = useState(0);
  const activeScene = pack.scenes[sceneIdx] || pack.scenes[0];

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 100000,
        background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 40,
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: '#0c0a1a', border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 20, maxWidth: 800, width: '100%',
          overflow: 'hidden', boxShadow: '0 40px 80px rgba(0,0,0,0.8)',
        }}
      >
        {/* Preview */}
        <div style={{
          aspectRatio: '16/9',
          background: `linear-gradient(135deg, ${pack.bgColors[0]}, ${pack.bgColors[1]})`,
          position: 'relative', overflow: 'hidden',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}>
          <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
            {activeScene.widgets.map((w, i) => {
              const left = (w.x / 1920 * 100) + '%';
              const top = (w.y / 1080 * 100) + '%';
              const wd = (w.width / 1920 * 100) + '%';
              const ht = (w.height / 1080 * 100) + '%';
              return (
                <div key={i} style={{
                  position: 'absolute', left, top, width: wd, height: ht,
                  background: w.style.background || 'rgba(255,255,255,0.04)',
                  borderRadius: w.style.borderRadius ? `${w.style.borderRadius / 1920 * 100 * 8}px` : '2px',
                  border: w.style.borderSize ? `1px solid ${w.style.borderColor || pack.accentColor}` : 'none',
                  opacity: w.opacity / 100,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: `${Math.max(5, (w.style.fontSize || 14) / 1920 * 100 * 6)}px`,
                  color: w.style.fontColor || '#fff',
                }}>
                  {['text','countdown-timer','clock','animated-text'].includes(w.type) ? w.label : ''}
                </div>
              );
            })}
          </div>
          {/* Category badge */}
          <div style={{ position: 'absolute', top: 10, left: 10, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)', border: `1px solid ${pack.accentColor}40`, borderRadius: 5, padding: '3px 8px', fontSize: 9, fontWeight: 700, color: pack.accentColor, textTransform: 'uppercase' }}>
            {pack.category}
          </div>
        </div>

        {/* Details */}
        <div style={{ padding: 18 }}>
          <div style={{ fontSize: 18, fontWeight: 800, color: '#fff', marginBottom: 4 }}>{pack.name}</div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', lineHeight: 1.5, marginBottom: 12 }}>{pack.desc}</div>

          {/* Scene tabs */}
          <div style={{ display: 'flex', gap: 4, marginBottom: 14 }}>
            {pack.scenes.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setSceneIdx(i)}
                style={{
                  padding: '4px 10px', borderRadius: 6, fontSize: 9, fontWeight: 600,
                  border: sceneIdx === i ? `1px solid ${pack.accentColor}80` : '1px solid rgba(255,255,255,0.08)',
                  background: sceneIdx === i ? `${pack.accentColor}15` : 'rgba(255,255,255,0.03)',
                  color: sceneIdx === i ? pack.accentColor : 'rgba(255,255,255,0.5)',
                  cursor: 'pointer', fontFamily: 'inherit', transition: 'all 150ms ease',
                }}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Stats */}
          <div style={{ display: 'flex', gap: 12, marginBottom: 14, flexWrap: 'wrap' }}>
            <StatBadge label="Scenes" value={`${pack.scenes.length}`} />
            <StatBadge label="Widgets" value={`${pack.scenes.reduce((t, s) => t + s.widgets.length, 0)}`} />
            <StatBadge label="Font" value={pack.fontFamily} />
            <StatBadge label="Theme" value={pack.themeClass.replace('theme-', '').replace(/-/g, ' ')} />
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              onClick={onClose}
              style={{
                flex: 1, padding: '9px 0', borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)',
                background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.6)',
                fontSize: 11, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
              }}
            >
              Close
            </button>
            <button
              onClick={onSelect}
              style={{
                flex: 1, padding: '9px 0', borderRadius: 8, border: 'none',
                background: pack.accentColor, color: '#000',
                fontSize: 11, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
              }}
            >
              <Sparkles size={12} /> Select Pack
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatBadge: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
    <span style={{ fontSize: 8, fontWeight: 700, color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase', letterSpacing: 0.5 }}>{label}</span>
    <span style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.7)' }}>{value}</span>
  </div>
);

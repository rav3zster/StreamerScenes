import React, { useState, useMemo } from 'react';
import { ArrowLeft, Search, Sparkles, X } from 'lucide-react';
import { useEditorStore } from '../store/editorStore';
import { STREAM_PACKS, type StreamPack } from '../data/streamPacks';

const ALL_CATEGORIES = ['All', ...Array.from(new Set(STREAM_PACKS.map(p => p.category))).sort()];

export const PackBrowserPage: React.FC = () => {
  const { setAppView, setPreviewPackId } = useEditorStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [hoveredPackId, setHoveredPackId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return STREAM_PACKS.filter(pack => {
      const matchCat = activeCategory === 'All' || pack.category === activeCategory;
      const q = searchQuery.toLowerCase();
      const matchSearch = !q
        || pack.name.toLowerCase().includes(q)
        || pack.desc.toLowerCase().includes(q)
        || pack.category.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [searchQuery, activeCategory]);

  const handleSelectPack = (pack: StreamPack) => {
    setPreviewPackId(pack.id);
    setAppView('pack-detail');
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 99999,
      background: '#06040d',
      backgroundImage: [
        'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(139,92,246,0.14) 0%, transparent 55%)',
        'radial-gradient(ellipse 40% 30% at 10% 100%, rgba(92,255,226,0.05) 0%, transparent 50%)',
      ].join(', '),
      display: 'flex', flexDirection: 'column',
      overflow: 'hidden',
      fontFamily: 'Outfit, Inter, sans-serif',
    }}>

      {/* Top header */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 16,
        padding: '16px 28px',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        background: 'rgba(0,0,0,0.3)',
        backdropFilter: 'blur(10px)',
        flexShrink: 0,
      }}>
        <button
          id="pack-browser-back"
          onClick={() => setAppView('welcome')}
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 8, padding: '7px 14px',
            color: 'rgba(255,255,255,0.7)', fontSize: 12, fontWeight: 600,
            cursor: 'pointer', transition: 'all 150ms ease',
            fontFamily: 'inherit',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.09)'; e.currentTarget.style.color = '#fff'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; }}
        >
          <ArrowLeft size={13} /> Back
        </button>

        <div>
          <div style={{ fontSize: 17, fontWeight: 800, color: '#fff', letterSpacing: -0.3 }}>Broadcast Packs</div>
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', fontWeight: 500 }}>
            {STREAM_PACKS.length} professionally designed broadcast packages
          </div>
        </div>

        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10 }}>
          {/* Search */}
          <div style={{ position: 'relative' }}>
            <Search size={13} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)', pointerEvents: 'none' }} />
            <input
              id="pack-browser-search"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search packs..."
              style={{
                background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 9, padding: '7px 32px 7px 32px',
                color: '#fff', fontSize: 12, outline: 'none', width: 220,
                fontFamily: 'inherit',
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.4)', display: 'flex' }}
              >
                <X size={12} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Category filters */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 6,
        padding: '12px 28px',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        overflowX: 'auto',
        flexShrink: 0,
      }}>
        {ALL_CATEGORIES.map(cat => (
          <button
            key={cat}
            id={`pack-category-${cat.toLowerCase().replace(/\s+/g, '-')}`}
            onClick={() => setActiveCategory(cat)}
            style={{
              padding: '5px 14px', borderRadius: 99,
              fontSize: 11, fontWeight: 600,
              cursor: 'pointer', transition: 'all 150ms ease',
              whiteSpace: 'nowrap',
              border: activeCategory === cat ? '1px solid rgba(168,85,247,0.6)' : '1px solid rgba(255,255,255,0.08)',
              background: activeCategory === cat ? 'rgba(168,85,247,0.15)' : 'rgba(255,255,255,0.03)',
              color: activeCategory === cat ? '#a855f7' : 'rgba(255,255,255,0.5)',
              fontFamily: 'inherit',
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Pack grid */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '24px 28px 32px' }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', paddingTop: 80, color: 'rgba(255,255,255,0.3)', fontSize: 14 }}>
            No packs found for "{searchQuery}"
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 18,
          }}>
            {filtered.map(pack => (
              <PackCard
                key={pack.id}
                pack={pack}
                isHovered={hoveredPackId === pack.id}
                onHover={setHoveredPackId}
                onSelect={handleSelectPack}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// ─── Pack Card ────────────────────────────────────────────────────────────────

interface PackCardProps {
  pack: StreamPack;
  isHovered: boolean;
  onHover: (id: string | null) => void;
  onSelect: (pack: StreamPack) => void;
}

const PackCard: React.FC<PackCardProps> = ({ pack, isHovered, onHover, onSelect }) => {
  return (
    <div
      id={`pack-card-${pack.id}`}
      onClick={() => onSelect(pack)}
      onMouseEnter={() => onHover(pack.id)}
      onMouseLeave={() => onHover(null)}
      style={{
        borderRadius: 16,
        overflow: 'hidden',
        cursor: 'pointer',
        border: isHovered
          ? `1px solid ${pack.accentColor}55`
          : '1px solid rgba(255,255,255,0.07)',
        background: 'rgba(12,10,22,0.7)',
        transition: 'all 220ms cubic-bezier(0.34, 1.56, 0.64, 1)',
        transform: isHovered ? 'translateY(-4px)' : 'none',
        boxShadow: isHovered ? `0 20px 50px ${pack.accentColor}18, 0 8px 20px rgba(0,0,0,0.5)` : '0 4px 16px rgba(0,0,0,0.4)',
      }}
    >
      {/* Preview thumbnail */}
      <div style={{
        aspectRatio: '16/9',
        background: `linear-gradient(135deg, ${pack.bgColors[0]}, ${pack.bgColors[1]})`,
        position: 'relative',
        overflow: 'hidden',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {/* Decorative elements representing the pack's style */}
        <PackThumbnail pack={pack} />

        {/* Category badge */}
        <div style={{
          position: 'absolute', top: 10, left: 10,
          background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)',
          border: `1px solid ${pack.accentColor}40`,
          borderRadius: 6, padding: '3px 8px',
          fontSize: 9, fontWeight: 700, letterSpacing: 0.5,
          color: pack.accentColor, textTransform: 'uppercase',
          fontFamily: 'Outfit, sans-serif',
        }}>
          {pack.category}
        </div>

        {/* Scene count */}
        <div style={{
          position: 'absolute', top: 10, right: 10,
          background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)',
          borderRadius: 6, padding: '3px 8px',
          fontSize: 9, fontWeight: 600,
          color: 'rgba(255,255,255,0.6)',
          fontFamily: 'Outfit, sans-serif',
          border: '1px solid rgba(255,255,255,0.1)',
        }}>
          {pack.scenes.length} scenes
        </div>

        {/* Hover overlay */}
        {isHovered && (
          <div style={{
            position: 'absolute', inset: 0,
            background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(2px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 6,
              background: pack.accentColor,
              borderRadius: 99, padding: '8px 18px',
              fontSize: 12, fontWeight: 700, color: '#000',
              boxShadow: `0 4px 20px ${pack.accentColor}60`,
              fontFamily: 'Outfit, sans-serif',
            }}>
              <Sparkles size={12} /> Preview Pack
            </div>
          </div>
        )}
      </div>

      {/* Pack info */}
      <div style={{ padding: '14px 16px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 8 }}>
          <div style={{ fontSize: 15, fontWeight: 800, color: '#fff', letterSpacing: -0.3 }}>
            {pack.name}
          </div>
          {/* Color dots */}
          <div style={{ display: 'flex', gap: 4, marginTop: 2 }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: pack.accentColor, border: '1px solid rgba(255,255,255,0.1)' }} />
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: pack.bgColors[0], border: '1px solid rgba(255,255,255,0.1)' }} />
          </div>
        </div>
        <div style={{
          fontSize: 11, color: 'rgba(255,255,255,0.35)', lineHeight: 1.5,
          display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
        }}>
          {pack.desc}
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 10 }}>
          {pack.scenes.slice(0, 4).map(scene => (
            <span key={scene.id} style={{
              fontSize: 9, padding: '2px 7px', borderRadius: 4,
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              color: 'rgba(255,255,255,0.4)', fontWeight: 500,
              fontFamily: 'Outfit, sans-serif',
            }}>
              {scene.label.replace(/^[^\s]+\s/, '')}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── Pack Thumbnail (abstract visual preview) ──────────────────────────────────

const PackThumbnail: React.FC<{ pack: StreamPack }> = ({ pack }) => {
  // Render a miniature visual preview of the pack's first scene
  const scene = pack.scenes[0];
  const scale = 0.18;

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      {scene.widgets.map((w, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: `${w.x * scale}px`,
            top: `${w.y * scale}px`,
            width: `${w.width * scale}px`,
            height: `${w.height * scale}px`,
            background: w.style.background || 'rgba(255,255,255,0.04)',
            borderRadius: w.style.borderRadius ? `${w.style.borderRadius * scale}px` : '2px',
            border: w.style.borderSize && w.style.borderSize > 0
              ? `1px solid ${w.style.borderColor || pack.accentColor}`
              : 'none',
            opacity: w.opacity / 100,
            boxShadow: w.style.glowBlur
              ? `0 0 ${w.style.glowBlur * scale * 2}px ${w.style.glowColor || pack.accentColor}60`
              : undefined,
          }}
        />
      ))}
      {/* Subtle ambient glow */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `radial-gradient(ellipse 60% 50% at 50% 50%, ${pack.accentColor}15, transparent 70%)`,
        pointerEvents: 'none',
      }} />
    </div>
  );
};

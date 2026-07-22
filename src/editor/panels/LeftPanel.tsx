import React, { useState, useRef } from 'react';
import {
  Film, Layers, Image, Layout, Palette,
  Plus, Trash2, Eye, EyeOff, Lock, Unlock, GripVertical,
  Search, ChevronDown, ChevronUp, Copy, Heart, Clock, Radio as RadioIcon, Star,
} from 'lucide-react';
import { useEditorStore, type LeftTab, type SceneWidget } from '../../store/editorStore';
import { WIDGET_CATEGORIES } from '../../data/widgetCatalog';
import { WIDGET_TEMPLATES } from '../../data/widgetTemplates';
import { MOCK_ASSETS, type VisualAsset } from '../../data/assets';
import { LiveControlPanel } from './LiveControlPanel';
import { ThemeManagerPanel } from './ThemeManagerPanel';

// ─── Sidebar Rail ─────────────────────────────────────────────────────────────

const TABS: { id: LeftTab; icon: React.ReactNode; label: string }[] = [
  { id: 'scenes', icon: <Film size={18} />, label: 'Scenes' },
  { id: 'layers', icon: <Layers size={18} />, label: 'Layers' },
  { id: 'assets', icon: <Image size={18} />, label: 'Assets' },
  { id: 'widgets', icon: <Layout size={18} />, label: 'Widgets' },
  { id: 'themes', icon: <Palette size={18} />, label: 'Themes' },
];

export const SidebarRail: React.FC = () => {
  const { leftTab, setLeftTab } = useEditorStore();
  return (
    <div className="sidebar">
      <div className="sidebar-logo" title="VibeOverlay Studio">
        ⚡
      </div>
      <nav className="sidebar-nav">
        {TABS.map(t => (
          <button
            key={t.id}
            className={`sidebar-btn focus-ring${leftTab === t.id ? ' active' : ''}`}
            onClick={() => setLeftTab(t.id)}
            title={t.label}
          >
            {t.icon}
            <span>{t.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

// ─── Main Panel ───────────────────────────────────────────────────────────────

export const LeftPanel: React.FC = () => {
  const { leftTab, leftPanelWidth } = useEditorStore();

  const content: Record<LeftTab, React.ReactNode> = {
    'scenes': <ScenesTab />,
    'layers': <LayersTab />,
    'assets': <AssetsTab />,
    'widgets': <WidgetsTab />,
    'themes': <ThemeManagerPanel />,
  };

  const labels: Record<LeftTab, string> = {
    scenes: 'Scene Manager',
    layers: 'Layers Outline',
    assets: 'Assets Browser',
    widgets: 'Widget Library',
    themes: 'Theme Manager',
  };

  return (
    <div className="left-panel" style={{ width: leftPanelWidth }}>
      <div className="panel-header">
        <span className="panel-title">{labels[leftTab]}</span>
      </div>
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        {content[leftTab]}
      </div>
    </div>
  );
};

// ─── (ProjectsTab removed — project management moved to File menu) ────────────

// ─── Scenes Tab ───────────────────────────────────────────────────────────────

const ScenesTab: React.FC = () => {
  const {
    scenes, editingSceneId, liveSceneId, favoriteSceneIds,
    setEditingScene, setLiveScene, addScene, deleteScene,
    toggleFavoriteScene,
  } = useEditorStore();

  const [filter, setFilter] = useState<'all' | 'favorites' | 'live'>('all');
  const [search, setSearch] = useState('');
  const [adding, setAdding] = useState(false);
  const [newName, setNewName] = useState('');

  const handleAdd = () => {
    if (!newName.trim()) return;
    addScene(newName.toLowerCase().replace(/\s+/g, '-'), newName);
    setNewName('');
    setAdding(false);
  };

  const filteredScenes = scenes.filter(s => {
    const matchSearch = s.label.toLowerCase().includes(search.toLowerCase());
    if (!matchSearch) return false;
    if (filter === 'favorites') return favoriteSceneIds.includes(s.id);
    if (filter === 'live') return s.id === liveSceneId;
    return true;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
      {/* Search & Filter Header */}
      <div style={{ padding: '8px 12px', display: 'flex', flexDirection: 'column', gap: 6, borderBottom: '1px solid var(--color-border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'var(--surface-3)', borderRadius: 6, padding: '4px 8px' }}>
          <Search size={13} style={{ color: 'var(--color-text-muted)', flexShrink: 0 }} />
          <input
            className="input"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search scenes..."
            style={{ border: 'none', background: 'transparent', padding: 0, fontSize: 11, width: '100%' }}
          />
        </div>
        <div style={{ display: 'flex', gap: 4 }}>
          {(['all', 'favorites', 'live'] as const).map(tab => {
            const active = filter === tab;
            return (
              <button
                key={tab}
                className="focus-ring"
                onClick={() => setFilter(tab)}
                style={{
                  flex: 1,
                  fontSize: 10,
                  fontWeight: active ? 700 : 500,
                  textTransform: 'capitalize',
                  padding: '3px 0',
                  borderRadius: 4,
                  border: 'none',
                  background: active ? 'var(--color-accent-alpha-15)' : 'transparent',
                  color: active ? 'var(--color-accent)' : 'var(--color-text-muted)',
                  cursor: 'pointer',
                }}
              >
                {tab}
              </button>
            );
          })}
        </div>
      </div>

      {/* Broadcast Scene Cards */}
      <div className="panel-body" style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px', padding: '10px' }}>
        {filteredScenes.map(scene => {
          const isEditing = scene.id === editingSceneId;
          const isLive = scene.id === liveSceneId;
          const isFav = favoriteSceneIds.includes(scene.id);

          return (
            <div
              key={scene.id}
              onClick={() => setEditingScene(scene.id)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 'var(--radius-lg, 8px)',
                background: isEditing ? 'var(--surface-3, #1e1b2e)' : 'var(--surface-2, #141222)',
                border: isLive
                  ? '1px solid #ef4444'
                  : isEditing
                  ? '1px solid var(--color-accent)'
                  : '1px solid var(--color-border)',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'all 120ms ease-out',
                position: 'relative',
              }}
            >
              {/* 16:9 Mini Canvas Thumbnail */}
              <div
                style={{
                  height: 72,
                  width: '100%',
                  background: 'linear-gradient(135deg, #090713 0%, #151128 100%)',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {/* Simulated widget representation in thumbnail */}
                <div style={{ opacity: 0.5, fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}>
                  16:9 • {scene.widgets.length} elements
                </div>

                {/* Status Badges Overlay */}
                <div style={{ position: 'absolute', top: 6, left: 6, display: 'flex', gap: 4 }}>
                  {isLive && (
                    <span
                      style={{
                        fontSize: 8,
                        fontWeight: 800,
                        color: '#ffffff',
                        background: '#ef4444',
                        padding: '2px 6px',
                        borderRadius: 4,
                        letterSpacing: '0.05em',
                        boxShadow: '0 2px 8px rgba(239,68,68,0.5)',
                      }}
                    >
                      LIVE
                    </span>
                  )}
                  {isEditing && !isLive && (
                    <span
                      style={{
                        fontSize: 8,
                        fontWeight: 800,
                        color: '#ffffff',
                        background: 'var(--color-accent)',
                        padding: '2px 6px',
                        borderRadius: 4,
                        letterSpacing: '0.05em',
                      }}
                    >
                      EDITING
                    </span>
                  )}
                </div>

                {/* Quick actions top right */}
                <button
                  className="btn-icon focus-ring"
                  style={{
                    position: 'absolute',
                    top: 6,
                    right: 6,
                    width: 22,
                    height: 22,
                    background: 'rgba(0,0,0,0.4)',
                    backdropFilter: 'blur(4px)',
                  }}
                  onClick={e => {
                    e.stopPropagation();
                    toggleFavoriteScene(scene.id);
                  }}
                  title="Favorite Scene"
                >
                  <Star size={11} color={isFav ? '#f59e0b' : 'gray'} fill={isFav ? '#f59e0b' : 'none'} />
                </button>
              </div>

              {/* Scene Card Metadata Footer */}
              <div style={{ padding: '8px 10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: isEditing ? 700 : 500, color: 'var(--color-text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {scene.label}
                  </div>
                  <div style={{ fontSize: 10, color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}>
                    {scene.widgets.length} widget{scene.widgets.length !== 1 ? 's' : ''} • 1920×1080
                  </div>
                </div>

                {/* Card Quick Actions */}
                <div style={{ display: 'flex', gap: 3 }}>
                  <button
                    className="btn-icon focus-ring"
                    style={{ width: 24, height: 24 }}
                    title="Set Live Scene"
                    onClick={e => {
                      e.stopPropagation();
                      setLiveScene(scene.id);
                    }}
                  >
                    <RadioIcon size={12} color={isLive ? '#ef4444' : undefined} />
                  </button>
                  <button
                    className="btn-icon focus-ring"
                    style={{ width: 24, height: 24 }}
                    title="Delete Scene"
                    onClick={e => {
                      e.stopPropagation();
                      if (scenes.length > 1) deleteScene(scene.id);
                    }}
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {adding ? (
          <div style={{ display: 'flex', gap: 4, marginTop: 4 }}>
            <input
              autoFocus
              className="input"
              value={newName}
              onChange={e => setNewName(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') handleAdd();
                if (e.key === 'Escape') setAdding(false);
              }}
              placeholder="Scene Name (e.g. Starting Soon)"
              style={{ flex: 1, fontSize: 11 }}
            />
            <button className="btn btn-primary" style={{ fontSize: 11, padding: '4px 10px' }} onClick={handleAdd}>
              Add
            </button>
          </div>
        ) : (
          <button
            className="btn btn-secondary focus-ring"
            style={{ width: '100%', fontSize: 11, justifyContent: 'center', gap: 6, marginTop: 4 }}
            onClick={() => setAdding(true)}
          >
            <Plus size={13} /> Add Scene
          </button>
        )}

        <div style={{ margin: '8px 0', flexShrink: 0 }} />

        <LiveControlPanel />
      </div>
    </div>
  );
};

// ─── Layers Tab (Redesigned with Drag Reordering, Renaming, lock/hide) ─────────

const COLOR_OPTIONS = ['none', '#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#ec4899'];

const LayersTab: React.FC = () => {
  const {
    getDraftWidgets, selectedIds, selectWidget, updateWidget, removeWidget,
    duplicateWidget, reorderWidgets
  } = useEditorStore();

  const widgets = getDraftWidgets();
  const sorted = [...widgets].sort((a, b) => b.zIndex - a.zIndex);

  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState('');
  const [draggedLayerId, setDraggedLayerId] = useState<string | null>(null);

  // Group nesting helper (Folders representation)
  // For simplicity, layers are flat but display groupings based on groupId tags
  const uniqueGroups = Array.from(new Set(widgets.map(w => w.groupId).filter(Boolean)));

  const handleRenameCommit = (id: string) => {
    if (renameValue.trim()) {
      updateWidget(id, { label: renameValue });
    }
    setRenamingId(null);
  };

  // Drag and drop handlers for layer nodes
  const handleDragStart = (id: string) => (e: React.DragEvent) => {
    setDraggedLayerId(id);
    e.dataTransfer.setData('layer-id', id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (targetId: string) => (e: React.DragEvent) => {
    e.preventDefault();
    const sourceId = e.dataTransfer.getData('layer-id') || draggedLayerId;
    if (sourceId && sourceId !== targetId) {
      reorderWidgets(sourceId, targetId);
    }
    setDraggedLayerId(null);
  };

  return (
    <div className="panel-body" style={{ padding: 8 }}>
      {sorted.length === 0 ? (
        <div style={{ textAlign: 'center', color: 'var(--color-text-muted)', fontSize: 11, padding: '32px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: 'var(--color-surface-2)', border: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Layers size={20} style={{ opacity: 0.4 }} />
          </div>
          <div>
            <div style={{ fontWeight: 600, color: 'var(--color-text-2)', marginBottom: 2 }}>No Layers Yet</div>
            <div style={{ fontSize: 10, color: 'var(--color-text-muted)', maxWidth: 180, margin: '0 auto' }}>
              Add elements from the Library tab to build your scene layout.
            </div>
          </div>
          <button
            className="btn btn-secondary focus-ring"
            style={{ fontSize: 10, gap: 5, padding: '5px 12px', marginTop: 4 }}
            onClick={() => useEditorStore.getState().setLeftTab('widgets')}
          >
            <Plus size={11} /> Browse Widgets
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flex: 1, flexDirection: 'column', gap: 3 }}>
          {sorted.map(w => {
            const isSelected = selectedIds.includes(w.id);
            const isRenaming = renamingId === w.id;

            return (
              <div
                key={w.id}
                className={`layer-item${isSelected ? ' selected' : ''}`}
                style={{
                  borderLeft: w.colorLabel && w.colorLabel !== 'none' ? `3px solid ${w.colorLabel}` : undefined,
                  cursor: 'grab',
                }}
                onClick={() => selectWidget(w.id)}
                draggable
                onDragStart={handleDragStart(w.id)}
                onDragOver={handleDragOver}
                onDrop={handleDrop(w.id)}
              >
                <GripVertical size={11} style={{ opacity: 0.3 }} />

                {/* Inline Rename input */}
                {isRenaming ? (
                  <input
                    className="input"
                    value={renameValue}
                    onChange={e => setRenameValue(e.target.value)}
                    onBlur={() => handleRenameCommit(w.id)}
                    onKeyDown={e => {
                      if (e.key === 'Enter') handleRenameCommit(w.id);
                      if (e.key === 'Escape') setRenamingId(null);
                    }}
                    autoFocus
                    style={{ fontSize: 11, padding: '2px 4px', height: 20 }}
                  />
                ) : (
                  <span
                    className="layer-item-label"
                    style={{ fontSize: 11, fontWeight: isSelected ? 600 : 400 }}
                    onDoubleClick={() => {
                      setRenamingId(w.id);
                      setRenameValue(w.label);
                    }}
                  >
                    {w.label}
                  </span>
                )}

                {/* Color Label indicator/selector */}
                <div style={{ display: 'flex', gap: 2 }}>
                  <div
                    style={{
                      width: 8, height: 8, borderRadius: '50%',
                      background: w.colorLabel && w.colorLabel !== 'none' ? w.colorLabel : 'transparent',
                      border: '1px solid rgba(255,255,255,0.15)',
                      cursor: 'pointer',
                    }}
                    onClick={e => {
                      e.stopPropagation();
                      // Rotate colors
                      const curIdx = COLOR_OPTIONS.indexOf(w.colorLabel || 'none');
                      const nextColor = COLOR_OPTIONS[(curIdx + 1) % COLOR_OPTIONS.length];
                      updateWidget(w.id, { colorLabel: nextColor });
                    }}
                    title="Change layer color tag"
                  />
                </div>

                <div className="layer-item-actions">
                  <button
                    className="btn-icon" style={{ width: 18, height: 18 }}
                    onClick={e => { e.stopPropagation(); updateWidget(w.id, { visible: !w.visible }); }}
                  >
                    {w.visible ? <Eye size={10} /> : <EyeOff size={10} style={{ color: 'var(--color-text-muted)' }} />}
                  </button>
                  <button
                    className="btn-icon" style={{ width: 18, height: 18 }}
                    onClick={e => { e.stopPropagation(); updateWidget(w.id, { locked: !w.locked }); }}
                  >
                    {w.locked ? <Lock size={10} style={{ color: 'var(--color-warning)' }} /> : <Unlock size={10} />}
                  </button>
                  <button
                    className="btn-icon" style={{ width: 18, height: 18 }}
                    onClick={e => { e.stopPropagation(); duplicateWidget(w.id); }}
                  >
                    <Copy size={9} />
                  </button>
                  <button
                    className="btn-icon" style={{ width: 18, height: 18 }}
                    onClick={e => { e.stopPropagation(); removeWidget(w.id); }}
                  >
                    <Trash2 size={9} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

// ─── Assets Tab (Redesigned with mock catalog, search, and drag) ──────────────

const ASSET_CATEGORIES = ['All', 'Images', 'GIFs', 'Backgrounds', 'Icons', 'SVGs', 'Lotties'];

const AssetsTab: React.FC = () => {
  const { addWidget } = useEditorStore();
  const [activeCat, setActiveCat] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [favAssets, setFavAssets] = useState<string[]>([]);

  const filtered = MOCK_ASSETS.filter(a => {
    const matchCat = activeCat === 'All' || a.category === activeCat;
    const matchSearch = a.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleAssetAdd = (a: VisualAsset) => {
    const maxZ = useEditorStore.getState().getDraftWidgets().reduce((m, w) => Math.max(m, w.zIndex), 0);
    let type: SceneWidget['type'] = 'image';
    if (a.category === 'GIFs') type = 'gif';
    if (a.category === 'Backgrounds') type = 'background';
    if (a.category === 'SVGs') type = 'svg';
    if (a.category === 'Lotties') type = 'lottie';

    addWidget({
      id: `w-${crypto.randomUUID()}`,
      type,
      label: a.name,
      x: 100, y: 100,
      width: a.width, height: a.height,
      rotation: 0, opacity: 100, scale: 1, zIndex: maxZ + 1,
      visible: true, locked: false,
      style: { background: a.category === 'Backgrounds' ? a.url : undefined },
      animation: { type: 'none', duration: 1, delay: 0, loop: false },
      content: { type, settings: { assetUrl: a.url } },
    });
  };

  const toggleFavorite = (id: string) => {
    setFavAssets(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
      <div style={{ padding: '8px 12px', display: 'flex', flexDirection: 'column', gap: 6 }}>
        <input
          className="input"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Search Assets..."
          style={{ fontSize: 11 }}
        />
        <div style={{ display: 'flex', gap: 4, overflowX: 'auto', paddingBottom: 2 }}>
          {ASSET_CATEGORIES.map(cat => (
            <button
              key={cat}
              className={`category-pill${activeCat === cat ? ' active' : ''}`}
              onClick={() => setActiveCat(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '0 12px 12px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 6 }}>
          {filtered.map(a => {
            const isFav = favAssets.includes(a.id);
            return (
              <div
                key={a.id}
                className="widget-card"
                style={{ cursor: 'grab' }}
                draggable
                onDragStart={e => {
                  e.dataTransfer.setData('application/widget-type', JSON.stringify({
                    type: a.category === 'Backgrounds' ? 'background' : a.category === 'GIFs' ? 'gif' : 'image',
                    defaultWidth: a.width,
                    defaultHeight: a.height,
                    defaultStyle: { background: a.category === 'Backgrounds' ? a.url : undefined },
                  }));
                }}
                onClick={() => handleAssetAdd(a)}
              >
                <div
                  className="widget-card-preview"
                  style={{
                    background: a.category === 'Backgrounds' ? a.url : 'rgba(255,255,255,0.02)',
                    fontSize: 22,
                    position: 'relative',
                  }}
                >
                  {a.category !== 'Backgrounds' && <span>{a.url}</span>}
                  <button
                    className="btn-icon"
                    style={{ position: 'absolute', top: 4, right: 4, width: 20, height: 20, background: 'rgba(0,0,0,0.5)' }}
                    onClick={e => { e.stopPropagation(); toggleFavorite(a.id); }}
                  >
                    <Heart size={10} color={isFav ? 'red' : 'gray'} fill={isFav ? 'red' : 'none'} />
                  </button>
                </div>
                <div className="widget-card-label" style={{ fontSize: 9 }}>{a.name}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// ─── Widgets Tab (Visual templates, favorites, search, recents) ───────────────

const WIDGET_CATEGORIES_LIST = ['All', 'Layout', 'Text', 'Media', 'Stream', 'Shapes', 'Templates'];

const WidgetsTab: React.FC = () => {
  const { addWidget, toggleFavoriteWidget, favoriteWidgets, recentWidgets } = useEditorStore();
  const [activeTab, setActiveTab] = useState('All');
  const [query, setQuery] = useState('');

  // Collect matching items
  const allWidgets = Object.entries(WIDGET_CATEGORIES).map(([cat, list]) =>
    list.map(w => ({ ...w, category: cat, isTemplate: false }))
  ).flat();

  const templatesList = WIDGET_TEMPLATES.map(t => ({
    type: t.type,
    label: t.label,
    icon: t.icon,
    previewBg: 'var(--color-accent-alpha-10)',
    previewColor: 'var(--color-accent)',
    defaultWidth: t.defaultWidth,
    defaultHeight: t.defaultHeight,
    defaultStyle: t.style,
    category: 'Templates',
    isTemplate: true,
    settings: t.settings,
  }));

  const combined = [...allWidgets, ...templatesList];

  const filtered = combined.filter(w => {
    const matchCat = activeTab === 'All' || w.category === activeTab;
    const matchSearch = w.label.toLowerCase().includes(query.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleAddWidget = (def: any) => {
    const maxZ = useEditorStore.getState().getDraftWidgets().reduce((m, w) => Math.max(m, w.zIndex), 0);
    useEditorStore.getState().addRecentWidget(def.type);

    addWidget({
      id: `w-${crypto.randomUUID()}`,
      type: def.type,
      label: def.label,
      x: 200, y: 200,
      width: def.defaultWidth,
      height: def.defaultHeight,
      rotation: 0, opacity: 100, scale: 1, zIndex: maxZ + 1,
      visible: true, locked: false,
      style: def.defaultStyle || {},
      animation: { type: 'none', duration: 1, delay: 0, loop: false },
      content: { type: def.type, settings: def.settings || {} },
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
      <div style={{ padding: '8px 12px', display: 'flex', flexDirection: 'column', gap: 6 }}>
        <input
          className="input"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search components..."
          style={{ fontSize: 11 }}
        />
        <div style={{ display: 'flex', gap: 4, overflowX: 'auto', paddingBottom: 2 }}>
          {WIDGET_CATEGORIES_LIST.map(cat => (
            <button
              key={cat}
              className={`category-pill${activeTab === cat ? ' active' : ''}`}
              onClick={() => setActiveTab(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Recents banner if any exist */}
      {recentWidgets.length > 0 && !query && (
        <div style={{ padding: '0 12px 6px' }}>
          <div style={{ fontSize: 8, fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4, display: 'flex', alignItems: 'center', gap: 4 }}>
            <Clock size={8} /> Recently Used
          </div>
          <div style={{ display: 'flex', gap: 4, overflowX: 'auto' }}>
            {recentWidgets.map(type => {
              const matched = combined.find(x => x.type === type);
              if (!matched) return null;
              return (
                <button
                  key={type}
                  className="btn btn-secondary"
                  style={{ fontSize: 9, padding: '3px 8px', gap: 3 }}
                  onClick={() => handleAddWidget(matched)}
                >
                  <span>{matched.icon}</span> {matched.label}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div style={{ flex: 1, overflowY: 'auto', padding: '0 12px 12px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 6 }}>
          {filtered.map((def, idx) => {
            const isFav = favoriteWidgets.includes(def.type);
            return (
              <div
                key={idx}
                className="widget-card"
                style={{ cursor: 'grab' }}
                draggable
                onDragStart={e => {
                  e.dataTransfer.setData('application/widget-type', JSON.stringify({
                    type: def.type,
                    defaultWidth: def.defaultWidth,
                    defaultHeight: def.defaultHeight,
                    defaultStyle: def.defaultStyle,
                    settings: (def as any).settings,
                  }));
                }}
                onClick={() => handleAddWidget(def)}
              >
                <div
                  className="widget-card-preview"
                  style={{ background: def.previewBg, minHeight: 48, position: 'relative' }}
                >
                  <span style={{ fontSize: 20 }}>{def.icon}</span>
                  <button
                    className="btn-icon"
                    style={{ position: 'absolute', top: 4, right: 4, width: 20, height: 20, background: 'rgba(0,0,0,0.4)' }}
                    onClick={e => { e.stopPropagation(); toggleFavoriteWidget(def.type); }}
                  >
                    <Heart size={10} color={isFav ? 'red' : 'gray'} fill={isFav ? 'red' : 'none'} />
                  </button>
                </div>
                <div className="widget-card-label" style={{ fontSize: 9 }}>
                  {def.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// ─── (PresetsTab removed — presets are now part of Broadcast Packs) ──────────

// ─── (DesignSystemsTab removed — design systems live inside Broadcast Packs) ─

// ─── Helpers ──────────────────────────────────────────────────────────────────

const Radio: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9" /><path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.4" />
    <circle cx="12" cy="12" r="2" /><path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.4" /><path d="M19.1 4.9C23 8.8 23 15.2 19.1 19.1" />
  </svg>
);

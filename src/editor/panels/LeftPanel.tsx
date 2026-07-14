import React, { useState, useRef } from 'react';
import {
  FolderOpen, Film, Layers, Image, Layout, Palette, Cpu,
  Plus, Trash2, Eye, EyeOff, Lock, Unlock, GripVertical,
  Search, ChevronDown, ChevronUp, CheckCircle, Copy, Heart, Clock,
} from 'lucide-react';
import { useEditorStore, type LeftTab, type SceneWidget } from '../../store/editorStore';
import { WIDGET_CATEGORIES } from '../../data/widgetCatalog';
import { WIDGET_TEMPLATES } from '../../data/widgetTemplates';
import { PRESETS, PRESET_CATEGORIES } from '../../data/presets';
import { DESIGN_SYSTEMS } from '../../data/designSystems';
import { MOCK_ASSETS, type VisualAsset } from '../../data/assets';

// ─── Sidebar Rail ─────────────────────────────────────────────────────────────

const TABS: { id: LeftTab; icon: React.ReactNode; label: string }[] = [
  { id: 'projects', icon: <FolderOpen size={16} />, label: 'Project' },
  { id: 'scenes', icon: <Film size={16} />, label: 'Scenes' },
  { id: 'layers', icon: <Layers size={16} />, label: 'Layers' },
  { id: 'assets', icon: <Image size={16} />, label: 'Assets' },
  { id: 'widgets', icon: <Layout size={16} />, label: 'Add' },
  { id: 'presets', icon: <Cpu size={16} />, label: 'Presets' },
  { id: 'design-systems', icon: <Palette size={16} />, label: 'Design' },
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
            className={`sidebar-btn${leftTab === t.id ? ' active' : ''}`}
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
  const { leftTab } = useEditorStore();

  const content: Record<LeftTab, React.ReactNode> = {
    'projects': <ProjectsTab />,
    'scenes': <ScenesTab />,
    'layers': <LayersTab />,
    'assets': <AssetsTab />,
    'widgets': <WidgetsTab />,
    'presets': <PresetsTab />,
    'design-systems': <DesignSystemsTab />,
  };

  const labels: Record<LeftTab, string> = {
    projects: 'Project Info',
    scenes: 'Scene Manager',
    layers: 'Layers Outline',
    assets: 'Assets Browser',
    widgets: 'Widget Library',
    presets: 'Preset Templates',
    'design-systems': 'Design Systems',
  };

  return (
    <div className="left-panel">
      <div className="panel-header">
        <span className="panel-title">{labels[leftTab]}</span>
      </div>
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        {content[leftTab]}
      </div>
    </div>
  );
};

// ─── Projects Tab ─────────────────────────────────────────────────────────────

const ProjectsTab: React.FC = () => {
  const { projectName, scenes } = useEditorStore();
  const [name, setName] = useState(projectName);

  return (
    <div className="panel-body">
      <div className="project-info-card" style={{ marginBottom: 12 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <label style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-text-muted)' }}>Project Name</label>
          <input
            className="input"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="My Stream Overlay"
          />
        </div>
        <div className="project-stat">
          <span className="project-stat-label">Scenes Count</span>
          <span className="project-stat-value">{scenes.length}</span>
        </div>
        <div className="project-stat">
          <span className="project-stat-label">Target Area</span>
          <span className="project-stat-value">1920×1080 (16:9)</span>
        </div>
      </div>

      <div className="output-url-card" style={{ marginBottom: 12 }}>
        <div className="output-url-label">OBS Web Endpoint</div>
        <div className="output-url-text">http://localhost:5173/output</div>
        <button
          className="btn btn-secondary"
          style={{ marginTop: 8, fontSize: 10, padding: '4px 10px', alignSelf: 'flex-start' }}
          onClick={() => navigator.clipboard.writeText('http://localhost:5173/output')}
        >
          Copy Endpoint URL
        </button>
      </div>

      <button className="btn btn-secondary" style={{ width: '100%', fontSize: 11, justifyContent: 'flex-start', gap: 8 }}>
        <FolderOpen size={13} /> Export Stream Scenes
      </button>
    </div>
  );
};

// ─── Scenes Tab ───────────────────────────────────────────────────────────────

const ScenesTab: React.FC = () => {
  const { scenes, editingSceneId, liveSceneId, setEditingScene, setLiveScene, addScene, deleteScene } = useEditorStore();
  const [adding, setAdding] = useState(false);
  const [newName, setNewName] = useState('');

  const handleAdd = () => {
    if (!newName.trim()) return;
    addScene(newName.toLowerCase().replace(/\s+/g, '-'), newName);
    setNewName('');
    setAdding(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
      <div className="panel-body" style={{ flex: 1, overflowY: 'auto' }}>
        <div className="scene-list">
          {scenes.map(scene => {
            const isEditing = scene.id === editingSceneId;
            const isLive = scene.id === liveSceneId;
            return (
              <div
                key={scene.id}
                className={`scene-item${isEditing ? ' active' : ''}${isLive ? ' live-indicator' : ''}`}
                onClick={() => setEditingScene(scene.id)}
              >
                <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{scene.label}</span>
                <div style={{ display: 'flex', gap: 2 }} className="scene-item-actions">
                  <button className="btn-icon" style={{ width: 22, height: 22 }} title="Go Live"
                    onClick={e => { e.stopPropagation(); setLiveScene(scene.id); }}>
                    <Radio size={11} />
                  </button>
                  <button className="btn-icon" style={{ width: 22, height: 22 }} title="Delete"
                    onClick={e => { e.stopPropagation(); if (scenes.length > 1) deleteScene(scene.id); }}>
                    <Trash2 size={11} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {adding ? (
          <div style={{ display: 'flex', gap: 4, marginTop: 8 }}>
            <input
              autoFocus
              className="input"
              value={newName}
              onChange={e => setNewName(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') handleAdd(); if (e.key === 'Escape') setAdding(false); }}
              placeholder="Scene Name"
              style={{ flex: 1, fontSize: 11 }}
            />
            <button className="btn btn-primary" style={{ fontSize: 11, padding: '4px 10px' }} onClick={handleAdd}>Add</button>
          </div>
        ) : (
          <button
            className="btn btn-secondary"
            style={{ width: '100%', marginTop: 8, fontSize: 11, justifyContent: 'center', gap: 6 }}
            onClick={() => setAdding(true)}
          >
            <Plus size={13} /> Add Scene
          </button>
        )}
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
        <div style={{ textAlign: 'center', color: 'var(--color-text-muted)', fontSize: 11, padding: '32px 0' }}>
          <Layers size={24} style={{ margin: '0 auto 8px', display: 'block', opacity: 0.3 }} />
          No items on canvas
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
    previewBg: 'rgba(168,85,247,0.1)',
    previewColor: '#a855f7',
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

// ─── Presets Tab ─────────────────────────────────────────────────────────────

const PresetsTab: React.FC = () => {
  const { applyPreset } = useEditorStore();
  const [activeCategory, setActiveCategory] = useState('All');
  const [applying, setApplying] = useState<string | null>(null);

  const filtered = activeCategory === 'All'
    ? PRESETS
    : PRESETS.filter(p => p.category === activeCategory);

  const handleApply = (preset: typeof PRESETS[0]) => {
    setApplying(preset.id);
    applyPreset(preset.widgets as Parameters<typeof applyPreset>[0]);
    setTimeout(() => setApplying(null), 1200);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
      <div style={{ padding: '8px 12px', overflowX: 'auto', flexShrink: 0 }}>
        <div className="category-pills" style={{ flexWrap: 'nowrap', paddingBottom: 2 }}>
          {PRESET_CATEGORIES.map(cat => (
            <button
              key={cat}
              className={`category-pill${activeCategory === cat ? ' active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '0 12px 12px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {filtered.map(preset => (
          <div key={preset.id} className="preset-card">
            <div className="preset-preview" style={{ background: preset.bgColors[0] }}>
              <div style={{
                width: '100%', height: '100%',
                background: `linear-gradient(135deg,${preset.bgColors[0]},${preset.bgColors[1]})`,
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center', gap: 6,
              }}>
                <div style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: 11, fontWeight: 800,
                  color: preset.accentColor,
                  textTransform: 'uppercase',
                  letterSpacing: 2,
                  textShadow: `0 0 12px ${preset.accentColor}80`,
                  textAlign: 'center',
                  marginTop: 20,
                }}>
                  {preset.name}
                </div>
              </div>

              <div className="preset-preview-overlay">
                <button
                  className="btn btn-primary"
                  style={{ fontSize: 11 }}
                  onClick={() => handleApply(preset)}
                >
                  {applying === preset.id ? <><CheckCircle size={13} /> Applied!</> : 'Apply Preset'}
                </button>
              </div>
            </div>

            <div className="preset-body">
              <div className="preset-name">{preset.name}</div>
              <div className="preset-desc">{preset.desc}</div>
              <div className="preset-color-dots">
                {[preset.accentColor, preset.bgColors[0], preset.bgColors[1]].map((c, i) => (
                  <div key={i} className="preset-color-dot" style={{ background: c }} />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── Design Systems Tab ───────────────────────────────────────────────────────

const DesignSystemsTab: React.FC = () => {
  const [activeTheme, setActiveTheme] = useState('cyber-synth');

  const handleApply = (ds: typeof DESIGN_SYSTEMS[0]) => {
    setActiveTheme(ds.id);
    const shell = document.querySelector('.app-shell');
    if (shell) {
      DESIGN_SYSTEMS.forEach(d => shell.classList.remove(`theme-${d.id}`));
      shell.classList.add(`theme-${ds.id}`);
    }
  };

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
      {DESIGN_SYSTEMS.map(ds => (
        <div
          key={ds.id}
          className={`design-system-card${activeTheme === ds.id ? ' active' : ''}`}
          onClick={() => handleApply(ds)}
        >
          <div className="design-system-preview" style={{ background: ds.previewBg }}>
            <div style={{
              width: '100%', height: '100%',
              background: ds.previewBg,
              display: 'flex', flexDirection: 'column',
              alignItems: 'flex-start', justifyContent: 'flex-end',
              padding: '8px 10px',
            }}>
              <div style={{ display: 'flex', gap: 4, marginBottom: 4 }}>
                <div style={{ width: 28, height: 4, borderRadius: 99, background: ds.accentColor, opacity: 0.9 }} />
                <div style={{ width: 16, height: 4, borderRadius: 99, background: 'rgba(255,255,255,0.15)' }} />
              </div>
              <div style={{ fontSize: 9, fontFamily: ds.fontFamily, fontWeight: 700, color: ds.accentColor, letterSpacing: 1, textTransform: 'uppercase' }}>
                {ds.name}
              </div>
            </div>

            {activeTheme === ds.id && (
              <div className="design-system-check">
                <CheckCircle size={12} color="white" fill="white" />
              </div>
            )}
          </div>

          <div className="design-system-body">
            <div className="design-system-name">{ds.name}</div>
            <div className="design-system-desc">{ds.desc}</div>
            <div style={{ display: 'flex', gap: 4, marginTop: 6 }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: ds.accentColor, border: '1px solid rgba(255,255,255,0.15)' }} />
              <span style={{ fontSize: 9, color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)', marginLeft: 2 }}>
                {ds.borderRadius} • {ds.fontFamily}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

const Radio: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9" /><path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.4" />
    <circle cx="12" cy="12" r="2" /><path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.4" /><path d="M19.1 4.9C23 8.8 23 15.2 19.1 19.1" />
  </svg>
);

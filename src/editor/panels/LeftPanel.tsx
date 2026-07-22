import React, { useState, useRef, useEffect } from 'react';
import {
  Film, Layers, Image, Layout, Palette,
  Plus, Trash2, Eye, EyeOff, Lock, Unlock, GripVertical,
  Search, ChevronDown, ChevronUp, Copy, Heart, Clock, Radio as RadioIcon, Star,
} from 'lucide-react';
import { useEditorStore, getTimerRemaining, type LeftTab, type SceneWidget } from '../../store/editorStore';
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
      {/* Nothing brand dot-matrix logo */}
      <div style={{
        width: 34, height: 34, borderRadius: 10,
        background: '#0F0F0F',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: 16, cursor: 'pointer',
        position: 'relative', overflow: 'hidden',
      }} title="StreamScenes">
        {/* 3x3 dot matrix */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 4px)', gap: 2.5,
        }}>
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} style={{
              width: 4, height: 4, borderRadius: '50%',
              background: i === 4 ? '#FF3A30' : 'rgba(255,255,255,0.25)',
            }} />
          ))}
        </div>
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

  return (
    <div className="left-panel vibe-red-accent-left" style={{ width: leftPanelWidth }}>
      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
        {content[leftTab]}
      </div>
    </div>
  );
};

// ─── Scenes Tab (Matching Reference Image) ───────────────────────────────────

const ScenesTab: React.FC = () => {
  const {
    scenes, editingSceneId, setEditingScene,
    liveSceneId, liveScenes, setLiveScene,
    liveTimer, startLiveTimer, pauseLiveTimer, resumeLiveTimer, resetLiveTimer, adjustLiveTimer,
  } = useEditorStore();

  const [search, setSearch] = useState('');
  const [selectedTransition, setSelectedTransition] = useState('Project Default Transition');
  // Live-ticking remaining seconds
  const [remaining, setRemaining] = useState(() => getTimerRemaining(liveTimer));

  // Sync remaining whenever timer object changes (pause, reset, adjust, etc.)
  useEffect(() => {
    setRemaining(getTimerRemaining(liveTimer));
  }, [liveTimer]);

  // Poll every 100ms while timer is running
  useEffect(() => {
    if (!liveTimer.isRunning || liveTimer.isFinished) return;
    const interval = setInterval(() => {
      setRemaining(getTimerRemaining(liveTimer));
    }, 100);
    return () => clearInterval(interval);
  }, [liveTimer]);

  // Format seconds -> HH:MM:SS
  const formatTime = (secs: number) => {
    const s = Math.max(0, Math.round(secs));
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  };

  // Timer status
  let timerStatus = 'STANDBY';
  let statusColor = 'rgba(255,255,255,0.3)';
  if (liveTimer.isFinished) { timerStatus = 'FINISHED'; statusColor = '#FF3A30'; }
  else if (liveTimer.isRunning) { timerStatus = 'RUNNING'; statusColor = '#22c55e'; }
  else if (liveTimer.startedAt !== null) { timerStatus = 'PAUSED'; statusColor = '#3b82f6'; }

  // Get duration from countdown widget in live scene (fallback to stored duration)
  const getWidgetDuration = () => {
    const activeLiveId = liveSceneId || (liveScenes[0]?.id ?? null);
    const liveScene = liveScenes.find(s => s.id === activeLiveId);
    const widget = liveScene?.widgets.find(w => w.type === 'countdown-timer');
    return {
      duration: widget?.content.settings?.duration ?? liveTimer.duration ?? 600,
      finishBehavior: widget?.content.settings?.finishBehavior ?? 'freeze',
      replaceText: widget?.content.settings?.replaceText ?? '',
      replaceTransition: widget?.content.settings?.replaceTransition ?? 'none',
      switchTargetSceneId: widget?.content.settings?.switchTargetSceneId ?? null,
    };
  };

  const handleStartPause = () => {
    if (liveTimer.isRunning) {
      pauseLiveTimer();
    } else if (liveTimer.startedAt !== null && !liveTimer.isFinished) {
      resumeLiveTimer();
    } else {
      const { duration, finishBehavior, ...rest } = getWidgetDuration();
      startLiveTimer(duration, finishBehavior, rest);
    }
  };

  const handleReset = () => {
    const { duration } = getWidgetDuration();
    resetLiveTimer(duration);
  };

  // Icon from scene name slug (not label which has emojis)
  const sceneIcon = (name: string) => {
    if (name.includes('chat')) return '💬';
    if (name.includes('game') || name.includes('play')) return '🎮';
    if (name.includes('brb') || name.includes('break')) return '☕';
    if (name.includes('end')) return '🎬';
    if (name.includes('soon') || name.includes('start')) return '⏳';
    return '▫';
  };

  const filteredScenes = search.trim()
    ? scenes.filter(s => s.label.toLowerCase().includes(search.toLowerCase()))
    : scenes;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>

      {/* ── Section 1: SCENE MANAGER */}
      <div style={{ padding: '16px 16px 14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <span className="nothing-section-label">SCENE MANAGER</span>
          <button style={{ background: 'none', border: 'none', color: '#444', cursor: 'pointer', fontSize: 16, lineHeight: 1 }}>···</button>
        </div>

        {/* Search pill */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          background: 'rgba(255,255,255,0.04)', borderRadius: 999,
          padding: '7px 12px', border: '1px solid rgba(255,255,255,0.07)',
        }}>
          <Search size={12} style={{ color: '#444', flexShrink: 0 }} />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search scenes..."
            style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: 11, color: '#aaa', width: '100%' }}
          />
        </div>
      </div>

      {/* Divider */}
      <div className="vibe-red-divider" style={{ margin: '0 16px 14px' }} />

      {/* ── Section 2: LIVE BROADCAST STATE */}
      <div style={{ padding: '0 16px 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span className="nothing-section-label">LIVE BROADCAST STATE</span>
          <button style={{ background: 'none', border: 'none', color: '#444', cursor: 'pointer', fontSize: 16, lineHeight: 1 }}>···</button>
        </div>

        {/* Nothing-style LED timer */}
        <div style={{
          background: liveTimer.isRunning ? 'rgba(34, 197, 94, 0.06)' : 'rgba(255, 58, 48, 0.06)',
          borderRadius: 14,
          padding: '14px 16px',
          border: `1px solid ${liveTimer.isRunning ? 'rgba(34, 197, 94, 0.2)' : 'rgba(255, 58, 48, 0.15)'}`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 6,
          transition: 'all 300ms ease',
        }}>
          <div
            className="vibe-font-led"
            style={{
              fontSize: 36, fontWeight: 700, lineHeight: 1, letterSpacing: '0.06em',
              color: liveTimer.isRunning ? '#22c55e' : liveTimer.isFinished ? '#FF3A30' : '#FF3A30',
              textShadow: liveTimer.isRunning ? '0 0 12px rgba(34,197,94,0.4)' : 'none',
            }}
          >
            {formatTime(remaining)}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{
              width: 6, height: 6, borderRadius: '50%',
              background: statusColor,
              boxShadow: liveTimer.isRunning ? `0 0 6px ${statusColor}` : 'none',
              animation: liveTimer.isRunning ? 'live-pulse 1.5s ease-in-out infinite' : 'none',
            }} />
            <span style={{ fontSize: 9, fontWeight: 700, color: statusColor, letterSpacing: '0.15em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
              {timerStatus}
            </span>
          </div>
        </div>

        {/* Timer Control Pills */}
        <div style={{ display: 'flex', gap: 6 }}>
          <button
            className="vibe-pill-btn"
            style={{ flex: 1, justifyContent: 'center' }}
            onClick={handleStartPause}
          >
            <Clock size={11} />
            <span>
              {liveTimer.isRunning ? 'Pause' : liveTimer.startedAt !== null && !liveTimer.isFinished ? 'Resume' : 'Start'}
            </span>
          </button>
          <button
            className="vibe-pill-btn"
            style={{ flex: 1, justifyContent: 'center' }}
            onClick={handleReset}
          >
            <RadioIcon size={11} />
            <span>Reset</span>
          </button>
        </div>

        <div style={{ display: 'flex', gap: 6 }}>
          <button className="vibe-pill-btn" style={{ flex: 1, justifyContent: 'center', fontSize: 10 }} onClick={() => adjustLiveTimer(60)}>+1m</button>
          <button className="vibe-pill-btn" style={{ flex: 1, justifyContent: 'center', fontSize: 10 }} onClick={() => adjustLiveTimer(-60)}>-1m</button>
          <button className="vibe-pill-btn" style={{ flex: 1, justifyContent: 'center', fontSize: 10 }} onClick={() => adjustLiveTimer(-180)}>-3m</button>
        </div>
      </div>

      {/* Divider */}
      <div className="vibe-red-divider" style={{ margin: '0 16px 14px' }} />

      {/* ── Section 3: SCENE TRANSITIONS */}
      <div style={{ padding: '0 16px 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span className="nothing-section-label">SCENE TRANSITIONS</span>
          <button style={{ background: 'none', border: 'none', color: '#444', cursor: 'pointer', fontSize: 16, lineHeight: 1 }}>···</button>
        </div>

        {/* Transition select pill */}
        <div style={{ position: 'relative' }}>
          <select
            value={selectedTransition}
            onChange={e => setSelectedTransition(e.target.value)}
            style={{
              width: '100%',
              appearance: 'none',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 999,
              padding: '7px 36px 7px 14px',
              fontSize: 11,
              fontWeight: 500,
              color: '#aaa',
              cursor: 'pointer',
              outline: 'none',
            }}
          >
            <option value="Project Default Transition">Project Default Transition</option>
            <option value="Fade Transition">Fade Transition</option>
            <option value="Slide Transition">Slide Transition</option>
          </select>
          <ChevronDown size={12} style={{ position: 'absolute', right: 12, top: 9, color: '#555', pointerEvents: 'none' }} />
        </div>

        {/* Scene list pills */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {filteredScenes.map(s => {
            const isEditing = s.id === editingSceneId;
            const isLive = s.id === liveSceneId;
            return (
              <div
                key={s.id}
                onClick={() => setEditingScene(s.id)}
                className={`scene-item${isEditing ? ' active' : ''}`}
                style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 10px 6px 12px' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1, minWidth: 0 }}>
                  <span style={{ fontSize: 12, opacity: isEditing ? 1 : 0.5, flexShrink: 0 }}>
                    {sceneIcon(s.name)}
                  </span>
                  <span style={{ fontSize: 11, fontWeight: isEditing ? 600 : 400, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {s.label}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
                  {/* Quick Switch Live Icon Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setLiveScene(s.id);
                    }}
                    title={isLive ? "Currently Broadcasting Live" : `Switch live broadcast to ${s.label}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4,
                      background: isLive ? 'rgba(255, 58, 48, 0.16)' : 'rgba(255, 255, 255, 0.05)',
                      border: `1px solid ${isLive ? 'rgba(255, 58, 48, 0.45)' : 'rgba(255, 255, 255, 0.09)'}`,
                      borderRadius: 999,
                      padding: '3px 8px',
                      fontSize: 9,
                      fontWeight: 700,
                      color: isLive ? '#FF3A30' : '#888',
                      cursor: 'pointer',
                      transition: 'all 150ms ease',
                    }}
                    onMouseEnter={e => {
                      if (!isLive) {
                        e.currentTarget.style.background = 'rgba(255, 58, 48, 0.12)';
                        e.currentTarget.style.borderColor = 'rgba(255, 58, 48, 0.35)';
                        e.currentTarget.style.color = '#FF3A30';
                      }
                    }}
                    onMouseLeave={e => {
                      if (!isLive) {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.09)';
                        e.currentTarget.style.color = '#888';
                      }
                    }}
                  >
                    <RadioIcon size={10} style={{ color: isLive ? '#FF3A30' : 'inherit' }} />
                    <span>{isLive ? 'LIVE' : 'GO LIVE'}</span>
                  </button>

                  {isEditing && !isLive && (
                    <span title="Currently Editing" style={{ width: 5, height: 5, borderRadius: '50%', background: 'rgba(255,255,255,0.3)', flexShrink: 0 }} />
                  )}
                </div>
              </div>
            );
          })}
        </div>
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

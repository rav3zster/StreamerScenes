import { create } from 'zustand';
import { STREAM_PACKS } from '../data/streamPacks';

// ─── Types ────────────────────────────────────────────────────────────────────

export type WidgetType =
  // Layout
  | 'header' | 'footer' | 'sidebar' | 'container' | 'background' | 'glass-panel' | 'divider' | 'spacer'
  // Text
  | 'text' | 'animated-text' | 'scrolling-text' | 'typing-text' | 'now-playing-text'
  | 'latest-follower' | 'latest-subscriber' | 'latest-donation' | 'viewer-count'
  | 'countdown-timer' | 'clock' | 'goal-counter' | 'social-links'
  // Media
  | 'image' | 'gif' | 'video' | 'lottie' | 'svg' | 'logo'
  | 'avatar-frame' | 'camera-frame' | 'game-capture' | 'vtuber'
  // Stream
  | 'chat-box' | 'donation-feed' | 'follower-feed' | 'subscriber-feed'
  | 'event-list' | 'spotify' | 'alerts' | 'poll' | 'goal-bar'
  // Decorative
  | 'shape' | 'neon-card' | 'glass-card' | 'glow-effect' | 'particles' | 'line' | 'badge'
  | 'corner-decoration';

export type AnimationType = 'none' | 'fade' | 'scale' | 'slide-up' | 'slide-left' | 'bounce' | 'glow' | 'pulse' | 'float' | 'shake' | 'spin';

export interface WidgetStyle {
  background?: string;
  borderRadius?: number;
  borderSize?: number;
  borderStyle?: 'solid' | 'dashed' | 'dotted' | 'none';
  borderColor?: string;
  shadowX?: number;
  shadowY?: number;
  shadowBlur?: number;
  shadowColor?: string;
  glowColor?: string;
  glowBlur?: number;
  padding?: number;
  fontFamily?: string;
  fontSize?: number;
  fontWeight?: string;
  fontStyle?: 'normal' | 'italic';
  fontColor?: string;
  textAlign?: 'left' | 'center' | 'right';
  letterSpacing?: number;
  lineHeight?: number;
  textTransform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
  blur?: number;
  glassEffect?: boolean;
  blendMode?: string;
  strokeColor?: string;
  strokeWidth?: number;
  textShadowX?: number;
  textShadowY?: number;
  textShadowBlur?: number;
  textShadowColor?: string;
}

export interface WidgetAnimation {
  type: AnimationType;
  duration: number;
  delay: number;
  loop: boolean;
  easing?: string;
}

export interface SceneWidget {
  id: string;
  type: WidgetType;
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  opacity: number;
  scale: number;
  zIndex: number;
  visible: boolean;
  locked: boolean;
  groupId?: string;
  colorLabel?: string; // Color tag for layers (e.g. 'red', 'green', 'blue', etc.)
  expanded?: boolean; // Expanded state if it's a folder/group
  style: WidgetStyle;
  animation: WidgetAnimation;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content: { type: string; settings: Record<string, any> };
}

export interface Scene {
  id: string;
  name: string;
  label: string;
  widgets: SceneWidget[];
}

export type GridMode = 'lines' | 'dots' | 'off';

export interface UserGuide {
  id: string;
  type: 'x' | 'y';
  val: number;
}

// ─── Store State ──────────────────────────────────────────────────────────────

interface EditorState {
  projectName: string;
  editingSceneId: string | null;
  scenes: Scene[];
  liveSceneId: string | null;

  // Onboarding wizard
  isWelcomeActive: boolean;
  selectedPackId: string | null;

  // Canvas Options
  zoom: number;
  pan: { x: number; y: number };
  snapEnabled: boolean;
  gridMode: GridMode;
  showGuides: boolean;
  showRulers: boolean;
  userGuides: UserGuide[];

  // Selection
  selectedIds: string[];
  hoveredId: string | null;
  clipboard: SceneWidget[];

  // History
  history: Record<string, SceneWidget[][]>;
  historyIndex: Record<string, number>;

  // UI
  isDragging: boolean;
  isResizing: boolean;
  leftTab: LeftTab;
  showPreviewMode: boolean;

  // Favorites and Recents
  favoriteWidgets: string[];
  recentWidgets: string[];

  // Actions — Scenes
  setScenes: (scenes: Scene[]) => void;
  setEditingScene: (id: string) => void;
  addScene: (name: string, label: string) => void;
  deleteScene: (id: string) => void;
  setLiveScene: (id: string) => void;
  createProjectFromPack: (projectName: string, packId: string) => void;

  // Actions — Widgets
  getDraftWidgets: () => SceneWidget[];
  addWidget: (w: SceneWidget) => void;
  removeWidget: (id: string) => void;
  removeSelectedWidgets: () => void;
  updateWidget: (id: string, updates: Partial<SceneWidget>) => void;
  duplicateWidget: (id: string) => void;
  bringToFront: (id: string) => void;
  sendToBack: (id: string) => void;
  bringForward: (id: string) => void;
  sendBackward: (id: string) => void;
  groupSelected: () => void;
  ungroupSelected: () => void;
  reorderWidgets: (draggedId: string, targetId: string) => void;

  // Actions — Selection
  selectWidget: (id: string, additive?: boolean) => void;
  selectWidgets: (ids: string[]) => void;
  deselectAll: () => void;
  setHovered: (id: string | null) => void;
  getSelectedWidgets: () => SceneWidget[];

  // Actions — Clipboard
  copySelected: () => void;
  pasteClipboard: () => void;

  // Actions — History
  pushHistory: () => void;
  undo: () => void;
  redo: () => void;
  canUndo: () => boolean;
  canRedo: () => boolean;

  // Actions — Canvas & Guides
  setZoom: (z: number) => void;
  setPan: (p: { x: number; y: number }) => void;
  zoomIn: () => void;
  zoomOut: () => void;
  resetView: () => void;
  zoomToFit: () => void;
  zoomToSelection: () => void;
  toggleSnap: () => void;
  setGridMode: (mode: GridMode) => void;
  toggleGuides: () => void;
  toggleRulers: () => void;
  addUserGuide: (type: 'x' | 'y', val: number) => void;
  removeUserGuide: (id: string) => void;
  clearUserGuides: () => void;

  // Actions — Favorites & Recents
  toggleFavoriteWidget: (type: string) => void;
  addRecentWidget: (type: string) => void;

  // Actions — UI
  setLeftTab: (tab: LeftTab) => void;
  setIsDragging: (v: boolean) => void;
  setIsResizing: (v: boolean) => void;
  togglePreviewMode: () => void;

  // Apply preset
  applyPreset: (widgets: Omit<SceneWidget, 'id'>[]) => void;
}

export type LeftTab = 'projects' | 'scenes' | 'layers' | 'assets' | 'widgets' | 'presets' | 'design-systems';

const MAX_HISTORY = 50;

const makeId = () => `w-${crypto.randomUUID()}`;

function _pushHistory(
  history: Record<string, SceneWidget[][]>,
  historyIndex: Record<string, number>,
  sceneId: string,
  widgets: SceneWidget[]
) {
  const idx = historyIndex[sceneId] ?? 0;
  const hist = (history[sceneId] ?? [[]]).slice(0, idx + 1);
  hist.push(widgets.map(w => ({ ...w, style: { ...w.style } })));
  if (hist.length > MAX_HISTORY) hist.shift();
  return {
    history: { ...history, [sceneId]: hist },
    historyIndex: { ...historyIndex, [sceneId]: hist.length - 1 },
  };
}

const DEFAULT_SCENES: Scene[] = [
  {
    id: 'scene-starting-soon',
    name: 'starting-soon',
    label: '⏳ Starting Soon',
    widgets: [],
  },
  {
    id: 'scene-just-chatting',
    name: 'just-chatting',
    label: '💬 Just Chatting',
    widgets: [],
  },
  {
    id: 'scene-brb',
    name: 'brb',
    label: '☕ BRB',
    widgets: [],
  },
  {
    id: 'scene-ending',
    name: 'ending',
    label: '🎬 Ending',
    widgets: [],
  },
];

export const useEditorStore = create<EditorState>((set, get) => ({
  projectName: 'My Stream Overlay',
  editingSceneId: null,
  scenes: [],
  liveSceneId: null,

  // Onboarding default state
  isWelcomeActive: true,
  selectedPackId: null,

  // Canvas Options defaults
  zoom: 0.5,
  pan: { x: 0, y: 0 },
  snapEnabled: true,
  gridMode: 'dots',
  showGuides: true,
  showRulers: true,
  userGuides: [],

  selectedIds: [],
  hoveredId: null,
  clipboard: [],
  history: {},
  historyIndex: {},
  isDragging: false,
  isResizing: false,
  leftTab: 'scenes',
  showPreviewMode: false,

  favoriteWidgets: [],
  recentWidgets: [],

  // ── Scenes ──────────────────────────────────────────────────────────────────

  setScenes: (scenes) => set({ scenes }),

  setEditingScene: (id) => set({ editingSceneId: id, selectedIds: [] }),

  addScene: (name, label) => {
    const id = `scene-${Date.now()}`;
    const newScene: Scene = { id, name, label, widgets: [] };
    set(s => ({ scenes: [...s.scenes, newScene], editingSceneId: id }));
  },

  deleteScene: (id) => {
    set(s => {
      const remaining = s.scenes.filter(sc => sc.id !== id);
      const newEditId = s.editingSceneId === id
        ? (remaining[0]?.id ?? null)
        : s.editingSceneId;
      return { scenes: remaining, editingSceneId: newEditId };
    });
  },

  setLiveScene: (id) => set({ liveSceneId: id }),

  createProjectFromPack: (projectName, packId) => {
    const pack = STREAM_PACKS.find(p => p.id === packId);
    if (!pack) return;

    const instantiatedScenes = pack.scenes.map(ps => {
      const sceneId = `scene-${crypto.randomUUID()}`;
      const widgets = ps.widgets.map((w, index) => {
        return {
          ...w,
          id: `w-${crypto.randomUUID()}`,
          zIndex: index + 1,
        };
      }) as SceneWidget[];
      return {
        id: sceneId,
        name: ps.name,
        label: ps.label,
        widgets,
      };
    });

    set({
      projectName,
      scenes: instantiatedScenes,
      editingSceneId: instantiatedScenes[0]?.id || null,
      isWelcomeActive: false,
      selectedPackId: packId,
      selectedIds: [],
    });

    // Apply visual design system theme to app shell container
    setTimeout(() => {
      const shell = document.querySelector('.app-shell');
      if (shell) {
        STREAM_PACKS.forEach(p => shell.classList.remove(p.themeClass));
        shell.classList.add(pack.themeClass);
      }
    }, 100);
  },

  // ── Widgets ─────────────────────────────────────────────────────────────────

  getDraftWidgets: () => {
    const { editingSceneId, scenes } = get();
    return scenes.find(s => s.id === editingSceneId)?.widgets ?? [];
  },

  addWidget: (w) => {
    const { editingSceneId } = get();
    if (!editingSceneId) return;
    get().pushHistory();
    set(s => ({
      scenes: s.scenes.map(sc =>
        sc.id === editingSceneId ? { ...sc, widgets: [...sc.widgets, w] } : sc
      ),
      selectedIds: [w.id],
    }));
  },

  removeWidget: (id) => {
    const { editingSceneId } = get();
    if (!editingSceneId) return;
    get().pushHistory();
    set(s => ({
      scenes: s.scenes.map(sc =>
        sc.id === editingSceneId
          ? { ...sc, widgets: sc.widgets.filter(w => w.id !== id) }
          : sc
      ),
      selectedIds: s.selectedIds.filter(x => x !== id),
    }));
  },

  removeSelectedWidgets: () => {
    const { editingSceneId, selectedIds } = get();
    if (!editingSceneId || selectedIds.length === 0) return;
    get().pushHistory();
    set(s => ({
      scenes: s.scenes.map(sc =>
        sc.id === editingSceneId
          ? { ...sc, widgets: sc.widgets.filter(w => !selectedIds.includes(w.id)) }
          : sc
      ),
      selectedIds: [],
    }));
  },

  updateWidget: (id, updates) => {
    const { editingSceneId } = get();
    if (!editingSceneId) return;
    set(s => ({
      scenes: s.scenes.map(sc =>
        sc.id === editingSceneId
          ? {
              ...sc,
              widgets: sc.widgets.map(w =>
                w.id !== id ? w : {
                  ...w, ...updates,
                  style: updates.style ? { ...w.style, ...updates.style } : w.style,
                }
              ),
            }
          : sc
      ),
    }));
  },

  duplicateWidget: (id) => {
    const { editingSceneId, scenes } = get();
    if (!editingSceneId) return;
    const scene = scenes.find(s => s.id === editingSceneId);
    const orig = scene?.widgets.find(w => w.id === id);
    if (!orig) return;
    get().pushHistory();
    const maxZ = scene!.widgets.reduce((m, w) => Math.max(m, w.zIndex), 0);
    const clone: SceneWidget = {
      ...orig, id: makeId(),
      x: orig.x + 20, y: orig.y + 20,
      zIndex: maxZ + 1,
      style: { ...orig.style },
      animation: { ...orig.animation },
      content: { ...orig.content, settings: { ...orig.content.settings } },
    };
    set(s => ({
      scenes: s.scenes.map(sc =>
        sc.id === editingSceneId ? { ...sc, widgets: [...sc.widgets, clone] } : sc
      ),
      selectedIds: [clone.id],
    }));
  },

  bringToFront: (id) => {
    const scene = get().scenes.find(s => s.id === get().editingSceneId);
    const maxZ = scene?.widgets.reduce((m, w) => Math.max(m, w.zIndex), 0) ?? 0;
    get().updateWidget(id, { zIndex: maxZ + 1 });
  },

  sendToBack: (id) => get().updateWidget(id, { zIndex: 0 }),

  bringForward: (id) => {
    const scene = get().scenes.find(s => s.id === get().editingSceneId);
    const w = scene?.widgets.find(w => w.id === id);
    if (w) get().updateWidget(id, { zIndex: w.zIndex + 1 });
  },

  sendBackward: (id) => {
    const scene = get().scenes.find(s => s.id === get().editingSceneId);
    const w = scene?.widgets.find(w => w.id === id);
    if (w && w.zIndex > 0) get().updateWidget(id, { zIndex: w.zIndex - 1 });
  },

  groupSelected: () => {
    const { selectedIds } = get();
    if (selectedIds.length < 2) return;
    const gid = `group-${Date.now()}`;
    const { editingSceneId } = get();
    if (!editingSceneId) return;
    set(s => ({
      scenes: s.scenes.map(sc =>
        sc.id === editingSceneId
          ? { ...sc, widgets: sc.widgets.map(w => selectedIds.includes(w.id) ? { ...w, groupId: gid } : w) }
          : sc
      ),
    }));
  },

  ungroupSelected: () => {
    const { selectedIds, editingSceneId } = get();
    if (!editingSceneId) return;
    set(s => ({
      scenes: s.scenes.map(sc =>
        sc.id === editingSceneId
          ? { ...sc, widgets: sc.widgets.map(w => selectedIds.includes(w.id) ? { ...w, groupId: undefined } : w) }
          : sc
      ),
    }));
  },

  reorderWidgets: (draggedId, targetId) => {
    const { editingSceneId, scenes } = get();
    if (!editingSceneId) return;
    const currentScene = scenes.find(sc => sc.id === editingSceneId);
    if (!currentScene) return;

    const list = [...currentScene.widgets];
    const fromIndex = list.findIndex(w => w.id === draggedId);
    const toIndex = list.findIndex(w => w.id === targetId);

    if (fromIndex !== -1 && toIndex !== -1) {
      const [dragged] = list.splice(fromIndex, 1);
      list.splice(toIndex, 0, dragged);

      // Re-assign zIndex sequentially so they stack exactly as sorted
      const updated = list.map((w, idx) => ({ ...w, zIndex: idx + 1 }));

      get().pushHistory();
      set(s => ({
        scenes: s.scenes.map(sc =>
          sc.id === editingSceneId ? { ...sc, widgets: updated } : sc
        ),
      }));
    }
  },

  // ── Selection ────────────────────────────────────────────────────────────────

  selectWidget: (id, additive = false) => {
    set(s => ({
      selectedIds: additive
        ? s.selectedIds.includes(id) ? s.selectedIds.filter(x => x !== id) : [...s.selectedIds, id]
        : [id],
    }));
  },

  selectWidgets: (ids) => set({ selectedIds: ids }),
  deselectAll: () => set({ selectedIds: [] }),
  setHovered: (id) => set({ hoveredId: id }),

  getSelectedWidgets: () => {
    const { editingSceneId, scenes, selectedIds } = get();
    return scenes.find(s => s.id === editingSceneId)?.widgets.filter(w => selectedIds.includes(w.id)) ?? [];
  },

  // ── Clipboard ────────────────────────────────────────────────────────────────

  copySelected: () => {
    const selected = get().getSelectedWidgets();
    set({ clipboard: selected.map(w => ({ ...w, style: { ...w.style } })) });
  },

  pasteClipboard: () => {
    const { clipboard, editingSceneId, scenes } = get();
    if (!clipboard.length || !editingSceneId) return;
    get().pushHistory();
    const scene = scenes.find(s => s.id === editingSceneId);
    let maxZ = scene?.widgets.reduce((m, w) => Math.max(m, w.zIndex), 0) ?? 0;
    const newWidgets = clipboard.map(w => ({
      ...w, id: makeId(), x: w.x + 20, y: w.y + 20, zIndex: ++maxZ,
      style: { ...w.style },
    }));
    set(s => ({
      scenes: s.scenes.map(sc =>
        sc.id === editingSceneId ? { ...sc, widgets: [...sc.widgets, ...newWidgets] } : sc
      ),
      selectedIds: newWidgets.map(w => w.id),
    }));
  },

  // ── History ──────────────────────────────────────────────────────────────────

  pushHistory: () => {
    const { editingSceneId, scenes, history, historyIndex } = get();
    if (!editingSceneId) return;
    const scene = scenes.find(s => s.id === editingSceneId);
    if (!scene) return;
    set(_pushHistory(history, historyIndex, editingSceneId, scene.widgets));
  },

  undo: () => {
    const { editingSceneId, history, historyIndex } = get();
    if (!editingSceneId) return;
    const idx = historyIndex[editingSceneId] ?? 0;
    if (idx <= 0) return;
    const newIdx = idx - 1;
    const widgets = history[editingSceneId]?.[newIdx] ?? [];
    set(s => ({
      scenes: s.scenes.map(sc => sc.id === editingSceneId ? { ...sc, widgets: widgets.map(w => ({ ...w })) } : sc),
      historyIndex: { ...s.historyIndex, [editingSceneId]: newIdx },
      selectedIds: [],
    }));
  },

  redo: () => {
    const { editingSceneId, history, historyIndex } = get();
    if (!editingSceneId) return;
    const idx = historyIndex[editingSceneId] ?? 0;
    const hist = history[editingSceneId] ?? [];
    if (idx >= hist.length - 1) return;
    const newIdx = idx + 1;
    const widgets = hist[newIdx];
    set(s => ({
      scenes: s.scenes.map(sc => sc.id === editingSceneId ? { ...sc, widgets: widgets.map(w => ({ ...w })) } : sc),
      historyIndex: { ...s.historyIndex, [editingSceneId]: newIdx },
      selectedIds: [],
    }));
  },

  canUndo: () => (get().historyIndex[get().editingSceneId ?? ''] ?? 0) > 0,
  canRedo: () => {
    const id = get().editingSceneId ?? '';
    return (get().historyIndex[id] ?? 0) < (get().history[id]?.length ?? 1) - 1;
  },

  // ── Canvas & Guides ──────────────────────────────────────────────────────────

  setZoom: (z) => set({ zoom: Math.max(0.1, Math.min(4, z)) }),
  setPan: (p) => set({ pan: p }),
  zoomIn: () => set(s => ({ zoom: Math.min(4, parseFloat((s.zoom + 0.1).toFixed(2))) })),
  zoomOut: () => set(s => ({ zoom: Math.max(0.1, parseFloat((s.zoom - 0.1).toFixed(2))) })),
  resetView: () => set({ zoom: 0.5, pan: { x: 0, y: 0 } }),

  zoomToFit: () => {
    const width = window.innerWidth - 636; // Subtract panels width
    const height = window.innerHeight - 80;
    const scale = Math.min(width / 1920, height / 1080) * 0.95;
    set({ zoom: Math.max(0.1, Math.min(2, scale)), pan: { x: 0, y: 0 } });
  },

  zoomToSelection: () => {
    const selected = get().getSelectedWidgets();
    if (selected.length === 0) return;

    // Calculate bounds of selected elements
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    selected.forEach(w => {
      minX = Math.min(minX, w.x);
      minY = Math.min(minY, w.y);
      maxX = Math.max(maxX, w.x + w.width);
      maxY = Math.max(maxY, w.y + w.height);
    });

    const boundsW = maxX - minX;
    const boundsH = maxY - minY;
    const viewportW = window.innerWidth - 636;
    const viewportH = window.innerHeight - 80;

    const scale = Math.min(viewportW / boundsW, viewportH / boundsH) * 0.8;
    const newZoom = Math.max(0.1, Math.min(4, scale));

    // Center selected area
    const cx = (minX + boundsW / 2) - 960;
    const cy = (minY + boundsH / 2) - 540;

    set({ zoom: newZoom, pan: { x: -cx * newZoom, y: -cy * newZoom } });
  },

  toggleSnap: () => set(s => ({ snapEnabled: !s.snapEnabled })),
  setGridMode: (gridMode) => set({ gridMode }),
  toggleGuides: () => set(s => ({ showGuides: !s.showGuides })),
  toggleRulers: () => set(s => ({ showRulers: !s.showRulers })),

  addUserGuide: (type, val) => set(s => ({
    userGuides: [...s.userGuides, { id: `g-${Date.now()}-${Math.random()}`, type, val }]
  })),

  removeUserGuide: (id) => set(s => ({
    userGuides: s.userGuides.filter(g => g.id !== id)
  })),

  clearUserGuides: () => set({ userGuides: [] }),

  // ── Favorites & Recents ──────────────────────────────────────────────────────

  toggleFavoriteWidget: (type) => set(s => {
    const isFav = s.favoriteWidgets.includes(type);
    return {
      favoriteWidgets: isFav
        ? s.favoriteWidgets.filter(x => x !== type)
        : [...s.favoriteWidgets, type]
    };
  }),

  addRecentWidget: (type) => set(s => {
    const list = s.recentWidgets.filter(x => x !== type);
    list.unshift(type);
    if (list.length > 8) list.pop();
    return { recentWidgets: list };
  }),

  // ── UI ───────────────────────────────────────────────────────────────────────

  setLeftTab: (tab) => set({ leftTab: tab }),
  setIsDragging: (v) => set({ isDragging: v }),
  setIsResizing: (v) => set({ isResizing: v }),
  togglePreviewMode: () => set(s => ({ showPreviewMode: !s.showPreviewMode, selectedIds: [] })),

  // ── Apply Preset ─────────────────────────────────────────────────────────────

  applyPreset: (defs) => {
    const { editingSceneId } = get();
    if (!editingSceneId) return;
    get().pushHistory();
    const widgets: SceneWidget[] = defs.map((def, i) => ({
      ...def,
      id: makeId(),
      rotation: 0,
      opacity: 100,
      scale: 1,
      zIndex: i + 1,
      visible: true,
      locked: false,
      animation: { type: 'none', duration: 1, delay: 0, loop: false },
    }));
    set(s => ({
      scenes: s.scenes.map(sc =>
        sc.id === editingSceneId ? { ...sc, widgets } : sc
      ),
      selectedIds: [],
    }));
  },
}));

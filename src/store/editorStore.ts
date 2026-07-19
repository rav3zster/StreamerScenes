import { create } from 'zustand';
import { STREAM_PACKS } from '../data/streamPacks';
import { persistenceService } from '../persistence/persistenceService';

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

export interface TimerRuntime {
  duration: number;
  startedAt: number | null;
  pausedAt: number | null;
  timeOffset: number;
  isRunning: boolean;
  isFinished: boolean;
  finishBehavior: 'freeze' | 'replace-text' | 'hide' | 'switch-scene';
  replaceText?: string;
  replaceTransition?: 'fade' | 'zoom' | 'slide' | 'none';
  switchTargetSceneId?: string | null;
}

// ─── Store State ──────────────────────────────────────────────────────────────

interface EditorState {
  projectName: string;
  editingSceneId: string | null;
  scenes: Scene[];
  liveSceneId: string | null;
  liveScenes: Scene[];
  liveTimer: TimerRuntime;
  previewTimer: TimerRuntime;
  liveTransitionType: 'none' | 'fade' | 'slide';
  liveTransitionDuration: number;

  // App navigation
  appView: AppView;
  selectedPackId: string | null;   // committed pack (used in project)
  previewPackId: string | null;    // browsing/detail page pack

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
  editorTheme: 'dark' | 'light';
  leftPanelWidth: number;
  rightPanelWidth: number;

  // Auto-save feedback state
  isSaving: boolean;
  lastSavedAt: number | null;

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
  setAppView: (view: AppView) => void;
  setPreviewPackId: (id: string | null) => void;
  setEditorTheme: (theme: 'dark' | 'light') => void;
  setLeftPanelWidth: (w: number) => void;
  setRightPanelWidth: (w: number) => void;

  // Apply preset
  applyPreset: (widgets: Omit<SceneWidget, 'id'>[]) => void;

  // Actions — Timer Runtime
  startLiveTimer: (duration?: number, finishBehavior?: any, settings?: any) => void;
  pauseLiveTimer: () => void;
  resumeLiveTimer: () => void;
  adjustLiveTimer: (seconds: number) => void;
  resetLiveTimer: (duration?: number) => void;
  finishLiveTimer: () => void;

  startPreviewTimer: (duration?: number, finishBehavior?: any, settings?: any) => void;
  pausePreviewTimer: () => void;
  resumePreviewTimer: () => void;
  adjustPreviewTimer: (seconds: number) => void;
  resetPreviewTimer: (duration?: number) => void;
  finishPreviewTimer: () => void;

  switchDraftToLive: () => void;
  setLiveTransitionType: (t: 'none' | 'fade' | 'slide') => void;
  setLiveTransitionDuration: (d: number) => void;

  // Load project data
  loadProjectData: (data: {
    projectName: string;
    scenes: Scene[];
    liveScenes?: Scene[];
    liveSceneId: string | null;
    editingSceneId: string | null;
    liveTimer?: TimerRuntime;
    liveTransitionType?: 'none' | 'fade' | 'slide';
    liveTransitionDuration?: number;
    selectedPackId?: string | null;
  }) => void;

  setSavingStatus: (isSaving: boolean, lastSavedAt?: number | null) => void;
}

export type LeftTab = 'scenes' | 'layers' | 'assets' | 'widgets';
export type AppView = 'welcome' | 'pack-browser' | 'pack-detail' | 'editor';

export const getTimerRemaining = (timer: TimerRuntime): number => {
  if (!timer.isRunning) {
    if (timer.startedAt === null) {
      return Math.max(0, timer.duration + timer.timeOffset);
    }
    if (timer.pausedAt !== null) {
      const elapsed = (timer.pausedAt - timer.startedAt) / 1000;
      return Math.max(0, timer.duration + timer.timeOffset - elapsed);
    }
  }
  
  if (timer.startedAt !== null) {
    const elapsed = (Date.now() - timer.startedAt) / 1000;
    return Math.max(0, timer.duration + timer.timeOffset - elapsed);
  }
  
  return Math.max(0, timer.duration + timer.timeOffset);
};

const MAX_HISTORY = 50;

const makeId = () => `w-${crypto.randomUUID()}`;

// ─── Inspector History Debounce ───────────────────────────────────────────────
// Tracks whether we are mid-"edit session" for inspector changes.
// The session starts on the first updateWidget call (when not dragging/resizing)
// and resets after 600ms of inactivity. History is pushed ONCE at session start,
// capturing the before-state, so Ctrl+Z reverts the full change batch.
let _editSessionActive = false;
let _editSessionTimer: ReturnType<typeof setTimeout> | null = null;

function _beginEditSession(pushFn: () => void, isDragging: boolean, isResizing: boolean) {
  if (isDragging || isResizing) return; // drag-end handles its own history
  if (!_editSessionActive) {
    _editSessionActive = true;
    pushFn(); // capture before-state
  }
  if (_editSessionTimer) clearTimeout(_editSessionTimer);
  _editSessionTimer = setTimeout(() => {
    _editSessionActive = false;
    _editSessionTimer = null;
  }, 600);
}

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
  liveScenes: [],
  liveTimer: {
    duration: 600,
    startedAt: null,
    pausedAt: null,
    timeOffset: 0,
    isRunning: false,
    isFinished: false,
    finishBehavior: 'freeze',
  },
  previewTimer: {
    duration: 600,
    startedAt: null,
    pausedAt: null,
    timeOffset: 0,
    isRunning: false,
    isFinished: false,
    finishBehavior: 'freeze',
  },
  liveTransitionType: 'fade',
  liveTransitionDuration: 500,

  // App navigation
  appView: 'welcome',
  selectedPackId: null,
  previewPackId: null,

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
  editorTheme: 'dark',
  leftPanelWidth: 280,
  rightPanelWidth: 300,

  isSaving: false,
  lastSavedAt: null,

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
  setLiveTransitionType: (t) => set({ liveTransitionType: t }),
  setLiveTransitionDuration: (d) => set({ liveTransitionDuration: d }),

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
      liveScenes: JSON.parse(JSON.stringify(instantiatedScenes)),
      liveSceneId: instantiatedScenes[0]?.id || null,
      editingSceneId: instantiatedScenes[0]?.id || null,
      appView: 'editor',
      selectedPackId: packId,
      previewPackId: null,
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
    const { editingSceneId, isDragging, isResizing } = get();
    if (!editingSceneId) return;
    _beginEditSession(get().pushHistory, isDragging, isResizing);
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

  setZoom: (z) => {
    const nextZoom = Math.max(0.1, Math.min(4, z));
    const { pan, leftPanelWidth, rightPanelWidth } = get();
    const width = window.innerWidth - 56 - leftPanelWidth - rightPanelWidth;
    const height = window.innerHeight - 80;
    const stageW = 1920 * nextZoom;
    const stageH = 1080 * nextZoom;

    const centerOffset = (width - stageW) / 2;
    const minX = -stageW + 150 - centerOffset;
    const maxX = width - 150 - centerOffset;

    const centerOffsetY = (height - stageH) / 2;
    const minY = -stageH + 100 - centerOffsetY;
    const maxY = height - 100 - centerOffsetY;

    set({
      zoom: nextZoom,
      pan: {
        x: Math.max(minX, Math.min(maxX, pan.x)),
        y: Math.max(minY, Math.min(maxY, pan.y))
      }
    });
  },

  setPan: (p) => {
    const { zoom, leftPanelWidth, rightPanelWidth } = get();
    const width = window.innerWidth - 56 - leftPanelWidth - rightPanelWidth;
    const height = window.innerHeight - 80;
    const stageW = 1920 * zoom;
    const stageH = 1080 * zoom;

    const centerOffset = (width - stageW) / 2;
    const minX = -stageW + 150 - centerOffset;
    const maxX = width - 150 - centerOffset;

    const centerOffsetY = (height - stageH) / 2;
    const minY = -stageH + 100 - centerOffsetY;
    const maxY = height - 100 - centerOffsetY;

    set({
      pan: {
        x: Math.max(minX, Math.min(maxX, p.x)),
        y: Math.max(minY, Math.min(maxY, p.y))
      }
    });
  },

  zoomIn: () => get().setZoom(get().zoom + 0.1),
  zoomOut: () => get().setZoom(get().zoom - 0.1),
  resetView: () => {
    const { leftPanelWidth, rightPanelWidth } = get();
    const width = window.innerWidth - 56 - leftPanelWidth - rightPanelWidth;
    const height = window.innerHeight - 80;
    const panX = (width - 1920 * 0.5) / 2;
    const panY = (height - 1080 * 0.5) / 2;
    set({ zoom: 0.5, pan: { x: panX, y: panY } });
  },

  zoomToFit: () => {
    const { leftPanelWidth, rightPanelWidth } = get();
    const width = window.innerWidth - 56 - leftPanelWidth - rightPanelWidth;
    const height = window.innerHeight - 80;
    const scale = Math.min(width / 1920, height / 1080) * 0.95;
    const nextZoom = Math.max(0.1, Math.min(2, scale));
    const panX = (width - 1920 * nextZoom) / 2;
    const panY = (height - 1080 * nextZoom) / 2;
    set({ zoom: nextZoom, pan: { x: panX, y: panY } });
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
    const { leftPanelWidth, rightPanelWidth } = get();
    const viewportW = window.innerWidth - 56 - leftPanelWidth - rightPanelWidth;
    const viewportH = window.innerHeight - 80;

    const scale = Math.min(viewportW / boundsW, viewportH / boundsH) * 0.8;
    const newZoom = Math.max(0.1, Math.min(4, scale));

    const cx = (minX + boundsW / 2) - 960;
    const cy = (minY + boundsH / 2) - 540;

    const centerOffset = (viewportW - 1920 * newZoom) / 2;
    const centerOffsetY = (viewportH - 1080 * newZoom) / 2;

    set({
      zoom: newZoom,
      pan: {
        x: -cx * newZoom + centerOffset,
        y: -cy * newZoom + centerOffsetY
      }
    });
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

  setLeftTab: (tab: LeftTab) => set({ leftTab: tab }),
  setIsDragging: (v: boolean) => set({ isDragging: v }),
  setIsResizing: (v: boolean) => set({ isResizing: v }),
  togglePreviewMode: () => set(s => ({ showPreviewMode: !s.showPreviewMode, selectedIds: [] })),
  setAppView: (view: AppView) => set({ appView: view }),
  setPreviewPackId: (id: string | null) => set({ previewPackId: id }),
  setEditorTheme: (theme: 'dark' | 'light') => set({ editorTheme: theme }),
  setLeftPanelWidth: (w: number) => set({ leftPanelWidth: Math.max(200, Math.min(500, w)) }),
  setRightPanelWidth: (w: number) => set({ rightPanelWidth: Math.max(240, Math.min(500, w)) }),

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

  // Actions — Timer Runtime
  startLiveTimer: (duration, finishBehavior, settings) => set(s => {
    const dur = duration !== undefined ? duration : s.liveTimer.duration;
    return {
      liveTimer: {
        ...s.liveTimer,
        duration: dur,
        startedAt: Date.now(),
        pausedAt: null,
        timeOffset: 0,
        isRunning: true,
        isFinished: false,
        finishBehavior: finishBehavior || s.liveTimer.finishBehavior,
        ...settings
      }
    };
  }),

  pauseLiveTimer: () => set(s => {
    if (!s.liveTimer.isRunning || s.liveTimer.isFinished) return {};
    return {
      liveTimer: {
        ...s.liveTimer,
        isRunning: false,
        pausedAt: Date.now()
      }
    };
  }),

  resumeLiveTimer: () => set(s => {
    if (s.liveTimer.isRunning || s.liveTimer.isFinished || s.liveTimer.startedAt === null) return {};
    const pauseDuration = s.liveTimer.pausedAt ? (Date.now() - s.liveTimer.pausedAt) : 0;
    return {
      liveTimer: {
        ...s.liveTimer,
        isRunning: true,
        startedAt: s.liveTimer.startedAt + pauseDuration,
        pausedAt: null
      }
    };
  }),

  adjustLiveTimer: (seconds) => set(s => {
    return {
      liveTimer: {
        ...s.liveTimer,
        timeOffset: s.liveTimer.timeOffset + seconds
      }
    };
  }),

  resetLiveTimer: (duration) => set(s => {
    const dur = duration !== undefined ? duration : s.liveTimer.duration;
    return {
      liveTimer: {
        ...s.liveTimer,
        duration: dur,
        startedAt: null,
        pausedAt: null,
        timeOffset: 0,
        isRunning: false,
        isFinished: false
      }
    };
  }),

  finishLiveTimer: () => {
    const { liveTimer, liveSceneId } = get();
    if (!liveTimer.isRunning || liveTimer.isFinished) return;
    
    let nextLiveSceneId = liveSceneId;
    if (liveTimer.finishBehavior === 'switch-scene' && liveTimer.switchTargetSceneId) {
      nextLiveSceneId = liveTimer.switchTargetSceneId;
    }

    set({
      liveSceneId: nextLiveSceneId,
      liveTimer: {
        ...liveTimer,
        isRunning: false,
        isFinished: true
      }
    });
  },

  startPreviewTimer: (duration, finishBehavior, settings) => set(s => {
    const dur = duration !== undefined ? duration : s.previewTimer.duration;
    return {
      previewTimer: {
        ...s.previewTimer,
        duration: dur,
        startedAt: Date.now(),
        pausedAt: null,
        timeOffset: 0,
        isRunning: true,
        isFinished: false,
        finishBehavior: finishBehavior || s.previewTimer.finishBehavior,
        ...settings
      }
    };
  }),

  pausePreviewTimer: () => set(s => {
    if (!s.previewTimer.isRunning || s.previewTimer.isFinished) return {};
    return {
      previewTimer: {
        ...s.previewTimer,
        isRunning: false,
        pausedAt: Date.now()
      }
    };
  }),

  resumePreviewTimer: () => set(s => {
    if (s.previewTimer.isRunning || s.previewTimer.isFinished || s.previewTimer.startedAt === null) return {};
    const pauseDuration = s.previewTimer.pausedAt ? (Date.now() - s.previewTimer.pausedAt) : 0;
    return {
      previewTimer: {
        ...s.previewTimer,
        isRunning: true,
        startedAt: s.previewTimer.startedAt + pauseDuration,
        pausedAt: null
      }
    };
  }),

  adjustPreviewTimer: (seconds) => set(s => {
    return {
      previewTimer: {
        ...s.previewTimer,
        timeOffset: s.previewTimer.timeOffset + seconds
      }
    };
  }),

  resetPreviewTimer: (duration) => set(s => {
    const dur = duration !== undefined ? duration : s.previewTimer.duration;
    return {
      previewTimer: {
        ...s.previewTimer,
        duration: dur,
        startedAt: null,
        pausedAt: null,
        timeOffset: 0,
        isRunning: false,
        isFinished: false
      }
    };
  }),

  finishPreviewTimer: () => {
    const { previewTimer, editingSceneId } = get();
    if (!previewTimer.isRunning || previewTimer.isFinished) return;

    let nextEditingSceneId = editingSceneId;
    if (previewTimer.finishBehavior === 'switch-scene' && previewTimer.switchTargetSceneId) {
      nextEditingSceneId = previewTimer.switchTargetSceneId;
    }

    set({
      editingSceneId: nextEditingSceneId,
      previewTimer: {
        ...previewTimer,
        isRunning: false,
        isFinished: true
      }
    });
  },

  switchDraftToLive: () => {
    const { scenes, liveSceneId } = get();
    // Clones draft scenes to liveScenes
    const clonedScenes = JSON.parse(JSON.stringify(scenes));
    
    // Find countdown widget in live scene to sync default duration/behavior
    const activeLiveId = liveSceneId || (clonedScenes[0]?.id ?? null);
    const liveScene = clonedScenes.find((s: Scene) => s.id === activeLiveId);
    let timerSettings = {
      duration: 600,
      finishBehavior: 'freeze' as const,
      replaceText: '',
      replaceTransition: 'none' as const,
      switchTargetSceneId: null,
    };
    if (liveScene) {
      const widget = liveScene.widgets.find((w: SceneWidget) => w.type === 'countdown-timer');
      if (widget) {
        timerSettings = {
          duration: widget.content.settings?.duration ?? 600,
          finishBehavior: widget.content.settings?.finishBehavior ?? 'freeze',
          replaceText: widget.content.settings?.replaceText ?? '',
          replaceTransition: widget.content.settings?.replaceTransition ?? 'none',
          switchTargetSceneId: widget.content.settings?.switchTargetSceneId ?? null,
        };
      }
    }

    set(s => ({
      liveScenes: clonedScenes,
      liveSceneId: s.liveSceneId || activeLiveId,
      liveTimer: {
        ...s.liveTimer,
        ...timerSettings,
      }
    }));
  },

  loadProjectData: (data) => {
    // Find the pack theme class to apply if selectedPackId is present
    const pack = STREAM_PACKS.find(p => p.id === data.selectedPackId);
    if (pack) {
      setTimeout(() => {
        const shell = document.querySelector('.app-shell');
        if (shell) {
          STREAM_PACKS.forEach(p => shell.classList.remove(p.themeClass));
          shell.classList.add(pack.themeClass);
        }
      }, 100);
    }
    set(s => ({
      projectName: data.projectName,
      scenes: data.scenes,
      liveScenes: data.liveScenes || data.scenes,
      liveSceneId: data.liveSceneId,
      editingSceneId: data.editingSceneId,
      liveTimer: data.liveTimer || s.liveTimer,
      liveTransitionType: data.liveTransitionType || s.liveTransitionType,
      liveTransitionDuration: data.liveTransitionDuration || s.liveTransitionDuration,
      selectedPackId: data.selectedPackId || null,
      appView: 'editor',
    }));
  },

  setSavingStatus: (isSaving, lastSavedAt = null) => {
    set({
      isSaving,
      ...(lastSavedAt !== null ? { lastSavedAt } : {}),
    });
  },
}));

const syncChannel = typeof window !== 'undefined' ? new BroadcastChannel('vibeoverlay-state-sync') : null;

// Track last-sent live properties to prevent redundant messages and loops
let lastLiveScenesStr = '';
let lastLiveSceneId = '';
let lastLiveTimerStr = '';
let lastLiveTransitionType = '';
let lastLiveTransitionDuration = 0;

let lastSavedStateStr = '';

useEditorStore.subscribe((state) => {
  const currentProjectRepresent = JSON.stringify({
    projectName: state.projectName,
    scenes: state.scenes,
    liveScenes: state.liveScenes,
    liveSceneId: state.liveSceneId,
    editingSceneId: state.editingSceneId,
    liveTimer: state.liveTimer,
    liveTransitionType: state.liveTransitionType,
    liveTransitionDuration: state.liveTransitionDuration,
    selectedPackId: state.selectedPackId,
  });

  if (currentProjectRepresent !== lastSavedStateStr) {
    lastSavedStateStr = currentProjectRepresent;
    persistenceService.triggerAutoSave(
      () => ({
        projectName: state.projectName,
        scenes: state.scenes,
        liveScenes: state.liveScenes,
        liveSceneId: state.liveSceneId,
        editingSceneId: state.editingSceneId,
        liveTimer: state.liveTimer,
        liveTransitionType: state.liveTransitionType,
        liveTransitionDuration: state.liveTransitionDuration,
        selectedPackId: state.selectedPackId,
        updatedAt: Date.now(),
      }),
      () => useEditorStore.getState().setSavingStatus(true),
      (timestamp) => useEditorStore.getState().setSavingStatus(false, timestamp)
    );
  }

  // Detect change in live-only broadcast state
  const liveScenesStr = JSON.stringify(state.liveScenes);
  const liveTimerStr = JSON.stringify(state.liveTimer);
  const liveSceneId = state.liveSceneId;
  const liveTransType = state.liveTransitionType;
  const liveTransDur = state.liveTransitionDuration;

  if (
    liveScenesStr !== lastLiveScenesStr ||
    liveSceneId !== lastLiveSceneId ||
    liveTimerStr !== lastLiveTimerStr ||
    liveTransType !== lastLiveTransitionType ||
    liveTransDur !== lastLiveTransitionDuration
  ) {
    lastLiveScenesStr = liveScenesStr;
    lastLiveSceneId = liveSceneId || '';
    lastLiveTimerStr = liveTimerStr;
    lastLiveTransitionType = liveTransType;
    lastLiveTransitionDuration = liveTransDur;

    // Send only live-specific parameters to OBS Output page
    syncChannel?.postMessage({
      type: 'LIVE_UPDATE',
      payload: {
        liveScenes: state.liveScenes,
        liveSceneId: state.liveSceneId,
        liveTimer: state.liveTimer,
        liveTransitionType: state.liveTransitionType,
        liveTransitionDuration: state.liveTransitionDuration,
      }
    });
  }
});

if (syncChannel) {
  syncChannel.onmessage = (event) => {
    if (event.data && event.data.type === 'LIVE_UPDATE') {
      const current = useEditorStore.getState();
      const next = event.data.payload;
      
      // Update only when live configurations changed
      if (
        current.liveSceneId !== next.liveSceneId ||
        JSON.stringify(current.liveScenes) !== JSON.stringify(next.liveScenes) ||
        JSON.stringify(current.liveTimer) !== JSON.stringify(next.liveTimer) ||
        current.liveTransitionType !== next.liveTransitionType ||
        current.liveTransitionDuration !== next.liveTransitionDuration
      ) {
        useEditorStore.setState(next);
      }
    }
  };
}

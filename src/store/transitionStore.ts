/**
 * transitionStore.ts
 * Zustand store for the Transition Studio system.
 *
 * Manages three domains:
 *   1. Library — the collection of TransitionScene objects
 *   2. Editor  — state for editing a single TransitionScene
 *   3. Runtime — state for active playback during scene switches
 */

import { create } from 'zustand';
import type { TransitionScene, TransitionKeyframe, KeyframeProp, SceneTransitionAssignment, TransitionPhase } from '../transitions/types';
import type { SceneWidget } from './editorStore';
import { TRANSITION_LIBRARY } from '../transitions/transitionLibrary';
import { transitionRuntime } from '../transitions/transitionRuntime';

// ─── Helpers ─────────────────────────────────────────────────────────────────

const makeId = () => `tr-${crypto.randomUUID()}`;
const now = () => Date.now();

function cloneTransition(t: TransitionScene): TransitionScene {
  return JSON.parse(JSON.stringify(t));
}

// ─── State Interface ─────────────────────────────────────────────────────────

interface TransitionStoreState {
  // ── Library ──────────────────────────────────────────────────────────────────
  /** User-created transitions. Templates from TRANSITION_LIBRARY are stored separately. */
  transitions: TransitionScene[];
  /** Default transition used when no scene-specific assignment exists */
  defaultTransitionId: string | null;
  /** Per-scene transition in/out assignments */
  sceneAssignments: SceneTransitionAssignment[];

  // ── Editor ───────────────────────────────────────────────────────────────────
  /** ID of the transition currently open in Transition Studio */
  editingTransitionId: string | null;
  /** Selected widget IDs in the Transition canvas */
  selectedWidgetIds: string[];
  /** Playhead position in the timeline (ms) */
  playheadMs: number;
  /** Whether the timeline preview is playing */
  isPlaying: boolean;

  // ── Runtime ──────────────────────────────────────────────────────────────────
  /** ID of the transition currently playing */
  activeTransitionId: string | null;
  /** Source scene ID (the one we are leaving) */
  fromSceneId: string | null;
  /** Destination scene ID (the one we are entering) */
  toSceneId: string | null;
  /** Current elapsed ms from the runtime */
  elapsedMs: number;
  /** Current runtime phase */
  phase: TransitionPhase;

  // ── Computed Helpers ─────────────────────────────────────────────────────────
  /** Returns all transitions: library templates + user transitions */
  getAllTransitions: () => TransitionScene[];
  /** Returns the transition currently being edited, or null */
  getEditingTransition: () => TransitionScene | null;
  /** Returns the active (playing) transition, or null */
  getActiveTransition: () => TransitionScene | null;

  // ── Actions: Library ─────────────────────────────────────────────────────────
  createTransition: (name?: string) => string;
  duplicateTransition: (id: string) => string;
  deleteTransition: (id: string) => void;
  updateTransition: (id: string, updates: Partial<TransitionScene>) => void;
  setDefaultTransition: (id: string | null) => void;
  setSceneAssignment: (sceneId: string, updates: Partial<SceneTransitionAssignment>) => void;
  getSceneAssignment: (sceneId: string) => SceneTransitionAssignment;
  resolveTransitionForSwitch: (fromSceneId: string, toSceneId: string) => TransitionScene | null;

  // ── Actions: Editor ───────────────────────────────────────────────────────────
  setEditingTransition: (id: string | null) => void;
  selectWidgets: (ids: string[]) => void;
  selectWidget: (id: string, additive?: boolean) => void;
  deselectAll: () => void;
  addWidget: (w: SceneWidget) => void;
  removeWidget: (id: string) => void;
  updateWidget: (id: string, updates: Partial<SceneWidget>) => void;
  addKeyframe: (kf: TransitionKeyframe) => void;
  removeKeyframe: (widgetId: string, time: number, property: KeyframeProp) => void;
  setSwitchMarker: (ms: number) => void;
  setPlayhead: (ms: number) => void;
  setDuration: (ms: number) => void;
  setName: (name: string) => void;
  setDescription: (desc: string) => void;

  // ── Actions: Runtime ──────────────────────────────────────────────────────────
  startTransition: (transitionId: string, fromSceneId: string, toSceneId: string, onSwitch: () => void) => void;
  setElapsed: (ms: number) => void;
  endTransition: () => void;
  cancelTransition: () => void;
}

// ─── Store ───────────────────────────────────────────────────────────────────

export const useTransitionStore = create<TransitionStoreState>()((set, get) => ({
  // Initial state
  transitions: [],
  defaultTransitionId: null,
  sceneAssignments: [],
  editingTransitionId: null,
  selectedWidgetIds: [],
  playheadMs: 0,
  isPlaying: false,
  activeTransitionId: null,
  fromSceneId: null,
  toSceneId: null,
  elapsedMs: 0,
  phase: 'idle',

  // ── Computed ──────────────────────────────────────────────────────────────────

  getAllTransitions: () => {
    return [...TRANSITION_LIBRARY, ...get().transitions];
  },

  getEditingTransition: () => {
    const { editingTransitionId } = get();
    if (!editingTransitionId) return null;
    return get().getAllTransitions().find(t => t.id === editingTransitionId) ?? null;
  },

  getActiveTransition: () => {
    const { activeTransitionId } = get();
    if (!activeTransitionId) return null;
    return get().getAllTransitions().find(t => t.id === activeTransitionId) ?? null;
  },

  // ── Library Actions ───────────────────────────────────────────────────────────

  createTransition: (name = 'New Transition') => {
    const id = makeId();
    const newTransition: TransitionScene = {
      id,
      name,
      description: '',
      category: 'Custom',
      duration: 800,
      switchMarker: 400,
      widgets: [],
      keyframes: [],
      easing: 'ease-in-out',
      tags: [],
      isTemplate: false,
      createdAt: now(),
      updatedAt: now(),
    };
    set(s => ({ transitions: [...s.transitions, newTransition] }));
    return id;
  },

  duplicateTransition: (id) => {
    const source = get().getAllTransitions().find(t => t.id === id);
    if (!source) return id;
    const newId = makeId();
    const copy: TransitionScene = {
      ...cloneTransition(source),
      id: newId,
      name: `${source.name} (Copy)`,
      isTemplate: false,
      createdAt: now(),
      updatedAt: now(),
    };
    set(s => ({ transitions: [...s.transitions, copy] }));
    return newId;
  },

  deleteTransition: (id) => {
    set(s => ({
      transitions: s.transitions.filter(t => t.id !== id),
      defaultTransitionId: s.defaultTransitionId === id ? null : s.defaultTransitionId,
      editingTransitionId: s.editingTransitionId === id ? null : s.editingTransitionId,
    }));
  },

  updateTransition: (id, updates) => {
    set(s => ({
      transitions: s.transitions.map(t =>
        t.id === id ? { ...t, ...updates, updatedAt: now() } : t
      ),
    }));
  },

  setDefaultTransition: (id) => {
    set({ defaultTransitionId: id });
  },

  setSceneAssignment: (sceneId, updates) => {
    set(s => {
      const existing = s.sceneAssignments.find(a => a.sceneId === sceneId);
      if (existing) {
        return {
          sceneAssignments: s.sceneAssignments.map(a =>
            a.sceneId === sceneId ? { ...a, ...updates } : a
          ),
        };
      }
      return {
        sceneAssignments: [
          ...s.sceneAssignments,
          { sceneId, transitionInId: null, transitionOutId: null, ...updates },
        ],
      };
    });
  },

  getSceneAssignment: (sceneId) => {
    return get().sceneAssignments.find(a => a.sceneId === sceneId) ?? {
      sceneId,
      transitionInId: null,
      transitionOutId: null,
    };
  },

  resolveTransitionForSwitch: (fromSceneId, toSceneId) => {
    const state = get();
    // Check for transition-out on source scene
    const fromAssignment = state.sceneAssignments.find(a => a.sceneId === fromSceneId);
    const outId = fromAssignment?.transitionOutId;
    // Check for transition-in on destination scene
    const toAssignment = state.sceneAssignments.find(a => a.sceneId === toSceneId);
    const inId = toAssignment?.transitionInId;

    // Prefer outId, then inId, then project default
    const resolvedId = outId ?? inId ?? state.defaultTransitionId;
    if (!resolvedId) return null;
    return state.getAllTransitions().find(t => t.id === resolvedId) ?? null;
  },

  // ── Editor Actions ────────────────────────────────────────────────────────────

  setEditingTransition: (id) => {
    set({ editingTransitionId: id, selectedWidgetIds: [], playheadMs: 0, isPlaying: false });
  },

  selectWidgets: (ids) => set({ selectedWidgetIds: ids }),

  selectWidget: (id, additive = false) => {
    set(s => ({
      selectedWidgetIds: additive
        ? s.selectedWidgetIds.includes(id)
          ? s.selectedWidgetIds.filter(x => x !== id)
          : [...s.selectedWidgetIds, id]
        : [id],
    }));
  },

  deselectAll: () => set({ selectedWidgetIds: [] }),

  addWidget: (w) => {
    const { editingTransitionId } = get();
    if (!editingTransitionId) return;
    set(s => ({
      transitions: s.transitions.map(t =>
        t.id === editingTransitionId
          ? { ...t, widgets: [...t.widgets, w], updatedAt: now() }
          : t
      ),
    }));
  },

  removeWidget: (id) => {
    const { editingTransitionId } = get();
    if (!editingTransitionId) return;
    set(s => ({
      transitions: s.transitions.map(t =>
        t.id === editingTransitionId
          ? {
              ...t,
              widgets: t.widgets.filter(w => w.id !== id),
              keyframes: t.keyframes.filter(kf => kf.widgetId !== id),
              updatedAt: now(),
            }
          : t
      ),
      selectedWidgetIds: s.selectedWidgetIds.filter(x => x !== id),
    }));
  },

  updateWidget: (id, updates) => {
    const { editingTransitionId } = get();
    if (!editingTransitionId) return;
    set(s => ({
      transitions: s.transitions.map(t =>
        t.id === editingTransitionId
          ? {
              ...t,
              widgets: t.widgets.map(w => w.id === id ? { ...w, ...updates } : w),
              updatedAt: now(),
            }
          : t
      ),
    }));
  },

  addKeyframe: (kf) => {
    const { editingTransitionId } = get();
    if (!editingTransitionId) return;
    set(s => ({
      transitions: s.transitions.map(t =>
        t.id === editingTransitionId
          ? { ...t, keyframes: [...t.keyframes, kf], updatedAt: now() }
          : t
      ),
    }));
  },

  removeKeyframe: (widgetId, time, property) => {
    const { editingTransitionId } = get();
    if (!editingTransitionId) return;
    set(s => ({
      transitions: s.transitions.map(t =>
        t.id === editingTransitionId
          ? {
              ...t,
              keyframes: t.keyframes.filter(
                kf => !(kf.widgetId === widgetId && kf.time === time && kf.property === property)
              ),
              updatedAt: now(),
            }
          : t
      ),
    }));
  },

  setSwitchMarker: (ms) => {
    const { editingTransitionId } = get();
    if (!editingTransitionId) return;
    set(s => ({
      transitions: s.transitions.map(t =>
        t.id === editingTransitionId
          ? { ...t, switchMarker: Math.max(1, Math.min(ms, t.duration - 1)), updatedAt: now() }
          : t
      ),
    }));
  },

  setPlayhead: (ms) => set({ playheadMs: ms }),

  setDuration: (ms) => {
    const { editingTransitionId } = get();
    if (!editingTransitionId) return;
    const minDuration = 100;
    set(s => ({
      transitions: s.transitions.map(t =>
        t.id === editingTransitionId
          ? {
              ...t,
              duration: Math.max(minDuration, ms),
              switchMarker: Math.min(t.switchMarker, Math.max(minDuration, ms) - 1),
              updatedAt: now(),
            }
          : t
      ),
    }));
  },

  setName: (name) => {
    const { editingTransitionId } = get();
    if (!editingTransitionId) return;
    set(s => ({
      transitions: s.transitions.map(t =>
        t.id === editingTransitionId ? { ...t, name, updatedAt: now() } : t
      ),
    }));
  },

  setDescription: (desc) => {
    const { editingTransitionId } = get();
    if (!editingTransitionId) return;
    set(s => ({
      transitions: s.transitions.map(t =>
        t.id === editingTransitionId ? { ...t, description: desc, updatedAt: now() } : t
      ),
    }));
  },

  // ── Runtime Actions ───────────────────────────────────────────────────────────

  startTransition: (transitionId, fromId, toId, onSwitch) => {
    const transition = get().getAllTransitions().find(t => t.id === transitionId);
    if (!transition) {
      // No transition found — fire switch immediately
      onSwitch();
      return;
    }

    set({
      activeTransitionId: transitionId,
      fromSceneId: fromId,
      toSceneId: toId,
      elapsedMs: 0,
      phase: 'playing',
    });

    transitionRuntime.start(
      transition,
      onSwitch,
      () => get().endTransition(),
      (elapsed) => set({ elapsedMs: elapsed }),
    );
  },

  setElapsed: (ms) => set({ elapsedMs: ms }),

  endTransition: () => {
    set({
      activeTransitionId: null,
      fromSceneId: null,
      toSceneId: null,
      elapsedMs: 0,
      phase: 'idle',
    });
  },

  cancelTransition: () => {
    transitionRuntime.cancel();
    set({
      activeTransitionId: null,
      fromSceneId: null,
      toSceneId: null,
      elapsedMs: 0,
      phase: 'idle',
    });
  },
}));

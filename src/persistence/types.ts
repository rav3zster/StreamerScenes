import type { Scene, TimerRuntime } from '../store/editorStore';
import type { TransitionScene, SceneTransitionAssignment } from '../transitions/types';

export interface ProjectData {
  projectName: string;
  scenes: Scene[];
  liveScenes?: Scene[];
  liveSceneId: string | null;
  editingSceneId: string | null;
  liveTimer?: TimerRuntime;
  liveTransitionType?: 'none' | 'fade' | 'slide';
  liveTransitionDuration?: number;
  selectedPackId?: string | null;
  updatedAt: number;
  // ── V0.7: Transition Studio ───────────────────────────────────────────────────
  transitions?: TransitionScene[];
  defaultTransitionId?: string | null;
  sceneTransitionAssignments?: SceneTransitionAssignment[];
}

export interface StorageBackend {
  /** Saves the project data under a unique key */
  save(key: string, data: string): Promise<void>;
  
  /** Loads the project data for a given key */
  load(key: string): Promise<string | null>;
  
  /** Lists all available project keys/identifiers */
  list(): Promise<string[]>;
  
  /** Deletes the project from storage */
  remove(key: string): Promise<void>;
}

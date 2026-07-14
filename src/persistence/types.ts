import type { Scene } from '../store/editorStore';

export interface ProjectData {
  projectName: string;
  scenes: Scene[];
  liveSceneId: string | null;
  editingSceneId: string | null;
  updatedAt: number;
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

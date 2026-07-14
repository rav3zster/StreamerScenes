import type { ProjectData, StorageBackend } from './types';
import { LocalStorageBackend } from './localStorageBackend';
import { ProjectSerializer } from './projectSerializer';

const AUTO_SAVE_KEY = 'vibeoverlay-current-project';
const AUTO_SAVE_DELAY_MS = 2000;

export class PersistenceService {
  private backend: StorageBackend;
  private autoSaveTimer: ReturnType<typeof setTimeout> | null = null;

  constructor(backend: StorageBackend = new LocalStorageBackend()) {
    this.backend = backend;
  }

  /**
   * Sets a different storage backend (e.g. Tauri native filesystem in the future)
   */
  setBackend(backend: StorageBackend): void {
    this.backend = backend;
  }

  /**
   * Save a project immediately
   */
  async saveProject(data: ProjectData): Promise<void> {
    const serialized = ProjectSerializer.serialize(data);
    await this.backend.save(AUTO_SAVE_KEY, serialized);
  }

  /**
   * Load the saved project
   */
  async loadProject(): Promise<ProjectData | null> {
    const raw = await this.backend.load(AUTO_SAVE_KEY);
    if (!raw) return null;
    return ProjectSerializer.deserialize(raw);
  }

  /**
   * Debounced auto-save. Call this on state modifications.
   */
  triggerAutoSave(data: () => ProjectData): void {
    if (this.autoSaveTimer) {
      clearTimeout(this.autoSaveTimer);
    }
    this.autoSaveTimer = setTimeout(async () => {
      try {
        const payload = data();
        await this.saveProject(payload);
      } catch (err) {
        console.error('Auto-save failed:', err);
      }
    }, AUTO_SAVE_DELAY_MS);
  }

  /**
   * Force save instantly if there is a pending auto-save
   */
  async flush(data: ProjectData): Promise<void> {
    if (this.autoSaveTimer) {
      clearTimeout(this.autoSaveTimer);
      this.autoSaveTimer = null;
    }
    await this.saveProject(data);
  }
}

// Export a singleton instance for global use
export const persistenceService = new PersistenceService();

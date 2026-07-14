import type { StorageBackend } from './types';

export class LocalStorageBackend implements StorageBackend {
  async save(key: string, data: string): Promise<void> {
    localStorage.setItem(key, data);
  }

  async load(key: string): Promise<string | null> {
    return localStorage.getItem(key);
  }

  async list(): Promise<string[]> {
    const keys: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k) keys.push(k);
    }
    return keys;
  }

  async remove(key: string): Promise<void> {
    localStorage.removeItem(key);
  }
}

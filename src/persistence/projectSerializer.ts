import type { ProjectData } from './types';

export class ProjectSerializer {
  static serialize(data: ProjectData): string {
    return JSON.stringify(data, null, 2);
  }

  static deserialize(json: string): ProjectData | null {
    try {
      const parsed = JSON.parse(json);
      if (
        typeof parsed === 'object' &&
        parsed !== null &&
        typeof parsed.projectName === 'string' &&
        Array.isArray(parsed.scenes)
      ) {
        return parsed as ProjectData;
      }
    } catch (e) {
      console.error('Failed to deserialize project data:', e);
    }
    return null;
  }
}

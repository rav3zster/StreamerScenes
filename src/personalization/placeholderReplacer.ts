import type { Scene } from '../store/editorStore';
import type { StreamerProfile } from '../store/wizardStore';

const TEXT_LIKE_TYPES = ['text', 'animated-text', 'typing-text', 'now-playing-text', 'header', 'footer'];

export function applyStreamerProfile(scenes: Scene[], profile: StreamerProfile): Scene[] {
  return scenes.map(scene => ({
    ...scene,
    widgets: scene.widgets.map(widget => {
      let updated = { ...widget };
      const settings = { ...(updated.content.settings || {}) };

      // 1. Replace placeholders in text content
      if (TEXT_LIKE_TYPES.includes(widget.type) && settings.text) {
        settings.text = replacePlaceholders(settings.text as string, profile);
      }

      // 2. Replace in titleText for header/footer
      if (settings.titleText) {
        settings.titleText = replacePlaceholders(settings.titleText as string, profile);
      }

      // 3. Logo widget - set src from profile
      if (widget.type === 'logo' && profile.logoUrl) {
        if (!settings.src || settings.src === '' || settings.src === '/placeholder-logo.svg') {
          settings.src = profile.logoUrl;
        }
      }

      // 4. Avatar widget - set src from profile
      if (widget.type === 'avatar-frame' && profile.avatarUrl) {
        if (!settings.src || settings.src === '' || settings.src === '/placeholder-avatar.svg') {
          settings.src = profile.avatarUrl;
        }
      }

      // 5. Social links - replace handles
      if (widget.type === 'social-links' && profile.socialHandles.length > 0) {
        const hasHandles = profile.socialHandles.some(h => h.handle);
        if (hasHandles) {
          settings.links = profile.socialHandles
            .filter(h => h.handle)
            .map(h => ({ platform: h.platform, handle: h.handle }));
        }
      }

      // 6. Camera frame label
      if (widget.type === 'camera-frame' && profile.cameraFrameStyle) {
        settings.frameLabel = profile.cameraFrameStyle.toUpperCase() + ' CAMERA';
      }

      // 7. Countdown duration
      if (widget.type === 'countdown-timer' && profile.countdownDuration > 0) {
        const currentDur = settings.duration as number || 600;
        if (currentDur === 600 || currentDur === 300) {
          settings.duration = profile.countdownDuration;
        }
      }

      updated.content = { ...updated.content, settings };
      return updated;
    }),
  }));
}

function replacePlaceholders(text: string, profile: StreamerProfile): string {
  let result = text;

  // Streamer name patterns
  if (profile.streamerName) {
    result = result.replace(/\{STREAMER_NAME\}/gi, profile.streamerName);
    result = result.replace(/\{STREAMER\}/gi, profile.streamerName);
    // Replace standalone "STREAMER" word (but not inside other words)
    result = result.replace(/\bSTREAMER\b/g, profile.streamerName);
  }

  // Channel name patterns
  if (profile.channelName) {
    result = result.replace(/\{CHANNEL_NAME\}/gi, profile.channelName);
    result = result.replace(/\bCHANNEL_NAME\b/g, profile.channelName);
  }

  return result;
}

// Widget catalog for the Add Element panel

import type { WidgetType, WidgetStyle } from '../store/editorStore';

export interface WidgetDef {
  type: WidgetType;
  label: string;
  icon: string;
  previewBg: string;
  previewColor: string;
  defaultWidth: number;
  defaultHeight: number;
  defaultStyle?: Partial<WidgetStyle>;
}

export const WIDGET_CATEGORIES: Record<string, WidgetDef[]> = {
  Layout: [
    { type: 'background', label: 'Background', icon: '🎨', previewBg: 'linear-gradient(135deg,#0e0b1e,#1a1538)', previewColor: '#a855f7', defaultWidth: 1920, defaultHeight: 1080, defaultStyle: { background: 'linear-gradient(135deg,#0e0b1e,#1a1538)', borderSize: 0 } },
    { type: 'header', label: 'Header Bar', icon: '▬', previewBg: '#0e0b1e', previewColor: '#a855f7', defaultWidth: 1920, defaultHeight: 70, defaultStyle: { background: 'rgba(14,8,26,0.95)', borderSize: 0, padding: 16 } },
    { type: 'footer', label: 'Footer Bar', icon: '▬', previewBg: '#0e0b1e', previewColor: '#5cffe2', defaultWidth: 1920, defaultHeight: 56, defaultStyle: { background: 'rgba(14,8,26,0.95)', borderSize: 0, padding: 12 } },
    { type: 'sidebar', label: 'Sidebar', icon: '▏', previewBg: '#0e0b1e', previewColor: '#a855f7', defaultWidth: 320, defaultHeight: 1080, defaultStyle: { background: 'rgba(14,8,26,0.85)', borderSize: 0, padding: 16 } },
    { type: 'container', label: 'Container', icon: '□', previewBg: 'rgba(168,85,247,0.08)', previewColor: '#a855f7', defaultWidth: 400, defaultHeight: 300, defaultStyle: { background: 'rgba(14,8,26,0.5)', borderSize: 1, borderStyle: 'solid', borderColor: 'rgba(168,85,247,0.3)', borderRadius: 12 } },
    { type: 'glass-panel', label: 'Glass Panel', icon: '🪟', previewBg: 'rgba(255,255,255,0.05)', previewColor: '#fff', defaultWidth: 400, defaultHeight: 280, defaultStyle: { background: 'rgba(255,255,255,0.05)', borderSize: 1, borderStyle: 'solid', borderColor: 'rgba(255,255,255,0.12)', borderRadius: 16, glassEffect: true } },
    { type: 'divider', label: 'Divider', icon: '─', previewBg: 'rgba(168,85,247,0.2)', previewColor: '#a855f7', defaultWidth: 400, defaultHeight: 2, defaultStyle: { background: 'rgba(168,85,247,0.5)', borderSize: 0 } },
    { type: 'spacer', label: 'Spacer', icon: '⬜', previewBg: 'transparent', previewColor: '#555', defaultWidth: 100, defaultHeight: 100, defaultStyle: { background: 'transparent', borderSize: 0 } },
  ],
  Text: [
    { type: 'text', label: 'Text', icon: 'T', previewBg: 'transparent', previewColor: '#fff', defaultWidth: 300, defaultHeight: 60, defaultStyle: { background: 'transparent', borderSize: 0, fontSize: 28, fontColor: '#ffffff', textAlign: 'center' } },
    { type: 'animated-text', label: 'Animated Text', icon: '✨', previewBg: 'transparent', previewColor: '#a855f7', defaultWidth: 400, defaultHeight: 80, defaultStyle: { background: 'transparent', borderSize: 0, fontSize: 36, fontColor: '#a855f7', textAlign: 'center' } },
    { type: 'scrolling-text', label: 'Ticker', icon: '📜', previewBg: 'rgba(14,8,26,0.8)', previewColor: '#5cffe2', defaultWidth: 1920, defaultHeight: 48, defaultStyle: { background: 'rgba(14,8,26,0.8)', borderSize: 0, fontSize: 18, fontColor: '#5cffe2', padding: 12 } },
    { type: 'typing-text', label: 'Typing Text', icon: '⌨️', previewBg: 'transparent', previewColor: '#fff', defaultWidth: 400, defaultHeight: 60, defaultStyle: { background: 'transparent', borderSize: 0, fontSize: 28, fontColor: '#ffffff', textAlign: 'center' } },
    { type: 'countdown-timer', label: 'Countdown', icon: '⏱', previewBg: 'rgba(14,8,26,0.9)', previewColor: '#5cffe2', defaultWidth: 500, defaultHeight: 140, defaultStyle: { background: 'transparent', borderSize: 0, fontSize: 72, fontColor: '#5cffe2', textAlign: 'center' } },
    { type: 'clock', label: 'Clock', icon: '🕐', previewBg: 'transparent', previewColor: '#fff', defaultWidth: 200, defaultHeight: 60, defaultStyle: { background: 'transparent', borderSize: 0, fontSize: 32, fontColor: '#ffffff', textAlign: 'center' } },
    { type: 'viewer-count', label: 'Viewers', icon: '👁', previewBg: 'rgba(168,85,247,0.1)', previewColor: '#a855f7', defaultWidth: 160, defaultHeight: 60, defaultStyle: { background: 'rgba(14,8,26,0.7)', borderRadius: 8, padding: 12, borderSize: 1, borderStyle: 'solid', borderColor: 'rgba(168,85,247,0.3)' } },
    { type: 'latest-follower', label: 'Last Follower', icon: '❤️', previewBg: 'rgba(168,85,247,0.1)', previewColor: '#ec4899', defaultWidth: 300, defaultHeight: 56, defaultStyle: { background: 'rgba(14,8,26,0.7)', borderRadius: 8, padding: 12, borderSize: 1, borderStyle: 'solid', borderColor: 'rgba(168,85,247,0.3)' } },
    { type: 'latest-subscriber', label: 'Last Sub', icon: '⭐', previewBg: 'rgba(168,85,247,0.1)', previewColor: '#f59e0b', defaultWidth: 300, defaultHeight: 56, defaultStyle: { background: 'rgba(14,8,26,0.7)', borderRadius: 8, padding: 12, borderSize: 1, borderStyle: 'solid', borderColor: 'rgba(168,85,247,0.3)' } },
    { type: 'goal-counter', label: 'Goal Bar', icon: '🎯', previewBg: 'rgba(16,185,129,0.1)', previewColor: '#10b981', defaultWidth: 300, defaultHeight: 80, defaultStyle: { background: 'rgba(14,8,26,0.7)', borderRadius: 8, padding: 12, borderSize: 1, borderStyle: 'solid', borderColor: 'rgba(16,185,129,0.3)' } },
    { type: 'social-links', label: 'Social Links', icon: '🔗', previewBg: 'transparent', previewColor: '#a855f7', defaultWidth: 280, defaultHeight: 48, defaultStyle: { background: 'transparent', borderSize: 0 } },
    { type: 'now-playing-text', label: 'Now Playing', icon: '🎵', previewBg: 'rgba(14,8,26,0.7)', previewColor: '#a855f7', defaultWidth: 350, defaultHeight: 60, defaultStyle: { background: 'rgba(14,8,26,0.7)', borderRadius: 8, padding: 12, borderSize: 1, borderStyle: 'solid', borderColor: 'rgba(168,85,247,0.3)' } },
  ],
  Media: [
    { type: 'image', label: 'Image', icon: '🖼', previewBg: 'rgba(168,85,247,0.08)', previewColor: '#a855f7', defaultWidth: 300, defaultHeight: 200, defaultStyle: { borderRadius: 8, background: 'rgba(168,85,247,0.08)', borderSize: 1, borderStyle: 'dashed', borderColor: 'rgba(168,85,247,0.3)' } },
    { type: 'gif', label: 'GIF', icon: '🎞', previewBg: 'rgba(92,255,226,0.08)', previewColor: '#5cffe2', defaultWidth: 300, defaultHeight: 200, defaultStyle: { borderRadius: 8, background: 'rgba(92,255,226,0.08)', borderSize: 1, borderStyle: 'dashed', borderColor: 'rgba(92,255,226,0.3)' } },
    { type: 'video', label: 'Video', icon: '📹', previewBg: '#000', previewColor: '#a855f7', defaultWidth: 480, defaultHeight: 270, defaultStyle: { borderRadius: 8, background: '#000' } },
    { type: 'lottie', label: 'Lottie', icon: '🌀', previewBg: 'transparent', previewColor: '#a855f7', defaultWidth: 200, defaultHeight: 200, defaultStyle: { background: 'transparent', borderSize: 0 } },
    { type: 'svg', label: 'SVG', icon: '▲', previewBg: 'transparent', previewColor: '#5cffe2', defaultWidth: 200, defaultHeight: 200, defaultStyle: { background: 'transparent', borderSize: 0 } },
    { type: 'logo', label: 'Logo', icon: '⚡', previewBg: 'transparent', previewColor: '#a855f7', defaultWidth: 160, defaultHeight: 80, defaultStyle: { background: 'transparent', borderSize: 0 } },
    { type: 'avatar-frame', label: 'Avatar', icon: '🧑', previewBg: 'rgba(168,85,247,0.1)', previewColor: '#a855f7', defaultWidth: 160, defaultHeight: 160, defaultStyle: { borderRadius: 80, borderSize: 3, borderStyle: 'solid', borderColor: '#a855f7', glowColor: '#a855f7', glowBlur: 16 } },
    { type: 'camera-frame', label: 'Cam Frame', icon: '📷', previewBg: 'rgba(168,85,247,0.05)', previewColor: '#a855f7', defaultWidth: 640, defaultHeight: 360, defaultStyle: { borderRadius: 8, borderSize: 2, borderStyle: 'solid', borderColor: '#a855f7', glowColor: '#ff4dff', glowBlur: 12 } },
    { type: 'game-capture', label: 'Game Capture', icon: '🎮', previewBg: '#000', previewColor: '#a855f7', defaultWidth: 800, defaultHeight: 450, defaultStyle: { borderRadius: 8, background: '#000', borderSize: 1, borderStyle: 'solid', borderColor: 'rgba(168,85,247,0.3)' } },
    { type: 'vtuber', label: 'VTuber Layer', icon: '🎭', previewBg: 'transparent', previewColor: '#a855f7', defaultWidth: 400, defaultHeight: 600, defaultStyle: { background: 'transparent', borderSize: 0 } },
  ],
  Stream: [
    { type: 'chat-box', label: 'Chat Box', icon: '💬', previewBg: 'rgba(14,8,26,0.9)', previewColor: '#a855f7', defaultWidth: 340, defaultHeight: 600, defaultStyle: { background: 'rgba(14,8,26,0.85)', borderRadius: 12, padding: 12, borderSize: 1, borderStyle: 'solid', borderColor: 'rgba(168,85,247,0.3)' } },
    { type: 'alerts', label: 'Alert Box', icon: '🔔', previewBg: 'transparent', previewColor: '#f59e0b', defaultWidth: 600, defaultHeight: 200, defaultStyle: { background: 'transparent', borderSize: 0 } },
    { type: 'donation-feed', label: 'Donation Feed', icon: '💸', previewBg: 'rgba(14,8,26,0.9)', previewColor: '#10b981', defaultWidth: 340, defaultHeight: 400, defaultStyle: { background: 'rgba(14,8,26,0.85)', borderRadius: 12, padding: 12, borderSize: 1, borderStyle: 'solid', borderColor: 'rgba(16,185,129,0.3)' } },
    { type: 'event-list', label: 'Event List', icon: '📋', previewBg: 'rgba(14,8,26,0.9)', previewColor: '#a855f7', defaultWidth: 340, defaultHeight: 400, defaultStyle: { background: 'rgba(14,8,26,0.85)', borderRadius: 12, padding: 12, borderSize: 1, borderStyle: 'solid', borderColor: 'rgba(168,85,247,0.3)' } },
    { type: 'spotify', label: 'Spotify / Music', icon: '🎵', previewBg: 'rgba(30,215,96,0.08)', previewColor: '#1ed760', defaultWidth: 360, defaultHeight: 90, defaultStyle: { background: 'rgba(0,0,0,0.5)', borderRadius: 45, padding: 16, borderSize: 1, borderStyle: 'solid', borderColor: 'rgba(30,215,96,0.3)' } },
    { type: 'poll', label: 'Poll', icon: '📊', previewBg: 'rgba(59,130,246,0.1)', previewColor: '#3b82f6', defaultWidth: 320, defaultHeight: 200, defaultStyle: { background: 'rgba(14,8,26,0.85)', borderRadius: 12, padding: 14, borderSize: 1, borderStyle: 'solid', borderColor: 'rgba(59,130,246,0.3)' } },
  ],
  Shapes: [
    { type: 'shape', label: 'Rectangle', icon: '⬛', previewBg: 'rgba(168,85,247,0.3)', previewColor: '#a855f7', defaultWidth: 200, defaultHeight: 200, defaultStyle: { background: 'rgba(168,85,247,0.3)', borderRadius: 0, borderSize: 0 } },
    { type: 'neon-card', label: 'Neon Card', icon: '💠', previewBg: 'rgba(14,8,26,0.8)', previewColor: '#ff4dff', defaultWidth: 320, defaultHeight: 180, defaultStyle: { background: 'rgba(14,8,26,0.8)', borderRadius: 12, borderSize: 1, borderStyle: 'solid', borderColor: '#ff4dff', glowColor: '#ff4dff', glowBlur: 24 } },
    { type: 'glass-card', label: 'Glass Card', icon: '🪟', previewBg: 'rgba(255,255,255,0.04)', previewColor: '#fff', defaultWidth: 320, defaultHeight: 180, defaultStyle: { background: 'rgba(255,255,255,0.04)', borderRadius: 16, borderSize: 1, borderStyle: 'solid', borderColor: 'rgba(255,255,255,0.12)', glassEffect: true } },
    { type: 'glow-effect', label: 'Glow', icon: '💫', previewBg: 'radial-gradient(circle,rgba(168,85,247,0.5) 0%,transparent 70%)', previewColor: '#a855f7', defaultWidth: 300, defaultHeight: 300, defaultStyle: { background: 'radial-gradient(circle,rgba(168,85,247,0.4) 0%,transparent 70%)', borderSize: 0 } },
    { type: 'particles', label: 'Particles', icon: '✦', previewBg: 'rgba(14,8,26,0.6)', previewColor: '#5cffe2', defaultWidth: 600, defaultHeight: 400, defaultStyle: { background: 'transparent', borderSize: 0 } },
    { type: 'line', label: 'Line', icon: '─', previewBg: 'rgba(168,85,247,0.5)', previewColor: '#a855f7', defaultWidth: 400, defaultHeight: 2, defaultStyle: { background: 'rgba(168,85,247,0.5)', borderSize: 0, glowColor: '#a855f7', glowBlur: 8 } },
    { type: 'badge', label: 'Badge', icon: '🏅', previewBg: 'rgba(168,85,247,0.15)', previewColor: '#a855f7', defaultWidth: 140, defaultHeight: 40, defaultStyle: { background: 'rgba(168,85,247,0.15)', borderRadius: 99, borderSize: 1, borderStyle: 'solid', borderColor: 'rgba(168,85,247,0.5)', fontSize: 13, fontColor: '#a855f7', textAlign: 'center', padding: 8 } },
    { type: 'corner-decoration', label: 'Corner Deco', icon: '◤', previewBg: 'transparent', previewColor: '#5cffe2', defaultWidth: 120, defaultHeight: 120, defaultStyle: { background: 'transparent', borderSize: 0 } },
  ],
};

import type { WidgetType, WidgetStyle } from '../store/editorStore';

export interface WidgetTemplate {
  id: string;
  type: WidgetType;
  label: string;
  templateName: string;
  category: string;
  icon: string;
  defaultWidth: number;
  defaultHeight: number;
  style: Partial<WidgetStyle>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  settings: Record<string, any>;
}

export const WIDGET_TEMPLATES: WidgetTemplate[] = [
  // ─── Timers ──────────────────────────────────────────────────────────────────
  {
    id: 'tpl-luxury-timer',
    type: 'countdown-timer',
    label: 'Luxury Timer',
    templateName: 'Luxury Timer',
    category: 'Timer',
    icon: '⏳',
    defaultWidth: 400,
    defaultHeight: 120,
    style: {
      background: '#0e0d0b',
      borderSize: 2,
      borderStyle: 'solid',
      borderColor: '#c9a227',
      borderRadius: 2,
      fontFamily: 'Outfit, Georgia, serif',
      fontSize: 48,
      fontColor: '#c9a227',
      glowColor: '#c9a227',
      glowBlur: 6,
      textAlign: 'center',
    },
    settings: { duration: 600, label: 'COUNTDOWN' },
  },
  {
    id: 'tpl-cyber-timer',
    type: 'countdown-timer',
    label: 'Cyber Timer',
    templateName: 'Cyber Timer',
    category: 'Timer',
    icon: '⚡',
    defaultWidth: 420,
    defaultHeight: 130,
    style: {
      background: 'rgba(20,16,44,0.85)',
      borderSize: 1,
      borderStyle: 'solid',
      borderColor: '#ff4dff',
      borderRadius: 4,
      fontFamily: 'JetBrains Mono, monospace',
      fontSize: 54,
      fontColor: '#5cffe2',
      glowColor: '#5cffe2',
      glowBlur: 16,
      textAlign: 'center',
    },
    settings: { duration: 600 },
  },
  {
    id: 'tpl-minimal-timer',
    type: 'countdown-timer',
    label: 'Minimal Timer',
    templateName: 'Minimal Timer',
    category: 'Timer',
    icon: '⏱',
    defaultWidth: 320,
    defaultHeight: 80,
    style: {
      background: 'transparent',
      borderSize: 0,
      fontFamily: 'Inter, sans-serif',
      fontSize: 42,
      fontColor: '#ffffff',
      textAlign: 'center',
    },
    settings: { duration: 600 },
  },
  {
    id: 'tpl-glass-timer',
    type: 'countdown-timer',
    label: 'Glass Timer',
    templateName: 'Glass Timer',
    category: 'Timer',
    icon: '💎',
    defaultWidth: 400,
    defaultHeight: 120,
    style: {
      background: 'rgba(255,255,255,0.04)',
      borderSize: 1,
      borderStyle: 'solid',
      borderColor: 'rgba(255,255,255,0.15)',
      borderRadius: 16,
      glassEffect: true,
      blur: 16,
      fontFamily: 'Space Grotesk, sans-serif',
      fontSize: 48,
      fontColor: '#ffffff',
      textAlign: 'center',
    },
    settings: { duration: 600 },
  },

  // ─── Chat Boxes ─────────────────────────────────────────────────────────────
  {
    id: 'tpl-glass-chat',
    type: 'chat-box',
    label: 'Glass Chat',
    templateName: 'Glass Chat',
    category: 'Chat Box',
    icon: '💬',
    defaultWidth: 360,
    defaultHeight: 500,
    style: {
      background: 'rgba(255, 255, 255, 0.03)',
      borderRadius: 16,
      borderSize: 1,
      borderColor: 'rgba(255,255,255,0.1)',
      glassEffect: true,
      blur: 12,
      padding: 16,
    },
    settings: { maxMessages: 15 },
  },
  {
    id: 'tpl-minimal-chat',
    type: 'chat-box',
    label: 'Minimal Chat',
    templateName: 'Minimal Chat',
    category: 'Chat Box',
    icon: '📝',
    defaultWidth: 320,
    defaultHeight: 450,
    style: {
      background: 'transparent',
      borderSize: 0,
      padding: 12,
    },
    settings: { maxMessages: 12 },
  },
  {
    id: 'tpl-cyber-chat',
    type: 'chat-box',
    label: 'Neon Synth Chat',
    templateName: 'Neon Chat',
    category: 'Chat Box',
    icon: '⚡',
    defaultWidth: 380,
    defaultHeight: 550,
    style: {
      background: 'rgba(14,8,26,0.92)',
      borderRadius: 4,
      borderSize: 1,
      borderColor: '#ff4dff',
      glowColor: '#ff4dff',
      glowBlur: 10,
      padding: 14,
    },
    settings: { maxMessages: 18 },
  },

  // ─── Followers ─────────────────────────────────────────────────────────────
  {
    id: 'tpl-cyber-follower',
    type: 'latest-follower',
    label: 'Cyber Follower',
    templateName: 'Cyber Follower',
    category: 'Telemetry',
    icon: '👾',
    defaultWidth: 300,
    defaultHeight: 60,
    style: {
      background: 'rgba(14,8,26,0.85)',
      borderRadius: 0,
      borderSize: 1,
      borderColor: '#5cffe2',
      fontFamily: 'JetBrains Mono',
      fontColor: '#5cffe2',
      fontSize: 16,
    },
    settings: { label: '// LAST FOLLOWER //' },
  },
  {
    id: 'tpl-luxury-follower',
    type: 'latest-follower',
    label: 'Gold Follower',
    templateName: 'Gold Follower',
    category: 'Telemetry',
    icon: '👑',
    defaultWidth: 300,
    defaultHeight: 64,
    style: {
      background: '#0f0f0e',
      borderSize: 1,
      borderColor: '#c9a227',
      borderRadius: 2,
      fontFamily: 'Outfit',
      fontColor: '#c9a227',
    },
    settings: { label: 'Latest Subscriber' },
  },
];

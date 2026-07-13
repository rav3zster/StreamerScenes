// Preset definitions — complete widget layouts ready to apply to a scene

import type { SceneWidget } from '../store/editorStore';

export type PresetDef = {
  id: string;
  name: string;
  category: string;
  accentColor: string;
  bgColors: [string, string];
  desc: string;
  widgets: Omit<SceneWidget, 'id' | 'rotation' | 'opacity' | 'scale' | 'visible' | 'locked' | 'animation'>[];
};

export const PRESET_CATEGORIES = [
  'All', 'Starting Soon', 'BRB', 'Just Chatting', 'Ending',
  'Gaming', 'Esports', 'Podcast', 'Luxury', 'Minimal',
  'Anime', 'Cyberpunk', 'Lo-fi',
];

export const PRESETS: PresetDef[] = [
  // ── Starting Soon ──────────────────────────────────────────────────────────
  {
    id: 'cyber-starting',
    name: 'Cyber Synth',
    category: 'Starting Soon',
    accentColor: '#5cffe2',
    bgColors: ['#07050f', '#1a0535'],
    desc: 'Neon countdown with glowing timer and scrolling ticker',
    widgets: [
      {
        type: 'background', label: 'BG', zIndex: 0, x: 0, y: 0, width: 1920, height: 1080,
        style: { background: 'linear-gradient(135deg,#07050f 0%,#140526 100%)', borderSize: 0 },
        content: { type: 'background', settings: {} },
      },
      {
        type: 'glass-panel', label: 'Center Glass', zIndex: 1, x: 460, y: 240, width: 1000, height: 600,
        style: { background: 'rgba(20,5,38,0.75)', borderRadius: 24, borderSize: 2, borderColor: '#ff4dff', glowColor: '#ff4dff', glowBlur: 24, glassEffect: true },
        content: { type: 'glass-panel', settings: {} },
      },
      {
        type: 'text', label: 'Title', zIndex: 2, x: 510, y: 280, width: 900, height: 60,
        style: { background: 'transparent', borderSize: 0, fontSize: 20, fontColor: '#ff4dff', fontWeight: '800', letterSpacing: 6, textAlign: 'center', textTransform: 'uppercase' },
        content: { type: 'text', settings: { text: 'STREAM STARTING SOON' } },
      },
      {
        type: 'countdown-timer', label: 'Countdown', zIndex: 2, x: 560, y: 360, width: 800, height: 180,
        style: { background: 'transparent', borderSize: 0, fontSize: 96, fontColor: '#5cffe2', glowColor: '#5cffe2', glowBlur: 20, fontWeight: '700', textAlign: 'center', fontFamily: 'JetBrains Mono' },
        content: { type: 'countdown-timer', settings: { duration: 600, label: 'STARTING IN' } },
      },
      {
        type: 'clock', label: 'Clock', zIndex: 3, x: 1620, y: 30, width: 270, height: 56,
        style: { background: 'rgba(14,8,26,0.8)', borderRadius: 12, borderSize: 1, borderColor: '#5cffe2', fontSize: 20, fontColor: '#fff', padding: 12, textAlign: 'center' },
        content: { type: 'clock', settings: {} },
      },
      {
        type: 'scrolling-text', label: 'Ticker', zIndex: 4, x: 0, y: 1024, width: 1920, height: 56,
        style: { background: 'rgba(7,5,15,0.97)', borderSize: 0, fontSize: 16, fontColor: '#5cffe2', padding: 16 },
        content: { type: 'scrolling-text', settings: { text: '⚡ WELCOME TO THE STREAM • FOLLOW TO GET NOTIFIED • CHAT RULES: BE NICE, NO SPAM • NOW PLAYING: CHILL SYNTHWAVE ⚡' } },
      },
    ],
  },
  {
    id: 'lofi-starting',
    name: 'Lo-fi Cozy',
    category: 'Starting Soon',
    accentColor: '#f9a8d4',
    bgColors: ['#1b0e1a', '#2f1934'],
    desc: 'Warm pink tones, soft bokeh, cozy countdown',
    widgets: [
      {
        type: 'background', label: 'BG', zIndex: 0, x: 0, y: 0, width: 1920, height: 1080,
        style: { background: 'linear-gradient(135deg,#1b0e1a,#2f1934)', borderSize: 0 },
        content: { type: 'background', settings: {} },
      },
      {
        type: 'glass-panel', label: 'Card', zIndex: 1, x: 610, y: 290, width: 700, height: 500,
        style: { background: 'rgba(45,20,42,0.7)', borderRadius: 32, borderSize: 1, borderColor: 'rgba(249,168,212,0.3)', glassEffect: true },
        content: { type: 'glass-panel', settings: {} },
      },
      {
        type: 'text', label: 'Subtitle', zIndex: 2, x: 660, y: 330, width: 600, height: 50,
        style: { background: 'transparent', borderSize: 0, fontSize: 14, fontColor: 'rgba(249,168,212,0.6)', textAlign: 'center', letterSpacing: 4, textTransform: 'uppercase' },
        content: { type: 'text', settings: { text: 'hang tight, starting soon' } },
      },
      {
        type: 'countdown-timer', label: 'Timer', zIndex: 2, x: 660, y: 390, width: 600, height: 160,
        style: { background: 'transparent', borderSize: 0, fontSize: 80, fontColor: '#f9a8d4', fontWeight: '300', textAlign: 'center', fontFamily: 'Inter' },
        content: { type: 'countdown-timer', settings: { duration: 600 } },
      },
      {
        type: 'spotify', label: 'Music', zIndex: 3, x: 730, y: 600, width: 460, height: 80,
        style: { background: 'rgba(255,255,255,0.05)', borderRadius: 40, padding: 16, borderSize: 1, borderColor: 'rgba(249,168,212,0.2)' },
        content: { type: 'spotify', settings: {} },
      },
      {
        type: 'social-links', label: 'Socials', zIndex: 4, x: 760, y: 730, width: 400, height: 40,
        style: { background: 'transparent', borderSize: 0 },
        content: { type: 'social-links', settings: {} },
      },
    ],
  },
  // ── BRB ────────────────────────────────────────────────────────────────────
  {
    id: 'minimal-brb',
    name: 'Minimal BRB',
    category: 'BRB',
    accentColor: '#a855f7',
    bgColors: ['#09090b', '#121214'],
    desc: 'Clean dark screen with animated text',
    widgets: [
      {
        type: 'background', label: 'BG', zIndex: 0, x: 0, y: 0, width: 1920, height: 1080,
        style: { background: '#09090b', borderSize: 0 },
        content: { type: 'background', settings: {} },
      },
      {
        type: 'text', label: 'BRB Text', zIndex: 1, x: 510, y: 430, width: 900, height: 120,
        style: { background: 'transparent', borderSize: 0, fontSize: 80, fontColor: '#fff', fontWeight: '800', textAlign: 'center', letterSpacing: 12, textTransform: 'uppercase' },
        content: { type: 'text', settings: { text: 'BRB' } },
      },
      {
        type: 'text', label: 'Subtitle', zIndex: 1, x: 610, y: 560, width: 700, height: 50,
        style: { background: 'transparent', borderSize: 0, fontSize: 16, fontColor: 'rgba(255,255,255,0.35)', textAlign: 'center', letterSpacing: 3, textTransform: 'uppercase' },
        content: { type: 'text', settings: { text: 'be right back' } },
      },
    ],
  },
  {
    id: 'neon-brb',
    name: 'Neon Glow BRB',
    category: 'BRB',
    accentColor: '#ff4dff',
    bgColors: ['#07050f', '#14102c'],
    desc: 'Bold neon glow with pulsing text',
    widgets: [
      {
        type: 'background', label: 'BG', zIndex: 0, x: 0, y: 0, width: 1920, height: 1080,
        style: { background: 'radial-gradient(ellipse at center, #14102c 0%, #07050f 70%)', borderSize: 0 },
        content: { type: 'background', settings: {} },
      },
      {
        type: 'text', label: 'BRB', zIndex: 1, x: 260, y: 340, width: 1400, height: 240,
        style: { background: 'transparent', borderSize: 0, fontSize: 200, fontColor: '#ff4dff', fontWeight: '900', textAlign: 'center', glowColor: '#ff4dff', glowBlur: 40 },
        content: { type: 'text', settings: { text: 'BRB' } },
      },
      {
        type: 'text', label: 'Sub', zIndex: 2, x: 560, y: 620, width: 800, height: 50,
        style: { background: 'transparent', borderSize: 0, fontSize: 18, fontColor: '#5cffe2', letterSpacing: 8, textAlign: 'center', textTransform: 'uppercase' },
        content: { type: 'text', settings: { text: 'be right back' } },
      },
    ],
  },
  // ── Just Chatting ──────────────────────────────────────────────────────────
  {
    id: 'cozy-just-chatting',
    name: 'Cozy Chat',
    category: 'Just Chatting',
    accentColor: '#f9a8d4',
    bgColors: ['#2e1f2f', '#f9a8d4'],
    desc: 'Soft pink cam frame with live chat box',
    widgets: [
      {
        type: 'background', label: 'BG', zIndex: 0, x: 0, y: 0, width: 1920, height: 1080,
        style: { background: 'linear-gradient(135deg,#1b0e1a,#2f1934)', borderSize: 0 },
        content: { type: 'background', settings: {} },
      },
      {
        type: 'camera-frame', label: 'Cam', zIndex: 1, x: 60, y: 80, width: 1140, height: 640,
        style: { borderRadius: 20, borderSize: 3, borderColor: '#f9a8d4', glowColor: '#f9a8d4', glowBlur: 16 },
        content: { type: 'camera-frame', settings: {} },
      },
      {
        type: 'chat-box', label: 'Chat', zIndex: 2, x: 1260, y: 80, width: 600, height: 840,
        style: { background: 'rgba(27,14,26,0.85)', borderRadius: 20, borderSize: 1, borderColor: 'rgba(249,168,212,0.25)', padding: 16 },
        content: { type: 'chat-box', settings: { maxMessages: 15 } },
      },
      {
        type: 'spotify', label: 'Music', zIndex: 3, x: 60, y: 770, width: 440, height: 80,
        style: { background: 'rgba(255,255,255,0.05)', borderRadius: 40, padding: 16, borderSize: 1, borderColor: 'rgba(249,168,212,0.2)' },
        content: { type: 'spotify', settings: {} },
      },
      {
        type: 'social-links', label: 'Socials', zIndex: 4, x: 560, y: 800, width: 600, height: 40,
        style: { background: 'transparent', borderSize: 0 },
        content: { type: 'social-links', settings: {} },
      },
    ],
  },
  // ── Gaming ─────────────────────────────────────────────────────────────────
  {
    id: 'esports-hud',
    name: 'Esports HUD',
    category: 'Gaming',
    accentColor: '#3b82f6',
    bgColors: ['#020617', '#3b82f6'],
    desc: 'High-contrast tournament HUD with cam frame',
    widgets: [
      {
        type: 'header', label: 'Header', zIndex: 0, x: 0, y: 0, width: 1920, height: 48,
        style: { background: '#020617', borderSize: 0, padding: 12 },
        content: { type: 'header', settings: { titleText: 'ESPORTS CHAMPIONSHIP LIVE' } },
      },
      {
        type: 'text', label: 'Title', zIndex: 1, x: 80, y: 10, width: 600, height: 28,
        style: { background: 'transparent', borderSize: 0, fontSize: 14, fontColor: '#3b82f6', fontWeight: '900', letterSpacing: 3, textTransform: 'uppercase' },
        content: { type: 'text', settings: { text: 'ESPORTS CHAMPIONSHIP LIVE' } },
      },
      {
        type: 'camera-frame', label: 'Cam', zIndex: 2, x: 1540, y: 58, width: 340, height: 255,
        style: { borderRadius: 4, borderSize: 2, borderColor: '#ef4444', glowColor: '#ef4444', glowBlur: 8 },
        content: { type: 'camera-frame', settings: {} },
      },
      {
        type: 'latest-follower', label: 'Latest Follower', zIndex: 3, x: 20, y: 1000, width: 320, height: 56,
        style: { background: '#020617', borderRadius: 4, padding: 12, borderSize: 1, borderColor: '#3b82f6' },
        content: { type: 'latest-follower', settings: { label: 'Latest Follower' } },
      },
      {
        type: 'latest-subscriber', label: 'Latest Sub', zIndex: 3, x: 360, y: 1000, width: 320, height: 56,
        style: { background: '#020617', borderRadius: 4, padding: 12, borderSize: 1, borderColor: '#3b82f6' },
        content: { type: 'latest-subscriber', settings: { label: 'Latest Sub' } },
      },
      {
        type: 'viewer-count', label: 'Viewers', zIndex: 3, x: 1740, y: 8, width: 160, height: 32,
        style: { background: 'rgba(59,130,246,0.15)', borderRadius: 4, borderSize: 1, borderColor: '#3b82f6', fontSize: 14, fontColor: '#fff', textAlign: 'center', padding: 6 },
        content: { type: 'viewer-count', settings: {} },
      },
    ],
  },
  // ── Ending ─────────────────────────────────────────────────────────────────
  {
    id: 'cyber-ending',
    name: 'Cyber Outro',
    category: 'Ending',
    accentColor: '#5cffe2',
    bgColors: ['#07050f', '#140526'],
    desc: 'Thank you screen with social links and outro card',
    widgets: [
      {
        type: 'background', label: 'BG', zIndex: 0, x: 0, y: 0, width: 1920, height: 1080,
        style: { background: 'linear-gradient(135deg,#07050f,#1a0535)', borderSize: 0 },
        content: { type: 'background', settings: {} },
      },
      {
        type: 'text', label: 'Thanks', zIndex: 1, x: 310, y: 220, width: 1300, height: 120,
        style: { background: 'transparent', borderSize: 0, fontSize: 96, fontColor: '#5cffe2', fontWeight: '800', textAlign: 'center', glowColor: '#5cffe2', glowBlur: 20 },
        content: { type: 'text', settings: { text: 'THANKS FOR WATCHING!' } },
      },
      {
        type: 'text', label: 'Sub CTA', zIndex: 2, x: 560, y: 370, width: 800, height: 60,
        style: { background: 'transparent', borderSize: 0, fontSize: 22, fontColor: '#ff4dff', textAlign: 'center', letterSpacing: 2 },
        content: { type: 'text', settings: { text: 'Follow for more streams 🎮' } },
      },
      {
        type: 'social-links', label: 'Socials', zIndex: 3, x: 660, y: 500, width: 600, height: 48,
        style: { background: 'transparent', borderSize: 0 },
        content: { type: 'social-links', settings: {} },
      },
      {
        type: 'glass-panel', label: 'Card', zIndex: 4, x: 560, y: 600, width: 800, height: 280,
        style: { background: 'rgba(20,5,38,0.6)', borderRadius: 20, borderSize: 1, borderColor: 'rgba(92,255,226,0.25)', glassEffect: true },
        content: { type: 'glass-panel', settings: {} },
      },
      {
        type: 'text', label: 'Next Stream', zIndex: 5, x: 610, y: 640, width: 700, height: 50,
        style: { background: 'transparent', borderSize: 0, fontSize: 14, fontColor: 'rgba(255,255,255,0.4)', textAlign: 'center', letterSpacing: 3, textTransform: 'uppercase' },
        content: { type: 'text', settings: { text: 'NEXT STREAM' } },
      },
      {
        type: 'text', label: 'Next Date', zIndex: 5, x: 610, y: 700, width: 700, height: 80,
        style: { background: 'transparent', borderSize: 0, fontSize: 48, fontColor: '#fff', fontWeight: '700', textAlign: 'center' },
        content: { type: 'text', settings: { text: 'Tomorrow @ 8PM' } },
      },
    ],
  },
  // ── Luxury ─────────────────────────────────────────────────────────────────
  {
    id: 'luxury-dark',
    name: 'Gold Luxe',
    category: 'Luxury',
    accentColor: '#c9a227',
    bgColors: ['#050505', '#1e1c18'],
    desc: 'Premium gold border with elegant typography',
    widgets: [
      {
        type: 'background', label: 'BG', zIndex: 0, x: 0, y: 0, width: 1920, height: 1080,
        style: { background: 'linear-gradient(160deg,#050505,#100e0b)', borderSize: 0 },
        content: { type: 'background', settings: {} },
      },
      {
        type: 'shape', label: 'Gold Border', zIndex: 1, x: 40, y: 40, width: 1840, height: 1000,
        style: { background: 'transparent', borderSize: 1, borderColor: 'rgba(201,162,39,0.35)', borderRadius: 4 },
        content: { type: 'shape', settings: {} },
      },
      {
        type: 'camera-frame', label: 'Cam', zIndex: 2, x: 80, y: 100, width: 920, height: 518,
        style: { borderRadius: 2, borderSize: 2, borderColor: '#c9a227', glowColor: '#c9a227', glowBlur: 8 },
        content: { type: 'camera-frame', settings: {} },
      },
      {
        type: 'chat-box', label: 'Chat', zIndex: 3, x: 1080, y: 100, width: 800, height: 680,
        style: { background: 'rgba(10,9,8,0.85)', borderRadius: 2, borderSize: 1, borderColor: 'rgba(201,162,39,0.25)', padding: 16 },
        content: { type: 'chat-box', settings: { maxMessages: 12 } },
      },
      {
        type: 'text', label: 'Name', zIndex: 4, x: 80, y: 660, width: 920, height: 60,
        style: { background: 'transparent', borderSize: 0, fontSize: 13, fontColor: 'rgba(201,162,39,0.5)', letterSpacing: 5, textTransform: 'uppercase', textAlign: 'center' },
        content: { type: 'text', settings: { text: 'YOUR NAME HERE' } },
      },
    ],
  },
  // ── Minimal ────────────────────────────────────────────────────────────────
  {
    id: 'pure-minimal',
    name: 'Pure Minimal',
    category: 'Minimal',
    accentColor: '#ffffff',
    bgColors: ['#0a0a0a', '#141414'],
    desc: 'Ultra clean layout — no decorations, just content',
    widgets: [
      {
        type: 'background', label: 'BG', zIndex: 0, x: 0, y: 0, width: 1920, height: 1080,
        style: { background: '#0a0a0a', borderSize: 0 },
        content: { type: 'background', settings: {} },
      },
      {
        type: 'camera-frame', label: 'Cam', zIndex: 1, x: 0, y: 0, width: 1280, height: 720,
        style: { borderRadius: 0, borderSize: 0 },
        content: { type: 'camera-frame', settings: {} },
      },
      {
        type: 'chat-box', label: 'Chat', zIndex: 2, x: 1300, y: 0, width: 620, height: 960,
        style: { background: 'transparent', borderRadius: 0, borderSize: 0, padding: 16 },
        content: { type: 'chat-box', settings: { maxMessages: 20 } },
      },
    ],
  },
  // ── Anime ──────────────────────────────────────────────────────────────────
  {
    id: 'anime-sakura',
    name: 'Sakura Dream',
    category: 'Anime',
    accentColor: '#ff80b5',
    bgColors: ['#1f111b', '#3b1f35'],
    desc: 'Soft cherry blossom pink with rounded cozy elements',
    widgets: [
      {
        type: 'background', label: 'BG', zIndex: 0, x: 0, y: 0, width: 1920, height: 1080,
        style: { background: 'linear-gradient(160deg,#1f111b,#3b1f35)', borderSize: 0 },
        content: { type: 'background', settings: {} },
      },
      {
        type: 'camera-frame', label: 'Cam', zIndex: 1, x: 60, y: 80, width: 1100, height: 618,
        style: { borderRadius: 24, borderSize: 3, borderColor: '#ff80b5', glowColor: '#ff80b5', glowBlur: 20 },
        content: { type: 'camera-frame', settings: {} },
      },
      {
        type: 'chat-box', label: 'Chat', zIndex: 2, x: 1240, y: 80, width: 640, height: 800,
        style: { background: 'rgba(31,17,27,0.8)', borderRadius: 24, borderSize: 1, borderColor: 'rgba(255,128,181,0.3)', padding: 16 },
        content: { type: 'chat-box', settings: { maxMessages: 14 } },
      },
      {
        type: 'spotify', label: 'Music', zIndex: 3, x: 60, y: 750, width: 500, height: 80,
        style: { background: 'rgba(255,128,181,0.08)', borderRadius: 40, padding: 16, borderSize: 1, borderColor: 'rgba(255,128,181,0.25)' },
        content: { type: 'spotify', settings: {} },
      },
      {
        type: 'badge', label: 'Live Badge', zIndex: 4, x: 80, y: 880, width: 120, height: 36,
        style: { background: 'rgba(255,128,181,0.15)', borderRadius: 20, borderSize: 1, borderColor: '#ff80b5', fontSize: 12, fontColor: '#ff80b5', textAlign: 'center', padding: 8 },
        content: { type: 'badge', settings: { badgeText: '🔴 LIVE' } },
      },
    ],
  },
  // ── Cyberpunk ──────────────────────────────────────────────────────────────
  {
    id: 'cyberpunk-2077',
    name: 'Night City',
    category: 'Cyberpunk',
    accentColor: '#f9e000',
    bgColors: ['#07050f', '#1a0535'],
    desc: 'Cyberpunk yellow glitch aesthetic',
    widgets: [
      {
        type: 'background', label: 'BG', zIndex: 0, x: 0, y: 0, width: 1920, height: 1080,
        style: { background: 'linear-gradient(160deg,#07050f,#0a0520)', borderSize: 0 },
        content: { type: 'background', settings: {} },
      },
      {
        type: 'header', label: 'HUD Header', zIndex: 1, x: 0, y: 0, width: 1920, height: 60,
        style: { background: 'rgba(249,224,0,0.06)', borderSize: 0, borderRadius: 0 },
        content: { type: 'header', settings: { titleText: 'NIGHT CITY — ACTIVE STREAM' } },
      },
      {
        type: 'text', label: 'HUD Text', zIndex: 2, x: 20, y: 14, width: 600, height: 32,
        style: { background: 'transparent', borderSize: 0, fontSize: 13, fontColor: '#f9e000', fontWeight: '700', letterSpacing: 4, textTransform: 'uppercase' },
        content: { type: 'text', settings: { text: '// NIGHT CITY — LIVE BROADCAST //' } },
      },
      {
        type: 'camera-frame', label: 'Cam', zIndex: 3, x: 1440, y: 70, width: 440, height: 248,
        style: { borderRadius: 0, borderSize: 2, borderColor: '#f9e000', glowColor: '#f9e000', glowBlur: 10 },
        content: { type: 'camera-frame', settings: {} },
      },
      {
        type: 'chat-box', label: 'Chat', zIndex: 4, x: 1440, y: 340, width: 440, height: 600,
        style: { background: 'rgba(5,3,15,0.9)', borderRadius: 0, borderSize: 1, borderColor: 'rgba(249,224,0,0.3)', padding: 12 },
        content: { type: 'chat-box', settings: { maxMessages: 12 } },
      },
      {
        type: 'footer', label: 'Footer', zIndex: 5, x: 0, y: 1020, width: 1920, height: 60,
        style: { background: 'rgba(249,224,0,0.06)', borderSize: 0 },
        content: { type: 'footer', settings: {} },
      },
    ],
  },
  // ── Lo-fi ──────────────────────────────────────────────────────────────────
  {
    id: 'lofi-bedroom',
    name: 'Bedroom Lo-fi',
    category: 'Lo-fi',
    accentColor: '#c084fc',
    bgColors: ['#2e1f2f', '#c084fc'],
    desc: 'Soft purple bedroom aesthetic with music widget',
    widgets: [
      {
        type: 'background', label: 'BG', zIndex: 0, x: 0, y: 0, width: 1920, height: 1080,
        style: { background: 'linear-gradient(180deg,#1a0e26,#2b1a3a)', borderSize: 0 },
        content: { type: 'background', settings: {} },
      },
      {
        type: 'camera-frame', label: 'Cam', zIndex: 1, x: 80, y: 100, width: 960, height: 540,
        style: { borderRadius: 16, borderSize: 2, borderColor: '#c084fc', glowColor: '#c084fc', glowBlur: 16 },
        content: { type: 'camera-frame', settings: {} },
      },
      {
        type: 'chat-box', label: 'Chat', zIndex: 2, x: 1120, y: 100, width: 760, height: 700,
        style: { background: 'rgba(26,14,38,0.85)', borderRadius: 16, borderSize: 1, borderColor: 'rgba(192,132,252,0.25)', padding: 14 },
        content: { type: 'chat-box', settings: { maxMessages: 14 } },
      },
      {
        type: 'spotify', label: 'Music', zIndex: 3, x: 80, y: 700, width: 520, height: 90,
        style: { background: 'rgba(192,132,252,0.08)', borderRadius: 45, padding: 16, borderSize: 1, borderColor: 'rgba(192,132,252,0.25)' },
        content: { type: 'spotify', settings: {} },
      },
      {
        type: 'text', label: 'Lo-fi label', zIndex: 4, x: 660, y: 720, width: 360, height: 40,
        style: { background: 'transparent', borderSize: 0, fontSize: 12, fontColor: 'rgba(192,132,252,0.5)', letterSpacing: 4, textTransform: 'uppercase', textAlign: 'center' },
        content: { type: 'text', settings: { text: 'chill & study' } },
      },
    ],
  },
  // ── Podcast ────────────────────────────────────────────────────────────────
  {
    id: 'podcast-pro',
    name: 'Podcast Pro',
    category: 'Podcast',
    accentColor: '#f59e0b',
    bgColors: ['#0a0a0a', '#f59e0b'],
    desc: 'Split-screen podcast layout with clean branding',
    widgets: [
      {
        type: 'background', label: 'BG', zIndex: 0, x: 0, y: 0, width: 1920, height: 1080,
        style: { background: '#111111', borderSize: 0 },
        content: { type: 'background', settings: {} },
      },
      {
        type: 'camera-frame', label: 'Host Cam', zIndex: 1, x: 60, y: 100, width: 860, height: 484,
        style: { borderRadius: 8, borderSize: 2, borderColor: '#f59e0b' },
        content: { type: 'camera-frame', settings: { frameLabel: 'Host' } },
      },
      {
        type: 'camera-frame', label: 'Guest Cam', zIndex: 1, x: 1000, y: 100, width: 860, height: 484,
        style: { borderRadius: 8, borderSize: 2, borderColor: '#f59e0b' },
        content: { type: 'camera-frame', settings: { frameLabel: 'Guest' } },
      },
      {
        type: 'text', label: 'Episode', zIndex: 2, x: 60, y: 640, width: 860, height: 50,
        style: { background: 'transparent', borderSize: 0, fontSize: 14, fontColor: '#f59e0b', fontWeight: '700', letterSpacing: 4, textTransform: 'uppercase', textAlign: 'center' },
        content: { type: 'text', settings: { text: 'EPISODE 42 — THE FUTURE OF STREAMING' } },
      },
      {
        type: 'chat-box', label: 'Chat', zIndex: 3, x: 60, y: 720, width: 860, height: 300,
        style: { background: 'rgba(20,20,20,0.9)', borderRadius: 8, borderSize: 1, borderColor: 'rgba(245,158,11,0.2)', padding: 12 },
        content: { type: 'chat-box', settings: { maxMessages: 8 } },
      },
      {
        type: 'clock', label: 'Clock', zIndex: 4, x: 1780, y: 14, width: 120, height: 32,
        style: { background: 'transparent', borderSize: 0, fontSize: 14, fontColor: 'rgba(255,255,255,0.4)', textAlign: 'right' },
        content: { type: 'clock', settings: {} },
      },
    ],
  },
];

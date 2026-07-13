import type { SceneWidget } from '../store/editorStore';

export interface PackScene {
  id: string;
  name: string;
  label: string;
  widgets: Omit<SceneWidget, 'id' | 'zIndex'>[];
}

export interface StreamPack {
  id: string;
  name: string;
  desc: string;
  category: string;
  accentColor: string;
  bgColors: [string, string];
  fontFamily: string;
  borderRadius: number;
  borderStyle: 'solid' | 'dashed' | 'dotted' | 'none';
  borderColor: string;
  glowColor?: string;
  glowBlur?: number;
  themeClass: string;
  decorations: string[]; // List of visual stickers included
  scenes: PackScene[];
}

export const STREAM_PACKS: StreamPack[] = [
  // ─── Cyber Synth ──────────────────────────────────────────────────────────
  {
    id: 'pack-cyber-synth',
    name: 'Cyber Synth',
    desc: 'High-contrast neon glitch styling with monospace indicators, cyber cutouts, and scanline grids.',
    category: 'Cyberpunk',
    accentColor: '#ff4dff',
    bgColors: ['#07050f', '#140526'],
    fontFamily: 'JetBrains Mono',
    borderRadius: 4,
    borderStyle: 'solid',
    borderColor: '#ff4dff',
    glowColor: '#ff4dff',
    glowBlur: 16,
    themeClass: 'theme-cyber-synth',
    decorations: ['🐱 Cyber-Cat Sticker', '⚡ Glitch Hologram', '📟 Grid Overlay'],
    scenes: [
      {
        id: 'scene-starting',
        name: 'starting-soon',
        label: '⏳ Starting Soon',
        widgets: [
          {
            type: 'background', label: 'Synth BG Grid', x: 0, y: 0, width: 1920, height: 1080, rotation: 0, opacity: 100, scale: 1, visible: true, locked: true, style: { background: 'linear-gradient(135deg, #07050f 0%, #140526 100%)', borderSize: 0 }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'background', settings: {} }
          },
          {
            type: 'glass-panel', label: 'Cyber Frame Container', x: 460, y: 240, width: 1000, height: 600, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { background: 'rgba(20, 16, 44, 0.75)', borderRadius: 4, borderSize: 2, borderColor: '#ff4dff', glowColor: '#ff4dff', glowBlur: 20 }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'glass-panel', settings: {} }
          },
          {
            type: 'text', label: 'Broadcast Banner', x: 510, y: 280, width: 900, height: 60, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { fontSize: 24, fontColor: '#ff4dff', fontFamily: 'JetBrains Mono', fontWeight: '800', textAlign: 'center', letterSpacing: 4 }, animation: { type: 'pulse', duration: 2, delay: 0, loop: true }, content: { type: 'text', settings: { text: 'STREAM BROADCAST STARTING SOON' } }
          },
          {
            type: 'countdown-timer', label: 'Neon Timer', x: 560, y: 380, width: 800, height: 180, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { fontSize: 110, fontColor: '#5cffe2', fontFamily: 'JetBrains Mono', glowColor: '#5cffe2', glowBlur: 24, textAlign: 'center' }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'countdown-timer', settings: { duration: 600 } }
          },
          {
            type: 'badge', label: 'Cyber Cat Cutout', x: 1320, y: 690, width: 120, height: 120, rotation: 10, opacity: 100, scale: 1, visible: true, locked: false, style: { background: 'rgba(255,77,255,0.1)', borderRadius: 20, borderSize: 1, borderColor: '#ff4dff', fontSize: 48, textAlign: 'center' }, animation: { type: 'float', duration: 3, delay: 0, loop: true }, content: { type: 'badge', settings: { badgeText: '🐱' } }
          }
        ]
      },
      {
        id: 'scene-chatting',
        name: 'just-chatting',
        label: '💬 Just Chatting',
        widgets: [
          {
            type: 'background', label: 'Synth BG Grid', x: 0, y: 0, width: 1920, height: 1080, rotation: 0, opacity: 100, scale: 1, visible: true, locked: true, style: { background: 'linear-gradient(135deg, #07050f 0%, #140526 100%)', borderSize: 0 }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'background', settings: {} }
          },
          {
            type: 'camera-frame', label: 'Primary Cam Box', x: 60, y: 80, width: 1160, height: 650, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { borderSize: 3, borderColor: '#ff4dff', glowColor: '#ff4dff', glowBlur: 16, borderRadius: 4 }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'camera-frame', settings: { frameLabel: 'PRIMARY CAMERA' } }
          },
          {
            type: 'chat-box', label: 'Glitch Chat Box', x: 1260, y: 80, width: 600, height: 860, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { background: 'rgba(14, 8, 26, 0.88)', borderSize: 1, borderColor: '#5cffe2', glowColor: '#5cffe2', glowBlur: 10, borderRadius: 4, padding: 16 }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'chat-box', settings: { maxMessages: 16 } }
          },
          {
            type: 'spotify', label: 'Music Widget', x: 60, y: 770, width: 460, height: 90, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { background: 'rgba(14,8,26,0.85)', borderSize: 1, borderColor: '#ff4dff', borderRadius: 4, padding: 12 }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'spotify', settings: {} }
          },
          {
            type: 'social-links', label: 'Socials Row', x: 550, y: 795, width: 670, height: 48, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { background: 'transparent', borderSize: 0 }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'social-links', settings: {} }
          }
        ]
      },
      {
        id: 'scene-brb',
        name: 'brb',
        label: '☕ BRB',
        widgets: [
          {
            type: 'background', label: 'Synth BG Grid', x: 0, y: 0, width: 1920, height: 1080, rotation: 0, opacity: 100, scale: 1, visible: true, locked: true, style: { background: 'linear-gradient(135deg, #07050f 0%, #140526 100%)', borderSize: 0 }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'background', settings: {} }
          },
          {
            type: 'text', label: 'BRB Label', x: 310, y: 380, width: 1300, height: 200, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { fontSize: 160, fontColor: '#ff4dff', fontFamily: 'JetBrains Mono', fontWeight: '900', glowColor: '#ff4dff', glowBlur: 40, textAlign: 'center' }, animation: { type: 'pulse', duration: 3, delay: 0, loop: true }, content: { type: 'text', settings: { text: 'BE RIGHT BACK' } }
          },
          {
            type: 'text', label: 'BRB Subtext', x: 610, y: 620, width: 700, height: 60, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { fontSize: 18, fontColor: '#5cffe2', fontFamily: 'JetBrains Mono', letterSpacing: 8, textAlign: 'center' }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'text', settings: { text: 'taking a short coffee break' } }
          }
        ]
      },
      {
        id: 'scene-ending',
        name: 'ending',
        label: '🎬 Ending',
        widgets: [
          {
            type: 'background', label: 'Synth BG Grid', x: 0, y: 0, width: 1920, height: 1080, rotation: 0, opacity: 100, scale: 1, visible: true, locked: true, style: { background: 'linear-gradient(135deg, #07050f 0%, #140526 100%)', borderSize: 0 }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'background', settings: {} }
          },
          {
            type: 'text', label: 'Ending Header', x: 310, y: 250, width: 1300, height: 120, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { fontSize: 80, fontColor: '#ff4dff', fontFamily: 'JetBrains Mono', fontWeight: '800', glowColor: '#ff4dff', glowBlur: 20, textAlign: 'center' }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'text', settings: { text: 'THANKS FOR WATCHING!' } }
          },
          {
            type: 'social-links', label: 'Socials Grid', x: 660, y: 440, width: 600, height: 48, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { background: 'transparent', borderSize: 0 }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'social-links', settings: {} }
          },
          {
            type: 'glass-panel', label: 'Credit Frame', x: 560, y: 550, width: 800, height: 320, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { background: 'rgba(14,8,26,0.85)', borderRadius: 4, borderSize: 1, borderColor: '#5cffe2', glowColor: '#5cffe2', glowBlur: 10 }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'glass-panel', settings: {} }
          },
          {
            type: 'text', label: 'Next Schedule Title', x: 610, y: 590, width: 700, height: 50, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { fontSize: 13, fontColor: 'rgba(255,255,255,0.4)', fontFamily: 'JetBrains Mono', textAlign: 'center', letterSpacing: 4 }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'text', settings: { text: 'NEXT STREAM BROADCAST' } }
          },
          {
            type: 'text', label: 'Next Schedule Value', x: 610, y: 660, width: 700, height: 90, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { fontSize: 44, fontColor: '#ffffff', fontFamily: 'JetBrains Mono', fontWeight: '700', textAlign: 'center' }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'text', settings: { text: 'Tomorrow @ 7:00 PM EST' } }
          }
        ]
      }
    ]
  },

  // ─── Glassmorphism ──────────────────────────────────────────────────────────
  {
    id: 'pack-glassmorphism',
    name: 'Glassmorphism Pro',
    desc: 'Deep frosted glass interfaces, rich backdrop blurs, violet ambient drop shadows, and minimalist sans-serif typography.',
    category: 'Premium',
    accentColor: '#c084fc',
    bgColors: ['#0a0515', '#1a1035'],
    fontFamily: 'Inter',
    borderRadius: 16,
    borderStyle: 'solid',
    borderColor: 'rgba(255, 255, 255, 0.15)',
    glowColor: 'rgba(192, 132, 252, 0.25)',
    glowBlur: 24,
    themeClass: 'theme-glassmorphism',
    decorations: ['🎈 Floating Ambient Ball', '☁️ Dreamy Cloud Sticker'],
    scenes: [
      {
        id: 'scene-starting',
        name: 'starting-soon',
        label: '⏳ Starting Soon',
        widgets: [
          {
            type: 'background', label: 'Glass BG Gradient', x: 0, y: 0, width: 1920, height: 1080, rotation: 0, opacity: 100, scale: 1, visible: true, locked: true, style: { background: 'linear-gradient(135deg, #0a0515 0%, #1a1035 100%)', borderSize: 0 }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'background', settings: {} }
          },
          {
            type: 'glass-panel', label: 'Frosted Glass Box', x: 480, y: 260, width: 960, height: 560, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { background: 'rgba(255, 255, 255, 0.04)', borderRadius: 24, borderSize: 1, borderColor: 'rgba(255,255,255,0.12)', glassEffect: true, blur: 20, shadowBlur: 30, shadowColor: 'rgba(0,0,0,0.5)' }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'glass-panel', settings: {} }
          },
          {
            type: 'text', label: 'Starting Text', x: 530, y: 310, width: 860, height: 60, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { fontSize: 20, fontColor: 'rgba(255,255,255,0.6)', fontFamily: 'Inter', fontWeight: '600', letterSpacing: 6, textAlign: 'center', textTransform: 'uppercase' }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'text', settings: { text: 'Starting soon - stay tuned' } }
          },
          {
            type: 'countdown-timer', label: 'Glass Timer', x: 580, y: 390, width: 760, height: 180, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { fontSize: 100, fontColor: '#ffffff', fontFamily: 'Inter', fontWeight: '300', textAlign: 'center' }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'countdown-timer', settings: { duration: 600 } }
          },
          {
            type: 'badge', label: 'Ambient Cloud Decor', x: 1250, y: 680, width: 140, height: 80, rotation: -5, opacity: 100, scale: 1, visible: true, locked: false, style: { background: 'rgba(255,255,255,0.05)', borderRadius: 20, borderSize: 1, borderColor: 'rgba(255,255,255,0.1)', fontSize: 32, textAlign: 'center' }, animation: { type: 'float', duration: 4, delay: 0, loop: true }, content: { type: 'badge', settings: { badgeText: '☁️' } }
          }
        ]
      },
      {
        id: 'scene-chatting',
        name: 'just-chatting',
        label: '💬 Just Chatting',
        widgets: [
          {
            type: 'background', label: 'Glass BG Gradient', x: 0, y: 0, width: 1920, height: 1080, rotation: 0, opacity: 100, scale: 1, visible: true, locked: true, style: { background: 'linear-gradient(135deg, #0a0515 0%, #1a1035 100%)', borderSize: 0 }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'background', settings: {} }
          },
          {
            type: 'camera-frame', label: 'Frosted Camera Box', x: 80, y: 100, width: 1100, height: 620, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { borderRadius: 16, borderSize: 2, borderColor: 'rgba(255,255,255,0.2)', glowColor: 'rgba(192,132,252,0.2)', glowBlur: 16 }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'camera-frame', settings: { frameLabel: 'PREVIEW FEED' } }
          },
          {
            type: 'chat-box', label: 'Frosted Chat Box', x: 1220, y: 100, width: 620, height: 840, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { background: 'rgba(255,255,255,0.03)', borderRadius: 20, borderSize: 1, borderColor: 'rgba(255,255,255,0.1)', padding: 20, glassEffect: true, blur: 16 }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'chat-box', settings: { maxMessages: 15 } }
          },
          {
            type: 'spotify', label: 'Music Glass Widget', x: 80, y: 770, width: 440, height: 90, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { background: 'rgba(255,255,255,0.04)', borderRadius: 30, padding: 14, borderSize: 1, borderColor: 'rgba(255,255,255,0.1)', glassEffect: true, blur: 12 }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'spotify', settings: {} }
          }
        ]
      },
      {
        id: 'scene-brb',
        name: 'brb',
        label: '☕ BRB',
        widgets: [
          {
            type: 'background', label: 'Glass BG Gradient', x: 0, y: 0, width: 1920, height: 1080, rotation: 0, opacity: 100, scale: 1, visible: true, locked: true, style: { background: 'linear-gradient(135deg, #0a0515 0%, #1a1035 100%)', borderSize: 0 }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'background', settings: {} }
          },
          {
            type: 'text', label: 'BRB Label', x: 310, y: 390, width: 1300, height: 180, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { fontSize: 120, fontColor: '#ffffff', fontFamily: 'Inter', fontWeight: '300', letterSpacing: 10, textAlign: 'center' }, animation: { type: 'float', duration: 3, delay: 0, loop: true }, content: { type: 'text', settings: { text: 'BE RIGHT BACK' } }
          }
        ]
      },
      {
        id: 'scene-ending',
        name: 'ending',
        label: '🎬 Ending',
        widgets: [
          {
            type: 'background', label: 'Glass BG Gradient', x: 0, y: 0, width: 1920, height: 1080, rotation: 0, opacity: 100, scale: 1, visible: true, locked: true, style: { background: 'linear-gradient(135deg, #0a0515 0%, #1a1035 100%)', borderSize: 0 }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'background', settings: {} }
          },
          {
            type: 'text', label: 'Credits Title', x: 310, y: 280, width: 1300, height: 100, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { fontSize: 64, fontColor: '#ffffff', fontFamily: 'Inter', fontWeight: '200', textAlign: 'center' }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'text', settings: { text: 'Thank you for watching' } }
          },
          {
            type: 'glass-panel', label: 'Cozy Card', x: 610, y: 450, width: 700, height: 350, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { background: 'rgba(255,255,255,0.04)', borderRadius: 20, borderSize: 1, borderColor: 'rgba(255,255,255,0.1)', glassEffect: true, blur: 16 }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'glass-panel', settings: {} }
          }
        ]
      }
    ]
  },

  // ─── Lo-fi Café ─────────────────────────────────────────────────────────────
  {
    id: 'pack-lofi-cafe',
    name: 'Lo-fi Café',
    desc: 'Cozy study aesthetics, warm pink pastel highlights, sleeping cats, record player decorations, and handwritten style headers.',
    category: 'Lo-fi',
    accentColor: '#f9a8d4',
    bgColors: ['#1d1421', '#32192e'],
    fontFamily: 'Inter',
    borderRadius: 20,
    borderStyle: 'solid',
    borderColor: 'rgba(249, 168, 212, 0.25)',
    themeClass: 'theme-anime-sakura',
    decorations: ['🐱 Sleeping Cat Graphic', '☕ Steam Coffee Mug sticker', '🌸 Cherry Blossom Decal'],
    scenes: [
      {
        id: 'scene-starting',
        name: 'starting-soon',
        label: '⏳ Starting Soon',
        widgets: [
          {
            type: 'background', label: 'Cozy BG', x: 0, y: 0, width: 1920, height: 1080, rotation: 0, opacity: 100, scale: 1, visible: true, locked: true, style: { background: 'linear-gradient(135deg, #1d1421,#32192e)', borderSize: 0 }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'background', settings: {} }
          },
          {
            type: 'glass-panel', label: 'Cozy Card Grid', x: 610, y: 280, width: 700, height: 520, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { background: 'rgba(50,25,46,0.7)', borderRadius: 32, borderSize: 1, borderColor: 'rgba(249,168,212,0.3)', glassEffect: true, blur: 12 }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'glass-panel', settings: {} }
          },
          {
            type: 'text', label: 'Cozy Title', x: 660, y: 330, width: 600, height: 40, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { fontSize: 16, fontColor: '#f9a8d4', fontFamily: 'Inter', letterSpacing: 4, textAlign: 'center', textTransform: 'uppercase' }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'text', settings: { text: 'stream starting soon' } }
          },
          {
            type: 'countdown-timer', label: 'Soft Timer', x: 660, y: 395, width: 600, height: 160, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { fontSize: 88, fontColor: '#f9a8d4', fontFamily: 'Inter', fontWeight: '300', textAlign: 'center' }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'countdown-timer', settings: { duration: 600 } }
          },
          {
            type: 'spotify', label: 'Spotify music card', x: 730, y: 600, width: 460, height: 80, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { background: 'rgba(255,255,255,0.05)', borderRadius: 40, padding: 14, borderSize: 1, borderColor: 'rgba(249,168,212,0.2)' }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'spotify', settings: {} }
          },
          {
            type: 'badge', label: 'Coffee Cup Sticker', x: 640, y: 250, width: 70, height: 70, rotation: -15, opacity: 100, scale: 1, visible: true, locked: false, style: { background: 'rgba(249,168,212,0.1)', borderRadius: 50, borderSize: 1, borderColor: '#f9a8d4', fontSize: 32, textAlign: 'center' }, animation: { type: 'float', duration: 3, delay: 0, loop: true }, content: { type: 'badge', settings: { badgeText: '☕' } }
          },
          {
            type: 'badge', label: 'Sleeping Cat Sticker', x: 1240, y: 730, width: 90, height: 80, rotation: 10, opacity: 100, scale: 1, visible: true, locked: false, style: { background: 'rgba(255,255,255,0.05)', borderRadius: 16, fontSize: 36, textAlign: 'center' }, animation: { type: 'float', duration: 5, delay: 1, loop: true }, content: { type: 'badge', settings: { badgeText: '🐱' } }
          }
        ]
      },
      {
        id: 'scene-chatting',
        name: 'just-chatting',
        label: '💬 Just Chatting',
        widgets: [
          {
            type: 'background', label: 'Cozy BG', x: 0, y: 0, width: 1920, height: 1080, rotation: 0, opacity: 100, scale: 1, visible: true, locked: true, style: { background: 'linear-gradient(135deg, #1d1421,#32192e)', borderSize: 0 }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'background', settings: {} }
          },
          {
            type: 'camera-frame', label: 'Cozy Camera Box', x: 60, y: 80, width: 1140, height: 640, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { borderRadius: 24, borderSize: 3, borderColor: '#f9a8d4', glowColor: '#f9a8d4', glowBlur: 14 }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'camera-frame', settings: { frameLabel: 'COZY CHAT CAM' } }
          },
          {
            type: 'chat-box', label: 'Cozy Chat Grid', x: 1260, y: 80, width: 600, height: 840, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { background: 'rgba(29,14,26,0.85)', borderRadius: 24, borderSize: 1, borderColor: 'rgba(249,168,212,0.25)', padding: 18 }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'chat-box', settings: { maxMessages: 15 } }
          }
        ]
      },
      {
        id: 'scene-brb',
        name: 'brb',
        label: '☕ BRB',
        widgets: [
          {
            type: 'background', label: 'Cozy BG', x: 0, y: 0, width: 1920, height: 1080, rotation: 0, opacity: 100, scale: 1, visible: true, locked: true, style: { background: 'linear-gradient(135deg, #1d1421,#32192e)', borderSize: 0 }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'background', settings: {} }
          },
          {
            type: 'text', label: 'BRB Title', x: 460, y: 440, width: 1000, height: 160, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { fontSize: 100, fontColor: '#f9a8d4', fontFamily: 'Inter', fontWeight: '300', textAlign: 'center' }, animation: { type: 'float', duration: 4, delay: 0, loop: true }, content: { type: 'text', settings: { text: 'Be Right Back' } }
          }
        ]
      },
      {
        id: 'scene-ending',
        name: 'ending',
        label: '🎬 Ending',
        widgets: [
          {
            type: 'background', label: 'Cozy BG', x: 0, y: 0, width: 1920, height: 1080, rotation: 0, opacity: 100, scale: 1, visible: true, locked: true, style: { background: 'linear-gradient(135deg, #1d1421,#32192e)', borderSize: 0 }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'background', settings: {} }
          },
          {
            type: 'text', label: 'Cozy End Title', x: 310, y: 310, width: 1300, height: 120, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { fontSize: 64, fontColor: '#ffffff', fontFamily: 'Inter', fontWeight: '300', textAlign: 'center' }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'text', settings: { text: 'Sweet Dreams' } }
          }
        ]
      }
    ]
  },

  // ─── Minimal Pro ─────────────────────────────────────────────────────────────
  {
    id: 'pack-minimal-pro',
    name: 'Minimal Pro',
    desc: 'Strict monochrome aesthetic, zero-radius borders, no lighting/glow effects, and extreme layouts for distraction-free content delivery.',
    category: 'Minimal',
    accentColor: '#ffffff',
    bgColors: ['#09090b', '#121214'],
    fontFamily: 'Inter',
    borderRadius: 0,
    borderStyle: 'solid',
    borderColor: '#3f3f46',
    themeClass: 'theme-minimal-dark',
    decorations: ['⬛ Pixel Border Accent', '⚪ Plain Dot Decor'],
    scenes: [
      {
        id: 'scene-starting',
        name: 'starting-soon',
        label: '⏳ Starting Soon',
        widgets: [
          {
            type: 'background', label: 'Dark Base BG', x: 0, y: 0, width: 1920, height: 1080, rotation: 0, opacity: 100, scale: 1, visible: true, locked: true, style: { background: '#09090b', borderSize: 0 }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'background', settings: {} }
          },
          {
            type: 'text', label: 'Minimal Title', x: 510, y: 380, width: 900, height: 80, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { fontSize: 32, fontColor: '#ffffff', fontFamily: 'Inter', fontWeight: '800', textAlign: 'center', letterSpacing: 8 }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'text', settings: { text: 'STREAM STARTING' } }
          },
          {
            type: 'countdown-timer', label: 'Minimal Countdown', x: 560, y: 490, width: 800, height: 160, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { fontSize: 72, fontColor: '#f4f4f5', fontFamily: 'Inter', fontWeight: '300', textAlign: 'center' }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'countdown-timer', settings: { duration: 600 } }
          }
        ]
      },
      {
        id: 'scene-chatting',
        name: 'just-chatting',
        label: '💬 Just Chatting',
        widgets: [
          {
            type: 'background', label: 'Dark Base BG', x: 0, y: 0, width: 1920, height: 1080, rotation: 0, opacity: 100, scale: 1, visible: true, locked: true, style: { background: '#09090b', borderSize: 0 }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'background', settings: {} }
          },
          {
            type: 'camera-frame', label: 'Minimal Camera Frame', x: 40, y: 40, width: 1240, height: 698, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { borderRadius: 0, borderSize: 1, borderColor: '#3f3f46' }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'camera-frame', settings: {} }
          },
          {
            type: 'chat-box', label: 'Minimal Chat', x: 1320, y: 40, width: 560, height: 860, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { background: 'transparent', borderRadius: 0, borderSize: 0, padding: 12 }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'chat-box', settings: { maxMessages: 18 } }
          }
        ]
      },
      {
        id: 'scene-brb',
        name: 'brb',
        label: '☕ BRB',
        widgets: [
          {
            type: 'background', label: 'Dark Base BG', x: 0, y: 0, width: 1920, height: 1080, rotation: 0, opacity: 100, scale: 1, visible: true, locked: true, style: { background: '#09090b', borderSize: 0 }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'background', settings: {} }
          },
          {
            type: 'text', label: 'BRB Minimal text', x: 460, y: 450, width: 1000, height: 160, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { fontSize: 72, fontColor: '#ffffff', fontFamily: 'Inter', fontWeight: '900', textAlign: 'center', letterSpacing: 10 }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'text', settings: { text: 'BRB' } }
          }
        ]
      },
      {
        id: 'scene-ending',
        name: 'ending',
        label: '🎬 Ending',
        widgets: [
          {
            type: 'background', label: 'Dark Base BG', x: 0, y: 0, width: 1920, height: 1080, rotation: 0, opacity: 100, scale: 1, visible: true, locked: true, style: { background: '#09090b', borderSize: 0 }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'background', settings: {} }
          },
          {
            type: 'text', label: 'Minimal End text', x: 310, y: 430, width: 1300, height: 120, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { fontSize: 48, fontColor: '#ffffff', fontFamily: 'Inter', fontWeight: '800', textAlign: 'center', letterSpacing: 8 }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'text', settings: { text: 'OFFLINE' } }
          }
        ]
      }
    ]
  }
];

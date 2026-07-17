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
  decorations: string[]; // List of visual stickers/assets included
  scenes: PackScene[];
  tags?: string[];       // Searchable tags
  animations?: string[]; // Animation styles used in this pack
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
  },

  // ─── Luxury Noir ─────────────────────────────────────────────────────────────
  {
    id: 'pack-luxury-noir',
    name: 'Luxury Noir',
    desc: 'Cinematic black with 24-karat gold accents, editorial serif typography, and understated elegance for premium streaming brands.',
    category: 'Luxury',
    accentColor: '#d4a84b',
    bgColors: ['#060504', '#110e09'],
    fontFamily: 'Playfair Display',
    borderRadius: 2,
    borderStyle: 'solid',
    borderColor: '#d4a84b',
    themeClass: 'theme-luxury-gold',
    decorations: ['👑 Crown Badge', '⬛ Black Bar Overlay', '✦ Gold Star Accent'],
    tags: ['luxury', 'gold', 'elegant', 'premium'],
    scenes: [
      { id: 'ln-starting', name: 'starting-soon', label: '⏳ Starting Soon', widgets: [
        { type: 'background', label: 'Noir BG', x: 0, y: 0, width: 1920, height: 1080, rotation: 0, opacity: 100, scale: 1, visible: true, locked: true, style: { background: 'linear-gradient(160deg,#060504,#110e09)' }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'background', settings: {} } },
        { type: 'glass-panel', label: 'Gold Frame', x: 540, y: 270, width: 840, height: 540, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { background: 'rgba(10,8,6,0.85)', borderRadius: 2, borderSize: 1, borderColor: '#d4a84b', shadowBlur: 40, shadowColor: 'rgba(212,168,75,0.15)' }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'glass-panel', settings: {} } },
        { type: 'text', label: 'Show Title', x: 590, y: 330, width: 740, height: 80, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { fontSize: 44, fontColor: '#d4a84b', fontFamily: 'Playfair Display', fontWeight: '700', textAlign: 'center', letterSpacing: 3 }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'text', settings: { text: 'LIVE BROADCAST' } } },
        { type: 'countdown-timer', label: 'Gold Timer', x: 590, y: 440, width: 740, height: 160, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { fontSize: 72, fontColor: '#f5e6c0', fontFamily: 'Playfair Display', fontWeight: '300', textAlign: 'center' }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'countdown-timer', settings: { duration: 600 } } },
        { type: 'divider', label: 'Gold Line', x: 640, y: 620, width: 640, height: 2, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { background: 'linear-gradient(90deg,transparent,#d4a84b,transparent)', borderSize: 0 }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'divider', settings: {} } },
      ]},
      { id: 'ln-chatting', name: 'just-chatting', label: '💬 Just Chatting', widgets: [
        { type: 'background', label: 'Noir BG', x: 0, y: 0, width: 1920, height: 1080, rotation: 0, opacity: 100, scale: 1, visible: true, locked: true, style: { background: 'linear-gradient(160deg,#060504,#110e09)' }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'background', settings: {} } },
        { type: 'camera-frame', label: 'Luxury Cam', x: 60, y: 60, width: 1140, height: 642, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { borderRadius: 2, borderSize: 1, borderColor: '#d4a84b', shadowBlur: 20, shadowColor: 'rgba(212,168,75,0.2)' }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'camera-frame', settings: { frameLabel: 'ON AIR' } } },
        { type: 'chat-box', label: 'Noir Chat', x: 1240, y: 60, width: 620, height: 860, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { background: 'rgba(6,5,4,0.92)', borderRadius: 2, borderSize: 1, borderColor: '#d4a84b', padding: 16 }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'chat-box', settings: { maxMessages: 14 } } },
        { type: 'text', label: 'Program Label', x: 60, y: 740, width: 400, height: 36, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { fontSize: 11, fontColor: '#d4a84b', fontFamily: 'Playfair Display', letterSpacing: 4, textTransform: 'uppercase' }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'text', settings: { text: 'LIVE NOW' } } },
      ]},
      { id: 'ln-brb', name: 'brb', label: '☕ BRB', widgets: [
        { type: 'background', label: 'Noir BG', x: 0, y: 0, width: 1920, height: 1080, rotation: 0, opacity: 100, scale: 1, visible: true, locked: true, style: { background: 'linear-gradient(160deg,#060504,#110e09)' }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'background', settings: {} } },
        { type: 'text', label: 'BRB Elegant', x: 360, y: 420, width: 1200, height: 140, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { fontSize: 80, fontColor: '#d4a84b', fontFamily: 'Playfair Display', fontWeight: '400', textAlign: 'center', letterSpacing: 10 }, animation: { type: 'fade', duration: 2, delay: 0, loop: true }, content: { type: 'text', settings: { text: 'Be Right Back' } } },
      ]},
      { id: 'ln-ending', name: 'ending', label: '🎬 Ending', widgets: [
        { type: 'background', label: 'Noir BG', x: 0, y: 0, width: 1920, height: 1080, rotation: 0, opacity: 100, scale: 1, visible: true, locked: true, style: { background: 'linear-gradient(160deg,#060504,#110e09)' }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'background', settings: {} } },
        { type: 'text', label: 'Sign Off', x: 310, y: 380, width: 1300, height: 120, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { fontSize: 56, fontColor: '#d4a84b', fontFamily: 'Playfair Display', fontWeight: '300', textAlign: 'center', letterSpacing: 6 }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'text', settings: { text: 'Thank You For Watching' } } },
        { type: 'social-links', label: 'Socials', x: 660, y: 560, width: 600, height: 48, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { background: 'transparent' }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'social-links', settings: {} } },
      ]},
    ]
  },

  // ─── Esports Arena ────────────────────────────────────────────────────────────
  {
    id: 'pack-esports-arena',
    name: 'Esports Arena',
    desc: 'High-octane competitive gaming HUD with angular telemetry panels, electric blue pulse effects, and bold esports typography.',
    category: 'Gaming',
    accentColor: '#00c8ff',
    bgColors: ['#030710', '#0b1329'],
    fontFamily: 'Space Grotesk',
    borderRadius: 2,
    borderStyle: 'solid',
    borderColor: '#00c8ff',
    glowColor: '#00c8ff',
    glowBlur: 16,
    themeClass: 'theme-esports-blue',
    decorations: ['⚡ Bolt HUD Element', '🎮 Controller Badge', '📊 Stats Overlay'],
    tags: ['gaming', 'esports', 'competitive', 'fps', 'hud'],
    scenes: [
      { id: 'ea-starting', name: 'starting-soon', label: '⏳ Starting Soon', widgets: [
        { type: 'background', label: 'Arena Dark BG', x: 0, y: 0, width: 1920, height: 1080, rotation: 0, opacity: 100, scale: 1, visible: true, locked: true, style: { background: 'linear-gradient(180deg,#030710,#0b1329)' }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'background', settings: {} } },
        { type: 'glass-panel', label: 'HUD Frame', x: 340, y: 200, width: 1240, height: 680, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { background: 'rgba(0,20,50,0.7)', borderRadius: 2, borderSize: 2, borderColor: '#00c8ff', glowColor: '#00c8ff', glowBlur: 20 }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'glass-panel', settings: {} } },
        { type: 'text', label: 'MATCH STARTING', x: 390, y: 280, width: 1140, height: 80, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { fontSize: 36, fontColor: '#00c8ff', fontFamily: 'Space Grotesk', fontWeight: '900', textAlign: 'center', letterSpacing: 8, textTransform: 'uppercase' }, animation: { type: 'pulse', duration: 1.5, delay: 0, loop: true }, content: { type: 'text', settings: { text: 'MATCH STARTING SOON' } } },
        { type: 'countdown-timer', label: 'Arena Timer', x: 460, y: 390, width: 1000, height: 200, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { fontSize: 120, fontColor: '#ffffff', fontFamily: 'Space Grotesk', fontWeight: '900', textAlign: 'center', glowColor: '#00c8ff', glowBlur: 12 }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'countdown-timer', settings: { duration: 600 } } },
        { type: 'badge', label: 'Bolt Icon', x: 1560, y: 740, width: 80, height: 80, rotation: 15, opacity: 100, scale: 1, visible: true, locked: false, style: { background: 'rgba(0,200,255,0.1)', borderRadius: 4, borderSize: 1, borderColor: '#00c8ff', fontSize: 36, textAlign: 'center' }, animation: { type: 'spin', duration: 8, delay: 0, loop: true }, content: { type: 'badge', settings: { badgeText: '⚡' } } },
      ]},
      { id: 'ea-chatting', name: 'just-chatting', label: '💬 Just Chatting', widgets: [
        { type: 'background', label: 'Arena Dark BG', x: 0, y: 0, width: 1920, height: 1080, rotation: 0, opacity: 100, scale: 1, visible: true, locked: true, style: { background: 'linear-gradient(180deg,#030710,#0b1329)' }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'background', settings: {} } },
        { type: 'camera-frame', label: 'HUD Cam', x: 40, y: 40, width: 1200, height: 675, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { borderRadius: 2, borderSize: 2, borderColor: '#00c8ff', glowColor: '#00c8ff', glowBlur: 14 }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'camera-frame', settings: { frameLabel: 'PLAYER CAM' } } },
        { type: 'chat-box', label: 'Arena Chat', x: 1280, y: 40, width: 600, height: 860, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { background: 'rgba(3,7,16,0.9)', borderRadius: 2, borderSize: 1, borderColor: '#00c8ff', padding: 14 }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'chat-box', settings: { maxMessages: 16 } } },
        { type: 'viewer-count', label: 'Viewers HUD', x: 40, y: 760, width: 240, height: 60, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { background: 'rgba(0,200,255,0.08)', borderRadius: 2, borderSize: 1, borderColor: '#00c8ff', fontSize: 22, fontColor: '#00c8ff', fontFamily: 'Space Grotesk', fontWeight: '700', textAlign: 'center' }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'viewer-count', settings: {} } },
      ]},
      { id: 'ea-brb', name: 'brb', label: '☕ BRB', widgets: [
        { type: 'background', label: 'Arena Dark BG', x: 0, y: 0, width: 1920, height: 1080, rotation: 0, opacity: 100, scale: 1, visible: true, locked: true, style: { background: 'linear-gradient(180deg,#030710,#0b1329)' }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'background', settings: {} } },
        { type: 'text', label: 'AFK Banner', x: 310, y: 410, width: 1300, height: 180, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { fontSize: 120, fontColor: '#00c8ff', fontFamily: 'Space Grotesk', fontWeight: '900', textAlign: 'center', glowColor: '#00c8ff', glowBlur: 24 }, animation: { type: 'pulse', duration: 2, delay: 0, loop: true }, content: { type: 'text', settings: { text: 'AFK' } } },
      ]},
      { id: 'ea-ending', name: 'ending', label: '🎬 Ending', widgets: [
        { type: 'background', label: 'Arena Dark BG', x: 0, y: 0, width: 1920, height: 1080, rotation: 0, opacity: 100, scale: 1, visible: true, locked: true, style: { background: 'linear-gradient(180deg,#030710,#0b1329)' }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'background', settings: {} } },
        { type: 'text', label: 'GG Banner', x: 310, y: 360, width: 1300, height: 140, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { fontSize: 96, fontColor: '#ffffff', fontFamily: 'Space Grotesk', fontWeight: '900', textAlign: 'center', glowColor: '#00c8ff', glowBlur: 16 }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'text', settings: { text: 'GG — Thanks for watching!' } } },
        { type: 'social-links', label: 'Socials', x: 660, y: 560, width: 600, height: 48, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { background: 'transparent' }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'social-links', settings: {} } },
      ]},
    ]
  },

  // ─── Sakura Anime ─────────────────────────────────────────────────────────────
  {
    id: 'pack-sakura-anime',
    name: 'Sakura Anime',
    desc: 'Soft cherry blossom aesthetics with warm pinks, rounded cozy panels, kawaii decorations, and gentle floating animations.',
    category: 'Anime',
    accentColor: '#ff80b5',
    bgColors: ['#1f111b', '#3b1f35'],
    fontFamily: 'Inter',
    borderRadius: 20,
    borderStyle: 'solid',
    borderColor: 'rgba(255,128,181,0.35)',
    glowColor: 'rgba(255,128,181,0.3)',
    glowBlur: 18,
    themeClass: 'theme-anime-sakura',
    decorations: ['🌸 Cherry Blossom Petals', '🐱 Chibi Cat Sticker', '🍡 Dango Accent'],
    tags: ['anime', 'kawaii', 'cute', 'pink', 'soft'],
    scenes: [
      { id: 'sa-starting', name: 'starting-soon', label: '⏳ Starting Soon', widgets: [
        { type: 'background', label: 'Sakura BG', x: 0, y: 0, width: 1920, height: 1080, rotation: 0, opacity: 100, scale: 1, visible: true, locked: true, style: { background: 'linear-gradient(135deg,#1f111b,#3b1f35)' }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'background', settings: {} } },
        { type: 'glass-panel', label: 'Petal Card', x: 560, y: 240, width: 800, height: 600, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { background: 'rgba(59,31,53,0.75)', borderRadius: 32, borderSize: 2, borderColor: 'rgba(255,128,181,0.4)', glassEffect: true, blur: 12 }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'glass-panel', settings: {} } },
        { type: 'text', label: 'Kawaii Title', x: 610, y: 300, width: 700, height: 50, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { fontSize: 16, fontColor: '#ff80b5', fontFamily: 'Inter', letterSpacing: 5, textAlign: 'center', textTransform: 'uppercase' }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'text', settings: { text: '✿ Starting Soon ✿' } } },
        { type: 'countdown-timer', label: 'Soft Timer', x: 610, y: 380, width: 700, height: 180, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { fontSize: 90, fontColor: '#ffb3d4', fontFamily: 'Inter', fontWeight: '300', textAlign: 'center' }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'countdown-timer', settings: { duration: 600 } } },
        { type: 'badge', label: 'Blossom Decor', x: 540, y: 220, width: 80, height: 80, rotation: -15, opacity: 100, scale: 1, visible: true, locked: false, style: { fontSize: 36, textAlign: 'center' }, animation: { type: 'float', duration: 4, delay: 0, loop: true }, content: { type: 'badge', settings: { badgeText: '🌸' } } },
        { type: 'badge', label: 'Cat Sticker', x: 1310, y: 720, width: 90, height: 90, rotation: 12, opacity: 100, scale: 1, visible: true, locked: false, style: { fontSize: 44, textAlign: 'center' }, animation: { type: 'float', duration: 6, delay: 1, loop: true }, content: { type: 'badge', settings: { badgeText: '🐱' } } },
      ]},
      { id: 'sa-chatting', name: 'just-chatting', label: '💬 Just Chatting', widgets: [
        { type: 'background', label: 'Sakura BG', x: 0, y: 0, width: 1920, height: 1080, rotation: 0, opacity: 100, scale: 1, visible: true, locked: true, style: { background: 'linear-gradient(135deg,#1f111b,#3b1f35)' }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'background', settings: {} } },
        { type: 'camera-frame', label: 'Kawaii Cam', x: 60, y: 60, width: 1140, height: 642, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { borderRadius: 24, borderSize: 3, borderColor: '#ff80b5', glowColor: '#ff80b5', glowBlur: 14 }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'camera-frame', settings: { frameLabel: 'ʕ•ᴥ•ʔ CAM' } } },
        { type: 'chat-box', label: 'Cozy Chat', x: 1250, y: 60, width: 620, height: 840, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { background: 'rgba(31,17,27,0.88)', borderRadius: 24, borderSize: 2, borderColor: 'rgba(255,128,181,0.3)', padding: 18 }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'chat-box', settings: { maxMessages: 14 } } },
      ]},
      { id: 'sa-brb', name: 'brb', label: '☕ BRB', widgets: [
        { type: 'background', label: 'Sakura BG', x: 0, y: 0, width: 1920, height: 1080, rotation: 0, opacity: 100, scale: 1, visible: true, locked: true, style: { background: 'linear-gradient(135deg,#1f111b,#3b1f35)' }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'background', settings: {} } },
        { type: 'text', label: 'BRB Kawaii', x: 360, y: 400, width: 1200, height: 160, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { fontSize: 100, fontColor: '#ff80b5', fontFamily: 'Inter', fontWeight: '300', textAlign: 'center' }, animation: { type: 'float', duration: 4, delay: 0, loop: true }, content: { type: 'text', settings: { text: 'お茶してくる ☕' } } },
      ]},
      { id: 'sa-ending', name: 'ending', label: '🎬 Ending', widgets: [
        { type: 'background', label: 'Sakura BG', x: 0, y: 0, width: 1920, height: 1080, rotation: 0, opacity: 100, scale: 1, visible: true, locked: true, style: { background: 'linear-gradient(135deg,#1f111b,#3b1f35)' }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'background', settings: {} } },
        { type: 'text', label: 'Bye Text', x: 310, y: 380, width: 1300, height: 120, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { fontSize: 60, fontColor: '#ffb3d4', fontFamily: 'Inter', fontWeight: '300', textAlign: 'center' }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'text', settings: { text: 'またね～ Thanks for watching! 🌸' } } },
      ]},
    ]
  },

  // ─── Sci-Fi Command ──────────────────────────────────────────────────────────
  {
    id: 'pack-scifi-command',
    name: 'Sci-Fi Command',
    desc: 'Mission-critical command deck aesthetic with holographic teal panels, space-age monospace data, and tactical overlay elements.',
    category: 'Sci-Fi',
    accentColor: '#00ffd4',
    bgColors: ['#040d14', '#0b1e2e'],
    fontFamily: 'JetBrains Mono',
    borderRadius: 0,
    borderStyle: 'solid',
    borderColor: '#00ffd4',
    glowColor: '#00ffd4',
    glowBlur: 14,
    themeClass: 'theme-cyber-synth',
    decorations: ['🛸 UFO Hologram', '📡 Radar Dish', '🔭 Telescope Icon'],
    tags: ['scifi', 'space', 'hologram', 'teal', 'futuristic'],
    scenes: [
      { id: 'sc-starting', name: 'starting-soon', label: '⏳ Starting Soon', widgets: [
        { type: 'background', label: 'Command BG', x: 0, y: 0, width: 1920, height: 1080, rotation: 0, opacity: 100, scale: 1, visible: true, locked: true, style: { background: 'linear-gradient(180deg,#040d14,#0b1e2e)' }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'background', settings: {} } },
        { type: 'glass-panel', label: 'Holo Panel', x: 380, y: 200, width: 1160, height: 680, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { background: 'rgba(0,20,30,0.7)', borderRadius: 0, borderSize: 1, borderColor: '#00ffd4', glowColor: '#00ffd4', glowBlur: 16 }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'glass-panel', settings: {} } },
        { type: 'text', label: 'Mission Status', x: 430, y: 260, width: 1060, height: 60, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { fontSize: 14, fontColor: '#00ffd4', fontFamily: 'JetBrains Mono', letterSpacing: 6, textAlign: 'center', textTransform: 'uppercase' }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'text', settings: { text: 'MISSION STATUS: LAUNCH SEQUENCE INITIATED' } } },
        { type: 'countdown-timer', label: 'Launch Timer', x: 460, y: 360, width: 1000, height: 200, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { fontSize: 110, fontColor: '#00ffd4', fontFamily: 'JetBrains Mono', fontWeight: '700', textAlign: 'center', glowColor: '#00ffd4', glowBlur: 20 }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'countdown-timer', settings: { duration: 600 } } },
      ]},
      { id: 'sc-chatting', name: 'just-chatting', label: '💬 Just Chatting', widgets: [
        { type: 'background', label: 'Command BG', x: 0, y: 0, width: 1920, height: 1080, rotation: 0, opacity: 100, scale: 1, visible: true, locked: true, style: { background: 'linear-gradient(180deg,#040d14,#0b1e2e)' }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'background', settings: {} } },
        { type: 'camera-frame', label: 'Command Cam', x: 40, y: 40, width: 1200, height: 680, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { borderRadius: 0, borderSize: 1, borderColor: '#00ffd4', glowColor: '#00ffd4', glowBlur: 12 }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'camera-frame', settings: { frameLabel: 'CMDR CAM' } } },
        { type: 'chat-box', label: 'Comms Feed', x: 1280, y: 40, width: 600, height: 880, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { background: 'rgba(4,13,20,0.92)', borderRadius: 0, borderSize: 1, borderColor: '#00ffd4', padding: 14 }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'chat-box', settings: { maxMessages: 16 } } },
        { type: 'clock', label: 'Mission Clock', x: 40, y: 760, width: 300, height: 60, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { fontSize: 20, fontColor: '#00ffd4', fontFamily: 'JetBrains Mono', glowColor: '#00ffd4', glowBlur: 8 }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'clock', settings: {} } },
      ]},
      { id: 'sc-brb', name: 'brb', label: '☕ BRB', widgets: [
        { type: 'background', label: 'Command BG', x: 0, y: 0, width: 1920, height: 1080, rotation: 0, opacity: 100, scale: 1, visible: true, locked: true, style: { background: 'linear-gradient(180deg,#040d14,#0b1e2e)' }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'background', settings: {} } },
        { type: 'text', label: 'System Pause', x: 310, y: 420, width: 1300, height: 120, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { fontSize: 56, fontColor: '#00ffd4', fontFamily: 'JetBrains Mono', fontWeight: '700', textAlign: 'center', glowColor: '#00ffd4', glowBlur: 16, letterSpacing: 6 }, animation: { type: 'pulse', duration: 3, delay: 0, loop: true }, content: { type: 'text', settings: { text: '// SYSTEM_PAUSE: BE_RIGHT_BACK' } } },
      ]},
      { id: 'sc-ending', name: 'ending', label: '🎬 Ending', widgets: [
        { type: 'background', label: 'Command BG', x: 0, y: 0, width: 1920, height: 1080, rotation: 0, opacity: 100, scale: 1, visible: true, locked: true, style: { background: 'linear-gradient(180deg,#040d14,#0b1e2e)' }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'background', settings: {} } },
        { type: 'text', label: 'Mission Complete', x: 310, y: 380, width: 1300, height: 120, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { fontSize: 48, fontColor: '#00ffd4', fontFamily: 'JetBrains Mono', fontWeight: '700', textAlign: 'center', glowColor: '#00ffd4', glowBlur: 16 }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'text', settings: { text: '// MISSION_COMPLETE: TRANSMISSION_ENDED' } } },
      ]},
    ]
  },

  // ─── Retro Arcade ─────────────────────────────────────────────────────────────
  {
    id: 'pack-retro-arcade',
    name: 'Retro Arcade',
    desc: 'Pixel-perfect 8-bit nostalgia with CRT scanlines, vivid retro palette, chunky pixel borders, and chiptune-era charm.',
    category: 'Arcade',
    accentColor: '#ffdd00',
    bgColors: ['#0a0014', '#150028'],
    fontFamily: 'Space Grotesk',
    borderRadius: 0,
    borderStyle: 'dashed',
    borderColor: '#ffdd00',
    glowColor: '#ffdd00',
    glowBlur: 12,
    themeClass: 'theme-cyber-synth',
    decorations: ['🕹️ Joystick Pixel', '👾 Space Invader', '🏆 High Score Trophy'],
    tags: ['retro', 'arcade', '8bit', 'pixel', 'gaming'],
    scenes: [
      { id: 'ra-starting', name: 'starting-soon', label: '⏳ Starting Soon', widgets: [
        { type: 'background', label: 'Arcade BG', x: 0, y: 0, width: 1920, height: 1080, rotation: 0, opacity: 100, scale: 1, visible: true, locked: true, style: { background: 'linear-gradient(180deg,#0a0014,#150028)' }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'background', settings: {} } },
        { type: 'glass-panel', label: 'Pixel Frame', x: 440, y: 220, width: 1040, height: 640, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { background: 'rgba(15,0,40,0.8)', borderRadius: 0, borderSize: 3, borderColor: '#ffdd00', glowColor: '#ffdd00', glowBlur: 16 }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'glass-panel', settings: {} } },
        { type: 'text', label: 'INSERT COIN', x: 490, y: 290, width: 940, height: 60, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { fontSize: 28, fontColor: '#ffdd00', fontFamily: 'Space Grotesk', fontWeight: '900', textAlign: 'center', letterSpacing: 6, glowColor: '#ffdd00', glowBlur: 12 }, animation: { type: 'pulse', duration: 0.8, delay: 0, loop: true }, content: { type: 'text', settings: { text: 'INSERT COIN TO CONTINUE' } } },
        { type: 'countdown-timer', label: 'Pixel Timer', x: 490, y: 390, width: 940, height: 200, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { fontSize: 110, fontColor: '#fff', fontFamily: 'Space Grotesk', fontWeight: '900', textAlign: 'center' }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'countdown-timer', settings: { duration: 600 } } },
      ]},
      { id: 'ra-chatting', name: 'just-chatting', label: '💬 Just Chatting', widgets: [
        { type: 'background', label: 'Arcade BG', x: 0, y: 0, width: 1920, height: 1080, rotation: 0, opacity: 100, scale: 1, visible: true, locked: true, style: { background: 'linear-gradient(180deg,#0a0014,#150028)' }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'background', settings: {} } },
        { type: 'camera-frame', label: 'Player 1 Cam', x: 40, y: 40, width: 1200, height: 680, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { borderRadius: 0, borderSize: 3, borderColor: '#ffdd00', glowColor: '#ffdd00', glowBlur: 12 }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'camera-frame', settings: { frameLabel: 'PLAYER 1' } } },
        { type: 'chat-box', label: 'Chat Feed', x: 1280, y: 40, width: 600, height: 880, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { background: 'rgba(10,0,20,0.9)', borderRadius: 0, borderSize: 2, borderColor: '#ffdd00', padding: 14 }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'chat-box', settings: { maxMessages: 16 } } },
      ]},
      { id: 'ra-brb', name: 'brb', label: '☕ BRB', widgets: [
        { type: 'background', label: 'Arcade BG', x: 0, y: 0, width: 1920, height: 1080, rotation: 0, opacity: 100, scale: 1, visible: true, locked: true, style: { background: 'linear-gradient(180deg,#0a0014,#150028)' }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'background', settings: {} } },
        { type: 'text', label: 'PAUSED', x: 310, y: 400, width: 1300, height: 160, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { fontSize: 120, fontColor: '#ffdd00', fontFamily: 'Space Grotesk', fontWeight: '900', textAlign: 'center', glowColor: '#ffdd00', glowBlur: 20 }, animation: { type: 'pulse', duration: 1, delay: 0, loop: true }, content: { type: 'text', settings: { text: 'PAUSED' } } },
      ]},
      { id: 'ra-ending', name: 'ending', label: '🎬 Ending', widgets: [
        { type: 'background', label: 'Arcade BG', x: 0, y: 0, width: 1920, height: 1080, rotation: 0, opacity: 100, scale: 1, visible: true, locked: true, style: { background: 'linear-gradient(180deg,#0a0014,#150028)' }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'background', settings: {} } },
        { type: 'text', label: 'GAME OVER', x: 310, y: 340, width: 1300, height: 140, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { fontSize: 100, fontColor: '#ffdd00', fontFamily: 'Space Grotesk', fontWeight: '900', textAlign: 'center', glowColor: '#ffdd00', glowBlur: 20 }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'text', settings: { text: 'GAME OVER' } } },
        { type: 'text', label: 'Thanks', x: 460, y: 520, width: 1000, height: 60, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { fontSize: 24, fontColor: '#ffffff', fontFamily: 'Space Grotesk', fontWeight: '600', textAlign: 'center', letterSpacing: 4 }, animation: { type: 'pulse', duration: 2, delay: 0, loop: true }, content: { type: 'text', settings: { text: 'THANKS FOR PLAYING' } } },
      ]},
    ]
  },

  // ─── Dark Neon ───────────────────────────────────────────────────────────────
  {
    id: 'pack-dark-neon',
    name: 'Dark Neon',
    desc: 'Deep midnight purple with aggressive neon gradients, explosive glow effects, and bold layered compositions for high-energy content.',
    category: 'Cyberpunk',
    accentColor: '#bf00ff',
    bgColors: ['#050011', '#160030'],
    fontFamily: 'Space Grotesk',
    borderRadius: 8,
    borderStyle: 'solid',
    borderColor: '#bf00ff',
    glowColor: '#bf00ff',
    glowBlur: 24,
    themeClass: 'theme-cyber-synth',
    decorations: ['🔮 Crystal Orb', '⚡ Lightning Bolt', '🌀 Vortex Spiral'],
    tags: ['neon', 'cyberpunk', 'purple', 'dark', 'glow'],
    scenes: [
      { id: 'dn-starting', name: 'starting-soon', label: '⏳ Starting Soon', widgets: [
        { type: 'background', label: 'Neon BG', x: 0, y: 0, width: 1920, height: 1080, rotation: 0, opacity: 100, scale: 1, visible: true, locked: true, style: { background: 'linear-gradient(135deg,#050011,#160030)' }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'background', settings: {} } },
        { type: 'glass-panel', label: 'Neon Container', x: 380, y: 180, width: 1160, height: 720, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { background: 'rgba(15,0,40,0.7)', borderRadius: 8, borderSize: 2, borderColor: '#bf00ff', glowColor: '#bf00ff', glowBlur: 30 }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'glass-panel', settings: {} } },
        { type: 'text', label: 'Neon Title', x: 430, y: 260, width: 1060, height: 90, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { fontSize: 48, fontColor: '#bf00ff', fontFamily: 'Space Grotesk', fontWeight: '900', textAlign: 'center', letterSpacing: 4, glowColor: '#bf00ff', glowBlur: 20 }, animation: { type: 'pulse', duration: 2, delay: 0, loop: true }, content: { type: 'text', settings: { text: 'GOING LIVE' } } },
        { type: 'countdown-timer', label: 'Neon Countdown', x: 430, y: 390, width: 1060, height: 220, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { fontSize: 130, fontColor: '#e880ff', fontFamily: 'Space Grotesk', fontWeight: '900', textAlign: 'center', glowColor: '#bf00ff', glowBlur: 24 }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'countdown-timer', settings: { duration: 600 } } },
      ]},
      { id: 'dn-chatting', name: 'just-chatting', label: '💬 Just Chatting', widgets: [
        { type: 'background', label: 'Neon BG', x: 0, y: 0, width: 1920, height: 1080, rotation: 0, opacity: 100, scale: 1, visible: true, locked: true, style: { background: 'linear-gradient(135deg,#050011,#160030)' }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'background', settings: {} } },
        { type: 'camera-frame', label: 'Neon Cam', x: 40, y: 40, width: 1200, height: 680, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { borderRadius: 8, borderSize: 2, borderColor: '#bf00ff', glowColor: '#bf00ff', glowBlur: 20 }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'camera-frame', settings: { frameLabel: 'LIVE' } } },
        { type: 'chat-box', label: 'Neon Chat', x: 1280, y: 40, width: 600, height: 880, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { background: 'rgba(5,0,17,0.9)', borderRadius: 8, borderSize: 1, borderColor: '#bf00ff', padding: 16, glowColor: '#bf00ff', glowBlur: 8 }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'chat-box', settings: { maxMessages: 16 } } },
      ]},
      { id: 'dn-brb', name: 'brb', label: '☕ BRB', widgets: [
        { type: 'background', label: 'Neon BG', x: 0, y: 0, width: 1920, height: 1080, rotation: 0, opacity: 100, scale: 1, visible: true, locked: true, style: { background: 'linear-gradient(135deg,#050011,#160030)' }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'background', settings: {} } },
        { type: 'text', label: 'BRB Neon', x: 310, y: 400, width: 1300, height: 160, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { fontSize: 100, fontColor: '#bf00ff', fontFamily: 'Space Grotesk', fontWeight: '900', textAlign: 'center', glowColor: '#bf00ff', glowBlur: 30 }, animation: { type: 'pulse', duration: 2, delay: 0, loop: true }, content: { type: 'text', settings: { text: 'BRB' } } },
      ]},
      { id: 'dn-ending', name: 'ending', label: '🎬 Ending', widgets: [
        { type: 'background', label: 'Neon BG', x: 0, y: 0, width: 1920, height: 1080, rotation: 0, opacity: 100, scale: 1, visible: true, locked: true, style: { background: 'linear-gradient(135deg,#050011,#160030)' }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'background', settings: {} } },
        { type: 'text', label: 'Outro', x: 310, y: 380, width: 1300, height: 120, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { fontSize: 60, fontColor: '#e880ff', fontFamily: 'Space Grotesk', fontWeight: '900', textAlign: 'center', glowColor: '#bf00ff', glowBlur: 20 }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'text', settings: { text: 'See You Next Time 🔮' } } },
        { type: 'social-links', label: 'Socials', x: 660, y: 560, width: 600, height: 48, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { background: 'transparent' }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'social-links', settings: {} } },
      ]},
    ]
  },

  // ─── Podcast Pro ─────────────────────────────────────────────────────────────
  {
    id: 'pack-podcast-pro',
    name: 'Podcast Pro',
    desc: 'Studio-grade broadcast aesthetic with warm neutrals, clean typography, professional lower thirds, and minimal chrome for talk show content.',
    category: 'Podcast',
    accentColor: '#ff6b35',
    bgColors: ['#0f0d0b', '#1e1a16'],
    fontFamily: 'Inter',
    borderRadius: 4,
    borderStyle: 'solid',
    borderColor: '#ff6b35',
    themeClass: 'theme-luxury-gold',
    decorations: ['🎙️ Microphone Icon', '📻 Radio Badge', '🔴 On Air Light'],
    tags: ['podcast', 'talkshow', 'interview', 'studio', 'warm'],
    scenes: [
      { id: 'pp-starting', name: 'starting-soon', label: '⏳ Starting Soon', widgets: [
        { type: 'background', label: 'Studio BG', x: 0, y: 0, width: 1920, height: 1080, rotation: 0, opacity: 100, scale: 1, visible: true, locked: true, style: { background: 'linear-gradient(160deg,#0f0d0b,#1e1a16)' }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'background', settings: {} } },
        { type: 'glass-panel', label: 'Studio Card', x: 440, y: 240, width: 1040, height: 600, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { background: 'rgba(20,16,12,0.85)', borderRadius: 4, borderSize: 1, borderColor: '#ff6b35' }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'glass-panel', settings: {} } },
        { type: 'text', label: 'Show Title', x: 490, y: 300, width: 940, height: 70, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { fontSize: 36, fontColor: '#ff6b35', fontFamily: 'Inter', fontWeight: '800', textAlign: 'center', letterSpacing: 2 }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'text', settings: { text: 'THE SHOW STARTS SOON' } } },
        { type: 'countdown-timer', label: 'Studio Timer', x: 490, y: 400, width: 940, height: 180, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { fontSize: 90, fontColor: '#ffffff', fontFamily: 'Inter', fontWeight: '300', textAlign: 'center' }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'countdown-timer', settings: { duration: 600 } } },
        { type: 'badge', label: 'On Air Icon', x: 480, y: 240, width: 36, height: 36, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { background: '#ff6b35', borderRadius: 4, fontSize: 14, textAlign: 'center' }, animation: { type: 'pulse', duration: 1, delay: 0, loop: true }, content: { type: 'badge', settings: { badgeText: '●' } } },
      ]},
      { id: 'pp-chatting', name: 'just-chatting', label: '💬 Just Chatting', widgets: [
        { type: 'background', label: 'Studio BG', x: 0, y: 0, width: 1920, height: 1080, rotation: 0, opacity: 100, scale: 1, visible: true, locked: true, style: { background: 'linear-gradient(160deg,#0f0d0b,#1e1a16)' }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'background', settings: {} } },
        { type: 'camera-frame', label: 'Studio Cam', x: 40, y: 60, width: 1180, height: 664, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { borderRadius: 4, borderSize: 1, borderColor: '#ff6b35' }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'camera-frame', settings: { frameLabel: 'LIVE BROADCAST' } } },
        { type: 'chat-box', label: 'Audience Chat', x: 1260, y: 60, width: 620, height: 840, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { background: 'rgba(15,13,11,0.9)', borderRadius: 4, borderSize: 1, borderColor: '#ff6b35', padding: 16 }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'chat-box', settings: { maxMessages: 15 } } },
        { type: 'spotify', label: 'Background Music', x: 40, y: 780, width: 440, height: 80, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { background: 'rgba(20,16,12,0.85)', borderRadius: 4, borderSize: 1, borderColor: '#ff6b35', padding: 12 }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'spotify', settings: {} } },
      ]},
      { id: 'pp-brb', name: 'brb', label: '☕ BRB', widgets: [
        { type: 'background', label: 'Studio BG', x: 0, y: 0, width: 1920, height: 1080, rotation: 0, opacity: 100, scale: 1, visible: true, locked: true, style: { background: 'linear-gradient(160deg,#0f0d0b,#1e1a16)' }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'background', settings: {} } },
        { type: 'text', label: 'Station Break', x: 360, y: 420, width: 1200, height: 140, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { fontSize: 64, fontColor: '#ffffff', fontFamily: 'Inter', fontWeight: '300', textAlign: 'center' }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'text', settings: { text: 'Station Break — Back Shortly' } } },
      ]},
      { id: 'pp-ending', name: 'ending', label: '🎬 Ending', widgets: [
        { type: 'background', label: 'Studio BG', x: 0, y: 0, width: 1920, height: 1080, rotation: 0, opacity: 100, scale: 1, visible: true, locked: true, style: { background: 'linear-gradient(160deg,#0f0d0b,#1e1a16)' }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'background', settings: {} } },
        { type: 'text', label: 'Sign Off', x: 310, y: 380, width: 1300, height: 120, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { fontSize: 52, fontColor: '#ffffff', fontFamily: 'Inter', fontWeight: '300', textAlign: 'center' }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'text', settings: { text: 'Thanks for tuning in.' } } },
        { type: 'social-links', label: 'Follow Us', x: 660, y: 540, width: 600, height: 48, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { background: 'transparent' }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'social-links', settings: {} } },
      ]},
    ]
  },

  // ─── Apple Studio ─────────────────────────────────────────────────────────────
  {
    id: 'pack-apple-studio',
    name: 'Apple Studio',
    desc: 'macOS-inspired ultra-clean interface with SF Pro-style typography, frosted glass surfaces, pastel shadows, and surgical whitespace.',
    category: 'Premium',
    accentColor: '#007aff',
    bgColors: ['#0d0d0f', '#1c1c1e'],
    fontFamily: 'Inter',
    borderRadius: 14,
    borderStyle: 'solid',
    borderColor: 'rgba(255,255,255,0.12)',
    glowColor: 'rgba(0,122,255,0.2)',
    glowBlur: 20,
    themeClass: 'theme-glassmorphism',
    decorations: ['🍎 Apple Monochrome', '⌨️ Keyboard Cutout', '🖥️ Display Frame'],
    tags: ['apple', 'macos', 'clean', 'premium', 'minimal'],
    scenes: [
      { id: 'as-starting', name: 'starting-soon', label: '⏳ Starting Soon', widgets: [
        { type: 'background', label: 'macOS BG', x: 0, y: 0, width: 1920, height: 1080, rotation: 0, opacity: 100, scale: 1, visible: true, locked: true, style: { background: 'linear-gradient(180deg,#0d0d0f,#1c1c1e)' }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'background', settings: {} } },
        { type: 'glass-panel', label: 'macOS Window', x: 440, y: 220, width: 1040, height: 640, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { background: 'rgba(255,255,255,0.04)', borderRadius: 16, borderSize: 1, borderColor: 'rgba(255,255,255,0.1)', glassEffect: true, blur: 24, shadowBlur: 40, shadowColor: 'rgba(0,0,0,0.5)' }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'glass-panel', settings: {} } },
        { type: 'text', label: 'SF Label', x: 490, y: 300, width: 940, height: 50, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { fontSize: 14, fontColor: 'rgba(255,255,255,0.5)', fontFamily: 'Inter', fontWeight: '500', letterSpacing: 3, textAlign: 'center', textTransform: 'uppercase' }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'text', settings: { text: 'Live Stream Begins in' } } },
        { type: 'countdown-timer', label: 'Clean Timer', x: 490, y: 370, width: 940, height: 200, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { fontSize: 100, fontColor: '#ffffff', fontFamily: 'Inter', fontWeight: '200', textAlign: 'center' }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'countdown-timer', settings: { duration: 600 } } },
        { type: 'divider', label: 'Separator', x: 640, y: 590, width: 640, height: 1, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { background: 'rgba(255,255,255,0.1)', borderSize: 0 }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'divider', settings: {} } },
      ]},
      { id: 'as-chatting', name: 'just-chatting', label: '💬 Just Chatting', widgets: [
        { type: 'background', label: 'macOS BG', x: 0, y: 0, width: 1920, height: 1080, rotation: 0, opacity: 100, scale: 1, visible: true, locked: true, style: { background: 'linear-gradient(180deg,#0d0d0f,#1c1c1e)' }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'background', settings: {} } },
        { type: 'camera-frame', label: 'Studio Cam', x: 60, y: 80, width: 1100, height: 620, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { borderRadius: 16, borderSize: 1, borderColor: 'rgba(255,255,255,0.12)', shadowBlur: 30, shadowColor: 'rgba(0,0,0,0.5)' }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'camera-frame', settings: {} } },
        { type: 'chat-box', label: 'Messages Panel', x: 1220, y: 80, width: 660, height: 840, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { background: 'rgba(255,255,255,0.03)', borderRadius: 16, borderSize: 1, borderColor: 'rgba(255,255,255,0.08)', padding: 20, glassEffect: true, blur: 16 }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'chat-box', settings: { maxMessages: 15 } } },
      ]},
      { id: 'as-brb', name: 'brb', label: '☕ BRB', widgets: [
        { type: 'background', label: 'macOS BG', x: 0, y: 0, width: 1920, height: 1080, rotation: 0, opacity: 100, scale: 1, visible: true, locked: true, style: { background: 'linear-gradient(180deg,#0d0d0f,#1c1c1e)' }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'background', settings: {} } },
        { type: 'text', label: 'BRB Clean', x: 360, y: 430, width: 1200, height: 140, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { fontSize: 72, fontColor: 'rgba(255,255,255,0.85)', fontFamily: 'Inter', fontWeight: '200', textAlign: 'center', letterSpacing: 2 }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'text', settings: { text: 'Be Right Back' } } },
      ]},
      { id: 'as-ending', name: 'ending', label: '🎬 Ending', widgets: [
        { type: 'background', label: 'macOS BG', x: 0, y: 0, width: 1920, height: 1080, rotation: 0, opacity: 100, scale: 1, visible: true, locked: true, style: { background: 'linear-gradient(180deg,#0d0d0f,#1c1c1e)' }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'background', settings: {} } },
        { type: 'text', label: 'Goodbye', x: 310, y: 400, width: 1300, height: 100, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { fontSize: 48, fontColor: 'rgba(255,255,255,0.85)', fontFamily: 'Inter', fontWeight: '200', textAlign: 'center' }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'text', settings: { text: 'Until next time.' } } },
      ]},
    ]
  },

  // ─── Space Station ───────────────────────────────────────────────────────────
  {
    id: 'pack-space-station',
    name: 'Space Station',
    desc: 'Deep cosmos broadcasting from orbit — star-studded navy backgrounds, mission patch aesthetics, and astronaut-grade typography.',
    category: 'Sci-Fi',
    accentColor: '#4fc3f7',
    bgColors: ['#010614', '#030f2a'],
    fontFamily: 'Space Grotesk',
    borderRadius: 6,
    borderStyle: 'solid',
    borderColor: '#4fc3f7',
    glowColor: '#4fc3f7',
    glowBlur: 12,
    themeClass: 'theme-esports-blue',
    decorations: ['🚀 Rocket Badge', '🌌 Galaxy Overlay', '⭐ Star Cluster'],
    tags: ['space', 'cosmos', 'nasa', 'astronaut', 'scifi'],
    scenes: [
      { id: 'ss-starting', name: 'starting-soon', label: '⏳ Starting Soon', widgets: [
        { type: 'background', label: 'Space BG', x: 0, y: 0, width: 1920, height: 1080, rotation: 0, opacity: 100, scale: 1, visible: true, locked: true, style: { background: 'linear-gradient(180deg,#010614,#030f2a)' }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'background', settings: {} } },
        { type: 'glass-panel', label: 'Orbital Panel', x: 460, y: 240, width: 1000, height: 600, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { background: 'rgba(1,6,20,0.8)', borderRadius: 6, borderSize: 1, borderColor: '#4fc3f7', glowColor: '#4fc3f7', glowBlur: 12 }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'glass-panel', settings: {} } },
        { type: 'text', label: 'Launch Title', x: 510, y: 310, width: 900, height: 60, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { fontSize: 20, fontColor: '#4fc3f7', fontFamily: 'Space Grotesk', fontWeight: '700', textAlign: 'center', letterSpacing: 5 }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'text', settings: { text: 'T-MINUS' } } },
        { type: 'countdown-timer', label: 'Launch Countdown', x: 510, y: 400, width: 900, height: 200, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { fontSize: 110, fontColor: '#ffffff', fontFamily: 'Space Grotesk', fontWeight: '700', textAlign: 'center', glowColor: '#4fc3f7', glowBlur: 12 }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'countdown-timer', settings: { duration: 600 } } },
        { type: 'badge', label: 'Rocket Badge', x: 1360, y: 730, width: 80, height: 80, rotation: -20, opacity: 100, scale: 1, visible: true, locked: false, style: { fontSize: 44, textAlign: 'center' }, animation: { type: 'float', duration: 5, delay: 0, loop: true }, content: { type: 'badge', settings: { badgeText: '🚀' } } },
      ]},
      { id: 'ss-chatting', name: 'just-chatting', label: '💬 Just Chatting', widgets: [
        { type: 'background', label: 'Space BG', x: 0, y: 0, width: 1920, height: 1080, rotation: 0, opacity: 100, scale: 1, visible: true, locked: true, style: { background: 'linear-gradient(180deg,#010614,#030f2a)' }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'background', settings: {} } },
        { type: 'camera-frame', label: 'Orbital Cam', x: 40, y: 60, width: 1200, height: 680, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { borderRadius: 6, borderSize: 1, borderColor: '#4fc3f7', glowColor: '#4fc3f7', glowBlur: 10 }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'camera-frame', settings: { frameLabel: 'COSMONAUT CAM' } } },
        { type: 'chat-box', label: 'Comms Log', x: 1280, y: 60, width: 600, height: 860, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { background: 'rgba(1,6,20,0.9)', borderRadius: 6, borderSize: 1, borderColor: '#4fc3f7', padding: 14 }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'chat-box', settings: { maxMessages: 16 } } },
      ]},
      { id: 'ss-brb', name: 'brb', label: '☕ BRB', widgets: [
        { type: 'background', label: 'Space BG', x: 0, y: 0, width: 1920, height: 1080, rotation: 0, opacity: 100, scale: 1, visible: true, locked: true, style: { background: 'linear-gradient(180deg,#010614,#030f2a)' }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'background', settings: {} } },
        { type: 'text', label: 'Orbit Text', x: 310, y: 420, width: 1300, height: 140, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { fontSize: 72, fontColor: '#4fc3f7', fontFamily: 'Space Grotesk', fontWeight: '700', textAlign: 'center', glowColor: '#4fc3f7', glowBlur: 16 }, animation: { type: 'float', duration: 6, delay: 0, loop: true }, content: { type: 'text', settings: { text: 'In Orbit — Be Right Back' } } },
      ]},
      { id: 'ss-ending', name: 'ending', label: '🎬 Ending', widgets: [
        { type: 'background', label: 'Space BG', x: 0, y: 0, width: 1920, height: 1080, rotation: 0, opacity: 100, scale: 1, visible: true, locked: true, style: { background: 'linear-gradient(180deg,#010614,#030f2a)' }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'background', settings: {} } },
        { type: 'text', label: 'Mission Over', x: 310, y: 390, width: 1300, height: 120, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { fontSize: 52, fontColor: '#ffffff', fontFamily: 'Space Grotesk', fontWeight: '300', textAlign: 'center' }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'text', settings: { text: 'Transmission complete. Ad astra. 🌌' } } },
      ]},
    ]
  },

  // ─── Creator Minimal ─────────────────────────────────────────────────────────
  {
    id: 'pack-creator-minimal',
    name: 'Creator Minimal',
    desc: 'Pure editorial minimalism — off-white accents, a single tasteful line, and total absence of decorative noise for distraction-free viewer focus.',
    category: 'Minimal',
    accentColor: '#e4e4e7',
    bgColors: ['#08080a', '#111113'],
    fontFamily: 'Inter',
    borderRadius: 0,
    borderStyle: 'solid',
    borderColor: '#27272a',
    themeClass: 'theme-minimal-dark',
    decorations: ['— Em Dash Mark', '· Bullet Point Accent'],
    tags: ['minimal', 'editorial', 'clean', 'typography', 'creator'],
    scenes: [
      { id: 'cm-starting', name: 'starting-soon', label: '⏳ Starting Soon', widgets: [
        { type: 'background', label: 'Clean BG', x: 0, y: 0, width: 1920, height: 1080, rotation: 0, opacity: 100, scale: 1, visible: true, locked: true, style: { background: '#09090b' }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'background', settings: {} } },
        { type: 'text', label: 'Starting', x: 510, y: 430, width: 900, height: 80, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { fontSize: 24, fontColor: 'rgba(255,255,255,0.85)', fontFamily: 'Inter', fontWeight: '400', textAlign: 'center', letterSpacing: 6, textTransform: 'uppercase' }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'text', settings: { text: 'Starting Shortly' } } },
        { type: 'divider', label: 'Line Mark', x: 760, y: 536, width: 400, height: 1, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { background: 'rgba(255,255,255,0.15)', borderSize: 0 }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'divider', settings: {} } },
        { type: 'countdown-timer', label: 'Time', x: 510, y: 560, width: 900, height: 120, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { fontSize: 56, fontColor: 'rgba(255,255,255,0.4)', fontFamily: 'Inter', fontWeight: '300', textAlign: 'center' }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'countdown-timer', settings: { duration: 600 } } },
      ]},
      { id: 'cm-chatting', name: 'just-chatting', label: '💬 Just Chatting', widgets: [
        { type: 'background', label: 'Clean BG', x: 0, y: 0, width: 1920, height: 1080, rotation: 0, opacity: 100, scale: 1, visible: true, locked: true, style: { background: '#09090b' }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'background', settings: {} } },
        { type: 'camera-frame', label: 'Creator Cam', x: 40, y: 40, width: 1240, height: 698, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { borderRadius: 0, borderSize: 1, borderColor: '#27272a' }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'camera-frame', settings: {} } },
        { type: 'chat-box', label: 'Minimal Chat', x: 1320, y: 40, width: 560, height: 860, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { background: 'transparent', borderRadius: 0, borderSize: 0, padding: 12 }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'chat-box', settings: { maxMessages: 18 } } },
      ]},
      { id: 'cm-brb', name: 'brb', label: '☕ BRB', widgets: [
        { type: 'background', label: 'Clean BG', x: 0, y: 0, width: 1920, height: 1080, rotation: 0, opacity: 100, scale: 1, visible: true, locked: true, style: { background: '#09090b' }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'background', settings: {} } },
        { type: 'text', label: 'One Moment', x: 460, y: 450, width: 1000, height: 120, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { fontSize: 36, fontColor: 'rgba(255,255,255,0.6)', fontFamily: 'Inter', fontWeight: '300', textAlign: 'center', letterSpacing: 4 }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'text', settings: { text: 'One moment.' } } },
      ]},
      { id: 'cm-ending', name: 'ending', label: '🎬 Ending', widgets: [
        { type: 'background', label: 'Clean BG', x: 0, y: 0, width: 1920, height: 1080, rotation: 0, opacity: 100, scale: 1, visible: true, locked: true, style: { background: '#09090b' }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'background', settings: {} } },
        { type: 'text', label: 'That is all', x: 310, y: 440, width: 1300, height: 100, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { fontSize: 36, fontColor: 'rgba(255,255,255,0.6)', fontFamily: 'Inter', fontWeight: '300', textAlign: 'center', letterSpacing: 2 }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'text', settings: { text: "That's all for today." } } },
      ]},
    ]
  },

  // ─── Racing HUD ──────────────────────────────────────────────────────────────
  {
    id: 'pack-racing-hud',
    name: 'Racing HUD',
    desc: 'Carbon fiber aesthetics, McLaren-orange telemetry panels, speedometer-style data widgets, and aggressive motorsport design language.',
    category: 'Racing',
    accentColor: '#ff6600',
    bgColors: ['#080808', '#181818'],
    fontFamily: 'Space Grotesk',
    borderRadius: 2,
    borderStyle: 'solid',
    borderColor: '#ff6600',
    glowColor: '#ff6600',
    glowBlur: 12,
    themeClass: 'theme-mclaren',
    decorations: ['🏎️ Racing Car Graphic', '🏁 Checkered Flag', '🔥 Flame Badge'],
    tags: ['racing', 'motorsport', 'f1', 'speed', 'carbon'],
    scenes: [
      { id: 'rh-starting', name: 'starting-soon', label: '⏳ Starting Soon', widgets: [
        { type: 'background', label: 'Carbon BG', x: 0, y: 0, width: 1920, height: 1080, rotation: 0, opacity: 100, scale: 1, visible: true, locked: true, style: { background: 'linear-gradient(135deg,#080808,#181818)' }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'background', settings: {} } },
        { type: 'glass-panel', label: 'Telemetry Panel', x: 380, y: 200, width: 1160, height: 680, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { background: 'rgba(10,6,4,0.85)', borderRadius: 2, borderSize: 2, borderColor: '#ff6600', glowColor: '#ff6600', glowBlur: 16 }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'glass-panel', settings: {} } },
        { type: 'text', label: 'Race Title', x: 430, y: 280, width: 1060, height: 70, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { fontSize: 36, fontColor: '#ff6600', fontFamily: 'Space Grotesk', fontWeight: '900', textAlign: 'center', letterSpacing: 6, textTransform: 'uppercase' }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'text', settings: { text: 'RACE BROADCAST STARTING' } } },
        { type: 'countdown-timer', label: 'Race Countdown', x: 430, y: 390, width: 1060, height: 200, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { fontSize: 120, fontColor: '#ffffff', fontFamily: 'Space Grotesk', fontWeight: '900', textAlign: 'center' }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'countdown-timer', settings: { duration: 600 } } },
      ]},
      { id: 'rh-chatting', name: 'just-chatting', label: '💬 Just Chatting', widgets: [
        { type: 'background', label: 'Carbon BG', x: 0, y: 0, width: 1920, height: 1080, rotation: 0, opacity: 100, scale: 1, visible: true, locked: true, style: { background: 'linear-gradient(135deg,#080808,#181818)' }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'background', settings: {} } },
        { type: 'camera-frame', label: 'Driver Cam', x: 40, y: 40, width: 1200, height: 680, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { borderRadius: 2, borderSize: 2, borderColor: '#ff6600', glowColor: '#ff6600', glowBlur: 12 }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'camera-frame', settings: { frameLabel: 'DRIVER CAM' } } },
        { type: 'chat-box', label: 'Pit Lane Chat', x: 1280, y: 40, width: 600, height: 880, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { background: 'rgba(8,8,8,0.9)', borderRadius: 2, borderSize: 1, borderColor: '#ff6600', padding: 14 }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'chat-box', settings: { maxMessages: 16 } } },
      ]},
      { id: 'rh-brb', name: 'brb', label: '☕ BRB', widgets: [
        { type: 'background', label: 'Carbon BG', x: 0, y: 0, width: 1920, height: 1080, rotation: 0, opacity: 100, scale: 1, visible: true, locked: true, style: { background: 'linear-gradient(135deg,#080808,#181818)' }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'background', settings: {} } },
        { type: 'text', label: 'Pit Stop', x: 310, y: 400, width: 1300, height: 160, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { fontSize: 90, fontColor: '#ff6600', fontFamily: 'Space Grotesk', fontWeight: '900', textAlign: 'center', glowColor: '#ff6600', glowBlur: 16 }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'text', settings: { text: 'PIT STOP' } } },
      ]},
      { id: 'rh-ending', name: 'ending', label: '🎬 Ending', widgets: [
        { type: 'background', label: 'Carbon BG', x: 0, y: 0, width: 1920, height: 1080, rotation: 0, opacity: 100, scale: 1, visible: true, locked: true, style: { background: 'linear-gradient(135deg,#080808,#181818)' }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'background', settings: {} } },
        { type: 'text', label: 'Chequered Flag', x: 310, y: 380, width: 1300, height: 120, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { fontSize: 60, fontColor: '#ffffff', fontFamily: 'Space Grotesk', fontWeight: '700', textAlign: 'center' }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'text', settings: { text: 'Race Complete 🏁 Thanks for watching!' } } },
      ]},
    ]
  },

];

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
  // ─── Cyber Neon ────────────────────────────────────────────────────────────
  {
    id: 'pack-cyber-neon',
    name: 'Cyber Neon',
    desc: 'High-contrast neon styling with monospace indicators, cyberpunk grid lines, and glowing cyan overlays.',
    category: 'Cyberpunk',
    accentColor: '#ff00ff',
    bgColors: ['#07050f', '#140526'],
    fontFamily: 'JetBrains Mono',
    borderRadius: 4,
    borderStyle: 'solid',
    borderColor: '#ff00ff',
    glowColor: '#ff00ff',
    glowBlur: 16,
    themeClass: 'theme-cyber-synth',
    decorations: ['⚡ Glitch Hologram', '📟 Grid Overlay', '🔮 Crystal Orb'],
    scenes: [
      {
        id: 'scene-starting',
        name: 'starting-soon',
        label: '⏳ Starting Soon',
        widgets: [
          {
            type: 'background', label: 'Grid BG', x: 0, y: 0, width: 1920, height: 1080, rotation: 0, opacity: 100, scale: 1, visible: true, locked: true, style: { background: 'linear-gradient(135deg, #07050f 0%, #140526 100%)', borderSize: 0 }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'background', settings: {} }
          },
          {
            type: 'glass-panel', label: 'Glitch Frame', x: 460, y: 240, width: 1000, height: 600, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { background: 'rgba(20, 16, 44, 0.75)', borderRadius: 4, borderSize: 2, borderColor: '#ff00ff', glowColor: '#ff00ff', glowBlur: 20 }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'glass-panel', settings: {} }
          },
          {
            type: 'text', label: 'Cyber Header', x: 510, y: 280, width: 900, height: 60, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { fontSize: 24, fontColor: '#ff00ff', fontFamily: 'JetBrains Mono', fontWeight: '800', textAlign: 'center', letterSpacing: 4 }, animation: { type: 'pulse', duration: 2, delay: 0, loop: true }, content: { type: 'text', settings: { text: 'STREAM BROADCAST STARTING SOON' } }
          },
          {
            type: 'countdown-timer', label: 'Neon Timer', x: 560, y: 380, width: 800, height: 180, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { fontSize: 110, fontColor: '#5cffe2', fontFamily: 'JetBrains Mono', glowColor: '#5cffe2', glowBlur: 24, textAlign: 'center' }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'countdown-timer', settings: { duration: 300 } }
          },
          {
            type: 'clock', label: 'Monospace Clock', x: 510, y: 640, width: 900, height: 60, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { fontSize: 16, fontColor: 'rgba(255,255,255,0.4)', fontFamily: 'JetBrains Mono', textAlign: 'center' }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'clock', settings: {} }
          }
        ]
      },
      {
        id: 'scene-chatting',
        name: 'just-chatting',
        label: '💬 Just Chatting',
        widgets: [
          {
            type: 'background', label: 'Grid BG', x: 0, y: 0, width: 1920, height: 1080, rotation: 0, opacity: 100, scale: 1, visible: true, locked: true, style: { background: 'linear-gradient(135deg, #07050f 0%, #140526 100%)', borderSize: 0 }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'background', settings: {} }
          },
          {
            type: 'camera-frame', label: 'Primary Cam Box', x: 60, y: 80, width: 1160, height: 650, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { borderSize: 3, borderColor: '#ff00ff', glowColor: '#ff00ff', glowBlur: 16, borderRadius: 4 }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'camera-frame', settings: { frameLabel: 'PRIMARY CAMERA' } }
          },
          {
            type: 'chat-box', label: 'Glitch Chat Box', x: 1260, y: 80, width: 600, height: 860, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { background: 'rgba(14, 8, 26, 0.88)', borderSize: 1, borderColor: '#5cffe2', glowColor: '#5cffe2', glowBlur: 10, borderRadius: 4, padding: 16 }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'chat-box', settings: { maxMessages: 16 } }
          },
          {
            type: 'spotify', label: 'Music Widget', x: 60, y: 770, width: 460, height: 90, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { background: 'rgba(14,8,26,0.85)', borderSize: 1, borderColor: '#ff00ff', borderRadius: 4, padding: 12 }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'spotify', settings: {} }
          },
          {
            type: 'social-links', label: 'Socials Row', x: 550, y: 795, width: 670, height: 48, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { background: 'transparent', borderSize: 0 }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'social-links', settings: {} }
          }
        ]
      },
      {
        id: 'scene-gameplay',
        name: 'gameplay',
        label: '🎮 Gameplay',
        widgets: [
          {
            type: 'background', label: 'Grid BG', x: 0, y: 0, width: 1920, height: 1080, rotation: 0, opacity: 100, scale: 1, visible: true, locked: true, style: { background: 'linear-gradient(135deg, #07050f 0%, #140526 100%)', borderSize: 0 }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'background', settings: {} }
          },
          {
            type: 'camera-frame', label: 'Corner Cam', x: 60, y: 60, width: 360, height: 210, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { borderSize: 2, borderColor: '#ff00ff', glowColor: '#ff00ff', glowBlur: 8, borderRadius: 4 }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'camera-frame', settings: { frameLabel: 'GAME CAM' } }
          },
          {
            type: 'goal-bar', label: 'Telemetry Goal', x: 450, y: 60, width: 400, height: 60, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { background: 'rgba(14,8,26,0.85)', borderSize: 1, borderColor: '#5cffe2', borderRadius: 4, fontColor: '#5cffe2' }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'goal-bar', settings: { current: 75, target: 100, label: 'Followers' } }
          }
        ]
      },
      {
        id: 'scene-brb',
        name: 'brb',
        label: '☕ BRB',
        widgets: [
          {
            type: 'background', label: 'Grid BG', x: 0, y: 0, width: 1920, height: 1080, rotation: 0, opacity: 100, scale: 1, visible: true, locked: true, style: { background: 'linear-gradient(135deg, #07050f 0%, #140526 100%)', borderSize: 0 }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'background', settings: {} }
          },
          {
            type: 'text', label: 'BRB Label', x: 310, y: 380, width: 1300, height: 200, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { fontSize: 130, fontColor: '#ff00ff', fontFamily: 'JetBrains Mono', fontWeight: '900', glowColor: '#ff00ff', glowBlur: 40, textAlign: 'center' }, animation: { type: 'pulse', duration: 3, delay: 0, loop: true }, content: { type: 'text', settings: { text: 'BE RIGHT BACK' } }
          },
          {
            type: 'text', label: 'BRB Subtext', x: 610, y: 620, width: 700, height: 60, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { fontSize: 18, fontColor: '#5cffe2', fontFamily: 'JetBrains Mono', letterSpacing: 8, textAlign: 'center' }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'text', settings: { text: 'Taking a short break' } }
          }
        ]
      },
      {
        id: 'scene-ending',
        name: 'ending',
        label: '🎬 Ending',
        widgets: [
          {
            type: 'background', label: 'Grid BG', x: 0, y: 0, width: 1920, height: 1080, rotation: 0, opacity: 100, scale: 1, visible: true, locked: true, style: { background: 'linear-gradient(135deg, #07050f 0%, #140526 100%)', borderSize: 0 }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'background', settings: {} }
          },
          {
            type: 'text', label: 'Ending Header', x: 310, y: 250, width: 1300, height: 120, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { fontSize: 72, fontColor: '#ff00ff', fontFamily: 'JetBrains Mono', fontWeight: '800', glowColor: '#ff00ff', glowBlur: 20, textAlign: 'center' }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'text', settings: { text: 'THANKS FOR WATCHING!' } }
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
            type: 'text', label: 'Next Schedule Value', x: 610, y: 660, width: 700, height: 90, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { fontSize: 40, fontColor: '#ffffff', fontFamily: 'JetBrains Mono', fontWeight: '700', textAlign: 'center' }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'text', settings: { text: 'Tomorrow @ 7:00 PM EST' } }
          }
        ]
      }
    ]
  },

  // ─── Glass Studio ──────────────────────────────────────────────────────────
  {
    id: 'pack-glass-studio',
    name: 'Glass Studio',
    desc: 'Deep frosted glass interfaces, rich backdrop blurs, violet ambient shadows, and clean typography.',
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
            type: 'background', label: 'Glass BG', x: 0, y: 0, width: 1920, height: 1080, rotation: 0, opacity: 100, scale: 1, visible: true, locked: true, style: { background: 'linear-gradient(135deg, #0a0515 0%, #1a1035 100%)', borderSize: 0 }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'background', settings: {} }
          },
          {
            type: 'glass-panel', label: 'Frosted Box', x: 480, y: 260, width: 960, height: 560, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { background: 'rgba(255, 255, 255, 0.04)', borderRadius: 24, borderSize: 1, borderColor: 'rgba(255,255,255,0.12)', glassEffect: true, blur: 20 }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'glass-panel', settings: {} }
          },
          {
            type: 'text', label: 'Starting Text', x: 530, y: 310, width: 860, height: 60, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { fontSize: 20, fontColor: 'rgba(255,255,255,0.6)', fontFamily: 'Inter', fontWeight: '600', letterSpacing: 6, textAlign: 'center', textTransform: 'uppercase' }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'text', settings: { text: 'Starting soon - stay tuned' } }
          },
          {
            type: 'countdown-timer', label: 'Glass Timer', x: 580, y: 390, width: 760, height: 180, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { fontSize: 100, fontColor: '#ffffff', fontFamily: 'Inter', fontWeight: '300', textAlign: 'center' }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'countdown-timer', settings: { duration: 600 } }
          }
        ]
      },
      {
        id: 'scene-chatting',
        name: 'just-chatting',
        label: '💬 Just Chatting',
        widgets: [
          {
            type: 'background', label: 'Glass BG', x: 0, y: 0, width: 1920, height: 1080, rotation: 0, opacity: 100, scale: 1, visible: true, locked: true, style: { background: 'linear-gradient(135deg, #0a0515 0%, #1a1035 100%)', borderSize: 0 }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'background', settings: {} }
          },
          {
            type: 'camera-frame', label: 'Frosted Camera Box', x: 80, y: 100, width: 1100, height: 620, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { borderRadius: 16, borderSize: 2, borderColor: 'rgba(255,255,255,0.2)', glowColor: 'rgba(192,132,252,0.2)', glowBlur: 16 }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'camera-frame', settings: { frameLabel: 'PREVIEW FEED' } }
          },
          {
            type: 'chat-box', label: 'Frosted Chat Box', x: 1220, y: 100, width: 620, height: 840, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { background: 'rgba(255,255,255,0.03)', borderRadius: 20, borderSize: 1, borderColor: 'rgba(255,255,255,0.1)', padding: 20, glassEffect: true, blur: 16 }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'chat-box', settings: { maxMessages: 15 } }
          },
          {
            type: 'spotify', label: 'Music Glass', x: 80, y: 770, width: 440, height: 90, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { background: 'rgba(255,255,255,0.04)', borderRadius: 30, padding: 14, borderSize: 1, borderColor: 'rgba(255,255,255,0.1)', glassEffect: true, blur: 12 }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'spotify', settings: {} }
          }
        ]
      },
      {
        id: 'scene-gameplay',
        name: 'gameplay',
        label: '🎮 Gameplay',
        widgets: [
          {
            type: 'background', label: 'Glass BG', x: 0, y: 0, width: 1920, height: 1080, rotation: 0, opacity: 100, scale: 1, visible: true, locked: true, style: { background: 'linear-gradient(135deg, #0a0515 0%, #1a1035 100%)', borderSize: 0 }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'background', settings: {} }
          },
          {
            type: 'camera-frame', label: 'Cozy Cam Box', x: 80, y: 80, width: 400, height: 240, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { borderRadius: 16, borderSize: 2, borderColor: 'rgba(255,255,255,0.15)', glowBlur: 8 }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'camera-frame', settings: {} }
          },
          {
            type: 'goal-bar', label: 'Goal Glass', x: 520, y: 80, width: 450, height: 60, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { background: 'rgba(255,255,255,0.04)', borderSize: 1, borderColor: 'rgba(255,255,255,0.1)', borderRadius: 12, fontColor: '#ffffff' }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'goal-bar', settings: { current: 60, target: 100, label: 'Subscribers' } }
          }
        ]
      },
      {
        id: 'scene-brb',
        name: 'brb',
        label: '☕ BRB',
        widgets: [
          {
            type: 'background', label: 'Glass BG', x: 0, y: 0, width: 1920, height: 1080, rotation: 0, opacity: 100, scale: 1, visible: true, locked: true, style: { background: 'linear-gradient(135deg, #0a0515 0%, #1a1035 100%)', borderSize: 0 }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'background', settings: {} }
          },
          {
            type: 'text', label: 'BRB Label', x: 310, y: 390, width: 1300, height: 180, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { fontSize: 110, fontColor: '#ffffff', fontFamily: 'Inter', fontWeight: '300', letterSpacing: 10, textAlign: 'center' }, animation: { type: 'float', duration: 3, delay: 0, loop: true }, content: { type: 'text', settings: { text: 'BE RIGHT BACK' } }
          }
        ]
      },
      {
        id: 'scene-ending',
        name: 'ending',
        label: '🎬 Ending',
        widgets: [
          {
            type: 'background', label: 'Glass BG', x: 0, y: 0, width: 1920, height: 1080, rotation: 0, opacity: 100, scale: 1, visible: true, locked: true, style: { background: 'linear-gradient(135deg, #0a0515 0%, #1a1035 100%)', borderSize: 0 }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'background', settings: {} }
          },
          {
            type: 'text', label: 'Credits Title', x: 310, y: 280, width: 1300, height: 100, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { fontSize: 60, fontColor: '#ffffff', fontFamily: 'Inter', fontWeight: '200', textAlign: 'center' }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'text', settings: { text: 'Thank you for watching' } }
          },
          {
            type: 'glass-panel', label: 'Cozy Card', x: 610, y: 450, width: 700, height: 350, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { background: 'rgba(255,255,255,0.04)', borderRadius: 20, borderSize: 1, borderColor: 'rgba(255,255,255,0.1)', glassEffect: true, blur: 16 }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'glass-panel', settings: {} }
          }
        ]
      }
    ]
  },

  // ─── Minimal ───────────────────────────────────────────────────────────────
  {
    id: 'pack-minimal',
    name: 'Minimal',
    desc: 'Strict monochrome aesthetic, zero-radius borders, no lighting/glow effects, and distraction-free layouts.',
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
        id: 'scene-gameplay',
        name: 'gameplay',
        label: '🎮 Gameplay',
        widgets: [
          {
            type: 'background', label: 'Dark Base BG', x: 0, y: 0, width: 1920, height: 1080, rotation: 0, opacity: 100, scale: 1, visible: true, locked: true, style: { background: '#09090b', borderSize: 0 }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'background', settings: {} }
          },
          {
            type: 'camera-frame', label: 'Corner Cam Frame', x: 40, y: 40, width: 380, height: 220, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { borderRadius: 0, borderSize: 1, borderColor: '#3f3f46' }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'camera-frame', settings: {} }
          },
          {
            type: 'goal-bar', label: 'Minimal Goal', x: 460, y: 40, width: 400, height: 50, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { background: 'transparent', borderSize: 1, borderColor: '#3f3f46', borderRadius: 0, fontColor: '#ffffff' }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'goal-bar', settings: { current: 50, target: 100, label: 'Follower Goal' } }
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
            type: 'text', label: 'BRB Minimal', x: 460, y: 450, width: 1000, height: 160, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { fontSize: 72, fontColor: '#ffffff', fontFamily: 'Inter', fontWeight: '900', textAlign: 'center', letterSpacing: 10 }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'text', settings: { text: 'BRB' } }
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
    desc: 'Cinematic black with 24-karat gold accents, editorial serif typography, and understated elegance.',
    category: 'Luxury',
    accentColor: '#d4a84b',
    bgColors: ['#060504', '#110e09'],
    fontFamily: 'Playfair Display',
    borderRadius: 2,
    borderStyle: 'solid',
    borderColor: '#d4a84b',
    themeClass: 'theme-luxury-gold',
    decorations: ['👑 Crown Badge', '✦ Gold Star Accent', '⬛ Black Bar Overlay'],
    scenes: [
      {
        id: 'ln-starting',
        name: 'starting-soon',
        label: '⏳ Starting Soon',
        widgets: [
          { type: 'background', label: 'Noir BG', x: 0, y: 0, width: 1920, height: 1080, rotation: 0, opacity: 100, scale: 1, visible: true, locked: true, style: { background: 'linear-gradient(160deg,#060504,#110e09)' }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'background', settings: {} } },
          { type: 'glass-panel', label: 'Gold Frame', x: 540, y: 270, width: 840, height: 540, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { background: 'rgba(10,8,6,0.85)', borderRadius: 2, borderSize: 1, borderColor: '#d4a84b', shadowBlur: 40, shadowColor: 'rgba(212,168,75,0.15)' }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'glass-panel', settings: {} } },
          { type: 'text', label: 'Show Title', x: 590, y: 330, width: 740, height: 80, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { fontSize: 44, fontColor: '#d4a84b', fontFamily: 'Playfair Display', fontWeight: '700', textAlign: 'center', letterSpacing: 3 }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'text', settings: { text: 'LIVE BROADCAST' } } },
          { type: 'countdown-timer', label: 'Gold Timer', x: 590, y: 440, width: 740, height: 160, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { fontSize: 72, fontColor: '#f5e6c0', fontFamily: 'Playfair Display', fontWeight: '300', textAlign: 'center' }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'countdown-timer', settings: { duration: 600 } } },
          { type: 'divider', label: 'Gold Line', x: 640, y: 620, width: 640, height: 2, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { background: 'linear-gradient(90deg,transparent,#d4a84b,transparent)', borderSize: 0 }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'divider', settings: {} } }
        ]
      },
      {
        id: 'ln-chatting',
        name: 'just-chatting',
        label: '💬 Just Chatting',
        widgets: [
          { type: 'background', label: 'Noir BG', x: 0, y: 0, width: 1920, height: 1080, rotation: 0, opacity: 100, scale: 1, visible: true, locked: true, style: { background: 'linear-gradient(160deg,#060504,#110e09)' }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'background', settings: {} } },
          { type: 'camera-frame', label: 'Luxury Cam', x: 60, y: 60, width: 1140, height: 642, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { borderRadius: 2, borderSize: 1, borderColor: '#d4a84b', shadowBlur: 20, shadowColor: 'rgba(212,168,75,0.2)' }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'camera-frame', settings: { frameLabel: 'ON AIR' } } },
          { type: 'chat-box', label: 'Noir Chat', x: 1240, y: 60, width: 620, height: 860, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { background: 'rgba(6,5,4,0.92)', borderRadius: 2, borderSize: 1, borderColor: '#d4a84b', padding: 16 }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'chat-box', settings: { maxMessages: 14 } } },
          { type: 'text', label: 'Program Label', x: 60, y: 740, width: 400, height: 36, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { fontSize: 11, fontColor: '#d4a84b', fontFamily: 'Playfair Display', letterSpacing: 4, textTransform: 'uppercase' }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'text', settings: { text: 'LIVE NOW' } } }
        ]
      },
      {
        id: 'ln-gameplay',
        name: 'gameplay',
        label: '🎮 Gameplay',
        widgets: [
          { type: 'background', label: 'Noir BG', x: 0, y: 0, width: 1920, height: 1080, rotation: 0, opacity: 100, scale: 1, visible: true, locked: true, style: { background: 'linear-gradient(160deg,#060504,#110e09)' }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'background', settings: {} } },
          { type: 'camera-frame', label: 'Corner Cam', x: 60, y: 60, width: 380, height: 220, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { borderRadius: 2, borderSize: 1, borderColor: '#d4a84b' }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'camera-frame', settings: {} } },
          { type: 'goal-bar', label: 'Gold Goal', x: 470, y: 60, width: 420, height: 60, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { background: 'rgba(10,8,6,0.85)', borderSize: 1, borderColor: '#d4a84b', borderRadius: 2, fontColor: '#d4a84b' }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'goal-bar', settings: { current: 80, target: 100, label: 'Gold Goal' } } }
        ]
      },
      {
        id: 'ln-brb',
        name: 'brb',
        label: '☕ BRB',
        widgets: [
          { type: 'background', label: 'Noir BG', x: 0, y: 0, width: 1920, height: 1080, rotation: 0, opacity: 100, scale: 1, visible: true, locked: true, style: { background: 'linear-gradient(160deg,#060504,#110e09)' }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'background', settings: {} } },
          { type: 'text', label: 'BRB Elegant', x: 360, y: 420, width: 1200, height: 140, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { fontSize: 80, fontColor: '#d4a84b', fontFamily: 'Playfair Display', fontWeight: '400', textAlign: 'center', letterSpacing: 10 }, animation: { type: 'fade', duration: 2, delay: 0, loop: true }, content: { type: 'text', settings: { text: 'Be Right Back' } } }
        ]
      },
      {
        id: 'ln-ending',
        name: 'ending',
        label: '🎬 Ending',
        widgets: [
          { type: 'background', label: 'Noir BG', x: 0, y: 0, width: 1920, height: 1080, rotation: 0, opacity: 100, scale: 1, visible: true, locked: true, style: { background: 'linear-gradient(160deg,#060504,#110e09)' }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'background', settings: {} } },
          { type: 'text', label: 'Sign Off', x: 310, y: 380, width: 1300, height: 120, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { fontSize: 56, fontColor: '#d4a84b', fontFamily: 'Playfair Display', fontWeight: '300', textAlign: 'center', letterSpacing: 6 }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'text', settings: { text: 'Thank You For Watching' } } },
          { type: 'social-links', label: 'Socials', x: 660, y: 560, width: 600, height: 48, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { background: 'transparent' }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'social-links', settings: {} } }
        ]
      }
    ]
  },

  // ─── Esports ─────────────────────────────────────────────────────────────
  {
    id: 'pack-esports',
    name: 'Esports',
    desc: 'High-octane competitive gaming HUD with angular telemetry panels, electric blue accents, and bold styling.',
    category: 'Gaming',
    accentColor: '#00ffd4',
    bgColors: ['#030710', '#0b1329'],
    fontFamily: 'Space Grotesk',
    borderRadius: 2,
    borderStyle: 'solid',
    borderColor: '#00c8ff',
    glowColor: '#00c8ff',
    glowBlur: 16,
    themeClass: 'theme-esports-blue',
    decorations: ['⚡ Bolt HUD Element', '🎮 Controller Badge', '📊 Stats Overlay'],
    scenes: [
      {
        id: 'ea-starting',
        name: 'starting-soon',
        label: '⏳ Starting Soon',
        widgets: [
          { type: 'background', label: 'Arena BG', x: 0, y: 0, width: 1920, height: 1080, rotation: 0, opacity: 100, scale: 1, visible: true, locked: true, style: { background: 'linear-gradient(180deg,#030710,#0b1329)' }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'background', settings: {} } },
          { type: 'glass-panel', label: 'HUD Frame', x: 340, y: 200, width: 1240, height: 680, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { background: 'rgba(0,20,50,0.7)', borderRadius: 2, borderSize: 2, borderColor: '#00c8ff', glowColor: '#00c8ff', glowBlur: 20 }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'glass-panel', settings: {} } },
          { type: 'text', label: 'Match Start', x: 390, y: 280, width: 1140, height: 80, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { fontSize: 36, fontColor: '#00ffd4', fontFamily: 'Space Grotesk', fontWeight: '900', textAlign: 'center', letterSpacing: 8 }, animation: { type: 'pulse', duration: 1.5, delay: 0, loop: true }, content: { type: 'text', settings: { text: 'MATCH STARTING SOON' } } },
          { type: 'countdown-timer', label: 'Arena Timer', x: 460, y: 390, width: 1000, height: 200, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { fontSize: 120, fontColor: '#ffffff', fontFamily: 'Space Grotesk', fontWeight: '900', textAlign: 'center', glowColor: '#00c8ff', glowBlur: 12 }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'countdown-timer', settings: { duration: 600 } } }
        ]
      },
      {
        id: 'ea-chatting',
        name: 'just-chatting',
        label: '💬 Just Chatting',
        widgets: [
          { type: 'background', label: 'Arena BG', x: 0, y: 0, width: 1920, height: 1080, rotation: 0, opacity: 100, scale: 1, visible: true, locked: true, style: { background: 'linear-gradient(180deg,#030710,#0b1329)' }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'background', settings: {} } },
          { type: 'camera-frame', label: 'HUD Cam', x: 40, y: 40, width: 1200, height: 675, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { borderRadius: 2, borderSize: 2, borderColor: '#00c8ff', glowColor: '#00c8ff', glowBlur: 14 }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'camera-frame', settings: { frameLabel: 'PLAYER CAM' } } },
          { type: 'chat-box', label: 'Arena Chat', x: 1280, y: 40, width: 600, height: 860, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { background: 'rgba(3,7,16,0.9)', borderRadius: 2, borderSize: 1, borderColor: '#00c8ff', padding: 14 }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'chat-box', settings: { maxMessages: 16 } } },
          { type: 'viewer-count', label: 'Viewers HUD', x: 40, y: 760, width: 240, height: 60, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { background: 'rgba(0,200,255,0.08)', borderRadius: 2, borderSize: 1, borderColor: '#00c8ff', fontSize: 22, fontColor: '#00ffd4', fontFamily: 'Space Grotesk', fontWeight: '700', textAlign: 'center' }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'viewer-count', settings: {} } }
        ]
      },
      {
        id: 'ea-gameplay',
        name: 'gameplay',
        label: '🎮 Gameplay',
        widgets: [
          { type: 'background', label: 'Arena BG', x: 0, y: 0, width: 1920, height: 1080, rotation: 0, opacity: 100, scale: 1, visible: true, locked: true, style: { background: 'linear-gradient(180deg,#030710,#0b1329)' }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'background', settings: {} } },
          { type: 'camera-frame', label: 'Corner Cam', x: 40, y: 40, width: 380, height: 220, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { borderRadius: 2, borderSize: 1, borderColor: '#00c8ff' }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'camera-frame', settings: {} } },
          { type: 'goal-bar', label: 'Esports Goal', x: 450, y: 40, width: 400, height: 60, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { background: 'rgba(3,7,16,0.9)', borderSize: 1, borderColor: '#00c8ff', borderRadius: 2, fontColor: '#00ffd4' }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'goal-bar', settings: { current: 90, target: 100, label: 'Win Streak Goal' } } }
        ]
      },
      {
        id: 'ea-brb',
        name: 'brb',
        label: '☕ BRB',
        widgets: [
          { type: 'background', label: 'Arena BG', x: 0, y: 0, width: 1920, height: 1080, rotation: 0, opacity: 100, scale: 1, visible: true, locked: true, style: { background: 'linear-gradient(180deg,#030710,#0b1329)' }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'background', settings: {} } },
          { type: 'text', label: 'AFK Banner', x: 310, y: 410, width: 1300, height: 180, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { fontSize: 120, fontColor: '#00ffd4', fontFamily: 'Space Grotesk', fontWeight: '900', textAlign: 'center', glowColor: '#00c8ff', glowBlur: 24 }, animation: { type: 'pulse', duration: 2, delay: 0, loop: true }, content: { type: 'text', settings: { text: 'AFK' } } }
        ]
      },
      {
        id: 'ea-ending',
        name: 'ending',
        label: '🎬 Ending',
        widgets: [
          { type: 'background', label: 'Arena BG', x: 0, y: 0, width: 1920, height: 1080, rotation: 0, opacity: 100, scale: 1, visible: true, locked: true, style: { background: 'linear-gradient(180deg,#030710,#0b1329)' }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'background', settings: {} } },
          { type: 'text', label: 'GG Banner', x: 310, y: 360, width: 1300, height: 140, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { fontSize: 80, fontColor: '#ffffff', fontFamily: 'Space Grotesk', fontWeight: '900', textAlign: 'center', glowColor: '#00c8ff', glowBlur: 16 }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'text', settings: { text: 'GG — THANKS FOR WATCHING' } } },
          { type: 'social-links', label: 'Socials', x: 660, y: 560, width: 600, height: 48, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { background: 'transparent' }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'social-links', settings: {} } }
        ]
      }
    ]
  },

  // ─── Lo-Fi ─────────────────────────────────────────────────────────────────
  {
    id: 'pack-lofi',
    name: 'Lo-Fi',
    desc: 'Cozy study aesthetics, warm pink pastel highlights, sleeping cats, record players, and soft rounded widgets.',
    category: 'Lo-Fi',
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
            type: 'glass-panel', label: 'Cozy Card', x: 610, y: 280, width: 700, height: 520, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { background: 'rgba(50,25,46,0.7)', borderRadius: 32, borderSize: 1, borderColor: 'rgba(249,168,212,0.3)', glassEffect: true, blur: 12 }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'glass-panel', settings: {} }
          },
          {
            type: 'text', label: 'Cozy Title', x: 660, y: 330, width: 600, height: 40, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { fontSize: 16, fontColor: '#f9a8d4', fontFamily: 'Inter', letterSpacing: 4, textAlign: 'center', textTransform: 'uppercase' }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'text', settings: { text: 'stream starting soon' } }
          },
          {
            type: 'countdown-timer', label: 'Soft Timer', x: 660, y: 395, width: 600, height: 160, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { fontSize: 88, fontColor: '#f9a8d4', fontFamily: 'Inter', fontWeight: '300', textAlign: 'center' }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'countdown-timer', settings: { duration: 600 } }
          },
          {
            type: 'spotify', label: 'Spotify card', x: 730, y: 600, width: 460, height: 80, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { background: 'rgba(255,255,255,0.05)', borderRadius: 40, padding: 14, borderSize: 1, borderColor: 'rgba(249,168,212,0.2)' }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'spotify', settings: {} }
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
            type: 'camera-frame', label: 'Cozy Cam Box', x: 60, y: 80, width: 1140, height: 640, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { borderRadius: 24, borderSize: 3, borderColor: '#f9a8d4', glowColor: '#f9a8d4', glowBlur: 14 }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'camera-frame', settings: { frameLabel: 'COZY CHAT CAM' } }
          },
          {
            type: 'chat-box', label: 'Cozy Chat', x: 1260, y: 80, width: 600, height: 840, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { background: 'rgba(29,14,26,0.85)', borderRadius: 24, borderSize: 1, borderColor: 'rgba(249,168,212,0.25)', padding: 18 }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'chat-box', settings: { maxMessages: 15 } }
          }
        ]
      },
      {
        id: 'scene-gameplay',
        name: 'gameplay',
        label: '🎮 Gameplay',
        widgets: [
          {
            type: 'background', label: 'Cozy BG', x: 0, y: 0, width: 1920, height: 1080, rotation: 0, opacity: 100, scale: 1, visible: true, locked: true, style: { background: 'linear-gradient(135deg, #1d1421,#32192e)', borderSize: 0 }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'background', settings: {} }
          },
          {
            type: 'camera-frame', label: 'Cozy Cam Box', x: 60, y: 60, width: 380, height: 220, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { borderRadius: 24, borderSize: 2, borderColor: '#f9a8d4' }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'camera-frame', settings: {} }
          },
          {
            type: 'goal-bar', label: 'Cozy Goal', x: 460, y: 60, width: 400, height: 60, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { background: 'rgba(50,25,46,0.7)', borderSize: 1, borderColor: 'rgba(249,168,212,0.3)', borderRadius: 12, fontColor: '#f9a8d4' }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'goal-bar', settings: { current: 40, target: 100, label: 'Lofi Subscriber Goal' } }
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
            type: 'text', label: 'BRB Title', x: 460, y: 440, width: 1000, height: 160, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { fontSize: 90, fontColor: '#f9a8d4', fontFamily: 'Inter', fontWeight: '300', textAlign: 'center' }, animation: { type: 'float', duration: 4, delay: 0, loop: true }, content: { type: 'text', settings: { text: 'Be Right Back' } }
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
            type: 'text', label: 'Cozy End Title', x: 310, y: 310, width: 1300, height: 120, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { fontSize: 60, fontColor: '#ffffff', fontFamily: 'Inter', fontWeight: '300', textAlign: 'center' }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'text', settings: { text: 'Sweet Dreams' } }
          }
        ]
      }
    ]
  },

  // ─── Anime ─────────────────────────────────────────────────────────────────
  {
    id: 'pack-anime',
    name: 'Anime',
    desc: 'Soft cherry blossom aesthetics with warm pinks, rounded kawaii cozy panels, and gentle floating blossom decorations.',
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
    decorations: ['🌸 Cherry Blossom Petals', '🍡 Dango Accent', '🐱 Chibi Cat Sticker'],
    scenes: [
      {
        id: 'sa-starting',
        name: 'starting-soon',
        label: '⏳ Starting Soon',
        widgets: [
          { type: 'background', label: 'Sakura BG', x: 0, y: 0, width: 1920, height: 1080, rotation: 0, opacity: 100, scale: 1, visible: true, locked: true, style: { background: 'linear-gradient(135deg,#1f111b,#3b1f35)' }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'background', settings: {} } },
          { type: 'glass-panel', label: 'Petal Card', x: 560, y: 240, width: 800, height: 600, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { background: 'rgba(59,31,53,0.75)', borderRadius: 32, borderSize: 2, borderColor: 'rgba(255,128,181,0.4)', glassEffect: true, blur: 12 }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'glass-panel', settings: {} } },
          { type: 'text', label: 'Kawaii Title', x: 610, y: 300, width: 700, height: 50, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { fontSize: 16, fontColor: '#ff80b5', fontFamily: 'Inter', letterSpacing: 5, textAlign: 'center', textTransform: 'uppercase' }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'text', settings: { text: '✿ Starting Soon ✿' } } },
          { type: 'countdown-timer', label: 'Soft Timer', x: 610, y: 380, width: 700, height: 180, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { fontSize: 90, fontColor: '#ffb3d4', fontFamily: 'Inter', fontWeight: '300', textAlign: 'center' }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'countdown-timer', settings: { duration: 600 } } }
        ]
      },
      {
        id: 'sa-chatting',
        name: 'just-chatting',
        label: '💬 Just Chatting',
        widgets: [
          { type: 'background', label: 'Sakura BG', x: 0, y: 0, width: 1920, height: 1080, rotation: 0, opacity: 100, scale: 1, visible: true, locked: true, style: { background: 'linear-gradient(135deg,#1f111b,#3b1f35)' }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'background', settings: {} } },
          { type: 'camera-frame', label: 'Kawaii Cam', x: 60, y: 60, width: 1140, height: 642, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { borderRadius: 24, borderSize: 3, borderColor: '#ff80b5', glowColor: '#ff80b5', glowBlur: 14 }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'camera-frame', settings: { frameLabel: 'ʕ•ᴥ•ʔ CAM' } } },
          { type: 'chat-box', label: 'Cozy Chat', x: 1250, y: 60, width: 620, height: 840, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { background: 'rgba(31,17,27,0.88)', borderRadius: 24, borderSize: 2, borderColor: 'rgba(255,128,181,0.3)', padding: 18 }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'chat-box', settings: { maxMessages: 14 } } }
        ]
      },
      {
        id: 'sa-gameplay',
        name: 'gameplay',
        label: '🎮 Gameplay',
        widgets: [
          { type: 'background', label: 'Sakura BG', x: 0, y: 0, width: 1920, height: 1080, rotation: 0, opacity: 100, scale: 1, visible: true, locked: true, style: { background: 'linear-gradient(135deg,#1f111b,#3b1f35)' }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'background', settings: {} } },
          { type: 'camera-frame', label: 'Anime Cam', x: 60, y: 60, width: 380, height: 220, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { borderRadius: 24, borderSize: 2, borderColor: '#ff80b5' }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'camera-frame', settings: {} } },
          { type: 'goal-bar', label: 'Anime Goal', x: 460, y: 60, width: 400, height: 60, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { background: 'rgba(31,17,27,0.88)', borderSize: 1, borderColor: 'rgba(255,128,181,0.2)', borderRadius: 12, fontColor: '#ff80b5' }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'goal-bar', settings: { current: 30, target: 100, label: 'Kawaii Follower Goal' } } }
        ]
      },
      {
        id: 'sa-brb',
        name: 'brb',
        label: '☕ BRB',
        widgets: [
          { type: 'background', label: 'Sakura BG', x: 0, y: 0, width: 1920, height: 1080, rotation: 0, opacity: 100, scale: 1, visible: true, locked: true, style: { background: 'linear-gradient(135deg,#1f111b,#3b1f35)' }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'background', settings: {} } },
          { type: 'text', label: 'BRB Kawaii', x: 360, y: 400, width: 1200, height: 160, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { fontSize: 100, fontColor: '#ff80b5', fontFamily: 'Inter', fontWeight: '300', textAlign: 'center' }, animation: { type: 'float', duration: 4, delay: 0, loop: true }, content: { type: 'text', settings: { text: 'お茶してくる ☕' } } }
        ]
      },
      {
        id: 'sa-ending',
        name: 'ending',
        label: '🎬 Ending',
        widgets: [
          { type: 'background', label: 'Sakura BG', x: 0, y: 0, width: 1920, height: 1080, rotation: 0, opacity: 100, scale: 1, visible: true, locked: true, style: { background: 'linear-gradient(135deg,#1f111b,#3b1f35)' }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'background', settings: {} } },
          { type: 'text', label: 'Bye Text', x: 310, y: 380, width: 1300, height: 120, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { fontSize: 60, fontColor: '#ffb3d4', fontFamily: 'Inter', fontWeight: '300', textAlign: 'center' }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'text', settings: { text: 'またね～ Thanks for watching! 🌸' } } }
        ]
      }
    ]
  },

  // ─── Streamer Bedroom ────────────────────────────────────────────────────────
  {
    id: 'pack-streamer-bedroom',
    name: 'Streamer Bedroom',
    desc: 'Cozy streamer bedroom aesthetic with ambient magenta room glows, grid LED styling, and neon pink LED strips.',
    category: 'Cozy',
    accentColor: '#ff007f',
    bgColors: ['#0b0718', '#1a0d33'],
    fontFamily: 'Outfit',
    borderRadius: 12,
    borderStyle: 'solid',
    borderColor: 'rgba(255, 0, 127, 0.4)',
    glowColor: '#ff007f',
    glowBlur: 14,
    themeClass: 'theme-cyber-synth',
    decorations: ['💡 LED Strip Glow', '👾 Controller Sticker', '🐱 Kawaii Plush'],
    scenes: [
      {
        id: 'scene-starting',
        name: 'starting-soon',
        label: '⏳ Starting Soon',
        widgets: [
          {
            type: 'background', label: 'Bedroom BG Grid', x: 0, y: 0, width: 1920, height: 1080, rotation: 0, opacity: 100, scale: 1, visible: true, locked: true, style: { background: 'linear-gradient(135deg, #0b0718 0%, #1a0d33 100%)', borderSize: 0 }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'background', settings: {} }
          },
          {
            type: 'glass-panel', label: 'LED Panel Container', x: 460, y: 240, width: 1000, height: 600, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { background: 'rgba(15, 10, 30, 0.8)', borderRadius: 12, borderSize: 2, borderColor: 'rgba(255, 0, 127, 0.6)', glowColor: '#ff007f', glowBlur: 20 }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'glass-panel', settings: {} }
          },
          {
            type: 'text', label: 'Bedroom Title', x: 510, y: 290, width: 900, height: 60, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { fontSize: 24, fontColor: '#ff007f', fontFamily: 'Outfit', fontWeight: '800', textAlign: 'center', letterSpacing: 4 }, animation: { type: 'pulse', duration: 2.5, delay: 0, loop: true }, content: { type: 'text', settings: { text: 'COZY ROOM BROADCAST STARTING' } }
          },
          {
            type: 'countdown-timer', label: 'LED Countdown', x: 560, y: 380, width: 800, height: 180, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { fontSize: 100, fontColor: '#ffffff', fontFamily: 'Outfit', fontWeight: '700', textAlign: 'center', glowColor: '#ff007f', glowBlur: 16 }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'countdown-timer', settings: { duration: 600 } }
          },
          {
            type: 'clock', label: 'Room Clock', x: 510, y: 620, width: 900, height: 60, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { fontSize: 16, fontColor: 'rgba(255,255,255,0.4)', fontFamily: 'Outfit', textAlign: 'center' }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'clock', settings: {} }
          }
        ]
      },
      {
        id: 'scene-chatting',
        name: 'just-chatting',
        label: '💬 Just Chatting',
        widgets: [
          {
            type: 'background', label: 'Bedroom BG Grid', x: 0, y: 0, width: 1920, height: 1080, rotation: 0, opacity: 100, scale: 1, visible: true, locked: true, style: { background: 'linear-gradient(135deg, #0b0718 0%, #1a0d33 100%)', borderSize: 0 }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'background', settings: {} }
          },
          {
            type: 'camera-frame', label: 'Bedroom Cam Box', x: 60, y: 80, width: 1160, height: 650, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { borderSize: 2, borderColor: 'rgba(255, 0, 127, 0.7)', glowColor: '#ff007f', glowBlur: 16, borderRadius: 12 }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'camera-frame', settings: { frameLabel: 'BEDROOM CAM' } }
          },
          {
            type: 'chat-box', label: 'Bedroom Chat Grid', x: 1260, y: 80, width: 600, height: 860, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { background: 'rgba(15, 10, 30, 0.88)', borderSize: 1, borderColor: 'rgba(255,255,255,0.1)', borderRadius: 12, padding: 16 }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'chat-box', settings: { maxMessages: 16 } }
          },
          {
            type: 'spotify', label: 'Bedroom Spotify Track', x: 60, y: 770, width: 460, height: 90, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { background: 'rgba(15, 10, 30, 0.85)', borderSize: 1, borderColor: 'rgba(255, 0, 127, 0.5)', borderRadius: 12, padding: 12 }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'spotify', settings: {} }
          },
          {
            type: 'social-links', label: 'Bedroom Socials Row', x: 550, y: 795, width: 670, height: 48, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { background: 'transparent', borderSize: 0 }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'social-links', settings: {} }
          }
        ]
      },
      {
        id: 'scene-gameplay',
        name: 'gameplay',
        label: '🎮 Gameplay',
        widgets: [
          {
            type: 'background', label: 'Bedroom BG Grid', x: 0, y: 0, width: 1920, height: 1080, rotation: 0, opacity: 100, scale: 1, visible: true, locked: true, style: { background: 'linear-gradient(135deg, #0b0718 0%, #1a0d33 100%)', borderSize: 0 }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'background', settings: {} }
          },
          {
            type: 'camera-frame', label: 'Bedroom Mini Cam', x: 60, y: 60, width: 360, height: 210, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { borderSize: 2, borderColor: 'rgba(255, 0, 127, 0.6)', glowColor: '#ff007f', glowBlur: 8, borderRadius: 12 }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'camera-frame', settings: {} }
          },
          {
            type: 'goal-bar', label: 'Bedroom Goal Bar', x: 450, y: 60, width: 400, height: 60, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { background: 'rgba(15, 10, 30, 0.85)', borderSize: 1, borderColor: 'rgba(255,255,255,0.1)', borderRadius: 12, fontColor: '#ff007f' }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'goal-bar', settings: { current: 65, target: 100, label: 'Cozy Room Goal' } }
          }
        ]
      },
      {
        id: 'scene-brb',
        name: 'brb',
        label: '☕ BRB',
        widgets: [
          {
            type: 'background', label: 'Bedroom BG Grid', x: 0, y: 0, width: 1920, height: 1080, rotation: 0, opacity: 100, scale: 1, visible: true, locked: true, style: { background: 'linear-gradient(135deg, #0b0718 0%, #1a0d33 100%)', borderSize: 0 }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'background', settings: {} }
          },
          {
            type: 'text', label: 'Bedroom BRB Label', x: 310, y: 380, width: 1300, height: 200, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { fontSize: 100, fontColor: '#ff007f', fontFamily: 'Outfit', fontWeight: '900', glowColor: '#ff007f', glowBlur: 30, textAlign: 'center' }, animation: { type: 'float', duration: 3, delay: 0, loop: true }, content: { type: 'text', settings: { text: 'COZY BREAK — BRB' } }
          }
        ]
      },
      {
        id: 'scene-ending',
        name: 'ending',
        label: '🎬 Ending',
        widgets: [
          {
            type: 'background', label: 'Bedroom BG Grid', x: 0, y: 0, width: 1920, height: 1080, rotation: 0, opacity: 100, scale: 1, visible: true, locked: true, style: { background: 'linear-gradient(135deg, #0b0718 0%, #1a0d33 100%)', borderSize: 0 }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'background', settings: {} }
          },
          {
            type: 'text', label: 'Bedroom Ending Header', x: 310, y: 250, width: 1300, height: 120, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { fontSize: 60, fontColor: '#ffffff', fontFamily: 'Outfit', fontWeight: '800', textAlign: 'center' }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'text', settings: { text: 'THANKS FOR HANGING OUT!' } }
          },
          {
            type: 'social-links', label: 'Socials Row', x: 660, y: 440, width: 600, height: 48, rotation: 0, opacity: 100, scale: 1, visible: true, locked: false, style: { background: 'transparent', borderSize: 0 }, animation: { type: 'none', duration: 1, delay: 0, loop: false }, content: { type: 'social-links', settings: {} }
          }
        ]
      }
    ]
  }
];

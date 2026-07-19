import type { StreamPack } from '../types';

export const cyberNeonPack: StreamPack = {
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
};

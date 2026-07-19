import type { StreamPack } from '../types';

export const streamerBedroomPack: StreamPack = {
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
};

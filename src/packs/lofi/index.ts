import type { StreamPack } from '../types';

export const lofiPack: StreamPack = {
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
};

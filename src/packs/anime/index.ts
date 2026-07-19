import type { StreamPack } from '../types';

export const animePack: StreamPack = {
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
};

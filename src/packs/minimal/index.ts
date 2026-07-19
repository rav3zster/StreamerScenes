import type { StreamPack } from '../types';

export const minimalPack: StreamPack = {
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
};

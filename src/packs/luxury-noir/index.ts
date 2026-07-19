import type { StreamPack } from '../types';

export const luxuryNoirPack: StreamPack = {
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
};

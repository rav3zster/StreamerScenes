import type { StreamPack } from '../types';

export const glassStudioPack: StreamPack = {
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
};

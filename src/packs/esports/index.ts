import type { StreamPack } from '../types';

export const esportsPack: StreamPack = {
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
};

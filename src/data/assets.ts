export interface VisualAsset {
  id: string;
  name: string;
  category: 'Images' | 'Videos' | 'GIFs' | 'SVGs' | 'Lotties' | 'Audio' | 'Fonts' | 'Icons' | 'Backgrounds';
  url: string;
  previewUrl: string;
  width: number;
  height: number;
}

export const MOCK_ASSETS: VisualAsset[] = [
  // Backgrounds
  { id: 'ast-bg-retro', name: 'Cyber Synth Grid', category: 'Backgrounds', url: 'linear-gradient(135deg,#07050f 0%,#1a0535 100%)', previewUrl: '#0e0b1e', width: 1920, height: 1080 },
  { id: 'ast-bg-warm', name: 'Warm Lo-fi Glow', category: 'Backgrounds', url: 'linear-gradient(135deg,#1b0e1a,#2f1934)', previewUrl: '#1b0e1a', width: 1920, height: 1080 },
  { id: 'ast-bg-luxe', name: 'Luxury Marble Dark', category: 'Backgrounds', url: 'linear-gradient(160deg,#050505,#1a1815)', previewUrl: '#0e0d0b', width: 1920, height: 1080 },
  { id: 'ast-bg-esports', name: 'Esports Grid Base', category: 'Backgrounds', url: 'linear-gradient(180deg,#030712,#0b1329)', previewUrl: '#0b1329', width: 1920, height: 1080 },

  // SVGs / Shapes
  { id: 'ast-svg-circle', name: 'Cyber Circle Frame', category: 'SVGs', url: '🧬', previewUrl: 'rgba(92,255,226,0.1)', width: 200, height: 200 },
  { id: 'ast-svg-hexagon', name: 'Telemetry Hexagon', category: 'SVGs', url: '⬢', previewUrl: 'rgba(168,85,247,0.1)', width: 240, height: 240 },
  { id: 'ast-svg-bracket', name: 'HUD Bracket', category: 'SVGs', url: '⧁', previewUrl: 'transparent', width: 100, height: 200 },

  // GIFs
  { id: 'ast-gif-sakura', name: 'Cherry Blossoms Floating', category: 'GIFs', url: '🌸', previewUrl: 'rgba(255,128,181,0.05)', width: 400, height: 300 },
  { id: 'ast-gif-matrix', name: 'Digital Glitch Stream', category: 'GIFs', url: '📟', previewUrl: 'rgba(92,255,226,0.05)', width: 500, height: 350 },

  // Icons
  { id: 'ast-ico-twitch', name: 'Twitch Logo', category: 'Icons', url: '🟣', previewUrl: 'transparent', width: 40, height: 40 },
  { id: 'ast-ico-twitter', name: 'Twitter Logo', category: 'Icons', url: '🐦', previewUrl: 'transparent', width: 40, height: 40 },
  { id: 'ast-ico-discord', name: 'Discord Logo', category: 'Icons', url: '👾', previewUrl: 'transparent', width: 40, height: 40 },

  // Lotties
  { id: 'ast-lot-particles', name: 'Neon Glitch Orbit', category: 'Lotties', url: '🌀', previewUrl: 'transparent', width: 300, height: 300 },
];

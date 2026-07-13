// Design System definitions — each changes the entire visual identity

export interface DesignSystem {
  id: string;
  name: string;
  category: string;
  desc: string;
  accentColor: string;
  surfaceColor: string;
  bgGradient: string;
  borderGlow: string;
  fontFamily: string;
  borderRadius: string;
  previewBg: string;
  cssTheme: string;
}

export const DESIGN_SYSTEMS: DesignSystem[] = [
  {
    id: 'cyber-synth',
    name: 'Cyber Synth',
    category: 'Dark',
    desc: 'Neon magenta & cyan with monospace type and sharp edges',
    accentColor: '#ff4dff',
    surfaceColor: '#0e0b1e',
    bgGradient: 'linear-gradient(135deg,#07050f,#140526)',
    borderGlow: '0 0 16px rgba(255,77,255,0.3)',
    fontFamily: 'Space Grotesk',
    borderRadius: '4px',
    previewBg: 'linear-gradient(135deg,#07050f 0%,#1a0535 100%)',
    cssTheme: 'theme-cyber-synth',
  },
  {
    id: 'glassmorphism',
    name: 'Glassmorphism',
    category: 'Premium',
    desc: 'Frosted glass surfaces, backdrop blur, soft purple glow',
    accentColor: '#c084fc',
    surfaceColor: 'rgba(255,255,255,0.05)',
    bgGradient: 'linear-gradient(135deg,#0a0515,#1a1035)',
    borderGlow: '0 0 20px rgba(192,132,252,0.2)',
    fontFamily: 'Inter',
    borderRadius: '16px',
    previewBg: 'linear-gradient(135deg,#0a0515,#1a1035)',
    cssTheme: 'theme-glassmorphism',
  },
  {
    id: 'minimal-dark',
    name: 'Minimal Dark',
    category: 'Minimal',
    desc: 'Pure black, sharp corners, no glow — absolute clarity',
    accentColor: '#f4f4f5',
    surfaceColor: '#121214',
    bgGradient: 'linear-gradient(180deg,#09090b,#121214)',
    borderGlow: 'none',
    fontFamily: 'Inter',
    borderRadius: '0px',
    previewBg: '#09090b',
    cssTheme: 'theme-minimal-dark',
  },
  {
    id: 'luxury-gold',
    name: 'Gold Luxe',
    category: 'Luxury',
    desc: 'Premium black with gold detailing and serif typography',
    accentColor: '#c9a227',
    surfaceColor: '#0e0d0b',
    bgGradient: 'linear-gradient(160deg,#050505,#100e0b)',
    borderGlow: '0 0 12px rgba(201,162,39,0.2)',
    fontFamily: 'Inter',
    borderRadius: '2px',
    previewBg: 'linear-gradient(160deg,#050505,#100e0b)',
    cssTheme: 'theme-luxury-gold',
  },
  {
    id: 'esports-blue',
    name: 'Esports HUD',
    category: 'Gaming',
    desc: 'High-contrast blue telemetry HUD with angular shapes',
    accentColor: '#1a56db',
    surfaceColor: '#0b1329',
    bgGradient: 'linear-gradient(180deg,#030712,#0b1329)',
    borderGlow: '0 0 12px rgba(26,86,219,0.3)',
    fontFamily: 'Space Grotesk',
    borderRadius: '2px',
    previewBg: 'linear-gradient(180deg,#030712,#121e3d)',
    cssTheme: 'theme-esports-blue',
  },
  {
    id: 'anime-sakura',
    name: 'Sakura Anime',
    category: 'Anime',
    desc: 'Soft cherry blossom pink with rounded cozy shapes',
    accentColor: '#ff80b5',
    surfaceColor: '#2b1a26',
    bgGradient: 'linear-gradient(160deg,#1f111b,#3b1f35)',
    borderGlow: '0 0 16px rgba(255,128,181,0.25)',
    fontFamily: 'Inter',
    borderRadius: '14px',
    previewBg: 'linear-gradient(160deg,#1f111b,#3b1f35)',
    cssTheme: 'theme-anime-sakura',
  },
  {
    id: 'mclaren',
    name: 'McLaren',
    category: 'Racing',
    desc: 'Papaya orange and teal — the McLaren F1 aesthetic',
    accentColor: '#ff6600',
    surfaceColor: '#101010',
    bgGradient: 'linear-gradient(180deg,#080808,#181818)',
    borderGlow: '0 0 10px rgba(255,102,0,0.25)',
    fontFamily: 'Inter',
    borderRadius: '2px',
    previewBg: 'linear-gradient(135deg,#080808,#1a0a00)',
    cssTheme: 'theme-mclaren',
  },
  {
    id: 'porsche-gulf',
    name: 'Gulf Racing',
    category: 'Racing',
    desc: 'Gulf blue & orange — iconic racing heritage',
    accentColor: '#f5831f',
    surfaceColor: '#122238',
    bgGradient: 'linear-gradient(180deg,#0b1625,#122238)',
    borderGlow: '0 0 10px rgba(245,131,31,0.3)',
    fontFamily: 'Space Grotesk',
    borderRadius: '4px',
    previewBg: 'linear-gradient(135deg,#0b1625,#192e4a)',
    cssTheme: 'theme-porsche-gulf',
  },
];

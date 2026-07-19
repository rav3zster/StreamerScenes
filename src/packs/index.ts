import { cyberNeonPack } from './cyber-neon';
import { glassStudioPack } from './glass-studio';
import { minimalPack } from './minimal';
import { luxuryNoirPack } from './luxury-noir';
import { esportsPack } from './esports';
import { lofiPack } from './lofi';
import { animePack } from './anime';
import { streamerBedroomPack } from './streamer-bedroom';

import type { StreamPack, PackScene } from './types';

export const STREAM_PACKS: StreamPack[] = [
  cyberNeonPack,
  glassStudioPack,
  minimalPack,
  luxuryNoirPack,
  esportsPack,
  lofiPack,
  animePack,
  streamerBedroomPack,
];

export type { StreamPack, PackScene };

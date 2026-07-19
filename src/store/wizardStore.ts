import { create } from 'zustand';

export interface StreamerProfile {
  streamerName: string;
  channelName: string;
  logoUrl: string;
  avatarUrl: string;
  accentColor: string;
  socialHandles: { platform: string; handle: string }[];
  cameraFrameStyle: string;
  countdownDuration: number;
}

export interface WizardTheme {
  accentColor: string | null;
  backgroundColor: string | null;
  textColor: string | null;
  borderRadius: number | null;
  glassIntensity: number | null;
  animationsEnabled: boolean;
  transitionStyle: 'none' | 'fade' | 'slide';
}

export type WizardStepState = 'WELCOME' | 'PACK_SELECTION' | 'PERSONALIZATION' | 'THEME_REVIEW' | 'BUILDING_PROJECT' | 'COMPLETE';

interface WizardState {
  wizardState: WizardStepState;
  selectedPackId: string | null;
  streamerProfile: StreamerProfile;
  wizardTheme: WizardTheme;
  existingProject: boolean;

  setWizardState: (state: WizardStepState) => void;
  selectPack: (packId: string) => void;
  setStreamerProfile: (profile: Partial<StreamerProfile>) => void;
  setWizardTheme: (theme: Partial<WizardTheme>) => void;
  setExistingProject: (val: boolean) => void;
  resetWizard: () => void;
}

const DEFAULT_PROFILE: StreamerProfile = {
  streamerName: '',
  channelName: '',
  logoUrl: '',
  avatarUrl: '',
  accentColor: '#a855f7',
  socialHandles: [
    { platform: 'twitch', handle: '' },
    { platform: 'twitter', handle: '' },
    { platform: 'youtube', handle: '' },
    { platform: 'discord', handle: '' },
  ],
  cameraFrameStyle: 'default',
  countdownDuration: 600,
};

const DEFAULT_THEME: WizardTheme = {
  accentColor: null,
  backgroundColor: null,
  textColor: null,
  borderRadius: null,
  glassIntensity: null,
  animationsEnabled: true,
  transitionStyle: 'fade',
};

export const useWizardStore = create<WizardState>((set) => ({
  wizardState: 'WELCOME',
  selectedPackId: null,
  streamerProfile: { ...DEFAULT_PROFILE },
  wizardTheme: { ...DEFAULT_THEME },
  existingProject: false,

  setWizardState: (state) => set({ wizardState: state }),
  selectPack: (packId) => set({ selectedPackId: packId }),
  setStreamerProfile: (profile) =>
    set((s) => ({
      streamerProfile: { ...s.streamerProfile, ...profile },
    })),
  setWizardTheme: (theme) =>
    set((s) => ({
      wizardTheme: { ...s.wizardTheme, ...theme },
    })),
  setExistingProject: (val) => set({ existingProject: val }),
  resetWizard: () =>
    set({
      wizardState: 'WELCOME',
      selectedPackId: null,
      streamerProfile: { ...DEFAULT_PROFILE },
      wizardTheme: { ...DEFAULT_THEME },
      existingProject: false,
    }),
}));

import { colors } from '../tokens/colors';
import { shadows } from '../tokens/shadows';

export const lightTheme = {
  name: 'light',
  colors: {
    s0: colors.surfaceLight.s0,
    s1: colors.surfaceLight.s1,
    s2: colors.surfaceLight.s2,
    s3: colors.surfaceLight.s3,
    s4: colors.surfaceLight.s4,
    s5: colors.surfaceLight.s5,
    textPrimary: colors.textLight.primary,
    textSecondary: colors.textLight.secondary,
    textTertiary: colors.textLight.tertiary,
    textMuted: colors.textLight.muted,
    textDisabled: colors.textLight.disabled,
  },
  shadows: {
    stage: shadows.stageLight,
  },
};

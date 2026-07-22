import { colors } from '../tokens/colors';
import { shadows } from '../tokens/shadows';

export const darkTheme = {
  name: 'dark',
  colors: {
    s0: colors.surface.s0,
    s1: colors.surface.s1,
    s2: colors.surface.s2,
    s3: colors.surface.s3,
    s4: colors.surface.s4,
    s5: colors.surface.s5,
    textPrimary: colors.text.primary,
    textSecondary: colors.text.secondary,
    textTertiary: colors.text.tertiary,
    textMuted: colors.text.muted,
    textDisabled: colors.text.disabled,
  },
  shadows: {
    stage: shadows.stage,
  },
};

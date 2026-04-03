import { Platform } from 'react-native';

export const COLORS = {
  primary: '#2F6C3E',
  secondary: '#1F4F32',
  accent: '#6FB287',
  background: '#FFFFFF',
  backgroundStrong: '#F6F6F6',
  surface: '#FFFFFF',
  surfaceMuted: '#F3F7F4',
  surfaceDark: '#163625',
  text: '#172019',
  textSecondary: '#546257',
  textLight: '#8A968D',
  border: '#E3ECE5',
  success: '#567561',
  danger: '#C95A43',
  white: '#FFFDF9',
  black: '#0D140F',
  overlay: 'rgba(13, 20, 15, 0.24)',
  overlayStrong: 'rgba(13, 20, 15, 0.72)',
};

export const FONTS = {
  display: Platform.select({
    ios: 'Georgia',
    android: 'serif',
    default: 'serif',
  }),
  body: Platform.select({
    ios: 'Avenir Next',
    android: 'sans-serif-medium',
    default: 'sans-serif',
  }),
  bodyBold: Platform.select({
    ios: 'Avenir Next',
    android: 'sans-serif',
    default: 'sans-serif',
  }),
};

export const RADII = {
  xs: 8,
  sm: 12,
  md: 16,
  lg: 22,
  xl: 30,
  panel: 34,
};

export const SPACING = {
  xs: 6,
  sm: 10,
  md: 16,
  lg: 22,
  xl: 30,
  xxl: 40,
};

export const TYPE = {
  eyebrow: {
    fontFamily: FONTS.bodyBold,
    fontSize: 12,
    letterSpacing: 1.6,
    textTransform: 'uppercase' as const,
  },
  title: {
    fontFamily: FONTS.display,
    fontSize: 34,
    letterSpacing: 0.2,
  },
  section: {
    fontFamily: FONTS.display,
    fontSize: 26,
    letterSpacing: 0.15,
  },
  body: {
    fontFamily: FONTS.body,
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.1,
  },
  meta: {
    fontFamily: FONTS.body,
    fontSize: 13,
    letterSpacing: 0.3,
  },
};

export const SHADOW = {
  soft: {
    shadowColor: '#0D140F',
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.08,
    shadowRadius: 22,
    elevation: 6,
  },
  card: {
    shadowColor: '#0D140F',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 18,
    elevation: 5,
  },
};

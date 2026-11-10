/** Values read from the ENIGMA Figma frames; the file has no variables or components to sync from. */
export const colors = {
  background: '#121212',
  surface: '#1C1C1C',
  surfaceRaised: '#242424',
  border: '#3A3A3A',
  input: '#2A2A2A',
  gold: '#F2C94C',
  goldDim: '#B8962E',
  text: '#FFFFFF',
  textMuted: '#B5B5B5',
  textOnGold: '#1A1A1A',
  teal: '#1E4D4B',
  danger: '#E5484D',
  success: '#3FB950',
} as const;

export const fonts = {
  regular: 'Montserrat_400Regular',
  medium: 'Montserrat_500Medium',
  semibold: 'Montserrat_600SemiBold',
  bold: 'Montserrat_700Bold',
  extrabold: 'Montserrat_800ExtraBold',
} as const;

export const space = { xs: 4, sm: 8, md: 12, lg: 16, xl: 24, xxl: 32 } as const;

export const radius = { sm: 4, md: 8, lg: 12 } as const;

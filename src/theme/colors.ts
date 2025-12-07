import { useColorScheme } from 'react-native';

export const lightColors = {
  background: '#FFFFFF',
  surface: '#F5F5F5',
  text: '#000000',
  textSecondary: '#666666',
  textMuted: '#999999',
  border: '#E0E0E0',
  primary: '#007AFF',
  primaryDark: '#0051D5',
  danger: '#FF3B30',
  dangerDark: '#D32F2F',
  success: '#34C759',
  cardBackground: '#FFFFFF',
  cardBorder: '#E0E0E0',
  selectedBackground: '#E3F2FD',
  selectedBorder: '#007AFF',
  tagBackground: '#F0F0F0',
  tagText: '#666666',
  shadow: '#000000',
};

export const darkColors = {
  background: '#000000',
  surface: '#1C1C1E',
  text: '#FFFFFF',
  textSecondary: '#AEAEB2',
  textMuted: '#8E8E93',
  border: '#38383A',
  primary: '#0A84FF',
  primaryDark: '#0051D5',
  danger: '#FF453A',
  dangerDark: '#FF3B30',
  success: '#30D158',
  cardBackground: '#1C1C1E',
  cardBorder: '#38383A',
  selectedBackground: '#1A3A5C',
  selectedBorder: '#0A84FF',
  tagBackground: '#2C2C2E',
  tagText: '#AEAEB2',
  shadow: '#000000',
};

export const useThemeColors = () => {
  const colorScheme = useColorScheme();
  return colorScheme === 'dark' ? darkColors : lightColors;
};

export type ThemeColors = typeof lightColors;

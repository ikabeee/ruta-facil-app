export const colors = {
  primary: '#20c997',
  secondary: '#FF9800',
  success: '#20c997',
  error: '#F44336',
  warning: '#FFC107',
  info: '#20c997',
  
  background: '#F5F5F5',
  surface: '#FFFFFF',
  border: '#E0E0E0',
  
  textPrimary: '#212121',
  textSecondary: '#757575',
  textDisabled: '#BDBDBD',
} as const;

export const typography = {
  sizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 24,
    xxl: 32,
  },
  weights: {
    light: '300' as const,
    regular: '400' as const,
    medium: '500' as const,
    bold: '700' as const,
  },
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
} as const;

export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
} as const;
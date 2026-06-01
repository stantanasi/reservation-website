import { alpha, PaletteOptions } from '@mui/material';

export const COLORS = {
  primary: {
    main: '#1a1a18',
    light: '#2c2c2a',
    dark: '#0D0D0C',
    contrastText: '#f5f0e8',
  },
  secondary: {
    main: '#c9a96e',
    light: '#d9bc8e',
    dark: '#a8864a',
    contrastText: '#1a1a18',
  },
  background: {
    default: '#f5f0e8',
    paper: '#ffffff',
  },
  text: {
    primary: '#1a1a18',
    secondary: '#6b6b5e',
  },
  success: {
    main: '#5c8c6b',
  },
  error: {
    main: '#b85c50',
    dark: '#9a4c42',
  },
  divider: alpha('#6b6b5e', 0.2),
} as const satisfies Omit<PaletteOptions, 'mode'>;
'use client';

import { cormorant_garamond, dm_sans } from '@/app/fonts';
import { alpha, createTheme } from '@mui/material/styles';
import { COLORS } from './colors';

const theme = createTheme({
  palette: {
    mode: 'light',
    ...COLORS,
  },

  typography: {
    fontFamily: `${dm_sans.style.fontFamily}, "Helvetica Neue", Arial, sans-serif`,
    h1: {
      fontFamily: `${cormorant_garamond.style.fontFamily}, "Georgia", serif`,
      fontSize: 'clamp(2.5rem, 6vw, 5rem)',
      fontWeight: 400,
      letterSpacing: '-0.02em',
      lineHeight: 1.05,
    },
    h2: {
      fontFamily: `${cormorant_garamond.style.fontFamily}, "Georgia", serif`,
      fontSize: 'clamp(2rem, 4vw, 3.5rem)',
      fontWeight: 400,
      letterSpacing: '-0.015em',
      lineHeight: 1.1,
    },
    h3: {
      fontFamily: `${cormorant_garamond.style.fontFamily}, "Georgia", serif`,
      fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
      fontWeight: 500,
      letterSpacing: '-0.01em',
      lineHeight: 1.15,
    },
    h4: {
      fontFamily: `${cormorant_garamond.style.fontFamily}, "Georgia", serif`,
      fontSize: 'clamp(1.25rem, 2vw, 1.875rem)',
      fontWeight: 500,
      lineHeight: 1.2,
    },
    h5: {
      fontFamily: `${cormorant_garamond.style.fontFamily}, "Georgia", serif`,
      fontSize: '1.375rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h6: {
      fontFamily: `${cormorant_garamond.style.fontFamily}, "Georgia", serif`,
      fontSize: '1.125rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    subtitle1: {
      fontFamily: `${dm_sans.style.fontFamily}, sans-serif`,
      fontSize: '1.0625rem',
      fontWeight: 400,
      letterSpacing: '0.01em',
      lineHeight: 1.6,
    },
    subtitle2: {
      fontFamily: `${dm_sans.style.fontFamily}, sans-serif`,
      fontSize: '0.875rem',
      fontWeight: 500,
      letterSpacing: '0.08em',
      lineHeight: 1.5,
      textTransform: 'uppercase',
    },
    body1: {
      fontFamily: `${dm_sans.style.fontFamily}, sans-serif`,
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.7,
    },
    body2: {
      fontFamily: `${dm_sans.style.fontFamily}, sans-serif`,
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.6,
    },
    caption: {
      display: 'block',
      fontFamily: `${dm_sans.style.fontFamily}, sans-serif`,
      fontSize: '0.75rem',
      fontWeight: 400,
      letterSpacing: '0.05em',
    },
    overline: {
      color: COLORS.secondary.main,
      fontFamily: `${dm_sans.style.fontFamily}, sans-serif`,
      fontSize: '0.6875rem',
      fontWeight: 500,
      letterSpacing: '0.15em',
      textTransform: 'uppercase',
    },
    button: {
      fontFamily: `${dm_sans.style.fontFamily}, sans-serif`,
      fontSize: '0.8125rem',
      fontWeight: 500,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
    },
  },

  shape: {
    borderRadius: 2,
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: `
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        a {
          color: inherit;
          text-decoration: none;
        }
      `,
    },

    MuiStack: {
      defaultProps: {
        useFlexGap: true,
      },
    },

    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          padding: '12px 32px',
          transition: 'all 0.3s ease',
          letterSpacing: '0.12em',
          fontSize: '0.75rem',
        },
        contained: {
          backgroundColor: COLORS.secondary.main,
          color: COLORS.primary.main,
          '&:hover': {
            backgroundColor: COLORS.secondary.dark,
            transform: 'translateY(-1px)',
          },
        },
        outlined: {
          borderColor: COLORS.secondary.main,
          color: COLORS.secondary.main,
          '&:hover': {
            borderColor: COLORS.secondary.dark,
            color: COLORS.secondary.dark,
          },
        },
        text: {
          color: COLORS.text.secondary,
          padding: '8px 16px',
          '&:hover': {
            backgroundColor: alpha(COLORS.primary.main, 0.04),
          },
        },

        sizeSmall: {
          fontSize: '0.65rem',
          padding: '6px 12px',
        },
      },
    },

    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: alpha(COLORS.text.secondary, 0.2),
        },
      },
    },

    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: COLORS.secondary.main,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          fontFamily: `${dm_sans.style.fontFamily}, sans-serif`,
          fontSize: '0.75rem',
          fontWeight: 500,
          letterSpacing: '0.1em',
          minWidth: 'auto',
          padding: '12px 24px',
          textTransform: 'uppercase',
        },
      },
    },

    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: COLORS.text.secondary,
          '&.Mui-checked': {
            color: COLORS.secondary.main,
          }
        },
      },
    },

    MuiTextField: {
      defaultProps: { variant: 'outlined' },
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: '#fff',
            '& fieldset': {
              borderColor: alpha(COLORS.text.secondary, 0.3),
            },
            '&:hover fieldset': {
              borderColor: COLORS.text.secondary,
            },
            '&.Mui-focused fieldset': {
              borderColor: COLORS.secondary.main,
              borderWidth: '1px',
            },
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: COLORS.secondary.main,
          },
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          border: `1px solid ${alpha(COLORS.text.secondary, 0.15)}`,
          boxShadow: 'none',
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: 16,
          '&:last-child': {
            paddingBottom: 16,
          },
        },
      },
    },

    MuiChip: {
      styleOverrides: {
        root: {
          backgroundColor: alpha(COLORS.secondary.main, 0.1),
          borderRadius: 2,
          color: COLORS.secondary.dark,
          fontSize: '0.7rem',
          letterSpacing: '0.05em',
        },
      },
    },

    MuiSwitch: {
      styleOverrides: {
        root: {
          '& .Mui-checked+.MuiSwitch-track': {
            backgroundColor: COLORS.secondary.main,
          },
          '& .Mui-checked .MuiSwitch-thumb': {
            color: COLORS.secondary.main,
          },
        },
      },
    },

    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: 'inherit',
          fontSize: 'inherit',
        },
      },
    },

    MuiAvatar: {
      styleOverrides: {
        root: {
          backgroundColor: alpha(COLORS.secondary.main, 0.15),
          borderRadius: 0,
          color: COLORS.secondary.main,
          fontFamily: `${cormorant_garamond.style.fontFamily}, serif`,
          fontSize: '1.2rem',
        },
      },
    },


    MuiBreadcrumbs: {
      styleOverrides: {
        root: { fontSize: '0.75rem', letterSpacing: '0.05em' },
      },
    },

    MuiTableHead: {
      styleOverrides: {
        root: {
          '& .MuiTableCell-head': {
            fontWeight: 500,
            fontSize: '0.7rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: COLORS.text.secondary,
            borderBottom: `2px solid ${alpha(COLORS.text.secondary, 0.2)}`,
            padding: '16px 24px',
          },
        },
      },
    },

    MuiTableCell: {
      styleOverrides: {
        root: {
          borderColor: alpha(COLORS.text.secondary, 0.1),
          padding: '16px 24px',
          fontSize: '0.875rem',
        },
      },
    },

    MuiSelect: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: alpha(COLORS.text.secondary, 0.3),
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: COLORS.text.secondary,
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: COLORS.secondary.main,
            borderWidth: '1px',
          },
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
        },
        elevation1: {
          boxShadow: `0 2px 20px ${alpha(COLORS.primary.main, 0.06)}`,
        },
        elevation2: {
          boxShadow: `0 4px 30px ${alpha(COLORS.primary.main, 0.08)}`,
        },
        elevation3: {
          boxShadow: `0 8px 40px ${alpha(COLORS.primary.main, 0.1)}`,
        },
      },
    },

    MuiDialog: {
      styleOverrides: {
        paper: {
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          fontFamily: `${cormorant_garamond.style.fontFamily}, serif`,
          fontSize: '1.5rem',
          fontWeight: 400,
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          padding: '16px 24px',
        }
      },
    },

    MuiAlert: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          fontSize: '0.75rem',

          ...(ownerState.severity === 'info' && ({
            backgroundColor: alpha(COLORS.secondary.main, 0.05),
            border: `1px solid ${alpha(COLORS.secondary.main, 0.18)}`,
            color: COLORS.text.secondary,
            '& .MuiAlert-icon': {
              alignSelf: 'center',
              color: COLORS.secondary.main,
            },
          }))
        }),
      },
    },

    MuiLinearProgress: {
      styleOverrides: {
        root: {
          height: 6,
          backgroundColor: alpha(COLORS.secondary.main, 0.15),
        },
        bar: {
          backgroundColor: COLORS.secondary.main,
        },
      },
    },
  },
});

export default theme;
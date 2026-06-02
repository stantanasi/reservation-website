import { cormorant_garamond, dm_sans } from '@/app/fonts';
import { COLORS } from '@/themes/colors';
import { Stack, SxProps, Theme, Typography } from '@mui/material';

type Props = {
  variant?: 'default' | 'admin';
  size?: 'small' | 'medium' | 'large';
  mode?: 'light' | 'dark';
  sx?: SxProps<Theme>;
};

export default function Logo({
  variant = 'default',
  size = 'medium',
  mode = 'light',
  sx,
}: Props) {
  return (
    <Stack
      direction="column"
      sx={[{
        width: 'fit-content',
        alignItems: 'center',
      }, ...(Array.isArray(sx) ? sx : [sx])]}
    >
      <Typography
        sx={{
          color: mode === 'light' ? COLORS.primary.contrastText : COLORS.primary.main,
          fontFamily: `${cormorant_garamond.style.fontFamily}, serif`,
          fontSize: size === 'small' ? { xs: '1.25rem', md: '1.5rem' }
            : size === 'medium' ? { xs: '1.75rem', md: '2rem' }
              : { xs: '2.5rem', md: '3.5rem' },
          fontWeight: 400,
          letterSpacing: '0.05em',
          lineHeight: 1,
          transition: 'color 0.4s ease',
        }}
      >
        SÉRÉNA
      </Typography>

      <Typography
        sx={{
          color: COLORS.secondary.main,
          fontFamily: `${dm_sans.style.fontFamily}, sans-serif`,
          fontSize: size === 'small' ? { xs: '0.45rem', md: '0.5rem' }
            : size === 'medium' ? { xs: '0.55rem', md: '0.6rem' }
              : { xs: '0.7rem', md: '0.85rem' },
          letterSpacing: size === 'small' ? '0.25em'
            : size === 'medium' ? '0.3em'
              : '0.35em',
          textTransform: 'uppercase',
        }}
      >
        {variant === 'default' ? 'Studio · Paris' : 'Administration'}
      </Typography>
    </Stack>
  );
}
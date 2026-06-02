import { cormorant_garamond } from '@/app/fonts';
import { COLORS } from '@/themes/colors';
import { alpha, Box, Breakpoint, Container, Divider, Stack, SxProps, Theme, Typography, TypographyVariant } from '@mui/material';
import { PropsWithChildren } from 'react';

function SectionHeader({
  overline: overlineProp,
  title: titleProp,
  subtitle: subtitleProp,
  align = 'center',
  mode = 'light',
  sx,
}: {
  overline?: Props['overline'];
  title: NonNullable<Props['title']>;
  subtitle?: Props['subtitle'];
  align?: Props['align'];
  mode?: Props['mode'];
  sx?: SxProps<Theme>;
}) {
  const overline = overlineProp
    ? typeof overlineProp === 'object' && 'text' in overlineProp
      ? overlineProp
      : { text: overlineProp }
    : undefined;
  const title = typeof titleProp === 'object' && 'text' in titleProp
    ? titleProp
    : { text: titleProp };
  const subtitle = subtitleProp
    ? typeof subtitleProp === 'object' && 'text' in subtitleProp
      ? subtitleProp
      : { text: subtitleProp }
    : undefined;

  return (
    <Stack
      direction="column"
      sx={[{
        alignItems: align === 'left' ? 'flex-start'
          : align === 'right' ? 'flex-end'
            : 'center',
        marginBottom: { xs: 5, md: 7 },
        textAlign: align,
      }, ...(Array.isArray(sx) ? sx : [sx])]}
    >
      {overline && (
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center', marginBottom: 2 }}>
          <Divider sx={{ width: 32, borderColor: COLORS.secondary.main }} />

          <Typography variant="overline">
            {overline.text}
          </Typography>

          <Divider sx={{ width: 32, borderColor: COLORS.secondary.main }} />
        </Stack>
      )}

      <Typography
        variant={title.variant ?? 'h2'}
        sx={{
          color: mode === 'light' ? COLORS.primary.main : COLORS.primary.contrastText,
          '& em': {
            color: COLORS.secondary.main,
            fontStyle: 'italic',
          },
        }}
      >
        {title.text}
      </Typography>

      {subtitle && (
        <Typography
          variant="subtitle1"
          sx={{
            color: mode === 'light' ? COLORS.text.secondary : alpha(COLORS.primary.contrastText, 0.6),
            marginTop: 2.5,
            maxWidth: 560,
            lineHeight: 1.8,
          }}
        >
          {subtitle.text}
        </Typography>
      )}
    </Stack>
  );
}


type Props = PropsWithChildren<{
  overline?: string | React.ReactElement | {
    text: string | React.ReactElement;
  };
  title?: string | React.ReactElement | {
    text: string | React.ReactElement;
    variant?: TypographyVariant;
  };
  subtitle?: string | React.ReactElement | {
    text: string | React.ReactElement;
  };
  align?: 'left' | 'center' | 'right';
  background?: string | {
    color?: string;
    image?: string;
    text?: string;
  };
  maxWidth?: Breakpoint | false | undefined;
  mode?: 'light' | 'dark';
  sx?: SxProps<Theme>;
}>;

export default function Section({
  overline,
  title,
  subtitle,
  align = 'center',
  background,
  maxWidth = 'lg',
  mode = 'light',
  sx,
  children,
}: Props) {
  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        background: typeof background === 'string' ? background
          : background?.color ? background.color
            : mode === 'light' ? COLORS.primary.contrastText : COLORS.primary.main,
      }}
    >
      {(background && typeof background === 'object' && background.image) && (<>
        <Box
          component="img"
          src={background.image}
          alt="Séréna Studio"
          sx={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            inset: 0,
            objectFit: 'cover',
            filter: 'brightness(0.55)',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: `linear-gradient(
              135deg,
              ${alpha(mode === 'light' ? COLORS.primary.contrastText : COLORS.primary.main, 0.7)} 0%,
              ${alpha(mode === 'light' ? COLORS.primary.contrastText : COLORS.primary.main, 0.3)} 60%,
              transparent 100%
            )`,
          }}
        />
      </>)}

      {(background && typeof background === 'object' && background.text) && (
        <Typography
          sx={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            color: mode === 'light' ? alpha(COLORS.primary.main, 0.02) : alpha(COLORS.primary.contrastText, 0.03),
            fontFamily: `${cormorant_garamond.style.fontFamily}, serif`,
            fontSize: { xs: '6rem', md: '12rem' },
            fontWeight: 700,
            lineHeight: 1,
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
          {background.text}
        </Typography>
      )}

      <Container
        maxWidth={maxWidth}
        sx={{
          position: 'relative',
          display: 'flex',
          alignItems: align === 'left' ? 'flex-start'
            : align === 'right' ? 'flex-end'
              : 'center',
          flexDirection: 'column',
          paddingY: { xs: 8, md: 14 },
          ...(Array.isArray(sx) ? sx.reduce((acc, curr) => ({ ...acc, ...curr }), {}) : sx),
        }}
      >
        {title && (
          <SectionHeader
            overline={overline}
            title={title}
            subtitle={subtitle}
            align={align}
            mode={mode}
            sx={!children ? { marginBottom: { xs: 0, md: 0 } } : undefined}
          />
        )}

        {children}
      </Container>
    </Box>
  );
}

Section.Header = SectionHeader;
import { COLORS } from '@/themes/colors';
import { alpha, Button, Divider, Grid, Stack, Typography } from '@mui/material';
import { Metadata } from 'next';
import Link from 'next/link';
import Section from './_components/Section';

export const metadata: Metadata = {
  title: 'Séréna Studio — Institut Beauté & Bien-Être Paris',
  description: 'Un sanctuaire de beauté et de bien-être au cœur de Paris. Massages holistiques, soins visage prestige, rituels corps et bien-être. Réservez votre moment d\'exception en ligne.',
};

export default function HomePage() {
  return (
    <main>
      <Section
        overline="Institut Beauté & Bien-Être · Paris"
        title={{
          text: <>L'art du soin, <em>sublimé</em></>,
          variant: 'h1',
        }}
        subtitle="Un sanctuaire de beauté et de bien-être au cœur de Paris, où chaque soin est une invitation au voyage intérieur."
        align="left"
        background={{
          image: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=1800&q=85'
        }}
        mode="dark"
        sx={{
          justifyContent: 'center',
          minHeight: '100vh',
        }}
      >
        <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap' }}>
          <Link href="/booking">
            <Button variant="contained" size="large">
              Réserver un Soin
            </Button>
          </Link>

          <Link href="/services">
            <Button variant="outlined" size="large">
              Nos Prestations
            </Button>
          </Link>
        </Stack>

        <Stack
          direction="column"
          spacing={1}
          sx={{
            position: 'absolute',
            bottom: 32,
            left: 0,
            right: 0,
            alignItems: 'center',
            animation: 'bounce 2s infinite',
            '@keyframes bounce': {
              '0%, 100%': { transform: 'translateY(0)' },
              '50%': { transform: 'translateY(-8px)' },
            },
          }}
        >
          <Divider orientation="vertical" sx={{ height: 48, borderColor: alpha(COLORS.primary.contrastText, 0.3) }} />
          <Typography
            sx={{
              color: alpha(COLORS.primary.contrastText, 0.4),
              fontSize: '0.55rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
            }}
          >
            Scroll
          </Typography>
        </Stack>
      </Section>

      <Section maxWidth="xl" mode="dark" sx={{ paddingY: 4 }}>
        <Grid container spacing="1px" sx={{ width: '100%', background: alpha(COLORS.primary.contrastText, 0.1) }}>
          {[
            { value: '15+', label: "Années d'expertise" },
            { value: '2 400+', label: 'Clientes fidèles' },
            { value: '98%', label: 'Satisfaction' },
            { value: '8', label: 'Experts dédiés' },
          ].map(({ value, label }) => (
            <Grid
              key={label}
              size={{ xs: 6, md: 3 }}
              sx={{
                background: COLORS.primary.main,
                paddingY: 2,
                textAlign: 'center'
              }}
            >
              <Typography variant="h3" sx={{ color: COLORS.secondary.main, marginBottom: 0.5 }}>
                {value}
              </Typography>

              <Typography
                sx={{
                  color: alpha(COLORS.primary.contrastText, 0.4),
                  fontSize: '0.65rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                }}
              >
                {label}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Section>
    </main>
  );
}
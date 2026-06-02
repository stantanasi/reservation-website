import { COLORS } from '@/themes/colors';
import { alpha, Button, Divider, Stack, Typography } from '@mui/material';
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
    </main>
  );
}
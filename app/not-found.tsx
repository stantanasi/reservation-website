import Footer from '@/app/(public)/_components/Footer';
import Navbar from '@/app/(public)/_components/Navbar';
import Section from '@/app/(public)/_components/Section';
import { cormorant_garamond } from '@/app/fonts';
import { COLORS } from '@/themes/colors';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import HomeIcon from '@mui/icons-material/Home';
import { alpha, Box, Button, Stack, Typography } from '@mui/material';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Page introuvable',
  description: 'Cette page n\'existe pas ou a été déplacée. Retournez à l\'accueil de Séréna Studio.',
};

export default function NotFoundPage() {
  return (
    <>
      <Navbar />

      <main>
        <Box
          sx={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            background: COLORS.primary.contrastText,
            justifyContent: 'center',
            minHeight: 'calc(100vh - 80px)',
          }}
        >
          <Typography
            aria-hidden
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              color: alpha(COLORS.text.secondary, 0.06),
              fontFamily: `${cormorant_garamond.style.fontFamily}, serif`,
              fontSize: { xs: '40vw', md: '28vw' },
              fontWeight: 700,
              pointerEvents: 'none',
              transform: 'translate(-50%, -50%)',
              userSelect: 'none',
            }}
          >
            404
          </Typography>

          {[280, 180, 100].map((size) => (
            <Box
              key={size}
              sx={{
                width: size,
                height: size,
                position: 'absolute',
                top: '50%',
                left: '50%',
                display: { xs: 'none', md: 'block' },
                border: `1px solid ${alpha(COLORS.secondary.main, 0.08)}`,
                borderRadius: '50%',
                pointerEvents: 'none',
                transform: 'translate(-50%, -50%)',
              }}
            />
          ))}

          <Section
            overline="Page introuvable"
            title="Cette page n'existe pas"
            subtitle="La page que vous recherchez a peut-être été déplacée, supprimée, ou n'a jamais existé."
            background="transparent"
            maxWidth="sm"
          >
            <Stack direction="row" spacing={2} sx={{ alignItems: 'center', marginBottom: 6 }}>
              <Link href="/">
                <Button
                  variant="contained"
                  startIcon={<HomeIcon />}
                >
                  Retour à l'accueil
                </Button>
              </Link>
              <Link href="/booking">
                <Button
                  variant="outlined"
                  startIcon={<CalendarMonthIcon />}
                >
                  Réserver un soin
                </Button>
              </Link>
            </Stack>

            <Typography variant="caption" sx={{ color: COLORS.text.secondary, letterSpacing: '0.1em', marginBottom: 2.5, textTransform: 'uppercase' }}>
              Liens utiles
            </Typography>

            <Stack direction="row" spacing={3} sx={{ alignItems: 'center', flexWrap: 'wrap' }}>
              {[
                { label: 'Nos Soins', href: '/services' },
                { label: 'L\'Équipe', href: '/equipe' },
                { label: 'À Propos', href: '/about' },
                { label: 'Contact', href: '/contact' },
              ].map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                >
                  <Button variant="text" size="small">
                    {label}
                  </Button>
                </Link>
              ))}
            </Stack>
          </Section>
        </Box>
      </main>

      <Footer />
    </>
  );
}
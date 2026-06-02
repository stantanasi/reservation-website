import ServiceCard from '@/app/(public)/_components/ServiceCard';
import { SERVICES } from '@/data/services.data';
import { COLORS } from '@/themes/colors';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SpaIcon from '@mui/icons-material/Spa';
import StarIcon from '@mui/icons-material/Star';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import { alpha, Box, Button, Divider, Grid, Stack, Typography } from '@mui/material';
import { Metadata } from 'next';
import Link from 'next/link';
import Section from './_components/Section';

export const metadata: Metadata = {
  title: 'Séréna Studio — Institut Beauté & Bien-Être Paris',
  description: 'Un sanctuaire de beauté et de bien-être au cœur de Paris. Massages holistiques, soins visage prestige, rituels corps et bien-être. Réservez votre moment d\'exception en ligne.',
};

export default function HomePage() {
  const services = SERVICES
    .filter((service) => service.featured);

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

      <Section
        overline="Nos Signatures"
        title="Soins d'Exception"
        subtitle="Chaque soin est une œuvre pensée pour vous — protocoles d'expert, produits rares, mains expertes."
        maxWidth="xl"
      >
        <Grid container spacing={3} sx={{ width: '100%', marginBottom: 6 }}>
          {services.map((service) => (
            <Grid
              key={service.id}
              size={{ xs: 12, sm: 6, lg: 4 }}
            >
              <ServiceCard
                service={service}
              />
            </Grid>
          ))}
        </Grid>

        <Link href="/services">
          <Button
            variant="outlined"
            endIcon={<ArrowForwardIcon />}
          >
            Voir toutes les prestations
          </Button>
        </Link>
      </Section>

      <Section align="left" background="#ffffff" maxWidth="xl">
        <Grid container spacing={{ xs: 4, md: 8 }} sx={{ alignItems: 'center' }}>
          <Grid size={{ xs: 12, md: 5 }} sx={{ position: 'relative' }}>
            <Box
              component="img"
              src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80"
              alt="Soin Séréna Studio"
              sx={{
                width: '100%',
                height: { xs: 300, md: 500 },
                objectFit: 'cover',
                display: 'block'
              }}
            />

            <Stack
              direction="column"
              sx={{
                position: 'absolute',
                bottom: -20,
                right: -20,
                display: { xs: 'none', md: 'flex' },
                alignItems: 'center',
                aspectRatio: 1 / 1,
                background: COLORS.secondary.main,
                justifyContent: 'center',
                padding: 3,
              }}
            >
              <Typography variant="h3">
                15
              </Typography>
              <Typography
                sx={{
                  color: COLORS.primary.light,
                  fontSize: '0.55rem',
                  letterSpacing: '0.12em',
                  textAlign: 'center',
                  textTransform: 'uppercase',
                }}
              >
                Ans<br />
                d'Excellence
              </Typography>
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, md: 7 }}>
            <Section.Header
              overline="Notre Philosophie"
              title="L'excellence au service de votre beauté"
              subtitle="Chez Séréna, nous croyons que prendre soin de soi est un acte fondamental — non pas de vanité, mais de respect envers soi-même."
              align="left"
            />

            <Grid container spacing={3}>
              {[
                {
                  icon: <WorkspacePremiumIcon />,
                  title: 'Produits d\'Exception',
                  text: 'Nous sélectionnons uniquement des cosmétiques bio et haut de gamme — Biologique Recherche, Kérastase, Oribe.',
                },
                {
                  icon: <SpaIcon />,
                  title: 'Protocoles Sur-Mesure',
                  text: 'Chaque soin est adapté à votre peau, vos besoins du moment et vos aspirations. Aucune routine standardisée.',
                },
                {
                  icon: <AccessTimeIcon />,
                  title: 'Un Temps Suspendu',
                  text: 'Le studio est conçu pour que vous oubliiez le temps. Ambiance feutrée, arômes délicats, service discret et attentionné.',
                },
                {
                  icon: <StarIcon />,
                  title: 'Équipe Experte',
                  text: 'Nos praticiens cumulent en moyenne 10 ans d\'expérience et se forment continuellement aux dernières techniques.',
                },
              ].map((item) => (
                <Grid key={item.title} size={{ xs: 12, sm: 6 }}>
                  <Stack direction="row" spacing={2}>
                    <Box sx={{ color: COLORS.secondary.main, fontSize: 28 }}>{item.icon}</Box>

                    <Stack direction="column" spacing={1}>
                      <Typography variant="h6">
                        {item.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: COLORS.text.secondary, lineHeight: 1.7 }}>
                        {item.text}
                      </Typography>
                    </Stack>
                  </Stack>
                </Grid>
              ))}
            </Grid>

            <Link href="/about">
              <Button
                variant="contained"
                endIcon={<ArrowForwardIcon />}
                sx={{
                  marginTop: 5,
                }}
              >
                Notre Histoire
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Section>
    </main>
  );
}
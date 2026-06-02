import ServiceCard from '@/app/(public)/_components/ServiceCard';
import { SERVICES } from '@/data/services.data';
import { STAFF } from '@/data/staff.data';
import { COLORS } from '@/themes/colors';
import { CATEGORY_LABELS } from '@/types/service.type';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import EuroIcon from '@mui/icons-material/Euro';
import { alpha, Box, Breadcrumbs, Button, Card, Chip, Container, Divider, Grid, Stack, Typography } from '@mui/material';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Section from '../../_components/Section';
import StaffCard from '../../_components/StaffCard';

type Props = {
  params: Promise<{ slug: string; }>;
};

export async function generateStaticParams() {
  return SERVICES.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);

  if (!service) {
    return {
      title: 'Soin introuvable',
      description: 'Ce soin n\'existe pas ou n\'est plus disponible.',
    };
  }

  return {
    title: service.name,
    description: `${service.shortDescription}. ${service.duration} minutes · ${service.price} €. Réservez votre ${service.name} en ligne chez Séréna Studio, Paris.`,
  };
}

export default async function ServicePage({
  params,
}: Props) {
  const { slug } = await params;

  const service = SERVICES
    .map((service) => ({
      ...service,
      staff: service.staff.map((id) => STAFF.find((member) => member.id === id as string)!),
    }))
    .find((service) => service.slug === slug);
  if (!service) {
    notFound();
  }

  const related = SERVICES.filter((s) => s.category === service.category && s.id !== service.id);

  return (
    <main>
      <Section
        align="left"
        background={{
          image: service.image,
        }}
        maxWidth="xl"
        mode="dark"
        sx={{
          height: { xs: 320, md: 480 },
          justifyContent: 'flex-end',
          paddingBottom: { xs: 6, md: 6 },
        }}
      >
        <Breadcrumbs separator=">" sx={{ color: alpha(COLORS.primary.contrastText, 0.4), mb: 2 }}>
          <Link href="/">
            <Typography
              sx={{
                color: alpha(COLORS.primary.contrastText, 0.5),
                fontSize: '0.75rem',
                '&:hover': {
                  color: COLORS.primary.contrastText,
                },
              }}
            >
              Accueil
            </Typography>
          </Link>
          <Link href="/services">
            <Typography
              sx={{
                color: alpha(COLORS.primary.contrastText, 0.5),
                fontSize: '0.75rem',
                '&:hover': {
                  color: COLORS.primary.contrastText,
                },
              }}
            >
              Prestations
            </Typography>
          </Link>
          <Typography sx={{ color: COLORS.secondary.main, fontSize: '0.75rem' }}>
            {service.name}
          </Typography>
        </Breadcrumbs>

        <Chip
          label={CATEGORY_LABELS[service.category]}
          size="small"
          sx={{ mb: 2, background: COLORS.secondary.main, color: COLORS.primary.main, fontSize: '0.65rem' }}
        />

        <Typography variant="h1" sx={{ color: COLORS.primary.contrastText, fontWeight: 300, maxWidth: 600 }}>
          {service.name}
        </Typography>

        <Typography sx={{ color: alpha(COLORS.primary.contrastText, 0.7), mt: 1.5, fontSize: '1.05rem', maxWidth: 480 }}>
          {service.shortDescription}
        </Typography>
      </Section>

      <Box
        component="section"
        sx={{
          position: 'sticky',
          top: { xs: 57, md: 65 },
          display: { xs: 'block', md: 'none' },
          background: '#fff',
          borderBottom: `1px solid ${alpha(COLORS.text.secondary, 0.15)}`,
          paddingY: 2,
          zIndex: 100,
        }}
      >
        <Container maxWidth="xl" sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h5">
              {service.price} €
            </Typography>

            <Typography variant="caption" sx={{ color: COLORS.text.secondary }}>
              {service.duration} min
            </Typography>
          </Box>

          <Link href={`/booking?service=${service.slug}`}>
            <Button variant="contained">
              Réserver
            </Button>
          </Link>
        </Container>
      </Box>

      <Section>
        <Grid container spacing={{ xs: 4, md: 8 }} sx={{ width: '100%' }}>
          <Grid size={{ xs: 12, md: 7 }}>
            <Stack direction="row" spacing={4} sx={{ flexWrap: 'wrap', mb: 5 }}>
              {[
                { icon: <AccessTimeIcon />, label: 'Durée', value: `${service.duration} min` },
                { icon: <EuroIcon />, label: 'Tarif', value: `${service.price} €` },
              ].map(({ icon, label, value }) => (
                <Stack
                  key={label}
                  direction="row"
                  spacing={1.5}
                  sx={{
                    alignItems: 'center',
                  }}
                >
                  <Typography sx={{ color: COLORS.secondary.main }}>
                    {icon}
                  </Typography>

                  <Box>
                    <Typography sx={{ fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: COLORS.text.secondary }}>
                      {label}
                    </Typography>

                    <Typography variant="h5">
                      {value}
                    </Typography>
                  </Box>
                </Stack>
              ))}
            </Stack>

            <Divider sx={{ mb: 5 }} />

            <Typography variant="h4" sx={{ mb: 3 }}>
              À propos de ce soin
            </Typography>

            <Typography variant="body1" sx={{ color: COLORS.text.secondary, lineHeight: 2, mb: 5 }}>
              {service.description}
            </Typography>

            {service.staff.length > 0 && (<>
              <Typography variant="h5" sx={{ mb: 3 }}>
                Réalisé par
              </Typography>

              <Grid container spacing={2}>
                {service.staff.map((member) => (
                  <Grid key={member.id} size={{ xs: 12, sm: 6 }}>
                    <Link href="/equipe">
                      <StaffCard
                        staff={member}
                        variant="compact"
                      />
                    </Link>
                  </Grid>
                ))}
              </Grid>
            </>)}
          </Grid>

          <Grid size={{ xs: 12, md: 5 }}>
            <Card
              sx={{
                position: { md: 'sticky' },
                top: { md: 108 },
                padding: 4,
              }}
            >
              <Stack direction="row" sx={{ alignItems: 'center', mb: 4 }}>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h3">
                    {service.price} €
                  </Typography>

                  <Typography variant="caption" sx={{ color: COLORS.text.secondary }}>
                    par séance · {service.duration} minutes
                  </Typography>
                </Box>

                {service.featured && (
                  <Chip
                    label="Soin Signature"
                    size="small"
                  />
                )}
              </Stack>

              <Divider sx={{ mb: 4 }} />

              <Stack direction="column" spacing={2}>
                {[
                  'Consultation personnalisée incluse',
                  'Produits bio & premium',
                  'Confirmation immédiate par email',
                  'Annulation gratuite 24h avant',
                ].map((point) => (
                  <Stack
                    key={point}
                    direction="row"
                    spacing={1.5}
                    sx={{
                      alignItems: 'center',
                    }}
                  >
                    <Box sx={{ width: 4, height: 4, background: COLORS.secondary.main, borderRadius: '50%' }} />

                    <Typography variant="body2" sx={{ color: COLORS.text.secondary }}>
                      {point}
                    </Typography>
                  </Stack>
                ))}
              </Stack>

              <Link href={`/booking?service=${service.slug}`}>
                <Button
                  variant="contained"
                  startIcon={<CalendarMonthOutlinedIcon />}
                  size="large"
                  fullWidth
                  sx={{
                    marginTop: 4,
                  }}
                >
                  Réserver ce Soin
                </Button>
              </Link>

              <Link href="/contact">
                <Button
                  variant="text"
                  fullWidth
                  sx={{
                    marginTop: 1,
                  }}
                >
                  Une question ? Nous contacter
                </Button>
              </Link>
            </Card>
          </Grid>
        </Grid>
      </Section>

      {related.length > 0 && (
        <Section
          overline="À Découvrir"
          title="Soins similaires"
          subtitle="D'autres expériences dans la même catégorie"
          background="#ffffff"
          maxWidth="xl"
        >
          <Grid container spacing={3} sx={{ width: '100%' }}>
            {related.slice(0, 3).map((service) => (
              <Grid
                key={service.id}
                size={{ xs: 12, sm: 6, md: 4 }}
              >
                <ServiceCard service={service} />
              </Grid>
            ))}
          </Grid>
        </Section>
      )}
    </main >
  );
}
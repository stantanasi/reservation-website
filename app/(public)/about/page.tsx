import Section from '@/app/(public)/_components/Section';
import { cormorant_garamond } from '@/app/fonts';
import { STAFF } from '@/data/staff.data';
import { COLORS } from '@/themes/colors';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { alpha, Avatar, Box, Button, Divider, Grid, Stack, Typography } from '@mui/material';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Notre Histoire',
  description: 'Découvrez l\'histoire de Séréna Studio : 15 ans d\'expertise, une fondatrice passionnée, et une philosophie du soin qui place l\'excellence et la singularité au cœur de chaque expérience.',
};

export default function AboutPage() {
  const director = STAFF[0];

  return (
    <main>
      <Section
        overline="Notre Histoire"
        title={{
          text: "Quinze ans de passion pour l'excellence",
          variant: 'h1',
        }}
        align="left"
        background={{
          image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1600&q=85',
        }}
        mode="dark"
      />

      <Section>
        <Grid container spacing={{ xs: 6, md: 10 }} sx={{ alignItems: 'center' }}>
          <Grid size={{ xs: 12, md: 5 }}>
            <Section.Header
              overline="Le Mot de la Fondatrice"
              title={{
                text: '"J\'ai créé Séréna parce que je croyais qu\'il manquait quelque chose à Paris."',
                variant: 'h3',
              }}
              align="left"
            />

            <Typography variant="body1" sx={{ color: COLORS.text.secondary, lineHeight: 2, mb: 3 }}>
              Un endroit où le luxe ne soit pas dans le marbre ni dans les prix, mais dans la qualité de la présence. Dans l'attention portée à chaque cliente. Dans la conviction que prendre soin de soi n'est pas un caprice — c'est une nécessité.
            </Typography>

            <Typography variant="body1" sx={{ color: COLORS.text.secondary, lineHeight: 2 }}>
              Quinze ans plus tard, Séréna est toujours guidé par cette même philosophie. Nous avons grandi, nous avons évolué, mais nous n'avons jamais transigé sur ce qui compte : l'excellence, la singularité, et votre bien-être.
            </Typography>

            <Stack direction="row" spacing={2} sx={{ alignItems: 'center', mt: 4 }}>
              <Avatar
                src={director.image}
                alt={`${director.firstName} ${director.lastName}`}
                sx={{ width: 52, height: 52 }}
              />

              <Box>
                <Typography variant="h6">
                  {director.firstName} {director.lastName}
                </Typography>

                <Typography variant="caption" sx={{ color: COLORS.text.secondary }}>
                  {director.role}
                </Typography>
              </Box>
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, md: 7 }} sx={{ position: 'relative' }}>
            <Box
              component="img"
              src="https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=900&q=80"
              alt="Séréna Studio intérieur"
              sx={{
                width: '100%',
                height: { xs: 300, md: 460 },
                objectFit: 'cover',
              }}
            />

            <Box
              sx={{
                position: 'absolute',
                bottom: -24,
                left: -24,
                width: 160,
                height: 160,
                display: { xs: 'none', md: 'block' },
                border: `2px solid ${alpha(COLORS.secondary.main, 0.3)}`,
                pointerEvents: 'none',
              }}
            />
          </Grid>
        </Grid>
      </Section>

      <Section
        overline="Ce en quoi nous croyons"
        title="Nos Valeurs"
        background="#ffffff"
      >
        <Grid container spacing={6}>
          {[
            {
              number: '01',
              title: "L'Expertise",
              text: 'Chaque praticien est formé aux meilleures techniques mondiales et se perfectionne en continu. Nous n\'acceptons pas la médiocrité — ni dans nos protocoles, ni dans nos produits.',
            },
            {
              number: '02',
              title: 'La Singularité',
              text: 'Aucun soin n\'est identique à un autre. Nous adaptons chaque protocole à la personne qui est devant nous — sa peau, son état d\'esprit, ses besoins du moment.',
            },
            {
              number: '03',
              title: "L'Éthique",
              text: 'Produits bio et certifiés, partenaires engagés, pratiques responsables. Prendre soin de vous ne peut pas se faire au détriment de la planète ou des producteurs.',
            },
            {
              number: '04',
              title: 'Le Temps',
              text: 'Chez Séréna, le temps n\'est pas compté. Chaque rdv commence par une consultation et se termine quand vous êtes prête — jamais avant.',
            },
          ].map(({ number, title, text }) => (
            <Grid key={number} size={{ xs: 12, sm: 6, md: 3 }}>
              <Box>
                <Typography variant="h1" sx={{ color: alpha(COLORS.secondary.main, 0.5) }}>
                  {number}
                </Typography>

                <Divider sx={{ width: 32, borderColor: COLORS.secondary.main, mb: 2.5 }} />

                <Typography variant="h5" sx={{ fontSize: '1.1rem', mb: 1.5 }}>
                  {title}
                </Typography>

                <Typography variant="body2" sx={{ color: COLORS.text.secondary, lineHeight: 1.8 }}>
                  {text}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Section>

      <Section
        overline="Notre Parcours"
        title="15 ans d'histoire"
        mode="dark"
      >
        <Box sx={{ position: 'relative' }}>
          <Divider
            orientation="vertical"
            sx={{
              position: 'absolute',
              left: { xs: 0, md: '50%' },
              top: 0,
              bottom: 0,
              display: { xs: 'none', md: 'block' },
              borderColor: alpha(COLORS.primary.contrastText, 0.1),
            }}
          />

          <Stack direction="column" spacing={5} sx={{ position: 'relative' }}>
            {[
              { year: '2009', title: 'Les Débuts', text: 'Isabelle Moreau ouvre un premier espace de 30m² rue du Bac, avec une seule salle de soin et une vision : offrir à Paris des massages d\'un niveau comparable aux meilleurs spas du monde.' },
              { year: '2013', title: 'L\'Expansion', text: 'Forte du bouche-à-oreille, Séréna s\'installe rue de la Paix dans un appartement haussmannien entièrement transformé. Trois nouvelles praticiens rejoignent l\'équipe.' },
              { year: '2017', title: 'La Consécration', text: 'Séréna est sélectionné par le Figaro Madame parmi les 10 meilleurs instituts de bien-être de Paris. Le studio accueille ses 1 000ème cliente.' },
              { year: '2021', title: 'La Réinvention', text: 'Après la pandémie, Séréna se réinvente : développement de la gamme de soins corps, intégration de la sonothérapie et du bien-être holistique dans l\'offre.' },
              { year: '2024', title: 'Aujourd\'hui', text: 'Une équipe de 5 praticiens d\'exception, 8 soins signature, et toujours la même conviction : votre bien-être mérite le meilleur.' },
            ].map(({ year, title, text }, index) => (
              <Stack
                key={year}
                direction={{ xs: 'column', md: index % 2 === 0 ? 'row' : 'row-reverse' }}
                spacing={4}
                sx={{
                  alignItems: { xs: 'flex-start', md: 'center' },
                }}
              >
                <Stack direction="column" sx={{ flex: 1, textAlign: { md: index % 2 === 0 ? 'right' : 'left' } }}>
                  <Typography variant="h2" sx={{ color: COLORS.secondary.main }}>
                    {year}
                  </Typography>

                  <Typography variant="h6" sx={{ color: COLORS.primary.contrastText, marginBottom: 1.5 }}>
                    {title}
                  </Typography>

                  <Typography variant="body2" sx={{ color: alpha(COLORS.primary.contrastText, 0.5), lineHeight: 1.8 }}>
                    {text}
                  </Typography>
                </Stack>

                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    display: { xs: 'none', md: 'block' },
                    background: COLORS.secondary.main,
                  }}
                />

                <Box sx={{ flex: 1 }} />
              </Stack>
            ))}
          </Stack>
        </Box>
      </Section>

      <Section
        title="Vivez l'expérience Séréna"
        subtitle="Rejoignez les 2 400 clientes qui nous font confiance et découvrez pourquoi Séréna est devenu l'adresse incontournable du bien-être à Paris."
      >
        <Stack
          direction="row"
          spacing={2.5}
          sx={{
            alignItems: 'center',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          <Link href="/booking">
            <Button
              variant="contained"
              endIcon={<ArrowForwardIcon />}
              sx={{
                paddingX: 5,
                paddingY: 1.8,
              }}
            >
              Réserver un Soin
            </Button>
          </Link>

          <Link href="/equipe">
            <Button
              variant="outlined"
              sx={{
                paddingX: 5,
                paddingY: 1.8,
              }}
            >
              Rencontrer l'Équipe
            </Button>
          </Link>
        </Stack>
      </Section>
    </main>
  );
}
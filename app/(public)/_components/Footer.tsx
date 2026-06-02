import Logo from '@/components/Logo';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import PinterestIcon from '@mui/icons-material/Pinterest';
import { alpha, Divider, Grid, IconButton, Stack, Typography } from '@mui/material';
import Link from 'next/link';
import Section from './Section';
import { COLORS } from '@/themes/colors';

export default function Footer() {
  return (
    <Section
      align="left"
      component="footer"
      maxWidth="xl"
      mode="dark"
      sx={{
        paddingY: 0,
        paddingBottom: 4,
        paddingTop: 8,
      }}
    >
      <Grid container spacing={{ xs: 6, md: 8 }} sx={{ width: '100%' }}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Logo sx={{ marginBottom: 3 }} />

          <Typography
            variant="body2"
            sx={{
              color: alpha(COLORS.primary.contrastText, 0.55),
              lineHeight: 1.8,
              marginBottom: 4,
              maxWidth: 300,
            }}
          >
            Un sanctuaire de beauté et de bien-être au cœur de Paris, où chaque soin est une invitation au voyage intérieur.
          </Typography>

          <Stack
            direction="column"
            spacing={1}
            sx={{
              marginBottom: 4,
            }}
          >
            <Typography
              sx={{
                color: COLORS.secondary.main,
                fontSize: '0.65rem',
                fontWeight: 500,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
              }}
            >
              Adresse
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: alpha(COLORS.primary.contrastText, 0.55),
                lineHeight: 1.8,
              }}
            >
              12 Rue de la Paix<br />
              75002 Paris<br />
              Du lundi au samedi, 9h - 20h
            </Typography>
          </Stack>

          <Stack direction="row" spacing={1}>
            {[
              { icon: <InstagramIcon fontSize="small" />, href: '#', label: 'Instagram' },
              { icon: <FacebookIcon fontSize="small" />, href: '#', label: 'Facebook' },
              { icon: <PinterestIcon fontSize="small" />, href: '#', label: 'Pinterest' },
            ].map(({ icon, href, label }) => (
              <IconButton
                key={label}
                href={href}
                aria-label={label}
                size="small"
                sx={{
                  width: 36,
                  height: 36,
                  border: `1px solid ${alpha(COLORS.primary.contrastText, 0.1)}`,
                  borderRadius: 0,
                  color: alpha(COLORS.primary.contrastText, 0.40),
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    color: COLORS.secondary.main,
                    borderColor: COLORS.secondary.main,
                  },
                }}
              >
                {icon}
              </IconButton>
            ))}
          </Stack>
        </Grid>

        <Grid size={{ xs: 6, sm: 4, md: 'grow' }}>
          <Typography
            sx={{
              color: COLORS.secondary.main,
              fontSize: '0.7rem',
              fontWeight: 500,
              letterSpacing: '0.15em',
              marginBottom: 2.5,
              textTransform: 'uppercase',
            }}
          >
            Soins
          </Typography>

          <Stack direction="column" spacing={1.2}>
            {[
              { label: 'Massages', href: '/services?category=massage' },
              { label: 'Soins Visage', href: '/services?category=visage' },
              { label: 'Soins Corps', href: '/services?category=corps' },
              { label: 'Coiffure', href: '/services?category=coiffure' },
              { label: 'Onglerie', href: '/services?category=onglerie' },
              { label: 'Bien-Être', href: '/services?category=bien-etre' },
            ].map(({ label, href }) => (
              <Link key={href} href={href}>
                <Typography
                  variant="body2"
                  sx={{
                    color: alpha(COLORS.primary.contrastText, 0.45),
                    transition: 'color 0.2s ease',
                    '&:hover': {
                      color: COLORS.primary.contrastText,
                    },
                  }}
                >
                  {label}
                </Typography>
              </Link>
            ))}
          </Stack>
        </Grid>

        <Grid size={{ xs: 6, sm: 4, md: 'grow' }}>
          <Typography
            sx={{
              color: COLORS.secondary.main,
              fontSize: '0.7rem',
              fontWeight: 500,
              letterSpacing: '0.15em',
              marginBottom: 2.5,
              textTransform: 'uppercase',
            }}
          >
            Studio
          </Typography>

          <Stack direction="column" spacing={1.2}>
            {[
              { label: 'Notre Histoire', href: '/about' },
              { label: "L'Équipe", href: '/equipe' },
              { label: 'Contact', href: '/contact' },
            ].map(({ label, href }) => (
              <Link key={href} href={href}>
                <Typography
                  variant="body2"
                  sx={{
                    color: alpha(COLORS.primary.contrastText, 0.45),
                    transition: 'color 0.2s ease',
                    '&:hover': {
                      color: COLORS.primary.contrastText,
                    },
                  }}
                >
                  {label}
                </Typography>
              </Link>
            ))}
          </Stack>
        </Grid>

        <Grid size={{ xs: 6, sm: 4, md: 'grow' }}>
          <Typography
            sx={{
              color: COLORS.secondary.main,
              fontSize: '0.7rem',
              fontWeight: 500,
              letterSpacing: '0.15em',
              marginBottom: 2.5,
              textTransform: 'uppercase',
            }}
          >
            Compte
          </Typography>

          <Stack direction="column" spacing={1.2}>
            {[
              { label: 'Réserver', href: '/booking' },
              { label: 'Mes Rendez-vous', href: '/compte/rendez-vous' },
              { label: 'Mon Profil', href: '/compte/profil' },
              { label: 'Connexion', href: '/login' },
            ].map(({ label, href }) => (
              <Link key={href} href={href}>
                <Typography
                  variant="body2"
                  sx={{
                    color: alpha(COLORS.primary.contrastText, 0.45),
                    transition: 'color 0.2s ease',
                    '&:hover': {
                      color: COLORS.primary.contrastText,
                    },
                  }}
                >
                  {label}
                </Typography>
              </Link>
            ))}
          </Stack>
        </Grid>
      </Grid>

      <Divider
        sx={{
          borderColor: alpha(COLORS.primary.contrastText, 0.08),
          marginTop: 6,
          marginBottom: 3,
        }}
      />

      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={1}
        sx={{
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography
          variant="caption"
          sx={{
            color: alpha(COLORS.primary.contrastText, 0.30),
            letterSpacing: '0.05em',
          }}
        >
          © {new Date().getFullYear()} Séréna Studio. Tous droits réservés.
        </Typography>

        <Stack
          direction="row"
          spacing={3}
        >
          {[
            { label: 'Mentions Légales', href: '/legal' },
            { label: 'Politique de Confidentialité', href: '/legal#rgpd' },
          ].map(({ label, href }) => (
            <Link key={href} href={href}>
              <Typography
                variant="caption"
                sx={{
                  color: alpha(COLORS.primary.contrastText, 0.30),
                  letterSpacing: '0.05em',
                  transition: 'color 0.2s ease',
                  '&:hover': {
                    color: alpha(COLORS.primary.contrastText, 0.60),
                  },
                }}
              >
                {label}
              </Typography>
            </Link>
          ))}
        </Stack>
      </Stack>
    </Section>
  );
}
import { COLORS } from '@/themes/colors';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EmailIcon from '@mui/icons-material/Email';
import InstagramIcon from '@mui/icons-material/Instagram';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import { Box, Divider, Grid, Stack, Typography } from '@mui/material';
import { Metadata } from 'next';
import Section from '../_components/Section';
import ContactForm from './_components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contactez Séréna Studio au 12 Rue de la Paix, Paris 75002. Renseignements, réservations de groupe, EVJF, partenariats. Notre équipe vous répond sous 24h.',
};

export default function ContactPage() {
  return (
    <main>
      <Section
        overline="Nous écrire"
        title={{
          text: 'Contact',
          variant: 'h1',
        }}
        subtitle="Une question, un projet particulier, une carte cadeau ? Notre équipe vous répond sous 24h."
        align="left"
        background={{
          text: 'CONTACT',
        }}
        mode="dark"
      />

      <Section maxWidth="xl">
        <Grid container spacing={{ xs: 5, md: 10 }} sx={{ width: '100%' }}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Stack direction="column" spacing={3} sx={{ mb: 5 }}>
              {[
                {
                  icon: <LocationOnIcon />,
                  label: 'Adresse',
                  value: <>12 Rue de la Paix<br />75002 Paris<br />(Entrée Rue de Castiglione)</>,
                },
                {
                  icon: <PhoneIcon />,
                  label: 'Téléphone',
                  value: <>+33 1 42 60 00 00</>,
                },
                {
                  icon: <EmailIcon />,
                  label: 'Email',
                  value: <>contact@serena-studio.fr</>,
                },
                {
                  icon: <AccessTimeIcon />,
                  label: 'Horaires',
                  value: <>Lundi - Vendredi : 9h - 20h<br />Samedi : 9h - 18h<br />Dimanche : Fermé</>,
                },
              ].map(({ icon, label, value }) => (
                <Stack key={label} direction="row" spacing={2}>
                  <Box sx={{ color: COLORS.secondary.main }}>{icon}</Box>

                  <Box>
                    <Typography
                      sx={{
                        color: COLORS.text.secondary,
                        fontSize: '0.6rem',
                        letterSpacing: '0.15em',
                        mb: 0.8,
                        textTransform: 'uppercase',
                      }}
                    >
                      {label}
                    </Typography>

                    <Typography variant="body2" sx={{color: COLORS.text.secondary, lineHeight: 1.8 }}>
                      {value}
                    </Typography>
                  </Box>
                </Stack>
              ))}
            </Stack>

            <Divider sx={{ mb: 3 }} />

            <Stack direction="row" spacing={1.5}>
              <InstagramIcon sx={{ color: COLORS.secondary.main, fontSize: 20 }} />

              <Box>
                <Typography sx={{ fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: COLORS.text.secondary, mb: 0.3 }}>
                  Instagram
                </Typography>
                <Typography variant="body2" sx={{color: COLORS.text.secondary}}>@serena.studio.paris</Typography>
              </Box>
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, md: 8 }}>
            <ContactForm />
          </Grid>
        </Grid>
      </Section>
    </main>
  );
}
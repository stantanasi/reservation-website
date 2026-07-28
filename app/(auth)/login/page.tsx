import Logo from '@/components/Logo';
import { COLORS } from '@/themes/colors';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { alpha, Box, Button, Stack, Typography } from '@mui/material';
import { Metadata } from 'next';
import Link from 'next/link';
import LoginForm from './_components/LoginForm';

export const metadata: Metadata = {
  title: 'Connexion',
  description: 'Connectez-vous à votre espace Séréna Studio pour gérer vos rendez-vous, consulter votre historique de soins et modifier votre profil.',
};

export default function LoginPage() {
  return (
    <Stack
      direction="row"
      sx={{
        background: COLORS.primary.contrastText,
        minHeight: '100vh',
      }}
    >
      <Box
        sx={{
          width: '45%',
          height: 'auto',
          display: { xs: 'none', md: 'block' },
          position: 'relative',
        }}
      >
        <Box
          component="img"
          src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=900&q=80"
          alt="Séréna Studio"
          sx={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            inset: 0,
            objectFit: 'cover',
            filter: 'brightness(0.65)',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: `linear-gradient(to right, transparent, ${alpha(COLORS.primary.contrastText, 0.15)})`,
          }}
        />
        <Stack direction="column" spacing={1} sx={{ position: 'absolute', bottom: 48, left: 48 }}>
          <Typography variant="h3" sx={{ color: COLORS.primary.contrastText }}>
            Votre espace personnel
          </Typography>

          <Typography sx={{ color: alpha(COLORS.primary.contrastText, 0.6), fontSize: '0.9rem', lineHeight: 1.7 }}>
            Gérez vos rendez-vous, retrouvez<br />votre historique de soins.
          </Typography>
        </Stack>
      </Box>

      <Stack
        direction="column"
        sx={{
          flex: 1,
          justifyContent: 'center',
          px: '10vw',
          py: { xs: 3, md: 6 },
        }}
      >
        <Box sx={{ mb: 5 }}>
          <Link href="/">
            <Button
              variant="text"
              startIcon={<ArrowBackIcon />}
              sx={{ padding: 0 }}
            >
              Retour à l'accueil
            </Button>
          </Link>
        </Box>

        <Logo mode="dark" sx={{ marginBottom: 5 }} />

        <Typography variant="h3" sx={{ mb: 1, fontSize: '2rem' }}>
          Connexion
        </Typography>

        <Typography variant="body2" sx={{ color: COLORS.text.secondary, mb: 4 }}>
          Pas encore de compte ?{' '}
          <Link href="/register" style={{ color: COLORS.secondary.main, fontWeight: 500 }}>
            Créer un compte
          </Link>
        </Typography>

        <LoginForm />
      </Stack>
    </Stack>
  );
}
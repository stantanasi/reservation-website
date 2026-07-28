'use client';

import { COLORS } from '@/themes/colors';
import GoogleIcon from '@mui/icons-material/Google';
import { Alert, alpha, Box, Button, CircularProgress, Divider, Stack, TextField, Typography } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (loading) return;

    if (!form.email || !form.password) {
      setError('Veuillez remplir tous les champs.');
      return;
    }

    setLoading(true);
    new Promise((resolve) => setTimeout(resolve, 1200))
      .then(() => {
        setLoading(false);
        router.push('/compte');
      });
  };

  return (
    <Box>
      {error && (
        <Alert severity="error" sx={{ mb: 3, borderRadius: 0, fontSize: '0.8rem' }}>
          {error}
        </Alert>
      )}

      <Stack direction="column" spacing={2.5}>
        <TextField
          label="Adresse email"
          type="email"
          fullWidth
          value={form.email}
          onChange={(event) => setForm((prev) => ({
            ...prev,
            email: event.target.value,
          }))}
          required
          autoComplete="email"
        />

        <TextField
          label="Mot de passe"
          type="password"
          fullWidth
          value={form.password}
          onChange={(event) => setForm((prev) => ({
            ...prev,
            password: event.target.value,
          }))}
          required
        />

        <Link href="#" style={{ alignSelf: 'flex-end', color: COLORS.text.secondary, fontSize: '0.78rem' }}>
          Mot de passe oublié ?
        </Link>

        <Button
          type="submit"
          variant="contained"
          fullWidth
          size="large"
          onClick={() => handleSubmit()}
          disabled={loading}
          startIcon={loading ? <CircularProgress size={16} sx={{ color: COLORS.primary.contrastText }} /> : null}
        >
          {loading ? 'Connexion…' : 'Se connecter'}
        </Button>

        <Divider sx={{ my: 1 }}>
          <Typography variant="caption" sx={{ color: COLORS.text.secondary }}>ou</Typography>
        </Divider>

        <Button
          variant="outlined"
          fullWidth
          startIcon={<GoogleIcon />}
        >
          Continuer avec Google
        </Button>

        <Typography variant="caption" sx={{ display: 'block', textAlign: 'center', color: alpha(COLORS.text.secondary, 0.5), mt: 2, lineHeight: 1.7 }}>
          En vous connectant, vous acceptez nos{' '}
          <Link href="/legal" style={{ color: COLORS.text.secondary }}>Conditions d'utilisation</Link>{' '}
          et notre{' '}
          <Link href="/legal#rgpd" style={{ color: COLORS.text.secondary }}>Politique de confidentialité</Link>.
        </Typography>
      </Stack>
    </Box>
  );
}
'use client';

import { COLORS } from '@/themes/colors';
import GoogleIcon from '@mui/icons-material/Google';
import { Alert, Box, Button, Checkbox, CircularProgress, Divider, FormControlLabel, Stack, TextField, Typography } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function RegisterForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (loading) return;

    if (form.password !== form.confirmPassword) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }
    if (!acceptTerms) {
      setError('Veuillez accepter les conditions d\'utilisation.');
      return;
    }

    setLoading(true);
    new Promise((r) => setTimeout(r, 1400))
      .then(() => {
        setLoading(false);
        router.push('/compte');
      });
  };

  return (
    <Box>
      {error && (
        <Alert severity="error" sx={{ mb: 3, borderRadius: 0, fontSize: '0.8rem' }}>{error}</Alert>
      )}

      <Stack direction="column" spacing={2.5}>
        <Stack direction="row" spacing={2.5}>
          <TextField
            label="Prénom"
            fullWidth
            value={form.firstName}
            onChange={(event) => {
              setForm((prev) => ({
                ...prev,
                firstName: event.target.value,
              }));
              setError('');
            }}
            required
          />

          <TextField
            label="Nom"
            fullWidth
            value={form.lastName}
            onChange={(event) => {
              setForm((prev) => ({
                ...prev,
                lastName: event.target.value,
              }));
              setError('');
            }}
            required
          />
        </Stack>

        <TextField
          label="Adresse email"
          type="email"
          fullWidth
          value={form.email}
          onChange={(event) => {
            setForm((prev) => ({
              ...prev,
              email: event.target.value,
            }));
            setError('');
          }}
          required
        />

        <TextField
          label="Mot de passe"
          type="password"
          fullWidth
          value={form.password}
          onChange={(event) => {
            setForm((prev) => ({
              ...prev,
              password: event.target.value,
            }));
            setError('');
          }}
          required
          helperText="Minimum 8 caractères"
        />

        <TextField
          label="Confirmer le mot de passe"
          type="password"
          fullWidth
          value={form.confirmPassword}
          onChange={(event) => {
            setForm((prev) => ({
              ...prev,
              confirmPassword: event.target.value,
            }));
            setError('');
          }}
          required
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={acceptTerms}
              onChange={(event) => setAcceptTerms(event.target.checked)}
            />
          }
          label={
            <Typography variant="caption" sx={{color: COLORS.text.secondary}}>
              J'accepte les{' '}
              <Link href="/legal" style={{ color: COLORS.secondary.main }}>conditions d'utilisation</Link>
              {' '}et la{' '}
              <Link href="/legal#rgpd" style={{ color: COLORS.secondary.main }}>politique de confidentialité</Link>
            </Typography>
          }
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          size="large"
          disabled={loading}
          onClick={() => handleSubmit()}
          startIcon={loading ? <CircularProgress size={16} sx={{ color: COLORS.primary.contrastText }} /> : null}
        >
          {loading ? 'Création du compte…' : 'Créer mon compte'}
        </Button>

        <Divider sx={{ my: 1 }}>
          <Typography variant="caption" sx={{color: COLORS.text.secondary}}>ou</Typography>
        </Divider>

        <Button
          variant="outlined"
          fullWidth
          startIcon={<GoogleIcon sx={{ fontSize: '18px !important' }} />}
        >
          Continuer avec Google
        </Button>
      </Stack>
    </Box>
  );
}
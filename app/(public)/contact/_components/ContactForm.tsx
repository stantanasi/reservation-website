'use client';

import { COLORS } from '@/themes/colors';
import { Alert, Button, Card, CircularProgress, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useState } from 'react';

export default function ContactForm() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const submit = async () => {
    if (status === 'loading') return;

    setStatus('loading');
    await new Promise((resolve) => setTimeout(resolve, 1_200))
      .then(() => {
        setStatus('success');
      })
      .catch((err) => {
        console.error(err);
        setStatus('error');
      });
  };

  return (
    <Card
      elevation={0}
      sx={{
        padding: { xs: 3, md: 5 },
      }}
    >
      <Typography variant="h4" sx={{ mb: 4 }}>
        Envoyer un message
      </Typography>

      {status === 'success' ? (
        <Alert
          severity="success"
          sx={{ borderRadius: 0, fontSize: '0.88rem', py: 2.5 }}
        >
          <Typography sx={{ mb: 0.5, fontWeight: 500 }}>Message envoyé !</Typography>
          Notre équipe vous répondra dans les 24 heures.
        </Alert>
      ) : (
        <Grid container spacing={2.5}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="Prénom"
              value={form.firstName}
              onChange={(event) => setForm((prev) => ({
                ...prev,
                firstName: event.target.value,
              }))}
              fullWidth
              required
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="Nom"
              value={form.lastName}
              onChange={(event) => setForm((prev) => ({
                ...prev,
                lastName: event.target.value,
              }))}
              fullWidth
              required
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="Email"
              type="email"
              value={form.email}
              onChange={(event) => setForm((prev) => ({
                ...prev,
                email: event.target.value,
              }))}
              fullWidth
              required
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="Téléphone (optionnel)"
              type="tel"
              value={form.phone}
              onChange={(event) => setForm((prev) => ({
                ...prev,
                phone: event.target.value,
              }))}
              fullWidth
              required
            />
          </Grid>

          <Grid size={12}>
            <FormControl fullWidth>
              <InputLabel required>Sujet</InputLabel>
              <Select
                value={form.subject}
                label="Sujet"
                onChange={(event) => setForm((prev) => ({
                  ...prev,
                  subject: event.target.value,
                }))}
              >
                <MenuItem value=""> </MenuItem>
                {[
                  'Renseignements sur les soins',
                  'Réservation de groupe / EVJF',
                  'Partenariat & presse',
                  'Carte cadeau',
                  'Autre',
                ].map((s) => (
                  <MenuItem value={s}>{s}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid size={12}>
            <TextField
              label="Votre message"
              value={form.message}
              onChange={(event) => setForm((prev) => ({
                ...prev,
                message: event.target.value,
              }))}
              placeholder="Décrivez votre demande avec le plus de détails possible…"
              multiline
              rows={6}
              fullWidth
              required
            />
          </Grid>

          <Grid size={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              type="submit"
              variant="contained"
              startIcon={status === 'loading' ? <CircularProgress size={16} sx={{ color: COLORS.primary.main }} /> : null}
              disabled={status === 'loading'}
              onClick={() => submit()}
            >
              {status === 'loading' ? 'Envoi en cours…' : 'Envoyer le message'}
            </Button>
          </Grid>
        </Grid>
      )}
    </Card>
  );
}
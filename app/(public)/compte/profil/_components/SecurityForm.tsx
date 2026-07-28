'use client';

import { COLORS } from '@/themes/colors';
import { User } from '@/types/user.type';
import LockIcon from '@mui/icons-material/Lock';
import { Alert, Button, Card, Grid, Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';

type Props = {
  user: User;
};

export default function SecurityForm({
  user,
}: Props) {
  const [form, setForm] = useState({
    current: '',
    next: '',
    confirm: '',
  });
  const [status, setStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');

  const save = async () => {
    setStatus('saving');
    new Promise((resolve) => setTimeout(resolve, 800))
      .then(() => {
        setStatus('success');
        setForm({ current: '', next: '', confirm: '' });
      })
      .catch((err) => {
        console.error(err);
        setStatus('error');
      });
  };

  return (
    <Card
      sx={{
        marginBottom: 3,
        padding: { xs: 3, md: 4 },
      }}
    >
      <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center', marginBottom: 3 }}>
        <LockIcon sx={{ color: COLORS.secondary.main }} />

        <Typography variant="h5">
          Changer le mot de passe
        </Typography>
      </Stack>

      {status === 'success' && (
        <Alert severity="success" sx={{ mb: 3, borderRadius: 0, fontSize: '0.8rem' }}>
          Mot de passe mis à jour.
        </Alert>
      )}

      <Grid container spacing={2.5}>
        <Grid size={12}>
          <TextField
            label="Mot de passe actuel"
            type="password"
            fullWidth
            value={form.current}
            onChange={(event) => setForm((prev) => ({
              ...prev,
              current: event.target.value,
            }))}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            label="Nouveau mot de passe"
            type="password"
            fullWidth
            value={form.next}
            onChange={(event) => setForm((prev) => ({
              ...prev,
              next: event.target.value,
            }))}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            label="Confirmer"
            type="password"
            fullWidth
            value={form.confirm}
            onChange={(event) => setForm((prev) => ({
              ...prev,
              confirm: event.target.value,
            }))}
          />
        </Grid>

        <Grid size={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="outlined"
            disabled={!form.current || !form.next}
            onClick={() => save()}
          >
            Mettre à jour
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
}
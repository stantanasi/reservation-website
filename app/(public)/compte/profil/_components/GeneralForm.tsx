'use client';

import { User } from '@/types/user.type';
import SaveIcon from '@mui/icons-material/Save';
import { Alert, Button, Card, Grid, TextField, Typography } from '@mui/material';
import { useState } from 'react';

type Props = {
  user: User;
};

export default function GeneralForm({
  user,
}: Props) {
  const [profileForm, setProfileForm] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone ?? '',
  });
  const [statusProfile, setStatusProfile] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');

  const handleProfileSave = () => {
    setStatusProfile('saving');
    new Promise((resolve) => setTimeout(resolve, 800))
      .then(() => {
        setStatusProfile('success');
      })
      .catch((err) => {
        console.error(err);
        setStatusProfile('error');
      });
  };

  return (
    <Card
      sx={{
        marginBottom: 3,
        padding: { xs: 3, md: 4 },
      }}
    >
      <Typography variant="h5" sx={{ marginBottom: 3 }}>
        Informations personnelles
      </Typography>

      {statusProfile === 'success' && (
        <Alert severity="success" sx={{ mb: 3, borderRadius: 0, fontSize: '0.8rem' }}>
          Profil mis à jour avec succès.
        </Alert>
      )}

      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            label="Prénom"
            fullWidth
            value={profileForm.firstName}
            onChange={(event) => {
              setProfileForm((prev) => ({
                ...prev,
                firstName: event.target.value,
              }));
              setStatusProfile('idle');
            }}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            label="Nom"
            fullWidth
            value={profileForm.lastName}
            onChange={(event) => {
              setProfileForm((prev) => ({
                ...prev,
                lastName: event.target.value,
              }));
              setStatusProfile('idle');
            }}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            label="Adresse email"
            type="email"
            fullWidth
            value={profileForm.email}
            onChange={(event) => {
              setProfileForm((prev) => ({
                ...prev,
                email: event.target.value,
              }));
              setStatusProfile('idle');
            }}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            label="Téléphone"
            type="tel"
            fullWidth
            value={profileForm.phone}
            onChange={(event) => {
              setProfileForm((prev) => ({
                ...prev,
                phone: event.target.value,
              }));
              setStatusProfile('idle');
            }}
            helperText="Pour les rappels de rendez-vous par SMS"
          />
        </Grid>

        <Grid size={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            startIcon={<SaveIcon />}
            onClick={() => handleProfileSave()}
          >
            Enregistrer
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
}
'use client';

import { COLORS } from '@/themes/colors';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import { Alert, alpha, Box, Card, Grid, Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useBooking } from '../_contexts/BookingContext';
import Step from './Step';

export default function StepCheckout() {
  const { booking, setBooking } = useBooking();
  const [form, setForm] = useState<NonNullable<typeof booking.checkout>>(booking.checkout ?? {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    notes: '',
    card: {
      number: '',
      name: '',
      expiry: '',
      cvc: '',
    },
  });

  const isValid =
    form.firstName && form.lastName && form.email &&
    form.card.number.replace(/\s/g, '').length === 16 &&
    form.card.expiry.length === 5 &&
    form.card.cvc.length === 3 &&
    form.card.name;

  return (
    <Step
      step="checkout"
      label="Paiement"
      summary={(selected) => (
        <Stack direction="row" spacing={5} sx={{ flexWrap: 'wrap' }}>
          <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
            <PersonIcon sx={{ color: COLORS.secondary.main, fontSize: 18 }} />

            <Box>
              <Typography sx={{ fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: COLORS.text.secondary, mb: 0.2 }}>
                Facturation
              </Typography>

              <Typography sx={{ fontWeight: 500, fontSize: '0.85rem' }}>
                {selected.firstName} {selected.lastName}
              </Typography>
              <Typography variant="caption" sx={{ color: COLORS.text.secondary }}>
                {selected.email}
              </Typography>
            </Box>
          </Stack>

          <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
            <CreditCardIcon sx={{ color: COLORS.secondary.main, fontSize: 18 }} />

            <Box>
              <Typography sx={{ fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: COLORS.text.secondary, mb: 0.2 }}>
                Mode de règlement
              </Typography>

              <Typography sx={{ fontWeight: 500, fontSize: '0.85rem' }}>
                •••• •••• •••• {selected.card.number.replace(/\s/g, '').slice(-4) || '••••'}
              </Typography>
              <Typography variant="caption" sx={{ color: COLORS.text.secondary }}>
                Exp: {selected.card.expiry || 'MM/AA'}
              </Typography>
            </Box>
          </Stack>

          {selected.notes && (<Box>
            <Typography sx={{ fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: COLORS.text.secondary, mb: 0.2 }}>
              Note transmise
            </Typography>

            <Typography sx={{ fontWeight: 500, fontSize: '0.85rem' }}>
              « {selected.notes} »
            </Typography>
          </Box>
          )}
        </Stack>
      )}
      button={{
        disabled: !isValid,
        onClick: () => {
          if (!form) return;

          setBooking((prev) => ({
            ...prev,
            checkout: form,
          }));
        },
        label: 'Confirmer les informations',
      }}
    >
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 7 }}>
          <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center', marginBottom: 2.5 }}>
            <PersonIcon sx={{ color: COLORS.secondary.main, fontSize: 18 }} />
            <Typography sx={{ color: COLORS.text.secondary, fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              Vos coordonnées
            </Typography>
          </Stack>

          <Grid container spacing={2} sx={{ marginBottom: 4 }}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="Prénom"
                fullWidth
                size="small"
                value={form.firstName}
                onChange={(event) => setForm((prev) => ({
                  ...prev,
                  firstName: event.target.value,
                }))}
                required
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="Nom"
                fullWidth
                size="small"
                value={form.lastName}
                onChange={(event) => setForm((prev) => ({
                  ...prev,
                  lastName: event.target.value,
                }))}
                required
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="Email"
                type="email"
                fullWidth
                size="small"
                value={form.email}
                onChange={(event) => setForm((prev) => ({
                  ...prev,
                  email: event.target.value,
                }))}
                required
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="Téléphone (optionnel)"
                fullWidth
                size="small"
                value={form.phone}
                onChange={(event) => setForm((prev) => ({
                  ...prev,
                  phone: event.target.value,
                }))}
              />
            </Grid>

            <Grid size={12}>
              <TextField
                label="Note ou demande particulière"
                fullWidth
                size="small"
                multiline
                rows={2}
                value={form.notes}
                onChange={(event) => setForm((prev) => ({
                  ...prev,
                  notes: event.target.value,
                }))}
                placeholder="Allergie, première visite, zone sensible…"
              />
            </Grid>
          </Grid>

          <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center', marginBottom: 2.5 }}>
            <CreditCardIcon sx={{ color: COLORS.secondary.main, fontSize: 18 }} />
            <Typography sx={{ color: COLORS.text.secondary, fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              Paiement sécurisé
            </Typography>
          </Stack>

          <Alert
            icon={<LockIcon />}
            severity="info"
            sx={{
              marginBottom: 2.5,
            }}
          >
            Mode démo Stripe — n'entrez pas de vraies données bancaires.
          </Alert>

          <Grid container spacing={2}>
            <Grid size={12}>
              <TextField
                label="Numéro de carte"
                fullWidth
                size="small"
                value={form.card.number}
                onChange={(event) => setForm((prev) => ({
                  ...prev,
                  card: {
                    ...form.card,
                    number: event.target.value
                      .replace(/\D/g, '')
                      .slice(0, 16)
                      .replace(/(.{4})/g, '$1 ')
                      .trim(),
                  },
                }))}
                placeholder="4242 4242 4242 4242"
                required
              />
            </Grid>

            <Grid size={12}>
              <TextField
                label="Nom sur la carte"
                fullWidth
                size="small"
                value={form.card.name}
                onChange={(event) => setForm((prev) => ({
                  ...prev,
                  card: {
                    ...form.card,
                    name: event.target.value,
                  },
                }))}
                required
              />
            </Grid>

            <Grid size={6}>
              <TextField
                label="Expiration"
                fullWidth
                size="small"
                value={form.card.expiry}
                onChange={(event) => setForm((prev) => ({
                  ...prev,
                  card: {
                    ...form.card,
                    expiry: event.target.value
                      .replace(/\D/g, '')
                      .slice(0, 4)
                      .replace(/(\d{2})\/?(\d{1,2})/g, '$1/$2'),
                  },
                }))}
                placeholder="MM/AA"
                required
              />
            </Grid>

            <Grid size={6}>
              <TextField
                label="CVC"
                fullWidth
                size="small"
                value={form.card.cvc}
                onChange={(event) => setForm((prev) => ({
                  ...prev,
                  card: {
                    ...form.card,
                    cvc: event.target.value
                      .replace(/\D/g, '')
                      .slice(0, 3),
                  },
                }))}
                placeholder="123"
                required
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid size={{ xs: 12, md: 5 }}>
          <Card
            sx={{
              padding: 3,
              background: alpha(COLORS.primary.contrastText, 0.6),
              marginBottom: 2.5,
            }}
          >
            <Typography sx={{ fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: COLORS.text.secondary, mb: 1 }}>
              Total à régler
            </Typography>

            <Typography variant="body2" sx={{ color: COLORS.text.secondary }}>
              {booking.service?.service.name}
            </Typography>

            <Typography variant="h3">
              {booking.service?.service.price ?? '-'} €
            </Typography>
          </Card>

          <Stack direction="column" spacing={1.5} sx={{ marginBottom: 3 }}>
            {[
              'Confirmation immédiate par email',
              'Annulation gratuite jusqu\'à 24h avant',
              'Paiement 100 % sécurisé via Stripe',
            ].map((label) => (
              <Stack
                key={label}
                direction="row"
                spacing={1.2}
                sx={{
                  alignItems: 'center',
                }}
              >
                <Box sx={{ width: 5, height: 5, background: COLORS.secondary.main }} />
                <Typography variant="caption" sx={{ color: COLORS.text.secondary, fontSize: '0.75rem' }}>
                  {label}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </Grid>
      </Grid>
    </Step>
  );
}

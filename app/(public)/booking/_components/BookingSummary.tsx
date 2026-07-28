'use client';

import { APPOINTMENTS } from '@/data/appointments.data';
import { USERS } from '@/data/users.data';
import { COLORS } from '@/themes/colors';
import { Appointment } from '@/types/appointment.type';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import ScheduleIcon from '@mui/icons-material/Schedule';
import SpaIcon from '@mui/icons-material/Spa';
import { alpha, Box, Button, Card, CardContent, CircularProgress, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useBooking } from '../_contexts/BookingContext';

export default function BookingSummary() {
  const router = useRouter();
  const { booking, activeStep } = useBooking();
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  return (
    <Card
      id="booking-summary"
      sx={{
        position: 'sticky',
        top: 100,
      }}
    >
      <Box
        sx={{
          background: COLORS.primary.main,
          borderBottom: `1px solid ${alpha(COLORS.primary.contrastText, 0.06)}`,
          paddingX: 3,
          paddingY: 2.5,
        }}
      >
        <Typography variant="h5" sx={{ color: COLORS.primary.contrastText }}>
          Votre réservation
        </Typography>
        <Typography sx={{ fontSize: '0.58rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: COLORS.secondary.main, mt: 0.3 }}>
          Séréna Studio · Paris
        </Typography>
      </Box>

      {booking.service && (
        <Box
          sx={{
            height: 110,
            position: 'relative',
          }}
        >
          <Box
            component="img"
            src={booking.service.service.image}
            alt={booking.service.service.name}
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
              background: `linear-gradient(to top, ${alpha(COLORS.primary.main, 0.6)} 0%, transparent 70%)`,
            }}
          />

          <Typography
            variant="h6"
            sx={{
              position: 'absolute',
              bottom: 12,
              left: 16,
              color: COLORS.primary.contrastText,
            }}
          >
            {booking.service.service.name}
          </Typography>
        </Box>
      )}

      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2.5,
        }}
      >
        {[
          {
            label: 'Prestation',
            icon: <SpaIcon />,
            value: booking.service && (
              <Box>
                <Typography sx={{ fontSize: '0.88rem', fontWeight: 500 }}>
                  {booking.service.service.name}
                </Typography>

                <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center', color: COLORS.text.secondary, marginTop: 0.3 }}>
                  <AccessTimeIcon sx={{ fontSize: 12 }} />
                  <Typography variant="caption">
                    {booking.service.service.duration} min
                  </Typography>
                </Stack>
              </Box>
            ),
          },
          {
            label: 'Praticien',
            icon: <PersonIcon />,
            value: booking.practitioner?.practitioner && (
              booking.practitioner.practitioner === 'any'
                ? 'Premier disponible'
                : `${booking.practitioner.practitioner.firstName} ${booking.practitioner.practitioner.lastName}`
            ),
          },
          {
            label: 'Date',
            icon: <CalendarMonthIcon />,
            value: booking.slot?.date && booking.slot.date.toLocaleDateString('fr-FR', {
              weekday: 'long', day: 'numeric', month: 'long',
            }),
          },
          {
            label: 'Horaire',
            icon: <ScheduleIcon />,
            value: booking.slot?.slot && booking.service && (
              <Typography sx={{ fontSize: '0.88rem', fontWeight: 500 }}>
                {booking.slot.slot} — {new Date(new Date(0, 0, 0, ...booking.slot.slot.split(':').map(Number)).getTime() + booking.service.service.duration * 60000)
                  .toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
              </Typography>
            ),
          },
        ].map(({ label, icon, value }) => (
          <Stack
            key={label}
            direction="row"
            spacing={1.8}
            sx={{
              alignItems: 'flex-start',
            }}
          >
            <Typography
              sx={{
                color: value ? COLORS.secondary.main : alpha(COLORS.text.secondary, 0.3),
                fontSize: 18,
                transition: 'color 0.3s ease',
              }}
            >
              {icon}
            </Typography>

            <Box>
              <Typography
                sx={{
                  fontSize: '0.58rem',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: COLORS.text.secondary,
                  mb: 0.3,
                }}
              >
                {label}
              </Typography>

              <Box
                sx={{
                  fontSize: '0.88rem',
                  fontWeight: 500,
                  color: value ? COLORS.primary.main : alpha(COLORS.text.secondary, 0.35),
                  lineHeight: 1.5,
                }}
              >
                {value || '—'}
              </Box>
            </Box>
          </Stack>
        ))}
      </CardContent>

      {booking.service && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            background: alpha(COLORS.primary.contrastText, 0.5),
            borderTop: `1px solid ${alpha(COLORS.text.secondary, 0.1)}`,
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingX: 3,
            paddingY: 2.5,
          }}
        >
          <Box>
            <Typography sx={{ fontSize: '0.6rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: COLORS.text.secondary }}>
              Total
            </Typography>

            <Typography variant="caption" sx={{ color: COLORS.text.secondary }}>
              TVA incluse
            </Typography>
          </Box>

          <Typography variant="h3">
            {booking.service.service.price} €
          </Typography>
        </Box>
      )}

      {activeStep === 'paiement' && (
        <Box
          sx={{
            background: alpha(COLORS.primary.contrastText, 0.5),
            borderTop: `1px solid ${alpha(COLORS.text.secondary, 0.05)}`,
            paddingX: 3,
            paddingY: 1.5,
          }}
        >
          <Button
            variant="contained"
            disabled={status === 'loading'}
            onClick={() => {
              if (!booking.service || !booking.practitioner || !booking.slot || !booking.slot.date || !booking.slot.slot || !booking.checkout) return;

              const appointment: Appointment = {
                id: `apt-12345`,
                reference: APPOINTMENTS[0].reference,
                // reference: `SRN-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
                service: booking.service.service.id,
                staff: booking.practitioner.practitioner,
                user: USERS[0].id,
                date: booking.slot.date.toLocaleDateString('fr-CA'),
                startTime: booking.slot.slot,
                endTime: new Date(new Date(0, 0, 0, ...booking.slot.slot.split(':').map(Number)).getTime() + booking.service.service.duration * 60000)
                  .toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
                status: 'confirmed',
                totalAmount: booking.service.service.price,
                notes: {
                  customer: booking.checkout.notes,
                },
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              };

              setStatus('loading');
              new Promise((resolve) => setTimeout(resolve, 1800))
                .then(() => {
                  router.push(`/booking/confirmation/${appointment.reference}`);
                  setStatus('success');
                })
                .catch((err) => {
                  console.error(err);
                  setStatus('error');
                });
            }}
            startIcon={status === 'loading'
              ? <CircularProgress size={16} color="inherit" />
              : <LockIcon />}
            fullWidth
          >
            {status === 'loading'
              ? 'Traitement en cours…'
              : `Payer ${booking.service?.service.price ?? '-'} €`}
          </Button>

          <Stack
            direction="row"
            spacing={1}
            sx={{
              alignItems: 'center',
              marginTop: 2,
            }}
          >
            <Box sx={{ width: 6, height: 6, borderRadius: '50%', background: COLORS.secondary.main }} />
            <Typography sx={{ color: COLORS.secondary.main, fontSize: '0.65rem', letterSpacing: '0.06em' }}>
              Paiement sécurisé
            </Typography>
          </Stack>
        </Box>
      )}
    </Card>
  );
}

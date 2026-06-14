'use client';

import { COLORS } from '@/themes/colors';
import { Appointment } from '@/types/appointment.type';
import { Service } from '@/types/service.type';
import { Staff } from '@/types/staff.type';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Alert, alpha, Avatar, Box, Button, Card, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Stack, Typography } from '@mui/material';
import Link from 'next/link';
import { useState } from 'react';

const STATUS_COLORS: Record<string, { bg: string; text: string; label: string; }> = {
  confirmed: { bg: alpha(COLORS.success.main, 0.1), text: COLORS.success.main, label: 'Confirmé' },
  pending: { bg: alpha(COLORS.secondary.main, 0.1), text: COLORS.secondary.main, label: 'En attente' },
  completed: { bg: alpha(COLORS.text.secondary, 0.1), text: COLORS.text.secondary, label: 'Terminé' },
  cancelled: { bg: alpha(COLORS.error.main, 0.1), text: COLORS.error.main, label: 'Annulé' },
};

function CancelDialog({
  open,
  onClose,
  onCancel,
}: {
  open: boolean;
  onClose: () => void;
  onCancel: () => void;
}) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle variant="h4">
        Annuler ce rendez-vous
      </DialogTitle>

      <DialogContent>
        <Alert severity="warning" sx={{ marginBottom: 2 }}>
          Cette action est irréversible.
        </Alert>

        <Typography variant="body2" sx={{ color: COLORS.text.secondary }}>
          L'annulation est gratuite jusqu'à 24h avant le rendez-vous. Au-delà, des frais d'annulation peuvent s'appliquer.
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button variant="text" onClick={onClose}>
          Conserver
        </Button>

        <Button variant="contained" onClick={onCancel}>
          Confirmer l'annulation
        </Button>
      </DialogActions>
    </Dialog>
  );
}


type Props = {
  appointment: Appointment & {
    service: Service;
    staff: Staff;
  };
  variant?: 'default' | 'compact';
};

export default function AppointmentCard({
  appointment,
  variant = 'default',
}: Props) {
  const [cancelDialog, setCancelDialog] = useState<string | null>(null);

  const s = STATUS_COLORS[appointment.status];
  const dateFormatted = new Date(appointment.date.replace(/-/g, '/')).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });

  const handleCancel = () => {
    if (!cancelDialog) return;

    appointment.status = 'cancelled';
    setCancelDialog(null);
  };

  if (variant === 'compact') {
    return (
      <Card
        sx={{
          display: 'flex',
          alignItems: { xs: 'flex-start', sm: 'center' },
          gap: 2,
          flexWrap: 'wrap',
          padding: 3,
        }}
      >
        <CancelDialog
          open={!!cancelDialog}
          onClose={() => setCancelDialog(null)}
          onCancel={() => handleCancel()}
        />

        <Avatar sx={{ width: 48, height: 48 }}>
          <CalendarMonthIcon />
        </Avatar>

        <Box sx={{ flex: 1 }}>
          <Typography sx={{ fontWeight: 500, fontSize: '0.92rem', mb: 0.3 }}>
            {appointment.service.name}
          </Typography>

          <Typography variant="caption" sx={{ color: COLORS.text.secondary }}>
            {dateFormatted} · {appointment.startTime} · {appointment.staff.firstName} {appointment.staff.lastName}
          </Typography>
        </Box>

        <Stack direction="row" spacing={2} sx={{ alignItems: 'center', flexWrap: 'wrap' }}>
          <Typography variant="h6">
            {appointment.totalAmount} €
          </Typography>

          <Chip
            label={s.label}
            sx={{
              background: s.bg,
              color: s.text,
            }}
          />

          {(appointment.status === 'completed' || appointment.status === 'cancelled') && (
            <Link href={`/booking?service=${appointment.service.slug}`}>
              <Button variant="outlined" size="small" sx={{ fontSize: '0.62rem', paddingX: 1.5 }}>
                Réserver à nouveau
              </Button>
            </Link>
          )}

          {appointment.status === 'confirmed' && (<>
            <Button variant="outlined" size="small" sx={{ fontSize: '0.62rem', paddingX: 1.5 }}>
              Reporter
            </Button>

            <Button
              variant="outlined"
              size="small"
              onClick={() => setCancelDialog(appointment.id)}
              sx={{
                borderColor: COLORS.error.main,
                color: COLORS.error.main,
                fontSize: '0.62rem',
                paddingX: 1.5,
                '&:hover': {
                  borderColor: COLORS.error.dark,
                  color: COLORS.error.dark,
                },
              }}
            >
              Annuler
            </Button>
          </>)}
        </Stack>
      </Card>
    );
  }

  return (
    <Card sx={{ padding: 3 }}>
      <CancelDialog
        open={!!cancelDialog}
        onClose={() => setCancelDialog(null)}
        onCancel={() => handleCancel()}
      />

      <Stack direction="row" spacing={1} sx={{ alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 2 }}>
        <Typography sx={{ fontSize: '1rem', fontWeight: 500 }}>
          {appointment.service.name}
        </Typography>

        <Chip
          label={s.label}
          size="small"
          sx={{
            background: s.bg,
            color: s.text,
          }}
        />
      </Stack>

      <Stack direction="row" spacing={5} sx={{ alignItems: 'center', flexWrap: 'wrap' }}>
        {[
          { label: 'Date', value: dateFormatted },
          { label: 'Heure', value: `${appointment.startTime} · ${appointment.endTime}` },
          { label: 'Praticien', value: `${appointment.staff.firstName} ${appointment.staff.lastName}` },
          { label: 'Montant', value: `${appointment.totalAmount} €` },
        ].map((info) => (
          <Box key={info.label}>
            <Typography
              sx={{
                color: COLORS.text.secondary,
                fontSize: '0.58rem',
                letterSpacing: '0.12em',
                marginBottom: 0.3,
                textTransform: 'uppercase',
              }}
            >
              {info.label}
            </Typography>

            <Typography variant="body2" sx={{ fontWeight: 500, fontSize: '0.85rem' }}>
              {info.value}
            </Typography>
          </Box>
        ))}
      </Stack>

      <Divider sx={{ marginY: 2.5 }} />

      <Stack direction="row" spacing={1.5}>
        {(appointment.status === 'completed' || appointment.status === 'cancelled') && (
          <Link href={`/booking?service=${appointment.service.slug}`}>
            <Button variant="outlined" size="small">
              Réserver à nouveau
            </Button>
          </Link>
        )}

        {appointment.status === 'confirmed' && (<>
          <Button
            variant="outlined"
            size="small"
            onClick={() => setCancelDialog(appointment.id)}
            sx={{
              borderColor: COLORS.error.main,
              color: COLORS.error.main,
              '&:hover': {
                borderColor: COLORS.error.dark,
                color: COLORS.error.dark,
              },
            }}
          >
            Annuler
          </Button>

          <Button variant="outlined" size="small">
            Reporter
          </Button>
        </>)}
      </Stack>
    </Card>
  );
}
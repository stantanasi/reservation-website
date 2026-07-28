'use client';

import { STAFF } from '@/data/staff.data';
import { COLORS } from '@/themes/colors';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import { alpha, Avatar, Box, Card, Divider, Grid, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import StaffCard from '../../_components/StaffCard';
import { useBooking } from '../_contexts/BookingContext';
import Step from './Step';

export default function StepStaff() {
  const { booking, setBooking } = useBooking();
  const [form, setForm] = useState(booking.practitioner);

  useEffect(() => {
    setForm(booking.practitioner);
  }, [booking.practitioner]);

  return (
    <Step
      step="practitioner"
      label="Praticien"
      summary={(selected) => (
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
          <Avatar
            src={selected.practitioner !== 'any' ? selected.practitioner.image : undefined}
            sx={{ width: 40, height: 40 }}
          >
            {selected.practitioner === 'any' && (
              <ShuffleIcon sx={{ fontSize: 18, color: COLORS.secondary.main }} />
            )}
          </Avatar>

          <Box sx={{ flex: 1 }}>
            <Typography sx={{ fontWeight: 500, fontSize: '0.9rem' }}>
              {selected.practitioner === 'any'
                ? 'Premier disponible'
                : `${selected.practitioner.firstName} ${selected.practitioner.lastName}`}
            </Typography>

            {selected.practitioner !== 'any' && (
              <Typography variant="caption" sx={{ color: COLORS.text.secondary }}>
                {selected.practitioner.role}
              </Typography>
            )}
          </Box>
        </Stack>
      )}
      button={{
        disabled: !form?.practitioner,
        onClick: () => {
          if (!form?.practitioner) return;

          setBooking((prev) => ({
            ...prev,
            ...(booking.practitioner !== form && ({
              slot: {
                ...booking.slot,
                slot: undefined,
              },
            })),
            practitioner: form,
          }));
        },
        label: 'Confirmer le praticien',
      }}
    >
      <Card
        onClick={() => setForm({
          practitioner: 'any',
        })}
        sx={{
          display: 'flex',
          alignItems: 'center',
          borderColor: form?.practitioner === 'any' ? COLORS.secondary.main : alpha(COLORS.text.secondary, 0.15),
          cursor: 'pointer',
          flexDirection: 'row',
          gap: 2.5,
          padding: 2,
          '&:hover': {
            borderColor: COLORS.secondary.main,
          },
        }}
      >
        <Box sx={{ position: 'relative' }}>
          <Avatar
            sx={{ width: 52, height: 52 }}
          >
            <ShuffleIcon />
          </Avatar>

          {form?.practitioner === 'any' && (
            <CheckCircleIcon
              sx={{
                position: 'absolute',
                top: -6,
                right: -6,
                color: COLORS.secondary.main,
                background: '#fff',
                borderRadius: '50%',
                fontSize: 18,
              }}
            />
          )}
        </Box>

        <Box sx={{ flex: 1 }}>
          <Typography sx={{ fontWeight: 500, fontSize: '0.88rem', mb: 0.3 }}>
            Le premier disponible
          </Typography>

          <Typography variant="caption" sx={{ color: COLORS.text.secondary }}>
            Disponibilités maximales · Praticien adapté à votre soin
          </Typography>
        </Box>
      </Card>

      <Divider sx={{ color: COLORS.text.secondary, fontSize: '0.7rem', marginY: 2.5 }}>
        ou choisir spécifiquement
      </Divider>

      <Grid container spacing={1.5} sx={{ marginBottom: 3 }}>
        {STAFF
          .filter((member) => (booking.service?.service.staff as string[])?.includes(member.id) && member.active)
          .map((member) => {
            const isSelected = form?.practitioner !== 'any' && form?.practitioner.id === member.id;

            return (
              <Grid key={member.id} size={{ xs: 12, sm: 6 }}>
                <StaffCard
                  staff={member}
                  variant="compact"
                  selected={isSelected}
                  onClick={() => setForm({
                    practitioner: member,
                  })}
                />
              </Grid>
            );
          })}
      </Grid>
    </Step>
  );
}

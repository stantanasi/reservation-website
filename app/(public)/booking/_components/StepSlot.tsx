'use client';

import { COLORS } from '@/themes/colors';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { alpha, Box, Button, Card, Grid, IconButton, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useBooking } from '../_contexts/BookingContext';
import Step from './Step';

function generateSlots(date: Date): string[] {
  const all = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
  ];
  const seed = date.getDate() + date.getMonth() * 3;
  return all.filter((_, i) => (i + seed) % 3 !== 0);
}

export default function StepSlot() {
  const { booking, setBooking } = useBooking();
  const [form, setForm] = useState(booking.slot);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const [month, setMonth] = useState(form?.date ?? today);

  useEffect(() => {
    setForm(booking.slot);
  }, [booking.slot]);

  const days: (Date | null)[] = [
    ...Array((new Date(month.getFullYear(), month.getMonth(), 1).getDay() + 6) % 7).fill(null),
    ...Array.from({ length: new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate() })
      .map((_, i) => new Date(month.getFullYear(), month.getMonth(), i + 1)),
  ];

  const slots = form?.date ? generateSlots(form.date) : [];

  return (
    <Step
      step="slot"
      label="Date & horaire"
      summary={(selected) => (
        <Stack direction="row" spacing={5} sx={{ alignItems: 'center', flexWrap: 'wrap' }}>
          <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
            <CalendarMonthIcon sx={{ color: COLORS.secondary.main, fontSize: 18 }} />

            <Box>
              <Typography sx={{ fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: COLORS.text.secondary, mb: 0.2 }}>
                Date
              </Typography>

              <Typography sx={{ fontWeight: 500, fontSize: '0.85rem' }}>
                {selected.date!.toLocaleDateString('fr-FR', {
                  weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
                })}
              </Typography>
            </Box>
          </Stack>

          <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
            <AccessTimeIcon sx={{ color: COLORS.secondary.main, fontSize: 18 }} />

            <Box>
              <Typography sx={{ fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: COLORS.text.secondary, mb: 0.2 }}>
                Horaire
              </Typography>

              <Typography sx={{ fontWeight: 500, fontSize: '0.85rem' }}>
                {selected.slot}
              </Typography>
            </Box>
          </Stack>
        </Stack>
      )}
      button={{
        disabled: !form || !form.date || !form.slot,
        onClick: () => {
          if (!form) return;

          setBooking((prev) => ({
            ...prev,
            slot: form,
          }));
        },
        label: 'Confirmer le créneau',
      }}
    >
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <IconButton
              onClick={() => setMonth((prev) => {
                const date = new Date(prev);
                date.setMonth(date.getMonth() - 1);
                return date;
              })}
              size="small"
            >
              <ChevronLeftIcon />
            </IconButton>

            <Typography variant="h6">
              {month.toLocaleDateString('fr-FR', {
                month: 'long', year: 'numeric',
              })}
            </Typography>

            <IconButton
              onClick={() => setMonth((prev) => {
                const date = new Date(prev);
                date.setMonth(date.getMonth() + 1);
                return date;
              })}
              size="small"
            >
              <ChevronRightIcon />
            </IconButton>
          </Box>

          <Grid container columns={7} spacing="2px">
            {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((day, index) => (
              <Grid key={`label-${index}`} size={1}>
                <Typography
                  sx={{
                    color: alpha(COLORS.text.secondary, 0.6),
                    fontSize: '0.6rem',
                    letterSpacing: '0.06em',
                    paddingY: 0.8,
                    textAlign: 'center',
                    textTransform: 'uppercase',
                  }}
                >
                  {day}
                </Typography>
              </Grid>
            ))}

            {days.map((day, index) => {
              if (day === null) {
                return (
                  <Grid
                    key={`empty-${month.getFullYear()}-${month.getMonth()}-${index}`}
                    size={1}
                  />
                );
              }

              const isPast = day < today;
              const isToday = day.toDateString() === today.toDateString();
              const isSelected = form?.date?.toDateString() === day.toDateString();
              const isSunday = day.getDay() === 0;

              return (
                <Grid
                  key={day.toISOString()}
                  size={1}
                  onClick={() => {
                    if (isPast || isSunday) return;

                    setForm({
                      date: day,
                      slot: undefined,
                    });
                  }}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    aspectRatio: 1 / 1,
                    background: isSelected ? COLORS.secondary.main : 'transparent',
                    border: isToday && !isSelected ? `2px solid ${alpha(COLORS.secondary.main, 0.4)}` : 'none',
                    borderRadius: '50%',
                    color: isPast || isSunday ? alpha(COLORS.text.secondary, 0.25) : 'text.primary',
                    cursor: isPast || isSunday ? 'not-allowed' : 'pointer',
                    fontSize: '0.82rem',
                    fontWeight: isToday ? 700 : 400,
                    justifyContent: 'center',
                    transition: 'all 0.15s ease',
                    '&:hover': {
                      background: isPast || isSunday ? 'none'
                        : isSelected ? COLORS.secondary.main
                          : alpha(COLORS.secondary.main, 0.12),
                    },
                  }}
                >
                  {day.getDate()}
                </Grid>
              );
            })}
          </Grid>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          {form?.date ? (<>
            <Typography
              variant="h6"
              sx={{
                color: COLORS.text.secondary,
                marginBottom: 2,
                textAlign: 'center',
              }}
            >
              {form.date.toLocaleDateString('fr-FR', {
                weekday: 'long', day: 'numeric', month: 'long',
              })}
            </Typography>

            {slots.length === 0 ? (
              <Card
                sx={{
                  borderStyle: 'dashed',
                  padding: 3,
                  textAlign: 'center',
                }}
              >
                <Typography variant="body2" sx={{ color: COLORS.text.secondary, }}>
                  Aucun créneau disponible ce jour
                </Typography>
              </Card>
            ) : (
              <Grid container spacing={1}>
                {slots.map((slot) => {
                  const isSelected = slot === form.slot;
                  return (
                    <Grid key={slot} size={4}>
                      <Button
                        variant="outlined"
                        onClick={() => setForm((prev) => ({
                          ...prev,
                          slot: slot,
                        }))}
                        fullWidth
                        sx={{
                          borderColor: isSelected ? COLORS.secondary.main : alpha(COLORS.text.secondary, 0.2),
                          color: isSelected ? COLORS.secondary.main : 'text.primary',
                          paddingY: 1.1,
                        }}
                      >
                        {slot}
                      </Button>
                    </Grid>
                  );
                })}
              </Grid>
            )}
          </>) : (
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                borderStyle: 'dashed',
                justifyContent: 'center',
                padding: 2,
              }}
            >
              <Typography variant="body2" sx={{ color: COLORS.text.secondary, textAlign: 'center' }}>
                Sélectionnez une date pour voir les créneaux disponibles
              </Typography>
            </Card>
          )}
        </Grid>
      </Grid>
    </Step>
  );
}

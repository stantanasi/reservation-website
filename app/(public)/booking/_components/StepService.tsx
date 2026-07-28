'use client';

import { SERVICES } from '@/data/services.data';
import { COLORS } from '@/themes/colors';
import { CATEGORY_LABELS } from '@/types/service.type';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { alpha, Avatar, Box, Button, Card, Chip, Divider, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useBooking } from '../_contexts/BookingContext';
import Step from './Step';

export default function StepService() {
  const { booking, setBooking } = useBooking();
  const [activeCategory, setActiveCategory] = useState('all');
  const [form, setForm] = useState(booking.service);

  useEffect(() => {
    setForm(booking.service);
  }, [booking.service]);

  const categories = [
    { key: 'all', label: 'Tous' },
    ...Object.entries(CATEGORY_LABELS).map(([key, label]) => ({ key: key, label: label })),
  ];

  const services = activeCategory === 'all'
    ? SERVICES
    : SERVICES.filter((service) => service.category === activeCategory);

  return (
    <Step
      step="service"
      label="Prestation"
      summary={(selected) => (
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
          <Avatar
            src={selected.service.image}
            alt={selected.service.name}
            sx={{ width: 48, height: 48 }}
          />

          <Box sx={{ flex: 1 }}>
            <Typography sx={{ fontWeight: 500, fontSize: '0.88rem', marginBottom: 0.3 }}>
              {selected.service.name}
            </Typography>

            <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
              <Stack
                direction="row"
                spacing={0.5}
                sx={{
                  alignItems: 'center',
                  color: COLORS.text.secondary,
                  fontSize: '0.7rem',
                }}
              >
                <AccessTimeIcon />
                <Typography sx={{ color: 'inherit', fontSize: 'inherit' }}>
                  {selected.service.duration} min
                </Typography>
              </Stack>

              <Typography variant="h6" sx={{ color: COLORS.secondary.main }}>
                {selected.service.price} €
              </Typography>
            </Stack>
          </Box>
        </Stack>
      )}
      button={{
        disabled: !form,
        onClick: () => {
          if (!form) return;

          setBooking((prev) => ({
            ...prev,
            ...(booking.service?.service.id !== form.service.id && ({
              practitioner: undefined,
              slot: {
                ...booking.slot,
                slot: undefined,
              },
            })),
            service: form,
          }));
        },
        label: 'Confirmer la prestation'
      }}
    >
      <Stack
        direction="row"
        spacing={1}
        sx={{
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        {categories.map(({ key, label }) => {
          const isActive = activeCategory === key;
          return (
            <Button
              key={key}
              variant="outlined"
              onClick={() => setActiveCategory(key)}
              size="small"
              sx={{
                borderColor: isActive ? COLORS.secondary.main : alpha(COLORS.text.secondary, 0.2),
                background: isActive ? alpha(COLORS.secondary.main, 0.08) : 'transparent',
                color: isActive ? COLORS.secondary.main : COLORS.text.secondary,
              }}
            >
              {label}
            </Button>
          );
        })}
      </Stack>

      <Divider sx={{ marginY: 3 }} />

      <Stack
        direction="column"
        spacing={1.5}
        sx={{
          marginBottom: 3,
        }}
      >
        {services.map((service) => {
          const isSelected = form?.service.id === service.id;
          return (
            <Card
              key={service.id}
              onClick={() => setForm({
                service: service,
              })}
              sx={{
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
                gap: 2.5,
                padding: 2,
                transition: 'all 0.2s ease',
                '&:hover': {
                  borderColor: COLORS.secondary.main,
                },
              }}
            >
              <Avatar
                src={service.image}
                alt={service.name}
                sx={{ width: 60, height: 60 }}
              />

              <Box sx={{ flex: 1 }}>
                <Stack direction="row" spacing={1} sx={{ alignItems: 'center', marginBottom: 0.4 }}>
                  <Typography sx={{ fontWeight: 500, fontSize: '0.88rem' }}>
                    {service.name}
                  </Typography>

                  {service.featured && (
                    <Chip
                      label="Signature"
                      size="small"
                    />
                  )}
                </Stack>

                <Typography variant="caption" sx={{ color: COLORS.text.secondary, marginBottom: 0.6 }}>
                  {service.shortDescription}
                </Typography>

                <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                  <Stack
                    direction="row"
                    spacing={0.4}
                    sx={{
                      alignItems: 'center',
                      color: COLORS.text.secondary,
                      fontSize: '0.7rem',
                    }}
                  >
                    <AccessTimeIcon />
                    <Typography sx={{ color: 'inherit', fontSize: 'inherit' }}>
                      {service.duration} min
                    </Typography>
                  </Stack>

                  <Chip
                    label={CATEGORY_LABELS[service.category]}
                    size="small"
                  />
                </Stack>
              </Box>

              <Box sx={{ textAlign: 'right', gap: 0.8, flexShrink: 0 }}>
                <Typography variant="h5">
                  {service.price} €
                </Typography>

                {isSelected && (
                  <CheckCircleIcon sx={{ color: COLORS.secondary.main, fontSize: 18, marginTop: 0.6 }} />
                )}
              </Box>
            </Card>
          );
        })}
      </Stack>
    </Step>
  );
}

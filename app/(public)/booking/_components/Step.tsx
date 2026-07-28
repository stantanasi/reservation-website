'use client';

import { COLORS } from '@/themes/colors';
import CheckIcon from '@mui/icons-material/Check';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Box, Button, Card, Divider, Stack, Typography, alpha } from '@mui/material';
import { useEffect, useState } from 'react';
import { IBookingContext, useBooking } from '../_contexts/BookingContext';

type Props<T extends keyof IBookingContext['booking']> = React.PropsWithChildren<{
  step: T;
  label: string;
  summary?: (selected: NonNullable<IBookingContext['booking'][T]>) => React.ReactNode;
  button: {
    disabled?: boolean;
    onClick: () => void;
    label: string;
  };
}>;

export default function Step<T extends keyof IBookingContext['booking']>({
  step,
  label,
  summary,
  button,
  children,
}: Props<T>) {
  const { activeStep, steps, booking, next } = useBooking();
  const [status, setStatus] = useState<'idle' | 'active' | 'editing' | 'completed'>('idle');

  useEffect(() => {
    if (activeStep === step) {
      setStatus('active');
    } else if (steps.indexOf(activeStep) > steps.indexOf(step)) {
      setStatus('completed');
    }
  }, [activeStep]);

  if (steps.indexOf(activeStep) < steps.indexOf(step)) {
    return null;
  }

  return (
    <Card
      id={`booking-step-${step}`}
      sx={{
        scrollMarginTop: { xs: 57 + 20, md: 65 + 20 },
      }}
    >
      <Stack
        direction="row"
        spacing={2}
        sx={{
          alignItems: 'center',
          px: { xs: 2.5, md: 4 },
          py: 2.5,
        }}
      >
        <Box
          sx={{
            width: 28,
            height: 28,
            display: 'flex',
            alignItems: 'center',
            background: status === 'completed' ? COLORS.secondary.main
              : status === 'active' ? COLORS.primary.main
                : alpha(COLORS.text.secondary, 0.1),
            color: status === 'completed' ? COLORS.primary.main
              : status === 'active' ? COLORS.primary.contrastText
                : COLORS.text.secondary,
            fontSize: '0.7rem',
            fontWeight: 600,
            justifyContent: 'center',
            lineHeight: 1,
          }}
        >
          {status === 'completed' ? <CheckIcon /> : steps.indexOf(step) + 1}
        </Box>

        <Box sx={{ flex: 1 }}>
          <Typography
            sx={{
              color: COLORS.text.secondary,
              fontSize: '0.6rem',
              letterSpacing: '0.15em',
              marginBottom: 0.3,
              textTransform: 'uppercase',
            }}
          >
            Étape {steps.indexOf(step) + 1}
          </Typography>

          <Typography
            variant="h6"
            sx={{
              color: status === 'active' ? COLORS.primary.main
                : status === 'completed' ? COLORS.primary.main
                  : COLORS.text.secondary,
            }}
          >
            {label}
          </Typography>
        </Box>

        {status === 'completed' && (
          <Button
            variant="outlined"
            startIcon={<EditOutlinedIcon />}
            onClick={() => setStatus('editing')}
            size="small"
          >
            Modifier
          </Button>
        )}
      </Stack>

      <Divider />

      {status === 'completed' && summary && booking[step] && (
        <Box
          sx={{
            paddingX: { xs: 2.5, md: 4 },
            paddingY: 2,
          }}
        >
          {summary(booking[step])}
        </Box>
      )}

      {(status === 'active' || status === 'editing') && (
        <Stack
          direction="column"
          sx={{
            paddingX: { xs: 2.5, md: 4 },
            paddingY: 3,
          }}
        >
          {children}

          <Divider sx={{ marginY: 3 }} />

          <Button
            variant="contained"
            disabled={button.disabled}
            onClick={() => {
              button.onClick();

              if (status === 'editing') {
                document.getElementById('booking')
                  ?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                  });
                next(step);
              } else {
                next();
              }
            }}
            sx={{
              alignSelf: 'flex-end',
            }}
          >
            {button.label}
          </Button>
        </Stack>
      )}
    </Card>
  );
}

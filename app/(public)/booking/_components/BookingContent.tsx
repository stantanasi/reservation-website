'use client';

import { SERVICES } from '@/data/services.data';
import { Container, Grid } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import Section from '../../_components/Section';
import BookingProvider from '../_contexts/BookingContext';
import BookingSummary from './BookingSummary';
import StepCheckout from './StepCheckout';
import StepService from './StepService';
import StepSlot from './StepSlot';
import StepStaff from './StepStaff';

export default function BookingContent() {
  const searchParams = useSearchParams();
  const serviceSlug = searchParams.get('service');
  const service = SERVICES.find((service) => service.slug === serviceSlug);

  return (
    <BookingProvider initial={service ? { service: { service: service } } : undefined}>
      <Section
        overline="Réservation"
        title={{
          text: 'Votre moment de grâce',
          variant: 'h1',
        }}
        subtitle="Suivez les étapes ci-dessous. Votre récapitulatif se construit en temps réel."
        align="left"
        mode="dark"
      />

      <Container
        id="booking"
        maxWidth="xl"
        sx={{
          paddingY: { xs: 4, md: 6 },
          scrollMarginTop: { xs: 57, md: 65 },
        }}
      >
        <Grid container spacing={{ xs: 3, lg: 5 }}>
          <Grid
            size={{ xs: 12, lg: 7 }}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2.5,
            }}
          >
            <StepService />
            <StepStaff />
            <StepSlot />
            <StepCheckout />
          </Grid>

          <Grid size={{ xs: 12, lg: 5 }}>
            <BookingSummary />
          </Grid>
        </Grid>
      </Container>
    </BookingProvider>
  );
}
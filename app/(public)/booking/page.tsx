import { SERVICES } from '@/data/services.data';
import { Container, Grid } from '@mui/material';
import { Metadata } from 'next';
import Section from '../_components/Section';
import BookingSummary from './_components/BookingSummary';
import StepCheckout from './_components/StepCheckout';
import StepService from './_components/StepService';
import StepSlot from './_components/StepSlot';
import StepStaff from './_components/StepStaff';
import BookingProvider from './_contexts/BookingContext';

export const metadata: Metadata = {
  title: 'Réserver un Soin',
  description: 'Réservez votre soin en ligne chez Séréna Studio. Choisissez votre prestation, votre praticien, votre créneau et payez en toute sécurité. Confirmation immédiate.',
};

export default async function BookingPage({
  searchParams,
}: {
  searchParams: Promise<{
    service?: string;
  }>;
}) {
  const { service: serviceSlug } = await searchParams;
  const service = SERVICES.find((service) => service.slug === serviceSlug);

  return (
    <main>
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
    </main>
  );
}

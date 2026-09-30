import { APPOINTMENTS } from '@/data/appointments.data';
import { COLORS } from '@/themes/colors';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import { Alert, Avatar, Button, Card, Container, Divider, Stack, Typography } from '@mui/material';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{
    reference: string;
  }>;
};

export async function generateStaticParams() {
  return APPOINTMENTS.map((appointment) => ({ reference: appointment.reference }));
}

export const metadata: Metadata = {
  title: 'Réservation Confirmée',
  description: 'Votre rendez-vous chez Séréna Studio est confirmé. Retrouvez tous les détails dans cet email de confirmation.',
};

export default async function BookingConfirmationPage({
  params,
}: Props) {
  const { reference } = await params;

  const appointment = APPOINTMENTS.find((appointment) => appointment.reference === reference);
  if (!appointment) {
    notFound();
  }

  return (
    <main>
      <Container
        maxWidth="sm"
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          py: { xs: 8, md: 14 },
        }}
      >
        <Avatar sx={{ width: 88, height: 88, borderRadius: '50%' }}>
          <CheckCircleOutlinedIcon sx={{ color: COLORS.secondary.main, fontSize: 48 }} />
        </Avatar>

        <Typography variant="overline" sx={{ marginBottom: 1.5 }}>
          Réservation Confirmée
        </Typography>

        <Typography variant="h2" sx={{ marginBottom: 2 }}>
          À très bientôt !
        </Typography>

        <Typography variant="body1" sx={{ color: COLORS.text.secondary, marginBottom: 4, textAlign: 'center' }}>
          Votre rendez-vous est confirmé. Un email de confirmation a été envoyé à votre adresse avec tous les détails.
        </Typography>

        <Card
          sx={{
            marginBottom: 5,
            padding: 4,
          }}
        >
          <Stack direction="row" sx={{ alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 3 }}>
            <Typography variant="overline" sx={{ color: COLORS.secondary.main }}>
              Votre Rendez-vous
            </Typography>

            <Typography variant="caption" sx={{ color: COLORS.text.secondary, letterSpacing: '0.05em' }}>
              {appointment.reference}
            </Typography>
          </Stack>

          <Typography sx={{ fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: COLORS.text.secondary, mb: 0.5 }}>
            Date & Heure
          </Typography>

          <Typography variant="body1" sx={{ fontWeight: 500 }}>
            {appointment.date
              ? new Date(appointment.date.replace(/-/g, '/')).toLocaleDateString('fr-FR', {
                weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
              })
              : 'Date à confirmer'}
          </Typography>

          <Typography variant="body2" sx={{ color: COLORS.text.secondary }}>
            À {appointment.startTime}
          </Typography>

          <Divider sx={{ marginY: 3 }} />

          <Typography sx={{ fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: COLORS.text.secondary, mb: 0.5 }}>
            Adresse
          </Typography>

          <Typography variant="body2" sx={{ color: COLORS.text.secondary }}>
            Séréna Studio<br />
            12 Rue de la Paix, 75002 Paris<br />
            (Entrée Rue de Castiglione)
          </Typography>

          <Divider sx={{ marginY: 3 }} />

          <Alert severity="info" icon="💡" sx={{ borderLeft: `3px solid ${COLORS.secondary.main}` }}>
            Merci d'arriver 5 minutes avant votre rendez-vous. En cas d'empêchement, annulez jusqu'à 24h avant sans frais.
          </Alert>
        </Card>

        <Typography variant="overline" sx={{ color: COLORS.text.secondary, marginBottom: 2 }}>
          Ajouter à mon agenda
        </Typography>

        <Stack direction="row" spacing={2} sx={{ alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center', marginBottom: 5 }}>
          <Button
            variant="outlined"
            startIcon={<CalendarMonthIcon />}
          >
            Google Agenda
          </Button>

          <Button
            variant="outlined"
            startIcon={<CalendarMonthIcon />}
          >
            Apple Calendar
          </Button>
        </Stack>

        <Stack direction="row" spacing={2} sx={{ alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link href="/compte/rendez-vous">
            <Button
              variant="contained"
              startIcon={<ReceiptLongOutlinedIcon />}
            >
              Mes rendez-vous
            </Button>
          </Link>

          <Link href="/">
            <Button
              variant="outlined"
              startIcon={<HomeOutlinedIcon />}
            >
              Retour à l'accueil
            </Button>
          </Link>
        </Stack>
      </Container>
    </main>
  );
}

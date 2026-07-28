import { APPOINTMENTS } from '@/data/appointments.data';
import { SERVICES } from '@/data/services.data';
import { STAFF } from '@/data/staff.data';
import { USERS } from '@/data/users.data';
import AddIcon from '@mui/icons-material/Add';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Button, Card, Divider, Grid, Stack, Typography } from '@mui/material';
import { Metadata } from 'next';
import Link from 'next/link';
import AppointmentCard from './_components/AppointmentCard';
import PageHeader from './_components/PageHeader';
import { COLORS } from '@/themes/colors';

export const metadata: Metadata = {
  title: 'Mon Compte',
  description: 'Votre espace personnel Séréna Studio. Consultez vos rendez-vous à venir, votre historique de soins et vos informations personnelles.',
};

export default function AccountPage() {
  const user = USERS[0];
  const appointments = APPOINTMENTS
    .filter((appointment) => appointment.user === user.id)
    .map((appointment) => ({
      ...appointment,
      service: SERVICES.find((service) => appointment.service === service.id)!,
      staff: STAFF.find((member) => appointment.staff === member.id)!,
    }))
    .sort((a, b) => new Date(`${b.date}T${b.startTime}`).getTime() - new Date(`${a.date}T${a.startTime}`).getTime());

  const upcoming = appointments.filter((appointment) => {
    return appointment.status === 'confirmed' || appointment.status === 'pending';
  });
  const past = appointments.filter((appointment) => {
    return appointment.status === 'completed' || appointment.status === 'cancelled';
  });

  return (
    <main>
      <PageHeader
        overline="Mon Espace"
        title={`Bonjour, ${user.firstName}`}
        action={{
          text: 'Nouveau rendez-vous',
          href: '/booking',
          icon: <AddIcon />,
        }}
      />

      <Grid container spacing={2} sx={{ marginBottom: 5 }}>
        {[
          {
            label: 'Soins réalisés',
            value: past.length,
          },
          {
            label: 'Prochain RDV',
            value: upcoming.at(-1)?.date
              ? new Date(upcoming.at(-1)!.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })
              : '-',
          },
          {
            label: 'Total dépensé',
            value: `${appointments.map((a) => a.totalAmount).reduce((acc, cur) => acc + cur, 0)} €`,
          },
        ].map(({ label, value }) => (
          <Grid
            key={label}
            size={{ xs: 12, sm: 4 }}
            component={Card}
            sx={{ padding: 3, textAlign: 'center' }}
          >
            <Typography variant="h3" sx={{ color: COLORS.secondary.main, mb: 0.5 }}>
              {value}
            </Typography>

            <Typography variant="caption" sx={{ color: COLORS.text.secondary, fontSize: '0.6rem', textTransform: 'uppercase' }}>
              {label}
            </Typography>
          </Grid>
        ))}
      </Grid>

      <Stack direction="row" sx={{ alignItems: 'center', marginBottom: 2.5 }}>
        <Typography variant="h5" sx={{ flex: 1 }}>
          Rendez-vous à venir
        </Typography>

        <Link href="/compte/rendez-vous">
          <Button variant="text" endIcon={<ArrowForwardIcon />}>
            Tout voir
          </Button>
        </Link>
      </Stack>

      <Stack direction="column" spacing={1.5}>
        {upcoming.length === 0 ? (
          <Card sx={{ padding: 5, textAlign: 'center' }}>
            <Typography variant="body2" sx={{ color: COLORS.text.secondary, marginBottom: 2 }}>
              Aucun rendez-vous prévu
            </Typography>

            <Link href="/booking">
              <Button variant="contained">
                Réserver
              </Button>
            </Link>
          </Card>
        ) : upcoming.map((appointment) => (
          <AppointmentCard
            key={appointment.id}
            appointment={appointment}
            variant="compact"
          />
        ))}
      </Stack>

      <Divider sx={{ marginY: 5 }} />

      <Typography variant="h5" sx={{ marginBottom: 2.5 }}>
        Historique
      </Typography>

      <Stack direction="column" spacing={1.5}>
        {past.map((appointment) => (
          <AppointmentCard
            key={appointment.id}
            appointment={appointment}
            variant="compact"
          />
        ))}
      </Stack>
    </main>
  );
}
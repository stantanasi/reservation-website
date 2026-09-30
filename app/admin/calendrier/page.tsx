import { Typography } from '@mui/material';
import { Metadata } from 'next';
import CalendarContent from './_components/CalendarContent';

export const metadata: Metadata = {
  title: 'Agenda',
  description: 'Agenda général de Séréna Studio. Visualisez et gérez les plannings de tous les praticiens par jour et par semaine.',
};

export default function AdminCalendarPage() {
  return (
    <main>
      <Typography variant="overline" sx={{ marginBottom: 1 }}>
        Administration
      </Typography>

      <CalendarContent />
    </main>
  );
}
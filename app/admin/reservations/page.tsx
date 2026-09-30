import { Typography } from '@mui/material';
import { Metadata } from 'next';
import ReservationsContent from './_components/ReservationsContent';

export const metadata: Metadata = {
  title: 'Réservations',
  description: 'Liste et gestion de toutes les réservations de Séréna Studio. Filtrer par statut, praticien, date et client.',
};

export default function AdminReservationsPage() {
  return (
    <main>
      <Typography variant="overline" sx={{ marginBottom: 1 }}>
        Administration
      </Typography>

      <ReservationsContent />
    </main >
  );
}
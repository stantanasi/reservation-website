import { Typography } from '@mui/material';
import { Metadata } from 'next';
import StaffContent from './_components/StaffContent';

export const metadata: Metadata = {
  title: 'Gestion de l\'Équipe',
  description: 'Gérez les praticiens de Séréna Studio : informations, spécialités, horaires de travail et disponibilités.',
};

export default function AdminStaffPage() {
  return (
    <main>
      <Typography variant="overline" sx={{ marginBottom: 1 }}>
        Administration
      </Typography>

      <StaffContent />
    </main>
  );
}
import { Typography } from '@mui/material';
import { Metadata } from 'next';
import ServicesContent from './_components/ServicesContent';

export const metadata: Metadata = {
  title: 'Gestion des Prestations',
  description: 'Créez, modifiez et gérez le catalogue des soins de Séréna Studio. Prix, durées, praticiens associés et visibilité.',
};

export default function AdminServicesPage() {
  return (
    <main>
      <Typography variant="overline" sx={{ marginBottom: 1 }}>
        Administration
      </Typography>

      <ServicesContent />
    </main >
  );
}
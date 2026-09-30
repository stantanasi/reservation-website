import { Typography } from '@mui/material';
import { Metadata } from 'next';
import ClientsContent from './_components/ClientsContent';

export const metadata: Metadata = {
  title: 'Fichier Clients',
  description: 'CRM clients de Séréna Studio. Consultez les profils, l\'historique des soins, le chiffre d\'affaires par cliente et les statuts VIP.',
};

export default function AdminClientsPage() {
  return (
    <main>
      <Typography variant="overline" sx={{ marginBottom: 1 }}>
        Administration
      </Typography>

      <ClientsContent />
    </main>
  );
}
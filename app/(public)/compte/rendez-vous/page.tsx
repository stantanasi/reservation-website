import AddIcon from '@mui/icons-material/Add';
import { Metadata } from 'next';
import PageHeader from '../_components/PageHeader';
import AccountAppointmentsContent from './_components/AccountAppointmentsContent';

export const metadata: Metadata = {
  title: 'Mes Rendez-vous',
  description: 'Consultez vos prochains rendez-vous, votre historique de soins, et gérez vos réservations chez Séréna Studio.',
};

export default function AccountAppointmentsPage() {
  return (
    <main>
      <PageHeader
        overline="Mon Compte"
        title="Mes Rendez-vous"
        action={{
          text: 'Nouveau rendez-vous',
          href: '/booking',
          icon: <AddIcon />,
        }}
      />

      <AccountAppointmentsContent />
    </main>
  );
}
import { USERS } from '@/data/users.data';
import { Avatar, Box, Card, Typography } from '@mui/material';
import { Metadata } from 'next';
import PageHeader from '../_components/PageHeader';
import DangerZone from './_components/DangerZone';
import GeneralForm from './_components/GeneralForm';
import SecurityForm from './_components/SecurityForm';
import { COLORS } from '@/themes/colors';

export const metadata: Metadata = {
  title: 'Mon Profil',
  description: 'Modifiez vos informations personnelles, votre mot de passe et vos préférences de compte Séréna Studio.',
};

export default function AccountProfilePage() {
  const user = USERS[0];

  return (
    <main>
      <PageHeader
        overline="Mon Compte"
        title="Mon Profil"
      />

      <Card
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'row',
          gap: 3,
          marginBottom: 3,
          padding: 3,
        }}
      >
        <Avatar
          alt={`${user.firstName} ${user.lastName}`}
          sx={{ width: 72, height: 72 }}
        >
          {user.firstName[0]}
        </Avatar>

        <Box>
          <Typography sx={{ fontWeight: 500, mb: 0.5 }}>
            {user.firstName} {user.lastName}
          </Typography>

          <Typography variant="caption" sx={{ color: COLORS.text.secondary }}>
            Membre depuis {new Date(user.createdAt).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
          </Typography>
        </Box>
      </Card>

      <GeneralForm user={user} />

      <SecurityForm user={user} />

      <DangerZone user={user} />
    </main>
  );
}
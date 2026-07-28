'use client';

import { COLORS } from '@/themes/colors';
import { User } from '@/types/user.type';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Card, Typography } from '@mui/material';

type Props = {
  user: User;
};

export default function DangerZone({
  user,
}: Props) {
  return (
    <Card
      sx={{
        marginBottom: 3,
        padding: { xs: 3, md: 4 },
      }}
    >
      <Typography variant="h5" sx={{ color: COLORS.error.main, marginBottom: 1 }}>
        Zone de danger
      </Typography>

      <Typography variant="body2" sx={{ color: COLORS.text.secondary, marginBottom: 3 }}>
        La suppression de votre compte est irréversible. Toutes vos données seront définitivement effacées.
      </Typography>

      <Button
        variant="outlined"
        startIcon={<DeleteIcon />}
        sx={{
          borderColor: COLORS.error.main,
          color: COLORS.error.main,
          '&:hover': {
            borderColor: COLORS.error.dark,
            color: COLORS.error.dark,
          },
        }}
      >
        Supprimer mon compte
      </Button>
    </Card>
  );
}
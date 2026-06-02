import { COLORS } from '@/themes/colors';
import { Review } from '@/types/review.type';
import { Service } from '@/types/service.type';
import { User } from '@/types/user.type';
import StarIcon from '@mui/icons-material/Star';
import { alpha, Card, CardContent, Divider, Stack, Typography } from '@mui/material';

type Props = {
  review: Review & {
    user: User;
    service: Service;
  };
  mode?: 'light' | 'dark';
};

export default function ReviewCard({
  review,
  mode = 'light',
}: Props) {
  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: mode === 'light' ? COLORS.primary.contrastText : COLORS.primary.main,
        border: `1px solid ${alpha(COLORS.primary.contrastText, 0.08)}`,
        transition: 'border-color 0.3s ease',
        '&:hover': {
          borderColor: alpha(COLORS.secondary.main, 0.3),
        },
      }}
    >
      <CardContent
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Stack direction="row" sx={{ marginBottom: 2 }}>
          {[...Array(review.rating)].map((_, i) => (
            <StarIcon key={i} sx={{ color: COLORS.secondary.main }} />
          ))}
        </Stack>

        <Typography
          sx={{
            color: mode === 'light' ? COLORS.text.secondary : alpha(COLORS.primary.contrastText, 0.7),
            fontSize: '0.9rem',
            fontStyle: 'italic',
            flex: 1,
          }}
        >
          "{review.comment}"
        </Typography>

        <Divider sx={{ borderColor: alpha(COLORS.primary.contrastText, 0.08), marginY: 2.5 }} />

        <Typography
          sx={{
            color: mode === 'light' ? COLORS.primary.main : COLORS.primary.contrastText,
            fontSize: '0.85rem',
            fontWeight: 500,
            marginBottom: 0.5,
          }}
        >
          {review.user.firstName} {review.user.lastName[0]}.
        </Typography>

        <Typography
          sx={{
            color: COLORS.secondary.main,
            fontSize: '0.7rem',
            letterSpacing: '0.05em',
          }}
        >
          {review.service.name}
        </Typography>
      </CardContent>
    </Card>
  );
}
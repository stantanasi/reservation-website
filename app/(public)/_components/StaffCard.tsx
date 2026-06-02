import { COLORS } from '@/themes/colors';
import { Staff } from '@/types/staff.type';
import { alpha, Box, Card, CardContent, Typography } from '@mui/material';

type Props = {
  staff: Staff;
};

export default function StaffCard({
  staff,
}: Props) {
  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: `0 8px 40px ${alpha(COLORS.primary.main, 0.1)}`,
          transform: 'translateY(-2px)',
        },
        '&:hover .staff-img': {
          transform: 'scale(1.05)',
        },
      }}
    >
      <Box sx={{ position: 'relative', aspectRatio: 3 / 4, overflow: 'hidden' }}>
        <Box
          className="staff-img"
          component="img"
          src={staff.image}
          alt={`${staff.firstName} ${staff.lastName}`}
          sx={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            inset: 0,
            objectFit: 'cover',
            objectPosition: 'center top',
            transition: 'transform 0.6s ease',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: `linear-gradient(to top, ${alpha(COLORS.primary.main, 0.5)} 0%, transparent 60%)`,
          }}
        />
      </Box>

      <CardContent sx={{ display: 'flex', flex: 1, flexDirection: 'column', textAlign: 'center' }}>
        <Typography variant="h5" sx={{ marginBottom: 0.5 }}>
          {staff.firstName} {staff.lastName}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: COLORS.text.secondary,
            fontSize: '0.8rem',
            marginBottom: 2,
          }}
        >
          {staff.role}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: COLORS.text.secondary,
            flex: 1,
            fontSize: '0.82rem',
            lineHeight: 1.7,
            textOverflow: 'ellipsis',
          }}
        >
          {staff.bio}
        </Typography>
      </CardContent>
    </Card>
  );
}
import { COLORS } from '@/themes/colors';
import { CATEGORY_LABELS } from '@/types/service.type';
import { Staff } from '@/types/staff.type';
import { alpha, Avatar, Box, Card, CardContent, Chip, Stack, Typography } from '@mui/material';

type Props = {
  staff: Staff;
  variant: 'minimal' | 'overlay' | 'compact';
};

export default function StaffCard({
  staff,
  variant = 'minimal',
}: Props) {
  if (variant === 'compact') {
    return (
      <Card
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'row',
          gap: 2,
          padding: 2,
          transition: 'all 0.3s ease',
          '&:hover': {
            borderColor: COLORS.secondary.main,
          },
        }}
      >
        <Avatar
          src={staff.image}
          alt={`${staff.firstName} ${staff.lastName}`}
          sx={{ width: 52, height: 52 }}
        />

        <Box sx={{ flex: 1 }}>
          <Typography sx={{ fontSize: '0.9rem', fontWeight: 500 }}>
            {staff.firstName} {staff.lastName}
          </Typography>

          <Typography variant="caption" sx={{ color: COLORS.secondary.main, fontSize: '0.62rem', marginBottom: 0.8 }}>
            {staff.role}
          </Typography>

          <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
            {staff.specialties.slice(0, 2).map((spec) => (
              <Chip
                key={spec}
                label={CATEGORY_LABELS[spec]}
                size="small"
              />
            ))}
          </Stack>
        </Box>
      </Card>
    );
  }

  if (variant === 'overlay') {
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
          '&:hover .overlay': {
            opacity: 1,
          },
          '&:hover .staff-img': {
            transform: 'scale(1.04)',
          },
        }}
      >
        <Box sx={{ position: 'relative', flex: 1, overflow: 'hidden' }}>
          <Box
            component="img"
            className="staff-img"
            src={staff.image}
            alt={`${staff.firstName} ${staff.lastName}`}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center top',
              transition: 'transform 0.6s ease',
            }}
          />

          <Stack
            className="overlay"
            direction="column"
            spacing={3}
            sx={{
              position: 'absolute',
              inset: 0,
              background: alpha(COLORS.primary.main, 0.75),
              justifyContent: 'flex-end',
              opacity: 0,
              padding: 4,
              transition: 'opacity 0.4s ease',
            }}
          >
            <Typography
              sx={{
                color: alpha(COLORS.primary.contrastText, 0.8),
                fontSize: '0.85rem',
                lineHeight: 1.8,
              }}
            >
              {staff.bio}
            </Typography>

            <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
              {staff.specialties.map((category) => (
                <Chip
                  key={category}
                  label={CATEGORY_LABELS[category]}
                  size="small"
                  sx={{
                    background: alpha(COLORS.secondary.main, 0.2),
                    color: COLORS.secondary.main,
                    fontSize: '0.6rem',
                  }}
                />
              ))}
            </Stack>
          </Stack>
        </Box>

        <CardContent >
          <Stack direction="row" sx={{ justifyContent: 'space-between', marginBottom: 2 }}>
            <Typography variant="h5">
              {staff.firstName} {staff.lastName}
            </Typography>

            {staff.role === 'Directrice & Masseuse Thérapeutique' && (
              <Chip
                label="Fondatrice"
                size="small"
                sx={{
                  background: alpha(COLORS.secondary.main, 0.1),
                  color: COLORS.secondary.dark,
                  fontSize: '0.6rem',
                }}
              />
            )}
          </Stack>

          <Typography
            sx={{
              color: COLORS.secondary.main,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              fontSize: '0.65rem',
              marginBottom: 2,
            }}
          >
            {staff.role}
          </Typography>

          <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
            {staff.specialties.map((category) => (
              <Chip
                key={category}
                label={CATEGORY_LABELS[category]}
                size="small"
                variant="outlined"
                sx={{
                  borderColor: alpha(COLORS.text.secondary, 0.2),
                  color: COLORS.text.secondary,
                  fontSize: '0.6rem',
                }}
              />
            ))}
          </Stack>
        </CardContent>
      </Card>
    );
  }

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
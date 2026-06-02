'use client';

import { cormorant_garamond } from '@/app/fonts';
import { COLORS } from '@/themes/colors';
import { CATEGORY_LABELS, Service } from '@/types/service.type';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { alpha, Box, Button, Card, CardContent, Chip, Divider, Stack, Typography } from '@mui/material';
import Link from 'next/link';

interface Props {
  service: Service;
}

export default function ServiceCard({
  service,
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
      }}
    >
      <Box sx={{ position: 'relative', aspectRatio: 16 / 9, overflow: 'hidden' }}>
        <Box
          component="img"
          src={service.image}
          alt={service.name}
          sx={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            inset: 0,
            objectFit: 'cover',
            transition: 'transform 0.6s ease',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: `linear-gradient(to top, ${alpha(COLORS.primary.main, 0.4)} 0%, transparent 60%)`,
          }}
        />

        {service.featured && (
          <Chip
            label="Signature"
            size="small"
            sx={{
              position: 'absolute',
              top: 16,
              left: 16,
              background: COLORS.secondary.main,
              color: COLORS.primary.main,
            }}
          />
        )}

        <Chip
          label={`${service.price} €`}
          size="medium"
          sx={{
            position: 'absolute',
            bottom: 16,
            right: 16,
            background: alpha(COLORS.primary.contrastText, 0.95),
            color: COLORS.primary.main,
            fontFamily: `${cormorant_garamond.style.fontFamily}, serif`,
            fontSize: '1rem',
            fontWeight: 600,
          }}
        />
      </Box>

      <CardContent sx={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
        <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center', mb: 1.5 }}>
          <Chip
            label={CATEGORY_LABELS[service.category]}
            size="small"
          />

          <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center' }}>
            <AccessTimeIcon sx={{ fontSize: 12, color: COLORS.text.secondary }} />
            <Typography variant="caption" sx={{color: COLORS.text.secondary}}>
              {service.duration} min
            </Typography>
          </Stack>
        </Stack>

        <Typography variant="h5" sx={{ mb: 1 }}>
          {service.name}
        </Typography>

        <Typography variant="body2" sx={{ color: COLORS.text.secondary, flex: 1 }}>
          {service.shortDescription}
        </Typography>

        <Divider sx={{ marginY: 3 }} />

        <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
          <Link href={`/booking?service=${service.slug}`}>
            <Button variant="contained" size="small">
              Réserver
            </Button>
          </Link>

          <Link href={`/services/${service.slug}`}>
            <Button variant="outlined" size="small">
              Détails
            </Button>
          </Link>
        </Stack>
      </CardContent>
    </Card>
  );
}
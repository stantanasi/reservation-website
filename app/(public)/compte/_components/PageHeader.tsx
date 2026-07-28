import { Box, Button, Stack, Typography } from '@mui/material';
import Link from 'next/link';
import React from 'react';

type Props = {
  overline?: string;
  title: string;
  action?: {
    text: string;
    href: string;
    icon?: React.ReactNode;
  };
};

export default function PageHeader({
  overline,
  title,
  action,
}: Props) {
  return (
    <Box>
      <Typography variant="overline" sx={{ marginBottom: 1 }}>
        {overline}
      </Typography>

      <Stack
        direction="row"
        spacing={2}
        sx={{
          alignItems: 'center',
          flexWrap: 'wrap',
          marginBottom: 5,
        }}
      >
        <Typography variant="h3" sx={{ flex: 1 }}>
          {title}
        </Typography>

        {action && (
          <Link href={action.href}>
            <Button variant="contained" startIcon={action.icon}>
              {action.text}
            </Button>
          </Link>
        )}
      </Stack>
    </Box>
  );
}
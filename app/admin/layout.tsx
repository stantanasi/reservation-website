import { COLORS } from '@/themes/colors';
import { Box, Stack } from '@mui/material';
import { Metadata } from 'next/types';
import AdminSidebar from './_component/AdminSidebar';

export const metadata: Metadata = {
  title: {
    default: 'Séréna Administration',
    template: '%s | Séréna Administration'
  },
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Stack
      direction={{ xs: 'column', md: 'row' }}
      sx={{
        background: COLORS.primary.contrastText,
        minHeight: '100vh',
      }}
    >
      <AdminSidebar />

      <Box sx={{ flex: 1, padding: { xs: 2, md: 4 } }}>
        {children}
      </Box>
    </Stack>
  );
}
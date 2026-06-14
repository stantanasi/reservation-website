import { Grid } from '@mui/material';
import Section from '../_components/Section';
import Sidebar from './_components/Sidebar';

export default function AccountLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Section maxWidth="xl">
      <Grid container spacing={4} sx={{ width: '100%' }}>
        <Grid size={{ xs: 12, md: 3 }}>
          <Sidebar />
        </Grid>

        <Grid size={{ xs: 12, md: 9 }}>
          {children}
        </Grid>
      </Grid>
    </Section>
  );
}
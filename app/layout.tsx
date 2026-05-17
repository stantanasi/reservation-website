import theme from '@/themes/theme';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v16-appRouter';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import type { Metadata } from "next";
import { cormorant_garamond, dm_sans } from './fonts';

export const metadata: Metadata = {
  title: 'Séréna Studio — Institut Beauté & Bien-Être Paris',
  description: 'Institut de beauté haut de gamme au cœur de Paris. Massages, soins visage, rituel corps, coiffure et bien-être. Réservez votre moment de grâce.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${cormorant_garamond.className} ${dm_sans.className}`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}

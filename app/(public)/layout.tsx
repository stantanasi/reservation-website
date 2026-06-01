import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'Séréna Studio — Institut Beauté & Bien-Être Paris',
    template: '%s | Séréna Studio',
  },
  description: 'Institut de beauté haut de gamme au cœur de Paris. Massages, soins visage, rituel corps, coiffure et bien-être. Réservez votre moment de grâce.',
};

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
    </>
  );
}
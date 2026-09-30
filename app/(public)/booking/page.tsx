import { Metadata } from 'next';
import { Suspense } from 'react';
import BookingContent from './_components/BookingContent';

export const metadata: Metadata = {
  title: 'Réserver un Soin',
  description: 'Réservez votre soin en ligne chez Séréna Studio. Choisissez votre prestation, votre praticien, votre créneau et payez en toute sécurité. Confirmation immédiate.',
};

export default function BookingPage() {
  return (
    <main>
      <Suspense fallback={
        <div>Chargement...</div>
      }>
        <BookingContent />
      </Suspense>
    </main>
  );
}

import { STAFF } from '@/data/staff.data';
import { Button, Grid } from '@mui/material';
import { Metadata } from 'next';
import Link from 'next/link';
import Section from '../_components/Section';
import StaffCard from '../_components/StaffCard';

export const metadata: Metadata = {
  title: 'Notre Équipe',
  description: 'Rencontrez les experts de Séréna Studio : Isabelle Moreau, Clara Fontaine, Amara Diallo, Noémie Laurent et Julien Martel. Des praticiens d\'exception formés aux meilleures techniques mondiales.',
};

export default function StaffPage() {
  const members = STAFF;

  return (
    <main>
      <Section
        overline="Nos Experts"
        title={{
          text: "Des mains d'exception",
          variant: 'h1',
        }}
        subtitle="Chaque praticien est l'auteur de votre expérience — choisi pour sa maîtrise, sa sensibilité et son éthique du soin."
        align="left"
        background={{
          text: 'ÉQUIPE',
        }}
        mode="dark"
      />

      <Section maxWidth="xl">
        <Grid container spacing={4}>
          {members.map((member, index) => (
            <Grid
              key={member.id}
              size={{ xs: 12, md: index === 0 ? 12 : 6, lg: index === 0 ? 6 : 3 }}
            >
              <StaffCard
                staff={member}
                variant="overlay"
              />
            </Grid>
          ))}
        </Grid>
      </Section>

      <Section
        overline="Notre Engagement"
        title="L'excellence comme standard"
        subtitle="Formation continue, éthique du soin, bienveillance absolue envers chaque cliente."
        mode="dark"
      >
        <Link href="/booking">
          <Button variant="contained">
            Réserver avec un praticien
          </Button>
        </Link>
      </Section>
    </main >
  );
}
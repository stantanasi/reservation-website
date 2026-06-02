import { Metadata } from 'next';
import Section from '../_components/Section';
import ServicesContent from './_components/ServicesContent';

export const metadata: Metadata = {
  title: 'Nos Prestations',
  description: 'Découvrez nos soins d\'exception : massages holistiques, soins visage prestige, rituels corps, coiffure, onglerie et méditation. Chaque protocole est conçu sur-mesure.',
};

export default function ServicesPage() {
  return (
    <main>
      <Section
        overline="Nos Prestations"
        title="L'art du soin"
        subtitle="Chaque protocole est pensé comme une expérience unique — entre expertise technique et rituel sensoriel."
        align="left"
        background={{
          text: 'SOINS',
        }}
        mode="dark"
      />

      <ServicesContent />
    </main>
  );
}
'use client';

import { SERVICES } from '@/data/services.data';
import { COLORS } from '@/themes/colors';
import { CATEGORY_LABELS, Service } from '@/types/service.type';
import { alpha, Box, Button, Grid, Stack, Tab, Tabs, Typography } from '@mui/material';
import Link from 'next/link';
import { useState } from 'react';
import Section from '../../_components/Section';
import ServiceCard from '../../_components/ServiceCard';

const TABS: { value: 'all' | Service['category']; label: string; }[] = [
  { value: 'all', label: 'Tous les soins' },
  { value: 'massage', label: 'Massages' },
  { value: 'visage', label: 'Soins Visage' },
  { value: 'corps', label: 'Soins Corps' },
  { value: 'coiffure', label: 'Coiffure' },
  { value: 'onglerie', label: 'Onglerie' },
  { value: 'bien-etre', label: 'Bien-Être' },
];

export default function ServicesContent() {
  const [activeCategory, setActiveCategory] = useState<'all' | Service['category']>('all');

  const services = activeCategory === 'all'
    ? SERVICES
    : SERVICES.filter((service) => service.category === activeCategory);

  return (
    <Box>
      <Stack
        direction="row"
        sx={{
          position: 'sticky',
          top: { xs: 57, md: 65 },
          background: '#fff',
          borderBottom: `1px solid ${alpha(COLORS.text.secondary, 0.15)}`,
          justifyContent: 'center',
          zIndex: 100,
        }}
      >
        <Tabs
          value={TABS.findIndex((tab) => tab.value === activeCategory)}
          onChange={(_, index) => setActiveCategory(TABS[index].value)}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
        >
          {TABS.map((tab) => (
            <Tab key={tab.value} label={tab.label} />
          ))}
        </Tabs>
      </Stack>

      <Section maxWidth="xl" sx={{ paddingY: { xs: 6, md: 10 } }}>
        {activeCategory !== 'all' && (
          <Stack direction="column" spacing={1} sx={{ mb: 5 }}>
            <Typography variant="overline" sx={{ color: COLORS.secondary.main }}>
              Catégorie
            </Typography>

            <Typography variant="h3">
              {CATEGORY_LABELS[activeCategory]}
            </Typography>
          </Stack>
        )}

        {services.length === 0 ? (
          <Box sx={{ paddingY: 12, textAlign: 'center' }}>
            <Typography sx={{ color: COLORS.text.secondary }}>
              Aucune prestation dans cette catégorie
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={3} sx={{ width: '100%' }}>
            {services.map((service) => (
              <Grid key={service.id} size={{ xs: 12, sm: 6, lg: 4 }}>
                <ServiceCard
                  service={service}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Section>

      <Section
        title="Une question sur nos soins ?"
        subtitle="Notre équipe est disponible pour vous conseiller et créer un programme sur-mesure."
        mode="dark"
      >
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
          <Link href="/contact">
            <Button variant="outlined">
              Nous Contacter
            </Button>
          </Link>

          <Link href="/booking">
            <Button variant="contained">
              Réserver
            </Button>
          </Link>
        </Stack>
      </Section>
    </Box>
  );
}
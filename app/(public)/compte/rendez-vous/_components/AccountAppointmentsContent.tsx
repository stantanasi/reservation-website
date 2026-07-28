'use client';

import { APPOINTMENTS } from '@/data/appointments.data';
import { SERVICES } from '@/data/services.data';
import { STAFF } from '@/data/staff.data';
import { USERS } from '@/data/users.data';
import { COLORS } from '@/themes/colors';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Box, Button, Card, Stack, Tab, Tabs, Typography } from '@mui/material';
import Link from 'next/link';
import { useState } from 'react';
import AppointmentCard from '../../_components/AppointmentCard';

export default function AccountAppointmentsContent() {
  const [activeTab, setActiveTab] = useState(0);

  const user = USERS[0];
  const appointments = APPOINTMENTS
    .filter((appointment) => appointment.user === user.id)
    .map((appointment) => ({
      ...appointment,
      service: SERVICES.find((service) => service.id === appointment.service)!,
      staff: STAFF.find((member) => member.id === appointment.staff)!,
    }))
    .sort((a, b) => new Date(`${b.date}T${b.startTime}`).getTime() - new Date(`${a.date}T${a.startTime}`).getTime());

  const upcoming = appointments.filter((appointment) => {
    return appointment.status === 'confirmed' || appointment.status === 'pending';
  });
  const past = appointments.filter((appointment) => {
    return appointment.status === 'completed' || appointment.status === 'cancelled';
  });

  const result = activeTab === 0 ? upcoming : past;

  return (
    <Box>
      <Tabs
        value={activeTab}
        onChange={(_, v) => setActiveTab(v)}
        sx={{ marginBottom: 4 }}
      >
        <Tab label={`À venir (${upcoming.length})`} />
        <Tab label={`Historique (${past.length})`} />
      </Tabs>

      <Stack direction="column" spacing={2}>
        {result.length === 0 ? (
          <Card sx={{ padding: 10, textAlign: 'center' }}>
            <CalendarMonthIcon sx={{ color: COLORS.text.secondary, fontSize: '2rem', marginBottom: 2 }} />

            <Typography variant="body2" sx={{ color: COLORS.text.secondary, marginBottom: 3 }}>
              Aucun rendez-vous dans cette catégorie
            </Typography>

            {activeTab === 0 && (
              <Link href="/booking">
                <Button variant="contained">
                  Réserver un soin
                </Button>
              </Link>
            )}
          </Card>
        ) : result.map((appointment) => (
          <AppointmentCard
            key={appointment.id}
            appointment={appointment}
          />
        ))}
      </Stack>
    </Box>
  );
}
'use client';

import { APPOINTMENTS } from '@/data/appointments.data';
import { CALENDAR_EVENTS } from '@/data/events.data';
import { SERVICES } from '@/data/services.data';
import { STAFF } from '@/data/staff.data';
import { USERS } from '@/data/users.data';
import { COLORS } from '@/themes/colors';
import AddIcon from '@mui/icons-material/Add';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TodayIcon from '@mui/icons-material/Today';
import { alpha, Box, Button, Card, Chip, Grid, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import Link from 'next/link';
import { useState } from 'react';

function getWeekDates(date: Date) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  d.setDate(diff);
  return Array.from({ length: 7 }, (_, i) => {
    const nd = new Date(d);
    nd.setDate(d.getDate() + i);
    return nd;
  });
}

export default function CalendarContent() {
  const [week, setWeek] = useState(new Date());
  const [selectedPractitioner, setSelectedPractitioner] = useState<string | null>(null);

  const days = getWeekDates(week);
  const hours = Array.from({ length: 12 }, (_, i) => i + 8); // 8h → 19h
  const HOUR_HEIGHT = 60;

  const appointments = APPOINTMENTS
    .map((appointment) => ({
      ...appointment,
      service: SERVICES.find((service) => service.id === appointment.service)!,
      staff: STAFF.find((member) => member.id === appointment.staff)!,
      user: USERS.find((user) => user.id === appointment.user)!,
    }));
  const calendarEvents = CALENDAR_EVENTS
    .map((event) => ({
      ...event,
      staff: STAFF.find((member) => member.id === event.staff)!,
    }));

  const events = selectedPractitioner
    ? [
      ...appointments.filter((appointment) => appointment.staff.id === selectedPractitioner),
      ...calendarEvents.filter((event) => event.staff.id === selectedPractitioner),
    ]
    : [
      ...appointments,
      ...calendarEvents,
    ];

  return (
    <Box>
      <Stack
        direction="row"
        spacing={2}
        sx={{
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          marginBottom: 5,
        }}
      >
        <Typography variant="h3">
          Agenda Général
        </Typography>

        <Link href="/booking">
          <Button variant="contained" startIcon={<AddIcon />}>
            Nouvelle réservation
          </Button>
        </Link>
      </Stack>

      <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', marginBottom: 3 }}>
        <Chip
          label="Tous"
          onClick={() => setSelectedPractitioner(null)}
          sx={{
            background: !selectedPractitioner ? alpha(COLORS.secondary.main, 0.6) : alpha(COLORS.secondary.main, 0.1),
            color: !selectedPractitioner ? 'text.primary' : COLORS.text.secondary,
          }}
        />

        {STAFF.map((member) => (
          <Chip
            key={member.id}
            avatar={<Box sx={{ background: member.color, borderRadius: '50%' }} />}
            label={`${member.firstName} ${member.lastName[0]}.`}
            onClick={() => setSelectedPractitioner(member.id === selectedPractitioner ? null : member.id)}
            sx={{
              background: selectedPractitioner === member.id ? alpha(COLORS.secondary.main, 0.6) : alpha(COLORS.secondary.main, 0.1),
              color: selectedPractitioner === member.id ? 'text.primary' : COLORS.text.secondary,
            }}
          />
        ))}
      </Stack>

      {/* Calendar controls */}
      <Stack direction="row" spacing={2} sx={{ alignItems: 'center', marginBottom: 2 }}>
        <IconButton
          onClick={() => setWeek((prev) => {
            const date = new Date(prev);
            date.setDate(date.getDate() - 7);
            return date;
          })}
        >
          <ChevronLeftIcon />
        </IconButton>

        <IconButton onClick={() => setWeek(new Date())}>
          <TodayIcon />
        </IconButton>

        <Typography variant="h5">
          {days[0].toLocaleDateString('fr-FR', { day: '2-digit', month: 'long' })}
          {' — '}
          {days[6].toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })}
        </Typography>

        <IconButton
          onClick={() => setWeek((prev) => {
            const date = new Date(prev);
            date.setDate(date.getDate() + 7);
            return date;
          })}
        >
          <ChevronRightIcon />
        </IconButton>
      </Stack>

      <Grid
        container
        component={Card}
        columns={days.length + 0.5}
      >
        {Array.from({ length: hours.length + 1 }).map((_, row) =>
          Array.from({ length: days.length + 1 }).map((_, column) => {
            const date = days[column - 1];
            const hour = hours[row - 1];

            const isToday = date
              ? date.toLocaleDateString('fr-CA') === new Date().toLocaleDateString('fr-CA')
              : false;
            const dayEvents = date && row > 0
              ? events.filter((event) => {
                const eventStartHour = +event.startTime.split(':')[0];
                return event.date === date.toLocaleDateString('fr-CA') && eventStartHour === hour;
              })
              : [];

            return (
              <Grid
                key={`${column}-${row}`}
                size={column === 0 ? 0.5 : 1}
                sx={{
                  height: HOUR_HEIGHT,
                  position: 'relative',
                  background: isToday ? alpha(COLORS.secondary.main, 0.07) : 'transparent',
                  border: `0.5px solid ${alpha(COLORS.text.secondary, 0.12)}`,
                }}
              >
                {(row === 0 && column > 0) && (
                  <Box sx={{ padding: 1, textAlign: 'center' }}>
                    <Typography sx={{ color: COLORS.text.secondary, fontSize: '0.6rem' }}>
                      {date.toLocaleString('fr-FR', { weekday: 'short' })}
                    </Typography>

                    <Typography variant="h5" sx={{ color: isToday ? COLORS.secondary.main : 'text.primary' }}>
                      {date.getDate()}
                    </Typography>
                  </Box>
                )}

                {(row > 0 && column === 0) && (
                  <Typography
                    sx={{
                      color: COLORS.text.secondary,
                      fontSize: '0.62rem',
                      paddingX: 1,
                      paddingY: 0.5,
                      textAlign: 'end',
                    }}
                  >
                    {hour}h
                  </Typography>
                )}

                {(row > 0 && column > 0) && dayEvents.map((event) => {
                  const eventMinutes = parseInt(event.startTime.split(':')[1], 10) || 0;
                  const top = (eventMinutes / 60) * HOUR_HEIGHT;
                  const duration = (new Date(`${event.date}T${event.endTime}`).getTime() - new Date(`${event.date}T${event.startTime}`).getTime()) / 60_000;
                  const height = duration / 60 * HOUR_HEIGHT - 4;

                  return (
                    <Tooltip
                      key={event.id}
                      title={'service' in event
                        ? `${event.user.firstName} ${event.user.lastName} — ${event.service.name} (${event.startTime} - ${event.endTime})`
                        : `${event.staff.firstName} ${event.staff.lastName} — ${event.type === 'blocked' ? 'Blocage' : 'Absence'} (${event.startTime} - ${event.endTime})`}
                      placement="top"
                    >
                      <Box
                        sx={{
                          position: 'absolute',
                          top: top,
                          left: 0,
                          right: 0,
                          height: Math.max(height, 26),
                          background: alpha(event.staff.color, 0.2),
                          borderLeft: `3px solid ${event.staff.color}`,
                          borderRadius: '2px',
                          cursor: 'pointer',
                          margin: 0.2,
                          padding: 0.6,
                          transition: 'background 0.2s ease',
                          zIndex: 10,
                          '&:hover': {
                            background: alpha(event.staff.color, 0.2),
                          },
                        }}
                      >
                        <Typography
                          sx={{
                            color: event.staff.color,
                            fontSize: '0.65rem',
                            fontWeight: 600,
                            lineHeight: 1.1,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {'service' in event
                            ? event.service.name
                            : event.label}
                        </Typography>

                        {height > 35 && (
                          <Typography
                            sx={{
                              fontSize: '0.58rem',
                              color: COLORS.text.secondary,
                              mt: 0.2,
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {'service' in event
                              ? `${event.startTime} - ${event.user.firstName} ${event.user.lastName}`
                              : `${event.startTime} - ${event.staff.firstName} ${event.staff.lastName}`}
                          </Typography>
                        )}
                      </Box>
                    </Tooltip>
                  );
                })}
              </Grid>
            );
          })
        )}
      </Grid>

      <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap', marginTop: 2 }}>
        {STAFF.map((member) => (
          <Stack
            key={member.id}
            direction="row"
            spacing={0.8}
            sx={{
              alignItems: 'center',
            }}
          >
            <Box sx={{ width: 10, height: 10, background: member.color, borderRadius: '50%' }} />

            <Typography variant="caption" sx={{ color: COLORS.text.secondary, fontSize: '0.7rem' }}>
              {member.firstName} {member.lastName[0]}.
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Box>
  );
}
import { APPOINTMENTS } from '@/data/appointments.data';
import { SERVICES } from '@/data/services.data';
import { STAFF } from '@/data/staff.data';
import { USERS } from '@/data/users.data';
import { COLORS } from '@/themes/colors';
import { Appointment } from '@/types/appointment.type';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import EuroIcon from '@mui/icons-material/Euro';
import PeopleIcon from '@mui/icons-material/People';
import PercentIcon from '@mui/icons-material/Percent';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { alpha, Avatar, Box, Card, Chip, Divider, Grid, LinearProgress, Stack, Typography } from '@mui/material';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tableau de bord | Séréna Administration',
  description: 'Dashboard administrateur Séréna Studio. Chiffre d\'affaires, réservations du jour, taux d\'occupation et performances.',
};

const STATUS_CONFIG: Record<Appointment['status'], { label: string; bg: string; text: string; }> = {
  confirmed: { label: 'Confirmé', bg: alpha(COLORS.success.main, 0.1), text: COLORS.success.main },
  pending: { label: 'En attente', bg: alpha(COLORS.secondary.main, 0.1), text: COLORS.secondary.main },
  completed: { label: 'Terminé', bg: alpha(COLORS.text.secondary, 0.1), text: COLORS.text.secondary },
  cancelled: { label: 'Annulé', bg: alpha(COLORS.error.main, 0.1), text: COLORS.error.main },
  no_show: { label: 'Absent', bg: alpha(COLORS.error.main, 0.08), text: COLORS.error.main },
};

export default function AdminDashboardPage() {
  const kpiCards = [
    (() => {
      const now = new Date();
      const prevMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

      const currentMonthRevenue = APPOINTMENTS
        .filter((appointment) => appointment.date.startsWith(now.toLocaleDateString('fr-CA').slice(0, 7)) && (appointment.status === 'confirmed' || appointment.status === 'completed'))
        .reduce((sum, appointment) => sum + appointment.totalAmount, 0);

      const prevMonthRevenue = APPOINTMENTS
        .filter((appointment) => appointment.date.startsWith(prevMonth.toLocaleDateString('fr-CA').slice(0, 7)) && (appointment.status === 'confirmed' || appointment.status === 'completed'))
        .reduce((sum, appointment) => sum + appointment.totalAmount, 0);

      const revenueDiffPct = prevMonthRevenue > 0
        ? Math.round(((currentMonthRevenue - prevMonthRevenue) / prevMonthRevenue) * 100)
        : 0;

      return {
        label: 'CA du mois',
        value: `${currentMonthRevenue.toLocaleString('fr-FR')} €`,
        trend: `${revenueDiffPct >= 0 ? '+' : ''}${revenueDiffPct}%`,
        positive: revenueDiffPct >= 0,
        icon: <EuroIcon sx={{ fontSize: 20 }} />,
        sub: 'vs mois précédent',
      };
    })(),
    (() => {
      const now = new Date();
      const yesterday = new Date();
      yesterday.setDate(now.getDate() - 1);

      const todayCount = APPOINTMENTS
        .filter((appointment) => appointment.date === now.toLocaleDateString('fr-CA') && (appointment.status === 'confirmed' || appointment.status === 'completed'))
        .length;
      const yesterdayCount = APPOINTMENTS
        .filter((appointment) => appointment.date === yesterday.toLocaleDateString('fr-CA') && (appointment.status === 'confirmed' || appointment.status === 'completed'))
        .length;
      const todayDiff = todayCount - yesterdayCount;

      return {
        label: 'Réservations aujourd\'hui',
        value: todayCount.toString(),
        trend: `${todayDiff >= 0 ? '+' : ''}${todayDiff}`,
        positive: todayDiff >= 0,
        icon: <CalendarTodayIcon sx={{ fontSize: 20 }} />,
        sub: 'vs hier',
      };
    })(),
    (() => {
      const TOTAL_WEEKLY_CAPACITY = STAFF.length /* membres */ * 8 /* créneaux/jour */ * 7 /* jours */;
      const now = new Date();

      const weekStart = new Date(now);
      weekStart.setDate(now.getDate() - 6);
      const weekStartStr = weekStart.toLocaleDateString('fr-CA');

      const prevWeekStart = new Date(now);
      prevWeekStart.setDate(now.getDate() - 13);
      const prevWeekStartStr = prevWeekStart.toLocaleDateString('fr-CA');

      const prevWeekEnd = new Date(now);
      prevWeekEnd.setDate(now.getDate() - 7);
      const prevWeekEndStr = prevWeekEnd.toLocaleDateString('fr-CA');

      const currentWeekCount = APPOINTMENTS
        .filter((appointment) => appointment.date >= weekStartStr && appointment.date <= now.toLocaleDateString('fr-CA') && (appointment.status === 'confirmed' || appointment.status === 'completed'))
        .length;

      const occupancyRate = Math.min(Math.round((currentWeekCount / TOTAL_WEEKLY_CAPACITY) * 100), 100);

      const prevWeekCount = APPOINTMENTS
        .filter((appointment) => appointment.date >= prevWeekStartStr && appointment.date <= prevWeekEndStr && (appointment.status === 'confirmed' || appointment.status === 'completed'))
        .length;

      const prevOccupancyRate = Math.min(Math.round((prevWeekCount / TOTAL_WEEKLY_CAPACITY) * 100), 100);

      const occupancyDiff = occupancyRate - prevOccupancyRate;

      return {
        label: 'Taux d\'occupation',
        value: `${occupancyRate}%`,
        trend: `${occupancyDiff >= 0 ? '+' : ''}${occupancyDiff}%`,
        positive: occupancyDiff >= 0,
        icon: <PercentIcon sx={{ fontSize: 20 }} />,
        sub: 'cette semaine',
      };
    })(),
    (() => {
      const now = new Date();
      const prevMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

      const newClientsThisMonthCount = USERS
        .filter((user) => user.role === 'customer' && user.createdAt.startsWith(now.toLocaleDateString('fr-CA').slice(0, 7)))
        .length;

      const newClientsPrevMonthCount = USERS
        .filter((user) => user.role === 'customer' && user.createdAt.startsWith(prevMonth.toLocaleDateString('fr-CA').slice(0, 7)))
        .length;

      const newClientsDiffPct = newClientsPrevMonthCount > 0
        ? Math.round(((newClientsThisMonthCount - newClientsPrevMonthCount) / newClientsPrevMonthCount) * 100)
        : 0;

      return {
        label: 'Nouveaux clients',
        value: newClientsThisMonthCount.toString(),
        trend: `${newClientsDiffPct >= 0 ? '+' : ''}${newClientsDiffPct}%`,
        positive: newClientsDiffPct >= 0,
        icon: <PeopleIcon sx={{ fontSize: 20 }} />,
        sub: 'ce mois',
      };
    })(),
  ];
  const revenueBars = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));

    return {
      day: date.getDay(),
      value: APPOINTMENTS
        .filter((appointment) => appointment.date === date.toLocaleDateString('fr-CA') && (appointment.status === 'confirmed' || appointment.status === 'completed'))
        .reduce((acc, appointment) => acc + appointment.totalAmount, 0),
    };
  });
  const topServices = SERVICES
    .map((service) => ({
      service: service,
      count: APPOINTMENTS.filter((appt) => appt.service === service.id).length,
    }))
    .map(({ service, count }, _, arr) => ({
      service,
      count,
      revenue: service.price * count,
      percentage: (count / arr.reduce((acc, it) => acc + it.count, 0)) * 100,
    }))
    .sort((a, b) => b.count - a.count);
  const todayAppointments = APPOINTMENTS
    .filter((appointment) => appointment.date === new Date().toLocaleDateString('fr-CA'))
    .map((appointment) => ({
      ...appointment,
      service: SERVICES.find((service) => service.id === appointment.service)!,
      staff: STAFF.find((member) => member.id === appointment.staff)!,
      user: USERS.find((user) => user.id === appointment.user)!,
    }))
    .sort((a, b) => new Date(`${a.date}T${a.startTime}`).getTime() - new Date(`${b.date}T${b.startTime}`).getTime());

  return (
    <main>
      <Typography variant="overline" sx={{ marginBottom: 1 }}>
        Administration
      </Typography>

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
          Tableau de bord
        </Typography>

        <Typography variant="body2" sx={{ color: COLORS.text.secondary }}>
          {new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
        </Typography>
      </Stack>

      <Grid container spacing={3}>
        {kpiCards.map((kpi) => (
          <Grid
            key={kpi.label}
            size={{ xs: 12, sm: 6, xl: 3 }}
            component={Card}
            sx={{
              height: 'auto',
              padding: 3,
            }}
          >
            <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', marginBottom: 2.5 }}>
              <Avatar sx={{ width: 40, height: 40 }}>
                {kpi.icon}
              </Avatar>

              <Stack
                direction="row"
                spacing={1}
                sx={{
                  alignItems: 'center',
                  color: kpi.positive ? 'success.main' : COLORS.error.main,
                  fontSize: 16,
                }}
              >
                {kpi.positive
                  ? <TrendingUpIcon />
                  : <TrendingDownIcon />}

                <Typography variant="subtitle2">
                  {kpi.trend}
                </Typography>
              </Stack>
            </Stack>

            <Typography variant="h3">
              {kpi.value}
            </Typography>

            <Typography variant="subtitle2" sx={{ color: COLORS.text.secondary, marginTop: 0.5 }}>
              {kpi.label}
            </Typography>

            <Typography variant="caption" sx={{ color: COLORS.text.secondary, marginTop: 0.3 }}>
              {kpi.sub}
            </Typography>
          </Grid>
        ))}

        <Grid
          size={{ xs: 12, lg: 7 }}
          component={Card}
          sx={{
            height: 'auto',
            display: 'flex',
            flexDirection: 'column',
            padding: 3.5,
          }}
        >
          <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
            <Typography variant="h5">
              Chiffre d'affaires — Semaine
            </Typography>

            <Typography variant="caption" sx={{ color: COLORS.text.secondary }}>
              Total : 5 640 €
            </Typography>
          </Stack>

          <Stack
            direction="row"
            spacing={2}
            sx={{
              flex: 1,
              minHeight: 160,
            }}
          >
            {revenueBars.map((bar) => (
              <Box
                key={bar.day}
                sx={{
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  flex: 1,
                  flexDirection: 'column',
                  gap: 1,
                  justifyContent: 'flex-end',
                }}
              >
                <Typography variant="caption" sx={{ color: COLORS.text.secondary, fontSize: '0.65rem', mb: 0.5 }}>
                  {bar.value > 0 ? `${bar.value}€` : '—'}
                </Typography>

                <Box
                  sx={{
                    width: '100%',
                    height: `${(bar.value / 1500) * 100}%`,
                    background: bar.day === new Date().getDay() ? COLORS.secondary.main : bar.value > 0 ? alpha(COLORS.secondary.main, 0.35) : alpha(COLORS.text.secondary, 0.1),
                    minHeight: 4,
                    transition: 'height 0.5s ease',
                  }}
                />

                <Typography variant="caption" sx={{ color: COLORS.text.secondary }}>
                  {new Date(2026, 4, 10 + bar.day).toLocaleDateString('fr-FR', { weekday: 'short' })}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Grid>

        <Grid
          size={{ xs: 12, lg: 5 }}
          component={Card}
          sx={{
            height: 'auto',
            padding: 3.5,
          }}
        >
          <Typography variant="h5" sx={{ marginBottom: 3.5 }}>
            Top Prestations
          </Typography>

          <Stack direction="column" spacing={3}>
            {topServices.slice(0, 4).map(({ service, count, revenue, percentage }, index) => (
              <Box key={service.id}>
                <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center', marginBottom: 1 }}>
                  <Typography variant="caption" sx={{ color: COLORS.secondary.main }}>
                    {index + 1}
                  </Typography>

                  <Typography variant="body2" sx={{ flex: 1, fontWeight: 500 }}>
                    {service.name}
                  </Typography>

                  <Box sx={{ textAlign: 'right' }}>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {revenue} €
                    </Typography>

                    <Typography variant="caption" sx={{ color: COLORS.text.secondary }}>
                      {count} séances
                    </Typography>
                  </Box>
                </Stack>

                <LinearProgress variant="determinate" value={percentage} />
              </Box>
            ))}
          </Stack>
        </Grid>

        <Grid
          size={12}
          component={Card}
          sx={{
            height: 'auto',
            padding: 3.5,
          }}
        >
          <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
            <Typography variant="h5">
              Rendez-vous du jour
            </Typography>

            <Chip
              label={`${todayAppointments.length} séances`}
              size="medium"
            />
          </Stack>

          <Stack
            direction="column"
            divider={<Divider />}
          >
            {todayAppointments.map((appointment) => {
              return (
                <Stack
                  key={appointment.id}
                  direction="row"
                  spacing={3}
                  sx={{
                    alignItems: 'center',
                    paddingX: 1,
                    paddingY: 2,
                    transition: 'background 0.2s ease',
                    '&:hover': {
                      background: alpha(COLORS.primary.contrastText, 0.8),
                    },
                  }}
                >
                  <Typography variant="h6" sx={{ color: COLORS.secondary.main }}>
                    {appointment.startTime}
                  </Typography>

                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {appointment.user.firstName} {appointment.user.lastName}
                    </Typography>

                    <Typography variant="caption" sx={{ color: COLORS.text.secondary }}>
                      {appointment.service.name} · {appointment.service.duration} min
                    </Typography>
                  </Box>

                  <Typography variant="body2" sx={{ display: { xs: 'none', sm: 'block' }, color: COLORS.text.secondary }}>
                    {appointment.staff.firstName} {appointment.staff.lastName[0]}.
                  </Typography>

                  <Chip
                    label={STATUS_CONFIG[appointment.status].label}
                    size="small"
                    sx={{
                      background: STATUS_CONFIG[appointment.status].bg,
                      color: STATUS_CONFIG[appointment.status].text,
                    }}
                  />
                </Stack>
              );
            })}
          </Stack>
        </Grid>
      </Grid>
    </main>
  );
}
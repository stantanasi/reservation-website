'use client';

import { USERS } from '@/data/users.data';
import { COLORS } from '@/themes/colors';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import { alpha, Avatar, Box, Card, CardContent, Divider, Stack, Typography } from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();

  const user = USERS[0];

  return (
    <Stack
      direction="column"
      spacing={2}
      sx={{
        position: 'sticky',
        top: 100,
      }}
    >
      <Card>
        <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar
            alt={`${user.firstName} ${user.lastName}`}
            sx={{ width: 48, height: 48 }}
          >
            {user.firstName[0]}
          </Avatar>

          <Box>
            <Typography sx={{ fontWeight: 500, fontSize: '0.9rem' }}>
              {user.firstName} {user.lastName}
            </Typography>

            <Typography variant="caption" sx={{color: COLORS.text.secondary}}>
              {user.email}
            </Typography>
          </Box>
        </CardContent>
      </Card>

      <Card>
        <Stack
          direction="column"
          divider={<Divider />}
        >
          {[
            { label: 'Vue d\'ensemble', href: '/compte', icon: <DashboardIcon /> },
            { label: 'Mes Rendez-vous', href: '/compte/rendez-vous', icon: <CalendarMonthIcon /> },
            { label: 'Mon Profil', href: '/compte/profil', icon: <PersonIcon /> },
            { label: 'Déconnexion', href: '/login', icon: <LogoutIcon /> },
          ].map(({ label, href, icon }) => {
            const isActive = pathname === href;
            return (
              <Link key={href} href={href}>
                <Stack
                  direction="row"
                  spacing={2}
                  sx={{
                    alignItems: 'center',
                    background: isActive ? alpha(COLORS.secondary.main, 0.06) : 'transparent',
                    borderLeft: isActive ? `2px solid ${COLORS.secondary.main}` : '2px solid transparent',
                    px: 2.5,
                    py: 1.5,
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      background: alpha(COLORS.secondary.main, 0.04),
                      borderLeftColor: COLORS.secondary.main,
                    },
                  }}
                >
                  <Typography sx={{ display: 'inline-flex', color: isActive ? COLORS.secondary.main : COLORS.text.secondary }}>
                    {icon}
                  </Typography>

                  <Typography
                    sx={{
                      color: isActive ? COLORS.primary.main : COLORS.text.secondary,
                      fontSize: '0.82rem',
                      fontWeight: isActive ? 500 : 400,
                    }}
                  >
                    {label}
                  </Typography>
                </Stack>
              </Link>
            );
          })}
        </Stack>
      </Card>
    </Stack>
  );
}
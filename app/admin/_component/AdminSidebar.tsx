'use client';

import Logo from '@/components/Logo';
import { COLORS } from '@/themes/colors';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import HomeIcon from '@mui/icons-material/Home';
import ListAltIcon from '@mui/icons-material/ListAlt';
import MenuIcon from '@mui/icons-material/Menu';
import PeopleIcon from '@mui/icons-material/People';
import SpaIcon from '@mui/icons-material/Spa';
import { alpha, AppBar, Avatar, Box, Divider, Drawer, IconButton, Stack, Toolbar, Typography } from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const SIDEBAR_WIDTH = 240;

const NAV_ITEMS = [
  { label: 'Tableau de bord', href: '/admin', icon: <DashboardIcon /> },
  { label: 'Agenda', href: '/admin/calendrier', icon: <CalendarMonthIcon /> },
  { label: 'Réservations', href: '/admin/reservations', icon: <ListAltIcon /> },
  { label: 'Prestations', href: '/admin/services', icon: <SpaIcon /> },
  { label: 'Équipe', href: '/admin/equipe', icon: <GroupIcon /> },
  { label: 'Clients', href: '/admin/clients', icon: <PeopleIcon /> },
];

function AdminSidebarContent() {
  const pathname = usePathname();

  return (
    <Stack
      direction="column"
      spacing={1.5}
      sx={{
        height: '100%',
        background: COLORS.primary.main,
        paddingX: 1.5,
        paddingY: 3,
      }}
    >
      <Logo
        variant="admin"
        size="small"
        sx={{
          alignSelf: 'center',
          marginBottom: 2,
        }}
      />

      {NAV_ITEMS.map(({ label, href, icon }) => {
        const isActive = pathname === href;
        return (
          <Link key={href} href={href}>
            <Stack
              direction="row"
              spacing={1}
              sx={{
                alignItems: 'center',
                background: isActive ? alpha(COLORS.secondary.main, 0.12) : 'transparent',
                color: isActive ? COLORS.secondary.main : alpha(COLORS.primary.contrastText, 0.4),
                paddingX: 1.5,
                paddingY: 1.2,
                '&:hover': {
                  background: alpha(COLORS.primary.contrastText, 0.05),
                },
              }}
            >
              {icon}

              <Typography
                sx={{
                  color: isActive ? COLORS.primary.contrastText : alpha(COLORS.primary.contrastText, 0.5),
                  flex: 1,
                  fontSize: '0.8rem',
                  fontWeight: isActive ? 500 : 400,
                }}
              >
                {label}
              </Typography>

              {isActive && (
                <Divider orientation="vertical" flexItem sx={{ borderColor: COLORS.secondary.main, borderWidth: 1 }} />
              )}
            </Stack>
          </Link>
        );
      })}

      <Divider sx={{ marginTop: 'auto' }} />

      <Link href="/">
        <Stack
          direction="row"
          spacing={1}
          sx={{
            alignItems: 'center',
            background: 'transparent',
            paddingX: 1.5,
            paddingY: 1.2,
            '&:hover': {
              background: alpha(COLORS.primary.contrastText, 0.05),
            },
          }}
        >
          <HomeIcon sx={{ color: alpha(COLORS.primary.contrastText, 0.4) }} />

          <Typography
            sx={{
              color: alpha(COLORS.primary.contrastText, 0.5),
              fontSize: '0.8rem',
              fontWeight: 400,
            }}
          >
            Voir le site
          </Typography>
        </Stack>
      </Link>

      <Stack
        direction="row"
        spacing={1.5}
        sx={{
          alignItems: 'center',
          paddingX: 1.5,
        }}
      >
        <Avatar
          alt="Isabelle Moreau"
          sx={{ width: 32, height: 32 }}
        >
          I
        </Avatar>

        <Box>
          <Typography sx={{ fontSize: '0.78rem', color: alpha(COLORS.primary.contrastText, 0.7), fontWeight: 500 }}>
            Isabelle M.
          </Typography>

          <Typography sx={{ fontSize: '0.62rem', color: alpha(COLORS.primary.contrastText, 0.3) }}>
            Administratrice
          </Typography>
        </Box>
      </Stack>
    </Stack>
  );
}

export default function AdminSidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (<>
    <AppBar
      position="sticky"
      sx={{
        display: { md: 'none' },
        background: COLORS.primary.main,
        borderBottom: `1px solid ${alpha(COLORS.primary.contrastText, 0.06)}`,
      }}
    >
      <Toolbar>
        <IconButton
          edge="start"
          onClick={() => setMobileOpen(true)}
          sx={{
            color: COLORS.primary.contrastText,
          }}
        >
          <MenuIcon />
        </IconButton>

        <Typography variant="h6">
          SÉRÉNA Admin
        </Typography>
      </Toolbar>
    </AppBar>

    <Drawer
      variant="permanent"
      sx={{
        display: { xs: 'none', md: 'block' },
        width: SIDEBAR_WIDTH,
        '& .MuiDrawer-paper': {
          width: SIDEBAR_WIDTH,
        },
      }}
    >
      <AdminSidebarContent />
    </Drawer>

    <Drawer
      variant="temporary"
      open={mobileOpen}
      onClose={() => setMobileOpen(false)}
      sx={{
        display: { xs: 'block', md: 'none' },
        width: SIDEBAR_WIDTH,
        '& .MuiDrawer-paper': {
          width: SIDEBAR_WIDTH,
        },
      }}
    >
      <AdminSidebarContent />
    </Drawer>
  </>
  );
}
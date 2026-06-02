'use client';

import Logo from '@/components/Logo';
import { COLORS } from '@/themes/colors';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import { alpha, AppBar, Box, Button, Collapse, Container, Divider, IconButton, Stack, Toolbar, Typography } from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const NAV_LINKS = [
  { label: 'Prestations', href: '/services' },
  { label: 'Notre Équipe', href: '/equipe' },
  { label: 'À Propos', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const transparent = pathname === '/' && !scrolled && !menuOpen;

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    onScroll();

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        backdropFilter: 'blur(20px)',
        background: transparent ? 'transparent' : alpha(COLORS.primary.contrastText, 0.95),
        borderBottom: transparent ? '1px solid transparent' : `1px solid ${alpha(COLORS.text.secondary, 0.15)}`,
        transition: 'all 0.4s ease',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Link href="/">
            <Logo
              size="small"
              mode={transparent ? 'light' : 'dark'}
            />
          </Link>

          <Stack
            direction="row"
            spacing={0.5}
            sx={{
              display: { xs: 'none', md: 'flex' },
              alignItems: 'center',
            }}
          >
            {NAV_LINKS.map(({ label, href }) => (
              <Link key={label} href={href}>
                <Box
                  sx={{
                    color: transparent ? COLORS.primary.contrastText : COLORS.text.secondary,
                    paddingX: 2,
                    paddingY: 1,
                    transition: 'color 0.2s ease',
                    '&:hover': {
                      color: transparent ? '#fff' : COLORS.primary.main,
                      '&:hover .nav-line': {
                        transform: 'scaleX(1)',
                      },
                    },
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: '0.7rem',
                      fontWeight: 400,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {label}
                  </Typography>

                  <Divider
                    className="nav-line"
                    sx={{
                      borderColor: COLORS.secondary.main,
                      transform: 'scaleX(0)',
                      transition: 'transform 0.3s ease',
                    }}
                  />
                </Box>
              </Link>
            ))}
          </Stack>

          <Stack
            direction="row"
            spacing={1.5}
            sx={{
              display: { xs: 'none', md: 'flex' },
              alignItems: 'center',
            }}
          >
            <Link href="/compte">
              <IconButton
                sx={{
                  color: transparent ? COLORS.primary.contrastText : COLORS.text.secondary,
                  transition: 'color 0.2s ease',
                  '&:hover': {
                    color: COLORS.secondary.main,
                  },
                }}
              >
                <PersonIcon />
              </IconButton>
            </Link>
            <Link href="/booking">
              <Button
                variant="contained"
                sx={{
                  background: COLORS.secondary.main,
                  color: COLORS.primary.main,
                  fontSize: '0.65rem',
                  padding: '10px 24px',
                  '&:hover': {
                    background: COLORS.secondary.dark,
                  },
                }}
              >
                Réserver
              </Button>
            </Link>
          </Stack>

          <IconButton
            onClick={() => setMenuOpen((prev) => !prev)}
            sx={{
              display: { md: 'none' },
              color: transparent ? COLORS.primary.contrastText : COLORS.primary.main,
            }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>

        <Collapse in={menuOpen} timeout="auto" unmountOnExit sx={{ display: { md: 'none' } }}>
          <Divider />

          <Stack
            spacing={1.5}
            sx={{
              paddingBottom: 2,
              paddingTop: 1,
            }}
          >
            {NAV_LINKS.map(({ label, href }) => (
              <Link key={label} href={href}>
                <Typography
                  sx={{
                    color: COLORS.text.secondary,
                    fontSize: '0.7rem',
                    fontWeight: 400,
                    letterSpacing: '0.12em',
                    paddingY: 1,
                    textTransform: 'uppercase',
                    '&:hover': {
                      color: COLORS.primary.main,
                    },
                  }}
                >
                  {label}
                </Typography>
              </Link>
            ))}

            <Link href="/booking">
              <Button
                variant="contained"
                fullWidth
                sx={{
                  background: COLORS.secondary.main,
                  color: COLORS.primary.main,
                }}
              >
                Réserver un soin
              </Button>
            </Link>

            <Link href="/compte">
              <Button
                variant="outlined"
                fullWidth
                sx={{
                  borderColor: COLORS.text.secondary,
                  color: COLORS.text.secondary,
                }}
              >
                Mon compte
              </Button>
            </Link>
          </Stack>
        </Collapse>
      </Container>
    </AppBar>
  );
}
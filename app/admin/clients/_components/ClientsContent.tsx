'use client';

import { APPOINTMENTS } from '@/data/appointments.data';
import { SERVICES } from '@/data/services.data';
import { STAFF } from '@/data/staff.data';
import { USERS } from '@/data/users.data';
import { COLORS } from '@/themes/colors';
import { User } from '@/types/user.type';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import { alpha, Avatar, Box, Card, Chip, Drawer, Grid, IconButton, InputAdornment, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography } from '@mui/material';
import { useState } from 'react';

export default function ClientsContent() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(12);
  const [selectedClient, setSelectedClient] = useState<User | null>(null);

  const clients = USERS.filter((client) => client.role === 'customer');
  const result = clients
    .filter((client) => {
      const q = query.toLowerCase();
      return `${client.firstName} ${client.lastName}`.toLowerCase().includes(q) || client.email[0].toLowerCase().includes(q);
    });
  const paginated = result.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

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
          Fichier Clients
        </Typography>

        <Typography variant="body2" sx={{ color: COLORS.text.secondary }}>
          {clients.length} clientes au total
        </Typography>
      </Stack>

      <Grid container spacing={2.5} sx={{ marginBottom: 4 }}>
        {[
          { label: 'Clientes actives', value: '183' },
          { label: 'Nouvelles ce mois', value: '23' },
          { label: 'Panier moyen', value: '147 €' },
          { label: 'Clientes VIP', value: '12' },
        ].map(({ label, value }) => (
          <Grid
            key={label}
            size={{ xs: 12, sm: 6, md: 3 }}
            component={Card}
            sx={{
              padding: 2.5,
              textAlign: 'center',
            }}
          >
            <Typography variant="h3" sx={{ color: COLORS.secondary.main, mb: 0.5 }}>
              {value}
            </Typography>

            <Typography variant="caption" sx={{ color: COLORS.text.secondary, textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: '0.58rem' }}>
              {label}
            </Typography>
          </Grid>
        ))}
      </Grid>

      <TextField
        placeholder="Rechercher par nom ou email…"
        value={query}
        onChange={(event) => {
          setQuery(event.target.value);
          setPage(0);
        }}
        size="small"
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
          },
        }}
        sx={{
          width: { xs: '100%', sm: 400 },
          marginBottom: 3,
        }}
      />

      <TableContainer component={Card}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Cliente</TableCell>
              <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>Email</TableCell>
              <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }} align="center">RDV</TableCell>
              <TableCell sx={{ display: { xs: 'none', lg: 'table-cell' } }} align="right">Total dépensé</TableCell>
              <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>Dernière visite</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {paginated.map((client) => (
              <TableRow
                key={client.id}
                hover
                sx={{
                  cursor: 'pointer',
                  transition: 'background 0.15s ease',
                  '&:hover': {
                    background: alpha(COLORS.primary.contrastText, 0.8),
                  },
                }}
                onClick={() => setSelectedClient(client)}
              >
                <TableCell sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Avatar
                    alt={`${client.firstName} ${client.lastName}`}
                    sx={{ width: 36, height: 36 }}
                  >
                    {client.firstName[0]}
                  </Avatar>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography sx={{ fontWeight: 500, fontSize: '0.88rem' }}>
                      {client.firstName} {client.lastName}
                    </Typography>

                    {client.vip && (
                      <Chip label="VIP" size="small" />
                    )}
                  </Box>
                </TableCell>

                <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                  <Typography variant="body2" sx={{ color: COLORS.text.secondary }}>
                    {client.email}
                  </Typography>
                </TableCell>

                <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }} align="center">
                  <Typography variant="body2">
                    {APPOINTMENTS.filter((appointment) => appointment.user === client.id).length}
                  </Typography>
                </TableCell>

                <TableCell sx={{ display: { xs: 'none', lg: 'table-cell' } }} align="right">
                  <Typography variant="h6">
                    {APPOINTMENTS
                      .filter((appointment) => appointment.user === client.id)
                      .map((appointment) => appointment.totalAmount)
                      .reduce((acc, cur) => acc + cur, 0)} €
                  </Typography>
                </TableCell>

                <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>
                  <Typography variant="body2" sx={{ color: COLORS.text.secondary, fontSize: '0.82rem' }}>
                    {client.lastVisitDate
                      ? new Date(client.lastVisitDate).toLocaleDateString('fr-FR', {
                        day: 'numeric', month: 'short', year: 'numeric',
                      })
                      : '-'}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={result.length}
        page={page}
        onPageChange={(_, p) => setPage(p)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={() => { }}
        rowsPerPageOptions={[12]}
        labelDisplayedRows={({ from, to, count }) => `${from}–${to} sur ${count}`}
      />

      <Drawer
        anchor="right"
        open={!!selectedClient}
        onClose={() => setSelectedClient(null)}
        sx={{
          '& .MuiDrawer-paper': {
            width: { xs: '100vw', sm: 400 },
            display: 'flex',
            flexDirection: 'column',
            gap: 1.5,
            paddingX: 2,
            paddingY: 3,
          },
        }}
      >
        {selectedClient && (
          <Box>
            <Stack direction="row" spacing={2} sx={{ alignItems: 'center', mb: 4 }}>
              <Avatar
                alt={`${selectedClient.firstName} ${selectedClient.lastName}`}
                sx={{ width: 52, height: 52 }}
              >
                {selectedClient.firstName[0]}
              </Avatar>

              <Box sx={{ flex: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography sx={{ fontWeight: 600, fontSize: '1rem' }}>
                    {selectedClient.firstName} {selectedClient.lastName}
                  </Typography>
                  {selectedClient.vip && (
                    <Chip label="VIP" size="small" />
                  )}
                </Box>

                <Typography variant="caption" sx={{ color: COLORS.text.secondary }}>
                  Cliente depuis {new Date(selectedClient.createdAt).getFullYear()}
                </Typography>
              </Box>

              <IconButton size="small" onClick={() => setSelectedClient(null)} sx={{ color: COLORS.text.secondary }}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </Stack>

            <Card sx={{ padding: 2.5, mb: 3 }}>
              <Typography sx={{ fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: COLORS.text.secondary, mb: 2 }}>
                Coordonnées
              </Typography>

              {[
                { label: 'Email', value: selectedClient.email },
                { label: 'Téléphone', value: selectedClient.phone },
              ].map(({ label, value }) => (
                <Box key={label} sx={{ mb: 1.5 }}>
                  <Typography variant="caption" sx={{ color: COLORS.text.secondary, textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: '0.58rem' }}>
                    {label}
                  </Typography>

                  <Typography variant="body2" sx={{ fontWeight: 500, fontSize: '0.85rem' }}>
                    {value}
                  </Typography>
                </Box>
              ))}
            </Card>

            <Grid container spacing={2} sx={{ mb: 3 }}>
              {[
                {
                  label: 'Séances',
                  value: APPOINTMENTS.filter((appointment) => appointment.user === selectedClient.id).length,
                },
                {
                  label: 'Total dépensé',
                  value: APPOINTMENTS
                    .filter((appointment) => appointment.user === selectedClient.id)
                    .map((appointment) => appointment.totalAmount)
                    .reduce((acc, cur) => acc + cur, 0) + ' €',
                },
              ].map(({ label, value }) => (
                <Grid
                  key={label}
                  size={6}
                  component={Card}
                  sx={{ padding: 2.5, textAlign: 'center' }}
                >
                  <Typography variant="h4" sx={{ color: COLORS.secondary.main, mb: 0.5 }}>
                    {value}
                  </Typography>

                  <Typography variant="caption" sx={{ color: COLORS.text.secondary, fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    {label}
                  </Typography>
                </Grid>
              ))}
            </Grid>

            <Typography sx={{ fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: COLORS.text.secondary, mb: 2 }}>
              Historique des soins
            </Typography>

            <Stack direction="column" spacing={1.5}>
              {APPOINTMENTS
                .map((appointment) => ({
                  ...appointment,
                  service: SERVICES.find((service) => service.id === appointment.service)!,
                  staff: STAFF.find((member) => member.id === appointment.staff)!,
                  user: USERS.find((user) => user.id === appointment.user)!,
                }))
                .filter((appointment) => appointment.user.id === selectedClient.id)
                .map((appointment) => (
                  <Card
                    key={appointment.id}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: 2.5,
                    }}
                  >
                    <Box>
                      <Typography variant="body2" sx={{ fontSize: '0.85rem', fontWeight: 500 }}>
                        {appointment.service.name}
                      </Typography>

                      <Typography variant="caption" sx={{ color: COLORS.text.secondary }}>
                        {new Date(appointment.date.replace(/-/g, '/')).toLocaleDateString('fr-FR', {
                          day: 'numeric', month: 'long', year: 'numeric',
                        })} · {appointment.staff.firstName} {appointment.staff.lastName}
                      </Typography>
                    </Box>

                    <Typography variant="h6">
                      {appointment.totalAmount} €
                    </Typography>
                  </Card>
                ))}
            </Stack>
          </Box>
        )}
      </Drawer>
    </Box>
  );
}
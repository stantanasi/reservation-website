'use client';

import { APPOINTMENTS } from '@/data/appointments.data';
import { SERVICES } from '@/data/services.data';
import { STAFF } from '@/data/staff.data';
import { USERS } from '@/data/users.data';
import { COLORS } from '@/themes/colors';
import { Appointment } from '@/types/appointment.type';
import DownloadIcon from '@mui/icons-material/Download';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import { alpha, Box, Button, Card, Chip, FormControl, IconButton, InputAdornment, InputLabel, Menu, MenuItem, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography } from '@mui/material';
import { useState } from 'react';

const STATUS_CONFIG: Record<Appointment['status'], { label: string; bg: string; text: string; }> = {
  confirmed: { label: 'Confirmé', bg: alpha(COLORS.success.main, 0.1), text: COLORS.success.main },
  pending: { label: 'En attente', bg: alpha(COLORS.secondary.main, 0.1), text: COLORS.secondary.main },
  completed: { label: 'Terminé', bg: alpha(COLORS.text.secondary, 0.1), text: COLORS.text.secondary },
  cancelled: { label: 'Annulé', bg: alpha(COLORS.error.main, 0.1), text: COLORS.error.main },
  no_show: { label: 'Absent', bg: alpha(COLORS.error.main, 0.08), text: COLORS.error.main },
};

export default function ReservationsContent() {
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<Appointment['status'] | 'all'>('all');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRow, setSelectedRow] = useState<string | null>(null);

  const appointments = APPOINTMENTS
    .map((appointment) => ({
      ...appointment,
      service: SERVICES.find((service) => service.id === appointment.service)!,
      staff: STAFF.find((member) => member.id === appointment.staff)!,
      user: USERS.find((user) => user.id === appointment.user)!,
    }));

  const filtered = appointments
    .filter((appointment) => statusFilter === 'all' || appointment.status === statusFilter)
    .filter((appointment) => {
      if (query === '') {
        return true;
      } else if (`${appointment.user.firstName} ${appointment.user.lastName}`.toLowerCase().includes(query.toLowerCase())) {
        return true;
      } else if (appointment.service.name.toLowerCase().includes(query.toLowerCase())) {
        return true;
      } else if (appointment.id.toLowerCase().includes(query.toLowerCase())) {
        return true;
      } else if (appointment.reference.toLowerCase().includes(query.toLowerCase())) {
        return true;
      }
      return false;
    });
  const paginated = filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

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
          Réservations
        </Typography>

        <Button variant="outlined" startIcon={<DownloadIcon />}>
          Exporter CSV
        </Button>
      </Stack>

      <Stack direction="row" spacing={2} sx={{ alignItems: 'center', flexWrap: 'wrap', marginBottom: 3 }}>
        <TextField
          placeholder="Rechercher un client, service, N° réservation…"
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
            flex: 1,
          }}
        />

        <FormControl size="small" sx={{ minWidth: 160 }}>
          <InputLabel>Statut</InputLabel>
          <Select
            value={statusFilter}
            label="Statut"
            onChange={(event) => {
              setStatusFilter(event.target.value as Appointment['status'] | 'all');
              setPage(0);
            }}
          >
            <MenuItem value="all">Tous les statuts</MenuItem>
            <MenuItem value="confirmed">Confirmé</MenuItem>
            <MenuItem value="pending">En attente</MenuItem>
            <MenuItem value="completed">Terminé</MenuItem>
            <MenuItem value="cancelled">Annulé</MenuItem>
          </Select>
        </FormControl>

        <Typography variant="caption" sx={{ color: COLORS.text.secondary }}>
          {filtered.length} {filtered.length > 1 ? 'résultats' : 'résultat'}
        </Typography>
      </Stack>

      <TableContainer component={Card}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>N° Réservation</TableCell>
              <TableCell>Client</TableCell>
              <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>Prestation</TableCell>
              <TableCell sx={{ display: { xs: 'none', lg: 'table-cell' } }}>Praticien</TableCell>
              <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>Date</TableCell>
              <TableCell>Statut</TableCell>
              <TableCell align="right">Montant</TableCell>
              <TableCell width={40} />
            </TableRow>
          </TableHead>

          <TableBody>
            {paginated.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} sx={{ color: COLORS.text.secondary, paddingY: 6, textAlign: 'center' }}>
                  Aucune réservation trouvée
                </TableCell>
              </TableRow>
            ) : paginated.map((appointment) => {
              const s = STATUS_CONFIG[appointment.status];

              return (
                <TableRow
                  key={appointment.id}
                  sx={{
                    transition: 'background 0.15s ease',
                    '&:hover': {
                      background: alpha(COLORS.primary.contrastText, 0.8),
                    },
                  }}
                >
                  <TableCell>
                    <Typography sx={{ fontFamily: 'monospace', fontSize: '0.78rem', color: COLORS.secondary.main }}>
                      {appointment.reference}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Typography sx={{ fontWeight: 500, fontSize: '0.85rem' }}>
                      {appointment.user.firstName} {appointment.user.lastName}
                    </Typography>
                    <Typography variant="caption" sx={{ color: COLORS.text.secondary }}>
                      {appointment.user.email}
                    </Typography>
                  </TableCell>

                  <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                    <Typography variant="body2">
                      {appointment.service.name}
                    </Typography>
                  </TableCell>

                  <TableCell sx={{ display: { xs: 'none', lg: 'table-cell' } }}>
                    <Typography variant="body2" sx={{ color: COLORS.text.secondary }}>
                      {appointment.staff.firstName} {appointment.staff.lastName}
                    </Typography>
                  </TableCell>

                  <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>
                    <Typography variant="body2">
                      {new Date(appointment.date.replace(/-/g, '/')).toLocaleDateString('fr-FR', {
                        day: 'numeric', month: 'short',
                      })}
                    </Typography>
                    <Typography variant="caption" sx={{ color: COLORS.text.secondary }}>
                      {appointment.startTime}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Chip
                      label={s.label}
                      sx={{ background: s.bg, color: s.text }}
                    />
                  </TableCell>

                  <TableCell align="right">
                    <Typography variant="h6">
                      {appointment.totalAmount} €
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <IconButton
                      size="small"
                      onClick={(event) => {
                        setAnchorEl(event.currentTarget);
                        setSelectedRow(appointment.id);
                      }}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={filtered.length}
        page={page}
        onPageChange={(_, p) => setPage(p)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(event) => {
          setRowsPerPage(+event.target.value);
          setPage(0);
        }}
        rowsPerPageOptions={[10, 25, 50]}
        labelRowsPerPage="Lignes :"
        labelDisplayedRows={({ from, to, count }) => `${from}-${to} sur ${count}`}
      />

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => {
          setAnchorEl(null);
          setSelectedRow(null);
        }}
      >
        {[
          'Voir le détail',
          'Confirmer',
          'Annuler',
          'Marquer comme terminé'
        ].map((action) => (
          <MenuItem
            key={action}
            onClick={() => {
              setAnchorEl(null);
              setSelectedRow(null);
            }}
            sx={{
              color: action === 'Annuler' ? COLORS.error.main : 'inherit',
            }}
          >
            {action}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
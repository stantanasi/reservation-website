'use client';

import { SERVICES } from '@/data/services.data';
import { COLORS } from '@/themes/colors';
import { CATEGORY_LABELS, Service } from '@/types/service.type';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import EuroIcon from '@mui/icons-material/Euro';
import { alpha, Box, Button, Card, CardContent, CardMedia, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControl, FormControlLabel, Grid, IconButton, InputLabel, MenuItem, Select, Stack, Switch, TextField, Typography } from '@mui/material';
import { useState } from 'react';

export default function ServicesContent() {
  const [services, setServices] = useState(SERVICES);
  const [editDialog, setEditDialog] = useState<Service | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState<string | null>(null);

  const BLANK_SERVICE: Omit<Service, 'id' | 'createdAt' | 'updatedAt'> = {
    slug: '', name: '', shortDescription: '', description: '',
    category: 'massage', duration: 60, price: 100,
    image: '', featured: false, active: true, staff: [],
  };

  const handleSave = () => {
    if (!editDialog) return;
    if (isNew) {
      const newSvc: Service = { ...editDialog, id: `svc-${Date.now()}`, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
      setServices((prev) => [...prev, newSvc]);
    } else {
      setServices((prev) => prev.map((s) => s.id === editDialog.id ? editDialog : s));
    }
    setEditDialog(null);
  };

  const handleDelete = () => {
    if (!deleteDialog) return;
    setServices((prev) => prev.filter((s) => s.id !== deleteDialog));
    setDeleteDialog(null);
  };

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
          Gestion des Prestations
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {
            setIsNew(true);
            setEditDialog({ ...BLANK_SERVICE, id: '', createdAt: '', updatedAt: '' });
          }}
        >
          Nouvelle prestation
        </Button>
      </Stack>

      <Grid container spacing={2.5}>
        {services.map((service) => (
          <Grid
            key={service.id}
            size={{ xs: 12, sm: 6, lg: 4 }}
            component={Card}
            sx={{
              position: 'relative',
              opacity: service.active ? 1 : 0.6,
            }}
          >
            <CardMedia
              component="img"
              src={service.image}
              alt={service.name}
              height={160}
              width="100%"
              sx={{
                objectFit: 'cover',
              }}
            />

            <Stack
              direction="row"
              spacing={0.8}
              sx={{
                position: 'absolute',
                top: 10,
                right: 10,
              }}
            >
              {service.featured && (
                <Chip
                  label="Signature"
                  size="small"
                  sx={{
                    background: COLORS.secondary.main,
                    color: COLORS.primary.main,
                  }}
                />
              )}
              {!service.active && (
                <Chip
                  label="Masqué"
                  size="small"
                  sx={{
                    background: alpha(COLORS.primary.main, 0.7),
                    color: COLORS.primary.contrastText,
                  }}
                />
              )}
            </Stack>

            <CardContent>
              <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', mb: 0.3 }}>
                <Typography sx={{ fontWeight: 500, fontSize: '0.92rem' }}>
                  {service.name}
                </Typography>

                <Switch
                  checked={service.active}
                  onChange={() => setServices((prev) => prev.map((s) => s.id === service.id ? { ...s, active: !s.active } : s))}
                  size="small"
                />
              </Stack>

              <Chip
                label={CATEGORY_LABELS[service.category]}
                size="small"
                sx={{
                  marginBottom: 1,
                }}
              />

              <Stack direction="row" spacing={2.5} sx={{ alignItems: 'center' }}>
                {[
                  { icon: <AccessTimeIcon sx={{ fontSize: 13 }} />, label: `${service.duration} min` },
                  { icon: <EuroIcon sx={{ fontSize: 13 }} />, label: `${service.price} €` },
                ].map(({ icon, label }) => (
                  <Stack
                    key={label}
                    direction="row"
                    spacing={0.5}
                    sx={{
                      alignItems: 'center',
                      color: COLORS.text.secondary,
                    }}
                  >
                    {icon}

                    <Typography variant="caption" sx={{ color: COLORS.text.secondary }}>
                      {label}
                    </Typography>
                  </Stack>
                ))}
              </Stack>

              <Divider sx={{ my: 1.5 }} />

              <Stack direction="row" spacing={1}>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<EditIcon />}
                  onClick={() => { setIsNew(false); setEditDialog(service); }}
                  sx={{ flex: 1 }}
                >
                  Modifier
                </Button>

                <IconButton
                  size="small"
                  onClick={() => setDeleteDialog(service.id)}
                  sx={{
                    border: `1px solid ${alpha(COLORS.error.main, 1)}`,
                    borderRadius: 0,
                    color: COLORS.error.main,
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Stack>
            </CardContent>
          </Grid>
        ))}
      </Grid>

      <Dialog
        open={!!editDialog}
        onClose={() => setEditDialog(null)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {isNew ? 'Nouvelle prestation' : 'Modifier la prestation'}
        </DialogTitle>

        <DialogContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2.5,
            paddingY: '16px !important',
          }}
        >
          <TextField
            label="Nom"
            fullWidth
            value={editDialog?.name ?? ''}
            onChange={(e) => setEditDialog((d) => d ? { ...d, name: e.target.value } : d)}
          />

          <TextField
            label="Description courte"
            fullWidth
            value={editDialog?.shortDescription ?? ''}
            onChange={(e) => setEditDialog((d) => d ? { ...d, shortDescription: e.target.value } : d)}
          />

          <TextField
            label="Description complète"
            fullWidth
            multiline
            rows={3}
            value={editDialog?.description ?? ''}
            onChange={(e) => setEditDialog((d) => d ? { ...d, description: e.target.value } : d)}
          />

          <Stack direction="row" spacing={2.5}>
            <TextField
              label="Durée (min)"
              type="number"
              fullWidth
              value={editDialog?.duration ?? 60}
              onChange={(e) => setEditDialog((d) => d ? { ...d, duration: +e.target.value } : d)}
            />

            <TextField
              label="Prix (€)"
              type="number"
              fullWidth
              value={editDialog?.price ?? 100}
              onChange={(e) => setEditDialog((d) => d ? { ...d, price: +e.target.value } : d)}
            />
          </Stack>

          <FormControl fullWidth>
            <InputLabel>Catégorie</InputLabel>
            <Select
              label="Catégorie"
              value={editDialog?.category ?? 'massage'}
              onChange={(e) => setEditDialog((d) => d ? { ...d, category: e.target.value as Service['category'] } : d)}
            >
              {Object.entries(CATEGORY_LABELS).map(([v, l]) => (
                <MenuItem key={v} value={v}>{l}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="URL de l'image"
            fullWidth
            value={editDialog?.image ?? ''}
            onChange={(e) => setEditDialog((d) => d ? { ...d, image: e.target.value } : d)}
          />

          <FormControlLabel
            control={
              <Switch
                checked={editDialog?.featured ?? false}
                onChange={(e) => setEditDialog((d) => d ? { ...d, featured: e.target.checked } : d)}
              />
            }
            label={
              <Typography variant="body2">
                Soin Signature (mis en avant)
              </Typography>
            }
          />
        </DialogContent>

        <DialogActions>
          <Button variant="text" onClick={() => setEditDialog(null)}>
            Annuler
          </Button>

          <Button variant="contained" onClick={() => handleSave()}>
            {isNew ? 'Créer' : 'Enregistrer'}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={!!deleteDialog}
        onClose={() => setDeleteDialog(null)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>
          Supprimer cette prestation ?
        </DialogTitle>

        <DialogContent>
          <Typography variant="body2" sx={{ color: COLORS.text.secondary }}>
            Cette action est irréversible.
          </Typography>
        </DialogContent>

        <DialogActions>
          <Button variant="text" onClick={() => setDeleteDialog(null)}>
            Annuler
          </Button>

          <Button variant="contained" onClick={() => handleDelete()}>
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
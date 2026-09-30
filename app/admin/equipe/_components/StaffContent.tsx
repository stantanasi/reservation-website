'use client';

import { STAFF } from '@/data/staff.data';
import { COLORS } from '@/themes/colors';
import { CATEGORY_LABELS, Service } from '@/types/service.type';
import { Staff } from '@/types/staff.type';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { alpha, Box, Button, Card, CardContent, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControlLabel, Grid, IconButton, Stack, Switch, Tab, Tabs, TextField, Typography } from '@mui/material';
import { useState } from 'react';

const DAYS_FR: { key: keyof Staff['workingHours']; label: string; }[] = [
  { key: 'monday', label: 'Lundi' },
  { key: 'tuesday', label: 'Mardi' },
  { key: 'wednesday', label: 'Mercredi' },
  { key: 'thursday', label: 'Jeudi' },
  { key: 'friday', label: 'Vendredi' },
  { key: 'saturday', label: 'Samedi' },
  { key: 'sunday', label: 'Dimanche' },
];

const ALL_CATEGORIES: Service['category'][] = ['massage', 'visage', 'corps', 'coiffure', 'onglerie', 'bien-etre'];

export default function StaffContent() {
  const [members, setMembers] = useState(STAFF);
  const [editDialog, setEditDialog] = useState<Staff | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [dialogTab, setDialogTab] = useState(0);
  const [deleteDialog, setDeleteDialog] = useState<string | null>(null);

  const BLANK_MEMBER: Staff = {
    id: '', slug: '', firstName: '', lastName: '', role: '', bio: '',
    image: '', specialties: [], active: true, color: '', createdAt: '', updatedAt: '',
    workingHours: {
      monday: { start: '09:00', end: '18:00' },
      tuesday: { start: '09:00', end: '18:00' },
      wednesday: { start: '09:00', end: '18:00' },
      thursday: { start: '09:00', end: '18:00' },
      friday: { start: '09:00', end: '18:00' },
      saturday: null,
      sunday: null,
    },
  };

  const handleToggleActive = (id: string) => {
    setMembers((prev) => prev.map((m) => m.id === id ? { ...m, active: !m.active } : m));
  };

  const handleSave = () => {
    if (!editDialog) return;
    if (isNew) {
      setMembers((prev) => [...prev, { ...editDialog, id: `tm-${Date.now()}`, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }]);
    } else {
      setMembers((prev) => prev.map((m) => m.id === editDialog.id ? editDialog : m));
    }
    setEditDialog(null);
  };

  const handleDelete = () => {
    if (!deleteDialog) return;
    setMembers((prev) => prev.filter((m) => m.id !== deleteDialog));
    setDeleteDialog(null);
  };

  const toggleSpecialty = (spec: Service['category']) => {
    if (!editDialog) return;
    const has = editDialog.specialties.includes(spec);
    setEditDialog({ ...editDialog, specialties: has ? editDialog.specialties.filter((s) => s !== spec) : [...editDialog.specialties, spec] });
  };

  const toggleDay = (day: keyof Staff['workingHours']) => {
    if (!editDialog) return;
    const current = editDialog.workingHours[day];
    setEditDialog({
      ...editDialog,
      workingHours: {
        ...editDialog.workingHours,
        [day]: current ? null : { start: '09:00', end: '18:00' },
      },
    });
  };

  const updateDayHours = (day: keyof Staff['workingHours'], field: 'start' | 'end', value: string) => {
    if (!editDialog) return;
    const current = editDialog.workingHours[day];
    if (!current) return;
    setEditDialog({
      ...editDialog,
      workingHours: {
        ...editDialog.workingHours,
        [day]: { ...current, [field]: value },
      },
    });
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
          Gestion de l'Équipe
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {
            setIsNew(true);
            setDialogTab(0);
            setEditDialog(BLANK_MEMBER);
          }}
        >
          Ajouter un praticien
        </Button>
      </Stack>

      <Grid container spacing={2.5}>
        {members.map((member) => (
          <Grid
            key={member.id}
            size={{ xs: 12, sm: 6, lg: 4 }}
            component={Card}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              opacity: member.active ? 1 : 0.6,
            }}
          >
            <CardContent sx={{ display: 'flex', alignItems: 'center', flex: 1, gap: 2.5 }}>
              <Box
                component="img"
                src={member.image || undefined}
                alt={`${member.firstName} ${member.lastName}`}
                sx={{ width: 64, height: 64, objectFit: 'cover', objectPosition: 'top', flexShrink: 0 }}
              />

              <Box>
                <Typography sx={{ fontWeight: 500, fontSize: '0.95rem' }}>
                  {member.firstName} {member.lastName}
                </Typography>

                <Typography variant="caption" sx={{ color: COLORS.secondary.main, letterSpacing: '0.05em', fontSize: '0.65rem' }}>
                  {member.role}
                </Typography>
              </Box>

              <Switch
                checked={member.active}
                onChange={() => handleToggleActive(member.id)}
                size="small"
              />
            </CardContent>

            <Divider />

            <CardContent>
              <Typography sx={{ fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: COLORS.text.secondary, mb: 1 }}>
                Spécialités
              </Typography>

              <Stack direction="row" spacing={0.8} sx={{ alignItems: 'center', flexWrap: 'wrap', mb: 2 }}>
                {member.specialties.map((spec) => (
                  <Chip
                    key={spec}
                    label={CATEGORY_LABELS[spec]}
                    size="small"
                    sx={{ fontSize: '0.58rem', height: 20, background: alpha(COLORS.secondary.main, 0.08), color: COLORS.secondary.main }}
                  />
                ))}
              </Stack>

              <Typography sx={{ fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: COLORS.text.secondary, mb: 1 }}>
                Jours travaillés
              </Typography>

              <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center', flexWrap: 'wrap' }}>
                {DAYS_FR.map(({ key, label }) => {
                  const works = !!member.workingHours[key];
                  return (
                    <Box
                      key={key}
                      sx={{
                        width: 28,
                        height: 28,
                        display: 'flex',
                        alignItems: 'center',
                        background: works ? alpha(COLORS.secondary.main, 0.12) : alpha(COLORS.text.secondary, 0.06),
                        color: works ? COLORS.secondary.main : alpha(COLORS.text.secondary, 0.4),
                        fontSize: '0.6rem',
                        fontWeight: works ? 600 : 400,
                        justifyContent: 'center',
                        letterSpacing: '0.04em',
                      }}
                    >
                      {label[0]}
                    </Box>
                  );
                })}
              </Stack>

              <Divider sx={{ marginY: 2.5 }} />

              <Stack direction="row" spacing={1}>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<EditIcon />}
                  onClick={() => {
                    setIsNew(false);
                    setDialogTab(0);
                    setEditDialog(member);
                  }}
                  sx={{ flex: 1 }}
                >
                  Modifier
                </Button>

                <IconButton
                  size="small"
                  onClick={() => setDeleteDialog(member.id)}
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
          {isNew ? 'Nouveau praticien' : `${editDialog?.firstName} ${editDialog?.lastName}`}
        </DialogTitle>

        <Tabs
          value={dialogTab}
          onChange={(_, v) => setDialogTab(v)}
        >
          <Tab label="Informations" />
          <Tab label="Horaires" />
        </Tabs>

        <DialogContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2.5,
          }}
        >
          {dialogTab === 0 && (
            <>
              <Stack direction="row" spacing={2.5}>
                <TextField
                  label="Prénom"
                  fullWidth
                  value={editDialog?.firstName ?? ''}
                  onChange={(e) => setEditDialog((d) => d ? { ...d, firstName: e.target.value } : d)}
                />

                <TextField
                  label="Nom"
                  fullWidth
                  value={editDialog?.lastName ?? ''}
                  onChange={(e) => setEditDialog((d) => d ? { ...d, lastName: e.target.value } : d)}
                />
              </Stack>

              <TextField
                label="Rôle / Titre"
                fullWidth
                value={editDialog?.role ?? ''}
                onChange={(e) => setEditDialog((d) => d ? { ...d, role: e.target.value } : d)}
              />

              <TextField
                label="Biographie"
                fullWidth
                multiline
                rows={3}
                value={editDialog?.bio ?? ''}
                onChange={(e) => setEditDialog((d) => d ? { ...d, bio: e.target.value } : d)}
              />

              <TextField
                label="URL de la photo"
                fullWidth
                value={editDialog?.image ?? ''}
                onChange={(e) => setEditDialog((d) => d ? { ...d, image: e.target.value } : d)}
              />

              <Typography sx={{ fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: COLORS.text.secondary }}>
                Spécialités
              </Typography>

              <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
                {ALL_CATEGORIES.map((spec) => {
                  const active = editDialog?.specialties.includes(spec);
                  return (
                    <Chip
                      key={spec}
                      label={CATEGORY_LABELS[spec]}
                      onClick={() => toggleSpecialty(spec)}
                      size="small"
                      sx={{
                        cursor: 'pointer',
                        background: active ? alpha(COLORS.secondary.main, 0.15) : alpha(COLORS.text.secondary, 0.08),
                        color: active ? COLORS.secondary.main : COLORS.text.secondary,
                        border: active ? `1px solid ${alpha(COLORS.secondary.main, 0.3)}` : '1px solid transparent',
                      }}
                    />
                  );
                })}
              </Stack>
            </>
          )}

          {dialogTab === 1 && (
            <>
              <Typography variant="body2" sx={{ color: COLORS.text.secondary }}>
                Configurez les horaires de travail de ce praticien. Ces données alimentent le générateur de créneaux disponibles.
              </Typography>

              {DAYS_FR.map(({ key, label }) => {
                const schedule = editDialog?.workingHours[key];
                const isWorking = !!schedule;
                return (
                  <Box key={key} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={isWorking}
                          onChange={() => toggleDay(key)}
                          size="small"
                        />
                      }
                      label={<Typography sx={{ minWidth: 100 }}>{label}</Typography>}
                    />

                    {isWorking && schedule && (
                      <>
                        <TextField
                          type="time"
                          size="small"
                          value={schedule.start}
                          onChange={(e) => updateDayHours(key, 'start', e.target.value)}
                          sx={{ width: 110 }}
                        />
                        <Typography variant="body2" sx={{ color: COLORS.text.secondary }}>
                          →
                        </Typography>
                        <TextField
                          type="time"
                          size="small"
                          value={schedule.end}
                          onChange={(e) => updateDayHours(key, 'end', e.target.value)}
                          sx={{ width: 110 }}
                        />
                      </>
                    )}

                    {!isWorking && (
                      <Typography variant="caption" sx={{ color: COLORS.text.secondary, fontStyle: 'italic' }}>
                        Repos
                      </Typography>
                    )}
                  </Box>
                );
              })}
            </>
          )}
        </DialogContent>

        <DialogActions>
          <Button variant="text" onClick={() => setEditDialog(null)}>
            Annuler
          </Button>

          <Button variant="contained" onClick={handleSave}>
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
          Supprimer ce praticien ?
        </DialogTitle>

        <DialogContent>
          <Typography variant="body2" sx={{ color: COLORS.text.secondary }}>
            Toutes les associations avec les soins seront également supprimées. Cette action est irréversible.
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
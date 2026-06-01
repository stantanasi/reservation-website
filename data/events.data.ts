import { CalendarEvent } from '@/types/event.type';
import { getWeekDate } from '@/utils/utils';

export const CALENDAR_EVENTS: CalendarEvent[] = [
  {
    id: 'ce-7',
    type: 'blocked',
    staff: 'tm-1',
    date: getWeekDate('tuesday').toLocaleDateString('fr-CA'),
    startTime: '12:30',
    endTime: '13:30',
    label: 'Pause déjeuner',
    createdAt: '2026-05-15T11:00:00Z',
    updatedAt: '2026-05-15T11:01:00Z',
  },
  {
    id: 'ce-8',
    type: 'absence',
    staff: 'tm-2',
    date: getWeekDate('wednesday').toLocaleDateString('fr-CA'),
    startTime: '09:00',
    endTime: '19:00',
    label: 'Congé formation',
    createdAt: '2026-05-22T08:00:00Z',
    updatedAt: '2026-05-22T08:01:00Z',
  },
];
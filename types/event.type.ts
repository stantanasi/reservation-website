import { Staff } from './staff.type';

export interface CalendarEvent {
  id: string;
  type: 'blocked' | 'absence';
  staff: string | Staff;
  date: string;
  startTime: string;
  endTime: string;
  label?: string;
  createdAt: string;
  updatedAt: string;
}
export interface CalendarEvent {
  id: string;
  type: 'blocked' | 'absence';
  staff: string;
  date: string;
  startTime: string;
  endTime: string;
  label?: string;
  createdAt: string;
  updatedAt: string;
}
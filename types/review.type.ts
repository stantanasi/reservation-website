import { Appointment } from './appointment.type';
import { Service } from './service.type';
import { Staff } from './staff.type';
import { User } from './user.type';

export interface Review {
  id: string;
  appointment: string | Appointment;
  user: string | User;
  service: string | Service;
  staff: string | Staff;
  rating: number;
  comment: string;
  featured: boolean;
  approved: boolean;
  createdAt: string;
  updatedAt: string;
}
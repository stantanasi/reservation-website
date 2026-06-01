import { Service } from './service.type';
import { Staff } from './staff.type';
import { User } from './user.type';

export interface Appointment {
  id: string;
  reference: string;
  service: string | Service;
  staff: 'any' | string | Staff;
  user: string | User;
  date: string;
  startTime: string;
  endTime: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'no_show';
  totalAmount: number;
  stripePaymentIntentId?: string;
  notes?: {
    customer?: string;
    admin?: string;
  };
  createdAt: string;
  updatedAt: string;
}

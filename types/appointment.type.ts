export interface Appointment {
  id: string;
  reference: string;
  service: string;
  staff: 'any' | string;
  user: string;
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

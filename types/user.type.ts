export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role: 'customer' | 'admin';
  vip: boolean;
  lastVisitDate?: string;
  createdAt: string;
  updatedAt: string;
}
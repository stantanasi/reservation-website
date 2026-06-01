import { Service } from './service.type';

export interface Staff {
  id: string;
  slug: string;
  firstName: string;
  lastName: string;
  role: string;
  bio: string;
  image: string;
  specialties: Service['category'][];
  workingHours: Record<'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday', {
    start: string;
    end: string;
    breakStart?: string;
    breakEnd?: string;
  } | null>;
  active: boolean;
  color: string;
  createdAt: string;
  updatedAt: string;
}
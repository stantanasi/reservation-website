import { Staff } from './staff.type';

export interface Service {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  category: 'massage' | 'visage' | 'corps' | 'coiffure' | 'onglerie' | 'bien-etre';
  duration: number;
  price: number;
  image: string;
  featured: boolean;
  active: boolean;
  staff: string[] | Staff[];
  createdAt: string;
  updatedAt: string;
}

export const CATEGORY_LABELS: Record<Service['category'], string> = {
  massage: 'Massages',
  visage: 'Soins Visage',
  corps: 'Soins Corps',
  coiffure: 'Coiffure',
  onglerie: 'Onglerie',
  'bien-etre': 'Bien-Être',
};
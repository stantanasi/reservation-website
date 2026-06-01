export interface Review {
  id: string;
  appointment: string;
  user: string;
  service: string;
  staff: string;
  rating: number;
  comment: string;
  featured: boolean;
  approved: boolean;
  createdAt: string;
  updatedAt: string;
}
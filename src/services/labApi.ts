import { apiRequest } from './api';

export interface NearbyLab {
  id: string;
  name: string;
  distance: number;
  services: string[];
  turnaround: string;
  rating: number;
  isVerified: boolean;
  coordinates: { lat: number; lng: number };
  address: string;
  phone?: string;
  email?: string;
}

export const labApi = {
  nearby: (lat: number, lng: number, radius = 20) =>
    apiRequest<NearbyLab[]>('/labs/nearby', { params: { lat, lng, radius } }),

  list: () => apiRequest<unknown[]>('/labs'),

  get: (id: string) => apiRequest<unknown>(`/labs/${id}`),
};

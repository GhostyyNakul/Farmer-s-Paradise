import { authenticatedRequest } from './api';

export interface Farm {
  _id: string;
  name: string;
  location?: { latitude?: number; longitude?: number; address?: string };
  totalArea?: number;
  areaUnit: string;
  soilType?: string;
  irrigationType?: string;
}

export const farmApi = {
  list: () => authenticatedRequest<Farm[]>('/farms'),
  get: (id: string) => authenticatedRequest<Farm>(`/farms/${id}`),
  create: (data: Partial<Farm>) =>
    authenticatedRequest<Farm>('/farms', { method: 'POST', body: data }),
  update: (id: string, data: Partial<Farm>) =>
    authenticatedRequest<Farm>(`/farms/${id}`, { method: 'PATCH', body: data }),
  delete: (id: string) => authenticatedRequest<null>(`/farms/${id}`, { method: 'DELETE' }),
};

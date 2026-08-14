import { authenticatedRequest } from './api';

export interface Crop {
  _id: string;
  farmId: string;
  name: string;
  variety?: string;
  plantingDate?: string;
  expectedHarvestDate?: string;
  area?: number;
  status: string;
  healthStatus: string;
  notes?: string;
  images: string[];
}

export const cropApi = {
  list: () => authenticatedRequest<Crop[]>('/crops'),
  get: (id: string) => authenticatedRequest<Crop>(`/crops/${id}`),
  listByFarm: (farmId: string) => authenticatedRequest<Crop[]>(`/farms/${farmId}/crops`),
  create: (data: Partial<Crop> & { farmId: string; name: string }) =>
    authenticatedRequest<Crop>('/crops', { method: 'POST', body: data }),
  update: (id: string, data: Partial<Crop>) =>
    authenticatedRequest<Crop>(`/crops/${id}`, { method: 'PATCH', body: data }),
  updateHealth: (id: string, healthStatus: string, notes?: string) =>
    authenticatedRequest<Crop>(`/crops/${id}/health`, {
      method: 'PATCH',
      body: { healthStatus, notes },
    }),
  delete: (id: string) => authenticatedRequest<null>(`/crops/${id}`, { method: 'DELETE' }),
};

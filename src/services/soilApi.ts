import { authenticatedRequest } from './api';

export interface SoilSample {
  _id: string;
  sampleCode: string;
  farmId: string;
  laboratoryId?: string;
  status: string;
  collectionDate?: string;
  submittedDate?: string;
  expectedReportDate?: string;
  progress?: number;
  notes?: string;
}

export const soilApi = {
  listSamples: () => authenticatedRequest<SoilSample[]>('/soil/samples'),
  getSample: (id: string) => authenticatedRequest<SoilSample>(`/soil/samples/${id}`),
  createSample: (data: {
    farmId: string;
    laboratoryId?: string;
    notes?: string;
    collectionLocation?: { latitude?: number; longitude?: number; address?: string };
  }) => authenticatedRequest<SoilSample>('/soil/samples', { method: 'POST', body: data }),
  updateSample: (id: string, data: Partial<SoilSample>) =>
    authenticatedRequest<SoilSample>(`/soil/samples/${id}`, { method: 'PATCH', body: data }),
};

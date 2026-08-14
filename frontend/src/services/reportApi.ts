import { authenticatedRequest } from './api';

export interface SoilReport {
  _id: string;
  soilSampleId: string;
  pH?: number;
  nitrogen?: number;
  phosphorus?: number;
  potassium?: number;
  organicCarbon?: number;
  moisture?: number;
  interpretation?: string;
  recommendations?: string[];
  suitableCrops?: string[];
  summary?: {
    soilHealthSummary?: string;
    deficiencies?: string[];
    recommendations?: string[];
    suitableCrops?: string[];
    nutrientLevels?: Record<string, string>;
  };
}

export const reportApi = {
  list: () => authenticatedRequest<SoilReport[]>('/reports'),
  get: (id: string) => authenticatedRequest<SoilReport>(`/reports/${id}`),
};

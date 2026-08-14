import { authenticatedRequest, apiRequest } from './api';

export interface Notification {
  _id: string;
  type: string;
  title: string;
  message: string;
  read: boolean;
  metadata?: Record<string, unknown>;
  createdAt: string;
}

export interface CropRecommendation {
  crop: string;
  suitability: number;
  reason: string;
  waterRequirement: 'low' | 'medium' | 'high';
  growingPeriod: string;
  soilCompatibility: 'poor' | 'fair' | 'good' | 'excellent';
}

export interface WeatherData {
  temperature: number;
  humidity: number;
  condition: string;
  windSpeed: number;
  rainfall: number;
  isMock: boolean;
}

export const notificationApi = {
  list: () => authenticatedRequest<Notification[]>('/notifications'),
  markRead: (id: string) =>
    authenticatedRequest<Notification>(`/notifications/${id}/read`, { method: 'PATCH' }),
  markAllRead: () =>
    authenticatedRequest<null>('/notifications/read-all', { method: 'POST' }),
};

export const recommendationApi = {
  getCrops: (data: { farmId: string; soilReportId?: string; season?: string }) =>
    authenticatedRequest<CropRecommendation[]>('/recommendations/crops', {
      method: 'POST',
      body: data,
    }),
};

export const weatherApi = {
  get: (lat: number, lng: number) =>
    apiRequest<WeatherData>('/weather', { params: { lat, lng } }),
};

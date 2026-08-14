import { authenticatedRequest } from './api';

export interface AiChatResponse {
  consultationId: string;
  summary: string;
  possibleCauses: string[];
  whatToCheck: string[];
  recommendedActions: string[];
  whenToSeekExpert: string;
  confidence: 'low' | 'medium' | 'high';
  isMock?: boolean;
}

export interface CropAnalysisResponse {
  crop: string;
  possibleIssues: string[];
  visibleSymptoms: string[];
  recommendedNextSteps: string[];
  confidence: 'low' | 'medium' | 'high';
  isMock?: boolean;
}

export const aiApi = {
  chat: (data: { message: string; cropId?: string; farmId?: string; consultationId?: string }) =>
    authenticatedRequest<AiChatResponse>('/ai/chat', { method: 'POST', body: data }),

  analyzeCrop: (cropId: string, imageFile: File) => {
    const formData = new FormData();
    formData.append('cropId', cropId);
    formData.append('image', imageFile);
    return authenticatedRequest<CropAnalysisResponse>('/ai/analyze-crop', {
      method: 'POST',
      body: formData,
    });
  },

  listConsultations: () => authenticatedRequest<unknown[]>('/ai/consultations'),

  getConsultation: (id: string) => authenticatedRequest<unknown>(`/ai/consultations/${id}`),
};

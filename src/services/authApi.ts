import { apiRequest, authenticatedRequest, setAuthToken } from './api';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  profileImage?: string;
  language: string;
  location?: {
    latitude?: number;
    longitude?: number;
    address?: string;
    district?: string;
    state?: string;
    country?: string;
  };
}

export interface AuthResponse {
  user: User;
  accessToken: string;
}

export const authApi = {
  register: async (data: {
    name: string;
    email: string;
    password: string;
    phone?: string;
    language?: string;
  }) => {
    const result = await apiRequest<AuthResponse>('/auth/register', {
      method: 'POST',
      body: data,
    });
    setAuthToken(result.accessToken);
    return result;
  },

  login: async (email: string, password: string) => {
    const result = await apiRequest<AuthResponse>('/auth/login', {
      method: 'POST',
      body: { email, password },
    });
    setAuthToken(result.accessToken);
    return result;
  },

  logout: async () => {
    await apiRequest('/auth/logout', { method: 'POST' });
    setAuthToken(null);
  },

  me: () => authenticatedRequest<User>('/auth/me'),

  refresh: async () => {
    const result = await apiRequest<{ accessToken: string }>('/auth/refresh', {
      method: 'POST',
    });
    setAuthToken(result.accessToken);
    return result;
  },
};

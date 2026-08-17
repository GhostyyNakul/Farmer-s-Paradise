/**
 * Centralized API client for Farmer's Paradise backend.
 * All frontend API calls should go through this module.
 */

 
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: {
    code: string;
    message: string;
    details?: unknown;
  };
}

export class ApiClientError extends Error {
  code: string;
  status: number;
  details?: unknown;

  constructor(status: number, code: string, message: string, details?: unknown) {
    super(message);
    this.name = 'ApiClientError';
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

type RequestOptions = Omit<RequestInit, 'body'> & {
  body?: unknown;
  params?: Record<string, string | number | undefined>;
};

function buildUrl(path: string, params?: Record<string, string | number | undefined>): string {
  const url = `${API_BASE}${path.startsWith('/') ? path : `/${path}`}`;
  if (!params) return url;
  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) search.set(key, String(value));
  });
  const qs = search.toString();
  return qs ? `${url}?${qs}` : url;
}

export async function apiRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { body, params, headers, ...rest } = options;

  const response = await fetch(buildUrl(path, params), {
    ...rest,
    credentials: 'include',
    headers: {
      ...(body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
      ...headers,
    },
    body: body instanceof FormData ? body : body !== undefined ? JSON.stringify(body) : undefined,
  });

  const json = (await response.json()) as ApiResponse<T>;

  if (!response.ok || !json.success) {
    throw new ApiClientError(
      response.status,
      json.error?.code ?? 'REQUEST_FAILED',
      json.error?.message ?? 'Request failed',
      json.error?.details
    );
  }

  return json.data as T;
}

export function setAuthToken(token: string | null): void {
  if (token) {
    localStorage.setItem('fp_access_token', token);
  } else {
    localStorage.removeItem('fp_access_token');
  }
}

export function getAuthToken(): string | null {
  return localStorage.getItem('fp_access_token');
}

export function authHeaders(): Record<string, string> {
  const token = getAuthToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function authenticatedRequest<T>(
  path: string,
  options: RequestOptions = {}
): Promise<T> {
  return apiRequest<T>(path, {
    ...options,
    headers: { ...authHeaders(), ...options.headers },
  });
}

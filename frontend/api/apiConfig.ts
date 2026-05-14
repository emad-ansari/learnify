import useAuthStore from "../store/useAuthStore";

export const API_BASE_URL = 'https://learnify-8a08.onrender.com/api'

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface FetchOptions extends RequestInit {
  method?: HttpMethod;
  body?: any;
}

export const apiFetch = async (endpoint: string, options: FetchOptions = {}) => {
  const { token } = useAuthStore.getState();

  const url = `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);

  const config: RequestInit = {
    ...options,
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
    signal: controller.signal,
  };

  try {
    console.log(`Fetching: ${url}`, { method: options.method || 'GET', hasToken: !!token });
    const response = await fetch(url, config);
    clearTimeout(timeoutId);
    
    let data;
    try {
      data = await response.json();
    } catch (e) {
      console.error('Failed to parse JSON response', e);
      throw new Error(`Server returned non-JSON response: ${response.status} ${response.statusText}`);
    }

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }

    return data;
  } catch (error: any) {
    console.error(`API Error [${options.method || 'GET'} ${endpoint}]:`, {
      message: error.message,
      url: url,
      stack: error.stack
    });
    throw error;
  }
};

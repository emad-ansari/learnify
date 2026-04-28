/**
 * apiConfig.ts — Learnify
 * 
 * Centralized API configuration and fetch wrapper.
 */

import useAuthStore from "../store/useAuthStore";

// Adjust the BASE_URL to your backend's IP/port.
// 10.0.2.2 is the default for Android Emulator to reach localhost on the host.
// For iOS or physical devices, use your computer's local IP (e.g., 192.168.1.x).
export const API_BASE_URL = 'http://10.0.2.2:5000/api';

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

  const config: RequestInit = {
    ...options,
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }

    return data;
  } catch (error: any) {
    console.error(`API Error [${options.method || 'GET'} ${endpoint}]:`, error);
    throw error;
  }
};

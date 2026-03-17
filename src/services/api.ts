// src/services/api.ts
import axios, { type AxiosInstance, type AxiosResponse } from 'axios';

export interface ResponseService<T = any> {
  success: boolean;
  data: T;
  message: string | null;
}

export interface ChatRequest {
  message: string;
}

export interface ChatResponse {
  response: string;
}

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // http://localhost:8000/api
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  withCredentials: false, 
});

const handleResponse = async <T = any>(request: Promise<AxiosResponse<ResponseService<T>>>): Promise<T> => {
  const response = await request;
  return response.data.data;
};

export const getData = <T = any>(url: string) => handleResponse<T>(api.get(url));
export const postData = <T = any>(url: string, payload?: any) => handleResponse<T>(api.post(url, payload));
export const putData = <T = any>(url: string, payload?: any) => handleResponse<T>(api.put(url, payload));
export const deleteData = <T = any>(url: string) => handleResponse<T>(api.delete(url));

// CORRECTION : L'URL doit être '/chat' (sans '/api' car déjà dans baseURL)
export const sendMessageToIA = async (message: string): Promise<ChatResponse> => {
  // Maintenant ça fera: http://localhost:8000/api/chat
  const response = await api.post<ChatResponse>('/chat', { message });
  return response.data;
};

// Alternative: si vous voulez utiliser votre système handleResponse
export const sendMessageToIAWithWrapper = async (message: string): Promise<ChatResponse> => {
  return postData<ChatResponse>('/chat', { message });
};

export default api;
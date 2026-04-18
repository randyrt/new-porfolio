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
  baseURL: import.meta.env.VITE_API_BASE_URL, 
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  withCredentials: false, 
});

const handleResponse = async <T = any>(request: Promise<AxiosResponse<ResponseService<T>>>): Promise<T> => {
  const response = await request;
  if (!response.data.success) {
    throw new Error(response.data.message || 'Erreur API');
  }
  return response.data.data;
};

export const getData = <T = any>(url: string) => handleResponse<T>(api.get(url));
export const postData = <T = any>(url: string, payload?: any) => handleResponse<T>(api.post(url, payload));
export const putData = <T = any>(url: string, payload?: any) => handleResponse<T>(api.put(url, payload));
export const deleteData = <T = any>(url: string) => handleResponse<T>(api.delete(url));


export const sendMessageToIA = async (message: string): Promise<ChatResponse> => {
  const response = await api.post<ResponseService<ChatResponse>>('/chat', { message });
  
  if (!response.data.success) {
    throw new Error(response.data.message || 'Erreur lors de la communication avec l\'IA');
  }
  
  return response.data.data; 
};

export const sendToGemini = async (userQuestion: string, context: string): Promise<string> => {
  try {
    const geminiApiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!geminiApiKey) {
      throw new Error('Clé API Gemini non configurée');
    }

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`,
      {
        contents: [
          {
            parts: [
              {
                text: `Tu es un assistant IA pour un portfolio professionnel. Le contexte est: ${context}\n\nQuestion de l'utilisateur: ${userQuestion}\n\nFournis une réponse complète, professionnelle et pertinente en français.`
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          topP: 0.95,
          topK: 64,
          maxOutputTokens: 1024,
        }
      }
    );

    if (response.data.candidates && response.data.candidates[0]?.content?.parts[0]?.text) {
      return response.data.candidates[0].content.parts[0].text;
    }
    throw new Error('Pas de réponse valide de Gemini');
  } catch (error) {
    console.error('Erreur Gemini:', error);
    throw error;
  }
};

export default api;
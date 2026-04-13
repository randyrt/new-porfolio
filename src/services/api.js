// src/services/api.ts
import axios from 'axios';
const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
    withCredentials: false,
});
const handleResponse = async (request) => {
    const response = await request;
    if (!response.data.success) {
        throw new Error(response.data.message || 'Erreur API');
    }
    return response.data.data;
};
export const getData = (url) => handleResponse(api.get(url));
export const postData = (url, payload) => handleResponse(api.post(url, payload));
export const putData = (url, payload) => handleResponse(api.put(url, payload));
export const deleteData = (url) => handleResponse(api.delete(url));
export const sendMessageToIA = async (message) => {
    const response = await api.post('/chat', { message });
    if (!response.data.success) {
        throw new Error(response.data.message || 'Erreur lors de la communication avec l\'IA');
    }
    return response.data.data;
};
export default api;

import axios from 'axios';
import { StorageKeys } from '../constants/StorageKeys';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  timeout: 100000, // Optional timeout
});

// Add a request interceptor (e.g., to attach tokens)
apiClient.interceptors.request.use(
  (config) => {
    // Retrieve the token from local storage or state management
    const token = localStorage.getItem(StorageKeys.AUTH_TOKEN);
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
// Add a response interceptor (optional)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors globally
    return Promise.reject(error);
  }
);

export default apiClient;

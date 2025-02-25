import apiClient from './axios';

// Login and register functions
export const login = async (email: String, password: String) => {
  try {
    const response = await apiClient.post('/auth/login', { email, password });
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const register = async (email: string, password: string) => {
  try {
    const response = await apiClient.post('/auth/register', {
      email,
      password,
    });
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

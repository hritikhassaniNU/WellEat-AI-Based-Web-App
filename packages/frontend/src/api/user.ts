import apiClient from './axios';
import { DietaryPreference, MedicalProfile, User } from './types';

export const getUserData = async (userId: string) => {
  try {
    const response = await apiClient.get(`/users/${userId}`);
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const getUserListData = async (userId: string) => {
  try {
    const response = await apiClient.get(`/users/${userId}/user-lists`);
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const deleteUserList = async (userId: string, listId: string) => {
  try {
    const response = await apiClient.delete(
      `/users/${userId}/user-lists/${listId}`
    );
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const markUserListAsFavorite = async (
  userId: string,
  listId: string,
  isFavorite: boolean
) => {
  try {
    const response = await apiClient.put(
      `/users/${userId}/user-lists/${listId}`,
      { isFavorite }
    );
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const getUserListDetails = async (userId: string, listId: string) => {
  try {
    const response = await apiClient.get(
      `/users/${userId}/user-lists/${listId}`
    );
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const updateProfilePicture = async (
  userId: string,
  formData: FormData
) => {
  try {
    const response = await apiClient.post(
      `/users/${userId}/profile-picture`,
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );

    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const updateUserData = async (
  userId: String,
  userData: Partial<User>
) => {
  try {
    const response = await apiClient.put(`/users/${userId}`, userData);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const deleteUser = async (userId: string) => {
  try {
    const response = await apiClient.delete(`/users/${userId}`);
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const getUserMedicalProfile = async (userId: string) => {
  try {
    const response = await apiClient.get(`/users/${userId}/medical-profile`);
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const updateUserMedicalProfile = async (
  userId: string,
  userMedicalData: Partial<MedicalProfile>
) => {
  try {
    const response = await apiClient.put(
      `/users/${userId}/medical-profile`,
      userMedicalData
    );
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const getUserDietaryPreference = async (userId: string) => {
  try {
    const response = await apiClient.get(
      `/users/${userId}/dietary-preferences`
    );
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const addUserDietaryPreference = async (
  userId: string,
  userDietaryPreferenceData: Partial<DietaryPreference>
) => {
  try {
    const response = await apiClient.put(
      `/users/${userId}/dietary-preferences`,
      userDietaryPreferenceData
    );
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const analyzeImage = async (userId: string, formData: FormData) => {
  try {
    const response = await apiClient.post(
      `/users/${userId}/grocery-items/analyze`,
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

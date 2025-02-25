import apiClient from './axios';
import { Recommendation } from './types';

export const getUsersRecommendations = async (userId: string) => {
  try {
    const response = await apiClient.get(
      `recommendations/${userId}/recommendations`
    );
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const createRecommendationsForUser = async (
  userId: string,
  recommendationData: Partial<Recommendation>
) => {
  try {
    const response = await apiClient.post(
      `recommendations/${userId}/recommendations`,
      recommendationData
    );
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const getRecommendationById = async (
  userId: string,
  recommendationId: string
) => {
  try {
    const response = await apiClient.get(
      `recommendations/${userId}/recommendations/${recommendationId}`
    );
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const deleteRecipeById = async (
  userId: string,
  recommendationId: string
) => {
  try {
    const response = await apiClient.delete(
      `recommendations/${userId}/recommendations/${recommendationId}`
    );
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

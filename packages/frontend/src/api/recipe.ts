import apiClient from './axios';
import { Recipe } from './types';

// Recipe functions
export const getAllRecipes = async () => {
  try {
    const response = await apiClient.get('/recipes');
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const createRecipe = async (recipeData: Partial<Recipe>) => {
  try {
    const response = await apiClient.post('/recipes', recipeData);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const getRecipeById = async (recipeId: string) => {
  try {
    const response = await apiClient.get(`/recipes/${recipeId}`);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const updateRecipeById = async (
  recipeId: string,
  recipeData: Partial<Recipe>
) => {
  try {
    const response = await apiClient.put(`/recipes/${recipeId}`, recipeData);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const deleteRecipeById = async (recipeId: string) => {
  try {
    const response = await apiClient.delete(`/recipes/${recipeId}`);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

import apiClient from './axios';
import { GroceryItem } from './types';

// Grocery item functions
export const getAllGroceryItems = async () => {
  try {
    const response = await apiClient.get('/grocery-items');
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const getGroceryItemById = async (
  groceryItemId: Partial<GroceryItem>
) => {
  try {
    const response = await apiClient.get(`/grocery-items/${groceryItemId}`);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const deleteGroceryItemById = async (
  groceryItemId: Partial<GroceryItem>
) => {
  try {
    const response = await apiClient.delete(`/grocery-items/${groceryItemId}`);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

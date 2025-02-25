import { GroceryItemModel } from '../models/GroceryItem.js';

export const saveGroceryItem = async (newGroceryItem) => {
  const GroceryItem = new GroceryItemModel(newGroceryItem);

  return GroceryItem.save();
};

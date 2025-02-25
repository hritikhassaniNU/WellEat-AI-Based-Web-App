import mongoose from 'mongoose';

/**
 * Schema for a grocery item.
 * Defines the structure for storing details about grocery items, including their name, brand, category, and nutritional information.
 */
export const GroceryItemSchema = new mongoose.Schema({
  name: String,
  brand: String,
  category: String,
  nutritionalScore: Number,
  ingredients: [String],
  pros: [String],
  cons: [String],
  ingredientImg: String,
  coverImg: String,
});

export const GroceryItemModel = mongoose.model(
  'GroceryItem',
  GroceryItemSchema
);

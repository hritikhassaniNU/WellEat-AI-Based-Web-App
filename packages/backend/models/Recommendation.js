import mongoose from 'mongoose';
import { RecipeSchema } from './Recipe.js';
import { GroceryItemSchema } from './GroceryItem.js';

/**
 * Schema for a recommendation entity.
 * This schema defines the structure of recommendations, which can include recipes, grocery items, or both.
 */
export const RecommendationSchema = new mongoose.Schema(
  {
    type: String,
    recipe: RecipeSchema,
    groceryItem: GroceryItemSchema,
    isFavorite: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const RecommendationModel = mongoose.model(
  'Recommendation',
  RecommendationSchema
);

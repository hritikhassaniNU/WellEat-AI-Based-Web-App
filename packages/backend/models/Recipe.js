import mongoose from 'mongoose';

/**
 * Schema for a recipe entity.
 * Defines the structure of a recipe, including its name, ingredients, preparation instructions, and nutritional information.
 */
export const RecipeSchema = new mongoose.Schema({
  name: String,
  instructions: [String],
  difficultyLevel: String,
  prepTime: String,
  calories: String,
  nutritionalInfo: {
    carbs: String,
    protein: String,
    fat: String,
    fiber: String,
  },
  servings: String,
  ingredients: [String],
  coverImg: String,
});

export const RecipeModel = mongoose.model('Recipe', RecipeSchema);

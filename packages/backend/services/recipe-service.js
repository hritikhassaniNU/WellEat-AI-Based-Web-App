import { RecipeModel } from '../models/Recipe.js';

export const saveRecipe = async (newRecipe) => {
  const recipe = new RecipeModel(newRecipe);
  return recipe.save();
};

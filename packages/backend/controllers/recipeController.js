import { RecipeModel as Recipe } from '../models/Recipe.js';
import { setFailure } from './response-handler.js';
import { saveRecipe } from '../services/recipe-service.js';

// Get all recipes
export const getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (err) {
    setFailure(err, res);
  }
};

// Create a new recipe
export const createRecipe = async (req, res) => {
  try {
    const newRecipe = await saveRecipe(req.body);

    res.status(201).json(newRecipe);
  } catch (err) {
    setFailure(err, res);
  }
};

// Get a recipe by ID
export const getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.recipeId);
    if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
    res.json(recipe);
  } catch (err) {
    setFailure(err, res);
  }
};

// Update a recipe by ID
export const updateRecipeById = async (req, res) => {
  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      req.params.recipeId,
      req.body,
      { new: true }
    );
    res.json(updatedRecipe);
  } catch (err) {
    setFailure(err, res);
  }
};

// Delete a recipe
export const deleteRecipeById = async (req, res) => {
  try {
    await Recipe.findByIdAndDelete(req.params.recipeId);
    res.status(204).json({ message: 'Recipe deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

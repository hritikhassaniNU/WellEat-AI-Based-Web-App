import express from 'express';
import auth from '../middleware/auth.js';
import * as recipeController from '../controllers/recipeController.js';

const router = express.Router();

// Get all recipes
router.get('/', auth, recipeController.getAllRecipes);

// Create a new recipe
router.post('/', auth, recipeController.createRecipe);

// Get a recipe by ID
router.get('/:recipeId', auth, recipeController.getRecipeById);

// Update a recipe by ID
router.put('/:recipeId', auth, recipeController.updateRecipeById);

// Delete a recipe
router.delete('/:recipeId', auth, recipeController.deleteRecipeById);

export default router;

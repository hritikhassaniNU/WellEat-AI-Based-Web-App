import { RecommendationModel } from '../models/Recommendation.js';
import { UserModel as User } from '../models/User.js';
import { OpenAIRecipeRecommendationGeneration } from '../services/openai_service.js';
import { setFailure } from './response-handler.js'; // Adjust the path if necessary

// Get user's recommendations
export const getUserRecommendations = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if we have any existing recommendations
    if (user.recommendations.length > 0) {
      // Get the last recommendation
      const lastRecommendation =
        user.recommendations[user.recommendations.length - 1];

      const now = new Date();
      const twentyFourHours = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

      // Check if the last recommendation was created within the last 24 hours
      if (now - lastRecommendation.createdAt < twentyFourHours) {
        // Less than 24 hours have passed since the last recommendation generation
        return res.json(user.recommendations);
      }
    }

    const result = await OpenAIRecipeRecommendationGeneration(
      user?.fitnessGoal?.goalType,
      user?.medicalProfile?.allergies,
      user?.medicalProfile?.previousAilments,
      user?.dietaryPreferences
    );

    // Check if result is an array
    if (Array.isArray(result)) {
      // Map the returned recipe objects into Recommendation documents
      const recommendations = result.map((recipeObj) => ({
        type: 'recipe',
        recipe: {
          name: recipeObj.name,
          instructions: recipeObj.instructions,
          difficultyLevel: recipeObj.difficultyLevel,
          prepTime: recipeObj.prepTime,
          ingredients: recipeObj.ingredients,
          coverImg: recipeObj.coverImg,
          nutritionalInfo: recipeObj.nutritionalInfo,
          servings: recipeObj.servings,
          calories: recipeObj.calories,
        },
        groceryItem: null,
        isFavorite: false,
      }));

      user.recommendations.push(...recommendations);
      await user.save();

      return res.json(user.recommendations);
    } else {
      // Handle non-array scenario
      return res.status(500).json({
        message:
          'Invalid recommendations format returned by the generation function',
      });
    }
  } catch (err) {
    setFailure(err, res);
  }
};

// Create a new recommendation
export const createRecommendation = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    user.recommendations.push(req.body);
    new RecommendationModel(req.body).save();
    await user.save();
    res.status(201).json(req.body);
  } catch (err) {
    setFailure(err, res);
  }
};

// Get a recommendation by ID
export const getRecommendationById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select(
      'recommendations'
    );
    const recommendation = user.recommendations.id(req.params.recommendationId);
    if (!recommendation)
      return res.status(404).json({ message: 'Recommendation not found' });
    res.json(recommendation);
  } catch (err) {
    setFailure(err, res);
  }
};

// Delete a recommendation
export const deleteRecommendation = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    user.recommendations.id(req.params.recommendationId).remove();
    await user.save();
    res.status(204).json({ message: 'Recommendation deleted successfully' });
  } catch (err) {
    setFailure(err, res);
  }
};

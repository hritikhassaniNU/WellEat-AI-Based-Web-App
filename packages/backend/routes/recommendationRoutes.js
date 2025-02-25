import express from 'express';
import auth from '../middleware/auth.js';
import * as recommendationController from '../controllers/recommendationController.js';

const router = express.Router();

// Get user's recommendations
router.get(
  '/:userId/recommendations',
  auth,
  recommendationController.getUserRecommendations
);

// Create a new recommendation
router.post(
  '/:userId/recommendations',
  auth,
  recommendationController.createRecommendation
);

// Get a recommendation by ID
router.get(
  '/:userId/recommendations/:recommendationId',
  auth,
  recommendationController.getRecommendationById
);

// Delete a recommendation
router.delete(
  '/:userId/recommendations/:recommendationId',
  auth,
  recommendationController.deleteRecommendation
);

export default router;

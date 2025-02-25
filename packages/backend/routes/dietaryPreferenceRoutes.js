import express from 'express';
import auth from '../middleware/auth.js';
import * as dietaryPreferenceController from '../controllers/dietaryPreferenceController.js';

const router = express.Router();

// Get user's dietary preferences
router.get(
  '/:userId/dietary-preferences',
  auth,
  dietaryPreferenceController.getUserDietaryPreferences
);

// Add a dietary preference
router.post(
  '/:userId/dietary-preferences',
  auth,
  dietaryPreferenceController.addDietaryPreference
);

// Delete a dietary preference
router.delete(
  '/:userId/dietary-preferences/:preferenceId',
  auth,
  dietaryPreferenceController.deleteDietaryPreference
);

export default router;

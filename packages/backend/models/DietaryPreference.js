import mongoose from 'mongoose';

/**
 * Schema for a user's dietary preferences.
 * Defines the structure for storing food preferences, such as dietary restrictions or likes.
 */
export const DietaryPreferenceSchema = new mongoose.Schema({
  foodPreferences: [String],
});

export const DietaryPreferenceModel = mongoose.model(
  'DietaryPreference',
  DietaryPreferenceSchema
);

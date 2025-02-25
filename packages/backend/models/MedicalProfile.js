import mongoose from 'mongoose';

/**
 * Schema for a user's medical profile.
 * Defines the structure for storing medical information such as allergies and previous ailments.
 */

export const MedicalProfileSchema = new mongoose.Schema({
  allergies: [String], // List of allergies the user has (e.g., ["Peanuts", "Dust", "Pollen"])
  previousAilments: [String], // List of previous ailments or medical conditions (e.g., ["Asthma", "Diabetes"])
});

export const MedicalProfileModel = mongoose.model(
  'MedicalProfile',
  MedicalProfileSchema
);

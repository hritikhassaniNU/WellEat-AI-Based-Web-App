import mongoose from 'mongoose';
import { MedicalProfileSchema } from './MedicalProfile.js';
import { DietaryPreferenceSchema } from './DietaryPreference.js';
import { UserListSchema } from './UserList.js';
import { RecommendationSchema } from './Recommendation.js';

/**
 * Schema for a user's fitness goal.
 * Includes the type of goal (e.g., weight loss, muscle gain) and the target date to achieve it.
 */
const FitnessGoalSchema = new mongoose.Schema({
  goalType: String,
  targetDate: Date,
});

/**
 * Main schema for user data.
 * This schema defines the structure of a user's information in the database.
 */

export const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // for authentication
    lastName: String,
    firstName: String,
    picture: String,
    phone: String,
    dateOfBirth: String,
    currentCity: String,
    country: String,
    state: String,
    fitnessGoal: FitnessGoalSchema,
    medicalProfile: MedicalProfileSchema,
    dietaryPreferences: [String], //DietaryPreferenceSchema is not needed here.
    userLists: [UserListSchema],
    recommendations: [RecommendationSchema],
  },
  { timestamps: true }
);

export const UserModel = mongoose.model('User', UserSchema);

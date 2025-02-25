import mongoose from 'mongoose';
import { GroceryItemSchema } from './GroceryItem.js';

/**
 * Schema for a user's list (e.g., grocery list or shopping list).
 * This schema defines the structure for lists created by the user.
 */
export const UserListSchema = new mongoose.Schema({
  name: String,
  groceryItems: [GroceryItemSchema],
  createdDate: { type: Date, default: Date.now },
  isFavorite: { type: Boolean, default: false },
});

export const UserListModel = mongoose.model('UserList', UserListSchema);

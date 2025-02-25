import { UserModel as User } from '../models/User.js';
import { setFailure } from './response-handler.js';

// Get user's dietary preferences
export const getUserDietaryPreferences = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select(
      'dietaryPreferences'
    );
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user.dietaryPreferences);
  } catch (err) {
    setFailure(err, res);
  }
};

// Add a dietary preference
export const addDietaryPreference = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    user.dietaryPreferences.push(req.body);
    await user.save();
    res.status(201).json(req.body);
  } catch (err) {
    setFailure(err, res);
  }
};

// Delete a dietary preference
export const deleteDietaryPreference = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    const preference = user.dietaryPreferences.id(req.params.preferenceId);
    if (!preference)
      return res.status(404).json({ message: 'Dietary preference not found' });
    preference.remove();
    await user.save();
    res
      .status(204)
      .json({ message: 'Dietary preference deleted successfully' });
  } catch (err) {
    setFailure(err, res);
  }
};

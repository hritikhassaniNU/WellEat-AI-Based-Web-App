import express from 'express';
import { setFailure } from '../controllers/response-handler.js';
import auth from '../middleware/auth.js';
import { UserModel as User } from '../models/User.js';

const router = express.Router();
// Get user's lists
router.get('/:userId/user-lists', auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select('UserLists');
    res.json(user.userLists);
  } catch (err) {
    setFailure(err, res);
  }
});

// Create a new user list
router.post('/:userId/user-lists', auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    user.userLists.push(req.body);
    await user.save();
    res.status(201).json(req.body);
  } catch (err) {
    setFailure(err, res);
  }
});

// Get a specific user list
router.get('/:userId/user-lists/:listId', auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select('UserLists');
    const userList = user.userLists.id(req.params.listId);
    if (!userList) return res.status(404).json({ message: 'List not found' });
    res.json(userList);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a user list
router.delete('/:userId/user-lists/:listId', auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    user.userLists.id(req.params.listId).remove();
    await user.save();
    res.status(204).json({ message: 'User list deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

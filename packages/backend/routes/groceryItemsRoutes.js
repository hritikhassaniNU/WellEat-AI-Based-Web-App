import express from 'express';
import auth from '../middleware/auth.js';
import { GroceryItemModel as GroceryItem } from '../models/GroceryItem.js';
import { setFailure } from '../controllers/response-handler.js';
const router = express.Router();

// Get all grocery items
router.get('/', auth, async (req, res) => {
  try {
    const items = await GroceryItem.find();
    res.json(items);
  } catch (err) {
    setFailure(err, res);
  }
});

// Get a grocery item by ID
router.get('/:itemId', auth, async (req, res) => {
  try {
    const item = await GroceryItem.findById(req.params.itemId);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json(item);
  } catch (err) {
    setFailure(err, res);
  }
});

// Delete a grocery item
router.delete('/:itemId', auth, async (req, res) => {
  try {
    await GroceryItem.findByIdAndDelete(req.params.itemId);
    res.status(204).json({ message: 'Item deleted successfully' });
  } catch (err) {
    setFailure(err, res);
  }
});

export default router;

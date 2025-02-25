import express from 'express';
import auth from '../middleware/auth.js';
import multer from 'multer';
import * as userController from '../controllers/userController.js';

// Set up Multer storage
/* const storage = multer.memoryStorage(); */
const router = express.Router();
const upload = multer();

router.get('/', auth, userController.getAllUsers);

router.get('/:userId', auth, userController.getUserById);

router.put('/:userId', auth, userController.updateUserById);

router.delete('/:userId', auth, userController.deleteUserById);

router.post(
  '/:userId/profile-picture',
  auth,
  upload.single('profilePicture'),
  userController.updateProfilePicture
);

// Get user's medical profile
router.get('/:userId/medical-profile', auth, userController.getMedicalProfile);

router.put(
  '/:userId/medical-profile',
  auth,
  userController.updateMedicalProfile
);

router.get(
  '/:userId/dietary-preferences',
  auth,
  userController.getDietaryPreferences
);

// Add a dietary preference
router.post(
  '/:userId/dietary-preferences',
  auth,
  userController.addDietaryPreference
);

// Delete a dietary preference
router.delete(
  '/:userId/dietary-preferences/:preferenceId',
  auth,
  userController.deleteDietaryPreference
);

// Get user's lists
router.get('/:userId/user-lists', auth, userController.getUserLists);

// Create a new user list
router.post('/:userId/user-lists', auth, userController.createUserList);

// Get a specific user list
router.get('/:userId/user-lists/:listId', auth, userController.getUserListById);

//Mark User List as Favorite
router.put(
  '/:userId/user-lists/:listId',
  auth,
  userController.markUserListAsFavorite
);

// Delete a user list
router.delete(
  '/:userId/user-lists/:listId',
  auth,
  userController.deleteUserListById
);

// Get grocery items in a user list
router.get(
  '/:userId/user-lists/:listId/grocery-items',
  auth,
  userController.getGroceryItemsInList
);

// Add a grocery item to a user list
router.post(
  '/:userId/user-lists/:listId/grocery-items',
  auth,
  userController.addGroceryItemToList
);

// Analyze a grocery item from an image
router.post(
  '/:userId/grocery-items/analyze',
  auth,
  upload.single('image'),
  userController.analyzeGroceryItemFromImage
);

export default router;

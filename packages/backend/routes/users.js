import express from 'express';
const router = express.Router();
const userController = require('../controllers/userController');

// /users
router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

// /users/:userId
router
  .route('/:userId')
  .get(userController.getUserById)
  .put(userController.updateUserById)
  .delete(userController.deleteUserById);

// Additional routes for medical-profile, dietary-preferences, etc., can be added here

module.exports = router;

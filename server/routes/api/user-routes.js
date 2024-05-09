const router = require('express').Router();
const { createUser, login, deleteUser } = require('../../schemas/resolvers'); // Importing createUser, login, and deleteUser mutations from resolvers
const { authMiddleware } = require('../../utils/auth');

// Route for creating a new user
router.route('/').post(createUser);

// Route for user login
router.route('/login').post(login);

// Route for user logout
router.route('/logout').get(logout); // Maybe should be .post(logout) instead of .get(logout)

// Route for getting user profile
router.route('/me').get(authMiddleware, getUserProfile); 

// Route for deleting a user by ID
router.route('/:userId').delete(authMiddleware, deleteUser);

module.exports = router;

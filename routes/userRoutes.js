
const express = require('express');
const { registerUser, loginUser, updateDriverStatus, getAvailableDrivers } = require('../controllers/userController');
const { body } = require('express-validator');
const router = express.Router();

// User Registration Route
router.post(
  '/register',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  ],
  registerUser
);

// User Login Route
router.post('/login', loginUser);

// Update Driver Status Route (For authenticated drivers only)
router.post('/update-status', updateDriverStatus);

// Get Available Drivers (Only online drivers)
router.get('/available-drivers', getAvailableDrivers);

module.exports = router;

const express = require('express');
const { registerUser, updateDriverStatus } = require('../controllers/userController');
const router = express.Router();

router.post('/register', registerUser);
router.patch('/status', updateDriverStatus); // For updating driver online/offline status

module.exports = router;

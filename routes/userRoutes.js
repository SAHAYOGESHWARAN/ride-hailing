const express = require('express');
const { registerUser, updateDriverStatus } = require('../controllers/userController');
const router = express.Router();

router.post('/register', registerUser);
router.patch('/status', updateDriverStatus); 
console.log("dfghjk",registerUser);

module.exports = router;

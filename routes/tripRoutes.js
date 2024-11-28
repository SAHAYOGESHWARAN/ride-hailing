const express = require('express');
const { requestTrip, acceptTrip, getPreviousTrips } = require('../controllers/tripController');
const { authenticate } = require('../middleware/authMiddleware');
const { validateTripRequest, validateAcceptTrip, validateUserId } = require('../middleware/validationMiddleware');
const router = express.Router();

// Middleware ensures authenticated users only access these routes
router.post('/request', authenticate, validateTripRequest, requestTrip);
router.patch('/accept', authenticate, validateAcceptTrip, acceptTrip);
router.get('/previous/:userId', authenticate, validateUserId, getPreviousTrips);

module.exports = router;

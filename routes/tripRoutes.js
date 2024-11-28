
const express = require('express');
const {
  requestTrip,
  acceptTrip,
  getPreviousTrips,
} = require('../controllers/tripController');
const { authenticate } = require('../middleware/authenticateJWT');
const {
  validateTripRequest,
  validateAcceptTrip,
  validateUserId,
} = require('../middleware/validationMiddleware');

const router = express.Router();

// Define routes
router.post('/request', authenticate, validateTripRequest, requestTrip);
router.patch('/accept', authenticate, validateAcceptTrip, acceptTrip);
router.get('/previous/:userId', authenticate, validateUserId, getPreviousTrips);

module.exports = router;

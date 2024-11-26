const express = require('express');
const { requestTrip, acceptTrip, getPreviousTrips } = require('../controllers/tripController');
const router = express.Router();

router.post('/request', requestTrip);
router.patch('/accept', acceptTrip);
router.get('/previous/:userId', getPreviousTrips);

module.exports = router;

const express = require('express');
const { checkFareDetails } = require('../controllers/fareController');
const router = express.Router();

router.post('/check', checkFareDetails);

module.exports = router;

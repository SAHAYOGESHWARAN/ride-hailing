const Joi = require('joi');

// Validation for trip request
exports.validateTripRequest = (req, res, next) => {
  const schema = Joi.object({
    pickupLocation: Joi.string().required(),
    dropLocation: Joi.string().required(),
    fare: Joi.number().positive().required(),
    userId: Joi.string().uuid().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

// Validation for trip acceptance
exports.validateAcceptTrip = (req, res, next) => {
  const schema = Joi.object({
    tripId: Joi.string().uuid().required(),
    driverId: Joi.string().uuid().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

// Validation for user ID (for retrieving previous trips)
exports.validateUserId = (req, res, next) => {
  const schema = Joi.object({
    userId: Joi.string().uuid().required(),
  });

  const { error } = schema.validate(req.params);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

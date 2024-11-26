const Trip = require('../models/Trip');

exports.requestTrip = async (req, res) => {
    const { riderId, pickupLocation, dropLocation } = req.body;
    try {
        const trip = await Trip.create({ riderId, pickupLocation, dropLocation });
        res.status(201).json({ message: 'Trip requested successfully', trip });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

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


exports.acceptTrip = async (req, res) => {
    const { tripId, driverId } = req.body;
    try {
        const driver = await User.findOne({ where: { id: driverId, role: 'driver', isOnline: true } });
        if (!driver) {
            return res.status(403).json({ message: 'Driver must be online to accept trips' });
        }

        const trip = await Trip.findOne({ where: { id: tripId, status: 'requested' } });
        if (!trip) {
            return res.status(404).json({ message: 'Trip not found or already accepted' });
        }

        trip.driverId = driverId;
        trip.status = 'accepted';
        await trip.save();

        res.status(200).json({ message: 'Trip accepted successfully', trip });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getPreviousTrips = async (req, res) => {
    const { userId } = req.params;
    try {
        const trips = await Trip.findAll({
            where: {
                [sequelize.Op.or]: [{ riderId: userId }, { driverId: userId }],
                status: 'completed',
            },
        });
        res.status(200).json({ trips });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

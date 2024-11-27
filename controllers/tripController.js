const { User, Trip } = require('../models');
const { Op } = require('sequelize'); 

// Request a Trip (Rider requests a trip)
exports.requestTrip = async (req, res) => {
    const { riderId, pickupLocation, dropLocation } = req.body;

    try {
        // Create a new trip request
        const trip = await Trip.create({
            riderId,
            pickupLocation,
            dropLocation,
            status: 'requested', // Initial status when trip is requested
        });

        res.status(201).json({ message: 'Trip requested successfully', trip });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error, please try again later' });
    }
};

// Accept a Trip (Driver accepts a trip)
exports.acceptTrip = async (req, res) => {
    const { tripId, driverId } = req.body;

    try {
        // Find if the driver is online
        const driver = await User.findOne({
            where: { id: driverId, role: 'driver', isOnline: true },
        });

        if (!driver) {
            return res.status(403).json({ message: 'Driver must be online to accept trips' });
        }

        // Find the requested trip
        const trip = await Trip.findOne({
            where: { id: tripId, status: 'requested' },
        });

        if (!trip) {
            return res.status(404).json({ message: 'Trip not found or already accepted' });
        }

        // Assign the trip to the driver and change the status
        trip.driverId = driverId;
        trip.status = 'accepted'; // Change status to accepted
        await trip.save();

        res.status(200).json({ message: 'Trip accepted successfully', trip });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error, please try again later' });
    }
};

// Get Previous Trips (Rider or Driver can view their completed trips)
exports.getPreviousTrips = async (req, res) => {
    const { userId } = req.params;

    try {
        // Fetch trips where the user was either the rider or driver, and status is completed
        const trips = await Trip.findAll({
            where: {
                [Op.or]: [{ riderId: userId }, { driverId: userId }],
                status: 'completed', // Only completed trips
            },
        });

        if (trips.length === 0) {
            return res.status(404).json({ message: 'No completed trips found' });
        }

        res.status(200).json({ trips });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error, please try again later' });
    }
};

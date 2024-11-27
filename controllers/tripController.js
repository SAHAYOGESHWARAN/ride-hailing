const { User, Trip, Fare } = require('../models');
const { Op } = require('sequelize');

// Request a Trip (Rider requests a trip)
exports.requestTrip = async (req, res) => {
    const { riderId, pickupLocation, dropLocation, estimatedDistance } = req.body;

    try {
        // Validate input
        if (!riderId || !pickupLocation || !dropLocation || !estimatedDistance) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Fetch active fare policy
        const fareDetails = await Fare.findOne({ where: { isActive: true } });
        if (!fareDetails) {
            return res.status(404).json({ message: 'Fare policy not found. Please contact support.' });
        }

        // Calculate estimated fare
        const estimatedFare = parseFloat((fareDetails.farePerKm * estimatedDistance).toFixed(2));

        // Create a new trip request
        const trip = await Trip.create({
            riderId,
            pickupLocation,
            dropLocation,
            estimatedDistance,
            estimatedFare,
            status: 'requested', // Initial status when trip is requested
        });

        res.status(201).json({
            message: 'Trip requested successfully',
            trip: {
                id: trip.id,
                pickupLocation,
                dropLocation,
                estimatedDistance,
                estimatedFare,
            },
        });
    } catch (err) {
        console.error('Error in requestTrip:', err);
        res.status(500).json({ error: 'Internal server error, please try again later.' });
    }
};

// Accept a Trip (Driver accepts a trip)
exports.acceptTrip = async (req, res) => {
    const { tripId, driverId } = req.body;

    try {
        // Validate input
        if (!tripId || !driverId) {
            return res.status(400).json({ message: 'Trip ID and Driver ID are required.' });
        }

        // Check if the driver is online
        const driver = await User.findOne({
            where: { id: driverId, role: 'driver', isOnline: true },
        });

        if (!driver) {
            return res.status(403).json({ message: 'Driver must be online to accept trips.' });
        }

        // Find the trip
        const trip = await Trip.findOne({
            where: { id: tripId, status: 'requested' },
        });

        if (!trip) {
            return res.status(404).json({ message: 'Trip not found or already accepted.' });
        }

        // Calculate ETA (example logic, can be replaced with real-time data)
        const estimatedTime = Math.ceil(trip.estimatedDistance / 10); // Assuming 10 km/h average speed

        // Update the trip status and assign the driver
        trip.driverId = driverId;
        trip.status = 'accepted'; // Change status to accepted
        trip.eta = estimatedTime; // Set ETA
        await trip.save();

        res.status(200).json({
            message: 'Trip accepted successfully',
            trip: {
                id: trip.id,
                pickupLocation: trip.pickupLocation,
                dropLocation: trip.dropLocation,
                eta: `${estimatedTime} minutes`,
            },
        });
    } catch (err) {
        console.error('Error in acceptTrip:', err);
        res.status(500).json({ error: 'Internal server error, please try again later.' });
    }
};

// Get Previous Trips (Rider or Driver can view their completed trips with pagination)
exports.getPreviousTrips = async (req, res) => {
    const { userId } = req.params;
    const { page = 1, limit = 10 } = req.query; // Pagination parameters

    try {
        // Fetch trips where the user was either the rider or driver, and status is completed
        const offset = (page - 1) * limit;

        const { count, rows: trips } = await Trip.findAndCountAll({
            where: {
                [Op.or]: [{ riderId: userId }, { driverId: userId }],
                status: 'completed',
            },
            offset,
            limit: parseInt(limit),
            order: [['createdAt', 'DESC']], // Latest trips first
        });

        if (count === 0) {
            return res.status(404).json({ message: 'No completed trips found.' });
        }

        res.status(200).json({
            totalTrips: count,
            currentPage: parseInt(page),
            totalPages: Math.ceil(count / limit),
            trips,
        });
    } catch (err) {
        console.error('Error in getPreviousTrips:', err);
        res.status(500).json({ error: 'Internal server error, please try again later.' });
    }
};

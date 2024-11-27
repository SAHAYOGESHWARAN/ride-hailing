const { Fare } = require('../models');

exports.checkFareDetails = async (req, res) => {
    const { distance } = req.body;

    try {
        // Validate the distance input
        if (distance == null || distance < 0) {
            return res.status(400).json({ message: 'Invalid distance provided. Distance must be a non-negative number.' });
        }

        // Retrieve the active fare policy (assumes a single fare policy for now)
        const fareDetail = await Fare.findOne({ where: { isActive: true } }); // Add 'isActive' field for fare policies
        if (!fareDetail) {
            return res.status(404).json({ message: 'Fare details not available. Please contact support.' });
        }

        // Calculate the total fare
        const totalFare = parseFloat((distance * fareDetail.farePerKm).toFixed(2)); // Rounded to 2 decimal places

        // Respond with fare details
        res.status(200).json({
            distance,
            farePerKm: fareDetail.farePerKm,
            totalFare,
            currency: fareDetail.currency || 'INR', // Optional currency field in Fare model
        });

        console.log(`[Fare Calculation]: Distance - ${distance} km, Rate - ${fareDetail.farePerKm} per km, Total Fare - ${totalFare}`);
    } catch (err) {
        console.error('Error fetching fare details:', err.message);
        res.status(500).json({ error: 'Internal server error. Please try again later.' });
    }
};

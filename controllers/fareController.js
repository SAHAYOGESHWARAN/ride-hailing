exports.checkFareDetails = async (req, res) => {
    const { distance } = req.body;
    try {
        const fareDetail = await Fare.findOne({ where: { id: 1 } }); // Assuming a single fare policy
        if (!fareDetail) {
            return res.status(404).json({ message: 'Fare details not available' });
        }

        const totalFare = distance * fareDetail.farePerKm;
        res.status(200).json({ distance, farePerKm: fareDetail.farePerKm, totalFare });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

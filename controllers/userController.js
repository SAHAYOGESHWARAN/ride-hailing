const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword, role });
        res.status(201).json({ message: 'User registered successfully', user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateDriverStatus = async (req, res) => {
    const { driverId, isOnline } = req.body;
    try {
        const driver = await User.findOne({ where: { id: driverId, role: 'driver' } });
        if (!driver) {
            return res.status(404).json({ message: 'Driver not found' });
        }
        driver.isOnline = isOnline;
        await driver.save();
        res.status(200).json({ message: `Driver is now ${isOnline ? 'online' : 'offline'}` });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const { validationResult } = require('express-validator');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

// User Registration
exports.registerUser = async (req, res) => {
    const { name, email, password, role } = req.body;

    // Input validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists with this email' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user in DB
        const user = await User.create({ name, email, password: hashedPassword, role });
        
        // Send success response
        res.status(201).json({
            message: 'User registered successfully',
            user: { id: user.id, name: user.name, email: user.email, role: user.role }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error, please try again later' });
    }
};

// User Login (JWT Authentication)
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user exists in DB
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        // Compare password with hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Send success response
        res.status(200).json({
            message: 'Login successful',
            token,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error, please try again later' });
    }
};

// Update Driver's Online/Offline Status
exports.updateDriverStatus = async (req, res) => {
    const { driverId, isOnline } = req.body;

    try {
        // Check if user is a driver and exists
        const driver = await User.findOne({ where: { id: driverId, role: 'driver' } });
        if (!driver) {
            return res.status(404).json({ error: 'Driver not found' });
        }

        // Update driver's status
        driver.isOnline = isOnline;
        await driver.save();

        // Send success response
        res.status(200).json({
            message: `Driver is now ${isOnline ? 'online' : 'offline'}`,
            driver: { id: driver.id, isOnline: driver.isOnline }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update driver status, please try again later' });
    }
};

// Middleware for role-based access control (Only drivers can update their status)
exports.isDriver = (req, res, next) => {
    const { role } = req.user; // Assumes user is authenticated
    if (role !== 'driver') {
        return res.status(403).json({ error: 'Access denied. This action is for drivers only' });
    }
    next();
};

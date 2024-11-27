const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

const Trip = sequelize.define('Trip', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, // Generate unique identifier for each trip
        primaryKey: true,
    },
    riderId: {
        type: DataTypes.UUID, // Reference to the user who requested the trip
        references: {
            model: User,
            key: 'id',
        },
        allowNull: false,
    },
    driverId: {
        type: DataTypes.UUID, // Reference to the driver who accepts the trip
        references: {
            model: User,
            key: 'id',
        },
        allowNull: true, // Nullable until a driver accepts the trip
    },
    pickupLocation: {
        type: DataTypes.STRING, // Start location of the trip
        allowNull: false,
    },
    dropLocation: {
        type: DataTypes.STRING, // End location of the trip
        allowNull: false,
    },
    estimatedDistance: {
        type: DataTypes.DECIMAL(10, 2), // Estimated distance in km
        allowNull: true,
    },
    estimatedFare: {
        type: DataTypes.DECIMAL(10, 2), // Estimated fare for the trip
        allowNull: true,
    },
    fare: {
        type: DataTypes.DECIMAL(10, 2), // Final fare calculated after trip completion
        allowNull: true,
    },
    distance: {
        type: DataTypes.DECIMAL(10, 2), // Actual distance covered during the trip
        allowNull: true,
    },
    eta: {
        type: DataTypes.INTEGER, // Estimated time of arrival in minutes
        allowNull: true,
    },
    status: {
        type: DataTypes.ENUM('requested', 'accepted', 'completed', 'canceled'), // Status of the trip
        defaultValue: 'requested',
    },
}, {
    timestamps: true, // Automatically include createdAt and updatedAt fields
    tableName: 'trips', // Optional: specify the table name
});

module.exports = Trip;

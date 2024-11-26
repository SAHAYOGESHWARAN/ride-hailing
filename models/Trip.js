const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Trip = sequelize.define('Trip', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    riderId: { type: DataTypes.UUID, allowNull: false },
    driverId: { type: DataTypes.UUID, allowNull: true }, // Initially null
    pickupLocation: { type: DataTypes.STRING, allowNull: false },
    dropLocation: { type: DataTypes.STRING, allowNull: false },
    status: { type: DataTypes.ENUM('requested', 'accepted', 'completed'), defaultValue: 'requested' },
    fare: { type: DataTypes.FLOAT, allowNull: true },
});

module.exports = Trip;

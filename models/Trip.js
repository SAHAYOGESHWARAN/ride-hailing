const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

const Trip = sequelize.define('Trip', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    riderId: {
        type: DataTypes.UUID,
        references: {
            model: User,
            key: 'id',
        },
        allowNull: false,
    },
    driverId: {
        type: DataTypes.UUID,
        references: {
            model: User,
            key: 'id',
        },
        allowNull: true,
    },
    startLocation: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    endLocation: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    distance: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    fare: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('requested', 'accepted', 'completed', 'canceled'),
        defaultValue: 'requested',
    },
}, {
    timestamps: true,
});

module.exports = Trip;

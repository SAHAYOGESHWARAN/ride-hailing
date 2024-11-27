const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Fare = sequelize.define('Fare', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    distance: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    farePerKm: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true, 
    },
    currency: {
        type: DataTypes.STRING,
        defaultValue: 'INR',
    },
});

module.exports = Fare;

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Fare = sequelize.define('Fare', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    distance: { type: DataTypes.FLOAT, allowNull: false },
    farePerKm: { type: DataTypes.FLOAT, allowNull: false },
});

module.exports = Fare;

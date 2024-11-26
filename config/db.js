const { Sequelize } = require('sequelize');

// Correct the host to 'localhost' and specify port if necessary
const sequelize = new Sequelize('ride_hailing_db', 'ride_hailing_user', 'your_password', {
    host: 'localhost', // Use 'localhost' or your PostgreSQL server IP if it's remote
    dialect: 'postgres',
    port: 5432, // Default PostgreSQL port, only necessary if it's non-standard
    logging: false, // Set to true for debugging if needed
});

module.exports = sequelize;

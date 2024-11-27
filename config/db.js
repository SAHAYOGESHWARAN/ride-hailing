const { Sequelize } = require('sequelize');

// Correct the host to 'localhost' and specify port if necessary
const sequelize = new Sequelize('postgres', 'ride_hailing_user', 'saha123', {
    host: 'localhost', 
    dialect: 'postgres',
    port: 5432,
    logging: false, 
});

module.exports = sequelize;

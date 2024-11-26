const { Sequelize } = require('sequelize');

// Correct the host to 'localhost' and specify port if necessary
const sequelize = new Sequelize('ride_hailing_db', 'ride_hailing_user', 'your_password', {
    host: 'localhost', 
    dialect: 'postgres',
    port: 5432,
    logging: false, 
});

module.exports = sequelize;

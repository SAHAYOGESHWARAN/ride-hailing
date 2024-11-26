const sequelize = require('../config/db');
const User = require('../models/User');
const Trip = require('../models/Trip');
const Fare = require('../models/Fare');

sequelize.sync({ force: true })
    .then(() => {
        console.log('Database and tables created!');
    })
    .catch((err) => {
        console.error('Error syncing database:', err);
    });

const sequelize = require('./config/db');
const models = [require('./models/User'), require('./models/Trip'), require('./models/Fare')];

sequelize.sync({ force: true }).then(() => {
    console.log('Database & tables created!');
});     
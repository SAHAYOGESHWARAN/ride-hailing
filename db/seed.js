const Fare = require('./models/Fare');

async function seedDatabase() {
    await Fare.create({ distance: 0, farePerKm: 10 }); // Example: ₹10 per km
    console.log('Sample fare details seeded!');
}

seedDatabase();

const Fare = require('../models/Fare');

async function seedDatabase() {
    await Fare.create({ distance: 0, farePerKm: 10 }); // ₹10 per km
    console.log('Sample fare details seeded!');
}

seedDatabase()
    .then(() => {
        console.log('Database seeded successfully!');
        process.exit(0); // Exit script after seeding
    })
    .catch((err) => {
        console.error('Error seeding database:', err);
    });

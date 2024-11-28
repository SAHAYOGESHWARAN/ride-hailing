require('dotenv').config(); 
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const userRoutes = require('./routes/userRoutes');
const tripRoutes = require('./routes/tripRoutes');
const sequelize = require('./config/db'); 
const errorHandler = require('./middleware/errorHandler'); 

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json()); 

// Test Database Connection
(async () => {
  try {
    await sequelize.authenticate(); 
    console.log('Database connected successfully');
    await sequelize.sync(); 
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1); 
  }
})();

// API Routes
app.use('/api/user', userRoutes); 
app.use('/api/trips', tripRoutes); 

// Custom Error Handling Middleware
app.use(errorHandler); 

// Handle Undefined Routes
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

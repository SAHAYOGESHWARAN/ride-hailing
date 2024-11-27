require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const userRoutes = require('./routes/userRoutes');
const tripRoutes = require('./routes/tripRoutes');
const  sequelize  = require('./config/db');
const errorHandler = require('./middleware/errorHandler'); 

const app = express();

// Middleware
app.use(helmet()); 
app.use(cors()); 
app.use(express.json()); 

// Test Database Connection
sequelize.authenticate()
    .then(() => console.log('Database connected successfully'))
    .catch((err) => console.error('Database connection failed:', err));

// API Routes
app.use('/api/user', userRoutes);
app.use('/api/trips', tripRoutes);

// Custom Error Handling Middleware
app.use(errorHandler); 

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

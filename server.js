require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const morganLogger = require('./middleware/morganLogger');
const rateLimiter = require('./middleware/rateLimit');
const errorHandler = require('./middleware/errorHandler');
const connectDB = require('./db');

// Import Routes
const countdownRoutes = require('./routes/countdownRoute');
const userRoutes = require('./routes/userRoute');
const envelopeRoutes = require('./routes/envelopeRoute');
const totalBudgetRoutes = require('./routes/totalBudgetRoute');
const wishListRoutes = require('./routes/wishlistRoutes');

// Initialize Express App
const app = express();

const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

// Middleware
app.use(express.json()); // Parse JSON request body
app.use(helmet()); // Secure HTTP headers
app.use(morganLogger); // Log HTTP requests
app.use(rateLimiter); // Rate limiting for security

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/envelopes', envelopeRoutes);
app.use('/api/totalBudget', totalBudgetRoutes);
app.use('/api/wishlist', wishListRoutes);
app.use('/api/countdown', countdownRoutes);

// Health Check Endpoint
app.get('/health', (req, res) => res.status(200).send('OK'));

// Root Endpoint
app.get('/', (req, res) => res.send('Hello! Your Budget Planner API is running.'));

// Error Handling Middleware
app.use(errorHandler);

// Connect to MongoDB
connectDB().then(() => {
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch(err => {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
});

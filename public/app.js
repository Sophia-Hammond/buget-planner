const express = require('express');
const helmet = require('helmet');
const morganLogger = require('../middleware/morganLogger');
const rateLimiter = require('../middleware/rateLimit');
const errorHandler = require('../middleware/errorHandler');
const authMiddleware = require('../middleware/authMiddleware');

// Routes imports
const countdownRoutes = require('../routes/countdownRoute');
const userRoutes = require('../routes/userRoute');
const envelopeRoutes = require('../routes/envelopeRoute');
const totalBudgetRoutes = require('../routes/totalBudgetRoute');
const wishListRoutes = require('../routes/wishlistRoutes');

// Initialize express app
const app = express();

// Middleware Setup
app.use(express.json()); // For parsing application/json
app.use(helmet()); // For securing HTTP headers
app.use(morganLogger); // For logging HTTP requests
app.use(rateLimiter); // For limiting repeated requests


// API Routes
app.use('/api/users', userRoutes);
app.use('/envelopes', envelopeRoutes);
app.use('/totalBudget', totalBudgetRoutes);
app.use('/wishlist', wishListRoutes);
app.use('/countdown', countdownRoutes);

// Health check endpoint
app.get('/health', (req, res) => res.status(200).send('OK'));

// Root endpoint
app.get('/', (req, res) => res.send('Hello! Your API is running.'));

// Error handling middleware
app.use(errorHandler);

module.exports = app;

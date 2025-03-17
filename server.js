
const express = require('express');
const mongoose = require('mongoose');

const morganLogger = require('./middleware/morganLogger');
const helmetMiddleware = require('./middleware/helmet');
const rateLimiter = require('./middleware/rateLimit');
const errorHandler = require('./middleware/errorHandler');
const authMiddleware = require('./middleware/authMiddleware');

const userRoute = require('./routes/userRoute');

require('dotenv').config();
const connectDB = require('./db');

const envelopeRoutes = require('./routes/envelopeRoute');
const totalBudgetRoutes = require('./routes/totalBudgetRoute');
const wishListRoutes = require('./routes/wishlistRoutes');

const app = express();

connectDB();

app.use(express.json());
app.use(helmetMiddleware);
app.use(morganLogger);
app.use(rateLimiter);

app.use('/envelopes', envelopeRoutes);
app.use('/totalBudget', totalBudgetRoutes);
app.use('/wishlist', wishListRoutes);
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
    res.send('Hello!');
});

app.use(errorHandler);
app.get('/health', (req, res) => {
    res.status(200).send('OK');
});



const PORT = process.env.PORT || 3000;
   app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
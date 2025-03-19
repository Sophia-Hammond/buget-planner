const express = require('express');
const helmet = require('helmet');
const morganLogger = require('../middleware/morganLogger');
const rateLimiter = require('../middleware/rateLimit');
const errorHandler = require('../middleware/errorHandler');
const authMiddleware = require('../middleware/authMiddleware');

const userRoutes = require('../routes/userRoute');
const envelopeRoutes = require('../routes/envelopeRoute');
const totalBudgetRoutes = require('../routes/totalBudgetRoute');
const wishListRoutes = require('../routes/wishlistRoutes');

const app = express();

app.use(express.json();
app.use(helmet());
app.use(morganLogger);
app.use(rateLimiter);
app.use(authMiddleware);

app.use('/api/users', userRoutes);
app.use('/envelopes', envelopeRoutes);
app.use('totalBuget', totalBudgetRoutes);
app.use('/wishlist', wishListRoutes);

app.get('health', (req, res) => res.status(200).send('OK'));

app get('/', (req, res) => res.send('Hello!'));

module.exports = app;
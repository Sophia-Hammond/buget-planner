
const express = require('express');
const morganLogger = require('./middleware/morganLogger');
const helmetMiddleware = require('./middleware/helmet');
const rateLimiter = require('./middleware/rateLimit');
const errorHandler = require('./middleware/errorHandler');
const mongoose = require('mongoose');
require('dotenv').config();
const connectDB = require('./db');

const envelopeRoutes = require('./routes/envelopes');

const app = express();

connectDB();

app.use(helmetMiddleware);
app.use(morganLogger);
app.use(rateLimiter);
app.use('/envelopes', envelopeRoutes);

app.get('/', (req, res) => {
    res.send('Hello!');
});

app.use(errorHandler);


const PORT = process.env.PORT || 3000;
   app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
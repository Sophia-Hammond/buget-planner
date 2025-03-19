require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./public/app');
const connectDB = require('./db');

connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Server is runnning on port ${PORT}');
});
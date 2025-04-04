const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const dbURI = process.env.DB_URI;  // MongoDB URI from environment variable
    if (!dbURI) {
      throw new Error('DB_URI is not defined in .env file');
    }
    await mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });  
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err.message);
    console.error(err.stack);  // Log the stack trace for easier debugging
    process.exit(1);  
  }
};

module.exports = connectDB;

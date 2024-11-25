const mongoose = require('mongoose');

// MongoDB URI
const uri = 'mongodb://localhost:27017/';

// Database connection function
const db = async () => {
  try {
    await mongoose.connect(uri);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); 
  }
};

module.exports = db;

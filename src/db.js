const mongoose = require('mongoose');

const connectDB = async () => {
  try {
      console.log(' connecting to MongoDB...')
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    throw error;
  }
};

module.exports = connectDB;
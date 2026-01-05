const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Set connection options to prevent timeout
    const options = {
      serverSelectionTimeoutMS: 5000, // 5 seconds timeout
      socketTimeoutMS: 45000, // 45 seconds socket timeout
      bufferMaxEntries: 0,
      bufferCommands: false,
    };
    
    await mongoose.connect(process.env.MONGO_URI, options);
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    throw error;
  }
};

module.exports = connectDB;
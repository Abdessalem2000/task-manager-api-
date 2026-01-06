const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    console.log('🔗 Attempting MongoDB connection...');
    console.log('🔗 MONGO_URI:', process.env.MONGO_URI ? 'SET' : 'MISSING');
    
    // Set connection options to prevent timeout
    const options = {
      serverSelectionTimeoutMS: 10000, // 10 seconds timeout
      socketTimeoutMS: 45000, // 45 seconds socket timeout
      bufferMaxEntries: 0,
      bufferCommands: false,
      connectTimeoutMS: 10000, // 10 seconds connection timeout
    };
    
    await mongoose.connect(process.env.MONGO_URI, options);
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    console.error('❌ Error code:', error.code);
    console.error('❌ Full error:', error);
    throw error;
  }
};

module.exports = connectDB;
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
      console.log('🔍 DEBUG: Environment variables check:');
      console.log('🔍 DEBUG: MONGO_URI exists:', !!process.env.MONGO_URI);
      console.log('🔍 DEBUG: MONGO_URI length:', process.env.MONGO_URI?.length || 0);
      console.log('🔍 DEBUG: MONGO_URI starts with mongodb+:', process.env.MONGO_URI?.startsWith('mongodb'));
      console.log('🔍 DEBUG: NODE_ENV:', process.env.NODE_ENV);
      
      console.log('🔍 DEBUG: Connecting to MongoDB...');
      console.log('🔍 DEBUG: Connection string (first 20 chars):', process.env.MONGO_URI?.substring(0, 20) + '...');
      
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected successfully');
    console.log('🔍 DEBUG: Connection state:', mongoose.connection.readyState);
    console.log('🔍 DEBUG: Connection host:', mongoose.connection.host);
    console.log('🔍 DEBUG: Connection name:', mongoose.connection.name);
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    console.error('❌ Full error:', error);
    console.error('❌ Error stack:', error.stack);
    throw error;
  }
};

module.exports = connectDB;
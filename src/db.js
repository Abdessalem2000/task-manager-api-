const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Force close any existing connections
    if (mongoose.connection.readyState !== 0) {
      console.log('🔄 Closing existing MongoDB connections...');
      await mongoose.connection.close();
    }
    
    console.log('🔗 Attempting fresh MongoDB connection...');
    console.log('🔗 MONGO_URI:', process.env.MONGO_URI ? 'SET' : 'MISSING');
    console.log('🔗 MONGO_URI length:', process.env.MONGO_URI ? process.env.MONGO_URI.length : 0);
    
    // Set connection options to prevent timeout and force fresh connection
    const options = {
      serverSelectionTimeoutMS: 10000, // 10 seconds timeout
      socketTimeoutMS: 45000, // 45 seconds socket timeout
      bufferMaxEntries: 0,
      bufferCommands: false,
      connectTimeoutMS: 10000, // 10 seconds connection timeout
      maxPoolSize: 1, // Limit pool size to prevent hanging
      minPoolSize: 1,
      maxIdleTimeMS: 30000, // Close idle connections after 30s
      waitQueueTimeoutMS: 5000, // Queue timeout
    };
    
    // Force fresh connection with new connection string
    await mongoose.connect(process.env.MONGO_URI, options);
    console.log('✅ MongoDB connected successfully');
    console.log('🔗 Connection state:', mongoose.connection.readyState);
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    console.error('❌ Error code:', error.code);
    console.error('❌ Error name:', error.name);
    console.error('❌ Full error:', error);
    
    // Specific error handling
    if (error.code === 'ETIMEDOUT') {
      console.error('❌ CONNECTION TIMEOUT - Check IP whitelist in MongoDB Atlas');
    }
    if (error.code === 'ENOTFOUND') {
      console.error('❌ HOST NOT FOUND - Check MONGO_URI hostname');
    }
    if (error.code === 'ECONNREFUSED') {
      console.error('❌ CONNECTION REFUSED - Check MongoDB Atlas cluster status');
    }
    if (error.message.includes('Authentication failed')) {
      console.error('❌ AUTHENTICATION FAILED - Check username/password in MONGO_URI');
    }
    
    throw error;
  }
};

module.exports = connectDB;
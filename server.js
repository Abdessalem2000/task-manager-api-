require('dotenv').config();
const express = require('express');
const connectDB = require('./src/db');
const authRouter = require('./src/routes/authRoute');
const dashboardRouter = require('./src/routes/dashboardRoute');
const taskRouter = require('./src/routes/taskRoute');

const app = express();

// Check required environment variables
const requiredEnvVars = ['JWT_SECRET_KEY', 'MONGO_URI'];
const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
  console.error('❌ ERROR: Missing required environment variables:');
  missingVars.forEach(varName => {
    console.error(`❌ ${varName} is not defined`);
  });
  console.error('❌ Please set these environment variables in your deployment platform');
  console.error('❌ See .env.example for required variables');
  process.exit(1);
}

console.log('🔐 JWT_SECRET_KEY:', process.env.JWT_SECRET_KEY ? 'SET' : 'MISSING');
console.log('🔗 MONGO_URI length:', process.env.MONGO_URI ? process.env.MONGO_URI.length : 0);

// Detailed MONGO_URI analysis
if (process.env.MONGO_URI) {
  console.log('🔗 MONGO_URI first 50 chars:', process.env.MONGO_URI.substring(0, 50));
  console.log('🔗 MONGO_URI contains srv:', process.env.MONGO_URI.includes('mongodb+srv'));
  console.log('🔗 MONGO_URI contains @:', process.env.MONGO_URI.includes('@'));
  console.log('🔗 MONGO_URI contains cluster:', process.env.MONGO_URI.includes('mongodb.net'));
  
  // Extract database name
  const uriParts = process.env.MONGO_URI.split('/');
  const dbName = uriParts[uriParts.length - 1];
  console.log('🔗 Database name from URI:', dbName);
}

console.log('🚀 Server starting...');
console.log('🔧 Environment:', process.env.NODE_ENV || 'development');
console.log('🔗 Database URL:', process.env.MONGO_URI ? '✅ Configured' : '❌ Missing');

// CORS middleware
app.use((req, res, next) => {
  const allowedOrigins = process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : '*';
  const origin = req.headers.origin;
  
  console.log('🌐 CORS: Request from origin:', origin);
  console.log('🌐 CORS: Allowed origins:', allowedOrigins);
  
  if (allowedOrigins !== '*' && !allowedOrigins.includes(origin)) {
    console.log('❌ CORS: Blocked origin:', origin);
    return res.status(403).json({ msg: 'CORS policy violation' });
  }
  
  res.header('Access-Control-Allow-Origin', allowedOrigins === '*' ? '*' : origin);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  
  next();
});

app.use(express.json());

// Connect to MongoDB and wait for connection before starting routes
connectDB()
  .then(() => {
    console.log('✅ MongoDB connected successfully!');
    console.log('🔗 Database connection confirmed, setting up routes...');
    
    // Routes - FIXED: All routes should have consistent /api prefix
    app.use('/api/v1/auth', authRouter);
    app.use('/api/v1/dashboard', dashboardRouter);
    app.use('/api/v1/tasks', taskRouter); // FIXED: Changed from /api/tasks to /api/v1/tasks

    // Test route
    app.get('/test', (req, res) => {
      res.json({ 
        status: 'Server is running', 
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
      });
    });

    // Health check route
    app.get('/health', (req, res) => {
      res.json({ 
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || 'development'
      });
    });

    // Start server only after DB is connected
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`🔗 Health check: http://localhost:${PORT}/health`);
    });
  })
  .catch(err => {
    console.error('❌ MongoDB connection failed:', err);
    process.exit(1);
  });

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('❌ Server error:', err);
  res.status(500).json({
    msg: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// 404 handler - MUST be after all routes
app.use((req, res) => {
  res.status(404).json({ msg: 'Route not found' });
});

// Export app for Vercel
module.exports = app;

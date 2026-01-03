require('dotenv').config();
const express = require('express');
const connectDB = require('./db');
const authRouter = require('./routes/authRoute');
const dashboardRouter = require('./routes/dashboardRoute');
const taskRouter = require('./routes/taskRoute');

const app = express();

// Check required environment variables
const requiredEnvVars = ['JWT_SECRET', 'DATABASE_URL'];
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

console.log('🚀 Server starting...');
console.log('🔧 Environment:', process.env.NODE_ENV || 'development');
console.log('🔗 Database URL:', process.env.DATABASE_URL ? '✅ Configured' : '❌ Missing');

// CORS middleware
app.use((req, res, next) => {
  const allowedOrigins = process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : '*';
  const origin = req.headers.origin;
  
  if (allowedOrigins !== '*' && !allowedOrigins.includes(origin)) {
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

// Connect to MongoDB
connectDB().catch(err => {
  console.error('❌ MongoDB connection failed:', err);
  process.exit(1);
});

// Routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/dashboard', dashboardRouter);
app.use('/api/tasks', taskRouter);

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

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('❌ Server error:', err);
  res.status(500).json({
    msg: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ msg: 'Route not found' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/health`);
});
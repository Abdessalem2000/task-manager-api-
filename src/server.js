require('dotenv').config();
const express = require('express');
const connectDB = require('./db');
const authRouter = require('./routes/authRoute');
const dashboardRouter = require('./routes/dashboardRoute');
const taskRouter = require('./routes/taskRoute');

const app = express();

console.log('🔍 DEBUG: Server starting...');
console.log('🔍 DEBUG: Environment check:');
console.log('🔍 DEBUG: PORT:', process.env.PORT || '3000 (default)');
console.log('🔍 DEBUG: NODE_ENV:', process.env.NODE_ENV);

// Simple CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use(express.json());

// Add request logging middleware
app.use((req, res, next) => {
  console.log('🔍 DEBUG: Incoming request:', {
    method: req.method,
    url: req.url,
    headers: req.headers,
    body: req.body,
    timestamp: new Date().toISOString()
  });
  next();
});

// Connect to MongoDB
connectDB().catch(err => {
  console.error('❌ MongoDB connection failed:', err);
  console.error('❌ Server will exit due to DB connection failure');
  process.exit(1);
});

// Routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/dashboard', dashboardRouter);
app.use('/api/tasks', taskRouter);

// Test route
app.get('/test', (req, res) => {
  console.log('🔍 DEBUG: Test route hit');
  res.send('Server is running');
});

// Health check route
app.get('/health', (req, res) => {
  console.log('🔍 DEBUG: Health check route hit');
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    routes: {
      tasks: '/api/tasks',
      auth: '/api/v1/auth',
      dashboard: '/api/v1/dashboard'
    }
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('❌ Global error handler triggered:');
  console.error('❌ Error:', err.message);
  console.error('❌ Stack:', err.stack);
  console.error('❌ Request:', {
    method: req.method,
    url: req.url,
    body: req.body
  });
  res.status(500).json({ msg: 'Server error', error: err.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🔍 DEBUG: Server started at ${new Date().toISOString()}`);
});
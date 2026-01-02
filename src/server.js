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

// Set headers for ALL responses
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, HEAD, PATCH');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Max-Age', '86400');
  
  if (req.method === 'OPTIONS') {
    console.log('🔍 DEBUG: OPTIONS request received:', {
      origin: req.headers.origin,
      method: req.headers['access-control-request-method'],
      headers: req.headers['access-control-request-headers']
    });
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, HEAD, PATCH');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Max-Age', '86400');
    return res.status(200).end();
  }
  
  console.log('🔍 DEBUG: Headers set for request:', req.method, req.url);
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
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const authRouter = require('./routes/authRoute');
const dashboardRouter = require('./routes/dashboardRoute');
const taskRouter = require('./routes/taskRoute');

const app = express();

console.log('🔍 DEBUG: Server starting...');
console.log('🔍 DEBUG: Environment check:');
console.log('🔍 DEBUG: PORT:', process.env.PORT || '3000 (default)');
console.log('🔍 DEBUG: NODE_ENV:', process.env.NODE_ENV);

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
  credentials: false,
  optionsSuccessStatus: 200,
  preflightContinue: false
}));

// Explicit OPTIONS handler for debugging
app.options('*', (req, res) => {
  console.log('🔍 DEBUG: OPTIONS request received:', {
    origin: req.headers.origin,
    method: req.headers['access-control-request-method'],
    headers: req.headers['access-control-request-headers']
  });
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin');
  res.header('Access-Control-Max-Age', '86400');
  res.send(200);
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
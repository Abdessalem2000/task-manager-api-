require('dotenv').config();
const express = require('express');
const connectDB = require('./db');
const authRouter = require('./routes/authRoute');
const dashboardRouter = require('./routes/dashboardRoute');
const taskRouter = require('./routes/taskRoute');

const app = express();

// Check required environment variables
if (!process.env.JWT_SECRET_KEY && !process.env.JWT_SECRET) {
  console.error('❌ WARNING: JWT_SECRET_KEY or JWT_SECRET environment variable is not defined');
  console.error('❌ Authentication will not work properly');
  console.error('❌ Please set JWT_SECRET_KEY in your environment variables');
}

console.log('🚀 Server starting...');

// CORS middleware
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

// Connect to MongoDB
connectDB().catch(err => {
  console.error('MongoDB connection failed:', err);
  process.exit(1);
});

// Routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/dashboard', dashboardRouter);
app.use('/api/tasks', taskRouter);

// Test route
app.get('/test', (req, res) => {
  res.send('Server is running');
});

// Health check route
app.get('/health', (req, res) => {
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
  console.error('Server error:', err.message);
  res.status(500).json({ msg: 'Server error', error: err.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
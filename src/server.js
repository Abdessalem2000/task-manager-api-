require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const authRouter = require('./routes/authRoute');
const dashboardRouter = require('./routes/dashboardRoute');
const taskRouter = require('./routes/taskRoute');

const app = express();
app.use(cors({
  origin: ['https://task-manager-frontend-opal-nu.vercel.app', 'http://localhost:5173', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());

// Connect to MongoDB
connectDB().catch(err => {
  console.error('❌ MongoDB connection failed:', err);
  process.exit(1);
});

// Routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/dashboard', dashboardRouter);
app.use('/api/v1/tasks', taskRouter);

// Test route
app.get('/test', (req, res) => res.send('Server is running'));

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ msg: 'Server error', error: err.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`))
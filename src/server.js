require('dotenv').config();
const express = require('express');
const app = express();
const connectDB = require('./db');
const errorHandler = require('./middleware/errorHandler')

// Import Routes
const authRouter = require('./routes/authRoute');
const taskRouter = require('./routes/taskRoute');
const dashboardRouter = require('./routes/dashboardRoute');

// Import Middleware
const authMiddleware = require('./middleware/auth');

// Global Middleware
app.use(express.json());

// Routes Integration
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/dashboard', authMiddleware, dashboardRouter);
app.use('/api/v1/tasks', authMiddleware, taskRouter);
app.use(errorHandler);

// Health Check Route
app.get('/', (req, res) => {
  res.status(200).send('API is running smoothly');
});

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}...`));
  } catch (error) {
    console.log(error);
  }
};

start();

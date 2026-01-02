const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const Task = require('../models/Task');

// GET task
router.get('/', async (req, res) => {
  console.log(' DEBUG: GET /api/v1/tasks route hit');
  try {
   console.log(' DEBUG: Attempting to fetch tasks from MongoDB...');
   const tasks = await Task.find({});
   console.log(' DEBUG: Tasks fetched successfully:', tasks.length, 'tasks found');
   console.log(' DEBUG: Tasks data:', tasks);
    res.status(200).json(tasks);
  } catch (err) {
      console.error(' DEBUG: Error fetching tasks:', err.message);
      console.error(' DEBUG: Full error:', err);
      res.status(500).json({ msg: 
          err.message });
  }
});

//create Task
router.post('/', async (req, res) => {
    console.log(' DEBUG: POST /api/tasks route hit');
    console.log(' DEBUG: Request body:', req.body);
    try {
        const { name, completed } = req.body;
        
        console.log(' DEBUG: Parsed task data:', { name, completed });
        console.log(' DEBUG: Task name type:', typeof name);
        console.log(' DEBUG: Task name length:', name?.length || 0);
        console.log(' DEBUG: Completed type:', typeof completed);
        
        if (!name || name.trim() === '') {
            console.error(' DEBUG: Task name is empty or invalid');
            return res.status(400).json({ 
                msg: 'Task name is required',
                error: 'Task name cannot be empty',
                details: { name: name || 'undefined' }
            });
        }
        
        console.log(' DEBUG: Attempting to create task in MongoDB...');
        
        // Create task without user field since we're not using auth
        const task = await Task.create({ 
            name: name.trim(), 
            completed: completed || false 
        });
        
        console.log(' DEBUG: Task created successfully:', task);
        console.log(' DEBUG: Task _id:', task._id);
        console.log(' DEBUG: Task createdAt:', task.createdAt);

        res.status(201).json({ 
            msg: 'Task created successfully', 
            task: task,
            success: true
        });
    } catch (err) {
        console.error(' DEBUG: Error creating task:', err.message);
        console.error(' DEBUG: Full error object:', err);
        console.error(' DEBUG: Error stack:', err.stack);
        console.error(' DEBUG: Validation errors:', err.errors);
        
        // Send detailed error back to frontend
        let errorMessage = 'Failed to create task';
        let errorDetails = {};
        
        if (err.name === 'ValidationError') {
            errorMessage = 'Validation failed';
            errorDetails = Object.keys(err.errors).reduce((acc, key) => {
                acc[key] = err.errors[key].message;
                return acc;
            }, {});
        } else if (err.name === 'MongoError' || err.name === 'MongoServerError') {
            errorMessage = 'Database error';
            errorDetails = { code: err.code, message: err.message };
        } else {
            errorDetails = { message: err.message, stack: err.stack };
        }
        
        res.status(500).json({ 
            msg: errorMessage,
            error: err.message,
            details: errorDetails,
            success: false
        });
    }
});

// Update task 
router.put('/:id', auth, async (req, res) => {
    try {
        const { id } = req.params;
        const { name, completed } = req.body;

        res.status(200).json({
            msg: 'Task updated successfully',
            task: {
                id,
                name,
                completed
            }
        });
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
});

// Delete task 
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
        const task = await Task.findByIdAndDelete(id);
        
        if (!task) {
            return res.status(404).json({ msg: 'Task not found' });
        }

        res.status(200).json({
            msg: 'Task deleted successfully',
            taskId: id
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error' });
    }
});

module.exports = router;
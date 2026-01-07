const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const Task = require('../models/Task');

// Test route without auth
router.get('/test', async (req, res) => {
  try {
    console.log(' Test route hit - returning sample tasks');
    res.status(200).json([
      { _id: '1', name: 'Test Task 1', completed: false, priority: 'medium', category: 'work' },
      { _id: '2', name: 'Test Task 2', completed: true, priority: 'high', category: 'personal' }
    ]);
  } catch (err) {
    console.error('Test route error:', err.message);
    res.status(500).json({ msg: err.message });
  }
});

// GET user's tasks
router.get('/', auth, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.userId });
    res.status(200).json(tasks);
  } catch (err) {
    console.error('Error fetching tasks:', err.message);
    res.status(500).json({ msg: err.message });
  }
});

//create Task
router.post('/', auth, async (req, res) => {
    try {
        const { name, completed, priority, category } = req.body;
        
        if (!name || name.trim() === '') {
            return res.status(400).json({ 
                msg: 'Task name is required'
            });
        }
        
        const task = await Task.create({ 
            name: name.trim(), 
            completed: completed || false,
            priority: priority || 'medium',
            category: category || 'work',
            user: req.user.userId
        });

        res.status(201).json({ 
            msg: 'Task created successfully', 
            task: task
        });
    } catch (err) {
        console.error('Error creating task:', err.message);
        res.status(500).json({ 
            msg: 'Failed to create task',
            error: err.message
        });
    }
});

// Update task 
router.put('/:id', auth, async (req, res) => {
    try {
        const { id } = req.params;
        const { name, completed } = req.body;

        const task = await Task.findOneAndUpdate(
            { _id: id, user: req.user.userId },
            { name, completed },
            { new: true }
        );

        if (!task) {
            return res.status(404).json({ msg: 'Task not found' });
        }

        res.status(200).json({
            msg: 'Task updated successfully',
            task: task
        });
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
});

// Delete task 
router.delete('/:id', auth, async (req, res) => {
    try {
        const { id } = req.params;
        
        const task = await Task.findOneAndDelete({ _id: id, user: req.user.userId });
        
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
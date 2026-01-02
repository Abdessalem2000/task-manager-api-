const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const Task = require('../models/Task');

// GET task
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).json(tasks);
  } catch (err) {
    console.error('Error fetching tasks:', err.message);
    res.status(500).json({ msg: err.message });
  }
});

//create Task
router.post('/', async (req, res) => {
    try {
        const { name, completed } = req.body;
        
        if (!name || name.trim() === '') {
            return res.status(400).json({ 
                msg: 'Task name is required'
            });
        }
        
        const task = await Task.create({ 
            name: name.trim(), 
            completed: completed || false 
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
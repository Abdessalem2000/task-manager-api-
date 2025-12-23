const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');

// GET task
router.get('/', auth, (req, res) => {
  res.status(200).json({
    msg: 'Tasks OK',
    user: req.user
  });
});

//create Task
router.post('/', auth, (req, res) => {
    const { name, completed } = req.body;

    res.status(201).json({
        msg: 'Task created successfully',
        task: {
            name,
            completed,
            user: req.user.userId
        }
    });
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
router.delete('/:id', auth, async (req, res) => {
    try {
        const { id } = req.params;

        res.status(200).json({
            msg: 'Task deleted successfully',
            taskId: { id
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error' });
    }
});

module.exports = router;
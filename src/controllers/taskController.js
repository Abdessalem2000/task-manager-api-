const Task = require('../models/Task');

// Get all tasks for the logged-in user
const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user.userId });
        res.status(200).json({ tasks, count: tasks.length });
} catch (error) {
    res.status(500).json({ msg:
        error.message });
}
};

const getTask = async (req, res) => {
    try {
        const { id: taskId } = req.params;
        const task = await Task.findOne({ _id: taskId, createdBy: req.user.userId });

        if (!task) {
            return res.status(404).json({ msg: `No task with id ${taskId}` });
        }
        res.status(200).json({ task });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// Create a new task
const createTask = async (req, res) => {
    try {
        req.body.user = req.user.userId;
        const task = await Task.create(req.body);
        res.status(201).json({ task });
    } catch (error) {
        res.status(500).json({ msg: 'error.message' });
    }
};

// Update a task (Set to completed, etc.)
const updateTask = async (req, res) => {
    try {
        const { id: taskId } = req.params;
        const task = await Task.findOneAndUpdate(
            { _id: taskId, createdBy: req.user.userId },
            req.body,
            { new: true, runValidators: true }
        );

        if (!task) return res.status(404).json({ msg: `No task with id ${taskId}` });
        res.status(200).json({ task });
    } catch (error) {
        res.status(500).json({ msg: 'Error updating task' });
    }
};

// Delete a task
const deleteTask = async (req, res) => {
    try {
        const { id: taskId } = req.params;
        const task = await Task.findOneAndDelete({ _id: taskId, createdBy: req.user.userId });

        if (!task) return res.status(404).json({ msg: `No task with id ${taskId}` });
        res.status(200).json({ msg: 'Success! Task removed' });
    } catch (error) {
        res.status(500).json({ msg: 'Error deleting task' });
    }
};

module.exports = { getAllTasks, getTask, createTask, updateTask, deleteTask };
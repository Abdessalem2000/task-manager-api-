const express = require('express');
const router = express.Router();
const { createTask } = require('../controllers/taskController');
const { validateTask } = require('../middleware/authValidator');

router.post('/', validateTask, createTask);

module.exports = router;

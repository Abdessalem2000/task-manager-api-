const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const {validateUser} = require('../middleware/authValidator')

// Authentication Routes
router.post('/register', validateUser, register);
router.post('/login', login);

module.exports = router;
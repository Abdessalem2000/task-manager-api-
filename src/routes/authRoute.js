const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // موديل User

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: 'Email already registered' });
    }

    const user = await User.create({ name, email, password });
    const token = user.createJWT();
    
    res.status(201).json({ 
      msg: 'Registration successful', 
      token,
      user: { name: user.name, email: user.email }
    });
  } catch (error) {
    console.error('REGISTER ERROR:', error);
    res.status(500).json({ msg: error.message });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ msg: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ msg: 'Invalid credentials' });
    }

    const token = user.createJWT();
    res.status(200).json({ 
      msg: 'Login successful', 
      token,
      user: { name: user.name, email: user.email }
    });
  } catch (error) {
    console.error('LOGIN ERROR:', error);
    res.status(500).json({ msg: error.message });
  }
});

module.exports = router;
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
    console.log(' Login attempt for:', email);
    
    const user = await User.findOne({ email });
    if (!user) {
      console.log(' User not found:', email);
      return res.status(401).json({ msg: 'User not found - Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      console.log(' Wrong password for:', email);
      return res.status(401).json({ msg: 'Wrong password - Invalid credentials' });
    }

    const token = user.createJWT();
    console.log(' Login successful for:', email);
    res.status(200).json({ 
      msg: 'Login successful', 
      token,
      user: { name: user.name, email: user.email }
    });
  } catch (error) {
    console.error(' LOGIN ERROR:', error.message);
    console.error(' Full error:', error);
    res.status(500).json({ 
      msg: `Database connection failed: ${error.message}`,
      error: error.message,
      code: error.code || 'UNKNOWN_ERROR'
    });
  }
});

module.exports = router;
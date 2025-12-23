const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // موديل User

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
      res.status(200).json({ msg: 'Login successful', token });
  } catch (error) {
    console.error('LOGIN ERROR FULL:', error);
    res.status(500).json({ msg: 'Server error', error: error.message });
  }
});

module.exports = router;
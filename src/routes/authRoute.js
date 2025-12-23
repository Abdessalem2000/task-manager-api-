const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // موديل User

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // نلقى user من قاعدة البيانات
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ msg: 'Invalid credentials' });
    }

    // تحقق من password لو عندك hash
    const isMatch = await user.comparePassword(password); // method موجودة في الموديل
    if (!isMatch) {
      return res.status(401).json({ msg: 'Invalid credentials' });
    }

    // توليد token
    const token = user.createJWT();
      res.status(200).json({ msg: 'Login successful', token });
  } catch (error) {
    console.error('LOGIN ERROR FULL:', error);
    res.status(500).json({ msg: 'Server error', error: error.message });
  }
});

module.exports = router;
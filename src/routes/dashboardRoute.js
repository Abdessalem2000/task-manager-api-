const express = require('express');
const router = express.Router();

// Dashboard route (Protected)
router.get('/', (req, res) => {
  res.status(200).json({
    msg: `Hello, ${req.user.name}`,
    secret: 'This is protected data that only logged-in users can see',
  });
});

module.exports = router;

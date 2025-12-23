const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');


router.get('/', auth, (req, res) => {
  res.status(200).json({
    msg: 'Tasks OK',
    user: req.user
  });
});

module.exports = router;
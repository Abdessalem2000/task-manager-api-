const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');


router.get('/', auth, (req, res) => {
  console.log('REQ.USER:', req.user);
  res.status(200).json({
    msg: `Dashboard OK ${req.user.name}`,
    user: req.user
  });
});

module.exports = router;
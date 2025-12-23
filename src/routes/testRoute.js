const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /test:
 * get:
 * summary: Test Swagger
 * responses:
 * 200:
 * description: OK
 */
router.get('/test', (req, res) => {
  res.send('Swagger works');
});

module.exports = router;
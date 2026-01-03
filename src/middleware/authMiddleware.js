const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  // Check if auth header exists and is in correct format
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ 
      msg: 'Not authorised - No valid token provided',
      error: 'Missing or invalid authorization header'
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Use JWT_SECRET with fallback to JWT_SECRET_KEY for compatibility
    const jwtSecret = process.env.JWT_SECRET || process.env.JWT_SECRET_KEY;
    
    if (!jwtSecret) {
      console.error('❌ JWT_SECRET environment variable is not defined');
      return res.status(500).json({ 
        msg: 'Server configuration error',
        error: 'JWT secret not configured'
      });
    }
    
    const payload = jwt.verify(token, jwtSecret);
    req.user = { userId: payload.userId, name: payload.name };
    next();
  } catch (error) {
    console.error('❌ JWT verification failed:', error.message);
    return res.status(401).json({ 
      msg: 'Not authorised - Invalid token', 
      error: error.message 
    });
  }
};

module.exports = auth;
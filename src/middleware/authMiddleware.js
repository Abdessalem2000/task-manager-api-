const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ msg: 'Not authorised' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = { userId: payload.userId, name: payload.name };
    next();
  } catch (error) {
    return res.status(401).json({ msg: 'Not authorised', error: error.message });
  }
};

module.exports = auth;
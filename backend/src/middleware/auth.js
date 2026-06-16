const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/constants');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ')
    ? authHeader.slice('Bearer '.length)
    : null;

  if (!token) {
    return res.status(401).json({ success: false, message: 'Access token required' });
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = {
      ...payload,
      id: payload.sub,
    };
    return next();
  } catch (err) {
    return res.status(403).json({ success: false, message: 'Invalid or expired token' });
  }
};

const requireAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ success: false, message: 'Admin access required' });
  }

  next();
};

module.exports = { authenticateToken, requireAdmin };

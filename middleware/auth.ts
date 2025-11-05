// middleware/auth.js
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || "blood-donation-app-secure-fallback-key-2024-must-be-changed";

const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Access token required' });
    }

    const token = authHeader.replace('Bearer ', '');
    
    console.log('🔐 Verifying token with secret:', process.env.JWT_SECRET ? 'ENV' : 'FALLBACK');

    const decoded = jwt.verify(token, JWT_SECRET);
    
    console.log('✅ Token verified for user:', decoded.userId);
    req.userId = decoded.userId;
    next();
    
  } catch (error) {
    console.error('❌ JWT Verification Error:', error.message);
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired' });
    } else if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Invalid token' });
    } else {
      return res.status(401).json({ error: 'Token verification failed' });
    }
  }
};

module.exports = { verifyToken, JWT_SECRET };
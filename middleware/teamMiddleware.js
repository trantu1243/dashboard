const jwt = require('jsonwebtoken');
require('dotenv').config();

const teamMiddleware = (req, res, next) => {
 
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).send({ message: 'Access Denied. No token provided.' });
  }

  try {
    const secretKey = process.env.SECRET_KEY;
    const decoded = jwt.verify(token, secretKey);  
    req.team = decoded; 
    next();  
  } catch (err) {
    return res.status(400).send({ message: 'Invalid token.' });
  }
};

module.exports = teamMiddleware;
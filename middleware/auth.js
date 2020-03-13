const jsonWebToken = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.header('token');
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
  try {
    const decoded = jsonWebToken.verify(token, 'secret');
    req.user = decoded.user;
    return next();
  } catch (err) {
    return res.status(500).send({ message: 'Invalid token' });
  }
};

module.exports = auth;

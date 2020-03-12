const jsonWebToken = require('jsonwebtoken')

function auth (req, res, next) {
  const token = req.header('token')

  if (!token) return res.status(401).json({ message: 'Auth Error' })

  try {
    const decoded = jsonWebToken.verify(token, 'secret')
    req.user = decoded.user
    next()
  } catch (err) {
    console.error(err)
    res.status(500).send({ message: 'Invalid token' })
  }
}

module.exports = auth

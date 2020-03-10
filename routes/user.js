const express = require('express')
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jsonWebToken = require('jsonwebtoken')
const router = express.Router()

const User = require('../models/User')

router.post(
  '/sign-up',
  [check('email').isEmail(), check('password').isLength({ min: 6 })],
  async (req, res) => {
    const validationErrors = validationResult(req)
    if (!validationErrors.isEmpty()) {
      return res.status(400).json({ errors: validationErrors.array() })
    }

    const { email, password, firstName } = req.body

    try {
      let user = await User.findOne({ email })
      if (user) {
        return res.status(400).json({ msg: 'User already exists!' })
      }
      user = new User({
        email,
        password,
        firstName
      })

      const salt = await bcrypt.genSalt(10)
      user.password = await bcrypt.hash(password, salt)

      await user.save()

      const payload = {
        user: {
          id: user.id
        }
      }

      jsonWebToken.sign(
        payload,
        'randomString',
        { expiresIn: 10000 },
        (err, token) => {
          if (err) throw err
          res.status(200).json({ token })
        }
      )
    } catch (err) {
      console.error(err)
      res.status(500).send('Error saving user data')
    }
  }
)

router.post(
  '/log-in',
  [
    check('email', 'Please enter a valid email!').isEmail(),
    check(
      'password',
      'Please enter a password that is at least 6 characters in length!'
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const validationErrors = validationResult(req)
    if (!validationErrors.isEmpty()) {
      return res.status(400).json({ errors: validationErrors.array() })
    }

    const { email, password } = req.body

    try {
      const user = await User.findOne({ email })
      if (!user) {
        return res.status(400).json({ message: 'User does not exist' })
      }

      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) {
        return res.status(400).json({ message: 'Incorrect password!' })
      }
      const payload = { user: { id: user.id } }
      jsonWebToken.sign(
        payload,
        'secret',
        { expiresIn: 3600 },
        (err, token) => {
          if (!err) {
            res.status(200).json({ token })
          }
        }
      )
    } catch (err) {
      console.error(err)
      res.status(500).json({ message: 'Internal Server Error' })
    }
  }
)

const auth = require('../middleware/auth')

router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
    res.json(user)
  } catch (err) {
    res.send({ message: 'Error fetching user.' })
  }
})

module.exports = router

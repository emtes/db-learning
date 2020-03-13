const express = require('express');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jsonWebToken = require('jsonwebtoken');
const User = require('../models/user');
const auth = require('../middleware/auth');

const router = express.Router();

router.post(
  '/sign-up',
  [check('email').isEmail()],
  async (req, res) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      return res.status(400).json({ errors: validationErrors.array() });
    }

    const {
      name, email, password, address,
    } = req.body;

    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: 'User already exists.' });
      }
      user = new User({
        name,
        email,
        password,
        address,
        balance: 5000, // Starting user balance
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      jsonWebToken.sign(
        payload,
        'randomString',
        { expiresIn: 10000 }, // Arbitrary
        (err, token) => {
          if (err) { res.redirect('/sign-up'); }
          res.status(200).json({ token });
        },
      );
    } catch (err) {
      res.status(500).send('Error saving user data').redirect('/sign-up');
    }
  },
);

router.post(
  '/log-in',
  [
    check('email', 'Please enter a valid email.').isEmail(),
  ],
  async (req, res) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      return res.status(400).json({ errors: validationErrors.array() });
    }

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'User does not exist.' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Incorrect password.' });
      }
      const payload = { user: { id: user.id } };
      jsonWebToken.sign(
        payload,
        'secret',
        { expiresIn: 3600 },
        (err, token) => {
          if (!err) {
            res.status(200).json({ token });
          }
        },
      );
    } catch (err) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },
);

router.get('/bal', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user.balance);
  } catch (err) {
    res.status(500).send({ message: 'Error fetching user.' });
  }
});

module.exports = router;

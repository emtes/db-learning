const express = require('express');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('login');
});

router.get('/log-in', (req, res) => {
  res.render('login');
});

router.get('/sign-up', (req, res) => {
  res.render('signup');
});

router.get('/portfolio', auth, (req, res) => {
  try { res.render('portfolio'); } catch (err) {
    res.redirect('/log-in');
  }
});

module.exports = router;

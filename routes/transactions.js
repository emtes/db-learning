const express = require('express');
const auth = require('../middleware/auth');
const transaction = require('../models/transaction');
const stock = require('../models/stock');

const router = express.Router();

router.get('/', (req, res) => {
  try {
    res.render('transactionHistory');
  } catch (err) {
    res.redirect('/log-in');
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const transactions = await transaction.find({ userId: req.user.id });
    res.send(transactions);
  } catch (err) {
    res.redirect('/log-in');
  }
});

router.post('/stocks', auth, async (req, res) => {
  try {
    const stocks = await stock.find({ userId: req.user.id });
    res.send(stocks);
  } catch (err) {
    res.redirect('/log-in');
  }
});

module.exports = router;

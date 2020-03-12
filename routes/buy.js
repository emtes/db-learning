const express = require('express');
const auth = require('../middleware/auth');

const router = express.Router();
const getTickerPrice = require('../src/iex');
const User = require('../models/User');
const Transaction = require('../models/Transaction');
const Stock = require('../models/Stock');

router.post('/', auth, async (req, res) => {
  // make purchase, refer to user balance
  const buyingTicker = req.body.ticker.toUpperCase();
  const buyingShares = req.body.shares;
  const purchaseTotal = (await getTickerPrice(buyingTicker)) * buyingShares;
  try {
    const user = await User.findById(req.user.id);
    const userBalance = user.balance;


    const netPrice = userBalance - purchaseTotal;

    if (netPrice >= 0) {
      user.balance = netPrice;
      await user.save();
      res.status(200);
    } else if (netPrice < 0) {
      res.json({ message: 'Insufficient funds.' });
    }
  } catch (err) {
    console.error(err);
    res.send({ message: 'Error fetching user.' });
  }

  Transaction.create({
    user_id: req.user.id,
    ticker: buyingTicker,
    quantity: buyingShares,
    cost: purchaseTotal,
    date: Date.now(),
  });
  Stock.find({
    user_id: req.user.id,
    ticker: buyingTicker,
  })
    .then(async (stock) => {
      if (stock.length !== 0) {
        const doc = await Stock.findById(stock[0]._id);
        doc.quantity += Number(buyingShares);
        await doc.save();
      } else {
        return Stock.create({
          user_id: req.user.id,
          ticker: buyingTicker,
          quantity: buyingShares,
        });
      }
    })
    .catch((err) => console.error('Error saving transaction', err));
});

module.exports = router;

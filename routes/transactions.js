const express = require('express');
const router = express.Router()
const auth = require('../middleware/auth');
const Transactions = require('../models/Transaction');
const Stocks = require('../models/Stock')

router.get('/', (req, res) => {
	res.render('transactionHistory')
})

router.post('/', auth, async (req, res) => {
	try {
		const transactions = await Transactions.find({user_id: req.user.id});
		res.send(transactions) 
	} catch (err) {
		console.error('Error fetching transactions.',err)
	}
});

router.post('/stocks', auth, async (req, res) => {
	try {
		const stocks = await Stocks.find({user_id: req.user.id})
		res.send(stocks)
	} catch (err) {
		console.error('Error fetching stock data.', err)
	}
})

module.exports = router;
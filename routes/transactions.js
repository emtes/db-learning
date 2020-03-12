const express = require('express');
const router = express.Router()
const auth = require('../middleware/auth');
const Transactions = require('../models/Transaction');

router.get('/', (req, res) => {
	res.render('transactionHistory')
})

router.post('/', auth, async (req, res) => {
	try {
		console.log(req.id)
		const transactions = await Transactions.find({user_id: req.user.id});
		res.send(transactions) 
	} catch (err) {
		console.error('Error fetching transactions',err)
	}
});

module.exports = router;
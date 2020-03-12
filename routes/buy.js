const express = require('express')
const auth = require('../middleware/auth')
const router = express.Router()
const User = require('../models/User')
const getTickerPrice = require('../src/iex')

router.post('/', auth, async (req, res) => {
	/*
		Headers: Authorization: token
		Body:
		{	
			ticker: String, : must be valid
			shares: Number,
		}
	*/
  try {
  	// console.log(req.user)
    const user = await User.findById(req.user.id)
    let userBalance = user.balance
    const buyingTicker = req.body.ticker
    const buyingShares = req.body.shares

    const purchaseTotal = await getTickerPrice(buyingTicker) * buyingShares
    const netPrice = userBalance - purchaseTotal

    if (netPrice > 0) {
    	user.balance = netPrice
      await user.save()
    	res.status(200)
    } else if (netPrice < 0) {
    	res.json({message: 'Insufficient funds.'})
    }
    
  } catch (err) {
    console.error(err)
    res.send({message: 'Error fetching user.'})
  }
})

module.exports = router
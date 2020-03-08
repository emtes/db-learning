const fetch = require('node-fetch')

/*
 Keep requests in server-update models and user state. Give client just enough data to paint DOM?
*/

async function getStockData (ticker) {
  // const baseUrl = "https://cloud.iexapis.com/v1/"
  const sandboxBaseUrl = 'https://sandbox.iexapis.com/stable/'
  const priceOnlyPath = `/stock/${ticker}/price`
  const testToken = '?token=Tpk_3e87e42fb0624c25b0eb806d21838b97'

  const req = await fetch(sandboxBaseUrl + priceOnlyPath + testToken)
  const json = await req.json()
  return console.log(json)
}

getStockData('AAPL')

class Buyer {
  constructor () {
    this.balance = 5000
  }

  buyByTicker (ticker, shares) {
    const sharePrice = getStockData(ticker)
    const totalPrice = value * shares
    if (totalPrice < this.balance) {
      this.balance -= totalPrice
      return true // was it successful?
    }
    return false
  }
}

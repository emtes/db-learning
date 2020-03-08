require('dotenv').config()
const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const port = 3000

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/portfolio', (req, res) => {
  res.render('portfolio')
})

app.listen(port, () => {
  console.log(`App listening on port ${port}...`)
})

require('dotenv').config()
const bodyParser = require('body-parser')
const user = require('./routes/user')

// issue: uri malformed when moved to different file
const mongoose = require('mongoose')

const initMongoDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}${process.env.DB_HOST}`,
      { useNewUrlParser: true, useUnifiedTopology: true }
    )
    console.log('Connected to mongoDB cluster!')
  } catch (err) {
    console.error(err)
    throw err
  }
}

initMongoDB().catch(err => console.error(err))

const express = require('express')
const app = express()
const port = 3000

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.render('portfolio')
})

app.use('/user', user)

app.listen(port, () => {
  console.log(`App listening on port ${port}...`)
})

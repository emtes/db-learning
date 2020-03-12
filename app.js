if (NODE_ENV === 'development') require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const user = require('./routes/user');
const buy = require('./routes/buy');
const transactions = require('./routes/transactions');
const auth = require('./middleware/auth')
const app = express();
const port = process.env.PORT || 3000;

// issue: uri malformed when moved to different file

const initMongoDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}${process.env.DB_HOST}`,
      { useNewUrlParser: true, useUnifiedTopology: true },
    );
    console.log('Connected to mongoDB cluster!');
  } catch (err) {
    console.error(err);
    throw err;
  }
};

initMongoDB().catch((err) => console.error(err));

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.render('signup');
});

app.use('/user', user); 
app.use('/buy', buy);
app.use('/transactions', transactions)

app.get('/log-in', (req, res) => {
  res.render('login');
});

app.get('/sign-up', (req, res) => {
  res.render('signup');
});

app.get('/portfolio', (req, res) => {
  res.render('portfolio')
})

app.listen(port, () => {
  console.log(`App listening on port ${port}...`);
});

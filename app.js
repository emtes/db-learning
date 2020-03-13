const express = require('express');
const bodyParser = require('body-parser');
const initMongoDB = require('./src/mongodb');
const user = require('./routes/user');
const buy = require('./routes/buy');
const transactions = require('./routes/transactions');
const main = require('./routes/main');

const app = express();
const port = process.env.PORT || 3000;

initMongoDB();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.json());

app.use('/', main);
app.use('/user', user);
app.use('/buy', buy);
app.use('/transactions', transactions);

app.listen(port, () => {
  console.log(`App listening on port ${port}...`);
});

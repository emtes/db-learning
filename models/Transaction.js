const mongoose = require('mongoose');

const { Schema } = mongoose;

const transactionSchema = new Schema({
  user_id: {
    type: String,
    required: true,
  },
  ticker: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  cost: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true,
  },
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;

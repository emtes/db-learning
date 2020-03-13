const mongoose = require('mongoose');

const { Schema } = mongoose;

const transactionSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  ticker: {
    type: String,
    required: true,
  },
  sharePrice: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  purchaseTotal: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

const transaction = mongoose.model('transaction', transactionSchema);

module.exports = transaction;

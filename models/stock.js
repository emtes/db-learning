const mongoose = require('mongoose');

const { Schema } = mongoose;

const stockSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  ticker: {
    type: String,
    required: true,
  },
  sharesOwned: {
    type: Number,
    required: true,
  },
});

const stock = mongoose.model('stock', stockSchema);

module.exports = stock;

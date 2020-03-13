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
  quantity: {
    type: Number,
    required: true,
  },
});

const stock = mongoose.model('Stock', stockSchema);

module.exports = stock;

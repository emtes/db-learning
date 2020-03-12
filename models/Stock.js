const mongoose = require('mongoose');

const { Schema } = mongoose;

const stockSchema = new Schema({
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
});

const Stock = mongoose.model('Stock', stockSchema);

module.exports = Stock;

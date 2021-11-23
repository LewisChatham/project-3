const { Schema, model } = require('mongoose');

const giftSchema = new Schema({
  giftName: {
    type: String,
    required: 'Please Enter a Name',
    minlength: 1,
    maxlength: 40,
    trim: true,
  },
  price: {
    type: Number,
    required: false,
    trim: true,
  },
  giftLink: {
    type: String,
    trim: true,
  },
  itemBought: {
    type: Boolean,
    default: false,
  },
});

const Gift = model('Gift', giftSchema);

module.exports = Gift;
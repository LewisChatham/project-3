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
  }
});

const Wishlist = model('Wishlist', wishlistSchema);

module.exports = Wishlist;
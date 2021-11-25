const { Schema, model } = require('mongoose');

const wishlistSchema = new Schema({
  listName: {
    type: String,
    required: 'Please Enter a Name',
    minlength: 1,
    maxlength: 40,
    trim: true,
  },
  priceLimit: {
    type: Number,
    required: false,
    trim: true,
  },
  gifts: [
    {
        type: Schema.Types.ObjectId,
        ref: 'Gift',
      },
  ],
});

const Wishlist = model('Wishlist', wishlistSchema);

module.exports = Wishlist;

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

      },
    },
  ],
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;

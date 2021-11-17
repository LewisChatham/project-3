const { AuthenticationError } = require('apollo-server-express');
const { Wishlist, User, Gift } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    wishlist: async (parent, { wishlistId }) => {
      return User.find({_id: wishlistId}).populate('wishlists');
    },
    me: async (parent, { id }, context) => {
        const foundUser = await User.findOne({
            $or: [{ _id: context.user ? context.user._id : id }, { username: context.user.username }],
          }).populate("Wishlists");
      
          if (!foundUser) {
            throw new AuthenticationError('You need to be logged in!');
          }

          return foundUser;
      },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
   
  },
};

module.exports = resolvers;

const { AuthenticationError } = require("apollo-server-express");
const { Wishlist, User, Gift } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    wishlist: async (parent, { wishlistId }) => {
      return User.find({ _id: wishlistId }).populate("wishlists");
    },
    me: async (parent, { id }, context) => {
      const foundUser = await User.findOne({
        $or: [
          { _id: context.user ? context.user._id : id },
          { username: context.user.username },
        ],
      }).populate("Wishlists");

      if (!foundUser) {
        throw new AuthenticationError("You need to be logged in!");
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
        throw new AuthenticationError("No user found with this email address");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },
    addWishlist: async (parent, { listName, priceLimit }, context) => {
      if (context.user) {
        const wishlist = await Wishlist.create({
          listName,
          priceLimit,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { wishlists: wishlist._id } }
        );

        return wishlist;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    updateWishlist: async (parent, { listName, priceLimit }, context) => {
        if (context.user) {
          const wishlist = await Wishlist.findOne({
            listName,
            priceLimit,
          });
  
          await User.findOneAndUpdate(
            { _id: context.user._id },
            { $addToSet: { wishlists: wishlist._id } }
          );
  
          return wishlist;
        }
        throw new AuthenticationError("You need to be logged in!");
      },
    removeWishlist: async (parent, { wishlistId }, context) => {
      if (context.user) {
        const wishlist = await Wishlist.findOneAndDelete({
          _id: wishlistId,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { wishlists: wishlist._id } }
        );

        return wishlist;
      }

      throw new AuthenticationError("You need to be logged in!");
    },
    addGift: async(parent, {wishlistId, input}, context) => {
        if(context.user){
            return await Wishlist.findOneAndUpdate(
                {_id: wishlistId},
                {$addToSet: {gifts: input} },
                { new: true, runValidators: true });

        }
        throw new AuthenticationError('You need to be logged in!');
    },
    updateGift: async(parent, {wishlistId, input}, context) => {
        if(context.user){
            return await Wishlist.findOneAndUpdate(
                {_id: wishlistId},
                {$addToSet: {gifts: input} },
                { new: true, runValidators: true });

        }
        throw new AuthenticationError('You need to be logged in!');
        // ask Rhys how to resolve this
    },
    removeGift: async(parent, {wishlistId, giftId}, context) => {
        if (context.user) {
            return Wishlist.findOneAndUpdate(
              { _id: wishlistId },
              {
                $pull: {
                  gift: {
                    _id: giftId,
                  },
                },
              },
              { new: true }
            );
          }
          throw new AuthenticationError('You need to be logged in!');
    }
  },
};

module.exports = resolvers;

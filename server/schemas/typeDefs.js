const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    wishlists: [Wishlist]!
  }

  type Wishlist {
    _id: ID
    listName: String
    priceLimit: String
    gifts: [Gift]
  }

  type Gift {
    _id: String
    giftName: String
    price: String
    giftLink: String
    itemBought: Boolean
  }

  type Auth {
    token: ID!
    user: User
  } 
  
  input giftInput {
    giftName: String
    price: String
    giftLink: String
    itemBought: Boolean
  }

  type Query {
    wishlist(wishlistId: String!): Wishlist
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addWishlist(listName: String!, priceLimit: String): Wishlist
    removeWishlist(wishlistId: String!): Wishlist
    updateWishlist(listName: String!, priceLimit: String!) : Wishlist
    addGift(wishlistId: String!, input: giftInput!): Wishlist
    removeGift(giftId: String!, wishlistId: String!): Wishlist
    updateGift(giftId: String!, itemBought: Boolean): Gift
  }
`;

module.exports = typeDefs;

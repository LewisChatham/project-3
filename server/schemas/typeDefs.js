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
    _ID: ID
    listName: String
    priceLimit: Number
    gifts: [Gift]!
  }

  type Gift {
    _id: ID
    giftName: String
    price: Number
    itemBought: Boolean
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    user(username: String!): User
    wishlists: [Wishlist]
    wishlist(wishlistId: ID!): Wishlist
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addWishlist(listName: String!, priceLimit: Number): Thought
    addComment(thoughtId: ID!, commentText: String!): Thought
    removeThought(thoughtId: ID!): Thought
    removeComment(thoughtId: ID!, commentId: ID!): Thought
  }
`;

module.exports = typeDefs;

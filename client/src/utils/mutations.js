import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!){
        login(email: $email, password: $password){
            token
            user {
                _id
                username
            }
        }
    }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_WISHLIST = gql`
  mutation addWishlist($listName: String!, $priceLimit: String!) {
    addWishlist(listName: $listName, priceLimit: $priceLimit){
      _id
      listName
      priceLimit
      gifts{
        giftName
        price
        giftLink
        itemBought
      }
    }
  }
`;

export const REMOVE_WISHLIST = gql`
  mutation removeWishlist($wishlistId: ID!) {
    removeWishlist(wishlistId: $wishlistId){
      _id
      listName
      priceLimit
      gifts{
        _id
        giftName
        price
        giftLink
        itemBought
      }
    }
  }
`;


export const ADD_GIFT = gql`
  mutation addGift($wishlistId: String!, $input: giftInput!){
    addGift(wishlistId: $wishlistId, input: $input){
      _id
      listName
      priceLimit
      gifts{
        _id
        giftName
        price
        giftLink
        itemBought
      }
    }
  }
`

export const REMOVE_GIFT = gql`
  mutation removeGift($wishlistId: String!, $giftId: String!){
    removeGift(wishlistId: $wishlistId, giftId: $giftId){
      _id
      listName
      priceLimit
      gifts{
        _id
        giftName
        price
        giftLink
        itemBought
      }
    }
  }
`
export const UPDATE_GIFT = gql`
  mutation updateGift($giftId: String!, $itemBought: Boolean){
  updateGift(giftId: $giftId, itemBought: $itemBought){
    _id
    giftName
    price
    giftLink
    itemBought
  }
}`;






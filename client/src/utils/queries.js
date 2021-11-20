import { gql } from '@apollo/client';

export const QUERY_ME = gql`
     query getMe {
        me {
            _id
            username
            email
            wishlists {
                listName
                priceLimit
                gifts {
                    giftName
                    price
                    giftLink
                    itemBought
                    
                }
                
            }
        }
    }
`;

export const QUERY_WISHLIST = gql`
     query getWishlist(wishlistId: ID!) {
            wishlists(wishlistId: $wishlistId) {
                _id
                listName
                priceLimit
                gifts {
                    giftName
                    price
                    giftLink
                    itemBought
                }
            }
        }
`;




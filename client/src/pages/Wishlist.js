import React from 'react';

import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';




const Wishlist = () => {
    const {wishlistId} = useParams();

    const { loading, data } = useQuery(QUERY_WISHLIST, {
        // pass URL parameter
        variables: { wishlistId: wishlistId },
      });

    const wishlist = data?.wishlist || {};

    const giftList = wishlist?.gift || [];

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <GiftForm />
            <br />

            wishlist.map()


        </>
    )


    
}
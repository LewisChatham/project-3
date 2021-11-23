import React from 'react';

import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import GiftForm from '../components/GiftForm'

import {QUERY_WISHLIST} from '../utils/queries'



const Wishlist = () => {
    const { wishlistId } = useParams();

    const { loading, data } = useQuery(QUERY_WISHLIST, {
        // pass URL parameter
        variables: { wishlistId: wishlistId },
      });

    const wishlist = data?.wishlist || {};

    const giftList = wishlist?.gifts || [];

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <GiftForm />
            <br />
            <div>{wishlist.listname}</div>
            <div>{wishlist.priceLimit}</div>
            {
                giftList.map((gift) => {
                    return (
                        <>
                            <div key = {gift._id }>
                                <div> 
                                    Gift Name: {gift.giftName}
                                </div>
                                <div> 
                                    Gift Price (£): {gift.price}
                                </div>
                                    <a href = {gift.giftLink} target="_blank" rel="noopener noreferrer"> Link to Gift</a>
                                
                           </div>
                        </>
                    )
            })}


        </>
    )
}

export default Wishlist;
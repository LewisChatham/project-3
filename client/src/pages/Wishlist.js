import React from 'react';

import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';

import GiftForm from '../components/GiftForm'

import {QUERY_WISHLIST} from '../utils/queries'

import {REMOVE_GIFT, UPDATE_GIFT} from '../utils/mutations' 



const Wishlist = () => {
    const { wishlistId } = useParams();

    const { loading, data } = useQuery(QUERY_WISHLIST, {
        // pass URL parameter
        variables: { wishlistId: wishlistId },
      });
    
    const [ removeGift, { error } ] = useMutation(REMOVE_GIFT)
    const [ updateGift, { error } ] = useMutation(UPDATE_GIFT)

    const wishlist = data?.wishlist || {};

    const giftList = wishlist?.gifts || [];

    const handleGiftDelete = async (giftID) => {
        try {
        const { data } = await removeGift(giftID);
        console.log(data);
        } catch(err){
            console.error(err)
        }
    }

    const handleGiftUpdate = async (giftID) => {
        try {
            const { data } = await updateGift(giftID);
            console.log(data);
            } catch(err){
                console.error(err)
            }
    }

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
                                    <button onClick={()=>handleGiftDelete(gift._id)}> Delete Gift</button>
                           </div>
                        </>
                    )
            })}


        </>
    )
}

export default Wishlist;
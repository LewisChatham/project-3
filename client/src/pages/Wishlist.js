import React from 'react';

import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';

import GiftForm from '../components/GiftForm'

import {QUERY_WISHLIST} from '../utils/queries'

import {REMOVE_GIFT, UPDATE_GIFT} from '../utils/mutations' 

import Auth from "../utils/auth";



const Wishlist = () => {
    const { wishlistId } = useParams();

    const { loading, data } = useQuery(QUERY_WISHLIST, {
        // pass URL parameter
        variables: { wishlistId: wishlistId },
      });
    
    const [ removeGift, { error } ] = useMutation(REMOVE_GIFT)

    const [ updateGift] = useMutation(UPDATE_GIFT)

    const wishlist = data?.wishlist || {};

    const giftList = wishlist?.gifts || [];

    const handleGiftDelete = async (giftId) => {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
          return false;
        }

        try {
        const { data } = await removeGift({variables: {wishlistId, giftId}});
        console.log(data);
        } catch(err){
            console.error(err)
        }
    }

    const handleGiftUpdate = async (giftId, itemBought) => {
        try {
            itemBought = !itemBought;
            const { data } = await updateGift({variables: {giftId, itemBought}});
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
            <div>List name: {wishlist.listName}</div>
            <div>Price Limit: {wishlist.priceLimit}</div>
            <br/>
            {
                giftList.map((gift) => {
                    return (
                        
                            <div key={gift._id}>
                                <div> 
                                    Gift Name: {gift.giftName}
                                </div>
                                <div> 
                                    Gift Price (£): {gift.price}
                                </div>
                                    <a href = {gift.giftLink} target="_blank" rel="noopener noreferrer"> Link to Gift</a>
                                    <button onClick={()=>handleGiftDelete(gift._id)}> Delete Gift</button>
                                    <button onClick={()=>handleGiftUpdate(gift._id, gift.itemBought)}> {
                                        gift.itemBought? "Item Not Bought": "Item Bought"
                                    }</button>
                           </div>
                        
                    )
            })}


        </>
    )
}

export default Wishlist;

import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import GiftForm from '../components/GiftForm'
import {QUERY_WISHLIST} from '../utils/queries'
import { UPDATE_GIFT } from "../utils/mutations";
import Auth from "../utils/auth";
import './wishlist.css'

const Wishlist = () => {
  const { wishlistId } = useParams();


  const { loading, data } = useQuery(QUERY_WISHLIST, {
    // pass URL parameter
    variables: { wishlistId: wishlistId },
  });

  const [updateGift] = useMutation(UPDATE_GIFT);

  const wishlist = data?.wishlist || {};

  const giftList = wishlist?.gifts || [];


  const handleGiftUpdate = async (giftId, itemBought) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      itemBought = !itemBought;
      const { data } = await updateGift({ variables: { giftId, itemBought } });
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };


  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <main>
        <div className="row">
          <div className="col-xs-12 col-md-6">
            <GiftForm />
          </div>

          <div className="col-xs-12 col-md-6">
            <div className="gifts-details">
              <div className="gifts-name">{wishlist.listName}</div>
              <div className="gifts-budget"><span>£</span>{wishlist.priceLimit}</div>
            </div>
            <div className="gifts-container">
              {giftList.map((gift) => {
                return (
                  <div className="gift-card" key={gift._id}>
                    <div>{gift.giftName}</div>
                    <div><span>£</span>{gift.price}</div>
                    <a href={gift.giftLink} target="_blank" rel="noopener noreferrer">View gift</a>
                    <button onClick={() => handleGiftUpdate(gift._id, gift.itemBought)}>
                    {gift.itemBought ? "Purchased" : "To buy"}</button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Wishlist;

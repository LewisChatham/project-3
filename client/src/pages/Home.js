import React from 'react';
import { Link } from 'react-router-dom';

import { useQuery, useMutation } from '@apollo/client';

import WishlistForm from '../components/WishlistForm';

import {QUERY_ME} from '../utils/queries'

import {REMOVE_WISHLIST} from '../utils/mutations'

import Auth from '../utils/auth';

const Home = () => {
  
  const { loading, data } = useQuery(QUERY_ME);
  const dataMe = data?.me || {};
  const myWishlists = dataMe?.wishlists || [];

  console.log(myWishlists);


  const [removeWishlist, {error}] = useMutation(REMOVE_WISHLIST);

  const handleDeleteWishlist = async (wishlistId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const {data} = await removeWishlist({variables: {wishlistId} });

      console.log({data})
      window.location.assign("/")
    } catch (err) {
      console.error(err);
    }
  };

  if(!Auth.loggedIn()){
    return (<h1> Please Login or sign up to add wishlists </h1>)
  }


  return (
    <main>
      <div className="flex-row justify-center">
        <div
          className="col-12 col-md-10 mb-3 p-3"
          style={{ border: '1px dotted #1a1a1a' }}
        >
          <WishlistForm />
        </div>
        <div className="col-12 col-md-8 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            myWishlists.map((myWishlist) => {
              return (
                <>
                <div key = {myWishlist._id}>
                <Link to={`/wishlist/${myWishlist._id}`}>
                <div key = {myWishlist._id} >
                  <div>
                    list name: {myWishlist.listName}
                  </div>
                  <div>
                    price limit: {myWishlist.priceLimit}
                  </div>
                </div> 
                </Link>
                <button
                  className="btn btn-block btn-primary"
                  style={{ cursor: 'pointer' }}
                  onClick = {() => handleDeleteWishlist(myWishlist._id)}
                >
                  Delete This Wishlist
                </button>
                </div>
                </>
              )
            })

          )}
        </div>
      </div>
    </main>
  );
};

export default Home;

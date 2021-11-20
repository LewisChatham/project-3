import React from 'react';
import { Link } from 'react-router-dom';

import { useQuery } from '@apollo/client';

import WishlistForm from '../components/WishlistForm';

import { } from '../utils/';

const Home = () => {
  const { loading, data } = useQuery(QUERY_ME);
  const dataMe = data?.me || {};

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
            dataMe.wishlists.map((wishlist) => {
              return (
                <>
                <Link to={`/wishlist/${wishlist._id}`}>
                <div key = {wishlist._id} >
                  <div>
                    list name: {wishlist.listName}
                  </div>
                  <div>
                    priceLimit: {wishlist.priceLimit}
                  </div>
                </div> 
                </Link>
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

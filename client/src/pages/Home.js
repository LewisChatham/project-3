import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import WishlistForm from '../components/WishlistForm';
import {QUERY_ME} from '../utils/queries'
import {REMOVE_WISHLIST} from '../utils/mutations'
import Auth from '../utils/auth';
import Carousel from 'react-bootstrap/Carousel'
import image1 from '../images/carousel-gift-1.jpg'
import image2 from '../images/carousel-gift-2.jpg'
import './home.css'

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
    } catch (err) {
      console.error(err);
    }
  };

  if(!Auth.loggedIn()){
    return (
    <main>
      <Carousel variant="dark">
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={image1}
            alt="First slide"
          />
          <Carousel.Caption className="first-caption">
            <h5>Easily organise your gifts</h5>
            <p>Using our many tools, you can create gift lists and manage them from within your personal dashboard.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={image2}
            alt="Second slide"
          />
          <Carousel.Caption  className="second-caption">
            <h5>Login to take the reins</h5>
            <p>Pun intended</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </main>
    )
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
                {/* might get rid of delete button, doesnt do anything */}
                </div>
                
              )
            })

          )}
        </div>
      </div>
    </main>
  );
};

export default Home;

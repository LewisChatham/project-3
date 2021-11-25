import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_WISHLIST } from "../utils/mutations";
import Auth from "../utils/auth";

const WishlistForm = () => {
  const [wishlistFormData, setWishlistFormData] = useState({
    listName: "",
    priceLimit: "",
  });

  const [addWishlist, { error }] = useMutation(ADD_WISHLIST);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const token = Auth.loggedIn() ? Auth.getToken() : null;

      if (!token) {
        return false;
      }

      const { data } = await addWishlist({
        variables: {
          ...wishlistFormData,
        },
      });

      console.log(data);

      setWishlistFormData({ listName: "", priceLimit: "" });
      window.location.assign("/")
    } catch (err) {
      console.error(err);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setWishlistFormData({ ...wishlistFormData, [name]: value });
  };

  if(!Auth.loggedIn()){
    return (<h1> Please Login or sign up to add wishlists </h1>)
  }

  return (
    <div className="form-container">
      <h3>Create a wishlist</h3>

      {Auth.loggedIn() ? (
        <>
          <form onSubmit={handleFormSubmit}>
            <div>
              <input
                name="listName"
                placeholder="Name your wishlist"
                value={wishlistFormData.listName}
                onChange={handleInputChange}
              ></input>
            </div>

            <div>
              <input
                name="priceLimit"
                placeholder="Wishlist budget (£)"
                value={wishlistFormData.priceLimit}
                onChange={handleInputChange}
              ></input>
            </div>

            <div className="col-12">
              <button className="create-list" type="submit">
                Add Wishlist
              </button>
            </div>
            {error && (
              <div className="col-12 my-3 bg-danger text-white p-3">
                {error.message}
              </div>
            )}
          </form>
        </>
      ) : (
        <p>You need to be logged in to add a wishlist.</p>
      )}
    </div>
  );
};

export default WishlistForm;

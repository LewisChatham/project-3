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

      setWishlistFormData({ listName: "", priceLimit: "" })
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
    <div>
      <h3>Enter Wishlist Info Below</h3>

      {Auth.loggedIn() ? (
        <>
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-9">
              <textarea
                name="listName"
                placeholder="New Wishlist Name"
                value={wishlistFormData.listName}
                className="form-input w-100"
                style={{ lineHeight: "1.5", resize: "vertical" }}
                onChange={handleInputChange}
              ></textarea>
            </div>

            <div className="col-12 col-lg-9">
              <textarea
                name="priceLimit"
                placeholder="Enter Wishlist Limit"
                value={wishlistFormData.priceLimit}
                className="form-input w-100"
                style={{ lineHeight: "1.5", resize: "vertical" }}
                onChange={handleInputChange}
              ></textarea>
            </div>

            <div className="col-12 col-lg-3">
              <button className="btn btn-primary btn-block py-3" type="submit">
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

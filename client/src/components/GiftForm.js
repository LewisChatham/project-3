import React, { useState } from "react";


import { useParams } from 'react-router-dom';
import { useMutation } from "@apollo/client";

import { ADD_GIFT } from "../utils/mutations";

import Auth from "../utils/auth";



const GiftForm = () => {
  const [giftFormData, setGiftFormData] = useState({
    giftName: "",
    price: "",
    giftLink: "",
    itemBought: false,
  });

  const { wishlistId } = useParams();

  const [addGift, { error }] = useMutation(ADD_GIFT);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(giftFormData);

    try {
      const token = Auth.loggedIn() ? Auth.getToken() : null;

      if (!token) {
        return false;
      }
      
      const { data } = await addGift({ variables: {wishlistId, input: giftFormData } });
      console.log(data);

      setGiftFormData({ giftName: "", price: "", giftLink: "" });
    } catch (err) {
      console.error(err);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setGiftFormData({ ...giftFormData, [name]: value });
  };

  return (
    <>
      <div className="form-container">
        <h3>Add a gift</h3>
      <form className="" onSubmit={handleFormSubmit}>
        <div>
          <input
            name="giftName"
            placeholder="Gift Name"
            value={giftFormData.giftName}
            onChange={handleInputChange}
          ></input>
        </div>

        <div>
          <input
            name="price"
            placeholder="Gift Price"
            value={giftFormData.price}
            onChange={handleInputChange}
          ></input>
        </div>

        <div>
          <input
            name="giftLink"
            placeholder="Gift Link"
            value={giftFormData.giftLink}
            onChange={handleInputChange}
          ></input>
        </div>
        {error && (
              <div className="col-12 my-3 bg-danger text-white p-3">
                {error.message}
              </div>
            )}
        <div>
          <button className="create-list" type="submit">
            Add Gift
          </button>
        </div>
      </form>
      </div>
    </>
  );
};

export default GiftForm;

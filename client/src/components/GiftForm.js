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
      <form
        className="flex-row justify-center justify-space-between-md align-center"
        onSubmit={handleFormSubmit}
      >
        <div className="col-12 col-lg-9">
          <textarea
            name="giftName"
            placeholder="Gift Name"
            value={giftFormData.giftName}
            className="form-input w-100"
            style={{ lineHeight: "1.5", resize: "vertical" }}
            onChange={handleInputChange}
          ></textarea>
        </div>

        <div className="col-12 col-lg-9">
          <textarea
            name="price"
            placeholder="Gift Price"
            value={giftFormData.price}
            className="form-input w-100"
            style={{ lineHeight: "1.5", resize: "vertical" }}
            onChange={handleInputChange}
          ></textarea>
        </div>

        <div className="col-12 col-lg-9">
          <textarea
            name="giftLink"
            placeholder="Gift Link"
            value={giftFormData.giftLink}
            className="form-input w-100"
            style={{ lineHeight: "1.5", resize: "vertical" }}
            onChange={handleInputChange}
          ></textarea>
        </div>
        {error && (
              <div className="col-12 my-3 bg-danger text-white p-3">
                {error.message}
              </div>
            )}
        <div className="col-12 col-lg-3">
          <button className="btn btn-primary btn-block py-3" type="submit">
            Add Gift
          </button>
        </div>
      </form>
    </>
  );
};

export default GiftForm;

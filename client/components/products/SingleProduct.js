// WANG: TASK: CREATE SINGLEPRODUCT.JS, modeled on AllProducts.js

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCartAsync, fetchSingleProduct, selectSingleProduct } from "../../features";
import { useParams } from "react-router-dom";

// SingleProduct Component begins here:
const SingleProduct = () => {
  const dispatch = useDispatch();
  const { productId } = useParams(); // this grabs the wildcard.

  const singleProduct = useSelector(selectSingleProduct);
  /* Next: deconstruct the attributes out of singleProduct. 
 Product model lists attributes as name, desc, price, material, color. */
  const { name, description, price, material, color, orders } = singleProduct;

  useEffect(() => {
    dispatch(fetchSingleProduct(productId));
  }, [dispatch]);

  const handleClick = () => {
    let { orderId, quantity } = orders[0].orderDetails
    quantity++;
    dispatch(addToCartAsync({orderId, productId, quantity}));
    dispatch(fetchSingleProduct(productId))
  }

  // We need a key=__ in this return statement, don't we?
  return (
    <div>
      <h3>{name}</h3>
      <p> Description: {description}.</p>
      <p>
        {" "}
        Material: {material}. Color: {color}. Price: ${price}.
      </p>
      <button onClick={handleClick}>ADD {name} TO CART.</button>
      {/* Check: are there any cells under PURCHASED column that says False? 
      if YES: add to that order ("cart"). 
      if NO: add new instance of order.*/}
    </div>
  );
};

export default SingleProduct;

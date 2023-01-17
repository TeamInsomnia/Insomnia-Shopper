// WANG: TASK: CREATE SINGLEPRODUCT.JS, modeled on AllProducts.js

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleProduct, selectSingleProduct } from "../../features";
import { useParams } from "react-router-dom";

// SingleProduct Component begins here:
const SingleProduct = () => {
  const dispatch = useDispatch();
  console.log("Use paramz from singleProduct!");
  console.log(useParams());
  const { productId } = useParams(); // this grabs the wildcard.

  const singleProduct = useSelector(selectSingleProduct);
  const { name, description, price, material, color } = singleProduct;

  useEffect(() => {
    dispatch(fetchSingleProduct(productId));
  }, [dispatch]);

  const handleButton = () => {};

  // We need a key=__ in this return statement, don't we?
  return (
    <div>
      <h3>{name}</h3>
      <p> Description: {description}.</p>
      <p>
        {" "}
        Material: {material}. Color: {color}. Price: ${price}.
      </p>
      <button>ADD {name} TO CART.</button>
      {/* Check: are there any cells under PURCHASED column that says False? 
      if YES: add to that order ("cart"). 
      if NO: add new instance of order.*/}
    </div>
  );
};

export default SingleProduct;

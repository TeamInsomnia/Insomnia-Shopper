// WANG: TASK: CREATE SINGLEPRODUCT.JS, modeled on AllProducts.js

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { fetchSingleProduct, selectSingleProduct } from "../../features";
import { ProductForm } from "../";

// SingleProduct Component begins here:
const SingleProduct = () => {
  const singleProduct = useSelector(selectSingleProduct);
  const isAdmin = useSelector((state) => state.auth.me.isAdmin);

  const dispatch = useDispatch();
  const { productId } = useParams(); // this grabs the wildcard.

  /* Next: deconstruct the attributes out of singleProduct. 
 Product model lists attributes as name, desc, price, material, color. */
  const { id, name, description, price, material, color } = singleProduct;

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
        Material: {material}. Color: {color}. Price: ${price / 100}.
      </p>
      <button>ADD {name} TO CART.</button>
      {/* Check: are there any cells under PURCHASED column that says False? 
      if YES: add to that order ("cart"). 
      if NO: add new instance of order.*/}
      <div>
        {isAdmin && <Link to={`/products/${id}/update`}>Update Product</Link>}
      </div>
    </div>
  );
};

export default SingleProduct;

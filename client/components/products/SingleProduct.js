// WANG: TASK: CREATE SINGLEPRODUCT.JS, modeled on AllProducts.js

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  fetchSingleProduct,
  selectSingleProduct,
  deleteProduct,
} from "../../features";

// SingleProduct Component begins here:
const SingleProduct = () => {
  const singleProduct = useSelector(selectSingleProduct);
  const isAdmin = useSelector((state) => state.auth.me.isAdmin);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productId } = useParams(); // this grabs the wildcard.

  /* Next: deconstruct the attributes out of singleProduct. 
 Product model lists attributes as name, desc, price, material, color. */
  const { id, name, description, price, material, color } = singleProduct;

  useEffect(() => {
    dispatch(fetchSingleProduct(productId));
  }, [dispatch]);

  const handleButton = () => {};

  const handleDelete = () => {
    dispatch(deleteProduct(productId));
    navigate("/products");
  };

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
        {isAdmin && (
          <>
            <h4>Admin Mode!</h4>
            <Link to={`/products/${id}/update`}>Update Product</Link>
            <button type="button" onClick={handleDelete}>
              Delete Product
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default SingleProduct;

// WANG: TASK: CREATE SINGLEPRODUCT.JS, modeled on AllProducts.js

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addExistingToCartAsync, addNewToCartAsync, fetchSingleOrderDetailAsync, fetchSingleProduct, selectSingleProduct } from "../../features";
import { useParams } from "react-router-dom";
import { selectCart } from "../../features/cart/cartSlice";

// SingleProduct Component begins here:
const SingleProduct = () => {
  const dispatch = useDispatch();
  const { productId } = useParams(); // this grabs the wildcard.
  const {id} = useSelector((state) =>state.auth.me);

  const singleProduct = useSelector(selectSingleProduct);
  const cart = useSelector(selectCart);
  /* Next: deconstruct the attributes out of singleProduct. 
 Product model lists attributes as name, desc, price, material, color. */
  const { name, description, price, material, color, orders } = singleProduct;
  
  useEffect(() => {
    dispatch(fetchSingleProduct(productId));
    dispatch(fetchSingleOrderDetailAsync(id));
  }, [dispatch]);

  const handleClick = () => {
    if (orders.length){
      let { orderId, quantity } = orders[0].orderDetails
      quantity++;
      dispatch(addExistingToCartAsync({orderId, productId, quantity}));
      dispatch(fetchSingleProduct(productId))
    }
    else{
      const orderId = cart.id
      const productId = singleProduct.id
      let quantity = 1; 
      dispatch(addNewToCartAsync({orderId, productId, quantity}))
    }
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
      {id && <button onClick={handleClick}>ADD {name} TO CART.</button>}
      {/* Check: are there any cells under PURCHASED column that says False? 
      if YES: add to that order ("cart"). 
      if NO: add new instance of order.*/}
    </div>
  );
};

export default SingleProduct;

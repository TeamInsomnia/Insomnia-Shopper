// WANG: TASK: CREATE SINGLEPRODUCT.JS, modeled on AllProducts.js

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addExistingToCartAsync,
  addNewToCartAsync,
  fetchSingleUnpurchasedOrderAsync,
  fetchSingleProduct,
  selectSingleProduct,
  createOrder,
} from "../../features";
import { useParams } from "react-router-dom";

// SingleProduct Component begins here:
const SingleProduct = () => {
  const [quantityToAdd, setQuantityToAdd] = useState("1");

  const dispatch = useDispatch();
  const { productId } = useParams(); // this grabs the wildcard.
  const { id } = useSelector((state) => state.auth.me);

  const singleProduct = useSelector(selectSingleProduct);
  const cart = useSelector((state) => state.order);
  /* Next: deconstruct the attributes out of singleProduct. 
 Product model lists attributes as name, desc, price, material, color. */
  const { name, description, price, material, color, orders } = singleProduct;

  useEffect(() => {
    dispatch(fetchSingleProduct(productId));
    if (cart.id) dispatch(fetchSingleUnpurchasedOrderAsync(id));
  }, [dispatch]);

  const handleSubmit = async (event) => {
    console.log(id);
    event.preventDefault();
    // if !cart.id; create a new order (send a post request)
    if (!cart.id) {
      await dispatch(createOrder(id));
      await dispatch(fetchSingleProduct(productId));
    }

    if (orders.length && orders[0].userId === id && !orders[0].purchased) {
      let { orderId, quantity } = orders[0].orderDetails;
      quantity += Number(quantityToAdd);
      await dispatch(addExistingToCartAsync({ orderId, productId, quantity }));
      dispatch(fetchSingleProduct(productId));
    } else {
      const orderId = cart.id;
      const productId = singleProduct.id;
      let quantity = Number(quantityToAdd);
      dispatch(addNewToCartAsync({ orderId, productId, quantity }));
    }
    setQuantityToAdd("1");
  };

  // We need a key=__ in this return statement, don't we?
  return (
    <div>
      <h3>{name}</h3>
      <p> Description: {description}.</p>
      <p>
        {" "}
        Material: {material}. Color: {color}. Price: ${price}.
      </p>
      {id && (
        <form onSubmit={handleSubmit}>
          <label htmlFor="quantityToAdd">Quantity</label>
          <input
            type="number"
            min={1}
            max={20}
            name="quantityToAdd"
            value={quantityToAdd}
            onChange={(e) => setQuantityToAdd(e.target.value)}
          />
          <button type="submit">ADD {name} TO CART.</button>
        </form>
      )}
      {/* Check: are there any cells under PURCHASED column that says False? 
      if YES: add to that order ("cart"). 
      if NO: add new instance of order.*/}
    </div>
  );
};

export default SingleProduct;

// WANG: TASK: CREATE SINGLEPRODUCT.JS, modeled on AllProducts.js

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addExistingToCartAsync,
  addNewToCartAsync,
  fetchSingleUnpurchasedOrderAsync,
  fetchSingleProduct,
  selectSingleProduct,
  deleteProduct,
} from "../../features";
import { useParams, Link, useNavigate } from "react-router-dom";

// SingleProduct Component begins here:
const SingleProduct = () => {
  const [quantityToAdd, setQuantityToAdd] = useState("1");
  const singleProduct = useSelector(selectSingleProduct);
  const isAdmin = useSelector((state) => state.auth.me.isAdmin);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productId } = useParams(); // this grabs the wildcard.
  const { id } = useSelector((state) => state.auth.me);
  
  const cart = useSelector((state) => state.order);
  /* Next: deconstruct the attributes out of singleProduct. 
 Product model lists attributes as name, desc, price, material, color. */
  const { name, description, price, material, color, orders } = singleProduct;

  useEffect(() => {
    dispatch(fetchSingleProduct(productId));
    dispatch(fetchSingleUnpurchasedOrderAsync(id));
  }, [dispatch]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (orders.length && orders[0].userId === id && !orders[0].purchased) {
      let { orderId, quantity } = orders[0].orderDetails;
      quantity += Number(quantityToAdd);
      await dispatch(addExistingToCartAsync({ orderId, productId, quantity }));
      dispatch(fetchSingleProduct(productId));
    } else {
      const orderId = cart.id;
      const productId = singleProduct.id;
      let quantity = Number(quantityToAdd);
      await dispatch(addNewToCartAsync({ orderId, productId, quantity }));
      dispatch(fetchSingleProduct(productId));
    }
    setQuantityToAdd("1");
  }
  
  const handleDelete = async () => {
    await dispatch(deleteProduct(productId));
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

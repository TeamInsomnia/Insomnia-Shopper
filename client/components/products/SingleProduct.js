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
  createOrder,
} from "../../features";
import { useParams, Link, useNavigate } from "react-router-dom";

// SingleProduct Component begins here:
const SingleProduct = () => {
  const [quantityToAdd, setQuantityToAdd] = useState("1");
  const singleProduct = useSelector(selectSingleProduct);
  const user = useSelector((state) => state.auth.me);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productId } = useParams(); // this grabs the wildcard.

  const cart = useSelector((state) => state.order);
  /* Next: deconstruct the attributes out of singleProduct. 
 Product model lists attributes as name, desc, price, material, color. */
  const { name, description, price, material, color, orders } = singleProduct;

  // const hasNoOngoingOrders = (orders) => {
  //   console.log(orders);
  //   for (let order of orders) {
  //     console.log(order);
  //     if (order.purchased === false) return false;
  //   }
  //   console.log("created");
  //   return true;
  // };

  const findOrder = (orders) => {
    for (const order of orders) {
      if (order.userId === user.id && order.purchased === false) return order;
    }
  };

  useEffect(() => {
    dispatch(fetchSingleProduct(productId));
    dispatch(fetchSingleUnpurchasedOrderAsync(user.id));
  }, [dispatch]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!cart) {
      // For Chris: This makes it so that duplicate carts aren't generated for me
      dispatch(createOrder(user.id));
      dispatch(fetchSingleProduct(productId));
    }
    // console.log(hasNoOngoingOrders(user.orders));
    // if (hasNoOngoingOrders(user.orders)) {
    //   dispatch(createOrder(user.id));
    //   dispatch(fetchSingleProduct(productId));
    // }
    await dispatch(fetchSingleUnpurchasedOrderAsync(user.id));

    // if (orders.length && orders[0].userId === user.id && !orders[0].purchased) {
    //   let { orderId, quantity } = orders[0].orderDetails;
    //   quantity += Number(quantityToAdd);
    //   await dispatch(addExistingToCartAsync({ orderId, productId, quantity }));
    //   dispatch(fetchSingleProduct(productId));

    if (orders.length && cart.userId === user.id && cart.purchased === false) {
      console.log("created order details incorrectly");
      // THIS is the line that doesn't work ^
      // somehow addExistingToCartAsync is running instead of addNewToCartAsync when there are no order details
      // ALSO there is a bug where this does not work upon first login?
      const orderId = cart.id;
      const orderToUpdate = findOrder(orders);
      const quantity =
        orderToUpdate.orderDetails.quantity + Number(quantityToAdd);
      await dispatch(addExistingToCartAsync({ orderId, productId, quantity }));
      dispatch(fetchSingleProduct(productId));
    } else {
      console.log("created order details correctly");
      const orderId = cart.id;
      const quantity = Number(quantityToAdd);
      await dispatch(addNewToCartAsync({ orderId, productId, quantity }));
      dispatch(fetchSingleProduct(productId));
    }
    setQuantityToAdd("1");
  };

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
      {user.id && (
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
        {user.isAdmin && (
          <>
            <h4>Admin Mode!</h4>
            <Link to={`/products/${productId}/update`}>Update Product</Link>
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

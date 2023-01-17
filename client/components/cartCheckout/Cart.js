/* CART component (placeholder for now). 
Modeled after allproducts component: */

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchSingleUnpurchasedOrderAsync } from "../../features";

const Cart = () => {
  const { id } = useSelector((state) => state.auth.me);
  const dispatch = useDispatch();
  const order = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(fetchSingleUnpurchasedOrderAsync(id));
  }, [dispatch]);
  return (
    <div>
      <h3>
        There are {order.products ? order.products.length : 0} items in your
        cart
      </h3>
      <div>
        {order.products &&
          order.products.map((product) => {
            return (
              <div key={product.id}>
                <p>Product: {product.name}</p>
                <p>Quantity: {product.orderDetails.quantity}</p>
                <p>Price: ${product.orderDetails.quantityPrice / 100}</p>
                <p> ----------------------------------------------- </p>
              </div>
            );
          })}
      </div>
      <div>Subtotal: ${order.products ? order.totalPrice / 100 : 0}</div>
      {order.products && <Link to='/checkout'>Proceed to Checkout</Link>}
    </div>
  );
};

export default Cart;

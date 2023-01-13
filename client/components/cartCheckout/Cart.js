/* CART component (placeholder for now). 
Modeled after allproducts component: */

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts, fetchSingleOrderDetailAsync } from "../../features";
import { NavLink } from "react-router-dom";
import { selectCart } from "../../features/cart/cartSlice";

const Cart = () => {

  const {id} = useSelector((state) =>state.auth.me);
  const dispatch = useDispatch();
  const order = useSelector(selectCart);

  useEffect(()=>{
    dispatch(fetchSingleOrderDetailAsync(id))
  }, [dispatch])
  return (
    <div>
      <h3>There are {order.products ? order.products.length : 0} items in your cart</h3>
      <div>{order.products && order.products.map((product)=>{
        return (
          <>
          <div>
          <p>Product: {product.name}</p>
          <p>Quantity: {product.orderDetails.quantity}</p>
          <p>Subtotal: ${product.orderDetails.quantityPrice}</p> 
          <p> ----------------------------------------------- </p>
          </div>
          </>
        )
      })}</div>
    </div>
  );
};

export default Cart;

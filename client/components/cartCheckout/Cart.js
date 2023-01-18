/* CART component (placeholder for now). 
Modeled after allproducts component: */

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addExistingToCartAsync, fetchSingleUnpurchasedOrderAsync, removeFromCartAsync } from "../../features";

const Cart = () => {
  const { id } = useSelector((state) => state.auth.me);
  const dispatch = useDispatch();
  const order = useSelector((state) => state.order);
  const [quantityToAdd, setQuantityToAdd] = useState('1');

  useEffect(() => {
    dispatch(fetchSingleUnpurchasedOrderAsync(id));
  }, [dispatch]);

  const handleSubmit = async (productId) => {
    let quantity = Number(quantityToAdd); 
    await dispatch(addExistingToCartAsync({orderId: order.id, productId, quantity}));
    setQuantityToAdd('1');
    dispatch(fetchSingleUnpurchasedOrderAsync(id));
  }

  const handleDelete = async (productId) => {
    await dispatch(removeFromCartAsync(productId));
    dispatch(fetchSingleUnpurchasedOrderAsync(id));
  }

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

                <form onSubmit={(event)=>{
                  event.preventDefault();
                  handleSubmit(product.id)
                }}>
                    <label htmlFor="quantityToAdd">Quantity</label>
                    <input
                      type="number"
                      min={1}
                      max={20}
                      name="quantityToAdd"
                      value={quantityToAdd}
                      onChange={(e) => setQuantityToAdd(e.target.value)}
                    />
                <button type="submit">Update Quantity</button>
                </form>
                <button type="button" onClick={(event)=>{
                  event.preventDefault();
                  handleDelete(product.id);
                }}>Remove</button>

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

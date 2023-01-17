import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchSingleUnpurchasedOrderAsync, purchaseOrder } from "../../features/cart/orderSlice";

const Checkout = () => {
    const {id} = useSelector((state)=>state.auth.me);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const order = useSelector((state) => state.order);

    useEffect(() => {
        dispatch(fetchSingleUnpurchasedOrderAsync(id));
      }, [dispatch]);

    const handleSubmit = () => {
        // order.setIsPurchased();
        dispatch(purchaseOrder(id));
        navigate('/confirmation');
    }

    return(
        <>
        <h1>Please review your order below:</h1>
        <div>
        {order.products &&
          order.products.map((product) => {
            return (
              <ul key={product.id}>
                {product.name}
                <li>Quantity: {product.orderDetails.quantity}</li>
                <li>Price: ${product.orderDetails.quantityPrice / 100}</li>
                <p> ----------------------------------------------- </p>
              </ul>
            );
          })}
      </div>
      <div>Total: ${order.totalPrice / 100}</div>
        {order.products && <button type='submit' onClick={handleSubmit}>Place Order</button>}
        </>
    )
}

export default Checkout; 
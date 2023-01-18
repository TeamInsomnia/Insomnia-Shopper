import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchSingleUnpurchasedOrderAsync, purchaseOrder, updateOrderConfirmation } from "../../features/cart/orderSlice";
import {v4 as uuidv4} from 'uuid';

const Checkout = () => {
    const {id} = useSelector((state)=>state.auth.me);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const order = useSelector((state) => state.order);

    useEffect(() => {
        dispatch(fetchSingleUnpurchasedOrderAsync(id));
        if (!order.products) navigate('/notFound'); // prevent user from manually navigating
      }, [dispatch]);

    const handleSubmit = async() => {
        const confirmationNumber = uuidv4().slice(0, 8);
        await dispatch(updateOrderConfirmation({id, confirmationNumber}));
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
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderHistory } from "../../features";

const OrderHistory = () => {

    const {id} = useSelector((state)=>state.auth.me);
    const dispatch = useDispatch();

    const {orders} = useSelector((state)=>state.singleUser);

    useEffect(()=>{
        dispatch(fetchOrderHistory(id))
    }, [dispatch, id]);

    return (
        <>
        <h1>Order History</h1>
        <div>{orders && orders.map((order)=>{
            return(
                <div key={order.id}>
                <p>Order Confirmation #{order.confirmationNumber}</p>
                <p>Total: ${order.totalPrice / 100}</p>
                <p> ----------------------------- </p>
                </div>
            )
        })}</div>
        </> 
    )
}

export default OrderHistory; 
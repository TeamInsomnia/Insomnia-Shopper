import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderHistory } from "../../features";

const OrderHistory = () => {

    const {id} = useSelector((state)=>state.auth.me);
    const dispatch = useDispatch();
    console.log(id);

    const {orders} = useSelector((state)=>state.singleUser);

    useEffect(()=>{
        dispatch(fetchOrderHistory(id))
    }, [dispatch, id]);

    console.log(orders);

    return (
        <h1>{}</h1>
    )
}

export default OrderHistory; 
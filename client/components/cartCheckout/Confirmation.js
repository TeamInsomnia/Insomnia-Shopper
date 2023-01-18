import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Confirmation = () => {

    const order = useSelector((state)=>state.order);
    const navigate = useNavigate();

    useEffect(()=>{
        if (!order.id) navigate('/notFound'); //prevent user from manually navigating 
    })

    return(
        <h1>Thank you! Your order has been received. Your order confirmtion is: #{order && order.confirmationNumber}</h1>
    )
}

export default Confirmation;
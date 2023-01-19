import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Confirmation = () => {
  const order = useSelector((state) => state.order);
  const navigate = useNavigate();

  useEffect(() => {
    if (!order.id) navigate("/notFound"); //prevent user from manually navigating
  });

  return (
    <>
      <h1>Thank you! Your order has been received.</h1>
      <p>Your order confirmation is: #{order && order.confirmationNumber}</p>
      <img
        className="img-fluid"
        src="https://media.istockphoto.com/id/1294688589/photo/red-cat-with-blurred-the-poster-in-the-frame-with-the-words-thank-you.jpg?s=612x612&w=0&k=20&c=T84nHSu52sOQvrmnksdDNo2UByqJ7yXn1srkuodXdps="
      />
    </>
  );
};

export default Confirmation;

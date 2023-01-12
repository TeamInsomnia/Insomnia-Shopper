/* CART component (placeholder for now). 
Modeled after allproducts component: */

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../../features";
import { NavLink } from "react-router-dom";

const Cart = () => {
  return (
    <div>
      <h3>CART shall go here!</h3>
    </div>
  );
};

export default Cart;

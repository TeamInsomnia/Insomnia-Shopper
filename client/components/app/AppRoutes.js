import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import {
  Home,
  AuthForm,
  AllProducts,
  SingleProduct,
  PageNotFound,
  Cart,
  JoinForm,
  Profile,
} from "..";
import { me } from "../../features";
// import JoinForm from "../join/JoinForm";

/**
 * COMPONENT
 */

const AppRoutes = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(me());
  }, []);

  return (
    <div>
      <Routes>
        {isLoggedIn ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Home />} />
            <Route path="/signup" element={<Home />} />
            <Route path="/products/" element={<AllProducts />} />
            <Route path="/products/:productId" element={<SingleProduct />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/profile/:userId" element={<Profile />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Home />} />
            <Route
              path="/login"
              element={<AuthForm name="login" displayName="Login" />}
            />
            <Route
              path="/signup"
              // element={<AuthForm name="signup" displayName="Join Insomnia." />}
              element={<JoinForm />}
            />
            <Route path="/products/" element={<AllProducts />} />
            <Route path="/products/:productId" element={<SingleProduct />} />
          </>
        )}
      </Routes>
    </div>
  );
};

export default AppRoutes;

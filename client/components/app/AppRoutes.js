import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { Home, AuthForm, AllProducts, SingleProduct } from "..";
import { me } from "../../features";

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
            <Route path="/*" element={<Home />} />
            <Route to="/home" element={<Home />} />
          </>
        ) : (
          <>
            <Route
              path="/*"
              element={<AuthForm name="login" displayName="Login" />}
            />
            <Route
              path="/login"
              element={<AuthForm name="login" displayName="Login" />}
            />
            <Route
              path="/signup"
              element={<AuthForm name="signup" displayName="Sign Up" />}
            />{" "}
          </>
        )}

        <Route path="/products/" element={<AllProducts />} />
        <Route path="/products/:productId" element={<SingleProduct />} />
      </Routes>
    </div>
  );
};

export default AppRoutes;

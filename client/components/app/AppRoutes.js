import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { Home, AuthForm, AllProducts, SingleProduct, Cart } from "..";
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
              path="/*" // THIS path catches all of the URL bar typos!
              // element={<AuthForm name="login" displayName="Login" />}
              element={<SingleProduct />}
              // Task: replace this with something like "PAGE NOT FOUND."
            />
            <Route
              path="/login"
              element={<AuthForm name="login" displayName="Login" />}
            />
            <Route
              path="/signup"
              element={<AuthForm name="signup" displayName="Join Insomnia." />}
            />{" "}
          </>
        )}

        <Route path="/cart" element={<Cart />} />
        <Route path="/products/" element={<AllProducts />} />
        <Route path="/products/:productId" element={<SingleProduct />} />
      </Routes>
    </div>
  );
};

export default AppRoutes;

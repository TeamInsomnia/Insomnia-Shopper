import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import {
  Home,
  AuthForm,
  AllUsers,
  AllProducts,
  SingleProduct,
  PageNotFound,
  Cart,
  Checkout,
  ProductForm,
  Confirmation,
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
  const isAdmin = useSelector((state) => state.auth.me.isAdmin);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(me());
  }, []);

  return (
    <div className="container text-center">
      <Routes>
        {isLoggedIn ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Home />} />
            <Route path="/signup" element={<Home />} />

            {isAdmin && (
              <>
                <Route
                  path="/products/:productId/update"
                  element={<ProductForm type="update" />}
                />
                <Route
                  path="/products/add"
                  element={<ProductForm type="add" />}
                />
                <Route path="/users" element={<AllUsers />} />
              </>
            )}
            <Route path="/products/" element={<AllProducts />} />
            <Route path="/products/:productId" element={<SingleProduct />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/confirmation" element={<Confirmation />} />
            <Route path="/profile/" element={<Profile />} />
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
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
};

export default AppRoutes;
